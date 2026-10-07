import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Tipos de póliza (ADR-0019, DEC-050): la base es un dominio cerrado, la
// clave y la base no cambian por el formulario de edición, y cambiar la base
// exige su propia operación, con bitácora y sin recalcular pólizas.

const state = { type: null, currentPolicies: 0 };

const prismaMock = {
  tbl_policy_types: {
    findUnique: jest.fn(async ({ where }) => (where.plt_idempotency_key ? null : state.type)),
    findFirst: jest.fn(async () => null),
    update: jest.fn(),
    create: jest.fn(async () => ({ plt_id: 4 })),
  },
  tbl_policies: { count: jest.fn(async () => state.currentPolicies), update: jest.fn(), updateMany: jest.fn() },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { policyTypesService, configurePolicyTypeBase, policyTypesConfig } = await import(
  "../../../../src/modules/admin/policyTypes/policyTypes.service.js"
);
const { POLICY_BASES, policyBaseValue, insuredValue } = await import("../../../../src/modules/admin/policyTypes/policyBases.js");

const ctx = { useId: 9, ip: "1.1.1.1" };
const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);

beforeEach(() => {
  jest.clearAllMocks();
  state.type = { plt_key: "CUMPLIMIENTO", plt_name: "Cumplimiento", plt_base: "TAXABLE_BASE", sta_id: 1 };
  state.currentPolicies = 0;
});

describe("bases de cálculo", () => {
  const amounts = { directCost: "1000.00", base: "1150.00", vat: "9.50", value: "1159.50" };

  it("cada base toma su importe de la composición del concepto", () => {
    expect(policyBaseValue(POLICY_BASES.DIRECT_COST, amounts).toFixed(2)).toBe("1000.00");
    expect(policyBaseValue(POLICY_BASES.TAXABLE_BASE, amounts).toFixed(2)).toBe("1150.00");
    expect(policyBaseValue(POLICY_BASES.TOTAL_VALUE, amounts).toFixed(2)).toBe("1159.50");
    expect(policyBaseValue(POLICY_BASES.VAT_ONLY, amounts).toFixed(2)).toBe("9.50");
  });

  it("el valor asegurado redondea con la regla única (medio hacia arriba)", () => {
    // 1159,50 × 12,5 % = 144,9375 → 144,94.
    expect(insuredValue(POLICY_BASES.TOTAL_VALUE, "12.5", amounts).toFixed(2)).toBe("144.94");
  });

  it("una base desconocida es un error de programación", () => {
    expect(() => policyBaseValue("SUBTOTAL", amounts)).toThrow(/base desconocida/);
  });
});

describe("maestro", () => {
  it("la clave y la base se fijan al crear: la edición no las toca", async () => {
    await policyTypesService.save({ id: 4, input: { key: "OTRA", name: "Cumplimiento SA", base: "VAT_ONLY" }, useBy: 9, ctx });
    const { data } = prismaMock.tbl_policy_types.update.mock.calls[0][0];
    expect(data).toEqual({ plt_name: "Cumplimiento SA", plt_update_by: 9 });
  });

  it("al crear, la clave queda en mayúsculas", async () => {
    await policyTypesService.save({ id: 0, input: { key: "cumplimiento", name: "Cumplimiento", base: "TOTAL_VALUE" }, useBy: 9, ctx, idempotencyKey: "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b" });
    expect(prismaMock.tbl_policy_types.create.mock.calls[0][0].data).toMatchObject({ plt_key: "CUMPLIMIENTO", plt_base: "TOTAL_VALUE" });
  });

  it("un tipo con pólizas, aun anuladas, no se elimina", () => {
    expect(policyTypesConfig.dependents).toEqual([{ model: "tbl_policies", column: "plt_id", label: "póliza(s)", countDeleted: true }]);
  });
});

describe("configurePolicyTypeBase", () => {
  it("cambia la base bajo bloqueo y deja en la bitácora la base anterior y las pólizas vigentes", async () => {
    state.currentPolicies = 7;
    await expect(configurePolicyTypeBase({ pltId: 4, base: "TOTAL_VALUE", useBy: 9, ctx })).resolves.toMatchObject({ base: "TOTAL_VALUE" });

    expect(prismaMock.tbl_policy_types.update).toHaveBeenCalledWith({ where: { plt_id: 4 }, data: { plt_base: "TOTAL_VALUE", plt_update_by: 9 } });
    expect(prismaMock.tbl_policies.update).not.toHaveBeenCalled();
    expect(prismaMock.tbl_policies.updateMany).not.toHaveBeenCalled();
    expect(prismaMock.tbl_policies.count).toHaveBeenCalledWith({ where: { plt_id: 4, pol_is_current: true } });
    expect(auditRows()).toEqual([
      expect.objectContaining({ aud_entity: "TIPO_POLIZA", aud_field: "plt_base", aud_old_value: "TAXABLE_BASE", aud_new_value: "TOTAL_VALUE" }),
      expect.objectContaining({ aud_field: "polizas_vigentes_al_cambio", aud_new_value: "7" }),
    ]);
  });

  it("la misma base no escribe nada", async () => {
    await configurePolicyTypeBase({ pltId: 4, base: "TAXABLE_BASE", useBy: 9, ctx });
    expect(prismaMock.tbl_policy_types.update).not.toHaveBeenCalled();
    expect(prismaMock.tbl_audit_log.createMany).not.toHaveBeenCalled();
  });

  it("rechaza una base fuera del dominio (400) y un tipo eliminado (404)", async () => {
    await expect(configurePolicyTypeBase({ pltId: 4, base: "SUBTOTAL", useBy: 9, ctx })).rejects.toMatchObject({ statusCode: 400 });
    state.type = { ...state.type, sta_id: 3 };
    await expect(configurePolicyTypeBase({ pltId: 4, base: "TOTAL_VALUE", useBy: 9, ctx })).rejects.toMatchObject({ statusCode: 404 });
  });
});
