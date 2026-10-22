import { auditContext } from "../../../common/services/audit.service.js";
import { getBusinessRules, saveBusinessRules } from "./businessRules.service.js";
import { triggerExpirationNotice } from "../../work/contracts/expirationNotice.service.js";

// Solo leen la petición y delegan. El autor sale de req.user (DEC-005).

const handle = (fn) => async (req, res, next) => {
  try {
    return res.status(200).json(await fn(req));
  } catch (err) {
    next(err);
  }
};

export const getBusinessRulesController = handle(() => getBusinessRules());

export const saveBusinessRulesController = handle(async (req) => {
  const result = await saveBusinessRules({
    values: { contractExpiringDays: req.body.contractExpiringDays, policyExpiringDays: req.body.policyExpiringDays },
    useBy: req.user.useId,
    ctx: auditContext(req),
  });
  // Con los días nuevos puede haber contratos o pólizas que ya entraron en su
  // plazo: se avisan ahora, después del commit y sin esperar (DEC-072).
  if (result.changed) triggerExpirationNotice();
  return result;
});
