import {
  getConnection,
  releaseConnection,
  executeQuery,
} from "../../../common/configs/db.config.js";
import { prisma } from "../../../common/configs/prismaClient.js";

const SELECT_COLS = `
  SELECT
    d.doc_id id,
    d.doc_type docType,
    d.doc_id_ref docIdRef,
    CASE WHEN d.doc_extension = '' AND d.doc_mime_type = 'folder' THEN 'carpeta' ELSE 'archivo' END tipo,
    d.doc_name nombre,
    d.doc_path_storage docPathStorage,
    d.doc_url url,
    d.doc_extension extension,
    d.doc_mime_type mimeType,
    d.doc_size tamanio,
    d.sta_id estado,
    CONCAT(u.use_name, ' ', IFNULL(u.use_last_name, '')) usuReg,
    d.doc_create_at fecReg,
    d.doc_update_by usuAct,
    d.doc_update_at fecAct,
    d.doc_parent_id parentId,
    (SELECT COUNT(*) FROM tbl_documents WHERE doc_parent_id = d.doc_id AND sta_id != 3) itemCount
`;

const FROM_JOIN = `
  FROM tbl_documents d
  JOIN tbl_users u ON d.doc_create_by = u.use_id
`;

const WHERE_ACTIVE = "d.sta_id != 3";

export const paginationModuleDocs = async ({
  docType,
  docIdRef,
  nombre,
  rows,
  first,
  sortField = "doc_name",
  sortOrder,
  parentId = null,
  paginate = true,
}) => {
  let connection = null;
  try {
    connection = await getConnection();
    const order = sortOrder === 1 ? "ASC" : "DESC";

    const conditions = [WHERE_ACTIVE];

    if (nombre) conditions.push(`d.doc_name LIKE '%${nombre}%'`);
    if (docType) conditions.push(`d.doc_type = '${docType}'`);
    if (docType) {
      if (docIdRef) {
        conditions.push(`d.doc_id_ref = ${docIdRef}`);
      } else {
        conditions.push(`d.doc_id_ref IS NULL`);
      }
    }
    if (parentId === null && docType) {
      conditions.push(`d.doc_parent_id IS NULL`);
    } else if (docType) {
      conditions.push(`d.doc_parent_id = ${parentId}`);
    }

    const whereClause = conditions.length > 0
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    const limit = paginate ? `LIMIT ${rows} OFFSET ${first}` : "";

    const mainQuery = `
      ${SELECT_COLS}
      ${FROM_JOIN}
      ${whereClause}
      ORDER BY ${sortField} ${order}
      ${limit}
    `;

    const countQuery = `
      SELECT COUNT(*) total
      ${FROM_JOIN}
      ${whereClause}
    `;

    let currentFolder = null;
    if (parentId !== null) {
      const folderQuery = `
        ${SELECT_COLS}
        ${FROM_JOIN}
        WHERE d.doc_id = ${parentId}
        LIMIT 1
      `;
      const folderResult = await executeQuery(folderQuery, [], connection);
      currentFolder = folderResult.length > 0 ? folderResult[0] : null;
    }

    const data = await executeQuery(mainQuery, [], connection);
    const total = await executeQuery(countQuery, [], connection);

    return {
      results: data,
      total: total[0]?.total || 0,
      currentFolder,
    };
  } finally {
    releaseConnection(connection);
  }
};

export const saveModuleDoc = async ({
  id = 0,
  docType,
  docIdRef,
  nombre,
  docPathStorage,
  url,
  extension,
  mimeType,
  tamanio,
  estado = 1,
  docCreateBy,
  docUpdateBy,
  parentId = null,
}) => {
  const data = {
    doc_type: docType,
    doc_id_ref: Number(docIdRef),
    doc_name: nombre,
    doc_path_storage: docPathStorage,
    doc_url: url,
    doc_extension: extension,
    doc_mime_type: mimeType,
    doc_size: Number(tamanio),
    sta_id: Number(estado),
    doc_parent_id: parentId !== null ? Number(parentId) : null,
  };

  if (id > 0) {
    const updated = await prisma.tbl_documents.updateMany({
      where: { doc_id: Number(id) },
      data: { ...data, doc_update_by: Number(docUpdateBy) },
    });

    if (updated.count === 0) {
      const error = new Error("No se encontró el documento para actualizar.");
      error.status = 400;
      throw error;
    }

    return { message: "Documento actualizado correctamente." };
  }

  const created = await prisma.tbl_documents.create({
    data: {
      ...data,
      doc_create_by: Number(docCreateBy),
      doc_update_by: Number(docUpdateBy),
    },
  });

  return {
    message: "Documento registrado correctamente.",
    id: created.doc_id,
  };
};

export const deleteModuleDoc = async ({ id, usuAct }) => {
  let connection = null;
  try {
    connection = await getConnection();
    await connection.beginTransaction();

    const [doc] = await executeQuery(
      `SELECT doc_id id, doc_type docType, doc_name nombre, doc_extension extension, doc_mime_type mimeType, doc_parent_id parentId
       FROM tbl_documents WHERE doc_id = ?`,
      [id],
      connection,
    );

    if (!doc) {
      const error = new Error("No se encontró el documento para eliminar.");
      error.status = 400;
      throw error;
    }

    const esCarpeta = doc.extension === '' && doc.mimeType === 'folder';

    if (esCarpeta) {
      const deleteChildren = async (parentId) => {
        const children = await executeQuery(
          `SELECT doc_id id FROM tbl_documents WHERE doc_parent_id = ? AND sta_id != 3`,
          [parentId],
          connection,
        );
        for (const child of children) {
          await deleteChildren(child.id);
          await executeQuery(
            `UPDATE tbl_documents SET sta_id = 3, doc_update_by = ? WHERE doc_id = ?`,
            [usuAct, child.id],
            connection,
          );
        }
      };
      await deleteChildren(id);
    }

    const del = await executeQuery(
      `UPDATE tbl_documents SET sta_id = 3, doc_update_by = ? WHERE doc_id = ?`,
      [usuAct, id],
      connection,
    );

    if (del.affectedRows === 0) {
      const error = new Error("No se pudo eliminar el documento.");
      error.status = 400;
      throw error;
    }

    await connection.commit();
    return { message: "Documento eliminado correctamente." };
  } catch (err) {
    if (connection) await connection.rollback();
    throw err;
  } finally {
    releaseConnection(connection);
  }
};
