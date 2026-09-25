import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../../common/middlewares/requirePermission.middleware.js";
import { validate } from "../../../common/middlewares/validate.middleware.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import {
  getProfileWindowsSchema,
  getUserPermissionsSchema,
  getProfilePermissionsSchema,
  updateProfilePermissionsSchema,
  updateUserPermissionsSchema,
} from "./permissions.validation.js";
import {
  getProfileWindowsController,
  getUserPermissionsController,
  getProfilePermissionsController,
  updateProfilePermissionsController,
  updateUserPermissionsController,
  getAllPagesController,
  getPermissionsCatalogController,
} from "./permissions.controller.js";

const permissionsRoutes = express.Router();

// RUTAS PRIVADAS

// Catálogo estático (qué per_id significa qué acción) — no es información de
// quién tiene qué permiso, es la misma tabla de nombres que hoy vive
// hardcodeada en el bundle del cliente (permissionsConfig.js), así que no
// hace falta requirePermission: cualquier autenticado ya podía leerla
// abriendo el bundle JS. Ver SECURITY.md.
permissionsRoutes.get(
  "/get_catalog",
  verifyToken,
  getPermissionsCatalogController
);

// Lectura de asignaciones de permisos/páginas de OTRO perfil o usuario
// (proId/useId arbitrario por query/body) — requiere permiso de ver, no solo
// estar logueado (ver SECURITY.md).
permissionsRoutes.get(
  "/get_windows_profile",
  verifyToken,
  requirePermission(PERMISSIONS.security.permissions.view),
  getProfileWindowsSchema,
  validate,
  getProfileWindowsController
);

permissionsRoutes.get(
  "/get_all_pages",
  verifyToken,
  requirePermission(PERMISSIONS.security.permissions.view),
  getAllPagesController
);

permissionsRoutes.post(
  "/get_permissions_user_window",
  verifyToken,
  requirePermission(PERMISSIONS.security.permissions.view),
  getUserPermissionsSchema,
  validate,
  getUserPermissionsController
);

permissionsRoutes.post(
  "/get_permissions_profile",
  verifyToken,
  requirePermission(PERMISSIONS.security.permissions.view),
  getProfilePermissionsSchema,
  validate,
  getProfilePermissionsController
);

permissionsRoutes.post(
  "/update_permissions_profile",
  verifyToken,
  requirePermission(PERMISSIONS.security.profiles.assignPermission),
  updateProfilePermissionsSchema,
  validate,
  updateProfilePermissionsController
);

permissionsRoutes.post(
  "/update_permissions_user",
  verifyToken,
  requirePermission(PERMISSIONS.security.users.assignPermission),
  updateUserPermissionsSchema,
  validate,
  updateUserPermissionsController
);

export default permissionsRoutes;
