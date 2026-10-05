import { prisma } from "../../../common/configs/prismaClient.js";
import { moneyText } from "../../../common/utils/money.utils.js";
import { dateOnlyText } from "../../../common/utils/term.utils.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, newOperationId, writeAudit } from "../../../common/services/audit.service.js";
import { resolveContractFields } from "../../admin/contractTypes/contractTypeFields.service.js";
import { FIELD_GROUPS, enforceFields } from "../../admin/contractTypes/contractFields.js";
import { CONCEPT_TYPES, assertStateAllows, assertTransition, chronologyError, contractTotals, historyRow, sortConcepts } from "./contractTerms.js";
import {
  CONCEPT_AUDITED,
  CONCEPT_SELECT,
  auditableConcept,
  conceptValuesOf,
  derivedEndDate,
  findLockedContract,
  httpError,
} from "./contracts.service.js";
import { liftWithAmendment } from "./contractSuspensions.service.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";

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
 * - Inmutabilidad tras la primera factura aprobada (PRO-BE-16): llega con
 *   facturación; hoy no hay facturas que la activen.
 * - Descripción y porcentajes son campos configurables (DEC-037): se aplican
 *   con la configuración actual del tipo del contrato, resuelta en la
 *   transacción por la misma función que alimenta el formulario.
 */

const optionalInt = (value) => (value === null || value === undefined || String(value).trim() === "" ? null : Number(value));

const listConcepts = (tx, ctrId) => tx.tbl_contract_concepts.findMany({ where: { ctr_id: ctrId }, select: CONCEPT_SELECT });

const activeSequence = (concepts) => sortConcepts(concepts.filter((c) => c.sta_id !== DELETED_STATUS));

const valueText = (concepts) => moneyText(contractTotals(concepts).value);

/** Datos del acto con la configuración del tipo del contrato aplicada (ADR-0006, decisión 6). */
const configuredConcept = async (tx, contract, input, { before = null, skip = [] } = {}) => {
  const descriptors = await resolveContractFields(tx, contract.ctt_id);
  return conceptValuesOf(enforceFields({ descriptors, group: FIELD_GROUPS.CONCEPT, input, before, skip }));
};

const assertStartDate = (values) => {
  if (!values.ccp_start_date) throw httpError(400, "La fecha de inicio no es una fecha válida.");
};

const assertChronology = (sequence, index, startDate) => {
  const message = chronologyError(sequence, index, startDate);
  if (message) throw httpError(400, message);
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
export const createAmendment = async ({ ctrId, input, useBy, granted, ctx = { useId: useBy }, idempotencyKey }) => {
  // Lo que pidió el cliente: huella de idempotencia. La configuración del
  // tipo se aplica dentro de la transacción.
  const requested = { ...conceptValuesOf(input), ccp_extension: optionalInt(input.extension) };
  const liftDate = input.liftDate || null;
  assertStartDate(requested);

  return runIdempotent({
    target: conceptTarget(amendmentResult),
    key: idempotencyKey,
    ownerId: useBy,
    payload: { ctrId: Number(ctrId), type: CONCEPT_TYPES.AMENDMENT, ...auditableConcept(requested), liftDate },
    execute: (idempotencyData) =>
      withLockedTransaction({ CONTRATO: ctrId }, async (tx) => {
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

        const result = amendmentResult(created);
        return lifted.changes.length > 0 ? { ...result, message: `${result.message}. El contrato se reanudó.` } : result;
      }),
  });
};

/**
 * Otrosí de liquidación: uno por contrato (UNIQUE en la BD), sin número.
 * Dispara la transición a EN LIQUIDACIÓN en la misma transacción (ADR-0016,
 * decisión 13), y desde ahí no se admiten otrosí.
 */
export const createLiquidation = async ({ ctrId, input, useBy, ctx = { useId: useBy }, idempotencyKey }) => {
  const requested = conceptValuesOf(input);
  assertStartDate(requested);

  return runIdempotent({
    target: conceptTarget(liquidationResult),
    key: idempotencyKey,
    ownerId: useBy,
    payload: { ctrId: Number(ctrId), type: CONCEPT_TYPES.LIQUIDATION, ...auditableConcept(requested) },
    execute: (idempotencyData) =>
      withLockedTransaction({ CONTRATO: ctrId }, async (tx) => {
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
      }),
  });
};

/**
 * Modificar los datos económicos de un concepto (permiso propio). El tipo y
 * el número no cambian; la fecha del valor inicial es la del contrato. Un
 * concepto del contrato en ejecución, o el de liquidación mientras el
 * contrato está en liquidación. Fija un estado final: reintentable.
 */
export const updateConcept = async ({ ccpId, input, useBy, ctx = { useId: useBy } }) => {
  // El contrato de un concepto no cambia nunca: leerlo antes del bloqueo solo
  // dice qué contrato bloquear primero (ADR-0027, regla 3). Bajo bloqueo se
  // verifica que siga siendo el mismo.
  const known = await prisma.tbl_contract_concepts.findUnique({ where: { ccp_id: Number(ccpId) }, select: { ctr_id: true } });
  if (!known) throw httpError(404, "No se encontró el concepto.");

  return withLockedTransaction(
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
      const sequence = activeSequence(concepts);
      assertChronology(sequence, sequence.indexOf(before), values.ccp_start_date);

      await tx.tbl_contract_concepts.update({ where: { ccp_id: before.ccp_id }, data: { ...values, ccp_update_by: Number(useBy) } });

      const after = concepts.map((c) => (c.ccp_id === before.ccp_id ? { ...c, ...values } : c));
      const endChange = before.ccp_extension !== values.ccp_extension ? await refreshEndDate(tx, contract, Number(useBy)) : null;
      const conceptChanges = diffFields(auditableConcept(before), auditableConcept(values), CONCEPT_AUDITED);
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
      return { message: "Concepto modificado correctamente", ccpId: before.ccp_id };
    },
    { idempotent: true }
  );
};
