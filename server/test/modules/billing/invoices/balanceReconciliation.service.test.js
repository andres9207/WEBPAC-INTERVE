import { jest } from "@jest/globals";
import { Prisma } from "@prisma/client";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Conciliación de saldos (DEC-061): vuelve a comprobar I1 a I4 por contrato
// con el mismo cálculo de las validaciones, reporta y nunca escribe.

const D = (value) => new Prisma.Decimal(value);
const contracts = [];
// Sumas de las facturas aprobadas por contrato: anticipo, amortizado, retenido, devuelto.
const sums = new Map();

// B = 100.000.000; anticipo pactado A = 30 %, retenido pactado RP = 5 %.
const CONCEPTS = [
  {
    ccp_direct_cost: D("100000000"),
    ccp_admin_pct: D(0),
    ccp_contingency_pct: D(0),
    ccp_profit_pct: D(0),
    ccp_vat_pct: D(19),
    ccp_advance_pct: D(30),
    ccp_retention_pct: D(5),
    sta_id: 1,
  },
];

const sumOf = (where) => sums.get(where.tbl_invoices.ctr_id) ?? {};
const prismaMock = {
  tbl_contracts: {
    findMany: jest.fn(async ({ where, take }) => contracts.filter((c) => c.ctr_id > where.ctr_id.gt).slice(0, take)),
    update: jest.fn(),
  },
  tbl_contract_concepts: { findMany: jest.fn(async () => CONCEPTS) },
  tbl_invoice_advance_details: { aggregate: jest.fn(async ({ where }) => ({ _sum: { iad_value: sumOf(where).advance ?? null } })) },
  tbl_invoice_liquidation_details: {
    aggregate: jest.fn(async ({ where }) => ({ _sum: { ild_amortization: sumOf(where).amortized ?? null, ild_retention: sumOf(where).retained ?? null } })),
  },
  tbl_invoice_retention_refund_details: { aggregate: jest.fn(async ({ where }) => ({ _sum: { irr_value: sumOf(where).refunded ?? null } })) },
  tbl_invoices: { update: jest.fn(), updateMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

const recipients = [];
const findUsersWithPermission = jest.fn(async () => recipients);
const insertNotification = jest.fn(async ({ userId }) => ({ not_id: userId }));
const sendEmail = jest.fn(async () => ({ success: true }));
const logger = { info: jest.fn(), warn: jest.fn(), error: jest.fn() };

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));
jest.unstable_mockModule("../../../../src/common/configs/winston.config.js", () => ({ default: logger }));
jest.unstable_mockModule("../../../../src/common/services/effectivePermissions.service.js", () => ({
  findUsersWithPermission,
  hasEffectivePermission: jest.fn(async () => false),
  getEffectivePermissionIds: jest.fn(async () => []),
}));
jest.unstable_mockModule("../../../../src/common/services/mailerService.js", () => ({ sendEmail }));
jest.unstable_mockModule("../../../../src/modules/app/notifications/notifications.service.js", () => ({ insertNotification }));

const { findBalanceViolations, runBalanceReconciliation } = await import("../../../../src/modules/billing/invoices/balanceReconciliation.service.js");

const contract = (ctrId) => ({ ctr_id: ctrId, ctr_number: `C-${ctrId}`, tbl_works: { wrk_code: "OB-1" } });

beforeEach(() => {
  jest.clearAllMocks();
  contracts.length = 0;
  recipients.length = 0;
  sums.clear();
  delete process.env.RECONCILIATION_REPORT_EMAILS;
});

describe("findBalanceViolations", () => {
  it("no reporta un contrato dentro de sus límites, también con los saldos en el tope", async () => {
    contracts.push(contract(1));
    sums.set(1, { advance: D("30000000"), amortized: D("30000000"), retained: D("5000000"), refunded: D("5000000") });
    await expect(findBalanceViolations()).resolves.toEqual({ checked: 1, violations: [] });
  });

  it("cada invariante incumplida a propósito aparece con contrato, valor, límite y exceso", async () => {
    contracts.push(contract(1), contract(2));
    // I1 y I2 en el 1; I3 e I4 en el 2.
    sums.set(1, { advance: D("30000000.01"), amortized: D("30000000.02") });
    sums.set(2, { retained: D("5000001"), refunded: D("5000002") });

    const { violations } = await findBalanceViolations();
    expect(violations.map((v) => [v.ctrId, v.invariant])).toEqual([
      [1, "I1"],
      [1, "I2"],
      [2, "I3"],
      [2, "I4"],
    ]);
    expect(violations[0]).toMatchObject({ number: "C-1", workCode: "OB-1", value: "30000000.01", limit: "30000000.00", excess: "0.01" });
    expect(violations[3]).toMatchObject({ value: "5000001.00", limit: "5000000.00", excess: "1.00" });
  });

  it("solo contratos no eliminados con facturas, por lotes con cursor, y nunca escribe", async () => {
    contracts.push(contract(1), contract(2), contract(3));
    sums.set(3, { advance: D("40000000") });
    const { checked, violations } = await findBalanceViolations({ batchSize: 2 });

    expect(checked).toBe(3);
    expect(violations.map((v) => v.ctrId)).toEqual([3]);
    expect(prismaMock.tbl_contracts.findMany).toHaveBeenCalledTimes(2);
    expect(prismaMock.tbl_contracts.findMany.mock.calls[0][0].where).toEqual({ sta_id: { not: 3 }, ctr_id: { gt: 0 }, tbl_invoices: { some: {} } });
    expect(prismaMock.tbl_contracts.findMany.mock.calls[1][0].where.ctr_id).toEqual({ gt: 2 });
    // Solo cuentan las aprobadas, como en las validaciones.
    expect(prismaMock.tbl_invoice_advance_details.aggregate.mock.calls[0][0].where.tbl_invoices).toMatchObject({ inv_state: "APPROVED" });
    expect(prismaMock.tbl_contracts.update).not.toHaveBeenCalled();
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();
    expect(prismaMock.tbl_invoices.updateMany).not.toHaveBeenCalled();
  });
});

describe("runBalanceReconciliation", () => {
  it("sin incumplimientos solo registra en el log: no notifica ni envía correo", async () => {
    contracts.push(contract(1));
    process.env.RECONCILIATION_REPORT_EMAILS = "control@example.com";

    await expect(runBalanceReconciliation()).resolves.toMatchObject({ checked: 1, notified: 0, emailed: false });
    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining("sin incumplimientos"));
    expect(insertNotification).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("con incumplimientos notifica a cada usuario con el permiso 108 y envía el correo configurado", async () => {
    contracts.push(contract(1));
    sums.set(1, { retained: D("5000000"), refunded: D("6000000") });
    recipients.push({ use_id: 1 }, { use_id: 7 });
    process.env.RECONCILIATION_REPORT_EMAILS = "control@example.com";

    await expect(runBalanceReconciliation()).resolves.toMatchObject({ notified: 2, emailed: true });
    expect(findUsersWithPermission).toHaveBeenCalledWith(108);
    expect(insertNotification.mock.calls.map(([n]) => n.userId)).toEqual([1, 7]);
    expect(insertNotification.mock.calls[0][0]).toMatchObject({ module: "invoices", action: "balance_reconciliation" });
    expect(insertNotification.mock.calls[0][0].message).toContain(
      "Contrato C-1 (obra OB-1), id 1: I3, retenido devuelto supera el retenido: 6000000.00 frente a 5000000.00 (exceso 1000000.00)"
    );
    expect(sendEmail.mock.calls[0][0]).toMatchObject({ to: "control@example.com" });
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining("1 incumplimiento(s)"));
  });

  it("sin destinatarios ni correo, lo deja en el log", async () => {
    contracts.push(contract(1));
    sums.set(1, { advance: D("31000000") });

    await expect(runBalanceReconciliation()).resolves.toMatchObject({ notified: 0, emailed: false });
    expect(sendEmail).not.toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining("nadie fue notificado"));
  });
});
