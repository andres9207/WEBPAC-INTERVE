import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Glosas de facturas (DEC-085): de la obra de su factura, con valor distinto
// de cero (con signo) y descripción; se levantan en un extracto y se liberan
// en otro, con observación y la fecha del servidor. El extracto es texto,
// como el de la factura (migración 0125). Abiertas se editan y se eliminan;
// liberadas solo se consultan. No en una factura anulada. Bajo el bloqueo de
// la factura y con bitácora.

const state = { invoice: null, gloss: null, ref: null };

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

const openRow = (overrides = {}) => ({
  igl_id: 50,
  inv_id: 70,
  wrk_id: 8,
  igl_statement: "Acta 4",
  igl_field: "value",
  igl_code: "01",
  igl_value: "35000.00",
  igl_description: "Mayor valor cobrado",
  igl_release_statement: null,
  igl_release_date: null,
  igl_release_observation: null,
  sta_id: 1,
  ...overrides,
});

const create = (input) =>
  service.createGloss({
    invId: 70,
    input: { statement: " Acta 4 ", field: "value", code: " 01 ", value: "35000", description: " Mayor valor cobrado ", ...input },
    useBy: 9,
    scope: SCOPE,
    ctx,
    idempotencyKey: KEY,
  });

beforeEach(() => {
  jest.clearAllMocks();
  state.invoice = { inv_id: 70, wrk_id: 8, inv_type: "NORMAL", inv_state: "APPROVED", sta_id: 1 };
  state.gloss = openRow();
  state.ref = { inv_id: 70, sta_id: 1 };
});

describe("levantar", () => {
  it("sobre una factura aprobada (no la bloquea), en el extracto escrito, bloqueando solo la factura y con bitácora", async () => {
    await expect(create()).resolves.toEqual({ message: "Glosa registrada correctamente", iglId: 50 });

    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_invoices/)]);
    const { data } = prismaMock.tbl_invoice_glosses.create.mock.calls[0][0];
    expect(data).toMatchObject({ inv_id: 70, wrk_id: 8, igl_statement: "Acta 4", igl_field: "value", igl_code: "01", igl_description: "Mayor valor cobrado", sta_id: 1, igl_idempotency_key: KEY });
    expect(data.igl_value.toFixed(2)).toBe("35000.00");
    expect(auditRows().find((r) => r.aud_field === "igl_value")).toMatchObject({ aud_entity: "GLOSA_FACTURA", aud_new_value: "35000.00" });
    expect(auditRows().find((r) => r.aud_field === "igl_statement")).toMatchObject({ aud_new_value: "Acta 4" });
  });

  it("admite un valor negativo, como en WebPAC, pero no cero (400)", async () => {
    await create({ value: "-961166" });
    expect(prismaMock.tbl_invoice_glosses.create.mock.calls[0][0].data.igl_value.toFixed(2)).toBe("-961166.00");

    await expect(create({ value: "0" })).rejects.toMatchObject({ statusCode: 400, message: "El valor de la glosa es requerido y no puede ser cero." });
  });

  it("sin extracto se admite; uno de más de 20 caracteres no (400); una factura anulada no admite glosas (409)", async () => {
    await create({ statement: "  " });
    expect(prismaMock.tbl_invoice_glosses.create.mock.calls[0][0].data.igl_statement).toBeNull();

    await expect(create({ statement: "x".repeat(21) })).rejects.toMatchObject({ statusCode: 400 });
    state.invoice.inv_state = "CANCELLED";
    await expect(create()).rejects.toMatchObject({ statusCode: 409, message: "La factura está anulada: no admite glosas nuevas." });
    expect(prismaMock.tbl_invoice_glosses.create).toHaveBeenCalledTimes(1);
  });
});

describe("campo de la factura", () => {
  it("obligatorio (400) y de los del Detalle de su tipo (400); Otro siempre", async () => {
    await expect(create({ field: " " })).rejects.toMatchObject({ statusCode: 400, message: expect.stringContaining("Elige el campo") });
    await expect(create({ field: "freight" })).rejects.toMatchObject({ statusCode: 400, message: expect.stringContaining("no tiene ese campo") });
    state.invoice.inv_type = "ADVANCE";
    await expect(create({ field: "vat" })).rejects.toMatchObject({ statusCode: 400 });
    await create({ field: "advance" });
    await create({ field: "other" });
    expect(prismaMock.tbl_invoice_glosses.create.mock.calls.map((c) => c[0].data.igl_field)).toEqual(["advance", "other"]);
  });

  it("al editar, el campo nuevo también se valida contra el tipo", async () => {
    const input = { statement: "Acta 4", field: "freight", code: "01", value: "35000", description: "Mayor valor cobrado" };
    await expect(service.updateGloss({ iglId: 50, input, useBy: 9, scope: SCOPE, ctx })).rejects.toMatchObject({ statusCode: 400 });
    expect(prismaMock.tbl_invoice_glosses.update).not.toHaveBeenCalled();
  });

  it("la negativa es una nota crédito", async () => {
    prismaMock.tbl_invoice_glosses.findMany.mockResolvedValueOnce([openRow(), openRow({ igl_id: 51, igl_value: "-1000.00", igl_field: "vat" })]);
    const rows = await service.listGlosses({ invId: 70, scope: SCOPE });
    expect(rows.map((r) => [r.fieldName, r.creditNote])).toEqual([
      ["VALOR", false],
      ["IVA", true],
    ]);
  });
});

describe("liberar", () => {
  const release = (releaseStatement, observation = "Se descontó en el acta 5") =>
    service.releaseGloss({ iglId: 50, input: { releaseStatement, observation }, useBy: 9, scope: SCOPE, ctx });

  it("en otro extracto, con la fecha del servidor, bloqueando la factura", async () => {
    await expect(release(" Acta 5 ")).resolves.toEqual({ message: "Glosa liberada correctamente", iglId: 50 });

    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_invoices/)]);
    const { data } = prismaMock.tbl_invoice_glosses.update.mock.calls[0][0];
    expect(data).toMatchObject({ igl_release_statement: "Acta 5", igl_release_observation: "Se descontó en el acta 5", igl_release_by: 9 });
    expect(data.igl_release_date.getTime()).toBe(todayDateOnly().getTime());
  });

  it("no en el mismo extracto, sin distinguir mayúsculas ni tildes (400), ni sin extracto (400)", async () => {
    const same = { statusCode: 400, message: "La glosa se libera en un extracto posterior, no en el que se levantó." };
    await expect(release("acta 4")).rejects.toMatchObject(same);
    state.gloss = openRow({ igl_statement: "Extracción 4" });
    await expect(release("EXTRACCION 4")).rejects.toMatchObject(same);
    await expect(release("  ")).rejects.toMatchObject({ statusCode: 400, message: "Escribe el extracto en que se libera la glosa." });
    expect(prismaMock.tbl_invoice_glosses.update).not.toHaveBeenCalled();
  });

  it("una glosa levantada sin extracto se libera en cualquiera", async () => {
    state.gloss = openRow({ igl_statement: null });
    await expect(release("Acta 4")).resolves.toMatchObject({ iglId: 50 });
  });

  it("una liberada solo se consulta: no se libera, edita ni elimina de nuevo (409)", async () => {
    state.gloss = openRow({ igl_release_statement: "Acta 5", igl_release_date: new Date("2026-10-20T00:00:00Z") });
    await expect(release("Acta 6")).rejects.toMatchObject({ statusCode: 409, message: "La glosa ya se liberó: solo se consulta." });
    await expect(service.deleteGloss({ iglId: 50, useBy: 9, scope: SCOPE, ctx })).rejects.toMatchObject({ statusCode: 409 });
    await expect(
      service.updateGloss({ iglId: 50, input: { statement: "Acta 4", field: "value", value: "1", description: "x" }, useBy: 9, scope: SCOPE, ctx })
    ).rejects.toMatchObject({ statusCode: 409 });
  });
});

describe("editar y eliminar", () => {
  it("edita una abierta; sin cambios no escribe", async () => {
    const input = { statement: "Acta 4", field: "value", code: "01", value: "35000", description: "Mayor valor cobrado" };
    await expect(service.updateGloss({ iglId: 50, input, useBy: 9, scope: SCOPE, ctx })).resolves.toMatchObject({ message: "No hubo cambios en la glosa" });
    expect(prismaMock.tbl_invoice_glosses.update).not.toHaveBeenCalled();

    await service.updateGloss({ iglId: 50, input: { ...input, value: "36000", statement: "Acta 5" }, useBy: 9, scope: SCOPE, ctx });
    expect(auditRows().map((r) => [r.aud_field, r.aud_old_value, r.aud_new_value])).toEqual([
      ["igl_statement", "Acta 4", "Acta 5"],
      ["igl_value", "35000.00", "36000.00"],
    ]);
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

describe("glosas de un extracto (reporte)", () => {
  it("las levantadas y las liberadas en la obra y el texto, de facturas no eliminadas", async () => {
    await service.statementGlosses({ wrkId: "8", number: "Acta 4" });
    const wheres = prismaMock.tbl_invoice_glosses.findMany.mock.calls.map((c) => c[0].where);
    expect(wheres[0]).toMatchObject({ wrk_id: 8, igl_statement: "Acta 4", sta_id: { not: 3 }, tbl_invoices: { sta_id: { not: 3 } } });
    expect(wheres[1]).toMatchObject({ wrk_id: 8, igl_release_statement: "Acta 4" });
  });
});
