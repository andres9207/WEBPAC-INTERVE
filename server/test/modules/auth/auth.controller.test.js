import { jest } from "@jest/globals";

// Regresión directa del fix de IDOR: get_basic_information / update_account /
// update_password deben tomar el sujeto de req.user (JWT verificado), nunca
// de req.query/req.body. Si alguien vuelve a leer useId de la petición, estos
// tests fallan de inmediato.

process.env.JWT_SECRET = "test-secret";

const mockLogin = jest.fn();
const mockGetBasicInformation = jest.fn();
const mockUpdateAccount = jest.fn();
const mockUpdatePassword = jest.fn();

jest.unstable_mockModule("../../../src/modules/auth/auth.service.js", () => ({
  login: mockLogin,
  getBasicInformation: mockGetBasicInformation,
  updateAccount: mockUpdateAccount,
  updatePassword: mockUpdatePassword,
}));

const sessionMock = {
  ACCESS_COOKIE_NAME: "token",
  REFRESH_COOKIE_NAME: "refresh_token",
  createSession: jest.fn(),
  refreshSession: jest.fn(),
  revokeSessionByRefreshToken: jest.fn(),
  revokeSessionByKey: jest.fn(),
  signAccessToken: jest.fn(() => "access.reemitido"),
  setSessionCookies: jest.fn(),
  clearSessionCookies: jest.fn(),
};

jest.unstable_mockModule("../../../src/common/services/session.service.js", () => sessionMock);

const {
  loginController,
  refreshController,
  logoutController,
  getSettlementController,
  updateAccountController,
  updatePasswordController,
} = await import("../../../src/modules/auth/auth.controller.js");
const { default: jwt } = await import("jsonwebtoken");

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("auth.controller — el sujeto siempre sale de req.user", () => {
  it("getSettlementController usa req.user.useId, ignora useId del query string", async () => {
    mockGetBasicInformation.mockResolvedValue({ name: "Real" });
    const req = { user: { useId: 1 }, query: { useId: 999 } };
    const res = buildRes();

    await getSettlementController(req, res, jest.fn());

    expect(mockGetBasicInformation).toHaveBeenCalledWith({ useId: 1 });
  });

  it("updateAccountController usa req.user.useId, ignora useId del body, y reemite el token en la misma sesión", async () => {
    mockUpdateAccount.mockResolvedValue({ useId: 1, name: "a", email: "d@d.com", proId: 2 });
    const req = {
      user: { useId: 1, sid: "sesion-1" },
      body: { name: "a", lastName: "b", username: "c", email: "d@d.com", useId: 999 },
    };
    const res = buildRes();

    await updateAccountController(req, res, jest.fn());

    expect(mockUpdateAccount).toHaveBeenCalledWith({
      name: "a",
      lastName: "b",
      username: "c",
      email: "d@d.com",
      useId: 1,
      ctx: { useId: 1, ip: null },
    });
    expect(sessionMock.signAccessToken).toHaveBeenCalledWith(
      expect.objectContaining({ email: "d@d.com", sessionKey: "sesion-1" })
    );
    expect(sessionMock.setSessionCookies).toHaveBeenCalledWith(res, { accessToken: "access.reemitido" });
  });

  it("updatePasswordController usa req.user.useId, ignora useId del body, y rota la sesión", async () => {
    const user = { useId: 1, name: "a", email: "d@d.com", proId: 2 };
    mockUpdatePassword.mockResolvedValue(user);
    sessionMock.createSession.mockResolvedValue({ accessToken: "a", refreshToken: "r" });
    const req = {
      user: { useId: 1 },
      body: { currentPassword: "x", newPassword: "y", useId: 999 },
      ip: "1.2.3.4",
      get: () => "jest",
    };
    const res = buildRes();

    await updatePasswordController(req, res, jest.fn());

    expect(mockUpdatePassword).toHaveBeenCalledWith({
      currentPassword: "x",
      newPassword: "y",
      useId: 1,
      ctx: { useId: 1, ip: "1.2.3.4" },
    });
    expect(sessionMock.createSession).toHaveBeenCalledWith({ user, ip: "1.2.3.4", userAgent: "jest" });
    expect(sessionMock.setSessionCookies).toHaveBeenCalledWith(res, { accessToken: "a", refreshToken: "r" });
  });

  it("delega al next(err) si el service lanza, sin responder el error directamente", async () => {
    const error = new Error("boom");
    mockUpdateAccount.mockRejectedValue(error);
    const req = { user: { useId: 1 }, body: { name: "a", lastName: "b", username: "c", email: "d@d.com" } };
    const res = buildRes();
    const next = jest.fn();

    await updateAccountController(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
  });
});

describe("auth.controller — sesión", () => {
  it("loginController abre la sesión y no devuelve ningún token en el body", async () => {
    mockLogin.mockResolvedValue({
      sessionUser: { useId: 1, name: "A", email: "a@a.com", proId: 1 },
      useId: 1,
      permissions: [5],
    });
    sessionMock.createSession.mockResolvedValue({ accessToken: "a", refreshToken: "r" });
    const req = { body: { usuario: "admin", password: "x" }, ip: "1.2.3.4", get: () => "jest" };
    const res = buildRes();

    await loginController(req, res, jest.fn());

    expect(sessionMock.setSessionCookies).toHaveBeenCalledWith(res, { accessToken: "a", refreshToken: "r" });
    expect(sessionMock.createSession).toHaveBeenCalledWith(expect.objectContaining({ auditOperation: "LOGIN" }));
    const body = res.json.mock.calls[0][0];
    expect(body).toEqual({ useId: 1, permissions: [5] });
    expect(JSON.stringify(body)).not.toMatch(/"a"|"r"|token/i);
  });

  it("refreshController renueva con la cookie refresh_token", async () => {
    sessionMock.refreshSession.mockResolvedValue({ accessToken: "a2", refreshToken: "r2" });
    const req = { cookies: { refresh_token: "r1" } };
    const res = buildRes();

    await refreshController(req, res, jest.fn());

    expect(sessionMock.refreshSession).toHaveBeenCalledWith({ refreshToken: "r1" });
    expect(sessionMock.setSessionCookies).toHaveBeenCalledWith(res, { accessToken: "a2", refreshToken: "r2" });
  });

  it("refreshController limpia las cookies si el refresh es inválido (401)", async () => {
    const error = Object.assign(new Error("Sesión inválida o expirada."), { statusCode: 401 });
    sessionMock.refreshSession.mockRejectedValue(error);
    const res = buildRes();
    const next = jest.fn();

    await refreshController({ cookies: {} }, res, next);

    expect(sessionMock.clearSessionCookies).toHaveBeenCalledWith(res);
    expect(next).toHaveBeenCalledWith(error);
  });

  it("logoutController revoca la sesión del refresh token y limpia cookies", async () => {
    const res = buildRes();

    await logoutController({ cookies: { refresh_token: "r1", token: "t" } }, res, jest.fn());

    expect(sessionMock.revokeSessionByRefreshToken).toHaveBeenCalledWith({
      refreshToken: "r1",
      audit: { operation: "LOGOUT", ctx: { ip: null } },
    });
    expect(sessionMock.clearSessionCookies).toHaveBeenCalledWith(res);
  });

  it("logoutController sin refresh token revoca por el sid del access token, aunque esté vencido", async () => {
    const expired = jwt.sign({ useId: 1, sid: "sesion-1" }, process.env.JWT_SECRET, { expiresIn: -10 });
    const res = buildRes();

    await logoutController({ cookies: { token: expired } }, res, jest.fn());

    expect(sessionMock.revokeSessionByKey).toHaveBeenCalledWith({
      useId: 1,
      sessionKey: "sesion-1",
      audit: { operation: "LOGOUT", ctx: { ip: null } },
    });
    expect(sessionMock.clearSessionCookies).toHaveBeenCalledWith(res);
  });

  it("logoutController con un token de firma inválida no revoca nada", async () => {
    const forged = jwt.sign({ useId: 1, sid: "x" }, "otro-secreto");
    const res = buildRes();

    await logoutController({ cookies: { token: forged } }, res, jest.fn());

    expect(sessionMock.revokeSessionByKey).not.toHaveBeenCalled();
    expect(sessionMock.clearSessionCookies).toHaveBeenCalledWith(res);
  });
});
