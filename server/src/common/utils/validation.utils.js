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

/**
 * Correo en el body (ADR-0009, B6): recorta, exige formato y hasta 255
 * caracteres. Con `optional`, vacío o null se acepta como "sin correo".
 * Para usuarios, autenticación y los contactos de obra y de proveedor.
 */
export const emailRule = (field = "email", { optional = false } = {}) => {
  const chain = optional ? body(field).optional(nullable) : body(field);
  return chain
    .trim()
    .notEmpty()
    .withMessage("El correo es requerido.")
    .isEmail()
    .withMessage("El correo no es válido.")
    .isLength({ max: 255 })
    .withMessage("El correo admite hasta 255 caracteres.");
};

/**
 * Importe en el body (DEC-028): cadena o número no negativo, con punto
 * decimal y hasta 16 dígitos enteros (DECIMAL(18,2)). Los decimales de más
 * no se rechazan: el service los redondea con `toMoney`. Con `optional`,
 * vacío o null se acepta como "sin valor". Con `when(req)`, solo se valida
 * cuando devuelve verdadero (p. ej. el valor inicial, solo al crear el
 * contrato).
 */
export const moneyRule = (field, label, { optional = false, when } = {}) => {
  const base = when ? body(field).if((_value, { req }) => when(req)) : body(field);
  const chain = optional ? base.optional(nullable) : base.exists({ values: "falsy" }).withMessage(`El ${label} es requerido.`).bail();
  return chain
    .customSanitizer((value) => (typeof value === "number" ? String(value) : value))
    .isString()
    .withMessage(`El ${label} no es válido.`)
    .bail()
    .trim()
    .matches(/^\d{1,16}(\.\d+)?$/)
    .withMessage(`El ${label} debe ser un número no negativo, con punto decimal y hasta 16 dígitos enteros.`);
};

/**
 * Porcentaje en el body (DEC-036): cadena o número entre 0 y 100, con punto
 * decimal y hasta dos decimales (DECIMAL(5,2)). Obligatorio por defecto: 0
 * es un valor pactado, no "sin valor". Con `optional`, ausente, null o vacío
 * se aceptan (los campos configurables: si es obligatorio lo decide la
 * configuración del tipo de contrato, en el service). `when(req)` igual que
 * en `moneyRule`.
 */
export const percentRule = (field, label, { when, optional = false } = {}) => {
  const base = when ? body(field).if((_value, { req }) => when(req)) : body(field);
  const chain = optional ? base.optional({ values: "falsy" }) : base.exists({ values: "null" }).withMessage(`El ${label} es requerido.`).bail();
  return chain
    .customSanitizer((value) => (typeof value === "number" ? String(value) : value))
    .isString()
    .withMessage(`El ${label} no es válido.`)
    .bail()
    .trim()
    .matches(/^\d{1,3}(\.\d{1,2})?$/)
    .withMessage(`El ${label} debe ser un número con hasta dos decimales.`)
    .bail()
    .custom((value) => Number(value) <= 100)
    .withMessage(`El ${label} debe estar entre 0 y 100.`);
};

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
