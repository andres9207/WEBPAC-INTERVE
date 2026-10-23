import { decimal, moneyText, percentFor, percentOf, percentText, roundMoney, toMoney, toPercent } from "../../../common/utils/money.utils.js";

/**
 * Composición de la factura simple (ADR-0023, ADR-0026; DEC-065). Sin base
 * de datos: la usan el registro, la edición, el detalle, la previsualización
 * del formulario y la evidencia al aprobar, para que ninguna cifra se
 * calcule en dos lugares. Se prueba sin mocks.
 *
 * Fórmula v1, la del sistema que se migra (DEC-065):
 *
 *   RTE FUENTE        = VALOR × % rte fuente               (sobre el valor bruto)
 *   SUBTOTAL          = VALOR − RTE FUENTE − DCTO AI
 *   IVA               = (VALOR − DCTO AI) × % IVA          (la retención no reduce la base)
 *   RTE IVA           = IVA × % rte IVA
 *   RTE ICA           digitada como valor
 *   TOTAL             = SUBTOTAL + IVA − RTE IVA − RTE ICA + FLETE − DCTO PRONTO PAGO
 *   TOTAL FACTURADO   = (VALOR − DCTO AI) + IVA + FLETE    (el valor del documento; costo de obra)
 *
 * TOTAL es el neto a pagar. Cada línea se redondea antes de sumar, con la
 * regla única (DEC-045). Una versión publicada no cambia: una fórmula nueva
 * es una versión nueva y cada factura se compone con la suya (ADR-0026,
 * decisión 5).
 */

export const SIMPLE_FORMULA_VERSION = 1;

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

/** Campos capturados: nombre en la API → columna del detalle. */
export const SIMPLE_FIELDS = Object.freeze({
  value: "isd_value",
  withholdingPct: "isd_withholding_pct",
  discount: "isd_discount",
  vatPct: "isd_vat_pct",
  vatWithholdingPct: "isd_vat_withholding_pct",
  icaWithholding: "isd_ica_withholding",
  freight: "isd_freight",
  earlyPaymentDiscount: "isd_early_payment_discount",
});

export const SIMPLE_PERCENT_COLUMNS = Object.freeze(["isd_withholding_pct", "isd_vat_pct", "isd_vat_withholding_pct"]);
export const SIMPLE_MONEY_COLUMNS = Object.freeze(["isd_value", "isd_discount", "isd_ica_withholding", "isd_freight", "isd_early_payment_discount"]);

const blank = (value) => value === null || value === undefined || String(value).trim() === "";

/** La petición trae algún importe de la simple. */
export const hasSimpleAmounts = (input) => Object.keys(SIMPLE_FIELDS).some((field) => !blank(input?.[field]));

/**
 * Importes capturados de la petición → columnas del detalle, validados
 * (ADR-0023, reglas 5 a 8; DEC-065). Valor y % IVA son obligatorios; los
 * demás, vacíos, valen 0. 400 con un mensaje por regla.
 */
export const simpleDetailOf = (input) => {
  if (blank(input.value) || !toMoney(input.value).gt(0)) throw httpError(400, "El valor de la factura es requerido y debe ser mayor que cero.");
  if (blank(input.vatPct)) throw httpError(400, "El % de IVA es requerido (0 si no aplica).");
  const money = (field) => (blank(input[field]) ? decimal(0) : toMoney(input[field]));
  const pct = (field) => (blank(input[field]) ? decimal(0) : toPercent(input[field]));
  const detail = {
    isd_value: money("value"),
    isd_withholding_pct: pct("withholdingPct"),
    isd_discount: money("discount"),
    isd_vat_pct: pct("vatPct"),
    isd_vat_withholding_pct: pct("vatWithholdingPct"),
    isd_ica_withholding: money("icaWithholding"),
    isd_freight: money("freight"),
    isd_early_payment_discount: money("earlyPaymentDiscount"),
    isd_formula_version: SIMPLE_FORMULA_VERSION,
  };
  if (SIMPLE_MONEY_COLUMNS.some((column) => detail[column].lt(0))) throw httpError(400, "Los importes no pueden ser negativos.");
  if (SIMPLE_PERCENT_COLUMNS.some((column) => detail[column].lt(0) || detail[column].gt(100))) {
    throw httpError(400, "Los porcentajes deben estar entre 0 y 100.");
  }
  if (detail.isd_discount.gt(detail.isd_value)) throw httpError(400, "El descuento AI no puede superar el valor.");
  const { total } = composeSimpleInvoice(detail);
  if (total.lt(0)) throw httpError(400, `El total a pagar quedaría negativo (${moneyText(total)}): revisa retenciones y descuentos.`);
  return detail;
};

const FORMULAS = {
  1: (d) => {
    const value = roundMoney(d.isd_value);
    const discount = roundMoney(d.isd_discount);
    const withholding = percentOf(value, d.isd_withholding_pct);
    const taxableBase = value.minus(discount);
    const subtotal = value.minus(withholding).minus(discount);
    const vat = percentOf(taxableBase, d.isd_vat_pct);
    const vatWithholding = percentOf(vat, d.isd_vat_withholding_pct);
    const icaWithholding = roundMoney(d.isd_ica_withholding);
    const freight = roundMoney(d.isd_freight);
    const earlyPaymentDiscount = roundMoney(d.isd_early_payment_discount);
    return {
      value,
      withholding,
      discount,
      subtotal,
      vat,
      vatWithholding,
      icaWithholding,
      freight,
      earlyPaymentDiscount,
      total: subtotal.plus(vat).minus(vatWithholding).minus(icaWithholding).plus(freight).minus(earlyPaymentDiscount),
      billed: taxableBase.plus(vat).plus(freight),
    };
  },
};

/** Composición de un detalle (columnas isd_), con la versión de fórmula que guarda. Importes como Decimal. */
export const composeSimpleInvoice = (detail) => {
  const version = Number(detail.isd_formula_version ?? SIMPLE_FORMULA_VERSION);
  const formula = FORMULAS[version];
  if (!formula) throw new Error(`[simpleInvoiceTerms] versión de fórmula desconocida: ${version}`);
  return formula(detail);
};

/** Orden y nombres del panel Detalle (los mismos de la pantalla del sistema que se migra). */
export const SIMPLE_LINES = Object.freeze([
  ["value", "VALOR"],
  ["withholding", "RTE FUENTE"],
  ["discount", "DCTO AI"],
  ["subtotal", "SUBTOTAL"],
  ["vat", "IVA"],
  ["vatWithholding", "RTE IVA"],
  ["icaWithholding", "RTE ICA"],
  ["freight", "FLETE"],
  ["earlyPaymentDiscount", "DCTO PRONTO PAGO"],
]);

/** Detalle → DTO: lo capturado (para el formulario) y la composición (para el panel), como texto. */
export const simpleAmountsDto = (detail) => {
  const composed = composeSimpleInvoice(detail);
  return {
    captured: {
      value: moneyText(detail.isd_value),
      withholdingPct: percentText(detail.isd_withholding_pct),
      discount: moneyText(detail.isd_discount),
      vatPct: percentText(detail.isd_vat_pct),
      vatWithholdingPct: percentText(detail.isd_vat_withholding_pct),
      icaWithholding: moneyText(detail.isd_ica_withholding),
      freight: moneyText(detail.isd_freight),
      earlyPaymentDiscount: moneyText(detail.isd_early_payment_discount),
    },
    formulaVersion: Number(detail.isd_formula_version ?? SIMPLE_FORMULA_VERSION),
    lines: SIMPLE_LINES.map(([key, label]) => ({ key, label, value: moneyText(composed[key]) })),
    total: moneyText(composed.total),
    billed: moneyText(composed.billed),
  };
};

/**
 * Valor y porcentaje de cada importe (DEC-065, "Valor y porcentaje"). Salvo
 * el valor, cada importe se puede escribir en pesos o como % de su base, y
 * el formulario muestra los dos. Se guarda como siempre (`stored`): las
 * retenciones en la fuente y de IVA y el IVA, como tasa; los demás, como
 * valor. `alt` es el nombre en la API del otro lado, que solo acepta la
 * previsualización: el formulario guarda lo convertido.
 *
 * El orden es el de la fórmula: la base del IVA usa el descuento AI, y la
 * de la retención de IVA, el IVA.
 */
export const SIMPLE_PAIRS = Object.freeze([
  { field: "withholdingPct", line: "withholding", stored: "percent", alt: "withholdingAmount", base: (c) => c.value },
  { field: "discount", line: "discount", stored: "money", alt: "discountPct", base: (c) => c.value },
  { field: "vatPct", line: "vat", stored: "percent", alt: "vatAmount", base: (c) => c.value.minus(c.discount) },
  { field: "vatWithholdingPct", line: "vatWithholding", stored: "percent", alt: "vatWithholdingAmount", base: (c) => c.vat },
  { field: "icaWithholding", line: "icaWithholding", stored: "money", alt: "icaWithholdingPct", base: (c) => c.value },
  { field: "freight", line: "freight", stored: "money", alt: "freightPct", base: (c) => c.value },
  { field: "earlyPaymentDiscount", line: "earlyPaymentDiscount", stored: "money", alt: "earlyPaymentDiscountPct", base: (c) => c.value },
]);

const draftOf = (input) =>
  Object.fromEntries(Object.entries(SIMPLE_FIELDS).map(([field, column]) => [column, blank(input[field]) ? "0" : input[field]]));

/**
 * Pasa a la forma en que se guarda cada importe escrito por su otro lado
 * (`alt`): un valor, a % de su base (con dos decimales, como la columna); un
 * %, a valor. Devuelve la entrada con los campos de siempre; lo demás no
 * cambia. Un valor que no da un % exacto queda redondeado: el formulario
 * muestra el importe que resulta.
 */
export const convertSimpleAmounts = (input) => {
  const converted = { ...input };
  for (const pair of SIMPLE_PAIRS) {
    if (blank(input[pair.alt])) continue;
    const base = pair.base(composeSimpleInvoice(draftOf(converted)));
    converted[pair.field] =
      pair.stored === "percent" ? percentText(percentFor(toMoney(input[pair.alt]), base)) : moneyText(percentOf(base, toPercent(input[pair.alt])));
  }
  return converted;
};

/** Valor y % de cada importe de un detalle (columnas isd_), como texto, por nombre en la API. */
export const simplePairsDto = (detail) => {
  const composed = composeSimpleInvoice(detail);
  return Object.fromEntries(
    SIMPLE_PAIRS.map((pair) => {
      const amount = composed[pair.line];
      const pct = pair.stored === "percent" ? toPercent(detail[SIMPLE_FIELDS[pair.field]]) : percentFor(amount, pair.base(composed));
      return [pair.field, { amount: moneyText(amount), pct: percentText(pct) }];
    })
  );
};
