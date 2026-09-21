import { jest } from "@jest/globals";

const prismaMock = {
  tbl_profile_permissions: { findMany: jest.fn(), deleteMany: jest.fn(), createMany: jest.fn() },
  tbl_user_permissions: { findMany: jest.fn(), deleteMany: jest.fn(), createMany: jest.fn() },
  tbl_users: { findUnique: jest.fn() },
  $transaction: jest.fn((fn) => fn(prismaMock)),
};

jest.unstable_mockModule("../../../common/configs/prismaClient.js", () => ({
  prisma: prismaMock,
}));

const mockGetIO = jest.fn(() => ({ emit: jest.fn() }));
jest.unstable_mockModule("../../../common/configs/socket.manager.js", () => ({
  getIO: mockGetIO,
}));

const mockGetEffectivePermissionIds = jest.fn().mockResolvedValue([]);
jest.unstable_mockModule("../../../common/services/effectivePermissions.service.js", () => ({
  getEffectivePermissionIds: mockGetEffectivePermissionIds,
}));

const permissionsService = await import("./permissions.service.js");

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.tbl_profile_permissions.findMany.mockResolvedValue([]);
  prismaMock.tbl_user_permissions.findMany.mockResolvedValue([]);
  prismaMock.tbl_users.findUnique.mockResolvedValue({ pro_id: 1 });
});

describe("updateProfilePermissions — impedir autoconcesión", () => {
  it("rechaza con 403 si el solicitante pertenece al perfil que intenta modificar", async () => {
    await expect(
      permissionsService.updateProfilePermissions({ permissions: [1], proId: 3, actingProId: 3 })
    ).rejects.toMatchObject({ status: 403 });

    expect(prismaMock.tbl_profile_permissions.deleteMany).not.toHaveBeenCalled();
    expect(prismaMock.tbl_profile_permissions.createMany).not.toHaveBeenCalled();
  });

  it("permite modificar los permisos de un perfil distinto al del solicitante", async () => {
    await expect(
      permissionsService.updateProfilePermissions({ permissions: [1], proId: 3, actingProId: 7 })
    ).resolves.toMatchObject({ message: expect.any(String) });
  });
});

describe("updateUserPermissions — impedir autoconcesión", () => {
  it("rechaza con 403 si el solicitante intenta modificar sus propios permisos", async () => {
    await expect(
      permissionsService.updateUserPermissions({ permissions: [1], useId: 5, actingUseId: 5 })
    ).rejects.toMatchObject({ status: 403 });

    expect(prismaMock.tbl_users.findUnique).not.toHaveBeenCalled();
  });

  it("aplica también al propio Superadmin (useId=1), sin excepción", async () => {
    await expect(
      permissionsService.updateUserPermissions({ permissions: [1], useId: 1, actingUseId: 1 })
    ).rejects.toMatchObject({ status: 403 });
  });

  it("permite modificar los permisos de un usuario distinto al del solicitante", async () => {
    await expect(
      permissionsService.updateUserPermissions({ permissions: [1], useId: 5, actingUseId: 1 })
    ).resolves.toMatchObject({ message: expect.any(String) });
  });
});
