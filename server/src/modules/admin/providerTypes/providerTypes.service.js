import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { defineMaster, createMasterService } from "../../../common/services/master.service.js";

// Maestro de tipos de proveedor (ADR-0010, DEC-017). DEC-10 del backlog,
// resuelta: el tipo es una clasificación de la empresa, sin reglas ni campos
// propios. Si algún día condiciona campos, se modela con la configuración
// de campos de ADR-0006, no con condicionales. Nivel 1: auditoría técnica.
export const providerTypesConfig = defineMaster({
  model: "tbl_provider_types",
  prefix: "pvt",
  idField: "pvtId",
  lockEntity: "TIPO_PROVEEDOR",
  label: "tipo de proveedor",
  routes: { entity: "provider_type", plural: "provider_types" },
  permissions: PERMISSIONS.admin.providerTypes,
  fields: [{ name: "name", column: "pvt_name", label: "nombre", maxLength: 100, unique: true, filter: true, sortable: true }],
  defaultSort: "name",
  selectOrder: "name",
  // ADR-0010, decisión 8. tbl_providers todavía no existe: al crearla con su
  // columna pvt_id (MAE-BD-11), se agrega aquí.
  dependents: [],
  socketEvent: "refresh-provider-types",
});

export const providerTypesService = createMasterService(providerTypesConfig);
