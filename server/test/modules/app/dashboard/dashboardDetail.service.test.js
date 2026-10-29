import { jest } from "@jest/globals";

// Detalle de una cifra del tablero general (DEC-052): cada métrica con el
// permiso de su módulo (403 si falta), en el alcance de la petición, con el
// mismo predicado que la cifra, paginado y con los filtros del panel (texto
// y obra) sumados al predicado.

const prismaMock = {
  // Días de aviso de las pólizas (DEC-072): sin filas, el valor por defecto (30).
  tbl_business_rules: { findMany: jest.fn(async () => []) },
  tbl_works: { findMany: jest.fn(async () => []), count: jest.fn(async () => 0) },
  tbl_providers: { findMany: jest.fn(async () => []), count: jest.fn(async () => 0) },
  tbl_contracts: { findMany: jest.fn(async () => []), count: jest.fn(async () => 0) },
  tbl_policies: { findMany: jest.fn(async () => []), count: jest.fn(async () => 0) },
  tbl_invoices: { findMany: jest.fn(async () => []), count: jest.fn(async () => 0) },
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { getDashboardDetail, DETAIL_METRICS: M } = await import("../../../../src/modules/app/dashboard/dashboardDetail.service.js");

const WORKS = 52;
const PROVIDERS = 60;
const CONTRACTS = 68;
const POLICIES = 99;
const INVOICES = 115;
const ALL = new Set([WORKS, PROVIDERS, CONTRACTS, POLICIES, INVOICES]);
const OWN = Object.freeze({ all: false, wrkId: 8 });
const EVERYTHING = Object.freeze({ all: true, wrkId: null });

const detail = (args) => getDashboardDetail({ granted: ALL, scope: OWN, ...args });
const whereOf = (model, call = 0) => prismaMock[model].findMany.mock.calls[call][0].where;
const json = (value) => JSON.stringify(value);

beforeEach(() => jest.clearAllMocks());

describe("getDashboardDetail — permisos", () => {
  it.each([
    [M.WORKS_ACTIVE, [PROVIDERS, CONTRACTS, POLICIES, INVOICES]],
    [M.PROVIDERS_ACTIVE, [WORKS, CONTRACTS, POLICIES, INVOICES]],
    [M.CONTRACTS_EXPIRED, [WORKS, PROVIDERS, POLICIES, INVOICES]],
    // Las de pólizas son de contratos: exigen los dos.
    [M.CONTRACTS_UNCOVERED, [CONTRACTS]],
    [M.CURRENT_POLICIES, [POLICIES]],
    [M.INVOICES_PENDING, [WORKS, PROVIDERS, CONTRACTS, POLICIES]],
  ])("%s sin su permiso responde 403 y no consulta", async (metric, granted) => {
    await expect(getDashboardDetail({ granted: new Set(granted), scope: OWN, metric })).rejects.toMatchObject({ statusCode: 403 });
    for (const model of Object.values(prismaMock)) for (const fn of Object.values(model)) expect(fn).not.toHaveBeenCalled();
  });

  it("una métrica desconocida responde 400", async () => {
    await expect(detail({ metric: "SOMETHING" })).rejects.toMatchObject({ statusCode: 400 });
  });
});

describe("getDashboardDetail — filas y paginación", () => {
  it("contratos por estado: en el alcance, 10 por página por defecto, con el total", async () => {
    prismaMock.tbl_contracts.count.mockResolvedValueOnce(140);
    prismaMock.tbl_contracts.findMany.mockResolvedValueOnce([
      {
        ctr_id: 20,
        ctr_number: "C-1",
        ctr_name: "Concreto",
        ctr_state: "SUSPENDED",
        ctr_end_date: new Date("2026-12-31T00:00:00Z"),
        tbl_providers: { prv_name: "Concretos" },
        tbl_works: { wrk_code: "OB-1" },
      },
    ]);
    const page = await detail({ metric: M.CONTRACTS_BY_STATE, state: "SUSPENDED" });
    const args = prismaMock.tbl_contracts.findMany.mock.calls[0][0];
    expect(json(args.where)).toContain('"ctr_state":"SUSPENDED"');
    expect(json(args.where)).toContain('"wrk_id":{"in":[8]}');
    expect(json(args.where)).toContain('"sta_id":{"not":3}');
    expect(args).toMatchObject({ take: 10, skip: 0 });
    expect(page).toMatchObject({ kind: "contracts", total: 140, limit: 10, page: 1, totalPages: 14 });
    expect(page.results[0]).toEqual({
      ctrId: 20,
      number: "C-1",
      name: "Concreto",
      state: "SUSPENDED",
      stateName: "Suspendido",
      endDate: "2026-12-31",
      providerName: "Concretos",
      workCode: "OB-1",
    });
  });

  it("la página pedida y el tope de los listados", async () => {
    await detail({ metric: M.CONTRACTS_EXPIRED, page: "3", limit: "10" });
    expect(prismaMock.tbl_contracts.findMany.mock.calls[0][0]).toMatchObject({ skip: 20, take: 10 });
    await detail({ metric: M.CONTRACTS_EXPIRED, limit: "500" });
    expect(prismaMock.tbl_contracts.findMany.mock.calls[1][0].take).toBe(100);
  });

  it("contratos por estado: un estado que no existe responde 400", async () => {
    await expect(detail({ metric: M.CONTRACTS_BY_STATE, state: "OPEN" })).rejects.toMatchObject({ statusCode: 400 });
  });

  it("estado de pólizas: los contratos de la categoría, con la misma clasificación que la cifra", async () => {
    // Contrato 1 sin pólizas (NONE); contrato 2 con una vencida (EXPIRED).
    prismaMock.tbl_contracts.findMany.mockResolvedValueOnce([
      { ctr_id: 1, tbl_contract_concepts: [], tbl_policies: [] },
      {
        ctr_id: 2,
        tbl_contract_concepts: [],
        tbl_policies: [{ ccp_id: 5, pol_base: "TOTAL_VALUE", pol_percentage: "10.00", pol_end_date: new Date("2020-01-01T00:00:00Z") }],
      },
    ]);
    const page = await detail({ metric: M.CONTRACTS_POLICY_STATUS, policyStatus: "NONE" });
    expect(json(whereOf("tbl_contracts", 0))).toContain('"wrk_id":{"in":[8]}');
    expect(whereOf("tbl_contracts", 1)).toEqual({ AND: [{ ctr_id: { in: [1] } }] });
    expect(page.subtitle).toBe("Sin póliza");
  });

  it("facturas por obra: la obra de la barra, registradas y aprobadas o un solo estado, siempre en el alcance", async () => {
    await getDashboardDetail({ granted: ALL, scope: EVERYTHING, metric: M.INVOICES_BY_WORK, wrkId: "4" });
    expect(json(whereOf("tbl_invoices", 0))).toContain('"wrk_id":4');
    expect(json(whereOf("tbl_invoices", 0))).toContain('"inv_state":{"in":["REGISTERED","APPROVED"]}');
    await detail({ metric: M.INVOICES_BY_WORK, wrkId: "4", invoiceState: "APPROVED" });
    const where = json(whereOf("tbl_invoices", 1));
    expect(where).toContain('"inv_state":"APPROVED"');
    // El alcance de la petición va siempre: otra obra no devuelve filas.
    expect(where).toContain('"wrk_id":{"in":[8]}');
  });

  it("facturas por obra: sin obra o con un estado que no cuenta (anulada) responde 400", async () => {
    await expect(detail({ metric: M.INVOICES_BY_WORK })).rejects.toMatchObject({ statusCode: 400 });
    await expect(detail({ metric: M.INVOICES_BY_WORK, wrkId: "4", invoiceState: "CANCELLED" })).rejects.toMatchObject({ statusCode: 400 });
  });

  it("facturas por aprobar: todas las registradas de todos los menús, con su valor y su obra", async () => {
    prismaMock.tbl_invoices.findMany.mockResolvedValueOnce([
      {
        inv_id: 9,
        inv_type: "ADVANCE",
        pvt_id: 2,
        ctr_id: 20,
        inv_number: "F-9",
        inv_date: new Date("2026-10-01T00:00:00Z"),
        inv_state: "REGISTERED",
        tbl_providers: { prv_name: "Concretos" },
        tbl_contracts: { ctr_number: "C-1" },
        tbl_works: { wrk_code: "OB-1" },
        tbl_invoice_advance_details: { iad_value: "150.00" },
      },
    ]);
    const page = await detail({ metric: M.INVOICES_PENDING });
    const where = json(whereOf("tbl_invoices"));
    expect(where).toContain('"inv_state":"REGISTERED"');
    expect(where).not.toContain("pvt_id");
    expect(page.results[0]).toMatchObject({ invId: 9, value: "150.00", workCode: "OB-1", contractNumber: "C-1" });
  });

  it("proveedores activos: los asignados a la obra del alcance", async () => {
    await detail({ metric: M.PROVIDERS_ACTIVE });
    expect(whereOf("tbl_providers")).toEqual({ AND: [{ sta_id: 1 }, { tbl_work_providers: { some: { wrk_id: { in: [8] } } } }] });
  });
});

describe("getDashboardDetail — filtros del panel", () => {
  it("texto: en las columnas de la fila, sumado al predicado", async () => {
    await detail({ metric: M.CONTRACTS_EXPIRED, search: " concreto " });
    const where = whereOf("tbl_contracts");
    expect(where.AND).toContainEqual({
      OR: [
        { ctr_number: { contains: "concreto" } },
        { ctr_name: { contains: "concreto" } },
        { tbl_providers: { prv_name: { contains: "concreto" } } },
        { tbl_works: { wrk_code: { contains: "concreto" } } },
      ],
    });
    expect(json(where)).toContain('"ctr_state":"IN_PROGRESS"');
  });

  it("texto vacío: sin condición de búsqueda", async () => {
    await detail({ metric: M.INVOICES_PENDING, search: "   " });
    expect(json(whereOf("tbl_invoices"))).not.toContain("contains");
  });

  it("obra: se suma al alcance, no lo reemplaza", async () => {
    await detail({ metric: M.CURRENT_POLICIES, wrkId: "5" });
    const where = json(whereOf("tbl_policies"));
    expect(where).toContain('"wrk_id":5');
    expect(where).toContain('"wrk_id":{"in":[8]}');
  });

  it("obra en el estado de pólizas: clasifica solo los contratos de esa obra", async () => {
    await detail({ metric: M.CONTRACTS_POLICY_STATUS, policyStatus: "EXPIRED", wrkId: "5" });
    expect(json(whereOf("tbl_contracts", 0))).toContain('"wrk_id":5');
  });
});
