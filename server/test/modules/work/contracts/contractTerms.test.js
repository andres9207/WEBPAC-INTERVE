import {
  CONTRACT_STATES,
  assertStateAllows,
  chronologyError,
  conceptAmounts,
  contractEndDate,
  contractTotals,
  historyRow,
  sortConcepts,
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
    expect(() => historyRow({ ctrId: 5, transition: "startLiquidation", fromState: "SUSPENDED", useBy: 9 })).toThrow(/no declarada/);
    expect(() => historyRow({ ctrId: 5, transition: "reopen", fromState: "LIQUIDATED", useBy: 9 })).toThrow(/no declarada/);
  });
});
