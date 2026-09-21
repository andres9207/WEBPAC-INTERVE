import { hasEffectivePermission } from "../services/effectivePermissions.service.js";

// Mismo criterio que el bypass del cliente (authContext.jsx: `useId === 1`
// se trata como superadmin). Sin este bypass, el superadmin quedaría
// bloqueado por el servidor en acciones que el cliente ya le muestra como
// disponibles: el perfil Superadmin sembrado no tiene por qué tener asignado
// cada permiso puntual que exista.
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
