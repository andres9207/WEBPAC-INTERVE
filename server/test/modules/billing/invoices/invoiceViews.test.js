import { PERMISSIONS } from "../../../../src/common/constants/permissions.constants.js";
import {
  ANY_CONTRACT_VIEW_PERMISSION,
  ANY_VIEW_PERMISSION,
  INVOICE_VIEWS,
  PROVIDER_INVOICE_VIEWS,
  VIEW_PERMISSIONS,
  assertNotMixed,
  assertViewGranted,
  grantedViews,
  providerViewOf,
  providerViewWhere,
  resolveProviderView,
  seesView,
  viewsWhere,
} from "../../../../src/modules/billing/invoices/invoiceViews.js";

// Vistas de facturas (DEC-054, DEC-056): cada factura en una sola, cada vista
// con su permiso de ver, guardada en la factura y resuelta al registrarla
// desde el menú de los tipos de su proveedor.

const can = PERMISSIONS.billing.invoices;

describe("vistas y permisos", () => {
  it("cada vista tiene su permiso de ver, y las de contrato son los menús de los tipos de proveedor", () => {
    expect(VIEW_PERMISSIONS).toEqual({ SIMPLE: can.viewSimple, MAJOR: can.viewMajor, SUBCONTRACTOR: can.viewSubcontractor });
    expect([INVOICE_VIEWS.MAJOR, INVOICE_VIEWS.SUBCONTRACTOR]).toEqual(Object.values(PROVIDER_INVOICE_VIEWS));
    expect(ANY_VIEW_PERMISSION).toEqual([105, 106, 107]);
    expect(ANY_CONTRACT_VIEW_PERMISSION).toEqual([106, 107]);
  });

  it("las vistas que ve el usuario salen de sus permisos efectivos", () => {
    expect(grantedViews(new Set([105, 107, 84]))).toEqual(["SIMPLE", "SUBCONTRACTOR"]);
    expect(grantedViews(new Set([84]))).toEqual([]);
    expect(grantedViews(undefined)).toEqual([]);
  });
});

describe("menú de un proveedor", () => {
  const provider = (...menus) => ({ tbl_provider_classifications: menus.map((m, i) => ({ pvt_id: i + 1, tbl_provider_types: { pvt_invoice_view: m } })) });

  it("es el único menú de sus tipos; los tipos sin menú no cuentan; sin ninguno, null", () => {
    expect(providerViewOf(provider("MAJOR", null))).toBe("MAJOR");
    expect(providerViewOf(provider("SUBCONTRACTOR", "SUBCONTRACTOR"))).toBe("SUBCONTRACTOR");
    expect(providerViewOf(provider(null))).toBeNull();
    expect(providerViewOf(provider())).toBeNull();
    expect(providerViewOf(undefined)).toBeNull();
  });

  it("dos menús distintos es una mezcla: sin menú y 409 al guardar", () => {
    expect(resolveProviderView(["MAJOR", "SUBCONTRACTOR"])).toEqual({ view: null, mixed: true });
    expect(() => assertNotMixed(["MAJOR", "SUBCONTRACTOR", null], "Aceros SA")).toThrow(
      expect.objectContaining({ statusCode: 409, message: expect.stringContaining('"Aceros SA"') })
    );
    expect(() => assertNotMixed(["MAJOR", null])).not.toThrow();
  });

  it("los proveedores de un menú se filtran por cualquiera de sus tipos", () => {
    expect(providerViewWhere("MAJOR")).toEqual({ tbl_provider_classifications: { some: { tbl_provider_types: { pvt_invoice_view: "MAJOR" } } } });
  });
});

describe("filtro por vistas", () => {
  it("una lista vacía no devuelve nada; las tres, sin filtro; sin lista (interna), sin filtro", () => {
    expect(viewsWhere([])).toEqual({ inv_id: { in: [] } });
    expect(viewsWhere(["SIMPLE", "MAJOR", "SUBCONTRACTOR"])).toEqual({});
    expect(viewsWhere(undefined)).toEqual({});
  });

  it("por la vista guardada en la factura", () => {
    expect(viewsWhere(["SIMPLE", "SUBCONTRACTOR", "SIMPLE"])).toEqual({ inv_view: { in: ["SIMPLE", "SUBCONTRACTOR"] } });
  });

  it("404 si el usuario no ve la vista; sin lista (interna), sí la ve", () => {
    expect(seesView(["MAJOR"], "MAJOR")).toBe(true);
    expect(seesView(undefined, "SIMPLE")).toBe(true);
    expect(() => assertViewGranted(["MAJOR"], "SUBCONTRACTOR", "No se encontró la factura.")).toThrow(
      expect.objectContaining({ statusCode: 404, message: "No se encontró la factura." })
    );
  });
});
