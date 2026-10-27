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
  exportFormatRule,
} from "../../../common/utils/validation.utils.js";
import { INVOICE_STATES, INVOICE_TYPES, hasContract } from "./invoiceTerms.js";
import { SIMPLE_PAIRS } from "./simpleInvoiceTerms.js";
import { INVOICE_ADVANCE_FILTERS } from "./advanceFilters.js";
import { CONTRACT_PAIRS } from "./contractInvoiceTerms.js";
import { decimal } from "../../../common/utils/money.utils.js";

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
  // Menú del listado: el tipo de proveedor (DEC-074); sin él, todos (pestañas de los expedientes).
  optionalId("pvtId"),
  body("type").optional({ values: "falsy" }).isIn(Object.values(INVOICE_TYPES)).withMessage("El tipo de factura no es válido."),
  optionalId("wrkId"),
  optionalId("prvId"),
  optionalId("ctrId"),
  // Filtros por campo (DEC-048).
  optionalText("number", 50),
  optionalText("voucherNumber", 50),
  optionalText("statement", 20),
  optionalText("contractNumber", 50),
  optionalText("providerName", 255),
  optionalDate("dateFrom"),
  optionalDate("dateTo"),
  optionalDate("approvalDateFrom"),
  optionalDate("approvalDateTo"),
  // Columnas de los importes (DEC-065, DEC-075): etapa (la de la factura o la de su contrato), nombre del contrato y
  // los importes guardados, por rango.
  optionalId("wksId"),
  optionalText("contractName", 200),
  ...["valueFrom", "valueTo", "discountFrom", "discountTo"].map((field) => moneyRule(field, `filtro ${field}`, { optional: true })),
  ...["vatPctFrom", "vatPctTo"].map((field) => percentRule(field, `filtro ${field}`, { optional: true })),
  // Anticipo, amortización y lo por aprobar de los dos.
  body("advance").optional({ values: "falsy" }).isIn(Object.values(INVOICE_ADVANCE_FILTERS)).withMessage("El filtro de anticipo no es válido."),
];

const menuQuery = () => query("pvtId").isInt({ min: 1 }).withMessage("pvtId es obligatorio: el menú de facturas.");

// Reporte del listado de un menú (DEC-070): los mismos filtros, el menú y el formato.
export const exportInvoicesSchema = [
  ...paginationInvoicesSchema,
  body("pvtId").isInt({ min: 1 }).withMessage("pvtId es obligatorio: el menú de facturas."),
  exportFormatRule(),
];

export const getInvoiceSchema = [query("invId").isInt({ min: 1 }).withMessage("invId es obligatorio y debe ser un entero positivo.")];

export const getInvoiceMenuSchema = [menuQuery()];

// Sin parámetros: los menús visibles (DEC-074).
export const selectInvoiceMenusSchema = [];

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
  menuQuery(),
  query("search").optional({ values: "falsy" }).isString().isLength({ max: 100 }).withMessage("search admite hasta 100 caracteres."),
];

export const selectInvoiceProvidersSchema = [
  ...contractSelectRules,
  query("includePrvId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("includePrvId debe ser un entero positivo."),
];

// Filtro Proveedor del listado: el menú es obligatorio (cada listado es de uno).
export const selectInvoiceFilterProvidersSchema = [
  menuQuery(),
  query("search").optional({ values: "falsy" }).isString().isLength({ max: 100 }).withMessage("search admite hasta 100 caracteres."),
  query("includePrvId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("includePrvId debe ser un entero positivo."),
];

// Filtro Etapa del listado: como el de proveedor.
export const selectInvoiceFilterStagesSchema = [
  menuQuery(),
  query("search").optional({ values: "falsy" }).isString().isLength({ max: 100 }).withMessage("search admite hasta 100 caracteres."),
  query("includeWksId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("includeWksId debe ser un entero positivo."),
];

export const selectInvoiceContractsSchema = [
  ...contractSelectRules,
  query("prvId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("prvId debe ser un entero positivo."),
  query("includeCtrId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("includeCtrId debe ser un entero positivo."),
];

const moneyQuery = (field, label) =>
  query(field)
    .optional({ values: "falsy" })
    .matches(/^\d{1,16}(\.\d+)?$/)
    .withMessage(`${label} debe ser un número no negativo, con punto decimal y hasta 16 dígitos enteros.`);
const percentQuery = (field, label) =>
  query(field)
    .optional({ values: "falsy" })
    .matches(/^\d{1,3}(\.\d{1,2})?$/)
    .withMessage(`${label} debe ser un número con hasta dos decimales.`)
    .bail()
    .custom((value) => decimal(value).lte(100))
    .withMessage(`${label} debe estar entre 0 y 100.`);

// Con la amortización o el retenido (o su %), también su valor y su % sobre
// el VALOR (DEC-065, "Valor y porcentaje").
export const getContractAdvanceSchema = [
  query("ctrId").isInt({ min: 1 }).withMessage("ctrId es obligatorio y debe ser un entero positivo."),
  query("invId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("invId debe ser un entero positivo."),
  moneyQuery("value", "El valor"),
  moneyQuery("amortization", "La amortización"),
  percentQuery("amortizationPct", "El % de amortización"),
  moneyQuery("retention", "El retenido"),
  percentQuery("retentionPct", "El % de retenido"),
];

export const saveInvoiceSchema = [
  idempotencyKeyRule(isCreate),
  body("invId").optional({ values: "falsy" }).isInt({ min: 0 }).withMessage("invId debe ser un entero."),
  // Tipo, contrato y obra solo se eligen al crear: después no cambian.
  body("type").if((_value, { req }) => isCreate(req)).isIn(Object.values(INVOICE_TYPES)).withMessage("Selecciona el tipo de factura."),
  body("ctrId").if((_value, { req }) => isContractCreate(req)).isInt({ min: 1 }).withMessage("Selecciona el contrato."),
  body("wrkId").if((_value, { req }) => isSimpleCreate(req)).isInt({ min: 1 }).withMessage("Selecciona la obra."),
  body("prvId").if((_value, { req }) => isSimpleCreate(req)).isInt({ min: 1 }).withMessage("Selecciona el proveedor."),
  // Menú desde el que se registra (DEC-074): el tipo de la simple, o el del
  // contrato (debe coincidir). Sin él (expedientes), lo resuelve el service.
  optionalId("pvtId"),
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
  // Extracto, texto libre (DEC-084): lo agrupa el extracto de la obra con ese número.
  optionalLongText("statement", "El extracto", 20),
  optionalLongText("description", "La descripción", 500),
  // Anticipo y devolución de retenido: valor. Liquidación: VALOR,
  // amortización (DEC-044) y retenido (DEC-051).
  moneyRule("value", "valor de la factura", { optional: true }),
  moneyRule("amortization", "valor de la amortización", { optional: true }),
  optionalLongText("amortizationObservation", "La observación del ajuste", 1000),
  moneyRule("retention", "valor del retenido", { optional: true }),
  optionalLongText("retentionObservation", "La observación del ajuste del retenido", 1000),
  ...simpleAmountRules(),
  ...contractTaxOnlyRules(),
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

// Previsualización de la factura simple: los mismos importes, sin guardar
// nada, y cada uno también por su otro lado, valor o % (DEC-065, "Valor y
// porcentaje"). Al guardar solo se acepta la forma de siempre.
export const previewSimpleInvoiceSchema = [
  moneyRule("value", "valor de la factura", { optional: true }),
  ...simpleAmountRules(),
  ...SIMPLE_PAIRS.map((pair) =>
    pair.stored === "percent" ? moneyRule(pair.alt, "valor", { optional: true }) : percentRule(pair.alt, "porcentaje", { optional: true })
  ),
];

/**
 * Importes de la normal y la liquidación que no comparten nombre con los de
 * la simple (DEC-075): el % IVA y las retenciones usan las reglas de arriba.
 */
function contractTaxOnlyRules() {
  return [percentRule("utilityPct", "% de utilidad", { optional: true }), moneyRule("materialsDiscount", "descuento de materiales", { optional: true })];
}

// Previsualización de la normal y la liquidación (DEC-075): como la de la
// simple, cada importe también por su otro lado.
export const previewContractInvoiceSchema = [
  moneyRule("value", "valor de la factura", { optional: true }),
  moneyRule("amortization", "valor de la amortización", { optional: true }),
  moneyRule("retention", "valor del retenido", { optional: true }),
  percentRule("vatPct", "% de IVA", { optional: true }),
  percentRule("withholdingPct", "% de retención en la fuente", { optional: true }),
  percentRule("vatWithholdingPct", "% de retención de IVA", { optional: true }),
  moneyRule("icaWithholding", "valor de la retención de ICA", { optional: true }),
  ...contractTaxOnlyRules(),
  ...CONTRACT_PAIRS.map((pair) =>
    pair.stored === "percent" ? moneyRule(pair.alt, "valor", { optional: true }) : percentRule(pair.alt, "porcentaje", { optional: true })
  ),
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

// Seguimiento de facturas (DEC-076). La fecha de cierre la pone el servidor: no se acepta.
const followUpDescription = () =>
  body("description").trim().notEmpty().withMessage("La descripción del seguimiento es requerida.").isLength({ max: 1000 }).withMessage("La descripción admite hasta 1000 caracteres.");
const followUpOpenDate = () => body("openDate").matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("La fecha de apertura es requerida (AAAA-MM-DD).");

export const listInvoiceFollowUpsSchema = [query("invId").isInt({ min: 1 }).withMessage("invId es obligatorio y debe ser un entero positivo.")];

export const openInvoiceFollowUpSchema = [idempotencyKeyRule(), requiredId("invId"), followUpOpenDate(), followUpDescription()];

export const updateInvoiceFollowUpSchema = [requiredId("ifuId"), followUpOpenDate(), followUpDescription()];

export const closeInvoiceFollowUpSchema = [
  requiredId("ifuId"),
  body("observation").trim().notEmpty().withMessage("La observación de cierre es requerida.").isLength({ max: 1000 }).withMessage("La observación admite hasta 1000 caracteres."),
];

export const deleteInvoiceFollowUpSchema = [requiredId("ifuId")];

// Glosas (DEC-085). La fecha de liberación la pone el servidor: no se acepta.
const glossRules = () => [
  optionalId("stmId"),
  optionalText("code", 20),
  // Con signo, como en WebPAC (un valor a favor o en contra); distinto de cero lo verifica el service.
  body("value")
    .customSanitizer((value) => (typeof value === "number" ? String(value) : value))
    .isString()
    .withMessage("El valor de la glosa es requerido.")
    .bail()
    .trim()
    .matches(/^-?\d{1,16}(\.\d+)?$/)
    .withMessage("El valor de la glosa debe ser un número, con punto decimal y hasta 16 dígitos enteros."),
  body("description").trim().notEmpty().withMessage("La descripción de la glosa es requerida.").isLength({ max: 1000 }).withMessage("La descripción admite hasta 1000 caracteres."),
];

export const listInvoiceGlossesSchema = [query("invId").isInt({ min: 1 }).withMessage("invId es obligatorio y debe ser un entero positivo.")];

export const createInvoiceGlossSchema = [idempotencyKeyRule(), requiredId("invId"), ...glossRules()];

export const updateInvoiceGlossSchema = [requiredId("iglId"), ...glossRules()];

export const releaseInvoiceGlossSchema = [
  requiredId("iglId"),
  requiredId("releaseStmId").withMessage("Selecciona el extracto en que se libera la glosa."),
  body("observation").trim().notEmpty().withMessage("La observación de la liberación es requerida.").isLength({ max: 1000 }).withMessage("La observación admite hasta 1000 caracteres."),
];

export const deleteInvoiceGlossSchema = [requiredId("iglId")];
