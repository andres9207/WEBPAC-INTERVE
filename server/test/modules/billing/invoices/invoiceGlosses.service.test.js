import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Glosas de facturas (DEC-085): de la obra de su factura, con valor distinto
// de cero (con signo) y descripción; se levantan en un extracto de la obra y
// se liberan en otro posterior, con observación y la fecha del servidor.
// Abiertas se editan y se eliminan; liberadas solo se consultan. No en una
// factura anulada. Bajo el bloqueo factura → extractos y con bitácora.

const state = { invoice: null, gloss: null, ref: null, statements: {} };

const prismaMock = {
  tbl_invoices: { findUnique: jest.fn(async () => state.invoice) },
  tbl_invoice_glosses: {
    // Por clave de idempotencia (la búsqueda del reintento), la referencia previa al bloqueo, o la fila bloqueada.
    findUnique: jest.fn(async ({ where, select }) => {
      if (where.igl_idempotency_key) return null;
      return select ? state.ref : state.gloss;
    }),
    findMany: jest.fn(async () => []),
    create: jest.fn(async () => ({ igl_id: 50 })),
    update: jest.fn(),
  },
  tbl_statements: { findUnique: jest.fn(async ({ where }) => state.statements[where.stm_id] ?? null) },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));
const assertInvoiceVisible = jest.fn(async () => undefined);
jest.unstable_mockModule("../../../../src/modules/billing/invoices/invoices.service.js", () => ({ assertInvoiceVisible }));

const service = await import("../../../../src/modules/billing/invoices/invoiceGlosses.service.js");
const { todayDateOnly } = await import("../../../../src/common/utils/term.utils.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const ctx = { useId: 9, ip: "1.1.1.1" };
const SCOPE = Object.freeze({ all: false, wrkId: 8 });
const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);
const lockedTables = () => prismaMock.$queryRaw.mock.calls.map((call) => call.slice(1).map((v) => v?.strings?.join("") ?? "").join(" "));

const statement = (wrkId, number, date) => ({ wrk_id: wrkId, stm_number: number, stm_date: new Date(`${date}T00:00:00Z`), sta_id: 1 });

const openRow = (overrides = {}) => ({
  igl_id: 50,
  inv_id: 70,
  wrk_id: 8,
  stm_id: 4,
  igl_code: "01",
  igl_value: "35000.00",
  igl_description: "Mayor valor cobrado",
  igl_release_stm_id: null,
  igl_release_date: null,
  igl_release_observation: null,
  sta_id: 1,
  ...overrides,
});

const create = (input) =>
  service.createGloss({ invId: 70, input: { stmId: 4, code: " 01 ", value: "35000", description: " Mayor valor cobrado ", ...input }, useBy: 9, scope: SCOPE, ctx, idempotencyKey: KEY });

beforeEach(() => {
  jest.clearAllMocks();
  state.invoice = { inv_id: 70, wrk_id: 8, inv_state: "APPROVED", sta_id: 1 };
  state.gloss = openRow();
  state.ref = { inv_id: 70, stm_id: 4, sta_id: 1 };
  state.statements = { 4: statement(8, "004", "2026-10-01"), 5: statement(8, "005", "2026-10-15"), 3: statement(8, "003", "2026-09-15"), 9: statement(2, "009", "2026-10-20") };
});

describe("levantar", () => {
  it("sobre una factura aprobada (no la bloquea), en un extracto de su obra, con bitácora", async () => {
    await expect(create()).resolves.toEqual({ message: "Glosa registrada correctamente", iglId: 50 });

    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_invoices/), expect.stringMatching(/tbl_statements/)]);
    const { data } = prismaMock.tbl_invoice_glosses.create.mock.calls[0][0];
    expect(data).toMatchObject({ inv_id: 70, wrk_id: 8, stm_id: 4, igl_code: "01", igl_description: "Mayor valor cobrado", sta_id: 1, igl_idempotency_key: KEY });
    expect(data.igl_value.toFixed(2)).toBe("35000.00");
    expect(auditRows().find((r) => r.aud_field === "igl_value")).toMatchObject({ aud_entity: "GLOSA_FACTURA", aud_new_value: "35000.00" });
  });

  it("admite un valor negativo, como en WebPAC, pero no cero (400)", async () => {
    await create({ value: "-961166" });
    expect(prismaMock.tbl_invoice_glosses.create.mock.calls[0][0].data.igl_value.toFixed(2)).toBe("-961166.00");

    await expect(create({ value: "0" })).rejects.toMatchObject({ statusCode: 400, message: "El valor de la glosa es requerido y no puede ser cero." });
  });

  it("un extracto de otra obra no se usa (400), y una factura anulada no admite glosas (409)", async () => {
    await expect(create({ stmId: 9 })).rejects.toMatchObject({ statusCode: 400, message: "El extracto 009 no es de la obra de la factura." });
    state.invoice.inv_state = "CANCELLED";
    await expect(create()).rejects.toMatchObject({ statusCode: 409, message: "La factura está anulada: no admite glosas nuevas." });
    expect(prismaMock.tbl_invoice_glosses.create).not.toHaveBeenCalled();
  });
});

describe("liberar", () => {
  const release = (releaseStmId, observation = "Se descontó en el extracto 005") =>
    service.releaseGloss({ iglId: 50, input: { releaseStmId, observation }, useBy: 9, scope: SCOPE, ctx });

  it("en un extracto posterior, con la fecha del servidor, bloqueando los dos extractos", async () => {
    await expect(release(5)).resolves.toEqual({ message: "Glosa liberada correctamente", iglId: 50 });

    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_invoices/), expect.stringMatching(/tbl_statements/)]);
    const { data } = prismaMock.tbl_invoice_glosses.update.mock.calls[0][0];
    expect(data).toMatchObject({ igl_release_stm_id: 5, igl_release_observation: "Se descontó en el extracto 005", igl_release_by: 9 });
    expect(data.igl_release_date.getTime()).toBe(todayDateOnly().getTime());
  });

  it("no en el mismo extracto ni en uno anterior (400)", async () => {
    await expect(release(4)).rejects.toMatchObject({ statusCode: 400, message: "La glosa se libera en un extracto posterior, no en el que se levantó." });
    await expect(release(3)).rejects.toMatchObject({ statusCode: 400, message: "El extracto 003 es anterior al 004, en que se levantó la glosa." });
    expect(prismaMock.tbl_invoice_glosses.update).not.toHaveBeenCalled();
  });

  it("una liberada solo se consulta: no se libera, edita ni elimina de nuevo (409)", async () => {
    state.gloss = openRow({ igl_release_stm_id: 5, igl_release_date: new Date("2026-10-20T00:00:00Z") });
    await expect(release(5)).rejects.toMatchObject({ statusCode: 409, message: "La glosa ya se liberó: solo se consulta." });
    await expect(service.deleteGloss({ iglId: 50, useBy: 9, scope: SCOPE, ctx })).rejects.toMatchObject({ statusCode: 409 });
    await expect(
      service.updateGloss({ iglId: 50, input: { stmId: 4, value: "1", description: "x" }, useBy: 9, scope: SCOPE, ctx })
    ).rejects.toMatchObject({ statusCode: 409 });
  });

  it("si la glosa cambió de extracto entre la lectura y el bloqueo, 409", async () => {
    state.gloss = openRow({ stm_id: 3 });
    await expect(release(5)).rejects.toMatchObject({ statusCode: 409, message: "La glosa cambió mientras se liberaba. Vuelve a intentarlo." });
  });
});

describe("editar y eliminar", () => {
  it("edita una abierta; sin cambios no escribe", async () => {
    const input = { stmId: 4, code: "01", value: "35000", description: "Mayor valor cobrado" };
    await expect(service.updateGloss({ iglId: 50, input, useBy: 9, scope: SCOPE, ctx })).resolves.toMatchObject({ message: "No hubo cambios en la glosa" });
    expect(prismaMock.tbl_invoice_glosses.update).not.toHaveBeenCalled();

    await service.updateGloss({ iglId: 50, input: { ...input, value: "36000" }, useBy: 9, scope: SCOPE, ctx });
    expect(auditRows().map((r) => [r.aud_field, r.aud_old_value, r.aud_new_value])).toEqual([["igl_value", "35000.00", "36000.00"]]);
  });

  it("elimina una abierta de forma lógica", async () => {
    await expect(service.deleteGloss({ iglId: 50, useBy: 9, scope: SCOPE, ctx })).resolves.toMatchObject({ message: "Glosa eliminada correctamente" });
    expect(prismaMock.tbl_invoice_glosses.update.mock.calls[0][0].data).toMatchObject({ sta_id: 3, igl_delete_by: 9 });
  });

  it("verifica el alcance por obra antes de todo", async () => {
    assertInvoiceVisible.mockRejectedValueOnce(Object.assign(new Error("No se encontró la factura."), { statusCode: 404 }));
    await expect(service.deleteGloss({ iglId: 50, useBy: 9, scope: SCOPE, ctx })).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });
});
