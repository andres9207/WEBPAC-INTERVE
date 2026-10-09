import { createMasterRouter } from "../../../common/utils/masterRouter.utils.js";
import { contractTypesConfig, contractTypesService } from "./contractTypes.service.js";

// Rutas estándar de maestro (ver createMasterRouter), montadas en
// /api/admin/contractTypes. La configuración de campos del contrato ya no es
// del tipo de contrato: es del tipo de proveedor (DEC-053).
const contractTypesRoutes = createMasterRouter(contractTypesConfig, contractTypesService);

export default contractTypesRoutes;
