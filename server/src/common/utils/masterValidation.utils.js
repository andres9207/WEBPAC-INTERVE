import { body, query } from "express-validator";
import { paginationRules, optionalText, optionalId, requiredId, idempotencyKeyRule } from "./validation.utils.js";

/**
 * Esquemas de express-validator de un maestro (MAE-BE-01), generados desde
 * su config (`defineMaster`, common/services/master.service.js). Todo campo
 * de body, query y params tiene regla (ENDPOINT_STANDARD, paso 3).
 */
export const createMasterSchemas = (config) => {
  const { idField, fields } = config;
  const isCreate = (req) => !(Number(req.body[idField]) > 0);

  const fieldRule = (field) => {
    // Un campo no editable solo se valida al crear; al editar se ignora.
    let chain = field.editable ? body(field.name) : body(field.name).if((_value, { req }) => isCreate(req));
    chain = field.required
      ? chain.trim().notEmpty().withMessage(`El ${field.label} es requerido.`)
      : chain.optional({ values: "falsy" }).trim();
    chain = chain
      .isLength({ max: field.maxLength })
      .withMessage(`El ${field.label} admite hasta ${field.maxLength} caracteres.`);
    if (field.pattern) chain = chain.matches(field.pattern.regex).withMessage(field.pattern.message);
    return chain;
  };

  return {
    pagination: [
      ...paginationRules(),
      ...fields.filter((f) => f.filter).map((f) => optionalText(f.name, f.maxLength)),
      optionalText("search", 100),
      optionalId("staId"),
    ],
    getById: [query(idField).isInt({ min: 1 }).withMessage(`${idField} es obligatorio y debe ser un entero positivo.`)],
    select: [
      query("includeId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("includeId debe ser un entero positivo."),
    ],
    save: [
      idempotencyKeyRule(isCreate),
      body(idField).optional({ values: "falsy" }).isInt({ min: 0 }).withMessage(`${idField} debe ser un entero.`),
      ...fields.map(fieldRule),
    ],
    changeStatus: [
      requiredId(idField),
      body("staId").isIn([1, 2, "1", "2"]).withMessage("El estado debe ser activo o inactivo."),
    ],
    remove: [requiredId(idField)],
  };
};
