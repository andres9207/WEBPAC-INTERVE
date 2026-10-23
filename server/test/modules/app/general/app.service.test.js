import { jest } from "@jest/globals";

// Menú lateral: páginas del perfil, y el grupo "Facturas" (página 18) con una
// entrada por tipo de proveedor con la casilla del menú (DEC-074).

const state = { pages: [], children: [], canView: true, menus: [] };

const prismaMock = {
  tbl_user_pages: { findMany: jest.fn(async () => []) },
  tbl_pages: { findMany: jest.fn(async ({ where }) => (where.pag_parent === 0 ? state.pages : state.children)) },
  tbl_profile_permissions: { findFirst: jest.fn(async () => (state.canView ? { prp_id: 1 } : null)) },
  tbl_user_permissions: { findFirst: jest.fn(async () => null) },
  tbl_provider_types: { findMany: jest.fn(async () => state.menus) },
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { getMenu } = await import("../../../../src/modules/app/general/app.service.js");

const page = (pag_id, pag_name, extra = {}) => ({ pag_id, pag_name, pag_description: pag_name, pag_url: null, pag_icon: "x", pag_order: 1, pag_type: 1, ...extra });
const DASHBOARD = page(1, "Dashboard", { pag_url: "home/default" });
const BILLING = page(18, "Facturas", { pag_type: 3, pag_icon: "receipt" });

beforeEach(() => {
  jest.clearAllMocks();
  state.pages = [DASHBOARD, BILLING];
  state.children = [];
  state.canView = true;
  state.menus = [
    { pvt_id: 3, pvt_name: "Contrato mayor", pvt_invoice_mode: "CONTRACT", pvt_invoice_menu: true, sta_id: 1 },
    { pvt_id: 4, pvt_name: "Orden de servicio", pvt_invoice_mode: "SIMPLE", pvt_invoice_menu: true, sta_id: 1 },
  ];
});

describe("getMenu — grupo Facturas (DEC-074)", () => {
  it("una entrada por tipo activo con la casilla, en su orden, con la ruta del tipo", async () => {
    const menu = await getMenu({ per: 2, idu: 7 });

    expect(menu.padres.map((p) => p.id)).toEqual([1, 18]);
    expect(menu.hijos).toEqual([
      { pag_id: "invoices-3", pag_description: "Contrato mayor", padre: 18, toa: "billing/invoices/3", icon: "invoice", pag_order: 1, label: "Contrato mayor" },
      { pag_id: "invoices-4", pag_description: "Orden de servicio", padre: 18, toa: "billing/invoices/4", icon: "invoice", pag_order: 2, label: "Orden de servicio" },
    ]);
    expect(prismaMock.tbl_profile_permissions.findFirst.mock.calls[0][0].where).toEqual({ pro_id: 2, per_id: 115 });
    expect(prismaMock.tbl_provider_types.findMany.mock.calls[0][0].where).toEqual({ sta_id: 1, pvt_invoice_menu: true });
  });

  it("sin el permiso de ver facturas, el grupo no se muestra y no se leen los tipos", async () => {
    state.canView = false;
    const menu = await getMenu({ per: 2, idu: 7 });
    expect(menu.padres.map((p) => p.id)).toEqual([1]);
    expect(menu.hijos).toEqual([]);
    expect(prismaMock.tbl_provider_types.findMany).not.toHaveBeenCalled();
  });

  it("sin ningún tipo con la casilla, el grupo no se muestra", async () => {
    state.menus = [];
    expect((await getMenu({ per: 2, idu: 7 })).padres.map((p) => p.id)).toEqual([1]);
  });

  it("sin el grupo en sus páginas, no consulta permisos ni tipos", async () => {
    state.pages = [DASHBOARD];
    await getMenu({ per: 2, idu: 7 });
    expect(prismaMock.tbl_profile_permissions.findFirst).not.toHaveBeenCalled();
    expect(prismaMock.tbl_provider_types.findMany).not.toHaveBeenCalled();
  });
});
