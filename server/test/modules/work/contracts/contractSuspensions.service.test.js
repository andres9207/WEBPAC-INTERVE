import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";
import { CONTRACT_FIELDS_CATALOG, typeFieldRows } from "../../../helpers/contractFields.fixtures.js";

// Suspensión de contratos (ADR-0017, DEC-039): suspender solo desde ejecución,
// con motivo de suspensión y una sola abierta; el otrosí que reanuda el
// contrato cierra la suspensión, suma los días y recalcula la fecha fin, con
// el permiso de levantar.

const state = { contract: null, open: null, reason: null, concepts: [], typeFields: [], replay: null };

const prismaMock = {
  tbl_contracts: { findUnique: jest.fn(async () => state.contract), update: jest.fn() },
  tbl_reasons: { findUnique: jest.fn(async () => state.reason) },
  tbl_contract_suspensions: {
    findFirst: jest.fn(async () => state.open),
    create: jest.fn(async () => ({ csp_id: 50 })),
    update: jest.fn(),
  },
  tbl_contract_status_history: { create: jest.fn(), findUnique: jest.fn(async () => state.replay) },
  tbl_contract_concepts: {
    findUnique: jest.fn(async () => null),
    findMany: jest.fn(async () => state.concepts),
    create: jest.fn(async ({ data }) => ({ ccp_id: 310, ccp_number: data.ccp_number })),
  },
  tbl_contract_fields: { findMany: jest.fn(async () => CONTRACT_FIELDS_CATALOG) },
  tbl_contract_type_fields: { findMany: jest.fn(async () => state.typeFields) },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const suspensions = await import("../../../../src/modules/work/contracts/contractSuspensions.service.js");
const concepts = await import("../../../../src/modules/work/contracts/contractConcepts.service.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const ctx = { useId: 9, ip: "1.1.1.1" };
const CAN_AMEND = 72;
const CAN_LIFT = 77;
const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);
const lockedTables = () => prismaMock.$queryRaw.mock.calls.map((call) => call.slice(1).map((v) => v?.strings?.join("") ?? "").join(" "));

const contract = (overrides = {}) => ({
  ctr_id: 30,
  ctt_id: 2,
  ctr_start_date: new Date("2026-01-31T00:00:00Z"),
  ctr_term: 6,
  ctr_term_unit: "MES",
  ctr_end_date: new Date("2026-07-31T00:00:00Z"),
  ctr_suspended_days: 0,
  ctr_state: "IN_PROGRESS",
  sta_id: 1,
  ...overrides,
});

const request = (overrides = {}) => ({
  reaId: 4,
  suspensionDate: "2026-05-01",
  liftCondition: " Llegada del material ",
  observation: "",
  requiresReport: true,
  ...overrides,
});

const suspend = (input = request()) => suspensions.suspendContract({ ctrId: 30, input, useBy: 9, ctx, idempotencyKey: KEY });

const initial = {
  ccp_id: 300,
  ctr_id: 30,
  ccp_type: "INITIAL",
  ccp_number: null,
  ccp_start_date: new Date("2026-01-31T00:00:00Z"),
  ccp_direct_cost: "1000.00",
  ccp_admin_pct: "0.00",
  ccp_contingency_pct: "0.00",
  ccp_profit_pct: "0.00",
  ccp_vat_pct: "19.00",
  ccp_advance_pct: "15.00",
  ccp_retention_pct: "0.00",
  ccp_extension: null,
  sta_id: 1,
};

const amend = ({ liftDate = "2026-05-11", extension = "", granted = [CAN_AMEND, CAN_LIFT] } = {}) =>
  concepts.createAmendment({
    ctrId: 30,
    input: { startDate: "2026-05-11", directCost: "500", vatPct: "19", extension, liftDate },
    useBy: 9,
    granted: new Set(granted),
    ctx,
    idempotencyKey: KEY,
  });

beforeEach(() => {
  jest.clearAllMocks();
  state.contract = contract();
  state.open = null;
  state.replay = null;
  state.reason = { rea_scope: "SUSPENSION", rea_name: "Falta de material", sta_id: 1 };
  state.typeFields = typeFieldRows();
  state.concepts = [initial];
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
});

describe("suspendContract", () => {
  it("suspende un contrato en ejecución: guarda la suspensión con el estado previo, pasa a suspendido e historial con la clave", async () => {
    await expect(suspend()).resolves.toEqual({ message: "Contrato suspendido correctamente", ctrId: 30 });

    const { data } = prismaMock.tbl_contract_suspensions.create.mock.calls[0][0];
    expect(data).toMatchObject({
      ctr_id: 30,
      rea_id: 4,
      csp_previous_state: "IN_PROGRESS",
      csp_lift_condition: "Llegada del material",
      csp_observation: null,
      csp_requires_report: true,
      csp_create_by: 9,
    });
    expect(data.csp_suspension_date.toISOString()).toBe("2026-05-01T00:00:00.000Z");
    expect(prismaMock.tbl_contracts.update.mock.calls[0][0].data).toEqual({ ctr_state: "SUSPENDED", ctr_update_by: 9 });
    expect(prismaMock.tbl_contract_status_history.create.mock.calls[0][0].data).toMatchObject({
      csh_from_state: "IN_PROGRESS",
      csh_to_state: "SUSPENDED",
      csh_origin: "MANUAL",
      csh_observation: "Suspendido: Falta de material.",
      csh_idempotency_key: KEY,
    });
    const rows = auditRows();
    expect(rows.find((r) => r.aud_entity === "SUSPENSION_CONTRATO" && r.aud_field === "csp_suspension_date")).toMatchObject({ aud_new_value: "2026-05-01" });
    expect(rows.find((r) => r.aud_entity === "CONTRATO")).toMatchObject({ aud_field: "ctr_state", aud_old_value: "IN_PROGRESS", aud_new_value: "SUSPENDED" });
  });

  it("bloquea el contrato y después el motivo, antes de leer", async () => {
    await suspend();
    const tables = lockedTables();
    expect(tables[0]).toContain("tbl_contracts");
    expect(tables[1]).toContain("tbl_reasons");
    expect(prismaMock.tbl_contracts.findUnique.mock.invocationCallOrder[0]).toBeGreaterThan(prismaMock.$queryRaw.mock.invocationCallOrder[1]);
  });

  it.each(["SUSPENDED", "IN_LIQUIDATION", "LIQUIDATED"])("desde %s responde 409 y no escribe", async (ctrState) => {
    state.contract = contract({ ctr_state: ctrState });
    await expect(suspend()).rejects.toMatchObject({ statusCode: 409 });
    expect(prismaMock.tbl_contract_suspensions.create).not.toHaveBeenCalled();
    expect(prismaMock.tbl_contracts.update).not.toHaveBeenCalled();
  });

  it("una segunda suspensión abierta responde 409 aunque el estado no lo refleje", async () => {
    state.open = { csp_id: 49, csp_suspension_date: new Date("2026-04-01"), csp_previous_state: "IN_PROGRESS" };
    await expect(suspend()).rejects.toMatchObject({ statusCode: 409, message: "El contrato ya tiene una suspensión abierta." });
    expect(prismaMock.tbl_contract_suspensions.create).not.toHaveBeenCalled();
  });

  it("rechaza un motivo inactivo o de otro acto", async () => {
    state.reason = { rea_scope: "SUSPENSION", rea_name: "x", sta_id: 2 };
    await expect(suspend()).rejects.toMatchObject({ statusCode: 400, message: "El motivo seleccionado está inactivo." });
    state.reason = { rea_scope: "OTRO", rea_name: "x", sta_id: 1 };
    await expect(suspend()).rejects.toMatchObject({ statusCode: 400, message: "El motivo seleccionado no es de suspensión." });
    expect(prismaMock.tbl_contract_suspensions.create).not.toHaveBeenCalled();
  });

  it("la fecha no puede ser futura ni anterior al inicio del contrato", async () => {
    await expect(suspend(request({ suspensionDate: "2099-01-01" }))).rejects.toMatchObject({ statusCode: 400, message: "La fecha de suspensión no puede ser futura." });
    await expect(suspend(request({ suspensionDate: "2026-01-30" }))).rejects.toMatchObject({
      statusCode: 400,
      message: "La fecha de suspensión no puede ser anterior al inicio del contrato (2026-01-31).",
    });
    expect(prismaMock.tbl_contract_suspensions.create).not.toHaveBeenCalled();
  });

  it("la condición de levantamiento es obligatoria", async () => {
    await expect(suspend(request({ liftCondition: "  " }))).rejects.toMatchObject({ statusCode: 400 });
  });

  it("un reintento con la misma clave devuelve el resultado sin suspender otra vez", async () => {
    await suspend();
    const { csh_idempotency_hash: hash } = prismaMock.tbl_contract_status_history.create.mock.calls[0][0].data;
    jest.clearAllMocks();
    state.replay = { ctr_id: 30, csh_idempotency_hash: hash, csh_create_by: 9 };

    await expect(suspend()).resolves.toEqual({ message: "Contrato suspendido correctamente", ctrId: 30 });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });
});

describe("createAmendment sobre un contrato suspendido (DEC-039)", () => {
  beforeEach(() => {
    state.contract = contract({ ctr_state: "SUSPENDED", ctr_suspended_days: 3 });
    state.open = { csp_id: 50, csp_suspension_date: new Date("2026-05-01T00:00:00Z"), csp_previous_state: "IN_PROGRESS" };
  });

  it("cierra la suspensión, suma los días, vuelve al estado previo y recalcula la fecha fin", async () => {
    await expect(amend()).resolves.toMatchObject({ message: "Otrosí N.º 1 registrado correctamente. El contrato se reanudó.", number: 1 });

    const closing = prismaMock.tbl_contract_suspensions.update.mock.calls[0][0];
    expect(closing.where).toEqual({ csp_id: 50 });
    expect(closing.data).toMatchObject({ csp_days: 10, ccp_id: 310, csp_update_by: 9 });
    expect(closing.data.csp_lift_date.toISOString()).toBe("2026-05-11T00:00:00.000Z");

    const updates = prismaMock.tbl_contracts.update.mock.calls.map((c) => c[0].data);
    expect(updates[0]).toEqual({ ctr_state: "IN_PROGRESS", ctr_suspended_days: 13, ctr_update_by: 9 });
    // Inicio 2026-01-31 + 6 meses = 2026-07-31, + 13 días suspendidos.
    expect(updates[1].ctr_end_date.toISOString()).toBe("2026-08-13T00:00:00.000Z");

    expect(prismaMock.tbl_contract_status_history.create.mock.calls[0][0].data).toMatchObject({
      csh_from_state: "SUSPENDED",
      csh_to_state: "IN_PROGRESS",
      csh_observation: "Reanudado con otrosí. 10 día(s) suspendido(s).",
    });
    const fields = auditRows().filter((r) => r.aud_entity === "CONTRATO").map((r) => [r.aud_field, r.aud_old_value, r.aud_new_value]);
    expect(fields).toEqual([
      ["ctr_state", "SUSPENDED", "IN_PROGRESS"],
      ["ctr_suspended_days", "3", "13"],
      ["ctr_end_date", "2026-07-31", "2026-08-13"],
    ]);
  });

  it("la prórroga del otrosí y los días suspendidos se suman", async () => {
    prismaMock.tbl_contract_concepts.findMany
      .mockResolvedValueOnce(state.concepts)
      .mockResolvedValueOnce([...state.concepts, { ...initial, ccp_type: "AMENDMENT", ccp_number: 1, ccp_extension: 1 }]);

    await amend({ extension: 1 });

    const end = prismaMock.tbl_contracts.update.mock.calls[1][0].data.ctr_end_date;
    // 2026-01-31 + 7 meses = 2026-08-31, + 13 días.
    expect(end.toISOString()).toBe("2026-09-13T00:00:00.000Z");
  });

  it("sin el permiso de levantar responde 403 y no deja nada escrito", async () => {
    await expect(amend({ granted: [CAN_AMEND] })).rejects.toMatchObject({ statusCode: 403 });
    expect(prismaMock.tbl_contract_suspensions.update).not.toHaveBeenCalled();
    expect(prismaMock.tbl_contracts.update).not.toHaveBeenCalled();
  });

  it("exige la fecha de reanudación, no futura ni anterior a la suspensión", async () => {
    await expect(amend({ liftDate: null })).rejects.toMatchObject({ statusCode: 400, message: "El contrato está suspendido: indica la fecha de reanudación." });
    await expect(amend({ liftDate: "2099-01-01" })).rejects.toMatchObject({ statusCode: 400, message: "La fecha de reanudación no puede ser futura." });
    await expect(amend({ liftDate: "2026-04-30" })).rejects.toMatchObject({
      statusCode: 400,
      message: "La fecha de reanudación no puede ser anterior a la suspensión (2026-05-01).",
    });
    expect(prismaMock.tbl_contract_suspensions.update).not.toHaveBeenCalled();
  });

  it("en un contrato en ejecución, la fecha de reanudación se ignora y no se toca ninguna suspensión", async () => {
    state.contract = contract();
    state.open = null;
    await expect(amend()).resolves.toMatchObject({ message: "Otrosí N.º 1 registrado correctamente" });
    expect(prismaMock.tbl_contract_suspensions.findFirst).not.toHaveBeenCalled();
    expect(prismaMock.tbl_contract_status_history.create).not.toHaveBeenCalled();
  });
});
