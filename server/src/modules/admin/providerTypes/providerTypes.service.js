import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { defineMaster, createMasterService } from "../../../common/services/master.service.js";
import { DELETED_STATUS } from "../../../common/constants/status.constants.js";
import {
  INVOICE_MOVES,
  PROVIDER_INVOICE_VIEWS,
  applyProviderViewChanges,
  assertNotMixed,
  resolveProviderView,
} from "../../billing/invoices/invoiceViews.js";

/**
 * Cambiar el menú de facturas de un tipo (DEC-056) cambia el de sus
 * proveedores. Con el tipo ya bloqueado (los registros de facturas bloquean
 * los tipos de su proveedor, y editar un proveedor, los tipos que tenía y
 * los nuevos): ningún proveedor del tipo puede quedar con menús distintos
 * (409), y si alguno tiene facturas de contrato fuera del menú nuevo, el
 * usuario decide moverlas o dejarlas como histórico (`invoiceMove`).
 */
const applyInvoiceViewChange = async (tx, { id, before, values, options, ctx }) => {
  const to = values.pvt_invoice_view ?? null;
  if (to === (before.pvt_invoice_view ?? null)) return;
  const classifications = await tx.tbl_provider_classifications.findMany({
    where: { pvt_id: id, tbl_providers: { sta_id: { not: DELETED_STATUS } } },
    select: {
      prv_id: true,
      tbl_providers: {
        select: {
          prv_name: true,
          tbl_provider_classifications: { select: { pvt_id: true, tbl_provider_types: { select: { pvt_invoice_view: true } } } },
        },
      },
    },
  });
  const changes = classifications.map(({ prv_id, tbl_providers: provider }) => {
    const types = provider.tbl_provider_classifications;
    const menusBefore = types.map((t) => t.tbl_provider_types?.pvt_invoice_view);
    const menusAfter = types.map((t) => (t.pvt_id === id ? to : t.tbl_provider_types?.pvt_invoice_view));
    assertNotMixed(menusAfter, provider.prv_name);
    return { prvId: prv_id, name: provider.prv_name, from: resolveProviderView(menusBefore).view, to: resolveProviderView(menusAfter).view };
  });
  await applyProviderViewChanges(tx, { changes, invoiceMove: options.invoiceMove, ctx });
};

// Maestro de tipos de proveedor (ADR-0010, DEC-017). Clasifica a la empresa
// (DEC-023), decide el menú de las facturas de contrato de sus proveedores
// (DEC-056) y configura los campos de sus contratos (DEC-053): esa
// configuración, su versión (pvt_config_version) y su permiso viven en
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
  beforeUpdate: applyInvoiceViewChange,
  updateOptions: [{ name: "invoiceMove", values: Object.values(INVOICE_MOVES) }],
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
