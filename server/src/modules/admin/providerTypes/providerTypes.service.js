import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { defineMaster, createMasterService } from "../../../common/services/master.service.js";
import { DELETED_STATUS } from "../../../common/constants/status.constants.js";

// Maestro de tipos de proveedor (ADR-0010, DEC-017). Clasifica a la empresa
// (DEC-023) y, además, configura los campos de los contratos de sus
// proveedores (DEC-053): esa configuración, su versión (pvt_config_version)
// y su permiso viven en providerTypeFields.service.js; este maestro no las
// toca. Nivel 1: auditoría técnica.
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
  // ADR-0010, decisión 8. Los tipos de un proveedor viven en la tabla de unión
  // (DEC-041); cuentan los proveedores no eliminados.
  dependents: [
    {
      model: "tbl_provider_classifications",
      column: "pvt_id",
      label: "proveedor(es)",
      where: { tbl_providers: { sta_id: { not: DELETED_STATUS } } },
    },
  ],
  socketEvent: "refresh-provider-types",
});

export const providerTypesService = createMasterService(providerTypesConfig);
