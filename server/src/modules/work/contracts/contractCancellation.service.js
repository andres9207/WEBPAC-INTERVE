import { prisma } from "../../../common/configs/prismaClient.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, newOperationId, writeAudit } from "../../../common/services/audit.service.js";
import { reasonsService, REASON_SCOPES } from "../../admin/reasons/reasons.service.js";
import { STATE_NAMES, assertStateAllows, assertTransition, historyRow } from "./contractTerms.js";
import { assertContractInScope, findLockedContract, httpError } from "./contracts.service.js";
import { contractLabel, notifyWorkManagers } from "./contractNotifications.service.js";

/**
 * Anular un contrato (DEC-082). Transición manual con permiso propio, desde
 * cualquier estado y también con facturas aprobadas, con un motivo del
 * catálogo (ámbito de anulación de contrato) y una observación obligatoria.
 * Anulado es un estado final: el contrato solo se consulta, y sus facturas,
 * pólizas y suspensiones quedan como estaban, como evidencia.
 */

const text = (value) => String(value ?? "").trim();

// La clave de una transición manual va en el historial de estado (DEC-016,
// migración 0051): repetir la petición devuelve el mismo resultado.
const CANCEL_TARGET = {
  model: prisma.tbl_contract_status_history,
  keyField: "csh_idempotency_key",
  hashField: "csh_idempotency_hash",
  ownerField: "csh_create_by",
  select: { ctr_id: true },
  toResult: (row) => ({ message: "Contrato anulado correctamente", ctrId: row.ctr_id }),
};

/** Anula el contrato. Bloquea contrato → motivo (DEC-019): nadie elimina el motivo mientras se asigna. */
export const cancelContract = async ({ ctrId, input, useBy, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  await assertContractInScope(scope, ctrId);
  const reaId = Number(input.reaId);
  const observation = text(input.observation);
  if (!observation) throw httpError(400, "La observación es requerida.");

  return runIdempotent({
    target: CANCEL_TARGET,
    key: idempotencyKey,
    ownerId: useBy,
    payload: { ctrId: Number(ctrId), reaId, observation },
    execute: async (idempotencyData) => {
      const { reasonName, fromState, ...result } = await withLockedTransaction({ CONTRATO: ctrId, MOTIVO: reaId }, async (tx) => {
        const contract = await findLockedContract(tx, ctrId);
        assertStateAllows(contract.ctr_state, "cancelContract");
        const { to: nextState } = assertTransition("cancel", contract.ctr_state);

        const reason = await reasonsService.assertAssignable(tx, reaId);
        if (reason.rea_scope !== REASON_SCOPES.CONTRACT_CANCEL) throw httpError(400, "El motivo seleccionado no es de anulación de contrato.");

        await tx.tbl_contracts.update({
          where: { ctr_id: contract.ctr_id },
          data: { ctr_state: nextState, ctr_update_by: Number(useBy) },
        });
        await tx.tbl_contract_status_history.create({
          data: {
            ...historyRow({
              ctrId: contract.ctr_id,
              transition: "cancel",
              fromState: contract.ctr_state,
              useBy: Number(useBy),
              reaId,
              observation: `Anulado: ${reason.rea_name}. ${observation}`.slice(0, 500),
            }),
            ...idempotencyData,
          },
        });
        await writeAudit(tx, {
          operationId: newOperationId(),
          entity: AUDIT_ENTITIES.CONTRACT,
          recordId: contract.ctr_id,
          operation: AUDIT_OPERATIONS.UPDATE,
          ctx,
          changes: [
            { field: "ctr_state", oldValue: contract.ctr_state, newValue: nextState },
            { field: "rea_id", oldValue: null, newValue: reaId },
            { field: "observacion_anulacion", oldValue: null, newValue: observation },
          ],
        });

        return { message: "Contrato anulado correctamente", ctrId: contract.ctr_id, reasonName: reason.rea_name, fromState: contract.ctr_state };
      });

      // Después del COMMIT (ADR-0027).
      await notifyWorkManagers({
        ctrId,
        actorId: useBy,
        title: "Contrato anulado",
        action: "cancel",
        type: "alert",
        buildMessage: (contract) =>
          `El contrato ${contractLabel(contract)} fue anulado (estaba ${STATE_NAMES[fromState].toLowerCase()}). Motivo: ${reasonName}.`,
      });
      return result;
    },
  });
};
