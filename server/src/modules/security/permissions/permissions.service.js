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
      select: { per_id: true, usp_granted: true },
    }),
    prisma.tbl_users.findUnique({
      where: { use_id: Number(useId) },
      select: { pro_id: true },
    }),
  ]);

  const individualById = new Map(individualRows.map((r) => [r.per_id, r.usp_granted]));
  const profilePermissionRows = user?.pro_id
    ? await prisma.tbl_profile_permissions.findMany({
        where: { pro_id: user.pro_id },
        select: { per_id: true },
      })
    : [];
  const profileSet = new Set(profilePermissionRows.map((r) => r.per_id));

  // "assigned" refleja el permiso EFECTIVO ((perfil ∪ concedidos) − negados,
  // DEC-067), no solo tbl_user_permissions — de lo contrario esta pantalla
  // mostraría como "no asignado" un permiso que el usuario sí tiene vía su
  // perfil. "fromProfile" dice si el perfil lo da, para que la pantalla lo
  // distinga de una excepción.
  return permissions.map((p) => {
    const individual = individualById.get(p.per_id);
    const effective = individual ?? profileSet.has(p.per_id);
    return {
      pagId: p.pag_id,
      perId: p.per_id,
      name: p.per_name,
      assigned: effective ? 1 : 0,
      fromProfile: profileSet.has(p.per_id),
    };
  });
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

export const updateProfilePermissions = async ({ permissions, proId, ctx = {} }) => {
  if (!permissions || !proId) {
    const error = new Error(
      "Los permisos (permissions) y el perfil (proId) son obligatorios"
    );
    error.status = 400;
    throw error;
  }

  // Decisión del usuario (2026-10-23, SECURITY.md): quien tiene el permiso de
  // asignar permisos a perfiles puede modificar también los de su propio
  // perfil. Lo único que nadie hace sobre sí mismo es eliminarse
  // (users.service.js). `actingProId` ya no decide nada: el controller lo sigue enviando
  // (de req.user) por si la regla vuelve, y aquí se ignora.

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
  }, { idempotent: true });

  return { message: "Permisos actualizados" };
};

export const updateUserPermissions = async ({ permissions, pagIds, useId, actingUseId, ctx = { useId: actingUseId } }) => {
  if (!permissions || !Array.isArray(pagIds) || pagIds.length === 0 || !useId) {
    const error = new Error(
      "Los permisos (permissions), las ventanas (pagIds) y el usuario (useId) son obligatorios"
    );
    error.status = 400;
    throw error;
  }

  // Decisión del usuario (2026-10-23, SECURITY.md): quien tiene el permiso de
  // asignar permisos a usuarios puede modificar también los suyos.

  // tbl_user_permissions guarda solo las EXCEPCIONES individuales del
  // usuario, no su set completo de permisos: el efectivo es
  // (perfil ∪ concedidos) − negados (DEC-067, ver
  // effectivePermissions.service.js). El drawer del cliente envía el set
  // completo deseado de las ventanas que muestra (pagIds), y aquí se traduce
  // a excepciones, permiso por permiso:
  //   - deseado y el perfil no lo da   → excepción que concede
  //   - no deseado y el perfil lo da   → excepción que niega
  //   - lo demás                       → sin excepción (decide el perfil)
  // Así no quedan excepciones redundantes que sobrevivan a un cambio del
  // perfil. Solo se tocan los permisos de esas ventanas: un permiso de una
  // ventana que el drawer no mostró no se concede ni se niega por omisión.
  //
  // Todo se lee DESPUÉS de bloquear al usuario (ADR-0027): con REPEATABLE
  // READ, leer antes fijaría una instantánea que no vería un cambio de
  // perfil confirmado mientras se esperaba el bloqueo.
  const user = await withLockedTransaction({ USUARIO: useId }, async (tx) => {
    const target = await tx.tbl_users.findUnique({
      where: { use_id: Number(useId) },
      select: { pro_id: true },
    });

    const scopeRows = await tx.tbl_permissions.findMany({
      where: { pag_id: { in: pagIds.map(Number) } },
      select: { per_id: true },
    });
    const scope = scopeRows.map((p) => p.per_id);
    const scopeSet = new Set(scope);

    const outOfScope = permissions.filter((perId) => !scopeSet.has(perId));
    if (outOfScope.length > 0) {
      const error = new Error("Hay permisos que no pertenecen a las ventanas enviadas.");
      error.status = 400;
      throw error;
    }
    const desiredSet = new Set(permissions);

    const profilePermissions = target?.pro_id
      ? await tx.tbl_profile_permissions.findMany({
          where: { pro_id: target.pro_id },
          select: { per_id: true },
        })
      : [];
    const profileGrantedSet = new Set(profilePermissions.map((p) => p.per_id));

    const currentRows = await tx.tbl_user_permissions.findMany({
      where: { use_id: Number(useId), per_id: { in: scope } },
      select: { per_id: true, usp_granted: true },
    });
    const currentById = new Map(currentRows.map((r) => [r.per_id, r.usp_granted]));

    // Excepción que debe quedar por permiso: true concede, false niega,
    // undefined ninguna.
    const targetOf = (perId) => {
      const desired = desiredSet.has(perId);
      const fromProfile = profileGrantedSet.has(perId);
      if (desired && !fromProfile) return true;
      if (!desired && fromProfile) return false;
      return undefined;
    };

    const toDelete = [];
    const toInsert = [];
    const granted = [];
    const revoked = [];
    for (const perId of scope) {
      const current = currentById.get(perId);
      const next = targetOf(perId);
      if (current !== next) {
        if (current !== undefined) toDelete.push(perId);
        if (next !== undefined) toInsert.push({ perId, granted: next });
      }
      // La bitácora registra el cambio del permiso efectivo, no de la fila.
      const before = current ?? profileGrantedSet.has(perId);
      const after = desiredSet.has(perId);
      if (!before && after) granted.push(perId);
      if (before && !after) revoked.push(perId);
    }

    if (toDelete.length > 0) {
      await tx.tbl_user_permissions.deleteMany({
        where: { use_id: Number(useId), per_id: { in: toDelete } },
      });
    }

    if (toInsert.length > 0) {
      await tx.tbl_user_permissions.createMany({
        data: toInsert.map(({ perId, granted: uspGranted }) => ({
          per_id: perId,
          use_id: Number(useId),
          usp_granted: uspGranted,
        })),
      });
    }

    await auditPermissionChanges(tx, {
      entity: AUDIT_ENTITIES.USER,
      recordId: useId,
      granted,
      revoked,
      ctx,
    });

    return target;
  }, { idempotent: true });

  // Efectivo (unión), no solo las excepciones individuales que se acaban de
  // escribir — es lo que realmente representa "los permisos del usuario".
  const updatedPermissions = await getEffectivePermissionIds({ useId, proId: user?.pro_id });

  // Dirigido a la sala del usuario afectado (misma convención que
  // insertNotification en notifications.service.js), no a todos los
  // clientes conectados — antes cualquier sesión abierta en cualquier
  // navegador recibía el evento de CUALQUIER usuario cuyos permisos
  // cambiaran (ver engineering/anti-patterns/SECURITY.md).
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
