process.env.JWT_SECRET = "test-secret";

const { generateResetCode, hashResetCode, verifyResetCode } = await import(
  "../../../src/common/utils/resetCode.utils.js"
);

describe("resetCode.utils", () => {
  it("genera códigos de 6 dígitos", () => {
    for (let i = 0; i < 200; i += 1) {
      const code = generateResetCode();
      expect(code).toBeGreaterThanOrEqual(100000);
      expect(code).toBeLessThan(1000000);
    }
  });

  it("el hash no contiene el código y verifica solo el código correcto", () => {
    const hash = hashResetCode({ code: 123456, useId: 1 });

    expect(hash).toMatch(/^[0-9a-f]{64}$/);
    expect(hash).not.toContain("123456");
    expect(verifyResetCode({ code: "123456", useId: 1, hash })).toBe(true);
    expect(verifyResetCode({ code: "123457", useId: 1, hash })).toBe(false);
  });

  it("el hash está atado al usuario: el mismo código no sirve para otra cuenta", () => {
    const hash = hashResetCode({ code: 123456, useId: 1 });
    expect(verifyResetCode({ code: "123456", useId: 2, hash })).toBe(false);
  });

  it("depende del secreto del servidor, no solo del código (no invertible leyendo la BD)", () => {
    const hash = hashResetCode({ code: 123456, useId: 1 });
    process.env.JWT_SECRET = "otro-secreto";
    expect(hashResetCode({ code: 123456, useId: 1 })).not.toBe(hash);
    process.env.JWT_SECRET = "test-secret";
  });

  it("rechaza un hash vacío o malformado sin lanzar", () => {
    expect(verifyResetCode({ code: "123456", useId: 1, hash: null })).toBe(false);
    expect(verifyResetCode({ code: "123456", useId: 1, hash: "abc" })).toBe(false);
  });
});
