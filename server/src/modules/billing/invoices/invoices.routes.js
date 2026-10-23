import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../../common/middlewares/requirePermission.middleware.js";
import { validate } from "../../../common/middlewares/validate.middleware.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import {
  paginationInvoicesSchema,
  exportInvoicesSchema,
  getInvoiceSchema,
  getInvoiceMenuSchema,
  selectInvoiceMenusSchema,
  selectInvoiceWorksSchema,
  getInvoiceFormOptionsSchema,
  selectInvoiceProvidersSchema,
  selectInvoiceFilterProvidersSchema,
  selectInvoiceContractsSchema,
  getContractAdvanceSchema,
  previewSimpleInvoiceSchema,
  saveInvoiceSchema,
  approveInvoiceSchema,
  cancelInvoiceSchema,
  deleteInvoiceSchema,
} from "./invoices.validation.js";
import {
  paginationInvoicesController,
  exportInvoicesController,
  getInvoiceController,
  getInvoiceMenuController,
  selectInvoiceMenusController,
  selectInvoiceWorksController,
  getInvoiceFormOptionsController,
  selectInvoiceProvidersController,
  selectInvoiceFilterProvidersController,
  selectInvoiceContractsController,
  getContractAdvanceController,
  previewSimpleInvoiceController,
  saveInvoiceController,
  approveInvoiceController,
  cancelInvoiceController,
  deleteInvoiceController,
  getInvoiceEvidenceController,
} from "./invoices.controller.js";

// Facturas (DEC-042), montadas en /api/billing/invoices. Pipeline de
// ENDPOINT_STANDARD: verifyToken → requirePermission → esquema → validate →
// controller. Cada transición tiene su endpoint y su permiso
// (WORKFLOW_STANDARD, regla 3). Eliminar es lógico y con permiso propio (DEC-068).
//
// Menús (DEC-074): uno por tipo de proveedor, todos con el mismo permiso de
// ver. Toda ruta lo exige, también las acciones: operar sobre una factura
// exige además verla.
const can = PERMISSIONS.billing.invoices;
const invoicesRoutes = express.Router();
const canView = requirePermission(can.view);

invoicesRoutes.post("/pagination_invoices", verifyToken, canView, paginationInvoicesSchema, validate, paginationInvoicesController);
// Reporte del listado de un menú en Excel o PDF (DEC-070).
invoicesRoutes.post("/export_invoices", verifyToken, canView, requirePermission(can.export), exportInvoicesSchema, validate, exportInvoicesController);
// Nombre y forma de facturar de un menú, también oculto (DEC-074): la pantalla se arma con ellos.
invoicesRoutes.get("/get_invoice_menu", verifyToken, canView, getInvoiceMenuSchema, validate, getInvoiceMenuController);
// Los menús visibles (tipos activos con la casilla), por nombre: los expedientes y el tablero eligen en cuál registrar.
invoicesRoutes.get("/select_invoice_menus", verifyToken, canView, selectInvoiceMenusSchema, validate, selectInvoiceMenusController);
invoicesRoutes.get("/get_invoice", verifyToken, canView, getInvoiceSchema, validate, getInvoiceController);
// Evidencia desde la bitácora (PRO-BE-39): permiso propio, además de ver facturas.
invoicesRoutes.get(
  "/get_invoice_evidence",
  verifyToken,
  canView,
  requirePermission(can.viewEvidence),
  getInvoiceSchema,
  validate,
  getInvoiceEvidenceController
);
// Obras activas del alcance, y etapas y proveedores asignados de una obra, para la factura simple (DEC-058).
invoicesRoutes.get("/select_invoice_works", verifyToken, canView, selectInvoiceWorksSchema, validate, selectInvoiceWorksController);
invoicesRoutes.get("/get_invoice_form_options", verifyToken, canView, getInvoiceFormOptionsSchema, validate, getInvoiceFormOptionsController);
// Filtro Proveedor del listado de un menú: proveedores con facturas de él.
invoicesRoutes.get(
  "/select_invoice_filter_providers",
  verifyToken,
  canView,
  selectInvoiceFilterProvidersSchema,
  validate,
  selectInvoiceFilterProvidersController
);
// Contratos firmados bajo el tipo del menú cuyo estado admite el tipo de factura (ADR-0017),
// y sus proveedores, que se eligen antes que el contrato.
invoicesRoutes.get("/select_invoice_providers", verifyToken, canView, selectInvoiceProvidersSchema, validate, selectInvoiceProvidersController);
invoicesRoutes.get("/select_invoice_contracts", verifyToken, canView, selectInvoiceContractsSchema, validate, selectInvoiceContractsController);
// Saldos de anticipo del contrato y amortización por defecto (DEC-044).
invoicesRoutes.get("/get_contract_advance", verifyToken, canView, getContractAdvanceSchema, validate, getContractAdvanceController);
// Panel Detalle de la factura simple (DEC-065): la composición del servidor mientras se escribe.
invoicesRoutes.post("/preview_simple_invoice", verifyToken, canView, previewSimpleInvoiceSchema, validate, previewSimpleInvoiceController);
// save_invoice sirve registrar (invId 0) y editar.
invoicesRoutes.post(
  "/save_invoice",
  verifyToken,
  canView,
  requirePermission((req) => (Number(req.body.invId) > 0 ? can.edit : can.create)),
  saveInvoiceSchema,
  validate,
  saveInvoiceController
);
invoicesRoutes.post("/approve_invoice", verifyToken, canView, requirePermission(can.approve), approveInvoiceSchema, validate, approveInvoiceController);
// Anular: el permiso base aquí; el reforzado para una aprobada, en el service.
invoicesRoutes.post("/cancel_invoice", verifyToken, canView, requirePermission(can.cancel), cancelInvoiceSchema, validate, cancelInvoiceController);
// Eliminar: el permiso base aquí; el reforzado para una aprobada, en el service.
invoicesRoutes.post("/delete_invoice", verifyToken, canView, requirePermission(can.delete), deleteInvoiceSchema, validate, deleteInvoiceController);

export default invoicesRoutes;
