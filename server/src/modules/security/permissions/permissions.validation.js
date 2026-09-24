import { query } from "express-validator";
import { requiredId, idArray } from "../../../common/utils/validation.utils.js";

export const getProfileWindowsSchema = [
  query("proId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("proId debe ser un entero positivo."),
  query("useId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("useId debe ser un entero positivo."),
];

export const getUserPermissionsSchema = [...idArray("pagIds"), requiredId("useId")];

export const getProfilePermissionsSchema = [...idArray("pagIds"), requiredId("proId")];

export const updateProfilePermissionsSchema = [...idArray("permissions"), requiredId("proId")];

export const updateUserPermissionsSchema = [...idArray("permissions"), requiredId("useId")];
