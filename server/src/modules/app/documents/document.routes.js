import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../../common/middlewares/requirePermission.middleware.js";
import { validate } from "../../../common/middlewares/validate.middleware.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { paginationDocsSchema, saveDocSchema, deleteDocSchema } from "./document.validation.js";
import {
  paginationModuleDocs,
  saveModuleDoc,
  deleteModuleDoc,
} from "./document.controller.js";

const moduleDocsRoutes = express.Router();

// Retirados: GET /blob (proxy de descarga de cualquier `fileUrl` → SSRF) y
// DELETE /temp/:filename (sin verifyToken y con path traversal vía
// `filename`). Ninguno tenía caller real en el cliente (los archivos se
// suben y descargan directo contra Firebase Storage), y /blob ni siquiera
// escribía el archivo temporal que /temp pretendía borrar. Ver SECURITY.md.

// Paginación de documentos por módulo
moduleDocsRoutes.post(
  "/pagination",
  verifyToken,
  requirePermission(PERMISSIONS.documents.view),
  paginationDocsSchema,
  validate,
  paginationModuleDocs
);

// Guardar (crear/editar) documento o carpeta
moduleDocsRoutes.post(
  "/save",
  verifyToken,
  requirePermission(PERMISSIONS.documents.manage),
  saveDocSchema,
  validate,
  saveModuleDoc
);

// Eliminar lógica (soft delete con recursividad si es carpeta)
moduleDocsRoutes.put(
  "/delete",
  verifyToken,
  requirePermission(PERMISSIONS.documents.manage),
  deleteDocSchema,
  validate,
  deleteModuleDoc
);

export default moduleDocsRoutes;
