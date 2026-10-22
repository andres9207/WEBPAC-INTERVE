import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../../common/middlewares/requirePermission.middleware.js";
import { validate } from "../../../common/middlewares/validate.middleware.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { saveBusinessRulesSchema } from "./businessRules.validation.js";
import { getBusinessRulesController, saveBusinessRulesController } from "./businessRules.controller.js";

// Reglas de negocio (DEC-072), montadas en /api/admin/businessRules. Leer y
// guardar con el mismo permiso: los días valen para todo el sistema. Leer no
// recibe parámetros.
const businessRulesRoutes = express.Router();
const can = PERMISSIONS.admin.businessRules;

businessRulesRoutes.get("/get_business_rules", verifyToken, requirePermission(can.configure), getBusinessRulesController);

businessRulesRoutes.put(
  "/save_business_rules",
  verifyToken,
  requirePermission(can.configure),
  saveBusinessRulesSchema,
  validate,
  saveBusinessRulesController
);

export default businessRulesRoutes;
