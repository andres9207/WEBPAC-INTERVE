import { Prisma } from "@prisma/client";

/**
 * Aritmética exacta y regla única de redondeo (DEC-028, DEC-045). Todo
 * importe, porcentaje y saldo se calcula con `Prisma.Decimal` (decimal.js);
 * ninguno pasa por Number ni parseFloat. Las columnas DECIMAL llegan de la BD
 * como Decimal o cadena y así se tratan hasta entrar aquí.
 *
 * Regla única: medio hacia arriba (0,005 → 0,01), aplicada por línea antes
 * de sumar. Cada componente calculado (una parte de un concepto, una
 * amortización) se redondea a su escala en el momento de calcularse; las
 * sumas se hacen sobre componentes ya redondeados y no se vuelven a
 * redondear. Así el total es siempre la suma exacta de lo que se muestra.
 *
 *   Importes      2 decimales   DECIMAL(18,2)
 *   Porcentajes   2 decimales   DECIMAL(5,2)   (los que pacta el usuario)
 *   Razones       6 decimales   DECIMAL(9,6)   (porcentajes derivados, solo evidencia)
 *
 * Esta es la única llamada a `toDecimalPlaces` del servidor: un test lo
 * verifica (`floatingPoint.guard.test.js`).
 */

export const ROUNDING = Prisma.Decimal.ROUND_HALF_UP;
export const MONEY_SCALE = 2;
export const PERCENT_SCALE = 2;
export const RATIO_SCALE = 6;

const ZERO = new Prisma.Decimal(0);
const HUNDRED = new Prisma.Decimal(100);

const isBlank = (value) => value === null || value === undefined || String(value).trim() === "";

/** Cualquier valor de importe o porcentaje (Decimal, cadena de la BD o del cliente) → Decimal; vacío cuenta 0. */
export const decimal = (value) => (isBlank(value) ? ZERO : new Prisma.Decimal(typeof value === "string" ? value.trim() : value));

/** Redondea un importe calculado a dos decimales con la regla única. */
export const roundMoney = (value) => decimal(value).toDecimalPlaces(MONEY_SCALE, ROUNDING);

/** Redondea una razón derivada (porcentaje efectivo, aplicado) a seis decimales. */
export const roundRatio = (value) => decimal(value).toDecimalPlaces(RATIO_SCALE, ROUNDING);

/**
 * Cadena o número del cliente → Decimal redondeado, o null si viene vacío.
 * La forma (solo dígitos, no negativo) la valida antes `moneyRule`; aquí un
 * valor ilegible es un error de programación y Prisma.Decimal lanza.
 */
export const toMoney = (value) => (isBlank(value) ? null : roundMoney(value));

/** Porcentaje del cliente → Decimal con dos decimales; vacío cuenta 0 (DEC-036). */
export const toPercent = (value) => decimal(value).toDecimalPlaces(PERCENT_SCALE, ROUNDING);

/**
 * Una línea: `percent` % de `base`, redondeada a dos decimales. Es la forma
 * de calcular cualquier parte porcentual de un importe (AIU, IVA, anticipo,
 * retenido…): redondea aquí, por línea, antes de que se sume.
 */
export const percentOf = (base, percent) => roundMoney(decimal(base).times(decimal(percent)).dividedBy(HUNDRED));

/** `part` / `whole` × 100, con seis decimales; 0 si `whole` es 0. */
export const ratioPercent = (part, whole) => {
  const total = decimal(whole);
  return total.gt(0) ? roundRatio(decimal(part).dividedBy(total).times(HUNDRED)) : ZERO;
};

/** Suma de importes ya redondeados (Decimal, cadena o null); los null cuentan 0. No redondea. */
export const sumMoney = (values) => values.reduce((total, value) => (value === null || value === undefined ? total : total.plus(value)), ZERO);

/** Decimal de la BD → cadena con dos decimales para la API, o null. */
export const moneyText = (value) => (value === null || value === undefined ? null : decimal(value).toFixed(MONEY_SCALE, ROUNDING));

/** Porcentaje → cadena con dos decimales para la API, o null. */
export const percentText = (value) => (value === null || value === undefined ? null : decimal(value).toFixed(PERCENT_SCALE, ROUNDING));

/** Razón → cadena con seis decimales para la API, o null. */
export const ratioText = (value) => (value === null || value === undefined ? null : decimal(value).toFixed(RATIO_SCALE, ROUNDING));
