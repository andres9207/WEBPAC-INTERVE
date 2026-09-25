import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { validate } from "../../../common/middlewares/validate.middleware.js";
import { getStatusesByScopeSchema } from "./app.validation.js";

// Todas estas rutas son de sesión (menú, permisos y datos del propio usuario,
// catálogos de perfiles/estados para combos): solo exigen verifyToken, sin
// requirePermission, porque no exponen objetos ajenos. Ver ADR-0001
// "Autorización".
import {
  getMenuController,
  getProfilesController,
  verifyTokenController,
  getUserPermissionsController,
  getStatusesByScope,
} from "./app.controller.js";

const appRoutes = express.Router();

appRoutes.get("/get_menu", verifyToken, getMenuController);

appRoutes.get("/get_profiles", verifyToken, getProfilesController);

appRoutes.get("/verify_token", verifyToken, verifyTokenController);

appRoutes.get(
  "/get_permissions_user",
  verifyToken,
  getUserPermissionsController
);

appRoutes.get(
  "/get_statuses_by_scope",
  verifyToken,
  getStatusesByScopeSchema,
  validate,
  getStatusesByScope
);

export default appRoutes;
