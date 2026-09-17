import * as authService from "./auth.service.js";

const SESSION_COOKIE_NAME = "token";
const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
};

export const loginController = async (req, res, next) => {
  try {
    const { usuario, clave, password } = req.body;
    const { token, ...result } = await authService.login({ usuario, clave, password });

    res.cookie(SESSION_COOKIE_NAME, token, {
      ...sessionCookieOptions,
      maxAge: 86400000,
    });
    return res.json(result);
  } catch (err) {
    next(err);
  }
};

export const logoutController = (req, res) => {
  res.clearCookie(SESSION_COOKIE_NAME, sessionCookieOptions);
  return res.status(200).json({ success: true, message: "Sesión cerrada." });
};


export const getSettlementController = async (req, res, next) => {
  try {
    const { useId } = req.query;
    const result = await authService.getBasicInformation({ useId });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateAccountController = async (req, res, next) => {
  try {
    const { name, lastName, username, email, useId } = req.body;
    await authService.updateAccount({ name, lastName, username, email, useId });
    return res
      .status(200)
      .json({ message: "Cuenta Modificada Correctamente" });
  } catch (err) {
    next(err);
  }
};

export const updatePasswordController = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, useId } = req.body;
    await authService.updatePassword({ currentPassword, newPassword, useId });
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
    await authService.validateCodePassword({ email, codeTemp });
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
    await authService.restorePassword({ email, nuevaContrasena, codeTemp });
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
    await authService.forgotPassword({ email });
    return res.status(200).json({
      success: true,
      message: "Correo enviado.",
    });
  } catch (err) {
    next(err);
  }
};
