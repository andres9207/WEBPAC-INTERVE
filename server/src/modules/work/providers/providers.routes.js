import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../../common/middlewares/requirePermission.middleware.js";
import { validate } from "../../../common/middlewares/validate.middleware.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import {
  paginationProvidersSchema,
  getProviderSchema,
  checkIdentificationSchema,
  selectProvidersSchema,
  selectAssignableWorksSchema,
  saveProviderSchema,
  changeProviderStatusSchema,
  deleteProviderSchema,
  paginationWorkProvidersSchema,
  assignProviderSchema,
  updateWorkProviderSchema,
  unassignProviderSchema,
} from "./providers.validation.js";
import {
  paginationProvidersController,
  getProviderController,
  checkIdentificationController,
  selectProvidersController,
  selectAssignableWorksController,
  saveProviderController,
  changeProviderStatusController,
  deleteProviderController,
  paginationWorkProvidersController,
  assignProviderController,
  updateWorkProviderController,
  unassignProviderController,
} from "./providers.controller.js";

// Proveedores (DEC-031), montados en /api/work/providers. Pipeline de
// ENDPOINT_STANDARD: verifyToken → requirePermission → esquema → validate →
// controller.
const can = PERMISSIONS.work.providers;
const providersRoutes = express.Router();

providersRoutes.post("/pagination_providers", verifyToken, requirePermission(can.view), paginationProvidersSchema, validate, paginationProvidersController);
providersRoutes.get("/get_provider", verifyToken, requirePermission(can.view), getProviderSchema, validate, getProviderController);
// Verificación reactiva del documento en el formulario: coincidencia exacta
// del par (tipo, número). Con el permiso de ver, que ya da el listado: no
// revela nada que el usuario no pueda consultar (ADR-0012, "Seguridad").
providersRoutes.get(
  "/check_provider_identification",
  verifyToken,
  requirePermission(can.view),
  checkIdentificationSchema,
  validate,
  checkIdentificationController
);
// Candidatos para asignar a una obra: activos, con tope fijo. Con el permiso
// de asignar, que es para lo que sirve.
providersRoutes.get("/select_providers", verifyToken, requirePermission(can.assignWork), selectProvidersSchema, validate, selectProvidersController);
// Y al revés, desde el proveedor: obras activas donde todavía no está.
providersRoutes.get(
  "/select_assignable_works",
  verifyToken,
  requirePermission(can.assignWork),
  selectAssignableWorksSchema,
  validate,
  selectAssignableWorksController
);
// save_provider sirve crear (prvId 0) y editar. Cambiar la identificación y
// crear asignando a una obra los exige el service, según lo que cambia.
providersRoutes.post(
  "/save_provider",
  verifyToken,
  requirePermission((req) => (Number(req.body.prvId) > 0 ? can.edit : can.create)),
  saveProviderSchema,
  validate,
  saveProviderController
);
providersRoutes.put("/change_status_provider", verifyToken, requirePermission(can.changeStatus), changeProviderStatusSchema, validate, changeProviderStatusController);
providersRoutes.put("/delete_provider", verifyToken, requirePermission(can.delete), deleteProviderSchema, validate, deleteProviderController);

// Asignación proveedor-obra (ADR-0012, decisiones 2 y 12). El listado es parte
// del expediente de la obra: lo ve quien ve obras.
providersRoutes.post(
  "/pagination_work_providers",
  verifyToken,
  requirePermission(PERMISSIONS.work.works.view),
  paginationWorkProvidersSchema,
  validate,
  paginationWorkProvidersController
);
providersRoutes.post("/assign_provider_work", verifyToken, requirePermission(can.assignWork), assignProviderSchema, validate, assignProviderController);
providersRoutes.put("/update_provider_work", verifyToken, requirePermission(can.assignWork), updateWorkProviderSchema, validate, updateWorkProviderController);
providersRoutes.put("/unassign_provider_work", verifyToken, requirePermission(can.unassignWork), unassignProviderSchema, validate, unassignProviderController);

export default providersRoutes;
