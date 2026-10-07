import { getIO } from "../../../common/configs/socket.manager.js";
import { auditContext } from "../../../common/services/audit.service.js";
import { configurePolicyTypeBase } from "./policyTypes.service.js";

// Solo leen la petición y delegan. El autor sale de req.user (DEC-005).

const handle = (fn) => async (req, res, next) => {
  try {
    return res.status(200).json(await fn(req));
  } catch (err) {
    next(err);
  }
};

export const configurePolicyTypeBaseController = handle(async (req) => {
  const result = await configurePolicyTypeBase({
    pltId: req.body.pltId,
    base: req.body.base,
    useBy: req.user.useId,
    ctx: auditContext(req),
  });
  getIO().emit("refresh-policy-types", {});
  return result;
});
