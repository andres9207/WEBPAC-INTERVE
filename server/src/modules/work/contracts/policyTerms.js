import { toDateOnly, todayDateOnly } from "../../../common/utils/term.utils.js";

/**
 * Reglas de las pólizas que no tocan la BD (ADR-0018, ADR-0002; DEC-050). Un
 * solo lugar para la vigencia y la cobertura: las usan el expediente del
 * contrato y, cuando exista, el tablero, para que la cifra y el listado no
 * puedan diferir.
 */

/** Estado de vigencia de una póliza vigente (ADR-0002: categorías explícitas, también la de "sin fecha"). */
export const POLICY_VALIDITY = Object.freeze({
  NO_DATE: "NO_DATE",
  ACTIVE: "ACTIVE",
  EXPIRING: "EXPIRING",
  EXPIRED: "EXPIRED",
});

export const POLICY_VALIDITY_NAMES = Object.freeze({
  NO_DATE: "Sin fecha de vigencia",
  ACTIVE: "Vigente",
  EXPIRING: "A vencer",
  EXPIRED: "Vencida",
});

const DEFAULT_EXPIRING_DAYS = 30;

/**
 * Umbral de "a vencer", en días (ADR-0002, decisión 7: configuración, no un
 * literal). POLICY_EXPIRING_DAYS en el entorno; el servidor lo devuelve con
 * las pólizas para que se pueda consultar.
 */
export const expiringDays = () => {
  const value = Number(process.env.POLICY_EXPIRING_DAYS);
  return Number.isInteger(value) && value > 0 ? value : DEFAULT_EXPIRING_DAYS;
};

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Vigencia según la fecha fin, contra la fecha del servidor (nunca la del
 * cliente). Sin fecha fin: "sin fecha de vigencia", nunca "vigente".
 */
export const policyValidity = (endDate, { today = todayDateOnly(), days = expiringDays() } = {}) => {
  const end = endDate instanceof Date ? endDate : toDateOnly(endDate);
  if (!end) return POLICY_VALIDITY.NO_DATE;
  const remaining = Math.round((end.getTime() - today.getTime()) / DAY_MS);
  if (remaining < 0) return POLICY_VALIDITY.EXPIRED;
  if (remaining <= days) return POLICY_VALIDITY.EXPIRING;
  return POLICY_VALIDITY.ACTIVE;
};

/**
 * Conceptos del contrato sin ninguna póliza vigente (ADR-0018, decisión 3).
 * Es un hallazgo visible, no un error que impida operar.
 */
export const uncoveredConcepts = (concepts, currentPolicies) => {
  const covered = new Set(currentPolicies.map((p) => p.ccp_id));
  return concepts.filter((c) => !covered.has(c.ccp_id));
};
