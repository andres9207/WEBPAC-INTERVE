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
profilesRoutes.post(
  "/ ",
  verifyToken,
  paginationProfilesController
);

profilesRoutes.get("/get_modules", verifyToken, getModulesController);

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
