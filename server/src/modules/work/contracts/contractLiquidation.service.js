import { DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, newOperationId, writeAudit } from "../../../common/services/audit.service.js";
import { INVOICE_STATES, INVOICE_TYPES } from "../../billing/invoices/invoiceTerms.js";
import { CONCEPT_TYPES, CONCEPT_TYPE_NAMES, CONTRACT_STATES, historyRow, sortConcepts } from "./contractTerms.js";
import { uncoveredConcepts } from "./policyTerms.js";
import { liquidationConditions, unmetConditions } from "./liquidationTerms.js";
import { contractLabel, notifyWorkManagers } from "./contractNotifications.service.js";

/**
 * Liquidación automática del contrato (ADR-0017, DEC-081). Tras cada hecho
 * que puede completar las condiciones (aprobar, anular o eliminar una
 * factura, modificar el otrosí de liquidación, registrar o renovar una
 * póliza) y en su misma transacción, con el contrato ya bloqueado, se evalúan
 * las condiciones (liquidationTerms.js). Si se cumplen todas las que
 * bloquean, el contrato pasa a liquidado con su historial (origen
 * automático) y una foto de las condiciones en la bitácora.
 *
 * Los saldos llegan como función (`contractBalances` del service de facturas)
 * y no se importan: el service de facturas llama a este, y así no hay ciclo
 * entre los dos módulos. Son los mismos saldos del expediente y de la
 * conciliación (ningún cálculo propio).
 */

const conceptLabel = (concept) => `${CONCEPT_TYPE_NAMES[concept.ccp_type]}${concept.ccp_number ? ` N.º ${concept.ccp_number}` : ""}`;

const contractInvoices = (ctrId, where) => ({ ctr_id: ctrId, sta_id: { not: DELETED_STATUS }, ...where });

/** Los hechos del contrato que piden las condiciones, leídos con `db` (el tx del evento, o prisma para consultar). */
export const liquidationFacts = async (db, ctrId, contractBalances) => {
  const id = Number(ctrId);
  // En serie: dentro de una transacción interactiva van por la misma conexión.
  const concepts = sortConcepts(
    await db.tbl_contract_concepts.findMany({
      where: { ctr_id: id, sta_id: { not: DELETED_STATUS } },
      select: { ccp_id: true, ccp_type: true, ccp_number: true },
    })
  );
  const currentPolicies = await db.tbl_policies.findMany({ where: { ctr_id: id, pol_is_current: true }, select: { ccp_id: true } });
  const approvedLiquidations = await db.tbl_invoices.count({
    where: contractInvoices(id, { inv_type: INVOICE_TYPES.LIQUIDATION, inv_state: INVOICE_STATES.APPROVED }),
  });
  const pendingInvoices = await db.tbl_invoices.count({ where: contractInvoices(id, { inv_state: INVOICE_STATES.REGISTERED }) });
  const openSuspension = await db.tbl_contract_suspensions.count({ where: { ctr_id: id, csp_lift_date: null } });
  const reportSuspensions = await db.tbl_contract_suspensions.count({ where: { ctr_id: id, csp_requires_report: true } });
  const balances = await contractBalances(db, id);
  return {
    hasLiquidationConcept: concepts.some((c) => c.ccp_type === CONCEPT_TYPES.LIQUIDATION),
    balances,
    approvedLiquidations,
    pendingInvoices,
    openSuspension: openSuspension > 0,
    reportSuspensions,
    uncoveredConcepts: uncoveredConcepts(concepts, currentPolicies).map(conceptLabel),
  };
};

/**
 * Evalúa y, si se cumplen todas, liquida. Solo actúa sobre un contrato en
 * liquidación; en otro estado devuelve null sin consultar nada. Devuelve
 * `{ liquidated, conditions }`. Lanza solo por un error de la BD: el hecho
 * que la invocó ya es válido, y una condición que falla no es un error.
 */
export const evaluateLiquidation = async (tx, { ctrId, useBy, ctx, contractBalances }) => {
  const contract = await tx.tbl_contracts.findUnique({ where: { ctr_id: Number(ctrId) }, select: { ctr_id: true, ctr_state: true } });
  if (contract?.ctr_state !== CONTRACT_STATES.IN_LIQUIDATION) return null;

  const conditions = liquidationConditions(await liquidationFacts(tx, contract.ctr_id, contractBalances));
  if (unmetConditions(conditions).length > 0) return { liquidated: false, conditions };

  const history = historyRow({
    ctrId: contract.ctr_id,
    transition: "liquidate",
    fromState: contract.ctr_state,
    useBy: Number(useBy),
    observation: "Condiciones de liquidación cumplidas.",
  });
  await tx.tbl_contracts.update({ where: { ctr_id: contract.ctr_id }, data: { ctr_state: history.csh_to_state, ctr_update_by: Number(useBy) } });
  await tx.tbl_contract_status_history.create({ data: history });
  await writeAudit(tx, {
    operationId: newOperationId(),
    entity: AUDIT_ENTITIES.CONTRACT,
    recordId: contract.ctr_id,
    operation: AUDIT_OPERATIONS.UPDATE,
    ctx,
    changes: [
      { field: "ctr_state", oldValue: contract.ctr_state, newValue: history.csh_to_state },
      // La foto de las condiciones con que se liquidó (C7 puede no cumplirse: no bloquea).
      ...conditions.map((c) => ({ field: `liquidation_${c.key}`, oldValue: null, newValue: c.met ? "Cumple" : (c.detail ?? "No cumple") })),
    ],
  });
  return { liquidated: true, conditions };
};

/** Aviso a los responsables de la obra, después del COMMIT y sin garantía de entrega (ADR-0027). Nunca lanza. */
export const notifyLiquidated = ({ ctrId, actorId }) =>
  notifyWorkManagers({
    ctrId,
    actorId,
    title: "Contrato liquidado",
    action: "liquidate",
    type: "success",
    buildMessage: (contract) => `El contrato ${contractLabel(contract)} cumplió las condiciones de liquidación y quedó liquidado.`,
  });
