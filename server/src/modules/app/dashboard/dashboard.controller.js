import { getEffectivePermissionIds } from "../../../common/services/effectivePermissions.service.js";
import { workScopeOf } from "../../../common/services/workScope.service.js";
import * as dashboardService from "./dashboard.service.js";

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
