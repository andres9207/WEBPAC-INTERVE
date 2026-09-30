import { createMasterRouter } from "../../../common/utils/masterRouter.utils.js";
import { contractTypesConfig, contractTypesService } from "./contractTypes.service.js";

// Rutas estándar de maestro (ver createMasterRouter), montadas en
// /api/admin/contractTypes.
const contractTypesRoutes = createMasterRouter(contractTypesConfig, contractTypesService);

export default contractTypesRoutes;
