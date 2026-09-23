import { validationResult } from "express-validator";

// Middleware final del pipeline de validación: se monta después de la lista
// de reglas de express-validator (body(...)/query(...)/etc.) y antes del
// controller. Si alguna regla falló, corta la petición con 400 y nunca llega
// a la regla de negocio.
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Datos inválidos.",
      errors: errors.array().map(({ path, msg }) => ({ field: path, message: msg })),
    });
  }

  next();
};
