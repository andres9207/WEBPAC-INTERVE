import { CONTRACT_LINES } from "./contractInvoiceTerms.js";
import { SIMPLE_LINES } from "./simpleInvoiceTerms.js";
import { INVOICE_TYPES } from "./invoiceTerms.js";

/**
 * Campo de la factura sobre el que se levanta una glosa (DEC-085, campo de la
 * glosa): uno del panel Detalle de su tipo de factura, o "Otro" para lo que
 * no es un campo. Dominio cerrado: la clave es la línea del Detalle y la BD
 * lo repite con un `CHECK` (migración 0126). Sin base de datos: la usan el
 * service de glosas, el detalle de la factura y el reporte del extracto.
 *
 * Las sumas y los totales del Detalle (SUBTOTAL, VALOR + IVA) no son campos:
 * se glosa lo que los compone.
 */

export const OTHER_FIELD = "other";

const NOT_A_FIELD = new Set(["subtotal", "valueWithVat"]);
const fieldsOf = (lines) => lines.filter(([key]) => !NOT_A_FIELD.has(key));

const BY_TYPE = Object.freeze({
  [INVOICE_TYPES.SIMPLE]: fieldsOf(SIMPLE_LINES),
  [INVOICE_TYPES.NORMAL]: fieldsOf(CONTRACT_LINES),
  [INVOICE_TYPES.LIQUIDATION]: fieldsOf(CONTRACT_LINES),
  [INVOICE_TYPES.ADVANCE]: [["advance", "ANTICIPO"]],
  [INVOICE_TYPES.RETENTION_REFUND]: [["value", "VALOR"]],
});

/** Nombre de cada campo, de todos los tipos (los reportes mezclan facturas de varios tipos). */
export const GLOSS_FIELD_NAMES = Object.freeze({
  ...Object.fromEntries(Object.values(BY_TYPE).flat()),
  [OTHER_FIELD]: "OTRO",
});

/** Campos que admite una glosa de una factura de ese tipo, en el orden del Detalle, con "Otro" al final. */
export const glossFieldsFor = (type) => [...(BY_TYPE[type] ?? []).map(([value, label]) => ({ value, label })), { value: OTHER_FIELD, label: GLOSS_FIELD_NAMES[OTHER_FIELD] }];

/** El campo, si la factura de ese tipo lo admite; si no, null. */
export const glossFieldFor = (type, field) => (glossFieldsFor(type).some((option) => option.value === field) ? field : null);
