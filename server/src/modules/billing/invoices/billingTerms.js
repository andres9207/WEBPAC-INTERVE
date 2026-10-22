import { decimal, moneyText } from "../../../common/utils/money.utils.js";
import { INVOICE_TYPES } from "./invoiceTerms.js";

/**
 * Lo facturado contra el valor del contrato, sin base de datos (I5; DEC-071).
 * Tres magnitudes, todas calculadas y ninguna guardada:
 *
 *   B   base vigente del contrato    Σ conceptos vigentes (antes de IVA, con AIU)
 *   F   facturado                    Σ VALOR de facturas normales y de liquidación APROBADAS
 *
 *   por facturar = máx(0, B − F)
 *
 * Invariante I5: F ≤ B. El VALOR de la normal y el de la liquidación son de
 * la misma naturaleza que la base: antes de IVA, con AIU (DEC-044). Las
 * registradas no reservan saldo: el service revalida al aprobar, bajo el
 * bloqueo del contrato. Anular o eliminar una factura solo reduce F.
 */

/** Tipos que facturan el valor del contrato: amortizan anticipo, retienen y suman a F. */
export const BILLING_TYPES = Object.freeze([INVOICE_TYPES.NORMAL, INVOICE_TYPES.LIQUIDATION]);

export const isBillingType = (type) => BILLING_TYPES.includes(type);

const ZERO = decimal(0);
const max = (a, b) => (a.gte(b) ? a : b);
const money = (value) => moneyText(decimal(value));

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

/** Saldo facturable de un contrato. `base` sale de contractTotals; `billed`, de las facturas aprobadas. */
export const billingBalances = ({ base, billed }) => {
  const B = decimal(base);
  const F = decimal(billed);
  return { base: B, billed: F, toBill: max(ZERO, B.minus(F)) };
};

/** I5 (F ≤ B): el VALOR cabe en lo que queda por facturar del contrato; 409 si no. */
export const assertBillingFits = (value, balances) => {
  if (decimal(value).lte(balances.toBill)) return;
  throw httpError(
    409,
    `El valor de la factura (${money(value)}) supera lo que queda por facturar del contrato (${money(balances.toBill)}). Base vigente antes de IVA: ${money(balances.base)}; facturado: ${money(balances.billed)}. Si el contrato creció, registra antes el otrosí.`
  );
};

/** Saldo facturable para la API. */
export const billingDto = (balances) => ({
  base: money(balances.base),
  billed: money(balances.billed),
  toBill: money(balances.toBill),
});
