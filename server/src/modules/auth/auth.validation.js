import { body } from "express-validator";

export const loginSchema = [
  body("usuario").trim().notEmpty().withMessage("El usuario o correo es requerido."),
  body().custom((_, { req }) => {
    if (!req.body.clave && !req.body.password) {
      throw new Error("La contraseña es requerida.");
    }
    return true;
  }),
];

export const forgotPasswordSchema = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El correo es requerido.")
    .isEmail()
    .withMessage("El correo no es válido."),
];

export const validateCodePasswordSchema = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El correo es requerido.")
    .isEmail()
    .withMessage("El correo no es válido."),
  body("codeTemp")
    .notEmpty()
    .withMessage("El código es requerido.")
    .isInt()
    .withMessage("El código debe ser numérico."),
];

export const restorePasswordSchema = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El correo es requerido.")
    .isEmail()
    .withMessage("El correo no es válido."),
  body("codeTemp")
    .notEmpty()
    .withMessage("El código es requerido.")
    .isInt()
    .withMessage("El código debe ser numérico."),
  body("nuevaContrasena")
    .isLength({ min: 8 })
    .withMessage("La nueva contraseña debe tener al menos 8 caracteres."),
];

export const updatePasswordSchema = [
  body("currentPassword").notEmpty().withMessage("La contraseña actual es requerida."),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("La nueva contraseña debe tener al menos 8 caracteres."),
];

export const updateAccountSchema = [
  body("name").trim().notEmpty().withMessage("El nombre es requerido."),
  body("lastName").trim().notEmpty().withMessage("El apellido es requerido."),
  body("username").trim().notEmpty().withMessage("El usuario es requerido."),
  body("email").trim().notEmpty().withMessage("El correo es requerido.").isEmail().withMessage("El correo no es válido."),
];
