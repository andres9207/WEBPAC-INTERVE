import { jest } from "@jest/globals";

// Menús de contratos (DEC-077): uno por tipo de proveedor con su casilla,
// como los de facturas (DEC-074).

const prismaMock = {
  tbl_provider_types: { findMany: jest.fn(async () => []), findFirst: jest.fn(async () => null) },
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { getContractMenu, listContractMenus } = await import("../../../../src/modules/work/contracts/contractMenus.js");

beforeEach(() => jest.clearAllMocks());

describe("menús de contratos", () => {
  it("las entradas son los tipos activos con la casilla, por nombre", async () => {
    prismaMock.tbl_provider_types.findMany.mockResolvedValueOnce([
      { pvt_id: 3, pvt_name: "Contrato mayor", pvt_contract_menu: true, sta_id: 1 },
      { pvt_id: 2, pvt_name: "Subcontratista", pvt_contract_menu: true, sta_id: 1 },
    ]);
    await expect(listContractMenus()).resolves.toEqual([
      { pvtId: 3, name: "Contrato mayor", menu: true },
      { pvtId: 2, name: "Subcontratista", menu: true },
    ]);
    expect(prismaMock.tbl_provider_types.findMany.mock.calls[0][0]).toMatchObject({
      where: { sta_id: 1, pvt_contract_menu: true },
      orderBy: { pvt_name: "asc" },
    });
  });

  it("un menú se lee aunque esté oculto o inactivo, si el tipo factura con contrato y no está eliminado", async () => {
    prismaMock.tbl_provider_types.findFirst.mockResolvedValueOnce({ pvt_id: 5, pvt_name: "Viejo", pvt_contract_menu: false, sta_id: 2 });
    await expect(getContractMenu({ pvtId: "5" })).resolves.toEqual({ pvtId: 5, name: "Viejo", menu: false });
    expect(prismaMock.tbl_provider_types.findFirst.mock.calls[0][0].where).toEqual({ pvt_id: 5, sta_id: { not: 3 }, pvt_invoice_mode: "CONTRACT" });
  });

  it("un tipo que no admite contratos, eliminado o inexistente no es un menú (404)", async () => {
    await expect(getContractMenu({ pvtId: 9 })).rejects.toMatchObject({ statusCode: 404, message: "No se encontró el menú de contratos." });
  });
});
