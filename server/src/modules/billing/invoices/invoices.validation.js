import { body, query } from "express-validator";
import {
  paginationRules,
  optionalText,
  optionalId,
  optionalDate,
  requiredId,
  idempotencyKeyRule,
  moneyRule,
  percentRule,
} from "../../../common/utils/validation.utils.js";
import { INVOICE_STATES, INVOICE_TYPES, hasContract } from "./invoiceTerms.js";
import { CONTRACT_VIEWS, INVOICE_VIEWS } from "./invoiceViews.js";

// Forma y tipo de cada campo (ENDPOINT_STANDARD, paso 3). Las reglas de
// negocio (proveedor del alcance, estado del contrato, cronología…) viven en
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
  // Vista del listado (DEC-054); sin ella, todas las que el usuario ve (pestañas de los expedientes).
  body("view").optional({ values: "falsy" }).isIn(Object.values(INVOICE_VIEWS)).withMessage("La vista de facturas no es válida."),
  body("type").optional({ values: "falsy" }).isIn(Object.values(INVOICE_TYPES)).withMessage("El tipo de factura no es válido."),
  optionalId("wrkId"),
  optionalId("prvId"),
  optionalId("ctrId"),
  // Filtros por campo (DEC-048).
  optionalText("number", 50),
  optionalText("voucherNumber", 50),
  optionalText("statement", 100),
  optionalText("contractNumber", 50),
  optionalText("providerName", 255),
  optionalDate("dateFrom"),
  optionalDate("dateTo"),
  optionalDate("approvalDateFrom"),
  optionalDate("approvalDateTo"),
];

export const getInvoiceSchema = [query("invId").isInt({ min: 1 }).withMessage("invId es obligatorio y debe ser un entero positivo.")];

export const selectInvoiceWorksSchema = [
  query("search").optional({ values: "falsy" }).isString().isLength({ max: 100 }).withMessage("search admite hasta 100 caracteres."),
  query("prvId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("prvId debe ser un entero positivo."),
  query("includeWrkId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("includeWrkId debe ser un entero positivo."),
];

export const getInvoiceFormOptionsSchema = [
  query("wrkId").isInt({ min: 1 }).withMessage("wrkId es obligatorio y debe ser un entero positivo."),
  query("includeWksId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("includeWksId debe ser un entero positivo."),
  query("includePrvId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("includePrvId debe ser un entero positivo."),
];

const contractSelectRules = [
  // Sin tipo, los contratos que admiten alguno: el formulario elige el tipo después del contrato.
  query("type")
    .optional({ values: "falsy" })
    .isIn(Object.values(INVOICE_TYPES).filter(hasContract))
    .withMessage("El tipo debe ser uno de factura de contrato."),
  query("view").isIn(CONTRACT_VIEWS).withMessage("La vista debe ser contrato mayor o subcontratista."),
  query("search").optional({ values: "falsy" }).isString().isLength({ max: 100 }).withMessage("search admite hasta 100 caracteres."),
];

export const selectInvoiceProvidersSchema = [
  ...contractSelectRules,
  query("includePrvId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("includePrvId debe ser un entero positivo."),
];

// Filtro Proveedor del listado: la vista es obligatoria (cada listado es de una).
export const selectInvoiceFilterProvidersSchema = [
  query("view").isIn(Object.values(INVOICE_VIEWS)).withMessage("La vista de facturas no es válida."),
  query("search").optional({ values: "falsy" }).isString().isLength({ max: 100 }).withMessage("search admite hasta 100 caracteres."),
  query("includePrvId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("includePrvId debe ser un entero positivo."),
];

export const selectInvoiceContractsSchema = [
  ...contractSelectRules,
  query("prvId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("prvId debe ser un entero positivo."),
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
  // Tipo, contrato y obra solo se eligen al crear: después no cambian.
  body("type").if((_value, { req }) => isCreate(req)).isIn(Object.values(INVOICE_TYPES)).withMessage("Selecciona el tipo de factura."),
  body("ctrId").if((_value, { req }) => isContractCreate(req)).isInt({ min: 1 }).withMessage("Selecciona el contrato."),
  body("wrkId").if((_value, { req }) => isSimpleCreate(req)).isInt({ min: 1 }).withMessage("Selecciona la obra."),
  body("prvId").if((_value, { req }) => isSimpleCreate(req)).isInt({ min: 1 }).withMessage("Selecciona el proveedor."),
  // Proveedor y etapa: de la factura simple (DEC-058), al crear y al editar.
  // Si aplican lo decide el service con el tipo guardado; la etapa, además,
  // solo es obligatoria si la obra tiene etapas (DEC-069).
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
  // Anticipo y devolución de retenido: valor. Liquidación: VALOR,
  // amortización (DEC-044) y retenido (DEC-051).
  moneyRule("value", "valor de la factura", { optional: true }),
  moneyRule("amortization", "valor de la amortización", { optional: true }),
  optionalLongText("amortizationObservation", "La observación del ajuste", 1000),
  moneyRule("retention", "valor del retenido", { optional: true }),
  optionalLongText("retentionObservation", "La observación del ajuste del retenido", 1000),
  ...simpleAmountRules(),
];

/** Importes de la factura simple (DEC-065). Su obligatoriedad y sus rangos los decide el service. */
function simpleAmountRules() {
  return [
    percentRule("withholdingPct", "% de retención en la fuente", { optional: true }),
    moneyRule("discount", "descuento AI", { optional: true }),
    percentRule("vatPct", "% de IVA", { optional: true }),
    percentRule("vatWithholdingPct", "% de retención de IVA", { optional: true }),
    moneyRule("icaWithholding", "valor de la retención de ICA", { optional: true }),
    moneyRule("freight", "flete", { optional: true }),
    moneyRule("earlyPaymentDiscount", "descuento por pronto pago", { optional: true }),
  ];
}

// Previsualización de la factura simple: los mismos importes, sin guardar nada.
export const previewSimpleInvoiceSchema = [moneyRule("value", "valor de la factura", { optional: true }), ...simpleAmountRules()];

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

// Eliminar (DEC-068): sin clave de idempotencia, repetirla da 404.
export const deleteInvoiceSchema = [
  requiredId("invId"),
  body("observation")
    .trim()
    .notEmpty()
    .withMessage("La observación de la eliminación es requerida.")
    .isLength({ max: 1000 })
    .withMessage("La observación admite hasta 1000 caracteres."),
];
