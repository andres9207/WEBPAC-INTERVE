/**
 * Reglas de negocio configurables (DEC-072): una fila de tbl_business_rules
 * por clave, sembrada por la migración 0105 y por `yarn db:seed`. La
 * aplicación solo cambia su valor; las claves son fijas del código.
 */
export const BUSINESS_RULES = Object.freeze({
  // Días antes de la fecha fin en que un contrato en ejecución se avisa como
  // próximo a vencer.
  CONTRACT_EXPIRING_DAYS: "CONTRACT_EXPIRING_DAYS",
  // Días antes del fin de vigencia en que una póliza vigente pasa a "a
  // vencer" (expediente y tablero) y se avisa. Reemplaza a la variable de
  // entorno POLICY_EXPIRING_DAYS.
  POLICY_EXPIRING_DAYS: "POLICY_EXPIRING_DAYS",
});

export const BUSINESS_RULE_NAMES = Object.freeze({
  CONTRACT_EXPIRING_DAYS: "Vencimiento de contrato",
  POLICY_EXPIRING_DAYS: "Vencimiento de póliza",
});

/** Valor sembrado y el que se usa si la fila faltara. */
export const DEFAULT_EXPIRING_DAYS = 30;

/** Rango admitido, el mismo del CHECK ck_business_rules_value. */
export const MIN_RULE_DAYS = 1;
export const MAX_RULE_DAYS = 365;
