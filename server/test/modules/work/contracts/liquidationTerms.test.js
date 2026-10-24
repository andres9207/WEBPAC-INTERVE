import { LIQUIDATION_CONDITIONS, liquidationConditions, unmetConditions } from "../../../../src/modules/work/contracts/liquidationTerms.js";

// Condiciones de liquidación (ADR-0017, DEC-081): todas a la vez; cada una,
// fallando sola, impide liquidar y dice lo que falta. C7 informa y no bloquea.

const facts = (overrides = {}) => ({
  hasLiquidationConcept: true,
  balances: {
    advance: { toAmortize: "0.00" },
    retention: { balance: "0.00" },
    billing: { base: "100000000.00", billed: "100000000.00" },
  },
  approvedLiquidations: 1,
  pendingInvoices: 0,
  openSuspension: false,
  reportSuspensions: 0,
  uncoveredConcepts: [],
  ...overrides,
});

const balances = ({ toAmortize = "0.00", retained = "0.00", base = "100000000.00", billed = base } = {}) => ({
  advance: { toAmortize },
  retention: { balance: retained },
  billing: { base, billed },
});

const byKey = (conditions, key) => conditions.find((c) => c.key === key);

describe("condiciones de liquidación", () => {
  it("con todo cumplido no falta ninguna, y son las nueve en orden", () => {
    const conditions = liquidationConditions(facts());
    expect(conditions.map((c) => c.key)).toEqual(Object.keys(LIQUIDATION_CONDITIONS));
    expect(conditions.every((c) => c.met)).toBe(true);
    expect(unmetConditions(conditions)).toEqual([]);
  });

  it.each([
    ["C1", { hasLiquidationConcept: false }, "El contrato no tiene otrosí de liquidación."],
    ["C2", { balances: balances({ toAmortize: "1500000.00" }) }, "Anticipo por amortizar: 1500000.00."],
    ["C3", { balances: balances({ retained: "1250000.00" }) }, "Retenido por devolver: 1250000.00."],
    ["C4", { approvedLiquidations: 0 }, "No hay ninguna factura de liquidación aprobada."],
    ["C5", { pendingInvoices: 2 }, "2 facturas registradas sin aprobar."],
    ["C6", { openSuspension: true }, "El contrato tiene una suspensión abierta."],
    ["C8", { uncoveredConcepts: ["Otrosí N.º 2"] }, "Sin póliza vigente: Otrosí N.º 2."],
  ])("%s, fallando sola, impide liquidar y dice lo que falta", (key, override, detail) => {
    const conditions = liquidationConditions(facts(override));
    expect(unmetConditions(conditions)).toEqual([expect.objectContaining({ key, met: false, blocking: true, detail })]);
  });

  it("C7 informa las suspensiones que exigían informe, pero no bloquea", () => {
    const conditions = liquidationConditions(facts({ reportSuspensions: 1 }));
    expect(byKey(conditions, "C7")).toMatchObject({ met: false, blocking: false, detail: expect.stringContaining("1 suspensión exigía") });
    expect(unmetConditions(conditions)).toEqual([]);
  });

  describe("C9: contratado − facturado ≤ 0,01 % de la base vigente", () => {
    it("en el límite se cumple: 10.000 de 100.000.000", () => {
      const conditions = liquidationConditions(facts({ balances: balances({ billed: "99990000.00" }) }));
      expect(byKey(conditions, "C9").met).toBe(true);
    });

    it("un centavo por encima del límite no se cumple y lo explica", () => {
      const conditions = liquidationConditions(facts({ balances: balances({ billed: "99989999.99" }) }));
      expect(byKey(conditions, "C9")).toMatchObject({
        met: false,
        detail: "Contratado antes de IVA: 100000000.00; facturado: 99989999.99. Diferencia: 10000.01; se admite hasta 10000.00 (0.01 %).",
      });
    });

    it("nada facturado no se cumple", () => {
      const conditions = liquidationConditions(facts({ balances: balances({ billed: "0.00" }) }));
      expect(byKey(conditions, "C9").met).toBe(false);
    });
  });
});
