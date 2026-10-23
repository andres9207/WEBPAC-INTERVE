import { jest } from "@jest/globals";

// Menús de facturas (DEC-074): uno por tipo de proveedor con la casilla, sin
// lista fija en el código; la forma de facturar decide la pantalla.

const prismaMock = {
  tbl_provider_types: { findMany: jest.fn(async () => []), findFirst: jest.fn(async () => null) },
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { INVOICE_MODES, SIMPLE_TYPE_WHERE, getInvoiceMenu, isContractMode, isSimpleMode, listInvoiceMenus } = await import(
  "../../../../src/modules/billing/invoices/invoiceMenus.js"
);

beforeEach(() => jest.clearAllMocks());

describe("formas de facturar", () => {
  it("son dos: simple y con contrato; sin forma, el tipo no factura", () => {
    expect(INVOICE_MODES).toEqual({ SIMPLE: "SIMPLE", CONTRACT: "CONTRACT" });
    expect(isContractMode("CONTRACT")).toBe(true);
    expect(isContractMode("SIMPLE")).toBe(false);
    expect(isContractMode(null)).toBe(false);
    expect(isSimpleMode("SIMPLE")).toBe(true);
    expect(isSimpleMode(null)).toBe(false);
  });

  it("el tipo simple de una asignación se filtra por su forma", () => {
    expect(SIMPLE_TYPE_WHERE).toEqual({ tbl_provider_types: { pvt_invoice_mode: "SIMPLE" } });
  });
});

describe("menús", () => {
  it("las entradas del menú son los tipos activos con la casilla, por nombre", async () => {
    prismaMock.tbl_provider_types.findMany.mockResolvedValueOnce([
      { pvt_id: 3, pvt_name: "Contrato mayor", pvt_invoice_mode: "CONTRACT", pvt_invoice_menu: true, sta_id: 1 },
      { pvt_id: 4, pvt_name: "Orden de servicio", pvt_invoice_mode: "SIMPLE", pvt_invoice_menu: true, sta_id: 1 },
    ]);
    await expect(listInvoiceMenus()).resolves.toEqual([
      { pvtId: 3, name: "Contrato mayor", mode: "CONTRACT", menu: true },
      { pvtId: 4, name: "Orden de servicio", mode: "SIMPLE", menu: true },
    ]);
    expect(prismaMock.tbl_provider_types.findMany.mock.calls[0][0]).toMatchObject({
      where: { sta_id: 1, pvt_invoice_menu: true },
      orderBy: { pvt_name: "asc" },
    });
  });

  it("un menú se lee aunque esté oculto o inactivo, si el tipo factura y no está eliminado", async () => {
    prismaMock.tbl_provider_types.findFirst.mockResolvedValueOnce({ pvt_id: 5, pvt_name: "Viejo", pvt_invoice_mode: "CONTRACT", pvt_invoice_menu: false, sta_id: 2 });
    await expect(getInvoiceMenu({ pvtId: "5" })).resolves.toEqual({ pvtId: 5, name: "Viejo", mode: "CONTRACT", menu: false });
    expect(prismaMock.tbl_provider_types.findFirst.mock.calls[0][0].where).toEqual({ pvt_id: 5, sta_id: { not: 3 }, pvt_invoice_mode: { not: null } });
  });

  it("un tipo que no factura, eliminado o inexistente no es un menú (404)", async () => {
    await expect(getInvoiceMenu({ pvtId: 9 })).rejects.toMatchObject({ statusCode: 404, message: "No se encontró el menú de facturas." });
  });
});
