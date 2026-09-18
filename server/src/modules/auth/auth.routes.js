import express from "express";
import { verifyToken } from "../../common/middlewares/authjwt.middleware.js";
import { authRateLimit } from "../../common/middlewares/rateLimit.middleware.js";
import { validate } from "../../common/middlewares/validate.middleware.js";
import {
  loginSchema,
  forgotPasswordSchema,
  validateCodePasswordSchema,
  restorePasswordSchema,
  updatePasswordSchema,
  updateAccountSchema,
} from "./auth.validation.js";
import {
  loginController,
  logoutController,
  getSettlementController,
  updateAccountController,
  updatePasswordController,
  getWindowsByProfileController,
  validateCodePasswordController,
  restorePasswordController,
  forgotPasswordController,
} from "./auth.controller.js";

const authRoutes = express.Router();

// Umbral de rate limit más estricto que el resto de la API: estas rutas son
// el objetivo típico de fuerza bruta / credential stuffing.
authRoutes.use(authRateLimit);

// Pipeline estándar por ruta: verifyToken -> requirePermission (si aplica) ->
// validación de esquema -> regla de negocio (controller/service). Ver
// "Convenciones de seguridad para nuevos endpoints" en CLAUDE.md.

authRoutes.post("/login", loginSchema, validate, loginController);

authRoutes.post("/logout", logoutController);

authRoutes.put(
  "/update_password",
  verifyToken,
  updatePasswordSchema,
  validate,
  updatePasswordController
);

authRoutes.get("/get_basic_information", verifyToken, getSettlementController);

authRoutes.get(
  "/get_windows_by_profile",
  verifyToken,
  getWindowsByProfileController
);

authRoutes.put(
  "/update_account",
  verifyToken,
  updateAccountSchema,
  validate,
  updateAccountController
);

authRoutes.post(
  "/validate_code_password",
  validateCodePasswordSchema,
  validate,
  validateCodePasswordController
);

authRoutes.post(
  "/restore_password",
  restorePasswordSchema,
  validate,
  restorePasswordController
);

authRoutes.post(
  "/forgot_password",
  forgotPasswordSchema,
  validate,
  forgotPasswordController
);

export default authRoutes;
