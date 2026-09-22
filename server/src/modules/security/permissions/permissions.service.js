import {
  getConnection,
  releaseConnection,
  executeQuery,
} from "../../../common/configs/db.config.js";
import { getIO } from "../../../common/configs/socket.manager.js";
import { prisma } from "../../../common/configs/prismaClient.js";
import { getEffectivePermissionIds } from "../../../common/services/effectivePermissions.service.js";

export const getProfileWindows = async ({ proId, useId }) => {
  if (!proId && !useId) {
    const error = new Error(
      "Debe proporcionar al menos el ID de usuario (useId) o el ID de perfil (proId)."
    );
    error.status = 400;
    throw error;
  }

  let connection = null;
  try {
    connection = await getConnection();
    let rows = [];

    if (useId) {
      const ventanaRows = await executeQuery(
        `SELECT pag_id FROM tbl_page_permissions WHERE pro_id = (SELECT pro_id FROM tbl_users WHERE use_id = ?)`,
        [useId],
        connection
      );

      if (!ventanaRows || ventanaRows.length === 0) {
        return [];
      }

      const pagIds = ventanaRows.map((v) => v.pag_id);
      if (pagIds.length === 0) return [];

      const placeholders = pagIds.map(() => "?").join(",");

      rows = await executeQuery(
        `SELECT
           v1.pag_id AS pagId,
           v1.pag_description AS description,
           v1.pag_parent AS parent,
           v2.pag_description AS parentDescription,
           COUNT(p.per_id) AS count,
           v1.pag_order AS pagOrder
         FROM tbl_pages v1
         LEFT JOIN tbl_pages v2 ON v1.pag_parent = v2.pag_id
         LEFT JOIN tbl_permissions p ON v1.pag_id = p.pag_id
         WHERE v1.pag_id IN (${placeholders})
         GROUP BY pagId, description, parent
         ORDER BY v1.pag_parent DESC, v1.pag_order ASC`,
        pagIds,
        connection
      );
    } else if (proId) {
      const pagRows = await executeQuery(
        `SELECT pag_id FROM tbl_page_permissions WHERE pro_id = ?`,
        [proId],
        connection
      );

      if (!pagRows || pagRows.length === 0) {
        return [];
      }

      const pagIds = pagRows.map((v) => v.pag_id);
      const placeholders = pagIds.map(() => "?").join(",");

      rows = await executeQuery(
        `SELECT
           v1.pag_id AS pagId,
           v1.pag_description AS description,
           v1.pag_parent AS parent,
           v2.pag_description AS parentDescription,
           COUNT(p.per_id) AS count,
           v1.pag_order AS pagOrder
         FROM tbl_pages v1
         LEFT JOIN tbl_pages v2 ON v1.pag_parent = v2.pag_id
         LEFT JOIN tbl_permissions p ON v1.pag_id = p.pag_id
         WHERE v1.pag_id IN (${placeholders})
         GROUP BY pagId, description, parent
         ORDER BY v1.pag_parent DESC, v1.pag_order ASC`,
        pagIds,
        connection
      );
    }

    const pagePermissions = await Promise.all(
      rows.map(async (page) => {
        const permissions = await executeQuery(
          `SELECT per_id AS perId, per_name AS name FROM tbl_permissions WHERE pag_id = ? ORDER BY per_order ASC`,
          [page.pagId],
          connection
        );
        return { ...page, permissions };
      })
    );

    return pagePermissions;
  } finally {
    releaseConnection(connection);
  }
};

export const getUserPermissions = async ({ pagIds, useId }) => {
  if (!Array.isArray(pagIds) || pagIds.length === 0 || !useId) {
    return [];
  }

  let connection = null;
  try {
    connection = await getConnection();

    const placeholders = pagIds.map(() => "?").join(",");

    // "assigned" refleja el permiso EFECTIVO (unión perfil + individual),
    // no solo tbl_user_permissions — de lo contrario esta pantalla mostraría
    // como "no asignado" un permiso que el usuario sí tiene vía su perfil.
    return await executeQuery(
      `SELECT
         p.pag_id AS pagId,
         p.per_id AS perId,
         p.per_name AS name,
         CASE WHEN pu.use_id IS NOT NULL OR pp.pro_id IS NOT NULL THEN 1 ELSE 0 END AS assigned
       FROM tbl_permissions p
       LEFT JOIN tbl_user_permissions pu ON p.per_id = pu.per_id AND pu.use_id = ?
       LEFT JOIN tbl_users u ON u.use_id = ?
       LEFT JOIN tbl_profile_permissions pp ON pp.per_id = p.per_id AND pp.pro_id = u.pro_id
       WHERE p.pag_id IN (${placeholders})
       ORDER BY p.per_order ASC`,
      [useId, useId, ...pagIds],
      connection
    );
  } finally {
    releaseConnection(connection);
  }
};

export const getProfilePermissions = async ({ pagIds, proId }) => {
  if (!Array.isArray(pagIds) || pagIds.length === 0 || !proId) {
    return [];
  }

  let connection = null;
  try {
    connection = await getConnection();

    const placeholders = pagIds.map(() => "?").join(",");

    return await executeQuery(
      `SELECT
         p.pag_id AS pagId,
         p.per_id AS perId,
         p.per_name AS name,
         CASE WHEN pf.pro_id IS NOT NULL THEN 1 ELSE 0 END AS assigned
       FROM tbl_permissions p
       LEFT JOIN tbl_profile_permissions pf ON p.per_id = pf.per_id AND pf.pro_id = ?
       WHERE p.pag_id IN (${placeholders})
       ORDER BY p.per_order ASC`,
      [proId, ...pagIds],
      connection
    );
  } finally {
    releaseConnection(connection);
  }
};

export const updateProfilePermissions = async ({ permissions, proId, actingProId }) => {
  if (!permissions || !proId) {
    const error = new Error(
      "Los permisos (permissions) y el perfil (proId) son obligatorios"
    );
    error.status = 400;
    throw error;
  }

  // Impide la autoconcesión: quien edita los permisos de un perfil no puede
  // ser alguien perteneciente a ESE MISMO perfil (se estaría concediendo
  // permisos a sí mismo indirectamente, junto con todo el resto de usuarios
  // de ese perfil). Sin excepción para ningún perfil, Superadmin incluido —
  // no hay ningún caso especial de código que lo exima (ver
  // requirePermission.middleware.js).
  if (Number(proId) === Number(actingProId)) {
    const error = new Error("No puedes modificar los permisos de tu propio perfil.");
    error.status = 403;
    throw error;
  }

  await prisma.$transaction(async (tx) => {
    const currentPermissions = await tx.tbl_profile_permissions.findMany({
      where: { pro_id: Number(proId) },
      select: { per_id: true },
    });

    const currentSet = new Set(currentPermissions.map((p) => p.per_id));
    const toDelete = Array.from(currentSet).filter(
      (perId) => !permissions.includes(perId)
    );
    const toInsert = permissions.filter((perId) => !currentSet.has(perId));

    if (toDelete.length > 0) {
      await tx.tbl_profile_permissions.deleteMany({
        where: { pro_id: Number(proId), per_id: { in: toDelete } },
      });
    }

    if (toInsert.length > 0) {
      await tx.tbl_profile_permissions.createMany({
        data: toInsert.map((perId) => ({ per_id: perId, pro_id: Number(proId) })),
      });
    }
  });

  return { message: "Permisos actualizados" };
};

export const updateUserPermissions = async ({ permissions, useId, actingUseId }) => {
  if (!permissions || !useId) {
    const error = new Error(
      "Los permisos (permissions) y el usuario (useId) son obligatorios"
    );
    error.status = 400;
    throw error;
  }

  // Impide la autoconcesión: nadie puede modificar sus propios permisos,
  // ni siquiera un usuario del perfil Superadmin — sin excepción de código
  // para ningún useId (ver requirePermission.middleware.js).
  if (Number(useId) === Number(actingUseId)) {
    const error = new Error("No puedes modificar tus propios permisos.");
    error.status = 403;
    throw error;
  }

  // tbl_user_permissions guarda solo las EXCEPCIONES individuales del
  // usuario, no su set completo de permisos (ese es el perfil + estas
  // excepciones, ver effectivePermissions.service.js). El drawer del cliente
  // sigue enviando el set completo deseado (incluye lo heredado del perfil,
  // que llega marcado como "assigned"), así que hay que descartar de ahí lo
  // que el perfil ya otorga — guardarlo igual sería una excepción redundante
  // que sobrevive aunque luego se le quite el permiso al perfil.
  //
  // Limitación conocida y aceptada: como el permiso efectivo es una unión
  // (nunca una resta), desde esta pantalla no se puede revocarle a un
  // usuario puntual un permiso que su perfil ya le da — eso solo se quita
  // editando el perfil (afecta a todos sus usuarios) o cambiándolo de perfil.
  const user = await prisma.tbl_users.findUnique({
    where: { use_id: Number(useId) },
    select: { pro_id: true },
  });

  const profilePermissions = user?.pro_id
    ? await prisma.tbl_profile_permissions.findMany({
        where: { pro_id: user.pro_id },
        select: { per_id: true },
      })
    : [];
  const profileGrantedSet = new Set(profilePermissions.map((p) => p.per_id));
  const desiredIndividual = permissions.filter((perId) => !profileGrantedSet.has(perId));

  await prisma.$transaction(async (tx) => {
    const currentPermissions = await tx.tbl_user_permissions.findMany({
      where: { use_id: Number(useId) },
      select: { per_id: true },
    });

    const currentSet = new Set(currentPermissions.map((p) => p.per_id));
    const toDelete = Array.from(currentSet).filter(
      (perId) => !desiredIndividual.includes(perId)
    );
    const toInsert = desiredIndividual.filter((perId) => !currentSet.has(perId));

    if (toDelete.length > 0) {
      await tx.tbl_user_permissions.deleteMany({
        where: { use_id: Number(useId), per_id: { in: toDelete } },
      });
    }

    if (toInsert.length > 0) {
      await tx.tbl_user_permissions.createMany({
        data: toInsert.map((perId) => ({ per_id: perId, use_id: Number(useId) })),
      });
    }
  });

  // Efectivo (unión), no solo las excepciones individuales que se acaban de
  // escribir — es lo que realmente representa "los permisos del usuario".
  const updatedPermissions = await getEffectivePermissionIds({ useId, proId: user?.pro_id });

  // Dirigido a la sala del usuario afectado (misma convención que
  // insertNotification en notifications.service.js), no a todos los
  // clientes conectados — antes cualquier sesión abierta en cualquier
  // navegador recibía el evento de CUALQUIER usuario cuyos permisos
  // cambiaran (ver SECURITY.md).
  const io = getIO();
  io.to(`user:${useId}`).emit("update-permissions", {
    useId,
    updatedPermissions: updatedPermissions.map((perId) => ({ perId })),
  });

  return { message: "Permisos actualizados" };
};

export const getAllPages = async () => {
  const pages = await prisma.tbl_pages.findMany({
    select: { pag_id: true, pag_description: true, pag_url: true },
    orderBy: { pag_order: "asc" },
  });

  // Prisma no soporta alias de columna en `select`; se remapea a mano para
  // conservar el mismo contrato de respuesta ({ id, description, url }).
  return pages.map((p) => ({
    id: p.pag_id,
    description: p.pag_description,
    url: p.pag_url,
  }));
};
