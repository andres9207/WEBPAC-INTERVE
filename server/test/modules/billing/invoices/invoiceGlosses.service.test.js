import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Glosas de facturas (DEC-085): de la obra de su factura, con valor distinto
// de cero (con signo) y descripción; se levantan en un extracto (texto,
// migración 0125), sumando o no a su total, y se liberan con la factura que
// las corrige (migración 0127), con observación y la fecha del servidor.
// Abiertas se editan y se eliminan; liberadas solo se consultan. No en una
// factura anulada. Bajo el bloqueo de la factura y con bitácora.

const state = { invoice: null, releaser: null, gloss: null, ref: null };

const prismaMock = {
  // La factura de la glosa (70) o la que la libera (71).
  tbl_invoices: {
    findUnique: jest.fn(async ({ where }) => (where.inv_id === 71 ? state.releaser : state.invoice)),
    findMany: jest.fn(async () => []),
  },
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
const getInvoice = jest.fn();
jest.unstable_mockModule("../../../../src/modules/billing/invoices/invoices.service.js", () => ({ assertInvoiceVisible, getInvoice }));

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
  igl_affects_total: true,
  igl_description: "Mayor valor cobrado",
  igl_release_inv_id: null,
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
  state.invoice = { inv_id: 70, wrk_id: 8, prv_id: 77, inv_type: "NORMAL", inv_state: "APPROVED", inv_statement: "Acta 4", sta_id: 1 };
  state.releaser = { inv_id: 71, wrk_id: 8, prv_id: 77, inv_type: "ADVANCE", inv_state: "REGISTERED", inv_statement: "Acta 5", sta_id: 1 };
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

  it("suma al total del extracto salvo que se diga que no (un pendiente que llegará en otra factura)", async () => {
    await create();
    await create({ affectsTotal: false });
    expect(prismaMock.tbl_invoice_glosses.create.mock.calls.map((c) => c[0].data.igl_affects_total)).toEqual([true, false]);
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

describe("vista previa del valor y el % (DEC-092)", () => {
  const glossFields = [
    { value: "vat", label: "IVA", amount: "190.00" },
    { value: "other", label: "OTRO", amount: null },
  ];

  it("da el importe del campo y la glosa en valor y en %, en el alcance de la factura", async () => {
    getInvoice.mockResolvedValue({ glossFields });
    await expect(service.previewGloss({ invId: 7, field: "vat", pct: "10", scope: "S" })).resolves.toEqual({ amount: "190.00", value: "19.00", pct: "10.00" });
    expect(getInvoice).toHaveBeenCalledWith({ invId: 7, scope: "S" });
    await expect(service.previewGloss({ invId: 7, field: "other", value: "-5" })).resolves.toEqual({ amount: null, value: "-5.00", pct: null });
  });

  it("un campo que la factura no tiene responde 400", async () => {
    getInvoice.mockResolvedValue({ glossFields });
    await expect(service.previewGloss({ invId: 7, field: "freight", value: "1" })).rejects.toMatchObject({ statusCode: 400 });
  });
});

describe("liberar", () => {
  const release = (releaseInvId = 71, observation = "Llegó la nota crédito") =>
    service.releaseGloss({ iglId: 50, input: { releaseInvId, observation }, useBy: 9, scope: SCOPE, ctx });

  it("con otra factura del mismo proveedor y obra, con la fecha del servidor, bloqueando las dos facturas", async () => {
    await expect(release()).resolves.toEqual({ message: "Glosa liberada correctamente", iglId: 50 });

    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_invoices/)]);
    const { data } = prismaMock.tbl_invoice_glosses.update.mock.calls[0][0];
    expect(data).toMatchObject({ igl_release_inv_id: 71, igl_release_observation: "Llegó la nota crédito", igl_release_by: 9 });
    expect(data.igl_release_date.getTime()).toBe(todayDateOnly().getTime());
    expect(auditRows().find((r) => r.aud_field === "igl_release_inv_id")).toMatchObject({ aud_new_value: "71" });
  });

  it("no con su propia factura ni sin factura (400)", async () => {
    await expect(release(70)).rejects.toMatchObject({ statusCode: 400, message: "La glosa se libera con otra factura, no con la suya." });
    await expect(release(0)).rejects.toMatchObject({ statusCode: 400, message: "Elige la factura con la que se libera la glosa." });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("la factura que libera es del mismo proveedor y obra (400), no anulada (409) y existe (404)", async () => {
    state.releaser.prv_id = 78;
    await expect(release()).rejects.toMatchObject({ statusCode: 400, message: "La factura que libera la glosa debe ser del mismo proveedor y de la misma obra." });
    state.releaser.prv_id = 77;
    state.releaser.wrk_id = 9;
    await expect(release()).rejects.toMatchObject({ statusCode: 400 });
    state.releaser.wrk_id = 8;
    state.releaser.inv_state = "CANCELLED";
    await expect(release()).rejects.toMatchObject({ statusCode: 409, message: "La factura que libera la glosa está anulada." });
    state.releaser = { inv_id: 71, sta_id: 3 };
    await expect(release()).rejects.toMatchObject({ statusCode: 404, message: "No se encontró la factura que libera la glosa." });
    expect(prismaMock.tbl_invoice_glosses.update).not.toHaveBeenCalled();
  });

  it("el extracto no importa: la libera una factura del mismo extracto en que se levantó o una sin extracto", async () => {
    state.releaser.inv_statement = "acta 4";
    await expect(release()).resolves.toMatchObject({ iglId: 50 });
    state.gloss = openRow();
    state.releaser.inv_statement = null;
    await expect(release()).resolves.toMatchObject({ iglId: 50 });
  });

  it("una liberada solo se consulta: no se libera, edita ni elimina de nuevo (409)", async () => {
    state.gloss = openRow({ igl_release_inv_id: 71, igl_release_date: new Date("2026-10-20T00:00:00Z") });
    await expect(release()).rejects.toMatchObject({ statusCode: 409, message: "La glosa ya se liberó: solo se consulta." });
    await expect(service.deleteGloss({ iglId: 50, useBy: 9, scope: SCOPE, ctx })).rejects.toMatchObject({ statusCode: 409 });
    await expect(
      service.updateGloss({ iglId: 50, input: { statement: "Acta 4", field: "value", value: "1", description: "x" }, useBy: 9, scope: SCOPE, ctx })
    ).rejects.toMatchObject({ statusCode: 409 });
  });

  it("la liberada muestra la factura que la libera y su extracto", async () => {
    prismaMock.tbl_invoice_glosses.findMany.mockResolvedValueOnce([
      openRow({
        igl_release_inv_id: 71,
        igl_release_date: new Date("2026-10-20T00:00:00Z"),
        release_invoice: { inv_number: "NC-001", inv_type: "SIMPLE", inv_statement: "Acta 5" },
      }),
    ]);
    const [row] = await service.listGlosses({ invId: 70, scope: SCOPE });
    expect(row).toMatchObject({ open: false, releaseInvId: 71, releaseInvoiceNumber: "NC-001", releaseStatement: "Acta 5", affectsTotal: true });
  });
});

describe("facturas con que se libera (selector)", () => {
  it("del mismo proveedor y obra, de cualquier contrato y extracto, otras, no eliminadas ni anuladas, con búsqueda", async () => {
    state.ref = { inv_id: 70, sta_id: 1, igl_statement: "Acta 4" };
    prismaMock.tbl_invoices.findMany.mockResolvedValueOnce([
      { inv_id: 71, inv_number: "NC-001", inv_type: "SIMPLE", inv_statement: null, inv_date: new Date("2026-10-20T00:00:00Z"), tbl_contracts: null },
      // Del mismo extracto en que se levantó: también se elige.
      { inv_id: 72, inv_number: "F-9", inv_type: "NORMAL", inv_statement: "acta 4", inv_date: new Date("2026-10-01T00:00:00Z"), tbl_contracts: { ctr_number: "C-1" } },
    ]);
    const options = await service.selectReleaseInvoices({ iglId: 50, search: " NC ", scope: SCOPE });
    expect(options).toEqual([
      {
        value: 71,
        label: "NC-001 · Simple",
        description: "Sin extracto",
        number: "NC-001",
        typeName: "Simple",
        contractNumber: null,
        statement: null,
        date: "2026-10-20",
      },
      {
        value: 72,
        label: "F-9 · Normal · contrato C-1",
        description: "Extracto acta 4",
        number: "F-9",
        typeName: "Normal",
        contractNumber: "C-1",
        statement: "acta 4",
        date: "2026-10-01",
      },
    ]);
    expect(assertInvoiceVisible).toHaveBeenCalledWith({ scope: SCOPE }, 70);
    expect(prismaMock.tbl_invoices.findMany.mock.calls[0][0].where).toEqual({
      wrk_id: 8,
      prv_id: 77,
      inv_id: { not: 70 },
      sta_id: { not: 3 },
      inv_state: { not: "CANCELLED" },
      OR: [{ inv_number: { contains: "NC" } }, { inv_statement: { contains: "NC" } }],
    });
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
  it("las levantadas en el extracto y las liberadas por una factura suya, de la obra y de facturas no eliminadas", async () => {
    await service.statementGlosses({ wrkId: "8", number: "Acta 4" });
    const wheres = prismaMock.tbl_invoice_glosses.findMany.mock.calls.map((c) => c[0].where);
    expect(wheres[0]).toMatchObject({ wrk_id: 8, igl_statement: "Acta 4", sta_id: { not: 3 }, tbl_invoices: { sta_id: { not: 3 } } });
    // Las liberadas: por el extracto de la factura que las libera.
    expect(wheres[1]).toMatchObject({ wrk_id: 8, release_invoice: { is: { inv_statement: "Acta 4" } } });
  });

  it("cada glosa dice dónde, cuándo y quién la levantó, y con qué factura, cuándo y quién la liberó", async () => {
    prismaMock.tbl_invoice_glosses.findMany.mockResolvedValueOnce([]).mockResolvedValueOnce([
      openRow({
        igl_create_at: new Date(2026, 9, 27, 10, 30),
        created_by_user: { use_name: "Laura", use_last_name: "Gómez" },
        igl_release_inv_id: 71,
        igl_release_date: new Date("2026-10-28T00:00:00Z"),
        release_invoice: { inv_number: "F-10", inv_type: "NORMAL", inv_statement: "Acta 5" },
        released_by_user: { use_name: "Juan", use_last_name: "Ospina" },
        tbl_invoices: { inv_number: "F-1", pvt_id: 3, tbl_providers: { prv_name: "Cortinas" } },
      }),
    ]);
    const { released } = await service.statementGlosses({ wrkId: "8", number: "Acta 5" });
    expect(released[0]).toMatchObject({
      invoiceNumber: "F-1",
      statement: "Acta 4",
      raisedDate: "2026-10-27",
      createdByName: "Laura Gómez",
      releaseInvoiceNumber: "F-10",
      releaseStatement: "Acta 5",
      releaseDate: "2026-10-28",
      releasedByName: "Juan Ospina",
    });
  });
});
