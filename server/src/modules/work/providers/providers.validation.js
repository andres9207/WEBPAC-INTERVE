import { body, query } from "express-validator";
import {
  paginationRules,
  optionalText,
  optionalId,
  requiredId,
  idempotencyKeyRule,
  emailRule,
  contactsRules,
} from "../../../common/utils/validation.utils.js";
import { EDITABLE_STATUS_VALUES } from "../../../common/constants/status.constants.js";

// Forma y tipo de cada campo (ENDPOINT_STANDARD, paso 3). El formato del
// número según su tipo, la unicidad de la identidad y "un solo principal"
// viven en el service.

const isCreate = (req) => !(Number(req.body.prvId) > 0);

const requiredText = (field, label, max) =>
  body(field).trim().notEmpty().withMessage(`El ${label} es requerido.`).isLength({ max }).withMessage(`El ${label} admite hasta ${max} caracteres.`);

const optionalBodyText = (field, label, max) =>
  body(field).optional({ values: "null" }).isString().withMessage(`${label} debe ser texto.`).trim().isLength({ max }).withMessage(`${label} admite hasta ${max} caracteres.`);

const assignmentDate = (field) => body(field).matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("La fecha de asignación es requerida (AAAA-MM-DD).");

export const paginationProvidersSchema = [...paginationRules(), optionalText("search", 100), optionalId("staId")];

export const getProviderSchema = [query("prvId").isInt({ min: 1 }).withMessage("prvId es obligatorio y debe ser un entero positivo.")];

export const checkIdentificationSchema = [
  query("iddId").isInt({ min: 1 }).withMessage("iddId es obligatorio y debe ser un entero positivo."),
  query("identification").trim().notEmpty().withMessage("El número de documento es requerido.").isLength({ max: 20 }).withMessage("El número admite hasta 20 caracteres."),
  query("excludeId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("excludeId debe ser un entero positivo."),
];

export const selectAssignableWorksSchema = [
  query("search").optional({ values: "falsy" }).isString().isLength({ max: 100 }).withMessage("search admite hasta 100 caracteres."),
  query("prvId").isInt({ min: 1 }).withMessage("prvId es obligatorio y debe ser un entero positivo."),
];

export const selectProvidersSchema = [
  query("search").optional({ values: "falsy" }).isString().isLength({ max: 100 }).withMessage("search admite hasta 100 caracteres."),
  query("wrkId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("wrkId debe ser un entero positivo."),
];

export const saveProviderSchema = [
  idempotencyKeyRule(isCreate),
  body("prvId").optional({ values: "falsy" }).isInt({ min: 0 }).withMessage("prvId debe ser un entero."),
  requiredId("iddId").withMessage("Selecciona el tipo de identificación."),
  requiredText("identification", "número de documento", 20),
  requiredText("name", "nombre o razón social", 255),
  // Uno o varios tipos (DEC-041).
  body("pvtIds").isArray({ min: 1, max: 20 }).withMessage("Selecciona al menos un tipo de proveedor."),
  body("pvtIds.*").isInt({ min: 1 }).withMessage("Cada tipo de proveedor debe ser un id válido."),
  optionalBodyText("serviceType", "El tipo de servicio", 150),
  emailRule("email", { optional: true }),
  optionalBodyText("observation", "La observación", 500),

  ...contactsRules(),

  // Solo al crear desde una obra: crea el proveedor y lo asigna (ADR-0012, dec. 6).
  body("assignment").optional({ values: "null" }).isObject().withMessage("La asignación no es válida."),
  body("assignment.wrkId").if(body("assignment").exists({ values: "null" })).isInt({ min: 1 }).withMessage("La obra de la asignación no es válida."),
  body("assignment.assignmentDate").if(body("assignment").exists({ values: "null" })).matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("La fecha de asignación es requerida (AAAA-MM-DD)."),
  optionalBodyText("assignment.observation", "La observación de la asignación", 500),
];

export const changeProviderStatusSchema = [
  requiredId("prvId"),
  body("staId").isIn(EDITABLE_STATUS_VALUES).withMessage("El estado debe ser activo o inactivo."),
];

export const deleteProviderSchema = [requiredId("prvId")];

export const paginationWorkProvidersSchema = [...paginationRules(), requiredId("wrkId"), optionalText("search", 100)];

export const assignProviderSchema = [
  idempotencyKeyRule(),
  requiredId("wrkId"),
  requiredId("prvId").withMessage("Selecciona el proveedor."),
  assignmentDate("assignmentDate"),
  optionalBodyText("observation", "La observación", 500),
];

export const updateWorkProviderSchema = [
  requiredId("wrkId"),
  requiredId("prvId"),
  assignmentDate("assignmentDate"),
  optionalBodyText("observation", "La observación", 500),
  body("staId").isIn(EDITABLE_STATUS_VALUES).withMessage("El estado debe ser activo o inactivo."),
];

export const unassignProviderSchema = [requiredId("wrkId"), requiredId("prvId")];
