import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { defineMaster, createMasterService } from "../../../common/services/master.service.js";

/**
 * Menú de facturas de un tipo de contrato (DEC-054): en qué vista aparecen
 * las facturas de sus contratos. Dominio cerrado, con CHECK en la migración
 * 0090. Sin valor (sin definir), sus contratos no admiten facturas hasta que
 * se defina.
 */
export const CONTRACT_INVOICE_VIEWS = Object.freeze({ MAJOR: "MAJOR", SUBCONTRACTOR: "SUBCONTRACTOR" });

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

/**
 * El menú de facturas no cambia si algún contrato del tipo ya tiene facturas:
 * se moverían de vista. Registrar una factura bloquea el tipo de su contrato,
 * así que esto no se cruza con un registro en curso.
 */
const assertInvoiceViewChangeable = async (tx, { id, before, values }) => {
  if ((values.ctt_invoice_view ?? null) === (before.ctt_invoice_view ?? null)) return;
  const invoices = await tx.tbl_invoices.count({ where: { tbl_contracts: { ctt_id: Number(id) } } });
  if (invoices > 0) {
    throw httpError(409, `Los contratos de este tipo ya tienen ${invoices} factura(s): su menú de facturas no puede cambiar.`);
  }
};

// Maestro de tipos de contrato (ADR-0006, DEC-017): nombre, menú de facturas
// (DEC-054) y estado, con auditoría técnica. La configuración de los campos
// del contrato pasó al tipo de proveedor (DEC-053).
export const contractTypesConfig = defineMaster({
  model: "tbl_contract_types",
  prefix: "ctt",
  idField: "cttId",
  lockEntity: "TIPO_CONTRATO",
  label: "tipo de contrato",
  routes: { entity: "contract_type", plural: "contract_types" },
  permissions: PERMISSIONS.admin.contractTypes,
  fields: [
    { name: "name", column: "ctt_name", label: "nombre", maxLength: 100, unique: true, filter: true, sortable: true },
    {
      name: "invoiceView",
      column: "ctt_invoice_view",
      label: "menú de facturas",
      maxLength: 20,
      options: Object.values(CONTRACT_INVOICE_VIEWS),
      required: false,
      filter: true,
      sortable: true,
    },
  ],
  defaultSort: "name",
  selectOrder: "name",
  beforeUpdate: assertInvoiceViewChangeable,
  // ADR-0006, regla 13.
  dependents: [
    { model: "tbl_works", column: "ctt_id", label: "obra(s)" },
    { model: "tbl_contracts", column: "ctt_id", label: "contrato(s)" },
  ],
  socketEvent: "refresh-contract-types",
});

export const contractTypesService = createMasterService(contractTypesConfig);
