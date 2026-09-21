import express from "express";
import { verifyToken } from "../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../common/middlewares/requirePermission.middleware.js";
import { PERMISSIONS } from "../../common/constants/permissions.constants.js";
import {
  getSitesDrive,
  getUserDrive,
  getUnitsDrive,
  getFoldersDrive,
} from "./microsoftGraph.controller.js";

const microsoftGraphRoutes = express.Router();

// Antes sin verifyToken: cualquiera en internet podía listar sitios de
// SharePoint y el directorio de Microsoft 365 (nombre+correo) del tenant
// sin sesión. Ver SECURITY.md.
microsoftGraphRoutes.get(
  "/get_sites_drive",
  verifyToken,
  requirePermission(PERMISSIONS.microsoftGraph.view),
  getSitesDrive
);
microsoftGraphRoutes.get(
  "/get_user_drive",
  verifyToken,
  requirePermission(PERMISSIONS.microsoftGraph.view),
  getUserDrive
);
microsoftGraphRoutes.get(
  "/get_units_drive",
  verifyToken,
  requirePermission(PERMISSIONS.microsoftGraph.view),
  getUnitsDrive
);
microsoftGraphRoutes.get(
  "/get_folders_drive",
  verifyToken,
  requirePermission(PERMISSIONS.microsoftGraph.view),
  getFoldersDrive
);

export default microsoftGraphRoutes;
