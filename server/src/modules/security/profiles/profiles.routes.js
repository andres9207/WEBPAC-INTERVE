import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../../common/middlewares/requirePermission.middleware.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import {
  paginationProfilesController,
  getModulesController,
  saveProfileController,
  deleteProfileController,
} from "./profiles.controller.js";

const profilesRoutes = express.Router();

// RUTAS PRIVADAS
// Bug preexistente corregido: el path estaba registrado como "/ " (un
// espacio), por lo que /pagination_profiles (la ruta real que llama el
// cliente, ver client/src/api/requests/profilesApi.js) devolvía 404 en vivo.
profilesRoutes.post(
  "/pagination_profiles",
  verifyToken,
  requirePermission(PERMISSIONS.security.profiles.view),
  paginationProfilesController
);

profilesRoutes.get(
  "/get_modules",
  verifyToken,
  requirePermission(PERMISSIONS.security.profiles.view),
  getModulesController
);

// save_profile sirve tanto crear (proId=0) como editar (proId>0): el permiso
// requerido depende del body, no es un valor fijo por ruta.
profilesRoutes.post(
  "/save_profile",
  verifyToken,
  requirePermission((req) =>
    req.body.proId > 0 ? PERMISSIONS.security.profiles.edit : PERMISSIONS.security.profiles.create
  ),
  saveProfileController
);

profilesRoutes.put(
  "/delete_profile",
  verifyToken,
  requirePermission(PERMISSIONS.security.profiles.delete),
  deleteProfileController
);

export default profilesRoutes;
