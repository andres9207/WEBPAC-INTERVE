const { toMoney, moneyText } = await import("../../../src/common/utils/money.utils.js");

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
