import { toDateOnly, todayDateOnly } from "../../../common/utils/term.utils.js";
import { DELETED_STATUS } from "../../../common/constants/status.constants.js";

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

// ─── Estado de pólizas del contrato (ADR-0002, DEC-052) ─────────────────────

/**
 * Categoría de un contrato según sus pólizas vigentes. Cada contrato cae en
 * exactamente una (ADR-0002, decisiones 4 a 6): la suma de las categorías es
 * el total de contratos.
 */
export const CONTRACT_POLICY_STATUS = Object.freeze({
  EXPIRED: "EXPIRED",
  EXPIRING: "EXPIRING",
  ACTIVE: "ACTIVE",
  NO_DATE: "NO_DATE",
  NONE: "NONE",
});

export const CONTRACT_POLICY_STATUS_NAMES = Object.freeze({
  EXPIRED: "Con póliza vencida",
  EXPIRING: "Con póliza a vencer",
  ACTIVE: "Pólizas vigentes",
  NO_DATE: "Pólizas sin fecha de vigencia",
  NONE: "Sin póliza",
});

/**
 * Categoría de un contrato a partir de sus pólizas vigentes (`pol_end_date`),
 * con la misma vigencia de cada póliza que muestra el expediente
 * (`policyValidity`). Manda el peor estado (DEC-052): vencida, luego a
 * vencer, luego vigente. "Sin fecha" solo si ninguna tiene fecha; "sin
 * póliza" si no tiene ninguna vigente.
 */
export const contractPolicyStatus = (currentPolicies, options = {}) => {
  if (currentPolicies.length === 0) return CONTRACT_POLICY_STATUS.NONE;
  const states = currentPolicies.filter((p) => p.pol_end_date).map((p) => policyValidity(p.pol_end_date, options));
  if (states.length === 0) return CONTRACT_POLICY_STATUS.NO_DATE;
  if (states.includes(POLICY_VALIDITY.EXPIRED)) return CONTRACT_POLICY_STATUS.EXPIRED;
  if (states.includes(POLICY_VALIDITY.EXPIRING)) return CONTRACT_POLICY_STATUS.EXPIRING;
  return CONTRACT_POLICY_STATUS.ACTIVE;
};

/**
 * La misma clasificación como filtro Prisma sobre tbl_contracts, para que el
 * tablero cuente y el listado de contratos filtre con un solo predicado
 * (ADR-0002, decisión 2; PRO-BE-35). Los límites coinciden con
 * `policyValidity`: vencida si fin < hoy; a vencer si hoy ≤ fin ≤ hoy + días;
 * vigente si fin > hoy + días. Un test cruza las dos versiones.
 */
export const contractPolicyStatusWhere = (status, { today = todayDateOnly(), days = expiringDays() } = {}) => {
  const limit = new Date(today.getTime() + days * DAY_MS);
  const current = { pol_is_current: true };
  const some = (where) => ({ tbl_policies: { some: { ...current, ...where } } });
  const none = (where) => ({ tbl_policies: { none: { ...current, ...where } } });
  const expired = { pol_end_date: { lt: today } };
  const expiring = { pol_end_date: { gte: today, lte: limit } };
  switch (status) {
    case CONTRACT_POLICY_STATUS.NONE:
      return none({});
    case CONTRACT_POLICY_STATUS.NO_DATE:
      return { AND: [some({}), none({ pol_end_date: { not: null } })] };
    case CONTRACT_POLICY_STATUS.EXPIRED:
      return some(expired);
    case CONTRACT_POLICY_STATUS.EXPIRING:
      return { AND: [none(expired), some(expiring)] };
    case CONTRACT_POLICY_STATUS.ACTIVE:
      return { AND: [none(expired), none(expiring), some({ pol_end_date: { gt: limit } })] };
    default:
      throw Object.assign(new Error("El estado de pólizas no es válido."), { statusCode: 400 });
  }
};

/**
 * Contratos con algún concepto sin póliza vigente: el mismo criterio que
 * `uncoveredConcepts` (conceptos no eliminados sin ninguna póliza vigente),
 * como filtro Prisma sobre tbl_contracts.
 */
export const uncoveredContractsWhere = () => ({
  tbl_contract_concepts: { some: { sta_id: { not: DELETED_STATUS }, tbl_policies: { none: { pol_is_current: true } } } },
});
