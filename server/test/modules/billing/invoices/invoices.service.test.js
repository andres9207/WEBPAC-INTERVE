import { jest } from "@jest/globals";
import { Prisma } from "@prisma/client";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Facturas, fase A (ADR-0020, DEC-042): registrar según el tipo, aprobar y
// anular como transiciones declaradas bajo bloqueo, con historial, bitácora
// e idempotencia, y el estado del contrato decidiendo qué tipo se admite.
// Anticipo y amortización (DEC-044): I1 e I2 contra los saldos calculados
// bajo el bloqueo del contrato, y el permiso de ajustar la amortización.

const state = {
  invoice: null,
  contract: null,
  duplicate: null,
  reason: null,
  invoiceReplay: null,
  historyReplay: null,
  concepts: [],
  advanceSum: null,
  amortizedSum: null,
};

const D = (value) => new Prisma.Decimal(value);

// Ejemplo de ADR-0024: B = 120.000.000, A = 32.000.000 (≈ 26,67 %).
const concept = (directCost, advancePct) => ({
  ccp_direct_cost: D(directCost),
  ccp_admin_pct: D(0),
  ccp_contingency_pct: D(0),
  ccp_profit_pct: D(0),
  ccp_vat_pct: D(19),
  ccp_advance_pct: D(advancePct),
  ccp_retention_pct: D(0),
  sta_id: 1,
});
const CONCEPTS = [concept("100000000", 30), concept("20000000", 10)];

const prismaMock = {
  tbl_invoices: {
    findUnique: jest.fn(async ({ where }) => (where.inv_idempotency_key ? state.invoiceReplay : state.invoice)),
    findFirst: jest.fn(async () => state.duplicate),
    create: jest.fn(async () => ({ inv_id: 70 })),
    update: jest.fn(),
    findMany: jest.fn(async () => []),
    count: jest.fn(async () => 0),
    groupBy: jest.fn(async () => []),
  },
  tbl_invoice_status_history: { create: jest.fn(), findUnique: jest.fn(async () => state.historyReplay) },
  tbl_contracts: { findUnique: jest.fn(async () => state.contract), findMany: jest.fn(async () => []), findFirst: jest.fn() },
  tbl_works: { findUnique: jest.fn(), findMany: jest.fn(async () => []), findFirst: jest.fn() },
  tbl_work_stages: { findUnique: jest.fn() },
  tbl_work_providers: { findUnique: jest.fn() },
  tbl_reasons: { findUnique: jest.fn(async () => state.reason) },
  tbl_contract_concepts: { findMany: jest.fn(async () => state.concepts) },
  tbl_invoice_advance_details: {
    aggregate: jest.fn(async () => ({ _sum: { iad_value: state.advanceSum } })),
    upsert: jest.fn(),
  },
  tbl_invoice_liquidation_details: {
    aggregate: jest.fn(async () => ({ _sum: { ild_amortization: state.amortizedSum } })),
    upsert: jest.fn(),
  },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const service = await import("../../../../src/modules/billing/invoices/invoices.service.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const ctx = { useId: 9, ip: "1.1.1.1" };
const CAN_CANCEL = 87;
const CAN_CANCEL_APPROVED = 88;
const CAN_ADJUST = 89;
const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);
const lockedTables = () => prismaMock.$queryRaw.mock.calls.map((call) => call.slice(1).map((v) => v?.strings?.join("") ?? "").join(" "));

const contract = (overrides = {}) => ({
  ctr_id: 30,
  wrk_id: 8,
  prv_id: 77,
  wks_id: 11,
  ctr_start_date: new Date("2026-01-31T00:00:00Z"),
  ctr_state: "IN_PROGRESS",
  sta_id: 1,
  ...overrides,
});

const storedInvoice = (overrides = {}) => ({
  inv_id: 70,
  inv_type: "ADVANCE",
  prv_id: 77,
  wrk_id: 8,
  wks_id: null,
  ctr_id: 30,
  inv_number: "F-100",
  inv_date: new Date("2026-03-01T00:00:00Z"),
  inv_approval_date: null,
  inv_voucher_number: null,
  inv_statement: null,
  inv_description: null,
  inv_state: "REGISTERED",
  tbl_invoice_advance_details: { iad_value: D("10000000") },
  tbl_invoice_liquidation_details: null,
  ...overrides,
});

const storedLiquidation = (overrides = {}) =>
  storedInvoice({
    inv_type: "LIQUIDATION",
    tbl_invoice_advance_details: null,
    tbl_invoice_liquidation_details: {
      ild_value: D("90000000"),
      ild_amortization: D("24000000"),
      ild_default_amortization: D("24000000"),
      ild_default_pct: D("26.666667"),
      ild_applied_pct: D("26.666667"),
      ild_adjustment_observation: null,
    },
    ...overrides,
  });

const simpleInput = (overrides = {}) => ({
  type: "SIMPLE",
  wrkId: 8,
  prvId: 77,
  wksId: 11,
  number: " F-100 ",
  date: "2026-03-01",
  voucherNumber: "",
  statement: "",
  description: "",
  ...overrides,
});

const contractInput = (overrides = {}) => ({ type: "ADVANCE", ctrId: 30, number: "F-100", date: "2026-03-01", value: "10000000", ...overrides });
const liquidationInput = (overrides = {}) => contractInput({ type: "LIQUIDATION", value: "90000000", ...overrides });

const save = (input, invId = 0, granted = []) =>
  service.saveInvoice({ invId, input, useBy: 9, granted: new Set(granted), ctx, idempotencyKey: KEY });
const approve = (input = { approvalDate: "2026-03-05" }) => service.approveInvoice({ invId: 70, input, useBy: 9, ctx, idempotencyKey: KEY });
const cancel = (granted = [CAN_CANCEL], input = { reaId: 4, observation: "Registrada por error" }) =>
  service.cancelInvoice({ invId: 70, input, useBy: 9, granted: new Set(granted), ctx, idempotencyKey: KEY });

beforeEach(() => {
  jest.clearAllMocks();
  state.invoice = null;
  state.contract = contract();
  state.duplicate = null;
  state.invoiceReplay = null;
  state.historyReplay = null;
  state.reason = { rea_scope: "INVOICE_CANCEL", rea_name: "Error de registro", sta_id: 1 };
  state.concepts = CONCEPTS;
  state.advanceSum = null;
  state.amortizedSum = null;
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  prismaMock.tbl_works.findUnique.mockResolvedValue({ sta_id: 1, wrk_code: "OB-1" });
  prismaMock.tbl_work_stages.findUnique.mockResolvedValue({ wrk_id: 8, sta_id: 1, wks_name: "Estructura" });
  prismaMock.tbl_work_providers.findUnique.mockResolvedValue({ sta_id: 1, tbl_providers: { prv_name: "Aceros SA", sta_id: 1 } });
});

describe("registrar", () => {
  it("simple: bloquea obra → proveedor y nace registrada, con etapa y sin contrato, historial y bitácora", async () => {
    await expect(save(simpleInput({ state: "APPROVED", approvalDate: "2026-03-02" }))).resolves.toEqual({
      message: "Factura registrada correctamente",
      invId: 70,
    });

    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_works/), expect.stringMatching(/tbl_providers/)]);
    const { data } = prismaMock.tbl_invoices.create.mock.calls[0][0];
    expect(data).toMatchObject({
      inv_type: "SIMPLE",
      wrk_id: 8,
      prv_id: 77,
      wks_id: 11,
      ctr_id: null,
      inv_number: "F-100",
      inv_state: "REGISTERED",
      inv_create_by: 9,
      inv_idempotency_key: KEY,
    });
    expect(data).not.toHaveProperty("inv_approval_date");
    expect(prismaMock.tbl_invoice_status_history.create.mock.calls[0][0].data).toMatchObject({
      inv_id: 70,
      ish_from_state: null,
      ish_to_state: "REGISTERED",
      ish_origin: "AUTOMATIC",
    });
    expect(auditRows().find((r) => r.aud_field === "inv_state")).toMatchObject({ aud_entity: "FACTURA", aud_operation: "CREAR", aud_new_value: "REGISTERED" });
  });

  it("simple: la etapa es de la obra y el proveedor está asignado (400)", async () => {
    prismaMock.tbl_work_stages.findUnique.mockResolvedValue({ wrk_id: 99, sta_id: 1, wks_name: "Otra" });
    await expect(save(simpleInput())).rejects.toMatchObject({ statusCode: 400, message: "La etapa seleccionada no pertenece a la obra de la factura." });

    prismaMock.tbl_work_providers.findUnique.mockResolvedValue(null);
    await expect(save(simpleInput())).rejects.toMatchObject({ statusCode: 400, message: "El proveedor seleccionado no está asignado a la obra de la factura." });
    expect(prismaMock.tbl_invoices.create).not.toHaveBeenCalled();
  });

  it("de contrato: bloquea el contrato y toma obra y proveedor de él, no del cliente", async () => {
    await save(contractInput({ wrkId: 999, prvId: 999, wksId: 999 }));

    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_contracts/)]);
    expect(prismaMock.tbl_invoices.create.mock.calls[0][0].data).toMatchObject({ inv_type: "ADVANCE", ctr_id: 30, wrk_id: 8, prv_id: 77, wks_id: null });
  });

  it("el estado del contrato decide el tipo: anticipo en ejecución, liquidación en liquidación (409 si no)", async () => {
    state.contract = contract({ ctr_state: "IN_LIQUIDATION" });
    await expect(save(contractInput())).rejects.toMatchObject({ statusCode: 409, message: expect.stringMatching(/anticipo/) });
    await expect(save(liquidationInput())).resolves.toMatchObject({ invId: 70 });
    await expect(save(contractInput({ type: "RETENTION_REFUND" }))).resolves.toMatchObject({ invId: 70 });

    state.contract = contract({ ctr_state: "SUSPENDED" });
    await expect(save(contractInput())).rejects.toMatchObject({ statusCode: 409 });
    state.contract = contract({ ctr_state: "IN_PROGRESS" });
    await expect(save(liquidationInput())).rejects.toMatchObject({ statusCode: 409 });
  });

  it("el número es único por proveedor, también contra una anulada (409)", async () => {
    state.duplicate = { inv_id: 60, inv_state: "CANCELLED" };
    await expect(save(contractInput())).rejects.toMatchObject({
      statusCode: 409,
      message: "Ya existe una factura con el número F-100 para este proveedor (anulada: el número sigue ocupado).",
    });
    expect(prismaMock.tbl_invoices.findFirst.mock.calls[0][0].where).toEqual({ prv_id: 77, inv_number: "F-100" });
  });

  it("fecha futura o anterior al inicio del contrato (400)", async () => {
    await expect(save(contractInput({ date: "2999-01-01" }))).rejects.toMatchObject({ statusCode: 400 });
    await expect(save(contractInput({ date: "2026-01-01" }))).rejects.toMatchObject({ statusCode: 400, message: expect.stringMatching(/inicio del contrato/) });
  });

  it("el reintento con la misma clave devuelve la factura creada", async () => {
    const first = await save(contractInput());
    const { inv_idempotency_hash: hash } = prismaMock.tbl_invoices.create.mock.calls[0][0].data;
    state.invoiceReplay = { inv_id: 70, inv_idempotency_hash: hash, inv_create_by: 9 };
    prismaMock.tbl_invoices.create.mockClear();

    await expect(save(contractInput())).resolves.toEqual(first);
    expect(prismaMock.tbl_invoices.create).not.toHaveBeenCalled();
  });
});

describe("editar", () => {
  it("registrada: cambia los datos del documento con bitácora", async () => {
    state.invoice = storedInvoice();
    await expect(save(contractInput({ number: "F-101" }), 70)).resolves.toMatchObject({ invId: 70 });
    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_contracts/), expect.stringMatching(/tbl_invoices/)]);
    expect(prismaMock.tbl_invoices.update.mock.calls[0][0].data).toMatchObject({ inv_number: "F-101" });
    expect(prismaMock.tbl_invoices.update.mock.calls[0][0].data).not.toHaveProperty("ctr_id");
    expect(auditRows()[0]).toMatchObject({ aud_field: "inv_number", aud_old_value: "F-100", aud_new_value: "F-101" });
  });

  it("aprobada: solo extracto y descripción (409 para lo demás)", async () => {
    state.invoice = storedInvoice({ inv_state: "APPROVED", inv_approval_date: new Date("2026-03-05T00:00:00Z") });
    await expect(save(contractInput({ number: "F-101" }), 70)).rejects.toMatchObject({ statusCode: 409, message: expect.stringMatching(/extracto y la descripción/) });
    await expect(save(contractInput({ description: "Soporte del pago" }), 70)).resolves.toMatchObject({ invId: 70 });
    expect(prismaMock.tbl_invoices.update).toHaveBeenCalledTimes(1);
  });

  it("anulada: no admite cambios (409)", async () => {
    state.invoice = storedInvoice({ inv_state: "CANCELLED" });
    await expect(save(contractInput({ description: "x" }), 70)).rejects.toMatchObject({ statusCode: 409 });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();
  });
});

describe("aprobar", () => {
  beforeEach(() => {
    state.invoice = storedInvoice();
  });

  it("bloquea contrato → factura, fija estado y fecha, con historial y clave", async () => {
    await expect(approve({ approvalDate: "2026-03-05", observation: " Revisada " })).resolves.toEqual({ message: "Factura aprobada correctamente", invId: 70 });

    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_contracts/), expect.stringMatching(/tbl_invoices/)]);
    const { data } = prismaMock.tbl_invoices.update.mock.calls[0][0];
    expect(data.inv_state).toBe("APPROVED");
    expect(data.inv_approval_date.toISOString()).toBe("2026-03-05T00:00:00.000Z");
    expect(prismaMock.tbl_invoice_status_history.create.mock.calls[0][0].data).toMatchObject({
      ish_from_state: "REGISTERED",
      ish_to_state: "APPROVED",
      ish_origin: "MANUAL",
      ish_observation: "Revisada",
      ish_idempotency_key: KEY,
    });
    expect(auditRows().map((r) => r.aud_field)).toEqual(["inv_state", "inv_approval_date", "advance_invoiced"]);
  });

  it("una ya aprobada no se aprueba de nuevo (409)", async () => {
    state.invoice = storedInvoice({ inv_state: "APPROVED", inv_approval_date: new Date("2026-03-05T00:00:00Z") });
    await expect(approve()).rejects.toMatchObject({ statusCode: 409 });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();
  });

  it("revalida bajo bloqueo el estado del contrato (409 si ya no admite el tipo)", async () => {
    state.contract = contract({ ctr_state: "SUSPENDED" });
    await expect(approve()).rejects.toMatchObject({ statusCode: 409, message: expect.stringMatching(/contrato en ejecución/) });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();
  });

  it("la fecha de aprobación no es anterior a la factura ni futura (400)", async () => {
    await expect(approve({ approvalDate: "2026-02-28" })).rejects.toMatchObject({ statusCode: 400 });
    await expect(approve({ approvalDate: "2999-01-01" })).rejects.toMatchObject({ statusCode: 400 });
  });

  it("simple: bloquea obra → proveedor → factura, sin contrato", async () => {
    state.invoice = storedInvoice({ inv_type: "SIMPLE", ctr_id: null, wks_id: 11 });
    await approve();
    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_works/), expect.stringMatching(/tbl_providers/), expect.stringMatching(/tbl_invoices/)]);
  });

  it("el reintento con la misma clave devuelve el mismo resultado sin aprobar dos veces", async () => {
    await approve();
    const { ish_idempotency_hash: hash } = prismaMock.tbl_invoice_status_history.create.mock.calls[0][0].data;
    state.historyReplay = { inv_id: 70, ish_idempotency_hash: hash, ish_create_by: 9 };
    prismaMock.tbl_invoices.update.mockClear();

    await expect(approve()).resolves.toEqual({ message: "Factura aprobada correctamente", invId: 70 });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();
  });
});

describe("anular", () => {
  it("una registrada, con motivo de anulación y observación; bloquea contrato → factura → motivo", async () => {
    state.invoice = storedInvoice();
    await expect(cancel()).resolves.toEqual({ message: "Factura anulada correctamente", invId: 70 });

    expect(lockedTables()).toEqual([
      expect.stringMatching(/tbl_contracts/),
      expect.stringMatching(/tbl_invoices/),
      expect.stringMatching(/tbl_reasons/),
    ]);
    expect(prismaMock.tbl_invoices.update.mock.calls[0][0].data).toMatchObject({ inv_state: "CANCELLED" });
    expect(prismaMock.tbl_invoice_status_history.create.mock.calls[0][0].data).toMatchObject({
      ish_to_state: "CANCELLED",
      rea_id: 4,
      ish_observation: "Registrada por error",
    });
  });

  it("una aprobada exige el permiso reforzado (403 sin él) y conserva su fecha de aprobación", async () => {
    state.invoice = storedInvoice({ inv_state: "APPROVED", inv_approval_date: new Date("2026-03-05T00:00:00Z") });
    state.advanceSum = D("10000000");
    await expect(cancel([CAN_CANCEL])).rejects.toMatchObject({ statusCode: 403 });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();

    await expect(cancel([CAN_CANCEL, CAN_CANCEL_APPROVED])).resolves.toMatchObject({ invId: 70 });
    expect(prismaMock.tbl_invoices.update.mock.calls[0][0].data).not.toHaveProperty("inv_approval_date");
  });

  it("una anulada es terminal (409)", async () => {
    state.invoice = storedInvoice({ inv_state: "CANCELLED" });
    await expect(cancel([CAN_CANCEL, CAN_CANCEL_APPROVED])).rejects.toMatchObject({ statusCode: 409 });
  });

  it("el motivo debe ser de anulación de factura (400) y la observación es obligatoria", async () => {
    state.invoice = storedInvoice();
    state.reason = { rea_scope: "SUSPENSION", rea_name: "Falta de material", sta_id: 1 };
    await expect(cancel()).rejects.toMatchObject({ statusCode: 400, message: "El motivo seleccionado no es de anulación de factura." });
    await expect(cancel([CAN_CANCEL], { reaId: 4, observation: "  " })).rejects.toMatchObject({ statusCode: 400 });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();
  });

  it("una factura que no existe responde 404", async () => {
    await expect(cancel()).rejects.toMatchObject({ statusCode: 404 });
  });
});

describe("editar una simple", () => {
  it("sin proveedor ni etapa en la petición, conserva los que tenía", async () => {
    state.invoice = storedInvoice({ inv_type: "SIMPLE", ctr_id: null, wks_id: 11 });
    await expect(save({ number: "F-100", date: "2026-03-01", description: "Nota" }, 70)).resolves.toMatchObject({ invId: 70 });
    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_works/), expect.stringMatching(/tbl_providers/), expect.stringMatching(/tbl_invoices/)]);
    expect(prismaMock.tbl_invoices.update.mock.calls[0][0].data).toMatchObject({ prv_id: 77, wks_id: 11, inv_description: "Nota" });
  });

  it("cambia de proveedor solo a uno asignado a la obra", async () => {
    state.invoice = storedInvoice({ inv_type: "SIMPLE", ctr_id: null, wks_id: 11 });
    prismaMock.tbl_work_providers.findUnique.mockResolvedValue(null);
    await expect(save(simpleInput({ prvId: 78 }), 70)).rejects.toMatchObject({ statusCode: 400 });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();
  });
});

describe("listado", () => {
  test("filtra por tipo de factura, y las pestañas cuentan dentro del tipo", async () => {
    prismaMock.tbl_invoices.groupBy.mockResolvedValueOnce([{ inv_state: "APPROVED", _count: { _all: 3 } }]);
    const result = await service.paginationInvoices({ type: "ADVANCE", state: "APPROVED", rows: 10, first: 0 });

    expect(prismaMock.tbl_invoices.findMany.mock.calls.at(-1)[0].where).toMatchObject({ inv_type: "ADVANCE", inv_state: "APPROVED" });
    const countWhere = prismaMock.tbl_invoices.groupBy.mock.calls.at(-1)[0].where;
    expect(countWhere).toMatchObject({ inv_type: "ADVANCE" });
    expect(countWhere).not.toHaveProperty("inv_state");
    expect(result.statusCounts).toEqual({ APPROVED: 3 });
  });

  test("sin tipo no filtra por tipo", async () => {
    await service.paginationInvoices({ type: "", rows: 10, first: 0 });
    expect(prismaMock.tbl_invoices.findMany.mock.calls.at(-1)[0].where).not.toHaveProperty("inv_type");
  });

  test("filtra por número, comprobante, contrato y rangos de fecha, también en los conteos (DEC-048)", async () => {
    await service.paginationInvoices({
      number: "F-1",
      voucherNumber: " CE-9 ",
      contractNumber: "C-001",
      providerName: "acer",
      dateFrom: "2026-03-01",
      approvalDateTo: "2026-03-31",
      state: "APPROVED",
    });

    const expected = [
      { inv_number: { contains: "F-1" } },
      { inv_voucher_number: { contains: "CE-9" } },
      { tbl_contracts: { ctr_number: { contains: "C-001" } } },
      { tbl_providers: { prv_name: { contains: "acer" } } },
      { inv_date: { gte: new Date("2026-03-01T00:00:00Z") } },
      { inv_approval_date: { lte: new Date("2026-03-31T00:00:00Z") } },
    ];
    expect(prismaMock.tbl_invoices.findMany.mock.calls.at(-1)[0].where.AND).toEqual(expected);
    expect(prismaMock.tbl_invoices.groupBy.mock.calls.at(-1)[0].where.AND).toEqual(expected);
  });
});

describe("selectores del formulario", () => {
  const contractRow = (ctrId) => ({
    ctr_id: ctrId,
    ctr_number: `C-${ctrId}`,
    ctr_name: "Suministro",
    ctr_state: "IN_PROGRESS",
    tbl_providers: { prv_name: "Ferretería" },
    tbl_works: { wrk_code: "OB-1", wrk_name: "Puente" },
  });

  test("busca contratos por número, nombre, proveedor y obra, solo en los estados que admiten el tipo", async () => {
    await service.selectInvoiceContracts({ type: "ADVANCE", search: " ferre " });
    const { where } = prismaMock.tbl_contracts.findMany.mock.calls.at(-1)[0];
    expect(where.ctr_state).toEqual({ in: ["IN_PROGRESS"] });
    expect(where.OR).toEqual(
      expect.arrayContaining([
        { ctr_number: { contains: "ferre" } },
        { tbl_providers: { prv_name: { contains: "ferre" } } },
        { tbl_works: { wrk_name: { contains: "ferre" } } },
      ])
    );
  });

  test("el contrato ya elegido vuelve aunque la búsqueda lo deje fuera, con el mismo filtro de estado", async () => {
    prismaMock.tbl_contracts.findMany.mockResolvedValueOnce([contractRow(31)]);
    prismaMock.tbl_contracts.findFirst.mockResolvedValueOnce(contractRow(30));
    const result = await service.selectInvoiceContracts({ type: "ADVANCE", search: "x", includeCtrId: "30" });
    const { where } = prismaMock.tbl_contracts.findFirst.mock.calls.at(-1)[0];
    expect(where).toMatchObject({ ctr_id: 30, ctr_state: { in: ["IN_PROGRESS"] } });
    expect(result.map((o) => o.value)).toEqual([30, 31]);
  });

  test("no repite el contrato elegido si ya está en la lista, ni lo agrega si su estado no admite el tipo", async () => {
    prismaMock.tbl_contracts.findFirst.mockClear();
    prismaMock.tbl_contracts.findMany.mockResolvedValueOnce([contractRow(30)]);
    expect((await service.selectInvoiceContracts({ type: "ADVANCE", includeCtrId: 30 })).map((o) => o.value)).toEqual([30]);
    expect(prismaMock.tbl_contracts.findFirst).not.toHaveBeenCalled();

    prismaMock.tbl_contracts.findFirst.mockResolvedValueOnce(null);
    expect(await service.selectInvoiceContracts({ type: "LIQUIDATION", includeCtrId: 30 })).toEqual([]);
  });

  test("la obra ya elegida vuelve aunque la búsqueda la deje fuera, solo si está activa", async () => {
    prismaMock.tbl_works.findFirst.mockResolvedValueOnce({ wrk_id: 8, wrk_code: "OB-8", wrk_name: "Vía" });
    const result = await service.selectInvoiceWorks({ search: "zzz", includeWrkId: "8" });
    expect(prismaMock.tbl_works.findFirst.mock.calls.at(-1)[0].where).toEqual({ wrk_id: 8, sta_id: 1 });
    expect(result).toEqual([{ value: 8, label: "OB-8 — Vía" }]);
  });
});

describe("anticipo y amortización (DEC-044)", () => {
  const advanceUpsert = () => prismaMock.tbl_invoice_advance_details.upsert.mock.calls[0][0];
  const liquidationUpsert = () => prismaMock.tbl_invoice_liquidation_details.upsert.mock.calls[0][0];
  const approved = { inv_state: "APPROVED", inv_approval_date: new Date("2026-03-05T00:00:00Z") };

  it("los saldos suman solo facturas aprobadas del contrato y sus conceptos", async () => {
    await save(contractInput());
    expect(prismaMock.tbl_invoice_advance_details.aggregate.mock.calls[0][0].where).toEqual({
      tbl_invoices: { ctr_id: 30, inv_type: "ADVANCE", inv_state: "APPROVED" },
    });
    expect(prismaMock.tbl_contract_concepts.findMany.mock.calls[0][0].where).toEqual({ ctr_id: 30 });
  });

  it("anticipo: guarda el valor en el detalle, con bitácora", async () => {
    await expect(save(contractInput({ value: "12000000" }))).resolves.toMatchObject({ invId: 70 });
    expect(advanceUpsert().create).toMatchObject({ inv_id: 70, iad_create_by: 9 });
    expect(advanceUpsert().create.iad_value.toFixed(2)).toBe("12000000.00");
    expect(auditRows().find((r) => r.aud_field === "iad_value")).toMatchObject({ aud_new_value: "12000000.00" });
  });

  it("anticipo: el valor es obligatorio y mayor que cero (400)", async () => {
    await expect(save(contractInput({ value: "" }))).rejects.toMatchObject({ statusCode: 400 });
    await expect(save(contractInput({ value: "0" }))).rejects.toMatchObject({ statusCode: 400 });
    expect(prismaMock.tbl_invoices.create).not.toHaveBeenCalled();
  });

  it("I1 al registrar: el anticipo no supera lo que queda por facturar (409)", async () => {
    state.advanceSum = D("20000000");
    await expect(save(contractInput({ value: "12000000.01" }))).rejects.toMatchObject({
      statusCode: 409,
      message: expect.stringContaining("anticipo por facturar (12000000.00)"),
    });
    await expect(save(contractInput({ value: "12000000" }))).resolves.toMatchObject({ invId: 70 });
  });

  it("I1 al aprobar: revalida bajo bloqueo; otra aprobación pudo consumir el saldo (409)", async () => {
    state.invoice = storedInvoice();
    state.advanceSum = D("25000000");
    await expect(approve()).rejects.toMatchObject({ statusCode: 409, message: expect.stringContaining("supera el anticipo por facturar") });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();
  });

  it("liquidación sin amortización: usa la de por defecto, mín(VALOR × A / B, pendiente), y cierra el saldo en cero", async () => {
    state.contract = contract({ ctr_state: "IN_LIQUIDATION" });
    state.advanceSum = D("32000000");
    await save(liquidationInput());
    const first = liquidationUpsert().create;
    expect(first.ild_amortization.toFixed(2)).toBe("24000000.00");
    expect(first.ild_default_amortization.toFixed(2)).toBe("24000000.00");
    expect(first.ild_default_pct.toFixed(6)).toBe("26.666667");
    expect(first.ild_adjustment_observation).toBeNull();

    prismaMock.tbl_invoice_liquidation_details.upsert.mockClear();
    state.amortizedSum = D("24000000");
    await save(liquidationInput({ value: "30000000" }));
    expect(liquidationUpsert().create.ild_amortization.toFixed(2)).toBe("8000000.00");
  });

  it("el valor por defecto nunca supera el pendiente por amortizar", async () => {
    state.contract = contract({ ctr_state: "IN_LIQUIDATION" });
    state.advanceSum = D("10000000");
    await save(liquidationInput());
    expect(liquidationUpsert().create.ild_amortization.toFixed(2)).toBe("10000000.00");
  });

  it("ajustar la amortización exige el permiso (403) y una observación (400)", async () => {
    state.contract = contract({ ctr_state: "IN_LIQUIDATION" });
    state.advanceSum = D("32000000");
    await expect(save(liquidationInput({ amortization: "20000000" }))).rejects.toMatchObject({
      statusCode: 403,
      message: expect.stringContaining("24000000.00"),
    });
    await expect(save(liquidationInput({ amortization: "20000000" }), 0, [CAN_ADJUST])).rejects.toMatchObject({ statusCode: 400 });
    expect(prismaMock.tbl_invoices.create).not.toHaveBeenCalled();

    await expect(
      save(liquidationInput({ amortization: "20000000", amortizationObservation: " Acuerdo de pago " }), 0, [CAN_ADJUST])
    ).resolves.toMatchObject({ invId: 70 });
    expect(liquidationUpsert().create).toMatchObject({ ild_adjustment_observation: "Acuerdo de pago" });
    expect(liquidationUpsert().create.ild_applied_pct.toFixed(6)).toBe("22.222222");
  });

  it("enviar el valor por defecto no exige el permiso", async () => {
    state.contract = contract({ ctr_state: "IN_LIQUIDATION" });
    state.advanceSum = D("32000000");
    await expect(save(liquidationInput({ amortization: "24000000.00" }))).resolves.toMatchObject({ invId: 70 });
  });

  it("I2 al registrar: la amortización no supera el pendiente (409) ni el VALOR (400)", async () => {
    state.contract = contract({ ctr_state: "IN_LIQUIDATION" });
    state.advanceSum = D("32000000");
    state.amortizedSum = D("30000000");
    await expect(save(liquidationInput({ amortization: "2000000.01", amortizationObservation: "x" }), 0, [CAN_ADJUST])).rejects.toMatchObject({
      statusCode: 409,
      message: expect.stringContaining("pendiente por amortizar (2000000.00)"),
    });
    await expect(save(liquidationInput({ value: "100", amortization: "101", amortizationObservation: "x" }), 0, [CAN_ADJUST])).rejects.toMatchObject({
      statusCode: 400,
    });
  });

  it("I2 al aprobar: revalida la amortización guardada contra el pendiente vigente (409)", async () => {
    state.invoice = storedLiquidation();
    state.contract = contract({ ctr_state: "IN_LIQUIDATION" });
    state.advanceSum = D("32000000");
    state.amortizedSum = D("10000000");
    await expect(approve()).rejects.toMatchObject({ statusCode: 409, message: expect.stringContaining("pendiente por amortizar (22000000.00)") });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();

    state.amortizedSum = D("8000000");
    await expect(approve()).resolves.toMatchObject({ invId: 70 });
    expect(auditRows().find((r) => r.aud_field === "advance_amortized")).toMatchObject({ aud_old_value: "8000000.00", aud_new_value: "32000000.00" });
  });

  it("aprobar un anticipo sin importes (registrado en la fase A) responde 409", async () => {
    state.invoice = storedInvoice({ tbl_invoice_advance_details: null });
    await expect(approve()).rejects.toMatchObject({ statusCode: 409, message: expect.stringContaining("no tiene su valor registrado") });
  });

  it("I2 al anular: un anticipo aprobado ya amortizado no se anula (409); una liquidación aprobada sí", async () => {
    state.invoice = storedInvoice(approved);
    state.advanceSum = D("32000000");
    state.amortizedSum = D("24000000");
    await expect(cancel([CAN_CANCEL, CAN_CANCEL_APPROVED])).rejects.toMatchObject({ statusCode: 409, message: expect.stringContaining("ya fue amortizado") });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();

    state.amortizedSum = D("22000000");
    await expect(cancel([CAN_CANCEL, CAN_CANCEL_APPROVED])).resolves.toMatchObject({ invId: 70 });

    state.invoice = storedLiquidation(approved);
    state.amortizedSum = D("32000000");
    await expect(cancel([CAN_CANCEL, CAN_CANCEL_APPROVED])).resolves.toMatchObject({ invId: 70 });
  });

  it("editar una registrada revalida sus importes; una aprobada no los cambia (409)", async () => {
    state.invoice = storedInvoice();
    state.advanceSum = D("30000000");
    await expect(save(contractInput({ value: "2000000.01" }), 70)).rejects.toMatchObject({ statusCode: 409 });
    await expect(save(contractInput({ value: "2000000" }), 70)).resolves.toMatchObject({ invId: 70 });
    expect(advanceUpsert().update.iad_value.toFixed(2)).toBe("2000000.00");
    expect(auditRows().find((r) => r.aud_field === "iad_value")).toMatchObject({ aud_old_value: "10000000.00", aud_new_value: "2000000.00" });

    state.invoice = storedInvoice(approved);
    await expect(save(contractInput({ value: "9000000" }), 70)).rejects.toMatchObject({
      statusCode: 409,
      message: expect.stringContaining("extracto y la descripción"),
    });
    await expect(save(contractInput({ value: "10000000.00", description: "Nota" }), 70)).resolves.toMatchObject({ invId: 70 });
  });

  it("información del contrato: saldos y amortización por defecto para un VALOR", async () => {
    prismaMock.tbl_contracts.findFirst.mockResolvedValueOnce({ ctr_id: 30 });
    state.advanceSum = D("32000000");
    state.amortizedSum = D("24000000");
    await expect(service.getContractAdvance({ ctrId: "30", value: "90000000" })).resolves.toEqual({
      base: "120000000.00",
      agreed: "32000000.00",
      invoiced: "32000000.00",
      amortized: "24000000.00",
      toInvoice: "0.00",
      toAmortize: "8000000.00",
      effectivePct: "26.666667",
      defaultAmortization: "8000000.00",
    });

    prismaMock.tbl_contracts.findFirst.mockResolvedValueOnce(null);
    await expect(service.getContractAdvance({ ctrId: "31" })).rejects.toMatchObject({ statusCode: 404 });
  });
});

// ─── Alcance por obra (DEC-047) ──────────────────────────────────────────────
// Obra 8 = la del registro; obra 9 = otra. Fuera del alcance, 404 sin tocar nada.
const OWN = Object.freeze({ all: false, wrkId: 8 });
const OTHER = Object.freeze({ all: false, wrkId: 9 });
const NONE = Object.freeze({ all: false, wrkId: null });

describe("alcance por obra (DEC-047)", () => {
  it("el listado y el selector de contratos filtran por la obra del alcance", async () => {
    await service.paginationInvoices({ scope: OWN, rows: 10, first: 0 });
    expect(prismaMock.tbl_invoices.findMany.mock.calls.at(-1)[0].where.wrk_id).toEqual({ in: [8] });
    // El filtro de obra se suma al alcance y no lo reemplaza.
    await service.paginationInvoices({ scope: OWN, wrkId: 9, rows: 10, first: 0 });
    const where = prismaMock.tbl_invoices.findMany.mock.calls.at(-1)[0].where;
    expect(where.wrk_id).toEqual({ in: [8] });
    expect(where.AND).toEqual([{ wrk_id: 9 }]);
    await service.selectInvoiceContracts({ type: "ADVANCE", scope: OWN });
    expect(prismaMock.tbl_contracts.findMany.mock.calls.at(-1)[0].where.wrk_id).toEqual({ in: [8] });
  });

  it("una factura de otra obra no se lee, no se aprueba ni se anula (404)", async () => {
    state.invoice = storedInvoice();
    await expect(service.getInvoice({ invId: 70, scope: OTHER })).rejects.toMatchObject({ statusCode: 404, message: "No se encontró la factura." });
    await expect(service.approveInvoice({ invId: 70, input: { approvalDate: "2026-03-05" }, useBy: 9, scope: OTHER, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 404,
    });
    await expect(
      service.cancelInvoice({ invId: 70, input: { reaId: 4, observation: "x" }, useBy: 9, granted: new Set([CAN_CANCEL]), scope: OTHER, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();
  });

  it("no se registra una factura contra un contrato o en una obra fuera del alcance (404)", async () => {
    prismaMock.tbl_contracts.findUnique.mockResolvedValueOnce({ wrk_id: 8 });
    await expect(service.saveInvoice({ invId: 0, input: contractInput(), useBy: 9, granted: new Set(), scope: OTHER, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 404,
    });
    await expect(service.saveInvoice({ invId: 0, input: simpleInput(), useBy: 9, granted: new Set(), scope: OTHER, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 404,
    });
    expect(prismaMock.tbl_invoices.create).not.toHaveBeenCalled();
  });
});
