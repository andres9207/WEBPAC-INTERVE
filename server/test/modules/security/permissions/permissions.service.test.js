import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

const prismaMock = {
  tbl_profile_permissions: { findMany: jest.fn(), deleteMany: jest.fn(), createMany: jest.fn() },
  tbl_user_permissions: { findMany: jest.fn(), deleteMany: jest.fn(), createMany: jest.fn() },
  tbl_users: { findUnique: jest.fn() },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({
  prisma: prismaMock,
}));

const mockGetIO = jest.fn(() => ({ to: jest.fn().mockReturnThis(), emit: jest.fn() }));
jest.unstable_mockModule("../../../../src/common/configs/socket.manager.js", () => ({
  getIO: mockGetIO,
}));

const mockGetEffectivePermissionIds = jest.fn().mockResolvedValue([]);
jest.unstable_mockModule("../../../../src/common/services/effectivePermissions.service.js", () => ({
  getEffectivePermissionIds: mockGetEffectivePermissionIds,
}));

const permissionsService = await import("../../../../src/modules/security/permissions/permissions.service.js");

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

  it("emite update-permissions solo a la sala del usuario afectado, no a todos los clientes", async () => {
    const ioInstance = { to: jest.fn().mockReturnThis(), emit: jest.fn() };
    mockGetIO.mockReturnValueOnce(ioInstance);

    await permissionsService.updateUserPermissions({ permissions: [1], useId: 5, actingUseId: 1 });

    expect(ioInstance.to).toHaveBeenCalledWith("user:5");
    expect(ioInstance.emit).toHaveBeenCalledWith("update-permissions", expect.objectContaining({ useId: 5 }));
  });
});

describe("bitácora de permisos (ADR-0013)", () => {
  it("registra cada permiso asignado y revocado con el autor de la sesión y un mismo operationId", async () => {
    prismaMock.tbl_user_permissions.findMany.mockResolvedValue([{ per_id: 3 }]);
    prismaMock.tbl_profile_permissions.findMany.mockResolvedValue([]);

    await permissionsService.updateUserPermissions({
      permissions: [1, 2],
      useId: 5,
      actingUseId: 9,
      ctx: { useId: 9, ip: "1.1.1.1" },
    });

    const rows = prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);
    const granted = rows.filter((r) => r.aud_operation === "ASIGNAR").map((r) => r.aud_new_value);
    const revoked = rows.filter((r) => r.aud_operation === "REVOCAR").map((r) => r.aud_old_value);

    expect(granted).toEqual(["1", "2"]);
    expect(revoked).toEqual(["3"]);
    expect(new Set(rows.map((r) => r.aud_operation_id)).size).toBe(1);
    expect(rows.every((r) => r.use_id === 9 && r.aud_entity === "USUARIO" && r.aud_record_id === 5)).toBe(true);
  });

  it("no escribe en la bitácora si no hubo cambios", async () => {
    prismaMock.tbl_profile_permissions.findMany.mockResolvedValue([{ per_id: 1 }]);

    await permissionsService.updateProfilePermissions({ permissions: [1], proId: 3, actingProId: 7, ctx: { useId: 9 } });

    expect(prismaMock.tbl_audit_log.createMany).not.toHaveBeenCalled();
  });
});
