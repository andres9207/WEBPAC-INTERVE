import { validationResult } from "express-validator";

const { idempotencyKeyRule, emailRule, moneyRule, optionalDate } = await import("../../../src/common/utils/validation.utils.js");

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

describe("moneyRule (DEC-028)", () => {
  const required = moneyRule("value", "valor");
  const optional = moneyRule("value", "valor", { optional: true });
  const invalid = "El valor debe ser un número no negativo, con punto decimal y hasta 16 dígitos enteros.";

  it.each(["0", "10", "10.5", "10.005", 250000, "1234567890123456.99"])("acepta %j", async (value) => {
    expect(await errorsFor(required, { body: { value } })).toEqual([]);
  });

  it.each(["-1", "1,5", "abc", "12345678901234567", "1e5"])("rechaza %j", async (value) => {
    expect(await errorsFor(required, { body: { value } })).toEqual([invalid]);
  });

  it("obligatorio: vacío es requerido; opcional: vacío se acepta", async () => {
    expect(await errorsFor(required, { body: { value: "" } })).toEqual(["El valor es requerido."]);
    expect(await errorsFor(optional, { body: { value: "" } })).toEqual([]);
    expect(await errorsFor(optional, { body: { value: null } })).toEqual([]);
  });
});

describe("optionalDate (DEC-048)", () => {
  const rule = optionalDate("dateFrom");

  it("acepta una fecha real AAAA-MM-DD, o nada", async () => {
    for (const dateFrom of ["2026-02-28", "", null, undefined]) expect(await errorsFor(rule, { body: { dateFrom } })).toEqual([]);
  });

  it("rechaza otro formato o una fecha que no existe", async () => {
    for (const dateFrom of ["2026-02-30", "28/02/2026", "2026-2-1", "2026-02-28T00:00:00Z"]) {
      expect(await errorsFor(rule, { body: { dateFrom } })).toEqual(["dateFrom debe ser una fecha AAAA-MM-DD."]);
    }
  });
});
