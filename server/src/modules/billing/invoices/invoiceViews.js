import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, writeAudit } from "../../../common/services/audit.service.js";
import { INVOICE_TYPES } from "./invoiceTerms.js";

/**
 * Vistas de facturas (DEC-054, DEC-056): cada factura pertenece a una sola,
 * y cada vista tiene su permiso de ver.
 *
 *   SIMPLE          la factura simple (sin contrato)
 *   MAJOR           las de un proveedor cuyos tipos van al menú contrato mayor
 *   SUBCONTRACTOR   las de un proveedor cuyos tipos van al menú subcontratistas
 *
 * El menú de facturas es del tipo de proveedor (`pvt_invoice_view`). Un
 * proveedor no puede tener tipos con menús distintos; sus tipos sin menú no
 * cuentan, y si ninguno lo tiene, no admite facturas de contrato.
 *
 * La factura guarda su vista al registrarse (`inv_view`): es un hecho
 * histórico. Si después cambia el menú de su proveedor (sus tipos, o el menú
 * de uno de ellos), el usuario decide mover todas sus facturas al menú nuevo
 * o dejarlas como histórico (`applyProviderViewChanges`). Las acciones
 * (crear, aprobar, anular…) son comunes; operar sobre una factura exige
 * además ver su vista. Una factura de una vista que el usuario no ve
 * responde 404, como una fuera del alcance por obra.
 */

/** Menús que puede tener un tipo de proveedor (CHECK en la migración 0092). */
export const PROVIDER_INVOICE_VIEWS = Object.freeze({ MAJOR: "MAJOR", SUBCONTRACTOR: "SUBCONTRACTOR" });

export const INVOICE_VIEWS = Object.freeze({
  SIMPLE: "SIMPLE",
  MAJOR: PROVIDER_INVOICE_VIEWS.MAJOR,
  SUBCONTRACTOR: PROVIDER_INVOICE_VIEWS.SUBCONTRACTOR,
});

const VIEW_NAMES = Object.freeze({
  [INVOICE_VIEWS.SIMPLE]: "facturas simples",
  [INVOICE_VIEWS.MAJOR]: "facturas contrato mayor",
  [INVOICE_VIEWS.SUBCONTRACTOR]: "facturas subcontratistas",
});
const viewName = (view) => (view ? VIEW_NAMES[view] : "sin menú");

const can = PERMISSIONS.billing.invoices;

export const VIEW_PERMISSIONS = Object.freeze({
  [INVOICE_VIEWS.SIMPLE]: can.viewSimple,
  [INVOICE_VIEWS.MAJOR]: can.viewMajor,
  [INVOICE_VIEWS.SUBCONTRACTOR]: can.viewSubcontractor,
});

/** Vistas de facturas de contrato: los menús de los tipos de proveedor. */
export const CONTRACT_VIEWS = Object.freeze([INVOICE_VIEWS.MAJOR, INVOICE_VIEWS.SUBCONTRACTOR]);

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

const httpError = (statusCode, message, data) => Object.assign(new Error(message), { statusCode, ...(data !== undefined && { data }) });

/** ¿El usuario ve `view`? Sin lista (llamada interna), sí. */
export const seesView = (views, view) => !views || views.includes(view);

/** 404 si el usuario no ve `view`: no revela que el registro exista. */
export const assertViewGranted = (views, view, message) => {
  if (!seesView(views, view)) throw httpError(404, message);
};

// ─── Menú del proveedor ──────────────────────────────────────────────────────

/** Prisma: los tipos de un proveedor con su menú, para `providerViewOf`. */
export const PROVIDER_VIEW_SELECT = Object.freeze({
  tbl_provider_classifications: { select: { pvt_id: true, tbl_provider_types: { select: { pvt_invoice_view: true } } } },
});

/**
 * Menú de un proveedor a partir de los menús de sus tipos (null los que no
 * tienen): el único que aparezca, o null si ninguno. Dos distintos es un
 * proveedor mezclado: `null` en `mixed` para que el llamador decida el
 * mensaje.
 */
export const resolveProviderView = (menus) => {
  const distinct = [...new Set(menus.filter(Boolean))];
  return { view: distinct.length === 1 ? distinct[0] : null, mixed: distinct.length > 1 };
};

/** Menú de un proveedor leído con `PROVIDER_VIEW_SELECT`; null si no tiene o está mezclado. */
export const providerViewOf = (provider) =>
  resolveProviderView((provider?.tbl_provider_classifications ?? []).map((c) => c.tbl_provider_types?.pvt_invoice_view)).view;

/** Filtro Prisma de los proveedores cuyo menú es `view` (sin mezcla, basta con que un tipo lo tenga). */
export const providerViewWhere = (view) => ({ tbl_provider_classifications: { some: { tbl_provider_types: { pvt_invoice_view: view } } } });

/** 409 si los tipos de un proveedor apuntan a menús distintos. */
export const assertNotMixed = (menus, providerName) => {
  if (resolveProviderView(menus).mixed) {
    throw httpError(
      409,
      `${providerName ? `El proveedor "${providerName}"` : "El proveedor"} quedaría con tipos de menús de facturas distintos (contrato mayor y subcontratistas): un proveedor solo puede tener tipos de un mismo menú.`
    );
  }
};

// ─── Cambio de menú de un proveedor ──────────────────────────────────────────

/** Qué hacer con las facturas de contrato cuando cambia el menú de su proveedor. */
export const INVOICE_MOVES = Object.freeze({ MOVE: "MOVE", KEEP: "KEEP" });

/** Código del 409 que pide la decisión: el cliente pregunta y reenvía con `invoiceMove`. */
export const INVOICE_VIEW_CHANGE = "INVOICE_VIEW_CHANGE";

/**
 * Aplica un cambio de menú de uno o varios proveedores (`changes`: `{ prvId,
 * name, from, to }`), con los proveedores o sus tipos ya bloqueados. Las
 * facturas afectadas son las de contrato de esos proveedores que no están ya
 * en el menú nuevo.
 *
 * - Sin facturas afectadas, no pide nada.
 * - Con facturas y sin `invoiceMove`: 409 con `code: INVOICE_VIEW_CHANGE`,
 *   cuántas y de qué proveedores, para que el usuario elija.
 * - `MOVE`: todas pasan al menú nuevo, con una entrada de bitácora por
 *   factura. No se puede si el proveedor queda sin menú.
 * - `KEEP`: no se tocan; quedan como histórico en el menú en que se
 *   registraron. Las nuevas van al menú nuevo.
 */
export const applyProviderViewChanges = async (tx, { changes, invoiceMove, ctx, operationId }) => {
  const changed = changes.filter((change) => change.from !== change.to);
  if (changed.length === 0) return { moved: 0 };

  const affected = [];
  for (const change of changed) {
    const invoices = await tx.tbl_invoices.findMany({
      where: { prv_id: change.prvId, inv_type: { not: INVOICE_TYPES.SIMPLE }, NOT: change.to ? { inv_view: change.to } : undefined },
      select: { inv_id: true, inv_view: true },
    });
    if (invoices.length > 0) affected.push({ ...change, invoices });
  }
  if (affected.length === 0) return { moved: 0 };

  const total = affected.reduce((sum, a) => sum + a.invoices.length, 0);
  if (!invoiceMove) {
    const detail = affected.map((a) => `${a.name ?? `proveedor ${a.prvId}`}: ${a.invoices.length}, de ${viewName(a.from)} a ${viewName(a.to)}`).join("; ");
    throw httpError(409, `El cambio mueve el menú de facturas de proveedores con ${total} factura(s) de contrato (${detail}). Elige si las mueves todas al menú nuevo o las dejas como histórico.`, {
      code: INVOICE_VIEW_CHANGE,
      invoices: total,
      providers: affected.map((a) => ({ prvId: a.prvId, name: a.name ?? null, from: a.from, to: a.to, invoices: a.invoices.length })),
      canMove: affected.every((a) => a.to),
    });
  }
  if (invoiceMove === INVOICE_MOVES.KEEP) return { moved: 0, kept: total };

  const orphan = affected.find((a) => !a.to);
  if (orphan) {
    throw httpError(409, `${orphan.name ? `El proveedor "${orphan.name}"` : "El proveedor"} queda sin menú de facturas: sus facturas no se pueden mover; déjalas como histórico.`);
  }
  for (const a of affected) {
    const ids = a.invoices.map((i) => i.inv_id);
    await tx.tbl_invoices.updateMany({ where: { inv_id: { in: ids } }, data: { inv_view: a.to } });
    for (const invoice of a.invoices) {
      await writeAudit(tx, {
        operationId,
        entity: AUDIT_ENTITIES.INVOICE,
        recordId: invoice.inv_id,
        operation: AUDIT_OPERATIONS.UPDATE,
        ctx,
        changes: [{ field: "inv_view", oldValue: invoice.inv_view, newValue: a.to }],
      });
    }
  }
  return { moved: total };
};
