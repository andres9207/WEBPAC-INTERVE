import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { CONTRACT_INVOICE_VIEWS } from "../../admin/contractTypes/contractTypes.service.js";
import { INVOICE_TYPES } from "./invoiceTerms.js";

/**
 * Vistas de facturas (DEC-054), sin base de datos: cada factura pertenece a
 * una sola, y cada vista tiene su permiso de ver.
 *
 *   SIMPLE          la factura simple (sin contrato)
 *   MAJOR           las de un contrato cuyo tipo va al menú contrato mayor
 *   SUBCONTRACTOR   las de un contrato cuyo tipo va al menú subcontratistas
 *
 * La vista no se guarda en la factura: sale de su tipo y del menú de
 * facturas del tipo de su contrato (`ctt_invoice_view`; ADR-0022,
 * alternativa C descartada). Las acciones (crear,
 * aprobar, anular…) son comunes; operar sobre una factura exige además ver
 * su vista. Una factura de una vista que el usuario no ve responde 404, como
 * una fuera del alcance por obra.
 */

export const INVOICE_VIEWS = Object.freeze({
  SIMPLE: "SIMPLE",
  MAJOR: CONTRACT_INVOICE_VIEWS.MAJOR,
  SUBCONTRACTOR: CONTRACT_INVOICE_VIEWS.SUBCONTRACTOR,
});

const can = PERMISSIONS.billing.invoices;

export const VIEW_PERMISSIONS = Object.freeze({
  [INVOICE_VIEWS.SIMPLE]: can.viewSimple,
  [INVOICE_VIEWS.MAJOR]: can.viewMajor,
  [INVOICE_VIEWS.SUBCONTRACTOR]: can.viewSubcontractor,
});

/** Vistas de facturas de contrato: los menús de facturas de los tipos de contrato. */
export const CONTRACT_VIEWS = Object.freeze([INVOICE_VIEWS.MAJOR, INVOICE_VIEWS.SUBCONTRACTOR]);

/** Los tres permisos de ver: cualquiera abre los endpoints comunes (el service filtra). */
export const ANY_VIEW_PERMISSION = Object.freeze(Object.values(VIEW_PERMISSIONS));

/** Los de las vistas de contrato: saldos de un contrato y selector de contratos. */
export const ANY_CONTRACT_VIEW_PERMISSION = Object.freeze(CONTRACT_VIEWS.map((view) => VIEW_PERMISSIONS[view]));

/** Vista de una factura: la simple, o el menú de facturas del tipo de su contrato. */
export const viewOf = (type, contractInvoiceView) => (type === INVOICE_TYPES.SIMPLE ? INVOICE_VIEWS.SIMPLE : contractInvoiceView);

/** Prisma: el menú de facturas del tipo de un contrato, para leer la vista de una factura. */
export const CONTRACT_VIEW_SELECT = Object.freeze({ tbl_contract_types: { select: { ctt_invoice_view: true } } });

/** Vista de una fila de factura leída con `tbl_contracts: { select: CONTRACT_VIEW_SELECT… }`. */
export const viewOfRow = (row) => viewOf(row.inv_type, row.tbl_contracts?.tbl_contract_types?.ctt_invoice_view);

/** Vistas que el usuario ve, según sus permisos efectivos (`granted`, un Set de per_id). */
export const grantedViews = (granted) => Object.keys(VIEW_PERMISSIONS).filter((view) => granted?.has(VIEW_PERMISSIONS[view]));

const NONE = Object.freeze({ inv_id: { in: [] } });

/**
 * Filtro Prisma de las facturas de `views`. Una lista vacía, un filtro que no
 * devuelve nada; con las tres, ninguno. Sin lista (`undefined`: llamadas
 * internas, como un alcance ausente), sin restricción: los controllers
 * siempre la pasan.
 */
export const viewsWhere = (views) => {
  if (!views) return {};
  const list = [...new Set(views)];
  if (list.length === 0) return NONE;
  if (list.length === Object.keys(VIEW_PERMISSIONS).length) return {};
  return {
    OR: list.map((view) =>
      view === INVOICE_VIEWS.SIMPLE ? { inv_type: INVOICE_TYPES.SIMPLE } : { tbl_contracts: { tbl_contract_types: { ctt_invoice_view: view } } }
    ),
  };
};

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

/** ¿El usuario ve `view`? Sin lista (llamada interna), sí. */
export const seesView = (views, view) => !views || views.includes(view);

/** 404 si el usuario no ve `view`: no revela que el registro exista. */
export const assertViewGranted = (views, view, message) => {
  if (!seesView(views, view)) throw httpError(404, message);
};
