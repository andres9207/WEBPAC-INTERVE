import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../../common/middlewares/requirePermission.middleware.js";
import { validate } from "../../../common/middlewares/validate.middleware.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import {
  paginationIdentityDocumentsSchema,
  getIdentityDocumentsSelectSchema,
  saveIdentityDocumentSchema,
  deleteIdentityDocumentSchema,
} from "./identityDocuments.validation.js";
import {
  paginationIdentityDocumentsController,
  getIdentityDocumentsSelectController,
  saveIdentityDocumentController,
  deleteIdentityDocumentController,
} from "./identityDocuments.controller.js";

const { identityDocuments } = PERMISSIONS.admin;

const identityDocumentsRoutes = express.Router();

identityDocumentsRoutes.post(
  "/pagination_identity_documents",
  verifyToken,
  requirePermission(identityDocuments.view),
  paginationIdentityDocumentsSchema,
  validate,
  paginationIdentityDocumentsController
);

// Sin requirePermission a propósito (DEC-018): el catálogo de tipos no es
// sensible y lo necesita todo formulario que registra un documento (usuarios,
// proveedores), cada uno ya protegido por su propio permiso.
identityDocumentsRoutes.get(
  "/get_identity_documents_select",
  verifyToken,
  getIdentityDocumentsSelectSchema,
  validate,
  getIdentityDocumentsSelectController
);

// save_identity_document sirve crear (iddId = 0) y editar (iddId > 0).
identityDocumentsRoutes.post(
  "/save_identity_document",
  verifyToken,
  requirePermission((req) => (req.body.iddId > 0 ? identityDocuments.edit : identityDocuments.create)),
  saveIdentityDocumentSchema,
  validate,
  saveIdentityDocumentController
);

identityDocumentsRoutes.put(
  "/delete_identity_document",
  verifyToken,
  requirePermission(identityDocuments.delete),
  deleteIdentityDocumentSchema,
  validate,
  deleteIdentityDocumentController
);

export default identityDocumentsRoutes;
