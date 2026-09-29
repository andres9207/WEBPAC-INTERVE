import { validationResult } from "express-validator";

const { saveUserSchema } = await import("../../../../src/modules/security/users/users.validation.js");

const errorsFor = async (schema, body) => {
  const req = { headers: {}, body };
  for (const rule of schema) await rule.run(req);
  return validationResult(req).array().map((e) => e.msg);
};

describe("saveUserSchema — número y tipo de identificación juntos (ADR-0008, DOM-26)", () => {
  const user = { useId: 5, proId: 2, staId: 1, name: "Ana", lastName: "Paz", email: "ana@a.com" };

  it("número sin tipo", async () => {
    expect(await errorsFor(saveUserSchema, { ...user, identification: "123" })).toEqual(["Selecciona el tipo de identificación."]);
  });

  it("tipo sin número", async () => {
    expect(await errorsFor(saveUserSchema, { ...user, iddId: 1, identification: "" })).toEqual([
      "Ingresa el número de identificación o quita el tipo.",
    ]);
  });

  it("los dos, o ninguno, son válidos", async () => {
    expect(await errorsFor(saveUserSchema, { ...user, iddId: 1, identification: "900123456-7" })).toEqual([]);
    expect(await errorsFor(saveUserSchema, { ...user, iddId: null, identification: null })).toEqual([]);
  });
});
