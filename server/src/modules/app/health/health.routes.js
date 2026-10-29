import express from "express";
import { getHealthController } from "./health.controller.js";

// Pública a propósito (DEC-095): la consulta un monitor sin sesión. No recibe
// parámetros, no expone datos de usuarios ni ejecuta acciones; solo dice si el
// proceso y la BD responden. Express atiende también HEAD con esta ruta.
const healthRoutes = express.Router();

healthRoutes.get("/", getHealthController);

export default healthRoutes;
