import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Obras (ADR-0011, DEC-026 a DEC-029): guardado atómico con diferencial de
// responsables y etapas, permisos por lo que cambia, bloqueo y bitácora.

const state = { work: null };

const prismaMock = {
  tbl_works: {
    findMany: jest.fn(),
    count: jest.fn(),
    groupBy: jest.fn(),
    findFirst: jest.fn(),
    // La búsqueda por clave de idempotencia no encuentra nada; las demás
    // lecturas devuelven la obra del caso.
    findUnique: jest.fn(async ({ where }) => (where.wrk_idempotency_key ? null : state.work)),
    create: jest.fn(),
    update: jest.fn(),
  },
  tbl_work_managers: { findMany: jest.fn(), deleteMany: jest.fn(), updateMany: jest.fn(), createMany: jest.fn() },
  tbl_work_stages: { findMany: jest.fn(), deleteMany: jest.fn(), updateMany: jest.fn(), createMany: jest.fn() },
  tbl_work_contacts: { findMany: jest.fn(), deleteMany: jest.fn(), updateMany: jest.fn(), createMany: jest.fn() },
  tbl_address_types: { findUnique: jest.fn() },
  tbl_users: { findMany: jest.fn() },
  tbl_contracts: { findMany: jest.fn(), count: jest.fn() },
  tbl_invoices: { findMany: jest.fn(), count: jest.fn() },
  tbl_construction_companies: { findUnique: jest.fn() },
  tbl_contract_types: { findUnique: jest.fn() },
  tbl_supervision_types: { findUnique: jest.fn() },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { PERMISSIONS } = await import("../../../../src/common/constants/permissions.constants.js");
const service = await import("../../../../src/modules/work/works/works.service.js");

const CAN = PERMISSIONS.work.works;
const ALL = new Set([CAN.create, CAN.edit, CAN.assignManager, CAN.removeManager, CAN.manageStages]);
const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const ctx = { useId: 9, ip: "1.1.1.1" };

const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);

const input = (overrides = {}) => ({
  code: " OB-001 ",
  name: "Torre Norte",
  cncId: 1,
  cttId: 2,
  sptId: 3,
  startDate: "2026-01-31",
  termUnit: "MES",
  area: "1500.5",
  directCost: "100000",
  initialTerm: 12,
  extendedTerm: null,
  initialValue: "250000.005",
  extendedValue: "",
  maxServiceOrderValue: "50000",
  managers: [{ useId: 5, role: "MAIN", staId: 1 }],
  stages: [{ name: "Cimentación", order: 1, staId: 1 }],
  ...overrides,
});

const existingWork = {
  wrk_code: "OB-001",
  wrk_name: "Torre Norte",
  cnc_id: 1,
  ctt_id: 2,
  spt_id: 3,
  wrk_start_date: new Date("2026-01-31T00:00:00Z"),
  wrk_term_unit: "MES",
  wrk_area: "1500.50",
  wrk_direct_cost: "100000.00",
  wrk_initial_term: 12,
  wrk_extended_term: null,
  wrk_initial_value: "250000.01",
  wrk_extended_value: null,
  wrk_max_service_order_value: "50000.00",
  sta_id: 1,
};

beforeEach(() => {
  jest.clearAllMocks();
  state.work = null;
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  prismaMock.tbl_works.findFirst.mockResolvedValue(null);
  prismaMock.tbl_works.create.mockResolvedValue({ wrk_id: 40 });
  prismaMock.tbl_work_managers.findMany.mockResolvedValue([]);
  prismaMock.tbl_work_stages.findMany.mockResolvedValue([]);
  prismaMock.tbl_work_contacts.findMany.mockResolvedValue([]);
  prismaMock.tbl_address_types.findUnique.mockResolvedValue({ adt_name: "Oficina", sta_id: 1 });
  prismaMock.tbl_contracts.findMany.mockResolvedValue([]);
  prismaMock.tbl_contracts.count.mockResolvedValue(0);
  prismaMock.tbl_invoices.findMany.mockResolvedValue([]);
  prismaMock.tbl_invoices.count.mockResolvedValue(0);
  prismaMock.tbl_users.findMany.mockImplementation(async ({ where }) =>
    where.use_id.in.map((id) => ({ use_id: id, sta_id: 1, use_name: "Usuario", use_last_name: String(id) }))
  );
  prismaMock.tbl_construction_companies.findUnique.mockResolvedValue({ cnc_description: "Andina", sta_id: 1 });
  prismaMock.tbl_contract_types.findUnique.mockResolvedValue({ ctt_name: "Suministro", sta_id: 1 });
  prismaMock.tbl_supervision_types.findUnique.mockResolvedValue({ spt_name: "Técnica", sta_id: 1 });
});

describe("saveWork — crear", () => {
  it("crea la obra con sus responsables y etapas en una transacción, con importes redondeados", async () => {
    await expect(service.saveWork({ wrkId: 0, input: input(), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })).resolves.toEqual({
      message: "Obra creada correctamente",
      wrkId: 40,
    });

    const { data } = prismaMock.tbl_works.create.mock.calls[0][0];
    expect(data).toMatchObject({ wrk_code: "OB-001", sta_id: 1, wrk_create_by: 9, wrk_idempotency_key: KEY });
    // DEC-028: 250000.005 → 250000.01; vacío → null.
    expect(data.wrk_initial_value.toFixed(2)).toBe("250000.01");
    expect(data.wrk_extended_value).toBeNull();
    // DEC-030: fecha sin hora a medianoche UTC y unidad del plazo.
    expect(data.wrk_start_date.toISOString()).toBe("2026-01-31T00:00:00.000Z");
    expect(data.wrk_term_unit).toBe("MES");
    expect(prismaMock.tbl_work_managers.createMany.mock.calls[0][0].data).toEqual([
      { wrk_id: 40, use_id: 5, wkm_role: "MAIN", sta_id: 1, wkm_create_by: 9, wkm_update_by: 9 },
    ]);
    expect(prismaMock.tbl_work_stages.createMany.mock.calls[0][0].data).toEqual([
      { wrk_id: 40, wks_name: "Cimentación", wks_order: 1, sta_id: 1, wks_create_by: 9, wks_update_by: 9 },
    ]);
    expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
  });

  it("audita la cabecera (sin el área) y la asignación de responsables, con un solo operationId", async () => {
    await service.saveWork({ wrkId: 0, input: input(), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY });

    const rows = auditRows();
    expect(rows.every((r) => r.aud_entity === "OBRA" && r.aud_record_id === 40)).toBe(true);
    expect(rows.find((r) => r.aud_field === "wrk_initial_value").aud_new_value).toBe("250000.01");
    expect(rows.some((r) => r.aud_field === "wrk_area")).toBe(false);
    expect(rows.find((r) => r.aud_field === "wrk_start_date").aud_new_value).toBe("2026-01-31");
    expect(rows.find((r) => r.aud_field === "wrk_term_unit").aud_new_value).toBe("MES");
    expect(rows.find((r) => r.aud_operation === "ASIGNAR")).toMatchObject({
      aud_field: "responsable",
      aud_new_value: "usuario=5 rol=MAIN estado=1",
    });
    expect(new Set(rows.map((r) => r.aud_operation_id)).size).toBe(1);
  });

  it("bloquea usuarios y maestros antes de verificarlos", async () => {
    await service.saveWork({ wrkId: 0, input: input(), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY });

    const firstLock = prismaMock.$queryRaw.mock.invocationCallOrder[0];
    expect(prismaMock.$queryRaw).toHaveBeenCalledTimes(4); // usuario, constructora, tipo de contrato, tipo de interventoría
    expect(prismaMock.tbl_users.findMany.mock.invocationCallOrder[0]).toBeGreaterThan(firstLock);
    expect(prismaMock.tbl_construction_companies.findUnique.mock.invocationCallOrder[0]).toBeGreaterThan(firstLock);
  });

  it("sin permiso de asignar responsables no crea (403)", async () => {
    const granted = new Set([CAN.create, CAN.manageStages]);
    await expect(service.saveWork({ wrkId: 0, input: input(), useBy: 9, granted, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 403,
    });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("con etapas exige gestionar etapas; sin etapas no", async () => {
    const granted = new Set([CAN.create, CAN.assignManager]);
    await expect(service.saveWork({ wrkId: 0, input: input(), useBy: 9, granted, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 403,
      message: "No tienes permiso para gestionar las etapas de la obra.",
    });
    await expect(service.saveWork({ wrkId: 0, input: input({ stages: [] }), useBy: 9, granted, ctx, idempotencyKey: KEY })).resolves.toMatchObject({
      wrkId: 40,
    });
  });

  it.each([
    [{ managers: [{ useId: 5, role: "MAIN", staId: 2 }] }, "La obra debe tener al menos un responsable activo."],
    [
      { managers: [{ useId: 5, role: "MAIN" }, { useId: 5, role: "SUPPORT" }] },
      "Un usuario no puede figurar dos veces como responsable de la misma obra.",
    ],
    [{ stages: [{ name: "Cimentación", order: 1 }, { name: "cimentacion", order: 2 }] }, 'La etapa "cimentacion" está repetida en la obra.'],
    [{ extendedValue: "100" }, "El valor ampliado no puede ser menor que el valor inicial."],
    [{ extendedTerm: 6 }, "El plazo ampliado no puede ser menor que el plazo inicial."],
    [{ maxServiceOrderValue: "250000.02" }, "El valor máximo de orden de servicio no puede superar el valor vigente de la obra."],
  ])("rechaza con 400 antes de abrir la transacción: %j", async (overrides, message) => {
    await expect(service.saveWork({ wrkId: 0, input: input(overrides), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message,
    });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("el valor máximo de orden se compara con el valor ampliado cuando existe", async () => {
    await expect(
      service.saveWork({
        wrkId: 0,
        input: input({ extendedValue: "300000", maxServiceOrderValue: "280000" }),
        useBy: 9,
        granted: ALL,
        ctx,
        idempotencyKey: KEY,
      })
    ).resolves.toMatchObject({ wrkId: 40 });
  });

  it("el código repetido, aunque sea de una obra eliminada, se rechaza", async () => {
    prismaMock.tbl_works.findFirst.mockResolvedValue({ wrk_id: 7 });

    await expect(service.saveWork({ wrkId: 0, input: input(), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "Ya existe una obra con ese código.",
    });
    expect(prismaMock.tbl_works.findFirst.mock.calls[0][0].where).toEqual({ wrk_code: "OB-001" });
    expect(prismaMock.tbl_works.create).not.toHaveBeenCalled();
  });

  it("no asigna un usuario inactivo ni uno eliminado", async () => {
    prismaMock.tbl_users.findMany.mockResolvedValue([{ use_id: 5, sta_id: 2, use_name: "Ana", use_last_name: "Paz" }]);
    await expect(service.saveWork({ wrkId: 0, input: input(), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "El usuario Ana Paz está inactivo y no se puede asignar como responsable.",
    });

    prismaMock.tbl_users.findMany.mockResolvedValue([{ use_id: 5, sta_id: 3 }]);
    await expect(service.saveWork({ wrkId: 0, input: input(), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "Uno de los responsables seleccionados no existe.",
    });
  });

  it("no asigna una constructora inactiva", async () => {
    prismaMock.tbl_construction_companies.findUnique.mockResolvedValue({ cnc_description: "Andina", sta_id: 2 });

    await expect(service.saveWork({ wrkId: 0, input: input(), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
    });
    expect(prismaMock.tbl_works.create).not.toHaveBeenCalled();
  });
});

describe("saveWork — fecha de inicio", () => {
  it("una fecha que no existe se rechaza antes de abrir la transacción", async () => {
    await expect(
      service.saveWork({ wrkId: 0, input: input({ startDate: "2026-02-30" }), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 400 });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });
});

describe("saveWork — editar", () => {
  const editInput = (overrides) =>
    input({
      initialValue: "250000.01",
      managers: [
        { useId: 5, role: "SUPPORT", staId: 1 },
        { useId: 8, role: "MAIN", staId: 1 },
      ],
      stages: [
        { wksId: 11, name: "Cimentación", order: 2, staId: 1 },
        { name: "Acabados", order: 3, staId: 1 },
      ],
      ...overrides,
    });

  beforeEach(() => {
    state.work = existingWork;
    prismaMock.tbl_work_managers.findMany.mockResolvedValue([
      { use_id: 5, wkm_role: "MAIN", sta_id: 1 },
      { use_id: 6, wkm_role: "SUPPORT", sta_id: 1 },
    ]);
    prismaMock.tbl_work_stages.findMany.mockResolvedValue([
      { wks_id: 11, wks_name: "Cimentación", wks_order: 1, sta_id: 1 },
      { wks_id: 12, wks_name: "Estructura", wks_order: 2, sta_id: 1 },
    ]);
  });

  it("no quita una etapa con contratos (409); se puede desactivar", async () => {
    prismaMock.tbl_contracts.findMany.mockResolvedValue([{ wks_id: 12 }]);
    await expect(service.saveWork({ wrkId: 40, input: editInput(), useBy: 9, granted: ALL, ctx })).rejects.toMatchObject({
      statusCode: 409,
      message: 'No se puede quitar la etapa "Estructura": tiene contratos. Desactívala en su lugar.',
    });
    expect(prismaMock.tbl_contracts.findMany.mock.calls[0][0].where).toEqual({ wrk_id: 40, wks_id: { in: [12] } });
    expect(prismaMock.tbl_work_stages.deleteMany).not.toHaveBeenCalled();
  });

  it("no quita una etapa con facturas (409, DEC-042)", async () => {
    prismaMock.tbl_invoices.findMany.mockResolvedValue([{ wks_id: 12 }]);
    await expect(service.saveWork({ wrkId: 40, input: editInput(), useBy: 9, granted: ALL, ctx })).rejects.toMatchObject({
      statusCode: 409,
      message: 'No se puede quitar la etapa "Estructura": tiene facturas. Desactívala en su lugar.',
    });
    expect(prismaMock.tbl_invoices.findMany.mock.calls[0][0].where).toEqual({ wrk_id: 40, wks_id: { in: [12] } });
    expect(prismaMock.tbl_work_stages.deleteMany).not.toHaveBeenCalled();
  });

  it("bloquea la obra primero, después los usuarios y los maestros", async () => {
    await service.saveWork({ wrkId: 40, input: editInput(), useBy: 9, granted: ALL, ctx });

    const [firstSql] = prismaMock.$queryRaw.mock.calls[0];
    const firstLock = firstSql.join("?") + prismaMock.$queryRaw.mock.calls[0].slice(1).map((v) => v?.strings?.join("") ?? "").join(" ");
    expect(firstLock).toMatch(/tbl_works/);
    expect(prismaMock.tbl_works.findUnique.mock.invocationCallOrder[0]).toBeGreaterThan(prismaMock.$queryRaw.mock.invocationCallOrder[0]);
  });

  it("guarda las colecciones por diferencial contra la BD", async () => {
    await expect(service.saveWork({ wrkId: 40, input: editInput(), useBy: 9, granted: ALL, ctx })).resolves.toEqual({
      message: "Obra modificada correctamente",
      wrkId: 40,
    });

    const managers = prismaMock.tbl_work_managers;
    expect(managers.deleteMany).toHaveBeenCalledWith({ where: { wrk_id: 40, use_id: { in: [6] } } });
    expect(managers.updateMany).toHaveBeenCalledWith({
      where: { wrk_id: 40, use_id: 5 },
      data: { wkm_role: "SUPPORT", sta_id: 1, wkm_update_by: 9 },
    });
    expect(managers.createMany.mock.calls[0][0].data).toEqual([
      { wrk_id: 40, use_id: 8, wkm_role: "MAIN", sta_id: 1, wkm_create_by: 9, wkm_update_by: 9 },
    ]);

    const stages = prismaMock.tbl_work_stages;
    expect(stages.deleteMany).toHaveBeenCalledWith({ where: { wrk_id: 40, wks_id: { in: [12] } } });
    expect(stages.updateMany).toHaveBeenCalledWith({
      where: { wks_id: 11, wrk_id: 40 },
      data: { wks_name: "Cimentación", wks_order: 2, sta_id: 1, wks_update_by: 9 },
    });
    expect(stages.createMany.mock.calls[0][0].data).toEqual([
      { wrk_id: 40, wks_name: "Acabados", wks_order: 3, sta_id: 1, wks_create_by: 9, wks_update_by: 9 },
    ]);
  });

  it("audita asignar, retirar y cambiar de rol; sin cambios de cabecera no audita la cabecera", async () => {
    await service.saveWork({ wrkId: 40, input: editInput(), useBy: 9, granted: ALL, ctx });

    const rows = auditRows();
    expect(rows.map((r) => [r.aud_operation, r.aud_old_value, r.aud_new_value])).toEqual(
      expect.arrayContaining([
        ["ASIGNAR", null, "usuario=8 rol=MAIN estado=1"],
        ["REVOCAR", "usuario=6 rol=SUPPORT estado=1", null],
        ["EDITAR", "usuario=5 rol=MAIN estado=1", "usuario=5 rol=SUPPORT estado=1"],
      ])
    );
    expect(rows.every((r) => r.aud_field === "responsable")).toBe(true);
  });

  it("retirar un responsable exige su permiso propio", async () => {
    const granted = new Set([CAN.edit, CAN.assignManager, CAN.manageStages]);

    await expect(service.saveWork({ wrkId: 40, input: editInput(), useBy: 9, granted, ctx })).rejects.toMatchObject({
      statusCode: 403,
      message: "No tienes permiso para retirar responsables de obra.",
    });
    expect(prismaMock.tbl_works.update).not.toHaveBeenCalled();
  });

  it("editar solo la cabecera no exige los permisos de responsables ni de etapas", async () => {
    const granted = new Set([CAN.edit]);
    const unchanged = input({
      name: "Torre Norte II",
      initialValue: "250000.01",
      managers: [
        { useId: 5, role: "MAIN", staId: 1 },
        { useId: 6, role: "SUPPORT", staId: 1 },
      ],
      stages: [
        { wksId: 11, name: "Cimentación", order: 1, staId: 1 },
        { wksId: 12, name: "Estructura", order: 2, staId: 1 },
      ],
    });

    await expect(service.saveWork({ wrkId: 40, input: unchanged, useBy: 9, granted, ctx })).resolves.toMatchObject({ wrkId: 40 });
    expect(auditRows().map((r) => [r.aud_field, r.aud_old_value, r.aud_new_value])).toEqual([["wrk_name", "Torre Norte", "Torre Norte II"]]);
  });

  it("conserva un responsable ya asignado aunque su usuario esté inactivo", async () => {
    prismaMock.tbl_users.findMany.mockImplementation(async ({ where }) =>
      where.use_id.in.map((id) => ({ use_id: id, sta_id: id === 5 ? 2 : 1 }))
    );

    await expect(service.saveWork({ wrkId: 40, input: editInput(), useBy: 9, granted: ALL, ctx })).resolves.toMatchObject({ wrkId: 40 });
  });

  it("no acepta una etapa de otra obra", async () => {
    await expect(
      service.saveWork({ wrkId: 40, input: editInput({ stages: [{ wksId: 99, name: "Ajena", order: 1 }] }), useBy: 9, granted: ALL, ctx })
    ).rejects.toMatchObject({ statusCode: 400, message: "Una de las etapas no pertenece a esta obra." });
    expect(prismaMock.tbl_work_stages.updateMany).not.toHaveBeenCalled();
  });

  it("una obra eliminada no se edita (404)", async () => {
    state.work = { ...existingWork, sta_id: 3 };

    await expect(service.saveWork({ wrkId: 40, input: editInput(), useBy: 9, granted: ALL, ctx })).rejects.toMatchObject({ statusCode: 404 });
  });

  it("el código se compara contra las demás obras", async () => {
    await service.saveWork({ wrkId: 40, input: editInput(), useBy: 9, granted: ALL, ctx });

    expect(prismaMock.tbl_works.findFirst.mock.calls[0][0].where).toEqual({ wrk_code: "OB-001", wrk_id: { not: 40 } });
  });
});

describe("changeWorkStatus y deleteWork", () => {
  beforeEach(() => {
    state.work = { sta_id: 1 };
  });

  it("desactiva la obra y lo registra en la bitácora", async () => {
    await expect(service.changeWorkStatus({ wrkId: 40, staId: 2, useBy: 9, ctx })).resolves.toEqual({
      message: "Obra desactivada correctamente",
      staId: 2,
    });
    expect(prismaMock.tbl_works.update.mock.calls[0][0].data).toEqual({ sta_id: 2, wrk_update_by: 9 });
    expect(auditRows()[0]).toMatchObject({ aud_field: "sta_id", aud_old_value: "1", aud_new_value: "2" });
  });

  it("elimina de forma lógica, con evidencia, y conserva responsables y etapas", async () => {
    await expect(service.deleteWork({ wrkId: 40, useBy: 9, ctx })).resolves.toEqual({ message: "Obra eliminada correctamente" });

    expect(prismaMock.tbl_works.update.mock.calls[0][0]).toMatchObject({
      where: { wrk_id: 40 },
      data: { sta_id: 3, wrk_delete_by: 9, wrk_delete_at: expect.any(Date) },
    });
    expect(prismaMock.tbl_work_managers.deleteMany).not.toHaveBeenCalled();
    expect(prismaMock.tbl_work_stages.deleteMany).not.toHaveBeenCalled();
  });

  it("con contratos no se elimina (409)", async () => {
    prismaMock.tbl_contracts.count.mockResolvedValue(2);
    await expect(service.deleteWork({ wrkId: 40, useBy: 9, ctx })).rejects.toMatchObject({
      statusCode: 409,
      message: "No se puede eliminar la obra: tiene 2 contrato(s) asociado(s).",
    });
    expect(prismaMock.tbl_contracts.count).toHaveBeenCalledWith({ where: { wrk_id: 40, sta_id: { not: 3 } } });
    expect(prismaMock.tbl_works.update).not.toHaveBeenCalled();
  });

  it("con facturas no se elimina (409, DEC-042)", async () => {
    prismaMock.tbl_invoices.count.mockResolvedValue(3);
    await expect(service.deleteWork({ wrkId: 40, useBy: 9, ctx })).rejects.toMatchObject({
      statusCode: 409,
      message: "No se puede eliminar la obra: tiene 3 factura(s) asociado(s).",
    });
    expect(prismaMock.tbl_works.update).not.toHaveBeenCalled();
  });

  it("una obra ya eliminada responde 404", async () => {
    state.work = { sta_id: 3 };
    await expect(service.deleteWork({ wrkId: 40, useBy: 9, ctx })).rejects.toMatchObject({ statusCode: 404 });
  });
});

describe("getWork", () => {
  it("devuelve la fecha de inicio, la fecha final calculada, el valor vigente y los nombres de los maestros", async () => {
    prismaMock.tbl_works.findFirst.mockResolvedValue({
      wrk_id: 40,
      ...existingWork,
      wrk_initial_term: 14,
      wrk_extended_value: "260000.00",
      tbl_status: { sta_name: "Activo" },
      tbl_construction_companies: { cnc_description: "Andina" },
      tbl_contract_types: { ctt_name: "Suministro" },
      tbl_supervision_types: { spt_name: "Técnica" },
      tbl_work_managers: [],
      tbl_work_stages: [],
      tbl_work_contacts: [
        { wkc_id: 3, adt_id: 4, wkc_name: "Ana", wkc_phone: "6011234567", wkc_main: true, tbl_address_types: { adt_name: "Oficina" } },
      ],
    });

    await expect(service.getWork({ wrkId: 40 })).resolves.toMatchObject({
      startDate: "2026-01-31",
      termUnit: "MES",
      // 31 ene 2026 + 14 meses = 31 mar 2027.
      endDate: "2027-03-31",
      currentValue: "260000.00",
      constructionCompany: "Andina",
      contractType: "Suministro",
      supervisionType: "Técnica",
      contacts: [expect.objectContaining({ contactId: 3, adtId: 4, addressType: "Oficina", name: "Ana", phone: "6011234567", main: true })],
    });
  });

  it("una obra eliminada o inexistente responde 404", async () => {
    prismaMock.tbl_works.findFirst.mockResolvedValue(null);
    await expect(service.getWork({ wrkId: 99 })).rejects.toMatchObject({ statusCode: 404 });
  });
});

describe("paginationWorks y selectWorkManagers", () => {
  it("lista sin eliminadas, busca por código, nombre o constructora y devuelve el valor vigente", async () => {
    prismaMock.tbl_works.findMany.mockResolvedValue([
      {
        wrk_id: 40,
        wrk_code: "OB-001",
        wrk_name: "Torre Norte",
        wrk_initial_value: "250000.01",
        wrk_extended_value: "300000",
        wrk_start_date: new Date("2026-01-31T00:00:00Z"),
        wrk_initial_term: 1,
        wrk_term_unit: "MES",
        sta_id: 1,
        wrk_update_at: null,
        tbl_construction_companies: { cnc_description: "Andina" },
        tbl_contract_types: { ctt_name: "Suministro" },
        tbl_supervision_types: { spt_name: "Técnica" },
        tbl_status: { sta_name: "Activo" },
        updated_by_user: { use_name: "Ana", use_last_name: "Paz" },
        tbl_work_managers: [{ tbl_users: { use_name: "Luis", use_last_name: "Mora" } }],
        tbl_work_stages: [
          { wks_name: "Cimentación", sta_id: 1 },
          { wks_name: "Estructura", sta_id: 2 },
        ],
        _count: { tbl_work_managers: 2 },
      },
    ]);
    prismaMock.tbl_works.count.mockResolvedValue(1);
    prismaMock.tbl_works.groupBy.mockResolvedValue([{ sta_id: 1, _count: { _all: 1 } }]);

    const page = await service.paginationWorks({ search: "andina", rows: 10, first: 0, sortField: "constructionCompany", sortOrder: 1 });

    const args = prismaMock.tbl_works.findMany.mock.calls[0][0];
    expect(args.where.sta_id).toEqual({ not: 3 });
    expect(args.where.OR).toContainEqual({ tbl_construction_companies: { cnc_description: { contains: "andina" } } });
    expect(args.orderBy).toEqual({ tbl_construction_companies: { cnc_description: "asc" } });
    expect(page.results[0]).toMatchObject({
      wrkId: 40,
      initialValue: "250000.01",
      currentValue: "300000.00",
      updatedByName: "Ana Paz",
      mainManagerName: "Luis Mora",
      startDate: "2026-01-31",
      // 31 ene + 1 mes: último día de febrero.
      endDate: "2026-02-28",
      extendedValue: "300000.00",
      // El plazo ya venció: avance 100 % (DEC-033).
      progressPercent: 100,
      progressLevel: "CRITICAL",
      activeManagers: 2,
      stages: [
        { name: "Cimentación", staId: 1 },
        { name: "Estructura", staId: 2 },
      ],
    });
    expect(args.select.tbl_work_managers.where).toEqual({ wkm_role: "MAIN", sta_id: 1 });
    expect(args.select.tbl_work_stages.orderBy).toEqual({ wks_order: "asc" });
    expect(args.select._count.select.tbl_work_managers.where).toEqual({ sta_id: 1 });
    expect(page.statusCounts).toEqual({ 1: 1 });
  });

  it("un campo de orden fuera de la lista blanca usa el de por defecto", async () => {
    prismaMock.tbl_works.findMany.mockResolvedValue([]);
    prismaMock.tbl_works.count.mockResolvedValue(0);
    prismaMock.tbl_works.groupBy.mockResolvedValue([]);

    await service.paginationWorks({ sortField: "wrk_initial_value; DROP", sortOrder: -1 });

    expect(prismaMock.tbl_works.findMany.mock.calls[0][0].orderBy).toEqual({ wrk_update_at: "desc" });
  });

  it("una obra sin fechas no tiene avance", async () => {
    prismaMock.tbl_works.findMany.mockResolvedValue([
      { wrk_id: 41, wrk_start_date: null, wrk_initial_term: 3, wrk_term_unit: "MES", sta_id: 1, tbl_work_stages: [], _count: { tbl_work_managers: 0 } },
    ]);
    prismaMock.tbl_works.count.mockResolvedValue(1);
    prismaMock.tbl_works.groupBy.mockResolvedValue([]);

    const page = await service.paginationWorks({});

    expect(page.results[0]).toMatchObject({ progressPercent: null, progressLevel: null, stages: [], activeManagers: 0 });
  });

  it("los candidatos a responsable son usuarios activos", async () => {
    prismaMock.tbl_users.findMany.mockResolvedValue([{ use_id: 5, use_name: "Ana", use_last_name: "Paz", sta_id: 1 }]);

    await expect(service.selectWorkManagers({})).resolves.toEqual([{ value: 5, label: "Ana Paz", staId: 1 }]);
    expect(prismaMock.tbl_users.findMany.mock.calls[0][0]).toMatchObject({ where: { sta_id: 1 }, take: 100 });
  });
});

// DEC-033: indicadores del listado, de todas las obras no eliminadas.
describe("summaryWorks", () => {
  const work = (overrides) => ({
    sta_id: 1,
    wrk_initial_value: "1000.10",
    wrk_extended_value: null,
    wrk_start_date: new Date("2020-01-01T00:00:00Z"),
    wrk_initial_term: 1,
    wrk_term_unit: "MES",
    ...overrides,
  });

  it("cuenta por estado, suma el valor vigente en Decimal y promedia el avance de las activas", async () => {
    prismaMock.tbl_works.findMany.mockResolvedValue([
      // Activa, plazo vencido: 100 %.
      work({ wrk_extended_value: "2000.20" }),
      // Activa, todavía no empieza: 0 %.
      work({ wrk_start_date: new Date("2099-01-01T00:00:00Z") }),
      // Activa sin fecha: no entra en el promedio.
      work({ wrk_start_date: null }),
      // Inactiva: suma al valor, no al avance.
      work({ sta_id: 2 }),
    ]);

    const summary = await service.summaryWorks();

    expect(prismaMock.tbl_works.findMany.mock.calls[0][0].where).toEqual({ sta_id: { not: 3 } });
    expect(summary).toEqual({
      total: 4,
      active: 3,
      inactive: 1,
      // 2000.20 (ampliado) + 1000.10 × 3.
      currentValueTotal: "5000.50",
      averageProgress: 50,
      closingCount: 1,
      closingThreshold: 70,
    });
  });

  it("sin obras no hay promedio", async () => {
    prismaMock.tbl_works.findMany.mockResolvedValue([]);

    await expect(service.summaryWorks()).resolves.toEqual({
      total: 0,
      active: 0,
      inactive: 0,
      currentValueTotal: "0.00",
      averageProgress: null,
      closingCount: 0,
      closingThreshold: 70,
    });
  });
});

describe("previewWorkEndDate (FRONTEND_STANDARD, regla 9)", () => {
  it("inicio + plazo inicial en su unidad, con la misma regla que al mostrar la obra guardada", () => {
    expect(service.previewWorkEndDate({ startDate: "2026-09-30", initialTerm: "1", termUnit: "MES" })).toEqual({ endDate: "2026-10-30" });
    expect(service.previewWorkEndDate({ startDate: "2026-01-31", initialTerm: "1", termUnit: "MES" })).toEqual({ endDate: "2026-02-28" });
    expect(service.previewWorkEndDate({ startDate: "2026-01-01", initialTerm: "45", termUnit: "DIA" })).toEqual({ endDate: "2026-02-15" });
    expect(service.previewWorkEndDate({ startDate: "2024-02-29", initialTerm: "1", termUnit: "ANIO" })).toEqual({ endDate: "2025-02-28" });
  });

  it("sin datos suficientes devuelve null en vez de una fecha", () => {
    expect(service.previewWorkEndDate({ startDate: "2026-02-30", initialTerm: "1", termUnit: "MES" })).toEqual({ endDate: null });
    expect(service.previewWorkEndDate({ startDate: "2026-01-01", initialTerm: "1", termUnit: "SEMANA" })).toEqual({ endDate: null });
  });
});

describe("saveWork — contactos (PRO-BD-04)", () => {
  const contact = (overrides = {}) => ({ adtId: 4, name: "Ana", phone: "6011234567", main: true, ...overrides });

  it("crea la obra con sus contactos en la misma transacción, bloqueando el tipo de dirección", async () => {
    await service.saveWork({ wrkId: 0, input: input({ contacts: [contact()] }), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY });

    expect(prismaMock.tbl_work_contacts.createMany.mock.calls[0][0].data).toEqual([
      expect.objectContaining({ wrk_id: 40, adt_id: 4, wkc_name: "Ana", wkc_phone: "6011234567", wkc_main: true, wkc_create_by: 9 }),
    ]);
    const lockedSql = prismaMock.$queryRaw.mock.calls.map((call) => call.slice(1).map((v) => v?.strings?.join("") ?? "").join(" ")).join("\n");
    expect(lockedSql).toMatch(/tbl_address_types/);
    expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
  });

  it("dos principales o un contacto sin medio se rechazan antes de abrir la transacción", async () => {
    await expect(
      service.saveWork({ wrkId: 0, input: input({ contacts: [contact(), contact({ name: "Luis" })] }), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 400, message: "Solo un contacto puede ser el principal." });
    await expect(
      service.saveWork({ wrkId: 0, input: input({ contacts: [contact({ phone: "" })] }), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 400, message: expect.stringContaining("al menos una dirección") });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("no asigna un tipo de dirección inactivo a un contacto nuevo", async () => {
    prismaMock.tbl_address_types.findUnique.mockResolvedValue({ adt_name: "Bodega", sta_id: 2 });
    await expect(
      service.saveWork({ wrkId: 0, input: input({ contacts: [contact()] }), useBy: 9, granted: ALL, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 400 });
    expect(prismaMock.tbl_work_contacts.createMany).not.toHaveBeenCalled();
  });

  describe("al editar", () => {
    const stored = { wkc_id: 21, adt_id: 4, wkc_name: "Ana", wkc_position: null, wkc_address: null, wkc_phone: "6011234567", wkc_mobile: null, wkc_fax: null, wkc_email: null, wkc_observation: null, wkc_main: true };

    beforeEach(() => {
      state.work = existingWork;
      prismaMock.tbl_work_managers.findMany.mockResolvedValue([{ use_id: 5, wkm_role: "MAIN", sta_id: 1 }]);
      prismaMock.tbl_work_stages.findMany.mockResolvedValue([{ wks_id: 11, wks_name: "Cimentación", wks_order: 1, sta_id: 1 }]);
      prismaMock.tbl_work_contacts.findMany.mockResolvedValue([{ ...stored }, { ...stored, wkc_id: 22, wkc_name: "Pedro", wkc_main: false }]);
    });

    const editInput = (contacts) => input({ initialValue: "250000.01", stages: [{ wksId: 11, name: "Cimentación", order: 1, staId: 1 }], contacts });

    it("guarda por diferencial: quita, pasa la marca de principal y agrega, en ese orden", async () => {
      await service.saveWork({
        wrkId: 40,
        input: editInput([contact({ contactId: 21, main: false }), contact({ name: "Luis", main: true })]),
        useBy: 9,
        granted: ALL,
        ctx,
      });

      const contacts = prismaMock.tbl_work_contacts;
      expect(contacts.deleteMany).toHaveBeenCalledWith({ where: { wrk_id: 40, wkc_id: { in: [22] } } });
      expect(contacts.updateMany.mock.calls[0][0]).toMatchObject({ where: { wkc_id: 21, wrk_id: 40 }, data: { wkc_main: false, wkc_update_by: 9 } });
      expect(contacts.createMany.mock.calls[0][0].data).toEqual([expect.objectContaining({ wrk_id: 40, wkc_name: "Luis", wkc_main: true })]);
      expect(contacts.updateMany.mock.invocationCallOrder[0]).toBeLessThan(contacts.createMany.mock.invocationCallOrder[0]);
    });

    it("sin cambios en los contactos no los toca", async () => {
      await service.saveWork({
        wrkId: 40,
        input: editInput([contact({ contactId: 21 }), contact({ contactId: 22, name: "Pedro", main: false })]),
        useBy: 9,
        granted: ALL,
        ctx,
      });
      expect(prismaMock.tbl_work_contacts.deleteMany).not.toHaveBeenCalled();
      expect(prismaMock.tbl_work_contacts.updateMany).not.toHaveBeenCalled();
      expect(prismaMock.tbl_work_contacts.createMany).not.toHaveBeenCalled();
    });

    it("no acepta un contacto de otra obra", async () => {
      await expect(
        service.saveWork({ wrkId: 40, input: editInput([contact({ contactId: 999 })]), useBy: 9, granted: ALL, ctx })
      ).rejects.toMatchObject({ statusCode: 400, message: "Uno de los contactos no pertenece a esta obra." });
      expect(prismaMock.tbl_works.update).not.toHaveBeenCalled();
    });

    it("conserva un tipo de dirección inactivo en el contacto que ya lo tenía", async () => {
      prismaMock.tbl_address_types.findUnique.mockResolvedValue({ adt_name: "Oficina", sta_id: 2 });
      await expect(
        service.saveWork({ wrkId: 40, input: editInput([contact({ contactId: 21, name: "Ana María" })]), useBy: 9, granted: ALL, ctx })
      ).resolves.toMatchObject({ wrkId: 40 });
    });
  });
});

// ─── Alcance por obra (DEC-047) ──────────────────────────────────────────────
// Obra 8 = la del registro; obra 9 = otra. Fuera del alcance, 404 sin tocar nada.
const OWN = Object.freeze({ all: false, wrkId: 8 });
const OTHER = Object.freeze({ all: false, wrkId: 9 });
const NONE = Object.freeze({ all: false, wrkId: null });

describe("alcance por obra (DEC-047)", () => {
  it("el listado y los indicadores filtran por la obra del alcance; sin obra, nada", async () => {
    prismaMock.tbl_works.findMany.mockResolvedValue([]);
    prismaMock.tbl_works.count.mockResolvedValue(0);
    prismaMock.tbl_works.groupBy.mockResolvedValue([]);
    await service.paginationWorks({ scope: OWN });
    expect(prismaMock.tbl_works.findMany.mock.calls.at(-1)[0].where.wrk_id).toEqual({ in: [8] });
    await service.summaryWorks({ scope: NONE });
    expect(prismaMock.tbl_works.findMany.mock.calls.at(-1)[0].where.wrk_id).toEqual({ in: [] });
  });

  it("una obra de otro alcance no se lee, no se edita, no cambia de estado ni se elimina (404)", async () => {
    await expect(service.getWork({ wrkId: 8, scope: OTHER })).rejects.toMatchObject({ statusCode: 404, message: "No se encontró la obra." });
    await expect(service.changeWorkStatus({ wrkId: 8, staId: 2, useBy: 9, scope: OTHER, ctx })).rejects.toMatchObject({ statusCode: 404 });
    await expect(service.deleteWork({ wrkId: 8, useBy: 9, scope: OTHER, ctx })).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.tbl_works.findFirst).not.toHaveBeenCalled();
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });
});
