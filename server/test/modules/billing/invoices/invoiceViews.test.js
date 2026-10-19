import { PERMISSIONS } from "../../../../src/common/constants/permissions.constants.js";
import {
  ANY_CONTRACT_VIEW_PERMISSION,
  ANY_VIEW_PERMISSION,
  INVOICE_VIEWS,
  PROVIDER_INVOICE_VIEWS,
  CONTRACT_VIEWS,
  VIEW_PERMISSIONS,
  assertViewGranted,
  grantedViews,
  isContractView,
  seesView,
  viewsWhere,
} from "../../../../src/modules/billing/invoices/invoiceViews.js";

// Vistas de facturas (DEC-054, DEC-066): cada factura en una sola, cada vista
// con su permiso de ver, guardada en la factura y resuelta al registrarla
// desde el menú de su contrato o, la simple, fija.

const can = PERMISSIONS.billing.invoices;

describe("vistas y permisos", () => {
  it("cada vista tiene su permiso de ver, y son los tres menús de los tipos de proveedor", () => {
    expect(VIEW_PERMISSIONS).toEqual({ SIMPLE: can.viewSimple, MAJOR: can.viewMajor, SUBCONTRACTOR: can.viewSubcontractor });
    expect(Object.values(INVOICE_VIEWS).sort()).toEqual(Object.values(PROVIDER_INVOICE_VIEWS).sort());
    expect(ANY_VIEW_PERMISSION).toEqual([105, 106, 107]);
    expect(ANY_CONTRACT_VIEW_PERMISSION).toEqual([106, 107]);
  });

  it("las vistas que ve el usuario salen de sus permisos efectivos", () => {
    expect(grantedViews(new Set([105, 107, 84]))).toEqual(["SIMPLE", "SUBCONTRACTOR"]);
    expect(grantedViews(new Set([84]))).toEqual([]);
    expect(grantedViews(undefined)).toEqual([]);
  });
});

describe("menús de contrato (DEC-066)", () => {
  it("solo contrato mayor y subcontratistas admiten contratos; simples y sin menú, no", () => {
    expect(CONTRACT_VIEWS).toEqual(["MAJOR", "SUBCONTRACTOR"]);
    expect(isContractView("MAJOR")).toBe(true);
    expect(isContractView("SUBCONTRACTOR")).toBe(true);
    expect(isContractView("SIMPLE")).toBe(false);
    expect(isContractView(null)).toBe(false);
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
