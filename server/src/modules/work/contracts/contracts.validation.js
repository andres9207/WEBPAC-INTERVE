import { body, query } from "express-validator";
import {
  paginationRules,
  optionalText,
  optionalId,
  requiredId,
  idempotencyKeyRule,
  moneyRule,
  percentRule,
} from "../../../common/utils/validation.utils.js";
import { TERM_UNITS } from "../../../common/utils/term.utils.js";
import { CONTRACT_STATES } from "./contractTerms.js";

// Forma y tipo de cada campo (ENDPOINT_STANDARD, paso 3). Las reglas de
// negocio (etapa de la obra, estado que admite el acto, cronología…) viven en
// el service. La fecha fin, el estado, el número de otrosí y los valores
// derivados no se aceptan: si llegan, se ignoran. Los campos configurables
// (etapa, observaciones, descripción, porcentajes; DEC-037) son opcionales
// aquí: si aplican o son obligatorios lo decide la configuración del tipo de
// contrato, en el service.

const isCreate = (req) => !(Number(req.body.ctrId) > 0);

const requiredText = (field, label, max) =>
  body(field).trim().notEmpty().withMessage(`El ${label} es requerido.`).isLength({ max }).withMessage(`El ${label} admite hasta ${max} caracteres.`);

const optionalLongText = (field, label, max) =>
  body(field).optional({ values: "null" }).isString().withMessage(`${label} debe ser texto.`).isLength({ max }).withMessage(`${label} admite hasta ${max} caracteres.`);

const dateRule = (field, label) => body(field).matches(/^\d{4}-\d{2}-\d{2}$/).withMessage(`La ${label} es requerida (AAAA-MM-DD).`);

const PERCENTS = [
  ["adminPct", "porcentaje de administración"],
  ["contingencyPct", "porcentaje de imprevistos"],
  ["profitPct", "porcentaje de utilidad"],
  ["vatPct", "porcentaje de IVA"],
  ["advancePct", "porcentaje de anticipo"],
  ["retentionPct", "porcentaje de retenido"],
];

/** Datos económicos de un concepto, con `prefix` para el valor inicial anidado en el contrato. */
const conceptRules = (prefix = "", when) => [
  moneyRule(`${prefix}directCost`, "costo directo", { when }),
  ...PERCENTS.map(([field, label]) => percentRule(`${prefix}${field}`, label, { when, optional: true })),
];

const extensionRule = body("extension")
  .optional({ values: "falsy" })
  .isInt({ min: 0, max: 100000 })
  .withMessage("La prórroga debe ser un entero no negativo.");

export const paginationContractsSchema = [
  ...paginationRules(),
  optionalText("search", 100),
  body("state").optional({ values: "falsy" }).isIn(Object.values(CONTRACT_STATES)).withMessage("El estado no es válido."),
  optionalId("wrkId"),
  optionalId("cttId"),
];

export const getContractSchema = [query("ctrId").isInt({ min: 1 }).withMessage("ctrId es obligatorio y debe ser un entero positivo.")];

export const selectContractWorksSchema = [
  query("search").optional({ values: "falsy" }).isString().isLength({ max: 100 }).withMessage("search admite hasta 100 caracteres."),
];

export const getContractFormOptionsSchema = [
  query("wrkId").isInt({ min: 1 }).withMessage("wrkId es obligatorio y debe ser un entero positivo."),
  query("includeWksId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("includeWksId debe ser un entero positivo."),
  query("includePrvId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("includePrvId debe ser un entero positivo."),
];

export const previewContractEndDateSchema = [
  query("ctrId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("ctrId debe ser un entero positivo."),
  query("startDate").matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("La fecha de inicio es requerida (AAAA-MM-DD)."),
  query("term").isInt({ min: 1, max: 100000 }).withMessage("El plazo debe ser un entero positivo."),
  query("termUnit").isIn(TERM_UNITS).withMessage("La unidad del plazo debe ser días, meses o años."),
];

export const getContractFieldsSchema = [
  query("cttId").isInt({ min: 1 }).withMessage("cttId es obligatorio y debe ser un entero positivo."),
  query("version").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("version debe ser un entero positivo."),
];

export const saveContractSchema = [
  idempotencyKeyRule(isCreate),
  body("ctrId").optional({ values: "falsy" }).isInt({ min: 0 }).withMessage("ctrId debe ser un entero."),
  // La obra solo se elige al crear: después no cambia.
  body("wrkId").if((_value, { req }) => isCreate(req)).isInt({ min: 1 }).withMessage("Selecciona la obra."),
  requiredId("prvId").withMessage("Selecciona el proveedor."),
  optionalId("wksId"),
  requiredId("cttId").withMessage("Selecciona el tipo de contrato."),
  requiredText("number", "número de contrato", 50),
  requiredText("name", "nombre", 200),
  dateRule("startDate", "fecha de inicio"),
  body("term").isInt({ min: 1, max: 100000 }).withMessage("El plazo debe ser un entero positivo."),
  body("termUnit").isIn(TERM_UNITS).withMessage("La unidad del plazo debe ser días, meses o años."),
  optionalLongText("observation", "Las observaciones", 1000),
  body("initialConcept").if((_value, { req }) => isCreate(req)).isObject().withMessage("Faltan los datos del valor inicial."),
  ...conceptRules("initialConcept.", isCreate),
];

export const createAmendmentSchema = [
  idempotencyKeyRule(),
  requiredId("ctrId"),
  dateRule("startDate", "fecha de inicio"),
  optionalLongText("description", "La descripción", 500),
  ...conceptRules(),
  extensionRule,
  // Solo si el contrato está suspendido: el otrosí lo reanuda (DEC-039). Si
  // es obligatoria lo decide el service, con el estado bajo bloqueo.
  body("liftDate").optional({ values: "falsy" }).matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("La fecha de reanudación no es válida (AAAA-MM-DD)."),
];

export const suspendContractSchema = [
  idempotencyKeyRule(),
  requiredId("ctrId"),
  requiredId("reaId").withMessage("Selecciona el motivo de la suspensión."),
  dateRule("suspensionDate", "fecha de suspensión"),
  requiredText("liftCondition", "condición de levantamiento", 500),
  optionalLongText("observation", "La observación", 1000),
  body("requiresReport").optional({ values: "null" }).isBoolean().withMessage("Indica si la suspensión genera informe de interventoría."),
];

export const createLiquidationSchema = [
  idempotencyKeyRule(),
  requiredId("ctrId"),
  dateRule("startDate", "fecha de inicio"),
  optionalLongText("description", "La descripción", 500),
  ...conceptRules(),
];

export const updateConceptSchema = [
  requiredId("ccpId"),
  dateRule("startDate", "fecha de inicio"),
  optionalLongText("description", "La descripción", 500),
  ...conceptRules(),
  extensionRule,
];

export const deleteContractSchema = [requiredId("ctrId")];
