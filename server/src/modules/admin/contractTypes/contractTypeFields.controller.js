import { getIO } from "../../../common/configs/socket.manager.js";
import { auditContext } from "../../../common/services/audit.service.js";
import * as fieldsService from "./contractTypeFields.service.js";

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

export const getContractTypeFieldsController = handle((req) => fieldsService.getContractTypeFields({ cttId: req.query.cttId }));

export const saveContractTypeFieldsController = handle(async (req) => {
  const result = await fieldsService.saveContractTypeFields({
    cttId: req.body.cttId,
    fields: req.body.fields.map(pickField),
    useBy: req.user.useId,
    ctx: auditContext(req),
  });
  if (result.changed) getIO().emit("refresh-contract-types", {});
  return result;
});
