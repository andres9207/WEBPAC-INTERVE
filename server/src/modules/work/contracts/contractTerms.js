import { decimal, percentOf, sumMoney } from "../../../common/utils/money.utils.js";
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

const { IN_PROGRESS, SUSPENDED, IN_LIQUIDATION } = CONTRACT_STATES;

/** Destino de una transición que devuelve el contrato al estado que tenía (suspensión superpuesta). */
export const PREVIOUS_STATE = "PREVIOUS_STATE";

/**
 * Transiciones declaradas (WORKFLOW_STANDARD, regla 1). Una que no está aquí
 * no existe. Liquidar y reabrir llegan con la facturación.
 *
 * - `suspend`: manual, con permiso propio. Solo desde ejecución (DEC-039).
 * - `resume`: la dispara el otrosí que reanuda el contrato, con el permiso
 *   de levantar (DEC-039). Vuelve al estado que el contrato tenía al
 *   suspenderse (ADR-0017, decisión 3), guardado en la suspensión.
 */
export const CONTRACT_TRANSITIONS = Object.freeze({
  create: { label: "Registrar el contrato", from: [null], to: IN_PROGRESS, origin: TRANSITION_ORIGINS.AUTOMATIC },
  startLiquidation: { label: "Pasar a liquidación", from: [IN_PROGRESS], to: IN_LIQUIDATION, origin: TRANSITION_ORIGINS.AUTOMATIC },
  suspend: { label: "Suspender", from: [IN_PROGRESS], to: SUSPENDED, origin: TRANSITION_ORIGINS.MANUAL },
  resume: { label: "Reanudar con otrosí", from: [SUSPENDED], to: PREVIOUS_STATE, origin: TRANSITION_ORIGINS.MANUAL },
});

/**
 * Regla de una transición declarada que sale de `fromState`, o 409 si no lo
 * está. Se llama antes de escribir: el service toma de aquí el estado
 * destino, nunca lo escribe a mano. Una transición que vuelve al estado
 * previo lo recibe en `previousState`, que debe ser uno desde el que se pudo
 * suspender.
 */
export const assertTransition = (name, fromState = null, { previousState } = {}) => {
  const rule = CONTRACT_TRANSITIONS[name];
  if (rule?.from.includes(fromState)) {
    if (rule.to !== PREVIOUS_STATE) return rule;
    if (CONTRACT_TRANSITIONS.suspend.from.includes(previousState)) return { ...rule, to: previousState };
    throw new Error(`[contract] ${name}: estado previo inválido (${previousState})`);
  }
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
 *
 * Las facturas de contrato (DEC-042) se registran y se aprueban solo en el
 * estado que admite su tipo: el anticipo en ejecución; la liquidación y la
 * devolución de retenido, en liquidación (la factura de liquidación se
 * asocia al otrosí de liquidación, ADR-0021). Las consulta billing/invoices
 * con INVOICE_ACTIONS.
 */
export const STATE_ALLOWS = Object.freeze({
  IN_PROGRESS: Object.freeze(["editContract", "createAmendment", "createLiquidation", "editConcept", "suspend", "invoiceAdvance", "createPolicy", "renewPolicy", "cancelPolicy"]),
  // Suspendido: solo el otrosí que lo reanuda (DEC-039). Ninguna factura.
  // Pólizas (ADR-0017, efectos por estado; DEC-050): en ejecución y suspendido,
  // todo; en liquidación, renovar las vigentes y amparar el otrosí de
  // liquidación (nace en ese estado); liquidado, solo consulta.
  SUSPENDED: Object.freeze(["createAmendment", "createPolicy", "renewPolicy", "cancelPolicy"]),
  IN_LIQUIDATION: Object.freeze([
    "editLiquidationConcept",
    "invoiceLiquidation",
    "invoiceRetentionRefund",
    "createLiquidationPolicy",
    "renewPolicy",
  ]),
  LIQUIDATED: Object.freeze([]),
});

/** Acción de STATE_ALLOWS que habilita cada tipo de factura de contrato (DEC-042). */
export const INVOICE_ACTIONS = Object.freeze({
  ADVANCE: "invoiceAdvance",
  LIQUIDATION: "invoiceLiquidation",
  RETENTION_REFUND: "invoiceRetentionRefund",
});

const DENIED = {
  editContract: "Los datos del contrato solo se modifican mientras está en ejecución.",
  createAmendment: "Solo se registran otrosí en un contrato en ejecución o suspendido.",
  createLiquidation: "Solo se registra el otrosí de liquidación en un contrato en ejecución.",
  editConcept: "Los conceptos solo se modifican mientras el contrato está en ejecución.",
  editLiquidationConcept: "El otrosí de liquidación solo se modifica mientras el contrato está en liquidación.",
  suspend: "Solo se suspende un contrato en ejecución.",
  invoiceAdvance: "Las facturas de anticipo solo se registran o aprueban con el contrato en ejecución.",
  invoiceLiquidation: "Las facturas de liquidación solo se registran o aprueban con el contrato en liquidación.",
  invoiceRetentionRefund: "Las facturas de devolución de retenido solo se registran o aprueban con el contrato en liquidación.",
  createPolicy: "Solo se registran pólizas con el contrato en ejecución o suspendido; en liquidación, solo la del otrosí de liquidación.",
  createLiquidationPolicy: "La póliza del otrosí de liquidación se registra con el contrato en liquidación.",
  renewPolicy: "Las pólizas de un contrato liquidado solo se consultan.",
  cancelPolicy: "Solo se anulan pólizas con el contrato en ejecución o suspendido.",
};

export const stateAllows = (state, action) => (STATE_ALLOWS[state] ?? []).includes(action);

/** 409 si el estado actual no admite la acción (patrón de máquina de estados). */
export const assertStateAllows = (state, action) => {
  if (stateAllows(state, action)) return;
  const error = new Error(`${DENIED[action]} Estado actual: ${STATE_NAMES[state] ?? state}.`);
  error.statusCode = 409;
  throw error;
};

/**
 * Fila del historial de estado para una transición declarada (con el tx del
 * evento). `reaId`: motivo del catálogo, en las transiciones que lo exigen
 * (suspender).
 */
export const historyRow = ({ ctrId, transition, fromState = null, previousState, useBy, reaId = null, observation = null }) => {
  const rule = assertTransition(transition, fromState, { previousState });
  return {
    ctr_id: ctrId,
    csh_from_state: fromState,
    csh_to_state: rule.to,
    csh_origin: rule.origin,
    rea_id: reaId,
    csh_observation: observation,
    csh_create_by: useBy,
  };
};

// ─── Suspensión (ADR-0017, decisión 9; DEC-039) ─────────────────────────────

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Días calendario suspendidos: del día de suspensión al día anterior a la
 * reanudación (del 1 al 11 son 10 días; el 11 el contrato ya corre). Se
 * suman a la fecha fin con contractEndDate.
 */
export const suspendedDaysBetween = (suspensionDate, liftDate) =>
  Math.round((new Date(dateOnlyText(liftDate)).getTime() - new Date(dateOnlyText(suspensionDate)).getTime()) / DAY_MS);

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

/**
 * Mientras el contrato está suspendido, la fecha fin persistida queda
 * congelada y es provisional (PRO-BE-10, criterio 3): no incluye los días de
 * la suspensión abierta, que se suman al reanudar. Suspendido ⇔ suspensión
 * abierta (DEC-039), así que basta el estado.
 */
export const isEndDateProvisional = (state) => state === SUSPENDED;

/** Σ prórrogas de los otrosí vigentes (los de otro tipo no tienen). */
export const totalExtensions = (concepts) =>
  concepts.filter((c) => c.ccp_type === CONCEPT_TYPES.AMENDMENT && c.sta_id !== DELETED_STATUS).reduce((sum, c) => sum + (c.ccp_extension ?? 0), 0);

// ─── Valor (ADR-0026, "Composición autoritativa", propuesta) ─────────────────

/**
 * Composición de un concepto (DEC-036). Con AIU (algún porcentaje de A, I o U
 * mayor que 0), el IVA se liquida sobre la utilidad; sin AIU, sobre el costo
 * directo. Cada componente es una línea redondeada con la regla única
 * (`percentOf`, DEC-045) antes de sumarse.
 * Es la propuesta de ADR-0026, pendiente de validación tributaria (backlog
 * DEC-03): si cambia, cambia solo aquí.
 */
export const conceptAmounts = (concept) => {
  const directCost = decimal(concept.ccp_direct_cost);
  const administration = percentOf(directCost, concept.ccp_admin_pct);
  const contingency = percentOf(directCost, concept.ccp_contingency_pct);
  const profit = percentOf(directCost, concept.ccp_profit_pct);
  const hasAiu = [concept.ccp_admin_pct, concept.ccp_contingency_pct, concept.ccp_profit_pct].some((p) => decimal(p).gt(0));
  const base = directCost.plus(administration).plus(contingency).plus(profit);
  const vat = percentOf(hasAiu ? profit : directCost, concept.ccp_vat_pct);
  return {
    directCost,
    administration,
    contingency,
    profit,
    base,
    vat,
    value: base.plus(vat),
    advance: percentOf(base, concept.ccp_advance_pct),
    retention: percentOf(base, concept.ccp_retention_pct),
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
