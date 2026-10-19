import { hasEffectivePermission } from "../services/effectivePermissions.service.js";

/**
 * Middleware de autorización (paso 2 del pipeline, ver engineering/standards/ENDPOINT_STANDARD.md).
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
 * @param {number | number[] | ((req: import('express').Request) => number | number[])} perIdOrResolver
 *   Un per_id fijo, o una función que lo calcule a partir del request —
 *   necesario para endpoints que sirven tanto "crear" como "editar" según el
 *   body (ver su uso con save_profile/save_user en las rutas). Una lista
 *   exige cualquiera de ellos: un endpoint común a varias vistas, cuyo
 *   service filtra por las que el usuario ve (facturas, DEC-054).
 */
export const requirePermission = (perIdOrResolver) => async (req, res, next) => {
  try {
    const { useId, proId } = req.user || {};

    if (!useId) {
      return res.status(401).json({ message: "Autorización inválida" });
    }

    const perId = typeof perIdOrResolver === "function" ? perIdOrResolver(req) : perIdOrResolver;

    // Permiso efectivo = (perfil ∪ concedidos) − negados (DEC-067): los
    // permisos del perfil (req.user.proId, resuelto en cada petición contra
    // tbl_profile_permissions — así un cambio a los permisos del perfil se
    // propaga de inmediato a todos sus usuarios) y las excepciones
    // individuales (tbl_user_permissions), que conceden o niegan.
    const perIds = Array.isArray(perId) ? perId : [perId];
    const granted = perIds.length > 0 && (await Promise.all(perIds.map((id) => hasEffectivePermission({ useId, proId, perId: id })))).some(Boolean);

    if (!granted) {
      return res.status(403).json({ message: "No tienes permiso para realizar esta acción." });
    }

    next();
  } catch (err) {
    next(err);
  }
};
