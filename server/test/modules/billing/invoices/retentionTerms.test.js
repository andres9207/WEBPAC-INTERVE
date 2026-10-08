import { Prisma } from "@prisma/client";
import {
  assertLiquidationCancellable,
  assertRefundFits,
  assertRetentionFits,
  defaultRetention,
  retentionBalances,
  retentionDto,
} from "../../../../src/modules/billing/invoices/retentionTerms.js";

// Retenido contractual sin BD (ADR-0025, DEC-051): saldos, valor por defecto
// con la razón exacta RP / B, e invariantes I3 e I4.

const D = (value) => new Prisma.Decimal(value);

// B = 120.000.000, RP = 6.000.000 (5 %).
const balances = (retained = "0", refunded = "0", agreed = "6000000") =>
  retentionBalances({
    base: D("120000000"),
    agreed: D(agreed),
    retained: retained === null ? null : D(retained),
    refunded: refunded === null ? null : D(refunded),
  });

describe("retentionBalances", () => {
  it("calcula por retener, el saldo y el porcentaje efectivo", () => {
    expect(retentionDto(balances("4500000", "1000000"))).toEqual({
      agreed: "6000000.00",
      retained: "4500000.00",
      refunded: "1000000.00",
      toRetain: "1500000.00",
      balance: "3500000.00",
      effectivePct: "5.000000",
    });
  });

  it("sin facturas aprobadas, las sumas nulas cuentan cero", () => {
    expect(retentionDto(balances(null, null))).toMatchObject({ retained: "0.00", refunded: "0.00", toRetain: "6000000.00", balance: "0.00" });
  });

  it("I4 no es retroactivo: si un otrosí baja RP por debajo de R, por retener queda en cero", () => {
    expect(balances("6000000", "0", "5000000").toRetain.toFixed(2)).toBe("0.00");
  });

  it("sin base, el porcentaje efectivo es cero", () => {
    const empty = retentionBalances({ base: D(0), agreed: D(0), retained: null, refunded: null });
    expect(empty.effectivePct.toFixed(6)).toBe("0.000000");
    expect(defaultRetention("1000", empty).toFixed(2)).toBe("0.00");
  });
});

describe("defaultRetention", () => {
  it("es VALOR × RP / B, redondeado medio hacia arriba", () => {
    expect(defaultRetention("90000000", balances()).toFixed(2)).toBe("4500000.00");
    // 333,33 × 5 % = 16,6665 → 16,67
    expect(defaultRetention("333.33", balances()).toFixed(2)).toBe("16.67");
  });

  it("facturada toda la base, el retenido cierra exactamente en RP", () => {
    const first = defaultRetention("90000000", balances());
    const second = defaultRetention("30000000", balances(first));
    expect(first.plus(second).toFixed(2)).toBe("6000000.00");
  });

  it("nunca supera lo que queda por retener ni el VALOR", () => {
    expect(defaultRetention("90000000", balances("5000000")).toFixed(2)).toBe("1000000.00");
    expect(defaultRetention("90000000", balances("6000000")).toFixed(2)).toBe("0.00");
  });
});

describe("assertRetentionFits (I4)", () => {
  it("admite hasta lo que queda por retener", () => {
    expect(() => assertRetentionFits("1500000", "90000000", balances("4500000"))).not.toThrow();
  });

  it("409 si supera lo que queda por retener, con los saldos en el mensaje", () => {
    expect(() => assertRetentionFits("1500000.01", "90000000", balances("4500000"))).toThrow(
      expect.objectContaining({ statusCode: 409, message: expect.stringContaining("por retener (1500000.00)") })
    );
  });

  it("400 si es negativo o supera el VALOR", () => {
    expect(() => assertRetentionFits("-1", "100", balances())).toThrow(expect.objectContaining({ statusCode: 400 }));
    expect(() => assertRetentionFits("101", "100", balances())).toThrow(expect.objectContaining({ statusCode: 400 }));
  });
});

describe("assertRefundFits (I3)", () => {
  it("admite hasta el saldo de retenido, en varias devoluciones", () => {
    expect(() => assertRefundFits("3500000", balances("4500000", "1000000"))).not.toThrow();
    expect(() => assertRefundFits("3500000.01", balances("4500000", "1000000"))).toThrow(
      expect.objectContaining({ statusCode: 409, message: expect.stringContaining("saldo de retenido (3500000.00)") })
    );
  });

  it("sin retenido acumulado no hay nada que devolver (409)", () => {
    expect(() => assertRefundFits("0.01", balances())).toThrow(expect.objectContaining({ statusCode: 409 }));
  });
});

describe("assertLiquidationCancellable (I3 al anular)", () => {
  it("admite anular si el retenido restante sigue cubriendo lo devuelto", () => {
    expect(() => assertLiquidationCancellable("4500000", balances("6000000", "1500000"))).not.toThrow();
  });

  it("409 si el retenido de la factura ya se devolvió", () => {
    expect(() => assertLiquidationCancellable("4500000", balances("6000000", "1500000.01"))).toThrow(
      expect.objectContaining({ statusCode: 409, message: expect.stringContaining("ya fue devuelto") })
    );
  });
});
