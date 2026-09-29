import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Lo propio del maestro de tipos de interventoría (ADR-0007). El comportamiento
// común está en test/common/services/master.service.test.js.

const prismaMock = {
  tbl_supervision_types: {
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

const { supervisionTypesService: service } = await import("../../../../src/modules/admin/supervisionTypes/supervisionTypes.service.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const types = prismaMock.tbl_supervision_types;

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  types.findUnique.mockResolvedValue(null);
  types.findFirst.mockResolvedValue(null);
});

describe("tipos de interventoría", () => {
  it("crea el tipo activo, solo con nombre", async () => {
    types.create.mockResolvedValue({ spt_id: 4 });

    await expect(service.save({ id: 0, input: { name: " Ambiental " }, useBy: 9, idempotencyKey: KEY })).resolves.toEqual({
      message: "Tipo de interventoría creado correctamente",
      sptId: 4,
    });
    expect(types.create.mock.calls[0][0].data).toMatchObject({ spt_name: "Ambiental", sta_id: 1, spt_create_by: 9 });
  });

  it("el nombre repetido entre no eliminados se rechaza", async () => {
    types.findFirst.mockResolvedValue({ spt_name: "Técnica" });

    await expect(service.save({ id: 0, input: { name: "tecnica" }, useBy: 9, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "Ya existe un tipo de interventoría con ese nombre.",
    });
    expect(types.create).not.toHaveBeenCalled();
  });

  it("se elimina de forma lógica, con evidencia", async () => {
    types.findUnique.mockResolvedValue({ sta_id: 1 });

    await service.remove({ id: 2, useBy: 9 });

    expect(types.update.mock.calls[0][0]).toMatchObject({
      where: { spt_id: 2 },
      data: { sta_id: 3, spt_delete_by: 9, spt_delete_at: expect.any(Date) },
    });
  });

  it("el selector devuelve el nombre, ordenado por nombre", async () => {
    types.findMany.mockResolvedValue([{ spt_id: 1, spt_name: "Técnica", sta_id: 1 }]);

    await expect(service.select({})).resolves.toEqual([{ value: 1, label: "Técnica", staId: 1 }]);
    expect(types.findMany.mock.calls[0][0].orderBy).toEqual({ spt_name: "asc" });
  });
});
