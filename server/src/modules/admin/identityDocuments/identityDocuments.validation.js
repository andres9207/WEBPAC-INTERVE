import { body, query } from "express-validator";
import {
  paginationRules,
  optionalText,
  optionalId,
  requiredId,
  idempotencyKeyRule,
} from "../../../common/utils/validation.utils.js";

const isCreate = (req) => !(Number(req.body.iddId) > 0);

export const paginationIdentityDocumentsSchema = [
  ...paginationRules(),
  optionalText("code", 10),
  optionalText("name", 100),
  optionalId("staId"),
];

// includeId: el tipo que ya tiene el registro que se edita. Se incluye aunque
// esté inactivo, para que el selector no lo muestre vacío (ADR-0008,
// decisión 7: desactivar un tipo no afecta a los registros existentes).
export const getIdentityDocumentsSelectSchema = [
  query("includeId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("includeId debe ser un entero positivo."),
];

export const saveIdentityDocumentSchema = [
  idempotencyKeyRule(isCreate),
  body("iddId").optional({ values: "falsy" }).isInt({ min: 0 }).withMessage("iddId debe ser un entero."),
  // El código solo se fija al crear: al editar se ignora (no es editable).
  body("code")
    .if((_value, { req }) => isCreate(req))
    .trim()
    .notEmpty()
    .withMessage("El código es requerido.")
    .isLength({ max: 10 })
    .withMessage("El código admite hasta 10 caracteres.")
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage("El código solo admite letras y números, sin espacios."),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es requerido.")
    .isLength({ max: 100 })
    .withMessage("El nombre admite hasta 100 caracteres."),
  // Solo activo o inactivo: eliminar es su propia acción, con su permiso y
  // su verificación de uso.
  body("staId").isIn([1, 2, "1", "2"]).withMessage("El estado debe ser activo o inactivo."),
];

export const deleteIdentityDocumentSchema = [requiredId("iddId")];
