import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../../common/middlewares/requirePermission.middleware.js";
import { validate } from "../../../common/middlewares/validate.middleware.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { listUsersSchema, saveUserSchema, deleteUserSchema } from "./users.validation.js";
import {
  paginationUsersController,
  countUsersController,
  saveUserController,
  deleteUserController,
} from "./users.controller.js";

const usersRoutes = express.Router();

usersRoutes.post(
  "/list_users",
  verifyToken,
  requirePermission(PERMISSIONS.security.users.view),
  listUsersSchema,
  validate,
  paginationUsersController
);
usersRoutes.get(
  "/count_users",
  verifyToken,
  requirePermission(PERMISSIONS.security.users.view),
  countUsersController
);

// save_user sirve tanto crear (sin useId) como editar (useId>0): el permiso
// requerido depende del body, no es un valor fijo por ruta.
usersRoutes.post(
  "/save_user",
  verifyToken,
  requirePermission((req) =>
    req.body.useId > 0 ? PERMISSIONS.security.users.edit : PERMISSIONS.security.users.create
  ),
  saveUserSchema,
  validate,
  saveUserController
);

usersRoutes.put(
  "/delete_user",
  verifyToken,
  requirePermission(PERMISSIONS.security.users.delete),
  deleteUserSchema,
  validate,
  deleteUserController
);

export default usersRoutes;
