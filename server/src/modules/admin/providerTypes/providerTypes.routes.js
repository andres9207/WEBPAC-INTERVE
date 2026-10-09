import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../../common/middlewares/requirePermission.middleware.js";
import { validate } from "../../../common/middlewares/validate.middleware.js";
import { createMasterRouter } from "../../../common/utils/masterRouter.utils.js";
import { providerTypesConfig, providerTypesService } from "./providerTypes.service.js";
import { getProviderTypeFieldsSchema, saveProviderTypeFieldsSchema } from "./providerTypeFields.validation.js";
import { getProviderTypeFieldsController, saveProviderTypeFieldsController } from "./providerTypeFields.controller.js";

// Rutas estándar de maestro (ver createMasterRouter), montadas en
// /api/admin/providerTypes, más la configuración de los campos del contrato
// del tipo (DEC-053): verla exige ver tipos de proveedor; guardarla, el
// permiso propio "Configurar campos".
const can = providerTypesConfig.permissions;
const providerTypesRoutes = createMasterRouter(providerTypesConfig, providerTypesService);

providerTypesRoutes.get(
  "/get_provider_type_fields",
  verifyToken,
  requirePermission(can.view),
  getProviderTypeFieldsSchema,
  validate,
  getProviderTypeFieldsController
);
providerTypesRoutes.put(
  "/save_provider_type_fields",
  verifyToken,
  requirePermission(can.configureFields),
  saveProviderTypeFieldsSchema,
  validate,
  saveProviderTypeFieldsController
);

export default providerTypesRoutes;
