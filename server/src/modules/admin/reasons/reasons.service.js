import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { defineMaster, createMasterService } from "../../../common/services/master.service.js";

/**
 * Actos a los que puede aplicar un motivo (`rea_scope`, dominio cerrado con
 * CHECK en la migración 0060, ampliado en 0068 y 0080). Reabrir un contrato o anular
 * un otrosí agregarán aquí su ámbito, junto con el CHECK.
 */
export const REASON_SCOPES = Object.freeze({ SUSPENSION: "SUSPENSION", INVOICE_CANCEL: "INVOICE_CANCEL", POLICY_CANCEL: "POLICY_CANCEL" });

// Maestro de motivos (ADR-0017, DEC-039). Un solo catálogo para las
// transiciones manuales, dividido por ámbito: el nombre es único dentro de su
// ámbito y el selector devuelve solo los del ámbito pedido. Nivel 1:
// auditoría técnica.
export const reasonsConfig = defineMaster({
  model: "tbl_reasons",
  prefix: "rea",
  idField: "reaId",
  lockEntity: "MOTIVO",
  label: "motivo",
  routes: { entity: "reason", plural: "reasons" },
  permissions: PERMISSIONS.admin.reasons,
  fields: [
    // El ámbito se fija al crear: un motivo ya usado no cambia de acto.
    { name: "scope", column: "rea_scope", label: "acto", maxLength: 20, options: Object.values(REASON_SCOPES), editable: false, filter: true, sortable: true },
    { name: "name", column: "rea_name", label: "nombre", maxLength: 100, unique: true, filter: true, sortable: true },
  ],
  scopeField: "scope",
  defaultSort: "name",
  selectOrder: "name",
  selectLabel: (row) => row.rea_name,
  // Las suspensiones y las anulaciones son historial: cuentan aunque el
  // contrato se elimine.
  dependents: [
    { model: "tbl_contract_suspensions", column: "rea_id", label: "suspensión(es) de contrato", countDeleted: true },
    { model: "tbl_invoice_status_history", column: "rea_id", label: "anulación(es) de factura", countDeleted: true },
    { model: "tbl_policies", column: "rea_id", label: "anulación(es) de póliza", countDeleted: true },
  ],
  socketEvent: "refresh-reasons",
});

export const reasonsService = createMasterService(reasonsConfig);
