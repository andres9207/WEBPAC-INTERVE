import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";

/**
 * Vistas de facturas (DEC-054, DEC-066): cada factura pertenece a una sola,
 * y cada vista tiene su permiso de ver.
 *
 *   SIMPLE          la factura simple (sin contrato)
 *   MAJOR           las de un contrato firmado bajo un tipo de menú contrato mayor
 *   SUBCONTRACTOR   las de un contrato firmado bajo un tipo de menú subcontratistas
 *
 * El menú es del tipo de proveedor (`pvt_invoice_view`): contrato mayor,
 * subcontratistas, simples o ninguno. El proveedor trabaja en cada obra con
 * los tipos de su asignación (`tbl_work_provider_types`), y cada contrato se
 * firma bajo uno de ellos con menú de contrato y guarda ese menú al crearse
 * (`ctr_invoice_view`). La factura de contrato toma el de su contrato y la
 * simple exige un tipo de menú simples en la asignación.
 *
 * La factura guarda su vista al registrarse (`inv_view`): es un hecho
 * histórico. Cambiar los tipos del proveedor o el menú de un tipo no mueve
 * contratos ni facturas. Las acciones (crear, aprobar, anular…) son comunes;
 * operar sobre una factura exige además ver su vista. Una factura de una
 * vista que el usuario no ve responde 404, como una fuera del alcance por obra.
 */

/** Menús que puede tener un tipo de proveedor (CHECK en la migración 0099). */
export const PROVIDER_INVOICE_VIEWS = Object.freeze({ MAJOR: "MAJOR", SUBCONTRACTOR: "SUBCONTRACTOR", SIMPLE: "SIMPLE" });

export const INVOICE_VIEWS = Object.freeze({
  SIMPLE: PROVIDER_INVOICE_VIEWS.SIMPLE,
  MAJOR: PROVIDER_INVOICE_VIEWS.MAJOR,
  SUBCONTRACTOR: PROVIDER_INVOICE_VIEWS.SUBCONTRACTOR,
});

const can = PERMISSIONS.billing.invoices;

export const VIEW_PERMISSIONS = Object.freeze({
  [INVOICE_VIEWS.SIMPLE]: can.viewSimple,
  [INVOICE_VIEWS.MAJOR]: can.viewMajor,
  [INVOICE_VIEWS.SUBCONTRACTOR]: can.viewSubcontractor,
});

/** Vistas de facturas de contrato: los menús con que se firma un contrato. */
export const CONTRACT_VIEWS = Object.freeze([INVOICE_VIEWS.MAJOR, INVOICE_VIEWS.SUBCONTRACTOR]);

/** ¿El menú de un tipo admite firmar contratos bajo él? */
export const isContractView = (view) => CONTRACT_VIEWS.includes(view);

/** Los tres permisos de ver: cualquiera abre los endpoints comunes (el service filtra). */
export const ANY_VIEW_PERMISSION = Object.freeze(Object.values(VIEW_PERMISSIONS));

/** Los de las vistas de contrato: saldos de un contrato y selector de contratos. */
export const ANY_CONTRACT_VIEW_PERMISSION = Object.freeze(CONTRACT_VIEWS.map((view) => VIEW_PERMISSIONS[view]));

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
  return { inv_view: { in: list } };
};

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

/** ¿El usuario ve `view`? Sin lista (llamada interna), sí. */
export const seesView = (views, view) => !views || views.includes(view);

/** 404 si el usuario no ve `view`: no revela que el registro exista. */
export const assertViewGranted = (views, view, message) => {
  if (!seesView(views, view)) throw httpError(404, message);
};
