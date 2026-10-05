import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Proveedores (ADR-0012, DEC-031, DEC-032, DEC-041): identidad única con 409
// que devuelve el proveedor existente, tipos y contactos por diferencial, permiso propio
// para cambiar la identificación, y asignación proveedor-obra con bloqueo y
// bitácora.

const state = { provider: null, assignment: null };

const prismaMock = {
  tbl_providers: {
    findMany: jest.fn(),
    count: jest.fn(),
    groupBy: jest.fn(),
    findFirst: jest.fn(),
    // La búsqueda por clave de idempotencia no encuentra nada; las demás
    // lecturas devuelven el proveedor del caso.
    findUnique: jest.fn(async ({ where }) => (where.prv_idempotency_key ? null : state.provider)),
    create: jest.fn(),
    update: jest.fn(),
  },
  tbl_provider_contacts: { findMany: jest.fn(), deleteMany: jest.fn(), updateMany: jest.fn(), createMany: jest.fn() },
  tbl_provider_classifications: { findMany: jest.fn(), deleteMany: jest.fn(), createMany: jest.fn() },
  tbl_contracts: { count: jest.fn() },
  tbl_work_providers: {
    findMany: jest.fn(),
    count: jest.fn(),
    findUnique: jest.fn(async ({ where }) => (where.wkp_idempotency_key ? null : state.assignment)),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  tbl_works: { findUnique: jest.fn(), findMany: jest.fn() },
  tbl_identity_documents: { findUnique: jest.fn() },
  tbl_provider_types: { findUnique: jest.fn() },
  tbl_address_types: { findUnique: jest.fn() },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { PERMISSIONS } = await import("../../../../src/common/constants/permissions.constants.js");
const service = await import("../../../../src/modules/work/providers/providers.service.js");

const CAN = PERMISSIONS.work.providers;
const ALL = new Set(Object.values(CAN));
const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const ctx = { useId: 9, ip: "1.1.1.1" };

const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);

// Tablas bloqueadas, en el orden en que se bloquearon.
const lockedTables = () =>
  prismaMock.$queryRaw.mock.calls.map(([, ...values]) => values.map((v) => v?.strings?.join("") ?? "").find((s) => s.startsWith("tbl_")));

const contact = (overrides = {}) => ({ adtId: 4, name: "Ana", phone: "6011234567", main: true, ...overrides });

const input = (overrides = {}) => ({
  iddId: 1,
  identification: " 1020304050 ",
  name: " Ferretería Andina ",
  pvtIds: [2],
  serviceType: "Suministro de acero",
  email: "compras@andina.co",
  observation: "",
  contacts: [contact()],
  ...overrides,
});

const existingRow = {
  prv_id: 77,
  prv_name: "Ferretería Andina",
  prv_identification: "1020304050",
  sta_id: 1,
  tbl_identity_documents: { idd_code: "CC" },
};

const storedProvider = {
  idd_id: 1,
  prv_identification: "1020304050",
  prv_name: "Ferretería Andina",
  prv_service_type: "Suministro de acero",
  prv_email: "compras@andina.co",
  prv_observation: null,
  sta_id: 1,
};

const storedContact = {
  prc_id: 11,
  adt_id: 4,
  prc_name: "Ana",
  prc_position: null,
  prc_address: null,
  prc_phone: "6011234567",
  prc_mobile: null,
  prc_fax: null,
  prc_email: null,
  prc_observation: null,
  prc_main: true,
};

beforeEach(() => {
  jest.clearAllMocks();
  state.provider = null;
  state.assignment = null;
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  prismaMock.tbl_providers.findFirst.mockResolvedValue(null);
  prismaMock.tbl_providers.create.mockResolvedValue({ prv_id: 50 });
  prismaMock.tbl_provider_contacts.findMany.mockResolvedValue([]);
  prismaMock.tbl_provider_classifications.findMany.mockResolvedValue([]);
  prismaMock.tbl_work_providers.count.mockResolvedValue(0);
  prismaMock.tbl_contracts.count.mockResolvedValue(0);
  prismaMock.tbl_works.findUnique.mockResolvedValue({ sta_id: 1 });
  prismaMock.tbl_identity_documents.findUnique.mockResolvedValue({ idd_code: "CC", idd_name: "Cédula de ciudadanía", sta_id: 1 });
  prismaMock.tbl_provider_types.findUnique.mockResolvedValue({ pvt_name: "Simple", sta_id: 1 });
  prismaMock.tbl_address_types.findUnique.mockResolvedValue({ adt_name: "Oficina", sta_id: 1 });
  prismaMock.tbl_work_providers.create.mockImplementation(async ({ data }) => ({ wkp_id: 300, ...data }));
});

describe("saveProvider — crear", () => {
  it("crea el proveedor con sus contactos en una transacción, con autor y clave de la sesión", async () => {
    await expect(service.saveProvider({ prvId: 0, input: input(), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })).resolves.toEqual({
      message: "Proveedor creado correctamente",
      prvId: 50,
    });

    expect(prismaMock.tbl_providers.create.mock.calls[0][0].data).toMatchObject({
      idd_id: 1,
      prv_identification: "1020304050",
      prv_name: "Ferretería Andina",
      prv_observation: null,
      sta_id: 1,
      prv_create_by: 9,
      prv_idempotency_key: KEY,
    });
    expect(prismaMock.tbl_provider_contacts.createMany.mock.calls[0][0].data).toEqual([
      expect.objectContaining({ prv_id: 50, adt_id: 4, prc_phone: "6011234567", prc_main: true, prc_create_by: 9 }),
    ]);
    expect(prismaMock.tbl_provider_classifications.createMany.mock.calls[0][0].data).toEqual([{ prv_id: 50, pvt_id: 2 }]);
    expect(auditRows()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ aud_entity: "PROVEEDOR", aud_operation: "CREAR", aud_field: "prv_identification" }),
        expect.objectContaining({ aud_entity: "PROVEEDOR", aud_operation: "CREAR", aud_field: "pvt_ids", aud_new_value: "2" }),
      ])
    );
    expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
  });

  it("con varios tipos guarda cada uno una sola vez y los bloquea (DEC-041)", async () => {
    await service.saveProvider({ prvId: 0, input: input({ pvtIds: [3, "2", 3] }), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY });

    expect(prismaMock.tbl_provider_classifications.createMany.mock.calls[0][0].data).toEqual([
      { prv_id: 50, pvt_id: 2 },
      { prv_id: 50, pvt_id: 3 },
    ]);
    expect(prismaMock.tbl_provider_types.findUnique).toHaveBeenCalledTimes(2);
    expect(lockedTables()).toContain("tbl_provider_types");
  });

  it("sin ningún tipo responde 400 y no abre la transacción", async () => {
    await expect(
      service.saveProvider({ prvId: 0, input: input({ pvtIds: [] }), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 400, message: "Selecciona al menos un tipo de proveedor." });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("la identidad repetida responde 409 con el proveedor existente y no crea nada (ADR-0012, decisión 7)", async () => {
    prismaMock.tbl_providers.findFirst.mockResolvedValue(existingRow);

    await expect(service.saveProvider({ prvId: 0, input: input(), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 409,
      data: { existing: { prvId: 77, name: "Ferretería Andina", identityCode: "CC", identification: "1020304050", staId: 1 } },
    });
    expect(prismaMock.tbl_providers.findFirst.mock.calls[0][0].where).toEqual({
      idd_id: 1,
      prv_identification: "1020304050",
      sta_id: { not: 3 },
    });
    expect(prismaMock.tbl_providers.create).not.toHaveBeenCalled();
  });

  it("si otra petición gana la carrera, el UNIQUE (P2002) se traduce al mismo 409", async () => {
    prismaMock.tbl_providers.create.mockRejectedValue(Object.assign(new Error("dup"), { code: "P2002" }));
    // Verificación previa: nada. Después del fallo: el proveedor que ganó.
    prismaMock.tbl_providers.findFirst.mockResolvedValueOnce(null).mockResolvedValueOnce(existingRow);

    await expect(service.saveProvider({ prvId: 0, input: input(), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 409,
      data: { existing: expect.objectContaining({ prvId: 77 }) },
    });
  });

  it("un P2002 que no es de la identidad se propaga tal cual", async () => {
    const dup = Object.assign(new Error("dup"), { code: "P2002" });
    prismaMock.tbl_providers.create.mockRejectedValue(dup);

    await expect(service.saveProvider({ prvId: 0, input: input(), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })).rejects.toBe(dup);
  });

  it("valida el formato del número según su tipo (DEC-021)", async () => {
    prismaMock.tbl_identity_documents.findUnique.mockResolvedValue({ idd_code: "NIT", idd_name: "NIT", sta_id: 1 });

    await expect(
      service.saveProvider({ prvId: 0, input: input({ identification: "900123456-7" }), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 400, message: expect.stringContaining("dígito de verificación") });
    expect(prismaMock.tbl_providers.create).not.toHaveBeenCalled();
  });

  it("rechaza dos contactos principales y un contacto sin medio de contacto", async () => {
    const twoMain = input({ contacts: [contact(), contact({ phone: "2" })] });
    await expect(service.saveProvider({ prvId: 0, input: twoMain, useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "Solo un contacto puede ser el principal.",
    });

    const noChannel = input({ contacts: [{ adtId: 4, name: "Sin datos" }] });
    await expect(service.saveProvider({ prvId: 0, input: noChannel, useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: expect.stringContaining("al menos una dirección"),
    });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("crear desde una obra exige el permiso de asignar (403)", async () => {
    const granted = new Set([CAN.create]);
    const withAssignment = input({ assignment: { wrkId: 8, assignmentDate: "2026-10-01" } });

    await expect(service.saveProvider({ prvId: 0, input: withAssignment, useBy: 9, granted, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 403,
    });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("crear desde una obra crea y asigna en la misma transacción, bloqueando primero la obra (ADR-0012, decisión 6)", async () => {
    const withAssignment = input({ assignment: { wrkId: 8, assignmentDate: "2026-10-01", observation: "Acero" } });

    await expect(service.saveProvider({ prvId: 0, input: withAssignment, useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })).resolves.toEqual({
      message: "Proveedor creado y asignado a la obra",
      prvId: 50,
    });

    expect(lockedTables()[0]).toBe("tbl_works");
    expect(prismaMock.tbl_work_providers.create.mock.calls[0][0].data).toMatchObject({
      wrk_id: 8,
      prv_id: 50,
      wkp_observation: "Acero",
      sta_id: 1,
      wkp_create_by: 9,
    });
    expect(prismaMock.tbl_work_providers.create.mock.calls[0][0].data.wkp_assignment_date.toISOString()).toBe("2026-10-01T00:00:00.000Z");
    const grants = auditRows().filter((r) => r.aud_operation === "ASIGNAR");
    expect(grants.map((r) => [r.aud_entity, r.aud_record_id])).toEqual([
      ["OBRA", 8],
      ["PROVEEDOR", 50],
    ]);
    expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
  });

  it("crear desde una obra eliminada no crea el proveedor (404)", async () => {
    prismaMock.tbl_works.findUnique.mockResolvedValue({ sta_id: 3 });
    const withAssignment = input({ assignment: { wrkId: 8, assignmentDate: "2026-10-01" } });

    await expect(service.saveProvider({ prvId: 0, input: withAssignment, useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 404,
      message: "No se encontró la obra.",
    });
    expect(prismaMock.tbl_providers.create).not.toHaveBeenCalled();
  });
});

describe("saveProvider — editar", () => {
  beforeEach(() => {
    state.provider = { ...storedProvider };
    prismaMock.tbl_provider_contacts.findMany.mockResolvedValue([{ ...storedContact }]);
    prismaMock.tbl_provider_classifications.findMany.mockResolvedValue([{ pvt_id: 2 }]);
  });

  it("guarda los tipos por diferencial y audita la lista (DEC-041)", async () => {
    await service.saveProvider({ prvId: 77, input: input({ pvtIds: [4, 3], contacts: [contact({ prcId: 11 })] }), useBy: 9, granted: ALL, ctx });

    expect(prismaMock.tbl_provider_classifications.deleteMany.mock.calls[0][0]).toEqual({ where: { prv_id: 77, pvt_id: { in: [2] } } });
    expect(prismaMock.tbl_provider_classifications.createMany.mock.calls[0][0].data).toEqual([
      { prv_id: 77, pvt_id: 3 },
      { prv_id: 77, pvt_id: 4 },
    ]);
    expect(auditRows()).toEqual([expect.objectContaining({ aud_operation: "EDITAR", aud_field: "pvt_ids", aud_old_value: "2", aud_new_value: "3,4" })]);
  });

  it("sin cambios en los tipos no escribe la tabla de unión", async () => {
    await service.saveProvider({ prvId: 77, input: input({ contacts: [contact({ prcId: 11 })] }), useBy: 9, granted: ALL, ctx });

    expect(prismaMock.tbl_provider_classifications.deleteMany).not.toHaveBeenCalled();
    expect(prismaMock.tbl_provider_classifications.createMany).not.toHaveBeenCalled();
  });

  it("un tipo inactivo que ya tenía se conserva; uno inactivo nuevo se rechaza", async () => {
    prismaMock.tbl_provider_types.findUnique.mockResolvedValue({ pvt_name: "Simple", sta_id: 2 });

    await expect(
      service.saveProvider({ prvId: 77, input: input({ contacts: [contact({ prcId: 11 })] }), useBy: 9, granted: ALL, ctx })
    ).resolves.toMatchObject({ prvId: 77 });

    await expect(
      service.saveProvider({ prvId: 77, input: input({ pvtIds: [2, 5], contacts: [contact({ prcId: 11 })] }), useBy: 9, granted: ALL, ctx })
    ).rejects.toMatchObject({ statusCode: 400, message: expect.stringContaining("inactivo") });
  });

  it("bloquea el proveedor antes de leerlo", async () => {
    await service.saveProvider({ prvId: 77, input: input({ contacts: [contact({ prcId: 11 })] }), useBy: 9, granted: ALL, ctx });

    expect(lockedTables()[0]).toBe("tbl_providers");
    expect(prismaMock.tbl_providers.findUnique.mock.invocationCallOrder[0]).toBeGreaterThan(prismaMock.$queryRaw.mock.invocationCallOrder[0]);
  });

  it("cambiar la identificación sin su permiso responde 403 (ADR-0012, regla 5)", async () => {
    const granted = new Set([CAN.edit]);

    await expect(
      service.saveProvider({ prvId: 77, input: input({ identification: "99887766" }), useBy: 9, granted, ctx })
    ).rejects.toMatchObject({ statusCode: 403 });
    expect(prismaMock.tbl_providers.update).not.toHaveBeenCalled();
  });

  it("editar sin tocar la identificación no exige el permiso de cambiarla", async () => {
    const granted = new Set([CAN.edit]);

    await expect(
      service.saveProvider({ prvId: 77, input: input({ name: "Andina S.A.S.", contacts: [contact({ prcId: 11 })] }), useBy: 9, granted, ctx })
    ).resolves.toMatchObject({ prvId: 77 });
    expect(auditRows()).toEqual([
      expect.objectContaining({ aud_operation: "EDITAR", aud_field: "prv_name", aud_old_value: "Ferretería Andina", aud_new_value: "Andina S.A.S." }),
    ]);
  });

  it("con permiso, la identificación nueva se verifica contra los demás proveedores y se audita", async () => {
    prismaMock.tbl_providers.findFirst.mockResolvedValue({ ...existingRow, prv_id: 12 });

    await expect(
      service.saveProvider({ prvId: 77, input: input({ identification: "99887766", contacts: [contact({ prcId: 11 })] }), useBy: 9, granted: ALL, ctx })
    ).rejects.toMatchObject({ statusCode: 409, data: { existing: expect.objectContaining({ prvId: 12 }) } });
    expect(prismaMock.tbl_providers.findFirst.mock.calls[0][0].where).toMatchObject({ prv_id: { not: 77 } });

    prismaMock.tbl_providers.findFirst.mockResolvedValue(null);
    await service.saveProvider({ prvId: 77, input: input({ identification: "99887766", contacts: [contact({ prcId: 11 })] }), useBy: 9, granted: ALL, ctx });
    expect(auditRows()).toEqual([expect.objectContaining({ aud_field: "prv_identification", aud_old_value: "1020304050", aud_new_value: "99887766" })]);
  });

  it("guarda los contactos por diferencial y quita la marca de principal antes de ponerla en otro", async () => {
    const contacts = [
      contact({ prcId: 11, main: false }),
      contact({ name: "Luis", phone: null, email: "luis@andina.co", main: true }),
    ];

    await service.saveProvider({ prvId: 77, input: input({ contacts }), useBy: 9, granted: ALL, ctx });

    expect(prismaMock.tbl_provider_contacts.deleteMany).not.toHaveBeenCalled();
    expect(prismaMock.tbl_provider_contacts.updateMany.mock.calls[0][0]).toMatchObject({
      where: { prc_id: 11, prv_id: 77 },
      data: { prc_main: false, prc_update_by: 9 },
    });
    expect(prismaMock.tbl_provider_contacts.createMany.mock.calls[0][0].data).toEqual([
      expect.objectContaining({ prv_id: 77, prc_name: "Luis", prc_main: true }),
    ]);
    expect(prismaMock.tbl_provider_contacts.updateMany.mock.invocationCallOrder[0]).toBeLessThan(
      prismaMock.tbl_provider_contacts.createMany.mock.invocationCallOrder[0]
    );
  });

  it("un contacto quitado se borra; un id de contacto ajeno se rechaza", async () => {
    await service.saveProvider({ prvId: 77, input: input({ contacts: [] }), useBy: 9, granted: ALL, ctx });
    expect(prismaMock.tbl_provider_contacts.deleteMany.mock.calls[0][0]).toEqual({ where: { prv_id: 77, prc_id: { in: [11] } } });

    await expect(
      service.saveProvider({ prvId: 77, input: input({ contacts: [contact({ prcId: 999 })] }), useBy: 9, granted: ALL, ctx })
    ).rejects.toMatchObject({ statusCode: 400, message: "Uno de los contactos no pertenece a este proveedor." });
  });

  it("un proveedor eliminado no se edita (404)", async () => {
    state.provider = { ...storedProvider, sta_id: 3 };

    await expect(service.saveProvider({ prvId: 77, input: input(), useBy: 9, granted: ALL, ctx })).rejects.toMatchObject({ statusCode: 404 });
  });
});

describe("estado y eliminación", () => {
  it("no se elimina un proveedor asignado a obras (409, regla 15)", async () => {
    state.provider = { sta_id: 1 };
    prismaMock.tbl_work_providers.count.mockResolvedValue(2);

    await expect(service.deleteProvider({ prvId: 77, useBy: 9, ctx })).rejects.toMatchObject({
      statusCode: 409,
      message: expect.stringContaining("asignado a 2 obra(s)"),
    });
    expect(prismaMock.tbl_providers.update).not.toHaveBeenCalled();
  });

  it("sin obras se elimina de forma lógica, con evidencia y bitácora", async () => {
    state.provider = { sta_id: 1 };

    await expect(service.deleteProvider({ prvId: 77, useBy: 9, ctx })).resolves.toEqual({ message: "Proveedor eliminado correctamente" });
    expect(prismaMock.tbl_providers.update.mock.calls[0][0]).toMatchObject({
      where: { prv_id: 77 },
      data: { sta_id: 3, prv_delete_by: 9, prv_delete_at: expect.any(Date) },
    });
    expect(auditRows()).toEqual([expect.objectContaining({ aud_entity: "PROVEEDOR", aud_operation: "ELIMINAR" })]);
  });

  it("desactivar cambia el estado y lo audita; repetirlo no escribe", async () => {
    state.provider = { sta_id: 1 };
    await service.changeProviderStatus({ prvId: 77, staId: 2, useBy: 9, ctx });
    expect(prismaMock.tbl_providers.update.mock.calls[0][0].data).toEqual({ sta_id: 2, prv_update_by: 9 });

    jest.clearAllMocks();
    state.provider = { sta_id: 2 };
    await service.changeProviderStatus({ prvId: 77, staId: 2, useBy: 9, ctx });
    expect(prismaMock.tbl_providers.update).not.toHaveBeenCalled();
  });
});

describe("asignación proveedor-obra", () => {
  const assignInput = { assignmentDate: "2026-10-01", observation: " Acero " };

  it("asigna bloqueando obra → proveedor y audita en la obra y en el proveedor", async () => {
    state.provider = { sta_id: 1, prv_name: "Andina" };

    await expect(
      service.assignProviderToWork({ wrkId: 8, prvId: 77, input: assignInput, useBy: 9, ctx, idempotencyKey: KEY })
    ).resolves.toEqual({ message: "Proveedor asignado a la obra", wkpId: 300 });

    expect(lockedTables()).toEqual(["tbl_works", "tbl_providers"]);
    expect(prismaMock.tbl_work_providers.create.mock.calls[0][0].data).toMatchObject({
      wrk_id: 8,
      prv_id: 77,
      wkp_observation: "Acero",
      wkp_idempotency_key: KEY,
    });
    expect(auditRows().map((r) => [r.aud_entity, r.aud_operation])).toEqual([
      ["OBRA", "ASIGNAR"],
      ["PROVEEDOR", "ASIGNAR"],
    ]);
  });

  it("no asigna un proveedor inactivo (regla 13) ni uno ya asignado (409)", async () => {
    state.provider = { sta_id: 2, prv_name: "Andina" };
    await expect(
      service.assignProviderToWork({ wrkId: 8, prvId: 77, input: assignInput, useBy: 9, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 400, message: expect.stringContaining("inactivo") });

    state.provider = { sta_id: 1, prv_name: "Andina" };
    state.assignment = { wkp_id: 300 };
    await expect(
      service.assignProviderToWork({ wrkId: 8, prvId: 77, input: assignInput, useBy: 9, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 409, message: expect.stringContaining("ya está asignado") });
    expect(prismaMock.tbl_work_providers.create).not.toHaveBeenCalled();
  });

  it("no asigna a una obra eliminada (404)", async () => {
    state.provider = { sta_id: 1, prv_name: "Andina" };
    prismaMock.tbl_works.findUnique.mockResolvedValue({ sta_id: 3 });

    await expect(
      service.assignProviderToWork({ wrkId: 8, prvId: 77, input: assignInput, useBy: 9, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 404, message: "No se encontró la obra." });
  });

  it("desasignar borra la asignación, no toca el proveedor y deja la bitácora (regla 12)", async () => {
    state.assignment = { wkp_id: 300, wrk_id: 8, prv_id: 77, wkp_assignment_date: new Date("2026-10-01T00:00:00Z"), wkp_observation: null, sta_id: 1 };

    await expect(service.unassignProviderFromWork({ wrkId: 8, prvId: 77, useBy: 9, ctx })).resolves.toEqual({
      message: "Proveedor desasignado de la obra",
    });
    expect(prismaMock.tbl_work_providers.delete).toHaveBeenCalledWith({ where: { wkp_id: 300 } });
    expect(prismaMock.tbl_providers.update).not.toHaveBeenCalled();
    expect(auditRows().map((r) => [r.aud_entity, r.aud_operation, r.aud_new_value])).toEqual([
      ["OBRA", "REVOCAR", null],
      ["PROVEEDOR", "REVOCAR", null],
    ]);
  });

  it("no desasigna un proveedor con contratos en la obra (409)", async () => {
    state.assignment = { wkp_id: 300, wrk_id: 8, prv_id: 77, wkp_assignment_date: new Date("2026-10-01T00:00:00Z"), wkp_observation: null, sta_id: 1 };
    prismaMock.tbl_contracts.count.mockResolvedValue(1);

    await expect(service.unassignProviderFromWork({ wrkId: 8, prvId: 77, useBy: 9, ctx })).rejects.toMatchObject({ statusCode: 409 });
    expect(prismaMock.tbl_contracts.count).toHaveBeenCalledWith({ where: { wrk_id: 8, prv_id: 77 } });
    expect(prismaMock.tbl_work_providers.delete).not.toHaveBeenCalled();
  });

  it("desasignar lo que no está asignado responde 404", async () => {
    await expect(service.unassignProviderFromWork({ wrkId: 8, prvId: 77, useBy: 9, ctx })).rejects.toMatchObject({ statusCode: 404 });
  });

  it("editar la asignación sin cambios no escribe", async () => {
    state.assignment = { wkp_id: 300, wrk_id: 8, prv_id: 77, wkp_assignment_date: new Date("2026-10-01T00:00:00Z"), wkp_observation: "Acero", sta_id: 1 };

    await service.updateWorkProvider({ wrkId: 8, prvId: 77, input: { ...assignInput, staId: 1 }, useBy: 9, ctx });
    expect(prismaMock.tbl_work_providers.update).not.toHaveBeenCalled();

    await service.updateWorkProvider({ wrkId: 8, prvId: 77, input: { ...assignInput, staId: 2 }, useBy: 9, ctx });
    expect(prismaMock.tbl_work_providers.update.mock.calls[0][0]).toMatchObject({ where: { wkp_id: 300 }, data: { sta_id: 2, wkp_update_by: 9 } });
  });
});

describe("consultas", () => {
  it("el listado excluye eliminados y busca por razón social o documento con Prisma (parametrizado)", async () => {
    prismaMock.tbl_providers.findMany.mockResolvedValue([]);
    prismaMock.tbl_providers.count.mockResolvedValue(0);
    prismaMock.tbl_providers.groupBy.mockResolvedValue([]);

    await service.paginationProviders({ search: "' OR 1=1 --", rows: 500, first: 0, sortField: "prv_password", sortOrder: 1 });

    const args = prismaMock.tbl_providers.findMany.mock.calls[0][0];
    expect(args.where).toEqual({
      sta_id: { not: 3 },
      OR: [{ prv_name: { contains: "' OR 1=1 --" } }, { prv_identification: { contains: "' OR 1=1 --" } }],
    });
    // Orden fuera de la lista blanca → el de por defecto; tope de 100 filas.
    expect(args.orderBy).toEqual({ prv_update_at: "asc" });
    expect(args.take).toBe(100);
  });

  it("la verificación por documento es exacta y no encuentra eliminados", async () => {
    prismaMock.tbl_providers.findFirst.mockResolvedValue(existingRow);

    await expect(service.checkIdentification({ iddId: "1", identification: " 1020304050 " })).resolves.toEqual({
      exists: true,
      provider: { prvId: 77, name: "Ferretería Andina", identityCode: "CC", identification: "1020304050", staId: 1 },
    });
    expect(prismaMock.tbl_providers.findFirst.mock.calls[0][0].where).toEqual({
      idd_id: 1,
      prv_identification: "1020304050",
      sta_id: { not: 3 },
    });
  });

  it("el selector para asignar devuelve solo activos y excluye los ya asignados a la obra", async () => {
    prismaMock.tbl_providers.findMany.mockResolvedValue([existingRow]);

    await expect(service.selectProviders({ search: "andina", wrkId: "8" })).resolves.toEqual([
      expect.objectContaining({ value: 77, label: "Ferretería Andina · CC 1020304050" }),
    ]);
    expect(prismaMock.tbl_providers.findMany.mock.calls[0][0]).toMatchObject({
      where: { sta_id: 1, tbl_work_providers: { none: { wrk_id: 8 } } },
      take: 100,
    });
  });

  it("el selector de obras para asignar el proveedor devuelve solo obras activas donde todavía no está", async () => {
    prismaMock.tbl_works.findMany.mockResolvedValue([{ wrk_id: 8, wrk_code: "OB-1", wrk_name: "Torre Norte" }]);

    await expect(service.selectAssignableWorks({ search: " torre ", prvId: "77" })).resolves.toEqual([
      { value: 8, label: "OB-1 — Torre Norte", code: "OB-1", name: "Torre Norte" },
    ]);
    expect(prismaMock.tbl_works.findMany.mock.calls[0][0]).toMatchObject({
      where: {
        sta_id: 1,
        OR: [{ wrk_code: { contains: "torre" } }, { wrk_name: { contains: "torre" } }],
        tbl_work_providers: { none: { prv_id: 77 } },
      },
      take: 100,
    });
  });
});
