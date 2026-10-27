import { validationResult } from "express-validator";

const { saveProviderSchema } = await import("../../../../src/modules/work/providers/providers.validation.js");

const errorsFor = async (serviceType) => {
  const req = {
    body: {
      iddId: 1,
      identification: "123456",
      name: "Proveedor de prueba",
      pvtIds: [1],
      serviceType,
    },
    headers: { "idempotency-key": "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b" },
  };
  for (const rule of saveProviderSchema) await rule.run(req);
  return validationResult(req).array().map((error) => error.msg);
};

describe("saveProviderSchema tipo de servicio", () => {
  it("acepta valores de servicio de hasta 255 caracteres", async () => {
    expect(await errorsFor("x".repeat(176))).toEqual([]);
    expect(await errorsFor("x".repeat(255))).toEqual([]);
  });

  it("rechaza valores de servicio mayores a 255 caracteres", async () => {
    expect(await errorsFor("x".repeat(256))).toContain("El tipo de servicio admite hasta 255 caracteres.");
  });
});
