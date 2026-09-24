import { jest } from "@jest/globals";
import crypto from "crypto";

process.env.JWT_SECRET = "test-secret";

const prismaMock = {
  tbl_sessions: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    upsert: jest.fn(),
    updateMany: jest.fn(),
    deleteMany: jest.fn(),
  },
  tbl_audit_log: { createMany: jest.fn() },
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../src/common/configs/prismaClient.js", () => ({
  prisma: prismaMock,
}));

const mockDisconnectSockets = jest.fn();
const mockIn = jest.fn(() => ({ disconnectSockets: mockDisconnectSockets }));
jest.unstable_mockModule("../../../src/common/configs/socket.manager.js", () => ({
  getIO: () => ({ in: mockIn }),
}));

const sessionService = await import("../../../src/common/services/session.service.js");
const { default: jwt } = await import("jsonwebtoken");

const sha256 = (v) => crypto.createHash("sha256").update(v).digest("hex");
const user = { useId: 1, name: "Admin", email: "a@a.com", proId: 1 };
const dbUser = { use_id: 1, use_name: "Admin", use_email: "a@a.com", pro_id: 1, sta_id: 1 };
const inAWeek = () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
});

const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);

describe("createSession — sesión única", () => {
  it("guarda solo el hash del refresh token y firma el access token con sid", async () => {
    prismaMock.tbl_sessions.findUnique.mockResolvedValue(null);

    const { accessToken, refreshToken, sessionKey } = await sessionService.createSession({ user, ip: "1.1.1.1" });

    const { create } = prismaMock.tbl_sessions.upsert.mock.calls[0][0];
    expect(create.ses_refresh_hash).toBe(sha256(refreshToken));
    expect(JSON.stringify(create)).not.toContain(refreshToken);
    expect(jwt.verify(accessToken, process.env.JWT_SECRET)).toMatchObject({ useId: 1, sid: sessionKey });
  });

  it("reemplaza la sesión anterior (upsert por use_id) y desconecta sus sockets", async () => {
    prismaMock.tbl_sessions.findUnique.mockResolvedValue({ ses_key: "sesion-vieja" });

    const { sessionKey } = await sessionService.createSession({ user });

    const call = prismaMock.tbl_sessions.upsert.mock.calls[0][0];
    expect(call.where).toEqual({ use_id: 1 });
    expect(call.update.ses_key).toBe(sessionKey);
    expect(sessionKey).not.toBe("sesion-vieja");
    expect(mockIn).toHaveBeenCalledWith("session:sesion-vieja");
    expect(mockDisconnectSockets).toHaveBeenCalledWith(true);
  });

  it("con auditOperation registra el LOGIN en la bitácora, y si reemplazó otra sesión lo deja constar", async () => {
    prismaMock.tbl_sessions.findUnique.mockResolvedValue({ ses_key: "sesion-vieja" });

    await sessionService.createSession({ user, ip: "1.1.1.1", auditOperation: "LOGIN" });

    const [row] = auditRows();
    expect(row).toMatchObject({
      aud_operation: "LOGIN",
      aud_entity: "USUARIO",
      aud_record_id: 1,
      use_id: 1,
      aud_ip: "1.1.1.1",
      aud_field: "sesion_anterior",
    });
  });

  it("sin auditOperation no escribe en la bitácora", async () => {
    prismaMock.tbl_sessions.findUnique.mockResolvedValue(null);
    await sessionService.createSession({ user });
    expect(prismaMock.tbl_audit_log.createMany).not.toHaveBeenCalled();
  });

  it("el access token dura 15 minutos por defecto", async () => {
    prismaMock.tbl_sessions.findUnique.mockResolvedValue(null);
    const { accessToken } = await sessionService.createSession({ user });
    const { iat, exp } = jwt.decode(accessToken);
    expect(exp - iat).toBe(15 * 60);
  });
});

describe("refreshSession — rotación", () => {
  it("rechaza con 401 si no hay refresh token", async () => {
    await expect(sessionService.refreshSession({})).rejects.toMatchObject({ statusCode: 401 });
  });

  it("rota el refresh token y emite un access token nuevo de la misma sesión", async () => {
    prismaMock.tbl_sessions.findUnique.mockResolvedValue({
      ses_id: 3,
      ses_key: "sesion-1",
      ses_expires_at: inAWeek(),
      tbl_users: dbUser,
    });
    prismaMock.tbl_sessions.updateMany.mockResolvedValue({ count: 1 });

    const { accessToken, refreshToken } = await sessionService.refreshSession({ refreshToken: "viejo" });

    expect(refreshToken).toBeTruthy();
    expect(refreshToken).not.toBe("viejo");
    const { where, data } = prismaMock.tbl_sessions.updateMany.mock.calls[0][0];
    expect(where).toEqual({ ses_id: 3, ses_refresh_hash: sha256("viejo") });
    expect(data.ses_refresh_hash).toBe(sha256(refreshToken));
    expect(data.ses_prev_refresh_hash).toBe(sha256("viejo"));
    expect(jwt.verify(accessToken, process.env.JWT_SECRET)).toMatchObject({ useId: 1, sid: "sesion-1" });
  });

  it("revoca y rechaza si la sesión venció o el usuario ya no está activo", async () => {
    prismaMock.tbl_sessions.findUnique
      .mockResolvedValueOnce({
        ses_id: 3,
        ses_key: "sesion-1",
        ses_expires_at: inAWeek(),
        tbl_users: { ...dbUser, sta_id: 2 },
      })
      .mockResolvedValueOnce({ ses_key: "sesion-1" });

    await expect(sessionService.refreshSession({ refreshToken: "x" })).rejects.toMatchObject({ statusCode: 401 });
    expect(prismaMock.tbl_sessions.deleteMany).toHaveBeenCalledWith({ where: { use_id: 1 } });
  });

  it("token ya rotado dentro de la ventana de gracia: access token nuevo sin rotar (pestañas concurrentes)", async () => {
    prismaMock.tbl_sessions.findUnique.mockResolvedValue(null);
    prismaMock.tbl_sessions.findFirst.mockResolvedValue({
      ses_id: 3,
      ses_key: "sesion-1",
      ses_rotated_at: new Date(Date.now() - 5_000),
      ses_expires_at: inAWeek(),
      tbl_users: dbUser,
    });

    const result = await sessionService.refreshSession({ refreshToken: "recien-rotado" });

    expect(result.refreshToken).toBeNull();
    expect(typeof result.accessToken).toBe("string");
    expect(prismaMock.tbl_sessions.updateMany).not.toHaveBeenCalled();
    expect(prismaMock.tbl_sessions.deleteMany).not.toHaveBeenCalled();
  });

  it("token ya rotado fuera de la ventana: se trata como robo y revoca la sesión", async () => {
    prismaMock.tbl_sessions.findUnique
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ ses_key: "sesion-1" });
    prismaMock.tbl_sessions.findFirst.mockResolvedValue({
      ses_id: 3,
      ses_key: "sesion-1",
      ses_rotated_at: new Date(Date.now() - 10 * 60_000),
      ses_expires_at: inAWeek(),
      tbl_users: dbUser,
    });

    await expect(sessionService.refreshSession({ refreshToken: "robado" })).rejects.toMatchObject({ statusCode: 401 });
    expect(prismaMock.tbl_sessions.deleteMany).toHaveBeenCalledWith({ where: { use_id: 1 } });
    expect(auditRows()).toEqual([
      expect.objectContaining({ aud_operation: "SESION_REVOCADA", aud_record_id: 1, aud_field: "motivo" }),
    ]);
  });

  it("token desconocido: 401 sin tocar nada", async () => {
    prismaMock.tbl_sessions.findUnique.mockResolvedValue(null);
    prismaMock.tbl_sessions.findFirst.mockResolvedValue(null);

    await expect(sessionService.refreshSession({ refreshToken: "inventado" })).rejects.toMatchObject({ statusCode: 401 });
    expect(prismaMock.tbl_sessions.deleteMany).not.toHaveBeenCalled();
  });
});

describe("parseDuration — formato de JWT_REFRESH_EXPIRES_IN", () => {
  it("interpreta s, m, h y d, y un número solo como segundos", () => {
    expect(sessionService.parseDuration("30s")).toBe(30 * 1000);
    expect(sessionService.parseDuration("15m")).toBe(15 * 60 * 1000);
    expect(sessionService.parseDuration("12h")).toBe(12 * 60 * 60 * 1000);
    expect(sessionService.parseDuration("7d")).toBe(7 * 24 * 60 * 60 * 1000);
    expect(sessionService.parseDuration("3600")).toBe(3600 * 1000);
  });

  it("lanza con un valor inválido en vez de dejar una vida de sesión inesperada", () => {
    expect(() => sessionService.parseDuration("1 semana")).toThrow(/JWT_REFRESH_EXPIRES_IN/);
    expect(() => sessionService.parseDuration("0d")).toThrow();
    expect(() => sessionService.parseDuration("")).toThrow();
  });
});

describe("revocación", () => {
  it("revokeSession borra la sesión y desconecta sus sockets", async () => {
    prismaMock.tbl_sessions.findUnique.mockResolvedValue({ ses_key: "sesion-1" });

    await sessionService.revokeSession({ useId: 1 });

    expect(prismaMock.tbl_sessions.deleteMany).toHaveBeenCalledWith({ where: { use_id: 1 } });
    expect(mockIn).toHaveBeenCalledWith("session:sesion-1");
  });

  it("revokeSessionByKey no cierra la sesión vigente con un token de una sesión anterior", async () => {
    prismaMock.tbl_sessions.findFirst.mockResolvedValue(null);

    await sessionService.revokeSessionByKey({ useId: 1, sessionKey: "sesion-vieja" });

    expect(prismaMock.tbl_sessions.deleteMany).not.toHaveBeenCalled();
  });

  it("revokeSessionByRefreshToken busca la sesión por el hash del token", async () => {
    prismaMock.tbl_sessions.findUnique
      .mockResolvedValueOnce({ use_id: 1 })
      .mockResolvedValueOnce({ ses_key: "sesion-1" });

    await sessionService.revokeSessionByRefreshToken({
      refreshToken: "r1",
      audit: { operation: "LOGOUT", ctx: { ip: "1.1.1.1" } },
    });

    expect(prismaMock.tbl_sessions.findUnique.mock.calls[0][0].where).toEqual({ ses_refresh_hash: sha256("r1") });
    expect(prismaMock.tbl_sessions.deleteMany).toHaveBeenCalledWith({ where: { use_id: 1 } });
    // El actor del logout es el dueño de la sesión, no un valor del cliente.
    expect(auditRows()).toEqual([
      expect.objectContaining({ aud_operation: "LOGOUT", use_id: 1, aud_record_id: 1, aud_ip: "1.1.1.1" }),
    ]);
  });
});
