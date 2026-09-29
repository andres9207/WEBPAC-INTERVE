const { identificationError, nitCheckDigit, formatFor, GENERIC_FORMAT } = await import(
  "../../../../src/modules/admin/identityDocuments/identityDocuments.formats.js"
);

// Formatos definidos el 2026-09-29 (ADR-0008, decisión 5).

describe("identificationError", () => {
  it.each([
    ["CC", "123456"],
    ["CC", "1234567890"],
    ["CE", "123"],
    ["CE", "1234567"],
    ["NIT", "800197268-4"], // NIT de la DIAN
    ["PA", "AB12345"],
    ["PPT", "123456"],
    ["PPT", "123456789012345"],
  ])("%s %s es válido", (code, number) => {
    expect(identificationError(code, number)).toBeNull();
  });

  it.each([
    ["CC", "12345"], // corto
    ["CC", "12345678901"], // largo
    ["CC", "1.234.567"], // con puntos
    ["CE", "12345678"],
    ["NIT", "800197268"], // sin DV
    ["NIT", "8001972684"], // sin guion
    ["PA", "AB-1234"], // guion
    ["PA", "A123"], // corto
    ["PPT", "12345"],
    ["PPT", "ABC123"],
  ])("%s %s es inválido", (code, number) => {
    expect(identificationError(code, number)).toEqual(expect.any(String));
  });

  it("NIT con dígito de verificación que no corresponde", () => {
    expect(identificationError("NIT", "800197268-5")).toBe("el dígito de verificación no corresponde al NIT");
  });

  it("recorta espacios de borde y no distingue mayúsculas en el código", () => {
    expect(identificationError("cc", " 1234567 ")).toBeNull();
  });

  it("un tipo sin regla propia usa el formato genérico", () => {
    expect(formatFor("OTRO")).toBe(GENERIC_FORMAT);
    expect(identificationError("OTRO", "AB-12")).toBeNull();
    expect(identificationError("OTRO", "A")).toEqual(expect.any(String));
  });
});

describe("nitCheckDigit (módulo 11 de la DIAN)", () => {
  it("calcula el dígito de NIT conocidos", () => {
    expect(nitCheckDigit("800197268")).toBe(4); // DIAN
    expect(nitCheckDigit("899999034")).toBe(1); // SENA
  });
});
