import { jest } from "@jest/globals";

// Tablero (ADR-0002, DEC-052): cada bloque solo con el permiso de su módulo,
// todo dentro del alcance por obra, y el estado de pólizas contado con el
// mismo predicado que el listado de contratos. Que las cifras cuadren con los
// listados contra la BD real se comprobó en vivo; aquí, la forma y las reglas.

const prismaMock = {
  tbl_works: { count: jest.fn(async () => 4), findMany: jest.fn(async () => []) },
  tbl_providers: { count: jest.fn(async () => 6) },
  tbl_contracts: { groupBy: jest.fn(async () => []), count: jest.fn(async () => 0) },
  tbl_policies: { count: jest.fn(async () => 0), findMany: jest.fn(async () => []) },
  tbl_invoices: { count: jest.fn(async () => 0), groupBy: jest.fn(async () => []), findMany: jest.fn(async () => []) },
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { getDashboardSummary } = await import("../../../../src/modules/app/dashboard/dashboard.service.js");
const { contractPolicyStatusWhere, CONTRACT_POLICY_STATUS } = await import("../../../../src/modules/work/contracts/policyTerms.js");

const WORKS = 52;
const PROVIDERS = 60;
const CONTRACTS = 68;
const POLICIES = 99;
const INVOICES = 83;
const ALL = new Set([WORKS, PROVIDERS, CONTRACTS, POLICIES, INVOICES]);
const OWN = Object.freeze({ all: false, wrkId: 8 });

const allWheres = () =>
  Object.values(prismaMock)
    .flatMap((model) => Object.values(model))
    .flatMap((fn) => fn.mock.calls.map((call) => call[0]?.where))
    .filter(Boolean);

beforeEach(() => jest.clearAllMocks());

describe("getDashboardSummary", () => {
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

  it("toda consulta lleva el alcance por obra", async () => {
    await getDashboardSummary({ granted: ALL, scope: OWN });
    const scoped = (where) => JSON.stringify(where).includes('"in":[8]') || JSON.stringify(where).includes('"wrk_id":{"in":[8]}');
    // La única sin alcance propio: el nombre de las obras ya elegidas del alcance.
    const unscoped = allWheres().filter((where) => !scoped(where) && !where.wrk_id?.in);
    expect(unscoped).toEqual([]);
  });

  it("cuenta cada categoría de pólizas con el predicado del listado, sobre el mismo universo", async () => {
    prismaMock.tbl_contracts.count.mockImplementation(async ({ where }) => (where.AND ? 1 : 5));
    const { policies } = await getDashboardSummary({ granted: ALL, scope: OWN });

    expect(policies.byStatus.map((s) => s.status)).toEqual(["EXPIRED", "EXPIRING", "NO_DATE", "NONE", "ACTIVE"]);
    expect(policies.total).toBe(5);
    const countWheres = prismaMock.tbl_contracts.count.mock.calls.map((c) => c[0].where).filter((w) => w.AND);
    const expired = JSON.parse(JSON.stringify(contractPolicyStatusWhere(CONTRACT_POLICY_STATUS.EXPIRED)));
    expect(countWheres.map((w) => JSON.parse(JSON.stringify(w.AND[1])))).toContainEqual(expired);
    for (const where of countWheres) expect(where.AND[0]).toEqual({ sta_id: { not: 3 }, wrk_id: { in: [8] } });
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
    prismaMock.tbl_works.findMany.mockResolvedValue([
      { wrk_id: 8, wrk_code: "OB-8", wrk_name: "Vía" },
      { wrk_id: 3, wrk_code: "OB-3", wrk_name: "Puente" },
    ]);
    const { invoices } = await getDashboardSummary({ granted: new Set([INVOICES]), scope: OWN });

    const { where } = prismaMock.tbl_invoices.groupBy.mock.calls[0][0];
    expect(where.inv_state).toEqual({ in: ["REGISTERED", "APPROVED"] });
    expect(invoices.byWork).toEqual([
      { wrkId: 8, registered: 2, approved: 3, workCode: "OB-8", workName: "Vía" },
      { wrkId: 3, registered: 1, approved: 0, workCode: "OB-3", workName: "Puente" },
    ]);
  });

  it("obras en seguimiento: solo activas, con las cifras de los módulos que el usuario ve", async () => {
    prismaMock.tbl_contracts.groupBy.mockImplementation(async ({ by }) => (by[0] === "wrk_id" ? [{ wrk_id: 8, _count: { _all: 2 } }] : []));
    prismaMock.tbl_works.findMany.mockResolvedValue([{ wrk_id: 8, wrk_code: "OB-8", wrk_name: "Vía" }]);
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
