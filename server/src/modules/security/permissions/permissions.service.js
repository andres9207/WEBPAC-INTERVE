import { getIO } from "../../../common/configs/socket.manager.js";
import { prisma } from "../../../common/configs/prismaClient.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { getEffectivePermissionIds } from "../../../common/services/effectivePermissions.service.js";
import {
  AUDIT_ENTITIES,
  AUDIT_OPERATIONS,
  newOperationId,
  writeAudit,
} from "../../../common/services/audit.service.js";

export const getProfileWindows = async ({ proId, useId }) => {
  if (!proId && !useId) {
    const error = new Error(
      "Debe proporcionar al menos el ID de usuario (useId) o el ID de perfil (proId)."
    );
    error.status = 400;
    throw error;
  }

  let targetProId = proId ? Number(proId) : null;

  if (!targetProId && useId) {
    const user = await prisma.tbl_users.findUnique({
      where: { use_id: Number(useId) },
      select: { pro_id: true },
    });
    if (!user?.pro_id) return [];
    targetProId = user.pro_id;
  }

  const pagePermissionRows = await prisma.tbl_page_permissions.findMany({
    where: { pro_id: targetProId },
    select: { pag_id: true },
  });

  if (pagePermissionRows.length === 0) return [];

  const pagIds = pagePermissionRows.map((r) => r.pag_id);

  const pages = await prisma.tbl_pages.findMany({
    where: { pag_id: { in: pagIds } },
    select: {
      pag_id: true,
      pag_description: true,
      pag_parent: true,
      pag_order: true,
      tbl_permissions: {
        select: { per_id: true, per_name: true },
        orderBy: { per_order: "asc" },
      },
    },
    orderBy: [{ pag_parent: "desc" }, { pag_order: "asc" }],
  });

  // tbl_pages.pag_parent no tiene una FK propia (pag_parent=0 = sin padre),
  // así que Prisma no puede resolverlo como relación anidada — se busca la
  // descripción del padre en una segunda consulta, en vez de un self-join.
  const parentIds = [...new Set(pages.map((p) => p.pag_parent).filter((id) => id))];
  const parents = parentIds.length
    ? await prisma.tbl_pages.findMany({
        where: { pag_id: { in: parentIds } },
        select: { pag_id: true, pag_description: true },
      })
    : [];
  const parentDescriptionById = new Map(parents.map((p) => [p.pag_id, p.pag_description]));

  return pages.map((page) => ({
    pagId: page.pag_id,
    description: page.pag_description,
    parent: page.pag_parent,
    parentDescription: parentDescriptionById.get(page.pag_parent) ?? null,
    count: page.tbl_permissions.length,
    pagOrder: page.pag_order,
    permissions: page.tbl_permissions.map((p) => ({ perId: p.per_id, name: p.per_name })),
  }));
};

export const getUserPermissions = async ({ pagIds, useId }) => {
  if (!Array.isArray(pagIds) || pagIds.length === 0 || !useId) {
    return [];
  }

  const [permissions, individualRows, user] = await Promise.all([
    prisma.tbl_permissions.findMany({
      where: { pag_id: { in: pagIds } },
      select: { pag_id: true, per_id: true, per_name: true },
      orderBy: { per_order: "asc" },
    }),
    prisma.tbl_user_permissions.findMany({
      where: { use_id: Number(useId) },
      select: { per_id: true },
    }),
    prisma.tbl_users.findUnique({
      where: { use_id: Number(useId) },
      select: { pro_id: true },
    }),
  ]);

  const individualSet = new Set(individualRows.map((r) => r.per_id));
  const profilePermissionRows = user?.pro_id
    ? await prisma.tbl_profile_permissions.findMany({
        where: { pro_id: user.pro_id },
        select: { per_id: true },
      })
    : [];
  const profileSet = new Set(profilePermissionRows.map((r) => r.per_id));

  // "assigned" refleja el permiso EFECTIVO (unión perfil + individual), no
  // solo tbl_user_permissions — de lo contrario esta pantalla mostraría
  // como "no asignado" un permiso que el usuario sí tiene vía su perfil.
  return permissions.map((p) => ({
    pagId: p.pag_id,
    perId: p.per_id,
    name: p.per_name,
    assigned: individualSet.has(p.per_id) || profileSet.has(p.per_id) ? 1 : 0,
  }));
};

export const getProfilePermissions = async ({ pagIds, proId }) => {
  if (!Array.isArray(pagIds) || pagIds.length === 0 || !proId) {
    return [];
  }

  const [permissions, profileRows] = await Promise.all([
    prisma.tbl_permissions.findMany({
      where: { pag_id: { in: pagIds } },
      select: { pag_id: true, per_id: true, per_name: true },
      orderBy: { per_order: "asc" },
    }),
    prisma.tbl_profile_permissions.findMany({
      where: { pro_id: Number(proId) },
      select: { per_id: true },
    }),
  ]);

  const assignedSet = new Set(profileRows.map((r) => r.per_id));

  return permissions.map((p) => ({
    pagId: p.pag_id,
    perId: p.per_id,
    name: p.per_name,
    assigned: assignedSet.has(p.per_id) ? 1 : 0,
  }));
};

/**
 * Registra en la bitácora las asignaciones y revocaciones de permisos de un
 * perfil o usuario (ADR-0013 decisión 6: quién otorgó un permiso y cuándo
 * es una decisión con consecuencias de seguridad). Las tablas de unión no
 * tienen columnas de autoría: la bitácora es su única evidencia. Una fila
 * por permiso, todas con el mismo operationId.
 */
const auditPermissionChanges = async (tx, { entity, recordId, granted, revoked, ctx }) => {
  const operationId = newOperationId();
  if (granted.length > 0) {
    await writeAudit(tx, {
      operationId,
      entity,
      recordId,
      operation: AUDIT_OPERATIONS.GRANT,
      ctx,
      changes: granted.map((perId) => ({ field: "permiso", oldValue: null, newValue: perId })),
    });
  }
  if (revoked.length > 0) {
    await writeAudit(tx, {
      operationId,
      entity,
      recordId,
      operation: AUDIT_OPERATIONS.REVOKE,
      ctx,
      changes: revoked.map((perId) => ({ field: "permiso", oldValue: perId, newValue: null })),
    });
  }
};

export const updateProfilePermissions = async ({ permissions, proId, actingProId, ctx = {} }) => {
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

  await withLockedTransaction({ PERFIL: proId }, async (tx) => {
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

    await auditPermissionChanges(tx, {
      entity: AUDIT_ENTITIES.PROFILE,
      recordId: proId,
      granted: toInsert,
      revoked: toDelete,
      ctx,
    });
  });

  return { message: "Permisos actualizados" };
};

export const updateUserPermissions = async ({ permissions, useId, actingUseId, ctx = { useId: actingUseId } }) => {
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
  //
  // Todo se lee DESPUÉS de bloquear al usuario (ADR-0027): con REPEATABLE
  // READ, leer antes fijaría una instantánea que no vería un cambio de
  // perfil confirmado mientras se esperaba el bloqueo.
  const user = await withLockedTransaction({ USUARIO: useId }, async (tx) => {
    const target = await tx.tbl_users.findUnique({
      where: { use_id: Number(useId) },
      select: { pro_id: true },
    });

    const profilePermissions = target?.pro_id
      ? await tx.tbl_profile_permissions.findMany({
          where: { pro_id: target.pro_id },
          select: { per_id: true },
        })
      : [];
    const profileGrantedSet = new Set(profilePermissions.map((p) => p.per_id));
    const desiredIndividual = permissions.filter((perId) => !profileGrantedSet.has(perId));

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

    await auditPermissionChanges(tx, {
      entity: AUDIT_ENTITIES.USER,
      recordId: useId,
      granted: toInsert,
      revoked: toDelete,
      ctx,
    });

    return target;
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
