import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../../common/middlewares/requirePermission.middleware.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import {
  paginationModuleDocs,
  saveModuleDoc,
  deleteModuleDoc,
  getFileBlob,
  deleteTempFile,
} from "./document.controller.js";

const moduleDocsRoutes = express.Router();

// Paginación de documentos por módulo
moduleDocsRoutes.post(
  "/pagination",
  verifyToken,
  requirePermission(PERMISSIONS.documents.view),
  paginationModuleDocs
);

// Guardar (crear/editar) documento o carpeta
moduleDocsRoutes.post(
  "/save",
  verifyToken,
  requirePermission(PERMISSIONS.documents.manage),
  saveModuleDoc
);

// Eliminar lógica (soft delete con recursividad si es carpeta)
moduleDocsRoutes.put(
  "/delete",
  verifyToken,
  requirePermission(PERMISSIONS.documents.manage),
  deleteModuleDoc
);

// Obtener blob de archivo
moduleDocsRoutes.get("/blob", verifyToken, getFileBlob);

// Eliminar archivo temporal (sin auth si se usa desde cliente)
moduleDocsRoutes.delete("/temp/:filename", deleteTempFile);

export default moduleDocsRoutes;
