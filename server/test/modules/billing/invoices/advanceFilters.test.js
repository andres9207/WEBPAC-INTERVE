import { advanceBalances } from "../../../../src/modules/billing/invoices/advanceTerms.js";
import { CONTRACT_ADVANCE_FILTERS, invoiceAdvanceWhere, matchesContractAdvance } from "../../../../src/modules/billing/invoices/advanceFilters.js";

// Filtro "Anticipo" de los contratos: por sus saldos de anticipo, los mismos
// del expediente (advanceBalances, solo facturas aprobadas).

const balances = (agreed, invoiced, amortized) => advanceBalances({ base: "1000", agreed, invoiced, amortized });

describe("matchesContractAdvance", () => {
  it.each([
    // [pactado, facturado, amortizado, filtros que cumple]
    ["0", "0", "0", []],
    ["150", "0", "0", ["WITH_ADVANCE", "TO_INVOICE"]],
    ["150", "75", "30", ["WITH_ADVANCE", "TO_INVOICE", "TO_AMORTIZE"]],
    ["150", "150", "30", ["WITH_ADVANCE", "TO_AMORTIZE"]],
    ["150", "150", "150", ["WITH_ADVANCE", "AMORTIZED"]],
  ])("pactado %s, facturado %s, amortizado %s", (agreed, invoiced, amortized, expected) => {
    const matched = Object.values(CONTRACT_ADVANCE_FILTERS).filter((f) => matchesContractAdvance(f, balances(agreed, invoiced, amortized)));
    expect(matched).toEqual(expected);
  });
});

describe("invoiceAdvanceWhere", () => {
  it("sin filtro o con uno desconocido, ninguna condición", () => {
    expect(invoiceAdvanceWhere(undefined)).toBeNull();
    expect(invoiceAdvanceWhere("OTHER")).toBeNull();
  });

  it("por aprobar: registradas, de anticipo o con amortización", () => {
    expect(invoiceAdvanceWhere("PENDING")).toEqual({
      inv_state: "REGISTERED",
      OR: [{ inv_type: "ADVANCE" }, { inv_type: { in: ["NORMAL", "LIQUIDATION"] }, tbl_invoice_liquidation_details: { ild_amortization: { gt: 0 } } }],
    });
  });
});
