import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../../common/middlewares/requirePermission.middleware.js";
import { validate } from "../../../common/middlewares/validate.middleware.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import {
  paginationInvoicesSchema,
  getInvoiceSchema,
  selectInvoiceWorksSchema,
  getInvoiceFormOptionsSchema,
  selectInvoiceContractsSchema,
  getContractAdvanceSchema,
  saveInvoiceSchema,
  approveInvoiceSchema,
  cancelInvoiceSchema,
} from "./invoices.validation.js";
import {
  paginationInvoicesController,
  getInvoiceController,
  selectInvoiceWorksController,
  getInvoiceFormOptionsController,
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
const can = PERMISSIONS.billing.invoices;
const invoicesRoutes = express.Router();

invoicesRoutes.post("/pagination_invoices", verifyToken, requirePermission(can.view), paginationInvoicesSchema, validate, paginationInvoicesController);
invoicesRoutes.get("/get_invoice", verifyToken, requirePermission(can.view), getInvoiceSchema, validate, getInvoiceController);
// Obras activas, y etapas y proveedores de una obra, para la factura simple.
invoicesRoutes.get("/select_invoice_works", verifyToken, requirePermission(can.view), selectInvoiceWorksSchema, validate, selectInvoiceWorksController);
invoicesRoutes.get(
  "/get_invoice_form_options",
  verifyToken,
  requirePermission(can.view),
  getInvoiceFormOptionsSchema,
  validate,
  getInvoiceFormOptionsController
);
// Contratos cuyo estado admite el tipo de factura (ADR-0017).
invoicesRoutes.get(
  "/select_invoice_contracts",
  verifyToken,
  requirePermission(can.view),
  selectInvoiceContractsSchema,
  validate,
  selectInvoiceContractsController
);
// Saldos de anticipo del contrato y amortización por defecto (DEC-044).
invoicesRoutes.get(
  "/get_contract_advance",
  verifyToken,
  requirePermission(can.view),
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
