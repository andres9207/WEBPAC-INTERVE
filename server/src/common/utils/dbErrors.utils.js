/**
 * Clasificación de errores de concurrencia de MySQL (ADR-0027, decisión 8).
 * Única fuente para transaction.service.js (reintento) y error.middleware.js
 * (código HTTP): si cada uno los reconociera a su manera, podrían discrepar.
 *
 * Formas reales, verificadas contra MySQL a través de Prisma 7 + adapter
 * mariadb (no suponer otras sin comprobarlas):
 *   - Interbloqueo (1213) en una consulta cruda o de modelo:
 *       code "P2010", meta.driverAdapterError.cause =
 *       { kind: "TransactionWriteConflict", originalCode: "1213", … }
 *     Prisma también puede reportarlo como "P2034" (write conflict/deadlock).
 *   - Espera de bloqueo agotada (1205):
 *       code "P2010", meta.driverAdapterError.cause =
 *       { kind: "mysql", code: 1205, originalCode: "1205", … }
 *   - Directo del driver (sin Prisma): code "ER_LOCK_DEADLOCK" /
 *     "ER_LOCK_WAIT_TIMEOUT".
 */

const MYSQL_DEADLOCK = "1213";
const MYSQL_LOCK_WAIT_TIMEOUT = "1205";

const driverCause = (err) => err?.meta?.driverAdapterError?.cause;

/** Código numérico de MySQL como texto ("1213"), venga como `code` u `originalCode`. */
export const driverErrorCode = (err) => {
  const cause = driverCause(err);
  const code = cause?.originalCode ?? cause?.code;
  return code === undefined || code === null ? null : String(code);
};

export const isDeadlock = (err) =>
  err?.code === "P2034" ||
  err?.code === "ER_LOCK_DEADLOCK" ||
  driverCause(err)?.kind === "TransactionWriteConflict" ||
  driverErrorCode(err) === MYSQL_DEADLOCK;

export const isLockWaitTimeout = (err) =>
  err?.code === "ER_LOCK_WAIT_TIMEOUT" || driverErrorCode(err) === MYSQL_LOCK_WAIT_TIMEOUT;
