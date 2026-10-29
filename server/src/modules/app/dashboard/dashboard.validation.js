import { query } from "express-validator";
import { MAX_ROWS } from "../../../common/utils/pagination.utils.js";
import { CONTRACT_STATES } from "../../work/contracts/contractTerms.js";
import { CONTRACT_POLICY_STATUS } from "../../work/contracts/policyTerms.js";
import { INVOICE_STATES } from "../../billing/invoices/invoiceTerms.js";
import { DETAIL_METRICS } from "./dashboardDetail.service.js";

const M = DETAIL_METRICS;
const forMetric = (...metrics) => (_value, { req }) => metrics.includes(req.query.metric);

// Detalle de una cifra del tablero general (DEC-052): la métrica y, según
// ella, su parámetro; la página y los filtros del panel (texto y obra).
export const getDashboardDetailSchema = [
  query("metric").isIn(Object.values(DETAIL_METRICS)).withMessage("La cifra del tablero no es válida."),
  query("state").if(forMetric(M.CONTRACTS_BY_STATE)).isIn(Object.values(CONTRACT_STATES)).withMessage("El estado del contrato no es válido."),
  query("policyStatus")
    .if(forMetric(M.CONTRACTS_POLICY_STATUS))
    .isIn(Object.values(CONTRACT_POLICY_STATUS))
    .withMessage("El estado de pólizas no es válido."),
  query("wrkId").if(forMetric(M.INVOICES_BY_WORK)).isInt({ min: 1 }).withMessage("wrkId es obligatorio y debe ser un entero positivo."),
  query("wrkId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("wrkId debe ser un entero positivo."),
  query("invoiceState")
    .if(forMetric(M.INVOICES_BY_WORK))
    .optional({ values: "falsy" })
    .isIn([INVOICE_STATES.REGISTERED, INVOICE_STATES.APPROVED])
    .withMessage("El estado de la factura no es válido."),
  query("search").optional({ values: "falsy" }).isString().isLength({ max: 100 }).withMessage("search admite hasta 100 caracteres."),
  query("page").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("page debe ser un entero positivo."),
  query("limit").optional({ values: "falsy" }).isInt({ min: 1, max: MAX_ROWS }).withMessage(`limit debe estar entre 1 y ${MAX_ROWS}.`),
];
