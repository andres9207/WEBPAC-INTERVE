import { jest } from "@jest/globals";

const prismaMock = {
  tbl_user_permissions: { findFirst: jest.fn() },
};

jest.unstable_mockModule("../configs/prismaClient.js", () => ({
  prisma: prismaMock,
}));

const { requirePermission } = await import("./requirePermission.middleware.js");

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("requirePermission middleware", () => {
  it("deja pasar al superadmin (useId===1) sin consultar la BD", async () => {
    const req = { user: { useId: 1 }, body: {} };
    const res = buildRes();
    const next = jest.fn();

    await requirePermission(999)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(prismaMock.tbl_user_permissions.findFirst).not.toHaveBeenCalled();
  });

  it("responde 401 si no hay req.user (verifyToken no corrió antes)", async () => {
    const req = { body: {} };
    const res = buildRes();
    const next = jest.fn();

    await requirePermission(1)(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("responde 403 si el usuario no tiene el permiso asignado", async () => {
    prismaMock.tbl_user_permissions.findFirst.mockResolvedValue(null);
    const req = { user: { useId: 2 }, body: {} };
    const res = buildRes();
    const next = jest.fn();

    await requirePermission(5)(req, res, next);

    expect(prismaMock.tbl_user_permissions.findFirst).toHaveBeenCalledWith({
      where: { use_id: 2, per_id: 5 },
      select: { usp_id: true },
    });
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("llama a next() si el usuario tiene el permiso asignado", async () => {
    prismaMock.tbl_user_permissions.findFirst.mockResolvedValue({ usp_id: 10 });
    const req = { user: { useId: 2 }, body: {} };
    const res = buildRes();
    const next = jest.fn();

    await requirePermission(5)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it("acepta una función resolutora del perId a partir del request (crear vs editar)", async () => {
    prismaMock.tbl_user_permissions.findFirst.mockResolvedValue({ usp_id: 1 });
    const resolver = (req) => (req.body.useId > 0 ? 6 : 5);

    const reqEdit = { user: { useId: 2 }, body: { useId: 42 } };
    await requirePermission(resolver)(reqEdit, buildRes(), jest.fn());
    expect(prismaMock.tbl_user_permissions.findFirst).toHaveBeenLastCalledWith({
      where: { use_id: 2, per_id: 6 },
      select: { usp_id: true },
    });

    const reqCreate = { user: { useId: 2 }, body: {} };
    await requirePermission(resolver)(reqCreate, buildRes(), jest.fn());
    expect(prismaMock.tbl_user_permissions.findFirst).toHaveBeenLastCalledWith({
      where: { use_id: 2, per_id: 5 },
      select: { usp_id: true },
    });
  });

  it("delega al next(err) si la consulta a Prisma falla", async () => {
    const error = new Error("boom");
    prismaMock.tbl_user_permissions.findFirst.mockRejectedValue(error);
    const req = { user: { useId: 2 }, body: {} };
    const res = buildRes();
    const next = jest.fn();

    await requirePermission(5)(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
  });
});
