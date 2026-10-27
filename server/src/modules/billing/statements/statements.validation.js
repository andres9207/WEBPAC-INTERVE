import { body, query } from "express-validator";
import { paginationRules, optionalText, optionalId, requiredId, idempotencyKeyRule, exportFormatRule } from "../../../common/utils/validation.utils.js";

// Forma y tipo de cada campo (ENDPOINT_STANDARD, paso 3). La obra del alcance,
// el número único en la obra y que no se elimine en uso, en el service (DEC-084).

const isCreate = (req) => !(Number(req.body.stmId) > 0);

export const paginationStatementsSchema = [
  ...paginationRules(),
  optionalText("search", 100),
  optionalId("staId"),
  // Filtros por campo (DEC-048); la obra, solo con "Ver todo".
  optionalId("wrkId"),
  optionalText("number", 20),
  optionalText("communication", 50),
];

const statementIdQuery = query("stmId").isInt({ min: 1 }).withMessage("stmId es obligatorio y debe ser un entero positivo.");

export const getStatementSchema = [statementIdQuery];

export const selectStatementsSchema = [
  query("wrkId").isInt({ min: 1 }).withMessage("wrkId es obligatorio y debe ser un entero positivo."),
  query("includeId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("includeId debe ser un entero positivo."),
];

export const saveStatementSchema = [
  idempotencyKeyRule(isCreate),
  body("stmId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("stmId debe ser un entero positivo."),
  body("wrkId").if(isCreate).isInt({ min: 1 }).withMessage("Selecciona la obra del extracto."),
  body("number").trim().notEmpty().withMessage("El número es requerido.").isLength({ max: 20 }).withMessage("El número admite hasta 20 caracteres."),
  body("date")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("La fecha es requerida (AAAA-MM-DD).")
    .bail()
    .isISO8601({ strict: true })
    .withMessage("La fecha no es válida."),
  optionalText("communication", 50),
  optionalText("description", 500),
];

export const changeStatementStatusSchema = [
  requiredId("stmId"),
  body("staId").isIn([1, 2, "1", "2"]).withMessage("El estado debe ser activo o inactivo."),
];

export const deleteStatementSchema = [requiredId("stmId")];

export const getStatementReportSchema = [statementIdQuery];

export const exportStatementSchema = [requiredId("stmId"), exportFormatRule()];

// Extractos escritos en las facturas: la obra y el texto identifican el grupo.
export const paginationStatementGroupsSchema = [...paginationRules(), optionalText("search", 100), optionalId("wrkId"), optionalText("number", 20)];

export const getStatementGroupReportSchema = [
  query("wrkId").isInt({ min: 1 }).withMessage("wrkId es obligatorio y debe ser un entero positivo."),
  query("number").trim().notEmpty().withMessage("El extracto es obligatorio.").isLength({ max: 20 }).withMessage("El extracto admite hasta 20 caracteres."),
];

export const exportStatementGroupSchema = [
  requiredId("wrkId"),
  body("number").trim().notEmpty().withMessage("El extracto es obligatorio.").isLength({ max: 20 }).withMessage("El extracto admite hasta 20 caracteres."),
  exportFormatRule(),
];
