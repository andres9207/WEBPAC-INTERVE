import { prisma } from "../../../common/configs/prismaClient.js";
import { paginate, MAX_ROWS } from "../../../common/utils/pagination.utils.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { withLockedTransaction, withTransaction } from "../../../common/services/transaction.service.js";

// Maestro de tipos de identificación (ADR-0008). Catálogo de nivel 1:
// auditoría técnica (columnas de autoría), sin bitácora (ADR-0013, dec. 9).

const ACTIVE_STATUS = 1;
const DELETED_STATUS = 3;

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

const IDENTITY_DOCUMENT_SORT_FIELDS = {
  code: (order) => ({ idd_code: order }),
  name: (order) => ({ idd_name: order }),
  statusName: (order) => ({ tbl_status: { sta_name: order } }),
  updatedAt: (order) => ({ idd_update_at: order }),
};

export const paginationIdentityDocuments = async ({ code, name, staId, rows, first, sortField, sortOrder }) => {
  const order = sortOrder === 1 ? "asc" : "desc";
  const orderBy = (IDENTITY_DOCUMENT_SORT_FIELDS[sortField] ?? IDENTITY_DOCUMENT_SORT_FIELDS.name)(order);

  const where = {
    sta_id: { not: DELETED_STATUS },
    ...(code ? { idd_code: { contains: code } } : {}),
    ...(name ? { idd_name: { contains: name } } : {}),
    ...(staId ? { AND: [{ sta_id: Number(staId) }] } : {}),
  };

  const page = await paginate(
    prisma.tbl_identity_documents,
    {
      where,
      select: {
        idd_id: true,
        idd_code: true,
        idd_name: true,
        idd_update_at: true,
        sta_id: true,
        tbl_status: { select: { sta_name: true } },
        updated_by_user: USER_NAME_SELECT,
      },
      orderBy,
    },
    { first, rows }
  );

  const results = page.results.map((d) => ({
    iddId: d.idd_id,
    code: d.idd_code,
    name: d.idd_name,
    staId: d.sta_id,
    statusName: d.tbl_status?.sta_name ?? null,
    updatedAt: d.idd_update_at,
    updatedByName: userFullName(d.updated_by_user),
  }));

  return { ...page, results };
};

/**
 * Opciones del selector (DEC-018): catálogo pequeño, sin paginar, con tope
 * fijo de MAX_ROWS filas. Solo activos, más `includeId` si no está eliminado
 * (el tipo actual del registro que se edita, aunque esté inactivo).
 */
export const getIdentityDocumentsSelect = async ({ includeId }) => {
  const documents = await prisma.tbl_identity_documents.findMany({
    where: {
      OR: [
        { sta_id: ACTIVE_STATUS },
        ...(Number(includeId) > 0 ? [{ idd_id: Number(includeId), sta_id: { not: DELETED_STATUS } }] : []),
      ],
    },
    select: { idd_id: true, idd_code: true, idd_name: true, sta_id: true },
    orderBy: { idd_name: "asc" },
    take: MAX_ROWS,
  });

  return documents.map((d) => ({
    value: d.idd_id,
    label: `${d.idd_name} (${d.idd_code})`,
    code: d.idd_code,
    staId: d.sta_id,
  }));
};

// Clave de idempotencia de la creación (ADR-0027, decisión 7), en la propia fila.
const IDENTITY_DOCUMENT_CREATE_IDEMPOTENCY = {
  model: prisma.tbl_identity_documents,
  keyField: "idd_idempotency_key",
  hashField: "idd_idempotency_hash",
  ownerField: "idd_create_by",
  select: { idd_id: true, idd_name: true },
  toResult: (d) => ({ message: `Tipo de identificación ${d.idd_name} creado correctamente`, iddId: d.idd_id }),
};

const normalizeCode = (code) => String(code ?? "").trim().toUpperCase();

export const saveIdentityDocument = async (args) => {
  if (args.iddId > 0) return persistIdentityDocument(args);

  // Crear: la clave se busca antes que el control de duplicados, para que el
  // reintento de una creación exitosa devuelva el tipo creado.
  return runIdempotent({
    target: IDENTITY_DOCUMENT_CREATE_IDEMPOTENCY,
    key: args.idempotencyKey,
    ownerId: args.useBy,
    payload: { code: normalizeCode(args.code), name: args.name, staId: args.staId },
    execute: (idempotencyData) => persistIdentityDocument({ ...args, idempotencyData }),
  });
};

const persistIdentityDocument = ({ iddId, code, name, staId, useBy, idempotencyData = {} }) => {
  const isEdit = iddId > 0;
  // Editar bloquea antes de leer y es reintentable (fija nombre y estado);
  // crear no tiene fila que bloquear.
  const run = isEdit
    ? (fn) => withLockedTransaction({ TIPO_IDENTIFICACION: iddId }, fn, { idempotent: true })
    : withTransaction;

  return run(async (tx) => {
    if (isEdit) {
      const before = await tx.tbl_identity_documents.findUnique({
        where: { idd_id: Number(iddId) },
        select: { sta_id: true },
      });
      if (!before) throw httpError(404, "No se encontró el tipo de identificación.");

      // El código no es editable: solo se compara el nombre.
      const duplicate = await tx.tbl_identity_documents.findFirst({
        where: { idd_name: name, sta_id: { not: DELETED_STATUS }, idd_id: { not: Number(iddId) } },
        select: { idd_id: true },
      });
      if (duplicate) throw httpError(400, "Ya existe un tipo de identificación con ese nombre.");

      const reactivated = before.sta_id === DELETED_STATUS;
      await tx.tbl_identity_documents.update({
        where: { idd_id: Number(iddId) },
        data: {
          idd_name: name,
          sta_id: Number(staId),
          idd_update_by: Number(useBy),
          ...(reactivated ? { idd_delete_by: null, idd_delete_at: null } : {}),
        },
      });
      return { message: `Tipo de identificación ${name} modificado correctamente` };
    }

    const normalizedCode = normalizeCode(code);
    const duplicate = await tx.tbl_identity_documents.findFirst({
      where: {
        sta_id: { not: DELETED_STATUS },
        OR: [{ idd_code: normalizedCode }, { idd_name: name }],
      },
      select: { idd_code: true },
    });
    if (duplicate) {
      // La colación de la columna es la que decide la igualdad; aquí solo se
      // elige el mensaje.
      const sameCode = duplicate.idd_code.toUpperCase() === normalizedCode;
      throw httpError(400, `Ya existe un tipo de identificación con ese ${sameCode ? "código" : "nombre"}.`);
    }

    const created = await tx.tbl_identity_documents.create({
      data: {
        idd_code: normalizedCode,
        idd_name: name,
        sta_id: Number(staId),
        idd_create_by: Number(useBy),
        idd_update_by: Number(useBy),
        ...idempotencyData,
      },
    });
    return { message: `Tipo de identificación ${name} creado correctamente`, iddId: created.idd_id };
  });
};

export const deleteIdentityDocument = ({ iddId, useBy }) =>
  // El tipo se bloquea primero: saveUser bloquea el tipo que asigna, así que
  // "sin usuarios que lo usen" no se cruza con una asignación (ADR-0027).
  withLockedTransaction({ TIPO_IDENTIFICACION: iddId }, async (tx) => {
    const before = await tx.tbl_identity_documents.findUnique({
      where: { idd_id: Number(iddId) },
      select: { sta_id: true },
    });
    if (!before || before.sta_id === DELETED_STATUS) {
      throw httpError(404, "El tipo de identificación no existe.");
    }

    // ADR-0008, decisión 6. Cuando existan proveedores, se cuentan aquí también.
    const usersCount = await tx.tbl_users.count({
      where: { idd_id: Number(iddId), sta_id: { not: DELETED_STATUS } },
    });
    if (usersCount > 0) {
      throw httpError(
        400,
        `No se puede eliminar el tipo de identificación: lo usan ${usersCount} usuario(s). Puedes desactivarlo para que no se asigne en registros nuevos.`
      );
    }

    await tx.tbl_identity_documents.update({
      where: { idd_id: Number(iddId) },
      data: {
        sta_id: DELETED_STATUS,
        idd_update_by: Number(useBy),
        idd_delete_by: Number(useBy),
        idd_delete_at: new Date(),
      },
    });
    return { message: "Tipo de identificación eliminado correctamente" };
  });
