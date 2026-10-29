import * as healthService from "./health.service.js";

export const getHealthController = async (_req, res, next) => {
  try {
    const result = await healthService.getHealth();
    // Sin caché: un proxy no debe responder "ok" con una copia vieja.
    res.set("Cache-Control", "no-store");
    return res.status(result.status === "ok" ? 200 : 503).json(result);
  } catch (err) {
    next(err);
  }
};
