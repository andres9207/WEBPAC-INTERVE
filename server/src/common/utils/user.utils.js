/**
 * Nombre visible de un usuario a partir de su fila (use_name + use_last_name).
 * Devuelve null si no hay usuario o no tiene nombre: p. ej. un autor NULL
 * (registro creado por el sistema) o un autor ya sin datos.
 */
export const userFullName = (user) => {
  if (!user) return null;
  const name = [user.use_name, user.use_last_name].filter(Boolean).join(" ").trim();
  return name || null;
};

/** `select` de Prisma para resolver un autor (created_by_user, updated_by_user…). */
export const USER_NAME_SELECT = Object.freeze({ select: { use_name: true, use_last_name: true } });
