import { prisma } from "../configs/prismaClient.js";
import { ACTIVE_STATUS } from "../constants/status.constants.js";

/**
 * El permiso efectivo de un usuario es la UNIÓN de los permisos de la
 * plantilla de su perfil (tbl_profile_permissions) y sus excepciones
 * individuales (tbl_user_permissions) — resuelto en cada consulta, nunca
 * copiado una sola vez al crear el usuario. Antes, saveUser copiaba los
 * permisos del perfil a tbl_user_permissions solo al CREAR el usuario, así
 * que un cambio posterior a los permisos del perfil (update_permissions_profile)
 * nunca se propagaba a los usuarios ya existentes de ese perfil. Ver
 * engineering/anti-patterns/SECURITY.md.
 */

export const hasEffectivePermission = async ({ useId, proId, perId }) => {
  const perIdNum = Number(perId);

  const [profileGrant, individualGrant] = await Promise.all([
    proId
      ? prisma.tbl_profile_permissions.findFirst({
          where: { pro_id: Number(proId), per_id: perIdNum },
          select: { prp_id: true },
        })
      : null,
    useId
      ? prisma.tbl_user_permissions.findFirst({
          where: { use_id: Number(useId), per_id: perIdNum },
          select: { usp_id: true },
        })
      : null,
  ]);

  return Boolean(profileGrant || individualGrant);
};

export const getEffectivePermissionIds = async ({ useId, proId }) => {
  const [profilePermissions, individualPermissions] = await Promise.all([
    proId
      ? prisma.tbl_profile_permissions.findMany({
          where: { pro_id: Number(proId) },
          select: { per_id: true },
        })
      : Promise.resolve([]),
    useId
      ? prisma.tbl_user_permissions.findMany({
          where: { use_id: Number(useId) },
          select: { per_id: true },
        })
      : Promise.resolve([]),
  ]);

  return [
    ...new Set([
      ...profilePermissions.map((p) => p.per_id),
      ...individualPermissions.map((p) => p.per_id),
    ]),
  ];
};

/**
 * Usuarios activos que tienen un permiso efectivo (por su perfil o como
 * excepción individual). Para decidir a quién avisar algo (p. ej. el informe
 * de una conciliación), nunca para autorizar una petición: eso es
 * requirePermission.
 */
export const findUsersWithPermission = async (perId) => {
  const perIdNum = Number(perId);
  return prisma.tbl_users.findMany({
    where: {
      sta_id: ACTIVE_STATUS,
      OR: [
        { tbl_profiles: { tbl_profile_permissions: { some: { per_id: perIdNum } } } },
        { tbl_user_permissions: { some: { per_id: perIdNum } } },
      ],
    },
    select: { use_id: true, use_email: true },
    orderBy: { use_id: "asc" },
  });
};
