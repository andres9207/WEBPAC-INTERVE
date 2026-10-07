import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../../common/middlewares/requirePermission.middleware.js";
import { validate } from "../../../common/middlewares/validate.middleware.js";
import { createMasterRouter } from "../../../common/utils/masterRouter.utils.js";
import { policyTypesConfig, policyTypesService } from "./policyTypes.service.js";
import { configurePolicyTypeBaseSchema } from "./policyTypes.validation.js";
import { configurePolicyTypeBaseController } from "./policyTypes.controller.js";

// Rutas estándar de maestro (ver createMasterRouter), montadas en
// /api/admin/policyTypes, más el cambio de base de cálculo con su permiso
// propio (ADR-0019, "Autorización"; DEC-050).
const can = policyTypesConfig.permissions;
const policyTypesRoutes = createMasterRouter(policyTypesConfig, policyTypesService);

policyTypesRoutes.put(
  "/configure_policy_type_base",
  verifyToken,
  requirePermission(can.configureBase),
  configurePolicyTypeBaseSchema,
  validate,
  configurePolicyTypeBaseController
);

export default policyTypesRoutes;
