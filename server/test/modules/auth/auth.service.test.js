import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../helpers/transaction.mock.js";

process.env.JWT_SECRET = "test-secret";

// $transaction admite las dos formas que usa el código: lote (arreglo) o
// interactiva (callback que recibe el `tx`: una copia del mock, con los mismos
// métodos pero distinto objeto, como el tx real; writeAudit rechaza `prisma`).
const runTransaction = (arg) => (typeof arg === "function" ? arg({ ...prismaMock }) : Promise.all(arg));

const prismaMock = {
  tbl_users: { findFirst: jest.fn(), findUnique: jest.fn(), updateMany: jest.fn(), update: jest.fn() },
  tbl_audit_log: { createMany: jest.fn() },
  tbl_user_permissions: { findMany: jest.fn() },
  tbl_profile_permissions: { findMany: jest.fn() },
  tbl_password_resets: {
    findFirst: jest.fn(),
    deleteMany: jest.fn(),
    upsert: jest.fn(),
    updateMany: jest.fn(),
  },
  tbl_login_attempts: {
    findUnique: jest.fn(),
    upsert: jest.fn(),
    update: jest.fn(),
    deleteMany: jest.fn(),
  },
  ...transactionRawMocks(),
  $transaction: jest.fn(runTransaction),
};

const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);

jest.unstable_mockModule("../../../src/common/configs/prismaClient.js", () => ({
  prisma: prismaMock,
}));

const mockSendEmail = jest.fn().mockResolvedValue({ success: true });
jest.unstable_mockModule("../../../src/common/services/mailerService.js", () => ({
  sendEmail: mockSendEmail,
}));

const mockHashPassword = jest.fn().mockResolvedValue("hashed:pw");
const mockComparePassword = jest.fn();
jest.unstable_mockModule("../../../src/common/utils/funciones.js", () => ({
  hashPassword: mockHashPassword,
  comparePassword: mockComparePassword,
}));

const mockRevokeSession = jest.fn();
jest.unstable_mockModule("../../../src/common/services/session.service.js", () => ({
  revokeSession: mockRevokeSession,
}));

const authService = await import("../../../src/modules/auth/auth.service.js");
const { hashResetCode } = await import("../../../src/common/utils/resetCode.utils.js");

beforeEach(() => {
  jest.clearAllMocks();
  mockHashPassword.mockResolvedValue("hashed:pw");
  prismaMock.$transaction.mockImplementation(runTransaction);
  prismaMock.tbl_login_attempts.findUnique.mockResolvedValue(null);
  prismaMock.tbl_login_attempts.upsert.mockResolvedValue({ lat_failed_count: 1 });
});

const activeUser = {
  use_id: 1,
  use_user: "admin",
  use_password: "hash",
  use_name: "Admin",
  use_last_name: "Test",
  use_email: "a@a.com",
  pro_id: 1,
  tbl_profiles: { pro_name: "Superadmin" },
};

describe("login", () => {
  it("lanza 400 si no se envía contraseña", async () => {
    await expect(authService.login({ usuario: "admin" })).rejects.toMatchObject({ statusCode: 400 });
  });

  it("lanza 403 si el usuario no existe, comparando igual contra un hash de relleno (misma duración)", async () => {
    prismaMock.tbl_users.findFirst.mockResolvedValue(null);
    mockComparePassword.mockResolvedValue(false);

    await expect(authService.login({ usuario: "nadie", password: "x" })).rejects.toMatchObject({
      statusCode: 403,
    });
    expect(mockComparePassword).toHaveBeenCalledTimes(1);
    expect(prismaMock.tbl_login_attempts.upsert).not.toHaveBeenCalled();
    // Se registra el intento, anónimo y sin el identificador tecleado.
    const [row] = auditRows();
    expect(row).toMatchObject({ aud_operation: "LOGIN_FALLIDO", aud_record_id: null, use_id: null });
    expect(JSON.stringify(auditRows())).not.toContain("nadie");
  });

  it("lanza 403 y registra el intento fallido si la contraseña no coincide", async () => {
    prismaMock.tbl_users.findFirst.mockResolvedValue(activeUser);
    mockComparePassword.mockResolvedValue(false);

    await expect(authService.login({ usuario: "admin", password: "mala" })).rejects.toMatchObject({
      statusCode: 403,
    });
    expect(prismaMock.tbl_login_attempts.upsert).toHaveBeenCalledWith(
      expect.objectContaining({ where: { use_id: 1 } })
    );
  });

  it("al 5.º fallo consecutivo bloquea la cuenta", async () => {
    prismaMock.tbl_users.findFirst.mockResolvedValue(activeUser);
    mockComparePassword.mockResolvedValue(false);
    prismaMock.tbl_login_attempts.upsert.mockResolvedValue({ lat_failed_count: 5 });

    await expect(authService.login({ usuario: "admin", password: "mala" })).rejects.toMatchObject({
      statusCode: 403,
    });
    expect(prismaMock.tbl_login_attempts.update).toHaveBeenCalledWith({
      where: { use_id: 1 },
      data: { lat_locked_until: expect.any(Date) },
    });
    // Fallo y bloqueo quedan como una sola operación en la bitácora.
    const rows = auditRows();
    expect(rows.map((r) => r.aud_operation)).toEqual(["LOGIN_FALLIDO", "CUENTA_BLOQUEADA"]);
    expect(new Set(rows.map((r) => r.aud_operation_id)).size).toBe(1);
    expect(JSON.stringify(rows)).not.toContain("mala");
  });

  it("con la cuenta bloqueada rechaza incluso la contraseña correcta, sin compararla", async () => {
    prismaMock.tbl_users.findFirst.mockResolvedValue(activeUser);
    prismaMock.tbl_login_attempts.findUnique.mockResolvedValue({
      lat_locked_until: new Date(Date.now() + 60_000),
    });
    mockComparePassword.mockResolvedValue(true);

    await expect(authService.login({ usuario: "admin", password: "buena" })).rejects.toMatchObject({
      statusCode: 403,
    });
    expect(mockComparePassword).not.toHaveBeenCalled();
  });

  it("devuelve los datos de sesión y del usuario con credenciales correctas, y reinicia el contador", async () => {
    prismaMock.tbl_users.findFirst.mockResolvedValue(activeUser);
    prismaMock.tbl_login_attempts.findUnique.mockResolvedValue({ lat_locked_until: null });
    mockComparePassword.mockResolvedValue(true);
    prismaMock.tbl_profile_permissions.findMany.mockResolvedValue([{ per_id: 5 }]);
    prismaMock.tbl_user_permissions.findMany.mockResolvedValue([{ per_id: 9 }]);

    const result = await authService.login({ usuario: "admin", password: "buena" });

    expect(result.useId).toBe(1);
    expect(result.profileName).toBe("Superadmin");
    // Unión de perfil (5) + excepción individual (9), sin duplicados.
    expect(result.permissions).toEqual([5, 9]);
    expect(result.sessionUser).toEqual({ useId: 1, name: "Admin", email: "a@a.com", proId: 1 });
    // El token ya no viaja en el resultado: lo emite el controller en cookie.
    expect(result.token).toBeUndefined();
    expect(prismaMock.tbl_login_attempts.deleteMany).toHaveBeenCalledWith({ where: { use_id: 1 } });
  });

  it("no duplica un permiso otorgado tanto por el perfil como individualmente", async () => {
    prismaMock.tbl_users.findFirst.mockResolvedValue(activeUser);
    mockComparePassword.mockResolvedValue(true);
    prismaMock.tbl_profile_permissions.findMany.mockResolvedValue([{ per_id: 5 }]);
    prismaMock.tbl_user_permissions.findMany.mockResolvedValue([{ per_id: 5 }]);

    const result = await authService.login({ usuario: "admin", password: "buena" });

    expect(result.permissions).toEqual([5]);
  });
});

describe("lockDurationFor — bloqueo progresivo", () => {
  it("no bloquea antes del 5.º fallo ni entre múltiplos de 5", () => {
    expect(authService.lockDurationFor(4)).toBe(0);
    expect(authService.lockDurationFor(6)).toBe(0);
  });

  it("duplica la duración en cada bloqueo: 15m, 30m, 1h, con tope de 24h", () => {
    const min = 60 * 1000;
    expect(authService.lockDurationFor(5)).toBe(15 * min);
    expect(authService.lockDurationFor(10)).toBe(30 * min);
    expect(authService.lockDurationFor(15)).toBe(60 * min);
    expect(authService.lockDurationFor(100)).toBe(24 * 60 * min);
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
  it("lanza 400 si el usuario no existe", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue(null);

    await expect(
      authService.updateAccount({ useId: 999, name: "x", lastName: "y", username: "z", email: "e@e.com" })
    ).rejects.toMatchObject({ statusCode: 400 });
  });

  it("registra al propio usuario como autor, audita solo los campos que cambiaron y devuelve los datos nuevos", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue({
      use_id: 1,
      use_name: "viejo",
      use_last_name: "y",
      use_user: "z",
      use_email: "e@e.com",
      pro_id: 2,
    });

    await expect(
      authService.updateAccount({ useId: 1, name: "nuevo", lastName: "y", username: "z", email: "e@e.com" })
    ).resolves.toEqual({ useId: 1, name: "nuevo", email: "e@e.com", proId: 2 });

    expect(prismaMock.tbl_users.update).toHaveBeenCalledWith({
      where: { use_id: 1 },
      data: expect.objectContaining({ use_update_by: 1 }),
    });
    expect(auditRows()).toEqual([
      expect.objectContaining({
        aud_operation: "EDITAR",
        aud_field: "use_name",
        aud_old_value: "viejo",
        aud_new_value: "nuevo",
        use_id: 1,
      }),
    ]);
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
    prismaMock.tbl_users.findUnique.mockResolvedValue({
      use_id: 1,
      use_name: "Admin",
      use_email: "a@a.com",
      pro_id: 1,
      use_password: "hash",
    });
    mockComparePassword.mockResolvedValue(true);
    prismaMock.tbl_users.updateMany.mockResolvedValue({ count: 1 });

    const user = await authService.updatePassword({ useId: 1, currentPassword: "buena", newPassword: "nueva12345" });

    expect(mockHashPassword).toHaveBeenCalledWith("nueva12345");
    expect(prismaMock.tbl_users.updateMany).toHaveBeenCalledWith({
      where: { use_id: 1, use_password: "hash" },
      data: { use_password: "hashed:pw", use_update_by: 1 },
    });
    expect(user).toEqual({ useId: 1, name: "Admin", email: "a@a.com", proId: 1 });
    // Queda constancia del cambio, nunca del valor ni del hash.
    const rows = auditRows();
    expect(rows).toEqual([expect.objectContaining({ aud_operation: "CONTRASENA_CAMBIADA", aud_new_value: "[oculto]" })]);
    expect(JSON.stringify(rows)).not.toMatch(/hashed:pw|nueva12345|buena/);
  });
});

describe("forgotPassword — no debe permitir enumerar cuentas", () => {
  it("lanza 400 si no se envía correo", async () => {
    await expect(authService.forgotPassword({})).rejects.toMatchObject({ statusCode: 400 });
  });

  it("si el correo no existe: no lanza, no escribe en BD, no envía correo", async () => {
    prismaMock.tbl_users.findFirst.mockResolvedValue(null);

    await expect(authService.forgotPassword({ email: "nadie@test.com" })).resolves.toBeUndefined();

    expect(prismaMock.tbl_password_resets.upsert).not.toHaveBeenCalled();
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it("si el correo existe: guarda SOLO el hash del código (un único código vigente) y envía el correo", async () => {
    prismaMock.tbl_users.findFirst.mockResolvedValue({ use_id: 1, use_name: "Admin" });

    await authService.forgotPassword({ email: "admin@test.com" });

    expect(prismaMock.tbl_password_resets.upsert).toHaveBeenCalledTimes(1);
    const { where, create, update } = prismaMock.tbl_password_resets.upsert.mock.calls[0][0];
    expect(where).toEqual({ use_id: 1 });
    expect(update.par_attempts).toBe(0);
    // La vigencia se reinicia con cada código nuevo, también en el update.
    expect(update.par_create_at).toBeInstanceOf(Date);
    expect(create.par_create_by).toBeUndefined();
    expect(create.par_code_hash).toMatch(/^[0-9a-f]{64}$/);

    // El código enviado por correo no aparece en claro en lo que se guarda,
    // y su hash es exactamente el que quedó en BD.
    const html = mockSendEmail.mock.calls[0][0].html;
    const code = html.match(/>(\d{6})</)[1];
    expect(JSON.stringify(create)).not.toContain(code);
    expect(create.par_code_hash).toBe(hashResetCode({ code, useId: 1 }));

    // La solicitud queda en la bitácora, sin el código.
    const rows = auditRows();
    expect(rows).toEqual([expect.objectContaining({ aud_operation: "RECUPERACION_SOLICITADA", aud_record_id: 1 })]);
    expect(JSON.stringify(rows)).not.toContain(code);
  });

  it("tarda aproximadamente lo mismo exista o no la cuenta (piso de temporización)", async () => {
    prismaMock.tbl_users.findFirst.mockResolvedValueOnce(null);
    const t0 = Date.now();
    await authService.forgotPassword({ email: "nadie@test.com" });
    const elapsedMissing = Date.now() - t0;

    prismaMock.tbl_users.findFirst.mockResolvedValueOnce({ use_id: 1, use_name: "Admin" });
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
  const storedReset = (code = "123456") => ({
    par_id: 7,
    use_id: 1,
    par_code_hash: hashResetCode({ code, useId: 1 }),
  });

  it("validateCodePassword lanza 400 si no hay código vigente", async () => {
    prismaMock.tbl_password_resets.findFirst.mockResolvedValue(null);

    await expect(
      authService.validateCodePassword({ email: "a@a.com", codeTemp: "000000" })
    ).rejects.toMatchObject({ statusCode: 400 });
  });

  it("validateCodePassword lanza 400 y consume un intento si el código no coincide", async () => {
    prismaMock.tbl_password_resets.findFirst.mockResolvedValue(storedReset("123456"));
    prismaMock.tbl_password_resets.updateMany.mockResolvedValue({ count: 1 });

    await expect(
      authService.validateCodePassword({ email: "a@a.com", codeTemp: "654321" })
    ).rejects.toMatchObject({ statusCode: 400 });
    expect(prismaMock.tbl_password_resets.updateMany).toHaveBeenCalledWith({
      where: { par_id: 7, par_attempts: { lt: authService.RESET_CODE_MAX_ATTEMPTS } },
      data: { par_attempts: { increment: 1 } },
    });
    expect(auditRows()).toEqual([
      expect.objectContaining({ aud_operation: "CODIGO_RECUPERACION_FALLIDO", aud_record_id: 1 }),
    ]);
  });

  it("agotados los intentos, invalida el código aunque sea el correcto", async () => {
    prismaMock.tbl_password_resets.findFirst.mockResolvedValue(storedReset("123456"));
    prismaMock.tbl_password_resets.updateMany.mockResolvedValue({ count: 0 });

    await expect(
      authService.validateCodePassword({ email: "a@a.com", codeTemp: "123456" })
    ).rejects.toMatchObject({ statusCode: 400 });
    expect(prismaMock.tbl_password_resets.deleteMany).toHaveBeenCalledWith({ where: { par_id: 7 } });
  });

  it("validateCodePassword resuelve si el código es válido", async () => {
    prismaMock.tbl_password_resets.findFirst.mockResolvedValue(storedReset("123456"));
    prismaMock.tbl_password_resets.updateMany.mockResolvedValue({ count: 1 });

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

  it("restorePassword cambia la contraseña, borra el reset y el bloqueo, y revoca la sesión", async () => {
    prismaMock.tbl_password_resets.findFirst.mockResolvedValue(storedReset("123456"));
    prismaMock.tbl_password_resets.updateMany.mockResolvedValue({ count: 1 });
    prismaMock.tbl_users.updateMany.mockResolvedValue({ count: 1 });
    prismaMock.tbl_password_resets.deleteMany.mockResolvedValue({ count: 1 });
    prismaMock.tbl_login_attempts.deleteMany.mockResolvedValue({ count: 1 });

    await authService.restorePassword({ email: "a@a.com", codeTemp: "123456", nuevaContrasena: "nueva12345" });

    expect(mockHashPassword).toHaveBeenCalledWith("nueva12345");
    expect(prismaMock.$transaction).toHaveBeenCalled();
    expect(prismaMock.tbl_login_attempts.deleteMany).toHaveBeenCalledWith({ where: { use_id: 1 } });
    // La sesión que cae queda en la bitácora, con el motivo.
    expect(mockRevokeSession).toHaveBeenCalledWith({
      useId: 1,
      audit: { operation: "SESION_REVOCADA", ctx: { useId: 1, ip: undefined }, reason: "contraseña restaurada" },
    });
    expect(auditRows()).toEqual([
      expect.objectContaining({ aud_operation: "CONTRASENA_RESTAURADA", use_id: 1, aud_new_value: "[oculto]" }),
    ]);
  });
});
