import * as permissionsService from "./permissions.service.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";

export const getPermissionsCatalogController = (_req, res) => {
  res.status(200).json(PERMISSIONS);
};

export const getProfileWindowsController = async (req, res, next) => {
  try {
    const { proId, useId } = req.query;
    const result = await permissionsService.getProfileWindows({ proId, useId });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getUserPermissionsController = async (req, res, next) => {
  try {
    const { pagIds, useId } = req.body;
    const result = await permissionsService.getUserPermissions({ pagIds, useId });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getProfilePermissionsController = async (req, res, next) => {
  try {
    const { pagIds, proId } = req.body;
    const result = await permissionsService.getProfilePermissions({ pagIds, proId });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateProfilePermissionsController = async (req, res, next) => {
  try {
    const { permissions, proId } = req.body;
    // El solicitante sale de req.user, nunca del body: hace falta para
    // impedir la autoconcesión (no puede modificar los permisos de su
    // propio perfil, ver permissions.service.js).
    const { proId: actingProId } = req.user;
    const result = await permissionsService.updateProfilePermissions({ permissions, proId, actingProId });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateUserPermissionsController = async (req, res, next) => {
  try {
    const { permissions, useId } = req.body;
    // Idem: impide que un usuario se conceda permisos a sí mismo.
    const { useId: actingUseId } = req.user;
    const result = await permissionsService.updateUserPermissions({ permissions, useId, actingUseId });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getAllPagesController = async (_req, res, next) => {
  try {
    const result = await permissionsService.getAllPages();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
