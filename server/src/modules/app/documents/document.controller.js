import * as documentsService from "./document.service.js";
import { IDEMPOTENCY_HEADER } from "../../../common/services/idempotency.service.js";

export const paginationModuleDocs = async (req, res, next) => {
  try {
    const result = await documentsService.paginationModuleDocs(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const saveModuleDoc = async (req, res, next) => {
  try {
    // Autor de la auditoría (doc_create_by/doc_update_by) siempre desde el
    // JWT: antes llegaba en el body (docCreateBy/docUpdateBy), así que
    // cualquiera podía registrar un documento a nombre de otro usuario.
    const { useId } = req.user;
    const result = await documentsService.saveModuleDoc({
      ...req.body,
      docCreateBy: useId,
      docUpdateBy: useId,
      // Del encabezado, después del spread: el body no puede reemplazarla.
      idempotencyKey: req.get(IDEMPOTENCY_HEADER),
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteModuleDoc = async (req, res, next) => {
  try {
    const { id } = req.body;
    const result = await documentsService.deleteModuleDoc({ id, usuAct: req.user.useId });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
