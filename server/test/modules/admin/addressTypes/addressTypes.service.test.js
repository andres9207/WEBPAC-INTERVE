import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Lo propio del maestro de tipos de dirección (ADR-0009). El comportamiento
// común está en test/common/services/master.service.test.js.

const prismaMock = {
  tbl_address_types: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  },
  tbl_provider_contacts: { count: jest.fn() },
  tbl_work_contacts: { count: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { addressTypesService: service } = await import("../../../../src/modules/admin/addressTypes/addressTypes.service.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const types = prismaMock.tbl_address_types;

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  types.findUnique.mockResolvedValue(null);
  types.findFirst.mockResolvedValue(null);
  prismaMock.tbl_provider_contacts.count.mockResolvedValue(0);
  prismaMock.tbl_work_contacts.count.mockResolvedValue(0);
});

describe("tipos de dirección", () => {
  it("no se elimina si lo usan contactos de proveedor, que no tienen estado: cuenta todos (ADR-0009, decisión 8)", async () => {
    types.findUnique.mockResolvedValue({ sta_id: 1 });
    prismaMock.tbl_provider_contacts.count.mockResolvedValue(2);

    await expect(service.remove({ id: 5, useBy: 9 })).rejects.toMatchObject({
      statusCode: 400,
      message: expect.stringContaining("lo usan 2 contacto(s) de proveedor"),
    });
    expect(prismaMock.tbl_provider_contacts.count).toHaveBeenCalledWith({ where: { adt_id: 5 } });
    expect(types.update).not.toHaveBeenCalled();
  });

  it("tampoco si lo usan contactos de obra (PRO-BD-04)", async () => {
    types.findUnique.mockResolvedValue({ sta_id: 1 });
    prismaMock.tbl_work_contacts.count.mockResolvedValue(3);

    await expect(service.remove({ id: 5, useBy: 9 })).rejects.toMatchObject({
      statusCode: 400,
      message: expect.stringContaining("lo usan 3 contacto(s) de obra"),
    });
    expect(prismaMock.tbl_work_contacts.count).toHaveBeenCalledWith({ where: { adt_id: 5 } });
    expect(types.update).not.toHaveBeenCalled();
  });

  it("crea el tipo activo, solo con nombre", async () => {
    types.create.mockResolvedValue({ adt_id: 4 });

    await expect(service.save({ id: 0, input: { name: " Obra " }, useBy: 9, idempotencyKey: KEY })).resolves.toEqual({
      message: "Tipo de dirección creado correctamente",
      adtId: 4,
    });
    expect(types.create.mock.calls[0][0].data).toMatchObject({ adt_name: "Obra", sta_id: 1, adt_create_by: 9 });
  });

  it("el nombre repetido entre no eliminados se rechaza", async () => {
    types.findFirst.mockResolvedValue({ adt_name: "Bodega" });

    await expect(service.save({ id: 0, input: { name: "bodega" }, useBy: 9, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "Ya existe un tipo de dirección con ese nombre.",
    });
    expect(types.create).not.toHaveBeenCalled();
  });

  it("se elimina de forma lógica, con evidencia", async () => {
    types.findUnique.mockResolvedValue({ sta_id: 1 });

    await service.remove({ id: 2, useBy: 9 });

    expect(types.update.mock.calls[0][0]).toMatchObject({
      where: { adt_id: 2 },
      data: { sta_id: 3, adt_delete_by: 9, adt_delete_at: expect.any(Date) },
    });
  });

  it("el selector devuelve el nombre, ordenado por nombre", async () => {
    types.findMany.mockResolvedValue([{ adt_id: 1, adt_name: "Bodega", sta_id: 1 }]);

    await expect(service.select({})).resolves.toEqual([{ value: 1, label: "Bodega", staId: 1 }]);
    expect(types.findMany.mock.calls[0][0].orderBy).toEqual({ adt_name: "asc" });
  });
});
