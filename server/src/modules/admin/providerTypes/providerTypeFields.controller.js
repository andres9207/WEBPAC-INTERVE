import { getIO } from "../../../common/configs/socket.manager.js";
import { auditContext } from "../../../common/services/audit.service.js";
import * as fieldsService from "./providerTypeFields.service.js";

// Solo leen la petición y delegan. El autor sale de req.user (DEC-005).

const handle = (fn) => async (req, res, next) => {
  try {
    return res.status(200).json(await fn(req));
  } catch (err) {
    next(err);
  }
};

const FIELD_ATTRIBUTES = ["cfdId", "applies", "visible", "required", "order"];
const pickField = (field) => Object.fromEntries(FIELD_ATTRIBUTES.map((name) => [name, field?.[name]]));

export const getProviderTypeFieldsController = handle((req) => fieldsService.getProviderTypeFields({ pvtId: req.query.pvtId }));

export const saveProviderTypeFieldsController = handle(async (req) => {
  const result = await fieldsService.saveProviderTypeFields({
    pvtId: req.body.pvtId,
    fields: req.body.fields.map(pickField),
    useBy: req.user.useId,
    ctx: auditContext(req),
  });
  if (result.changed) getIO().emit("refresh-provider-types", {});
  return result;
});
