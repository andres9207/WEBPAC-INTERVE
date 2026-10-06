const { toMoney, moneyText, sumMoney } = await import("../../../src/common/utils/money.utils.js");

describe("sumMoney", () => {
  it("suma en Decimal sin perder centavos y cuenta los null como 0", () => {
    expect(sumMoney(["0.10", "0.20", null, "4850000000.01"]).toFixed(2)).toBe("4850000000.31");
  });

  it("una lista vacía suma 0", () => {
    expect(sumMoney([]).toFixed(2)).toBe("0.00");
  });
});

// DEC-028: dos decimales, medio hacia arriba, solo si sobran.
describe("toMoney", () => {
  it.each([
    ["10.005", "10.01"],
    ["10.004", "10.00"],
    ["0.005", "0.01"],
    ["1234567890123456.99", "1234567890123456.99"],
    ["7", "7.00"],
    [7.5, "7.50"],
    [" 12.3 ", "12.30"],
  ])("%j → %s", (value, expected) => {
    expect(toMoney(value).toFixed(2)).toBe(expected);
  });

  it("un valor con dos decimales o menos no cambia", () => {
    expect(toMoney("99.99").equals("99.99")).toBe(true);
  });

  it.each([null, undefined, "", "  "])("vacío (%j) es null", (value) => {
    expect(toMoney(value)).toBeNull();
  });
});

describe("moneyText", () => {
  it("devuelve dos decimales, o null", () => {
    expect(moneyText("250000.1")).toBe("250000.10");
    expect(moneyText(null)).toBeNull();
  });
});

// ─── Regla única de redondeo (DEC-045): casos límite ─────────────────────────

const { percentOf, ratioPercent, toPercent, percentText, ratioText, roundMoney } = await import("../../../src/common/utils/money.utils.js");

describe("regla única: medio hacia arriba, sin punto flotante", () => {
  it.each([
    // En double, 2.675 es 2.67499999…: Math.round(2.675 * 100) / 100 da 2.67.
    ["2.675", "2.68"],
    ["1.005", "1.01"],
    ["1.015", "1.02"],
    ["0.125", "0.13"],
    ["0.135", "0.14"],
    ["0.0049999", "0.00"],
    ["0.995", "1.00"],
    ["9999999999999999.995", "10000000000000000.00"],
  ])("%s → %s", (value, expected) => {
    expect(roundMoney(value).toFixed(2)).toBe(expected);
  });

  it("0,1 + 0,2 es exactamente 0,3", () => {
    expect(sumMoney(["0.1", "0.2"]).equals("0.3")).toBe(true);
  });

  it("acepta importes más allá de la precisión de un double sin perder centavos", () => {
    // 2^53 = 9007199254740992: en double, 9007199254740993 no existe.
    expect(sumMoney(["9007199254740992.00", "1.01"]).toFixed(2)).toBe("9007199254740993.01");
  });
});

describe("percentOf: una línea, redondeada antes de sumar", () => {
  it.each([
    ["100", "19", "19.00"],
    ["33.33", "19", "6.33"], // 6,3327
    ["0.05", "10", "0.01"], // 0,005 → 0,01
    ["0.04", "10", "0.00"], // 0,004
    ["1000000", "0", "0.00"],
    ["1000000", null, "0.00"],
    ["1234567.89", "15.5", "191358.02"], // 191358,02295
  ])("%s × %s %% → %s", (base, percent, expected) => {
    expect(percentOf(base, percent).toFixed(2)).toBe(expected);
  });

  it("el total es la suma de las líneas redondeadas, no el redondeo del total", () => {
    // Tres líneas de 0,05 al 10 %: cada una 0,005 → 0,01; total 0,03.
    // Redondear al final daría 0,015 → 0,02, distinto de lo que se muestra por línea.
    const lines = ["0.05", "0.05", "0.05"].map((base) => percentOf(base, "10"));
    expect(sumMoney(lines).toFixed(2)).toBe("0.03");
  });
});

describe("porcentajes y razones", () => {
  it("toPercent: dos decimales, vacío es 0", () => {
    expect(toPercent("19.005").toFixed(2)).toBe("19.01");
    expect(toPercent("").toFixed(2)).toBe("0.00");
    expect(percentText("15")).toBe("15.00");
    expect(percentText(null)).toBeNull();
  });

  it("ratioPercent: seis decimales; sin denominador, 0", () => {
    expect(ratioText(ratioPercent("32000000", "120000000"))).toBe("26.666667");
    expect(ratioText(ratioPercent("1", "3"))).toBe("33.333333");
    expect(ratioText(ratioPercent("5", "0"))).toBe("0.000000");
  });
});
