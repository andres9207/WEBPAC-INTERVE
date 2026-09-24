import { body } from "express-validator";
import {
  paginationRules,
  optionalText,
  optionalId,
  requiredId,
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
];

const isEdit = (req) => Number(req.body.useId) > 0;

export const saveUserSchema = [
  body("useId").optional({ values: "falsy" }).isInt({ min: 0 }).withMessage("useId debe ser un entero."),
  requiredId("proId"),
  requiredId("staId"),
  body("name").trim().notEmpty().withMessage("El nombre es requerido.").isLength({ max: 255 }),
  body("lastName").trim().notEmpty().withMessage("El apellido es requerido.").isLength({ max: 255 }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El correo es requerido.")
    .isEmail()
    .withMessage("El correo no es válido.")
    .isLength({ max: 255 }),
  optionalText("identification"),
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
