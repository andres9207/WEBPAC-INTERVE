/**
 * Clasificación de errores de MySQL: concurrencia (ADR-0027, decisión 8) y
 * duplicados en índices UNIQUE (al final del archivo).
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

/**
 * Duplicado en un índice UNIQUE. Forma real (verificada contra MySQL con
 * Prisma 7 + adapter mariadb):
 *   code "P2002", meta.driverAdapterError.cause =
 *   { kind: "UniqueConstraintViolation", originalCode: "1062",
 *     constraint: { index: "uq_profiles_pro_name" }, table, originalMessage }
 * Directo del driver: code "ER_DUP_ENTRY", con el índice solo en el texto
 * ("Duplicate entry '…' for key 'tbl_x.uq_x'").
 */
export const isUniqueViolation = (err) => err?.code === "P2002" || err?.code === "ER_DUP_ENTRY";

const DUPLICATE_KEY_IN_TEXT = /for key '(?:[^'.]+\.)?([^']+)'/;

/** Nombre del índice UNIQUE violado, o null si el error no lo trae. */
export const uniqueConstraintName = (err) => {
  if (!isUniqueViolation(err)) return null;
  const index = driverCause(err)?.constraint?.index;
  if (index) return index;
  const text = driverCause(err)?.originalMessage ?? err.sqlMessage ?? err.message ?? "";
  return DUPLICATE_KEY_IN_TEXT.exec(text)?.[1] ?? null;
};
