import { jest } from "@jest/globals";
import { validationResult } from "express-validator";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Lo propio del maestro de tipos de identificación (ADR-0008). El
// comportamiento común está en test/common/services/master.service.test.js.

const prismaMock = {
  tbl_identity_documents: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  },
  tbl_users: { count: jest.fn() },
  tbl_providers: { count: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { identityDocumentsConfig, identityDocumentsService: service } = await import(
  "../../../../src/modules/admin/identityDocuments/identityDocuments.service.js"
);
const { createMasterSchemas } = await import("../../../../src/common/utils/masterValidation.utils.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const docs = prismaMock.tbl_identity_documents;

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  docs.findUnique.mockResolvedValue(null);
  docs.findFirst.mockResolvedValue(null);
  prismaMock.tbl_users.count.mockResolvedValue(0);
  prismaMock.tbl_providers.count.mockResolvedValue(0);
});

describe("tipos de identificación", () => {
  it("el código se guarda en mayúsculas y el tipo nace activo", async () => {
    docs.create.mockResolvedValue({ idd_id: 6 });

    await expect(service.save({ id: 0, input: { code: " nit ", name: "NIT" }, useBy: 9, idempotencyKey: KEY })).resolves.toEqual({
      message: "Tipo de identificación creado correctamente",
      iddId: 6,
    });
    expect(docs.create.mock.calls[0][0].data).toMatchObject({ idd_code: "NIT", idd_name: "NIT", sta_id: 1, idd_create_by: 9 });
  });

  it("el código no se edita", async () => {
    docs.findUnique.mockResolvedValue({ idd_code: "NIT", idd_name: "NIT", sta_id: 1 });

    await service.save({ id: 3, input: { code: "XXX", name: "Número de identificación tributaria" }, useBy: 9 });

    expect(docs.update.mock.calls[0][0].data).toEqual({ idd_name: "Número de identificación tributaria", idd_update_by: 9 });
  });

  it("el código repetido se informa como código", async () => {
    docs.findFirst.mockResolvedValue({ idd_code: "NIT", idd_name: "Otro nombre" });

    await expect(service.save({ id: 0, input: { code: "nit", name: "Nuevo" }, useBy: 9, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 400,
      message: "Ya existe un tipo de identificación con ese código.",
    });
  });

  it("no se elimina si lo usan usuarios no eliminados", async () => {
    docs.findUnique.mockResolvedValue({ sta_id: 1 });
    prismaMock.tbl_users.count.mockResolvedValue(2);

    await expect(service.remove({ id: 1, useBy: 9 })).rejects.toMatchObject({
      statusCode: 400,
      message: expect.stringContaining("lo usan 2 usuario(s)"),
    });
    expect(prismaMock.tbl_users.count).toHaveBeenCalledWith({ where: { idd_id: 1, sta_id: { not: 3 } } });
    expect(docs.update).not.toHaveBeenCalled();
  });

  it("no se elimina si lo usan proveedores no eliminados", async () => {
    docs.findUnique.mockResolvedValue({ sta_id: 1 });
    prismaMock.tbl_providers.count.mockResolvedValue(4);

    await expect(service.remove({ id: 1, useBy: 9 })).rejects.toMatchObject({
      statusCode: 400,
      message: expect.stringContaining("lo usan 4 proveedor(es)"),
    });
    expect(prismaMock.tbl_providers.count).toHaveBeenCalledWith({ where: { idd_id: 1, sta_id: { not: 3 } } });
    expect(docs.update).not.toHaveBeenCalled();
  });

  it("el selector muestra nombre y código, y entrega el código y el formato del número", async () => {
    docs.findMany.mockResolvedValue([{ idd_id: 1, idd_code: "CC", idd_name: "Cédula de ciudadanía", sta_id: 1 }]);

    await expect(service.select({})).resolves.toEqual([
      {
        value: 1,
        label: "Cédula de ciudadanía (CC)",
        staId: 1,
        code: "CC",
        format: { pattern: "^\\d{6,10}$", message: "debe tener de 6 a 10 dígitos, sin puntos ni espacios" },
      },
    ]);
    expect(docs.findMany.mock.calls[0][0].orderBy).toEqual({ idd_name: "asc" });
  });

  it("el código solo admite letras y números", async () => {
    const req = { headers: { "idempotency-key": KEY }, body: { iddId: 0, code: "C C", name: "Cédula" } };
    for (const rule of createMasterSchemas(identityDocumentsConfig).save) await rule.run(req);
    expect(validationResult(req).array().map((e) => e.msg)).toEqual(["El código solo admite letras y números, sin espacios."]);
  });
});
