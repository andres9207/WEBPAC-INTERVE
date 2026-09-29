import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Lo propio del maestro de aseguradoras (ADR-0003). El comportamiento común
// (incluido el bloqueo por dependientes) está en
// test/common/services/master.service.test.js.

const prismaMock = {
  tbl_insurers: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { insurersService: service } = await import("../../../../src/modules/admin/insurers/insurers.service.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const insurers = prismaMock.tbl_insurers;

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  insurers.findUnique.mockResolvedValue(null);
  insurers.findFirst.mockResolvedValue(null);
});

describe("aseguradoras", () => {
  it("crea la aseguradora activa, con su descripción", async () => {
    insurers.create.mockResolvedValue({ ins_id: 1 });

    await expect(service.save({ id: 0, input: { description: " Seguros del Estado " }, useBy: 9, idempotencyKey: KEY })).resolves.toEqual({
      message: "Aseguradora creada correctamente",
      insId: 1,
    });
    expect(insurers.create.mock.calls[0][0].data).toMatchObject({ ins_description: "Seguros del Estado", sta_id: 1, ins_create_by: 9 });
  });

  it("la descripción repetida entre no eliminadas se rechaza", async () => {
    insurers.findFirst.mockResolvedValue({ ins_description: "Seguros del Estado" });

    await expect(service.save({ id: 0, input: { description: "seguros del estado" }, useBy: 9, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "Ya existe una aseguradora con esa descripción.",
    });
    expect(insurers.create).not.toHaveBeenCalled();
  });

  it("desactivar conserva la aseguradora para las pólizas existentes", async () => {
    insurers.findUnique.mockResolvedValue({ ins_description: "Seguros del Estado", sta_id: 1 });

    await expect(service.changeStatus({ id: 1, staId: 2, useBy: 9 })).resolves.toEqual({
      message: "Aseguradora desactivada correctamente",
      staId: 2,
    });
    expect(insurers.update.mock.calls[0][0].data).toEqual({ sta_id: 2, ins_update_by: 9 });
  });

  it("el selector devuelve la descripción, ordenado por descripción", async () => {
    insurers.findMany.mockResolvedValue([{ ins_id: 1, ins_description: "Seguros del Estado", sta_id: 1 }]);

    await expect(service.select({})).resolves.toEqual([{ value: 1, label: "Seguros del Estado", staId: 1 }]);
    expect(insurers.findMany.mock.calls[0][0].orderBy).toEqual({ ins_description: "asc" });
  });
});
