import { validationResult } from "express-validator";

const { idempotencyKeyRule } = await import("../../../src/common/utils/validation.utils.js");

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
