import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { defineMaster, createMasterService } from "../../../common/services/master.service.js";

// Maestro de tipos de interventoría (ADR-0007, DEC-017). Nombre y estado; no
// sabe nada de obras ni contratos. Nivel 1: auditoría técnica.
export const supervisionTypesConfig = defineMaster({
  model: "tbl_supervision_types",
  prefix: "spt",
  idField: "sptId",
  lockEntity: "TIPO_INTERVENTORIA",
  label: "tipo de interventoría",
  routes: { entity: "supervision_type", plural: "supervision_types" },
  permissions: PERMISSIONS.admin.supervisionTypes,
  fields: [{ name: "name", column: "spt_name", label: "nombre", maxLength: 100, unique: true, filter: true, sortable: true }],
  defaultSort: "name",
  selectOrder: "name",
  // ADR-0007, decisión 5. El tipo se ancla a la obra (DEC-027).
  dependents: [{ model: "tbl_works", column: "spt_id", label: "obra(s)" }],
  socketEvent: "refresh-supervision-types",
});

export const supervisionTypesService = createMasterService(supervisionTypesConfig);
