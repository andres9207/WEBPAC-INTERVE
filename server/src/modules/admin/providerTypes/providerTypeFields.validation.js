import { body, query } from "express-validator";
import { requiredId } from "../../../common/utils/validation.utils.js";

// Forma y tipo (ENDPOINT_STANDARD, paso 3). Que el campo sea del catálogo, que
// no se repita y la jerarquía aplica ⇒ visible ⇒ obligatorio los valida el
// service (y la jerarquía, además, un CHECK de la BD).

export const getProviderTypeFieldsSchema = [query("pvtId").isInt({ min: 1 }).withMessage("pvtId es obligatorio y debe ser un entero positivo.")];

export const saveProviderTypeFieldsSchema = [
  requiredId("pvtId"),
  body("fields").isArray({ max: 100 }).withMessage("fields debe ser un arreglo."),
  body("fields.*.cfdId").isInt({ min: 1 }).withMessage("Cada campo debe traer su cfdId."),
  body("fields.*.applies").isBoolean({ strict: true }).withMessage("applies debe ser verdadero o falso."),
  body("fields.*.visible").isBoolean({ strict: true }).withMessage("visible debe ser verdadero o falso."),
  body("fields.*.required").isBoolean({ strict: true }).withMessage("required debe ser verdadero o falso."),
  body("fields.*.order").isInt({ min: 0, max: 999 }).withMessage("El orden debe ser un entero entre 0 y 999."),
];
