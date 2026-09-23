import _ from "lodash";
import { prisma } from "../../../common/configs/prismaClient.js";

const PROFILE_SORT_FIELDS = {
  name: (order) => ({ pro_name: order }),
  statusName: (order) => ({ tbl_status: { sta_name: order } }),
  updatedAt: (order) => ({ pro_update_at: order }),
  updatedBy: (order) => ({ pro_update_by: order }),
  staId: (order) => ({ sta_id: order }),
};

const MAX_ROWS = 100;

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

  const take = Math.min(Math.max(Number(rows) || 10, 1), MAX_ROWS);
  const skip = Math.max(Number(first) || 0, 0);

  const where = {
    sta_id: { not: 3 },
    ...(name ? { pro_name: { contains: name } } : {}),
    ...(staId ? { AND: [{ sta_id: Number(staId) }] } : {}),
    ...(Number(useId) !== 1 ? { NOT: { pro_id: 1 } } : {}),
  };

  const [profiles, total] = await Promise.all([
    prisma.tbl_profiles.findMany({
      where,
      select: {
        pro_id: true,
        pro_name: true,
        pro_update_by: true,
        pro_update_at: true,
        sta_id: true,
        tbl_status: { select: { sta_name: true } },
      },
      orderBy,
      take,
      skip,
    }),
    prisma.tbl_profiles.count({ where }),
  ]);

  const results = profiles.map((p) => ({
    proId: p.pro_id,
    name: p.pro_name,
    statusName: p.tbl_status?.sta_name ?? null,
    updatedBy: p.pro_update_by,
    updatedAt: p.pro_update_at,
    staId: p.sta_id,
  }));

  return { results, total };
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

export const saveProfile = async ({
  proId,
  name,
  staId,
  modules,
  previousModules,
  useBy,
}) => {
  return prisma.$transaction(async (tx) => {
    const duplicate = await tx.tbl_profiles.findFirst({
      where: {
        pro_name: name,
        sta_id: { not: 3 },
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
      const updateProfile = await tx.tbl_profiles.updateMany({
        where: { pro_id: Number(proId) },
        data: { pro_name: name, sta_id: Number(staId), pro_update_by: Number(useBy) },
      });

      if (updateProfile.count === 0) {
        const error = new Error("No se encontró el perfil para ser actualizado.");
        error.status = 400;
        throw error;
      }

      const moddelete = _.difference(previousModules, modules);
      const modinsert = _.difference(modules, previousModules);

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

    return {
      message: `Perfil ${name} Creado Correctamente`,
      proId: insertProfile.pro_id,
    };
  });
};

export const deleteProfile = async ({ proId, updatedBy }) => {
  // prisma.$transaction hace rollback solo si el callback lanza — reemplaza
  // el beginTransaction/commit/rollback manual de mysql2.
  return prisma.$transaction(async (tx) => {
    // Bloquear si hay usuarios activos con este perfil: antes no se
    // verificaba, así que un perfil se podía "eliminar" (soft-delete) con
    // usuarios todavía asignados — esos usuarios quedaban con pro_id
    // apuntando a un perfil inactivo, y sus tbl_page_permissions se borraban
    // en el mismo paso (ver abajo), dejándolos sin sidebar ni permisos de
    // perfil de un momento a otro, sin ninguna advertencia. Ver SECURITY.md.
    const dependentUsersCount = await tx.tbl_users.count({
      where: { pro_id: Number(proId), sta_id: { not: 3 } },
    });

    if (dependentUsersCount > 0) {
      const error = new Error(
        `No se puede eliminar el perfil: tiene ${dependentUsersCount} usuario(s) activo(s) asociado(s). Reasígnalos a otro perfil primero.`
      );
      error.statusCode = 400;
      throw error;
    }

    const result = await tx.tbl_profiles.updateMany({
      where: { pro_id: Number(proId) },
      data: { sta_id: 3, pro_update_by: Number(updatedBy) },
    });

    if (result.count === 0) {
      const error = new Error("Error al eliminar el perfil.");
      error.statusCode = 400;
      throw error;
    }

    // Limpieza completa de dependientes en la misma transacción:
    // tbl_page_permissions (páginas del sidebar) ya se limpiaba;
    // tbl_profile_permissions (plantilla de permisos de acción) no se
    // limpiaba y quedaba huérfana — si el perfil alguna vez se reactivara
    // (sta_id vuelve a 1 vía saveProfile), esos permisos viejos resucitarían
    // silenciosamente. Ver SECURITY.md.
    await tx.tbl_page_permissions.deleteMany({ where: { pro_id: Number(proId) } });
    await tx.tbl_profile_permissions.deleteMany({ where: { pro_id: Number(proId) } });

    return { message: "Perfil Eliminado Correctamente" };
  });
};
