import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

const prismaMock = {
  tbl_users: { findFirst: jest.fn(), findUnique: jest.fn(), update: jest.fn(), create: jest.fn() },
  tbl_user_pages: { findMany: jest.fn(), deleteMany: jest.fn(), createMany: jest.fn() },
  tbl_profiles: { findUnique: jest.fn() },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({
  prisma: prismaMock,
}));

jest.unstable_mockModule("../../../../src/common/utils/funciones.js", () => ({
  hashPassword: jest.fn().mockResolvedValue("hashed:pw"),
}));

const usersService = await import("../../../../src/modules/security/users/users.service.js");

const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);
const ctx = { useId: 9, ip: "1.1.1.1" };

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  prismaMock.tbl_users.findFirst.mockResolvedValue(null);
  prismaMock.tbl_user_pages.findMany.mockResolvedValue([]);
  prismaMock.tbl_profiles.findUnique.mockResolvedValue({ sta_id: 1 });
});

const baseUser = {
  use_name: "Ana",
  use_last_name: "Paz",
  use_identification: "1",
  use_user: "ana",
  use_email: "ana@a.com",
  use_password: "hash-viejo",
  pro_id: 2,
  sta_id: 1,
  use_access: 1,
  use_change_password: 0,
};

const editPayload = {
  useId: 5,
  proId: 2,
  name: "Ana",
  lastName: "Paz",
  identification: "1",
  username: "ana",
  email: "ana@a.com",
  access: 1,
  staId: 1,
  useBy: 9,
  changePassword: 0,
  usePages: "",
  ctx,
};

describe("deleteUser — columnas de eliminación y bitácora", () => {
  it("marca sta_id = 3 y guarda quién y cuándo en use_delete_by/_at, y lo registra en la bitácora", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue({ sta_id: 1 });

    await usersService.deleteUser({ useId: 5, updatedBy: 9, ctx });

    expect(prismaMock.tbl_users.update).toHaveBeenCalledWith({
      where: { use_id: 5 },
      data: { sta_id: 3, use_update_by: 9, use_delete_by: 9, use_delete_at: expect.any(Date) },
    });
    expect(auditRows()).toEqual([
      expect.objectContaining({ aud_operation: "ELIMINAR", aud_record_id: 5, use_id: 9, aud_old_value: "1", aud_new_value: "3" }),
    ]);
  });

  it("no vuelve a eliminar un usuario ya eliminado (no pisa la evidencia original)", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue({ sta_id: 3 });

    await expect(usersService.deleteUser({ useId: 5, updatedBy: 9, ctx })).rejects.toMatchObject({ status: 404 });
    expect(prismaMock.tbl_users.update).not.toHaveBeenCalled();
  });
});

describe("saveUser — bitácora", () => {
  it("al editar, audita solo los campos que cambiaron y oculta la contraseña", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue(baseUser);

    await usersService.saveUser({ ...editPayload, name: "Ana María", password: "nueva12345" });

    const rows = auditRows();
    expect(rows.map((r) => r.aud_field).sort()).toEqual(["use_name", "use_password"]);
    const pw = rows.find((r) => r.aud_field === "use_password");
    expect(pw).toMatchObject({ aud_old_value: "[oculto]", aud_new_value: "[oculto]" });
    expect(JSON.stringify(rows)).not.toMatch(/hash|nueva12345/);
    expect(rows.every((r) => r.aud_operation === "EDITAR" && r.use_id === 9)).toBe(true);
  });

  it("si no cambió nada, no escribe en la bitácora", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue(baseUser);

    await usersService.saveUser(editPayload);

    expect(prismaMock.tbl_audit_log.createMany).not.toHaveBeenCalled();
  });

  it("reactivar un usuario eliminado limpia use_delete_by/_at y se registra como REACTIVAR", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue({ ...baseUser, sta_id: 3 });

    await usersService.saveUser(editPayload);

    expect(prismaMock.tbl_users.update.mock.calls[0][0].data).toMatchObject({ use_delete_by: null, use_delete_at: null });
    expect(auditRows()).toEqual([expect.objectContaining({ aud_operation: "REACTIVAR", aud_field: "sta_id" })]);
  });

  it("al crear, registra CREAR con los valores iniciales (sin la contraseña)", async () => {
    prismaMock.tbl_users.create.mockResolvedValue({ use_id: 40 });

    await usersService.saveUser({ ...editPayload, useId: 0, password: "clave12345", usePages: "3,4" });

    const rows = auditRows();
    expect(rows.every((r) => r.aud_operation === "CREAR" && r.aud_record_id === 40)).toBe(true);
    expect(rows.find((r) => r.aud_field === "paginas").aud_new_value).toBe("3,4");
    expect(rows.find((r) => r.aud_field === "use_password").aud_new_value).toBe("[oculto]");
    expect(new Set(rows.map((r) => r.aud_operation_id)).size).toBe(1);
  });
});

describe("saveUser — protocolo de bloqueo (ADR-0027)", () => {
  const lockedTables = () =>
    prismaMock.$queryRaw.mock.calls.map(([strings, ...values]) => {
      const sql = strings.join("?") + values.map((v) => v?.strings?.join("") ?? "").join(" ");
      return /tbl_profiles/.test(sql) ? "PERFIL" : /tbl_users/.test(sql) ? "USUARIO" : "?";
    });

  it("al editar bloquea primero el perfil asignado y después el usuario, antes de leer nada", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue(baseUser);

    await usersService.saveUser({ ...editPayload, name: "Ana María" });

    expect(lockedTables()).toEqual(["PERFIL", "USUARIO"]);
    const firstLock = prismaMock.$queryRaw.mock.invocationCallOrder[0];
    expect(prismaMock.tbl_users.findUnique.mock.invocationCallOrder[0]).toBeGreaterThan(firstLock);
    expect(prismaMock.tbl_profiles.findUnique.mock.invocationCallOrder[0]).toBeGreaterThan(firstLock);
  });

  it("rechaza asignar un perfil eliminado (verificado con el perfil bloqueado) y no escribe nada", async () => {
    prismaMock.tbl_profiles.findUnique.mockResolvedValue({ sta_id: 3 });

    await expect(usersService.saveUser({ ...editPayload, useId: 0 })).rejects.toMatchObject({ status: 400 });
    expect(prismaMock.tbl_users.create).not.toHaveBeenCalled();
    expect(auditRows()).toEqual([]);
  });
});
