import { jest } from "@jest/globals";
import { validationResult } from "express-validator";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Lo propio del maestro de constructoras (ADR-0004), con su NIT (migración
// 0115: obligatorio, único entre no eliminadas, de 5 a 15 dígitos, guion y un
// dígito de verificación libre). El comportamiento común
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

const { constructionCompaniesConfig: config, constructionCompaniesService: service } = await import(
  "../../../../src/modules/admin/constructionCompanies/constructionCompanies.service.js"
);
const { createMasterSchemas } = await import("../../../../src/common/utils/masterValidation.utils.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const companies = prismaMock.tbl_construction_companies;
const NIT = "900123456-8";

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  companies.findUnique.mockResolvedValue(null);
  companies.findFirst.mockResolvedValue(null);
});

describe("constructoras", () => {
  it("crea la constructora activa, con su descripción", async () => {
    companies.create.mockResolvedValue({ cnc_id: 1 });

    await expect(service.save({ id: 0, input: { description: " Constructora Andina ", nit: ` ${NIT} ` }, useBy: 9, idempotencyKey: KEY })).resolves.toEqual({
      message: "Constructora creada correctamente",
      cncId: 1,
    });
    expect(companies.create.mock.calls[0][0].data).toMatchObject({ cnc_description: "Constructora Andina", cnc_nit: NIT, sta_id: 1, cnc_create_by: 9 });
  });

  it("la descripción repetida entre no eliminadas se rechaza", async () => {
    companies.findFirst.mockResolvedValue({ cnc_description: "Constructora Andina" });

    await expect(service.save({ id: 0, input: { description: "constructora andina", nit: NIT }, useBy: 9, idempotencyKey: KEY })).rejects.toMatchObject({
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

  it("el dígito de verificación del NIT es libre: no se recalcula", async () => {
    companies.create.mockResolvedValue({ cnc_id: 1 });

    await service.save({ id: 0, input: { description: "Constructora Andina", nit: "900123456-1" }, useBy: 9, idempotencyKey: KEY });
    expect(companies.create.mock.calls[0][0].data).toMatchObject({ cnc_nit: "900123456-1" });
  });

  it("el NIT repetido entre no eliminadas se rechaza", async () => {
    companies.findFirst.mockResolvedValue({ cnc_description: "Otra constructora", cnc_nit: NIT });

    await expect(service.save({ id: 0, input: { description: "Constructora Andina", nit: NIT }, useBy: 9, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "Ya existe una constructora con ese NIT.",
    });
    expect(companies.create).not.toHaveBeenCalled();
  });

  it("el filtro por NIT busca también sin el guion de la máscara", async () => {
    companies.findMany.mockResolvedValue([]);
    companies.count = jest.fn().mockResolvedValue(0);
    companies.groupBy = jest.fn().mockResolvedValue([]);

    await service.pagination({ filters: { nit: "90012-3" }, staId: 1, rows: 10, first: 0 });
    expect(companies.findMany.mock.calls[0][0].where).toMatchObject({
      AND: [{ OR: [{ cnc_nit: { contains: "90012-3" } }, { cnc_nit: { contains: "900123" } }] }, { sta_id: 1 }],
    });
  });

  it("la ruta exige el NIT con de 5 a 15 dígitos, guion y dígito de verificación", async () => {
    const errorsFor = async (body) => {
      const req = { headers: { "idempotency-key": KEY }, body, query: body };
      for (const rule of createMasterSchemas(config).save) await rule.run(req);
      return validationResult(req).array().map((e) => e.msg);
    };
    const FORMAT = "El NIT debe tener de 5 a 15 dígitos, guion y dígito de verificación (p. ej. 900123456-8).";

    expect(await errorsFor({ description: "Constructora Andina" })).toContain("El NIT es requerido.");
    for (const nit of ["900123456", "900123456-", "1234-5", "1234567890123456-1", "900.123.456-8"]) {
      expect(await errorsFor({ description: "Constructora Andina", nit })).toContain(FORMAT);
    }
    for (const nit of ["12345-0", NIT, "123456789012345-9"]) {
      expect(await errorsFor({ description: "Constructora Andina", nit })).toEqual([]);
    }
  });
});
