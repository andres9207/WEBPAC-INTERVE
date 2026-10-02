import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../../common/middlewares/requirePermission.middleware.js";
import { validate } from "../../../common/middlewares/validate.middleware.js";
import { createMasterRouter } from "../../../common/utils/masterRouter.utils.js";
import { contractTypesConfig, contractTypesService } from "./contractTypes.service.js";
import { getContractTypeFieldsSchema, saveContractTypeFieldsSchema } from "./contractTypeFields.validation.js";
import { getContractTypeFieldsController, saveContractTypeFieldsController } from "./contractTypeFields.controller.js";

// Rutas estándar de maestro (ver createMasterRouter), montadas en
// /api/admin/contractTypes, más la configuración de campos del tipo
// (ADR-0006, DEC-037): verla exige ver tipos de contrato; guardarla, el
// permiso propio "Configurar campos".
const can = contractTypesConfig.permissions;
const contractTypesRoutes = createMasterRouter(contractTypesConfig, contractTypesService);

contractTypesRoutes.get(
  "/get_contract_type_fields",
  verifyToken,
  requirePermission(can.view),
  getContractTypeFieldsSchema,
  validate,
  getContractTypeFieldsController
);
contractTypesRoutes.put(
  "/save_contract_type_fields",
  verifyToken,
  requirePermission(can.configureFields),
  saveContractTypeFieldsSchema,
  validate,
  saveContractTypeFieldsController
);

export default contractTypesRoutes;
