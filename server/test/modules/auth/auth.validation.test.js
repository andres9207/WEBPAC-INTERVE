import { validationResult } from "express-validator";

const { updateThemeModeSchema } = await import("../../../src/modules/auth/auth.validation.js");

const errorsFor = async (schema, body) => {
  const req = { body };
  for (const rule of schema) await rule.run(req);
  return validationResult(req).array().map((e) => e.msg);
};

describe("updateThemeModeSchema", () => {
  it("acepta light y dark", async () => {
    expect(await errorsFor(updateThemeModeSchema, { themeMode: "light" })).toEqual([]);
    expect(await errorsFor(updateThemeModeSchema, { themeMode: "dark" })).toEqual([]);
  });

  it("rechaza otro valor o la ausencia del campo", async () => {
    expect(await errorsFor(updateThemeModeSchema, { themeMode: "system" })).toEqual(["El tema debe ser light o dark."]);
    expect(await errorsFor(updateThemeModeSchema, {})).toEqual(["El tema debe ser light o dark."]);
  });
});
