import { prisma } from "../configs/prismaClient.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../constants/status.constants.js";
import { PERMISSIONS } from "../constants/permissions.constants.js";
import { hasEffectivePermission } from "./effectivePermissions.service.js";

/**
 * Alcance por obra (DEC-047). Cada petición de `work/` y `billing/` trae en el
 * encabezado `X-Work-Id` la obra elegida en el selector del cliente; el
 * servidor decide qué puede ver y operar el usuario con ella:
 *
 *   { all: true,  wrkId: null }  "Ver todo": sin restricción (permiso viewAll)
 *   { all: false, wrkId: 8 }     Solo la obra 8
 *   { all: false, wrkId: null }  Nada: sin obra válida y sin el permiso
 *
 * El cliente nunca decide el alcance: solo propone la obra, y aquí se
 * comprueba que el usuario sea responsable activo de ella (principal o de
 * apoyo) o tenga el permiso de ver todas las obras.
 */

export const WORK_HEADER = "X-Work-Id";

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

/** Obras de las que el usuario es responsable activo, no eliminadas. */
const managedWhere = (useId) => ({
  sta_id: { not: DELETED_STATUS },
  tbl_work_managers: { some: { use_id: Number(useId), sta_id: ACTIVE_STATUS } },
});

export const canViewAllWorks = ({ useId, proId }) => hasEffectivePermission({ useId, proId, perId: PERMISSIONS.work.works.viewAll });

/** Alcance del usuario para la obra pedida (`requested`: valor del encabezado). */
export const resolveWorkScope = async ({ useId, proId }, requested) => {
  const wrkId = Number(requested) > 0 ? Number(requested) : null;
  if (await canViewAllWorks({ useId, proId })) {
    if (!wrkId) return { all: true, wrkId: null };
    const work = await prisma.tbl_works.findFirst({ where: { wrk_id: wrkId, sta_id: { not: DELETED_STATUS } }, select: { wrk_id: true } });
    return { all: false, wrkId: work ? wrkId : null };
  }
  if (!wrkId) return { all: false, wrkId: null };
  const managed = await prisma.tbl_works.findFirst({ where: { wrk_id: wrkId, ...managedWhere(useId) }, select: { wrk_id: true } });
  return { all: false, wrkId: managed ? wrkId : null };
};

/**
 * Alcance de la petición, resuelto una vez y guardado en `req.workScope`. Lo
 * llaman los controllers de `work/` y `billing/` (después de verifyToken) y
 * lo pasan al service, que filtra y verifica con él.
 */
export const workScopeOf = async (req) => {
  if (!req.workScope) req.workScope = await resolveWorkScope(req.user, req.get(WORK_HEADER));
  return req.workScope;
};

/**
 * Obras que el usuario puede elegir en el encabezado: con el permiso, todas
 * las no eliminadas, más la opción "Ver todo"; sin él, las suyas.
 */
export const selectMyWorks = async ({ useId, proId }) => {
  const viewAll = await canViewAllWorks({ useId, proId });
  const rows = await prisma.tbl_works.findMany({
    where: viewAll ? { sta_id: { not: DELETED_STATUS } } : managedWhere(useId),
    select: { wrk_id: true, wrk_code: true, wrk_name: true, sta_id: true },
    orderBy: [{ wrk_code: "asc" }],
  });
  return {
    viewAll,
    works: rows.map((row) => ({ value: row.wrk_id, label: `${row.wrk_code} - ${row.wrk_name}`, active: row.sta_id === ACTIVE_STATUS })),
  };
};

// ─── Uso desde los services ──────────────────────────────────────────────────

/** Sin alcance (llamadas internas, tests antiguos): sin restricción. */
const ALL = Object.freeze({ all: true, wrkId: null });
const scopeOf = (scope) => scope ?? ALL;

/**
 * Filtro Prisma de un listado por la obra del alcance. `field` es la columna
 * de la obra, o una función que arma el filtro (p. ej. proveedores, que se
 * llegan por su asignación a la obra). Sin obra válida: un filtro vacío que
 * no devuelve nada.
 */
export const scopeWhere = (scope, field = "wrk_id") => {
  const { all, wrkId } = scopeOf(scope);
  if (all) return {};
  const ids = wrkId ? [wrkId] : [];
  return typeof field === "function" ? field(ids) : { [field]: { in: ids } };
};

/** ¿La obra está dentro del alcance? */
export const inScope = (scope, wrkId) => {
  const { all, wrkId: scoped } = scopeOf(scope);
  return all || (scoped !== null && Number(wrkId) === scoped);
};

/**
 * 404 si la obra del registro está fuera del alcance: no revela que exista
 * (ENDPOINT_STANDARD, "id ajeno"). `message`: el mismo 404 que da el
 * registro inexistente.
 */
export const assertInScope = (scope, wrkId, message) => {
  if (!inScope(scope, wrkId)) throw httpError(404, message);
};

/** Ninguna de las obras está en el alcance (un proveedor fuera de la obra elegida). */
export const assertAnyInScope = (scope, wrkIds, message) => {
  if (!wrkIds.some((wrkId) => inScope(scope, wrkId))) throw httpError(404, message);
};
