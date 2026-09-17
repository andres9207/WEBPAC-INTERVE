import {
  getConnection,
  releaseConnection,
  executeQuery,
} from "../../../common/configs/db.config.js";
import _ from "lodash";
import { prisma } from "../../../common/configs/prismaClient.js";

export const paginationProfiles = async ({
  useId,
  name,
  staId,
  rows,
  first,
  sortField,
  sortOrder,
}) => {
  const order = sortOrder === 1 ? "ASC" : "DESC";
  let connection = null;
  try {
    connection = await getConnection();

    const params = [];
    const wheres = ["p.sta_id != 3"];

    if (name) {
      wheres.push("p.pro_name LIKE ?");
      params.push(`%${name}%`);
    }

    if (staId) {
      wheres.push("p.sta_id = ?");
      params.push(staId);
    }

    if (useId != 1) {
      wheres.push("p.pro_id != 1");
    }

    const whereClause = `WHERE ${wheres.join(" AND ")}`;

    const mainQuery = `
      SELECT
        p.pro_id AS proId,
        p.pro_name AS name,
        e.sta_name AS statusName,
        p.pro_update_by AS updatedBy,
        p.pro_update_at AS updatedAt,
        p.sta_id AS staId
      FROM tbl_profiles p
      JOIN tbl_status e ON p.sta_id = e.sta_id
      ${whereClause}
      ORDER BY ${sortField} ${order}
      LIMIT ${rows} OFFSET ${first}
    `;

    const countQuery = `
      SELECT COUNT(DISTINCT pro_id) tot
      FROM tbl_profiles p
      JOIN tbl_status e ON p.sta_id = e.sta_id
      ${whereClause}
    `;

    const results = await executeQuery(mainQuery, params, connection);
    const rowsc = await executeQuery(countQuery, params, connection);

    return { results, total: rowsc[0].tot };
  } finally {
    releaseConnection(connection);
  }
};

export const getModules = async ({ proId }) => {
  let connection = null;
  try {
    connection = await getConnection();

    const resultsAso = await executeQuery(
      `SELECT v.pag_parent AS parent, v.pag_id AS pagId, v.pag_description AS description
       FROM tbl_pages v
       JOIN tbl_page_permissions pp ON v.pag_id = pp.pag_id
       WHERE pp.pro_id = ?
       ORDER BY v.pag_order`,
      [proId],
      connection
    );

    const idasociados = resultsAso.length
      ? resultsAso.map(({ pagId }) => pagId).join(",")
      : "''";

    const results = await executeQuery(
      `SELECT pag_parent AS parent, pag_id AS pagId, pag_description AS description
       FROM tbl_pages
       WHERE pag_id NOT IN (${idasociados})`,
      [],
      connection
    );

    return { associated: resultsAso, unassociated: results };
  } finally {
    releaseConnection(connection);
  }
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
    const result = await tx.tbl_profiles.updateMany({
      where: { pro_id: Number(proId) },
      data: { sta_id: 3, pro_update_by: Number(updatedBy) },
    });

    if (result.count > 0) {
      await tx.tbl_page_permissions.deleteMany({ where: { pro_id: Number(proId) } });
      return { message: "Perfil Eliminado Correctamente" };
    }

    const error = new Error("Error al eliminar el perfil.");
    error.statusCode = 400;
    throw error;
  });
};
