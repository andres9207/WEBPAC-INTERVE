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
  // Los filtros de fechas y de comprobante piden otra agrupación, con su condición en `AND`.
  tbl_invoices: {
    count: jest.fn(async () => 0),
    groupBy: jest.fn(async ({ where }) => {
      const extra = where.AND?.[1];
      if (extra?.inv_date) return state.dateGroups;
      if (extra?.inv_state) return state.voucherGroups;
      return state.invoiceGroups;
    }),
  },
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
  statementsWithGlosses: jest.fn(async () => state.glossedStatements),
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

  it("las facturas por proveedor, en orden alfabético, con su subtotal sin las anuladas y las glosas levantadas en el extracto sobre cada una", async () => {
    state.invoices = [
      invoice({ invId: 1, providerName: "Zeus" }),
      invoice({ invId: 2, providerName: "Acme", total: "50.00", value: "50.00", vat: null }),
      invoice({ invId: 3, providerName: "Zeus", state: "CANCELLED" }),
    ];
    state.glosses = {
      raised: [
        { iglId: 1, invId: 1, fields: [{ field: "value", value: "10.00" }], value: "10.00", affectsTotal: true },
        { iglId: 2, invId: 1, fields: [{ field: "other", value: "-3.00" }], value: "-3.00", creditNote: true, affectsTotal: false },
      ],
      released: [],
    };

    const report = await service.getStatementReport({ stmId: 40, scope: OWN });

    expect(report.byProvider.map((g) => [g.providerName, g.invIds])).toEqual([
      ["Acme", [2]],
      ["Zeus", [1, 3]],
    ]);
    // La anulada se lista en su grupo pero no suma.
    expect(report.byProvider[1].subtotal.amounts).toMatchObject({ value: "100.00", vat: "19.00", total: "119.00" });
    expect(report.byProvider[0].subtotal.amounts).toMatchObject({ value: "50.00", total: "50.00" });
    expect(report.invoices.map((i) => [i.invId, i.glossesValue])).toEqual([
      [1, "7.00"],
      [2, "0.00"],
      [3, "0.00"],
    ]);
    expect(report.byProvider[1].subtotal.glossesValue).toBe("7.00");
    expect(report.invoiceGlossesTotal).toBe("7.00");
  });

  it("total pagado: las facturas más las glosas levantadas en el extracto que suman; las liberadas no restan (DEC-085, 0127)", async () => {
    // Anticipo registrado por el máximo (5.052.000) y glosa por lo pagado de más (48.000).
    state.invoices = [invoice({ value: "5052000.00", vat: null, total: "5052000.00" })];
    const gloss = (iglId, lines, affectsTotal) => ({
      iglId,
      fields: lines.map(([field, value]) => ({ field, value })),
      value: lines.reduce((sum, [, value]) => sum + Number(value), 0).toFixed(2),
      affectsTotal,
    });
    state.glosses = {
      raised: [
        gloss(1, [["advance", "48000.00"]], true),
        gloss(2, [["other", "-30.00"]], true),
        // Un pendiente que llegará en otra factura: no suma.
        gloss(4, [["advance", "900.00"]], false),
        // Sobre dos campos (0129): cada campo suma lo suyo.
        gloss(5, [["advance", "100.00"], ["other", "-40.00"]], true),
      ],
      // La libera una factura de este extracto, que ya cuenta en el total.
      released: [gloss(3, [["advance", "50.00"]], true)],
    };

    const { glosses, totals } = await service.getStatementReport({ stmId: 40, scope: OWN });

    expect(glosses).toMatchObject({ raisedValue: "48930.00", releasedValue: "50.00" });
    // Por campo, en el orden del catálogo; `net` es lo que suma al total.
    expect(glosses.byField).toEqual([
      { field: "advance", name: "ANTICIPO", raised: "49000.00", released: "50.00", net: "48100.00" },
      { field: "other", name: "OTRO", raised: "-70.00", released: "0.00", net: "-70.00" },
    ]);
    expect(totals).toMatchObject({ total: "5052000.00", glossesNet: "48030.00", paidTotal: "5100030.00" });
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

  it("el total pagado de cada extracto suma sus glosas levantadas que suman, por obra y texto; las liberadas no restan", async () => {
    state.invoiceGroups = [group(8, "EXT-1", 1, "2026-09-01", "2026-09-01"), group(8, "EXT-2", 1, "2026-10-01", "2026-10-01")];
    state.works = [{ wrk_id: 8, wrk_code: "OB-8", wrk_name: "Vía" }];
    state.invoices = [invoice({}), invoice({ statement: "EXT-2", total: "70.00" })];
    state.pageGlosses = [
      { wrkId: 8, value: "10.00", affectsTotal: true, statement: "ext-1", releaseStatement: "EXT-2" },
      { wrkId: 8, value: "5.00", affectsTotal: true, statement: "EXT-1", releaseStatement: null },
      { wrkId: 8, value: "7.00", affectsTotal: false, statement: "EXT-1", releaseStatement: null },
      { wrkId: 9, value: "999.00", affectsTotal: true, statement: "EXT-1", releaseStatement: null },
    ];

    const page = await service.paginationStatementGroups({ scope: OWN, rows: 10, first: 0, sortField: "number", sortOrder: 1 });

    expect(page.results.map((g) => [g.number, g.total, g.glossesNet, g.paidTotal])).toEqual([
      ["EXT-1", "100.00", "15.00", "115.00"],
      ["EXT-2", "70.00", "0.00", "70.00"],
    ]);
  });

  it("ordena por número en forma natural y pagina", async () => {
    state.invoiceGroups = [group(8, "EXT-10", 1, "2026-09-01", "2026-09-01"), group(8, "EXT-9", 1, "2026-09-02", "2026-09-02")];
    const page = await service.paginationStatementGroups({ scope: OWN, rows: 1, first: 0, sortField: "number", sortOrder: 1 });
    expect(page).toMatchObject({ total: 2, totalPages: 2 });
    expect(page.results.map((g) => g.number)).toEqual(["EXT-9"]);
  });

  describe("filtros", () => {
    const numbers = (page) => page.results.map((g) => g.number);
    beforeEach(() => {
      state.invoiceGroups = [
        group(8, "EXT-2", 1, "2026-09-01", "2026-09-01"),
        group(8, "EXT-9", 2, "2026-09-05", "2026-10-05"),
        group(8, "EXT-10", 1, "2026-10-01", "2026-10-01"),
        group(8, "EXT-25", 1, "2026-10-20", "2026-10-20"),
      ];
      state.works = [{ wrk_id: 8, wrk_code: "OB-8", wrk_name: "Vía" }];
      state.invoices = [];
      state.pageGlosses = [];
    });
    const list = (filters) => service.paginationStatementGroups({ scope: OWN, rows: 10, first: 0, sortField: "number", sortOrder: 1, ...filters });

    it("rango de número, como se ordena: natural y sin distinguir mayúsculas", async () => {
      expect(numbers(await list({ numberFrom: "ext-9", numberTo: "EXT-10" }))).toEqual(["EXT-9", "EXT-10"]);
      expect(numbers(await list({ numberFrom: "EXT-10" }))).toEqual(["EXT-10", "EXT-25"]);
      expect(numbers(await list({ numberTo: " EXT-9 " }))).toEqual(["EXT-2", "EXT-9"]);
    });

    it("rango de fechas: los extractos con alguna factura en el rango, completos", async () => {
      state.dateGroups = [{ wrk_id: 8, inv_statement: "ext-9" }];
      const page = await list({ dateFrom: "2026-10-01", dateTo: "2026-10-10" });

      const dated = prismaMock.tbl_invoices.groupBy.mock.calls.find(([args]) => args.where.AND?.[1]?.inv_date)[0];
      expect(dated.where.AND[1]).toEqual({ inv_date: { gte: new Date("2026-10-01T00:00:00.000Z"), lte: new Date("2026-10-10T00:00:00.000Z") } });
      // El alcance va también en la agrupación por fechas.
      expect(dated.where.AND[0]).toMatchObject({ wrk_id: { in: [8] }, inv_statement: { not: null } });
      expect(numbers(page)).toEqual(["EXT-9"]);
      expect(page.results[0]).toMatchObject({ invoicesCount: 2, firstDate: "2026-09-05", lastDate: "2026-10-05" });
    });

    it("comprobante: con aprobadas sin comprobante, o sin ninguna", async () => {
      state.voucherGroups = [{ wrk_id: 8, inv_statement: "EXT-10" }];
      expect(numbers(await list({ voucher: "MISSING" }))).toEqual(["EXT-10"]);
      const unpaid = prismaMock.tbl_invoices.groupBy.mock.calls.find(([args]) => args.where.AND?.[1]?.inv_state)[0];
      expect(unpaid.where.AND[1]).toEqual({ inv_state: "APPROVED", OR: [{ inv_voucher_number: null }, { inv_voucher_number: "" }] });
      expect(numbers(await list({ voucher: "NONE" }))).toEqual(["EXT-2", "EXT-9", "EXT-25"]);
    });

    it("glosas: con glosas levantadas en él, o sin ninguna, por obra y texto", async () => {
      const { statementsWithGlosses } = await import("../../../../src/modules/billing/invoices/invoiceGlosses.service.js");
      state.glossedStatements = [
        { wrkId: 8, statement: "ext-2" },
        { wrkId: 9, statement: "EXT-25" },
      ];
      expect(numbers(await list({ gloss: "WITH" }))).toEqual(["EXT-2"]);
      expect(statementsWithGlosses).toHaveBeenLastCalledWith([8]);
      expect(numbers(await list({ gloss: "WITHOUT" }))).toEqual(["EXT-9", "EXT-10", "EXT-25"]);
    });

    it("los filtros se combinan, y el total es el de los filtrados", async () => {
      state.voucherGroups = [{ wrk_id: 8, inv_statement: "EXT-2" }, { wrk_id: 8, inv_statement: "EXT-25" }];
      const page = await list({ numberFrom: "EXT-9", voucher: "MISSING" });
      expect(numbers(page)).toEqual(["EXT-25"]);
      expect(page.total).toBe(1);
    });

    it("sin filtros no pide las agrupaciones de los filtros", async () => {
      const { statementsWithGlosses } = await import("../../../../src/modules/billing/invoices/invoiceGlosses.service.js");
      prismaMock.tbl_invoices.groupBy.mockClear();
      statementsWithGlosses.mockClear();
      await list({});
      expect(prismaMock.tbl_invoices.groupBy).toHaveBeenCalledTimes(1);
      expect(statementsWithGlosses).not.toHaveBeenCalled();
    });
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
