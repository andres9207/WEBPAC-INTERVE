import { body } from "express-validator";
import { MAX_RULE_DAYS, MIN_RULE_DAYS } from "./businessRules.constants.js";

// Forma y tipo (ENDPOINT_STANDARD, paso 3). El rango es el del CHECK
// ck_business_rules_value.

const daysRule = (field, label) =>
  body(field)
    .isInt({ min: MIN_RULE_DAYS, max: MAX_RULE_DAYS })
    .withMessage(`${label} debe ser un número entero de días entre ${MIN_RULE_DAYS} y ${MAX_RULE_DAYS}.`);

export const saveBusinessRulesSchema = [
  daysRule("contractExpiringDays", "Vencimiento de contrato"),
  daysRule("policyExpiringDays", "Vencimiento de póliza"),
];
