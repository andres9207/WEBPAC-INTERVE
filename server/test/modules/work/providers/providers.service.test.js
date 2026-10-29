import { jest } from "@jest/globals";
import { lockedIdsOf, transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Proveedores (ADR-0012, DEC-031, DEC-032, DEC-041): identidad única con 409
// que devuelve el proveedor existente, tipos y contactos por diferencial, permiso propio
// para cambiar la identificación, y asignación proveedor-obra con bloqueo y
// bitácora.

const state = { provider: null, assignment: null };

// Menú de facturas de cada tipo de proveedor (DEC-066): 1 Simple, 2
// Subcontratista, 3 Contrato mayor.
const TYPE_MODES = { 1: "SIMPLE", 2: "CONTRACT", 3: "CONTRACT" };
const TYPE_NAMES = { 1: "Simple", 2: "Subcontratista", 3: "Contrato mayor" };

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
  tbl_contracts: { count: jest.fn(), findMany: jest.fn() },
  tbl_work_provider_types: { findMany: jest.fn(), createMany: jest.fn(), deleteMany: jest.fn() },
  tbl_invoices: { count: jest.fn(), findMany: jest.fn(), updateMany: jest.fn() },
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
  tbl_provider_types: { findUnique: jest.fn(), findMany: jest.fn() },
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
  prismaMock.tbl_invoices.count.mockResolvedValue(0);
  prismaMock.tbl_invoices.findMany.mockResolvedValue([]);
  prismaMock.tbl_provider_types.findMany.mockImplementation(async ({ where }) =>
    where.pvt_id.in.map((id) => ({ pvt_id: id, pvt_name: TYPE_NAMES[id] ?? `Tipo ${id}`, pvt_invoice_mode: TYPE_MODES[id] ?? null }))
  );
  prismaMock.tbl_contracts.findMany.mockResolvedValue([]);
  prismaMock.tbl_work_provider_types.findMany.mockResolvedValue([]);
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
    await service.saveProvider({ prvId: 0, input: input({ pvtIds: [3, "1", 3] }), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY });

    expect(prismaMock.tbl_provider_classifications.createMany.mock.calls[0][0].data).toEqual([
      { prv_id: 50, pvt_id: 1 },
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
    // Sin tipos para la obra, toma los del maestro (DEC-066).
    expect(prismaMock.tbl_work_provider_types.createMany.mock.calls[0][0].data).toEqual([{ wrk_id: 8, prv_id: 50, pvt_id: 2 }]);
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
    await service.saveProvider({ prvId: 77, input: input({ pvtIds: [4, 3], contacts: [contact({ contactId: 11 })] }), useBy: 9, granted: ALL, ctx });

    expect(prismaMock.tbl_provider_classifications.deleteMany.mock.calls[0][0]).toEqual({ where: { prv_id: 77, pvt_id: { in: [2] } } });
    expect(prismaMock.tbl_provider_classifications.createMany.mock.calls[0][0].data).toEqual([
      { prv_id: 77, pvt_id: 3 },
      { prv_id: 77, pvt_id: 4 },
    ]);
    expect(auditRows()).toEqual([expect.objectContaining({ aud_operation: "EDITAR", aud_field: "pvt_ids", aud_old_value: "2", aud_new_value: "3,4" })]);
  });

  it("sin cambios en los tipos no escribe la tabla de unión", async () => {
    await service.saveProvider({ prvId: 77, input: input({ contacts: [contact({ contactId: 11 })] }), useBy: 9, granted: ALL, ctx });

    expect(prismaMock.tbl_provider_classifications.deleteMany).not.toHaveBeenCalled();
    expect(prismaMock.tbl_provider_classifications.createMany).not.toHaveBeenCalled();
  });

  it("un tipo inactivo que ya tenía se conserva; uno inactivo nuevo se rechaza", async () => {
    prismaMock.tbl_provider_types.findUnique.mockResolvedValue({ pvt_name: "Simple", sta_id: 2 });

    await expect(
      service.saveProvider({ prvId: 77, input: input({ contacts: [contact({ contactId: 11 })] }), useBy: 9, granted: ALL, ctx })
    ).resolves.toMatchObject({ prvId: 77 });

    await expect(
      service.saveProvider({ prvId: 77, input: input({ pvtIds: [2, 5], contacts: [contact({ contactId: 11 })] }), useBy: 9, granted: ALL, ctx })
    ).rejects.toMatchObject({ statusCode: 400, message: expect.stringContaining("inactivo") });
  });

  it("bloquea el proveedor antes de leerlo", async () => {
    await service.saveProvider({ prvId: 77, input: input({ contacts: [contact({ contactId: 11 })] }), useBy: 9, granted: ALL, ctx });

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
      service.saveProvider({ prvId: 77, input: input({ name: "Andina S.A.S.", contacts: [contact({ contactId: 11 })] }), useBy: 9, granted, ctx })
    ).resolves.toMatchObject({ prvId: 77 });
    expect(auditRows()).toEqual([
      expect.objectContaining({ aud_operation: "EDITAR", aud_field: "prv_name", aud_old_value: "Ferretería Andina", aud_new_value: "Andina S.A.S." }),
    ]);
  });

  it("con permiso, la identificación nueva se verifica contra los demás proveedores y se audita", async () => {
    prismaMock.tbl_providers.findFirst.mockResolvedValue({ ...existingRow, prv_id: 12 });

    await expect(
      service.saveProvider({ prvId: 77, input: input({ identification: "99887766", contacts: [contact({ contactId: 11 })] }), useBy: 9, granted: ALL, ctx })
    ).rejects.toMatchObject({ statusCode: 409, data: { existing: expect.objectContaining({ prvId: 12 }) } });
    expect(prismaMock.tbl_providers.findFirst.mock.calls[0][0].where).toMatchObject({ prv_id: { not: 77 } });

    prismaMock.tbl_providers.findFirst.mockResolvedValue(null);
    await service.saveProvider({ prvId: 77, input: input({ identification: "99887766", contacts: [contact({ contactId: 11 })] }), useBy: 9, granted: ALL, ctx });
    expect(auditRows()).toEqual([expect.objectContaining({ aud_field: "prv_identification", aud_old_value: "1020304050", aud_new_value: "99887766" })]);
  });

  it("guarda los contactos por diferencial y quita la marca de principal antes de ponerla en otro", async () => {
    const contacts = [
      contact({ contactId: 11, main: false }),
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
      service.saveProvider({ prvId: 77, input: input({ contacts: [contact({ contactId: 999 })] }), useBy: 9, granted: ALL, ctx })
    ).rejects.toMatchObject({ statusCode: 400, message: "Uno de los contactos no pertenece a este proveedor." });
  });

  it("un proveedor eliminado no se edita (404)", async () => {
    state.provider = { ...storedProvider, sta_id: 3 };

    await expect(service.saveProvider({ prvId: 77, input: input(), useBy: 9, granted: ALL, ctx })).rejects.toMatchObject({ statusCode: 404 });
  });
});

describe("tipos del proveedor en la obra (DEC-066)", () => {
  const edit = (overrides = {}) =>
    service.saveProvider({ prvId: 77, input: input({ contacts: [contact({ contactId: 11 })], ...overrides }), useBy: 9, granted: ALL, ctx });
  const typeLocks = () =>
    prismaMock.$queryRaw.mock.calls
      .filter(([, ...values]) => values.some((v) => v?.strings?.join("") === "tbl_provider_types"))
      .flatMap(([, ...values]) => lockedIdsOf(values));

  beforeEach(() => {
    state.provider = { ...storedProvider };
    prismaMock.tbl_provider_contacts.findMany.mockResolvedValue([{ ...storedContact }]);
    prismaMock.tbl_provider_classifications.findMany.mockResolvedValue([{ pvt_id: 2 }]);
  });

  it("el maestro admite tipos de menús distintos, al crear y al editar", async () => {
    await expect(
      service.saveProvider({ prvId: 0, input: input({ pvtIds: [1, 2, 3] }), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })
    ).resolves.toMatchObject({ prvId: 50 });
    await expect(edit({ pvtIds: [2, 3] })).resolves.toMatchObject({ message: "Proveedor modificado correctamente", prvId: 77 });
  });

  it("cambiar los tipos del maestro no toca obras, contratos ni facturas", async () => {
    await edit({ pvtIds: [3] });

    expect(prismaMock.tbl_provider_classifications.createMany).toHaveBeenCalled();
    expect(prismaMock.tbl_work_provider_types.createMany).not.toHaveBeenCalled();
    expect(prismaMock.tbl_work_provider_types.deleteMany).not.toHaveBeenCalled();
    expect(prismaMock.tbl_invoices.findMany).not.toHaveBeenCalled();
    expect(prismaMock.tbl_invoices.updateMany).not.toHaveBeenCalled();
  });

  it("crear desde una obra con tipos propios: la obra toma esos, no los del maestro, y los bloquea", async () => {
    const withAssignment = input({ pvtIds: [2], assignment: { wrkId: 8, assignmentDate: "2026-10-01", pvtIds: [3, 1] } });

    await service.saveProvider({ prvId: 0, input: withAssignment, useBy: 9, granted: ALL, ctx, idempotencyKey: KEY });

    expect(prismaMock.tbl_provider_classifications.createMany.mock.calls[0][0].data).toEqual([{ prv_id: 50, pvt_id: 2 }]);
    expect(prismaMock.tbl_work_provider_types.createMany.mock.calls[0][0].data).toEqual([
      { wrk_id: 8, prv_id: 50, pvt_id: 1 },
      { wrk_id: 8, prv_id: 50, pvt_id: 3 },
    ]);
    expect(typeLocks()).toEqual(expect.arrayContaining([1, 2, 3]));
  });

  it("asignar exige al menos un tipo (400) y no abre la transacción", async () => {
    await expect(
      service.assignProviderToWork({ wrkId: 8, prvId: 77, input: { assignmentDate: "2026-10-01" }, useBy: 9, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 400 });
    await expect(
      service.assignProviderToWork({ wrkId: 8, prvId: 77, input: { assignmentDate: "2026-10-01", pvtIds: [] }, useBy: 9, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 400 });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("asignar con cualquier tipo, aunque el proveedor no lo tenga en su maestro; uno inactivo se rechaza", async () => {
    state.provider = { sta_id: 1, prv_name: "Andina" };
    prismaMock.tbl_provider_classifications.findMany.mockResolvedValue([{ pvt_id: 2 }]);

    await service.assignProviderToWork({ wrkId: 8, prvId: 77, input: { assignmentDate: "2026-10-01", pvtIds: [3, 2] }, useBy: 9, ctx, idempotencyKey: KEY });
    expect(prismaMock.tbl_work_provider_types.createMany.mock.calls[0][0].data).toEqual([
      { wrk_id: 8, prv_id: 77, pvt_id: 2 },
      { wrk_id: 8, prv_id: 77, pvt_id: 3 },
    ]);
    expect(auditRows().find((r) => r.aud_entity === "OBRA").aud_new_value).toContain("tipos=2,3");

    prismaMock.tbl_provider_types.findUnique.mockResolvedValue({ pvt_name: "Contrato mayor", sta_id: 2 });
    await expect(
      service.assignProviderToWork({ wrkId: 8, prvId: 77, input: { assignmentDate: "2026-10-01", pvtIds: [3] }, useBy: 9, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 400 });
  });

  describe("editar los tipos de la asignación", () => {
    const stored = { wkp_id: 300, wrk_id: 8, prv_id: 77, wkp_assignment_date: new Date("2026-10-01T00:00:00Z"), wkp_observation: null, sta_id: 1 };
    const update = (pvtIds) =>
      service.updateWorkProvider({ wrkId: 8, prvId: 77, input: { assignmentDate: "2026-10-01", staId: 1, ...(pvtIds ? { pvtIds } : {}) }, useBy: 9, ctx });

    beforeEach(() => {
      state.assignment = { ...stored };
      prismaMock.tbl_work_provider_types.findMany.mockResolvedValue([{ pvt_id: 1 }, { pvt_id: 3 }]);
    });

    it("agrega y quita por diferencial, bloquea los pedidos y lo audita en la obra y en el proveedor", async () => {
      await update([3, 2]);

      expect(prismaMock.tbl_work_provider_types.deleteMany).toHaveBeenCalledWith({ where: { wrk_id: 8, prv_id: 77, pvt_id: { in: [1] } } });
      expect(prismaMock.tbl_work_provider_types.createMany.mock.calls[0][0].data).toEqual([{ wrk_id: 8, prv_id: 77, pvt_id: 2 }]);
      expect(typeLocks()).toEqual([2, 3]);
      const rows = auditRows();
      expect(rows.map((r) => r.aud_entity)).toEqual(["OBRA", "PROVEEDOR"]);
      expect(rows[0]).toMatchObject({ aud_operation: "EDITAR", aud_old_value: expect.stringContaining("tipos=1,3"), aud_new_value: expect.stringContaining("tipos=2,3") });
    });

    it("sin tipos en la petición, no cambian", async () => {
      await update();
      expect(prismaMock.tbl_work_provider_types.deleteMany).not.toHaveBeenCalled();
      expect(prismaMock.tbl_work_provider_types.createMany).not.toHaveBeenCalled();
      expect(prismaMock.tbl_work_providers.update).not.toHaveBeenCalled();
    });

    it("no quita un tipo con contratos de la obra firmados bajo él (409)", async () => {
      prismaMock.tbl_contracts.findMany.mockResolvedValue([{ pvt_id: 3, ctr_number: "C-01" }]);

      await expect(update([1])).rejects.toMatchObject({ statusCode: 409, message: expect.stringContaining("Contrato mayor") });
      expect(prismaMock.tbl_contracts.findMany.mock.calls[0][0].where).toEqual({ wrk_id: 8, prv_id: 77, pvt_id: { in: [3] } });
      expect(prismaMock.tbl_work_provider_types.deleteMany).not.toHaveBeenCalled();
    });

    it("no quita un tipo con facturas de su menú en la obra (409, DEC-074); sin ellas, sí", async () => {
      prismaMock.tbl_invoices.findMany.mockResolvedValue([{ pvt_id: 1 }, { pvt_id: 1 }]);

      await expect(update([3])).rejects.toMatchObject({ statusCode: 409, message: expect.stringContaining("Simple de la obra: el proveedor tiene 2 factura(s)") });
      expect(prismaMock.tbl_invoices.findMany.mock.calls.at(-1)[0].where).toEqual({ wrk_id: 8, prv_id: 77, pvt_id: { in: [1] } });

      prismaMock.tbl_invoices.findMany.mockResolvedValue([]);
      await expect(update([3])).resolves.toMatchObject({ wkpId: 300 });
      expect(prismaMock.tbl_work_provider_types.deleteMany).toHaveBeenCalled();
    });
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

  it("no se elimina un proveedor con facturas, aunque no tenga obras (409, DEC-054)", async () => {
    state.provider = { sta_id: 1 };
    prismaMock.tbl_invoices.count.mockResolvedValue(3);

    await expect(service.deleteProvider({ prvId: 77, useBy: 9, ctx })).rejects.toMatchObject({
      statusCode: 409,
      message: "No se puede eliminar el proveedor: tiene 3 factura(s). Desactívalo en su lugar.",
    });
    expect(prismaMock.tbl_invoices.count).toHaveBeenCalledWith({ where: { prv_id: 77 } });
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
  const assignInput = { assignmentDate: "2026-10-01", observation: " Acero ", pvtIds: [2] };

  it("asigna bloqueando obra → proveedor → tipos y audita en la obra y en el proveedor", async () => {
    state.provider = { sta_id: 1, prv_name: "Andina" };

    await expect(
      service.assignProviderToWork({ wrkId: 8, prvId: 77, input: assignInput, useBy: 9, ctx, idempotencyKey: KEY })
    ).resolves.toEqual({ message: "Proveedor asignado a la obra", wkpId: 300 });

    expect(lockedTables()).toEqual(["tbl_works", "tbl_providers", "tbl_provider_types"]);
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

  it("no desasigna si el proveedor tiene facturas simples en la obra (409, DEC-058)", async () => {
    state.assignment = { wkp_id: 300, wrk_id: 8, prv_id: 77, wkp_assignment_date: new Date("2026-10-01T00:00:00Z"), wkp_observation: null, sta_id: 1 };
    prismaMock.tbl_contracts.count.mockResolvedValue(0);
    prismaMock.tbl_invoices.count.mockResolvedValue(2);

    await expect(service.unassignProviderFromWork({ wrkId: 8, prvId: 77, useBy: 9, ctx })).rejects.toMatchObject({
      statusCode: 409,
      message: "No se puede desasignar el proveedor: tiene 2 factura(s) en esta obra. Inactiva la asignación en su lugar.",
    });
    expect(prismaMock.tbl_invoices.count).toHaveBeenCalledWith({ where: { wrk_id: 8, prv_id: 77 } });
    expect(prismaMock.tbl_work_providers.delete).not.toHaveBeenCalled();
  });

  it("desasignar lo que no está asignado responde 404", async () => {
    await expect(service.unassignProviderFromWork({ wrkId: 8, prvId: 77, useBy: 9, ctx })).rejects.toMatchObject({ statusCode: 404 });
  });

  it("editar la asignación sin cambios no escribe", async () => {
    state.assignment = { wkp_id: 300, wrk_id: 8, prv_id: 77, wkp_assignment_date: new Date("2026-10-01T00:00:00Z"), wkp_observation: "Acero", sta_id: 1 };
    prismaMock.tbl_work_provider_types.findMany.mockResolvedValue([{ pvt_id: 2 }]);

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

  it("filtra por razón social, documento, tipo y obra asignada; el de obra se suma al alcance (DEC-048)", async () => {
    prismaMock.tbl_providers.findMany.mockResolvedValue([]);
    prismaMock.tbl_providers.count.mockResolvedValue(0);
    prismaMock.tbl_providers.groupBy.mockResolvedValue([]);

    await service.paginationProviders({
      name: "acer",
      identification: "900",
      pvtId: "3",
      wrkId: 9,
      staId: 2,
      scope: { all: false, wrkId: 8 },
    });

    const filters = [
      { prv_name: { contains: "acer" } },
      { prv_identification: { contains: "900" } },
      // Con una obra elegida, el tipo es el de su asignación en esa obra (DEC-066), como la columna Tipos.
      { tbl_work_providers: { some: { wrk_id: { in: [8] }, tbl_work_provider_types: { some: { pvt_id: 3 } } } } },
      { tbl_work_providers: { some: { wrk_id: 9 } } },
    ];
    const where = prismaMock.tbl_providers.findMany.mock.calls[0][0].where;
    expect(where.tbl_work_providers).toEqual({ some: { wrk_id: { in: [8] } } });
    expect(where.AND).toEqual([...filters, { sta_id: 2 }]);
    expect(prismaMock.tbl_providers.groupBy.mock.calls[0][0].where.AND).toEqual(filters);
  });

  it("con \"Ver todo\", el filtro de tipo busca en el maestro o en alguna obra", async () => {
    prismaMock.tbl_providers.findMany.mockResolvedValue([]);
    prismaMock.tbl_providers.count.mockResolvedValue(0);
    prismaMock.tbl_providers.groupBy.mockResolvedValue([]);

    await service.paginationProviders({ pvtId: 3, scope: { all: true } });

    expect(prismaMock.tbl_providers.findMany.mock.calls[0][0].where.AND).toEqual([
      {
        OR: [
          { tbl_provider_classifications: { some: { pvt_id: 3 } } },
          { tbl_work_providers: { some: { tbl_work_provider_types: { some: { pvt_id: 3 } } } } },
        ],
      },
    ]);
  });

  it("columna Tipos: con una obra elegida, los de su asignación en ella; con \"Ver todo\", los del maestro y los de sus obras, sin repetir", async () => {
    const type = (name) => ({ tbl_provider_types: { pvt_name: name } });
    const row = {
      prv_id: 1,
      prv_name: "4S Safety",
      tbl_provider_classifications: [type("Simple")],
      tbl_work_providers: [{ tbl_work_provider_types: [type("Simple"), type("Subcontratista"), type("Contrato mayor")] }],
    };
    prismaMock.tbl_providers.findMany.mockResolvedValue([row]);
    prismaMock.tbl_providers.count.mockResolvedValue(1);
    prismaMock.tbl_providers.groupBy.mockResolvedValue([]);

    const inWork = await service.paginationProviders({ scope: { all: false, wrkId: 8 } });
    expect(inWork.results[0].providerTypes).toEqual(["Contrato mayor", "Simple", "Subcontratista"]);
    // Las asignaciones se leen solo en el alcance y de obras no eliminadas.
    expect(prismaMock.tbl_providers.findMany.mock.calls[0][0].select.tbl_work_providers.where).toEqual({
      wrk_id: { in: [8] },
      tbl_works: { sta_id: { not: 3 } },
    });

    prismaMock.tbl_providers.findMany.mockResolvedValue([{ ...row, tbl_provider_classifications: [type("Proveedor")] }]);
    const all = await service.paginationProviders({ scope: { all: true } });
    expect(all.results[0].providerTypes).toEqual(["Contrato mayor", "Proveedor", "Simple", "Subcontratista"]);
  });

  it("la verificación por documento es exacta y no encuentra eliminados", async () => {
    prismaMock.tbl_providers.findFirst.mockResolvedValue(existingRow);

    prismaMock.tbl_providers.findFirst.mockResolvedValue({ ...existingRow, tbl_provider_classifications: [{ pvt_id: 3 }, { pvt_id: 2 }] });

    // Con los tipos de su maestro, que se proponen al asignarlo a la obra (DEC-066).
    await expect(service.checkIdentification({ iddId: "1", identification: " 1020304050 " })).resolves.toEqual({
      exists: true,
      provider: { prvId: 77, name: "Ferretería Andina", identityCode: "CC", identification: "1020304050", staId: 1, pvtIds: [2, 3] },
    });
    expect(prismaMock.tbl_providers.findFirst.mock.calls[0][0].where).toEqual({
      idd_id: 1,
      prv_identification: "1020304050",
      sta_id: { not: 3 },
    });
  });

  it("el selector para asignar devuelve solo activos y excluye los ya asignados a la obra, con los tipos de su maestro (DEC-066)", async () => {
    prismaMock.tbl_providers.findMany.mockResolvedValue([{ ...existingRow, tbl_provider_classifications: [{ pvt_id: 3 }, { pvt_id: 1 }] }]);

    await expect(service.selectProviders({ search: "andina", wrkId: "8" })).resolves.toEqual([
      expect.objectContaining({ value: 77, label: "Ferretería Andina · CC 1020304050", pvtIds: [3, 1] }),
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

// ─── Alcance por obra (DEC-047) ──────────────────────────────────────────────
// Obra 8 = la del registro; obra 9 = otra. Fuera del alcance, 404 sin tocar nada.
const OWN = Object.freeze({ all: false, wrkId: 8 });
const OTHER = Object.freeze({ all: false, wrkId: 9 });
const NONE = Object.freeze({ all: false, wrkId: null });

describe("alcance por obra (DEC-047)", () => {
  it("el listado solo trae proveedores asignados a la obra del alcance", async () => {
    prismaMock.tbl_providers.findMany.mockResolvedValue([]);
    prismaMock.tbl_providers.count.mockResolvedValue(0);
    prismaMock.tbl_providers.groupBy.mockResolvedValue([]);
    await service.paginationProviders({ scope: OWN });
    expect(prismaMock.tbl_providers.findMany.mock.calls.at(-1)[0].where.tbl_work_providers).toEqual({ some: { wrk_id: { in: [8] } } });
  });

  it("a cuántas obras está asignado (todas, no solo las del alcance) solo va con el permiso de ver todas las obras", async () => {
    prismaMock.tbl_providers.findMany.mockResolvedValue([{ prv_id: 77, prv_name: "Acme", tbl_provider_classifications: [], _count: { tbl_work_providers: 4 } }]);
    prismaMock.tbl_providers.count.mockResolvedValue(1);
    prismaMock.tbl_providers.groupBy.mockResolvedValue([]);

    const withCount = await service.paginationProviders({ scope: OWN, withWorksCount: true });
    expect(prismaMock.tbl_providers.findMany.mock.calls.at(-1)[0].select._count).toEqual({ select: { tbl_work_providers: true } });
    expect(withCount.results[0].worksCount).toBe(4);

    prismaMock.tbl_providers.findMany.mockResolvedValue([{ prv_id: 77, prv_name: "Acme", tbl_provider_classifications: [] }]);
    const withoutCount = await service.paginationProviders({ scope: OWN });
    expect(prismaMock.tbl_providers.findMany.mock.calls.at(-1)[0].select._count).toBeUndefined();
    expect(withoutCount.results[0].worksCount).toBeNull();
  });

  it("un proveedor que no está en la obra del alcance no se lee ni se edita (404)", async () => {
    await expect(service.getProvider({ prvId: 77, scope: OTHER })).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.tbl_providers.findFirst.mock.calls[0][0].where.tbl_work_providers).toEqual({ some: { wrk_id: { in: [9] } } });

    await expect(service.saveProvider({ prvId: 77, input: input(), useBy: 9, granted: ALL, scope: OTHER, ctx })).rejects.toMatchObject({ statusCode: 404 });
    await expect(service.deleteProvider({ prvId: 77, useBy: 9, scope: OTHER, ctx })).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("sin ver todo, crear lo asigna a la obra del alcance; a otra obra, 404", async () => {
    await service.saveProvider({ prvId: 0, input: input(), useBy: 9, granted: ALL, scope: OWN, ctx, idempotencyKey: KEY });
    expect(prismaMock.tbl_work_providers.create.mock.calls[0][0].data).toMatchObject({ wrk_id: 8, prv_id: 50 });

    const elsewhere = input({ assignment: { wrkId: 9, assignmentDate: "2026-10-01" } });
    await expect(service.saveProvider({ prvId: 0, input: elsewhere, useBy: 9, granted: ALL, scope: OWN, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 404,
    });
    await expect(service.saveProvider({ prvId: 0, input: input(), useBy: 9, granted: ALL, scope: NONE, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 403,
    });
  });

  describe("la ficha con una obra elegida edita los tipos de esa obra (DEC-090)", () => {
    const assignment = { wkp_id: 300, wrk_id: 8, prv_id: 77, wkp_assignment_date: new Date("2026-10-01T00:00:00Z"), wkp_observation: null, sta_id: 1 };
    const edit = (overrides = {}, granted = ALL, scope = OWN) =>
      service.saveProvider({ prvId: 77, input: input({ contacts: [contact({ contactId: 11 })], ...overrides }), useBy: 9, granted, scope, ctx });

    beforeEach(() => {
      state.provider = { ...storedProvider };
      state.assignment = { ...assignment };
      prismaMock.tbl_providers.findFirst.mockResolvedValue({ prv_id: 77 });
      prismaMock.tbl_provider_contacts.findMany.mockResolvedValue([{ ...storedContact }]);
      prismaMock.tbl_provider_classifications.findMany.mockResolvedValue([{ pvt_id: 2 }]);
      prismaMock.tbl_work_provider_types.findMany.mockResolvedValue([{ pvt_id: 2 }, { pvt_id: 3 }]);
    });

    it("los tipos van a la asignación de la obra, no al maestro, con solo el permiso de asignar", async () => {
      await expect(edit({ pvtIds: [1, 2] }, new Set([CAN.assignWork]))).resolves.toMatchObject({ prvId: 77 });

      expect(prismaMock.tbl_work_provider_types.deleteMany).toHaveBeenCalledWith({ where: { wrk_id: 8, prv_id: 77, pvt_id: { in: [3] } } });
      expect(prismaMock.tbl_work_provider_types.createMany.mock.calls[0][0].data).toEqual([{ wrk_id: 8, prv_id: 77, pvt_id: 1 }]);
      expect(prismaMock.tbl_provider_classifications.deleteMany).not.toHaveBeenCalled();
      expect(prismaMock.tbl_provider_classifications.createMany).not.toHaveBeenCalled();
      expect(prismaMock.tbl_providers.update).not.toHaveBeenCalled();
      expect(prismaMock.tbl_work_providers.update).toHaveBeenCalledWith({ where: { wkp_id: 300 }, data: { wkp_update_by: 9 } });
      const rows = auditRows();
      expect(rows.map((r) => r.aud_entity)).toEqual(["OBRA", "PROVEEDOR"]);
      expect(rows[0]).toMatchObject({ aud_old_value: expect.stringContaining("tipos=2,3"), aud_new_value: expect.stringContaining("tipos=1,2") });
      expect(lockedTables().slice(0, 2)).toEqual(["tbl_works", "tbl_providers"]);
    });

    it("los datos de la empresa siguen yendo al maestro y exigen el permiso de editar solo si cambian", async () => {
      await expect(edit({ name: "Andina S.A.S.", pvtIds: [2, 3] }, new Set([CAN.assignWork]))).rejects.toMatchObject({ statusCode: 403 });
      await expect(edit({ contacts: [], pvtIds: [2, 3] }, new Set([CAN.assignWork]))).rejects.toMatchObject({ statusCode: 403 });
      expect(prismaMock.tbl_providers.update).not.toHaveBeenCalled();

      await expect(edit({ name: "Andina S.A.S.", pvtIds: [2, 3] }, new Set([CAN.edit]))).resolves.toMatchObject({ prvId: 77 });
      expect(prismaMock.tbl_providers.update.mock.calls[0][0].data).toMatchObject({ prv_name: "Andina S.A.S." });
      expect(auditRows()).toEqual([expect.objectContaining({ aud_entity: "PROVEEDOR", aud_field: "prv_name" })]);
      expect(prismaMock.tbl_provider_classifications.createMany).not.toHaveBeenCalled();
      expect(prismaMock.tbl_work_provider_types.createMany).not.toHaveBeenCalled();
    });

    it("cambiar los tipos en la obra sin el permiso de asignar responde 403", async () => {
      await expect(edit({ pvtIds: [2] }, new Set([CAN.edit]))).rejects.toMatchObject({ statusCode: 403 });
      expect(prismaMock.tbl_work_provider_types.deleteMany).not.toHaveBeenCalled();
    });

    it("no quita un tipo con contratos de la obra firmados bajo él (409)", async () => {
      prismaMock.tbl_contracts.findMany.mockResolvedValue([{ pvt_id: 3, ctr_number: "C-01" }]);
      await expect(edit({ pvtIds: [2] })).rejects.toMatchObject({ statusCode: 409 });
    });

    it("con «Ver todo» todo va al maestro y exige el permiso de editar", async () => {
      const VIEW_ALL = { all: true, wrkId: null };
      await expect(edit({ pvtIds: [2, 3] }, new Set([CAN.assignWork]), VIEW_ALL)).rejects.toMatchObject({ statusCode: 403 });

      await edit({ pvtIds: [2, 3] }, ALL, VIEW_ALL);
      expect(prismaMock.tbl_provider_classifications.createMany.mock.calls[0][0].data).toEqual([{ prv_id: 77, pvt_id: 3 }]);
      expect(prismaMock.tbl_work_provider_types.createMany).not.toHaveBeenCalled();
    });
  });

  it("asignar, editar y desasignar solo en la obra del alcance", async () => {
    const assignInput = { assignmentDate: "2026-10-01" };
    await expect(service.assignProviderToWork({ wrkId: 9, prvId: 77, input: assignInput, useBy: 9, scope: OWN, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 404,
    });
    await expect(service.unassignProviderFromWork({ wrkId: 9, prvId: 77, useBy: 9, scope: OWN, ctx })).rejects.toMatchObject({ statusCode: 404 });
    await expect(service.updateWorkProvider({ wrkId: 9, prvId: 77, input: assignInput, useBy: 9, scope: OWN, ctx })).rejects.toMatchObject({ statusCode: 404 });
    await expect(service.paginationWorkProviders({ wrkId: 9, scope: OWN })).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });
});

describe("exportProviders: reporte del listado (DEC-070)", () => {
  const sheetValues = async (file) => {
    const { default: ExcelJS } = await import("exceljs");
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.buffer);
    const sheet = workbook.worksheets[0];
    const values = [];
    sheet.eachRow((row, n) => values.push({ n, cells: row.values.slice(1) }));
    return { sheet, values };
  };
  const provider = (overrides = {}) => ({
    prv_id: 1,
    prv_name: "Aceros SAS",
    prv_identification: "900123",
    prv_service_type: "Suministro de acero",
    prv_email: "info@aceros.co",
    prv_observation: "Entrega en obra",
    sta_id: 1,
    tbl_identity_documents: { idd_code: "NIT" },
    tbl_provider_classifications: [],
    tbl_work_providers: [{ tbl_work_provider_types: [{ tbl_provider_types: { pvt_name: "Subcontratista" } }] }],
    tbl_provider_contacts: [
      { prc_address: "Cra 1 # 2-3", prc_phone: "6041234", prc_mobile: "3001234567", prc_fax: "6045678", prc_email: null, prc_main: true },
      { prc_address: "Calle 9", prc_phone: null, prc_mobile: null, prc_fax: null, prc_email: "ventas@aceros.co", prc_main: false },
    ],
    ...overrides,
  });

  it("con una obra elegida: la obra en el encabezado y una fila por contacto, con lo del proveedor combinado", async () => {
    prismaMock.tbl_providers.count.mockResolvedValue(2);
    prismaMock.tbl_providers.findMany.mockResolvedValue([provider(), provider({ prv_id: 2, prv_name: "Bloques", tbl_provider_contacts: [] })]);
    prismaMock.tbl_works.findUnique.mockResolvedValue({ wrk_code: "IEFL", wrk_name: "Flor de loto" });

    const file = await service.exportProviders({ format: "xlsx", staId: 1, scope: { all: false, wrkId: 8 } });

    const args = prismaMock.tbl_providers.findMany.mock.calls.at(-1)[0];
    expect(args.where.tbl_work_providers).toEqual({ some: { wrk_id: { in: [8] } } });
    expect(args).not.toHaveProperty("take");
    // Los contactos, el principal primero.
    expect(args.select.tbl_provider_contacts.orderBy).toEqual([{ prc_main: "desc" }, { prc_id: "asc" }]);

    const { sheet, values } = await sheetValues(file);
    const firsts = values.map((v) => v.cells[0]);
    expect(firsts).toContain("Obra: IEFL — Flor de loto");
    expect(firsts).toContain("Filtros: Estado: Activos");
    const header = values.find((v) => v.cells[0] === "Nombre").n;
    expect(sheet.getRow(header).values.slice(1)).toEqual([
      "Nombre",
      "Dirección",
      "Identificación",
      "Teléfono",
      "Fax",
      "Tipo servicio",
      "Email",
      "Tipos",
      "Correo institucional",
      "Observación",
    ]);
    const table = values.filter((v) => v.n > header && v.n <= header + 3).map((v) => v.cells);
    // El contacto principal sin email: la columna Email va vacía; los datos generales, en sus columnas.
    expect(table[0]).toEqual([
      "Aceros SAS",
      "Cra 1 # 2-3",
      "NIT 900123",
      "6041234 / 3001234567",
      "6045678",
      "Suministro de acero",
      "",
      "Subcontratista",
      "info@aceros.co",
      "Entrega en obra",
    ]);
    // El segundo contacto: su email; lo del proveedor, en la celda combinada.
    expect(table[1].slice(1, 2)).toEqual(["Calle 9"]);
    expect(table[1][6]).toBe("ventas@aceros.co");
    expect(sheet.getCell(header + 2, 1).isMerged).toBe(true);
    expect(sheet.getCell(header + 2, 9).isMerged).toBe(true);
    expect(sheet.getCell(header + 2, 2).isMerged).toBe(false);
    // Sin contactos: una fila con los datos del proveedor.
    expect(table[2][0]).toBe("Bloques");
    expect(table[2][6]).toBe("");
    expect(table[2][8]).toBe("info@aceros.co");
  });

  it("con \"Ver todo\" no hay obra en el encabezado; sale en PDF", async () => {
    prismaMock.tbl_providers.count.mockResolvedValue(1);
    prismaMock.tbl_providers.findMany.mockResolvedValue([provider()]);
    prismaMock.tbl_works.findUnique.mockClear();

    const file = await service.exportProviders({ format: "pdf", scope: { all: true } });

    expect(prismaMock.tbl_works.findUnique).not.toHaveBeenCalled();
    expect(file.buffer.subarray(0, 5).toString()).toBe("%PDF-");
  });

  it("más filas que el tope: 422 sin leerlas", async () => {
    prismaMock.tbl_providers.count.mockResolvedValue(5001);
    prismaMock.tbl_providers.findMany.mockClear();
    await expect(service.exportProviders({ format: "xlsx", scope: { all: true } })).rejects.toMatchObject({ statusCode: 422 });
    expect(prismaMock.tbl_providers.findMany).not.toHaveBeenCalled();
  });
});
