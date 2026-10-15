import {
  SIMPLE_FORMULA_VERSION,
  composeSimpleInvoice,
  hasSimpleAmounts,
  simpleAmountsDto,
  simpleDetailOf,
} from "../../../../src/modules/billing/invoices/simpleInvoiceTerms.js";

// Composición de la factura simple (DEC-065): la fórmula del sistema que se
// migra. El caso de referencia es su pantalla: VALOR 20.000, % rte fuente
// 10, DCTO AI 10, % IVA 19, % rte IVA 10, RTE ICA 10, FLETE 10, DCTO PRONTO
// PAGO 10 → TOTAL 21.398,29.

const SCREEN = {
  value: "20000",
  withholdingPct: "10",
  discount: "10",
  vatPct: "19",
  vatWithholdingPct: "10",
  icaWithholding: "10",
  freight: "10",
  earlyPaymentDiscount: "10",
};

const text = (composed) => Object.fromEntries(Object.entries(composed).map(([key, value]) => [key, value.toFixed(2)]));

describe("composeSimpleInvoice v1", () => {
  it("reproduce al centavo la pantalla del sistema que se migra", () => {
    expect(text(composeSimpleInvoice(simpleDetailOf(SCREEN)))).toEqual({
      value: "20000.00",
      withholding: "2000.00", // sobre el valor bruto
      discount: "10.00",
      subtotal: "17990.00", // valor − rte fuente − dcto AI
      vat: "3798.10", // sobre valor − dcto AI: la retención no reduce la base
      vatWithholding: "379.81",
      icaWithholding: "10.00",
      freight: "10.00",
      earlyPaymentDiscount: "10.00",
      total: "21398.29", // neto a pagar
      billed: "23798.10", // total facturado: 19.990 + 3.798,10 + 10
    });
  });

  it("redondea cada línea antes de sumar (medio hacia arriba, DEC-045)", () => {
    const composed = composeSimpleInvoice(simpleDetailOf({ value: "100.05", vatPct: "19", vatWithholdingPct: "15" }));
    // 100,05 × 19 % = 19,0095 → 19,01; 19,01 × 15 % = 2,8515 → 2,85
    expect([composed.vat, composed.vatWithholding, composed.total].map((v) => v.toFixed(2))).toEqual(["19.01", "2.85", "116.21"]);
  });

  it("una versión desconocida es un error de programación, no un 400", () => {
    expect(() => composeSimpleInvoice({ ...simpleDetailOf(SCREEN), isd_formula_version: 99 })).toThrow(/versión de fórmula/);
  });
});

describe("simpleDetailOf", () => {
  it("valor y % IVA obligatorios; los demás, vacíos, valen 0; congela la versión de fórmula", () => {
    const detail = simpleDetailOf({ value: "500", vatPct: "0" });
    expect(detail.isd_formula_version).toBe(SIMPLE_FORMULA_VERSION);
    expect([detail.isd_withholding_pct, detail.isd_discount, detail.isd_freight].map((v) => v.toFixed(2))).toEqual(["0.00", "0.00", "0.00"]);
    expect(() => simpleDetailOf({ vatPct: "19" })).toThrow(expect.objectContaining({ statusCode: 400 }));
    expect(() => simpleDetailOf({ value: "0", vatPct: "19" })).toThrow(expect.objectContaining({ statusCode: 400 }));
    expect(() => simpleDetailOf({ value: "500" })).toThrow(expect.objectContaining({ statusCode: 400, message: expect.stringMatching(/IVA/) }));
  });

  it("rangos: porcentajes 0–100, importes no negativos, descuento ≤ valor y neto ≥ 0 (400)", () => {
    const bad = [
      { ...SCREEN, withholdingPct: "100.01" },
      { ...SCREEN, freight: "-1" },
      { ...SCREEN, discount: "20000.01" },
      { ...SCREEN, icaWithholding: "30000" },
    ];
    for (const input of bad) expect(() => simpleDetailOf(input)).toThrow(expect.objectContaining({ statusCode: 400 }));
  });
});

describe("hasSimpleAmounts y simpleAmountsDto", () => {
  it("detecta si la petición trae importes (una simple anterior a DEC-065 puede no traerlos)", () => {
    expect(hasSimpleAmounts({ number: "F-1" })).toBe(false);
    expect(hasSimpleAmounts({ freight: "0" })).toBe(true);
  });

  it("el DTO trae lo capturado, las líneas en el orden de la pantalla y los dos totales", () => {
    const dto = simpleAmountsDto(simpleDetailOf(SCREEN));
    expect(dto.lines.map((l) => l.label)).toEqual(["VALOR", "RTE FUENTE", "DCTO AI", "SUBTOTAL", "IVA", "RTE IVA", "RTE ICA", "FLETE", "DCTO PRONTO PAGO"]);
    expect(dto).toMatchObject({ total: "21398.29", billed: "23798.10", formulaVersion: 1, captured: { vatPct: "19.00", icaWithholding: "10.00" } });
  });
});
