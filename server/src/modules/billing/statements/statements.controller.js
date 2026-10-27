import { getIO } from "../../../common/configs/socket.manager.js";
import { auditContext } from "../../../common/services/audit.service.js";
import { IDEMPOTENCY_HEADER } from "../../../common/services/idempotency.service.js";
import { workScopeOf } from "../../../common/services/workScope.service.js";
import { sendExport } from "../../../common/services/export.service.js";
import * as statementsService from "./statements.service.js";

// Solo leen la petición y delegan (DEC-084). El autor sale de req.user; la
// clave de idempotencia, del encabezado (DEC-016); el alcance por obra, de
// workScopeOf (DEC-047).

// El extracto se muestra en las facturas: también se recargan.
const notify = () => {
  getIO().emit("refresh-statements", {});
  getIO().emit("refresh-invoices", {});
};

const handle = (fn) => async (req, res, next) => {
  try {
    return res.status(200).json(await fn(req));
  } catch (err) {
    next(err);
  }
};

// Como `handle`, pero responde el archivo del reporte (DEC-070).
const handleExport = (fn) => async (req, res, next) => {
  try {
    sendExport(res, await fn(req));
  } catch (err) {
    next(err);
  }
};

export const paginationStatementsController = handle(async (req) => {
  const { search, staId, wrkId, number, communication, rows, first, sortField, sortOrder } = req.body;
  return statementsService.paginationStatements({
    search,
    staId,
    wrkId,
    number,
    communication,
    rows,
    first,
    sortField,
    sortOrder,
    scope: await workScopeOf(req),
  });
});

export const getStatementController = handle(async (req) => statementsService.getStatement({ stmId: req.query.stmId, scope: await workScopeOf(req) }));

export const selectStatementsController = handle(async (req) =>
  statementsService.selectStatements({ wrkId: req.query.wrkId, includeId: req.query.includeId, scope: await workScopeOf(req) })
);

export const saveStatementController = handle(async (req) => {
  const { stmId, wrkId, number, date, communication, description } = req.body;
  const result = await statementsService.saveStatement({
    stmId,
    input: { wrkId, number, date, communication, description },
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notify();
  return result;
});

export const changeStatementStatusController = handle(async (req) => {
  const result = await statementsService.changeStatementStatus({
    stmId: req.body.stmId,
    staId: req.body.staId,
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
  });
  notify();
  return result;
});

export const deleteStatementController = handle(async (req) => {
  const result = await statementsService.deleteStatement({
    stmId: req.body.stmId,
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
  });
  notify();
  return result;
});

export const getStatementReportController = handle(async (req) =>
  statementsService.getStatementReport({ stmId: req.query.stmId, scope: await workScopeOf(req) })
);

export const exportStatementController = handleExport(async (req) =>
  statementsService.exportStatement({ stmId: req.body.stmId, format: req.body.format, scope: await workScopeOf(req) })
);

// Extractos escritos en las facturas (solo lectura): agrupados por obra y texto.
export const paginationStatementGroupsController = handle(async (req) => {
  const { search, wrkId, number, rows, first, sortField, sortOrder } = req.body;
  return statementsService.paginationStatementGroups({ search, wrkId, number, rows, first, sortField, sortOrder, scope: await workScopeOf(req) });
});

export const getStatementGroupReportController = handle(async (req) =>
  statementsService.getStatementGroupReport({ wrkId: req.query.wrkId, number: req.query.number, scope: await workScopeOf(req) })
);

export const exportStatementGroupController = handleExport(async (req) =>
  statementsService.exportStatementGroup({ wrkId: req.body.wrkId, number: req.body.number, format: req.body.format, scope: await workScopeOf(req) })
);
