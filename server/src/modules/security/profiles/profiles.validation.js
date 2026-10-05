import { body, query } from "express-validator";
import {
  paginationRules,
  optionalText,
  optionalId,
  requiredId,
  idempotencyKeyRule,
  idArray,
} from "../../../common/utils/validation.utils.js";
import { EDITABLE_STATUS_VALUES } from "../../../common/constants/status.constants.js";

export const paginationProfilesSchema = [...paginationRules(), optionalText("name"), optionalText("search", 100), optionalId("staId")];

// proId = 0 es válido: el diálogo de "nuevo perfil" pide las páginas
// disponibles sin tener todavía un perfil.
export const getModulesSchema = [
  query("proId").optional({ values: "falsy" }).isInt({ min: 0 }).withMessage("proId debe ser un entero."),
];

export const saveProfileSchema = [
  idempotencyKeyRule((req) => !(Number(req.body.proId) > 0)),
  body("proId").optional({ values: "falsy" }).isInt({ min: 0 }).withMessage("proId debe ser un entero."),
  body("name").trim().notEmpty().withMessage("El nombre del perfil es requerido.").isLength({ max: 255 }),
  // Solo activo o inactivo: eliminar va por deleteProfile, que verifica que
  // el perfil no tenga usuarios. Antes se aceptaba cualquier id y editar con
  // el estado eliminado se saltaba esa verificación.
  body("staId").isIn(EDITABLE_STATUS_VALUES).withMessage("El estado debe ser activo o inactivo."),
  ...idArray("modules"),
  ...idArray("previousModules", { optional: true }),
];

export const deleteProfileSchema = [requiredId("proId")];
