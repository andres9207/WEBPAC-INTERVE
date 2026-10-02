import { Prisma } from "@prisma/client";

/**
 * Importes (DEC-028): DECIMAL(18,2) en la BD y `Prisma.Decimal` en el
 * servidor. Ningún importe pasa por Number ni parseFloat.
 *
 * Redondeo solo cuando el valor trae más de dos decimales: a dos, con medio
 * hacia arriba (0,005 → 0,01). Un valor con dos decimales o menos queda igual.
 */

export const MONEY_SCALE = 2;

/**
 * Cadena o número del cliente → Decimal redondeado, o null si viene vacío.
 * La forma (solo dígitos, no negativo) la valida antes `moneyRule`; aquí un
 * valor ilegible es un error de programación y Prisma.Decimal lanza.
 */
export const toMoney = (value) => {
  if (value === null || value === undefined || String(value).trim() === "") return null;
  return new Prisma.Decimal(String(value).trim()).toDecimalPlaces(MONEY_SCALE, Prisma.Decimal.ROUND_HALF_UP);
};

/** Suma de importes de la BD (Decimal, cadena o null) en Decimal; los null cuentan 0. */
export const sumMoney = (values) => values.reduce((total, value) => (value === null || value === undefined ? total : total.plus(value)), new Prisma.Decimal(0));

/** Decimal de la BD → cadena con dos decimales para la API, o null. */
export const moneyText = (value) => (value === null || value === undefined ? null : new Prisma.Decimal(value).toFixed(MONEY_SCALE));
