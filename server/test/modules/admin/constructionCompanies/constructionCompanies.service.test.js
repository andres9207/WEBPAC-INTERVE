import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Lo propio del maestro de constructoras (ADR-0004). El comportamiento común
// (incluido el bloqueo por dependientes) está en
// test/common/services/master.service.test.js.

const prismaMock = {
  tbl_construction_companies: {
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

const { constructionCompaniesService: service } = await import("../../../../src/modules/admin/constructionCompanies/constructionCompanies.service.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const companies = prismaMock.tbl_construction_companies;

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  companies.findUnique.mockResolvedValue(null);
  companies.findFirst.mockResolvedValue(null);
});

describe("constructoras", () => {
  it("crea la constructora activa, con su descripción", async () => {
    companies.create.mockResolvedValue({ cnc_id: 1 });

    await expect(service.save({ id: 0, input: { description: " Constructora Andina " }, useBy: 9, idempotencyKey: KEY })).resolves.toEqual({
      message: "Constructora creada correctamente",
      cncId: 1,
    });
    expect(companies.create.mock.calls[0][0].data).toMatchObject({ cnc_description: "Constructora Andina", sta_id: 1, cnc_create_by: 9 });
  });

  it("la descripción repetida entre no eliminadas se rechaza", async () => {
    companies.findFirst.mockResolvedValue({ cnc_description: "Constructora Andina" });

    await expect(service.save({ id: 0, input: { description: "constructora andina" }, useBy: 9, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "Ya existe una constructora con esa descripción.",
    });
    expect(companies.create).not.toHaveBeenCalled();
  });

  it("desactivar conserva la constructora para las obras existentes", async () => {
    companies.findUnique.mockResolvedValue({ cnc_description: "Constructora Andina", sta_id: 1 });

    await expect(service.changeStatus({ id: 1, staId: 2, useBy: 9 })).resolves.toEqual({
      message: "Constructora desactivada correctamente",
      staId: 2,
    });
    expect(companies.update.mock.calls[0][0].data).toEqual({ sta_id: 2, cnc_update_by: 9 });
  });

  it("el selector devuelve la descripción, ordenado por descripción", async () => {
    companies.findMany.mockResolvedValue([{ cnc_id: 1, cnc_description: "Constructora Andina", sta_id: 1 }]);

    await expect(service.select({})).resolves.toEqual([{ value: 1, label: "Constructora Andina", staId: 1 }]);
    expect(companies.findMany.mock.calls[0][0].orderBy).toEqual({ cnc_description: "asc" });
  });
});
