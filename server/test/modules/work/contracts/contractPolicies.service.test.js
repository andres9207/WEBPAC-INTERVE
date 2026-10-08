import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Pólizas (ADR-0018, ADR-0019; DEC-050): ampara un concepto de su contrato,
// copia la base del tipo al emitir, no guarda el valor asegurado, modificar
// emite una versión nueva y anular cierra la vigente con motivo.

const state = { contract: null, concept: null, type: null, insurer: null, reason: null, policy: null };

const prismaMock = {
  tbl_contracts: { findUnique: jest.fn(async () => state.contract), findFirst: jest.fn() },
  tbl_contract_concepts: { findUnique: jest.fn(async () => state.concept) },
  tbl_policy_types: { findUnique: jest.fn(async () => state.type) },
  tbl_insurers: { findUnique: jest.fn(async () => state.insurer) },
  tbl_reasons: { findUnique: jest.fn(async () => state.reason) },
  tbl_policies: {
    findUnique: jest.fn(async () => state.policy),
    findFirst: jest.fn(async () => state.taken),
    create: jest.fn(async ({ data }) => ({ pol_id: 500, ...data })),
    update: jest.fn(),
  },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const service = await import("../../../../src/modules/work/contracts/contractPolicies.service.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const ctx = { useId: 9, ip: "1.1.1.1" };

const lockedTables = () => prismaMock.$queryRaw.mock.calls.map((call) => call.slice(1).map((v) => v?.strings?.join("") ?? "").join(" "));
const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);

const input = (overrides = {}) => ({
  ccpId: 300,
  pltId: 4,
  insId: 6,
  number: "CU-001",
  percentage: "10",
  startDate: "2026-01-31",
  endDate: "2026-12-31",
  observation: null,
  ...overrides,
});

const current = (overrides = {}) => ({
  pol_id: 500,
  pol_root_id: 500,
  pol_version: 1,
  pol_is_current: true,
  ctr_id: 30,
  ccp_id: 300,
  plt_id: 4,
  ins_id: 6,
  pol_number: "CU-001",
  pol_base: "TAXABLE_BASE",
  pol_percentage: "10.00",
  pol_start_date: new Date("2026-01-31T00:00:00Z"),
  pol_end_date: new Date("2026-12-31T00:00:00Z"),
  pol_observation: null,
  ...overrides,
});

beforeEach(() => {
  jest.clearAllMocks();
  state.contract = { ctr_id: 30, ctr_state: "IN_PROGRESS", sta_id: 1 };
  state.concept = { ctr_id: 30, ccp_type: "INITIAL", sta_id: 1 };
  state.type = { plt_key: "CUMPLIMIENTO", plt_name: "Cumplimiento", plt_base: "TOTAL_VALUE", sta_id: 1 };
  state.insurer = { ins_description: "Seguros SA", sta_id: 1 };
  state.reason = { rea_scope: "POLICY_CANCEL", rea_name: "Error de registro", sta_id: 1 };
  state.policy = null;
  state.taken = null;
  prismaMock.tbl_policies.findUnique.mockImplementation(async ({ where }) => (where.pol_idempotency_key ? null : state.policy));
});

describe("createPolicy", () => {
  it("bloquea contrato → aseguradora → tipo, copia la base del tipo y fija la raíz", async () => {
    await expect(service.createPolicy({ ctrId: 30, input: input(), useBy: 9, ctx, idempotencyKey: KEY })).resolves.toEqual({
      message: "Póliza registrada correctamente",
      polId: 500,
      rootId: 500,
    });

    expect(lockedTables()).toEqual([
      expect.stringMatching(/tbl_contracts/),
      expect.stringMatching(/tbl_insurers/),
      expect.stringMatching(/tbl_policy_types/),
    ]);
    const { data } = prismaMock.tbl_policies.create.mock.calls[0][0];
    expect(data).toMatchObject({ ctr_id: 30, ccp_id: 300, pol_base: "TOTAL_VALUE", pol_version: 1, pol_is_current: true, pol_number: "CU-001" });
    expect(data.pol_percentage.toFixed(2)).toBe("10.00");
    expect(data).not.toHaveProperty("pol_insured_value");
    expect(prismaMock.tbl_policies.update).toHaveBeenCalledWith({ where: { pol_id: 500 }, data: { pol_root_id: 500 } });
    expect(auditRows().find((r) => r.aud_field === "pol_base")).toMatchObject({ aud_entity: "POLIZA", aud_new_value: "TOTAL_VALUE" });
  });

  it("la base nunca se toma del cliente", async () => {
    await service.createPolicy({ ctrId: 30, input: { ...input(), base: "VAT_ONLY" }, useBy: 9, ctx, idempotencyKey: KEY });
    expect(prismaMock.tbl_policies.create.mock.calls[0][0].data.pol_base).toBe("TOTAL_VALUE");
  });

  it("el concepto debe ser del contrato (400)", async () => {
    state.concept = { ctr_id: 31, ccp_type: "INITIAL", sta_id: 1 };
    await expect(service.createPolicy({ ctrId: 30, input: input(), useBy: 9, ctx, idempotencyKey: KEY })).rejects.toMatchObject({ statusCode: 400 });
    expect(prismaMock.tbl_policies.create).not.toHaveBeenCalled();
  });

  it("un contrato liquidado solo se consulta (409)", async () => {
    state.contract = { ...state.contract, ctr_state: "LIQUIDATED" };
    await expect(service.createPolicy({ ctrId: 30, input: input(), useBy: 9, ctx, idempotencyKey: KEY })).rejects.toMatchObject({ statusCode: 409 });
  });

  it("en un contrato suspendido sí se registra", async () => {
    state.contract = { ...state.contract, ctr_state: "SUSPENDED" };
    await expect(service.createPolicy({ ctrId: 30, input: input(), useBy: 9, ctx, idempotencyKey: KEY })).resolves.toMatchObject({ polId: 500 });
  });

  it("en liquidación solo se ampara el otrosí de liquidación (ADR-0017)", async () => {
    state.contract = { ...state.contract, ctr_state: "IN_LIQUIDATION" };
    await expect(service.createPolicy({ ctrId: 30, input: input(), useBy: 9, ctx, idempotencyKey: KEY })).rejects.toMatchObject({ statusCode: 409 });
    state.concept = { ctr_id: 30, ccp_type: "LIQUIDATION", sta_id: 1 };
    await expect(service.createPolicy({ ctrId: 30, input: input(), useBy: 9, ctx, idempotencyKey: KEY })).resolves.toMatchObject({ polId: 500 });
  });

  it("rechaza un tipo inactivo, un porcentaje fuera de rango y fechas invertidas (400)", async () => {
    state.type = { ...state.type, sta_id: 2 };
    await expect(service.createPolicy({ ctrId: 30, input: input(), useBy: 9, ctx, idempotencyKey: KEY })).rejects.toMatchObject({ statusCode: 400 });
    for (const bad of [input({ percentage: "0" }), input({ percentage: "100.01" }), input({ startDate: "2026-12-31", endDate: "2026-01-01" })]) {
      await expect(service.createPolicy({ ctrId: 30, input: bad, useBy: 9, ctx, idempotencyKey: KEY })).rejects.toMatchObject({ statusCode: 400 });
    }
  });

  it("el concepto admite una póliza vigente por tipo (409)", async () => {
    state.taken = { pol_number: "CU-000" };
    await expect(service.createPolicy({ ctrId: 30, input: input(), useBy: 9, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 409,
      message: "El concepto ya tiene una póliza vigente de ese tipo (N.º CU-000).",
    });
    expect(prismaMock.tbl_policies.findFirst.mock.calls[0][0].where).toEqual({ ccp_id: 300, plt_id: 4, pol_is_current: true });
    expect(prismaMock.tbl_policies.create).not.toHaveBeenCalled();
  });

  it("la vigencia admite fechas vacías", async () => {
    await service.createPolicy({ ctrId: 30, input: input({ startDate: null, endDate: "" }), useBy: 9, ctx, idempotencyKey: KEY });
    expect(prismaMock.tbl_policies.create.mock.calls[0][0].data).toMatchObject({ pol_start_date: null, pol_end_date: null });
  });
});

describe("createPolicyVersion", () => {
  beforeEach(() => {
    state.policy = current();
  });

  it("cierra la vigente y después crea la versión siguiente, con la base vigente del tipo", async () => {
    await expect(
      service.createPolicyVersion({ polId: 500, input: input({ percentage: "20" }), useBy: 9, ctx, idempotencyKey: KEY })
    ).resolves.toMatchObject({ message: "Póliza modificada correctamente", rootId: 500 });

    expect(lockedTables()).toEqual([
      expect.stringMatching(/tbl_contracts/),
      expect.stringMatching(/tbl_policies/),
      expect.stringMatching(/tbl_insurers/),
      expect.stringMatching(/tbl_policy_types/),
    ]);
    const close = prismaMock.tbl_policies.update.mock.calls[0][0];
    expect(close).toMatchObject({ where: { pol_id: 500 }, data: { pol_is_current: false, pol_closed_by: 9 } });
    expect(prismaMock.tbl_policies.update.mock.invocationCallOrder[0]).toBeLessThan(prismaMock.tbl_policies.create.mock.invocationCallOrder[0]);
    const { data } = prismaMock.tbl_policies.create.mock.calls[0][0];
    expect(data).toMatchObject({ pol_root_id: 500, pol_version: 2, pol_is_current: true, ctr_id: 30, ccp_id: 300, pol_base: "TOTAL_VALUE" });
    expect(auditRows().map((r) => r.aud_field)).toEqual(expect.arrayContaining(["pol_percentage", "pol_base", "pol_version"]));
  });

  it("cambiar a un tipo que el concepto ya tiene vigente responde 409; mantener el tipo no lo consulta", async () => {
    await service.createPolicyVersion({ polId: 500, input: input({ percentage: "20" }), useBy: 9, ctx, idempotencyKey: KEY });
    expect(prismaMock.tbl_policies.findFirst).not.toHaveBeenCalled();

    state.taken = { pol_number: "AN-001" };
    await expect(
      service.createPolicyVersion({ polId: 500, input: input({ pltId: 5 }), useBy: 9, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 409 });
    expect(prismaMock.tbl_policies.findFirst.mock.calls[0][0].where).toEqual({ ccp_id: 300, plt_id: 5, pol_is_current: true, pol_root_id: { not: 500 } });
  });

  it("el concepto amparado no cambia entre versiones", async () => {
    await service.createPolicyVersion({ polId: 500, input: { ...input({ percentage: "20" }), ccpId: 999 }, useBy: 9, ctx, idempotencyKey: KEY });
    expect(prismaMock.tbl_policies.create.mock.calls[0][0].data.ccp_id).toBe(300);
  });

  it("sin cambios no emite versión (400)", async () => {
    state.type = { ...state.type, plt_base: "TAXABLE_BASE" };
    await expect(
      service.createPolicyVersion({ polId: 500, input: input(), useBy: 9, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 400 });
    expect(prismaMock.tbl_policies.update).not.toHaveBeenCalled();
  });

  it("en liquidación se renueva; liquidado, solo consulta (409)", async () => {
    state.contract = { ...state.contract, ctr_state: "IN_LIQUIDATION" };
    await expect(
      service.createPolicyVersion({ polId: 500, input: input({ percentage: "20" }), useBy: 9, ctx, idempotencyKey: KEY })
    ).resolves.toMatchObject({ rootId: 500 });
    state.contract = { ...state.contract, ctr_state: "LIQUIDATED" };
    await expect(
      service.createPolicyVersion({ polId: 500, input: input({ percentage: "20" }), useBy: 9, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 409 });
  });

  it("una versión ya cerrada no se modifica (409)", async () => {
    state.policy = current({ pol_is_current: false });
    await expect(
      service.createPolicyVersion({ polId: 500, input: input({ percentage: "20" }), useBy: 9, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 409 });
  });

  it("conserva un tipo que se desactivó después de emitir la vigente", async () => {
    state.type = { ...state.type, sta_id: 2 };
    await expect(
      service.createPolicyVersion({ polId: 500, input: input({ percentage: "20" }), useBy: 9, ctx, idempotencyKey: KEY })
    ).resolves.toMatchObject({ rootId: 500 });
  });
});

describe("cancelPolicy", () => {
  beforeEach(() => {
    state.policy = current();
  });

  it("cierra la vigente con motivo y observación, bajo contrato → póliza → motivo", async () => {
    await expect(service.cancelPolicy({ polId: 500, reaId: 12, observation: "Duplicada", useBy: 9, ctx })).resolves.toMatchObject({
      message: "Póliza anulada correctamente",
    });
    expect(lockedTables()).toEqual([
      expect.stringMatching(/tbl_contracts/),
      expect.stringMatching(/tbl_policies/),
      expect.stringMatching(/tbl_reasons/),
    ]);
    expect(prismaMock.tbl_policies.update.mock.calls[0][0]).toMatchObject({
      where: { pol_id: 500 },
      data: { pol_is_current: false, rea_id: 12, pol_cancel_observation: "Duplicada", pol_closed_by: 9 },
    });
  });

  it("exige un motivo de anulación de póliza y una observación (400)", async () => {
    state.reason = { ...state.reason, rea_scope: "SUSPENSION" };
    await expect(service.cancelPolicy({ polId: 500, reaId: 12, observation: "x", useBy: 9, ctx })).rejects.toMatchObject({ statusCode: 400 });
    await expect(service.cancelPolicy({ polId: 500, reaId: 12, observation: "  ", useBy: 9, ctx })).rejects.toMatchObject({ statusCode: 400 });
  });

  it("en liquidación no se anula (409, ADR-0017)", async () => {
    state.contract = { ...state.contract, ctr_state: "IN_LIQUIDATION" };
    await expect(service.cancelPolicy({ polId: 500, reaId: 12, observation: "x", useBy: 9, ctx })).rejects.toMatchObject({ statusCode: 409 });
  });

  it("una póliza ya anulada no se vuelve a anular (409)", async () => {
    state.policy = current({ pol_is_current: false });
    await expect(service.cancelPolicy({ polId: 500, reaId: 12, observation: "x", useBy: 9, ctx })).rejects.toMatchObject({ statusCode: 409 });
  });
});

describe("getContractPolicies", () => {
  const concept = (overrides) => ({
    ccp_type: "INITIAL",
    ccp_number: null,
    ccp_start_date: new Date("2026-01-31T00:00:00Z"),
    ccp_direct_cost: "1000.00",
    ccp_admin_pct: "10",
    ccp_contingency_pct: "0",
    ccp_profit_pct: "5",
    ccp_vat_pct: "19",
    ccp_advance_pct: "0",
    ccp_retention_pct: "0",
    ccp_extension: null,
    sta_id: 1,
    ...overrides,
  });
  const version = (overrides) => ({
    ...current(),
    pol_closed_at: null,
    pol_cancel_observation: null,
    pol_create_at: new Date(),
    tbl_policy_types: { plt_name: "Cumplimiento" },
    tbl_insurers: { ins_description: "Seguros SA" },
    tbl_reasons: null,
    created_by_user: null,
    closed_by_user: null,
    ...overrides,
  });

  it("agrupa por póliza, calcula el valor asegurado con la base de la versión y lista los conceptos sin póliza", async () => {
    prismaMock.tbl_contracts.findFirst.mockResolvedValue({
      ctr_id: 30,
      tbl_contract_concepts: [concept({ ccp_id: 300 }), concept({ ccp_id: 301, ccp_type: "AMENDMENT", ccp_number: 1 })],
      tbl_policies: [
        // Base gravable del valor inicial: 1000 + 100 + 50 = 1150; el 10 % es 115.
        version({ pol_id: 501, pol_version: 2, pol_end_date: null }),
        version({ pol_id: 500, pol_version: 1, pol_is_current: false, pol_closed_at: new Date() }),
      ],
    });

    const result = await service.getContractPolicies({ ctrId: 30 });

    expect(result.policies).toHaveLength(1);
    expect(result.policies[0]).toMatchObject({
      rootId: 500,
      polId: 501,
      version: 2,
      status: "CURRENT",
      conceptLabel: "Valor inicial",
      baseName: "Base gravable",
      baseValue: "1150.00",
      insuredValue: "115.00",
      validity: "NO_DATE",
      validityName: "Sin fecha de vigencia",
    });
    expect(result.policies[0].versions.map((v) => v.version)).toEqual([2, 1]);
    expect(result.uncoveredConcepts).toEqual([{ ccpId: 301, label: "Otrosí N.º 1", value: expect.any(String) }]);
  });

  it("una póliza cuya última versión se cerró está anulada y su concepto queda sin póliza", async () => {
    prismaMock.tbl_contracts.findFirst.mockResolvedValue({
      ctr_id: 30,
      tbl_contract_concepts: [concept({ ccp_id: 300 })],
      tbl_policies: [version({ pol_is_current: false, pol_closed_at: new Date(), tbl_reasons: { rea_name: "Error" }, pol_cancel_observation: "x" })],
    });
    const result = await service.getContractPolicies({ ctrId: 30 });
    expect(result.policies[0]).toMatchObject({ status: "CANCELLED", validity: null, cancelReasonName: "Error" });
    expect(result.uncoveredConcepts.map((c) => c.ccpId)).toEqual([300]);
  });
});
