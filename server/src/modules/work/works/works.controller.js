import { getIO } from "../../../common/configs/socket.manager.js";
import { auditContext } from "../../../common/services/audit.service.js";
import { getEffectivePermissionIds } from "../../../common/services/effectivePermissions.service.js";
import { IDEMPOTENCY_HEADER } from "../../../common/services/idempotency.service.js";
import { selectMyWorks, workScopeOf } from "../../../common/services/workScope.service.js";
import { sendExport } from "../../../common/services/export.service.js";
import * as worksService from "./works.service.js";

// Solo leen la petición y delegan. El autor y sus permisos salen de req.user
// (DEC-005); la clave de idempotencia, del encabezado (DEC-016); el alcance
// por obra, de workScopeOf (DEC-047).

const notify = () => getIO().emit("refresh-works", {});

const handle = (fn) => async (req, res, next) => {
  try {
    return res.status(200).json(await fn(req));
  } catch (err) {
    next(err);
  }
};

// Como `handle`, pero responde el archivo del reporte (DEC-070) en vez de JSON.
const handleExport = (fn) => async (req, res, next) => {
  try {
    sendExport(res, await fn(req));
  } catch (err) {
    next(err);
  }
};

// Campos de la obra que el service acepta. Nada más del body llega al service.
const INPUT_FIELDS = [
  "code",
  "name",
  "cncId",
  "cttId",
  "sptId",
  "startDate",
  "area",
  "directCost",
  "initialTerm",
  "termUnit",
  "extendedTerm",
  "initialValue",
  "extendedValue",
  "maxServiceOrderValue",
  "managers",
  "stages",
  "contacts",
];

// Filtros, búsqueda, pestaña y orden del listado: los mismos para la página y el reporte (DEC-070).
const WORK_LIST_FIELDS = [
  "search",
  "staId",
  "code",
  "name",
  "cncId",
  "cttId",
  "sptId",
  "state",
  "initialValueFrom",
  "initialValueTo",
  "extendedValueFrom",
  "extendedValueTo",
  "maxServiceOrderValueFrom",
  "maxServiceOrderValueTo",
  "directCostFrom",
  "directCostTo",
  "startDateFrom",
  "startDateTo",
  "useId",
  "prvId",
  "sortField",
  "sortOrder",
];
const workListFilters = (body) => Object.fromEntries(WORK_LIST_FIELDS.map((field) => [field, body[field]]));

export const paginationWorksController = handle(async (req) => {
  const { rows, first } = req.body;
  return worksService.paginationWorks({ ...workListFilters(req.body), rows, first, scope: await workScopeOf(req) });
});

export const exportWorksController = handleExport(async (req) => {
  return worksService.exportWorks({ ...workListFilters(req.body), format: req.body.format, scope: await workScopeOf(req) });
});

export const summaryWorksController = handle(async (req) => worksService.summaryWorks({ scope: await workScopeOf(req) }));

export const getWorkController = handle(async (req) => worksService.getWork({ wrkId: req.query.wrkId, scope: await workScopeOf(req) }));

// Obras que el usuario puede elegir en el encabezado (DEC-047).
export const selectMyWorksController = handle((req) => selectMyWorks(req.user));

export const previewWorkEndDateController = handle((req) => {
  const { startDate, initialTerm, termUnit, endDate } = req.query;
  return worksService.previewWorkEndDate({ startDate, initialTerm, termUnit, endDate });
});

export const selectWorkManagersController = handle((req) => worksService.selectWorkManagers({ search: req.query.search }));

export const selectWorkFilterManagersController = handle(async (req) =>
  worksService.selectWorkFilterManagers({ search: req.query.search, includeUseId: req.query.includeUseId, scope: await workScopeOf(req) })
);

export const selectWorkFilterProvidersController = handle(async (req) =>
  worksService.selectWorkFilterProviders({ search: req.query.search, includePrvId: req.query.includePrvId, scope: await workScopeOf(req) })
);

export const saveWorkController = handle(async (req) => {
  const { useId, proId } = req.user;
  // Asignar o retirar responsables y gestionar etapas tienen permiso propio:
  // el service decide cuál exige según lo que realmente cambia.
  const granted = new Set(await getEffectivePermissionIds({ useId, proId }));
  const result = await worksService.saveWork({
    wrkId: req.body.wrkId,
    input: Object.fromEntries(INPUT_FIELDS.map((field) => [field, req.body[field]])),
    useBy: useId,
    granted,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notify();
  return result;
});

export const changeWorkStatusController = handle(async (req) => {
  const result = await worksService.changeWorkStatus({
    wrkId: req.body.wrkId,
    staId: req.body.staId,
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
  });
  notify();
  return result;
});

export const changeWorkStateController = handle(async (req) => {
  const result = await worksService.changeWorkState({
    wrkId: req.body.wrkId,
    state: req.body.state,
    finishDate: req.body.finishDate,
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
  });
  notify();
  return result;
});

export const deleteWorkController = handle(async (req) => {
  const result = await worksService.deleteWork({
    wrkId: req.body.wrkId,
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
  });
  notify();
  return result;
});
