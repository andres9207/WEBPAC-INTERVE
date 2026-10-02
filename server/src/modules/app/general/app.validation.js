import { query } from "express-validator";
import { STATUS_KEYS } from "../../../common/constants/status.constants.js";

// Valores del enum tbl_status_sta_scope (schema.prisma).
const STATUS_SCOPES = ["GENERAL"];

export const getStatusesByScopeSchema = [
  query("scope").isIn(STATUS_SCOPES).withMessage("scope no es válido."),
  // Claves a excluir (sta_key, DEC-038): una o varias, siempre del catálogo.
  query("excludesKeys").optional().toArray(),
  query("excludesKeys.*").isIn(STATUS_KEYS).withMessage("excludesKeys solo admite claves de estado conocidas."),
];
