import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Lo propio del maestro de tipos de proveedor (ADR-0010). El comportamiento
// común está en test/common/services/master.service.test.js.

const prismaMock = {
  tbl_provider_types: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  },
  tbl_provider_classifications: { count: jest.fn(), findMany: jest.fn() },
  tbl_work_provider_types: { count: jest.fn() },
  tbl_invoices: { findMany: jest.fn(), updateMany: jest.fn() },
  tbl_contracts: { updateMany: jest.fn() },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { providerTypesService: service } = await import("../../../../src/modules/admin/providerTypes/providerTypes.service.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const types = prismaMock.tbl_provider_types;

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  types.findUnique.mockResolvedValue(null);
  types.findFirst.mockResolvedValue(null);
  prismaMock.tbl_provider_classifications.count.mockResolvedValue(0);
  prismaMock.tbl_provider_classifications.findMany.mockResolvedValue([]);
  prismaMock.tbl_work_provider_types.count.mockResolvedValue(0);
  prismaMock.tbl_invoices.findMany.mockResolvedValue([]);
});

describe("tipos de proveedor", () => {
  it("crea el tipo activo, solo con nombre", async () => {
    types.create.mockResolvedValue({ pvt_id: 4 });

    await expect(service.save({ id: 0, input: { name: " Consultor " }, useBy: 9, idempotencyKey: KEY })).resolves.toEqual({
      message: "Tipo de proveedor creado correctamente",
      pvtId: 4,
    });
    expect(types.create.mock.calls[0][0].data).toMatchObject({ pvt_name: "Consultor", sta_id: 1, pvt_create_by: 9 });
  });

  it("el nombre repetido entre no eliminados se rechaza", async () => {
    types.findFirst.mockResolvedValue({ pvt_name: "Simple" });

    await expect(service.save({ id: 0, input: { name: "simple" }, useBy: 9, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "Ya existe un tipo de proveedor con ese nombre.",
    });
    expect(types.create).not.toHaveBeenCalled();
  });

  it("se elimina de forma lógica, con evidencia", async () => {
    types.findUnique.mockResolvedValue({ sta_id: 1 });

    await service.remove({ id: 2, useBy: 9 });

    expect(types.update.mock.calls[0][0]).toMatchObject({
      where: { pvt_id: 2 },
      data: { sta_id: 3, pvt_delete_by: 9, pvt_delete_at: expect.any(Date) },
    });
  });

  it("no se elimina si lo usan proveedores no eliminados (ADR-0010, decisión 8; DEC-041)", async () => {
    types.findUnique.mockResolvedValue({ sta_id: 1 });
    prismaMock.tbl_provider_classifications.count.mockResolvedValue(3);

    await expect(service.remove({ id: 2, useBy: 9 })).rejects.toMatchObject({
      statusCode: 400,
      message: expect.stringContaining("lo usan 3 proveedor(es)"),
    });
    expect(prismaMock.tbl_provider_classifications.count).toHaveBeenCalledWith({ where: { pvt_id: 2, tbl_providers: { sta_id: { not: 3 } } } });
    expect(types.update).not.toHaveBeenCalled();
  });

  it("no se elimina si lo usan asignaciones a obras (DEC-066)", async () => {
    types.findUnique.mockResolvedValue({ sta_id: 1 });
    prismaMock.tbl_work_provider_types.count.mockResolvedValue(2);

    await expect(service.remove({ id: 2, useBy: 9 })).rejects.toMatchObject({
      statusCode: 400,
      message: expect.stringContaining("asignación(es) a obras"),
    });
    expect(prismaMock.tbl_work_provider_types.count).toHaveBeenCalledWith({ where: { pvt_id: 2 } });
    expect(types.update).not.toHaveBeenCalled();
  });

  it("el selector devuelve el nombre y el menú, ordenado por nombre", async () => {
    types.findMany.mockResolvedValue([{ pvt_id: 1, pvt_name: "Simple", pvt_invoice_view: "SIMPLE", sta_id: 1 }]);

    await expect(service.select({})).resolves.toEqual([{ value: 1, label: "Simple", staId: 1, invoiceView: "SIMPLE" }]);
    expect(types.findMany.mock.calls[0][0].orderBy).toEqual({ pvt_name: "asc" });
  });
});

describe("menú de facturas del tipo (DEC-066)", () => {
  const edit = (invoiceView) => service.save({ id: 2, input: { name: "Subcontratista", invoiceView }, useBy: 9 });

  beforeEach(() => {
    types.findUnique.mockResolvedValue({ pvt_name: "Subcontratista", pvt_invoice_view: "SUBCONTRACTOR", sta_id: 1 });
  });

  it("es MAJOR, SUBCONTRACTOR, SIMPLE o sin menú (NULL)", async () => {
    types.findUnique.mockResolvedValue(null);
    types.create.mockResolvedValue({ pvt_id: 4 });
    await service.save({ id: 0, input: { name: "Mayor", invoiceView: "MAJOR" }, useBy: 9, idempotencyKey: KEY });
    expect(types.create.mock.calls[0][0].data).toMatchObject({ pvt_invoice_view: "MAJOR" });

    await service.save({ id: 0, input: { name: "Simple 2", invoiceView: "SIMPLE" }, useBy: 9, idempotencyKey: KEY });
    expect(types.create.mock.calls[1][0].data).toMatchObject({ pvt_invoice_view: "SIMPLE" });

    await service.save({ id: 0, input: { name: "Otro", invoiceView: "" }, useBy: 9, idempotencyKey: KEY });
    expect(types.create.mock.calls[2][0].data.pvt_invoice_view).toBeNull();
  });

  it("cambiarlo no mueve proveedores, contratos ni facturas: cada contrato guardó el suyo", async () => {
    await edit("MAJOR");

    expect(types.update.mock.calls[0][0].data).toMatchObject({ pvt_invoice_view: "MAJOR" });
    expect(prismaMock.tbl_provider_classifications.findMany).not.toHaveBeenCalled();
    expect(prismaMock.tbl_invoices.findMany).not.toHaveBeenCalled();
    expect(prismaMock.tbl_invoices.updateMany).not.toHaveBeenCalled();
    expect(prismaMock.tbl_contracts.updateMany).not.toHaveBeenCalled();
  });
});
