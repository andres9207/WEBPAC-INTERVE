import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

const prismaMock = {
  tbl_profile_permissions: { findMany: jest.fn(), deleteMany: jest.fn(), createMany: jest.fn() },
  tbl_user_permissions: { findMany: jest.fn(), deleteMany: jest.fn(), createMany: jest.fn() },
  tbl_permissions: { findMany: jest.fn() },
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
  // Las ventanas enviadas (pagIds) traen los permisos 1 a 5.
  prismaMock.tbl_permissions.findMany.mockResolvedValue([1, 2, 3, 4, 5].map((per_id) => ({ per_id })));
});

// Decisión del usuario (2026-10-23, SECURITY.md): se pueden modificar los
// permisos propios y los del propio perfil. Lo único bloqueado sobre uno
// mismo es eliminarse (users.service.js).
describe("updateProfilePermissions — el propio perfil", () => {
  it("permite modificar los permisos del perfil del solicitante", async () => {
    await expect(
      permissionsService.updateProfilePermissions({ permissions: [1], proId: 3, actingProId: 3 })
    ).resolves.toMatchObject({ message: expect.any(String) });
  });

  it("y los de un perfil distinto", async () => {
    await expect(
      permissionsService.updateProfilePermissions({ permissions: [1], proId: 3, actingProId: 7 })
    ).resolves.toMatchObject({ message: expect.any(String) });
  });
});

describe("updateUserPermissions — el propio usuario", () => {
  it("permite que el solicitante modifique sus propios permisos", async () => {
    await expect(
      permissionsService.updateUserPermissions({ permissions: [1], pagIds: [10], useId: 5, actingUseId: 5 })
    ).resolves.toMatchObject({ message: expect.any(String) });
  });

  it("y los de un usuario distinto", async () => {
    await expect(
      permissionsService.updateUserPermissions({ permissions: [1], pagIds: [10], useId: 5, actingUseId: 1 })
    ).resolves.toMatchObject({ message: expect.any(String) });
  });

  it("emite update-permissions solo a la sala del usuario afectado, no a todos los clientes", async () => {
    const ioInstance = { to: jest.fn().mockReturnThis(), emit: jest.fn() };
    mockGetIO.mockReturnValueOnce(ioInstance);

    await permissionsService.updateUserPermissions({ permissions: [1], pagIds: [10], useId: 5, actingUseId: 1 });

    expect(ioInstance.to).toHaveBeenCalledWith("user:5");
    expect(ioInstance.emit).toHaveBeenCalledWith("update-permissions", expect.objectContaining({ useId: 5 }));
  });
});

describe("bitácora de permisos (ADR-0013)", () => {
  it("registra cada permiso asignado y revocado con el autor de la sesión y un mismo operationId", async () => {
    prismaMock.tbl_profile_permissions.findMany.mockResolvedValue([]);

    prismaMock.tbl_user_permissions.findMany.mockResolvedValue([{ per_id: 3, usp_granted: true }]);
    await permissionsService.updateUserPermissions({
      permissions: [1, 2],
      pagIds: [10],
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

describe("updateUserPermissions — excepciones que conceden o niegan (DEC-067)", () => {
  const save = (permissions) =>
    permissionsService.updateUserPermissions({ permissions, pagIds: [10], useId: 5, actingUseId: 9, ctx: { useId: 9 } });

  it("quitarle un permiso que da su perfil crea una excepción que lo niega y lo registra como revocado", async () => {
    prismaMock.tbl_profile_permissions.findMany.mockResolvedValue([{ per_id: 1 }, { per_id: 2 }]);

    await save([1]);

    expect(prismaMock.tbl_user_permissions.deleteMany).not.toHaveBeenCalled();
    expect(prismaMock.tbl_user_permissions.createMany).toHaveBeenCalledWith({
      data: [{ per_id: 2, use_id: 5, usp_granted: false }],
    });
    const rows = prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);
    expect(rows.map((r) => [r.aud_operation, r.aud_old_value])).toEqual([["REVOCAR", "2"]]);
  });

  it("devolverle un permiso del perfil borra la excepción que lo negaba", async () => {
    prismaMock.tbl_profile_permissions.findMany.mockResolvedValue([{ per_id: 2 }]);
    prismaMock.tbl_user_permissions.findMany.mockResolvedValue([{ per_id: 2, usp_granted: false }]);

    await save([2]);

    expect(prismaMock.tbl_user_permissions.deleteMany).toHaveBeenCalledWith({
      where: { use_id: 5, per_id: { in: [2] } },
    });
    expect(prismaMock.tbl_user_permissions.createMany).not.toHaveBeenCalled();
  });

  it("no guarda una excepción para lo que el perfil ya da, y borra la concesión que se volvió redundante", async () => {
    prismaMock.tbl_profile_permissions.findMany.mockResolvedValue([{ per_id: 4 }]);
    prismaMock.tbl_user_permissions.findMany.mockResolvedValue([{ per_id: 4, usp_granted: true }]);

    await save([4]);

    expect(prismaMock.tbl_user_permissions.deleteMany).toHaveBeenCalledWith({
      where: { use_id: 5, per_id: { in: [4] } },
    });
    expect(prismaMock.tbl_user_permissions.createMany).not.toHaveBeenCalled();
    expect(prismaMock.tbl_audit_log.createMany).not.toHaveBeenCalled();
  });

  it("solo lee y toca las excepciones de los permisos de las ventanas enviadas", async () => {
    await save([1]);

    expect(prismaMock.tbl_permissions.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { pag_id: { in: [10] } } })
    );
    expect(prismaMock.tbl_user_permissions.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { use_id: 5, per_id: { in: [1, 2, 3, 4, 5] } } })
    );
  });

  it("rechaza con 400 un permiso que no es de las ventanas enviadas", async () => {
    await expect(save([1, 99])).rejects.toMatchObject({ status: 400 });

    expect(prismaMock.tbl_user_permissions.createMany).not.toHaveBeenCalled();
  });

  it("rechaza con 400 si no se envían las ventanas", async () => {
    await expect(
      permissionsService.updateUserPermissions({ permissions: [1], useId: 5, actingUseId: 9 })
    ).rejects.toMatchObject({ status: 400 });
  });
});

describe("getUserPermissions — permiso efectivo y origen", () => {
  it("marca como no asignado lo que el perfil da y una excepción niega, e indica el origen", async () => {
    prismaMock.tbl_permissions.findMany.mockResolvedValue([
      { pag_id: 10, per_id: 1, per_name: "Ver" },
      { pag_id: 10, per_id: 2, per_name: "Crear" },
      { pag_id: 10, per_id: 3, per_name: "Eliminar" },
    ]);
    prismaMock.tbl_profile_permissions.findMany.mockResolvedValue([{ per_id: 1 }, { per_id: 2 }]);
    prismaMock.tbl_user_permissions.findMany.mockResolvedValue([
      { per_id: 2, usp_granted: false },
      { per_id: 3, usp_granted: true },
    ]);

    const result = await permissionsService.getUserPermissions({ pagIds: [10], useId: 5 });

    expect(result.map(({ perId, assigned, fromProfile }) => ({ perId, assigned, fromProfile }))).toEqual([
      { perId: 1, assigned: 1, fromProfile: true },
      { perId: 2, assigned: 0, fromProfile: true },
      { perId: 3, assigned: 1, fromProfile: false },
    ]);
  });
});
