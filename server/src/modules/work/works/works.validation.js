import { body, query } from "express-validator";
import {
  paginationRules,
  optionalText,
  optionalId,
  requiredId,
  idempotencyKeyRule,
  moneyRule,
  contactsRules,
} from "../../../common/utils/validation.utils.js";
import { MANAGER_ROLES } from "./works.service.js";
import { TERM_UNITS } from "../../../common/utils/term.utils.js";
import { EDITABLE_STATUS_VALUES } from "../../../common/constants/status.constants.js";

// Forma y tipo de cada campo (ENDPOINT_STANDARD, paso 3). Las reglas de
// negocio (ampliado >= inicial, al menos un responsable…) viven en el service.

const isCreate = (req) => !(Number(req.body.wrkId) > 0);

const requiredText = (field, label, max) =>
  body(field).trim().notEmpty().withMessage(`El ${label} es requerido.`).isLength({ max }).withMessage(`El ${label} admite hasta ${max} caracteres.`);

const term = (field, label, { optional = false } = {}) =>
  (optional ? body(field).optional({ values: "falsy" }) : body(field))
    .isInt({ min: 0, max: 100000 })
    .withMessage(`El ${label} debe ser un entero no negativo.`);

const status = (field) => body(field).optional({ values: "null" }).isIn(EDITABLE_STATUS_VALUES).withMessage("El estado debe ser activo o inactivo.");

export const paginationWorksSchema = [
  ...paginationRules(),
  optionalText("search", 100),
  optionalId("staId"),
  // Filtros por campo (DEC-048).
  optionalText("code", 30),
  optionalText("name", 200),
  optionalId("cncId"),
  optionalId("sptId"),
];

export const getWorkSchema = [query("wrkId").isInt({ min: 1 }).withMessage("wrkId es obligatorio y debe ser un entero positivo.")];

export const previewWorkEndDateSchema = [
  query("startDate").matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("La fecha de inicio es requerida (AAAA-MM-DD)."),
  query("initialTerm").isInt({ min: 0, max: 100000 }).withMessage("El plazo inicial debe ser un entero no negativo."),
  query("termUnit").isIn(TERM_UNITS).withMessage("La unidad del plazo debe ser días, meses o años."),
];

export const selectWorkManagersSchema = [
  query("search").optional({ values: "falsy" }).isString().isLength({ max: 100 }).withMessage("search admite hasta 100 caracteres."),
];

export const saveWorkSchema = [
  idempotencyKeyRule(isCreate),
  body("wrkId").optional({ values: "falsy" }).isInt({ min: 0 }).withMessage("wrkId debe ser un entero."),
  requiredText("code", "código", 30),
  requiredText("name", "nombre", 200),
  requiredId("cncId").withMessage("Selecciona la constructora."),
  requiredId("cttId").withMessage("Selecciona el tipo de contrato."),
  requiredId("sptId").withMessage("Selecciona el tipo de interventoría."),
  body("startDate").matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("La fecha de inicio es requerida (AAAA-MM-DD)."),
  body("termUnit").isIn(TERM_UNITS).withMessage("La unidad del plazo debe ser días, meses o años."),
  moneyRule("area", "área", { optional: true }),
  moneyRule("directCost", "costo directo", { optional: true }),
  term("initialTerm", "plazo inicial"),
  term("extendedTerm", "plazo ampliado", { optional: true }),
  moneyRule("initialValue", "valor inicial"),
  moneyRule("extendedValue", "valor ampliado", { optional: true }),
  moneyRule("maxServiceOrderValue", "valor máximo de orden de servicio", { optional: true }),

  body("managers").isArray({ min: 1, max: 50 }).withMessage("Agrega al menos un responsable (máximo 50)."),
  body("managers.*.useId").isInt({ min: 1 }).withMessage("Cada responsable debe ser un usuario válido."),
  body("managers.*.role").isIn(MANAGER_ROLES).withMessage("El rol del responsable debe ser principal o apoyo."),
  status("managers.*.staId"),

  body("stages").optional({ values: "null" }).isArray({ max: 100 }).withMessage("Las etapas deben ser una lista (máximo 100)."),
  body("stages.*.wksId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("El id de la etapa no es válido."),
  body("stages.*.name").trim().notEmpty().withMessage("El nombre de la etapa es requerido.").isLength({ max: 100 }).withMessage("El nombre de la etapa admite hasta 100 caracteres."),
  body("stages.*.order").isInt({ min: 1 }).withMessage("El orden de la etapa debe ser un entero positivo."),
  status("stages.*.staId"),
  // Contactos (PRO-BD-04): mismas reglas que los de proveedor.
  ...contactsRules(),
];

export const changeWorkStatusSchema = [
  requiredId("wrkId"),
  body("staId").isIn(EDITABLE_STATUS_VALUES).withMessage("El estado debe ser activo o inactivo."),
];

export const deleteWorkSchema = [requiredId("wrkId")];
