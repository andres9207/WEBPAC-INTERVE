import * as profilesService from "./profiles.service.js";
import { getIO } from "../../../common/configs/socket.manager.js";
import { auditContext } from "../../../common/services/audit.service.js";
import { IDEMPOTENCY_HEADER } from "../../../common/services/idempotency.service.js";

export const paginationProfilesController = async (req, res, next) => {
  try {
    const { name, staId, rows, first, sortField, sortOrder } = req.body;
    // Del JWT, nunca del body: el service decide con este id si incluye el
    // perfil Superadmin en el listado (mismo criterio que countUsers).
    const { useId } = req.user;
    const result = await profilesService.paginationProfiles({
      useId,
      name,
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

export const getModulesController = async (req, res, next) => {
  try {
    const { proId } = req.query;
    const result = await profilesService.getModules({ proId });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const saveProfileController = async (req, res, next) => {
  try {
    const { proId, name, staId, modules, previousModules } = req.body;
    const useId = req.user.useId;
    const result = await profilesService.saveProfile({
      proId,
      name,
      staId,
      modules,
      previousModules,
      useBy: useId,
      ctx: auditContext(req),
      // Solo cuenta al crear (ADR-0027, decisión 7); la ruta ya lo validó.
      idempotencyKey: req.get(IDEMPOTENCY_HEADER),
    });

    getIO().emit("refresh-profiles", {});

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteProfileController = async (req, res, next) => {
  try {
    const { proId } = req.body;
    const result = await profilesService.deleteProfile({
      proId,
      updatedBy: req.user.useId,
      ctx: auditContext(req),
    });

    getIO().emit("refresh-profiles", {});

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
