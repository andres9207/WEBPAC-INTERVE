import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { defineMaster, createMasterService } from "../../../common/services/master.service.js";
import { DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { INVOICE_MODES } from "../../billing/invoices/invoiceMenus.js";

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

/**
 * La forma de facturar decide las reglas de las facturas del tipo: no cambia
 * mientras el tipo tenga contratos o facturas, también eliminados o anulados
 * (DEC-074). Corre con el tipo bloqueado: crear un contrato también lo bloquea.
 */
const assertModeUnchangedInUse = async (tx, { id, before, values }) => {
  if ((before.pvt_invoice_mode ?? null) === (values.pvt_invoice_mode ?? null)) return;
  const [contracts, invoices] = await Promise.all([
    tx.tbl_contracts.count({ where: { pvt_id: id } }),
    tx.tbl_invoices.count({ where: { pvt_id: id } }),
  ]);
  if (contracts > 0 || invoices > 0) {
    const uses = [contracts && `${contracts} contrato(s)`, invoices && `${invoices} factura(s)`].filter(Boolean).join(" y ");
    throw httpError(409, `No se puede cambiar la forma de facturar: el tipo tiene ${uses}. Crea otro tipo de proveedor para la nueva forma.`);
  }
};

// Maestro de tipos de proveedor (ADR-0010, DEC-017). Clasifica a la empresa
// (DEC-023) y, en cada obra, la participación del proveedor (DEC-066). Su
// forma de facturar (simple o con contrato) decide si admite contratos o
// facturas simples, y la casilla del menú, si el tipo aparece como entrada
// propia en el menú "Facturas" (DEC-074); la del menú de contratos, en el menú
// "Contratos" (DEC-077): los menús salen de aquí, no del código. Configura además los campos de los contratos firmados bajo él
// (DEC-053): su configuración, su versión (pvt_config_version) y su permiso
// viven en providerTypeFields.service.js; este maestro no las toca. Nivel 1:
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
      name: "invoiceMode",
      column: "pvt_invoice_mode",
      label: "forma de facturar",
      feminine: true,
      maxLength: 20,
      options: Object.values(INVOICE_MODES),
      required: false,
      filter: true,
      sortable: true,
    },
    { name: "invoiceMenu", column: "pvt_invoice_menu", label: "va al menú de facturas", boolean: true, required: false, sortable: true },
    // Entrada propia del menú "Contratos" (DEC-077): solo para tipos que facturan con contrato.
    { name: "contractMenu", column: "pvt_contract_menu", label: "va al menú de contratos", boolean: true, required: false, sortable: true },
  ],
  defaultSort: "name",
  selectOrder: "name",
  // La forma va en la opción: la asignación a una obra la muestra, y el
  // contrato solo ofrece los que facturan con contrato (DEC-066, DEC-074).
  selectExtra: (row) => ({ invoiceMode: row.pvt_invoice_mode }),
  // El CHECK de la BD es la garantía; esto da el mensaje.
  assertValues: (values) => {
    if (values.pvt_invoice_menu && !values.pvt_invoice_mode) {
      throw httpError(400, "Para que el tipo vaya al menú de facturas, elige su forma de facturar.");
    }
    if (values.pvt_contract_menu && values.pvt_invoice_mode !== INVOICE_MODES.CONTRACT) {
      throw httpError(400, "Solo un tipo que factura con contrato puede ir al menú de contratos.");
    }
  },
  beforeUpdate: assertModeUnchangedInUse,
  // ADR-0010, decisión 8. Los tipos de un proveedor viven en la tabla de unión
  // (DEC-041); cuentan los proveedores no eliminados. Los de cada obra
  // (DEC-066), y con ellos los contratos y facturas del tipo, también lo usan.
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
