import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../../common/middlewares/requirePermission.middleware.js";
import { validate } from "../../../common/middlewares/validate.middleware.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import {
  paginationStatementsSchema,
  getStatementSchema,
  selectStatementsSchema,
  saveStatementSchema,
  changeStatementStatusSchema,
  deleteStatementSchema,
  getStatementReportSchema,
  exportStatementSchema,
} from "./statements.validation.js";
import {
  paginationStatementsController,
  getStatementController,
  selectStatementsController,
  saveStatementController,
  changeStatementStatusController,
  deleteStatementController,
  getStatementReportController,
  exportStatementController,
} from "./statements.controller.js";

// Extractos de la obra (DEC-084), montados en /api/billing/statements, con las
// rutas de un maestro (createMasterApi en el cliente) más el reporte.
// Pipeline de ENDPOINT_STANDARD: verifyToken → requirePermission → esquema → validate → controller.
const can = PERMISSIONS.billing.statements;
const canView = requirePermission(can.view);
const statementsRoutes = express.Router();

statementsRoutes.post("/pagination_statements", verifyToken, canView, paginationStatementsSchema, validate, paginationStatementsController);
statementsRoutes.get("/get_statement", verifyToken, canView, getStatementSchema, validate, getStatementController);
// Selector del formulario de factura: solo verifyToken, como un selector (DEC-018); el alcance lo limita a la obra.
statementsRoutes.get("/get_statements_select", verifyToken, selectStatementsSchema, validate, selectStatementsController);
statementsRoutes.post(
  "/save_statement",
  verifyToken,
  requirePermission((req) => (Number(req.body.stmId) > 0 ? can.edit : can.create)),
  saveStatementSchema,
  validate,
  saveStatementController
);
statementsRoutes.put(
  "/change_status_statement",
  verifyToken,
  requirePermission(can.changeStatus),
  changeStatementStatusSchema,
  validate,
  changeStatementStatusController
);
statementsRoutes.put("/delete_statement", verifyToken, requirePermission(can.delete), deleteStatementSchema, validate, deleteStatementController);
// Reporte (documento de alcance, punto 7): sus facturas con totales por menú y el chequeo de comprobantes.
statementsRoutes.get("/get_statement_report", verifyToken, canView, getStatementReportSchema, validate, getStatementReportController);
statementsRoutes.post("/export_statement", verifyToken, canView, requirePermission(can.export), exportStatementSchema, validate, exportStatementController);

export default statementsRoutes;
