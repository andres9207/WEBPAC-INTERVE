import express from "express";
import { verifyToken } from "../../common/middlewares/authjwt.middleware.js";
import { authRateLimit } from "../../common/middlewares/rateLimit.middleware.js";
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

authRoutes.post("/login", loginController);

authRoutes.post("/logout", logoutController);

authRoutes.put("/update_password", updatePasswordController);

authRoutes.get("/get_basic_information", verifyToken, getSettlementController);

authRoutes.get(
  "/get_windows_by_profile",
  verifyToken,
  getWindowsByProfileController
);

authRoutes.put("/update_account", verifyToken, updateAccountController);

authRoutes.post("/validate_code_password", validateCodePasswordController);

authRoutes.post("/restore_password", restorePasswordController);

authRoutes.post("/forgot_password", forgotPasswordController);

export default authRoutes;
