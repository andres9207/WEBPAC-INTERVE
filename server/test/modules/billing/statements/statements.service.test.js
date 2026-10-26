import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Extractos de la obra (DEC-084): número único en la obra, alcance por obra,
// eliminación bloqueada si alguna factura lo usa, y el reporte con los
// totales por menú y el chequeo de comprobantes de egreso.

const state = { statement: null, duplicate: null, work: null, invoices: [], invoicesCount: 0, glossesCount: 0, glosses: null, replay: null };

const prismaMock = {
  tbl_statements: {
    findUnique: jest.fn(async ({ where }) => (where.stm_idempotency_key ? state.replay : state.statement)),
    findFirst: jest.fn(async ({ where }) => (where.stm_number ? state.duplicate : state.statement)),
    findMany: jest.fn(async () => []),
    create: jest.fn(async () => ({ stm_id: 40 })),
    update: jest.fn(),
    count: jest.fn(async () => 0),
    groupBy: jest.fn(async () => []),
  },
  tbl_works: { findUnique: jest.fn(async () => state.work) },
  tbl_invoices: { count: jest.fn(async () => state.invoicesCount) },
  tbl_invoice_glosses: { count: jest.fn(async () => state.glossesCount) },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));
// Las facturas del extracto salen del service de facturas (los mismos importes del listado).
jest.unstable_mockModule("../../../../src/modules/billing/invoices/invoices.service.js", () => ({
  statementInvoices: jest.fn(async () => state.invoices),
}));
// Las glosas del extracto (DEC-085), del service de glosas.
jest.unstable_mockModule("../../../../src/modules/billing/invoices/invoiceGlosses.service.js", () => ({
  statementGlosses: jest.fn(async () => state.glosses),
}));

const service = await import("../../../../src/modules/billing/statements/statements.service.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const ctx = { useId: 9, ip: "1.1.1.1" };
const OWN = Object.freeze({ all: false, wrkId: 8 });
const OTHER = Object.freeze({ all: false, wrkId: 5 });
const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);
const lockedTables = () => prismaMock.$queryRaw.mock.calls.map((call) => call.slice(1).map((v) => v?.strings?.join("") ?? "").join(" "));

const statementRow = (overrides = {}) => ({
  stm_id: 40,
  wrk_id: 8,
  stm_number: "001",
  stm_date: new Date("2026-10-01T00:00:00Z"),
  stm_communication: "IE-001",
  stm_description: null,
  sta_id: 1,
  tbl_works: { wrk_code: "OB-8", wrk_name: "Vía" },
  tbl_status: { sta_name: "Activo" },
  _count: { tbl_invoices: 2 },
  ...overrides,
});

const input = (overrides = {}) => ({ wrkId: 8, number: " 002 ", date: "2026-10-20", communication: " IE-002 ", description: "", ...overrides });

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  Object.assign(state, {
    statement: statementRow(),
    duplicate: null,
    work: { sta_id: 1 },
    invoices: [],
    invoicesCount: 0,
    glossesCount: 0,
    glosses: { raised: [], released: [] },
    replay: null,
  });
});

describe("crear y editar", () => {
  it("crea en la obra, bloqueándola, con la clave y bitácora", async () => {
    await expect(service.saveStatement({ stmId: 0, input: input(), useBy: 9, scope: OWN, ctx, idempotencyKey: KEY })).resolves.toEqual({
      message: "Extracto creado correctamente",
      stmId: 40,
    });
    expect(lockedTables()[0]).toMatch(/tbl_works/);
    const { data } = prismaMock.tbl_statements.create.mock.calls[0][0];
    expect(data).toMatchObject({ wrk_id: 8, stm_number: "002", stm_communication: "IE-002", stm_description: null, sta_id: 1, stm_create_by: 9 });
    expect(data.stm_date.toISOString()).toBe("2026-10-20T00:00:00.000Z");
    expect(data.stm_idempotency_key).toBe(KEY);
    expect(auditRows().find((r) => r.aud_field === "stm_number")).toMatchObject({ aud_entity: "EXTRACTO", aud_new_value: "002" });
  });

  it("el número repetido en la obra se rechaza (409)", async () => {
    state.duplicate = { stm_id: 41 };
    await expect(service.saveStatement({ stmId: 0, input: input(), useBy: 9, scope: OWN, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 409,
      message: "Ya existe un extracto con el número 002 en esta obra.",
    });
    expect(prismaMock.tbl_statements.create).not.toHaveBeenCalled();
  });

  it("no crea en una obra fuera del alcance (404)", async () => {
    await expect(service.saveStatement({ stmId: 0, input: input(), useBy: 9, scope: OTHER, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 404,
    });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("edita bajo el bloqueo del extracto; sin cambios no escribe", async () => {
    await service.saveStatement({ stmId: 40, input: input({ number: "001", date: "2026-10-01", communication: "IE-001" }), useBy: 9, scope: OWN, ctx });
    expect(prismaMock.tbl_statements.update).not.toHaveBeenCalled();

    await service.saveStatement({ stmId: 40, input: input({ number: "001", date: "2026-10-02", communication: "IE-001" }), useBy: 9, scope: OWN, ctx });
    expect(lockedTables().at(-1)).toMatch(/tbl_statements/);
    expect(auditRows().map((r) => [r.aud_field, r.aud_new_value])).toEqual([["stm_date", "2026-10-02"]]);
  });
});

describe("eliminar", () => {
  it("con facturas no se elimina (409)", async () => {
    state.invoicesCount = 3;
    await expect(service.deleteStatement({ stmId: 40, useBy: 9, scope: OWN, ctx })).rejects.toMatchObject({
      statusCode: 409,
      message: "No se puede eliminar el extracto: tiene 3 factura(s).",
    });
  });

  it("con glosas levantadas o liberadas en él no se elimina (409, DEC-085)", async () => {
    state.glossesCount = 1;
    await expect(service.deleteStatement({ stmId: 40, useBy: 9, scope: OWN, ctx })).rejects.toMatchObject({
      statusCode: 409,
      message: "No se puede eliminar el extracto: tiene 1 glosa(s).",
    });
  });

  it("sin facturas, lógica y con evidencia", async () => {
    await expect(service.deleteStatement({ stmId: 40, useBy: 9, scope: OWN, ctx })).resolves.toEqual({ message: "Extracto eliminado correctamente" });
    expect(prismaMock.tbl_statements.update.mock.calls[0][0].data).toMatchObject({ sta_id: 3, stm_delete_by: 9, stm_delete_at: expect.any(Date) });
  });

  it("uno de otra obra no se lee ni se elimina (404)", async () => {
    await expect(service.getStatement({ stmId: 40, scope: OTHER })).rejects.toMatchObject({ statusCode: 404 });
    await expect(service.deleteStatement({ stmId: 40, useBy: 9, scope: OTHER, ctx })).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });
});

describe("reporte (documento de alcance, punto 7)", () => {
  const invoice = (overrides) => ({
    invId: 1,
    pvtId: 3,
    menuName: "Contrato mayor",
    number: "F-1",
    providerName: "Acme",
    value: "100.00",
    vat: "19.00",
    total: "119.00",
    state: "APPROVED",
    voucherNumber: "CE-1",
    ...overrides,
  });

  it("totaliza por menú y en total, sin las anuladas, y señala las aprobadas sin comprobante", async () => {
    state.invoices = [
      invoice({}),
      invoice({ invId: 2, number: "F-2", voucherNumber: null }),
      invoice({ invId: 3, pvtId: 1, menuName: "Simple", value: "50.00", vat: null, total: "50.00", state: "REGISTERED", voucherNumber: null }),
      invoice({ invId: 4, number: "F-4", state: "CANCELLED" }),
    ];

    const report = await service.getStatementReport({ stmId: 40, scope: OWN });

    expect(report.byMenu).toEqual([
      { pvtId: 3, name: "Contrato mayor", count: 2, value: "200.00", vat: "38.00", total: "238.00" },
      { pvtId: 1, name: "Simple", count: 1, value: "50.00", vat: "0.00", total: "50.00" },
    ]);
    expect(report.totals).toEqual({ count: 3, value: "250.00", vat: "38.00", total: "288.00" });
    expect(report.cancelled).toBe(1);
    expect(report.withoutVoucher).toEqual([{ invId: 2, number: "F-2", providerName: "Acme", menuName: "Contrato mayor" }]);
  });

  it("suma las glosas levantadas y las liberadas en el extracto (DEC-085)", async () => {
    state.glosses = { raised: [{ iglId: 1, value: "100.00" }, { iglId: 2, value: "-30.00" }], released: [{ iglId: 3, value: "50.00" }] };

    const { glosses } = await service.getStatementReport({ stmId: 40, scope: OWN });

    expect(glosses).toMatchObject({ raisedValue: "70.00", releasedValue: "50.00" });
  });
});
