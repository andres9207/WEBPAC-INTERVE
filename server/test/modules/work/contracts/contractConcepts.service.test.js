import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";
import { CONTRACT_FIELDS_CATALOG, typeFieldRows } from "../../../helpers/contractFields.fixtures.js";

// Conceptos contractuales (ADR-0016, DEC-036): numeración del otrosí bajo
// bloqueo, prórroga y fecha fin, otrosí de liquidación con su transición, y
// modificación según el estado.

const state = { contract: null, concepts: [], typeFields: [], approvedInvoices: 0 };

const prismaMock = {
  tbl_contracts: { findUnique: jest.fn(async () => state.contract), update: jest.fn() },
  tbl_contract_concepts: {
    findUnique: jest.fn(async ({ where }) => (where.ccp_idempotency_key ? null : { ctr_id: 30 })),
    findMany: jest.fn(async () => state.concepts),
    create: jest.fn(),
    update: jest.fn(),
  },
  tbl_contract_status_history: { create: jest.fn() },
  tbl_invoices: { count: jest.fn(async () => state.approvedInvoices) },
  tbl_contract_fields: { findMany: jest.fn(async () => CONTRACT_FIELDS_CATALOG) },
  tbl_contract_type_fields: { findMany: jest.fn(async () => state.typeFields) },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const service = await import("../../../../src/modules/work/contracts/contractConcepts.service.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const ctx = { useId: 9, ip: "1.1.1.1" };
const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);

const contract = (overrides = {}) => ({
  ctr_id: 30,
  wrk_id: 8,
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

const concept = (overrides = {}) => ({
  ccp_id: 300,
  ctr_id: 30,
  ccp_type: "INITIAL",
  ccp_number: null,
  ccp_start_date: new Date("2026-01-31T00:00:00Z"),
  ccp_description: null,
  ccp_direct_cost: "1000.00",
  ccp_admin_pct: "0.00",
  ccp_contingency_pct: "0.00",
  ccp_profit_pct: "0.00",
  ccp_vat_pct: "19.00",
  ccp_advance_pct: "15.00",
  ccp_retention_pct: "0.00",
  ccp_extension: null,
  sta_id: 1,
  ...overrides,
});

const act = (overrides = {}) => ({
  startDate: "2026-03-01",
  description: "Mayor cantidad de acero",
  directCost: "500",
  adminPct: "0",
  contingencyPct: "0",
  profitPct: "0",
  vatPct: "19",
  advancePct: "10",
  retentionPct: "5",
  ...overrides,
});

beforeEach(() => {
  jest.clearAllMocks();
  state.contract = contract();
  state.typeFields = typeFieldRows();
  state.concepts = [concept(), concept({ ccp_id: 301, ccp_type: "AMENDMENT", ccp_number: 1, ccp_start_date: new Date("2026-02-15T00:00:00Z") })];
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  prismaMock.tbl_contract_concepts.create.mockImplementation(async ({ data }) => ({ ccp_id: 310, ccp_number: data.ccp_number ?? null }));
});

describe("createAmendment", () => {
  it("numera con el máximo más uno bajo el bloqueo del contrato y no acepta número del cliente", async () => {
    await expect(
      service.createAmendment({ ctrId: 30, input: act({ number: 99, extension: "" }), useBy: 9, ctx, idempotencyKey: KEY })
    ).resolves.toEqual({ message: "Otrosí N.º 2 registrado correctamente", ccpId: 310, number: 2 });

    const { data } = prismaMock.tbl_contract_concepts.create.mock.calls[0][0];
    expect(data).toMatchObject({ ctr_id: 30, ccp_type: "AMENDMENT", ccp_number: 2, ccp_extension: null, ccp_idempotency_key: KEY });
    expect(data.ccp_advance_pct.toFixed(2)).toBe("10.00");
    expect(prismaMock.$queryRaw).toHaveBeenCalledTimes(1);
    expect(prismaMock.tbl_contract_concepts.findMany.mock.invocationCallOrder[0]).toBeGreaterThan(prismaMock.$queryRaw.mock.invocationCallOrder[0]);
  });

  it("un número no se reutiliza aunque el otrosí esté anulado", async () => {
    state.concepts.push(concept({ ccp_id: 302, ccp_type: "AMENDMENT", ccp_number: 4, sta_id: 3 }));
    await expect(service.createAmendment({ ctrId: 30, input: act(), useBy: 9, ctx, idempotencyKey: KEY })).resolves.toMatchObject({ number: 5 });
  });

  it("la prórroga extiende la fecha fin en la misma transacción y queda en la bitácora", async () => {
    prismaMock.tbl_contract_concepts.findMany
      .mockResolvedValueOnce(state.concepts)
      .mockResolvedValueOnce([...state.concepts, concept({ ccp_type: "AMENDMENT", ccp_number: 2, ccp_extension: 2 })]);

    await service.createAmendment({ ctrId: 30, input: act({ extension: 2 }), useBy: 9, ctx, idempotencyKey: KEY });

    const { data } = prismaMock.tbl_contracts.update.mock.calls[0][0];
    expect(data.ctr_end_date.toISOString()).toBe("2026-09-30T00:00:00.000Z");
    const rows = auditRows();
    expect(rows.find((r) => r.aud_field === "ctr_end_date")).toMatchObject({ aud_entity: "CONTRATO", aud_old_value: "2026-07-31", aud_new_value: "2026-09-30" });
    // Valor vigente antes y después del acto (ADR-0016, "Auditoría"): 2 × 1190 → + 595.
    expect(rows.find((r) => r.aud_field === "valor_vigente_contrato")).toMatchObject({ aud_old_value: "2380.00", aud_new_value: "2975.00" });
  });

  it("no admite una fecha anterior a la del último concepto", async () => {
    await expect(
      service.createAmendment({ ctrId: 30, input: act({ startDate: "2026-02-01" }), useBy: 9, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 400 });
    expect(prismaMock.tbl_contract_concepts.create).not.toHaveBeenCalled();
  });

  it("no se registra en un contrato en liquidación (409)", async () => {
    state.contract = contract({ ctr_state: "IN_LIQUIDATION" });
    await expect(service.createAmendment({ ctrId: 30, input: act(), useBy: 9, ctx, idempotencyKey: KEY })).rejects.toMatchObject({ statusCode: 409 });
  });
});

describe("createLiquidation", () => {
  it("crea el otrosí sin número y pasa el contrato a liquidación con su historial", async () => {
    await expect(service.createLiquidation({ ctrId: 30, input: act(), useBy: 9, ctx, idempotencyKey: KEY })).resolves.toMatchObject({ ccpId: 310 });

    const { data } = prismaMock.tbl_contract_concepts.create.mock.calls[0][0];
    expect(data).toMatchObject({ ccp_type: "LIQUIDATION" });
    expect(data).not.toHaveProperty("ccp_number");
    expect(prismaMock.tbl_contracts.update.mock.calls[0][0].data).toEqual({ ctr_state: "IN_LIQUIDATION", ctr_update_by: 9 });
    expect(prismaMock.tbl_contract_status_history.create.mock.calls[0][0].data).toMatchObject({
      csh_from_state: "IN_PROGRESS",
      csh_to_state: "IN_LIQUIDATION",
      csh_origin: "AUTOMATIC",
    });
    expect(auditRows().find((r) => r.aud_field === "ctr_state")).toMatchObject({ aud_old_value: "IN_PROGRESS", aud_new_value: "IN_LIQUIDATION" });
  });

  it("solo uno por contrato (409)", async () => {
    state.concepts.push(concept({ ccp_id: 305, ccp_type: "LIQUIDATION" }));
    await expect(service.createLiquidation({ ctrId: 30, input: act(), useBy: 9, ctx, idempotencyKey: KEY })).rejects.toMatchObject({ statusCode: 409 });
  });

  it("no desde un contrato suspendido o liquidado (409)", async () => {
    state.contract = contract({ ctr_state: "SUSPENDED" });
    await expect(service.createLiquidation({ ctrId: 30, input: act(), useBy: 9, ctx, idempotencyKey: KEY })).rejects.toMatchObject({ statusCode: 409 });
    expect(prismaMock.tbl_contract_status_history.create).not.toHaveBeenCalled();
  });
});

describe("updateConcept", () => {
  beforeEach(() => {
    state.approvedInvoices = 0;
  });

  it("con una factura aprobada no cambian costo ni porcentajes (409, DOM-07); fecha y prórroga sí", async () => {
    state.approvedInvoices = 1;
    await expect(service.updateConcept({ ccpId: 300, input: act({ directCost: "2000" }), useBy: 9, ctx })).rejects.toMatchObject({
      statusCode: 409,
      message: expect.stringMatching(/facturas aprobadas/),
    });
    expect(prismaMock.tbl_invoices.count).toHaveBeenCalledWith({ where: { ctr_id: 30, inv_approval_date: { not: null } } });
    expect(prismaMock.tbl_contract_concepts.update).not.toHaveBeenCalled();

    // Mismos valores económicos que el concepto guardado: solo cambian fecha y prórroga.
    const same = { directCost: "1000", advancePct: "15", retentionPct: "0" };
    await expect(service.updateConcept({ ccpId: 301, input: act({ startDate: "2026-02-15", extension: 1, ...same }), useBy: 9, ctx })).resolves.toMatchObject({
      ccpId: 301,
    });
  });

  it("bloquea contrato y concepto; la fecha del valor inicial no cambia", async () => {
    await expect(service.updateConcept({ ccpId: 300, input: act({ startDate: "2025-01-01", directCost: "2000" }), useBy: 9, ctx })).resolves.toEqual({
      message: "Concepto modificado correctamente",
      ccpId: 300,
    });
    expect(prismaMock.$queryRaw).toHaveBeenCalledTimes(2);
    const { data } = prismaMock.tbl_contract_concepts.update.mock.calls[0][0];
    expect(data.ccp_start_date.toISOString()).toBe("2026-01-31T00:00:00.000Z");
    expect(data.ccp_extension).toBeNull();
    expect(auditRows().find((r) => r.aud_field === "ccp_direct_cost")).toMatchObject({ aud_old_value: "1000.00", aud_new_value: "2000.00" });
  });

  it("cambiar la prórroga de un otrosí recalcula la fecha fin", async () => {
    prismaMock.tbl_contract_concepts.findMany
      .mockResolvedValueOnce(state.concepts)
      .mockResolvedValueOnce([concept(), concept({ ccp_type: "AMENDMENT", ccp_number: 1, ccp_extension: 1 })]);

    await service.updateConcept({ ccpId: 301, input: act({ startDate: "2026-02-15", extension: 1 }), useBy: 9, ctx });
    expect(prismaMock.tbl_contracts.update.mock.calls[0][0].data.ctr_end_date.toISOString()).toBe("2026-08-31T00:00:00.000Z");
  });

  it("en liquidación solo se modifica el otrosí de liquidación (409)", async () => {
    state.contract = contract({ ctr_state: "IN_LIQUIDATION" });
    await expect(service.updateConcept({ ccpId: 301, input: act({ startDate: "2026-02-15" }), useBy: 9, ctx })).rejects.toMatchObject({ statusCode: 409 });
    expect(prismaMock.tbl_contract_concepts.update).not.toHaveBeenCalled();
  });

  it("un concepto inexistente responde 404", async () => {
    prismaMock.tbl_contract_concepts.findUnique.mockResolvedValueOnce(null);
    await expect(service.updateConcept({ ccpId: 999, input: act(), useBy: 9, ctx })).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });
});

describe("campos configurables del tipo de contrato (DEC-037)", () => {
  it("un otrosí con valor en un campo que no aplica se rechaza", async () => {
    state.typeFields = typeFieldRows({ RETENTION_PCT: { ctf_applies: null } });
    await expect(service.createAmendment({ ctrId: 30, input: act(), useBy: 9, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "Retenido: no aplica para este tipo de contrato.",
    });
    expect(prismaMock.tbl_contract_concepts.create).not.toHaveBeenCalled();
  });

  it("la liquidación toma el valor por defecto de un campo oculto", async () => {
    state.typeFields = typeFieldRows({ VAT_PCT: { ctf_visible: false } });
    await service.createLiquidation({ ctrId: 30, input: act({ startDate: "2026-04-01", vatPct: "5" }), useBy: 9, ctx, idempotencyKey: KEY });
    expect(prismaMock.tbl_contract_concepts.create.mock.calls[0][0].data.ccp_vat_pct.toFixed(2)).toBe("19.00");
  });

  it("modificar un concepto conserva el porcentaje heredado de un campo que dejó de aplicar", async () => {
    state.typeFields = typeFieldRows({ VAT_PCT: { ctf_applies: null } });
    await service.updateConcept({ ccpId: 300, input: act({ vatPct: "" }), useBy: 9, ctx });
    expect(prismaMock.tbl_contract_concepts.update.mock.calls[0][0].data.ccp_vat_pct.toFixed(2)).toBe("19.00");
  });
});

describe("solicitud de AIU del contrato (DEC-046)", () => {
  it("si el contrato no solicita AIU, un otrosí no acepta A, I ni U", async () => {
    state.contract = contract({ ctr_aiu_requested: false });
    await expect(service.createAmendment({ ctrId: 30, input: act({ profitPct: "5" }), useBy: 9, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "Utilidad: el contrato no solicita AIU.",
    });
    await expect(service.createAmendment({ ctrId: 30, input: act(), useBy: 9, ctx, idempotencyKey: KEY })).resolves.toMatchObject({ number: 2 });
  });
});

describe("alcance por obra (DEC-047)", () => {
  it("no se registra un otrosí en un contrato de otra obra (404)", async () => {
    await expect(
      service.createAmendment({ ctrId: 30, input: act(), useBy: 9, scope: { all: false, wrkId: 9 }, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.tbl_contract_concepts.create).not.toHaveBeenCalled();
  });
});
