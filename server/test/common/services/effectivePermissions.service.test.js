import { jest } from "@jest/globals";

const prismaMock = {
  tbl_profile_permissions: { findFirst: jest.fn(), findMany: jest.fn() },
  tbl_user_permissions: { findFirst: jest.fn(), findMany: jest.fn() },
  tbl_users: { findMany: jest.fn() },
};

jest.unstable_mockModule("../../../src/common/configs/prismaClient.js", () => ({
  prisma: prismaMock,
}));

const { hasEffectivePermission, getEffectivePermissionIds, findUsersWithPermission } = await import(
  "../../../src/common/services/effectivePermissions.service.js"
);

beforeEach(() => {
  Object.values(prismaMock.tbl_profile_permissions).forEach((fn) => fn.mockReset());
  Object.values(prismaMock.tbl_user_permissions).forEach((fn) => fn.mockReset());
});

describe("hasEffectivePermission", () => {
  it("es true si lo otorga el perfil, aunque no haya excepción individual", async () => {
    prismaMock.tbl_profile_permissions.findFirst.mockResolvedValue({ prp_id: 1 });
    prismaMock.tbl_user_permissions.findFirst.mockResolvedValue(null);

    await expect(
      hasEffectivePermission({ useId: 2, proId: 3, perId: 5 })
    ).resolves.toBe(true);
  });

  it("es true si lo otorga solo la excepción individual, sin el perfil", async () => {
    prismaMock.tbl_profile_permissions.findFirst.mockResolvedValue(null);
    prismaMock.tbl_user_permissions.findFirst.mockResolvedValue({ usp_granted: true });

    await expect(
      hasEffectivePermission({ useId: 2, proId: 3, perId: 5 })
    ).resolves.toBe(true);
  });

  it("es false si el perfil lo otorga pero la excepción individual lo niega (DEC-067)", async () => {
    prismaMock.tbl_profile_permissions.findFirst.mockResolvedValue({ prp_id: 1 });
    prismaMock.tbl_user_permissions.findFirst.mockResolvedValue({ usp_granted: false });

    await expect(
      hasEffectivePermission({ useId: 2, proId: 3, perId: 5 })
    ).resolves.toBe(false);
  });

  it("es false si ni el perfil ni la excepción individual lo otorgan", async () => {
    prismaMock.tbl_profile_permissions.findFirst.mockResolvedValue(null);
    prismaMock.tbl_user_permissions.findFirst.mockResolvedValue(null);

    await expect(
      hasEffectivePermission({ useId: 2, proId: 3, perId: 5 })
    ).resolves.toBe(false);
  });

  it("no consulta tbl_profile_permissions si no se pasa proId", async () => {
    prismaMock.tbl_user_permissions.findFirst.mockResolvedValue(null);

    await hasEffectivePermission({ useId: 2, perId: 5 });

    expect(prismaMock.tbl_profile_permissions.findFirst).not.toHaveBeenCalled();
  });
});

describe("getEffectivePermissionIds", () => {
  it("devuelve la unión sin duplicados de permisos de perfil e individuales", async () => {
    prismaMock.tbl_profile_permissions.findMany.mockResolvedValue([
      { per_id: 1 },
      { per_id: 5 },
    ]);
    prismaMock.tbl_user_permissions.findMany.mockResolvedValue([
      { per_id: 5, usp_granted: true },
      { per_id: 9, usp_granted: true },
    ]);

    const result = await getEffectivePermissionIds({ useId: 2, proId: 3 });

    expect(result.sort()).toEqual([1, 5, 9]);
  });

  it("resta los permisos que una excepción individual niega (DEC-067)", async () => {
    prismaMock.tbl_profile_permissions.findMany.mockResolvedValue([{ per_id: 1 }, { per_id: 5 }]);
    prismaMock.tbl_user_permissions.findMany.mockResolvedValue([
      { per_id: 5, usp_granted: false },
      { per_id: 9, usp_granted: true },
    ]);

    const result = await getEffectivePermissionIds({ useId: 2, proId: 3 });

    expect(result.sort()).toEqual([1, 9]);
  });

  it("devuelve solo individuales si no se pasa proId", async () => {
    prismaMock.tbl_user_permissions.findMany.mockResolvedValue([{ per_id: 9, usp_granted: true }]);

    const result = await getEffectivePermissionIds({ useId: 2 });

    expect(result).toEqual([9]);
    expect(prismaMock.tbl_profile_permissions.findMany).not.toHaveBeenCalled();
  });
});

describe("findUsersWithPermission", () => {
  it("excluye a quien tiene el permiso por perfil pero se lo niegan, e incluye a quien se lo conceden (DEC-067)", async () => {
    prismaMock.tbl_users.findMany.mockResolvedValue([]);

    await findUsersWithPermission(108);

    const { where } = prismaMock.tbl_users.findMany.mock.calls[0][0];
    expect(where.OR).toEqual([
      {
        tbl_profiles: { tbl_profile_permissions: { some: { per_id: 108 } } },
        tbl_user_permissions: { none: { per_id: 108, usp_granted: false } },
      },
      { tbl_user_permissions: { some: { per_id: 108, usp_granted: true } } },
    ]);
  });
});
