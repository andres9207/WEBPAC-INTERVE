import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../../common/middlewares/requirePermission.middleware.js";
import { validate } from "../../../common/middlewares/validate.middleware.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import {
  paginationWorksSchema,
  getWorkSchema,
  selectWorkManagersSchema,
  saveWorkSchema,
  changeWorkStatusSchema,
  deleteWorkSchema,
} from "./works.validation.js";
import {
  paginationWorksController,
  getWorkController,
  selectWorkManagersController,
  saveWorkController,
  changeWorkStatusController,
  deleteWorkController,
} from "./works.controller.js";

// Obras (DEC-026), montadas en /api/work/works. Pipeline de ENDPOINT_STANDARD:
// verifyToken → requirePermission → esquema → validate → controller.
const can = PERMISSIONS.work.works;
const worksRoutes = express.Router();

worksRoutes.post("/pagination_works", verifyToken, requirePermission(can.view), paginationWorksSchema, validate, paginationWorksController);
worksRoutes.get("/get_work", verifyToken, requirePermission(can.view), getWorkSchema, validate, getWorkController);
// Candidatos a responsable: nombres de usuarios activos, para el formulario de
// obra. Con el permiso de ver obras, que ya muestran a sus responsables.
worksRoutes.get(
  "/select_work_managers",
  verifyToken,
  requirePermission(can.view),
  selectWorkManagersSchema,
  validate,
  selectWorkManagersController
);
// save_work sirve crear (wrkId 0) y editar. Asignar o retirar responsables y
// gestionar etapas los exige el service, según lo que cambia.
worksRoutes.post(
  "/save_work",
  verifyToken,
  requirePermission((req) => (Number(req.body.wrkId) > 0 ? can.edit : can.create)),
  saveWorkSchema,
  validate,
  saveWorkController
);
worksRoutes.put("/change_status_work", verifyToken, requirePermission(can.changeStatus), changeWorkStatusSchema, validate, changeWorkStatusController);
worksRoutes.put("/delete_work", verifyToken, requirePermission(can.delete), deleteWorkSchema, validate, deleteWorkController);

export default worksRoutes;
