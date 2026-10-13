import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Lo propio del maestro de tipos de contrato (ADR-0006, versión mínima). El
// comportamiento común está en test/common/services/master.service.test.js.

const prismaMock = {
  tbl_contract_types: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  },
  tbl_invoices: { count: jest.fn(async () => 0) },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { contractTypesService: service } = await import("../../../../src/modules/admin/contractTypes/contractTypes.service.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const types = prismaMock.tbl_contract_types;

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  types.findUnique.mockResolvedValue(null);
  types.findFirst.mockResolvedValue(null);
  prismaMock.tbl_invoices.count.mockResolvedValue(0);
});

describe("tipos de contrato", () => {
  it("crea el tipo activo, solo con nombre: la versión de configuración la pone la BD", async () => {
    types.create.mockResolvedValue({ ctt_id: 1 });

    await expect(service.save({ id: 0, input: { name: " Suministro " }, useBy: 9, idempotencyKey: KEY })).resolves.toEqual({
      message: "Tipo de contrato creado correctamente",
      cttId: 1,
    });
    const { data } = types.create.mock.calls[0][0];
    expect(data).toMatchObject({ ctt_name: "Suministro", sta_id: 1, ctt_create_by: 9 });
    expect(data).not.toHaveProperty("ctt_config_version");
  });

  it("el nombre repetido entre no eliminados se rechaza", async () => {
    types.findFirst.mockResolvedValue({ ctt_name: "Suministro" });

    await expect(service.save({ id: 0, input: { name: "suministro" }, useBy: 9, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "Ya existe un tipo de contrato con ese nombre.",
    });
    expect(types.create).not.toHaveBeenCalled();
  });

  it("editar el nombre no toca la versión de configuración", async () => {
    types.findUnique.mockResolvedValue({ ctt_name: "Suministro", sta_id: 1 });

    await service.save({ id: 1, input: { name: "Suministro e instalación" }, useBy: 9 });

    expect(types.update.mock.calls[0][0].data).not.toHaveProperty("ctt_config_version");
  });

  it("el menú de facturas es MAJOR, SUBCONTRACTOR o sin definir (NULL), nunca vacío (DEC-054)", async () => {
    types.create.mockResolvedValue({ ctt_id: 1 });
    await service.save({ id: 0, input: { name: "Subcontrato", invoiceView: "SUBCONTRACTOR" }, useBy: 9, idempotencyKey: KEY });
    expect(types.create.mock.calls[0][0].data).toMatchObject({ ctt_invoice_view: "SUBCONTRACTOR" });

    await service.save({ id: 0, input: { name: "Menores", invoiceView: "" }, useBy: 9, idempotencyKey: KEY });
    expect(types.create.mock.calls[1][0].data.ctt_invoice_view).toBeNull();
  });

  it("con facturas en sus contratos, el menú de facturas no cambia (409); sin cambiarlo, el nombre sí", async () => {
    types.findUnique.mockResolvedValue({ ctt_name: "Mayores", ctt_invoice_view: "MAJOR", sta_id: 1 });
    prismaMock.tbl_invoices.count.mockResolvedValue(2);

    await expect(service.save({ id: 6, input: { name: "Mayores", invoiceView: "SUBCONTRACTOR" }, useBy: 9 })).rejects.toMatchObject({
      statusCode: 409,
      message: "Los contratos de este tipo ya tienen 2 factura(s): su menú de facturas no puede cambiar.",
    });
    expect(prismaMock.tbl_invoices.count).toHaveBeenCalledWith({ where: { tbl_contracts: { ctt_id: 6 } } });
    expect(types.update).not.toHaveBeenCalled();

    await service.save({ id: 6, input: { name: "Contrato mayor", invoiceView: "MAJOR" }, useBy: 9 });
    expect(types.update.mock.calls[0][0].data).toMatchObject({ ctt_name: "Contrato mayor", ctt_invoice_view: "MAJOR" });
  });

  it("sin facturas, el menú de facturas se define o se cambia", async () => {
    types.findUnique.mockResolvedValue({ ctt_name: "Menores", ctt_invoice_view: null, sta_id: 1 });
    await service.save({ id: 16, input: { name: "Menores", invoiceView: "MAJOR" }, useBy: 9 });
    expect(types.update.mock.calls[0][0].data).toMatchObject({ ctt_invoice_view: "MAJOR" });
  });

  it("el selector devuelve el nombre, ordenado por nombre", async () => {
    types.findMany.mockResolvedValue([{ ctt_id: 1, ctt_name: "Suministro", sta_id: 1 }]);

    await expect(service.select({})).resolves.toEqual([{ value: 1, label: "Suministro", staId: 1 }]);
    expect(types.findMany.mock.calls[0][0].orderBy).toEqual({ ctt_name: "asc" });
  });
});
