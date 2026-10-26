import { jest } from "@jest/globals";

// Aviso de vencimiento (DEC-072): contratos en ejecución y pólizas vigentes
// que entran en su plazo, avisados una sola vez a cada responsable activo de
// la obra, con la obra y una clave que lleva la fecha fin.

const state = { rules: [], contracts: [], policies: [], managers: [], existing: [] };

const prismaMock = {
  tbl_business_rules: { findMany: jest.fn(async () => state.rules) },
  tbl_contracts: { findMany: jest.fn(async () => state.contracts) },
  tbl_policies: { findMany: jest.fn(async () => state.policies) },
  tbl_work_managers: { findMany: jest.fn(async () => state.managers) },
  tbl_notifications: { findMany: jest.fn(async () => state.existing) },
};

const insertNotification = jest.fn(async () => ({ not_id: 1 }));

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));
jest.unstable_mockModule("../../../../src/modules/app/notifications/notifications.service.js", () => ({ insertNotification }));
jest.unstable_mockModule("../../../../src/common/configs/winston.config.js", () => ({ default: { info: jest.fn(), warn: jest.fn() } }));

const { runExpirationNotice } = await import("../../../../src/modules/work/contracts/expirationNotice.service.js");

const today = new Date(Date.UTC(2026, 9, 22));
const day = (text) => new Date(`${text}T00:00:00.000Z`);

beforeEach(() => {
  jest.clearAllMocks();
  state.rules = [
    { bru_key: "CONTRACT_EXPIRING_DAYS", bru_value: 20 },
    { bru_key: "POLICY_EXPIRING_DAYS", bru_value: 10 },
  ];
  state.contracts = [{ ctr_id: 30, ctr_number: "C-30", ctr_end_date: day("2026-11-01"), wrk_id: 4, tbl_works: { wrk_code: "OB-4" } }];
  state.policies = [
    {
      pol_id: 71,
      pol_root_id: 70,
      pol_number: "P-9",
      pol_end_date: day("2026-10-22"),
      ctr_id: 31,
      tbl_policy_types: { plt_name: "Cumplimiento" },
      tbl_contracts: { ctr_number: "C-31", wrk_id: 5, tbl_works: { wrk_code: "OB-5" } },
    },
  ];
  state.managers = [
    { wrk_id: 4, use_id: 2 },
    { wrk_id: 4, use_id: 3 },
    { wrk_id: 5, use_id: 2 },
  ];
  state.existing = [];
});

describe("runExpirationNotice", () => {
  it("busca cada cosa con los días de su regla, de hoy a hoy + N, y solo lo que puede vencer", async () => {
    await runExpirationNotice({ today });

    const contractWhere = prismaMock.tbl_contracts.findMany.mock.calls[0][0].where;
    expect(contractWhere).toMatchObject({ ctr_state: "IN_PROGRESS", ctr_end_date: { gte: today, lte: day("2026-11-11") } });
    expect(contractWhere.sta_id).toEqual({ not: 3 });

    // Pólizas: también las ya vencidas, como "por atender" del tablero.
    const policyWhere = prismaMock.tbl_policies.findMany.mock.calls[0][0].where;
    expect(policyWhere).toEqual({
      pol_is_current: true,
      pol_end_date: { lte: day("2026-11-01") },
      tbl_contracts: { sta_id: { not: 3 }, ctr_state: { notIn: ["LIQUIDATED", "CANCELLED"] }, tbl_works: { sta_id: { not: 3 } } },
    });
  });

  it("avisa a cada responsable de la obra de lo que vence, con la obra y la clave", async () => {
    const result = await runExpirationNotice({ today });

    expect(result).toEqual({ referenceDate: "2026-10-22", contracts: 1, policies: 1, notified: 3 });
    expect(prismaMock.tbl_work_managers.findMany.mock.calls[0][0].where).toMatchObject({ wrk_id: { in: [4, 5] }, sta_id: 1, tbl_users: { sta_id: 1 } });

    const calls = insertNotification.mock.calls.map(([n]) => n);
    expect(calls.map((n) => [n.userId, n.wrkId, n.key])).toEqual([
      [2, 4, "CONTRACT_EXPIRING:30:2026-11-01"],
      [3, 4, "CONTRACT_EXPIRING:30:2026-11-01"],
      [2, 5, "POLICY_EXPIRING:70:2026-10-22"],
    ]);
    expect(calls[0]).toMatchObject({
      title: "Contrato próximo a vencer",
      message: "El contrato C-30 (obra OB-4) vence el 2026-11-01: faltan 10 día(s).",
      type: "warning",
      module: "contracts",
      action: "contract_expiring",
      data: { ctrId: 30, wrkId: 4, endDate: "2026-11-01" },
    });
    expect(calls[2].message).toBe("La póliza P-9 de Cumplimiento del contrato C-31 (obra OB-5) vence el 2026-10-22: vence hoy.");
  });

  it("una póliza vencida tiene su propio aviso, en rojo, distinto del de por vencer", async () => {
    state.policies[0].pol_end_date = day("2026-10-12");
    await runExpirationNotice({ today });

    const policyNotice = insertNotification.mock.calls.map(([n]) => n).find((n) => n.wrkId === 5);
    expect(policyNotice).toMatchObject({
      key: "POLICY_EXPIRED:70:2026-10-12",
      action: "policy_expired",
      title: "Póliza vencida",
      type: "alert",
      message: "La póliza P-9 de Cumplimiento del contrato C-31 (obra OB-5) venció el 2026-10-12, hace 10 día(s).",
    });
  });

  it("no repite el aviso a quien ya lo recibió", async () => {
    state.existing = [{ use_id: 2, not_key: "CONTRACT_EXPIRING:30:2026-11-01" }];
    const result = await runExpirationNotice({ today });

    expect(result.notified).toBe(2);
    expect(insertNotification.mock.calls.map(([n]) => [n.userId, n.key])).toEqual([
      [3, "CONTRACT_EXPIRING:30:2026-11-01"],
      [2, "POLICY_EXPIRING:70:2026-10-22"],
    ]);
  });

  it("un aviso que la BD rechaza por repetido no se cuenta", async () => {
    insertNotification.mockResolvedValueOnce(null);
    await expect(runExpirationNotice({ today })).resolves.toMatchObject({ notified: 2 });
  });

  it("nada en su plazo: no busca responsables ni avisa", async () => {
    state.contracts = [];
    state.policies = [];
    await expect(runExpirationNotice({ today })).resolves.toMatchObject({ contracts: 0, policies: 0, notified: 0 });
    expect(prismaMock.tbl_work_managers.findMany).not.toHaveBeenCalled();
    expect(insertNotification).not.toHaveBeenCalled();
  });

  it("sin filas de reglas usa 30 días", async () => {
    state.rules = [];
    await runExpirationNotice({ today });
    expect(prismaMock.tbl_contracts.findMany.mock.calls[0][0].where.ctr_end_date.lte).toEqual(day("2026-11-21"));
  });
});
