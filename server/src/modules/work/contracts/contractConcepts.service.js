import { prisma } from "../../../common/configs/prismaClient.js";
import { moneyText } from "../../../common/utils/money.utils.js";
import { dateOnlyText } from "../../../common/utils/term.utils.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, newOperationId, writeAudit } from "../../../common/services/audit.service.js";
import { resolveContractTypeFields } from "../../admin/providerTypes/providerTypeFields.service.js";
import { FIELD_GROUPS, enforceFields, withContractAiu } from "../../admin/providerTypes/contractFields.js";
import {
  CONCEPT_TYPES,
  CONTRACT_STATES,
  STATE_NAMES,
  assertStateAllows,
  assertTransition,
  chronologyError,
  contractTotals,
  historyRow,
  sortConcepts,
} from "./contractTerms.js";
import { evaluateLiquidation, liquidationFacts, notifyLiquidated } from "./contractLiquidation.service.js";
import { LIQUIDATION_TOLERANCE_PCT, liquidationConditions, unmetConditions } from "./liquidationTerms.js";
import {
  CONCEPT_AUDITED,
  CONCEPT_SELECT,
  ECONOMIC_COLUMNS,
  assertContractInScope,
  auditableConcept,
  conceptValuesOf,
  derivedEndDate,
  findLockedContract,
  hasApprovedInvoices,
  httpError,
  policiesOf,
  policiesPayload,
} from "./contracts.service.js";
import { insertPolicy } from "./contractPolicies.service.js";
import { liftWithAmendment } from "./contractSuspensions.service.js";
import { contractLabel, notifyWorkManagers } from "./contractNotifications.service.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { contractBalances } from "../../billing/invoices/invoices.service.js";
import { balanceViolations } from "../../billing/invoices/balanceReconciliation.service.js";

/**
 * Conceptos contractuales (ADR-0016, DEC-036): otrosí, otrosí de liquidación
 * y modificación de un concepto. Cada acto tiene su endpoint y su permiso; el
 * tipo nunca llega como parámetro libre (ADR-0016, "Seguridad").
 *
 * - Todo bajo bloqueo de la fila del contrato (ADR-0015, "Concurrencia"): la
 *   numeración del otrosí (máximo + 1) y el recálculo de la fecha fin no
 *   pueden pisarse entre dos peticiones.
 * - Cada concepto pacta sus propios porcentajes: no se heredan.
 * - El valor vigente antes y después del acto queda en la bitácora, aunque
 *   no se guarde (ADR-0016, "Auditoría").
 * - Tras la primera factura aprobada (DOM-07, DEC-078): el costo y los
 *   porcentajes del valor inicial no cambian; los de un otrosí, sí, con una
 *   observación, y solo si los saldos del contrato siguen cumpliendo I1 a I5.
 * - Descripción y porcentajes son campos configurables (DEC-053): se aplican
 *   con la configuración actual de los tipos del proveedor del contrato,
 *   resuelta en la transacción por la misma función que alimenta el
 *   formulario. El proveedor no cambia con el contrato bloqueado: cambiarlo
 *   es editar el contrato, que también lo bloquea.
 */

const optionalInt = (value) => (value === null || value === undefined || String(value).trim() === "" ? null : Number(value));

const listConcepts = (tx, ctrId) => tx.tbl_contract_concepts.findMany({ where: { ctr_id: ctrId }, select: CONCEPT_SELECT });

const activeSequence = (concepts) => sortConcepts(concepts.filter((c) => c.sta_id !== DELETED_STATUS));

const valueText = (concepts) => moneyText(contractTotals(concepts).value);

/**
 * Datos del acto con la configuración de los tipos del proveedor del contrato
 * aplicada (ADR-0006 decisión 6, DEC-053) y la solicitud de AIU del contrato
 * (DEC-046): sin AIU, A, I y U no se aceptan.
 */
const configuredConcept = async (tx, contract, input, { before = null, skip = [] } = {}) => {
  const descriptors = withContractAiu(await resolveContractTypeFields(tx, contract.pvt_id), contract.ctr_aiu_requested);
  return conceptValuesOf(enforceFields({ descriptors, group: FIELD_GROUPS.CONCEPT, input, before, skip }));
};

const assertStartDate = (values) => {
  if (!values.ccp_start_date) throw httpError(400, "La fecha de inicio no es una fecha válida.");
};

const assertChronology = (sequence, index, startDate) => {
  const message = chronologyError(sequence, index, startDate);
  if (message) throw httpError(400, message);
};

// Límites de lo facturado que salen de los valores de los conceptos (DEC-078).
const BALANCE_LIMITS = [
  ["saldo.base_vigente", (b) => b.billing.base],
  ["saldo.anticipo_pactado", (b) => b.advance.agreed],
  ["saldo.retenido_pactado", (b) => b.retention.agreed],
];

/**
 * Con facturas aprobadas, los valores nuevos de un otrosí no pueden dejar lo
 * ya facturado por encima de lo pactado: I1 a I4 (las de la conciliación) e
 * I5 (F ≤ B). 409 con cada incumplimiento; la transacción se revierte.
 */
const assertBalancesHold = (balances) => {
  const violations = balanceViolations(balances).map((v) => `${v.label} en ${v.excess} (${v.invariant})`);
  const { base, billed } = balances.billing;
  if (billed.gt(base)) violations.push(`lo facturado supera la base vigente en ${moneyText(billed.minus(base))} (I5)`);
  if (violations.length > 0) {
    throw httpError(409, `El cambio deja el contrato por debajo de lo ya facturado: ${violations.join("; ")}.`);
  }
};

/** Recalcula la fecha fin y la guarda si cambió; devuelve el cambio para la bitácora, o null. */
const refreshEndDate = async (tx, contract, useBy) => {
  const endDate = await derivedEndDate(tx, contract);
  if (dateOnlyText(endDate) === dateOnlyText(contract.ctr_end_date)) return null;
  await tx.tbl_contracts.update({ where: { ctr_id: contract.ctr_id }, data: { ctr_end_date: endDate, ctr_update_by: useBy } });
  return { field: "ctr_end_date", oldValue: dateOnlyText(contract.ctr_end_date), newValue: dateOnlyText(endDate) };
};

const auditAct = async (tx, { operationId, ccpId, operation, ctx, conceptChanges, valueBefore, valueAfter, contractId, contractChanges }) => {
  await writeAudit(tx, {
    operationId,
    entity: AUDIT_ENTITIES.CONTRACT_CONCEPT,
    recordId: ccpId,
    operation,
    ctx,
    changes: [
      ...conceptChanges,
      ...(valueBefore !== valueAfter ? [{ field: "valor_vigente_contrato", oldValue: valueBefore, newValue: valueAfter }] : []),
    ],
  });
  if (contractChanges.length > 0) {
    await writeAudit(tx, { operationId, entity: AUDIT_ENTITIES.CONTRACT, recordId: contractId, operation: AUDIT_OPERATIONS.UPDATE, ctx, changes: contractChanges });
  }
};

const conceptTarget = (toResult) => ({
  model: prisma.tbl_contract_concepts,
  keyField: "ccp_idempotency_key",
  hashField: "ccp_idempotency_hash",
  ownerField: "ccp_create_by",
  select: { ccp_id: true, ccp_number: true },
  toResult,
});

const amendmentResult = (row) => ({
  message: `Otrosí N.º ${row.ccp_number} registrado correctamente`,
  ccpId: row.ccp_id,
  number: row.ccp_number,
});

const liquidationResult = (row) => ({
  message: "Otrosí de liquidación registrado. El contrato pasó a liquidación.",
  ccpId: row.ccp_id,
});

/**
 * Otrosí ordinario. El número lo asigna el servidor: el mayor del contrato
 * más uno, bajo el bloqueo del contrato, sin reutilizar (ADR-0016, decisión 4).
 * Su prórroga extiende la fecha fin en la misma transacción.
 *
 * Sobre un contrato suspendido, el otrosí lo reanuda (DEC-039): cierra la
 * suspensión con `input.liftDate`, suma los días suspendidos y vuelve al
 * estado previo, todo en esta transacción. Exige además el permiso de
 * levantar; `granted` es el Set de per_id efectivos del autor.
 */
export const createAmendment = async ({ ctrId, input, useBy, granted, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  await assertContractInScope(scope, ctrId);
  // Lo que pidió el cliente: huella de idempotencia. La configuración del
  // tipo se aplica dentro de la transacción.
  const requested = { ...conceptValuesOf(input), ccp_extension: optionalInt(input.extension) };
  const liftDate = input.liftDate || null;
  assertStartDate(requested);
  const policies = policiesOf(input, granted, { act: "el otrosí", concept: "el otrosí" });
  const locks = {
    CONTRATO: ctrId,
    ...(policies.length > 0 && { ASEGURADORA: policies.map((p) => p.ins_id), TIPO_POLIZA: policies.map((p) => p.plt_id) }),
  };

  return runIdempotent({
    target: conceptTarget(amendmentResult),
    key: idempotencyKey,
    ownerId: useBy,
    payload: {
      ctrId: Number(ctrId),
      type: CONCEPT_TYPES.AMENDMENT,
      ...auditableConcept(requested),
      liftDate,
      ...(policies.length > 0 && { policies: policiesPayload(policies) }),
    },
    execute: async (idempotencyData) => {
      const { resumed, ...result } = await withLockedTransaction(locks, async (tx) => {
        const contract = await findLockedContract(tx, ctrId);
        assertStateAllows(contract.ctr_state, "createAmendment");
        const values = { ...(await configuredConcept(tx, contract, input)), ccp_extension: optionalInt(input.extension) };

        const concepts = await listConcepts(tx, contract.ctr_id);
        const sequence = activeSequence(concepts);
        assertChronology(sequence, sequence.length, values.ccp_start_date);

        // Incluye los anulados: un número no se reutiliza.
        const number = Math.max(0, ...concepts.map((c) => c.ccp_number ?? 0)) + 1;
        const data = { ctr_id: contract.ctr_id, ccp_type: CONCEPT_TYPES.AMENDMENT, ccp_number: number, ...values };
        const created = await tx.tbl_contract_concepts.create({
          data: { ...data, ccp_create_by: Number(useBy), ccp_update_by: Number(useBy), ...idempotencyData },
        });

        const operationId = newOperationId();
        const lifted = await liftWithAmendment(tx, {
          contract,
          liftDate,
          ccpId: created.ccp_id,
          useBy: Number(useBy),
          granted,
          ctx,
          operationId,
        });
        // Con los días suspendidos ya sumados, si los hubo.
        const endChange = await refreshEndDate(tx, lifted.contract, Number(useBy));
        await auditAct(tx, {
          operationId,
          ccpId: created.ccp_id,
          operation: AUDIT_OPERATIONS.CREATE,
          ctx,
          conceptChanges: diffFields({}, auditableConcept(data), CONCEPT_AUDITED),
          valueBefore: valueText(concepts),
          valueAfter: valueText([...concepts, { ...data, sta_id: ACTIVE_STATUS }]),
          contractId: contract.ctr_id,
          contractChanges: [...lifted.changes, ...(endChange ? [endChange] : [])],
        });

        // Las pólizas que amparan el otrosí, en su transacción y su operación
        // de bitácora (ADR-0027). Con el estado ya reanudado, si lo estaba.
        if (policies.length > 0) assertStateAllows(lifted.contract.ctr_state, "createPolicy");
        for (const values of policies) {
          await insertPolicy(tx, { ctrId: contract.ctr_id, ccpId: created.ccp_id, values, useBy, ctx, operationId });
        }

        const result = amendmentResult(created);
        return lifted.changes.length > 0
          ? { ...result, message: `${result.message}. El contrato se reanudó.`, resumed: true }
          : { ...result, resumed: false };
      });

      // Después del COMMIT (ADR-0027): solo si el otrosí levantó la suspensión.
      if (resumed) {
        await notifyWorkManagers({
          ctrId,
          actorId: useBy,
          title: "Contrato reanudado",
          action: "resume",
          data: { ccpId: result.ccpId },
          buildMessage: (contract) =>
            `El contrato ${contractLabel(contract)} se reanudó con el otrosí N.º ${result.number}, desde el ${dateOnlyText(liftDate)}.`,
        });
      }
      return result;
    },
  });
};

/**
 * Otrosí de liquidación: uno por contrato (UNIQUE en la BD), sin número.
 * Dispara la transición a EN LIQUIDACIÓN en la misma transacción (ADR-0016,
 * decisión 13), y desde ahí no se admiten otrosí.
 */
export const createLiquidation = async ({ ctrId, input, useBy, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  await assertContractInScope(scope, ctrId);
  const requested = conceptValuesOf(input);
  assertStartDate(requested);

  return runIdempotent({
    target: conceptTarget(liquidationResult),
    key: idempotencyKey,
    ownerId: useBy,
    payload: { ctrId: Number(ctrId), type: CONCEPT_TYPES.LIQUIDATION, ...auditableConcept(requested) },
    execute: async (idempotencyData) => {
      const result = await withLockedTransaction({ CONTRATO: ctrId }, async (tx) => {
        const contract = await findLockedContract(tx, ctrId);
        assertStateAllows(contract.ctr_state, "createLiquidation");
        // Antes de escribir nada: el destino sale de la transición declarada.
        const { to: nextState } = assertTransition("startLiquidation", contract.ctr_state);
        const values = await configuredConcept(tx, contract, input);

        const concepts = await listConcepts(tx, contract.ctr_id);
        if (concepts.some((c) => c.ccp_type === CONCEPT_TYPES.LIQUIDATION)) {
          throw httpError(409, "El contrato ya tiene otrosí de liquidación.");
        }
        const sequence = activeSequence(concepts);
        assertChronology(sequence, sequence.length, values.ccp_start_date);

        const data = { ctr_id: contract.ctr_id, ccp_type: CONCEPT_TYPES.LIQUIDATION, ...values };
        const created = await tx.tbl_contract_concepts.create({
          data: { ...data, ccp_create_by: Number(useBy), ccp_update_by: Number(useBy), ...idempotencyData },
        });

        // Transición automática, con su historial (ADR-0017, decisiones 6 y 10).
        await tx.tbl_contracts.update({
          where: { ctr_id: contract.ctr_id },
          data: { ctr_state: nextState, ctr_update_by: Number(useBy) },
        });
        await tx.tbl_contract_status_history.create({
          data: historyRow({
            ctrId: contract.ctr_id,
            transition: "startLiquidation",
            fromState: contract.ctr_state,
            useBy: Number(useBy),
            observation: "Otrosí de liquidación registrado.",
          }),
        });

        await auditAct(tx, {
          operationId: newOperationId(),
          ccpId: created.ccp_id,
          operation: AUDIT_OPERATIONS.CREATE,
          ctx,
          conceptChanges: diffFields({}, auditableConcept(data), CONCEPT_AUDITED),
          valueBefore: valueText(concepts),
          valueAfter: valueText([...concepts, { ...data, sta_id: ACTIVE_STATUS }]),
          contractId: contract.ctr_id,
          contractChanges: [{ field: "ctr_state", oldValue: contract.ctr_state, newValue: nextState }],
        });

        return liquidationResult(created);
      });

      // Después del COMMIT (ADR-0027).
      await notifyWorkManagers({
        ctrId,
        actorId: useBy,
        title: "Contrato en liquidación",
        action: "start_liquidation",
        data: { ccpId: result.ccpId },
        buildMessage: (contract) => `Se registró el otrosí de liquidación del contrato ${contractLabel(contract)}. El contrato pasó a liquidación.`,
      });
      return result;
    },
  });
};

/**
 * Modificar los datos económicos de un concepto (permiso propio). El tipo y
 * el número no cambian; la fecha del valor inicial es la del contrato. Un
 * concepto del contrato en ejecución, o el de liquidación mientras el
 * contrato está en liquidación. Fija un estado final: reintentable.
 *
 * Tras la primera factura aprobada del contrato, costo directo y porcentajes
 * no cambian (DOM-07, ADR-0016 regla 14): 409, y se corrige con un otrosí.
 * Fecha, prórroga y descripción siguen editables. Aprobar una factura
 * bloquea el mismo contrato, así que la verificación no tiene carrera.
 */
export const updateConcept = async ({ ccpId, input, useBy, scope, ctx = { useId: useBy } }) => {
  // El contrato de un concepto no cambia nunca: leerlo antes del bloqueo solo
  // dice qué contrato bloquear primero (ADR-0027, regla 3). Bajo bloqueo se
  // verifica que siga siendo el mismo.
  const known = await prisma.tbl_contract_concepts.findUnique({ where: { ccp_id: Number(ccpId) }, select: { ctr_id: true } });
  if (!known) throw httpError(404, "No se encontró el concepto.");
  await assertContractInScope(scope, known.ctr_id);

  const result = await withLockedTransaction(
    { CONTRATO: known.ctr_id, CONCEPTO: ccpId },
    async (tx) => {
      const contract = await findLockedContract(tx, known.ctr_id);
      const concepts = await listConcepts(tx, contract.ctr_id);
      const before = concepts.find((c) => c.ccp_id === Number(ccpId));
      if (!before || before.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró el concepto.");
      assertStateAllows(contract.ctr_state, before.ccp_type === CONCEPT_TYPES.LIQUIDATION ? "editLiquidationConcept" : "editConcept");

      const isInitial = before.ccp_type === CONCEPT_TYPES.INITIAL;
      // Un valor guardado en un campo que dejó de aplicar se conserva (heredado).
      const values = {
        ...(await configuredConcept(tx, contract, input, { before, skip: isInitial ? ["CONCEPT_DESCRIPTION"] : [] })),
        ...(isInitial ? { ccp_start_date: before.ccp_start_date, ccp_description: before.ccp_description } : {}),
        ccp_extension: before.ccp_type === CONCEPT_TYPES.AMENDMENT ? optionalInt(input.extension) : null,
      };
      assertStartDate(values);
      const economicChanges = diffFields(auditableConcept(before), auditableConcept(values), ECONOMIC_COLUMNS);
      // DOM-07 (DEC-078): con facturas aprobadas, el valor inicial queda
      // congelado; un otrosí cambia sus valores con observación y saldos que cuadren.
      const afterInvoices = economicChanges.length > 0 && (await hasApprovedInvoices(tx, contract.ctr_id));
      const observation = String(input.observation ?? "").trim();
      if (afterInvoices && isInitial) {
        throw httpError(
          409,
          "El contrato ya tiene facturas aprobadas: el costo directo y los porcentajes del valor inicial no cambian. Corrige con un otrosí."
        );
      }
      if (afterInvoices && !observation) {
        throw httpError(400, "El contrato ya tiene facturas aprobadas: para cambiar el costo directo o un porcentaje del otrosí, escribe una observación.");
      }
      const sequence = activeSequence(concepts);
      assertChronology(sequence, sequence.indexOf(before), values.ccp_start_date);

      const balancesBefore = afterInvoices ? await contractBalances(tx, contract.ctr_id) : null;
      await tx.tbl_contract_concepts.update({ where: { ccp_id: before.ccp_id }, data: { ...values, ccp_update_by: Number(useBy) } });
      const balancesAfter = afterInvoices ? await contractBalances(tx, contract.ctr_id) : null;
      if (balancesAfter) assertBalancesHold(balancesAfter);

      const after = concepts.map((c) => (c.ccp_id === before.ccp_id ? { ...c, ...values } : c));
      const endChange = before.ccp_extension !== values.ccp_extension ? await refreshEndDate(tx, contract, Number(useBy)) : null;
      const conceptChanges = [
        ...diffFields(auditableConcept(before), auditableConcept(values), CONCEPT_AUDITED),
        // Con facturas aprobadas, la justificación y los límites que movió.
        ...(afterInvoices
          ? [
              { field: "observation", oldValue: null, newValue: observation },
              ...BALANCE_LIMITS.map(([field, limit]) => ({
                field,
                oldValue: moneyText(limit(balancesBefore)),
                newValue: moneyText(limit(balancesAfter)),
              })).filter((row) => row.oldValue !== row.newValue),
            ]
          : []),
      ];
      if (conceptChanges.length > 0 || endChange) {
        await auditAct(tx, {
          operationId: newOperationId(),
          ccpId: before.ccp_id,
          operation: AUDIT_OPERATIONS.UPDATE,
          ctx,
          conceptChanges,
          valueBefore: valueText(concepts),
          valueAfter: valueText(after),
          contractId: contract.ctr_id,
          contractChanges: endChange ? [endChange] : [],
        });
      }
      // El otrosí de liquidación cambia el valor contratado (C9): puede completar las condiciones (DEC-081).
      const liquidation = await evaluateLiquidation(tx, { ctrId: contract.ctr_id, useBy, ctx, contractBalances });
      return { message: "Concepto modificado correctamente", ccpId: before.ccp_id, ...(liquidation?.liquidated && { contractLiquidated: true }) };
    },
    { idempotent: true }
  );
  if (result.contractLiquidated) await notifyLiquidated({ ctrId: known.ctr_id, actorId: useBy });
  return result;
};

// ─── Liquidación (ADR-0017, DEC-081) ─────────────────────────────────────────

/**
 * Condiciones de liquidación del contrato, para la pestaña Liquidación del
 * expediente: las mismas que exige la transición automática, calculadas al
 * consultar (no se guardan). Solo para un contrato en liquidación o liquidado.
 */
export const getContractLiquidation = async ({ ctrId, scope }) => {
  await assertContractInScope(scope, ctrId);
  const contract = await prisma.tbl_contracts.findFirst({
    where: { ctr_id: Number(ctrId), sta_id: { not: DELETED_STATUS } },
    select: { ctr_id: true, ctr_state: true },
  });
  if (!contract) throw httpError(404, "No se encontró el contrato.");
  if (![CONTRACT_STATES.IN_LIQUIDATION, CONTRACT_STATES.LIQUIDATED].includes(contract.ctr_state)) {
    throw httpError(409, "Las condiciones de liquidación aplican a un contrato en liquidación o liquidado.");
  }
  const conditions = liquidationConditions(await liquidationFacts(prisma, contract.ctr_id, contractBalances));
  return {
    state: contract.ctr_state,
    tolerancePct: LIQUIDATION_TOLERANCE_PCT,
    conditions,
    pending: unmetConditions(conditions).length,
  };
};

/**
 * Volver a evaluar (DEC-081): para un contrato en liquidación que ya cumple
 * todo sin que haya ocurrido un hecho después (registrado antes de DEC-081).
 * Mismo evaluador y mismo bloqueo que tras una factura; si falta algo, no
 * cambia nada y lo dice.
 */
export const evaluateContractLiquidation = async ({ ctrId, useBy, scope, ctx = { useId: useBy } }) => {
  await assertContractInScope(scope, ctrId);
  const result = await withLockedTransaction({ CONTRATO: ctrId }, async (tx) => {
    const contract = await findLockedContract(tx, ctrId);
    if (contract.ctr_state !== CONTRACT_STATES.IN_LIQUIDATION) {
      throw httpError(409, `Solo se evalúa la liquidación de un contrato en liquidación. Estado actual: ${STATE_NAMES[contract.ctr_state] ?? contract.ctr_state}.`);
    }
    return evaluateLiquidation(tx, { ctrId: contract.ctr_id, useBy, ctx, contractBalances });
  });
  if (result.liquidated) {
    await notifyLiquidated({ ctrId, actorId: useBy });
    return { message: "El contrato cumplió las condiciones y quedó liquidado.", contractLiquidated: true };
  }
  const pending = unmetConditions(result.conditions);
  return {
    message: `El contrato sigue en liquidación: ${pending.length === 1 ? "falta una condición" : `faltan ${pending.length} condiciones`} (${pending.map((c) => c.label.toLowerCase()).join("; ")}).`,
    contractLiquidated: false,
  };
};
