import { jest } from "@jest/globals";

process.env.JWT_SECRET = "test-secret";

const prismaMock = {
  tbl_users: { findFirst: jest.fn(), findUnique: jest.fn(), updateMany: jest.fn() },
  tbl_user_permissions: { findMany: jest.fn() },
  tbl_password_resets: { findFirst: jest.fn(), deleteMany: jest.fn(), create: jest.fn() },
  $transaction: jest.fn((ops) => Promise.all(ops)),
};

jest.unstable_mockModule("../../common/configs/prismaClient.js", () => ({
  prisma: prismaMock,
}));

const mockSendEmail = jest.fn().mockResolvedValue({ success: true });
jest.unstable_mockModule("../../common/services/mailerService.js", () => ({
  sendEmail: mockSendEmail,
}));

const mockHashPassword = jest.fn().mockResolvedValue("hashed:pw");
const mockComparePassword = jest.fn();
jest.unstable_mockModule("../../common/utils/funciones.js", () => ({
  hashPassword: mockHashPassword,
  comparePassword: mockComparePassword,
}));

const authService = await import("./auth.service.js");

beforeEach(() => {
  mockHashPassword.mockResolvedValue("hashed:pw");
});

describe("login", () => {
  it("lanza 400 si no se envía contraseña", async () => {
    await expect(authService.login({ usuario: "admin" })).rejects.toMatchObject({ statusCode: 400 });
  });

  it("lanza 403 si el usuario no existe", async () => {
    prismaMock.tbl_users.findFirst.mockResolvedValue(null);

    await expect(authService.login({ usuario: "nadie", password: "x" })).rejects.toMatchObject({
      statusCode: 403,
    });
  });

  it("lanza 403 si la contraseña no coincide", async () => {
    prismaMock.tbl_users.findFirst.mockResolvedValue({ use_id: 1, use_password: "hash" });
    mockComparePassword.mockResolvedValue(false);

    await expect(authService.login({ usuario: "admin", password: "mala" })).rejects.toMatchObject({
      statusCode: 403,
    });
  });

  it("devuelve token y datos del usuario con credenciales correctas", async () => {
    prismaMock.tbl_users.findFirst.mockResolvedValue({
      use_id: 1,
      use_user: "admin",
      use_password: "hash",
      use_name: "Admin",
      use_last_name: "Test",
      use_email: "a@a.com",
      pro_id: 1,
      tbl_profiles: { pro_name: "Superadmin" },
    });
    mockComparePassword.mockResolvedValue(true);
    prismaMock.tbl_user_permissions.findMany.mockResolvedValue([{ per_id: 5 }]);

    const result = await authService.login({ usuario: "admin", password: "buena" });

    expect(result.useId).toBe(1);
    expect(result.profileName).toBe("Superadmin");
    expect(result.permissions).toEqual([5]);
    expect(typeof result.token).toBe("string");
  });
});

describe("getBasicInformation", () => {
  it("devuelve undefined si el usuario no existe", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue(null);
    await expect(authService.getBasicInformation({ useId: 999 })).resolves.toBeUndefined();
  });

  it("remapea los campos a la forma esperada por el cliente", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue({
      use_name: "Admin",
      use_last_name: "Test",
      use_user: "admin",
      use_email: "a@a.com",
    });

    await expect(authService.getBasicInformation({ useId: 1 })).resolves.toEqual({
      name: "Admin",
      lastName: "Test",
      username: "admin",
      email: "a@a.com",
    });
  });
});

describe("updateAccount", () => {
  it("lanza 400 si no se actualizó ninguna fila (id inexistente)", async () => {
    prismaMock.tbl_users.updateMany.mockResolvedValue({ count: 0 });

    await expect(
      authService.updateAccount({ useId: 999, name: "x", lastName: "y", username: "z", email: "e@e.com" })
    ).rejects.toMatchObject({ statusCode: 400 });
  });

  it("resuelve sin error si la cuenta se actualizó", async () => {
    prismaMock.tbl_users.updateMany.mockResolvedValue({ count: 1 });

    await expect(
      authService.updateAccount({ useId: 1, name: "x", lastName: "y", username: "z", email: "e@e.com" })
    ).resolves.toBeUndefined();
  });
});

describe("updatePassword", () => {
  it("lanza 404 si el usuario no existe", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue(null);

    await expect(
      authService.updatePassword({ useId: 999, currentPassword: "x", newPassword: "nueva12345" })
    ).rejects.toMatchObject({ statusCode: 404 });
  });

  it("lanza 400 si la contraseña actual no coincide", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue({ use_password: "hash" });
    mockComparePassword.mockResolvedValue(false);

    await expect(
      authService.updatePassword({ useId: 1, currentPassword: "mala", newPassword: "nueva12345" })
    ).rejects.toMatchObject({ statusCode: 400 });
  });

  it("hashea y actualiza la contraseña si la actual es correcta", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue({ use_password: "hash" });
    mockComparePassword.mockResolvedValue(true);
    prismaMock.tbl_users.updateMany.mockResolvedValue({ count: 1 });

    await authService.updatePassword({ useId: 1, currentPassword: "buena", newPassword: "nueva12345" });

    expect(mockHashPassword).toHaveBeenCalledWith("nueva12345");
    expect(prismaMock.tbl_users.updateMany).toHaveBeenCalledWith({
      where: { use_id: 1 },
      data: { use_password: "hashed:pw" },
    });
  });
});

describe("forgotPassword — no debe permitir enumerar cuentas", () => {
  it("lanza 400 si no se envía correo", async () => {
    await expect(authService.forgotPassword({})).rejects.toMatchObject({ statusCode: 400 });
  });

  it("si el correo no existe: no lanza, no escribe en BD, no envía correo", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue(null);

    await expect(authService.forgotPassword({ email: "nadie@test.com" })).resolves.toBeUndefined();

    expect(prismaMock.tbl_password_resets.create).not.toHaveBeenCalled();
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it("si el correo existe: crea el reset y dispara el envío del correo", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue({ use_id: 1, use_name: "Admin" });

    await authService.forgotPassword({ email: "admin@test.com" });

    expect(prismaMock.tbl_password_resets.deleteMany).toHaveBeenCalledWith({ where: { use_id: 1 } });
    expect(prismaMock.tbl_password_resets.create).toHaveBeenCalled();
    // El envío es fire-and-forget (no se espera): alcanza con confirmar que se disparó.
    expect(mockSendEmail).toHaveBeenCalled();
  });

  it("tarda aproximadamente lo mismo exista o no la cuenta (piso de temporización)", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValueOnce(null);
    const t0 = Date.now();
    await authService.forgotPassword({ email: "nadie@test.com" });
    const elapsedMissing = Date.now() - t0;

    prismaMock.tbl_users.findUnique.mockResolvedValueOnce({ use_id: 1, use_name: "Admin" });
    const t1 = Date.now();
    await authService.forgotPassword({ email: "admin@test.com" });
    const elapsedFound = Date.now() - t1;

    // Piso real de 300ms (ver FORGOT_PASSWORD_MIN_MS en auth.service.js); se
    // usan timers reales a propósito, es justo lo que se quiere verificar.
    expect(elapsedMissing).toBeGreaterThanOrEqual(290);
    expect(elapsedFound).toBeGreaterThanOrEqual(290);
    expect(Math.abs(elapsedMissing - elapsedFound)).toBeLessThan(100);
  }, 10000);
});

describe("validateCodePassword / restorePassword", () => {
  it("validateCodePassword lanza 400 si el código no es válido o expiró", async () => {
    prismaMock.tbl_password_resets.findFirst.mockResolvedValue(null);

    await expect(
      authService.validateCodePassword({ email: "a@a.com", codeTemp: "000000" })
    ).rejects.toMatchObject({ statusCode: 400 });
  });

  it("validateCodePassword resuelve si el código es válido", async () => {
    prismaMock.tbl_password_resets.findFirst.mockResolvedValue({ use_id: 1 });

    await expect(
      authService.validateCodePassword({ email: "a@a.com", codeTemp: "123456" })
    ).resolves.toBeUndefined();
  });

  it("restorePassword lanza 400 si el código temporal es inválido", async () => {
    prismaMock.tbl_password_resets.findFirst.mockResolvedValue(null);

    await expect(
      authService.restorePassword({ email: "a@a.com", codeTemp: "000000", nuevaContrasena: "nueva12345" })
    ).rejects.toMatchObject({ statusCode: 400 });
  });

  it("restorePassword actualiza la contraseña y borra el reset si el código es válido", async () => {
    prismaMock.tbl_password_resets.findFirst.mockResolvedValue({ use_id: 1 });
    prismaMock.tbl_users.updateMany.mockResolvedValue({ count: 1 });
    prismaMock.tbl_password_resets.deleteMany.mockResolvedValue({ count: 1 });

    await authService.restorePassword({ email: "a@a.com", codeTemp: "123456", nuevaContrasena: "nueva12345" });

    expect(mockHashPassword).toHaveBeenCalledWith("nueva12345");
    expect(prismaMock.$transaction).toHaveBeenCalled();
  });
});
