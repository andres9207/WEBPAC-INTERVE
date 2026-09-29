import { createMasterRouter } from "../../../common/utils/masterRouter.utils.js";
import { insurersConfig, insurersService } from "./insurers.service.js";

// Rutas estándar de maestro (ver createMasterRouter), montadas en
// /api/admin/insurers.
const insurersRoutes = createMasterRouter(insurersConfig, insurersService);

export default insurersRoutes;
