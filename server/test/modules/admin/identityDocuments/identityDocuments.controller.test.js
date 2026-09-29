import { jest } from "@jest/globals";
import { mockReq } from "../../../helpers/request.mock.js";

// Autor siempre desde req.user, nunca del body (DEC-005).

const serviceMock = {
  paginationIdentityDocuments: jest.fn(),
  getIdentityDocumentsSelect: jest.fn(),
  saveIdentityDocument: jest.fn(),
  deleteIdentityDocument: jest.fn(),
};

jest.unstable_mockModule("../../../../src/modules/admin/identityDocuments/identityDocuments.service.js", () => serviceMock);
jest.unstable_mockModule("../../../../src/common/configs/socket.manager.js", () => ({
  getIO: () => ({ emit: jest.fn() }),
}));
jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: {} }));

const { saveIdentityDocumentController, deleteIdentityDocumentController } = await import(
  "../../../../src/modules/admin/identityDocuments/identityDocuments.controller.js"
);

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const forgedAuthor = { useBy: 999, idd_create_by: 999, idd_update_by: 999 };

beforeEach(() => {
  jest.clearAllMocks();
});

describe("identityDocuments.controller — autor desde req.user", () => {
  it("saveIdentityDocumentController ignora el autor del body y lee la clave del encabezado", async () => {
    serviceMock.saveIdentityDocument.mockResolvedValue({ iddId: 6 });
    const req = mockReq(
      { user: { useId: 7 }, body: { iddId: 0, code: "NIT", name: "NIT", staId: 1, idempotencyKey: "del-body", ...forgedAuthor } },
      { "Idempotency-Key": KEY }
    );

    await saveIdentityDocumentController(req, buildRes(), jest.fn());

    expect(serviceMock.saveIdentityDocument).toHaveBeenCalledWith({
      iddId: 0,
      code: "NIT",
      name: "NIT",
      staId: 1,
      useBy: 7,
      idempotencyKey: KEY,
    });
  });

  it("deleteIdentityDocumentController ignora el autor del body", async () => {
    serviceMock.deleteIdentityDocument.mockResolvedValue({});
    const req = mockReq({ user: { useId: 7 }, body: { iddId: 4, ...forgedAuthor } });

    await deleteIdentityDocumentController(req, buildRes(), jest.fn());

    expect(serviceMock.deleteIdentityDocument).toHaveBeenCalledWith({ iddId: 4, useBy: 7 });
  });

  it("delega los errores del service con next(err)", async () => {
    const error = Object.assign(new Error("en uso"), { statusCode: 400 });
    serviceMock.deleteIdentityDocument.mockRejectedValue(error);
    const next = jest.fn();

    await deleteIdentityDocumentController(mockReq({ user: { useId: 7 }, body: { iddId: 4 } }), buildRes(), next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
