import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Extractos de la obra (DEC-084): número único en la obra, alcance por obra,
// las facturas y las glosas agrupadas por su texto de extracto (migraciones
// 0124 y 0125), y el reporte con los totales por menú, el chequeo de
// comprobantes de egreso y el total pagado con las glosas (DEC-085).

const state = { statement: null, duplicate: null, work: null, invoices: [], invoiceGroups: [], glosses: null, pageGlosses: [], replay: null };

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
  tbl_works: { findUnique: jest.fn(async () => state.work), findMany: jest.fn(async () => state.works) },
  tbl_invoices: { count: jest.fn(async () => 0), groupBy: jest.fn(async () => state.invoiceGroups) },
  tbl_invoice_glosses: { count: jest.fn(async () => 0) },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));
// Las facturas del extracto salen del service de facturas (los mismos importes del listado).
const statementInvoices = jest.fn(async () => state.invoices);
const statementsInvoices = jest.fn(async () => state.invoices);
jest.unstable_mockModule("../../../../src/modules/billing/invoices/invoices.service.js", () => ({ statementInvoices, statementsInvoices }));
// Las glosas del extracto (DEC-085), del service de glosas.
jest.unstable_mockModule("../../../../src/modules/billing/invoices/invoiceGlosses.service.js", () => ({
  statementGlosses: jest.fn(async () => state.glosses),
  statementsGlosses: jest.fn(async () => state.pageGlosses),
}));
const { statementGlosses } = await import("../../../../src/modules/billing/invoices/invoiceGlosses.service.js");

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
    invoiceGroups: [],
    works: [],
    glosses: { raised: [], released: [] },
    pageGlosses: [],
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
  it("las facturas y las glosas con su número no lo impiden: conservan su texto", async () => {
    await expect(service.deleteStatement({ stmId: 40, useBy: 9, scope: OWN, ctx })).resolves.toEqual({ message: "Extracto eliminado correctamente" });
    expect(prismaMock.tbl_invoices.count).not.toHaveBeenCalled();
    expect(prismaMock.tbl_invoice_glosses.count).not.toHaveBeenCalled();
  });

  it("lógica y con evidencia", async () => {
    await expect(service.deleteStatement({ stmId: 40, useBy: 9, scope: OWN, ctx })).resolves.toEqual({ message: "Extracto eliminado correctamente" });
    expect(prismaMock.tbl_statements.update.mock.calls[0][0].data).toMatchObject({ sta_id: 3, stm_delete_by: 9, stm_delete_at: expect.any(Date) });
  });

  it("uno de otra obra no se lee ni se elimina (404)", async () => {
    await expect(service.getStatement({ stmId: 40, scope: OTHER })).rejects.toMatchObject({ statusCode: 404 });
    await expect(service.deleteStatement({ stmId: 40, useBy: 9, scope: OTHER, ctx })).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });
});

describe("facturas del extracto: las de su obra con su número como texto", () => {
  it("el conteo cruza obra y texto sin distinguir mayúsculas ni tildes, como MySQL", async () => {
    state.invoiceGroups = [
      { wrk_id: 8, inv_statement: "001", _count: { _all: 2 } },
      { wrk_id: 8, inv_statement: "ÉXT-9", _count: { _all: 1 } },
      { wrk_id: 9, inv_statement: "001", _count: { _all: 5 } },
    ];
    prismaMock.tbl_statements.findFirst.mockImplementationOnce(async () => statementRow({ stm_number: "ext-9" }));

    await expect(service.getStatement({ stmId: 40, scope: OWN })).resolves.toMatchObject({ invoicesCount: 1 });
    await expect(service.getStatement({ stmId: 40, scope: OWN })).resolves.toMatchObject({ invoicesCount: 2 });
    expect(prismaMock.tbl_invoices.groupBy.mock.calls[0][0].where).toMatchObject({ wrk_id: { in: [8] }, inv_statement: { in: ["ext-9"] } });
  });

  it("el reporte pide las facturas y las glosas por obra y número", async () => {
    await service.getStatementReport({ stmId: 40, scope: OWN });
    expect(statementInvoices).toHaveBeenCalledWith({ wrkId: 8, number: "001" });
    expect(statementGlosses).toHaveBeenCalledWith({ wrkId: 8, number: "001" });
  });
});

describe("reporte (documento de alcance, punto 7)", () => {
  // Los importes del extracto (`amounts`) repiten los del listado, como los da statementAmounts.
  const invoice = (overrides) => {
    const row = { invId: 1, pvtId: 3, menuName: "Contrato mayor", number: "F-1", providerName: "Acme", value: "100.00", vat: "19.00", total: "119.00", state: "APPROVED", voucherNumber: "CE-1", ...overrides };
    return { ...row, amounts: { value: row.value, vat: row.vat, total: row.total } };
  };

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
    expect(report.totals).toEqual({ count: 3, value: "250.00", vat: "38.00", total: "288.00", glossesNet: "0.00", paidTotal: "288.00" });
    expect(report.cancelled).toBe(1);
    // Una columna por importe que alguna factura tiene, con su suma sin las anuladas.
    expect(report.amountColumns.map((c) => c.key)).toEqual(["value", "vat", "total"]);
    expect(report.amountTotals).toMatchObject({ value: "250.00", vat: "38.00", total: "288.00", advance: "0.00" });
    expect(report.withoutVoucher).toEqual([{ invId: 2, number: "F-2", providerName: "Acme", menuName: "Contrato mayor" }]);
  });

  it("total pagado: las facturas más las glosas levantadas en el extracto, menos las liberadas en él (DEC-085)", async () => {
    // Anticipo registrado por el máximo (5.052.000) y glosa por lo pagado de más (48.000).
    state.invoices = [invoice({ value: "5052000.00", vat: null, total: "5052000.00" })];
    state.glosses = {
      raised: [
        { iglId: 1, field: "advance", value: "48000.00" },
        { iglId: 2, field: "other", value: "-30.00", creditNote: true },
      ],
      released: [{ iglId: 3, field: "advance", value: "50.00" }],
    };

    const { glosses, totals } = await service.getStatementReport({ stmId: 40, scope: OWN });

    expect(glosses).toMatchObject({ raisedValue: "47970.00", releasedValue: "50.00" });
    // Por campo, en el orden del catálogo.
    expect(glosses.byField).toEqual([
      { field: "advance", name: "ANTICIPO", raised: "48000.00", released: "50.00", net: "47950.00" },
      { field: "other", name: "OTRO", raised: "-30.00", released: "0.00", net: "-30.00" },
    ]);
    expect(totals).toMatchObject({ total: "5052000.00", glossesNet: "47920.00", paidTotal: "5099920.00" });
  });
});

describe("extractos escritos en las facturas (solo lectura)", () => {
  const group = (wrkId, text, count, min, max) => ({
    wrk_id: wrkId,
    inv_statement: text,
    _count: { _all: count },
    _min: { inv_date: new Date(`${min}T00:00:00Z`) },
    _max: { inv_date: new Date(`${max}T00:00:00Z`) },
  });
  const invoice = (overrides) => ({ wrkId: 8, statement: "EXT-1", total: "100.00", value: "100.00", vat: null, state: "APPROVED", voucherNumber: "CE-1", ...overrides });

  it("agrupa por obra y texto en el alcance, el más reciente primero, con los totales de la página", async () => {
    state.invoiceGroups = [group(8, "EXT-1", 2, "2026-09-01", "2026-09-10"), group(8, "EXT-2", 1, "2026-10-01", "2026-10-01")];
    state.works = [{ wrk_id: 8, wrk_code: "OB-8", wrk_name: "Vía" }];
    state.invoices = [
      invoice({}),
      invoice({ statement: "ext-1", total: "50.00", voucherNumber: null }),
      invoice({ statement: "EXT-2", total: "70.00", state: "CANCELLED" }),
    ];

    const page = await service.paginationStatementGroups({ scope: OWN, rows: 10, first: 0 });

    expect(prismaMock.tbl_invoices.groupBy.mock.calls[0][0].where).toMatchObject({ wrk_id: { in: [8] }, inv_statement: { not: null }, sta_id: { not: 3 } });
    expect(page.total).toBe(2);
    expect(page.results.map((g) => g.number)).toEqual(["EXT-2", "EXT-1"]);
    expect(page.results[1]).toMatchObject({ workCode: "OB-8", invoicesCount: 2, firstDate: "2026-09-01", lastDate: "2026-09-10", total: "150.00", approvedCount: 2, withoutVoucher: 1 });
    // La anulada se cuenta en el grupo pero no suma.
    expect(page.results[0]).toMatchObject({ total: "0.00", approvedCount: 0 });
  });

  it("el total pagado de cada extracto suma sus glosas levantadas y resta las liberadas, por obra y texto", async () => {
    state.invoiceGroups = [group(8, "EXT-1", 1, "2026-09-01", "2026-09-01"), group(8, "EXT-2", 1, "2026-10-01", "2026-10-01")];
    state.works = [{ wrk_id: 8, wrk_code: "OB-8", wrk_name: "Vía" }];
    state.invoices = [invoice({}), invoice({ statement: "EXT-2", total: "70.00" })];
    state.pageGlosses = [
      { wrkId: 8, value: "10.00", statement: "ext-1", releaseStatement: "EXT-2" },
      { wrkId: 8, value: "5.00", statement: "EXT-1", releaseStatement: null },
      { wrkId: 9, value: "999.00", statement: "EXT-1", releaseStatement: null },
    ];

    const page = await service.paginationStatementGroups({ scope: OWN, rows: 10, first: 0, sortField: "number", sortOrder: 1 });

    expect(page.results.map((g) => [g.number, g.total, g.glossesNet, g.paidTotal])).toEqual([
      ["EXT-1", "100.00", "15.00", "115.00"],
      ["EXT-2", "70.00", "-10.00", "60.00"],
    ]);
  });

  it("ordena por número en forma natural y pagina", async () => {
    state.invoiceGroups = [group(8, "EXT-10", 1, "2026-09-01", "2026-09-01"), group(8, "EXT-9", 1, "2026-09-02", "2026-09-02")];
    const page = await service.paginationStatementGroups({ scope: OWN, rows: 1, first: 0, sortField: "number", sortOrder: 1 });
    expect(page).toMatchObject({ total: 2, totalPages: 2 });
    expect(page.results.map((g) => g.number)).toEqual(["EXT-9"]);
  });

  it("el reporte pide las facturas y las glosas de la obra con ese texto", async () => {
    state.invoices = [invoice({ date: "2026-09-10" }), invoice({ invId: 2, date: "2026-09-01" })];

    const report = await service.getStatementGroupReport({ wrkId: "8", number: " EXT-1 ", scope: OWN });

    expect(statementInvoices).toHaveBeenCalledWith({ wrkId: 8, number: "EXT-1" });
    expect(statementGlosses).toHaveBeenCalledWith({ wrkId: 8, number: "EXT-1" });
    expect(report.statement).toMatchObject({ number: "EXT-1", firstDate: "2026-09-01", lastDate: "2026-09-10", invoicesCount: 2 });
    expect(report.totals).toMatchObject({ count: 2, total: "200.00" });
  });

  it("sin facturas o fuera del alcance, 404", async () => {
    await expect(service.getStatementGroupReport({ wrkId: 8, number: "X", scope: OWN })).rejects.toMatchObject({ statusCode: 404 });
    state.invoices = [invoice({})];
    await expect(service.getStatementGroupReport({ wrkId: 8, number: "EXT-1", scope: OTHER })).rejects.toMatchObject({ statusCode: 404 });
  });
});
