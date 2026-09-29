import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

const prismaMock = {
  tbl_identity_documents: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  },
  tbl_users: { count: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({
  prisma: prismaMock,
}));

const service = await import("../../../../src/modules/admin/identityDocuments/identityDocuments.service.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const createArgs = { iddId: 0, code: " nit ", name: "NIT", staId: 1, useBy: 9, idempotencyKey: KEY };

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  // Sin creación previa con la clave de idempotencia.
  prismaMock.tbl_identity_documents.findUnique.mockResolvedValue(null);
  prismaMock.tbl_identity_documents.findFirst.mockResolvedValue(null);
  prismaMock.tbl_users.count.mockResolvedValue(0);
});

describe("saveIdentityDocument — crear", () => {
  it("crea con el código normalizado, el autor de la sesión y la clave de idempotencia", async () => {
    prismaMock.tbl_identity_documents.create.mockResolvedValue({ idd_id: 6 });

    await expect(service.saveIdentityDocument(createArgs)).resolves.toMatchObject({ iddId: 6 });

    const { data } = prismaMock.tbl_identity_documents.create.mock.calls[0][0];
    expect(data).toMatchObject({ idd_code: "NIT", idd_name: "NIT", sta_id: 1, idd_create_by: 9, idd_update_by: 9 });
    expect(data.idd_idempotency_key).toBe(KEY);
    expect(data.idd_idempotency_hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("rechaza un código repetido entre los no eliminados, nombrando el campo", async () => {
    prismaMock.tbl_identity_documents.findFirst.mockResolvedValue({ idd_code: "NIT" });

    await expect(service.saveIdentityDocument(createArgs)).rejects.toMatchObject({
      statusCode: 400,
      message: "Ya existe un tipo de identificación con ese código.",
    });
    expect(prismaMock.tbl_identity_documents.findFirst.mock.calls[0][0].where.sta_id).toEqual({ not: 3 });
    expect(prismaMock.tbl_identity_documents.create).not.toHaveBeenCalled();
  });

  it("rechaza un nombre repetido", async () => {
    prismaMock.tbl_identity_documents.findFirst.mockResolvedValue({ idd_code: "OTRO" });

    await expect(service.saveIdentityDocument(createArgs)).rejects.toMatchObject({
      statusCode: 400,
      message: "Ya existe un tipo de identificación con ese nombre.",
    });
  });

  it("un reintento con la misma clave devuelve lo creado, sin el control de duplicados ni otra creación", async () => {
    prismaMock.tbl_identity_documents.create.mockResolvedValue({ idd_id: 6 });
    await service.saveIdentityDocument(createArgs);
    const { idd_idempotency_hash: hash } = prismaMock.tbl_identity_documents.create.mock.calls[0][0].data;
    jest.clearAllMocks();
    prismaMock.tbl_identity_documents.findFirst.mockResolvedValue({ idd_code: "NIT" }); // diría "ya existe"
    prismaMock.tbl_identity_documents.findUnique.mockResolvedValue({
      idd_id: 6,
      idd_name: "NIT",
      idd_idempotency_hash: hash,
      idd_create_by: 9,
    });

    await expect(service.saveIdentityDocument(createArgs)).resolves.toMatchObject({ iddId: 6 });
    expect(prismaMock.tbl_identity_documents.create).not.toHaveBeenCalled();
  });
});

describe("saveIdentityDocument — editar", () => {
  const editArgs = { iddId: 3, code: "XXX", name: "Número de identificación tributaria", staId: 2, useBy: 9 };

  it("bloquea antes de leer, cambia nombre y estado, y no toca el código", async () => {
    prismaMock.tbl_identity_documents.findUnique.mockResolvedValue({ sta_id: 1 });

    await service.saveIdentityDocument(editArgs);

    expect(prismaMock.$queryRaw.mock.invocationCallOrder[0]).toBeLessThan(
      prismaMock.tbl_identity_documents.findUnique.mock.invocationCallOrder[0]
    );
    expect(prismaMock.tbl_identity_documents.update).toHaveBeenCalledWith({
      where: { idd_id: 3 },
      data: { idd_name: "Número de identificación tributaria", sta_id: 2, idd_update_by: 9 },
    });
  });

  it("el duplicado de nombre excluye el propio registro", async () => {
    prismaMock.tbl_identity_documents.findUnique.mockResolvedValue({ sta_id: 1 });

    await service.saveIdentityDocument(editArgs);

    expect(prismaMock.tbl_identity_documents.findFirst.mock.calls[0][0].where.idd_id).toEqual({ not: 3 });
  });

  it("inexistente responde 404", async () => {
    await expect(service.saveIdentityDocument(editArgs)).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.tbl_identity_documents.update).not.toHaveBeenCalled();
  });

  it("reactivar un tipo eliminado limpia idd_delete_by/_at", async () => {
    prismaMock.tbl_identity_documents.findUnique.mockResolvedValue({ sta_id: 3 });

    await service.saveIdentityDocument({ ...editArgs, staId: 1 });

    expect(prismaMock.tbl_identity_documents.update.mock.calls[0][0].data).toMatchObject({
      idd_delete_by: null,
      idd_delete_at: null,
    });
  });
});

describe("deleteIdentityDocument", () => {
  it("eliminación lógica con quién y cuándo", async () => {
    prismaMock.tbl_identity_documents.findUnique.mockResolvedValue({ sta_id: 1 });

    await service.deleteIdentityDocument({ iddId: 4, useBy: 9 });

    expect(prismaMock.tbl_identity_documents.update).toHaveBeenCalledWith({
      where: { idd_id: 4 },
      data: { sta_id: 3, idd_update_by: 9, idd_delete_by: 9, idd_delete_at: expect.any(Date) },
    });
  });

  it("ya eliminado o inexistente responde 404 y no pisa la evidencia", async () => {
    prismaMock.tbl_identity_documents.findUnique.mockResolvedValue({ sta_id: 3 });

    await expect(service.deleteIdentityDocument({ iddId: 4, useBy: 9 })).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.tbl_identity_documents.update).not.toHaveBeenCalled();
  });

  it("en uso por usuarios no eliminados, no se elimina", async () => {
    prismaMock.tbl_identity_documents.findUnique.mockResolvedValue({ sta_id: 1 });
    prismaMock.tbl_users.count.mockResolvedValue(2);

    await expect(service.deleteIdentityDocument({ iddId: 1, useBy: 9 })).rejects.toMatchObject({ statusCode: 400 });
    expect(prismaMock.tbl_users.count).toHaveBeenCalledWith({ where: { idd_id: 1, sta_id: { not: 3 } } });
    expect(prismaMock.tbl_identity_documents.update).not.toHaveBeenCalled();
  });

  it("cuenta los usuarios con el tipo ya bloqueado", async () => {
    prismaMock.tbl_identity_documents.findUnique.mockResolvedValue({ sta_id: 1 });

    await service.deleteIdentityDocument({ iddId: 1, useBy: 9 });

    expect(prismaMock.$queryRaw.mock.invocationCallOrder[0]).toBeLessThan(prismaMock.tbl_users.count.mock.invocationCallOrder[0]);
  });
});

describe("getIdentityDocumentsSelect", () => {
  it("solo activos, con tope fijo, más el tipo actual si no está eliminado", async () => {
    prismaMock.tbl_identity_documents.findMany.mockResolvedValue([
      { idd_id: 1, idd_code: "CC", idd_name: "Cédula de ciudadanía", sta_id: 1 },
    ]);

    const options = await service.getIdentityDocumentsSelect({ includeId: "7" });

    const args = prismaMock.tbl_identity_documents.findMany.mock.calls[0][0];
    expect(args.where.OR).toEqual([{ sta_id: 1 }, { idd_id: 7, sta_id: { not: 3 } }]);
    expect(args.take).toBe(100);
    expect(options).toEqual([{ value: 1, label: "Cédula de ciudadanía (CC)", code: "CC", staId: 1 }]);
  });

  it("sin includeId, solo activos", async () => {
    prismaMock.tbl_identity_documents.findMany.mockResolvedValue([]);

    await service.getIdentityDocumentsSelect({});

    expect(prismaMock.tbl_identity_documents.findMany.mock.calls[0][0].where.OR).toEqual([{ sta_id: 1 }]);
  });
});
