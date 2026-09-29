import { createMasterRouter } from "../../../common/utils/masterRouter.utils.js";
import { identityDocumentsConfig, identityDocumentsService } from "./identityDocuments.service.js";

// Rutas estándar de maestro (ver createMasterRouter), montadas en
// /api/admin/identityDocuments.
const identityDocumentsRoutes = createMasterRouter(identityDocumentsConfig, identityDocumentsService);

export default identityDocumentsRoutes;
