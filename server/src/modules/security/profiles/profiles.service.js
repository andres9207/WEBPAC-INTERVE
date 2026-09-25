import _ from "lodash";
import { prisma } from "../../../common/configs/prismaClient.js";
import { paginate } from "../../../common/utils/pagination.utils.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { withLockedTransaction, withTransaction } from "../../../common/services/transaction.service.js";
import {
  AUDIT_ENTITIES,
  AUDIT_OPERATIONS,
  diffFields,
  newOperationId,
  writeAudit,
} from "../../../common/services/audit.service.js";

const PROFILE_SORT_FIELDS = {
  name: (order) => ({ pro_name: order }),
  statusName: (order) => ({ tbl_status: { sta_name: order } }),
  updatedAt: (order) => ({ pro_update_at: order }),
  updatedBy: (order) => ({ pro_update_by: order }),
  staId: (order) => ({ sta_id: order }),
};


export const paginationProfiles = async ({
  useId,
  name,
  staId,
  rows,
  first,
  sortField,
  sortOrder,
}) => {
  const order = sortOrder === 1 ? "asc" : "desc";
  // sortField nunca se pasa directo a Prisma: solo columnas de esta lista
  // fija pueden terminar en el ORDER BY (antes: ORDER BY ${sortField},
  // interpolado sin validar — ver SECURITY.md).
  const orderBy = (PROFILE_SORT_FIELDS[sortField] ?? PROFILE_SORT_FIELDS.name)(order);

  const where = {
    sta_id: { not: 3 },
    ...(name ? { pro_name: { contains: name } } : {}),
    ...(staId ? { AND: [{ sta_id: Number(staId) }] } : {}),
    ...(Number(useId) !== 1 ? { NOT: { pro_id: 1 } } : {}),
  };

  const page = await paginate(
    prisma.tbl_profiles,
    {
      where,
      select: {
        pro_id: true,
        pro_name: true,
        pro_update_by: true,
        pro_update_at: true,
        sta_id: true,
        tbl_status: { select: { sta_name: true } },
        updated_by_user: USER_NAME_SELECT,
      },
      orderBy,
    },
    { first, rows }
  );

  const results = page.results.map((p) => ({
    proId: p.pro_id,
    name: p.pro_name,
    statusName: p.tbl_status?.sta_name ?? null,
    updatedBy: p.pro_update_by,
    updatedByName: userFullName(p.updated_by_user),
    updatedAt: p.pro_update_at,
    staId: p.sta_id,
  }));

  return { ...page, results };
};

export const getModules = async ({ proId }) => {
  const associatedPages = await prisma.tbl_pages.findMany({
    where: { tbl_page_permissions: { some: { pro_id: Number(proId) } } },
    select: { pag_id: true, pag_parent: true, pag_description: true },
    orderBy: { pag_order: "asc" },
  });

  const associatedIds = associatedPages.map((p) => p.pag_id);

  const unassociatedPages = await prisma.tbl_pages.findMany({
    where: { pag_id: { notIn: associatedIds } },
    select: { pag_id: true, pag_parent: true, pag_description: true },
  });

  const toShape = (p) => ({ parent: p.pag_parent, pagId: p.pag_id, description: p.pag_description });

  return {
    associated: associatedPages.map(toShape),
    unassociated: unassociatedPages.map(toShape),
  };
};

const DELETED_STATUS = 3;

export const saveProfile = async ({
  proId,
  name,
  staId,
  modules,
  previousModules,
  useBy,
  ctx = { useId: useBy },
}) => {
  const operationId = newOperationId();

  // Editar bloquea el perfil antes de leer nada (ADR-0027); crear no tiene
  // fila que bloquear.
  const run = proId > 0 ? (fn) => withLockedTransaction({ PERFIL: proId }, fn) : withTransaction;

  return run(async (tx) => {
    const duplicate = await tx.tbl_profiles.findFirst({
      where: {
        pro_name: name,
        sta_id: { not: DELETED_STATUS },
        ...(proId > 0 ? { pro_id: { not: Number(proId) } } : {}),
      },
      select: { pro_id: true },
    });

    if (duplicate) {
      const error = new Error(
        "Ya existe un Perfil con el nombre ingresado. Verificar"
      );
      error.status = 400;
      throw error;
    }

    if (proId > 0) {
      const before = await tx.tbl_profiles.findUnique({
        where: { pro_id: Number(proId) },
        select: { pro_name: true, sta_id: true },
      });

      if (!before) {
        const error = new Error("No se encontró el perfil para ser actualizado.");
        error.status = 400;
        throw error;
      }

      const reactivated = before.sta_id === DELETED_STATUS && Number(staId) !== DELETED_STATUS;
      const data = {
        pro_name: name,
        sta_id: Number(staId),
        pro_update_by: Number(useBy),
        ...(reactivated ? { pro_delete_by: null, pro_delete_at: null } : {}),
      };

      await tx.tbl_profiles.update({ where: { pro_id: Number(proId) }, data });

      // El diff de páginas se calcula contra lo que hay en BD, no contra el
      // previousModules que manda el cliente: la bitácora debe reflejar el
      // cambio real, no el que el cliente cree que hizo.
      const currentPages = await tx.tbl_page_permissions.findMany({
        where: { pro_id: Number(proId), pag_id: { not: null } },
        select: { pag_id: true },
      });
      const currentIds = currentPages.map((p) => p.pag_id);
      const moddelete = _.difference(currentIds, modules);
      const modinsert = _.difference(modules, currentIds);

      if (moddelete.length > 0) {
        await tx.tbl_page_permissions.deleteMany({
          where: { pro_id: Number(proId), pag_id: { in: moddelete } },
        });
      }

      if (modinsert.length > 0) {
        await tx.tbl_page_permissions.createMany({
          data: modinsert.map((pagId) => ({ pro_id: Number(proId), pag_id: pagId })),
        });
      }

      const changes = diffFields(before, data, ["pro_name", "sta_id"]);
      if (moddelete.length > 0 || modinsert.length > 0) {
        changes.push({ field: "paginas", oldValue: currentIds, newValue: _.uniq(modules) });
      }

      if (changes.length > 0) {
        await writeAudit(tx, {
          operationId,
          entity: AUDIT_ENTITIES.PROFILE,
          recordId: proId,
          operation: reactivated ? AUDIT_OPERATIONS.REACTIVATE : AUDIT_OPERATIONS.UPDATE,
          ctx,
          changes,
        });
      }

      return { message: `Perfil ${name} Modificado Correctamente` };
    }

    const insertProfile = await tx.tbl_profiles.create({
      data: {
        pro_name: name,
        sta_id: Number(staId),
        pro_create_by: Number(useBy),
        pro_update_by: Number(useBy),
      },
    });

    if (modules.length > 0) {
      await tx.tbl_page_permissions.createMany({
        data: modules.map((pagId) => ({ pro_id: insertProfile.pro_id, pag_id: pagId })),
      });
    }

    await writeAudit(tx, {
      operationId,
      entity: AUDIT_ENTITIES.PROFILE,
      recordId: insertProfile.pro_id,
      operation: AUDIT_OPERATIONS.CREATE,
      ctx,
      changes: [
        { field: "pro_name", oldValue: null, newValue: name },
        { field: "sta_id", oldValue: null, newValue: Number(staId) },
        ...(modules.length > 0 ? [{ field: "paginas", oldValue: null, newValue: modules }] : []),
      ],
    });

    return {
      message: `Perfil ${name} Creado Correctamente`,
      proId: insertProfile.pro_id,
    };
  });
};

export const deleteProfile = async ({ proId, updatedBy, ctx = { useId: updatedBy } }) => {
  // La transacción hace rollback si el callback lanza. El perfil se bloquea
  // primero: saveUser bloquea el perfil que asigna, así que la verificación
  // de "sin usuarios" de abajo no se cruza con una asignación (ADR-0027).
  return withLockedTransaction({ PERFIL: proId }, async (tx) => {
    // Bloquear si hay usuarios activos con este perfil: antes no se
    // verificaba, así que un perfil se podía "eliminar" (soft-delete) con
    // usuarios todavía asignados — esos usuarios quedaban con pro_id
    // apuntando a un perfil inactivo, y sus tbl_page_permissions se borraban
    // en el mismo paso (ver abajo), dejándolos sin sidebar ni permisos de
    // perfil de un momento a otro, sin ninguna advertencia. Ver SECURITY.md.
    const dependentUsersCount = await tx.tbl_users.count({
      where: { pro_id: Number(proId), sta_id: { not: DELETED_STATUS } },
    });

    if (dependentUsersCount > 0) {
      const error = new Error(
        `No se puede eliminar el perfil: tiene ${dependentUsersCount} usuario(s) activo(s) asociado(s). Reasígnalos a otro perfil primero.`
      );
      error.statusCode = 400;
      throw error;
    }

    const before = await tx.tbl_profiles.findUnique({
      where: { pro_id: Number(proId) },
      select: { sta_id: true },
    });

    if (!before || before.sta_id === DELETED_STATUS) {
      const error = new Error("Error al eliminar el perfil.");
      error.statusCode = 400;
      throw error;
    }

    // sta_id = 3 sigue decidiendo la visibilidad; pro_delete_by/_at guardan
    // quién y cuándo, separado de pro_update_by/_at (ADR-0013).
    await tx.tbl_profiles.update({
      where: { pro_id: Number(proId) },
      data: {
        sta_id: DELETED_STATUS,
        pro_update_by: Number(updatedBy),
        pro_delete_by: Number(updatedBy),
        pro_delete_at: new Date(),
      },
    });

    // Limpieza completa de dependientes en la misma transacción:
    // tbl_page_permissions (páginas del sidebar) ya se limpiaba;
    // tbl_profile_permissions (plantilla de permisos de acción) no se
    // limpiaba y quedaba huérfana — si el perfil alguna vez se reactivara
    // (sta_id vuelve a 1 vía saveProfile), esos permisos viejos resucitarían
    // silenciosamente. Ver SECURITY.md.
    //
    // Es un borrado físico: la bitácora es la única evidencia de qué páginas
    // y permisos tenía el perfil, así que se leen antes de borrarlos y se
    // registran como revocados en la misma operación que la eliminación.
    const [pages, permissions] = await Promise.all([
      tx.tbl_page_permissions.findMany({ where: { pro_id: Number(proId) }, select: { pag_id: true } }),
      tx.tbl_profile_permissions.findMany({ where: { pro_id: Number(proId) }, select: { per_id: true } }),
    ]);

    await tx.tbl_page_permissions.deleteMany({ where: { pro_id: Number(proId) } });
    await tx.tbl_profile_permissions.deleteMany({ where: { pro_id: Number(proId) } });

    const operationId = newOperationId();
    await writeAudit(tx, {
      operationId,
      entity: AUDIT_ENTITIES.PROFILE,
      recordId: proId,
      operation: AUDIT_OPERATIONS.DELETE,
      ctx,
      changes: [
        { field: "sta_id", oldValue: before.sta_id, newValue: DELETED_STATUS },
        ...(pages.length > 0
          ? [{ field: "paginas", oldValue: pages.map((p) => p.pag_id).filter(Boolean), newValue: null }]
          : []),
      ],
    });

    if (permissions.length > 0) {
      await writeAudit(tx, {
        operationId,
        entity: AUDIT_ENTITIES.PROFILE,
        recordId: proId,
        operation: AUDIT_OPERATIONS.REVOKE,
        ctx,
        changes: permissions.map((p) => ({ field: "permiso", oldValue: p.per_id, newValue: null })),
      });
    }

    return { message: "Perfil Eliminado Correctamente" };
  });
};

