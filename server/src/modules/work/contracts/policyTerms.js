import { toDateOnly, todayDateOnly } from "../../../common/utils/term.utils.js";
import { DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { decimal } from "../../../common/utils/money.utils.js";
import { insuredValue } from "../../admin/policyTypes/policyBases.js";
import { CLOSED_STATES, conceptAmounts } from "./contractTerms.js";
import { DEFAULT_EXPIRING_DAYS } from "../../admin/businessRules/businessRules.constants.js";

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

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Vigencia según la fecha fin, contra la fecha del servidor (nunca la del
 * cliente). Sin fecha fin: "sin fecha de vigencia", nunca "vigente".
 *
 * `days`: umbral de "a vencer" (ADR-0002, decisión 7: configuración, no un
 * literal). Es la regla de negocio de las pólizas (`policyExpiringDays`,
 * DEC-072): quien llama la lee una vez y la devuelve con las pólizas para
 * que se pueda consultar.
 */
export const policyValidity = (endDate, { today = todayDateOnly(), days = DEFAULT_EXPIRING_DAYS } = {}) => {
  const end = endDate instanceof Date ? endDate : toDateOnly(endDate);
  if (!end) return POLICY_VALIDITY.NO_DATE;
  const remaining = Math.round((end.getTime() - today.getTime()) / DAY_MS);
  if (remaining < 0) return POLICY_VALIDITY.EXPIRED;
  if (remaining <= days) return POLICY_VALIDITY.EXPIRING;
  return POLICY_VALIDITY.ACTIVE;
};

/**
 * Si la vigencia de una póliza cubre el plazo del contrato: termina el día de
 * la fecha fin del contrato o después (pedido del usuario, 2026-10-26; ADR-0018
 * lo dejaba pendiente). Una póliza que sigue vigente después del contrato
 * cubre. Sin fecha fin de la póliza o del contrato no se puede saber: null.
 * Solo informa: no impide ningún acto ni la liquidación.
 */
export const policyCoversTerm = (policyEndDate, contractEndDate) => {
  const policyEnd = policyEndDate instanceof Date ? policyEndDate : toDateOnly(policyEndDate);
  const contractEnd = contractEndDate instanceof Date ? contractEndDate : toDateOnly(contractEndDate);
  if (!policyEnd || !contractEnd) return null;
  return policyEnd.getTime() >= contractEnd.getTime();
};

/** Pólizas vigentes (`pol_end_date`) cuya vigencia termina antes que el contrato (`policyCoversTerm`). */
export const shortPolicies = (currentPolicies, contractEndDate) =>
  currentPolicies.filter((p) => policyCoversTerm(p.pol_end_date, contractEndDate) === false);

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

// Entre pólizas de igual exposición manda la de peor estado (DEC-064): vencida,
// a vencer, vigente y, al final, sin fecha.
const SEVERITY = [POLICY_VALIDITY.EXPIRED, POLICY_VALIDITY.EXPIRING, POLICY_VALIDITY.ACTIVE, POLICY_VALIDITY.NO_DATE];

/**
 * Exposición de una póliza: su valor asegurado sobre la composición vigente
 * del concepto que ampara, con la misma función del expediente
 * (`insuredValue`, `conceptAmounts`). Nunca se guarda.
 */
export const policyExposure = (policy, concept) =>
  concept ? insuredValue(policy.pol_base, policy.pol_percentage, conceptAmounts(concept)) : decimal(0);

/**
 * Póliza que decide la categoría del contrato (ADR-0002, decisión 5;
 * DEC-064): la vigente de mayor exposición, tenga o no fecha; entre
 * empatadas, la de peor estado. `concepts`: los del contrato, para valorar
 * cada póliza sobre el suyo. Devuelve la póliza, su exposición y su
 * vigencia, o null si no hay pólizas vigentes.
 */
export const decidingPolicy = (currentPolicies, concepts, options = {}) => {
  const byId = new Map(concepts.map((c) => [c.ccp_id, c]));
  let best = null;
  for (const policy of currentPolicies) {
    const exposure = policyExposure(policy, byId.get(policy.ccp_id));
    const validity = policyValidity(policy.pol_end_date, options);
    const severity = SEVERITY.indexOf(validity);
    if (!best || exposure.gt(best.exposure) || (exposure.eq(best.exposure) && severity < best.severity)) {
      best = { policy, exposure, validity, severity };
    }
  }
  return best && { policy: best.policy, exposure: best.exposure, validity: best.validity };
};

/**
 * Categoría de un contrato a partir de sus pólizas vigentes (`pol_base`,
 * `pol_percentage`, `pol_end_date`, `ccp_id`) y sus conceptos: la vigencia
 * de la póliza que decide (`decidingPolicy`), con los mismos límites del
 * expediente (`policyValidity`). "Sin póliza" si no tiene ninguna vigente.
 * Cada contrato cae en exactamente una: la suma de las categorías es el total.
 */
export const contractPolicyStatus = (currentPolicies, concepts, options = {}) => {
  const deciding = decidingPolicy(currentPolicies, concepts, options);
  return deciding ? CONTRACT_POLICY_STATUS[deciding.validity] : CONTRACT_POLICY_STATUS.NONE;
};

/** Una categoría del catálogo, o 400. */
export const assertPolicyStatus = (status) => {
  if (!CONTRACT_POLICY_STATUS[status]) throw Object.assign(new Error("El estado de pólizas no es válido."), { statusCode: 400 });
  return status;
};

/**
 * Contratos con algún concepto sin póliza vigente: el mismo criterio que
 * `uncoveredConcepts` (conceptos no eliminados sin ninguna póliza vigente),
 * como filtro Prisma sobre tbl_contracts.
 */
export const uncoveredContractsWhere = () => ({
  tbl_contract_concepts: { some: { sta_id: { not: DELETED_STATUS }, tbl_policies: { none: { pol_is_current: true } } } },
});

/**
 * Contratos sin ninguna póliza vigente ("Sin póliza" de DEC-064), salvo los
 * liquidados y los anulados: la pestaña "Contrato sin póliza" (DEC-088).
 */
export const contractsWithoutPoliciesWhere = () => ({
  ctr_state: { notIn: CLOSED_STATES },
  tbl_policies: { none: { pol_is_current: true } },
});
