import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";

/**
 * Reglas de la factura sin base de datos (ADR-0020, DEC-042): tipos,
 * estados, transiciones declaradas y qué admite cada estado. Las usa
 * invoices.service.js y se prueban sin mocks, como contractTerms.js.
 */

// ─── Tipos (ADR-0020, decisión 1) ────────────────────────────────────────────

export const INVOICE_TYPES = Object.freeze({
  SIMPLE: "SIMPLE",
  ADVANCE: "ADVANCE",
  LIQUIDATION: "LIQUIDATION",
  RETENTION_REFUND: "RETENTION_REFUND",
});

export const TYPE_NAMES = Object.freeze({
  SIMPLE: "Simple",
  ADVANCE: "Anticipo",
  LIQUIDATION: "Liquidación",
  RETENTION_REFUND: "Devolución de retenido",
});

/** La factura simple no tiene contrato; las demás sí (ADR-0020, decisión 3). */
export const hasContract = (type) => type !== INVOICE_TYPES.SIMPLE;

// ─── Estados (ADR-0020, decisión 6; backlog DEC-16) ─────────────────────────

export const INVOICE_STATES = Object.freeze({
  REGISTERED: "REGISTERED",
  APPROVED: "APPROVED",
  CANCELLED: "CANCELLED",
});

export const STATE_NAMES = Object.freeze({
  REGISTERED: "Registrada",
  APPROVED: "Aprobada",
  CANCELLED: "Anulada",
});

export const TRANSITION_ORIGINS = Object.freeze({ AUTOMATIC: "AUTOMATIC", MANUAL: "MANUAL" });

const { REGISTERED, APPROVED, CANCELLED } = INVOICE_STATES;
const can = PERMISSIONS.billing.invoices;

/**
 * Transiciones declaradas (WORKFLOW_STANDARD, regla 1). Una que no está aquí
 * no existe: APPROVED → REGISTERED no se declara (no se desaprueba; se anula
 * y se registra de nuevo) y CANCELLED es terminal.
 *
 * - `register`: la dispara crear la factura.
 * - `cancel` y `cancelApproved` comparten endpoint; el service elige con el
 *   estado bajo bloqueo. Anular una aprobada exige además el permiso
 *   reforzado (`permission`), como levantar una suspensión exige el suyo.
 */
export const INVOICE_TRANSITIONS = Object.freeze({
  register: { label: "Registrar la factura", from: [null], to: REGISTERED, origin: TRANSITION_ORIGINS.AUTOMATIC, permission: can.create },
  approve: { label: "Aprobar", from: [REGISTERED], to: APPROVED, origin: TRANSITION_ORIGINS.MANUAL, permission: can.approve },
  cancel: { label: "Anular", from: [REGISTERED], to: CANCELLED, origin: TRANSITION_ORIGINS.MANUAL, permission: can.cancel, requiresReason: true },
  cancelApproved: {
    label: "Anular la factura aprobada",
    from: [APPROVED],
    to: CANCELLED,
    origin: TRANSITION_ORIGINS.MANUAL,
    permission: can.cancelApproved,
    requiresReason: true,
  },
});

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

/**
 * Regla de una transición declarada que sale de `fromState`, o 409 si no lo
 * está. Se llama bajo bloqueo y antes de escribir: el service toma de aquí
 * el estado destino.
 */
export const assertTransition = (name, fromState = null) => {
  const rule = INVOICE_TRANSITIONS[name];
  if (rule?.from.includes(fromState)) return rule;
  const current = fromState === null ? "sin estado" : (STATE_NAMES[fromState] ?? fromState);
  throw httpError(
    409,
    rule
      ? `La factura en estado "${current}" no admite la acción "${rule.label}".`
      : `La acción "${name}" no está declarada para la factura (estado actual: "${current}").`
  );
};

/** Qué anulación corresponde al estado actual: la de una registrada o la de una aprobada. */
export const cancelTransitionFor = (state) => (state === APPROVED ? "cancelApproved" : "cancel");

/**
 * Qué escrituras admite cada estado (WORKFLOW_STANDARD, regla 9; ADR-0020,
 * "Inmutabilidad"). La consulta nunca se bloquea.
 *   edit       todos los campos salvo tipo, obra y contrato
 *   editNotes  solo extracto y descripción: no participan en ningún cálculo
 */
export const STATE_ALLOWS = Object.freeze({
  REGISTERED: Object.freeze(["edit", "editNotes", "approve", "cancel"]),
  APPROVED: Object.freeze(["editNotes", "cancelApproved"]),
  CANCELLED: Object.freeze([]),
});

export const stateAllows = (state, action) => (STATE_ALLOWS[state] ?? []).includes(action);

/** Columnas que se pueden cambiar con `editNotes` (después de aprobar). */
export const NOTE_COLUMNS = Object.freeze(["inv_statement", "inv_description"]);

/** Fila del historial de estado para una transición declarada (con el tx del evento). */
export const historyRow = ({ invId, transition, fromState = null, useBy, reaId = null, observation = null }) => {
  const rule = assertTransition(transition, fromState);
  return {
    inv_id: invId,
    ish_from_state: fromState,
    ish_to_state: rule.to,
    ish_origin: rule.origin,
    rea_id: reaId,
    ish_observation: observation,
    ish_create_by: useBy,
  };
};
