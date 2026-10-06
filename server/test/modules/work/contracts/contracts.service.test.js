import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";
import { CONTRACT_FIELDS_CATALOG, typeFieldRows } from "../../../helpers/contractFields.fixtures.js";

// Contratos (ADR-0015 a ADR-0017, DEC-035): creación atómica con valor
// inicial e historial, coherencia obra-etapa-proveedor, número único en la
// obra, fecha fin derivada, edición según el estado y eliminación lógica.

const state = { contract: null, typeFields: [] };

const prismaMock = {
  tbl_contracts: {
    findUnique: jest.fn(async ({ where }) => (where.ctr_idempotency_key ? null : state.contract)),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    groupBy: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
  },
  tbl_contract_concepts: { create: jest.fn(), findMany: jest.fn(), updateMany: jest.fn(), count: jest.fn(async () => 0) },
  tbl_contract_status_history: { create: jest.fn() },
  tbl_invoices: { count: jest.fn() },
  tbl_works: { findUnique: jest.fn() },
  tbl_work_stages: { findUnique: jest.fn() },
  tbl_work_providers: { findUnique: jest.fn() },
  tbl_contract_types: { findUnique: jest.fn() },
  tbl_contract_fields: { findMany: jest.fn(async () => CONTRACT_FIELDS_CATALOG) },
  tbl_contract_type_fields: { findMany: jest.fn(async () => state.typeFields) },
  tbl_contract_type_field_versions: { findMany: jest.fn(async () => []) },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const service = await import("../../../../src/modules/work/contracts/contracts.service.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const ctx = { useId: 9, ip: "1.1.1.1" };

const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);
const lockedTables = () => prismaMock.$queryRaw.mock.calls.map((call) => call.slice(1).map((v) => v?.strings?.join("") ?? "").join(" "));

const input = (overrides = {}) => ({
  wrkId: 8,
  prvId: 77,
  wksId: 11,
  cttId: 2,
  number: " C-001 ",
  name: "Suministro de acero",
  startDate: "2026-01-31",
  term: 6,
  termUnit: "MES",
  observation: "",
  initialConcept: {
    directCost: "1000000.005",
    adminPct: "10",
    contingencyPct: "5",
    profitPct: "5",
    vatPct: "19",
    advancePct: "15",
    retentionPct: "5",
  },
  ...overrides,
});

const storedContract = {
  ctr_id: 30,
  wrk_id: 8,
  prv_id: 77,
  wks_id: 11,
  ctt_id: 2,
  ctr_number: "C-001",
  ctr_name: "Suministro de acero",
  ctr_start_date: new Date("2026-01-31T00:00:00Z"),
  ctr_term: 6,
  ctr_term_unit: "MES",
  ctr_end_date: new Date("2026-07-31T00:00:00Z"),
  ctr_suspended_days: 0,
  ctr_state: "IN_PROGRESS",
  ctr_observation: null,
  ctr_aiu_requested: true,
  sta_id: 1,
};

beforeEach(() => {
  jest.clearAllMocks();
  state.contract = null;
  state.typeFields = typeFieldRows();
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  prismaMock.tbl_contracts.findFirst.mockResolvedValue(null);
  prismaMock.tbl_contracts.create.mockResolvedValue({ ctr_id: 30 });
  prismaMock.tbl_contract_concepts.create.mockResolvedValue({ ccp_id: 300 });
  prismaMock.tbl_contract_concepts.findMany.mockResolvedValue([]);
  prismaMock.tbl_invoices.count.mockResolvedValue(0);
  prismaMock.tbl_works.findUnique.mockResolvedValue({ sta_id: 1, wrk_code: "OB-1" });
  prismaMock.tbl_work_stages.findUnique.mockResolvedValue({ wrk_id: 8, sta_id: 1, wks_name: "Estructura" });
  prismaMock.tbl_work_providers.findUnique.mockResolvedValue({ sta_id: 1, tbl_providers: { prv_name: "Aceros SA", sta_id: 1 } });
  prismaMock.tbl_contract_types.findUnique.mockResolvedValue({ ctt_id: 2, ctt_name: "Suministro", ctt_config_version: 3, sta_id: 1 });
});

describe("saveContract — crear", () => {
  it("crea contrato, valor inicial e historial en una transacción, con la fecha fin del servidor", async () => {
    await expect(service.saveContract({ ctrId: 0, input: input(), useBy: 9, ctx, idempotencyKey: KEY })).resolves.toEqual({
      message: "Contrato creado correctamente",
      ctrId: 30,
    });

    const { data } = prismaMock.tbl_contracts.create.mock.calls[0][0];
    expect(data).toMatchObject({
      wrk_id: 8,
      prv_id: 77,
      wks_id: 11,
      ctr_number: "C-001",
      ctr_state: "IN_PROGRESS",
      sta_id: 1,
      ctr_create_by: 9,
      ctr_idempotency_key: KEY,
      ctr_observation: null,
    });
    // 31 ene + 6 meses = 31 jul (DEC-030, addTerm).
    expect(data.ctr_end_date.toISOString()).toBe("2026-07-31T00:00:00.000Z");

    const concept = prismaMock.tbl_contract_concepts.create.mock.calls[0][0].data;
    expect(concept).toMatchObject({ ctr_id: 30, ccp_type: "INITIAL", ccp_create_by: 9 });
    expect(concept.ccp_start_date.toISOString()).toBe("2026-01-31T00:00:00.000Z");
    expect(concept.ccp_direct_cost.toFixed(2)).toBe("1000000.01");
    expect(concept.ccp_advance_pct.toFixed(2)).toBe("15.00");
    expect(concept).not.toHaveProperty("ccp_number");

    expect(prismaMock.tbl_contract_status_history.create.mock.calls[0][0].data).toEqual({
      ctr_id: 30,
      csh_from_state: null,
      csh_to_state: "IN_PROGRESS",
      csh_origin: "AUTOMATIC",
      rea_id: null,
      csh_observation: null,
      csh_create_by: 9,
    });
    expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
  });

  it("bloquea obra, proveedor y tipo de contrato antes de leer nada", async () => {
    await service.saveContract({ ctrId: 0, input: input(), useBy: 9, ctx, idempotencyKey: KEY });

    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_works/), expect.stringMatching(/tbl_providers/), expect.stringMatching(/tbl_contract_types/)]);
    const lastLock = prismaMock.$queryRaw.mock.invocationCallOrder.at(-1);
    expect(prismaMock.tbl_work_stages.findUnique.mock.invocationCallOrder[0]).toBeGreaterThan(lastLock);
    expect(prismaMock.tbl_work_providers.findUnique.mock.invocationCallOrder[0]).toBeGreaterThan(lastLock);
  });

  it("audita contrato y valor inicial con un solo operationId", async () => {
    await service.saveContract({ ctrId: 0, input: input(), useBy: 9, ctx, idempotencyKey: KEY });

    const rows = auditRows();
    expect(rows.find((r) => r.aud_entity === "CONTRATO" && r.aud_field === "ctr_end_date").aud_new_value).toBe("2026-07-31");
    expect(rows.find((r) => r.aud_field === "ctr_state").aud_new_value).toBe("IN_PROGRESS");
    expect(rows.find((r) => r.aud_entity === "CONCEPTO_CONTRACTUAL" && r.aud_field === "ccp_direct_cost").aud_new_value).toBe("1000000.01");
    expect(rows.some((r) => r.aud_field === "ctr_name")).toBe(false);
    expect(new Set(rows.map((r) => r.aud_operation_id)).size).toBe(1);
  });

  it("la etapa debe ser de la obra del contrato", async () => {
    prismaMock.tbl_work_stages.findUnique.mockResolvedValue({ wrk_id: 99, sta_id: 1, wks_name: "Ajena" });
    await expect(service.saveContract({ ctrId: 0, input: input(), useBy: 9, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "La etapa seleccionada no pertenece a la obra del contrato.",
    });
    expect(prismaMock.tbl_contracts.create).not.toHaveBeenCalled();
  });

  it("el proveedor debe estar asignado a la obra, con la asignación activa", async () => {
    prismaMock.tbl_work_providers.findUnique.mockResolvedValue(null);
    await expect(service.saveContract({ ctrId: 0, input: input(), useBy: 9, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "El proveedor seleccionado no está asignado a la obra del contrato.",
    });

    prismaMock.tbl_work_providers.findUnique.mockResolvedValue({ sta_id: 2, tbl_providers: { prv_name: "Aceros SA", sta_id: 1 } });
    await expect(service.saveContract({ ctrId: 0, input: input(), useBy: 9, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "La asignación de Aceros SA a la obra está inactiva.",
    });
  });

  it("una obra inactiva no admite contratos nuevos", async () => {
    prismaMock.tbl_works.findUnique.mockResolvedValue({ sta_id: 2, wrk_code: "OB-1" });
    await expect(service.saveContract({ ctrId: 0, input: input(), useBy: 9, ctx, idempotencyKey: KEY })).rejects.toMatchObject({ statusCode: 400 });
  });

  it("el número no se repite en la obra entre los no eliminados (409)", async () => {
    prismaMock.tbl_contracts.findFirst.mockResolvedValue({ ctr_id: 12 });
    await expect(service.saveContract({ ctrId: 0, input: input(), useBy: 9, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 409,
      message: "Ya existe un contrato con el número C-001 en esta obra.",
    });
    expect(prismaMock.tbl_contracts.findFirst.mock.calls[0][0].where).toEqual({ wrk_id: 8, ctr_number: "C-001", sta_id: { not: 3 } });
  });

  it("ignora la fecha fin y el estado que mande el cliente", async () => {
    await service.saveContract({
      ctrId: 0,
      input: input({ endDate: "2030-01-01", ctr_end_date: "2030-01-01", state: "LIQUIDATED" }),
      useBy: 9,
      ctx,
      idempotencyKey: KEY,
    });
    const { data } = prismaMock.tbl_contracts.create.mock.calls[0][0];
    expect(data.ctr_end_date.toISOString()).toBe("2026-07-31T00:00:00.000Z");
    expect(data.ctr_state).toBe("IN_PROGRESS");
  });
});

describe("saveContract — editar", () => {
  beforeEach(() => {
    state.contract = { ...storedContract };
  });

  it("bloquea obra, proveedor, contrato y tipo; recalcula la fecha fin con las prórrogas", async () => {
    prismaMock.tbl_contract_concepts.findMany.mockResolvedValue([
      { ccp_type: "INITIAL", ccp_extension: null, sta_id: 1 },
      { ccp_type: "AMENDMENT", ccp_extension: 2, sta_id: 1 },
    ]);

    await expect(service.saveContract({ ctrId: 30, input: input({ term: 8 }), useBy: 9, ctx })).resolves.toEqual({
      message: "Contrato modificado correctamente",
      ctrId: 30,
    });

    expect(lockedTables()).toEqual([
      expect.stringMatching(/tbl_works/),
      expect.stringMatching(/tbl_providers/),
      expect.stringMatching(/tbl_contracts/),
      expect.stringMatching(/tbl_contract_types/),
    ]);
    const { data } = prismaMock.tbl_contracts.update.mock.calls[0][0];
    // 31 ene + (8 + 2) meses = 30 nov.
    expect(data.ctr_end_date.toISOString()).toBe("2026-11-30T00:00:00.000Z");
    expect(data).not.toHaveProperty("wrk_id");
    expect(auditRows().find((r) => r.aud_field === "ctr_term")).toMatchObject({ aud_old_value: "6", aud_new_value: "8" });
  });

  it("si cambia la fecha de inicio, el valor inicial la sigue", async () => {
    await service.saveContract({ ctrId: 30, input: input({ startDate: "2026-02-01" }), useBy: 9, ctx });
    expect(prismaMock.tbl_contract_concepts.updateMany.mock.calls[0][0]).toMatchObject({
      where: { ctr_id: 30, ccp_type: "INITIAL" },
      data: { ccp_update_by: 9 },
    });
  });

  it("conserva una etapa inactiva que ya tenía", async () => {
    prismaMock.tbl_work_stages.findUnique.mockResolvedValue({ wrk_id: 8, sta_id: 2, wks_name: "Estructura" });
    await expect(service.saveContract({ ctrId: 30, input: input(), useBy: 9, ctx })).resolves.toMatchObject({ ctrId: 30 });
  });

  it("en liquidación no se editan los datos del contrato (409)", async () => {
    state.contract = { ...storedContract, ctr_state: "IN_LIQUIDATION" };
    await expect(service.saveContract({ ctrId: 30, input: input(), useBy: 9, ctx })).rejects.toMatchObject({ statusCode: 409 });
    expect(prismaMock.tbl_contracts.update).not.toHaveBeenCalled();
  });

  it("un contrato eliminado responde 404", async () => {
    state.contract = { ...storedContract, sta_id: 3 };
    await expect(service.saveContract({ ctrId: 30, input: input(), useBy: 9, ctx })).rejects.toMatchObject({ statusCode: 404 });
  });

  it("con facturas no cambia el proveedor (409, DEC-042); sin cambiarlo, sí se edita", async () => {
    prismaMock.tbl_invoices.count.mockResolvedValue(1);
    await expect(service.saveContract({ ctrId: 30, input: input({ prvId: 78 }), useBy: 9, ctx })).rejects.toMatchObject({
      statusCode: 409,
      message: "El contrato tiene facturas registradas: no se puede cambiar su proveedor.",
    });
    expect(prismaMock.tbl_invoices.count).toHaveBeenCalledWith({ where: { ctr_id: 30 } });
    expect(prismaMock.tbl_contracts.update).not.toHaveBeenCalled();

    await expect(service.saveContract({ ctrId: 30, input: input({ term: 8 }), useBy: 9, ctx })).resolves.toMatchObject({ ctrId: 30 });
  });
});

describe("deleteContract", () => {
  it("elimina de forma lógica, con evidencia, sin tocar conceptos ni historial", async () => {
    state.contract = { ...storedContract };
    await expect(service.deleteContract({ ctrId: 30, useBy: 9, ctx })).resolves.toEqual({ message: "Contrato eliminado correctamente" });
    expect(prismaMock.tbl_contracts.update.mock.calls[0][0]).toMatchObject({
      where: { ctr_id: 30 },
      data: { sta_id: 3, ctr_delete_by: 9, ctr_delete_at: expect.any(Date) },
    });
    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_contracts/)]);
    expect(auditRows()[0]).toMatchObject({ aud_entity: "CONTRATO", aud_operation: "ELIMINAR" });
  });

  it("con facturas, de cualquier estado, no se elimina (409, DEC-042)", async () => {
    state.contract = { ...storedContract };
    prismaMock.tbl_invoices.count.mockResolvedValue(2);
    await expect(service.deleteContract({ ctrId: 30, useBy: 9, ctx })).rejects.toMatchObject({
      statusCode: 409,
      message: "No se puede eliminar el contrato: tiene 2 factura(s) registrada(s).",
    });
    expect(prismaMock.tbl_invoices.count).toHaveBeenCalledWith({ where: { ctr_id: 30 } });
    expect(prismaMock.tbl_contracts.update).not.toHaveBeenCalled();
  });
});

describe("paginationContracts", () => {
  it("filtra por estado y obra, cuenta por estado sin el filtro de estado y calcula el valor vigente", async () => {
    prismaMock.tbl_contracts.count.mockResolvedValue(1);
    prismaMock.tbl_contracts.findMany.mockResolvedValue([
      {
        ctr_id: 30,
        wrk_id: 8,
        ctr_number: "C-001",
        ctr_name: "Acero",
        ctr_state: "IN_PROGRESS",
        ctr_start_date: new Date("2026-01-31T00:00:00Z"),
        ctr_end_date: new Date("2026-07-31T00:00:00Z"),
        sta_id: 1,
        tbl_contract_concepts: [
          {
            ccp_type: "INITIAL",
            ccp_direct_cost: "1000.00",
            ccp_admin_pct: "0",
            ccp_contingency_pct: "0",
            ccp_profit_pct: "0",
            ccp_vat_pct: "19",
            ccp_advance_pct: "15",
            ccp_retention_pct: "0",
            sta_id: 1,
          },
        ],
      },
    ]);
    prismaMock.tbl_contracts.groupBy.mockResolvedValue([{ ctr_state: "IN_PROGRESS", _count: { _all: 4 } }]);

    const page = await service.paginationContracts({ state: "IN_PROGRESS", wrkId: 8, rows: 10, first: 0, sortField: "drop table", sortOrder: 1 });

    expect(prismaMock.tbl_contracts.findMany.mock.calls[0][0]).toMatchObject({
      where: { sta_id: { not: 3 }, wrk_id: 8, ctr_state: "IN_PROGRESS" },
      orderBy: { ctr_update_at: "asc" },
    });
    expect(prismaMock.tbl_contracts.groupBy.mock.calls[0][0].where).toEqual({ sta_id: { not: 3 }, wrk_id: 8 });
    expect(page.statusCounts).toEqual({ IN_PROGRESS: 4 });
    expect(page.results[0]).toMatchObject({ ctrId: 30, currentValue: "1190.00", stateName: "En ejecución", endDate: "2026-07-31" });
  });

  it("filtra por tipo de contrato, también en los conteos, y ordena por el nombre del tipo", async () => {
    prismaMock.tbl_contracts.count.mockResolvedValue(0);
    prismaMock.tbl_contracts.findMany.mockResolvedValue([]);
    prismaMock.tbl_contracts.groupBy.mockResolvedValue([]);

    await service.paginationContracts({ cttId: "4", rows: 10, first: 0, sortField: "contractType", sortOrder: -1 });

    expect(prismaMock.tbl_contracts.findMany.mock.calls[0][0]).toMatchObject({
      where: { sta_id: { not: 3 }, ctt_id: 4 },
      orderBy: { tbl_contract_types: { ctt_name: "desc" } },
    });
    expect(prismaMock.tbl_contracts.groupBy.mock.calls[0][0].where).toEqual({ sta_id: { not: 3 }, ctt_id: 4 });
  });
});

describe("campos configurables del tipo de contrato (DEC-037)", () => {
  it("al crear, aplica la configuración del tipo y guarda la versión con que se capturó", async () => {
    state.typeFields = typeFieldRows({ ADVANCE_PCT: { ctf_visible: false } });
    await service.saveContract({ ctrId: 0, input: input({ initialConcept: { ...input().initialConcept, advancePct: "40" } }), useBy: 9, ctx, idempotencyKey: KEY });

    expect(prismaMock.tbl_contracts.create.mock.calls[0][0].data.ctr_config_version).toBe(3);
    // Aplica y no se muestra: el valor por defecto, no el que mandó el cliente.
    expect(prismaMock.tbl_contract_concepts.create.mock.calls[0][0].data.ccp_advance_pct.toFixed(2)).toBe("15.00");
  });

  it("rechaza un valor en un campo que no aplica para el tipo", async () => {
    state.typeFields = typeFieldRows({ VAT_PCT: { ctf_applies: null } });
    await expect(service.saveContract({ ctrId: 0, input: input(), useBy: 9, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "IVA: no aplica para este tipo de contrato.",
    });
    expect(prismaMock.tbl_contracts.create).not.toHaveBeenCalled();
  });

  it("si la etapa no aplica, el contrato se crea sin etapa y no se valida contra la obra", async () => {
    state.typeFields = typeFieldRows({ STAGE: { ctf_applies: null } });
    await service.saveContract({ ctrId: 0, input: input({ wksId: "" }), useBy: 9, ctx, idempotencyKey: KEY });

    expect(prismaMock.tbl_contracts.create.mock.calls[0][0].data.wks_id).toBeNull();
    expect(prismaMock.tbl_work_stages.findUnique).not.toHaveBeenCalled();
  });

  it("exige los campos obligatorios del tipo", async () => {
    await expect(service.saveContract({ ctrId: 0, input: input({ wksId: null }), useBy: 9, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "Etapa: es obligatorio para este tipo de contrato.",
    });
  });

  it("al editar, conserva el valor heredado de un campo que dejó de aplicar", async () => {
    state.contract = { ...storedContract, ctr_observation: "Pactado antes" };
    state.typeFields = typeFieldRows({ OBSERVATION: { ctf_applies: null } });

    await service.saveContract({ ctrId: 30, input: input({ observation: "" }), useBy: 9, ctx });
    expect(prismaMock.tbl_contracts.update.mock.calls[0][0].data.ctr_observation).toBe("Pactado antes");

    await expect(service.saveContract({ ctrId: 30, input: input({ observation: "Otra cosa" }), useBy: 9, ctx })).rejects.toMatchObject({
      statusCode: 400,
    });
  });

  it("al editar, la versión solo cambia si cambia el tipo", async () => {
    state.contract = { ...storedContract };
    await service.saveContract({ ctrId: 30, input: input(), useBy: 9, ctx });
    expect(prismaMock.tbl_contracts.update.mock.calls[0][0].data).not.toHaveProperty("ctr_config_version");

    await service.saveContract({ ctrId: 30, input: input({ cttId: 5 }), useBy: 9, ctx });
    expect(prismaMock.tbl_contracts.update.mock.calls[1][0].data.ctr_config_version).toBe(3);
  });

  it("getContractFields entrega los descriptores vigentes del tipo, o los de una versión", async () => {
    const current = await service.getContractFields({ cttId: 2 });
    expect(current).toMatchObject({ cttId: 2, configVersion: 3, currentVersion: 3 });
    expect(current.fields.find((f) => f.key === "STAGE")).toMatchObject({ applies: true, visible: true, required: true, label: "Etapa" });

    const old = await service.getContractFields({ cttId: 2, version: 1 });
    expect(old).toMatchObject({ configVersion: 1, currentVersion: 3 });
    expect(old.fields.every((f) => !f.applies)).toBe(true);
  });

  it("getContractFields: 404 si el tipo está eliminado", async () => {
    prismaMock.tbl_contract_types.findUnique.mockResolvedValueOnce({ ctt_id: 2, ctt_config_version: 3, sta_id: 3 });
    await expect(service.getContractFields({ cttId: 2 })).rejects.toMatchObject({ statusCode: 404 });
  });
});

describe("previewContractEndDate (FRONTEND_STANDARD, regla 9)", () => {
  it("contrato nuevo: inicio + plazo, con el último día del mes si el destino es más corto", async () => {
    await expect(service.previewContractEndDate({ startDate: "2026-01-31", term: "1", termUnit: "MES" })).resolves.toEqual({
      endDate: "2026-02-28",
    });
    expect(prismaMock.tbl_contracts.findFirst).not.toHaveBeenCalled();
  });

  it("contrato existente: suma las prórrogas vigentes de sus otrosí y sus días suspendidos, como al guardar", async () => {
    prismaMock.tbl_contracts.findFirst.mockResolvedValueOnce({
      ctr_suspended_days: 10,
      tbl_contract_concepts: [
        { ccp_type: "INITIAL", ccp_extension: null, sta_id: 1 },
        { ccp_type: "AMENDMENT", ccp_extension: 2, sta_id: 1 },
        { ccp_type: "AMENDMENT", ccp_extension: 5, sta_id: 3 },
      ],
    });

    // 2026-01-15 + (6 + 2) meses = 2026-09-15, + 10 días = 2026-09-25. El otrosí eliminado no cuenta.
    await expect(service.previewContractEndDate({ ctrId: "30", startDate: "2026-01-15", term: "6", termUnit: "MES" })).resolves.toEqual({
      endDate: "2026-09-25",
    });
    expect(prismaMock.tbl_contracts.findFirst.mock.calls[0][0].where).toEqual({ ctr_id: 30, sta_id: { not: 3 } });
  });

  it("un contrato inexistente o eliminado responde 404", async () => {
    prismaMock.tbl_contracts.findFirst.mockResolvedValueOnce(null);
    await expect(service.previewContractEndDate({ ctrId: 99, startDate: "2026-01-15", term: 6, termUnit: "MES" })).rejects.toMatchObject({
      statusCode: 404,
    });
  });
});

describe("solicitud de AIU del contrato (ADR-0026, P13; DEC-046)", () => {
  const CHANGE_AIU = 90;
  const save = (data, { ctrId = 0, granted = [] } = {}) =>
    service.saveContract({ ctrId, input: data, useBy: 9, granted: new Set(granted), ctx, idempotencyKey: ctrId ? undefined : KEY });
  const noAiuConcept = { ...input().initialConcept, adminPct: "0", contingencyPct: "0", profitPct: "0" };

  it("al crear, el valor por defecto lo da el tipo: solicita AIU si el tipo lo aplica", async () => {
    await save(input());
    expect(prismaMock.tbl_contracts.create.mock.calls[0][0].data.ctr_aiu_requested).toBe(true);

    prismaMock.tbl_contracts.create.mockClear();
    state.typeFields = typeFieldRows({ ADMIN_PCT: { ctf_applies: null }, CONTINGENCY_PCT: { ctf_applies: null }, PROFIT_PCT: { ctf_applies: null } });
    await save(input({ initialConcept: noAiuConcept }));
    expect(prismaMock.tbl_contracts.create.mock.calls[0][0].data.ctr_aiu_requested).toBe(false);
  });

  it("apagarlo al crear exige el permiso (403); con él, A, I y U no se aceptan en el valor inicial", async () => {
    await expect(save(input({ aiuRequested: false }))).rejects.toMatchObject({ statusCode: 403 });
    await expect(save(input({ aiuRequested: false }), { granted: [CHANGE_AIU] })).rejects.toMatchObject({
      statusCode: 400,
      message: "Administración: el contrato no solicita AIU.",
    });
    expect(prismaMock.tbl_contracts.create).not.toHaveBeenCalled();

    await save(input({ aiuRequested: false, initialConcept: noAiuConcept }), { granted: [CHANGE_AIU] });
    expect(prismaMock.tbl_contracts.create.mock.calls[0][0].data.ctr_aiu_requested).toBe(false);
    expect(auditRows().find((r) => r.aud_field === "ctr_aiu_requested")).toMatchObject({ aud_new_value: "false" });
  });

  it("no se solicita si el tipo no aplica AIU (400)", async () => {
    state.typeFields = typeFieldRows({ ADMIN_PCT: { ctf_applies: null }, CONTINGENCY_PCT: { ctf_applies: null }, PROFIT_PCT: { ctf_applies: null } });
    await expect(save(input({ aiuRequested: true, initialConcept: noAiuConcept }), { granted: [CHANGE_AIU] })).rejects.toMatchObject({
      statusCode: 400,
      message: "El tipo de contrato no aplica AIU: el contrato no puede solicitarlo.",
    });
  });

  it("al editar, sin cambiarlo no pide permiso; cambiarlo sí, y queda en la bitácora", async () => {
    state.contract = { ...storedContract };
    await save(input(), { ctrId: 30 });
    await save(input({ aiuRequested: true }), { ctrId: 30 });
    expect(prismaMock.tbl_contracts.update.mock.calls.every((c) => c[0].data.ctr_aiu_requested === true)).toBe(true);

    await expect(save(input({ aiuRequested: false }), { ctrId: 30 })).rejects.toMatchObject({ statusCode: 403 });
    prismaMock.tbl_audit_log.createMany.mockClear();
    await save(input({ aiuRequested: false }), { ctrId: 30, granted: [CHANGE_AIU] });
    expect(prismaMock.tbl_contracts.update.mock.calls.at(-1)[0].data.ctr_aiu_requested).toBe(false);
    expect(auditRows().find((r) => r.aud_field === "ctr_aiu_requested")).toMatchObject({ aud_old_value: "true", aud_new_value: "false" });
  });

  it("no se apaga si algún concepto vigente ya pactó A, I o U (409)", async () => {
    state.contract = { ...storedContract };
    prismaMock.tbl_contract_concepts.count.mockResolvedValueOnce(1);
    await expect(save(input({ aiuRequested: false }), { ctrId: 30, granted: [CHANGE_AIU] })).rejects.toMatchObject({ statusCode: 409 });
    expect(prismaMock.tbl_contract_concepts.count.mock.calls[0][0].where).toMatchObject({ ctr_id: 30, sta_id: { not: 3 } });
    expect(prismaMock.tbl_contracts.update).not.toHaveBeenCalled();
  });

  it("getContractFields con el contrato: sin AIU, A, I y U no aplican", async () => {
    prismaMock.tbl_contracts.findUnique.mockResolvedValueOnce({ ctr_aiu_requested: false });
    const result = await service.getContractFields({ cttId: 2, ctrId: 30 });
    expect(result).toMatchObject({ typeAppliesAiu: true, aiuRequested: false });
    expect(result.fields.filter((f) => ["ADMIN_PCT", "CONTINGENCY_PCT", "PROFIT_PCT"].includes(f.key)).every((f) => !f.applies && !f.visible)).toBe(true);
    expect(result.fields.find((f) => f.key === "VAT_PCT").applies).toBe(true);
  });
});

// ─── Alcance por obra (DEC-047) ──────────────────────────────────────────────
// Obra 8 = la del registro; obra 9 = otra. Fuera del alcance, 404 sin tocar nada.
const OWN = Object.freeze({ all: false, wrkId: 8 });
const OTHER = Object.freeze({ all: false, wrkId: 9 });
const NONE = Object.freeze({ all: false, wrkId: null });

describe("alcance por obra (DEC-047)", () => {
  it("el listado filtra por la obra del alcance", async () => {
    prismaMock.tbl_contracts.findMany.mockResolvedValue([]);
    prismaMock.tbl_contracts.count.mockResolvedValue(0);
    prismaMock.tbl_contracts.groupBy.mockResolvedValue([]);
    await service.paginationContracts({ scope: OWN });
    expect(prismaMock.tbl_contracts.findMany.mock.calls.at(-1)[0].where.wrk_id).toEqual({ in: [8] });
  });

  it("un contrato de otra obra no se lee, no se edita ni se elimina (404)", async () => {
    state.contract = { ...storedContract };
    await expect(service.getContract({ ctrId: 30, scope: OTHER })).rejects.toMatchObject({ statusCode: 404, message: "No se encontró el contrato." });
    await expect(service.saveContract({ ctrId: 30, input: input(), useBy: 9, scope: OTHER, ctx })).rejects.toMatchObject({ statusCode: 404 });
    await expect(service.deleteContract({ ctrId: 30, useBy: 9, scope: OTHER, ctx })).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("no se crea un contrato en una obra fuera del alcance (404)", async () => {
    await expect(service.saveContract({ ctrId: 0, input: input(), useBy: 9, scope: OTHER, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 404,
      message: "No se encontró la obra.",
    });
    await expect(service.getContractFormOptions({ wrkId: 8, scope: OTHER })).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.tbl_contracts.create).not.toHaveBeenCalled();
  });

  it("en su obra, sí", async () => {
    state.contract = { ...storedContract };
    await expect(service.saveContract({ ctrId: 0, input: input(), useBy: 9, scope: OWN, ctx, idempotencyKey: KEY })).resolves.toMatchObject({ ctrId: 30 });
  });
});
