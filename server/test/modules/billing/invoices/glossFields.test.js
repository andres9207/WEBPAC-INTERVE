import { readFileSync } from "node:fs";
import { GLOSS_FIELD_NAMES, OTHER_FIELD, glossFieldFor, glossFieldsFor } from "../../../../src/modules/billing/invoices/glossFields.js";

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
