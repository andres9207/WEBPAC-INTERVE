import { decimal, moneyText, percentFor, percentOf, percentText, roundMoney, toMoney, toPercent } from "../../../common/utils/money.utils.js";

/**
 * Composición de las facturas normal y de liquidación (ADR-0021, ADR-0026;
 * DEC-075, que cierra DEC-03). Sin base de datos: la usan el registro, la
 * edición, el detalle, la previsualización del formulario y la evidencia al
 * aprobar, para que ninguna cifra se calcule en dos lugares. Se prueba sin
 * mocks.
 *
 * Fórmula v1, la del sistema que se migra, verificada al centavo con su
 * pantalla (DEC-075):
 *
 *   IVA               = VALOR × % IVA                       (el % utilidad no entra)
 *   VALOR + IVA       = VALOR + IVA
 *   RTE FUENTE        = VALOR × % rte fuente
 *   RTE IVA           = IVA × % rte IVA
 *   RTE ICA           digitada como valor
 *   AMORTIZACIÓN      la del detalle (DEC-044)
 *   RETENIDO          el del detalle (DEC-051)
 *   DCTO MATERIALES   digitado
 *   TOTAL             = VALOR + IVA − RTE FUENTE − RTE IVA − RTE ICA
 *                       − AMORTIZACIÓN − RETENIDO − DCTO MATERIALES   (neto a pagar)
 *
 * El % utilidad se captura y se guarda congelado (ADR-0026, decisión 7),
 * pero no entra en ninguna cifra. Cada línea se redondea antes de sumar
 * (DEC-045). Una versión publicada no cambia: una fórmula nueva es una
 * versión nueva y cada factura se compone con la suya (ADR-0026, decisión 5).
 */

export const CONTRACT_FORMULA_VERSION = 1;

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

/** Campos tributarios capturados: nombre en la API → columna del detalle. */
export const CONTRACT_TAX_FIELDS = Object.freeze({
  utilityPct: "ild_utility_pct",
  vatPct: "ild_vat_pct",
  withholdingPct: "ild_withholding_pct",
  vatWithholdingPct: "ild_vat_withholding_pct",
  icaWithholding: "ild_ica_withholding",
  materialsDiscount: "ild_materials_discount",
});

export const CONTRACT_TAX_PERCENT_COLUMNS = Object.freeze(["ild_utility_pct", "ild_vat_pct", "ild_withholding_pct", "ild_vat_withholding_pct"]);
export const CONTRACT_TAX_MONEY_COLUMNS = Object.freeze(["ild_ica_withholding", "ild_materials_discount"]);

const blank = (value) => value === null || value === undefined || String(value).trim() === "";

/**
 * Importes tributarios de la petición → columnas del detalle, validados. El
 * % IVA es obligatorio (0 si no aplica); los demás, vacíos, valen 0. 400 con
 * un mensaje por regla. El total se verifica aparte (`assertContractTotal`),
 * cuando ya se conocen la amortización y el retenido.
 */
export const contractTaxDetailOf = (input) => {
  if (blank(input.vatPct)) throw httpError(400, "El % de IVA es requerido (0 si no aplica).");
  const money = (field) => (blank(input[field]) ? decimal(0) : toMoney(input[field]));
  const pct = (field) => (blank(input[field]) ? decimal(0) : toPercent(input[field]));
  const detail = {
    ild_utility_pct: pct("utilityPct"),
    ild_vat_pct: pct("vatPct"),
    ild_withholding_pct: pct("withholdingPct"),
    ild_vat_withholding_pct: pct("vatWithholdingPct"),
    ild_ica_withholding: money("icaWithholding"),
    ild_materials_discount: money("materialsDiscount"),
    ild_formula_version: CONTRACT_FORMULA_VERSION,
  };
  if (CONTRACT_TAX_MONEY_COLUMNS.some((column) => detail[column].lt(0))) throw httpError(400, "Los importes no pueden ser negativos.");
  if (CONTRACT_TAX_PERCENT_COLUMNS.some((column) => detail[column].lt(0) || detail[column].gt(100))) {
    throw httpError(400, "Los porcentajes deben estar entre 0 y 100.");
  }
  return detail;
};

/** 400 si el neto a pagar del detalle completo (con amortización y retenido) queda negativo. */
export const assertContractTotal = (detail) => {
  const { total } = composeContractInvoice(detail);
  if (total.lt(0)) throw httpError(400, `El total a pagar quedaría negativo (${moneyText(total)}): revisa retenciones y descuentos.`);
};

const FORMULAS = {
  1: (d) => {
    const value = roundMoney(d.ild_value);
    const vat = percentOf(value, d.ild_vat_pct);
    const valueWithVat = value.plus(vat);
    const withholding = percentOf(value, d.ild_withholding_pct);
    const vatWithholding = percentOf(vat, d.ild_vat_withholding_pct);
    const icaWithholding = roundMoney(d.ild_ica_withholding);
    const amortization = roundMoney(d.ild_amortization);
    const retention = roundMoney(d.ild_retention);
    const materialsDiscount = roundMoney(d.ild_materials_discount);
    return {
      value,
      utility: percentOf(value, d.ild_utility_pct),
      vat,
      valueWithVat,
      withholding,
      vatWithholding,
      icaWithholding,
      amortization,
      retention,
      materialsDiscount,
      total: valueWithVat
        .minus(withholding)
        .minus(vatWithholding)
        .minus(icaWithholding)
        .minus(amortization)
        .minus(retention)
        .minus(materialsDiscount),
    };
  },
};

/** El detalle tiene su composición (las registradas antes de DEC-075 no). */
export const hasContractTaxes = (detail) => detail?.ild_vat_pct !== null && detail?.ild_vat_pct !== undefined;

/**
 * Composición de un detalle (columnas ild_), con la versión de fórmula que
 * guarda. Importes como Decimal. Un retenido nulo (anterior a DEC-051)
 * cuenta como cero.
 */
export const composeContractInvoice = (detail) => {
  const version = Number(detail.ild_formula_version ?? CONTRACT_FORMULA_VERSION);
  const formula = FORMULAS[version];
  if (!formula) throw new Error(`[contractInvoiceTerms] versión de fórmula desconocida: ${version}`);
  return formula(detail);
};

/** Orden y nombres del panel Detalle (los de la pantalla del sistema que se migra). */
export const CONTRACT_LINES = Object.freeze([
  ["value", "VALOR"],
  ["vat", "IVA"],
  ["valueWithVat", "VALOR + IVA"],
  ["withholding", "RTE FUENTE"],
  ["vatWithholding", "RTE IVA"],
  ["icaWithholding", "RTE ICA"],
  ["amortization", "AMORTIZACIÓN"],
  ["retention", "RETENIDO"],
  ["materialsDiscount", "DCTO MATERIALES"],
]);

/** Detalle → DTO: lo capturado (para el formulario) y la composición (para el panel), como texto. */
export const contractTaxesDto = (detail) => {
  const composed = composeContractInvoice(detail);
  return {
    captured: {
      utilityPct: percentText(detail.ild_utility_pct),
      vatPct: percentText(detail.ild_vat_pct),
      withholdingPct: percentText(detail.ild_withholding_pct),
      vatWithholdingPct: percentText(detail.ild_vat_withholding_pct),
      icaWithholding: moneyText(detail.ild_ica_withholding),
      materialsDiscount: moneyText(detail.ild_materials_discount),
    },
    formulaVersion: Number(detail.ild_formula_version ?? CONTRACT_FORMULA_VERSION),
    lines: CONTRACT_LINES.map(([key, label]) => ({ key, label, value: moneyText(composed[key]) })),
    total: moneyText(composed.total),
  };
};

/**
 * Valor y porcentaje de cada importe tributario (DEC-065, "Valor y
 * porcentaje", que DEC-075 extiende a estas facturas). Cada uno se escribe
 * en pesos o como % de su base, y el formulario muestra los dos. Se guarda
 * como siempre (`stored`): el % utilidad, el IVA y las retenciones en la
 * fuente y de IVA, como tasa; la retención de ICA y el descuento de
 * materiales, como valor. `alt` es el nombre en la API del otro lado, que
 * solo acepta la previsualización.
 */
export const CONTRACT_PAIRS = Object.freeze([
  { field: "utilityPct", line: "utility", stored: "percent", alt: "utilityAmount", base: (c) => c.value },
  { field: "vatPct", line: "vat", stored: "percent", alt: "vatAmount", base: (c) => c.value },
  { field: "withholdingPct", line: "withholding", stored: "percent", alt: "withholdingAmount", base: (c) => c.value },
  { field: "vatWithholdingPct", line: "vatWithholding", stored: "percent", alt: "vatWithholdingAmount", base: (c) => c.vat },
  { field: "icaWithholding", line: "icaWithholding", stored: "money", alt: "icaWithholdingPct", base: (c) => c.value },
  { field: "materialsDiscount", line: "materialsDiscount", stored: "money", alt: "materialsDiscountPct", base: (c) => c.value },
]);

/** Borrador del detalle a partir de la petición: lo vacío vale 0. */
export const contractDraftOf = (input) => ({
  ild_value: blank(input.value) ? "0" : input.value,
  ild_amortization: blank(input.amortization) ? "0" : input.amortization,
  ild_retention: blank(input.retention) ? "0" : input.retention,
  ...Object.fromEntries(Object.entries(CONTRACT_TAX_FIELDS).map(([field, column]) => [column, blank(input[field]) ? "0" : input[field]])),
  ild_formula_version: CONTRACT_FORMULA_VERSION,
});

/**
 * Pasa a la forma en que se guarda cada importe escrito por su otro lado
 * (`alt`): un valor, a % de su base (con dos decimales, como la columna); un
 * %, a valor. El orden es el de la fórmula: la base de la retención de IVA
 * es el IVA ya convertido.
 */
export const convertContractAmounts = (input) => {
  const converted = { ...input };
  for (const pair of CONTRACT_PAIRS) {
    if (blank(input[pair.alt])) continue;
    const base = pair.base(composeContractInvoice(contractDraftOf(converted)));
    converted[pair.field] =
      pair.stored === "percent" ? percentText(percentFor(toMoney(input[pair.alt]), base)) : moneyText(percentOf(base, toPercent(input[pair.alt])));
  }
  return converted;
};

/** Valor y % de cada importe tributario de un detalle (columnas ild_), como texto, por nombre en la API. */
export const contractPairsDto = (detail) => {
  const composed = composeContractInvoice(detail);
  return Object.fromEntries(
    CONTRACT_PAIRS.map((pair) => {
      const amount = composed[pair.line];
      const pct = pair.stored === "percent" ? toPercent(detail[CONTRACT_TAX_FIELDS[pair.field]]) : percentFor(amount, pair.base(composed));
      return [pair.field, { amount: moneyText(amount), pct: percentText(pct) }];
    })
  );
};
