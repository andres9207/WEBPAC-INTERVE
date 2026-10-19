import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { defineMaster, createMasterService } from "../../../common/services/master.service.js";
import { DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { PROVIDER_INVOICE_VIEWS } from "../../billing/invoices/invoiceViews.js";

// Maestro de tipos de proveedor (ADR-0010, DEC-017). Clasifica a la empresa
// (DEC-023) y, en cada obra, la participación del proveedor (DEC-066): su menú
// de facturas (contrato mayor, subcontratistas, simples o ninguno) decide si
// admite contratos y en qué menú caen sus facturas, y configura los campos de
// los contratos firmados bajo él (DEC-053). Cambiar el menú no mueve contratos
// ni facturas: cada contrato guarda el suyo al crearse. La configuración de
// campos, su versión (pvt_config_version) y su permiso viven en
// providerTypeFields.service.js; este maestro no las toca. Nivel 1:
// auditoría técnica.
export const providerTypesConfig = defineMaster({
  model: "tbl_provider_types",
  prefix: "pvt",
  idField: "pvtId",
  lockEntity: "TIPO_PROVEEDOR",
  label: "tipo de proveedor",
  routes: { entity: "provider_type", plural: "provider_types" },
  permissions: PERMISSIONS.admin.providerTypes,
  fields: [
    { name: "name", column: "pvt_name", label: "nombre", maxLength: 100, unique: true, filter: true, sortable: true },
    {
      name: "invoiceView",
      column: "pvt_invoice_view",
      label: "menú de facturas",
      maxLength: 20,
      options: Object.values(PROVIDER_INVOICE_VIEWS),
      required: false,
      filter: true,
      sortable: true,
    },
  ],
  defaultSort: "name",
  selectOrder: "name",
  // El menú va en la opción: la asignación a una obra lo muestra, y el
  // contrato solo ofrece los de menú de contrato (DEC-066).
  selectExtra: (row) => ({ invoiceView: row.pvt_invoice_view }),
  // ADR-0010, decisión 8. Los tipos de un proveedor viven en la tabla de unión
  // (DEC-041); cuentan los proveedores no eliminados. Los de cada obra
  // (DEC-066), y con ellos los contratos firmados bajo el tipo, también lo usan.
  dependents: [
    {
      model: "tbl_provider_classifications",
      column: "pvt_id",
      label: "proveedor(es)",
      where: { tbl_providers: { sta_id: { not: DELETED_STATUS } } },
    },
    { model: "tbl_work_provider_types", column: "pvt_id", label: "asignación(es) a obras", where: {} },
  ],
  socketEvent: "refresh-provider-types",
});

export const providerTypesService = createMasterService(providerTypesConfig);
