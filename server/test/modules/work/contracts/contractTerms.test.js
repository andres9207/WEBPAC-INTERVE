import {
  CONTRACT_STATES,
  CONTRACT_TRANSITIONS,
  PREVIOUS_STATE,
  assertStateAllows,
  assertTransition,
  chronologyError,
  conceptAmounts,
  contractEndDate,
  contractTermFor,
  contractTotals,
  historyRow,
  isEndDateProvisional,
  previewConcept,
  sortConcepts,
  suspendedDaysBetween,
  totalExtensions,
} from "../../../../src/modules/work/contracts/contractTerms.js";

// Reglas puras del contrato (DEC-035, DEC-036): fecha fin, valor de los
// conceptos y efectos de cada estado.

const concept = (overrides = {}) => ({
  ccp_type: "INITIAL",
  ccp_number: null,
  ccp_direct_cost: "1000000.00",
  ccp_admin_pct: "10.00",
  ccp_contingency_pct: "5.00",
  ccp_profit_pct: "5.00",
  ccp_vat_pct: "19.00",
  ccp_advance_pct: "15.00",
  ccp_retention_pct: "5.00",
  ccp_extension: null,
  sta_id: 1,
  ...overrides,
});

describe("contractEndDate (ADR-0015, decisiones 5, 7 y 8)", () => {
  it("suma el plazo en su unidad, conservando el día o cayendo en el último del mes", () => {
    expect(contractEndDate({ startDate: "2026-01-31", term: 1, unit: "MES" })).toBe("2026-02-28");
    expect(contractEndDate({ startDate: "2026-03-15", term: 90, unit: "DIA" })).toBe("2026-06-13");
    expect(contractEndDate({ startDate: "2026-03-15", term: 2, unit: "ANIO" })).toBe("2028-03-15");
  });

  it("acumula las prórrogas de los otrosí en la misma unidad y después los días suspendidos", () => {
    expect(contractEndDate({ startDate: "2026-01-15", term: 6, unit: "MES", extensions: 3 })).toBe("2026-10-15");
    expect(contractEndDate({ startDate: "2026-01-15", term: 6, unit: "MES", extensions: 3, suspendedDays: 20 })).toBe("2026-11-04");
  });

  it("sin datos suficientes devuelve null", () => {
    expect(contractEndDate({ startDate: null, term: 6, unit: "MES" })).toBeNull();
    expect(contractEndDate({ startDate: "2026-01-15", term: 6, unit: "SEMANA" })).toBeNull();
  });

  it("solo los otrosí vigentes aportan prórroga", () => {
    expect(
      totalExtensions([
        concept(),
        concept({ ccp_type: "AMENDMENT", ccp_extension: 2 }),
        concept({ ccp_type: "AMENDMENT", ccp_extension: null }),
        concept({ ccp_type: "AMENDMENT", ccp_extension: 5, sta_id: 3 }),
      ])
    ).toBe(2);
  });
});

describe("conceptAmounts (ADR-0026, propuesta)", () => {
  it("con AIU, el IVA va sobre la utilidad y anticipo y retenido sobre la base", () => {
    const a = conceptAmounts(concept());
    expect(a.administration.toFixed(2)).toBe("100000.00");
    expect(a.profit.toFixed(2)).toBe("50000.00");
    expect(a.base.toFixed(2)).toBe("1200000.00");
    expect(a.vat.toFixed(2)).toBe("9500.00");
    expect(a.value.toFixed(2)).toBe("1209500.00");
    expect(a.advance.toFixed(2)).toBe("180000.00");
    expect(a.retention.toFixed(2)).toBe("60000.00");
  });

  it("sin AIU, el IVA va sobre el costo directo", () => {
    const a = conceptAmounts(concept({ ccp_direct_cost: "1000.00", ccp_admin_pct: "0", ccp_contingency_pct: "0", ccp_profit_pct: "0" }));
    expect(a.base.toFixed(2)).toBe("1000.00");
    expect(a.vat.toFixed(2)).toBe("190.00");
    expect(a.value.toFixed(2)).toBe("1190.00");
  });

  it("redondea cada componente a dos decimales con medio hacia arriba", () => {
    const a = conceptAmounts(concept({ ccp_direct_cost: "0.05", ccp_admin_pct: "10", ccp_contingency_pct: "0", ccp_profit_pct: "0", ccp_vat_pct: "0" }));
    expect(a.administration.toFixed(2)).toBe("0.01");
  });

  it("el valor del contrato es la suma de sus conceptos vigentes", () => {
    const totals = contractTotals([concept(), concept({ ccp_type: "AMENDMENT", ccp_number: 1 }), concept({ sta_id: 3 })]);
    expect(totals.value.toFixed(2)).toBe("2419000.00");
    expect(totals.advance.toFixed(2)).toBe("360000.00");
  });
});

describe("previewConcept: valor y % de cada componente (DEC-065, \"Valor y porcentaje\")", () => {
  const input = { directCost: "1000000", adminPct: "10", contingencyPct: "5", profitPct: "5", vatPct: "19", advancePct: "15", retentionPct: "5" };

  it("devuelve el valor y el % de cada componente con la fórmula de conceptAmounts", () => {
    const { pairs, amounts, captured } = previewConcept(input);
    expect(pairs.adminPct).toEqual({ amount: "100000.00", pct: "10.00" });
    expect(pairs.vatPct).toEqual({ amount: "9500.00", pct: "19.00" });
    expect(pairs.advancePct).toEqual({ amount: "180000.00", pct: "15.00" });
    expect(amounts).toMatchObject({ base: "1200000.00", value: "1209500.00", retention: "60000.00" });
    expect(captured.adminPct).toBe("10");
  });

  it("convierte un valor escrito a % de su base, en el orden de la fórmula", () => {
    const { captured, pairs } = previewConcept({ ...input, adminPct: "", adminAmount: "200000", vatPct: "", vatAmount: "9500", advanceAmount: "260000" });
    // Administración sobre el costo directo; el IVA, sobre la utilidad (hay AIU); el anticipo, sobre la base con la A ya convertida.
    expect(captured).toMatchObject({ adminPct: "20.00", vatPct: "19.00", advancePct: "20.00" });
    expect(pairs.advancePct.amount).toBe("260000.00");
  });

  it("sin AIU, el IVA se convierte sobre el costo directo", () => {
    const { captured } = previewConcept({ directCost: "1000", vatAmount: "190" });
    expect(captured.vatPct).toBe("19.00");
  });

  it("lo vacío vale 0, y un valor sobre una base en 0 da 0 %", () => {
    const { captured, pairs } = previewConcept({ adminAmount: "50" });
    expect(captured.adminPct).toBe("0.00");
    expect(pairs.retentionPct).toEqual({ amount: "0.00", pct: "0.00" });
  });
});

describe("orden y cronología (ADR-0016, decisión 6 y regla 16)", () => {
  const sequence = sortConcepts([
    concept({ ccp_type: "LIQUIDATION", ccp_start_date: new Date("2026-09-01") }),
    concept({ ccp_type: "AMENDMENT", ccp_number: 2, ccp_start_date: new Date("2026-06-01") }),
    concept({ ccp_type: "INITIAL", ccp_start_date: new Date("2026-01-01") }),
    concept({ ccp_type: "AMENDMENT", ccp_number: 1, ccp_start_date: new Date("2026-03-01") }),
  ]);

  it("valor inicial, otrosí por número y liquidación al final", () => {
    expect(sequence.map((c) => `${c.ccp_type}${c.ccp_number ?? ""}`)).toEqual(["INITIAL", "AMENDMENT1", "AMENDMENT2", "LIQUIDATION"]);
  });

  it("una fecha no puede quedar antes del concepto anterior ni después del siguiente", () => {
    expect(chronologyError(sequence, 2, new Date("2026-04-01"))).toBeNull();
    expect(chronologyError(sequence, 2, new Date("2026-02-01"))).toMatch(/anterior a la del concepto anterior \(2026-03-01\)/);
    expect(chronologyError(sequence, 2, new Date("2026-10-01"))).toMatch(/posterior a la del concepto siguiente \(2026-09-01\)/);
    expect(chronologyError(sequence, sequence.length, new Date("2026-08-01"))).toMatch(/anterior/);
  });
});

describe("estados (ADR-0017)", () => {
  it("en ejecución admite otrosí y edición; en liquidación solo el concepto de liquidación", () => {
    expect(() => assertStateAllows(CONTRACT_STATES.IN_PROGRESS, "createAmendment")).not.toThrow();
    expect(() => assertStateAllows(CONTRACT_STATES.IN_LIQUIDATION, "createAmendment")).toThrow(
      expect.objectContaining({ statusCode: 409, message: expect.stringContaining("En liquidación") })
    );
    expect(() => assertStateAllows(CONTRACT_STATES.IN_LIQUIDATION, "editLiquidationConcept")).not.toThrow();
    expect(() => assertStateAllows(CONTRACT_STATES.LIQUIDATED, "editContract")).toThrow(expect.objectContaining({ statusCode: 409 }));
  });

  it("solo escribe historial de transiciones declaradas", () => {
    expect(historyRow({ ctrId: 5, transition: "startLiquidation", fromState: "IN_PROGRESS", useBy: 9 })).toMatchObject({
      csh_from_state: "IN_PROGRESS",
      csh_to_state: "IN_LIQUIDATION",
      csh_origin: "AUTOMATIC",
    });
    expect(() => historyRow({ ctrId: 5, transition: "startLiquidation", fromState: "SUSPENDED", useBy: 9 })).toThrow(
      expect.objectContaining({ statusCode: 409 })
    );
    expect(() => historyRow({ ctrId: 5, transition: "reopen", fromState: "LIQUIDATED", useBy: 9 })).toThrow(
      expect.objectContaining({ statusCode: 409 })
    );
  });

  it("assertTransition devuelve la regla declarada, con su destino", () => {
    expect(assertTransition("create")).toMatchObject({ to: CONTRACT_STATES.IN_PROGRESS, origin: "AUTOMATIC" });
    expect(assertTransition("startLiquidation", CONTRACT_STATES.IN_PROGRESS)).toMatchObject({ to: CONTRACT_STATES.IN_LIQUIDATION });
  });

  it("una transición declarada desde otro estado responde 409 con el estado y la transición", () => {
    expect(() => assertTransition("startLiquidation", CONTRACT_STATES.LIQUIDATED)).toThrow(
      expect.objectContaining({
        statusCode: 409,
        message: 'El contrato en estado "Liquidado" no admite la transición "Pasar a liquidación".',
      })
    );
    expect(() => assertTransition("create", CONTRACT_STATES.IN_PROGRESS)).toThrow(expect.objectContaining({ statusCode: 409 }));
  });

  it("una transición no declarada responde 409, no un error genérico", () => {
    expect(() => assertTransition("reopen", CONTRACT_STATES.LIQUIDATED)).toThrow(
      expect.objectContaining({
        statusCode: 409,
        message: 'La transición "reopen" no está declarada para el contrato (estado actual: "Liquidado").',
      })
    );
  });

  it("cada transición declarada sale de estados conocidos y llega a uno conocido", () => {
    const states = [null, ...Object.values(CONTRACT_STATES)];
    for (const rule of Object.values(CONTRACT_TRANSITIONS)) {
      expect(rule.from.every((s) => states.includes(s))).toBe(true);
      expect([...Object.values(CONTRACT_STATES), PREVIOUS_STATE]).toContain(rule.to);
      expect(rule.label).toEqual(expect.any(String));
    }
  });
});

describe("anulación (DEC-082)", () => {
  it.each(["IN_PROGRESS", "SUSPENDED", "IN_LIQUIDATION", "LIQUIDATED"])("se anula desde %s, de forma manual", (state) => {
    expect(assertTransition("cancel", state)).toMatchObject({ to: "CANCELLED", origin: "MANUAL" });
  });

  it("un anulado no se vuelve a anular ni sale del estado (409)", () => {
    expect(() => assertTransition("cancel", "CANCELLED")).toThrow(expect.objectContaining({ statusCode: 409 }));
    expect(() => assertTransition("suspend", "CANCELLED")).toThrow(expect.objectContaining({ statusCode: 409 }));
  });
});

describe("suspensión (ADR-0017, DEC-039)", () => {
  it("solo se suspende desde ejecución", () => {
    expect(assertTransition("suspend", CONTRACT_STATES.IN_PROGRESS)).toMatchObject({ to: CONTRACT_STATES.SUSPENDED, origin: "MANUAL" });
    for (const state of [CONTRACT_STATES.SUSPENDED, CONTRACT_STATES.IN_LIQUIDATION, CONTRACT_STATES.LIQUIDATED]) {
      expect(() => assertTransition("suspend", state)).toThrow(expect.objectContaining({ statusCode: 409 }));
    }
    expect(() => assertStateAllows(CONTRACT_STATES.IN_LIQUIDATION, "suspend")).toThrow(
      expect.objectContaining({ statusCode: 409, message: expect.stringContaining("Solo se suspende un contrato en ejecución") })
    );
  });

  it("reanudar vuelve al estado previo guardado en la suspensión, no a uno fijo", () => {
    expect(assertTransition("resume", CONTRACT_STATES.SUSPENDED, { previousState: CONTRACT_STATES.IN_PROGRESS }).to).toBe(CONTRACT_STATES.IN_PROGRESS);
    expect(historyRow({ ctrId: 5, transition: "resume", fromState: "SUSPENDED", previousState: "IN_PROGRESS", useBy: 9 })).toMatchObject({
      csh_from_state: "SUSPENDED",
      csh_to_state: "IN_PROGRESS",
    });
    expect(() => assertTransition("resume", CONTRACT_STATES.IN_PROGRESS, { previousState: "IN_PROGRESS" })).toThrow(
      expect.objectContaining({ statusCode: 409 })
    );
    expect(() => assertTransition("resume", CONTRACT_STATES.SUSPENDED, { previousState: "LIQUIDATED" })).toThrow(/estado previo inválido/);
  });

  it("suspendido solo admite el otrosí que lo reanuda", () => {
    expect(() => assertStateAllows(CONTRACT_STATES.SUSPENDED, "createAmendment")).not.toThrow();
    for (const action of ["editContract", "createLiquidation", "editConcept", "suspend"]) {
      expect(() => assertStateAllows(CONTRACT_STATES.SUSPENDED, action)).toThrow(expect.objectContaining({ statusCode: 409 }));
    }
  });

  it("los días suspendidos son calendario, sin contar el día de reanudación", () => {
    expect(suspendedDaysBetween("2026-05-01", "2026-05-11")).toBe(10);
    expect(suspendedDaysBetween(new Date("2026-02-25"), new Date("2026-03-02"))).toBe(5);
    expect(suspendedDaysBetween("2026-05-01", "2026-05-01")).toBe(0);
    expect(suspendedDaysBetween("2025-12-31", "2026-01-01")).toBe(1);
  });

  it("los días suspendidos alargan la fecha fin, sumados a las prórrogas", () => {
    expect(contractEndDate({ startDate: "2026-01-01", term: 1, unit: "MES", extensions: 1, suspendedDays: 10 })).toBe("2026-03-11");
  });

  it("con la suspensión abierta la fecha fin es provisional; en los demás estados, no (PRO-BE-10)", () => {
    expect(isEndDateProvisional(CONTRACT_STATES.SUSPENDED)).toBe(true);
    for (const state of [CONTRACT_STATES.IN_PROGRESS, CONTRACT_STATES.IN_LIQUIDATION, CONTRACT_STATES.LIQUIDATED]) {
      expect(isEndDateProvisional(state)).toBe(false);
    }
  });
});

describe("contractTermFor: fecha fin → plazo (inversa de contractEndDate)", () => {
  it("en la unidad pedida cuando la fecha cae exacta, también con el último día del mes", () => {
    expect(contractTermFor({ startDate: "2026-10-22", endDate: "2026-11-22", unit: "MES" })).toEqual({ term: 1, unit: "MES" });
    expect(contractTermFor({ startDate: "2026-01-31", endDate: "2026-02-28", unit: "MES" })).toEqual({ term: 1, unit: "MES" });
    expect(contractTermFor({ startDate: "2026-03-15", endDate: "2028-03-15", unit: "ANIO" })).toEqual({ term: 2, unit: "ANIO" });
    expect(contractTermFor({ startDate: "2026-03-15", endDate: "2028-03-15", unit: "MES" })).toEqual({ term: 24, unit: "MES" });
    expect(contractTermFor({ startDate: "2026-03-15", endDate: "2026-06-13", unit: "DIA" })).toEqual({ term: 90, unit: "DIA" });
  });

  it("si no cae exacta en la unidad, en días", () => {
    expect(contractTermFor({ startDate: "2026-10-22", endDate: "2026-11-30", unit: "MES" })).toEqual({ term: 39, unit: "DIA" });
    expect(contractTermFor({ startDate: "2026-01-15", endDate: "2027-03-15", unit: "ANIO" })).toEqual({ term: 424, unit: "DIA" });
  });

  it("descuenta prórrogas y días suspendidos, y es la inversa de contractEndDate", () => {
    const data = { startDate: "2026-01-15", unit: "MES", extensions: 3, suspendedDays: 20 };
    expect(contractTermFor({ ...data, endDate: "2026-11-04" })).toEqual({ term: 6, unit: "MES" });
    expect(contractEndDate({ ...data, term: 6 })).toBe("2026-11-04");
  });

  it("con prórrogas no cambia de unidad: la fecha que no cae exacta es un error", () => {
    expect(contractTermFor({ startDate: "2026-01-15", endDate: "2026-10-20", unit: "MES", extensions: 3 }).error).toBeTruthy();
  });

  it("fin no posterior al inicio, o plazo que quedaría en cero, es un error", () => {
    expect(contractTermFor({ startDate: "2026-10-22", endDate: "2026-10-22", unit: "DIA" }).error).toBeTruthy();
    expect(contractTermFor({ startDate: "2026-01-15", endDate: "2026-04-15", unit: "MES", extensions: 3 }).error).toBeTruthy();
    expect(contractTermFor({ startDate: null, endDate: "2026-04-15", unit: "MES" }).error).toBeTruthy();
  });
});
