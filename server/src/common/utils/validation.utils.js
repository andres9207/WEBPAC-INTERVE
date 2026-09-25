import { body, header } from "express-validator";

/**
 * Reglas de express-validator reutilizadas por varios `*.validation.js`
 * (ADR-0001, B17). Solo validan forma y tipo: no transforman el valor, para
 * no cambiar el contrato que hoy reciben los services.
 */

// Ids opcionales que el cliente manda como null/"" cuando no aplican.
const nullable = { values: "falsy" };

/** Paginación estándar (rows/first/sortField/sortOrder) en el body. */
export const paginationRules = (maxRows = 100) => [
  body("rows").optional(nullable).isInt({ min: 1, max: maxRows }).withMessage(`rows debe estar entre 1 y ${maxRows}.`),
  body("first").optional(nullable).isInt({ min: 0 }).withMessage("first debe ser un entero mayor o igual a 0."),
  body("sortField").optional(nullable).isString().isLength({ max: 50 }).withMessage("sortField no es válido."),
  body("sortOrder").optional(nullable).isIn([1, -1, "1", "-1"]).withMessage("sortOrder debe ser 1 o -1."),
];

/** Filtro de texto opcional en el body. */
export const optionalText = (field, max = 255) =>
  body(field).optional(nullable).isString().withMessage(`${field} debe ser texto.`).isLength({ max }).withMessage(`${field} admite hasta ${max} caracteres.`);

/** Id entero opcional en el body (null/0/"" se aceptan como "sin filtro"). */
export const optionalId = (field) =>
  body(field).optional(nullable).isInt({ min: 1 }).withMessage(`${field} debe ser un entero positivo.`);

/** Id entero obligatorio en el body. */
export const requiredId = (field) =>
  body(field).isInt({ min: 1 }).withMessage(`${field} es obligatorio y debe ser un entero positivo.`);

/** Arreglo de ids enteros positivos en el body. */
export const idArray = (field, { optional = false } = {}) => {
  const chain = optional ? body(field).optional({ values: "null" }) : body(field);
  return [
    chain.isArray({ max: 1000 }).withMessage(`${field} debe ser un arreglo.`),
    body(`${field}.*`).isInt({ min: 1 }).withMessage(`${field} solo admite ids enteros positivos.`),
  ];
};

/**
 * Clave de idempotencia (ADR-0027, decisión 7) en el encabezado
 * Idempotency-Key: obligatoria y UUID cuando `isCreate(req)` es verdadero
 * (crear, o una transición de estado); se ignora en los demás casos (editar
 * ya es idempotente por sí mismo).
 */
export const idempotencyKeyRule = (isCreate = () => true) =>
  header("idempotency-key")
    .if((_value, { req }) => isCreate(req))
    .exists({ values: "falsy" })
    .withMessage("Falta el encabezado Idempotency-Key.")
    .bail()
    .isUUID()
    .withMessage("Idempotency-Key debe ser un UUID.");
