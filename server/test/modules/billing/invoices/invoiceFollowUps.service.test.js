import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Seguimiento de facturas (DEC-076): se abre con fecha no futura y
// descripción, uno abierto por factura y nunca en una anulada; abierto se
// edita y se elimina (lógico); se cierra con observación y la fecha del
// servidor, y cerrado solo se consulta. Todo bajo el bloqueo de la factura,
// en el alcance por obra y con bitácora.

const state = { invoice: null, followUp: null, open: null, owner: null };

const prismaMock = {
  tbl_invoices: { findUnique: jest.fn(async () => state.invoice) },
  tbl_invoice_follow_ups: {
    // Por clave de idempotencia (la búsqueda del reintento), por dueño (factura del seguimiento) o la fila bloqueada.
    findUnique: jest.fn(async ({ where, select }) => {
      if (where.ifu_idempotency_key) return null;
      return select?.inv_id && Object.keys(select).length === 2 ? state.owner : state.followUp;
    }),
    findFirst: jest.fn(async () => state.open),
    findMany: jest.fn(async () => []),
    create: jest.fn(async () => ({ ifu_id: 40 })),
    update: jest.fn(),
  },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));
const assertInvoiceVisible = jest.fn(async () => undefined);
jest.unstable_mockModule("../../../../src/modules/billing/invoices/invoices.service.js", () => ({ assertInvoiceVisible }));

const service = await import("../../../../src/modules/billing/invoices/invoiceFollowUps.service.js");
const { todayDateOnly, dateOnlyText } = await import("../../../../src/common/utils/term.utils.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const ctx = { useId: 9, ip: "1.1.1.1" };
const SCOPE = Object.freeze({ all: false, wrkId: 8 });
const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);
const lockedTables = () => prismaMock.$queryRaw.mock.calls.map((call) => call.slice(1).map((v) => v?.strings?.join("") ?? "").join(" "));
const today = dateOnlyText(todayDateOnly());

const openRow = (overrides = {}) => ({
  ifu_id: 40,
  inv_id: 70,
  ifu_open_date: new Date("2026-10-01T00:00:00Z"),
  ifu_description: "Falta el soporte de la interventoría",
  ifu_close_date: null,
  ifu_close_observation: null,
  sta_id: 1,
  ...overrides,
});

beforeEach(() => {
  jest.clearAllMocks();
  state.invoice = { inv_id: 70, inv_state: "REGISTERED", sta_id: 1 };
  state.followUp = openRow();
  state.owner = { inv_id: 70, sta_id: 1 };
  state.open = null;
});

describe("abrir", () => {
  const open = (input = {}) =>
    service.openFollowUp({ invId: 70, input: { openDate: "2026-10-01", description: "  Falta el soporte  ", ...input }, useBy: 9, scope: SCOPE, ctx, idempotencyKey: KEY });

  it("crea el seguimiento bajo el bloqueo de la factura, con autor, clave y bitácora", async () => {
    await expect(open()).resolves.toEqual({ message: "Seguimiento abierto correctamente", ifuId: 40 });

    expect(assertInvoiceVisible).toHaveBeenCalledWith({ scope: SCOPE }, 70);
    expect(lockedTables().join(" ")).toContain("tbl_invoices");
    expect(prismaMock.tbl_invoice_follow_ups.create.mock.calls[0][0].data).toMatchObject({
      inv_id: 70,
      ifu_description: "Falta el soporte",
      sta_id: 1,
      ifu_create_by: 9,
      ifu_idempotency_key: KEY,
    });
    expect(auditRows().map((r) => r.aud_field)).toEqual(expect.arrayContaining(["inv_id", "ifu_open_date", "ifu_description"]));
    expect(auditRows()[0]).toMatchObject({ aud_entity: "SEGUIMIENTO_FACTURA", aud_operation: "CREAR" });
  });

  it("una sola abierta por factura (409), y ninguna en una anulada (409)", async () => {
    state.open = { ifu_id: 39 };
    await expect(open()).rejects.toMatchObject({ statusCode: 409 });
    state.open = null;
    state.invoice.inv_state = "CANCELLED";
    await expect(open()).rejects.toMatchObject({ statusCode: 409 });
    expect(prismaMock.tbl_invoice_follow_ups.create).not.toHaveBeenCalled();
  });

  it("la fecha de apertura no es futura ni inválida, y la descripción es obligatoria (400)", async () => {
    await expect(open({ openDate: "2999-01-01" })).rejects.toMatchObject({ statusCode: 400 });
    await expect(open({ openDate: "2026-02-30" })).rejects.toMatchObject({ statusCode: 400 });
    await expect(open({ description: "   " })).rejects.toMatchObject({ statusCode: 400 });
    expect(prismaMock.tbl_invoice_follow_ups.create).not.toHaveBeenCalled();
  });
});

describe("editar, cerrar y eliminar", () => {
  it("cerrar guarda la observación, la fecha del servidor y quién cerró; la fecha del cliente no existe", async () => {
    const result = await service.closeFollowUp({ ifuId: 40, input: { observation: " Soporte recibido " }, useBy: 9, scope: SCOPE, ctx });

    expect(result).toMatchObject({ ifuId: 40, closeDate: today });
    const { data } = prismaMock.tbl_invoice_follow_ups.update.mock.calls[0][0];
    expect(data).toMatchObject({ ifu_close_observation: "Soporte recibido", ifu_close_by: 9, ifu_update_by: 9 });
    expect(dateOnlyText(data.ifu_close_date)).toBe(today);
    expect(auditRows().map((r) => r.aud_field)).toEqual(["ifu_close_date", "ifu_close_observation"]);
  });

  it("cerrado solo se consulta: editar, cerrar y eliminar responden 409", async () => {
    state.followUp = openRow({ ifu_close_date: new Date("2026-10-05T00:00:00Z"), ifu_close_observation: "Listo" });
    const input = { openDate: "2026-10-01", description: "Otra" };
    await expect(service.updateFollowUp({ ifuId: 40, input, useBy: 9, scope: SCOPE, ctx })).rejects.toMatchObject({ statusCode: 409 });
    await expect(service.closeFollowUp({ ifuId: 40, input: { observation: "x" }, useBy: 9, scope: SCOPE, ctx })).rejects.toMatchObject({ statusCode: 409 });
    await expect(service.deleteFollowUp({ ifuId: 40, useBy: 9, scope: SCOPE, ctx })).rejects.toMatchObject({ statusCode: 409 });
    expect(prismaMock.tbl_invoice_follow_ups.update).not.toHaveBeenCalled();
  });

  it("editar uno abierto cambia fecha y descripción con bitácora; sin cambios no escribe; en una anulada, 409", async () => {
    await service.updateFollowUp({ ifuId: 40, input: { openDate: "2026-10-02", description: "Falta el soporte de la interventoría" }, useBy: 9, scope: SCOPE, ctx });
    expect(prismaMock.tbl_invoice_follow_ups.update.mock.calls[0][0].data).toMatchObject({ ifu_description: "Falta el soporte de la interventoría", ifu_update_by: 9 });
    expect(auditRows().map((r) => r.aud_field)).toEqual(["ifu_open_date"]);

    jest.clearAllMocks();
    await expect(
      service.updateFollowUp({ ifuId: 40, input: { openDate: "2026-10-01", description: "Falta el soporte de la interventoría" }, useBy: 9, scope: SCOPE, ctx })
    ).resolves.toMatchObject({ message: "No hubo cambios en el seguimiento" });
    expect(prismaMock.tbl_invoice_follow_ups.update).not.toHaveBeenCalled();

    state.invoice.inv_state = "CANCELLED";
    await expect(service.updateFollowUp({ ifuId: 40, input: { openDate: "2026-10-03", description: "x" }, useBy: 9, scope: SCOPE, ctx })).rejects.toMatchObject({
      statusCode: 409,
    });
  });

  it("eliminar es lógico, con autor y bitácora; también el abierto de una factura anulada", async () => {
    state.invoice.inv_state = "CANCELLED";
    await service.deleteFollowUp({ ifuId: 40, useBy: 9, scope: SCOPE, ctx });
    expect(prismaMock.tbl_invoice_follow_ups.update.mock.calls[0][0].data).toMatchObject({ sta_id: 3, ifu_delete_by: 9 });
    expect(auditRows()[0]).toMatchObject({ aud_operation: "ELIMINAR", aud_field: "sta_id" });
  });

  it("un seguimiento eliminado o inexistente, o de una factura fuera del alcance, da 404", async () => {
    state.owner = { inv_id: 70, sta_id: 3 };
    await expect(service.deleteFollowUp({ ifuId: 40, useBy: 9, scope: SCOPE, ctx })).rejects.toMatchObject({ statusCode: 404 });
    state.owner = null;
    await expect(service.closeFollowUp({ ifuId: 40, input: { observation: "x" }, useBy: 9, scope: SCOPE, ctx })).rejects.toMatchObject({ statusCode: 404 });

    state.owner = { inv_id: 70, sta_id: 1 };
    assertInvoiceVisible.mockRejectedValueOnce(Object.assign(new Error("No se encontró la factura."), { statusCode: 404 }));
    await expect(service.deleteFollowUp({ ifuId: 40, useBy: 9, scope: SCOPE, ctx })).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.tbl_invoice_follow_ups.update).not.toHaveBeenCalled();
  });
});

describe("listado", () => {
  it("los no eliminados de la factura, el más reciente primero, en el alcance", async () => {
    prismaMock.tbl_invoice_follow_ups.findMany.mockResolvedValueOnce([openRow({ created_by_user: { use_name: "Ana", use_last_name: "Ruiz" } })]);
    const rows = await service.listFollowUps({ invId: 70, scope: SCOPE });

    expect(assertInvoiceVisible).toHaveBeenCalledWith({ scope: SCOPE }, 70);
    const args = prismaMock.tbl_invoice_follow_ups.findMany.mock.calls[0][0];
    expect(args.where).toEqual({ inv_id: 70, sta_id: { not: 3 } });
    expect(args.orderBy).toEqual([{ ifu_open_date: "desc" }, { ifu_id: "desc" }]);
    expect(rows[0]).toMatchObject({ ifuId: 40, openDate: "2026-10-01", open: true, closeDate: null });
  });
});
