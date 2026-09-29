import { createMasterRouter } from "../../../common/utils/masterRouter.utils.js";
import { providerTypesConfig, providerTypesService } from "./providerTypes.service.js";

// Rutas estándar de maestro (ver createMasterRouter), montadas en
// /api/admin/providerTypes.
const providerTypesRoutes = createMasterRouter(providerTypesConfig, providerTypesService);

export default providerTypesRoutes;
