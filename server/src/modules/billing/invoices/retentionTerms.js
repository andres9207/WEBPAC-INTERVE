import { decimal, moneyText, ratioPercent, ratioText, roundMoney } from "../../../common/utils/money.utils.js";

/**
 * Retenido contractual sin base de datos (ADR-0025, DEC-051). Mismo modelo
 * que el anticipo (advanceTerms.js): magnitudes calculadas, ninguna
 * guardada.
 *
 *   B   base vigente del contrato    Σ conceptos vigentes (antes de IVA, con AIU)
 *   RP  retenido pactado             Σ conceptos vigentes (base × % retenido)
 *   R   retenido acumulado           Σ retenido de liquidaciones APROBADAS
 *   D   retenido devuelto            Σ devoluciones de retenido APROBADAS
 *
 *   por retener = máx(0, RP − R)
 *   saldo       = R − D
 *
 * Invariantes: I3 D ≤ R; I4 R ≤ RP (adoptada en DEC-051). Las facturas
 * registradas no reservan saldo: el service revalida al aprobar, bajo el
 * bloqueo del contrato. Es la garantía contractual: no se mezcla con las
 * retenciones tributarias (DEC-07), que llegan con columnas propias.
 */

const ZERO = decimal(0);
const min = (a, b) => (a.lte(b) ? a : b);
const max = (a, b) => (a.gte(b) ? a : b);
const money = (value) => moneyText(decimal(value));

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

/**
 * Saldos de retenido de un contrato. `base` y `agreed` salen de
 * contractTotals (base y retention); `retained` y `refunded`, de las sumas
 * de facturas aprobadas.
 */
export const retentionBalances = ({ base, agreed, retained, refunded }) => {
  const B = decimal(base);
  const RP = decimal(agreed);
  const R = decimal(retained);
  const D = decimal(refunded);
  return {
    base: B,
    agreed: RP,
    retained: R,
    refunded: D,
    toRetain: max(ZERO, RP.minus(R)),
    balance: R.minus(D),
    // Porcentaje de retenido efectivo RP / B (ADR-0025, alternativa b). Sin base, 0.
    effectivePct: ratioPercent(RP, B),
  };
};

/**
 * Retenido por defecto de una liquidación de VALOR `value`:
 * mín(VALOR × RP / B, por retener), nunca negativo ni mayor que el VALOR.
 * Con la razón exacta RP / B: facturada toda la base, el retenido cierra
 * exactamente en RP.
 */
export const defaultRetention = (value, balances) => {
  const VALUE = decimal(value);
  const byRatio = balances.base.gt(0) ? roundMoney(VALUE.times(balances.agreed).dividedBy(balances.base)) : ZERO;
  return max(ZERO, min(min(byRatio, balances.toRetain), VALUE));
};

/** I4 (R ≤ RP) y retenido ≤ VALOR de la factura; 409 o 400 si no. */
export const assertRetentionFits = (retention, value, balances) => {
  const RETENTION = decimal(retention);
  if (RETENTION.lt(0)) throw httpError(400, "El retenido no puede ser negativo.");
  if (RETENTION.gt(decimal(value))) {
    throw httpError(400, `El retenido (${money(retention)}) no puede superar el valor de la factura (${money(value)}).`);
  }
  if (RETENTION.lte(balances.toRetain)) return;
  throw httpError(
    409,
    `El retenido (${money(retention)}) supera lo que queda por retener (${money(balances.toRetain)}). Pactado: ${money(balances.agreed)}; retenido: ${money(balances.retained)}.`
  );
};

/** I3 (D ≤ R): la devolución cabe en el saldo de retenido; 409 si no. */
export const assertRefundFits = (value, balances) => {
  if (decimal(value).lte(max(ZERO, balances.balance))) return;
  throw httpError(
    409,
    `La devolución (${money(value)}) supera el saldo de retenido (${money(max(ZERO, balances.balance))}). Retenido: ${money(balances.retained)}; devuelto: ${money(balances.refunded)}.`
  );
};

/** I3 al anular una liquidación aprobada: R − su retenido ≥ D; 409 si ya se devolvió. */
export const assertLiquidationCancellable = (retention, balances) => {
  if (balances.retained.minus(decimal(retention)).gte(balances.refunded)) return;
  throw httpError(
    409,
    `El retenido de esta factura ya fue devuelto: anularla dejaría el devuelto (${money(balances.refunded)}) por encima del retenido (${money(balances.retained.minus(decimal(retention)))}). Anula antes las devoluciones de retenido.`
  );
};

/** Saldos para la API: importes como cadena con dos decimales, porcentaje con seis. */
export const retentionDto = (balances) => ({
  agreed: money(balances.agreed),
  retained: money(balances.retained),
  refunded: money(balances.refunded),
  toRetain: money(balances.toRetain),
  balance: money(balances.balance),
  effectivePct: ratioText(balances.effectivePct),
});
