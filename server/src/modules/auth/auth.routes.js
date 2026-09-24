import express from "express";
import { verifyToken } from "../../common/middlewares/authjwt.middleware.js";
import { authRateLimit } from "../../common/middlewares/rateLimit.middleware.js";
import { validate } from "../../common/middlewares/validate.middleware.js";
import { requirePermission } from "../../common/middlewares/requirePermission.middleware.js";
import { PERMISSIONS } from "../../common/constants/permissions.constants.js";
import {
  getWindowsByProfileSchema,
  loginSchema,
  forgotPasswordSchema,
  validateCodePasswordSchema,
  restorePasswordSchema,
  updatePasswordSchema,
  updateAccountSchema,
} from "./auth.validation.js";
import {
  loginController,
  refreshController,
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

authRoutes.post("/refresh", refreshController);

authRoutes.post("/logout", logoutController);

authRoutes.put(
  "/update_password",
  verifyToken,
  updatePasswordSchema,
  validate,
  updatePasswordController
);

authRoutes.get("/get_basic_information", verifyToken, getSettlementController);

// Páginas de un perfil ARBITRARIO (proId por query): lo usa UserDialog.jsx
// para mostrar las páginas del perfil que se le está asignando a otro
// usuario. Al ser lectura de datos ajenos exige el permiso de ver usuarios,
// no solo estar autenticado (ADR-0001, B2).
authRoutes.get(
  "/get_windows_by_profile",
  verifyToken,
  requirePermission(PERMISSIONS.security.users.view),
  getWindowsByProfileSchema,
  validate,
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
