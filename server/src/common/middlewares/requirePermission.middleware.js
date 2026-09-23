import { hasEffectivePermission } from "../services/effectivePermissions.service.js";

/**
 * Middleware de autorización (paso 2 del pipeline, ver ENDPOINT_STANDARD.md).
 * Debe montarse siempre después de `verifyToken` (necesita `req.user`).
 *
 * Sin caso especial para ningún useId: "Superadmin" es solo un perfil
 * (pro_id=1) al que el seed le otorga todos los permisos que existen (ver
 * server/prisma/seed.js) — su acceso total sale de los mismos datos y la
 * misma resolución que la de cualquier otro usuario, nunca de una excepción
 * de código atada a un id fijo. Si se agrega un permiso nuevo, hay que
 * otorgárselo también al perfil Superadmin en el seed — de lo contrario
 * quedaría bloqueado en esa acción, igual que cualquier otro perfil al que
 * no se le asigne.
 *
 * @param {number | ((req: import('express').Request) => number)} perIdOrResolver
 *   Un per_id fijo, o una función que lo calcule a partir del request —
 *   necesario para endpoints que sirven tanto "crear" como "editar" según el
 *   body (ver su uso con save_profile/save_user en las rutas).
 */
export const requirePermission = (perIdOrResolver) => async (req, res, next) => {
  try {
    const { useId, proId } = req.user || {};

    if (!useId) {
      return res.status(401).json({ message: "Autorización inválida" });
    }

    const perId = typeof perIdOrResolver === "function" ? perIdOrResolver(req) : perIdOrResolver;

    // Permiso efectivo = unión de los permisos del perfil (req.user.proId,
    // resuelto en cada petición contra tbl_profile_permissions — así un
    // cambio a los permisos del perfil se propaga de inmediato a todos sus
    // usuarios) y las excepciones individuales (tbl_user_permissions).
    const granted = await hasEffectivePermission({ useId, proId, perId });

    if (!granted) {
      return res.status(403).json({ message: "No tienes permiso para realizar esta acción." });
    }

    next();
  } catch (err) {
    next(err);
  }
};
