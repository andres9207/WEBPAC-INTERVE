import { jest } from "@jest/globals";

const prismaMock = {
  tbl_documents: { findMany: jest.fn(), count: jest.fn(), findUnique: jest.fn(), groupBy: jest.fn() },
  tbl_users: { findMany: jest.fn() },
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({
  prisma: prismaMock,
}));

const documentsService = await import("../../../../src/modules/app/documents/document.service.js");

const listArgs = () => prismaMock.tbl_documents.findMany.mock.calls[0][0];

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.tbl_documents.findMany.mockResolvedValue([]);
  prismaMock.tbl_documents.count.mockResolvedValue(0);
});

describe("paginationModuleDocs — filtros parametrizados (FND-BE-30)", () => {
  it("un campo de orden fuera de la lista cae al orden por nombre", async () => {
    await documentsService.paginationModuleDocs({ rows: 10, first: 0, sortField: "doc_name; DROP TABLE tbl_documents", sortOrder: 1 });

    expect(listArgs().orderBy).toEqual({ doc_name: "asc" });
  });

  it("el nombre y el tipo llegan como valores del filtro, y las referencias como número", async () => {
    const injection = "x' OR '1'='1";
    await documentsService.paginationModuleDocs({ rows: 10, first: 0, nombre: injection, docType: injection, docIdRef: "7", parentId: "4" });

    expect(listArgs().where).toEqual({
      sta_id: { not: 3 },
      doc_name: { contains: injection },
      doc_type: injection,
      doc_id_ref: 7,
      doc_parent_id: 4,
    });
  });
});
