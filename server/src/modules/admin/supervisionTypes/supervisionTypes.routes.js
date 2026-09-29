import { createMasterRouter } from "../../../common/utils/masterRouter.utils.js";
import { supervisionTypesConfig, supervisionTypesService } from "./supervisionTypes.service.js";

// Rutas estándar de maestro (ver createMasterRouter), montadas en
// /api/admin/supervisionTypes.
const supervisionTypesRoutes = createMasterRouter(supervisionTypesConfig, supervisionTypesService);

export default supervisionTypesRoutes;
