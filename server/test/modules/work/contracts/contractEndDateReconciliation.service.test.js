import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Conciliación de la fecha fin (PRO-BE-13): recalcula con la función única,
// reporta cada diferencia y nunca escribe en el contrato.

const contracts = [];

const prismaMock = {
  tbl_contracts: {
    findMany: jest.fn(async ({ where, take }) => contracts.filter((c) => c.ctr_id > where.ctr_id.gt).slice(0, take)),
    update: jest.fn(),
    updateMany: jest.fn(),
  },
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
jest.unstable_mockModule("../../../../src/common/services/effectivePermissions.service.js", () => ({ findUsersWithPermission }));
jest.unstable_mockModule("../../../../src/common/services/mailerService.js", () => ({ sendEmail }));
jest.unstable_mockModule("../../../../src/modules/app/notifications/notifications.service.js", () => ({ insertNotification }));

const { findEndDateDiscrepancies, runEndDateReconciliation } = await import(
  "../../../../src/modules/work/contracts/contractEndDateReconciliation.service.js"
);

const contract = (overrides = {}) => ({
  ctr_id: 1,
  ctr_number: "C-001",
  ctr_start_date: new Date("2026-01-31T00:00:00Z"),
  ctr_term: 6,
  ctr_term_unit: "MES",
  ctr_suspended_days: 0,
  ctr_end_date: new Date("2026-07-31T00:00:00Z"),
  tbl_works: { wrk_code: "OB-1" },
  tbl_contract_concepts: [{ ccp_type: "INITIAL", ccp_extension: null, sta_id: 1 }],
  ...overrides,
});

beforeEach(() => {
  jest.clearAllMocks();
  contracts.length = 0;
  recipients.length = 0;
  delete process.env.RECONCILIATION_REPORT_EMAILS;
});

describe("findEndDateDiscrepancies", () => {
  it("no reporta los contratos cuya fecha guardada coincide, con prórrogas y días suspendidos", async () => {
    contracts.push(
      contract(),
      // 31 ene + (6 + 2) meses = 30 sep, + 5 días suspendidos = 5 oct.
      contract({
        ctr_id: 2,
        ctr_suspended_days: 5,
        ctr_end_date: new Date("2026-10-05T00:00:00Z"),
        tbl_contract_concepts: [
          { ccp_type: "INITIAL", ccp_extension: null, sta_id: 1 },
          { ccp_type: "AMENDMENT", ccp_extension: 2, sta_id: 1 },
        ],
      })
    );
    await expect(findEndDateDiscrepancies()).resolves.toEqual({ checked: 2, discrepancies: [] });
  });

  it("una discrepancia introducida a propósito aparece con contrato, fechas y diferencia", async () => {
    contracts.push(contract({ ctr_end_date: new Date("2026-07-27T00:00:00Z") }));
    const { discrepancies } = await findEndDateDiscrepancies();
    expect(discrepancies).toEqual([
      { ctrId: 1, number: "C-001", workCode: "OB-1", persisted: "2026-07-27", derived: "2026-07-31", differenceDays: -4 },
    ]);
  });

  it("lee por lotes con cursor, sin eliminados, y nunca escribe", async () => {
    contracts.push(contract(), contract({ ctr_id: 2 }), contract({ ctr_id: 3, ctr_end_date: null }));
    const { checked, discrepancies } = await findEndDateDiscrepancies({ batchSize: 2 });

    expect(checked).toBe(3);
    expect(discrepancies.map((d) => d.ctrId)).toEqual([3]);
    expect(prismaMock.tbl_contracts.findMany).toHaveBeenCalledTimes(2);
    expect(prismaMock.tbl_contracts.findMany.mock.calls[0][0].where).toEqual({ sta_id: { not: 3 }, ctr_id: { gt: 0 } });
    expect(prismaMock.tbl_contracts.findMany.mock.calls[1][0].where.ctr_id).toEqual({ gt: 2 });
    expect(prismaMock.tbl_contracts.update).not.toHaveBeenCalled();
    expect(prismaMock.tbl_contracts.updateMany).not.toHaveBeenCalled();
  });
});

describe("runEndDateReconciliation", () => {
  it("sin discrepancias solo registra en el log: no notifica ni envía correo", async () => {
    contracts.push(contract());
    process.env.RECONCILIATION_REPORT_EMAILS = "control@example.com";

    await expect(runEndDateReconciliation()).resolves.toMatchObject({ checked: 1, notified: 0, emailed: false });
    expect(logger.info).toHaveBeenCalled();
    expect(insertNotification).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("con discrepancias notifica a cada usuario con el permiso 92 y envía el correo configurado", async () => {
    contracts.push(contract({ ctr_end_date: new Date("2026-08-02T00:00:00Z") }));
    recipients.push({ use_id: 1 }, { use_id: 7 });
    process.env.RECONCILIATION_REPORT_EMAILS = "control@example.com, auditoria@example.com";

    await expect(runEndDateReconciliation()).resolves.toMatchObject({ notified: 2, emailed: true });

    expect(findUsersWithPermission).toHaveBeenCalledWith(92);
    expect(insertNotification.mock.calls.map(([n]) => n.userId)).toEqual([1, 7]);
    expect(insertNotification.mock.calls[0][0].message).toContain("guardada 2026-08-02, calculada 2026-07-31, diferencia +2 día(s)");
    expect(sendEmail.mock.calls[0][0]).toMatchObject({ to: "control@example.com,auditoria@example.com" });
    expect(sendEmail.mock.calls[0][0].text).toContain("Contrato C-001 (obra OB-1)");
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining("1 discrepancia(s)"));
  });

  it("sin correo configurado ni destinatarios, lo deja en el log", async () => {
    contracts.push(contract({ ctr_end_date: null }));

    await expect(runEndDateReconciliation()).resolves.toMatchObject({ notified: 0, emailed: false });
    expect(sendEmail).not.toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining("nadie fue notificado"));
  });
});
