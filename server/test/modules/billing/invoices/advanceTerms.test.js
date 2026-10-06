import { Prisma } from "@prisma/client";
import {
  advanceBalances,
  appliedPct,
  assertAdvanceCancellable,
  assertAdvanceFits,
  assertAmortizationFits,
  balancesDto,
  defaultAmortization,
} from "../../../../src/modules/billing/invoices/advanceTerms.js";

// Anticipo y amortización sin BD (ADR-0024, DEC-044): saldos, valor por
// defecto con la razón exacta A / B, e invariantes I1 e I2.

const D = (value) => new Prisma.Decimal(value);

// Ejemplo de ADR-0024: B = 120.000.000, A = 32.000.000.
const balances = (invoiced = "32000000", amortized = "0") =>
  advanceBalances({ base: D("120000000"), agreed: D("32000000"), invoiced: invoiced === null ? null : D(invoiced), amortized: amortized === null ? null : D(amortized) });

describe("advanceBalances", () => {
  it("calcula por facturar, por amortizar y el porcentaje efectivo", () => {
    expect(balancesDto(balances("20000000", "5000000"))).toEqual({
      base: "120000000.00",
      agreed: "32000000.00",
      invoiced: "20000000.00",
      amortized: "5000000.00",
      toInvoice: "12000000.00",
      toAmortize: "15000000.00",
      effectivePct: "26.666667",
    });
  });

  it("sin facturas aprobadas, las sumas nulas cuentan cero", () => {
    expect(balancesDto(balances(null, null))).toMatchObject({ invoiced: "0.00", amortized: "0.00", toInvoice: "32000000.00", toAmortize: "0.00" });
  });

  it("I1 no es retroactivo: si un otrosí baja A por debajo de AF, por facturar queda en cero", () => {
    const after = advanceBalances({ base: D("100000000"), agreed: D("20000000"), invoiced: D("32000000"), amortized: D("0") });
    expect(after.toInvoice.toFixed(2)).toBe("0.00");
    expect(after.toAmortize.toFixed(2)).toBe("32000000.00");
  });

  it("sin base, el porcentaje efectivo es cero", () => {
    expect(advanceBalances({ base: 0, agreed: 0, invoiced: 0, amortized: 0 }).effectivePct.toFixed(6)).toBe("0.000000");
  });
});

describe("defaultAmortization", () => {
  it("usa la razón exacta A / B y cierra el saldo en cero en la última factura", () => {
    expect(defaultAmortization(D("90000000"), balances()).toFixed(2)).toBe("24000000.00");
    expect(defaultAmortization(D("30000000"), balances("32000000", "24000000")).toFixed(2)).toBe("8000000.00");
  });

  it("nunca supera el pendiente por amortizar ni el VALOR, ni es negativa", () => {
    expect(defaultAmortization(D("90000000"), balances("10000000")).toFixed(2)).toBe("10000000.00");
    expect(defaultAmortization(D("90000000"), balances("10000000", "10000000")).toFixed(2)).toBe("0.00");
    expect(defaultAmortization(D("90000000"), balances("10000000", "12000000")).toFixed(2)).toBe("0.00");
  });

  it("redondea a dos decimales con medio hacia arriba", () => {
    // 100,01 × 32 / 120 = 26,6693… → 26,67
    expect(defaultAmortization(D("100.01"), balances()).toFixed(2)).toBe("26.67");
  });
});

describe("invariantes", () => {
  it("I1: el anticipo cabe en lo que queda por facturar", () => {
    expect(() => assertAdvanceFits(D("12000000"), balances("20000000"))).not.toThrow();
    expect(() => assertAdvanceFits(D("12000000.01"), balances("20000000"))).toThrow(expect.objectContaining({ statusCode: 409 }));
  });

  it("I2: la amortización cabe en el pendiente y en el VALOR", () => {
    expect(() => assertAmortizationFits(D("8000000"), D("30000000"), balances("32000000", "24000000"))).not.toThrow();
    expect(() => assertAmortizationFits(D("8000000.01"), D("30000000"), balances("32000000", "24000000"))).toThrow(expect.objectContaining({ statusCode: 409 }));
    expect(() => assertAmortizationFits(D("101"), D("100"), balances())).toThrow(expect.objectContaining({ statusCode: 400 }));
    expect(() => assertAmortizationFits(D("-1"), D("100"), balances())).toThrow(expect.objectContaining({ statusCode: 400 }));
  });

  it("I2 al anular un anticipo: lo amortizado no puede quedar por encima de lo facturado", () => {
    expect(() => assertAdvanceCancellable(D("10000000"), balances("32000000", "22000000"))).not.toThrow();
    expect(() => assertAdvanceCancellable(D("10000000"), balances("32000000", "22000000.01"))).toThrow(expect.objectContaining({ statusCode: 409 }));
  });
});

describe("appliedPct", () => {
  it("amortización / VALOR × 100, con seis decimales", () => {
    expect(appliedPct(D("20000000"), D("90000000")).toFixed(6)).toBe("22.222222");
    expect(appliedPct(D("0"), D("0")).toFixed(6)).toBe("0.000000");
  });
});
