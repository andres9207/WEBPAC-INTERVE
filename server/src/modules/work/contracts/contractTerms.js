import { Prisma } from "@prisma/client";
import { MONEY_SCALE, sumMoney } from "../../../common/utils/money.utils.js";
import { addTerm, dateOnlyText } from "../../../common/utils/term.utils.js";
import { DELETED_STATUS } from "../../../common/constants/status.constants.js";

/**
 * Reglas del contrato que no tocan la BD (DEC-035, DEC-036): estados y qué
 * admite cada uno, la fecha fin y el valor de los conceptos. Un solo lugar
 * para cada cálculo: el service lo invoca dentro de la transacción del evento,
 * y la conciliación de la fecha fin (fase B) lo usará para comparar.
 */

// ─── Estados (ADR-0017) ──────────────────────────────────────────────────────

export const CONTRACT_STATES = Object.freeze({
  IN_PROGRESS: "IN_PROGRESS",
  SUSPENDED: "SUSPENDED",
  IN_LIQUIDATION: "IN_LIQUIDATION",
  LIQUIDATED: "LIQUIDATED",
});

export const STATE_NAMES = Object.freeze({
  IN_PROGRESS: "En ejecución",
  SUSPENDED: "Suspendido",
  IN_LIQUIDATION: "En liquidación",
  LIQUIDATED: "Liquidado",
});

export const TRANSITION_ORIGINS = Object.freeze({ AUTOMATIC: "AUTOMATIC", MANUAL: "MANUAL" });

const { IN_PROGRESS, IN_LIQUIDATION } = CONTRACT_STATES;

/**
 * Transiciones declaradas (WORKFLOW_STANDARD, regla 1). Una que no está aquí
 * no existe. En esta fase solo hay las dos automáticas: crear el contrato y
 * crear el otrosí de liquidación. Suspender, levantar, liquidar y reabrir
 * llegan en la fase B, con su permiso y su motivo.
 */
export const CONTRACT_TRANSITIONS = Object.freeze({
  create: { label: "Registrar el contrato", from: [null], to: IN_PROGRESS, origin: TRANSITION_ORIGINS.AUTOMATIC },
  startLiquidation: { label: "Pasar a liquidación", from: [IN_PROGRESS], to: IN_LIQUIDATION, origin: TRANSITION_ORIGINS.AUTOMATIC },
});

/**
 * Regla de una transición declarada que sale de `fromState`, o 409 si no lo
 * está. Se llama antes de escribir: el service toma de aquí el estado
 * destino, nunca lo escribe a mano.
 */
export const assertTransition = (name, fromState = null) => {
  const rule = CONTRACT_TRANSITIONS[name];
  if (rule?.from.includes(fromState)) return rule;
  const current = fromState === null ? "sin estado" : (STATE_NAMES[fromState] ?? fromState);
  const error = new Error(
    rule
      ? `El contrato en estado "${current}" no admite la transición "${rule.label}".`
      : `La transición "${name}" no está declarada para el contrato (estado actual: "${current}").`
  );
  error.statusCode = 409;
  throw error;
};

/**
 * Qué escrituras admite cada estado (ADR-0017, "Efectos de cada estado";
 * WORKFLOW_STANDARD, regla 9). La consulta nunca se bloquea. Eliminar no
 * depende del estado: lo bloquean las facturas (ADR-0015, decisión 11).
 */
export const STATE_ALLOWS = Object.freeze({
  IN_PROGRESS: Object.freeze(["editContract", "createAmendment", "createLiquidation", "editConcept"]),
  SUSPENDED: Object.freeze([]),
  IN_LIQUIDATION: Object.freeze(["editLiquidationConcept"]),
  LIQUIDATED: Object.freeze([]),
});

const DENIED = {
  editContract: "Los datos del contrato solo se modifican mientras está en ejecución.",
  createAmendment: "Solo se registran otrosí en un contrato en ejecución.",
  createLiquidation: "Solo se registra el otrosí de liquidación en un contrato en ejecución.",
  editConcept: "Los conceptos solo se modifican mientras el contrato está en ejecución.",
  editLiquidationConcept: "El otrosí de liquidación solo se modifica mientras el contrato está en liquidación.",
};

export const stateAllows = (state, action) => (STATE_ALLOWS[state] ?? []).includes(action);

/** 409 si el estado actual no admite la acción (patrón de máquina de estados). */
export const assertStateAllows = (state, action) => {
  if (stateAllows(state, action)) return;
  const error = new Error(`${DENIED[action]} Estado actual: ${STATE_NAMES[state] ?? state}.`);
  error.statusCode = 409;
  throw error;
};

/** Fila del historial de estado para una transición declarada (con el tx del evento). */
export const historyRow = ({ ctrId, transition, fromState = null, useBy, observation = null }) => {
  const rule = assertTransition(transition, fromState);
  return {
    ctr_id: ctrId,
    csh_from_state: fromState,
    csh_to_state: rule.to,
    csh_origin: rule.origin,
    csh_observation: observation,
    csh_create_by: useBy,
  };
};

// ─── Conceptos ───────────────────────────────────────────────────────────────

export const CONCEPT_TYPES = Object.freeze({ INITIAL: "INITIAL", AMENDMENT: "AMENDMENT", LIQUIDATION: "LIQUIDATION" });

export const CONCEPT_TYPE_NAMES = Object.freeze({
  INITIAL: "Valor inicial",
  AMENDMENT: "Otrosí",
  LIQUIDATION: "Otrosí de liquidación",
});

/** Orden del contrato: valor inicial, otrosí por número, liquidación al final (ADR-0016, decisión 6). */
const TYPE_ORDER = { INITIAL: 0, AMENDMENT: 1, LIQUIDATION: 2 };
export const sortConcepts = (concepts) =>
  [...concepts].sort((a, b) => TYPE_ORDER[a.ccp_type] - TYPE_ORDER[b.ccp_type] || (a.ccp_number ?? 0) - (b.ccp_number ?? 0));

/**
 * La fecha de inicio de un concepto no puede ser anterior a la del que lo
 * precede, ni posterior a la del que le sigue (ADR-0016, regla 16).
 * `sequence` en el orden de sortConcepts; `index` es la posición del concepto
 * (sequence.length para uno nuevo, que va al final).
 */
export const chronologyError = (sequence, index, startDate) => {
  const date = dateOnlyText(startDate);
  const previous = sequence[index - 1];
  const next = sequence[index + 1];
  if (previous && date < dateOnlyText(previous.ccp_start_date)) {
    return `La fecha de inicio no puede ser anterior a la del concepto anterior (${dateOnlyText(previous.ccp_start_date)}).`;
  }
  if (next && date > dateOnlyText(next.ccp_start_date)) {
    return `La fecha de inicio no puede ser posterior a la del concepto siguiente (${dateOnlyText(next.ccp_start_date)}).`;
  }
  return null;
};

// ─── Fecha fin (ADR-0015, decisiones 5, 7 y 8) ───────────────────────────────

/**
 * Fecha fin = inicio + (plazo + Σ prórrogas de los otrosí) en la unidad del
 * contrato + días acumulados en suspensión (backlog DEC-14: la suspensión la
 * extiende). Devuelve "AAAA-MM-DD", o null si los datos no alcanzan.
 */
export const contractEndDate = ({ startDate, term, unit, extensions = 0, suspendedDays = 0 }) => {
  const end = addTerm(startDate, Number(term) + Number(extensions ?? 0), unit);
  if (!end || !suspendedDays) return end;
  return addTerm(end, Number(suspendedDays), "DIA");
};

/** Σ prórrogas de los otrosí vigentes (los de otro tipo no tienen). */
export const totalExtensions = (concepts) =>
  concepts.filter((c) => c.ccp_type === CONCEPT_TYPES.AMENDMENT && c.sta_id !== DELETED_STATUS).reduce((sum, c) => sum + (c.ccp_extension ?? 0), 0);

// ─── Valor (ADR-0026, "Composición autoritativa", propuesta) ─────────────────

const round = (value) => value.toDecimalPlaces(MONEY_SCALE, Prisma.Decimal.ROUND_HALF_UP);
const share = (base, percent) => round(new Prisma.Decimal(base).times(new Prisma.Decimal(percent ?? 0)).dividedBy(100));

/**
 * Composición de un concepto (DEC-036). Con AIU (algún porcentaje de A, I o U
 * mayor que 0), el IVA se liquida sobre la utilidad; sin AIU, sobre el costo
 * directo. Cada componente se redondea a dos decimales con medio hacia arriba.
 * Es la propuesta de ADR-0026, pendiente de validación tributaria (backlog
 * DEC-03): si cambia, cambia solo aquí.
 */
export const conceptAmounts = (concept) => {
  const directCost = new Prisma.Decimal(concept.ccp_direct_cost);
  const administration = share(directCost, concept.ccp_admin_pct);
  const contingency = share(directCost, concept.ccp_contingency_pct);
  const profit = share(directCost, concept.ccp_profit_pct);
  const hasAiu = [concept.ccp_admin_pct, concept.ccp_contingency_pct, concept.ccp_profit_pct].some((p) => new Prisma.Decimal(p ?? 0).gt(0));
  const base = directCost.plus(administration).plus(contingency).plus(profit);
  const vat = share(hasAiu ? profit : directCost, concept.ccp_vat_pct);
  return {
    directCost,
    administration,
    contingency,
    profit,
    base,
    vat,
    value: base.plus(vat),
    advance: share(base, concept.ccp_advance_pct),
    retention: share(base, concept.ccp_retention_pct),
  };
};

/** Totales del contrato: suma de sus conceptos vigentes (el valor no se guarda, ADR-0016, decisión 7). */
export const contractTotals = (concepts) => {
  const amounts = concepts.filter((c) => c.sta_id !== DELETED_STATUS).map(conceptAmounts);
  return {
    base: sumMoney(amounts.map((a) => a.base)),
    vat: sumMoney(amounts.map((a) => a.vat)),
    value: sumMoney(amounts.map((a) => a.value)),
    advance: sumMoney(amounts.map((a) => a.advance)),
    retention: sumMoney(amounts.map((a) => a.retention)),
  };
};
