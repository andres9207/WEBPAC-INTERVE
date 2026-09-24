import { body, query } from "express-validator";

export const getWindowsByProfileSchema = [
  query("proId").isInt({ min: 1 }).withMessage("El perfil (proId) debe ser un entero positivo."),
];

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
    .matches(/^\d{6}$/)
    .withMessage("El código debe tener 6 dígitos."),
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
    .matches(/^\d{6}$/)
    .withMessage("El código debe tener 6 dígitos."),
  body("nuevaContrasena")
    .isLength({ min: 8, max: 72 })
    .withMessage("La nueva contraseña debe tener entre 8 y 72 caracteres."),
];

// Máximo 72: bcrypt ignora en silencio todo lo que pase de 72 bytes, así que
// una contraseña más larga daría una falsa sensación de fortaleza.
export const updatePasswordSchema = [
  body("currentPassword").notEmpty().withMessage("La contraseña actual es requerida."),
  body("newPassword")
    .isLength({ min: 8, max: 72 })
    .withMessage("La nueva contraseña debe tener entre 8 y 72 caracteres."),
];

export const updateAccountSchema = [
  body("name").trim().notEmpty().withMessage("El nombre es requerido."),
  body("lastName").trim().notEmpty().withMessage("El apellido es requerido."),
  body("username").trim().notEmpty().withMessage("El usuario es requerido."),
  body("email").trim().notEmpty().withMessage("El correo es requerido.").isEmail().withMessage("El correo no es válido."),
];
