import { decimal, moneyText, ratioPercent, ratioText, roundMoney } from "../../../common/utils/money.utils.js";

/**
 * Anticipo y amortización sin base de datos (ADR-0024, DEC-044). Cinco
 * magnitudes, todas calculadas y ninguna guardada:
 *
 *   B   base vigente del contrato    Σ conceptos vigentes (antes de IVA, con AIU)
 *   A   anticipo pactado             Σ conceptos vigentes (base × % anticipo)
 *   AF  anticipo facturado           Σ facturas de anticipo APROBADAS
 *   AM  amortizado                   Σ amortización de liquidaciones APROBADAS
 *
 *   por facturar     = máx(0, A − AF)
 *   por amortizar    = AF − AM
 *
 * Invariantes: I1 AF ≤ A; I2 AM ≤ AF. Las facturas registradas no reservan
 * saldo: el service revalida al aprobar, bajo el bloqueo del contrato.
 * Todo en Prisma.Decimal con la regla única de redondeo de money.utils.js
 * (DEC-028, DEC-045): ningún importe pasa por Number.
 */

const ZERO = decimal(0);
const min = (a, b) => (a.lte(b) ? a : b);
const max = (a, b) => (a.gte(b) ? a : b);
const money = (value) => moneyText(decimal(value));

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

/**
 * Saldos de anticipo de un contrato. `base` y `agreed` salen de
 * contractTotals (base y advance); `invoiced` y `amortized`, de las sumas de
 * facturas aprobadas.
 */
export const advanceBalances = ({ base, agreed, invoiced, amortized }) => {
  const B = decimal(base);
  const A = decimal(agreed);
  const AF = decimal(invoiced);
  const AM = decimal(amortized);
  return {
    base: B,
    agreed: A,
    invoiced: AF,
    amortized: AM,
    toInvoice: max(ZERO, A.minus(AF)),
    toAmortize: AF.minus(AM),
    // Porcentaje de anticipo efectivo A / B (ADR-0024, decisión 5). Sin base, 0.
    effectivePct: ratioPercent(A, B),
  };
};

/**
 * Amortización por defecto de una liquidación de VALOR `value`:
 * mín(VALOR × A / B, por amortizar), nunca negativa ni mayor que el VALOR.
 * Usa la razón exacta A / B, no el porcentaje redondeado: la última factura
 * cierra el saldo en cero (ADR-0024, "Justificación").
 */
export const defaultAmortization = (value, balances) => {
  const VALUE = decimal(value);
  const byRatio = balances.base.gt(0) ? roundMoney(VALUE.times(balances.agreed).dividedBy(balances.base)) : ZERO;
  return max(ZERO, min(min(byRatio, max(ZERO, balances.toAmortize)), VALUE));
};

/** Porcentaje aplicado: amortización / VALOR × 100 (evidencia). */
export const appliedPct = (amortization, value) => ratioPercent(amortization, value);

/** I1 (AF ≤ A): el valor del anticipo cabe en lo que queda por facturar; 409 si no. */
export const assertAdvanceFits = (value, balances) => {
  if (decimal(value).lte(balances.toInvoice)) return;
  throw httpError(
    409,
    `El valor del anticipo (${money(value)}) supera el anticipo por facturar (${money(balances.toInvoice)}). Pactado: ${money(balances.agreed)}; facturado: ${money(balances.invoiced)}.`
  );
};

/** I2 (AM ≤ AF) y amortización ≤ VALOR de la factura; 409 o 400 si no. */
export const assertAmortizationFits = (amortization, value, balances) => {
  const AMORTIZATION = decimal(amortization);
  if (AMORTIZATION.lt(0)) throw httpError(400, "La amortización no puede ser negativa.");
  if (AMORTIZATION.gt(decimal(value))) {
    throw httpError(400, `La amortización (${money(amortization)}) no puede superar el valor de la factura (${money(value)}).`);
  }
  if (AMORTIZATION.lte(max(ZERO, balances.toAmortize))) return;
  throw httpError(
    409,
    `La amortización (${money(amortization)}) supera el pendiente por amortizar (${money(max(ZERO, balances.toAmortize))}). Anticipo facturado: ${money(balances.invoiced)}; amortizado: ${money(balances.amortized)}.`
  );
};

/** I2 al anular un anticipo aprobado: AF − valor ≥ AM; 409 si ya se amortizó. */
export const assertAdvanceCancellable = (value, balances) => {
  if (balances.invoiced.minus(decimal(value)).gte(balances.amortized)) return;
  throw httpError(
    409,
    `El anticipo ya fue amortizado: anularlo dejaría el amortizado (${money(balances.amortized)}) por encima del anticipo facturado (${money(balances.invoiced.minus(decimal(value)))}). Anula antes las facturas de liquidación que lo amortizan.`
  );
};

/** Saldos para la API: importes como cadena con dos decimales, porcentaje con seis. */
export const balancesDto = (balances) => ({
  base: money(balances.base),
  agreed: money(balances.agreed),
  invoiced: money(balances.invoiced),
  amortized: money(balances.amortized),
  toInvoice: money(balances.toInvoice),
  toAmortize: money(balances.toAmortize),
  effectivePct: ratioText(balances.effectivePct),
});
