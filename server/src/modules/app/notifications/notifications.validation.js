import { body, param } from "express-validator";

export const listNotificationsSchema = [
  body("page").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("page debe ser un entero positivo."),
  body("limit").optional({ values: "falsy" }).isInt({ min: 1, max: 100 }).withMessage("limit debe estar entre 1 y 100."),
];

export const markAsReadSchema = [param("id").isInt({ min: 1 }).withMessage("id debe ser un entero positivo.")];
