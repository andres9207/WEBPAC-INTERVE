import { validationResult } from "express-validator";

const { saveProfileSchema } = await import("../../../../src/modules/security/profiles/profiles.validation.js");

const errorsFor = async (schema, body) => {
  const req = { headers: {}, body };
  for (const rule of schema) await rule.run(req);
  return validationResult(req).array().map((e) => e.msg);
};

describe("saveProfileSchema — estado editable", () => {
  const profile = { proId: 2, name: "Compras", modules: [1] };

  it("acepta activo e inactivo", async () => {
    expect(await errorsFor(saveProfileSchema, { ...profile, staId: 1 })).toEqual([]);
    expect(await errorsFor(saveProfileSchema, { ...profile, staId: 2 })).toEqual([]);
  });

  it("rechaza el estado eliminado: eliminar va por deleteProfile, que verifica los usuarios", async () => {
    expect(await errorsFor(saveProfileSchema, { ...profile, staId: 3 })).toEqual(["El estado debe ser activo o inactivo."]);
  });
});
