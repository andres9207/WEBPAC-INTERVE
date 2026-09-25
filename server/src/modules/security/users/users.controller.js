import * as usersService from "./users.service.js";
import { revokeSession } from "../../../common/services/session.service.js";
import { AUDIT_OPERATIONS, auditContext } from "../../../common/services/audit.service.js";
import { IDEMPOTENCY_HEADER } from "../../../common/services/idempotency.service.js";

export const paginationUsersController = async (req, res, next) => {
  try {
    const {
      proId,
      name,
      lastName,
      email,
      identification,
      username,
      staId,
      rows,
      first,
      sortField,
      sortOrder,
    } = req.body;
    const result = await usersService.paginationUsers({
      proId,
      name,
      lastName,
      email,
      identification,
      username,
      staId,
      rows,
      first,
      sortField,
      sortOrder,
    });
    return res.json(result);
  } catch (err) {
    next(err);
  }
};

export const countUsersController = async (req, res, next) => {
  try {
    // Del JWT, nunca de req.query: el service decide con este id si incluye
    // el perfil Superadmin en el conteo, y ese filtro no puede quedar en
    // manos de un parámetro del cliente (ADR-0001).
    const { useId } = req.user;
    const result = await usersService.countUsers({ useId });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const saveUserController = async (req, res, next) => {
  try {
    const {
      useId,
      proId,
      name,
      lastName,
      identification,
      username,
      email,
      password,
      access,
      staId,
      changePassword,
      usePages,
    } = req.body;
    const useBy = req.user.useId;
    const result = await usersService.saveUser({
      useId,
      proId,
      name,
      lastName,
      identification,
      username,
      email,
      password,
      access,
      staId,
      useBy,
      changePassword,
      usePages,
      ctx: auditContext(req),
      // Solo cuenta al crear (ADR-0027, decisión 7); la ruta ya lo validó.
      idempotencyKey: req.get(IDEMPOTENCY_HEADER),
    });
    // Un usuario que queda inactivo, o al que un administrador le cambia la
    // contraseña, pierde su sesión de inmediato (verifyToken ya rechazaría
    // un inactivo por sta_id, pero así también muere su refresh token y se
    // cierran sus sockets).
    if (useId > 0 && (Number(staId) !== 1 || password)) {
      await revokeSession({
        useId,
        audit: {
          operation: AUDIT_OPERATIONS.SESSION_REVOKED,
          ctx: auditContext(req),
          reason: Number(staId) !== 1 ? "usuario inactivado" : "contraseña cambiada por un administrador",
        },
      });
    }

    const statusCode = useId > 0 ? 200 : 201;
    return res.status(statusCode).json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteUserController = async (req, res, next) => {
  try {
    const { useId } = req.body;
    const result = await usersService.deleteUser({
      useId,
      updatedBy: req.user.useId,
      ctx: auditContext(req),
    });
    await revokeSession({
      useId,
      audit: { operation: AUDIT_OPERATIONS.SESSION_REVOKED, ctx: auditContext(req), reason: "usuario eliminado" },
    });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
