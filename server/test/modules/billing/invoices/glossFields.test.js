import { readFileSync } from "node:fs";
import { GLOSS_FIELD_NAMES, OTHER_FIELD, glossFieldFor, glossFieldsFor, glossPair } from "../../../../src/modules/billing/invoices/glossFields.js";

// Campo de la glosa (DEC-085): los del Detalle de cada tipo de factura, sin
// sumas ni totales, más "Otro". La BD cierra el mismo dominio (migración 0126).

const labels = (type) => glossFieldsFor(type).map((option) => option.label);

describe("campos de la glosa por tipo de factura", () => {
  it("normal y liquidación: los del Detalle sin VALOR + IVA", () => {
    const expected = ["VALOR", "IVA", "RTE FUENTE", "RTE IVA", "RTE ICA", "AMORTIZACIÓN", "RETENIDO", "DCTO MATERIALES", "OTRO"];
    expect(labels("NORMAL")).toEqual(expected);
    expect(labels("LIQUIDATION")).toEqual(expected);
  });

  it("simple: los del Detalle sin SUBTOTAL", () => {
    expect(labels("SIMPLE")).toEqual(["VALOR", "RTE FUENTE", "DCTO AI", "IVA", "RTE IVA", "RTE ICA", "FLETE", "DCTO PRONTO PAGO", "OTRO"]);
  });

  it("anticipo y devolución de retenido: su valor", () => {
    expect(labels("ADVANCE")).toEqual(["ANTICIPO", "OTRO"]);
    expect(labels("RETENTION_REFUND")).toEqual(["VALOR", "OTRO"]);
  });

  it("un campo que el tipo no tiene no se admite", () => {
    expect(glossFieldFor("ADVANCE", "advance")).toBe("advance");
    expect(glossFieldFor("ADVANCE", OTHER_FIELD)).toBe(OTHER_FIELD);
    expect(glossFieldFor("ADVANCE", "vat")).toBeNull();
    expect(glossFieldFor("SIMPLE", "amortization")).toBeNull();
    expect(glossFieldFor("NORMAL", "valueWithVat")).toBeNull();
  });

  it("el CHECK de la migración 0126 cierra el mismo dominio que el catálogo", () => {
    const sql = readFileSync(new URL("../../../../../database/migrations/0126_invoice_gloss_field.sql", import.meta.url), "utf8");
    const check = sql.match(/`igl_field` IN \(([^)]*)\)/)[1];
    const inDb = [...check.matchAll(/'([^']+)'/g)].map((m) => m[1]).sort();
    expect(inDb).toEqual(Object.keys(GLOSS_FIELD_NAMES).sort());
  });
});

describe("importe del campo y valor y % de la glosa (DEC-092)", () => {
  const amountOf = (type, amounts, field) => glossFieldsFor(type, amounts).find((o) => o.value === field).amount;

  it("cada campo trae su línea del Detalle; Otro, sin importe", () => {
    const amounts = { lines: [{ key: "value", value: "1000.00" }, { key: "vat", value: "190.00" }, { key: "valueWithVat", value: "1190.00" }] };
    expect(amountOf("NORMAL", amounts, "vat")).toBe("190.00");
    expect(amountOf("NORMAL", amounts, OTHER_FIELD)).toBeNull();
    expect(amountOf("NORMAL", null, "vat")).toBeUndefined();
  });

  it("anticipo, devolución y la normal sin impuestos toman su valor guardado", () => {
    expect(amountOf("ADVANCE", { value: "500.00" }, "advance")).toBe("500.00");
    expect(amountOf("RETENTION_REFUND", { value: "80.00" }, "value")).toBe("80.00");
    expect(amountOf("LIQUIDATION", { value: "900.00", amortization: "90.00", retention: null }, "amortization")).toBe("90.00");
    expect(amountOf("LIQUIDATION", { value: "900.00", amortization: "90.00", retention: null }, "vat")).toBeNull();
  });

  it("escrito en valor da el %; escrito en % da el valor; con signo", () => {
    expect(glossPair({ amount: "190.00", value: "19", pct: null })).toEqual({ value: "19.00", pct: "10.00" });
    expect(glossPair({ amount: "190.00", value: "", pct: "-10" })).toEqual({ value: "-19.00", pct: "-10.00" });
  });

  it("sin importe del campo (Otro, o en cero) no hay %; y sin nada escrito, nada", () => {
    expect(glossPair({ amount: null, value: "50", pct: null })).toEqual({ value: "50.00", pct: null });
    expect(glossPair({ amount: "0.00", value: "", pct: "10" })).toEqual({ value: null, pct: null });
    expect(glossPair({ amount: "100.00", value: "", pct: "" })).toEqual({ value: null, pct: null });
  });
});
