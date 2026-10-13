import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../../common/middlewares/requirePermission.middleware.js";
import { validate } from "../../../common/middlewares/validate.middleware.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { ANY_CONTRACT_VIEW_PERMISSION, ANY_VIEW_PERMISSION, INVOICE_VIEWS, VIEW_PERMISSIONS } from "./invoiceViews.js";
import {
  paginationInvoicesSchema,
  getInvoiceSchema,
  selectInvoiceProvidersSchema,
  selectInvoiceContractsSchema,
  getContractAdvanceSchema,
  saveInvoiceSchema,
  approveInvoiceSchema,
  cancelInvoiceSchema,
} from "./invoices.validation.js";
import {
  paginationInvoicesController,
  getInvoiceController,
  selectInvoiceProvidersController,
  selectInvoiceContractsController,
  getContractAdvanceController,
  saveInvoiceController,
  approveInvoiceController,
  cancelInvoiceController,
} from "./invoices.controller.js";

// Facturas (DEC-042), montadas en /api/billing/invoices. Pipeline de
// ENDPOINT_STANDARD: verifyToken → requirePermission → esquema → validate →
// controller. Cada transición tiene su endpoint y su permiso
// (WORKFLOW_STANDARD, regla 3). No hay ruta de eliminar: una factura se anula.
//
// Vistas (DEC-054): el listado de una vista exige su permiso de ver; los
// endpoints comunes, cualquiera de los tres, y el service responde 404 a una
// factura de una vista que el usuario no ve.
const can = PERMISSIONS.billing.invoices;
const invoicesRoutes = express.Router();

// Una vista desconocida pide los tres permisos: la validación la rechaza después.
const viewPermission = (view) => VIEW_PERMISSIONS[view] ?? ANY_VIEW_PERMISSION;

invoicesRoutes.post(
  "/pagination_invoices",
  verifyToken,
  requirePermission((req) => (req.body.view ? viewPermission(req.body.view) : ANY_VIEW_PERMISSION)),
  paginationInvoicesSchema,
  validate,
  paginationInvoicesController
);
invoicesRoutes.get("/get_invoice", verifyToken, requirePermission(ANY_VIEW_PERMISSION), getInvoiceSchema, validate, getInvoiceController);
// Proveedores activos del alcance, para la factura simple.
invoicesRoutes.get(
  "/select_invoice_providers",
  verifyToken,
  requirePermission(VIEW_PERMISSIONS[INVOICE_VIEWS.SIMPLE]),
  selectInvoiceProvidersSchema,
  validate,
  selectInvoiceProvidersController
);
// Contratos cuyo tipo va al menú de la vista y cuyo estado admite el tipo de factura (ADR-0017).
invoicesRoutes.get(
  "/select_invoice_contracts",
  verifyToken,
  requirePermission((req) => viewPermission(req.query.view)),
  selectInvoiceContractsSchema,
  validate,
  selectInvoiceContractsController
);
// Saldos de anticipo del contrato y amortización por defecto (DEC-044).
invoicesRoutes.get(
  "/get_contract_advance",
  verifyToken,
  requirePermission(ANY_CONTRACT_VIEW_PERMISSION),
  getContractAdvanceSchema,
  validate,
  getContractAdvanceController
);
// save_invoice sirve registrar (invId 0) y editar.
invoicesRoutes.post(
  "/save_invoice",
  verifyToken,
  requirePermission((req) => (Number(req.body.invId) > 0 ? can.edit : can.create)),
  saveInvoiceSchema,
  validate,
  saveInvoiceController
);
invoicesRoutes.post("/approve_invoice", verifyToken, requirePermission(can.approve), approveInvoiceSchema, validate, approveInvoiceController);
// Anular: el permiso base aquí; el reforzado para una aprobada, en el service.
invoicesRoutes.post("/cancel_invoice", verifyToken, requirePermission(can.cancel), cancelInvoiceSchema, validate, cancelInvoiceController);

export default invoicesRoutes;
