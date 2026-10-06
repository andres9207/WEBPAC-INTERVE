import { getIO } from "../../../common/configs/socket.manager.js";
import { auditContext } from "../../../common/services/audit.service.js";
import { getEffectivePermissionIds } from "../../../common/services/effectivePermissions.service.js";
import { IDEMPOTENCY_HEADER } from "../../../common/services/idempotency.service.js";
import * as worksService from "./works.service.js";

// Solo leen la petición y delegan. El autor y sus permisos salen de req.user
// (DEC-005); la clave de idempotencia, del encabezado (DEC-016).

const notify = () => getIO().emit("refresh-works", {});

const handle = (fn) => async (req, res, next) => {
  try {
    return res.status(200).json(await fn(req));
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

export const paginationWorksController = handle((req) => {
  const { search, staId, rows, first, sortField, sortOrder } = req.body;
  return worksService.paginationWorks({ search, staId, rows, first, sortField, sortOrder });
});

export const summaryWorksController = handle(() => worksService.summaryWorks());

export const getWorkController = handle((req) => worksService.getWork({ wrkId: req.query.wrkId }));

export const previewWorkEndDateController = handle((req) => {
  const { startDate, initialTerm, termUnit } = req.query;
  return worksService.previewWorkEndDate({ startDate, initialTerm, termUnit });
});

export const selectWorkManagersController = handle((req) => worksService.selectWorkManagers({ search: req.query.search }));

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
    ctx: auditContext(req),
  });
  notify();
  return result;
});

export const deleteWorkController = handle(async (req) => {
  const result = await worksService.deleteWork({ wrkId: req.body.wrkId, useBy: req.user.useId, ctx: auditContext(req) });
  notify();
  return result;
});
