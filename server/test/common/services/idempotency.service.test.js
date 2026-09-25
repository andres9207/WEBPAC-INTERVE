import { jest } from "@jest/globals";

const { runIdempotent, requestFingerprint } = await import("../../../src/common/services/idempotency.service.js");

const KEY = "0b7a3e0c-8a1f-4c1e-9f5e-2d6b7c8d9e0f";
const payload = { name: "Ventas", staId: 1, modules: [3, 4] };

// Fila "tbl_x" donde vive la clave; findUnique simula la búsqueda por clave.
const buildTarget = (found = null) => ({
  model: { findUnique: jest.fn().mockResolvedValue(found) },
  keyField: "x_idempotency_key",
  hashField: "x_idempotency_hash",
  ownerField: "x_create_by",
  select: { x_id: true },
  toResult: (row) => ({ message: "Creado", id: row.x_id }),
});

const uniqueViolation = () => Object.assign(new Error("Unique constraint failed"), { code: "P2002" });

describe("requestFingerprint", () => {
  it("no depende del orden de las claves", () => {
    expect(requestFingerprint({ a: 1, b: [1, 2] })).toBe(requestFingerprint({ b: [1, 2], a: 1 }));
  });

  it("cambia si cambia el contenido", () => {
    expect(requestFingerprint(payload)).not.toBe(requestFingerprint({ ...payload, name: "Compras" }));
  });

  it("no incluye contraseñas (la huella se guarda en la BD)", () => {
    expect(requestFingerprint({ ...payload, password: "a" })).toBe(requestFingerprint({ ...payload, password: "b" }));
    expect(requestFingerprint({ ...payload, password: "a" })).toBe(requestFingerprint(payload));
  });
});

describe("runIdempotent", () => {
  it("primera vez: ejecuta la operación y le entrega la clave y la huella para guardarlas en la fila", async () => {
    const target = buildTarget(null);
    const execute = jest.fn().mockResolvedValue({ message: "Creado", id: 10 });

    const result = await runIdempotent({ target, key: KEY, ownerId: 7, payload, execute });

    expect(result).toEqual({ message: "Creado", id: 10 });
    expect(execute).toHaveBeenCalledWith({
      x_idempotency_key: KEY,
      x_idempotency_hash: requestFingerprint(payload),
    });
    expect(target.model.findUnique).toHaveBeenCalledWith({
      where: { x_idempotency_key: KEY },
      select: { x_id: true, x_idempotency_hash: true, x_create_by: true },
    });
  });

  it("repetición (misma clave, mismo contenido, mismo autor): devuelve lo ya creado sin ejecutar nada", async () => {
    const target = buildTarget({ x_id: 10, x_idempotency_hash: requestFingerprint(payload), x_create_by: 7 });
    const execute = jest.fn();

    await expect(runIdempotent({ target, key: KEY, ownerId: 7, payload, execute })).resolves.toEqual({
      message: "Creado",
      id: 10,
    });
    expect(execute).not.toHaveBeenCalled();
  });

  it("misma clave con otro contenido: 422, sin ejecutar ni devolver la entidad", async () => {
    const target = buildTarget({ x_id: 10, x_idempotency_hash: requestFingerprint(payload), x_create_by: 7 });
    const execute = jest.fn();

    await expect(
      runIdempotent({ target, key: KEY, ownerId: 7, payload: { ...payload, name: "Otro" }, execute })
    ).rejects.toMatchObject({ statusCode: 422 });
    expect(execute).not.toHaveBeenCalled();
  });

  it("misma clave usada por otro usuario: 422 (no revela la entidad ajena)", async () => {
    const target = buildTarget({ x_id: 10, x_idempotency_hash: requestFingerprint(payload), x_create_by: 99 });

    await expect(runIdempotent({ target, key: KEY, ownerId: 7, payload, execute: jest.fn() })).rejects.toMatchObject({
      statusCode: 422,
    });
  });

  it("carrera: dos peticiones con la misma clave a la vez; la perdedora choca con el UNIQUE y devuelve la ganadora", async () => {
    const winner = { x_id: 10, x_idempotency_hash: requestFingerprint(payload), x_create_by: 7 };
    const target = buildTarget(null);
    target.model.findUnique.mockResolvedValueOnce(null).mockResolvedValueOnce(winner);
    const execute = jest.fn().mockRejectedValue(uniqueViolation());

    await expect(runIdempotent({ target, key: KEY, ownerId: 7, payload, execute })).resolves.toEqual({
      message: "Creado",
      id: 10,
    });
  });

  it("un UNIQUE que no es el de la clave (p. ej. correo repetido) se propaga tal cual", async () => {
    const target = buildTarget(null);
    const err = uniqueViolation();

    await expect(runIdempotent({ target, key: KEY, ownerId: 7, payload, execute: jest.fn().mockRejectedValue(err) })).rejects.toBe(err);
  });

  it("sin clave es un error de programación: la ruta debió exigir el encabezado", async () => {
    await expect(
      runIdempotent({ target: buildTarget(), key: undefined, ownerId: 7, payload, execute: jest.fn() })
    ).rejects.toThrow(/Idempotency-Key/);
  });
});
