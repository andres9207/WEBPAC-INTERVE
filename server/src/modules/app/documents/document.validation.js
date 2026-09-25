import { body } from "express-validator";
import { paginationRules, optionalText, requiredId, idempotencyKeyRule } from "../../../common/utils/validation.utils.js";

// Valores del enum tbl_documents_doc_type (schema.prisma).
const DOC_TYPES = ["USERS", "PROFILES", "PAGINAS", "PERMISOS"];

const optionalNullableId = (field) =>
  body(field).optional({ values: "null" }).isInt({ min: 0 }).withMessage(`${field} debe ser un entero.`);

export const paginationDocsSchema = [
  ...paginationRules(),
  body("docType").optional({ values: "falsy" }).isIn(DOC_TYPES).withMessage("docType no es válido."),
  optionalNullableId("docIdRef"),
  optionalNullableId("parentId"),
  optionalText("nombre"),
];

export const saveDocSchema = [
  idempotencyKeyRule((req) => !(Number(req.body.id) > 0)),
  body("id").optional({ values: "falsy" }).isInt({ min: 0 }).withMessage("id debe ser un entero."),
  body("docType").isIn(DOC_TYPES).withMessage("docType no es válido."),
  body("docIdRef").isInt({ min: 0 }).withMessage("docIdRef debe ser un entero."),
  body("nombre").trim().notEmpty().withMessage("El nombre es requerido.").isLength({ max: 255 }),
  body("docPathStorage").isString().isLength({ max: 255 }).withMessage("docPathStorage no es válido."),
  // Las carpetas no tienen archivo: url vacía. Un archivo siempre trae la URL
  // https de descarga del storage.
  body("url")
    .isString()
    .isLength({ max: 255 })
    .custom((value) => value === "" || /^https:\/\//i.test(value))
    .withMessage("url debe ser https."),
  body("extension").isString().isLength({ max: 10 }).withMessage("extension no es válida."),
  body("mimeType").isString().isLength({ max: 100 }).withMessage("mimeType no es válido."),
  body("tamanio").isInt({ min: 0 }).withMessage("tamanio debe ser un entero."),
  body("estado").optional({ values: "null" }).isInt({ min: 1 }).withMessage("estado debe ser un entero."),
  optionalNullableId("parentId"),
];

export const deleteDocSchema = [requiredId("id")];
