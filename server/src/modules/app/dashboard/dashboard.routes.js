import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { validate } from "../../../common/middlewares/validate.middleware.js";
import { getDashboardDetailSchema } from "./dashboard.validation.js";
import { getDashboardDetailController, getDashboardSummaryController, getWorkDashboardController } from "./dashboard.controller.js";

// Tablero (ADR-0002, DEC-052), montado en /api/app/dashboard. Sin
// requirePermission a propósito: es la pantalla de inicio de todo usuario, y
// cada bloque exige en el service el permiso de ver el módulo que agrega. Un
// usuario sin ninguno recibe todos los bloques en null. No recibe parámetros:
// la fecha de referencia y el umbral los pone el servidor, y la obra del
// tablero de obra (DEC-063) es la del alcance (X-Work-Id), verificada.
// El detalle de una cifra exige en el service el permiso de su módulo (403):
// cada métrica tiene el suyo, y las de pólizas, dos.
const dashboardRoutes = express.Router();

dashboardRoutes.get("/get_summary", verifyToken, getDashboardSummaryController);
dashboardRoutes.get("/get_work_summary", verifyToken, getWorkDashboardController);
dashboardRoutes.get("/get_summary_detail", verifyToken, getDashboardDetailSchema, validate, getDashboardDetailController);

export default dashboardRoutes;
