import * as appService from "./app.service.js";

export const getMenuController = async (req, res, next) => {
  try {
    const { per, idu } = req.query;
    const result = await appService.getMenu({ per, idu });
    return res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getProfilesController = async (_req, res, next) => {
  try {
    const result = await appService.getProfiles();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const verifyTokenController = async (req, res, next) => {
  try {
    // El middleware verifyToken ya validó el JWT y el estado activo del
    // usuario (sta_id = 1); req.user es de fiar, no se vuelve a verificar.
    const { useId } = req.user;
    const result = await appService.getSessionInfo({ useId });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getUserPermissionsController = async (req, res, next) => {
  try {
    const { useId } = req.query;
    const result = await appService.getUserPermissions({ useId });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getStatusesByScope = async (req, res, next) => {
  try {
    const { scope, excludesKeys } = req.query;
    const result = await appService.getStatusesByScope({ scope, excludesKeys });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getModules = async (_req, res, next) => {
  try {
    const result = await appService.getModules();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
