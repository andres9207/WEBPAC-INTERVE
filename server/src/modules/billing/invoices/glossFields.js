import { CONTRACT_LINES } from "./contractInvoiceTerms.js";
import { SIMPLE_LINES } from "./simpleInvoiceTerms.js";
import { INVOICE_TYPES } from "./invoiceTerms.js";
import { decimal, moneyText, percentOf, percentText, toMoney, toPercent } from "../../../common/utils/money.utils.js";

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

/**
 * Importe del campo en la factura (DEC-092), como texto: la línea del panel
 * Detalle, o el valor del anticipo y de la devolución. null en "Otro", y si
 * la factura no tiene importes (se registró sin ellos) o no tiene esa línea.
 * `amounts` es el de getInvoice (amountsDto).
 */
const fieldAmount = (amounts, field) => {
  if (!amounts || field === OTHER_FIELD) return null;
  const line = (amounts.lines ?? []).find((l) => l.key === field);
  if (line) return line.value ?? null;
  // Anticipo y devolución (su VALOR), y la normal o liquidación sin impuestos (VALOR, amortización y retenido).
  return (field === "advance" ? amounts.value : amounts[field]) ?? null;
};

/**
 * Campos que admite una glosa de una factura de ese tipo, en el orden del
 * Detalle, con "Otro" al final. Con `amounts`, cada uno trae su importe en
 * la factura (`amount`), para saber de cuánto fue al escribir la glosa.
 */
export const glossFieldsFor = (type, amounts = null) =>
  [...(BY_TYPE[type] ?? []).map(([value, label]) => ({ value, label })), { value: OTHER_FIELD, label: GLOSS_FIELD_NAMES[OTHER_FIELD] }].map(
    (option) => (amounts ? { ...option, amount: fieldAmount(amounts, option.value) } : option)
  );

/** El campo, si la factura de ese tipo lo admite; si no, null. */
export const glossFieldFor = (type, field) => (glossFieldsFor(type).some((option) => option.value === field) ? field : null);

/**
 * Valor y porcentaje de una glosa (DEC-092, como DEC-065 "Valor y
 * porcentaje"): se escribe en pesos (`value`) o como % del importe del campo
 * (`pct`), con signo, y se devuelven los dos. Se guarda el valor. Sin importe
 * del campo (o en cero), no hay porcentaje: null.
 */
export const glossPair = ({ amount, value, pct }) => {
  const blank = (v) => v === null || v === undefined || String(v).trim() === "";
  const base = blank(amount) || decimal(amount).isZero() ? null : decimal(amount);
  // Escrito como %: el valor sale del importe del campo.
  const money = blank(value) && !blank(pct) ? (base ? percentOf(base, pct) : null) : toMoney(value);
  if (money === null) return { value: null, pct: null };
  return { value: moneyText(money), pct: base ? percentText(toPercent(money.dividedBy(base).times(100))) : null };
};
