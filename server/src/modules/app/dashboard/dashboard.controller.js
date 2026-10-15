import { getEffectivePermissionIds } from "../../../common/services/effectivePermissions.service.js";
import { workScopeOf } from "../../../common/services/workScope.service.js";
import * as dashboardService from "./dashboard.service.js";
import * as workDashboardService from "./workDashboard.service.js";

// Solo leen la petición y delegan. Los permisos efectivos deciden qué bloques
// se calculan (ADR-0002, decisión 8) y el alcance por obra, sobre qué
// registros (DEC-047).

const handle = (fn) => async (req, res, next) => {
  try {
    return res.status(200).json(await fn(req));
  } catch (err) {
    next(err);
  }
};

export const getDashboardSummaryController = handle(async (req) =>
  dashboardService.getDashboardSummary({
    granted: new Set(await getEffectivePermissionIds(req.user)),
    scope: await workScopeOf(req),
  })
);

// Tablero de la obra elegida (DEC-063): con "Ver todo" o sin obra, bloques en null.
export const getWorkDashboardController = handle(async (req) =>
  workDashboardService.getWorkDashboard({
    granted: new Set(await getEffectivePermissionIds(req.user)),
    scope: await workScopeOf(req),
  })
);
