import {
  CONTRACT_FORMULA_VERSION,
  assertContractTotal,
  composeContractInvoice,
  contractDraftOf,
  contractPairsDto,
  contractTaxDetailOf,
  contractTaxesDto,
  convertContractAmounts,
  hasContractTaxes,
} from "../../../../src/modules/billing/invoices/contractInvoiceTerms.js";

// Composición de la normal y la liquidación (DEC-075): la fórmula del sistema
// que se migra. El caso de referencia es su pantalla: VALOR 2.000.000, %
// utilidad 10, % IVA 19, % rte fuente 10, % rte IVA 10, RTE ICA 10,
// amortización 10, retenido 10, DCTO MATERIALES 1.000. En esa pantalla la
// misma factura llevaba además ANTICIPO 10 y DEVOLUCIÓN RETENIDO 1.000, que
// aquí son sus propios tipos de factura: su TOTAL, 2.141.980, es este más
// 10 + 1.000.

const SCREEN = {
  value: "2000000",
  utilityPct: "10",
  vatPct: "19",
  withholdingPct: "10",
  vatWithholdingPct: "10",
  icaWithholding: "10",
  amortization: "10",
  retention: "10",
  materialsDiscount: "1000",
};

const detailOf = (input) => ({
  ...contractTaxDetailOf(input),
  ild_value: input.value,
  ild_amortization: input.amortization ?? "0",
  ild_retention: input.retention ?? "0",
});

// Una factura registrada con la v1 (IVA sobre el VALOR) se sigue componiendo con ella.
const v1 = (input) => ({ ...detailOf(input), ild_formula_version: 1 });

const text = (composed) => Object.fromEntries(Object.entries(composed).map(([key, value]) => [key, value.toFixed(2)]));

describe("composeContractInvoice v1", () => {
  it("reproduce al centavo la pantalla del sistema que se migra", () => {
    const composed = text(composeContractInvoice(v1(SCREEN)));
    expect(composed).toEqual({
      value: "2000000.00",
      utility: "200000.00", // se guarda, pero no entra en ninguna cifra
      vatBase: "2000000.00",
      vat: "380000.00", // VALOR × % IVA, no sobre la utilidad
      valueWithVat: "2380000.00",
      withholding: "200000.00",
      vatWithholding: "38000.00", // sobre el IVA
      icaWithholding: "10.00",
      amortization: "10.00",
      retention: "10.00",
      materialsDiscount: "1000.00",
      total: "2140970.00",
    });
    // La pantalla sumaba el anticipo (+10) y la devolución de retenido (+1.000).
    expect((2140970 + 10 + 1000).toFixed(2)).toBe("2141980.00");
  });

  it("el % utilidad no cambia el IVA ni el total", () => {
    const without = composeContractInvoice(v1({ ...SCREEN, utilityPct: "0" }));
    const withUtility = composeContractInvoice(v1(SCREEN));
    expect(withUtility.vat.eq(without.vat)).toBe(true);
    expect(withUtility.total.eq(without.total)).toBe(true);
  });

  it("redondea cada línea antes de sumar (medio hacia arriba)", () => {
    const composed = text(composeContractInvoice(v1({ value: "100.05", vatPct: "19", vatWithholdingPct: "15" })));
    expect(composed.vat).toBe("19.01"); // 19.0095
    expect(composed.vatWithholding).toBe("2.85"); // 2.8515 sobre el IVA ya redondeado
    expect(composed.total).toBe("116.21");
  });

  it("una versión de fórmula desconocida es un error de programación", () => {
    expect(() => composeContractInvoice({ ...detailOf(SCREEN), ild_formula_version: 99 })).toThrow("versión de fórmula desconocida");
  });
});

describe("composeContractInvoice v2 (IVA sobre la utilidad)", () => {
  it("con utilidad, el IVA es sobre ella; las retenciones conservan su base", () => {
    expect(CONTRACT_FORMULA_VERSION).toBe(2);
    const composed = text(composeContractInvoice(detailOf(SCREEN)));
    expect(composed).toEqual({
      value: "2000000.00",
      utility: "200000.00",
      vatBase: "200000.00",
      vat: "38000.00", // UTILIDAD × % IVA
      valueWithVat: "2038000.00",
      withholding: "200000.00", // sobre el VALOR
      vatWithholding: "3800.00", // sobre el IVA
      icaWithholding: "10.00",
      amortization: "10.00",
      retention: "10.00",
      materialsDiscount: "1000.00",
      total: "1833170.00",
    });
  });

  it("sin utilidad, el IVA es sobre el VALOR, como en la v1", () => {
    const input = { ...SCREEN, utilityPct: "0" };
    expect(text(composeContractInvoice(detailOf(input)))).toEqual(text(composeContractInvoice(v1(input))));
  });

  it("el caso de la pantalla: VALOR 23.000.000, utilidad 5 %, IVA 19 %", () => {
    const composed = text(composeContractInvoice(detailOf({ value: "23000000", utilityPct: "5", vatPct: "19" })));
    expect(composed).toMatchObject({ utility: "1150000.00", vat: "218500.00", valueWithVat: "23218500.00" });
  });
});

describe("contractTaxDetailOf", () => {
  it("el % IVA es obligatorio; los demás, vacíos, valen 0", () => {
    expect(() => contractTaxDetailOf({})).toThrow(expect.objectContaining({ statusCode: 400, message: expect.stringContaining("% de IVA") }));
    const detail = contractTaxDetailOf({ vatPct: "0" });
    expect(Object.fromEntries(Object.entries(detail).map(([k, v]) => [k, String(v)]))).toEqual({
      ild_utility_pct: "0",
      ild_vat_pct: "0",
      ild_withholding_pct: "0",
      ild_vat_withholding_pct: "0",
      ild_ica_withholding: "0",
      ild_materials_discount: "0",
      ild_formula_version: String(CONTRACT_FORMULA_VERSION),
    });
  });

  it("rechaza porcentajes fuera de 0 a 100 e importes negativos (400)", () => {
    expect(() => contractTaxDetailOf({ vatPct: "101" })).toThrow(expect.objectContaining({ statusCode: 400 }));
    expect(() => contractTaxDetailOf({ vatPct: "19", withholdingPct: "-1" })).toThrow(expect.objectContaining({ statusCode: 400 }));
    expect(() => contractTaxDetailOf({ vatPct: "19", materialsDiscount: "-5" })).toThrow(expect.objectContaining({ statusCode: 400 }));
  });

  it("el neto a pagar no puede quedar negativo (400)", () => {
    expect(() => assertContractTotal(detailOf({ value: "1000", vatPct: "0", materialsDiscount: "1000.01" }))).toThrow(
      expect.objectContaining({ statusCode: 400, message: expect.stringContaining("negativo") })
    );
    expect(() => assertContractTotal(detailOf({ value: "1000", vatPct: "0", materialsDiscount: "1000" }))).not.toThrow();
  });
});

describe("valor y porcentaje (DEC-065, extendido por DEC-075)", () => {
  it("convierte cada importe escrito por su otro lado a como se guarda", () => {
    const converted = convertContractAmounts({
      value: "2000000",
      vatAmount: "38000", // sobre la utilidad ya convertida
      vatWithholdingAmount: "3800", // sobre el IVA ya convertido
      icaWithholdingPct: "0.5",
      materialsDiscountPct: "1",
      utilityAmount: "200000",
    });
    expect(converted).toMatchObject({
      vatPct: "19.00",
      vatWithholdingPct: "10.00",
      icaWithholding: "10000.00",
      materialsDiscount: "20000.00",
      utilityPct: "10.00",
    });
  });

  it("da el valor y el % de cada importe", () => {
    const pairs = contractPairsDto(contractDraftOf(SCREEN));
    expect(pairs.vatPct).toEqual({ amount: "38000.00", pct: "19.00" });
    expect(pairs.vatWithholdingPct).toEqual({ amount: "3800.00", pct: "10.00" });
    expect(pairs.icaWithholding).toEqual({ amount: "10.00", pct: "0.00" });
    expect(pairs.materialsDiscount).toEqual({ amount: "1000.00", pct: "0.05" });
    expect(pairs.utilityPct).toEqual({ amount: "200000.00", pct: "10.00" });
  });
});

describe("contractTaxesDto", () => {
  it("lo capturado, las líneas del panel en el orden de la pantalla y el neto", () => {
    const dto = contractTaxesDto(detailOf(SCREEN));
    expect(dto.captured).toEqual({
      utilityPct: "10.00",
      vatPct: "19.00",
      withholdingPct: "10.00",
      vatWithholdingPct: "10.00",
      icaWithholding: "10.00",
      materialsDiscount: "1000.00",
    });
    expect(dto.lines.map((line) => line.label)).toEqual([
      "VALOR",
      "IVA",
      "VALOR + IVA",
      "RTE FUENTE",
      "RTE IVA",
      "RTE ICA",
      "AMORTIZACIÓN",
      "RETENIDO",
      "DCTO MATERIALES",
    ]);
    expect(dto.total).toBe("1833170.00");
    expect(dto.formulaVersion).toBe(2);
  });

  it("una factura registrada antes de DEC-075 no tiene composición", () => {
    expect(hasContractTaxes({ ild_vat_pct: null })).toBe(false);
    expect(hasContractTaxes(detailOf(SCREEN))).toBe(true);
  });
});
