import { prisma } from "../../../common/configs/prismaClient.js";
import { paginate } from "../../../common/utils/pagination.utils.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";

const DOC_SELECT = {
  doc_id: true,
  doc_type: true,
  doc_id_ref: true,
  doc_name: true,
  doc_path_storage: true,
  doc_url: true,
  doc_extension: true,
  doc_mime_type: true,
  doc_size: true,
  sta_id: true,
  doc_create_by: true,
  doc_create_at: true,
  doc_update_by: true,
  doc_update_at: true,
  doc_parent_id: true,
};

const DOC_SORT_FIELDS = {
  doc_name: (order) => ({ doc_name: order }),
  doc_type: (order) => ({ doc_type: order }),
  doc_size: (order) => ({ doc_size: order }),
  doc_create_at: (order) => ({ doc_create_at: order }),
  doc_update_at: (order) => ({ doc_update_at: order }),
};


// tbl_documents.doc_create_by (autor) y doc_parent_id (árbol de carpetas) no
// tienen FK declarada en la BD (confirmado: schema.prisma introspectado no
// trae esas relaciones), así que Prisma no puede resolverlas con include/
// select anidado — se completan con consultas puntuales y un mapa en JS, en
// vez de forzar relaciones sin respaldo real en el schema.
async function enrichDocs(docs) {
  const creatorIds = [...new Set(docs.map((d) => d.doc_create_by).filter(Boolean))];
  const docIds = docs.map((d) => d.doc_id);

  const [creators, childCounts] = await Promise.all([
    creatorIds.length
      ? prisma.tbl_users.findMany({
          where: { use_id: { in: creatorIds } },
          select: { use_id: true, use_name: true, use_last_name: true },
        })
      : [],
    docIds.length
      ? prisma.tbl_documents.groupBy({
          by: ["doc_parent_id"],
          where: { doc_parent_id: { in: docIds }, sta_id: { not: 3 } },
          _count: { doc_id: true },
        })
      : [],
  ]);

  const creatorById = new Map(creators.map((u) => [u.use_id, `${u.use_name} ${u.use_last_name ?? ""}`]));
  const childCountByParent = new Map(childCounts.map((c) => [c.doc_parent_id, c._count.doc_id]));

  return docs.map((d) => ({
    id: d.doc_id,
    docType: d.doc_type,
    docIdRef: d.doc_id_ref,
    tipo: d.doc_extension === "" && d.doc_mime_type === "folder" ? "carpeta" : "archivo",
    nombre: d.doc_name,
    docPathStorage: d.doc_path_storage,
    url: d.doc_url,
    extension: d.doc_extension,
    mimeType: d.doc_mime_type,
    tamanio: d.doc_size,
    estado: d.sta_id,
    usuReg: creatorById.get(d.doc_create_by) ?? "",
    fecReg: d.doc_create_at,
    usuAct: d.doc_update_by,
    fecAct: d.doc_update_at,
    parentId: d.doc_parent_id,
    itemCount: childCountByParent.get(d.doc_id) ?? 0,
  }));
}

export const paginationModuleDocs = async ({
  docType,
  docIdRef,
  nombre,
  rows,
  first,
  sortField = "doc_name",
  sortOrder,
  parentId = null,
}) => {
  const order = sortOrder === 1 ? "asc" : "desc";
  // sortField nunca se pasa directo a Prisma: solo columnas de esta lista
  // fija pueden terminar en el ORDER BY. Antes: nombre/docType se
  // interpolaban crudos en LIKE/'=' (inyección SQL vía el body de
  // pagination), y docIdRef/parentId sin castear a número — ver SECURITY.md.
  const orderBy = (DOC_SORT_FIELDS[sortField] ?? DOC_SORT_FIELDS.doc_name)(order);

  const where = {
    sta_id: { not: 3 },
    ...(nombre ? { doc_name: { contains: nombre } } : {}),
    ...(docType ? { doc_type: docType } : {}),
    ...(docType
      ? { doc_id_ref: docIdRef ? Number(docIdRef) : null }
      : {}),
    ...(docType
      ? { doc_parent_id: parentId === null ? null : Number(parentId) }
      : {}),
  };

  // Siempre paginado (tope MAX_ROWS de pagination.utils.js). Antes,
  // `paginate: false` en el body devolvía todos los documentos del filtro
  // sin límite: ningún cliente lo usaba y bastaba para pedir la tabla
  // completa de una vez.
  const [page, currentFolderDoc] = await Promise.all([
    paginate(prisma.tbl_documents, { where, select: DOC_SELECT, orderBy }, { first, rows }),
    parentId !== null
      ? prisma.tbl_documents.findUnique({ where: { doc_id: Number(parentId) }, select: DOC_SELECT })
      : Promise.resolve(null),
  ]);

  const [enrichedDocs, enrichedFolder] = await Promise.all([
    enrichDocs(page.results),
    currentFolderDoc ? enrichDocs([currentFolderDoc]) : Promise.resolve([null]),
  ]);

  return {
    ...page,
    results: enrichedDocs,
    currentFolder: enrichedFolder[0] ?? null,
  };
};

// Clave de idempotencia de la creación (ADR-0027, decisión 7), en la propia
// fila del documento.
const DOC_CREATE_IDEMPOTENCY = {
  model: prisma.tbl_documents,
  keyField: "doc_idempotency_key",
  hashField: "doc_idempotency_hash",
  ownerField: "doc_create_by",
  select: { doc_id: true },
  toResult: (doc) => ({ message: "Documento registrado correctamente.", id: doc.doc_id }),
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
  idempotencyKey,
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
      data: {
        ...data,
        doc_update_by: Number(docUpdateBy),
        // Un documento que vuelve a un estado visible deja de estar
        // eliminado: se limpia la evidencia de eliminación de la fila.
        ...(data.sta_id !== 3 ? { doc_delete_by: null, doc_delete_at: null } : {}),
      },
    });

    if (updated.count === 0) {
      const error = new Error("No se encontró el documento para actualizar.");
      error.status = 400;
      throw error;
    }

    return { message: "Documento actualizado correctamente." };
  }

  // Crear: una sola vez por clave (ADR-0027, decisión 7). Un doble envío del
  // mismo archivo devuelve el documento ya registrado en vez de duplicarlo.
  return runIdempotent({
    target: DOC_CREATE_IDEMPOTENCY,
    key: idempotencyKey,
    ownerId: docCreateBy,
    payload: data,
    execute: async (idempotencyData) => {
      const created = await prisma.tbl_documents.create({
        data: {
          ...data,
          doc_create_by: Number(docCreateBy),
          doc_update_by: Number(docUpdateBy),
          ...idempotencyData,
        },
      });
      return DOC_CREATE_IDEMPOTENCY.toResult(created);
    },
  });
};

export const deleteModuleDoc = async ({ id, usuAct }) => {
  return withLockedTransaction({ DOCUMENTO: id }, async (tx) => {
    const doc = await tx.tbl_documents.findUnique({
      where: { doc_id: Number(id) },
      select: { doc_id: true, doc_extension: true, doc_mime_type: true },
    });

    if (!doc) {
      const error = new Error("No se encontró el documento para eliminar.");
      error.status = 400;
      throw error;
    }

    const esCarpeta = doc.doc_extension === "" && doc.doc_mime_type === "folder";

    // sta_id = 3 sigue decidiendo la visibilidad; doc_delete_by/_at guardan
    // quién y cuándo (ADR-0013). Misma marca para la carpeta y todo su
    // contenido: son una sola eliminación. Documentos = auditoría técnica
    // (ADR-0013, decisión 9): no se escribe en la bitácora.
    const deletedData = {
      sta_id: 3,
      doc_update_by: Number(usuAct),
      doc_delete_by: Number(usuAct),
      doc_delete_at: new Date(),
    };

    if (esCarpeta) {
      const deleteChildren = async (parentId) => {
        const children = await tx.tbl_documents.findMany({
          where: { doc_parent_id: parentId, sta_id: { not: 3 } },
          select: { doc_id: true },
        });
        for (const child of children) {
          await deleteChildren(child.doc_id);
          await tx.tbl_documents.update({
            where: { doc_id: child.doc_id },
            data: deletedData,
          });
        }
      };
      await deleteChildren(Number(id));
    }

    await tx.tbl_documents.update({
      where: { doc_id: Number(id) },
      data: deletedData,
    });

    return { message: "Documento eliminado correctamente." };
  });
};
