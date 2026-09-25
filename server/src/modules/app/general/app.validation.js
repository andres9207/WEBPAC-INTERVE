import { query } from "express-validator";

// Valores del enum tbl_status_sta_scope (schema.prisma).
const STATUS_SCOPES = ["GENERAL"];

export const getStatusesByScopeSchema = [
  query("scope").isIn(STATUS_SCOPES).withMessage("scope no es válido."),
];
