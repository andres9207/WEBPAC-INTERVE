import { jest } from "@jest/globals";

// Tablero de la obra (DEC-063): solo con una obra concreta en el alcance,
// cada bloque con el permiso de su módulo, todo restringido a esa obra, y las
// cifras con los cálculos del contrato y de los saldos (contractTotals,
// contractBalances), no con unos propios. Que cuadren con el expediente
// contra la BD real se comprobó en vivo; aquí, la forma y las reglas.

const concept = (overrides = {}) => ({
  ccp_id: 1,
  ctr_id: 20,
  ccp_type: "INITIAL",
  ccp_number: null,
  ccp_start_date: new Date("2026-01-10T00:00:00Z"),
  ccp_description: null,
  ccp_direct_cost: "1000.00",
  ccp_admin_pct: "0.00",
  ccp_contingency_pct: "0.00",
  ccp_profit_pct: "0.00",
  ccp_vat_pct: "0.00",
  ccp_advance_pct: "10.00",
  ccp_retention_pct: "5.00",
  ccp_extension: null,
  sta_id: 1,
  ...overrides,
});

const CONCEPTS = [concept(), concept({ ccp_id: 2, ccp_type: "AMENDMENT", ccp_number: 1, ccp_direct_cost: "500.00" })];

const CONTRACT = {
  ctr_id: 20,
  wks_id: 3,
  ctr_number: "C-1",
  ctr_name: "Concreto",
  ctr_start_date: new Date("2026-02-01T00:00:00Z"),
  ctr_end_date: new Date("2026-12-31T00:00:00Z"),
  ctr_state: "IN_PROGRESS",
  tbl_providers: { prv_name: "Concretos" },
  tbl_work_stages: { wks_name: "Cimentación" },
  tbl_contract_types: { ctt_name: "Obra civil" },
  tbl_contract_concepts: CONCEPTS,
};

const prismaMock = {
  // Días de aviso de las pólizas (DEC-072): sin filas, el valor por defecto (30).
  tbl_business_rules: { findMany: jest.fn(async () => []) },
  tbl_works: { findFirst: jest.fn() },
  tbl_contracts: { findMany: jest.fn() },
  tbl_policies: { findMany: jest.fn() },
  tbl_invoices: { findMany: jest.fn() },
  tbl_work_providers: { findMany: jest.fn() },
  tbl_contract_concepts: { findMany: jest.fn() },
  tbl_invoice_advance_details: { aggregate: jest.fn() },
  tbl_invoice_liquidation_details: { aggregate: jest.fn() },
  tbl_invoice_retention_refund_details: { aggregate: jest.fn() },
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { getWorkDashboard } = await import("../../../../src/modules/app/dashboard/workDashboard.service.js");

const WORKS = 52;
const PROVIDERS = 60;
const CONTRACTS = 68;
const POLICIES = 99;
// Un solo permiso de ver para todos los menús de facturas (DEC-074).
const INVOICES = 115;
const ALL = new Set([WORKS, PROVIDERS, CONTRACTS, POLICIES, INVOICES]);
const OWN = Object.freeze({ all: false, wrkId: 8 });

// Consultas de datos de la obra. El umbral de "a vencer" (regla de negocio,
// DEC-072) se lee siempre: va en la respuesta aunque no haya obra.
const allCalls = () =>
  Object.entries(prismaMock)
    .filter(([model]) => model !== "tbl_business_rules")
    .flatMap(([, model]) => Object.values(model))
    .flatMap((fn) => fn.mock.calls);

const invoice = (overrides = {}) => ({
  inv_id: 1,
  inv_type: "ADVANCE",
  pvt_id: 3,
  tbl_provider_types: { pvt_name: "Contrato mayor" },
  ctr_id: 20,
  inv_number: "F-1",
  inv_date: new Date("2026-02-20T00:00:00Z"),
  inv_state: "APPROVED",
  tbl_providers: { prv_name: "Concretos" },
  tbl_contracts: { ctr_number: "C-1" },
  tbl_invoice_advance_details: { iad_value: "40.00" },
  tbl_invoice_liquidation_details: null,
  tbl_invoice_retention_refund_details: null,
  ...overrides,
});

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.tbl_works.findFirst.mockResolvedValue({
    wrk_id: 8,
    wrk_code: "OB-8",
    wrk_name: "Torre",
    wrk_start_date: new Date("2026-01-01T00:00:00Z"),
    wrk_initial_term: 12,
    wrk_term_unit: "MES",
    wrk_initial_value: "3000.00",
    wrk_extended_value: null,
    sta_id: 1,
    tbl_status: { sta_name: "Activo" },
    tbl_construction_companies: { cnc_description: "Constructora" },
    tbl_contract_types: { ctt_name: "Precio global" },
    tbl_supervision_types: { spt_name: "Técnica" },
    tbl_work_managers: [{ wkm_role: "MAIN", tbl_users: { use_name: "Laura", use_last_name: "Gómez" } }],
    tbl_work_stages: [{ wks_id: 3, wks_name: "Cimentación", sta_id: 1 }],
  });
  prismaMock.tbl_contracts.findMany.mockResolvedValue([CONTRACT]);
  prismaMock.tbl_policies.findMany.mockResolvedValue([
    {
      pol_id: 5,
      ctr_id: 20,
      ccp_id: 1,
      pol_number: "POL-1",
      pol_base: "TOTAL_VALUE",
      pol_percentage: "10",
      pol_start_date: new Date("1999-01-01T00:00:00Z"),
      pol_end_date: new Date("2000-01-01T00:00:00Z"),
      tbl_policy_types: { plt_name: "Cumplimiento" },
    },
  ]);
  prismaMock.tbl_invoices.findMany.mockResolvedValue([]);
  prismaMock.tbl_work_providers.findMany.mockResolvedValue([]);
  prismaMock.tbl_contract_concepts.findMany.mockResolvedValue(CONCEPTS);
  prismaMock.tbl_invoice_advance_details.aggregate.mockResolvedValue({ _sum: { iad_value: "75.00" } });
  prismaMock.tbl_invoice_liquidation_details.aggregate.mockResolvedValue({ _sum: { ild_amortization: "30.00", ild_retention: "20.00" } });
  prismaMock.tbl_invoice_retention_refund_details.aggregate.mockResolvedValue({ _sum: { irr_value: "5.00" } });
});

describe("getWorkDashboard", () => {
  it.each([
    ["Ver todo", { all: true, wrkId: null }],
    ["sin obra", { all: false, wrkId: null }],
  ])("%s: nada que mostrar, sin consultar la BD", async (_label, scope) => {
    const summary = await getWorkDashboard({ granted: ALL, scope });
    expect(summary).toMatchObject({ wrkId: null, work: null, contracts: null, invoices: null, providers: null });
    expect(summary.referenceDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(allCalls()).toEqual([]);
  });

  it("sin permisos no calcula nada: todos los bloques en null", async () => {
    const summary = await getWorkDashboard({ granted: new Set(), scope: OWN });
    expect(summary).toMatchObject({ wrkId: 8, work: null, contracts: null, invoices: null, providers: null });
    expect(allCalls()).toEqual([]);
  });

  it("toda consulta se restringe a la obra del alcance", async () => {
    await getWorkDashboard({ granted: ALL, scope: OWN });
    expect(prismaMock.tbl_works.findFirst.mock.calls[0][0].where).toMatchObject({ wrk_id: 8 });
    expect(prismaMock.tbl_contracts.findMany.mock.calls[0][0].where).toMatchObject({ wrk_id: 8, sta_id: { not: 3 } });
    expect(prismaMock.tbl_policies.findMany.mock.calls[0][0].where).toMatchObject({ pol_is_current: true, tbl_contracts: { wrk_id: 8 } });
    for (const [args] of prismaMock.tbl_invoices.findMany.mock.calls) expect(args.where).toMatchObject({ wrk_id: 8 });
    expect(prismaMock.tbl_work_providers.findMany.mock.calls[0][0].where).toMatchObject({ wrk_id: 8 });
    // Los saldos, solo de los contratos de la obra.
    for (const [args] of prismaMock.tbl_contract_concepts.findMany.mock.calls) expect(args.where).toEqual({ ctr_id: 20 });
  });

  it("valor vigente y saldos con los cálculos del contrato (contractTotals, contractBalances)", async () => {
    const { work, contracts } = await getWorkDashboard({ granted: ALL, scope: OWN });
    const [item] = contracts.items;

    expect(work).toMatchObject({ code: "OB-8", currentValue: "3000.00", extended: false, endDate: "2027-01-01" });
    expect(work.managers).toEqual([{ name: "Laura Gómez", role: "MAIN" }]);
    // 1000 + 500 de costo directo, sin AIU ni IVA; anticipo 10 % y retenido 5 % de la base.
    expect(item).toMatchObject({ currentValue: "1500.00", stateName: "En ejecución", stageName: "Cimentación" });
    expect(item.advance).toEqual({ agreed: "150.00", invoiced: "75.00", amortized: "30.00", toAmortize: "45.00", invoicedPct: "50.00", amortizedPct: "20.00" });
    expect(item.retention).toEqual({ agreed: "75.00", retained: "20.00", refunded: "5.00", balance: "15.00" });
    expect(contracts).toMatchObject({ total: 1, contracted: "1500.00", contractedPct: "50.00" });
    expect(contracts.retention).toEqual({ retained: "20.00", balance: "15.00", balancePct: "75.00" });
    expect(contracts.withRetentionBalance).toEqual([{ ctrId: 20, number: "C-1", balance: "15.00", stateName: "En ejecución" }]);
    expect(contracts.byState.find((s) => s.state === "IN_PROGRESS")).toMatchObject({ count: 1, value: "1500.00", countPct: "100.00" });
  });

  it("pólizas: la categoría del tablero general, la póliza que la decide y los conceptos sin póliza", async () => {
    const { contracts } = await getWorkDashboard({ granted: ALL, scope: OWN });
    expect(contracts.items[0].policies).toMatchObject({
      status: "EXPIRED",
      statusName: "Con póliza vencida",
      deciding: { polId: 5, validity: "EXPIRED", endDate: "2000-01-01" },
      uncovered: [{ ccpId: 2, label: "Otrosí N.º 1" }],
    });
    expect(contracts.policies).toEqual([expect.objectContaining({ polId: 5, validityName: "Vencida" })]);
  });

  it("pestaña Pólizas: concepto amparado, tipo de contrato y conteos por vigencia y contratos sin póliza", async () => {
    prismaMock.tbl_contracts.findMany.mockResolvedValue([
      CONTRACT,
      {
        ctr_id: 21,
        wks_id: 3,
        ctr_number: "C-2",
        ctr_name: "Acero",
        ctr_start_date: new Date("2026-02-01T00:00:00Z"),
        ctr_end_date: new Date("2026-12-31T00:00:00Z"),
        ctr_state: "LIQUIDATED",
        tbl_providers: { prv_name: "Aceros" },
        tbl_work_stages: null,
        tbl_contract_types: { ctt_name: "Suministro" },
        tbl_contract_concepts: [],
      },
    ]);

    const { contracts } = await getWorkDashboard({ granted: ALL, scope: OWN });

    expect(contracts.items.map((c) => c.contractTypeName)).toEqual(["Obra civil", "Suministro"]);
    expect(contracts.policies[0]).toMatchObject({ polId: 5, conceptLabel: "Valor inicial" });
    // El liquidado sin pólizas también cuenta como contrato sin póliza.
    expect(contracts.policyCounts).toEqual({ NO_DATE: 0, ACTIVE: 0, EXPIRING: 0, EXPIRED: 1, withoutPolicy: 1 });
  });

  it("el estado de pólizas exige ver contratos y pólizas", async () => {
    const { contracts } = await getWorkDashboard({ granted: new Set([CONTRACTS]), scope: OWN });
    expect(contracts.items[0].policies).toBeNull();
    expect(contracts.policies).toBeNull();
    expect(contracts.policyCounts).toBeNull();
    expect(prismaMock.tbl_policies.findMany).not.toHaveBeenCalled();
  });

  it("facturas: sin anuladas, de todos los menús; la simple cuenta sin importe", async () => {
    prismaMock.tbl_invoices.findMany.mockImplementation(async ({ take }) =>
      take
        ? []
        : [
            invoice(),
            invoice({ inv_id: 2, inv_state: "REGISTERED", pvt_id: 1, tbl_provider_types: { pvt_name: "Simple" }, inv_type: "SIMPLE", ctr_id: null, tbl_contracts: null, tbl_invoice_advance_details: null }),
            invoice({
              inv_id: 3,
              inv_state: "REGISTERED",
              inv_type: "LIQUIDATION",
              tbl_invoice_advance_details: null,
              tbl_invoice_liquidation_details: { ild_value: "60.00" },
            }),
          ]
    );
    const { invoices } = await getWorkDashboard({ granted: new Set([CONTRACTS, INVOICES]), scope: OWN });

    const [aggregated] = prismaMock.tbl_invoices.findMany.mock.calls.find(([args]) => !args.take);
    expect(aggregated.where.inv_state).toEqual({ in: ["REGISTERED", "APPROVED"] });
    expect(aggregated.where).toEqual({ wrk_id: 8, sta_id: { not: 3 }, inv_state: { in: ["REGISTERED", "APPROVED"] } });

    expect(invoices).toMatchObject({ approvedCount: 1, approvedValue: "40.00", pendingCount: 2, pendingValue: "60.00", total: "100.00", count: 3 });
    // Lo aprobado frente a lo contratado (1500).
    expect(invoices.approvedPct).toBe("2.67");
    expect(invoices.byType).toEqual([
      { type: "ADVANCE", name: "Anticipo", count: 1, value: "40.00", pct: "40.00" },
      { type: "LIQUIDATION", name: "Liquidación", count: 1, value: "60.00", pct: "60.00" },
      { type: "SIMPLE", name: "Simple", count: 1, value: null, pct: "0.00" },
    ]);
    expect(invoices.byContract).toEqual([
      expect.objectContaining({ ctrId: 20, total: "100.00", pending: "60.00" }),
    ]);
    // Por aprobar por menú, por nombre (DEC-074).
    expect(invoices.pendingByMenu).toEqual([
      { pvtId: 3, name: "Contrato mayor", count: 1 },
      { pvtId: 1, name: "Simple", count: 1 },
    ]);
    expect(invoices.byMonth).toHaveLength(12);
    // Las filas de las cifras, con el valor con que entran en ellas: el detalle
    // de cada cifra las filtra en el cliente (la simple, sin contrato ni importes).
    expect(invoices.items).toEqual([
      expect.objectContaining({ invId: 1, type: "ADVANCE", state: "APPROVED", ctrId: 20, value: "40.00" }),
      expect.objectContaining({ invId: 2, type: "SIMPLE", state: "REGISTERED", ctrId: null, value: null }),
      expect.objectContaining({ invId: 3, type: "LIQUIDATION", state: "REGISTERED", ctrId: 20, value: "60.00" }),
    ]);
  });

  it("sin ver contratos, lo facturado no se compara con lo contratado", async () => {
    const { contracts, invoices } = await getWorkDashboard({ granted: new Set([INVOICES]), scope: OWN });
    expect(contracts).toBeNull();
    expect(invoices.approvedPct).toBeNull();
    expect(prismaMock.tbl_contracts.findMany).not.toHaveBeenCalled();
  });
});
