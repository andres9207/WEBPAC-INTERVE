import { moneyText } from "../../../common/utils/money.utils.js";
import { composeContractInvoice, hasContractTaxes } from "./contractInvoiceTerms.js";
import { composeSimpleInvoice } from "./simpleInvoiceTerms.js";

/**
 * Importes de una factura en el reporte del extracto (DEC-084): todos los que
 * se capturan o se calculan en las facturas, una columna por importe, para
 * cotejar el extracto que envía el constructor. El orden es el del Detalle:
 * lo facturado, los impuestos, lo que se descuenta y el neto. El anticipo y
 * la devolución de retenido van en su propia columna, no en VALOR. Sin base
 * de datos: lo usan las facturas del extracto y su reporte.
 */
export const STATEMENT_AMOUNTS = Object.freeze([
  ["value", "Valor"],
  ["advance", "Anticipo"],
  ["retentionRefund", "Devolución retenido"],
  ["utility", "Utilidad"],
  ["discount", "Dcto AI"],
  ["vat", "IVA"],
  ["withholding", "Rte fuente"],
  ["vatWithholding", "Rte IVA"],
  ["icaWithholding", "Rte ICA"],
  ["amortization", "Amortización"],
  ["retention", "Retenido"],
  ["materialsDiscount", "Dcto materiales"],
  ["freight", "Flete"],
  ["earlyPaymentDiscount", "Dcto pronto pago"],
  ["total", "Total"],
]);

const NO_STATEMENT_AMOUNTS = Object.freeze(Object.fromEntries(STATEMENT_AMOUNTS.map(([key]) => [key, null])));

/** `keys` de la composición `composed`, como texto; los demás importes, null (el tipo no los tiene). */
const pickAmounts = (composed, keys) => ({ ...NO_STATEMENT_AMOUNTS, ...Object.fromEntries(keys.map((key) => [key, moneyText(composed[key])])) });

/** Importes de una fila de factura con sus detalles (LIST_SELECT de invoices.service). Sin base de datos. */
export const statementAmounts = (row) => {
  const simple = row.tbl_invoice_simple_details;
  if (simple) {
    const keys = ["value", "discount", "vat", "withholding", "vatWithholding", "icaWithholding", "freight", "earlyPaymentDiscount", "total"];
    return pickAmounts(composeSimpleInvoice(simple), keys);
  }
  const liquidation = row.tbl_invoice_liquidation_details;
  if (liquidation) {
    // Registrada antes de DEC-075: sin impuestos ni neto, solo lo que guarda.
    if (!hasContractTaxes(liquidation)) {
      return pickAmounts({ value: liquidation.ild_value, amortization: liquidation.ild_amortization, retention: liquidation.ild_retention }, ["value", "amortization", "retention"]);
    }
    const keys = ["value", "utility", "vat", "withholding", "vatWithholding", "icaWithholding", "amortization", "retention", "materialsDiscount", "total"];
    return pickAmounts(composeContractInvoice(liquidation), keys);
  }
  // Anticipo y devolución de retenido: su valor es también su neto.
  const advance = row.tbl_invoice_advance_details?.iad_value;
  if (advance !== undefined) return pickAmounts({ advance, total: advance }, ["advance", "total"]);
  const refund = row.tbl_invoice_retention_refund_details?.irr_value;
  if (refund !== undefined) return pickAmounts({ retentionRefund: refund, total: refund }, ["retentionRefund", "total"]);
  return { ...NO_STATEMENT_AMOUNTS };
};
