import { jest } from "@jest/globals";
import { lockedIdsOf, transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Reglas de negocio (DEC-072): días de aviso de vencimiento entre 1 y 365,
// guardados bajo bloqueo de sus filas, con cada cambio en la bitácora. Si
// falta una fila, la lectura usa 30 días.

const state = { rows: [] };

const prismaMock = {
  tbl_business_rules: {
    findMany: jest.fn(async () => state.rows),
    update: jest.fn(),
  },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { getBusinessRules, getRuleValues, policyExpiringDays, saveBusinessRules } = await import(
  "../../../../src/modules/admin/businessRules/businessRules.service.js"
);

const ctx = { useId: 9, ip: "1.1.1.1" };
const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);

beforeEach(() => {
  jest.clearAllMocks();
  state.rows = [
    { bru_id: 1, bru_key: "CONTRACT_EXPIRING_DAYS", bru_value: 30 },
    { bru_id: 2, bru_key: "POLICY_EXPIRING_DAYS", bru_value: 30 },
  ];
});

describe("lectura", () => {
  it("devuelve los días de cada regla", async () => {
    state.rows[0].bru_value = 45;
    await expect(getBusinessRules()).resolves.toEqual({ contractExpiringDays: 45, policyExpiringDays: 30 });
  });

  it("una regla sin fila toma 30 días", async () => {
    state.rows = [{ bru_id: 2, bru_key: "POLICY_EXPIRING_DAYS", bru_value: 10 }];
    await expect(getRuleValues()).resolves.toEqual({ CONTRACT_EXPIRING_DAYS: 30, POLICY_EXPIRING_DAYS: 10 });
    await expect(policyExpiringDays()).resolves.toBe(10);
  });
});

describe("saveBusinessRules", () => {
  it("bloquea las filas, guarda solo lo que cambió y lo deja en la bitácora", async () => {
    const result = await saveBusinessRules({ values: { contractExpiringDays: 15, policyExpiringDays: 30 }, useBy: 9, ctx });

    expect(result).toMatchObject({ changed: true, rules: { contractExpiringDays: 15, policyExpiringDays: 30 } });
    const [, ...lockValues] = prismaMock.$queryRaw.mock.calls[0];
    expect(lockedIdsOf(lockValues)).toEqual([1, 2]);
    expect(prismaMock.$queryRaw.mock.invocationCallOrder[0]).toBeLessThan(prismaMock.tbl_business_rules.update.mock.invocationCallOrder[0]);
    expect(prismaMock.tbl_business_rules.update).toHaveBeenCalledTimes(1);
    expect(prismaMock.tbl_business_rules.update).toHaveBeenCalledWith({ where: { bru_id: 1 }, data: { bru_value: 15, bru_update_by: 9 } });
    expect(auditRows()).toEqual([
      expect.objectContaining({
        aud_entity: "REGLA_NEGOCIO",
        aud_record_id: 1,
        aud_operation: "EDITAR",
        aud_field: "CONTRACT_EXPIRING_DAYS",
        aud_old_value: "30",
        aud_new_value: "15",
        use_id: 9,
      }),
    ]);
  });

  it("los mismos días no escriben nada y lo dicen", async () => {
    const result = await saveBusinessRules({ values: { contractExpiringDays: 30, policyExpiringDays: 30 }, useBy: 9, ctx });
    expect(result.changed).toBe(false);
    expect(prismaMock.tbl_business_rules.update).not.toHaveBeenCalled();
    expect(prismaMock.tbl_audit_log.createMany).not.toHaveBeenCalled();
  });

  it.each([0, 366, 2.5, "abc", null])("rechaza %p días con 400, sin abrir la transacción", async (value) => {
    await expect(saveBusinessRules({ values: { contractExpiringDays: value, policyExpiringDays: 30 }, useBy: 9, ctx })).rejects.toMatchObject({
      statusCode: 400,
    });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("sin las filas sembradas es un error del sistema, no de la petición", async () => {
    state.rows = [{ bru_id: 2, bru_key: "POLICY_EXPIRING_DAYS", bru_value: 30 }];
    await expect(saveBusinessRules({ values: { contractExpiringDays: 10, policyExpiringDays: 10 }, useBy: 9, ctx })).rejects.toThrow(
      /migración 0105/
    );
    expect(prismaMock.tbl_business_rules.update).not.toHaveBeenCalled();
  });
});
