import { validationResult } from "express-validator";

const { saveIdentityDocumentSchema } = await import(
  "../../../../src/modules/admin/identityDocuments/identityDocuments.validation.js"
);
const { saveUserSchema } = await import("../../../../src/modules/security/users/users.validation.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";

const errorsFor = async (schema, body, headers = { "idempotency-key": KEY }) => {
  const req = { headers, body };
  for (const rule of schema) await rule.run(req);
  return validationResult(req).array().map((e) => e.msg);
};

describe("saveIdentityDocumentSchema", () => {
  it("al crear exige el código", async () => {
    expect(await errorsFor(saveIdentityDocumentSchema, { iddId: 0, name: "NIT", staId: 1 })).toContain("El código es requerido.");
  });

  it("el código solo admite letras y números", async () => {
    expect(await errorsFor(saveIdentityDocumentSchema, { iddId: 0, code: "C C", name: "Cédula", staId: 1 })).toEqual([
      "El código solo admite letras y números, sin espacios.",
    ]);
  });

  it("al editar no exige el código (no es editable)", async () => {
    expect(await errorsFor(saveIdentityDocumentSchema, { iddId: 3, name: "NIT", staId: 2 }, {})).toEqual([]);
  });

  it("no acepta el estado eliminado: eliminar es su propia acción", async () => {
    expect(await errorsFor(saveIdentityDocumentSchema, { iddId: 3, name: "NIT", staId: 3 }, {})).toEqual([
      "El estado debe ser activo o inactivo.",
    ]);
  });
});

describe("saveUserSchema — número y tipo de identificación juntos", () => {
  const user = { useId: 5, proId: 2, staId: 1, name: "Ana", lastName: "Paz", email: "ana@a.com" };

  it("número sin tipo", async () => {
    expect(await errorsFor(saveUserSchema, { ...user, identification: "123" }, {})).toEqual([
      "Selecciona el tipo de identificación.",
    ]);
  });

  it("tipo sin número", async () => {
    expect(await errorsFor(saveUserSchema, { ...user, iddId: 1, identification: "" }, {})).toEqual([
      "Ingresa el número de identificación o quita el tipo.",
    ]);
  });

  it("los dos, o ninguno, son válidos", async () => {
    expect(await errorsFor(saveUserSchema, { ...user, iddId: 1, identification: "900123456-7" }, {})).toEqual([]);
    expect(await errorsFor(saveUserSchema, { ...user, iddId: null, identification: null }, {})).toEqual([]);
  });
});
