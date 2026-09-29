import { createMasterRouter } from "../../../common/utils/masterRouter.utils.js";
import { constructionCompaniesConfig, constructionCompaniesService } from "./constructionCompanies.service.js";

// Rutas estándar de maestro (ver createMasterRouter), montadas en
// /api/admin/constructionCompanies.
const constructionCompaniesRoutes = createMasterRouter(constructionCompaniesConfig, constructionCompaniesService);

export default constructionCompaniesRoutes;
