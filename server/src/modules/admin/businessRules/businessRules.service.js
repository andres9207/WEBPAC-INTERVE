import { prisma } from "../../../common/configs/prismaClient.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, newOperationId, writeAudit } from "../../../common/services/audit.service.js";
import { BUSINESS_RULES, DEFAULT_EXPIRING_DAYS, MAX_RULE_DAYS, MIN_RULE_DAYS } from "./businessRules.constants.js";

/**
 * Reglas de negocio (DEC-072): los días de aviso de vencimiento de contratos
 * y pólizas. Las lee cualquier proceso que los necesite (vigencia de las
 * pólizas, aviso de vencimiento); las cambia solo quien tiene el permiso 114.
 */

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

/** Campo de la petición y de la respuesta de cada regla. */
const FIELD_BY_KEY = Object.freeze({
  [BUSINESS_RULES.CONTRACT_EXPIRING_DAYS]: "contractExpiringDays",
  [BUSINESS_RULES.POLICY_EXPIRING_DAYS]: "policyExpiringDays",
});

/**
 * Valor de cada regla, por clave. Una fila que faltara (BD sin la migración
 * 0105 ni `yarn db:seed`) toma el valor por defecto, para que la vigencia de
 * las pólizas siga respondiendo; guardar sí exige las filas.
 */
export const getRuleValues = async (client = prisma) => {
  const rows = await client.tbl_business_rules.findMany({ select: { bru_key: true, bru_value: true } });
  const byKey = new Map(rows.map((row) => [row.bru_key, row.bru_value]));
  return Object.fromEntries(Object.values(BUSINESS_RULES).map((key) => [key, byKey.get(key) ?? DEFAULT_EXPIRING_DAYS]));
};

/** Umbral de "a vencer" de las pólizas, en días (ADR-0002, decisión 7). */
export const policyExpiringDays = async () => (await getRuleValues())[BUSINESS_RULES.POLICY_EXPIRING_DAYS];

const toDto = (values) => Object.fromEntries(Object.entries(FIELD_BY_KEY).map(([key, field]) => [field, values[key]]));

/** Las reglas para la modal "Regla de negocio". */
export const getBusinessRules = async () => toDto(await getRuleValues());

/**
 * Guarda los días de las dos reglas. Bloquea sus filas antes de leerlas y
 * deja en la bitácora cada valor que cambia, en la misma transacción. Fija
 * un estado final: reintentable.
 *
 * `changed` dice si algo cambió, para que el llamador vuelva a revisar los
 * vencimientos con los días nuevos.
 */
export const saveBusinessRules = async ({ values, useBy, ctx = { useId: useBy } }) => {
  const wanted = Object.fromEntries(Object.entries(FIELD_BY_KEY).map(([key, field]) => [key, Number(values?.[field])]));
  for (const value of Object.values(wanted)) {
    if (!Number.isInteger(value) || value < MIN_RULE_DAYS || value > MAX_RULE_DAYS) {
      throw httpError(400, `Los días deben ser un número entero entre ${MIN_RULE_DAYS} y ${MAX_RULE_DAYS}.`);
    }
  }

  // Los ids no deciden nada (las claves son fijas): se leen para declarar
  // el bloqueo, y los valores se leen ya bloqueados.
  const ids = await prisma.tbl_business_rules.findMany({
    where: { bru_key: { in: Object.keys(wanted) } },
    select: { bru_id: true },
  });
  if (ids.length !== Object.keys(wanted).length) {
    throw new Error("[businessRules] Faltan filas de tbl_business_rules: aplica la migración 0105 o corre yarn db:seed.");
  }

  return withLockedTransaction(
    { REGLA_NEGOCIO: ids.map((row) => row.bru_id) },
    async (tx) => {
      const rows = await tx.tbl_business_rules.findMany({ select: { bru_id: true, bru_key: true, bru_value: true } });
      const operationId = newOperationId();
      let changed = false;

      for (const row of rows) {
        if (!(row.bru_key in wanted) || row.bru_value === wanted[row.bru_key]) continue;
        changed = true;
        await tx.tbl_business_rules.update({
          where: { bru_id: row.bru_id },
          data: { bru_value: wanted[row.bru_key], bru_update_by: Number(useBy) },
        });
        await writeAudit(tx, {
          operationId,
          entity: AUDIT_ENTITIES.BUSINESS_RULE,
          recordId: row.bru_id,
          operation: AUDIT_OPERATIONS.UPDATE,
          ctx,
          changes: [{ field: row.bru_key, oldValue: row.bru_value, newValue: wanted[row.bru_key] }],
        });
      }

      return {
        message: changed ? "Reglas de negocio guardadas." : "Las reglas de negocio no cambiaron.",
        changed,
        rules: toDto(wanted),
      };
    },
    { idempotent: true }
  );
};
