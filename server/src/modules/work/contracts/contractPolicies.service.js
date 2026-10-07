import { prisma } from "../../../common/configs/prismaClient.js";
import { DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { moneyText, percentText, toPercent } from "../../../common/utils/money.utils.js";
import { dateOnlyText, toDateOnly } from "../../../common/utils/term.utils.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, newOperationId, writeAudit } from "../../../common/services/audit.service.js";
import { insurersService } from "../../admin/insurers/insurers.service.js";
import { policyTypesService } from "../../admin/policyTypes/policyTypes.service.js";
import { POLICY_BASE_NAMES, insuredValue, policyBaseValue } from "../../admin/policyTypes/policyBases.js";
import { reasonsService, REASON_SCOPES } from "../../admin/reasons/reasons.service.js";
import { CONCEPT_TYPES, CONCEPT_TYPE_NAMES, CONTRACT_STATES, assertStateAllows, conceptAmounts, sortConcepts } from "./contractTerms.js";
import { POLICY_VALIDITY_NAMES, expiringDays, policyValidity, uncoveredConcepts } from "./policyTerms.js";
import { CONCEPT_SELECT, assertContractInScope, findLockedContract, httpError } from "./contracts.service.js";

/**
 * Pólizas del contrato (ADR-0018, ADR-0019; DEC-050). Submódulo de contratos.
 *
 * - Una póliza ampara UN concepto de su contrato (FK compuesta en la BD) y no
 *   cambia de contrato ni de concepto entre versiones.
 * - El valor asegurado no se guarda: base del concepto × porcentaje, con la
 *   base copiada del tipo al emitir cada versión (ADR-0019, decisión 7).
 * - Modificar emite una versión nueva y cierra la anterior en la misma
 *   transacción; una sola vigente (UNIQUE). Anular cierra la vigente con
 *   motivo y observación. Nada se elimina.
 * - Estado del contrato (ADR-0017, efectos por estado; STATE_ALLOWS): en
 *   ejecución y suspendido, registrar, renovar y anular; en liquidación,
 *   renovar y amparar el otrosí de liquidación; liquidado, solo consulta.
 *   Bloqueo: contrato → póliza → maestros (LOCK_ORDER).
 */

const text = (value) => String(value ?? "").trim();
const optionalText = (value) => text(value) || null;

const POLICY_AUDITED = [
  "ccp_id",
  "plt_id",
  "ins_id",
  "pol_number",
  "pol_base",
  "pol_percentage",
  "pol_start_date",
  "pol_end_date",
  "pol_observation",
  "pol_version",
  "pol_is_current",
  "rea_id",
  "pol_cancel_observation",
];

const auditable = (values) =>
  Object.fromEntries(
    Object.entries(values).map(([column, value]) => {
      if (value instanceof Date) return [column, dateOnlyText(value)];
      if (column === "pol_percentage" && value != null) return [column, percentText(value)];
      return [column, value];
    })
  );

const conceptLabel = (concept) => `${CONCEPT_TYPE_NAMES[concept.ccp_type]}${concept.ccp_number ? ` N.º ${concept.ccp_number}` : ""}`;

/** Datos de una versión que llegan del cliente → columnas. Nunca la base ni el valor asegurado (ADR-0018, "Seguridad"). */
const policyValuesOf = (input) => {
  const values = {
    plt_id: Number(input.pltId),
    ins_id: Number(input.insId),
    pol_number: text(input.number),
    pol_percentage: toPercent(input.percentage),
    pol_start_date: input.startDate ? toDateOnly(input.startDate) : null,
    pol_end_date: input.endDate ? toDateOnly(input.endDate) : null,
    pol_observation: optionalText(input.observation),
  };
  if (!values.pol_number) throw httpError(400, "El número de la póliza es requerido.");
  if (!values.pol_percentage.gt(0) || values.pol_percentage.gt(100)) throw httpError(400, "El porcentaje debe ser mayor que 0 y hasta 100.");
  if (input.startDate && !values.pol_start_date) throw httpError(400, "La fecha de inicio de vigencia no es válida.");
  if (input.endDate && !values.pol_end_date) throw httpError(400, "La fecha fin de vigencia no es válida.");
  if (values.pol_start_date && values.pol_end_date && values.pol_end_date < values.pol_start_date) {
    throw httpError(400, "La fecha fin de vigencia no puede ser anterior a la de inicio.");
  }
  return values;
};

const POLICY_TARGET = {
  model: prisma.tbl_policies,
  keyField: "pol_idempotency_key",
  hashField: "pol_idempotency_hash",
  ownerField: "pol_create_by",
  select: { pol_id: true, pol_root_id: true, pol_version: true },
  toResult: (row) => ({
    message: row.pol_version > 1 ? "Póliza modificada correctamente" : "Póliza registrada correctamente",
    polId: row.pol_id,
    rootId: row.pol_root_id,
  }),
};

/**
 * Tipo y aseguradora asignables, bajo bloqueo (DEC-019). Un valor inactivo
 * solo se acepta si la versión anterior ya lo tenía (DOM-21). Devuelve la base
 * del tipo, que la versión copia.
 */
const assertMasters = async (tx, values, before = null) => {
  const type = await policyTypesService.assertAssignable(tx, values.plt_id, before?.plt_id);
  await insurersService.assertAssignable(tx, values.ins_id, before?.ins_id);
  return type.plt_base;
};

/**
 * Registrar una póliza sobre un concepto del contrato. Idempotente por clave
 * (DEC-016).
 */
export const createPolicy = async ({ ctrId, input, useBy, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  await assertContractInScope(scope, ctrId);
  const values = policyValuesOf(input);
  const ccpId = Number(input.ccpId);

  return runIdempotent({
    target: POLICY_TARGET,
    key: idempotencyKey,
    ownerId: useBy,
    payload: { ctrId: Number(ctrId), ccpId, ...auditable(values) },
    execute: (idempotencyData) =>
      withLockedTransaction({ CONTRATO: ctrId, ASEGURADORA: values.ins_id, TIPO_POLIZA: values.plt_id }, async (tx) => {
        const contract = await findLockedContract(tx, ctrId);
        const concept = await tx.tbl_contract_concepts.findUnique({
          where: { ccp_id: ccpId },
          select: { ctr_id: true, ccp_type: true, sta_id: true },
        });
        if (!concept || concept.ctr_id !== contract.ctr_id || concept.sta_id === DELETED_STATUS) {
          throw httpError(400, "El concepto amparado no es de este contrato.");
        }
        // En liquidación solo se ampara el otrosí de liquidación, que nace en ese estado.
        const liquidation = concept.ccp_type === CONCEPT_TYPES.LIQUIDATION && contract.ctr_state === CONTRACT_STATES.IN_LIQUIDATION;
        assertStateAllows(contract.ctr_state, liquidation ? "createLiquidationPolicy" : "createPolicy");
        const base = await assertMasters(tx, values);

        const data = { ...values, ctr_id: contract.ctr_id, ccp_id: ccpId, pol_base: base, pol_version: 1, pol_is_current: true };
        const created = await tx.tbl_policies.create({
          data: { ...data, pol_create_by: Number(useBy), pol_update_by: Number(useBy), ...idempotencyData },
        });
        // La primera versión es la raíz de la póliza: sus versiones la referencian.
        await tx.tbl_policies.update({ where: { pol_id: created.pol_id }, data: { pol_root_id: created.pol_id } });

        await writeAudit(tx, {
          operationId: newOperationId(),
          entity: AUDIT_ENTITIES.POLICY,
          recordId: created.pol_id,
          operation: AUDIT_OPERATIONS.CREATE,
          ctx,
          changes: diffFields({}, auditable(data), POLICY_AUDITED),
        });
        return { message: "Póliza registrada correctamente", polId: created.pol_id, rootId: created.pol_id };
      }),
  });
};

/** El contrato de una versión no cambia: leerlo antes del bloqueo solo dice qué contrato bloquear primero (ADR-0027, regla 3). */
const knownPolicy = async (scope, polId) => {
  const known = await prisma.tbl_policies.findUnique({ where: { pol_id: Number(polId) }, select: { ctr_id: true } });
  if (!known) throw httpError(404, "No se encontró la póliza.");
  await assertContractInScope(scope, known.ctr_id);
  return known;
};

const POLICY_LOCKED_SELECT = {
  pol_id: true,
  pol_root_id: true,
  pol_version: true,
  pol_is_current: true,
  ctr_id: true,
  ccp_id: true,
  plt_id: true,
  ins_id: true,
  pol_number: true,
  pol_base: true,
  pol_percentage: true,
  pol_start_date: true,
  pol_end_date: true,
  pol_observation: true,
};

/** La versión vigente, ya bloqueada; 409 si se cerró (otra versión o anulada) mientras tanto. */
const findCurrentLocked = async (tx, polId, ctrId) => {
  const before = await tx.tbl_policies.findUnique({ where: { pol_id: Number(polId) }, select: POLICY_LOCKED_SELECT });
  if (!before || before.ctr_id !== ctrId) throw httpError(404, "No se encontró la póliza.");
  if (!before.pol_is_current) throw httpError(409, "La póliza ya no es la versión vigente: se modificó o se anuló. Actualiza la vista.");
  return before;
};

/**
 * Modificar una póliza: emite la versión siguiente y cierra la vigente, en
 * una transacción (ADR-0018, decisión 7). El concepto no cambia. La versión
 * nueva copia la base vigente de su tipo: es una emisión nueva. Idempotente
 * por clave.
 */
export const createPolicyVersion = async ({ polId, input, useBy, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  const known = await knownPolicy(scope, polId);
  const values = policyValuesOf(input);

  return runIdempotent({
    target: POLICY_TARGET,
    key: idempotencyKey,
    ownerId: useBy,
    payload: { polId: Number(polId), ...auditable(values) },
    execute: (idempotencyData) =>
      withLockedTransaction(
        { CONTRATO: known.ctr_id, POLIZA: polId, ASEGURADORA: values.ins_id, TIPO_POLIZA: values.plt_id },
        async (tx) => {
          const contract = await findLockedContract(tx, known.ctr_id);
          assertStateAllows(contract.ctr_state, "renewPolicy");
          const before = await findCurrentLocked(tx, polId, contract.ctr_id);
          const base = await assertMasters(tx, values, before);

          const next = { ...values, pol_base: base };
          const changes = diffFields(auditable(before), auditable(next), POLICY_AUDITED);
          if (changes.length === 0) throw httpError(400, "No hay cambios: la versión nueva sería igual a la vigente.");

          // Primero se cierra la vigente: el UNIQUE admite una sola por póliza.
          await tx.tbl_policies.update({
            where: { pol_id: before.pol_id },
            data: { pol_is_current: false, pol_closed_at: new Date(), pol_closed_by: Number(useBy), pol_update_by: Number(useBy) },
          });
          const created = await tx.tbl_policies.create({
            data: {
              ...next,
              pol_root_id: before.pol_root_id,
              pol_version: before.pol_version + 1,
              pol_is_current: true,
              ctr_id: before.ctr_id,
              ccp_id: before.ccp_id,
              pol_create_by: Number(useBy),
              pol_update_by: Number(useBy),
              ...idempotencyData,
            },
          });

          await writeAudit(tx, {
            operationId: newOperationId(),
            entity: AUDIT_ENTITIES.POLICY,
            recordId: before.pol_root_id,
            operation: AUDIT_OPERATIONS.UPDATE,
            ctx,
            changes: [...changes, { field: "pol_version", oldValue: before.pol_version, newValue: before.pol_version + 1 }],
          });
          return { message: "Póliza modificada correctamente", polId: created.pol_id, rootId: before.pol_root_id };
        }
      ),
  });
};

/**
 * Anular una póliza: cierra la versión vigente con motivo del catálogo
 * (ámbito POLICY_CANCEL) y observación. Fija un estado final: reintentable.
 */
export const cancelPolicy = async ({ polId, reaId, observation, useBy, scope, ctx = { useId: useBy } }) => {
  const known = await knownPolicy(scope, polId);
  const note = text(observation);
  if (!note) throw httpError(400, "La observación de la anulación es requerida.");

  return withLockedTransaction(
    { CONTRATO: known.ctr_id, POLIZA: polId, MOTIVO: reaId },
    async (tx) => {
      const contract = await findLockedContract(tx, known.ctr_id);
      assertStateAllows(contract.ctr_state, "cancelPolicy");
      const before = await findCurrentLocked(tx, polId, contract.ctr_id);
      const reason = await reasonsService.assertAssignable(tx, reaId);
      if (reason.rea_scope !== REASON_SCOPES.POLICY_CANCEL) throw httpError(400, "El motivo seleccionado no es de anulación de póliza.");

      const data = { pol_is_current: false, rea_id: Number(reaId), pol_cancel_observation: note };
      await tx.tbl_policies.update({
        where: { pol_id: before.pol_id },
        data: { ...data, pol_closed_at: new Date(), pol_closed_by: Number(useBy), pol_update_by: Number(useBy) },
      });
      await writeAudit(tx, {
        operationId: newOperationId(),
        entity: AUDIT_ENTITIES.POLICY,
        recordId: before.pol_root_id,
        operation: AUDIT_OPERATIONS.UPDATE,
        ctx,
        changes: diffFields(auditable(before), auditable(data), POLICY_AUDITED),
      });
      return { message: "Póliza anulada correctamente", polId: before.pol_id };
    },
    { idempotent: true }
  );
};

// ─── Consulta ────────────────────────────────────────────────────────────────

const VERSION_SELECT = {
  ...POLICY_LOCKED_SELECT,
  pol_closed_at: true,
  pol_cancel_observation: true,
  pol_create_at: true,
  tbl_policy_types: { select: { plt_name: true } },
  tbl_insurers: { select: { ins_description: true } },
  tbl_reasons: { select: { rea_name: true } },
  created_by_user: USER_NAME_SELECT,
  closed_by_user: USER_NAME_SELECT,
};

const versionDto = (row, amounts) => ({
  polId: row.pol_id,
  version: row.pol_version,
  isCurrent: row.pol_is_current,
  pltId: row.plt_id,
  typeName: row.tbl_policy_types?.plt_name ?? null,
  insId: row.ins_id,
  insurerName: row.tbl_insurers?.ins_description ?? null,
  number: row.pol_number,
  base: row.pol_base,
  baseName: POLICY_BASE_NAMES[row.pol_base] ?? row.pol_base,
  percentage: percentText(row.pol_percentage),
  baseValue: amounts ? moneyText(policyBaseValue(row.pol_base, amounts)) : null,
  insuredValue: amounts ? moneyText(insuredValue(row.pol_base, row.pol_percentage, amounts)) : null,
  startDate: dateOnlyText(row.pol_start_date),
  endDate: dateOnlyText(row.pol_end_date),
  observation: row.pol_observation,
  createdAt: row.pol_create_at,
  createdByName: userFullName(row.created_by_user),
  closedAt: row.pol_closed_at,
  closedByName: userFullName(row.closed_by_user),
  cancelReasonName: row.tbl_reasons?.rea_name ?? null,
  cancelObservation: row.pol_cancel_observation,
});

/**
 * Pólizas del contrato agrupadas por póliza, la última versión primero, con
 * el valor asegurado calculado sobre la composición vigente del concepto, la
 * vigencia contra la fecha del servidor y los conceptos sin póliza vigente.
 */
export const getContractPolicies = async ({ ctrId, scope }) => {
  await assertContractInScope(scope, ctrId);
  const contract = await prisma.tbl_contracts.findFirst({
    where: { ctr_id: Number(ctrId), sta_id: { not: DELETED_STATUS } },
    select: {
      ctr_id: true,
      tbl_contract_concepts: { select: CONCEPT_SELECT },
      tbl_policies: { select: VERSION_SELECT, orderBy: [{ pol_root_id: "asc" }, { pol_version: "desc" }] },
    },
  });
  if (!contract) throw httpError(404, "No se encontró el contrato.");

  const concepts = sortConcepts(contract.tbl_contract_concepts.filter((c) => c.sta_id !== DELETED_STATUS));
  const byConcept = new Map(concepts.map((c) => [c.ccp_id, { concept: c, amounts: conceptAmounts(c) }]));
  const days = expiringDays();

  const groups = new Map();
  for (const row of contract.tbl_policies) {
    if (!groups.has(row.pol_root_id)) groups.set(row.pol_root_id, []);
    groups.get(row.pol_root_id).push(row);
  }

  const policies = [...groups.entries()].map(([rootId, versions]) => {
    const latest = versions[0];
    const entry = byConcept.get(latest.ccp_id);
    const cancelled = !latest.pol_is_current;
    const validity = cancelled ? null : policyValidity(latest.pol_end_date, { days });
    return {
      rootId,
      ccpId: latest.ccp_id,
      conceptLabel: entry ? conceptLabel(entry.concept) : null,
      conceptValue: entry ? moneyText(entry.amounts.value) : null,
      status: cancelled ? "CANCELLED" : "CURRENT",
      statusName: cancelled ? "Anulada" : "Vigente",
      validity,
      validityName: validity ? POLICY_VALIDITY_NAMES[validity] : null,
      ...versionDto(latest, entry?.amounts),
      versions: versions.map((row) => versionDto(row, entry?.amounts)),
    };
  });

  const current = contract.tbl_policies.filter((p) => p.pol_is_current);
  return {
    policies,
    uncoveredConcepts: uncoveredConcepts(concepts, current).map((c) => ({
      ccpId: c.ccp_id,
      label: conceptLabel(c),
      value: moneyText(conceptAmounts(c).value),
    })),
    concepts: concepts.map((c) => ({ ccpId: c.ccp_id, type: c.ccp_type, label: conceptLabel(c), value: moneyText(conceptAmounts(c).value) })),
    expiringDays: days,
  };
};
