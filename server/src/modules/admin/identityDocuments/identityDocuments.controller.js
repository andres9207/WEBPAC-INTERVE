import * as identityDocumentsService from "./identityDocuments.service.js";
import { getIO } from "../../../common/configs/socket.manager.js";
import { IDEMPOTENCY_HEADER } from "../../../common/services/idempotency.service.js";

// Los selectores de tipo (SelectSocket) escuchan este evento para recargarse.
const REFRESH_EVENT = "refresh-identity-documents";

export const paginationIdentityDocumentsController = async (req, res, next) => {
  try {
    const { code, name, staId, rows, first, sortField, sortOrder } = req.body;
    const result = await identityDocumentsService.paginationIdentityDocuments({
      code,
      name,
      staId,
      rows,
      first,
      sortField,
      sortOrder,
    });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getIdentityDocumentsSelectController = async (req, res, next) => {
  try {
    const result = await identityDocumentsService.getIdentityDocumentsSelect({ includeId: req.query.includeId });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const saveIdentityDocumentController = async (req, res, next) => {
  try {
    const { iddId, code, name, staId } = req.body;
    const result = await identityDocumentsService.saveIdentityDocument({
      iddId,
      code,
      name,
      staId,
      useBy: req.user.useId, // autor: siempre de la sesión
      // Solo cuenta al crear (ADR-0027, decisión 7); la ruta ya lo validó.
      idempotencyKey: req.get(IDEMPOTENCY_HEADER),
    });

    getIO().emit(REFRESH_EVENT, {});

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteIdentityDocumentController = async (req, res, next) => {
  try {
    const { iddId } = req.body;
    const result = await identityDocumentsService.deleteIdentityDocument({ iddId, useBy: req.user.useId });

    getIO().emit(REFRESH_EVENT, {});

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
