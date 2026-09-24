import jwt from "jsonwebtoken";
import * as authService from "./auth.service.js";
import * as sessionService from "../../common/services/session.service.js";
import { AUDIT_OPERATIONS, auditContext } from "../../common/services/audit.service.js";

const requestContext = (req) => ({
  ip: req.ip,
  userAgent: req.get?.("user-agent"),
});

// El actor del logout lo completa session.service con el dueño de la sesión.
const logoutAudit = (req) => ({ operation: AUDIT_OPERATIONS.LOGOUT, ctx: { ip: req.ip ?? null } });

export const loginController = async (req, res, next) => {
  try {
    const { usuario, clave, password } = req.body;
    const { sessionUser, ...result } = await authService.login({
      usuario,
      clave,
      password,
      ctx: auditContext(req),
    });

    // Sesión única: abrir esta sesión cierra cualquier otra del usuario.
    const { accessToken, refreshToken } = await sessionService.createSession({
      user: sessionUser,
      ...requestContext(req),
      auditOperation: AUDIT_OPERATIONS.LOGIN,
    });

    sessionService.setSessionCookies(res, { accessToken, refreshToken });
    return res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * Renueva el access token con el refresh token de la cookie (rotándolo).
 * Pública a propósito: se llama justamente cuando el access token ya venció.
 * Si falla, se limpian ambas cookies para que el cliente vuelva al login.
 */
export const refreshController = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.[sessionService.REFRESH_COOKIE_NAME];
    const tokens = await sessionService.refreshSession({ refreshToken });
    sessionService.setSessionCookies(res, tokens);
    return res.status(200).json({ success: true });
  } catch (err) {
    if (err.statusCode === 401) sessionService.clearSessionCookies(res);
    next(err);
  }
};

/**
 * Cierra la sesión en el servidor (borra la fila de tbl_sessions), no solo
 * las cookies: el refresh token deja de servir y los access tokens ya
 * emitidos fallan en verifyToken en la siguiente petición. Sin verifyToken a
 * propósito: debe funcionar aunque el access token ya haya vencido, así que
 * identifica la sesión por el refresh token o, si no hay, por el access
 * token (aun vencido: la firma sigue probando a quién pertenece).
 */
export const logoutController = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.[sessionService.REFRESH_COOKIE_NAME];
    const accessToken = req.cookies?.[sessionService.ACCESS_COOKIE_NAME];

    if (refreshToken) {
      await sessionService.revokeSessionByRefreshToken({ refreshToken, audit: logoutAudit(req) });
    } else if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET, { ignoreExpiration: true });
        await sessionService.revokeSessionByKey({
          useId: decoded.useId,
          sessionKey: decoded.sid,
          audit: logoutAudit(req),
        });
      } catch {
        // Token inválido: no identifica ninguna sesión; basta con limpiar cookies.
      }
    }

    sessionService.clearSessionCookies(res);
    return res.status(200).json({ success: true, message: "Sesión cerrada." });
  } catch (err) {
    next(err);
  }
};

export const getSettlementController = async (req, res, next) => {
  try {
    // El sujeto siempre sale del JWT verificado (verifyToken), nunca de la
    // petición: aceptar un useId del cliente aquí permitiría leer los datos
    // de cualquier otra cuenta (IDOR).
    const { useId } = req.user;
    const result = await authService.getBasicInformation({ useId });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateAccountController = async (req, res, next) => {
  try {
    const { name, lastName, username, email } = req.body;
    const { useId, sid } = req.user;
    const updated = await authService.updateAccount({
      name,
      lastName,
      username,
      email,
      useId,
      ctx: auditContext(req),
    });

    // Misma sesión (mismo sid), token reemitido con el nombre/correo nuevos.
    sessionService.setSessionCookies(res, {
      accessToken: sessionService.signAccessToken({ ...updated, sessionKey: sid }),
    });

    return res
      .status(200)
      .json({ message: "Cuenta Modificada Correctamente" });
  } catch (err) {
    next(err);
  }
};

export const updatePasswordController = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { useId } = req.user;
    const user = await authService.updatePassword({
      currentPassword,
      newPassword,
      useId,
      ctx: auditContext(req),
    });

    // Rota la sesión: sesión nueva para este dispositivo, la anterior (y
    // cualquier copia de sus tokens) deja de servir.
    const { accessToken, refreshToken } = await sessionService.createSession({
      user,
      ...requestContext(req),
    });
    sessionService.setSessionCookies(res, { accessToken, refreshToken });

    return res
      .status(200)
      .json({ message: "Contraseña Actualizada Correctamente" });
  } catch (err) {
    next(err);
  }
};

export const getWindowsByProfileController = async (req, res, next) => {
  try {
    const { proId } = req.query;
    const result = await authService.getWindowsByProfile({ proId });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const validateCodePasswordController = async (req, res, next) => {
  try {
    const { email, codeTemp } = req.body;
    await authService.validateCodePassword({ email, codeTemp, ctx: auditContext(req) });
    return res
      .status(200)
      .json({ success: true, message: "Código verificado." });
  } catch (error) {
    next(error);
  }
};

export const restorePasswordController = async (req, res, next) => {
  try {
    const { email, nuevaContrasena, codeTemp } = req.body;
    await authService.restorePassword({ email, nuevaContrasena, codeTemp, ctx: auditContext(req) });
    return res
      .status(200)
      .json({ success: true, message: "Contraseña actualizada con éxito." });
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;
    await authService.forgotPassword({ email, ctx: auditContext(req) });
    return res.status(200).json({
      success: true,
      message: "Correo enviado.",
    });
  } catch (err) {
    next(err);
  }
};
