import { createMasterRouter } from "../../../common/utils/masterRouter.utils.js";
import { addressTypesConfig, addressTypesService } from "./addressTypes.service.js";

// Rutas estándar de maestro (ver createMasterRouter), montadas en
// /api/admin/addressTypes.
const addressTypesRoutes = createMasterRouter(addressTypesConfig, addressTypesService);

export default addressTypesRoutes;
