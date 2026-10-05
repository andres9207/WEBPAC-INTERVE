import { createMasterRouter } from "../../../common/utils/masterRouter.utils.js";
import { reasonsConfig, reasonsService } from "./reasons.service.js";

// Rutas estándar de maestro (ver createMasterRouter), montadas en
// /api/admin/reasons. El selector acepta ?scope=SUSPENSION.
const reasonsRoutes = createMasterRouter(reasonsConfig, reasonsService);

export default reasonsRoutes;
