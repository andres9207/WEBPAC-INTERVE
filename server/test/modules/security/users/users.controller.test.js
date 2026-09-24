import { jest } from "@jest/globals";

// Regresión (ADR-0013, decisión 10): el autor de la auditoría sale siempre
// de req.user (JWT verificado por verifyToken), nunca del body. Una autoría
// que el cliente puede declarar no tiene valor probatorio.

const usersServiceMock = {
  paginationUsers: jest.fn(),
  countUsers: jest.fn(),
  saveUser: jest.fn(),
  deleteUser: jest.fn(),
};

jest.unstable_mockModule("../../../../src/modules/security/users/users.service.js", () => usersServiceMock);
jest.unstable_mockModule("../../../../src/common/services/session.service.js", () => ({
  revokeSession: jest.fn(),
}));
jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: {} }));

const { saveUserController, deleteUserController, paginationUsersController } = await import(
  "../../../../src/modules/security/users/users.controller.js"
);

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Campos de autoría que un cliente malicioso podría intentar colar.
const forgedAuthor = { useBy: 999, updatedBy: 999, createdBy: 999, use_create_by: 999, use_update_by: 999 };

beforeEach(() => {
  jest.clearAllMocks();
});

describe("users.controller — autor desde req.user", () => {
  it("saveUserController ignora useBy y columnas de autoría del body", async () => {
    usersServiceMock.saveUser.mockResolvedValue({ useId: 5 });
    const req = { user: { useId: 7 }, ip: "10.0.0.1", body: { useId: 0, name: "Ana", staId: 1, ...forgedAuthor } };

    await saveUserController(req, buildRes(), jest.fn());

    const args = usersServiceMock.saveUser.mock.calls[0][0];
    expect(args.useBy).toBe(7);
    expect(args.ctx).toEqual({ useId: 7, ip: "10.0.0.1" });
    expect(args).not.toHaveProperty("use_create_by");
    expect(args).not.toHaveProperty("use_update_by");
    expect(args).not.toHaveProperty("updatedBy");
  });

  it("deleteUserController ignora updatedBy del body", async () => {
    usersServiceMock.deleteUser.mockResolvedValue({});
    const req = { user: { useId: 7 }, ip: "10.0.0.1", body: { useId: 3, ...forgedAuthor } };

    await deleteUserController(req, buildRes(), jest.fn());

    expect(usersServiceMock.deleteUser).toHaveBeenCalledWith({
      useId: 3,
      updatedBy: 7,
      ctx: { useId: 7, ip: "10.0.0.1" },
    });
  });

  it("paginationUsersController no reenvía un useId del body al service", async () => {
    usersServiceMock.paginationUsers.mockResolvedValue({ data: [], total: 0 });
    const req = { user: { useId: 7 }, body: { useId: 1, rows: 10 } };

    await paginationUsersController(req, buildRes(), jest.fn());

    expect(usersServiceMock.paginationUsers.mock.calls[0][0]).not.toHaveProperty("useId");
  });
});
