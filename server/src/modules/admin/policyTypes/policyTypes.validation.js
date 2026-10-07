import { body } from "express-validator";
import { requiredId } from "../../../common/utils/validation.utils.js";
import { POLICY_BASES } from "./policyBases.js";

// Forma y tipo (ENDPOINT_STANDARD, paso 3). Las rutas estándar del maestro
// las valida createMasterSchemas.

export const configurePolicyTypeBaseSchema = [
  requiredId("pltId"),
  body("base").isIn(Object.values(POLICY_BASES)).withMessage("La base de cálculo no es válida."),
];
