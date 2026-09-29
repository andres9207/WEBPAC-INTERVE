import { validationResult } from "express-validator";

const { idempotencyKeyRule, emailRule } = await import("../../../src/common/utils/validation.utils.js");

const KEY = "0b7a3e0c-8a1f-4c1e-9f5e-2d6b7c8d9e0f";

const errorsFor = async (rule, { headers = {}, body = {} } = {}) => {
  const req = { headers, body };
  await rule.run(req);
  return validationResult(req).array().map((e) => e.msg);
};

describe("idempotencyKeyRule", () => {
  const onCreate = idempotencyKeyRule((req) => !(Number(req.body.id) > 0));

  it("al crear exige el encabezado Idempotency-Key", async () => {
    expect(await errorsFor(onCreate, { body: { id: 0 } })).toEqual(["Falta el encabezado Idempotency-Key."]);
  });

  it("al crear exige que sea un UUID", async () => {
    expect(await errorsFor(onCreate, { headers: { "idempotency-key": "123" }, body: { id: 0 } })).toEqual([
      "Idempotency-Key debe ser un UUID.",
    ]);
  });

  it("al crear acepta un UUID válido", async () => {
    expect(await errorsFor(onCreate, { headers: { "idempotency-key": KEY }, body: { id: 0 } })).toEqual([]);
  });

  it("al editar no la exige (editar ya es idempotente)", async () => {
    expect(await errorsFor(onCreate, { body: { id: 5 } })).toEqual([]);
  });
});

describe("emailRule", () => {
  it("exige un correo con formato válido", async () => {
    expect(await errorsFor(emailRule(), { body: { email: "no-es-correo" } })).toEqual(["El correo no es válido."]);
    expect(await errorsFor(emailRule(), { body: {} })).toContain("El correo es requerido.");
  });

  it("recorta los espacios antes de validar", async () => {
    const req = { headers: {}, body: { email: "  ana@obra.co " } };
    await emailRule().run(req);
    expect(validationResult(req).isEmpty()).toBe(true);
    expect(req.body.email).toBe("ana@obra.co");
  });

  it("opcional: vacío se acepta y un valor inválido no", async () => {
    const rule = () => emailRule("contactEmail", { optional: true });
    expect(await errorsFor(rule(), { body: { contactEmail: "" } })).toEqual([]);
    expect(await errorsFor(rule(), { body: { contactEmail: "x@" } })).toEqual(["El correo no es válido."]);
  });
});
