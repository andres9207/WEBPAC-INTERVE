import { jest } from "@jest/globals";

// Liquidación automática (ADR-0017, DEC-081): solo un contrato en liquidación
// se evalúa; con todo cumplido pasa a liquidado con historial y bitácora, y si
// falta algo no escribe nada. Las condiciones en sí, en liquidationTerms.test.js.

const notifyWorkManagers = jest.fn(async () => 1);
jest.unstable_mockModule("../../../../src/modules/work/contracts/contractNotifications.service.js", () => ({
  notifyWorkManagers,
  contractLabel: (c) => c.ctr_number,
}));

const { evaluateLiquidation, liquidationFacts, notifyLiquidated } = await import(
  "../../../../src/modules/work/contracts/contractLiquidation.service.js"
);

const state = {};
const tx = {
  tbl_contracts: { findUnique: jest.fn(async () => state.contract), update: jest.fn() },
  tbl_contract_concepts: { findMany: jest.fn(async () => state.concepts) },
  tbl_policies: { findMany: jest.fn(async () => state.policies) },
  tbl_invoices: { count: jest.fn(async ({ where }) => (where.inv_state === "APPROVED" ? state.approvedLiquidations : state.pendingInvoices)) },
  tbl_contract_suspensions: { count: jest.fn(async ({ where }) => (where.csp_requires_report ? state.reportSuspensions : state.openSuspensions)) },
  tbl_contract_status_history: { create: jest.fn() },
  tbl_audit_log: { createMany: jest.fn() },
};
const contractBalances = jest.fn(async () => state.balances);
const ctx = { useId: 9, ip: "1.1.1.1" };
const auditRows = () => tx.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);

const settled = () => ({
  advance: { toAmortize: "0.00" },
  retention: { balance: "0.00" },
  billing: { base: "50000000.00", billed: "50000000.00" },
});

beforeEach(() => {
  jest.clearAllMocks();
  Object.assign(state, {
    contract: { ctr_id: 30, ctr_state: "IN_LIQUIDATION", ctr_end_date: new Date("2026-12-31T00:00:00Z") },
    concepts: [
      { ccp_id: 1, ccp_type: "INITIAL", ccp_number: null },
      { ccp_id: 3, ccp_type: "LIQUIDATION", ccp_number: null },
    ],
    policies: [{ ccp_id: 1 }, { ccp_id: 3 }],
    approvedLiquidations: 1,
    pendingInvoices: 0,
    openSuspensions: 0,
    reportSuspensions: 0,
    balances: settled(),
  });
});

describe("evaluateLiquidation", () => {
  it("un contrato que no está en liquidación no se evalúa ni se consulta", async () => {
    state.contract = { ctr_id: 30, ctr_state: "IN_PROGRESS" };

    await expect(evaluateLiquidation(tx, { ctrId: 30, useBy: 9, ctx, contractBalances })).resolves.toBeNull();
    expect(contractBalances).not.toHaveBeenCalled();
    expect(tx.tbl_contracts.update).not.toHaveBeenCalled();
  });

  it("con todo cumplido pasa a liquidado: estado, historial automático y foto de las condiciones", async () => {
    const result = await evaluateLiquidation(tx, { ctrId: 30, useBy: 9, ctx, contractBalances });

    expect(result.liquidated).toBe(true);
    expect(contractBalances).toHaveBeenCalledWith(tx, 30);
    expect(tx.tbl_contracts.update).toHaveBeenCalledWith({ where: { ctr_id: 30 }, data: { ctr_state: "LIQUIDATED", ctr_update_by: 9 } });
    expect(tx.tbl_contract_status_history.create.mock.calls[0][0].data).toMatchObject({
      ctr_id: 30,
      csh_from_state: "IN_LIQUIDATION",
      csh_to_state: "LIQUIDATED",
      csh_origin: "AUTOMATIC",
      csh_create_by: 9,
    });
    expect(auditRows()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ aud_entity: "CONTRATO", aud_record_id: 30, aud_field: "ctr_state", aud_old_value: "IN_LIQUIDATION", aud_new_value: "LIQUIDATED" }),
        expect.objectContaining({ aud_field: "liquidation_C9", aud_new_value: "Cumple" }),
      ])
    );
  });

  it("si falta una condición no escribe nada y devuelve cuál", async () => {
    state.balances = { ...settled(), retention: { balance: "800000.00" } };

    const result = await evaluateLiquidation(tx, { ctrId: 30, useBy: 9, ctx, contractBalances });

    expect(result.liquidated).toBe(false);
    expect(result.conditions.find((c) => c.key === "C3")).toMatchObject({ met: false, detail: "Retenido por devolver: 800000.00." });
    expect(tx.tbl_contracts.update).not.toHaveBeenCalled();
    expect(tx.tbl_contract_status_history.create).not.toHaveBeenCalled();
    expect(tx.tbl_audit_log.createMany).not.toHaveBeenCalled();
  });

  it("una suspensión que exigía informe no impide liquidar (C7 no bloquea)", async () => {
    state.reportSuspensions = 1;

    await expect(evaluateLiquidation(tx, { ctrId: 30, useBy: 9, ctx, contractBalances })).resolves.toMatchObject({ liquidated: true });
  });
});

describe("liquidationFacts", () => {
  it("lee los hechos del contrato: conceptos sin póliza, pólizas cortas, facturas y suspensiones", async () => {
    state.policies = [
      { ccp_id: 1, pol_number: "P-1", pol_end_date: new Date("2026-12-30T00:00:00Z") },
      { ccp_id: 1, pol_number: "P-2", pol_end_date: new Date("2027-12-31T00:00:00Z") },
    ];
    state.pendingInvoices = 2;
    state.openSuspensions = 1;

    await expect(liquidationFacts(tx, 30, contractBalances)).resolves.toEqual({
      hasLiquidationConcept: true,
      balances: settled(),
      approvedLiquidations: 1,
      pendingInvoices: 2,
      openSuspension: true,
      reportSuspensions: 0,
      uncoveredConcepts: ["Otrosí de liquidación"],
      // Termina un día antes que el contrato; la que sigue un año después sí cubre.
      shortPolicies: ["P-1"],
    });
    // Las facturas eliminadas no cuentan.
    expect(tx.tbl_invoices.count.mock.calls.every(([{ where }]) => where.sta_id?.not === 3)).toBe(true);
  });
});

describe("notifyLiquidated", () => {
  it("avisa a los responsables de la obra", async () => {
    await notifyLiquidated({ ctrId: 30, actorId: 9 });

    const call = notifyWorkManagers.mock.calls[0][0];
    expect(call).toMatchObject({ ctrId: 30, actorId: 9, title: "Contrato liquidado", action: "liquidate" });
    expect(call.buildMessage({ ctr_number: "C-1" })).toBe("El contrato C-1 cumplió las condiciones de liquidación y quedó liquidado.");
  });
});
