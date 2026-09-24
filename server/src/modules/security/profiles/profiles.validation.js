import { body, query } from "express-validator";
import {
  paginationRules,
  optionalText,
  optionalId,
  requiredId,
  idArray,
} from "../../../common/utils/validation.utils.js";

export const paginationProfilesSchema = [...paginationRules(), optionalText("name"), optionalId("staId")];

// proId = 0 es válido: el diálogo de "nuevo perfil" pide las páginas
// disponibles sin tener todavía un perfil.
export const getModulesSchema = [
  query("proId").optional({ values: "falsy" }).isInt({ min: 0 }).withMessage("proId debe ser un entero."),
];

export const saveProfileSchema = [
  body("proId").optional({ values: "falsy" }).isInt({ min: 0 }).withMessage("proId debe ser un entero."),
  body("name").trim().notEmpty().withMessage("El nombre del perfil es requerido.").isLength({ max: 255 }),
  requiredId("staId"),
  ...idArray("modules"),
  ...idArray("previousModules", { optional: true }),
];

export const deleteProfileSchema = [requiredId("proId")];
