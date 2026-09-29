import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../helpers/transaction.mock.js";

// Patrón reutilizable de maestro (MAE-BE-01), probado con un maestro de
// ejemplo. Lo propio de cada maestro real se prueba en su módulo.

const prismaMock = {
  tbl_things: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    groupBy: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  },
  tbl_owners: { count: jest.fn() },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));
// La entidad de ejemplo no está en LOCK_ORDER: se usa una real y registrada.
const { defineMaster, createMasterService } = await import("../../../src/common/services/master.service.js");

const baseConfig = {
  model: "tbl_things",
  prefix: "thg",
  idField: "thgId",
  lockEntity: "TIPO_IDENTIFICACION",
  label: "aseguradora",
  feminine: true,
  routes: { entity: "thing", plural: "things" },
  permissions: { view: 1, create: 2, edit: 3, delete: 4, changeStatus: 5 },
  fields: [
    { name: "code", column: "thg_code", label: "código", uppercase: true, editable: false, unique: true, filter: true, sortable: true },
    { name: "name", column: "thg_name", label: "nombre", unique: true, filter: true, sortable: true },
    { name: "notes", column: "thg_notes", label: "nota", required: false },
  ],
  dependents: [{ model: "tbl_owners", column: "thg_id", label: "póliza(s)" }],
};

const config = defineMaster(baseConfig);
const service = createMasterService(config);

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const things = prismaMock.tbl_things;
const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  things.findUnique.mockResolvedValue(null); // ni clave de idempotencia previa ni registro
  things.findFirst.mockResolvedValue(null);
  things.findMany.mockResolvedValue([]);
  things.count.mockResolvedValue(0);
  things.groupBy.mockResolvedValue([]);
  prismaMock.tbl_owners.count.mockResolvedValue(0);
});

describe("defineMaster", () => {
  it("falla al cargar si falta algo obligatorio o un permiso", () => {
    expect(() => defineMaster({ ...baseConfig, prefix: undefined })).toThrow(/prefix/);
    expect(() => defineMaster({ ...baseConfig, permissions: { view: 1, create: 2, edit: 3, delete: 4 } })).toThrow(/changeStatus/);
  });
});

describe("pagination", () => {
  it("filtra y ordena solo por columnas declaradas, excluye eliminados y parametriza todo", async () => {
    things.findMany.mockResolvedValue([
      { thg_id: 1, thg_code: "A", thg_name: "Uno", thg_notes: null, sta_id: 1, thg_update_at: "d", tbl_status: { sta_name: "Activo" }, updated_by_user: { use_name: "Ana", use_last_name: "Paz" } },
    ]);
    things.count.mockResolvedValue(1);

    const page = await service.pagination({
      filters: { name: "Un", notes: "x", thg_code: "inyección" },
      staId: 2,
      rows: 10,
      first: 0,
      sortField: "thg_name; DROP",
      sortOrder: 1,
    });

    const args = things.findMany.mock.calls[0][0];
    // notes no es filtrable y las claves ajenas se ignoran.
    expect(args.where).toEqual({ sta_id: { not: 3 }, thg_name: { contains: "Un" }, AND: [{ sta_id: 2 }] });
    // Orden fuera de la lista blanca: cae al primer campo ordenable.
    expect(args.orderBy).toEqual({ thg_code: "asc" });
    expect(page.results).toEqual([
      { thgId: 1, code: "A", name: "Uno", notes: null, staId: 1, statusName: "Activo", updatedAt: "d", updatedByName: "Ana Paz" },
    ]);
    expect(page.total).toBe(1);
  });

  it("devuelve el conteo por estado con los mismos filtros de texto, sin el de estado (pestañas)", async () => {
    things.groupBy.mockResolvedValue([
      { sta_id: 1, _count: { _all: 4 } },
      { sta_id: 2, _count: { _all: 1 } },
    ]);

    const page = await service.pagination({ filters: { name: "Un" }, staId: 2 });

    expect(things.groupBy).toHaveBeenCalledWith({
      by: ["sta_id"],
      where: { sta_id: { not: 3 }, thg_name: { contains: "Un" } },
      _count: { _all: true },
    });
    expect(page.statusCounts).toEqual({ 1: 4, 2: 1 });
  });

  it("la búsqueda general busca el texto en cualquier campo filtrable, también en los conteos", async () => {
    await service.pagination({ search: "  cc ", staId: 1 });

    const searchOr = { OR: [{ thg_code: { contains: "cc" } }, { thg_name: { contains: "cc" } }] };
    expect(things.groupBy.mock.calls[0][0].where).toEqual({ sta_id: { not: 3 }, ...searchOr });
    expect(things.findMany.mock.calls[0][0].where).toEqual({ sta_id: { not: 3 }, ...searchOr, AND: [{ sta_id: 1 }] });
  });

  it("una búsqueda vacía no filtra", async () => {
    await service.pagination({ search: "   " });

    expect(things.groupBy.mock.calls[0][0].where).toEqual({ sta_id: { not: 3 } });
  });

  it("ordena por estado y por fecha además de los campos declarados", async () => {
    await service.pagination({ sortField: "updatedAt", sortOrder: -1 });
    expect(things.findMany.mock.calls[0][0].orderBy).toEqual({ thg_update_at: "desc" });
  });
});

describe("getById", () => {
  it("devuelve el registro no eliminado, con autoría", async () => {
    things.findFirst.mockResolvedValue({ thg_id: 4, thg_code: "A", thg_name: "Uno", sta_id: 2, thg_create_at: "c", created_by_user: { use_name: "Ana" } });

    await expect(service.getById({ id: "4" })).resolves.toMatchObject({ thgId: 4, staId: 2, createdAt: "c", createdByName: "Ana" });
    expect(things.findFirst.mock.calls[0][0].where).toEqual({ thg_id: 4, sta_id: { not: 3 } });
  });

  it("eliminado o inexistente responde 404", async () => {
    await expect(service.getById({ id: 4 })).rejects.toMatchObject({ statusCode: 404, message: "No se encontró la aseguradora." });
  });
});

describe("select (DEC-018)", () => {
  it("solo activos, más includeId si no está eliminado, con tope fijo", async () => {
    things.findMany.mockResolvedValue([{ thg_id: 1, thg_code: "A", thg_name: "Uno", sta_id: 1 }]);

    const options = await service.select({ includeId: "7" });

    const args = things.findMany.mock.calls[0][0];
    expect(args.where.OR).toEqual([{ sta_id: 1 }, { thg_id: 7, sta_id: { not: 3 } }]);
    expect(args.take).toBe(100);
    expect(options).toEqual([{ value: 1, label: "A", staId: 1 }]);
  });
});

describe("save — crear", () => {
  const input = { code: " ab1 ", name: " Seguros Uno ", notes: "" };

  it("crea activo, con valores normalizados, autor de la sesión y clave de idempotencia", async () => {
    things.create.mockResolvedValue({ thg_id: 9 });

    await expect(service.save({ id: 0, input, useBy: 7, idempotencyKey: KEY })).resolves.toEqual({
      message: "Aseguradora creada correctamente",
      thgId: 9,
    });

    const { data } = things.create.mock.calls[0][0];
    expect(data).toMatchObject({ thg_code: "AB1", thg_name: "Seguros Uno", thg_notes: "", sta_id: 1, thg_create_by: 7, thg_update_by: 7 });
    expect(data.thg_idempotency_key).toBe(KEY);
    expect(data.thg_idempotency_hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("el duplicado se busca entre no eliminados y el mensaje nombra el campo", async () => {
    things.findFirst.mockResolvedValue({ thg_code: "ZZ", thg_name: "seguros uno" });

    await expect(service.save({ id: 0, input, useBy: 7, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "Ya existe una aseguradora con ese nombre.",
    });
    expect(things.findFirst.mock.calls[0][0].where).toEqual({
      sta_id: { not: 3 },
      OR: [{ thg_code: "AB1" }, { thg_name: "Seguros Uno" }],
    });
    expect(things.create).not.toHaveBeenCalled();
  });

  it("un reintento con la misma clave devuelve lo creado, sin control de duplicados ni otra creación", async () => {
    things.create.mockResolvedValue({ thg_id: 9 });
    await service.save({ id: 0, input, useBy: 7, idempotencyKey: KEY });
    const hash = things.create.mock.calls[0][0].data.thg_idempotency_hash;
    jest.clearAllMocks();
    things.findUnique.mockResolvedValue({ thg_id: 9, thg_idempotency_hash: hash, thg_create_by: 7 });
    things.findFirst.mockResolvedValue({ thg_code: "AB1" }); // diría "ya existe"

    await expect(service.save({ id: 0, input, useBy: 7, idempotencyKey: KEY })).resolves.toMatchObject({ thgId: 9 });
    expect(things.create).not.toHaveBeenCalled();
    expect(things.findFirst).not.toHaveBeenCalled();
  });
});

describe("save — editar", () => {
  it("bloquea antes de leer, ignora los campos no editables y no toca el estado", async () => {
    things.findUnique.mockResolvedValue({ thg_code: "AB1", thg_name: "Uno", sta_id: 2 });

    await service.save({ id: 5, input: { code: "OTRO", name: "Dos", notes: "n" }, useBy: 7 });

    expect(prismaMock.$queryRaw.mock.invocationCallOrder[0]).toBeLessThan(things.findUnique.mock.invocationCallOrder[0]);
    expect(things.update).toHaveBeenCalledWith({
      where: { thg_id: 5 },
      data: { thg_name: "Dos", thg_notes: "n", thg_update_by: 7 },
    });
    expect(things.findFirst.mock.calls[0][0].where.thg_id).toEqual({ not: 5 });
  });

  it("eliminado o inexistente responde 404", async () => {
    things.findUnique.mockResolvedValue({ sta_id: 3 });

    await expect(service.save({ id: 5, input: { name: "Dos" }, useBy: 7 })).rejects.toMatchObject({ statusCode: 404 });
    expect(things.update).not.toHaveBeenCalled();
  });
});

describe("changeStatus", () => {
  it("activa o desactiva con el registro bloqueado", async () => {
    things.findUnique.mockResolvedValue({ sta_id: 1 });

    await expect(service.changeStatus({ id: 5, staId: "2", useBy: 7 })).resolves.toEqual({
      message: "Aseguradora desactivada correctamente",
      staId: 2,
    });
    expect(things.update).toHaveBeenCalledWith({ where: { thg_id: 5 }, data: { sta_id: 2, thg_update_by: 7 } });
  });

  it("si ya tiene ese estado no escribe", async () => {
    things.findUnique.mockResolvedValue({ sta_id: 2 });

    await service.changeStatus({ id: 5, staId: 2, useBy: 7 });

    expect(things.update).not.toHaveBeenCalled();
  });

  it("no sirve para eliminar ni para un registro eliminado", async () => {
    things.findUnique.mockResolvedValue({ sta_id: 1 });
    await expect(service.changeStatus({ id: 5, staId: 3, useBy: 7 })).rejects.toMatchObject({ statusCode: 400 });

    things.findUnique.mockResolvedValue({ sta_id: 3 });
    await expect(service.changeStatus({ id: 5, staId: 1, useBy: 7 })).rejects.toMatchObject({ statusCode: 404 });
    expect(things.update).not.toHaveBeenCalled();
  });
});

describe("remove", () => {
  it("eliminación lógica con quién y cuándo", async () => {
    things.findUnique.mockResolvedValue({ sta_id: 1 });

    await expect(service.remove({ id: 5, useBy: 7 })).resolves.toEqual({ message: "Aseguradora eliminada correctamente" });
    expect(things.update).toHaveBeenCalledWith({
      where: { thg_id: 5 },
      data: { sta_id: 3, thg_update_by: 7, thg_delete_by: 7, thg_delete_at: expect.any(Date) },
    });
  });

  it("con dependientes no eliminados, no elimina y dice cuántos y de qué", async () => {
    things.findUnique.mockResolvedValue({ sta_id: 1 });
    prismaMock.tbl_owners.count.mockResolvedValue(3);

    await expect(service.remove({ id: 5, useBy: 7 })).rejects.toMatchObject({
      statusCode: 400,
      message: "No se puede eliminar la aseguradora: la usan 3 póliza(s). Puedes desactivarla para que no se asigne en registros nuevos.",
    });
    expect(prismaMock.tbl_owners.count).toHaveBeenCalledWith({ where: { thg_id: 5, sta_id: { not: 3 } } });
    // Se cuenta con el registro ya bloqueado (DEC-019).
    expect(prismaMock.$queryRaw.mock.invocationCallOrder[0]).toBeLessThan(prismaMock.tbl_owners.count.mock.invocationCallOrder[0]);
    expect(things.update).not.toHaveBeenCalled();
  });

  it("ya eliminado o inexistente responde 404 y no pisa la evidencia (DEC-006)", async () => {
    things.findUnique.mockResolvedValue({ sta_id: 3 });

    await expect(service.remove({ id: 5, useBy: 7 })).rejects.toMatchObject({ statusCode: 404 });
    expect(things.update).not.toHaveBeenCalled();
  });
});

describe("assertAssignable (para los services que asignan el maestro)", () => {
  it("rechaza eliminado e inactivo nuevo; acepta el inactivo que el registro ya tenía", async () => {
    things.findUnique.mockResolvedValue({ sta_id: 3 });
    await expect(service.assertAssignable(prismaMock, 5)).rejects.toMatchObject({ message: "La aseguradora seleccionada no existe." });

    things.findUnique.mockResolvedValue({ sta_id: 2 });
    await expect(service.assertAssignable(prismaMock, 5)).rejects.toMatchObject({ message: "La aseguradora seleccionada está inactiva." });
    // Devuelve la fila, para quien necesite sus datos.
    await expect(service.assertAssignable(prismaMock, 5, 5)).resolves.toEqual({ sta_id: 2 });
    await expect(service.assertAssignable(prismaMock, null)).resolves.toBeNull();
  });
});

describe("bitácora funcional opcional (ADR-0013)", () => {
  const audited = createMasterService(defineMaster({ ...baseConfig, audit: { entity: "PERFIL" } }));

  it("sin `audit` no escribe en la bitácora", async () => {
    things.findUnique.mockResolvedValue({ thg_code: "A", thg_name: "Uno", thg_notes: null, sta_id: 1 });
    await service.save({ id: 5, input: { name: "Dos" }, useBy: 7 });
    expect(prismaMock.tbl_audit_log.createMany).not.toHaveBeenCalled();
  });

  it("con `audit`, registra en la misma transacción solo lo que cambió", async () => {
    things.findUnique.mockResolvedValue({ thg_code: "A", thg_name: "Uno", thg_notes: null, sta_id: 1 });

    await audited.save({ id: 5, input: { name: "Dos", notes: null }, useBy: 7, ctx: { useId: 7 } });
    await audited.changeStatus({ id: 5, staId: 2, useBy: 7, ctx: { useId: 7 } });

    expect(auditRows()).toEqual([
      expect.objectContaining({ aud_operation: "EDITAR", aud_field: "thg_name", aud_old_value: "Uno", aud_new_value: "Dos", use_id: 7 }),
      expect.objectContaining({ aud_operation: "EDITAR", aud_field: "sta_id", aud_old_value: "1", aud_new_value: "2" }),
    ]);
  });
});
