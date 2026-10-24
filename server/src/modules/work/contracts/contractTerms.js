import { decimal, moneyText, percentFor, percentOf, percentText, sumMoney, toMoney } from "../../../common/utils/money.utils.js";
import { addTerm, dateOnlyText, toDateOnly } from "../../../common/utils/term.utils.js";
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

/**
 * Pestaña "A vencer" del listado (DEC-072): no es un estado del ciclo de
 * vida, sino los contratos en ejecución que entran en su plazo de aviso. Va
 * en el mismo parámetro que las pestañas de estado (`state`).
 */
export const EXPIRING_TAB = "EXPIRING";

/**
 * Pestaña "Pólizas por vencer" (DEC-072): contratos no liquidados con alguna
 * póliza vigente por vencer o ya vencida. Revela datos de pólizas: exige
 * poder verlas.
 */
export const POLICIES_EXPIRING_TAB = "POLICIES_EXPIRING";

const { IN_PROGRESS, SUSPENDED, IN_LIQUIDATION, LIQUIDATED } = CONTRACT_STATES;

/** Destino de una transición que devuelve el contrato al estado que tenía (suspensión superpuesta). */
export const PREVIOUS_STATE = "PREVIOUS_STATE";

/**
 * Transiciones declaradas (WORKFLOW_STANDARD, regla 1). Una que no está aquí
 * no existe. Reabrir un contrato liquidado todavía no existe.
 *
 * - `liquidate`: automática, cuando se cumplen todas las condiciones de
 *   liquidación (DEC-081, liquidationTerms.js), en la transacción del hecho
 *   que las completa.
 * - `suspend`: manual, con permiso propio. Solo desde ejecución (DEC-039).
 * - `resume`: la dispara el otrosí que reanuda el contrato, con el permiso
 *   de levantar (DEC-039). Vuelve al estado que el contrato tenía al
 *   suspenderse (ADR-0017, decisión 3), guardado en la suspensión.
 */
export const CONTRACT_TRANSITIONS = Object.freeze({
  create: { label: "Registrar el contrato", from: [null], to: IN_PROGRESS, origin: TRANSITION_ORIGINS.AUTOMATIC },
  startLiquidation: { label: "Pasar a liquidación", from: [IN_PROGRESS], to: IN_LIQUIDATION, origin: TRANSITION_ORIGINS.AUTOMATIC },
  liquidate: { label: "Liquidar", from: [IN_LIQUIDATION], to: LIQUIDATED, origin: TRANSITION_ORIGINS.AUTOMATIC },
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
  IN_PROGRESS: Object.freeze([
    "editContract",
    "createAmendment",
    "createLiquidation",
    "editConcept",
    "suspend",
    "invoiceAdvance",
    "invoiceNormal",
    "cancelInvoice",
    "deleteInvoice",
    "createPolicy",
    "renewPolicy",
    "cancelPolicy",
  ]),
  // Suspendido: solo el otrosí que lo reanuda (DEC-039). Ninguna factura nueva.
  // Anular y eliminar (DEC-068) una factura del contrato se admite en todo
  // estado salvo liquidado (ADR-0027, catálogo de operaciones críticas;
  // ADR-0017: liquidado, solo consulta).
  // Pólizas (ADR-0017, efectos por estado; DEC-050): en ejecución y suspendido,
  // todo; en liquidación, renovar las vigentes y amparar el otrosí de
  // liquidación (nace en ese estado); liquidado, solo consulta.
  SUSPENDED: Object.freeze(["createAmendment", "cancelInvoice", "deleteInvoice", "createPolicy", "renewPolicy", "cancelPolicy"]),
  IN_LIQUIDATION: Object.freeze([
    "editLiquidationConcept",
    "invoiceLiquidation",
    "invoiceRetentionRefund",
    "cancelInvoice",
    "deleteInvoice",
    "createLiquidationPolicy",
    "renewPolicy",
  ]),
  LIQUIDATED: Object.freeze([]),
});

/** Acción de STATE_ALLOWS que habilita cada tipo de factura de contrato (DEC-042). */
export const INVOICE_ACTIONS = Object.freeze({
  ADVANCE: "invoiceAdvance",
  NORMAL: "invoiceNormal",
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
  invoiceNormal: "Las facturas normales solo se registran o aprueban con el contrato en ejecución.",
  invoiceLiquidation: "Las facturas de liquidación solo se registran o aprueban con el contrato en liquidación.",
  invoiceRetentionRefund: "Las facturas de devolución de retenido solo se registran o aprueban con el contrato en liquidación.",
  cancelInvoice: "Las facturas de un contrato liquidado no se anulan: el contrato solo se consulta.",
  deleteInvoice: "Las facturas de un contrato liquidado no se eliminan: el contrato solo se consulta.",
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

const MONTHS_PER_UNIT = { MES: 1, ANIO: 12 };

/**
 * Inversa de contractEndDate: el plazo que, con las mismas prórrogas y días
 * suspendidos, da `endDate`. Se busca en la unidad pedida; si la fecha no cae
 * en un número entero de esa unidad, en días, salvo que haya prórrogas (están
 * en la unidad del contrato y cambiarla les cambiaría el sentido).
 * Devuelve `{ term, unit }`, o `{ error }` con el motivo.
 */
export const contractTermFor = ({ startDate, endDate, unit, extensions = 0, suspendedDays = 0 }) => {
  const start = toDateOnly(dateOnlyText(startDate));
  const end = toDateOnly(dateOnlyText(endDate));
  if (!start || !end) return { error: "Las fechas de inicio y fin son requeridas." };
  if (end.getTime() <= start.getTime()) return { error: "La fecha fin debe ser posterior a la de inicio." };
  const target = dateOnlyText(end);
  // Fecha a la que llega el plazo con sus prórrogas, antes de los días suspendidos.
  const untilTerm = new Date(end.getTime() - Number(suspendedDays ?? 0) * DAY_MS);
  const extra = Number(extensions ?? 0);

  const inUnit = (candidate) => {
    let total;
    if (candidate === "DIA") total = Math.round((untilTerm.getTime() - start.getTime()) / DAY_MS);
    else {
      const months = (untilTerm.getUTCFullYear() - start.getUTCFullYear()) * 12 + untilTerm.getUTCMonth() - start.getUTCMonth();
      if (months % MONTHS_PER_UNIT[candidate] !== 0) return null;
      total = months / MONTHS_PER_UNIT[candidate];
    }
    const term = total - extra;
    if (term < 1 || contractEndDate({ startDate: start, term, unit: candidate, extensions: extra, suspendedDays }) !== target) return null;
    return { term, unit: candidate };
  };

  const found = inUnit(unit) ?? (extra === 0 ? inUnit("DIA") : null);
  if (found) return found;
  return { error: "La fecha fin no corresponde a un plazo entero con las prórrogas y los días suspendidos del contrato." };
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
  const vatBase = hasAiu ? profit : directCost;
  const vat = percentOf(vatBase, concept.ccp_vat_pct);
  return {
    directCost,
    administration,
    contingency,
    profit,
    base,
    vatBase,
    vat,
    value: base.plus(vat),
    advance: percentOf(base, concept.ccp_advance_pct),
    retention: percentOf(base, concept.ccp_retention_pct),
  };
};

/**
 * Valor y porcentaje de cada componente del concepto, como en las facturas
 * (DEC-065, "Valor y porcentaje"). El formulario muestra los dos y se escribe
 * en cualquiera; se guarda siempre el porcentaje. `alt` es el nombre en la
 * API del valor, que solo acepta la previsualización. `base` sale de
 * conceptAmounts: el IVA, sobre la utilidad si hay AIU; anticipo y retenido,
 * sobre la base. El orden es el de la fórmula: la base del IVA depende de lo
 * ya convertido de A, I y U.
 */
export const CONCEPT_PAIRS = Object.freeze([
  { field: "adminPct", column: "ccp_admin_pct", line: "administration", alt: "adminAmount", base: (a) => a.directCost },
  { field: "contingencyPct", column: "ccp_contingency_pct", line: "contingency", alt: "contingencyAmount", base: (a) => a.directCost },
  { field: "profitPct", column: "ccp_profit_pct", line: "profit", alt: "profitAmount", base: (a) => a.directCost },
  { field: "vatPct", column: "ccp_vat_pct", line: "vat", alt: "vatAmount", base: (a) => a.vatBase },
  { field: "advancePct", column: "ccp_advance_pct", line: "advance", alt: "advanceAmount", base: (a) => a.base },
  { field: "retentionPct", column: "ccp_retention_pct", line: "retention", alt: "retentionAmount", base: (a) => a.base },
]);

const blank = (value) => value === null || value === undefined || String(value).trim() === "";

/** Borrador del concepto a partir de la petición (nombres de la API): lo vacío vale 0. */
const conceptDraftOf = (input) => ({
  ccp_direct_cost: blank(input.directCost) ? "0" : input.directCost,
  ...Object.fromEntries(CONCEPT_PAIRS.map((pair) => [pair.column, blank(input[pair.field]) ? "0" : input[pair.field]])),
});

/**
 * Previsualización del concepto mientras se escribe (FRONTEND_STANDARD,
 * regla 9): pasa cada valor escrito por su otro lado (`alt`) a % de su base,
 * con dos decimales como la columna, y devuelve lo capturado ya convertido
 * (`captured`), el valor y el % de cada componente (`pairs`) y los importes
 * del concepto. Un valor sobre una base en 0 da 0 %.
 */
export const previewConcept = (input) => {
  const converted = { ...input };
  for (const pair of CONCEPT_PAIRS) {
    if (blank(input[pair.alt])) continue;
    const base = pair.base(conceptAmounts(conceptDraftOf(converted)));
    converted[pair.field] = percentText(percentFor(toMoney(input[pair.alt]), base));
  }
  const draft = conceptDraftOf(converted);
  const amounts = conceptAmounts(draft);
  return {
    captured: Object.fromEntries(CONCEPT_PAIRS.map((pair) => [pair.field, blank(converted[pair.field]) ? "" : converted[pair.field]])),
    pairs: Object.fromEntries(
      CONCEPT_PAIRS.map((pair) => [pair.field, { amount: moneyText(amounts[pair.line]), pct: percentText(draft[pair.column]) }])
    ),
    amounts: Object.fromEntries(["directCost", "base", "vat", "value", "advance", "retention"].map((key) => [key, moneyText(amounts[key])])),
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
