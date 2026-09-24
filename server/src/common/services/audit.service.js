import crypto from "crypto";
import { prisma } from "../configs/prismaClient.js";

/**
 * Bitácora de auditoría funcional (ADR-0013) — tbl_audit_log.
 *
 * Reglas, todas obligatorias:
 *   1. Se escribe SOLO desde la capa de servicio, con el `tx` de la misma
 *      transacción que la operación auditada: si la operación se revierte, su
 *      auditoría se revierte con ella, y viceversa. Nunca con disparadores.
 *   2. El autor sale siempre de la sesión (req.user, vía auditContext), nunca
 *      de un valor enviado por el cliente.
 *   3. Solo INSERT: ningún código actualiza ni borra filas de la bitácora.
 *   4. Nunca se registran contraseñas, hashes, tokens ni secretos: los campos
 *      de SENSITIVE_FIELDS se guardan como "[oculto]" (queda constancia de
 *      que cambiaron, no de su valor).
 *   5. Una operación = un operationId (UUID) compartido por todas sus filas,
 *      aunque toque varios campos o varias tablas.
 */

export const AUDIT_ENTITIES = Object.freeze({
  USER: "USUARIO",
  PROFILE: "PERFIL",
});

export const AUDIT_OPERATIONS = Object.freeze({
  // Datos
  CREATE: "CREAR",
  UPDATE: "EDITAR",
  DELETE: "ELIMINAR",
  REACTIVATE: "REACTIVAR",
  GRANT: "ASIGNAR",
  REVOKE: "REVOCAR",
  // Autenticación (ADR-0001, B15)
  LOGIN: "LOGIN",
  LOGIN_FAILED: "LOGIN_FALLIDO",
  ACCOUNT_LOCKED: "CUENTA_BLOQUEADA",
  LOGOUT: "LOGOUT",
  SESSION_REVOKED: "SESION_REVOCADA",
  PASSWORD_CHANGED: "CONTRASENA_CAMBIADA",
  PASSWORD_RESET_REQUESTED: "RECUPERACION_SOLICITADA",
  PASSWORD_RESET_CODE_FAILED: "CODIGO_RECUPERACION_FALLIDO",
  PASSWORD_RESET: "CONTRASENA_RESTAURADA",
});

export const REDACTED = "[oculto]";

const SENSITIVE_FIELDS = new Set([
  "use_password",
  "password",
  "par_code_hash",
  "ses_refresh_hash",
  "ses_prev_refresh_hash",
  "ses_key",
]);

export const newOperationId = () => crypto.randomUUID();

/** Contexto de auditoría de una petición: autor (de la sesión) e IP. */
export const auditContext = (req) => ({
  useId: req.user?.useId ?? null,
  ip: req.ip ?? null,
});

const toText = (value) => {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return [...value].sort((a, b) => (a > b ? 1 : a < b ? -1 : 0)).join(",");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const protect = (field, value) => (SENSITIVE_FIELDS.has(field) && value !== null ? REDACTED : value);

/**
 * Compara dos versiones de un registro y devuelve los campos que cambiaron.
 * `fields` son los nombres de columna a comparar; solo esos se auditan, así
 * que un service decide explícitamente qué es información auditable.
 * Un campo sensible que cambió se reporta, pero con ambos valores ocultos.
 */
export const diffFields = (before, after, fields) => {
  const changes = [];
  for (const field of fields) {
    if (!(field in (after ?? {}))) continue;
    const oldValue = toText(before?.[field]);
    const newValue = toText(after[field]);
    if (oldValue === newValue) continue;
    changes.push({
      field,
      oldValue: protect(field, oldValue),
      newValue: protect(field, newValue),
    });
  }
  return changes;
};

/**
 * Escribe en la bitácora. `db` debe ser el `tx` de la transacción de la
 * operación (o `prisma` solo cuando la operación es de una sola sentencia ya
 * confirmada, como un evento de autenticación sin cambio de datos).
 *
 * - `changes` vacío o ausente → una fila de evento, sin campo.
 * - Cada change → una fila, todas con el mismo operationId.
 */
export const writeAudit = async (
  db,
  { operationId = newOperationId(), entity, recordId = null, operation, ctx = {}, changes = [] }
) => {
  const base = {
    aud_operation_id: operationId,
    aud_entity: entity,
    aud_record_id: recordId === null || recordId === undefined ? null : Number(recordId),
    aud_operation: operation,
    use_id: ctx.useId ?? null,
    aud_ip: ctx.ip ? String(ctx.ip).slice(0, 45) : null,
  };

  const rows = changes.length
    ? changes.map(({ field, oldValue = null, newValue = null }) => ({
        ...base,
        aud_field: field,
        aud_old_value: protect(field, toText(oldValue)),
        aud_new_value: protect(field, toText(newValue)),
      }))
    : [{ ...base, aud_field: null, aud_old_value: null, aud_new_value: null }];

  await (db ?? prisma).tbl_audit_log.createMany({ data: rows });
  return operationId;
};
