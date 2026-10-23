import { jest } from "@jest/globals";
import { Prisma } from "@prisma/client";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Facturas, fase A (ADR-0020, DEC-042): registrar según el tipo, aprobar y
// anular como transiciones declaradas bajo bloqueo, con historial, bitácora
// e idempotencia, y el estado del contrato decidiendo qué tipo se admite.
// Anticipo y amortización (DEC-044): I1 e I2 contra los saldos calculados
// bajo el bloqueo del contrato, y el permiso de ajustar la amortización.
// Retenido contractual (DEC-051): I3 e I4 contra los mismos saldos, el
// permiso de ajustar el retenido y la devolución de retenido.
// Menús (DEC-074): cada factura guarda el tipo de proveedor de su menú: el de
// su contrato, que debe facturar con contrato, o un tipo simple de la
// asignación. La simple se imputa a una etapa de una obra, con su proveedor
// asignado a ella (DEC-058).

const state = {
  invoice: null,
  contract: null,
  providerType: null,
  duplicate: null,
  reason: null,
  invoiceReplay: null,
  historyReplay: null,
  concepts: [],
  advanceSum: null,
  pendingAdvanceSum: null,
  amortizedSum: null,
  retainedSum: null,
  billedSum: null,
  refundedSum: null,
  work: null,
  stage: null,
  assignment: null,
  liquidationConcept: null,
};

const D = (value) => new Prisma.Decimal(value);
// Asignación del proveedor a la obra; `simple`: cuántos tipos de forma simple tiene en ella (ids 1, 2…; DEC-074).
const assignment = (overrides = {}, simple = 1) => ({
  sta_id: 1,
  tbl_providers: { prv_name: "Aceros SA", sta_id: 1 },
  tbl_work_provider_types: Array.from({ length: simple }, (_, i) => ({ pvt_id: i + 1 })),
  ...overrides,
});

// Ejemplo de ADR-0024: B = 120.000.000, A = 32.000.000 (≈ 26,67 %). Retenido
// del 5 % en los dos conceptos: RP = 6.000.000.
const concept = (directCost, advancePct) => ({
  ccp_direct_cost: D(directCost),
  ccp_admin_pct: D(0),
  ccp_contingency_pct: D(0),
  ccp_profit_pct: D(0),
  ccp_vat_pct: D(19),
  ccp_advance_pct: D(advancePct),
  ccp_retention_pct: D(5),
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
  tbl_contracts: {
    findUnique: jest.fn(async () => state.contract),
    findMany: jest.fn(async () => []),
    findFirst: jest.fn(),
  },
  tbl_providers: { findUnique: jest.fn(), findFirst: jest.fn(), findMany: jest.fn(async () => []) },
  tbl_works: { findUnique: jest.fn(async () => state.work), findFirst: jest.fn(), findMany: jest.fn(async () => []) },
  tbl_work_stages: { findUnique: jest.fn(async () => state.stage), count: jest.fn(async () => state.activeStages) },
  tbl_work_providers: { findUnique: jest.fn(async () => state.assignment) },
  tbl_work_provider_types: { findMany: jest.fn(async () => state.assignment?.tbl_work_provider_types ?? []) },
  // El tipo de proveedor del contrato (su forma de facturar) y el menú del reporte (DEC-074).
  tbl_provider_types: { findUnique: jest.fn(async () => state.providerType), findFirst: jest.fn() },
  tbl_reasons: { findUnique: jest.fn(async () => state.reason) },
  tbl_contract_concepts: { findMany: jest.fn(async () => state.concepts), findFirst: jest.fn(async () => state.liquidationConcept) },
  tbl_invoice_advance_details: {
    aggregate: jest.fn(async ({ where }) =>
      where.tbl_invoices.inv_state === "REGISTERED"
        ? { _sum: { iad_value: state.pendingAdvanceSum }, _count: { _all: state.pendingAdvanceSum ? 1 : 0 } }
        : { _sum: { iad_value: state.advanceSum } }
    ),
    upsert: jest.fn(),
  },
  tbl_invoice_liquidation_details: {
    aggregate: jest.fn(async () => ({ _sum: { ild_value: state.billedSum, ild_amortization: state.amortizedSum, ild_retention: state.retainedSum } })),
    upsert: jest.fn(),
  },
  tbl_invoice_retention_refund_details: {
    aggregate: jest.fn(async () => ({ _sum: { irr_value: state.refundedSum } })),
    upsert: jest.fn(),
  },
  tbl_invoice_simple_details: { upsert: jest.fn() },
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
const CAN_ADJUST_RETENTION = 103;
const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);
const lockedTables = () => prismaMock.$queryRaw.mock.calls.map((call) => call.slice(1).map((v) => v?.strings?.join("") ?? "").join(" "));

const contract = (overrides = {}) => ({
  ctr_id: 30,
  wrk_id: 8,
  prv_id: 77,
  pvt_id: 3,
  wks_id: 11,
  ctt_id: 4,
  ctr_start_date: new Date("2026-01-31T00:00:00Z"),
  ctr_state: "IN_PROGRESS",
  sta_id: 1,
  ...overrides,
});

const storedInvoice = (overrides = {}) => ({
  inv_id: 70,
  inv_type: "ADVANCE",
  pvt_id: 3,
  prv_id: 77,
  wrk_id: 8,
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
      ild_retention: D("4500000"),
      ild_default_retention: D("4500000"),
      ild_retention_default_pct: D("5"),
      ild_retention_applied_pct: D("5"),
      ild_retention_observation: null,
    },
    ...overrides,
  });

const storedSimple = (overrides = {}) =>
  storedInvoice({ inv_type: "SIMPLE", pvt_id: 1, wks_id: 11, ctr_id: null, tbl_invoice_advance_details: null, ...overrides });

const storedRefund = (overrides = {}) =>
  storedInvoice({
    inv_type: "RETENTION_REFUND",
    tbl_invoice_advance_details: null,
    tbl_invoice_retention_refund_details: { irr_value: D("3000000") },
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
  // Importes de la pantalla del sistema que se migra (DEC-065).
  value: "20000",
  withholdingPct: "10",
  discount: "10",
  vatPct: "19",
  vatWithholdingPct: "10",
  icaWithholding: "10",
  freight: "10",
  earlyPaymentDiscount: "10",
  ...overrides,
});

const contractInput = (overrides = {}) => ({ type: "ADVANCE", ctrId: 30, number: "F-100", date: "2026-03-01", value: "10000000", ...overrides });
// El % IVA es obligatorio en la normal y la liquidación (DEC-075).
const liquidationInput = (overrides = {}) => contractInput({ type: "LIQUIDATION", value: "90000000", vatPct: "19", ...overrides });
const refundInput = (overrides = {}) => contractInput({ type: "RETENTION_REFUND", value: "3500000", ...overrides });

const save = (input, invId = 0, granted = []) =>
  service.saveInvoice({ invId, input, useBy: 9, granted: new Set(granted), ctx, idempotencyKey: KEY });
const approve = (input = { approvalDate: "2026-03-05" }) => service.approveInvoice({ invId: 70, input, useBy: 9, ctx, idempotencyKey: KEY });
const cancel = (granted = [CAN_CANCEL], input = { reaId: 4, observation: "Registrada por error" }) =>
  service.cancelInvoice({ invId: 70, input, useBy: 9, granted: new Set(granted), ctx, idempotencyKey: KEY });

beforeEach(() => {
  jest.clearAllMocks();
  state.invoice = null;
  state.contract = contract();
  state.providerType = { pvt_name: "Contrato mayor", pvt_invoice_mode: "CONTRACT" };
  state.duplicate = null;
  state.invoiceReplay = null;
  state.historyReplay = null;
  state.reason = { rea_scope: "INVOICE_CANCEL", rea_name: "Error de registro", sta_id: 1 };
  state.concepts = CONCEPTS;
  state.advanceSum = null;
  state.pendingAdvanceSum = null;
  state.amortizedSum = null;
  state.retainedSum = null;
  state.billedSum = null;
  state.refundedSum = null;
  state.work = { sta_id: 1, wrk_code: "OB-8" };
  state.stage = { wrk_id: 8, sta_id: 1, wks_name: "Cimentación" };
  state.activeStages = 2;
  state.assignment = assignment();
  state.liquidationConcept = { ccp_id: 41 };
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  prismaMock.tbl_providers.findUnique.mockImplementation(async () => ({ prv_name: "Aceros SA", sta_id: 1 }));
  prismaMock.tbl_providers.findFirst.mockResolvedValue({ prv_id: 77 });
});

describe("registrar", () => {
  it("simple: bloquea obra → proveedor → tipo y nace registrada en la etapa de la obra, sin contrato, con historial y bitácora (DEC-058)", async () => {
    await expect(save(simpleInput({ state: "APPROVED", approvalDate: "2026-03-02", ctrId: 30 }))).resolves.toEqual({
      message: "Factura registrada correctamente",
      invId: 70,
    });

    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_works/), expect.stringMatching(/tbl_providers/), expect.stringMatching(/tbl_provider_types/)]);
    expect(prismaMock.tbl_work_providers.findUnique.mock.calls[0][0].where).toEqual({ wrk_id_prv_id: { wrk_id: 8, prv_id: 77 } });
    const { data } = prismaMock.tbl_invoices.create.mock.calls[0][0];
    expect(data).toMatchObject({
      inv_type: "SIMPLE",
      pvt_id: 1,
      wrk_id: 8,
      wks_id: 11,
      prv_id: 77,
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

  it("simple: guarda lo capturado y las tasas, nunca los calculados, con bitácora (DEC-065)", async () => {
    await save(simpleInput());
    const { create } = prismaMock.tbl_invoice_simple_details.upsert.mock.calls[0][0];
    expect(Object.fromEntries(Object.entries(create).map(([k, v]) => [k, typeof v === "object" ? v.toFixed(2) : v]))).toEqual({
      inv_id: 70,
      isd_value: "20000.00",
      isd_withholding_pct: "10.00",
      isd_discount: "10.00",
      isd_vat_pct: "19.00",
      isd_vat_withholding_pct: "10.00",
      isd_ica_withholding: "10.00",
      isd_freight: "10.00",
      isd_early_payment_discount: "10.00",
      isd_formula_version: 1,
      isd_create_by: 9,
      isd_update_by: 9,
    });
    expect(auditRows().find((r) => r.aud_field === "isd_vat_pct")).toMatchObject({ aud_new_value: "19.00" });
  });

  it("simple: exige valor y % IVA; los demás vacíos valen 0; rangos y neto ≥ 0 (400)", async () => {
    await expect(save(simpleInput({ value: "" }))).rejects.toMatchObject({ statusCode: 400, message: expect.stringMatching(/valor/) });
    await expect(save(simpleInput({ vatPct: "" }))).rejects.toMatchObject({ statusCode: 400, message: expect.stringMatching(/IVA/) });
    await expect(save(simpleInput({ discount: "20001" }))).rejects.toMatchObject({ statusCode: 400, message: expect.stringMatching(/descuento AI/) });
    await expect(save(simpleInput({ vatPct: "101" }))).rejects.toMatchObject({ statusCode: 400 });
    await expect(save(simpleInput({ earlyPaymentDiscount: "999999" }))).rejects.toMatchObject({ statusCode: 400, message: expect.stringMatching(/negativo/) });
    expect(prismaMock.tbl_invoices.create).not.toHaveBeenCalled();

    jest.clearAllMocks();
    await save(simpleInput({ withholdingPct: "", discount: null, vatWithholdingPct: "", icaWithholding: "", freight: "", earlyPaymentDiscount: "" }));
    const { create } = prismaMock.tbl_invoice_simple_details.upsert.mock.calls[0][0];
    expect([create.isd_withholding_pct, create.isd_discount, create.isd_freight].map((v) => v.toFixed(2))).toEqual(["0.00", "0.00", "0.00"]);
  });

  it("simple: la obra existe y está activa (400)", async () => {
    state.work = { sta_id: 2, wrk_code: "OB-8" };
    await expect(save(simpleInput())).rejects.toMatchObject({ statusCode: 400, message: "La obra OB-8 está inactiva: no admite facturas nuevas." });
    state.work = null;
    await expect(save(simpleInput())).rejects.toMatchObject({ statusCode: 400, message: "La obra seleccionada no existe." });
    expect(prismaMock.tbl_invoices.create).not.toHaveBeenCalled();
  });

  it("simple: el proveedor está asignado a la obra, y él y la asignación activos (400)", async () => {
    state.assignment = null;
    await expect(save(simpleInput())).rejects.toMatchObject({
      statusCode: 400,
      message: "El proveedor seleccionado no está asignado a la obra de la factura.",
    });
    state.assignment = assignment({ tbl_providers: { prv_name: "Aceros SA", sta_id: 2 } });
    await expect(save(simpleInput())).rejects.toMatchObject({ statusCode: 400, message: "El proveedor Aceros SA está inactivo." });
    state.assignment = assignment({ sta_id: 2 });
    await expect(save(simpleInput())).rejects.toMatchObject({ statusCode: 400, message: "La asignación de Aceros SA a la obra está inactiva." });
    expect(prismaMock.tbl_invoices.create).not.toHaveBeenCalled();
  });

  it("simple: el proveedor trabaja en la obra con un tipo de facturas simples (400, DEC-074)", async () => {
    state.assignment = assignment({}, 0);
    await expect(save(simpleInput())).rejects.toMatchObject({
      statusCode: 400,
      message: "Aceros SA no trabaja en esta obra con un tipo de proveedor de facturas simples.",
    });
    expect(prismaMock.tbl_work_providers.findUnique.mock.calls.at(-1)[0].select.tbl_work_provider_types).toEqual({
      where: { tbl_provider_types: { pvt_invoice_mode: "SIMPLE" } },
      select: { pvt_id: true },
    });
    expect(prismaMock.tbl_invoices.create).not.toHaveBeenCalled();
  });

  it("simple: si la obra no tiene etapas activas, se registra sin etapa (DEC-069)", async () => {
    state.activeStages = 0;
    await expect(save(simpleInput({ wksId: "" }))).resolves.toMatchObject({ invId: 70 });
    expect(prismaMock.tbl_invoices.create.mock.calls[0][0].data).toMatchObject({ inv_type: "SIMPLE", wks_id: null });
    expect(prismaMock.tbl_work_stages.findUnique).not.toHaveBeenCalled();
  });

  it("simple: con etapas en la obra, la etapa es obligatoria, de la obra y activa (400)", async () => {
    await expect(save(simpleInput({ wksId: "" }))).rejects.toMatchObject({
      statusCode: 400,
      message: "La obra tiene etapas: selecciona la etapa de la factura.",
    });
    expect(prismaMock.tbl_work_stages.count.mock.calls.at(-1)[0].where).toEqual({ wrk_id: 8, sta_id: 1 });
    state.stage = { wrk_id: 9, sta_id: 1, wks_name: "Cimentación" };
    await expect(save(simpleInput())).rejects.toMatchObject({ statusCode: 400, message: "La etapa seleccionada no pertenece a la obra de la factura." });
    state.stage = { wrk_id: 8, sta_id: 2, wks_name: "Cimentación" };
    await expect(save(simpleInput())).rejects.toMatchObject({ statusCode: 400, message: 'La etapa "Cimentación" está inactiva y no se puede asignar.' });
    expect(prismaMock.tbl_invoices.create).not.toHaveBeenCalled();
  });

  it("de contrato: bloquea el contrato y toma obra y proveedor de él, no del cliente", async () => {
    await save(contractInput({ wrkId: 999, prvId: 999, wksId: 999 }));

    // Proveedor y contrato: el menú es el tipo del contrato y queda en la
    // factura (DEC-074); su forma no cambia con contratos, no se bloquea.
    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_providers/), expect.stringMatching(/tbl_contracts/)]);
    expect(prismaMock.tbl_invoices.create.mock.calls[0][0].data).toMatchObject({ inv_type: "ADVANCE", pvt_id: 3, ctr_id: 30, wrk_id: 8, prv_id: 77 });
  });

  it("el estado del contrato decide el tipo: anticipo en ejecución, liquidación en liquidación (409 si no)", async () => {
    state.contract = contract({ ctr_state: "IN_LIQUIDATION" });
    await expect(save(contractInput())).rejects.toMatchObject({ statusCode: 409, message: expect.stringMatching(/anticipo/) });
    await expect(save(liquidationInput())).resolves.toMatchObject({ invId: 70 });
    state.retainedSum = D("6000000");
    await expect(save(refundInput())).resolves.toMatchObject({ invId: 70 });

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
    expect(prismaMock.tbl_invoices.findFirst.mock.calls[0][0].where).toEqual({ prv_id: 77, inv_number: "F-100", sta_id: { not: 3 } });
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

  it("aprobada: solo extracto, descripción y número de comprobante (409 para lo demás, DEC-080)", async () => {
    state.invoice = storedInvoice({ inv_state: "APPROVED", inv_approval_date: new Date("2026-03-05T00:00:00Z") });
    await expect(save(contractInput({ number: "F-101" }), 70)).rejects.toMatchObject({
      statusCode: 409,
      message: expect.stringMatching(/extracto, la descripción y el número de comprobante/),
    });
    await expect(save(contractInput({ description: "Soporte del pago" }), 70)).resolves.toMatchObject({ invId: 70 });
    await expect(save(contractInput({ voucherNumber: "CE-77" }), 70)).resolves.toMatchObject({ invId: 70 });
    expect(prismaMock.tbl_invoices.update).toHaveBeenCalledTimes(2);
    expect(prismaMock.tbl_invoices.update.mock.calls[1][0].data).toMatchObject({ inv_voucher_number: "CE-77" });
    expect(auditRows().find((r) => r.aud_field === "inv_voucher_number")).toMatchObject({ aud_new_value: "CE-77" });
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
    const fields = auditRows().map((r) => r.aud_field);
    expect(fields.filter((f) => !f.startsWith("snapshot."))).toEqual(["inv_state", "inv_approval_date", "advance_invoiced"]);
  });

  describe("instantánea de composición y saldos (PRO-BE-39)", () => {
    const snapshot = () =>
      Object.fromEntries(auditRows().filter((r) => r.aud_field.startsWith("snapshot.")).map((r) => [r.aud_field, [r.aud_old_value, r.aud_new_value]]));

    it("guarda los importes y todos los saldos antes y después, en la misma operación y después de aprobar", async () => {
      // Antes: nada aprobado. Después: la propia factura ya cuenta.
      prismaMock.tbl_invoice_advance_details.aggregate
        .mockResolvedValueOnce({ _sum: { iad_value: null } })
        .mockResolvedValueOnce({ _sum: { iad_value: D("10000000") } });
      await approve();

      const snap = snapshot();
      expect(snap["snapshot.invoice.value"]).toEqual([null, "10000000.00"]);
      expect(snap).not.toHaveProperty(["snapshot.invoice.amortization"]);
      expect(snap["snapshot.advance.invoiced"]).toEqual(["0.00", "10000000.00"]);
      expect(snap["snapshot.advance.agreed"][0]).toBe(snap["snapshot.advance.agreed"][1]);
      expect(snap["snapshot.advance.toAmortize"]).toEqual(["0.00", "10000000.00"]);
      expect(Object.keys(snap)).toEqual(
        expect.arrayContaining(["snapshot.advance.effectivePct", "snapshot.retention.balance", "snapshot.retention.toRetain"])
      );
      expect(Object.keys(snap)).toHaveLength(15);
      expect(new Set(auditRows().map((r) => r.aud_operation_id)).size).toBe(1);
      // Los saldos de después se leen con la factura ya aprobada, en la misma transacción.
      const afterRead = prismaMock.tbl_invoice_advance_details.aggregate.mock.invocationCallOrder[1];
      expect(afterRead).toBeGreaterThan(prismaMock.tbl_invoices.update.mock.invocationCallOrder[0]);
      expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
    });

    it("una liquidación guarda además su amortización y su retenido", async () => {
      state.contract = contract({ ctr_state: "IN_LIQUIDATION" });
      state.invoice = storedLiquidation();
      state.advanceSum = D("32000000");
      await approve();
      const snap = snapshot();
      expect(snap["snapshot.invoice.value"]).toEqual([null, "90000000.00"]);
      expect(snap["snapshot.invoice.amortization"]).toEqual([null, "24000000.00"]);
      expect(snap["snapshot.invoice.retention"]).toEqual([null, "4500000.00"]);
    });

    it("si la aprobación falla, no queda instantánea", async () => {
      state.advanceSum = D("999999999");
      await expect(approve()).rejects.toMatchObject({ statusCode: 409 });
      expect(prismaMock.tbl_audit_log.createMany).not.toHaveBeenCalled();
    });
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
    state.invoice = storedSimple();
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

  it("con el contrato liquidado no se anula, ni aprobada ni registrada (409, ADR-0027)", async () => {
    state.contract = contract({ ctr_state: "LIQUIDATED" });
    state.invoice = storedInvoice({ inv_state: "APPROVED", inv_approval_date: new Date("2026-03-05T00:00:00Z") });
    await expect(cancel([CAN_CANCEL, CAN_CANCEL_APPROVED])).rejects.toMatchObject({
      statusCode: 409,
      message: "Las facturas de un contrato liquidado no se anulan: el contrato solo se consulta. Estado actual: Liquidado.",
    });
    state.invoice = storedInvoice();
    await expect(cancel()).rejects.toMatchObject({ statusCode: 409 });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();
    expect(prismaMock.tbl_invoice_status_history.create).not.toHaveBeenCalled();
  });

  it("en ejecución, suspendido o en liquidación, el estado del contrato no impide anular", async () => {
    for (const ctr_state of ["IN_PROGRESS", "SUSPENDED", "IN_LIQUIDATION"]) {
      state.contract = contract({ ctr_state });
      state.invoice = storedInvoice();
      await expect(cancel()).resolves.toMatchObject({ invId: 70 });
    }
  });

  it("el detalle no ofrece anular con el contrato liquidado; en liquidación, sí", async () => {
    const detail = (ctr_state, invoice) => {
      prismaMock.tbl_invoices.findFirst.mockResolvedValueOnce({
        ...invoice,
        tbl_contracts: { ctr_number: "C-1", ctr_name: "Obra", ctr_state, tbl_work_stages: null },
        tbl_invoice_status_history: [],
      });
      return service.getInvoice({ invId: 70 });
    };
    const approved = storedInvoice({ inv_state: "APPROVED", inv_approval_date: new Date("2026-03-05T00:00:00Z") });
    await expect(detail("LIQUIDATED", approved)).resolves.toMatchObject({ allowedActions: ["editNotes"] });
    await expect(detail("LIQUIDATED", storedInvoice())).resolves.toMatchObject({ allowedActions: ["edit", "editNotes", "approve"] });
    await expect(detail("IN_LIQUIDATION", approved)).resolves.toMatchObject({ allowedActions: ["editNotes", "cancelApproved", "deleteApproved"] });
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

describe("eliminar (DEC-068)", () => {
  const CAN_DELETE_APPROVED = 111;
  const approvedAdvance = () => storedInvoice({ inv_state: "APPROVED", inv_approval_date: new Date("2026-03-05T00:00:00Z") });
  const remove = (granted = [], input = { observation: "Registrada dos veces" }) =>
    service.deleteInvoice({ invId: 70, input, useBy: 9, granted: new Set(granted), ctx });

  it("una registrada: eliminación lógica con autor y fecha, observación en la bitácora; bloquea contrato → factura", async () => {
    state.invoice = storedInvoice();
    await expect(remove()).resolves.toEqual({ message: "Factura eliminada correctamente", invId: 70 });

    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_contracts/), expect.stringMatching(/tbl_invoices/)]);
    expect(prismaMock.tbl_invoices.update.mock.calls[0][0].data).toMatchObject({ sta_id: 3, inv_delete_by: 9, inv_update_by: 9 });
    expect(prismaMock.tbl_invoices.update.mock.calls[0][0].data.inv_delete_at).toBeInstanceOf(Date);
    expect(prismaMock.tbl_invoice_status_history.create).not.toHaveBeenCalled();
    expect(auditRows().find((r) => r.aud_field === "observation")).toMatchObject({ aud_operation: "ELIMINAR", aud_new_value: "Registrada dos veces" });
  });

  it("una aprobada exige el permiso reforzado (403 sin él) y revierte su efecto en los saldos", async () => {
    state.invoice = approvedAdvance();
    state.advanceSum = D("10000000");
    await expect(remove()).rejects.toMatchObject({ statusCode: 403 });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();

    await expect(remove([CAN_DELETE_APPROVED])).resolves.toMatchObject({ invId: 70 });
    expect(auditRows().find((r) => r.aud_field === "advance_invoiced")).toMatchObject({ aud_old_value: "10000000.00", aud_new_value: "0.00" });
  });

  it("un anticipo aprobado ya amortizado no se elimina (409, I2)", async () => {
    state.invoice = approvedAdvance();
    state.advanceSum = D("10000000");
    state.amortizedSum = D("4000000");
    await expect(remove([CAN_DELETE_APPROVED])).rejects.toMatchObject({ statusCode: 409 });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();
  });

  it("una anulada no se elimina (409), ni ninguna con el contrato liquidado (409)", async () => {
    state.invoice = storedInvoice({ inv_state: "CANCELLED" });
    await expect(remove([CAN_DELETE_APPROVED])).rejects.toMatchObject({ statusCode: 409, message: expect.stringMatching(/anulada/) });

    state.contract = contract({ ctr_state: "LIQUIDATED" });
    state.invoice = storedInvoice();
    await expect(remove()).rejects.toMatchObject({
      statusCode: 409,
      message: "Las facturas de un contrato liquidado no se eliminan: el contrato solo se consulta. Estado actual: Liquidado.",
    });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();
  });

  it("la observación es obligatoria (400); una eliminada o inexistente responde 404", async () => {
    state.invoice = storedInvoice();
    await expect(remove([], { observation: "  " })).rejects.toMatchObject({ statusCode: 400 });
    state.invoice = storedInvoice({ sta_id: 3 });
    await expect(remove()).rejects.toMatchObject({ statusCode: 404 });
    state.invoice = null;
    await expect(remove()).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();
  });

  it("el detalle ofrece eliminar a una registrada y, a una aprobada, la eliminación reforzada", async () => {
    prismaMock.tbl_invoices.findFirst.mockResolvedValueOnce({
      ...storedInvoice(),
      tbl_contracts: { ctr_number: "C-1", ctr_name: "Obra", ctr_state: "IN_PROGRESS", tbl_work_stages: null },
      tbl_invoice_status_history: [],
    });
    await expect(service.getInvoice({ invId: 70 })).resolves.toMatchObject({ allowedActions: ["edit", "editNotes", "approve", "cancel", "delete"] });
  });
});

// Detalle guardado de la simple de la pantalla de referencia (DEC-065).
const SIMPLE_DETAIL = {
  isd_value: D("20000"),
  isd_withholding_pct: D("10"),
  isd_discount: D("10"),
  isd_vat_pct: D("19"),
  isd_vat_withholding_pct: D("10"),
  isd_ica_withholding: D("10"),
  isd_freight: D("10"),
  isd_early_payment_discount: D("10"),
  isd_formula_version: 1,
};

describe("importes de la factura simple (DEC-065)", () => {
  it("una registrada antes de DEC-065 recibe sus importes al editarla, con bitácora", async () => {
    state.invoice = storedSimple();
    await save(simpleInput(), 70);
    expect(prismaMock.tbl_invoice_simple_details.upsert.mock.calls[0][0].create).toMatchObject({ inv_id: 70, isd_formula_version: 1 });
    expect(auditRows().find((r) => r.aud_field === "isd_value")).toMatchObject({ aud_old_value: null, aud_new_value: "20000.00" });
  });

  it("una registrada con importes no los pierde: editarla los exige (400)", async () => {
    state.invoice = storedSimple({ tbl_invoice_simple_details: SIMPLE_DETAIL });
    await expect(save({ number: "F-100", date: "2026-03-01" }, 70)).rejects.toMatchObject({ statusCode: 400 });
    jest.clearAllMocks();
    await save(simpleInput({ freight: "20" }), 70);
    const changed = auditRows().filter((r) => r.aud_field.startsWith("isd_"));
    expect(changed).toEqual([expect.objectContaining({ aud_field: "isd_freight", aud_old_value: "10.00", aud_new_value: "20.00" })]);
  });

  it("una aprobada no cambia sus importes (409); los mismos importes no son un cambio", async () => {
    state.invoice = storedSimple({ inv_state: "APPROVED", tbl_invoice_simple_details: SIMPLE_DETAIL });
    await expect(save(simpleInput({ freight: "20" }), 70)).rejects.toMatchObject({ statusCode: 409 });
    await expect(save(simpleInput({ description: "Nota" }), 70)).resolves.toMatchObject({ invId: 70 });
    expect(prismaMock.tbl_invoice_simple_details.upsert).not.toHaveBeenCalled();
  });

  it("aprobar deja en la bitácora la composición y la versión de fórmula (sin saldos de contrato)", async () => {
    state.invoice = storedSimple({ tbl_invoice_simple_details: SIMPLE_DETAIL });
    await approve();
    const snapshot = Object.fromEntries(auditRows().filter((r) => r.aud_field.startsWith("snapshot.")).map((r) => [r.aud_field, r.aud_new_value]));
    expect(snapshot).toMatchObject({ "snapshot.invoice.total": "21398.29", "snapshot.invoice.billed": "23798.10", "snapshot.invoice.formulaVersion": "1" });
    expect(Object.keys(snapshot).some((key) => key.startsWith("snapshot.advance."))).toBe(false);
  });

  it("previsualizar: compone con la misma fórmula; lo vacío cuenta 0 y lo inválido trae su mensaje, sin error", () => {
    expect(service.previewSimpleInvoice(simpleInput())).toMatchObject({ total: "21398.29", billed: "23798.10", valid: true, message: null });
    const empty = service.previewSimpleInvoice({});
    expect(empty).toMatchObject({ total: "0.00", valid: false, message: expect.stringMatching(/valor/) });
    expect(empty.lines).toHaveLength(9);
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("previsualizar: un importe escrito por su otro lado vuelve como se guarda, y cada uno trae su valor y su % (DEC-065)", () => {
    const preview = service.previewSimpleInvoice({ value: "100000", vatAmount: "19000", freightPct: "1" });
    expect(preview.captured).toMatchObject({ vatPct: "19.00", freight: "1000.00" });
    expect(preview.pairs).toMatchObject({ vatPct: { amount: "19000.00", pct: "19.00" }, freight: { amount: "1000.00", pct: "1.00" } });
    expect(preview).toMatchObject({ valid: true, total: "120000.00" });
  });

  it("una registrada antes de DEC-065, sin importes, se aprueba así", async () => {
    state.invoice = storedSimple();
    await expect(approve()).resolves.toMatchObject({ invId: 70 });
  });
});

describe("editar una simple", () => {
  it("sin proveedor ni etapa en la petición, conserva los que tenía; bloquea obra → proveedor → factura", async () => {
    state.invoice = storedSimple();
    await expect(save({ number: "F-100", date: "2026-03-01", description: "Nota" }, 70)).resolves.toMatchObject({ invId: 70 });
    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_works/), expect.stringMatching(/tbl_providers/), expect.stringMatching(/tbl_invoices/)]);
    expect(prismaMock.tbl_invoices.update.mock.calls[0][0].data).toMatchObject({ prv_id: 77, wks_id: 11, inv_description: "Nota" });
    expect(prismaMock.tbl_invoices.update.mock.calls[0][0].data).not.toHaveProperty("wrk_id");
  });

  it("cambia de proveedor solo a uno asignado a la obra y activo (400); el que ya tenía, aunque esté inactivo", async () => {
    state.invoice = storedSimple();
    state.assignment = null;
    await expect(save(simpleInput({ prvId: 78 }), 70)).rejects.toMatchObject({
      statusCode: 400,
      message: "El proveedor seleccionado no está asignado a la obra de la factura.",
    });
    state.assignment = assignment({ tbl_providers: { prv_name: "Otro SA", sta_id: 2 } });
    await expect(save(simpleInput({ prvId: 78 }), 70)).rejects.toMatchObject({ statusCode: 400, message: "El proveedor Otro SA está inactivo." });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();

    // El que ya tenía vale aunque ya no trabaje en la obra como simple.
    state.assignment = assignment({ sta_id: 2, tbl_providers: { prv_name: "Aceros SA", sta_id: 2 } }, 0);
    await expect(save(simpleInput({ description: "Nota" }), 70)).resolves.toMatchObject({ invId: 70 });
    expect(prismaMock.tbl_work_providers.findUnique.mock.calls.at(-1)[0].where).toEqual({ wrk_id_prv_id: { wrk_id: 8, prv_id: 77 } });
  });

  it("cambia de etapa solo a una de su obra; la que ya tenía vale aunque esté inactiva (400)", async () => {
    state.invoice = storedSimple();
    state.stage = { wrk_id: 9, sta_id: 1, wks_name: "Otra" };
    await expect(save(simpleInput({ wksId: 12 }), 70)).rejects.toMatchObject({
      statusCode: 400,
      message: "La etapa seleccionada no pertenece a la obra de la factura.",
    });
    state.stage = { wrk_id: 8, sta_id: 2, wks_name: "Cimentación" };
    await expect(save(simpleInput({ description: "Nota" }), 70)).resolves.toMatchObject({ invId: 70 });
    state.stage = { wrk_id: 8, sta_id: 1, wks_name: "Estructura" };
    await save(simpleInput({ wksId: 12 }), 70);
    expect(prismaMock.tbl_invoices.update.mock.calls.at(-1)[0].data).toMatchObject({ wks_id: 12 });
    expect(auditRows().find((r) => r.aud_field === "wks_id")).toMatchObject({ aud_old_value: "11", aud_new_value: "12" });
  });

  it("cambiar de proveedor bloquea el anterior y el nuevo", async () => {
    state.invoice = storedSimple();
    await save(simpleInput({ prvId: 78 }), 70);
    const [, providerLock] = prismaMock.$queryRaw.mock.calls;
    expect(providerLock.slice(1).flatMap((v) => v?.values ?? [v]).filter((v) => typeof v === "number")).toEqual(expect.arrayContaining([77, 78]));
    expect(prismaMock.tbl_invoices.update.mock.calls[0][0].data).toMatchObject({ prv_id: 78 });
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

  test("reporte (DEC-070): mismo where y orden que el listado del menú, sin paginar", async () => {
    prismaMock.tbl_provider_types.findFirst.mockResolvedValueOnce({ pvt_id: 3, pvt_name: "Contrato mayor", pvt_invoice_mode: "CONTRACT", pvt_invoice_menu: true, sta_id: 1 });
    const filters = { pvtId: 3, state: "APPROVED", prvId: 77, statement: "marzo", sortField: "date", sortOrder: -1, scope: OWN };
    await service.paginationInvoices({ ...filters, rows: 10, first: 0 });
    const listed = prismaMock.tbl_invoices.findMany.mock.calls.at(-1)[0];
    await expect(service.exportInvoices({ ...filters, format: "pdf" })).resolves.toMatchObject({ extension: "pdf" });
    const exported = prismaMock.tbl_invoices.findMany.mock.calls.at(-1)[0];
    expect(exported.where).toEqual(listed.where);
    expect(exported.orderBy).toEqual(listed.orderBy);
    expect(exported).not.toHaveProperty("take");
  });

  test("columnas de la simple: valor, descuento y % IVA guardados; IVA y total con su fórmula; null en las de contrato", async () => {
    prismaMock.tbl_invoices.findMany.mockResolvedValueOnce([
      {
        inv_id: 1,
        inv_type: "SIMPLE",
        tbl_invoice_simple_details: {
          isd_value: "1000.00",
          isd_withholding_pct: "2.50",
          isd_discount: "100.00",
          isd_vat_pct: "19.00",
          isd_vat_withholding_pct: "0.00",
          isd_ica_withholding: "0.00",
          isd_freight: "0.00",
          isd_early_payment_discount: "0.00",
          isd_formula_version: 1,
        },
      },
      { inv_id: 2, inv_type: "ADVANCE", tbl_invoice_simple_details: null },
    ]);
    const { results } = await service.paginationInvoices({ rows: 10, first: 0 });
    // IVA = (1000 − 100) × 19 % = 171; total = 1000 − 25 − 100 + 171 = 1046.
    expect(results[0]).toMatchObject({ value: "1000.00", discount: "100.00", vatPct: "19.00", vat: "171.00", total: "1046.00" });
    expect(results[1]).toMatchObject({ value: null, discount: null, vatPct: null, vat: null, total: null });
  });

  test.each([
    ["ADVANCE", { inv_type: "ADVANCE" }],
    ["AMORTIZATION", { inv_type: { in: ["NORMAL", "LIQUIDATION"] }, tbl_invoice_liquidation_details: { ild_amortization: { gt: 0 } } }],
    ["PENDING_ADVANCE", { inv_state: "REGISTERED", inv_type: "ADVANCE" }],
    [
      "PENDING_AMORTIZATION",
      { inv_state: "REGISTERED", inv_type: { in: ["NORMAL", "LIQUIDATION"] }, tbl_invoice_liquidation_details: { ild_amortization: { gt: 0 } } },
    ],
  ])("filtro Anticipo %s, también en los conteos de las pestañas", async (advance, condition) => {
    await service.paginationInvoices({ advance });
    expect(prismaMock.tbl_invoices.groupBy.mock.calls.at(-1)[0].where.AND).toContainEqual(condition);
  });

  test("filtra por etapa, nombre del contrato y rangos de valor, descuento y % IVA en el detalle de cada tipo, también en los conteos", async () => {
    await service.paginationInvoices({ wksId: "5", contractName: "obra gris", valueFrom: "500", valueTo: "2000.5", discountTo: "0", vatPctFrom: "19" });

    const and = prismaMock.tbl_invoices.groupBy.mock.calls.at(-1)[0].where.AND;
    expect(and).toContainEqual({
      OR: [{ wks_id: 5 }, { tbl_contracts: { wks_id: 5 } }],
    });
    expect(and).toContainEqual({ tbl_contracts: { ctr_name: { contains: "obra gris" } } });
    // Cada rango: un OR con la columna de cada tabla de detalle que guarda ese importe.
    const ranges = and
      .filter((c) => c.OR?.[0] && Object.values(c.OR[0])[0]?.is)
      .map((c) =>
        c.OR.map((branch) => {
          const [relation, { is }] = Object.entries(branch)[0];
          const [column, range] = Object.entries(is)[0];
          return [relation, column, Object.fromEntries(Object.entries(range).map(([op, v]) => [op, v.toFixed(2)]))];
        })
      );
    expect(ranges).toEqual([
      [
        ["tbl_invoice_simple_details", "isd_value", { gte: "500.00", lte: "2000.50" }],
        ["tbl_invoice_liquidation_details", "ild_value", { gte: "500.00", lte: "2000.50" }],
        ["tbl_invoice_advance_details", "iad_value", { gte: "500.00", lte: "2000.50" }],
        ["tbl_invoice_retention_refund_details", "irr_value", { gte: "500.00", lte: "2000.50" }],
      ],
      [
        ["tbl_invoice_simple_details", "isd_discount", { lte: "0.00" }],
        ["tbl_invoice_liquidation_details", "ild_materials_discount", { lte: "0.00" }],
      ],
      [
        ["tbl_invoice_simple_details", "isd_vat_pct", { gte: "19.00" }],
        ["tbl_invoice_liquidation_details", "ild_vat_pct", { gte: "19.00" }],
      ],
    ]);
  });

  test("columnas de las de contrato: la normal con su fórmula (DEC-075), el anticipo y la devolución con su valor como total", async () => {
    prismaMock.tbl_invoices.findMany.mockResolvedValueOnce([
      {
        inv_id: 1,
        inv_type: "NORMAL",
        tbl_contracts: { ctr_number: "1", ctr_name: "PRUEBA 1" },
        tbl_invoice_liquidation_details: {
          ild_value: "2000000.00",
          ild_amortization: "0.00",
          ild_retention: "0.00",
          ild_utility_pct: "0.00",
          ild_vat_pct: "19.00",
          ild_withholding_pct: "2.00",
          ild_vat_withholding_pct: "0.00",
          ild_ica_withholding: "0.00",
          ild_materials_discount: "100.00",
          ild_formula_version: 1,
        },
      },
      { inv_id: 2, inv_type: "ADVANCE", tbl_invoice_advance_details: { iad_value: "25000.00" } },
      { inv_id: 3, inv_type: "RETENTION_REFUND", tbl_invoice_retention_refund_details: { irr_value: "700.00" } },
      // Liquidación registrada antes de DEC-075: sin composición, solo su valor.
      { inv_id: 4, inv_type: "LIQUIDATION", tbl_invoice_liquidation_details: { ild_value: "900.00", ild_vat_pct: null } },
    ]);
    const { results } = await service.paginationInvoices({ rows: 10, first: 0 });
    // IVA = 2.000.000 × 19 % = 380.000; total = 2.380.000 − 40.000 (2 %) − 100 de materiales = 2.339.900.
    expect(results[0]).toMatchObject({ contractNumber: "1", contractName: "PRUEBA 1", value: "2000000.00", discount: "100.00", vatPct: "19.00", vat: "380000.00", total: "2339900.00" });
    expect(results[1]).toMatchObject({ value: "25000.00", discount: null, vatPct: null, vat: null, total: "25000.00" });
    expect(results[2]).toMatchObject({ value: "700.00", total: "700.00" });
    expect(results[3]).toMatchObject({ value: "900.00", discount: null, vatPct: null, vat: null, total: null });
  });

  test("ordena por los importes guardados de la simple", async () => {
    await service.paginationInvoices({ sortField: "value", sortOrder: 1, rows: 10, first: 0 });
    expect(prismaMock.tbl_invoices.findMany.mock.calls.at(-1)[0].orderBy).toEqual({ tbl_invoice_simple_details: { isd_value: "asc" } });
  });

  test("sin tipo no filtra por tipo", async () => {
    await service.paginationInvoices({ type: "", rows: 10, first: 0 });
    expect(prismaMock.tbl_invoices.findMany.mock.calls.at(-1)[0].where).not.toHaveProperty("inv_type");
  });

  test("filtra por número, comprobante, extracto, contrato y rangos de fecha, también en los conteos (DEC-048)", async () => {
    await service.paginationInvoices({
      number: "F-1",
      voucherNumber: " CE-9 ",
      statement: " marzo ",
      contractNumber: "C-001",
      providerName: "acer",
      dateFrom: "2026-03-01",
      approvalDateTo: "2026-03-31",
      state: "APPROVED",
    });

    const expected = [
      { inv_number: { contains: "F-1" } },
      { inv_voucher_number: { contains: "CE-9" } },
      { inv_statement: { contains: "marzo" } },
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

  test("contratos solo del proveedor elegido", async () => {
    await service.selectInvoiceContracts({ type: "ADVANCE", pvtId: 3, prvId: "77" });
    expect(prismaMock.tbl_contracts.findMany.mock.calls.at(-1)[0].where).toMatchObject({ prv_id: 77, ctr_state: { in: ["IN_PROGRESS"] } });
  });

  test("proveedores con algún contrato que admite el tipo, del menú y del alcance; el ya elegido vuelve", async () => {
    prismaMock.tbl_providers.findMany.mockResolvedValueOnce([{ prv_id: 78, prv_name: "Otro SA", prv_identification: "900" }]);
    prismaMock.tbl_providers.findFirst.mockResolvedValueOnce({ prv_id: 77, prv_name: "Aceros SA", prv_identification: "800" });
    const result = await service.selectInvoiceProviders({ type: "ADVANCE", pvtId: "3", search: " acer ", includePrvId: "77", scope: OWN });

    const { where } = prismaMock.tbl_providers.findMany.mock.calls.at(-1)[0];
    expect(where.tbl_contracts.some).toMatchObject({ pvt_id: 3, ctr_state: { in: ["IN_PROGRESS"] }, wrk_id: { in: [8] } });
    expect(where.OR).toEqual([{ prv_name: { contains: "acer" } }, { prv_identification: { contains: "acer" } }]);
    expect(prismaMock.tbl_providers.findFirst.mock.calls.at(-1)[0].where).toMatchObject({ prv_id: 77, tbl_contracts: where.tbl_contracts });
    expect(result).toEqual([
      { value: 77, label: "Aceros SA — 800" },
      { value: 78, label: "Otro SA — 900" },
    ]);
  });

  test("sin tipo, proveedores y contratos que admiten alguno; cada contrato trae los tipos que admite", async () => {
    await service.selectInvoiceProviders({ pvtId: 3 });
    expect(prismaMock.tbl_providers.findMany.mock.calls.at(-1)[0].where.tbl_contracts.some.ctr_state).toEqual({
      in: ["IN_PROGRESS", "IN_LIQUIDATION"],
    });

    prismaMock.tbl_contracts.findMany.mockResolvedValueOnce([contractRow(31), { ...contractRow(32), ctr_state: "IN_LIQUIDATION" }]);
    const result = await service.selectInvoiceContracts({ pvtId: 3, prvId: 77 });
    expect(prismaMock.tbl_contracts.findMany.mock.calls.at(-1)[0].where.ctr_state).toEqual({ in: ["IN_PROGRESS", "IN_LIQUIDATION"] });
    expect(result.map((o) => o.types)).toEqual([["ADVANCE", "NORMAL"], ["LIQUIDATION", "RETENTION_REFUND"]]);
  });

  test("filtro Proveedor del listado: con facturas no eliminadas del menú y del alcance; el ya elegido vuelve", async () => {
    prismaMock.tbl_providers.findMany.mockResolvedValueOnce([]);
    prismaMock.tbl_providers.findFirst.mockResolvedValueOnce({ prv_id: 77, prv_name: "Aceros SA", prv_identification: "800" });
    const result = await service.selectInvoiceFilterProviders({ pvtId: "1", search: " acer ", includePrvId: "77", scope: OWN });

    const { where } = prismaMock.tbl_providers.findMany.mock.calls.at(-1)[0];
    expect(where.tbl_invoices.some).toEqual({ sta_id: { not: 3 }, pvt_id: 1, wrk_id: { in: [8] } });
    expect(where.OR).toEqual([{ prv_name: { contains: "acer" } }, { prv_identification: { contains: "acer" } }]);
    expect(result).toEqual([{ value: 77, label: "Aceros SA — 800" }]);
  });

  test("filtro Etapa del listado: con facturas del menú y del alcance, propias o por su contrato; la ya elegida vuelve", async () => {
    prismaMock.tbl_work_stages.findMany = jest.fn(async () => [{ wks_id: 5, wks_name: "Torre A", tbl_works: { wrk_code: "OB-8" } }]);
    prismaMock.tbl_work_stages.findFirst = jest.fn(async () => ({ wks_id: 6, wks_name: "Torre B", tbl_works: { wrk_code: "OB-8" } }));
    const result = await service.selectInvoiceFilterStages({ pvtId: "1", search: " torre ", includeWksId: "6", scope: OWN });

    const invoices = { sta_id: { not: 3 }, pvt_id: 1, wrk_id: { in: [8] } };
    const { where } = prismaMock.tbl_work_stages.findMany.mock.calls.at(-1)[0];
    expect(where.AND).toEqual([
      { OR: [{ tbl_invoices: { some: invoices } }, { tbl_contracts: { some: { tbl_invoices: { some: invoices } } } }] },
      { OR: [{ wks_name: { contains: "torre" } }, { tbl_works: { wrk_code: { contains: "torre" } } }] },
    ]);
    expect(result).toEqual([
      { value: 6, label: "OB-8 · Torre B" },
      { value: 5, label: "OB-8 · Torre A" },
    ]);
  });

  test("sin tipo de contrato no hay proveedores", async () => {
    prismaMock.tbl_providers.findMany.mockClear();
    expect(await service.selectInvoiceProviders({ type: "SIMPLE", pvtId: 3 })).toEqual([]);
    expect(prismaMock.tbl_providers.findMany).not.toHaveBeenCalled();
  });

  test("contratos solo del menú: firmados bajo su tipo, que factura con contrato (DEC-074)", async () => {
    await service.selectInvoiceContracts({ type: "ADVANCE", pvtId: "2" });
    const { where } = prismaMock.tbl_contracts.findMany.mock.calls.at(-1)[0];
    expect(where.pvt_id).toBe(2);
    expect(where.tbl_work_provider_types).toEqual({ tbl_provider_types: { pvt_invoice_mode: "CONTRACT" } });
    expect(where).not.toHaveProperty("tbl_providers");
  });

  test("obras de la simple: activas y del alcance, por código o nombre; la ya elegida vuelve aunque la búsqueda la deje fuera (DEC-058)", async () => {
    prismaMock.tbl_works.findFirst.mockResolvedValueOnce({ wrk_id: 8, wrk_code: "OB-8", wrk_name: "Puente" });
    const result = await service.selectInvoiceWorks({ search: " zzz ", includeWrkId: "8", scope: OWN });

    const { where } = prismaMock.tbl_works.findMany.mock.calls.at(-1)[0];
    expect(where).toMatchObject({ sta_id: 1, wrk_id: { in: [8] }, OR: [{ wrk_code: { contains: "zzz" } }, { wrk_name: { contains: "zzz" } }] });
    expect(prismaMock.tbl_works.findFirst.mock.calls.at(-1)[0].where).toEqual({ sta_id: 1, wrk_id: 8 });
    expect(result).toEqual([{ value: 8, label: "OB-8 — Puente" }]);
  });

  test("proveedores de la simple: solo los que trabajan en la obra con un tipo simple, con sus tipos simples, más el de la factura (DEC-074)", async () => {
    const type = (pvt_id, pvt_invoice_mode) => ({ pvt_id, tbl_provider_types: { pvt_name: `Tipo ${pvt_id}`, pvt_invoice_mode, sta_id: 1 } });
    prismaMock.tbl_work_stages.findMany = jest.fn(async () => []);
    prismaMock.tbl_work_providers.findMany = jest.fn(async () => [
      { prv_id: 77, tbl_providers: { prv_name: "Aceros SA", prv_identification: "900" }, tbl_work_provider_types: [type(3, "CONTRACT"), type(1, "SIMPLE")] },
      { prv_id: 78, tbl_providers: { prv_name: "Otro SA", prv_identification: "800" }, tbl_work_provider_types: [type(2, "CONTRACT")] },
    ]);

    expect((await service.getInvoiceFormOptions({ wrkId: 8 })).providers).toEqual([{ value: 77, label: "Aceros SA · 900", simpleTypes: [1] }]);
    expect((await service.getInvoiceFormOptions({ wrkId: 8, includePrvId: 78 })).providers.map((p) => p.value)).toEqual([77, 78]);
  });

  test("obras de la simple desde el proveedor: solo aquellas donde trabaja con un tipo simple (DEC-074)", async () => {
    await service.selectInvoiceWorks({ prvId: "77" });
    expect(prismaMock.tbl_works.findMany.mock.calls.at(-1)[0].where).toEqual({
      sta_id: 1,
      tbl_work_providers: { some: { prv_id: 77, tbl_work_provider_types: { some: { tbl_provider_types: { pvt_invoice_mode: "SIMPLE" } } } } },
    });
  });
});

describe("anticipo y amortización (DEC-044)", () => {
  const advanceUpsert = () => prismaMock.tbl_invoice_advance_details.upsert.mock.calls[0][0];
  const liquidationUpsert = () => prismaMock.tbl_invoice_liquidation_details.upsert.mock.calls[0][0];
  const approved = { inv_state: "APPROVED", inv_approval_date: new Date("2026-03-05T00:00:00Z") };

  it("los saldos suman solo facturas aprobadas del contrato y sus conceptos", async () => {
    await save(contractInput());
    expect(prismaMock.tbl_invoice_advance_details.aggregate.mock.calls[0][0].where).toEqual({
      tbl_invoices: { ctr_id: 30, inv_type: "ADVANCE", inv_state: "APPROVED", sta_id: { not: 3 } },
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

  it("liquidación: se asocia al otrosí de liquidación de su contrato, que resuelve el servidor (DEC-059)", async () => {
    state.contract = contract({ ctr_state: "IN_LIQUIDATION" });
    state.advanceSum = D("32000000");
    await save(liquidationInput({ ccpId: 999 }));
    expect(prismaMock.tbl_contract_concepts.findFirst.mock.calls[0][0].where).toEqual({ ctr_id: 30, ccp_type: "LIQUIDATION" });
    expect(liquidationUpsert().create).toMatchObject({ inv_id: 70, ctr_id: 30, ccp_id: 41 });
    expect(auditRows().find((r) => r.aud_field === "ccp_id")).toMatchObject({ aud_operation: "CREAR", aud_new_value: "41" });
  });

  it("liquidación: sin otrosí de liquidación en el contrato no se registra (409)", async () => {
    state.contract = contract({ ctr_state: "IN_LIQUIDATION" });
    state.liquidationConcept = null;
    await expect(save(liquidationInput())).rejects.toMatchObject({ statusCode: 409, message: expect.stringContaining("otrosí de liquidación") });
    expect(prismaMock.tbl_invoices.create).not.toHaveBeenCalled();
  });

  it("el valor por defecto nunca supera el pendiente por amortizar", async () => {
    state.contract = contract({ ctr_state: "IN_LIQUIDATION" });
    state.advanceSum = D("10000000");
    await save(liquidationInput());
    expect(liquidationUpsert().create.ild_amortization.toFixed(2)).toBe("10000000.00");
  });

  it("ajustar la amortización exige el permiso (403), sin observación", async () => {
    state.contract = contract({ ctr_state: "IN_LIQUIDATION" });
    state.advanceSum = D("32000000");
    await expect(save(liquidationInput({ amortization: "20000000" }))).rejects.toMatchObject({
      statusCode: 403,
      message: expect.stringContaining("24000000.00"),
    });
    expect(prismaMock.tbl_invoices.create).not.toHaveBeenCalled();

    await expect(save(liquidationInput({ amortization: "20000000" }), 0, [CAN_ADJUST])).resolves.toMatchObject({ invId: 70 });
    expect(liquidationUpsert().create).toMatchObject({ ild_adjustment_observation: null });
    expect(liquidationUpsert().create.ild_applied_pct.toFixed(6)).toBe("22.222222");
    expect(liquidationUpsert().create.ild_default_amortization.toFixed(2)).toBe("24000000.00");
  });

  it("la observación de un ajuste, si llega, se guarda", async () => {
    state.contract = contract({ ctr_state: "IN_LIQUIDATION" });
    state.advanceSum = D("32000000");
    await save(liquidationInput({ amortization: "20000000", amortizationObservation: " Acuerdo de pago " }), 0, [CAN_ADJUST]);
    expect(liquidationUpsert().create).toMatchObject({ ild_adjustment_observation: "Acuerdo de pago" });
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
    state.retainedSum = D("4500000");
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
      message: expect.stringContaining("extracto, la descripción y el número de comprobante"),
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
      pending: { invoiced: "0.00", count: 0, toInvoice: "0.00" },
      defaultAmortization: "8000000.00",
      amortizationPair: null,
      retention: {
        agreed: "6000000.00",
        retained: "0.00",
        refunded: "0.00",
        toRetain: "6000000.00",
        balance: "0.00",
        effectivePct: "5.000000",
        defaultRetention: "4500000.00",
      },
      retentionPair: null,
      billing: { base: "120000000.00", billed: "0.00", toBill: "120000000.00" },
    });

    prismaMock.tbl_contracts.findFirst.mockResolvedValueOnce(null);
    await expect(service.getContractAdvance({ ctrId: "31" })).rejects.toMatchObject({ statusCode: 404 });
  });

  it("información del contrato: anticipo por aprobar sin contar la factura que se edita", async () => {
    prismaMock.tbl_contracts.findFirst.mockResolvedValue({ ctr_id: 30 });
    state.advanceSum = D("10000000");
    state.pendingAdvanceSum = D("15000000");
    await expect(service.getContractAdvance({ ctrId: "30" }).then((r) => r.pending)).resolves.toEqual({
      invoiced: "15000000.00",
      count: 1,
      toInvoice: "7000000.00",
    });
    await service.getContractAdvance({ ctrId: "30", invId: "70" });
    const where = prismaMock.tbl_invoice_advance_details.aggregate.mock.calls.at(-1)[0].where.tbl_invoices;
    expect(where).toMatchObject({ ctr_id: 30, inv_type: "ADVANCE", inv_state: "REGISTERED", inv_id: { not: 70 } });

    state.pendingAdvanceSum = D("40000000");
    await expect(service.getContractAdvance({ ctrId: "30" }).then((r) => r.pending.toInvoice)).resolves.toBe("0.00");
  });

  it("información del contrato: valor y % sobre el VALOR de la amortización y del retenido (DEC-065)", async () => {
    prismaMock.tbl_contracts.findFirst.mockResolvedValue({ ctr_id: 30 });
    const pairs = ({ amortizationPair, retentionPair }) => ({ amortizationPair, retentionPair });
    await expect(
      service.getContractAdvance({ ctrId: "30", value: "100000", amortizationPct: "15", retention: "100" }).then(pairs)
    ).resolves.toEqual({ amortizationPair: { amount: "15000.00", pct: "15.00" }, retentionPair: { amount: "100.00", pct: "0.10" } });
    await expect(service.getContractAdvance({ ctrId: "30", amortization: "15000" }).then(pairs)).resolves.toEqual({
      amortizationPair: null,
      retentionPair: null,
    });
  });
});

describe("retenido contractual (DEC-051)", () => {
  const liquidationUpsert = () => prismaMock.tbl_invoice_liquidation_details.upsert.mock.calls[0][0];
  const refundUpsert = () => prismaMock.tbl_invoice_retention_refund_details.upsert.mock.calls[0][0];
  const approved = { inv_state: "APPROVED", inv_approval_date: new Date("2026-03-05T00:00:00Z") };

  beforeEach(() => {
    state.contract = contract({ ctr_state: "IN_LIQUIDATION" });
    state.advanceSum = D("32000000");
  });

  it("los saldos suman el retenido de liquidaciones y las devoluciones aprobadas del contrato", async () => {
    await save(liquidationInput());
    expect(prismaMock.tbl_invoice_liquidation_details.aggregate.mock.calls[0][0]).toEqual({
      where: { tbl_invoices: { ctr_id: 30, inv_type: { in: ["NORMAL", "LIQUIDATION"] }, inv_state: "APPROVED", sta_id: { not: 3 } } },
      _sum: { ild_value: true, ild_amortization: true, ild_retention: true },
    });
    expect(prismaMock.tbl_invoice_retention_refund_details.aggregate.mock.calls[0][0].where).toEqual({
      tbl_invoices: { ctr_id: 30, inv_type: "RETENTION_REFUND", inv_state: "APPROVED", sta_id: { not: 3 } },
    });
  });

  it("liquidación sin retenido: usa el de por defecto, mín(VALOR × RP / B, por retener), y cierra en RP", async () => {
    await save(liquidationInput());
    const first = liquidationUpsert().create;
    expect(first.ild_retention.toFixed(2)).toBe("4500000.00");
    expect(first.ild_default_retention.toFixed(2)).toBe("4500000.00");
    expect(first.ild_retention_default_pct.toFixed(6)).toBe("5.000000");
    expect(first.ild_retention_applied_pct.toFixed(6)).toBe("5.000000");
    expect(first.ild_retention_observation).toBeNull();
    expect(auditRows().find((r) => r.aud_field === "ild_retention")).toMatchObject({ aud_new_value: "4500000.00" });

    prismaMock.tbl_invoice_liquidation_details.upsert.mockClear();
    state.retainedSum = D("4500000");
    await save(liquidationInput({ value: "30000000" }));
    expect(liquidationUpsert().create.ild_retention.toFixed(2)).toBe("1500000.00");
  });

  it("el valor por defecto nunca supera lo que queda por retener", async () => {
    state.retainedSum = D("5000000");
    await save(liquidationInput());
    expect(liquidationUpsert().create.ild_retention.toFixed(2)).toBe("1000000.00");
  });

  it("ajustar el retenido exige su propio permiso (403), sin observación", async () => {
    await expect(save(liquidationInput({ retention: "3000000" }), 0, [CAN_ADJUST])).rejects.toMatchObject({
      statusCode: 403,
      message: expect.stringContaining("retenido por defecto es 4500000.00"),
    });
    expect(prismaMock.tbl_invoices.create).not.toHaveBeenCalled();

    // Ajustar solo el retenido no exige el permiso de la amortización.
    await expect(save(liquidationInput({ retention: "3000000" }), 0, [CAN_ADJUST_RETENTION])).resolves.toMatchObject({ invId: 70 });
    expect(liquidationUpsert().create).toMatchObject({ ild_retention_observation: null, ild_adjustment_observation: null });
    expect(liquidationUpsert().create.ild_retention_applied_pct.toFixed(6)).toBe("3.333333");
    expect(liquidationUpsert().create.ild_default_retention.toFixed(2)).toBe("4500000.00");
  });

  it("enviar el retenido por defecto no exige el permiso", async () => {
    await expect(save(liquidationInput({ retention: "4500000.00" }))).resolves.toMatchObject({ invId: 70 });
  });

  it("I4 al registrar: el retenido no supera lo que queda por retener (409) ni el VALOR (400)", async () => {
    state.retainedSum = D("5000000");
    await expect(save(liquidationInput({ retention: "1000000.01", retentionObservation: "x" }), 0, [CAN_ADJUST_RETENTION])).rejects.toMatchObject({
      statusCode: 409,
      message: expect.stringContaining("por retener (1000000.00)"),
    });
    state.retainedSum = null;
    await expect(save(liquidationInput({ value: "100", retention: "101", retentionObservation: "x" }), 0, [CAN_ADJUST_RETENTION])).rejects.toMatchObject({
      statusCode: 400,
    });
  });

  it("I4 al aprobar: revalida el retenido guardado contra lo que queda por retener (409)", async () => {
    state.invoice = storedLiquidation();
    state.retainedSum = D("2000000");
    await expect(approve()).rejects.toMatchObject({ statusCode: 409, message: expect.stringContaining("por retener (4000000.00)") });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();

    state.retainedSum = D("1500000");
    await expect(approve()).resolves.toMatchObject({ invId: 70 });
    expect(auditRows().find((r) => r.aud_field === "retention_retained")).toMatchObject({ aud_old_value: "1500000.00", aud_new_value: "6000000.00" });
    expect(auditRows().find((r) => r.aud_field === "retention_effective_pct")).toMatchObject({ aud_new_value: "5.000000" });
  });

  it("una liquidación registrada sin retenido (antes de DEC-051) no se aprueba hasta editarla (409)", async () => {
    state.invoice = storedLiquidation();
    state.invoice.tbl_invoice_liquidation_details = {
      ...state.invoice.tbl_invoice_liquidation_details,
      ild_retention: null,
      ild_default_retention: null,
      ild_retention_default_pct: null,
      ild_retention_applied_pct: null,
    };
    await expect(approve()).rejects.toMatchObject({ statusCode: 409, message: expect.stringContaining("no tiene su retenido registrado") });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();
  });

  it("una aprobada no cambia su retenido (409)", async () => {
    state.invoice = storedLiquidation(approved);
    await expect(save(liquidationInput({ retention: "1000000" }), 70)).rejects.toMatchObject({
      statusCode: 409,
      message: expect.stringContaining("extracto, la descripción y el número de comprobante"),
    });
    // Como el formulario de una aprobada: sin IVA ni retenciones (DEC-075).
    await expect(save(liquidationInput({ retention: "4500000.00", description: "Nota", vatPct: undefined }), 70)).resolves.toMatchObject({ invId: 70 });
  });

  it("devolución: guarda el valor en su detalle, con bitácora", async () => {
    state.retainedSum = D("4500000");
    await expect(save(refundInput())).resolves.toMatchObject({ invId: 70 });
    expect(refundUpsert().create).toMatchObject({ inv_id: 70, irr_create_by: 9 });
    expect(refundUpsert().create.irr_value.toFixed(2)).toBe("3500000.00");
    expect(auditRows().find((r) => r.aud_field === "irr_value")).toMatchObject({ aud_new_value: "3500000.00" });
  });

  it("devolución: el valor es obligatorio y mayor que cero (400)", async () => {
    state.retainedSum = D("4500000");
    await expect(save(refundInput({ value: "" }))).rejects.toMatchObject({ statusCode: 400 });
    await expect(save(refundInput({ value: "0" }))).rejects.toMatchObject({ statusCode: 400 });
    expect(prismaMock.tbl_invoices.create).not.toHaveBeenCalled();
  });

  it("I3 al registrar: varias devoluciones mientras quede saldo, nunca por encima (409)", async () => {
    state.retainedSum = D("4500000");
    state.refundedSum = D("1000000");
    await expect(save(refundInput({ value: "3500000.01" }))).rejects.toMatchObject({
      statusCode: 409,
      message: expect.stringContaining("saldo de retenido (3500000.00)"),
    });
    await expect(save(refundInput({ value: "3500000" }))).resolves.toMatchObject({ invId: 70 });
  });

  it("la devolución solo se admite con el contrato en liquidación (409)", async () => {
    state.contract = contract({ ctr_state: "IN_PROGRESS" });
    state.retainedSum = D("4500000");
    await expect(save(refundInput())).rejects.toMatchObject({ statusCode: 409 });
    expect(prismaMock.tbl_invoices.create).not.toHaveBeenCalled();
  });

  it("I3 al aprobar: revalida la devolución contra el saldo vigente (409)", async () => {
    state.invoice = storedRefund();
    state.retainedSum = D("4500000");
    state.refundedSum = D("2000000");
    await expect(approve()).rejects.toMatchObject({ statusCode: 409, message: expect.stringContaining("saldo de retenido (2500000.00)") });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();

    state.refundedSum = D("1500000");
    await expect(approve()).resolves.toMatchObject({ invId: 70 });
    expect(auditRows().find((r) => r.aud_field === "retention_refunded")).toMatchObject({ aud_old_value: "1500000.00", aud_new_value: "4500000.00" });
  });

  it("I3 al anular: una liquidación aprobada cuyo retenido ya se devolvió no se anula (409)", async () => {
    state.invoice = storedLiquidation(approved);
    state.amortizedSum = D("24000000");
    state.retainedSum = D("6000000");
    state.refundedSum = D("1500000.01");
    await expect(cancel([CAN_CANCEL, CAN_CANCEL_APPROVED])).rejects.toMatchObject({ statusCode: 409, message: expect.stringContaining("ya fue devuelto") });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();

    state.refundedSum = D("1500000");
    await expect(cancel([CAN_CANCEL, CAN_CANCEL_APPROVED])).resolves.toMatchObject({ invId: 70 });
    expect(auditRows().find((r) => r.aud_field === "retention_retained")).toMatchObject({ aud_old_value: "6000000.00", aud_new_value: "1500000.00" });
  });

  it("anular una devolución aprobada siempre se admite y reduce el devuelto", async () => {
    state.invoice = storedRefund(approved);
    state.retainedSum = D("4500000");
    state.refundedSum = D("3000000");
    await expect(cancel([CAN_CANCEL, CAN_CANCEL_APPROVED])).resolves.toMatchObject({ invId: 70 });
    expect(auditRows().find((r) => r.aud_field === "retention_refunded")).toMatchObject({ aud_old_value: "3000000.00", aud_new_value: "0.00" });
  });

  it("el detalle de una devolución expone su valor", async () => {
    prismaMock.tbl_invoices.findFirst.mockResolvedValueOnce({
      ...storedRefund(approved),
      pvt_id: 2,
      tbl_contracts: { ctr_number: "C-1", ctr_name: "Suministro", ctr_state: "IN_LIQUIDATION", tbl_work_stages: null },
      tbl_invoice_status_history: [],
    });
    await expect(service.getInvoice({ invId: 70 })).resolves.toMatchObject({ pvtId: 2, amounts: { value: "3000000.00" } });
  });
});

// ─── Alcance por obra (DEC-047) ──────────────────────────────────────────────
// Obra 8 = la del registro; obra 9 = otra. Fuera del alcance, 404 sin tocar nada.
const OWN = Object.freeze({ all: false, wrkId: 8 });
const OTHER = Object.freeze({ all: false, wrkId: 9 });
const NONE = Object.freeze({ all: false, wrkId: null });

describe("IVA y retenciones de la normal y la liquidación (DEC-075)", () => {
  const detailUpsert = () => prismaMock.tbl_invoice_liquidation_details.upsert.mock.calls[0][0];
  const normalInput = (overrides = {}) => contractInput({ type: "NORMAL", value: "30000000", vatPct: "19", ...overrides });
  const TAXES = { utilityPct: "10", vatPct: "19", withholdingPct: "2", vatWithholdingPct: "15", icaWithholding: "50000", materialsDiscount: "100000" };

  beforeEach(() => {
    state.contract = contract({ ctr_state: "IN_PROGRESS" });
    state.advanceSum = D("32000000");
  });

  it("guarda lo capturado y las tasas con la versión de fórmula, y lo deja en la bitácora", async () => {
    await expect(save(normalInput(TAXES))).resolves.toMatchObject({ invId: 70 });
    const created = detailUpsert().create;
    expect(created.ild_vat_pct.toFixed(2)).toBe("19.00");
    expect(created.ild_utility_pct.toFixed(2)).toBe("10.00");
    expect(created.ild_withholding_pct.toFixed(2)).toBe("2.00");
    expect(created.ild_vat_withholding_pct.toFixed(2)).toBe("15.00");
    expect(created.ild_ica_withholding.toFixed(2)).toBe("50000.00");
    expect(created.ild_materials_discount.toFixed(2)).toBe("100000.00");
    expect(created.ild_formula_version).toBe(1);
    expect(auditRows().find((r) => r.aud_field === "ild_vat_pct")).toMatchObject({ aud_new_value: "19.00" });
    expect(auditRows().find((r) => r.aud_field === "ild_materials_discount")).toMatchObject({ aud_new_value: "100000.00" });
  });

  it("el % IVA es obligatorio en la normal y en la liquidación (400)", async () => {
    await expect(save(normalInput({ vatPct: undefined }))).rejects.toMatchObject({ statusCode: 400, message: expect.stringContaining("% de IVA") });
    state.contract = contract({ ctr_state: "IN_LIQUIDATION" });
    await expect(save(liquidationInput({ vatPct: "" }))).rejects.toMatchObject({ statusCode: 400, message: expect.stringContaining("% de IVA") });
    expect(prismaMock.tbl_invoices.create).not.toHaveBeenCalled();
  });

  it("el neto a pagar no puede quedar negativo, contando la amortización y el retenido (400)", async () => {
    // 30.000.000 + IVA 0 − amortización 8.000.000 − retenido 1.500.000 = 20.500.000.
    await expect(save(normalInput({ vatPct: "0", materialsDiscount: "20500000.01" }))).rejects.toMatchObject({
      statusCode: 400,
      message: expect.stringContaining("negativo"),
    });
    await expect(save(normalInput({ vatPct: "0", materialsDiscount: "20500000" }))).resolves.toMatchObject({ invId: 70 });
  });

  it("al aprobar, la instantánea guarda la composición y la versión de fórmula", async () => {
    state.invoice = storedLiquidation({
      inv_type: "NORMAL",
      tbl_invoice_liquidation_details: {
        ...storedLiquidation().tbl_invoice_liquidation_details,
        ild_value: D("30000000"),
        ild_amortization: D("8000000"),
        ild_retention: D("1500000"),
        ild_utility_pct: D("10"),
        ild_vat_pct: D("19"),
        ild_withholding_pct: D("2"),
        ild_vat_withholding_pct: D("15"),
        ild_ica_withholding: D("50000"),
        ild_materials_discount: D("100000"),
        ild_formula_version: 1,
      },
    });
    state.amortizedSum = D("0");
    await expect(approve()).resolves.toMatchObject({ invId: 70 });
    const snapshot = Object.fromEntries(auditRows().filter((r) => r.aud_field.startsWith("snapshot.invoice.")).map((r) => [r.aud_field, r.aud_new_value]));
    // IVA 5.700.000; rte fuente 600.000; rte IVA 855.000;
    // neto 35.700.000 − 600.000 − 855.000 − 50.000 − 8.000.000 − 1.500.000 − 100.000.
    expect(snapshot).toMatchObject({
      "snapshot.invoice.vat": "5700000.00",
      "snapshot.invoice.valueWithVat": "35700000.00",
      "snapshot.invoice.withholding": "600000.00",
      "snapshot.invoice.vatWithholding": "855000.00",
      "snapshot.invoice.icaWithholding": "50000.00",
      "snapshot.invoice.materialsDiscount": "100000.00",
      "snapshot.invoice.total": "24595000.00",
      "snapshot.invoice.utilityPct": "10.00",
      "snapshot.invoice.formulaVersion": "1",
    });
  });

  it("una registrada antes de DEC-075 (sin IVA) se aprueba igual, sin composición en la instantánea", async () => {
    state.invoice = storedLiquidation({ inv_type: "NORMAL" });
    state.amortizedSum = D("0");
    await expect(approve()).resolves.toMatchObject({ invId: 70 });
    expect(auditRows().some((r) => r.aud_field === "snapshot.invoice.total")).toBe(false);
  });

  it("previsualización: compone sin base de datos y dice por qué no se guardaría", () => {
    const preview = service.previewContractInvoice({ value: "2000000", amortization: "10", retention: "10", vatAmount: "380000", withholdingPct: "10" });
    expect(preview).toMatchObject({ valid: true, message: null, total: "2179980.00" });
    expect(preview.captured.vatPct).toBe("19.00");
    expect(preview.pairs.vatPct).toEqual({ amount: "380000.00", pct: "19.00" });
    expect(service.previewContractInvoice({ value: "100" })).toMatchObject({ valid: false, message: expect.stringContaining("% de IVA") });
  });
});

// La de contrato, por su obra; la simple, por las obras de su proveedor (DEC-054).
// Todas las facturas tienen obra, también la simple (DEC-058).
const OWN_INVOICES = { wrk_id: { in: [8] } };

describe("factura normal (DEC-071)", () => {
  const detailUpsert = () => prismaMock.tbl_invoice_liquidation_details.upsert.mock.calls[0][0];
  const normalInput = (overrides = {}) => contractInput({ type: "NORMAL", value: "30000000", vatPct: "19", ...overrides });
  const storedNormal = (overrides = {}) => storedLiquidation({ inv_type: "NORMAL", ...overrides });
  const approved = { inv_state: "APPROVED", inv_approval_date: new Date("2026-03-05T00:00:00Z") };

  beforeEach(() => {
    state.contract = contract({ ctr_state: "IN_PROGRESS" });
    state.advanceSum = D("32000000");
  });

  it("en ejecución: VALOR, amortización y retenido por defecto como la liquidación, sin otrosí", async () => {
    await expect(save(normalInput())).resolves.toMatchObject({ invId: 70 });
    const created = detailUpsert().create;
    expect(created.ccp_id).toBeNull();
    expect(created.ild_value.toFixed(2)).toBe("30000000.00");
    // 30.000.000 × 32.000.000 / 120.000.000 y 30.000.000 × 5 %.
    expect(created.ild_amortization.toFixed(2)).toBe("8000000.00");
    expect(created.ild_retention.toFixed(2)).toBe("1500000.00");
    expect(prismaMock.tbl_contract_concepts.findFirst).not.toHaveBeenCalled();
  });

  it("solo con el contrato en ejecución (409 en liquidación y suspendido)", async () => {
    for (const ctr_state of ["IN_LIQUIDATION", "SUSPENDED"]) {
      state.contract = contract({ ctr_state });
      await expect(save(normalInput())).rejects.toMatchObject({ statusCode: 409 });
    }
  });

  it("I5 al registrar: el VALOR no supera lo que queda por facturar, tampoco el de la liquidación", async () => {
    state.billedSum = D("100000000");
    await expect(save(normalInput({ value: "20000000.01" }))).rejects.toMatchObject({
      statusCode: 409,
      message: expect.stringContaining("queda por facturar del contrato (20000000.00)"),
    });
    await expect(save(normalInput({ value: "20000000" }))).resolves.toMatchObject({ invId: 70 });

    state.contract = contract({ ctr_state: "IN_LIQUIDATION" });
    await expect(save(liquidationInput())).rejects.toMatchObject({ statusCode: 409, message: expect.stringContaining("por facturar") });
  });

  it("I5 al aprobar: revalida contra lo facturado vigente y deja el cambio en la bitácora", async () => {
    state.invoice = storedNormal();
    state.amortizedSum = D("0");
    state.billedSum = D("40000000");
    await expect(approve()).rejects.toMatchObject({ statusCode: 409, message: expect.stringContaining("por facturar") });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();

    state.billedSum = D("20000000");
    await expect(approve()).resolves.toMatchObject({ invId: 70 });
    expect(auditRows().find((r) => r.aud_field === "billing_billed")).toMatchObject({ aud_old_value: "20000000.00", aud_new_value: "110000000.00" });
  });

  it("anular una normal aprobada reduce lo facturado, lo amortizado y lo retenido", async () => {
    state.invoice = storedNormal(approved);
    state.amortizedSum = D("24000000");
    state.retainedSum = D("4500000");
    state.billedSum = D("90000000");
    await expect(cancel([CAN_CANCEL, CAN_CANCEL_APPROVED])).resolves.toMatchObject({ invId: 70 });
    expect(auditRows().find((r) => r.aud_field === "billing_billed")).toMatchObject({ aud_old_value: "90000000.00", aud_new_value: "0.00" });
    expect(auditRows().find((r) => r.aud_field === "advance_amortized")).toMatchObject({ aud_new_value: "0.00" });
  });
});

describe("alcance por obra (DEC-047)", () => {
  it("el listado y el selector de contratos filtran por la obra del alcance", async () => {
    await service.paginationInvoices({ scope: OWN, rows: 10, first: 0 });
    expect(prismaMock.tbl_invoices.findMany.mock.calls.at(-1)[0].where.AND).toEqual([OWN_INVOICES]);
    // El filtro de obra se suma al alcance y no lo reemplaza.
    await service.paginationInvoices({ scope: OWN, wrkId: 9, rows: 10, first: 0 });
    const where = prismaMock.tbl_invoices.findMany.mock.calls.at(-1)[0].where;
    expect(where.AND).toEqual([OWN_INVOICES, { wrk_id: 9 }]);
    await service.selectInvoiceContracts({ type: "ADVANCE", scope: OWN });
    expect(prismaMock.tbl_contracts.findMany.mock.calls.at(-1)[0].where.wrk_id).toEqual({ in: [8] });
  });

  it("una factura de otra obra no se lee, no se aprueba ni se anula (404)", async () => {
    state.invoice = storedInvoice();
    await expect(service.getInvoice({ invId: 70, scope: OTHER })).rejects.toMatchObject({ statusCode: 404, message: "No se encontró la factura." });
    expect(JSON.stringify(prismaMock.tbl_invoices.findFirst.mock.calls[0][0].where)).toContain('"wrk_id":{"in":[9]}');
    await expect(service.approveInvoice({ invId: 70, input: { approvalDate: "2026-03-05" }, useBy: 9, scope: OTHER, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 404,
    });
    await expect(
      service.cancelInvoice({ invId: 70, input: { reaId: 4, observation: "x" }, useBy: 9, granted: new Set([CAN_CANCEL]), scope: OTHER, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.tbl_invoices.update).not.toHaveBeenCalled();
  });

  it("no se registra una factura contra un contrato fuera del alcance, ni una simple en una obra fuera de él (404)", async () => {
    prismaMock.tbl_contracts.findUnique.mockResolvedValueOnce({ wrk_id: 8 });
    await expect(service.saveInvoice({ invId: 0, input: contractInput(), useBy: 9, granted: new Set(), scope: OTHER, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 404,
    });
    await expect(service.saveInvoice({ invId: 0, input: simpleInput(), useBy: 9, granted: new Set(), scope: OTHER, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 404,
      message: "No se encontró la obra.",
    });
    expect(prismaMock.tbl_invoices.create).not.toHaveBeenCalled();
  });
});

// ─── Menús de facturas (DEC-074) ────────────────────────────────────────────

describe("menús de facturas (DEC-074)", () => {
  it("el listado de un menú muestra solo las de su tipo, también en los conteos; sin menú, todas", async () => {
    await service.paginationInvoices({ pvtId: "3", rows: 10, first: 0 });
    expect(prismaMock.tbl_invoices.findMany.mock.calls.at(-1)[0].where).toMatchObject({ pvt_id: 3 });
    expect(prismaMock.tbl_invoices.groupBy.mock.calls.at(-1)[0].where).toMatchObject({ pvt_id: 3 });

    await service.paginationInvoices({ rows: 10, first: 0 });
    expect(prismaMock.tbl_invoices.findMany.mock.calls.at(-1)[0].where).not.toHaveProperty("pvt_id");
  });

  it("cada fila del listado dice su menú: el tipo guardado en la factura y su nombre", async () => {
    prismaMock.tbl_invoices.findMany.mockResolvedValueOnce([
      { inv_id: 1, inv_type: "SIMPLE", pvt_id: 1, tbl_provider_types: { pvt_name: "Simple" }, tbl_contracts: null },
      { inv_id: 2, inv_type: "LIQUIDATION", pvt_id: 2, tbl_provider_types: { pvt_name: "Subcontratista" }, tbl_contracts: { ctr_number: "C-1" } },
    ]);
    const { results } = await service.paginationInvoices({ rows: 10, first: 0 });
    expect(results.map((r) => [r.pvtId, r.menuName])).toEqual([
      [1, "Simple"],
      [2, "Subcontratista"],
    ]);
  });

  it("la de contrato guarda el tipo de su contrato y lo deja en la bitácora", async () => {
    await expect(save(contractInput())).resolves.toMatchObject({ invId: 70 });
    expect(prismaMock.tbl_provider_types.findUnique.mock.calls.at(-1)[0].where).toEqual({ pvt_id: 3 });
    expect(prismaMock.tbl_invoices.create.mock.calls[0][0].data).toMatchObject({ pvt_id: 3 });
    expect(auditRows().find((r) => r.aud_field === "pvt_id")).toMatchObject({ aud_operation: "CREAR", aud_new_value: "3" });
  });

  it("registrada desde el menú de otro tipo, la de contrato responde 400", async () => {
    await expect(save(contractInput({ pvtId: 2 }))).rejects.toMatchObject({ statusCode: 400, message: expect.stringContaining("no es del menú de facturas") });
    await expect(save(contractInput({ pvtId: 3 }))).resolves.toMatchObject({ invId: 70 });
  });

  it("un contrato cuyo tipo no factura con contrato no admite facturas (409)", async () => {
    state.contract = contract({ ctr_number: "C-07" });
    state.providerType = { pvt_name: "Simple", pvt_invoice_mode: "SIMPLE" };
    await expect(save(contractInput())).rejects.toMatchObject({ statusCode: 409, message: expect.stringContaining("El contrato C-07 no admite facturas") });
    state.providerType = { pvt_name: "Sin facturas", pvt_invoice_mode: null };
    await expect(save(contractInput())).rejects.toMatchObject({ statusCode: 409 });
    expect(prismaMock.tbl_invoices.create).not.toHaveBeenCalled();
  });

  it("la simple guarda el tipo del menú desde el que se registra, que debe ser uno simple de la asignación (400)", async () => {
    state.assignment = assignment({}, 2);
    await expect(save(simpleInput({ pvtId: 2 }))).resolves.toMatchObject({ invId: 70 });
    expect(prismaMock.tbl_invoices.create.mock.calls[0][0].data).toMatchObject({ inv_type: "SIMPLE", pvt_id: 2 });
    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_works/), expect.stringMatching(/tbl_providers/), expect.stringMatching(/tbl_provider_types/)]);

    prismaMock.tbl_provider_types.findUnique.mockResolvedValueOnce({ pvt_name: "Orden de servicio" });
    await expect(save(simpleInput({ pvtId: 9 }))).rejects.toMatchObject({
      statusCode: 400,
      message: 'Aceros SA no trabaja en esta obra con el tipo de proveedor "Orden de servicio".',
    });
  });

  it("la simple sin menú (desde un expediente) toma el único tipo simple; con varios, 400", async () => {
    await save(simpleInput());
    expect(prismaMock.tbl_invoices.create.mock.calls[0][0].data).toMatchObject({ pvt_id: 1 });

    state.assignment = assignment({}, 2);
    await expect(save(simpleInput())).rejects.toMatchObject({ statusCode: 400, message: expect.stringContaining("varios tipos de facturas simples") });
  });

  it("editar una simple con otro proveedor exige que trabaje en la obra con el tipo de la factura (400)", async () => {
    state.invoice = storedSimple({ pvt_id: 2 });
    await expect(save(simpleInput({ prvId: 78 }), 70)).rejects.toMatchObject({ statusCode: 400, message: expect.stringContaining("no trabaja en esta obra con el tipo") });
    state.assignment = assignment({}, 2);
    await expect(save(simpleInput({ prvId: 78 }), 70)).resolves.toMatchObject({ invId: 70 });
  });

  it("el detalle dice su menú: tipo, nombre y forma", async () => {
    prismaMock.tbl_invoices.findFirst.mockResolvedValueOnce({
      ...storedInvoice(),
      tbl_provider_types: { pvt_name: "Contrato mayor", pvt_invoice_mode: "CONTRACT" },
      tbl_contracts: { ctr_number: "C-1", ctr_name: "Suministro", ctr_state: "IN_PROGRESS", tbl_work_stages: null },
      tbl_invoice_status_history: [],
    });
    await expect(service.getInvoice({ invId: 70 })).resolves.toMatchObject({ pvtId: 3, menuName: "Contrato mayor", menuMode: "CONTRACT" });
  });

  it("el reporte de un menú lleva su nombre; el de forma simple, sin tipo ni contrato", async () => {
    prismaMock.tbl_provider_types.findFirst.mockResolvedValueOnce({ pvt_id: 1, pvt_name: "Simple", pvt_invoice_mode: "SIMPLE", pvt_invoice_menu: true, sta_id: 1 });
    const file = await service.exportInvoices({ pvtId: 1, format: "xlsx" });
    expect(prismaMock.tbl_provider_types.findFirst.mock.calls.at(-1)[0].where).toEqual({ pvt_id: 1, sta_id: { not: 3 }, pvt_invoice_mode: { not: null } });
    expect(prismaMock.tbl_invoices.findMany.mock.calls.at(-1)[0].where).toMatchObject({ pvt_id: 1 });
    expect(file).toMatchObject({ extension: "xlsx" });
  });

  it("el reporte de un tipo que no factura responde 404 sin leer facturas", async () => {
    prismaMock.tbl_invoices.findMany.mockClear();
    prismaMock.tbl_provider_types.findFirst.mockResolvedValueOnce(null);
    await expect(service.exportInvoices({ pvtId: 5, format: "xlsx" })).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.tbl_invoices.findMany).not.toHaveBeenCalled();
  });

  it("si el proveedor del contrato cambió entre la lectura y el bloqueo, responde 409", async () => {
    prismaMock.tbl_contracts.findUnique.mockResolvedValueOnce({ prv_id: 12 });
    await expect(save(contractInput())).rejects.toMatchObject({ statusCode: 409, message: expect.stringMatching(/cambió/) });
    expect(prismaMock.tbl_invoices.create).not.toHaveBeenCalled();
  });
});
