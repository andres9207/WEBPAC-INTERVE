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
  selectInvoiceFilterStagesSchema,
  selectInvoiceContractsSchema,
  getContractAdvanceSchema,
  previewSimpleInvoiceSchema,
  previewContractInvoiceSchema,
  saveInvoiceSchema,
  approveInvoiceSchema,
  cancelInvoiceSchema,
  deleteInvoiceSchema,
  listInvoiceFollowUpsSchema,
  openInvoiceFollowUpSchema,
  updateInvoiceFollowUpSchema,
  closeInvoiceFollowUpSchema,
  deleteInvoiceFollowUpSchema,
  listInvoiceGlossesSchema,
  createInvoiceGlossSchema,
  updateInvoiceGlossSchema,
  releaseInvoiceGlossSchema,
  deleteInvoiceGlossSchema,
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
  selectInvoiceFilterStagesController,
  selectInvoiceContractsController,
  getContractAdvanceController,
  previewSimpleInvoiceController,
  previewContractInvoiceController,
  saveInvoiceController,
  approveInvoiceController,
  cancelInvoiceController,
  deleteInvoiceController,
  getInvoiceEvidenceController,
  listInvoiceFollowUpsController,
  openInvoiceFollowUpController,
  updateInvoiceFollowUpController,
  closeInvoiceFollowUpController,
  deleteInvoiceFollowUpController,
  listInvoiceGlossesController,
  createInvoiceGlossController,
  updateInvoiceGlossController,
  releaseInvoiceGlossController,
  deleteInvoiceGlossController,
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
// Filtro Etapa del listado de un menú: etapas con facturas de él, propias o por su contrato.
invoicesRoutes.get("/select_invoice_filter_stages", verifyToken, canView, selectInvoiceFilterStagesSchema, validate, selectInvoiceFilterStagesController);
// Contratos firmados bajo el tipo del menú cuyo estado admite el tipo de factura (ADR-0017),
// y sus proveedores, que se eligen antes que el contrato.
invoicesRoutes.get("/select_invoice_providers", verifyToken, canView, selectInvoiceProvidersSchema, validate, selectInvoiceProvidersController);
invoicesRoutes.get("/select_invoice_contracts", verifyToken, canView, selectInvoiceContractsSchema, validate, selectInvoiceContractsController);
// Saldos de anticipo del contrato y amortización por defecto (DEC-044).
invoicesRoutes.get("/get_contract_advance", verifyToken, canView, getContractAdvanceSchema, validate, getContractAdvanceController);
// Panel Detalle de la factura simple (DEC-065): la composición del servidor mientras se escribe.
invoicesRoutes.post("/preview_simple_invoice", verifyToken, canView, previewSimpleInvoiceSchema, validate, previewSimpleInvoiceController);
// Panel Detalle de la normal y la liquidación (DEC-075), con el mismo criterio.
invoicesRoutes.post("/preview_contract_invoice", verifyToken, canView, previewContractInvoiceSchema, validate, previewContractInvoiceController);
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

// Seguimiento (DEC-076): verlo con ver facturas; abrir, editar, cerrar y eliminar, además con gestionar seguimientos.
const canManageFollowUps = requirePermission(can.manageFollowUps);
invoicesRoutes.get("/list_invoice_follow_ups", verifyToken, canView, listInvoiceFollowUpsSchema, validate, listInvoiceFollowUpsController);
invoicesRoutes.post("/open_invoice_follow_up", verifyToken, canView, canManageFollowUps, openInvoiceFollowUpSchema, validate, openInvoiceFollowUpController);
invoicesRoutes.post("/update_invoice_follow_up", verifyToken, canView, canManageFollowUps, updateInvoiceFollowUpSchema, validate, updateInvoiceFollowUpController);
invoicesRoutes.post("/close_invoice_follow_up", verifyToken, canView, canManageFollowUps, closeInvoiceFollowUpSchema, validate, closeInvoiceFollowUpController);
invoicesRoutes.post("/delete_invoice_follow_up", verifyToken, canView, canManageFollowUps, deleteInvoiceFollowUpSchema, validate, deleteInvoiceFollowUpController);

// Glosas (DEC-085): verlas con ver facturas; levantar, editar, liberar y eliminar, además con gestionar glosas.
const canManageGlosses = requirePermission(can.manageGlosses);
invoicesRoutes.get("/list_invoice_glosses", verifyToken, canView, listInvoiceGlossesSchema, validate, listInvoiceGlossesController);
invoicesRoutes.post("/create_invoice_gloss", verifyToken, canView, canManageGlosses, createInvoiceGlossSchema, validate, createInvoiceGlossController);
invoicesRoutes.post("/update_invoice_gloss", verifyToken, canView, canManageGlosses, updateInvoiceGlossSchema, validate, updateInvoiceGlossController);
invoicesRoutes.post("/release_invoice_gloss", verifyToken, canView, canManageGlosses, releaseInvoiceGlossSchema, validate, releaseInvoiceGlossController);
invoicesRoutes.post("/delete_invoice_gloss", verifyToken, canView, canManageGlosses, deleteInvoiceGlossSchema, validate, deleteInvoiceGlossController);

export default invoicesRoutes;
