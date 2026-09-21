import { jest } from "@jest/globals";

const prismaMock = {
  tbl_user_permissions: { findFirst: jest.fn() },
  tbl_profile_permissions: { findFirst: jest.fn() },
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

beforeEach(() => {
  prismaMock.tbl_user_permissions.findFirst.mockReset();
  prismaMock.tbl_profile_permissions.findFirst.mockReset();
});

describe("requirePermission middleware", () => {
  it("deja pasar al superadmin (useId===1) sin consultar la BD", async () => {
    const req = { user: { useId: 1 }, body: {} };
    const res = buildRes();
    const next = jest.fn();

    await requirePermission(999)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(prismaMock.tbl_user_permissions.findFirst).not.toHaveBeenCalled();
    expect(prismaMock.tbl_profile_permissions.findFirst).not.toHaveBeenCalled();
  });

  it("responde 401 si no hay req.user (verifyToken no corrió antes)", async () => {
    const req = { body: {} };
    const res = buildRes();
    const next = jest.fn();

    await requirePermission(1)(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("responde 403 si ni el perfil ni el usuario tienen el permiso asignado", async () => {
    prismaMock.tbl_user_permissions.findFirst.mockResolvedValue(null);
    prismaMock.tbl_profile_permissions.findFirst.mockResolvedValue(null);
    const req = { user: { useId: 2, proId: 3 }, body: {} };
    const res = buildRes();
    const next = jest.fn();

    await requirePermission(5)(req, res, next);

    expect(prismaMock.tbl_user_permissions.findFirst).toHaveBeenCalledWith({
      where: { use_id: 2, per_id: 5 },
      select: { usp_id: true },
    });
    expect(prismaMock.tbl_profile_permissions.findFirst).toHaveBeenCalledWith({
      where: { pro_id: 3, per_id: 5 },
      select: { prp_id: true },
    });
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("llama a next() si el permiso está asignado individualmente (tbl_user_permissions)", async () => {
    prismaMock.tbl_user_permissions.findFirst.mockResolvedValue({ usp_id: 10 });
    prismaMock.tbl_profile_permissions.findFirst.mockResolvedValue(null);
    const req = { user: { useId: 2, proId: 3 }, body: {} };
    const res = buildRes();
    const next = jest.fn();

    await requirePermission(5)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it("llama a next() si el permiso lo otorga el perfil (tbl_profile_permissions), sin excepción individual", async () => {
    prismaMock.tbl_user_permissions.findFirst.mockResolvedValue(null);
    prismaMock.tbl_profile_permissions.findFirst.mockResolvedValue({ prp_id: 7 });
    const req = { user: { useId: 2, proId: 3 }, body: {} };
    const res = buildRes();
    const next = jest.fn();

    await requirePermission(5)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it("no consulta tbl_profile_permissions si req.user no trae proId", async () => {
    prismaMock.tbl_user_permissions.findFirst.mockResolvedValue(null);
    const req = { user: { useId: 2 }, body: {} };
    const res = buildRes();
    const next = jest.fn();

    await requirePermission(5)(req, res, next);

    expect(prismaMock.tbl_profile_permissions.findFirst).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
  });

  it("acepta una función resolutora del perId a partir del request (crear vs editar)", async () => {
    prismaMock.tbl_user_permissions.findFirst.mockResolvedValue({ usp_id: 1 });
    prismaMock.tbl_profile_permissions.findFirst.mockResolvedValue(null);
    const resolver = (req) => (req.body.useId > 0 ? 6 : 5);

    const reqEdit = { user: { useId: 2, proId: 3 }, body: { useId: 42 } };
    await requirePermission(resolver)(reqEdit, buildRes(), jest.fn());
    expect(prismaMock.tbl_user_permissions.findFirst).toHaveBeenLastCalledWith({
      where: { use_id: 2, per_id: 6 },
      select: { usp_id: true },
    });

    const reqCreate = { user: { useId: 2, proId: 3 }, body: {} };
    await requirePermission(resolver)(reqCreate, buildRes(), jest.fn());
    expect(prismaMock.tbl_user_permissions.findFirst).toHaveBeenLastCalledWith({
      where: { use_id: 2, per_id: 5 },
      select: { usp_id: true },
    });
  });

  it("delega al next(err) si la consulta a Prisma falla", async () => {
    const error = new Error("boom");
    prismaMock.tbl_user_permissions.findFirst.mockRejectedValue(error);
    prismaMock.tbl_profile_permissions.findFirst.mockResolvedValue(null);
    const req = { user: { useId: 2, proId: 3 }, body: {} };
    const res = buildRes();
    const next = jest.fn();

    await requirePermission(5)(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
  });
});
