import { body } from "express-validator";
import {
  paginationRules,
  optionalText,
  optionalId,
  requiredId,
  idempotencyKeyRule,
  emailRule,
} from "../../../common/utils/validation.utils.js";

export const listUsersSchema = [
  ...paginationRules(),
  optionalId("proId"),
  optionalId("staId"),
  optionalText("name"),
  optionalText("lastName"),
  optionalText("email"),
  optionalText("identification"),
  optionalText("username", 100),
  optionalText("search", 100),
];

const isEdit = (req) => Number(req.body.useId) > 0;

// El cliente manda null, "" o el texto "null" cuando no hay número.
export const hasIdentification = (value) => value != null && String(value).trim() !== "" && value !== "null";

export const saveUserSchema = [
  idempotencyKeyRule((req) => !isEdit(req)),
  body("useId").optional({ values: "falsy" }).isInt({ min: 0 }).withMessage("useId debe ser un entero."),
  requiredId("proId"),
  requiredId("staId"),
  body("name").trim().notEmpty().withMessage("El nombre es requerido.").isLength({ max: 255 }),
  body("lastName").trim().notEmpty().withMessage("El apellido es requerido.").isLength({ max: 255 }),
  emailRule(),
  optionalText("identification", 20),
  // Número y tipo van juntos (ADR-0008, decisión 8; CHECK
  // ck_users_identification_type en la BD): o están los dos o ninguno.
  body("iddId")
    .optional({ values: "falsy" })
    .isInt({ min: 1 })
    .withMessage("iddId debe ser un entero positivo.")
    .bail()
    .custom((_value, { req }) => {
      if (!hasIdentification(req.body.identification)) {
        throw new Error("Ingresa el número de identificación o quita el tipo.");
      }
      return true;
    }),
  body("identification").custom((value, { req }) => {
    if (hasIdentification(value) && !(Number(req.body.iddId) > 0)) {
      throw new Error("Selecciona el tipo de identificación.");
    }
    return true;
  }),
  optionalText("username", 100),
  // Obligatoria al crear; al editar, vacía significa "no cambiar".
  body("password").custom((value, { req }) => {
    if (!value) {
      if (isEdit(req)) return true;
      throw new Error("La contraseña es requerida para nuevos usuarios.");
    }
    if (typeof value !== "string" || value.length < 8 || value.length > 72) {
      throw new Error("La contraseña debe tener entre 8 y 72 caracteres.");
    }
    return true;
  }),
  body("access").optional({ values: "null" }).isIn([0, 1, true, false, "0", "1"]).withMessage("access debe ser 0 o 1."),
  body("changePassword").optional({ values: "null" }).isIn([0, 1, true, false, "0", "1"]).withMessage("changePassword debe ser 0 o 1."),
  // CSV de pag_id ("3,4") o arreglo de ids.
  body("usePages").optional({ values: "falsy" }).custom((value) => {
    const ids = Array.isArray(value) ? value : String(value).split(",");
    if (ids.length > 1000 || ids.some((id) => !/^\d+$/.test(String(id).trim()))) {
      throw new Error("usePages solo admite ids de página.");
    }
    return true;
  }),
];

export const deleteUserSchema = [requiredId("useId")];
