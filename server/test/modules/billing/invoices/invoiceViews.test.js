import { PERMISSIONS } from "../../../../src/common/constants/permissions.constants.js";
import { BILLING_CLASSES } from "../../../../src/modules/work/contracts/contractTerms.js";
import {
  ANY_CONTRACT_VIEW_PERMISSION,
  ANY_VIEW_PERMISSION,
  INVOICE_VIEWS,
  VIEW_PERMISSIONS,
  assertViewGranted,
  grantedViews,
  seesView,
  viewOf,
  viewsWhere,
} from "../../../../src/modules/billing/invoices/invoiceViews.js";

// Vistas de facturas (DEC-054): cada factura en una sola, cada vista con su
// permiso de ver, y la vista derivada del tipo y la clase del contrato.

const can = PERMISSIONS.billing.invoices;

describe("vistas y permisos", () => {
  it("cada vista tiene su permiso de ver, y las de contrato son las clases del contrato", () => {
    expect(VIEW_PERMISSIONS).toEqual({ SIMPLE: can.viewSimple, MAJOR: can.viewMajor, SUBCONTRACTOR: can.viewSubcontractor });
    expect([INVOICE_VIEWS.MAJOR, INVOICE_VIEWS.SUBCONTRACTOR]).toEqual(Object.values(BILLING_CLASSES));
    expect(ANY_VIEW_PERMISSION).toEqual([105, 106, 107]);
    expect(ANY_CONTRACT_VIEW_PERMISSION).toEqual([106, 107]);
  });

  it("las vistas que ve el usuario salen de sus permisos efectivos", () => {
    expect(grantedViews(new Set([105, 107, 84]))).toEqual(["SIMPLE", "SUBCONTRACTOR"]);
    expect(grantedViews(new Set([84]))).toEqual([]);
    expect(grantedViews(undefined)).toEqual([]);
  });
});

describe("vista de una factura", () => {
  it("la simple es la suya; la de contrato, la clase de su contrato", () => {
    expect(viewOf("SIMPLE", undefined)).toBe("SIMPLE");
    expect(viewOf("ADVANCE", "MAJOR")).toBe("MAJOR");
    expect(viewOf("LIQUIDATION", "SUBCONTRACTOR")).toBe("SUBCONTRACTOR");
  });
});

describe("filtro por vistas", () => {
  it("una lista vacía no devuelve nada; las tres, sin filtro; sin lista (interna), sin filtro", () => {
    expect(viewsWhere([])).toEqual({ inv_id: { in: [] } });
    expect(viewsWhere(["SIMPLE", "MAJOR", "SUBCONTRACTOR"])).toEqual({});
    expect(viewsWhere(undefined)).toEqual({});
  });

  it("la simple por tipo; las de contrato, por la clase del contrato", () => {
    expect(viewsWhere(["SIMPLE", "SUBCONTRACTOR"])).toEqual({
      OR: [{ inv_type: "SIMPLE" }, { tbl_contracts: { ctr_billing_class: "SUBCONTRACTOR" } }],
    });
  });

  it("404 si el usuario no ve la vista; sin lista (interna), sí la ve", () => {
    expect(seesView(["MAJOR"], "MAJOR")).toBe(true);
    expect(seesView(undefined, "SIMPLE")).toBe(true);
    expect(() => assertViewGranted(["MAJOR"], "SUBCONTRACTOR", "No se encontró la factura.")).toThrow(
      expect.objectContaining({ statusCode: 404, message: "No se encontró la factura." })
    );
  });
});
