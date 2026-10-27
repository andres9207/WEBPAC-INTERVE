import { STATEMENT_AMOUNTS, statementAmounts } from "../../../../src/modules/billing/invoices/statementAmounts.js";

// Importes de cada factura en el reporte del extracto (DEC-084): todos los
// del Detalle de su tipo, uno por columna, null los que el tipo no tiene.

const filled = (amounts) => Object.fromEntries(Object.entries(amounts).filter(([, value]) => value !== null));

describe("importes de una factura en el extracto", () => {
  it("una columna por importe, cada una una sola vez", () => {
    const keys = STATEMENT_AMOUNTS.map(([key]) => key);
    expect(new Set(keys).size).toBe(keys.length);
    expect(Object.keys(statementAmounts({}))).toEqual(keys);
  });

  it("normal y liquidación: la composición de DEC-075, con la utilidad y el IVA sobre ella (v2)", () => {
    const row = {
      tbl_invoice_liquidation_details: {
        ild_value: "2000000",
        ild_amortization: "10",
        ild_retention: "10",
        ild_utility_pct: "10",
        ild_vat_pct: "19",
        ild_withholding_pct: "10",
        ild_vat_withholding_pct: "10",
        ild_ica_withholding: "10",
        ild_materials_discount: "1000",
        ild_formula_version: 2,
      },
    };
    expect(filled(statementAmounts(row))).toEqual({
      value: "2000000.00",
      utility: "200000.00",
      vat: "38000.00",
      withholding: "200000.00",
      vatWithholding: "3800.00",
      icaWithholding: "10.00",
      amortization: "10.00",
      retention: "10.00",
      materialsDiscount: "1000.00",
      total: "1833170.00",
    });
  });

  it("una de contrato registrada antes de DEC-075: solo lo que guarda, sin neto", () => {
    const row = { tbl_invoice_liquidation_details: { ild_value: "500", ild_amortization: "50", ild_retention: null, ild_vat_pct: null } };
    expect(filled(statementAmounts(row))).toEqual({ value: "500.00", amortization: "50.00" });
  });

  it("simple: la composición de DEC-065", () => {
    const row = {
      tbl_invoice_simple_details: {
        isd_value: "1000",
        isd_withholding_pct: "0",
        isd_discount: "100",
        isd_vat_pct: "19",
        isd_vat_withholding_pct: "0",
        isd_ica_withholding: "0",
        isd_freight: "0",
        isd_early_payment_discount: "0",
        isd_formula_version: 1,
      },
    };
    expect(filled(statementAmounts(row))).toMatchObject({ value: "1000.00", discount: "100.00", vat: "171.00", total: "1071.00" }); // subtotal 900 + IVA 171
    expect(statementAmounts(row).amortization).toBeNull();
  });

  it("anticipo y devolución de retenido: en su columna, no en Valor, y como neto", () => {
    expect(filled(statementAmounts({ tbl_invoice_advance_details: { iad_value: "300000" } }))).toEqual({ advance: "300000.00", total: "300000.00" });
    expect(filled(statementAmounts({ tbl_invoice_retention_refund_details: { irr_value: "5000" } }))).toEqual({ retentionRefund: "5000.00", total: "5000.00" });
  });
});
