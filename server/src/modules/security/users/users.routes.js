import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../../common/middlewares/requirePermission.middleware.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import {
  getUsers,
  paginationUsersController,
  countUsersController,
  saveUserController,
  deleteUserController,
  getUsersByPermision,
} from "./users.controller.js";

const usersRoutes = express.Router();

usersRoutes.get("/get_users", verifyToken, requirePermission(PERMISSIONS.security.users.view), getUsers);
usersRoutes.post(
  "/get_users_permision",
  verifyToken,
  requirePermission(PERMISSIONS.security.users.view),
  getUsersByPermision
);
usersRoutes.post(
  "/list_users",
  verifyToken,
  requirePermission(PERMISSIONS.security.users.view),
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
  saveUserController
);

usersRoutes.put(
  "/delete_user",
  verifyToken,
  requirePermission(PERMISSIONS.security.users.delete),
  deleteUserController
);

export default usersRoutes;
