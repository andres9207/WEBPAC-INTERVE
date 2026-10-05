import { PERMISSIONS } from "../../../../src/common/constants/permissions.constants.js";
import {
  INVOICE_STATES,
  INVOICE_TRANSITIONS,
  STATE_ALLOWS,
  assertTransition,
  cancelTransitionFor,
  hasContract,
  historyRow,
  stateAllows,
} from "../../../../src/modules/billing/invoices/invoiceTerms.js";
import { INVOICE_ACTIONS, STATE_ALLOWS as CONTRACT_STATE_ALLOWS } from "../../../../src/modules/work/contracts/contractTerms.js";

// Reglas puras de la factura (ADR-0020, DEC-042): transiciones declaradas,
// qué admite cada estado y qué estado del contrato admite cada tipo.

const { REGISTERED, APPROVED, CANCELLED } = INVOICE_STATES;

describe("transiciones declaradas", () => {
  it("registrar parte de ninguna; aprobar, de registrada; anular, de registrada o aprobada", () => {
    expect(assertTransition("register").to).toBe(REGISTERED);
    expect(assertTransition("approve", REGISTERED).to).toBe(APPROVED);
    expect(assertTransition("cancel", REGISTERED).to).toBe(CANCELLED);
    expect(assertTransition("cancelApproved", APPROVED).to).toBe(CANCELLED);
  });

  it("no se desaprueba, anulada es terminal, y lo no declarado responde 409", () => {
    expect(() => assertTransition("approve", APPROVED)).toThrow(expect.objectContaining({ statusCode: 409 }));
    expect(() => assertTransition("cancel", APPROVED)).toThrow(expect.objectContaining({ statusCode: 409 }));
    for (const name of Object.keys(INVOICE_TRANSITIONS)) {
      expect(() => assertTransition(name, CANCELLED)).toThrow(expect.objectContaining({ statusCode: 409 }));
    }
    expect(() => assertTransition("unapprove", APPROVED)).toThrow(/no está declarada/);
    expect(Object.values(INVOICE_TRANSITIONS).some((t) => t.from.includes(APPROVED) && t.to === REGISTERED)).toBe(false);
  });

  it("cada transición manual lleva su permiso; anular una aprobada, el reforzado", () => {
    const can = PERMISSIONS.billing.invoices;
    expect(INVOICE_TRANSITIONS.approve.permission).toBe(can.approve);
    expect(INVOICE_TRANSITIONS.cancel.permission).toBe(can.cancel);
    expect(INVOICE_TRANSITIONS.cancelApproved.permission).toBe(can.cancelApproved);
    expect(can.approve).not.toBe(can.create);
  });

  it("la anulación que corresponde sale del estado actual", () => {
    expect(cancelTransitionFor(REGISTERED)).toBe("cancel");
    expect(cancelTransitionFor(APPROVED)).toBe("cancelApproved");
  });

  it("el historial no registra lo que la tabla no permite", () => {
    expect(historyRow({ invId: 5, transition: "approve", fromState: REGISTERED, useBy: 9 })).toEqual({
      inv_id: 5,
      ish_from_state: REGISTERED,
      ish_to_state: APPROVED,
      ish_origin: "MANUAL",
      rea_id: null,
      ish_observation: null,
      ish_create_by: 9,
    });
    expect(() => historyRow({ invId: 5, transition: "approve", fromState: CANCELLED, useBy: 9 })).toThrow(/no admite/);
  });
});

describe("qué admite cada estado", () => {
  it("registrada se edita entera; aprobada solo extracto y descripción; anulada nada", () => {
    expect(stateAllows(REGISTERED, "edit")).toBe(true);
    expect(stateAllows(APPROVED, "edit")).toBe(false);
    expect(stateAllows(APPROVED, "editNotes")).toBe(true);
    expect(STATE_ALLOWS[CANCELLED]).toEqual([]);
  });

  it("el tipo decide si hay contrato", () => {
    expect(hasContract("SIMPLE")).toBe(false);
    expect(["ADVANCE", "LIQUIDATION", "RETENTION_REFUND"].every(hasContract)).toBe(true);
  });
});

describe("estado del contrato y tipo de factura (ADR-0017)", () => {
  const admits = (state) => Object.keys(INVOICE_ACTIONS).filter((type) => CONTRACT_STATE_ALLOWS[state].includes(INVOICE_ACTIONS[type]));

  it("anticipo en ejecución; liquidación y devolución en liquidación; nada suspendido ni liquidado", () => {
    expect(admits("IN_PROGRESS")).toEqual(["ADVANCE"]);
    expect(admits("IN_LIQUIDATION")).toEqual(["LIQUIDATION", "RETENTION_REFUND"]);
    expect(admits("SUSPENDED")).toEqual([]);
    expect(admits("LIQUIDATED")).toEqual([]);
  });
});
