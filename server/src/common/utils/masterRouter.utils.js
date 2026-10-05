import express from "express";
import { verifyToken } from "../middlewares/authjwt.middleware.js";
import { requirePermission } from "../middlewares/requirePermission.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { getIO } from "../configs/socket.manager.js";
import { auditContext } from "../services/audit.service.js";
import { IDEMPOTENCY_HEADER } from "../services/idempotency.service.js";
import { createMasterSchemas } from "./masterValidation.utils.js";

/**
 * Controllers de un maestro (MAE-BE-01). Solo leen la petición y delegan:
 * el autor sale siempre de req.user (DEC-005) y la clave de idempotencia del
 * encabezado (DEC-016), nunca del body. Los errores van a next(err).
 */
export const createMasterControllers = (config, service) => {
  const { idField, fields, socketEvent } = config;
  const notify = () => {
    if (socketEvent) getIO().emit(socketEvent, {});
  };
  const handle = (fn) => async (req, res, next) => {
    try {
      return res.status(200).json(await fn(req));
    } catch (err) {
      next(err);
    }
  };

  return {
    pagination: handle((req) => {
      const { search, staId, rows, first, sortField, sortOrder } = req.body;
      const filters = Object.fromEntries(fields.filter((f) => f.filter).map((f) => [f.name, req.body[f.name]]));
      return service.pagination({ filters, search, staId, rows, first, sortField, sortOrder });
    }),
    getById: handle((req) => service.getById({ id: req.query[idField] })),
    select: handle((req) =>
      service.select({ includeId: req.query.includeId, scope: config.scopeField ? req.query[config.scopeField] : undefined })
    ),
    save: handle(async (req) => {
      const input = Object.fromEntries(fields.map((f) => [f.name, req.body[f.name]]));
      const result = await service.save({
        id: req.body[idField],
        input,
        useBy: req.user.useId,
        ctx: auditContext(req),
        idempotencyKey: req.get(IDEMPOTENCY_HEADER),
      });
      notify();
      return result;
    }),
    changeStatus: handle(async (req) => {
      const result = await service.changeStatus({
        id: req.body[idField],
        staId: req.body.staId,
        useBy: req.user.useId,
        ctx: auditContext(req),
      });
      notify();
      return result;
    }),
    remove: handle(async (req) => {
      const result = await service.remove({ id: req.body[idField], useBy: req.user.useId, ctx: auditContext(req) });
      notify();
      return result;
    }),
  };
};

/**
 * Rutas de un maestro, con el pipeline completo de ENDPOINT_STANDARD:
 * verifyToken → requirePermission → esquema → validate → controller.
 *
 *   POST /pagination_<plural>        ver
 *   GET  /get_<entidad>              ver
 *   GET  /get_<plural>_select        solo sesión (DEC-018)
 *   POST /save_<entidad>             crear (id 0) o editar (id > 0)
 *   PUT  /change_status_<entidad>    cambiar estado
 *   PUT  /delete_<entidad>           eliminar
 */
export const createMasterRouter = (config, service) => {
  const { idField, permissions: can, routes } = config;
  const schemas = createMasterSchemas(config);
  const controllers = createMasterControllers(config, service);
  const router = express.Router();

  router.post(`/pagination_${routes.plural}`, verifyToken, requirePermission(can.view), schemas.pagination, validate, controllers.pagination);
  router.get(`/get_${routes.entity}`, verifyToken, requirePermission(can.view), schemas.getById, validate, controllers.getById);
  // Sin requirePermission a propósito (DEC-018): el catálogo no es sensible y
  // lo necesita todo formulario que lo referencia, protegido por su permiso.
  router.get(`/get_${routes.plural}_select`, verifyToken, schemas.select, validate, controllers.select);
  router.post(
    `/save_${routes.entity}`,
    verifyToken,
    requirePermission((req) => (Number(req.body[idField]) > 0 ? can.edit : can.create)),
    schemas.save,
    validate,
    controllers.save
  );
  router.put(`/change_status_${routes.entity}`, verifyToken, requirePermission(can.changeStatus), schemas.changeStatus, validate, controllers.changeStatus);
  router.put(`/delete_${routes.entity}`, verifyToken, requirePermission(can.delete), schemas.remove, validate, controllers.remove);

  return router;
};
