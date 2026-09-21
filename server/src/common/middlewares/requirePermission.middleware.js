import { prisma } from "../configs/prismaClient.js";

// Mismo criterio que el bypass del cliente (authContext.jsx: `useId === 1`
// se trata como superadmin). Sin este bypass, el superadmin quedaría
// bloqueado por el servidor en acciones que el cliente ya le muestra como
// disponibles: su tbl_user_permissions está vacío (los permisos de perfil
// solo se copian a un usuario al crearlo, y el superadmin sembrado es
// anterior a cualquier asignación).
const SUPERADMIN_USE_ID = 1;

/**
 * Middleware de autorización (paso 2 del pipeline, ver ENDPOINT_STANDARD.md).
 * Debe montarse siempre después de `verifyToken` (necesita `req.user`).
 *
 * @param {number | ((req: import('express').Request) => number)} perIdOrResolver
 *   Un per_id fijo, o una función que lo calcule a partir del request —
 *   necesario para endpoints que sirven tanto "crear" como "editar" según el
 *   body (ver su uso con save_profile/save_user en las rutas).
 */
export const requirePermission = (perIdOrResolver) => async (req, res, next) => {
  try {
    if (req.user?.useId === SUPERADMIN_USE_ID) {
      return next();
    }

    const useId = req.user?.useId;

    if (!useId) {
      return res.status(401).json({ message: "Autorización inválida" });
    }

    const perId = typeof perIdOrResolver === "function" ? perIdOrResolver(req) : perIdOrResolver;

    const granted = await prisma.tbl_user_permissions.findFirst({
      where: { use_id: Number(useId), per_id: Number(perId) },
      select: { usp_id: true },
    });

    if (!granted) {
      return res.status(403).json({ message: "No tienes permiso para realizar esta acción." });
    }

    next();
  } catch (err) {
    next(err);
  }
};
