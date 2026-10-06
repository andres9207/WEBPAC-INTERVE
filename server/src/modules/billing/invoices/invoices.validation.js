import { body, query } from "express-validator";
import { paginationRules, optionalText, optionalId, requiredId, idempotencyKeyRule, moneyRule } from "../../../common/utils/validation.utils.js";
import { INVOICE_STATES, INVOICE_TYPES, hasContract } from "./invoiceTerms.js";

// Forma y tipo de cada campo (ENDPOINT_STANDARD, paso 3). Las reglas de
// negocio (proveedor de la obra, estado del contrato, cronología…) viven en
// el service. Estado, fecha de aprobación y saldos no se aceptan en el
// formulario: si llegan, se ignoran (ADR-0020, "Seguridad"). Los importes
// capturados son opcionales aquí: si el tipo los exige lo decide el service.

const isCreate = (req) => !(Number(req.body.invId) > 0);
const isSimpleCreate = (req) => isCreate(req) && !hasContract(req.body.type);
const isContractCreate = (req) => isCreate(req) && hasContract(req.body.type);

const dateRule = (field, label) => body(field).matches(/^\d{4}-\d{2}-\d{2}$/).withMessage(`La ${label} es requerida (AAAA-MM-DD).`);

const optionalLongText = (field, label, max) =>
  body(field).optional({ values: "null" }).isString().withMessage(`${label} debe ser texto.`).isLength({ max }).withMessage(`${label} admite hasta ${max} caracteres.`);

export const paginationInvoicesSchema = [
  ...paginationRules(),
  optionalText("search", 100),
  body("state").optional({ values: "falsy" }).isIn(Object.values(INVOICE_STATES)).withMessage("El estado no es válido."),
  body("type").optional({ values: "falsy" }).isIn(Object.values(INVOICE_TYPES)).withMessage("El tipo de factura no es válido."),
  optionalId("wrkId"),
  optionalId("prvId"),
  optionalId("ctrId"),
];

export const getInvoiceSchema = [query("invId").isInt({ min: 1 }).withMessage("invId es obligatorio y debe ser un entero positivo.")];

export const selectInvoiceWorksSchema = [
  query("search").optional({ values: "falsy" }).isString().isLength({ max: 100 }).withMessage("search admite hasta 100 caracteres."),
  query("includeWrkId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("includeWrkId debe ser un entero positivo."),
];

export const getInvoiceFormOptionsSchema = [
  query("wrkId").isInt({ min: 1 }).withMessage("wrkId es obligatorio y debe ser un entero positivo."),
  query("includeWksId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("includeWksId debe ser un entero positivo."),
  query("includePrvId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("includePrvId debe ser un entero positivo."),
];

export const selectInvoiceContractsSchema = [
  query("type")
    .isIn(Object.values(INVOICE_TYPES).filter(hasContract))
    .withMessage("El tipo debe ser uno de factura de contrato."),
  query("search").optional({ values: "falsy" }).isString().isLength({ max: 100 }).withMessage("search admite hasta 100 caracteres."),
  query("includeCtrId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("includeCtrId debe ser un entero positivo."),
];

export const getContractAdvanceSchema = [
  query("ctrId").isInt({ min: 1 }).withMessage("ctrId es obligatorio y debe ser un entero positivo."),
  query("value")
    .optional({ values: "falsy" })
    .matches(/^\d{1,16}(\.\d+)?$/)
    .withMessage("El valor debe ser un número no negativo, con punto decimal y hasta 16 dígitos enteros."),
];

export const saveInvoiceSchema = [
  idempotencyKeyRule(isCreate),
  body("invId").optional({ values: "falsy" }).isInt({ min: 0 }).withMessage("invId debe ser un entero."),
  // Tipo, obra y contrato solo se eligen al crear: después no cambian.
  body("type").if((_value, { req }) => isCreate(req)).isIn(Object.values(INVOICE_TYPES)).withMessage("Selecciona el tipo de factura."),
  body("ctrId").if((_value, { req }) => isContractCreate(req)).isInt({ min: 1 }).withMessage("Selecciona el contrato."),
  body("wrkId").if((_value, { req }) => isSimpleCreate(req)).isInt({ min: 1 }).withMessage("Selecciona la obra."),
  body("prvId").if((_value, { req }) => isSimpleCreate(req)).isInt({ min: 1 }).withMessage("Selecciona el proveedor."),
  body("wksId").if((_value, { req }) => isSimpleCreate(req)).isInt({ min: 1 }).withMessage("Selecciona la etapa."),
  // Proveedor y etapa: de la factura simple (al crear y al editar). Si
  // aplican lo decide el service con el tipo guardado.
  optionalId("prvId"),
  optionalId("wksId"),
  body("number")
    .trim()
    .notEmpty()
    .withMessage("El número de la factura es requerido.")
    .isLength({ max: 50 })
    .withMessage("El número de la factura admite hasta 50 caracteres."),
  dateRule("date", "fecha de la factura"),
  optionalLongText("voucherNumber", "El número de comprobante", 50),
  optionalLongText("statement", "El extracto", 100),
  optionalLongText("description", "La descripción", 500),
  // Anticipo: valor. Liquidación: VALOR y amortización (DEC-044).
  moneyRule("value", "valor de la factura", { optional: true }),
  moneyRule("amortization", "valor de la amortización", { optional: true }),
  optionalLongText("amortizationObservation", "La observación del ajuste", 1000),
];

export const approveInvoiceSchema = [
  idempotencyKeyRule(),
  requiredId("invId"),
  dateRule("approvalDate", "fecha de aprobación"),
  optionalLongText("observation", "La observación", 1000),
];

export const cancelInvoiceSchema = [
  idempotencyKeyRule(),
  requiredId("invId"),
  requiredId("reaId").withMessage("Selecciona el motivo de la anulación."),
  body("observation")
    .trim()
    .notEmpty()
    .withMessage("La observación de la anulación es requerida.")
    .isLength({ max: 1000 })
    .withMessage("La observación admite hasta 1000 caracteres."),
];
