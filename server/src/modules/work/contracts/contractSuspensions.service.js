import { prisma } from "../../../common/configs/prismaClient.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { dateOnlyText, toDateOnly, todayDateOnly } from "../../../common/utils/term.utils.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, newOperationId, writeAudit } from "../../../common/services/audit.service.js";
import { reasonsService, REASON_SCOPES } from "../../admin/reasons/reasons.service.js";
import { CONTRACT_STATES, STATE_NAMES, assertStateAllows, assertTransition, historyRow, suspendedDaysBetween } from "./contractTerms.js";
import { findLockedContract, httpError } from "./contracts.service.js";

/**
 * Suspensiones de contrato (ADR-0017, decisiones 3, 8 y 9; DEC-039).
 *
 * - Suspender es una transición manual con permiso propio, solo desde
 *   ejecución. Captura motivo, fecha, condición de levantamiento,
 *   observación y si genera informe de interventoría, y guarda el estado del
 *   que viene.
 * - No hay endpoint de levantar: lo hace el otrosí que reanuda el contrato,
 *   en su misma transacción (liftWithAmendment), con el permiso de levantar.
 *   Al cerrar se suman los días suspendidos al contrato y se recalcula la
 *   fecha fin con la función única (contractEndDate).
 * - Una sola suspensión abierta por contrato: lo verifica el service bajo el
 *   bloqueo del contrato y lo garantiza el UNIQUE de la BD.
 * - Las suspensiones no se editan ni se eliminan.
 */

const text = (value) => String(value ?? "").trim();
const optionalText = (value) => text(value) || null;

const SUSPENSION_AUDITED = [
  "rea_id",
  "csp_suspension_date",
  "csp_lift_condition",
  "csp_observation",
  "csp_requires_report",
  "csp_previous_state",
  "csp_lift_date",
  "csp_days",
  "ccp_id",
];

const auditable = (values) =>
  Object.fromEntries(
    Object.entries(values).map(([column, value]) => [column, value instanceof Date ? dateOnlyText(value) : value])
  );

/** La suspensión abierta del contrato, o null. Con el contrato ya bloqueado. */
export const findOpenSuspension = (tx, ctrId) =>
  tx.tbl_contract_suspensions.findFirst({
    where: { ctr_id: Number(ctrId), csp_lift_date: null },
    select: { csp_id: true, csp_suspension_date: true, csp_previous_state: true, rea_id: true },
  });

/** Fecha "AAAA-MM-DD" válida y no futura, como Date de una columna DATE; 400 si no. */
const pastDate = (value, label) => {
  const date = toDateOnly(value);
  if (!date) throw httpError(400, `La ${label} no es una fecha válida.`);
  if (date.getTime() > todayDateOnly().getTime()) throw httpError(400, `La ${label} no puede ser futura.`);
  return date;
};

// La clave de una transición manual va en el historial de estado (DEC-016,
// migración 0051): repetir la petición devuelve el mismo resultado.
const SUSPEND_TARGET = {
  model: prisma.tbl_contract_status_history,
  keyField: "csh_idempotency_key",
  hashField: "csh_idempotency_hash",
  ownerField: "csh_create_by",
  select: { ctr_id: true },
  toResult: (row) => ({ message: "Contrato suspendido correctamente", ctrId: row.ctr_id }),
};

/**
 * Suspender un contrato en ejecución. Bloquea contrato → motivo (DEC-019):
 * nadie elimina el motivo mientras se asigna.
 */
export const suspendContract = async ({ ctrId, input, useBy, ctx = { useId: useBy }, idempotencyKey }) => {
  const requested = {
    rea_id: Number(input.reaId),
    csp_suspension_date: pastDate(input.suspensionDate, "fecha de suspensión"),
    csp_lift_condition: text(input.liftCondition),
    csp_observation: optionalText(input.observation),
    csp_requires_report: Boolean(input.requiresReport),
  };
  if (!requested.csp_lift_condition) throw httpError(400, "La condición de levantamiento es requerida.");

  return runIdempotent({
    target: SUSPEND_TARGET,
    key: idempotencyKey,
    ownerId: useBy,
    payload: { ctrId: Number(ctrId), ...auditable(requested) },
    execute: (idempotencyData) =>
      withLockedTransaction({ CONTRATO: ctrId, MOTIVO: requested.rea_id }, async (tx) => {
        const contract = await findLockedContract(tx, ctrId);
        assertStateAllows(contract.ctr_state, "suspend");
        const { to: nextState } = assertTransition("suspend", contract.ctr_state);

        const reason = await reasonsService.assertAssignable(tx, requested.rea_id);
        if (reason.rea_scope !== REASON_SCOPES.SUSPENSION) throw httpError(400, "El motivo seleccionado no es de suspensión.");

        if (requested.csp_suspension_date.getTime() < new Date(dateOnlyText(contract.ctr_start_date)).getTime()) {
          throw httpError(400, `La fecha de suspensión no puede ser anterior al inicio del contrato (${dateOnlyText(contract.ctr_start_date)}).`);
        }
        if (await findOpenSuspension(tx, contract.ctr_id)) throw httpError(409, "El contrato ya tiene una suspensión abierta.");

        const data = { ...requested, ctr_id: contract.ctr_id, csp_previous_state: contract.ctr_state };
        const created = await tx.tbl_contract_suspensions.create({
          data: { ...data, csp_create_by: Number(useBy), csp_update_by: Number(useBy) },
        });
        await tx.tbl_contracts.update({
          where: { ctr_id: contract.ctr_id },
          data: { ctr_state: nextState, ctr_update_by: Number(useBy) },
        });
        await tx.tbl_contract_status_history.create({
          data: {
            ...historyRow({
              ctrId: contract.ctr_id,
              transition: "suspend",
              fromState: contract.ctr_state,
              useBy: Number(useBy),
              observation: `Suspendido: ${reason.rea_name}.`,
            }),
            ...idempotencyData,
          },
        });

        const operationId = newOperationId();
        await writeAudit(tx, {
          operationId,
          entity: AUDIT_ENTITIES.CONTRACT_SUSPENSION,
          recordId: created.csp_id,
          operation: AUDIT_OPERATIONS.CREATE,
          ctx,
          changes: diffFields({}, auditable(data), SUSPENSION_AUDITED),
        });
        await writeAudit(tx, {
          operationId,
          entity: AUDIT_ENTITIES.CONTRACT,
          recordId: contract.ctr_id,
          operation: AUDIT_OPERATIONS.UPDATE,
          ctx,
          changes: [{ field: "ctr_state", oldValue: contract.ctr_state, newValue: nextState }],
        });

        return { message: "Contrato suspendido correctamente", ctrId: contract.ctr_id };
      }),
  });
};

/**
 * Cierra la suspensión abierta con el otrosí que reanuda el contrato, dentro
 * de la transacción del otrosí y con el contrato ya bloqueado (DEC-039).
 * Exige el permiso de levantar. Devuelve el contrato con los datos nuevos
 * (estado y días suspendidos), para recalcular la fecha fin, y los cambios
 * para la bitácora del contrato. Si el contrato no está suspendido, no hace
 * nada.
 */
export const liftWithAmendment = async (tx, { contract, liftDate, ccpId, useBy, granted, ctx, operationId }) => {
  if (contract.ctr_state !== CONTRACT_STATES.SUSPENDED) return { contract, changes: [] };
  if (!granted?.has(PERMISSIONS.work.contracts.liftSuspension)) {
    throw httpError(403, "El contrato está suspendido: registrar este otrosí lo reanuda, y no tienes permiso para levantar suspensiones.");
  }
  if (!liftDate) throw httpError(400, "El contrato está suspendido: indica la fecha de reanudación.");
  const lift = pastDate(liftDate, "fecha de reanudación");

  const open = await findOpenSuspension(tx, contract.ctr_id);
  if (!open) throw httpError(409, `El contrato figura como ${STATE_NAMES.SUSPENDED.toLowerCase()} pero no tiene una suspensión abierta.`);
  if (lift.getTime() < new Date(dateOnlyText(open.csp_suspension_date)).getTime()) {
    throw httpError(400, `La fecha de reanudación no puede ser anterior a la suspensión (${dateOnlyText(open.csp_suspension_date)}).`);
  }
  const { to: nextState } = assertTransition("resume", contract.ctr_state, { previousState: open.csp_previous_state });

  const days = suspendedDaysBetween(open.csp_suspension_date, lift);
  const closing = { csp_lift_date: lift, csp_days: days, ccp_id: ccpId };
  await tx.tbl_contract_suspensions.update({ where: { csp_id: open.csp_id }, data: { ...closing, csp_update_by: Number(useBy) } });

  const suspendedDays = contract.ctr_suspended_days + days;
  await tx.tbl_contracts.update({
    where: { ctr_id: contract.ctr_id },
    data: { ctr_state: nextState, ctr_suspended_days: suspendedDays, ctr_update_by: Number(useBy) },
  });
  await tx.tbl_contract_status_history.create({
    data: historyRow({
      ctrId: contract.ctr_id,
      transition: "resume",
      fromState: contract.ctr_state,
      previousState: open.csp_previous_state,
      useBy: Number(useBy),
      observation: `Reanudado con otrosí. ${days} día(s) suspendido(s).`,
    }),
  });
  await writeAudit(tx, {
    operationId,
    entity: AUDIT_ENTITIES.CONTRACT_SUSPENSION,
    recordId: open.csp_id,
    operation: AUDIT_OPERATIONS.UPDATE,
    ctx,
    changes: diffFields({}, auditable(closing), SUSPENSION_AUDITED),
  });

  return {
    contract: { ...contract, ctr_state: nextState, ctr_suspended_days: suspendedDays },
    changes: [
      { field: "ctr_state", oldValue: contract.ctr_state, newValue: nextState },
      { field: "ctr_suspended_days", oldValue: contract.ctr_suspended_days, newValue: suspendedDays },
    ],
  };
};
