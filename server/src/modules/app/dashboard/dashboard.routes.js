import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { getDashboardSummaryController } from "./dashboard.controller.js";

// Tablero (ADR-0002, DEC-052), montado en /api/app/dashboard. Sin
// requirePermission a propósito: es la pantalla de inicio de todo usuario, y
// cada bloque exige en el service el permiso de ver el módulo que agrega. Un
// usuario sin ninguno recibe todos los bloques en null. No recibe parámetros:
// la fecha de referencia y el umbral los pone el servidor.
const dashboardRoutes = express.Router();

dashboardRoutes.get("/get_summary", verifyToken, getDashboardSummaryController);

export default dashboardRoutes;
