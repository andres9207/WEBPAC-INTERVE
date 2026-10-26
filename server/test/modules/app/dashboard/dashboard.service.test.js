import { jest } from "@jest/globals";

// Tablero (ADR-0002, DEC-052): cada bloque solo con el permiso de su módulo,
// todo dentro del alcance por obra, y el estado de pólizas contado con el
// mismo predicado que el listado de contratos. Que las cifras cuadren con los
// listados contra la BD real se comprobó en vivo; aquí, la forma y las reglas.

const prismaMock = {
  // Días de aviso de las pólizas (DEC-072): sin filas, el valor por defecto (30).
  tbl_business_rules: { findMany: jest.fn(async () => []) },
  tbl_works: { count: jest.fn(async () => 4), findMany: jest.fn(async () => []) },
  tbl_providers: { count: jest.fn(async () => 6) },
  tbl_contracts: { groupBy: jest.fn(async () => []), count: jest.fn(async () => 0), findMany: jest.fn(async () => []) },
  tbl_policies: { count: jest.fn(async () => 0), findMany: jest.fn(async () => []) },
  tbl_invoices: { count: jest.fn(async () => 0), groupBy: jest.fn(async () => []), findMany: jest.fn(async () => []) },
  // Nombres de los menús de las pendientes (DEC-074).
  tbl_provider_types: { findMany: jest.fn(async () => []) },
  // Seguimientos abiertos (DEC-076).
  tbl_invoice_follow_ups: { count: jest.fn(async () => 0), findMany: jest.fn(async () => []) },
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { getDashboardSummary } = await import("../../../../src/modules/app/dashboard/dashboard.service.js");

const WORKS = 52;
const PROVIDERS = 60;
const CONTRACTS = 68;
const POLICIES = 99;
// Un solo permiso de ver para todos los menús de facturas (DEC-074).
const INVOICES = 115;
const ALL = new Set([WORKS, PROVIDERS, CONTRACTS, POLICIES, INVOICES]);
const OWN = Object.freeze({ all: false, wrkId: 8 });

// Obras finalizadas con contratos por liquidar (DEC-083) también leen tbl_works:
// los casos que siembran obras en seguimiento las separan por `wrk_state`.
const worksOnly = (rows) => async ({ where }) => (where?.wrk_state ? [] : rows);

const allWheres = () =>
  Object.values(prismaMock)
    .flatMap((model) => Object.values(model))
    .flatMap((fn) => fn.mock.calls.map((call) => call[0]?.where))
    .filter(Boolean);

beforeEach(() => jest.clearAllMocks());

describe("getDashboardSummary", () => {
  it("obras finalizadas con contratos por liquidar (DEC-083): en el alcance, con cada contrato abierto", async () => {
    prismaMock.tbl_works.findMany.mockImplementationOnce(async () => [
      {
        wrk_id: 8,
        wrk_code: "OB-8",
        wrk_name: "Vía",
        wrk_finish_date: new Date("2026-10-20T00:00:00Z"),
        tbl_contracts: [{ ctr_id: 20, ctr_number: "C-1", ctr_name: "Concreto", ctr_state: "IN_LIQUIDATION", tbl_providers: { prv_name: "Acme" } }],
      },
    ]);

    const { contracts } = await getDashboardSummary({ granted: new Set([CONTRACTS]), scope: OWN });

    expect(contracts.finishedWorksToLiquidate).toEqual({
      contracts: 1,
      works: [
        {
          wrkId: 8,
          code: "OB-8",
          name: "Vía",
          finishDate: "2026-10-20",
          contracts: [{ ctrId: 20, number: "C-1", name: "Concreto", providerName: "Acme", state: "IN_LIQUIDATION", stateName: "En liquidación" }],
        },
      ],
    });
    const { where } = prismaMock.tbl_works.findMany.mock.calls[0][0];
    expect(where).toMatchObject({ wrk_state: "FINISHED", wrk_id: { in: [8] }, tbl_contracts: { some: { ctr_state: { notIn: ["LIQUIDATED", "CANCELLED"] } } } });
  });

  it("sin permisos no calcula nada: todos los bloques en null", async () => {
    const summary = await getDashboardSummary({ granted: new Set(), scope: OWN });
    expect(summary).toMatchObject({ works: null, providers: null, contracts: null, policies: null, invoices: null, worksActivity: null });
    expect(allWheres()).toEqual([]);
    expect(summary.expiringDays).toBe(30);
    expect(summary.referenceDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("el estado de pólizas exige ver contratos y pólizas", async () => {
    expect((await getDashboardSummary({ granted: new Set([POLICIES]), scope: OWN })).policies).toBeNull();
    expect((await getDashboardSummary({ granted: new Set([CONTRACTS]), scope: OWN })).policies).toBeNull();
    expect((await getDashboardSummary({ granted: new Set([CONTRACTS, POLICIES]), scope: OWN })).policies).not.toBeNull();
  });

  it("seguimientos abiertos (DEC-076): cuántos y a qué facturas, en el alcance, con los días abiertos que calcula el servidor", async () => {
    prismaMock.tbl_invoice_follow_ups.count.mockResolvedValueOnce(1);
    prismaMock.tbl_invoice_follow_ups.findMany.mockResolvedValueOnce([
      {
        ifu_id: 5,
        ifu_open_date: new Date("2026-10-01T00:00:00Z"),
        ifu_description: "Falta el soporte",
        created_by_user: { use_name: "Ana", use_last_name: "Ruiz" },
        tbl_invoices: { inv_id: 70, pvt_id: 3, inv_type: "NORMAL", inv_number: "F-70", inv_state: "REGISTERED", tbl_providers: { prv_name: "Acme" }, tbl_works: { wrk_code: "OB-8" }, tbl_contracts: { ctr_number: "C-1" } },
      }
    ]);
    const { invoices, referenceDate } = await getDashboardSummary({ granted: ALL, scope: OWN });

    const { where, orderBy } = prismaMock.tbl_invoice_follow_ups.findMany.mock.calls[0][0];
    expect(where).toEqual({ ifu_close_date: null, sta_id: { not: 3 }, tbl_invoices: { wrk_id: { in: [8] }, sta_id: { not: 3 } } });
    expect(orderBy).toEqual([{ ifu_open_date: "asc" }, { ifu_id: "asc" }]);
    const days = Math.round((new Date(`${referenceDate}T00:00:00Z`) - new Date("2026-10-01T00:00:00Z")) / 86400000);
    expect(invoices.followUps).toEqual({
      count: 1,
      items: [
        {
          ifuId: 5,
          invId: 70,
          pvtId: 3,
          number: "F-70",
          typeName: "Normal",
          state: "REGISTERED",
          providerName: "Acme",
          workCode: "OB-8",
          contractNumber: "C-1",
          openDate: "2026-10-01",
          daysOpen: Math.max(0, days),
          description: "Falta el soporte",
          createdByName: "Ana Ruiz",
        },
      ],
    });
  });

  it("toda consulta lleva el alcance por obra", async () => {
    await getDashboardSummary({ granted: ALL, scope: OWN });
    const scoped = (where) => JSON.stringify(where).includes('"in":[8]') || JSON.stringify(where).includes('"wrk_id":{"in":[8]}');
    // La única sin alcance propio: el nombre de las obras ya elegidas del alcance.
    const unscoped = allWheres().filter((where) => !scoped(where) && !where.wrk_id?.in);
    expect(unscoped).toEqual([]);
  });

  it("clasifica cada contrato del alcance por su póliza de mayor exposición; las categorías suman el total (DEC-064)", async () => {
    const concept = { ccp_id: 1, ccp_direct_cost: "1000.00", ccp_admin_pct: "0", ccp_contingency_pct: "0", ccp_profit_pct: "0", ccp_vat_pct: "0", sta_id: 1 };
    const small = { ccp_id: 1, pol_base: "DIRECT_COST", pol_percentage: "1", pol_end_date: new Date("2000-01-01T00:00:00Z") };
    const big = { ccp_id: 1, pol_base: "DIRECT_COST", pol_percentage: "50", pol_end_date: new Date("2999-01-01T00:00:00Z") };
    prismaMock.tbl_contracts.findMany.mockResolvedValue([
      { ctr_id: 1, tbl_contract_concepts: [concept], tbl_policies: [small, big] },
      { ctr_id: 2, tbl_contract_concepts: [concept], tbl_policies: [small] },
      { ctr_id: 3, tbl_contract_concepts: [concept], tbl_policies: [] },
    ]);
    const { policies } = await getDashboardSummary({ granted: ALL, scope: OWN });

    expect(policies.byStatus.map((s) => [s.status, s.count])).toEqual([
      ["EXPIRED", 1],
      ["EXPIRING", 0],
      ["NO_DATE", 0],
      ["NONE", 1],
      ["ACTIVE", 1],
    ]);
    expect(policies.total).toBe(3);
    const { where, select } = prismaMock.tbl_contracts.findMany.mock.calls[0][0];
    expect(where).toEqual({ sta_id: { not: 3 }, wrk_id: { in: [8] } });
    expect(select.tbl_policies.where).toEqual({ pol_is_current: true });
  });

  it("facturas: las anuladas no cuentan; obras ordenadas por cantidad, con su nombre", async () => {
    prismaMock.tbl_invoices.groupBy.mockImplementation(async ({ by }) =>
      by.includes("inv_state")
        ? [
            { wrk_id: 3, inv_state: "REGISTERED", _count: { _all: 1 } },
            { wrk_id: 8, inv_state: "REGISTERED", _count: { _all: 2 } },
            { wrk_id: 8, inv_state: "APPROVED", _count: { _all: 3 } },
          ]
        : []
    );
    prismaMock.tbl_works.findMany.mockImplementation(worksOnly([
      { wrk_id: 8, wrk_code: "OB-8", wrk_name: "Vía" },
      { wrk_id: 3, wrk_code: "OB-3", wrk_name: "Puente" },
    ]));
    const { invoices } = await getDashboardSummary({ granted: new Set([INVOICES]), scope: OWN });

    const { where } = prismaMock.tbl_invoices.groupBy.mock.calls.find(([args]) => args.by[0] === "wrk_id")[0];
    expect(where.inv_state).toEqual({ in: ["REGISTERED", "APPROVED"] });
    // Todas tienen obra, también la simple (DEC-058): cuentan las de todos los menús.
    expect(where).not.toHaveProperty("wrk_id");
    expect(JSON.stringify(where.AND)).toContain('"wrk_id":{"in":[8]}');
    expect(invoices.byWork).toEqual([
      { wrkId: 8, registered: 2, approved: 3, workCode: "OB-8", workName: "Vía" },
      { wrkId: 3, registered: 1, approved: 0, workCode: "OB-3", workName: "Puente" },
    ]);
  });

  it("facturas: de todos los menús con un solo permiso, y las pendientes por menú, por nombre (DEC-074)", async () => {
    prismaMock.tbl_invoices.groupBy.mockImplementation(async ({ by }) =>
      by[0] === "pvt_id"
        ? [
            { pvt_id: 3, _count: { _all: 4 } },
            { pvt_id: 1, _count: { _all: 2 } },
          ]
        : []
    );
    prismaMock.tbl_provider_types.findMany.mockResolvedValue([
      { pvt_id: 1, pvt_name: "Simple" },
      { pvt_id: 3, pvt_name: "Contrato mayor" },
    ]);
    const { invoices } = await getDashboardSummary({ granted: new Set([INVOICES]), scope: OWN });

    expect(invoices.pendingByMenu).toEqual([
      { pvtId: 3, name: "Contrato mayor", count: 4 },
      { pvtId: 1, name: "Simple", count: 2 },
    ]);
    expect(invoices.pendingApproval).toBe(6);
    const pendingCall = prismaMock.tbl_invoices.groupBy.mock.calls.find(([args]) => args.by[0] === "pvt_id")[0];
    expect(pendingCall.where).toEqual({ sta_id: { not: 3 }, AND: [{ wrk_id: { in: [8] } }], inv_state: "REGISTERED" });

    jest.clearAllMocks();
    expect((await getDashboardSummary({ granted: new Set([WORKS]), scope: OWN })).invoices).toBeNull();
    expect(prismaMock.tbl_invoices.count).not.toHaveBeenCalled();
  });

  it("obras en seguimiento: solo activas, con las cifras de los módulos que el usuario ve", async () => {
    prismaMock.tbl_contracts.groupBy.mockImplementation(async ({ by }) => (by[0] === "wrk_id" ? [{ wrk_id: 8, _count: { _all: 2 } }] : []));
    prismaMock.tbl_works.findMany.mockImplementation(worksOnly([{ wrk_id: 8, wrk_code: "OB-8", wrk_name: "Vía" }]));
    const { worksActivity } = await getDashboardSummary({ granted: new Set([WORKS, CONTRACTS]), scope: OWN });

    expect(worksActivity).toEqual([{ wrkId: 8, contracts: 2, invoices: null, workCode: "OB-8", workName: "Vía" }]);
    expect(prismaMock.tbl_works.findMany.mock.calls.at(-1)[0].where).toMatchObject({ sta_id: 1 });
    expect(prismaMock.tbl_invoices.groupBy).not.toHaveBeenCalled();
  });

  it("pólizas por vencer: con su vigencia calculada contra la fecha del servidor", async () => {
    prismaMock.tbl_policies.findMany.mockResolvedValue([
      {
        pol_id: 14,
        pol_number: "P-1",
        pol_end_date: new Date("2000-01-01T00:00:00Z"),
        ctr_id: 20,
        tbl_policy_types: { plt_name: "Cumplimiento" },
        tbl_contracts: { ctr_number: "C-6", tbl_works: { wrk_code: "OB-2" } },
      },
    ]);
    const { policies } = await getDashboardSummary({ granted: ALL, scope: OWN });
    expect(policies.upcoming).toEqual([
      expect.objectContaining({ polId: 14, ctrId: 20, endDate: "2000-01-01", validity: "EXPIRED", validityName: "Vencida", contractNumber: "C-6" }),
    ]);
    expect(prismaMock.tbl_policies.findMany.mock.calls[0][0].where).toMatchObject({ pol_is_current: true });
  });
});
