import { hashPassword } from "../../../common/utils/funciones.js";
import { prisma } from "../../../common/configs/prismaClient.js";
import { paginate } from "../../../common/utils/pagination.utils.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import {
  AUDIT_ENTITIES,
  AUDIT_OPERATIONS,
  diffFields,
  newOperationId,
  writeAudit,
} from "../../../common/services/audit.service.js";

const USER_SORT_FIELDS = {
  name: (order) => ({ use_name: order }),
  lastName: (order) => ({ use_last_name: order }),
  identification: (order) => ({ use_identification: order }),
  username: (order) => ({ use_user: order }),
  email: (order) => ({ use_email: order }),
  staId: (order) => ({ sta_id: order }),
  updatedAt: (order) => ({ use_update_at: order }),
  updatedBy: (order) => ({ use_update_by: order }),
  access: (order) => ({ use_access: order }),
  changePassword: (order) => ({ use_change_password: order }),
  profileName: (order) => ({ tbl_profiles: { pro_name: order } }),
  statusName: (order) => ({ tbl_status: { sta_name: order } }),
};


export const paginationUsers = async ({
  proId,
  name,
  lastName,
  email,
  identification,
  username,
  staId,
  rows,
  first,
  sortField,
  sortOrder,
}) => {
  const order = sortOrder === 1 ? "asc" : "desc";
  // sortField nunca se pasa directo a Prisma: solo columnas de esta lista
  // fija pueden terminar en el ORDER BY, cualquier otro valor cae al default
  // seguro. Antes se interpolaba el string del cliente directo en el SQL
  // (ORDER BY ${sortField}) — ver SECURITY.md.
  const orderBy = (USER_SORT_FIELDS[sortField] ?? USER_SORT_FIELDS.name)(order);

  // Antes: name/lastName/email/identification/username se interpolaban
  // crudos en cláusulas LIKE (`LIKE REPLACE('%${name}%', ...)`), sin
  // parametrizar — inyección SQL explotable vía el body de list_users. El
  // `where` de Prisma nunca interpola: siempre parametrizado por diseño.
  const where = {
    ...(proId ? { pro_id: Number(proId) } : {}),
    ...(name ? { use_name: { contains: name } } : {}),
    ...(lastName ? { use_last_name: { contains: lastName } } : {}),
    ...(email ? { use_email: { contains: email } } : {}),
    ...(identification ? { use_identification: { contains: identification } } : {}),
    ...(username ? { use_user: { contains: username } } : {}),
    sta_id: { not: 3 },
    ...(staId ? { AND: [{ sta_id: Number(staId) }] } : {}),
    // JOIN tbl_profiles p ON u.pro_id = p.pro_id AND p.sta_id = 1 del SQL
    // original: solo usuarios cuyo perfil sigue activo.
    tbl_profiles: { sta_id: 1 },
  };

  const page = await paginate(
    prisma.tbl_users,
    {
      where,
      select: {
        use_id: true,
        use_name: true,
        use_last_name: true,
        use_identification: true,
        use_user: true,
        use_email: true,
        use_access: true,
        use_change_password: true,
        use_update_at: true,
        use_update_by: true,
        sta_id: true,
        pro_id: true,
        tbl_profiles: { select: { pro_name: true } },
        tbl_status: { select: { sta_name: true } },
        tbl_user_pages: { select: { pag_id: true } },
        updated_by_user: USER_NAME_SELECT,
      },
      orderBy,
    },
    { first, rows }
  );

  const results = page.results.map((u) => ({
    useId: u.use_id,
    name: u.use_name,
    lastName: u.use_last_name,
    identification: u.use_identification,
    username: u.use_user,
    email: u.use_email,
    profileName: u.tbl_profiles?.pro_name ?? null,
    statusName: u.tbl_status?.sta_name ?? null,
    access: u.use_access,
    changePassword: u.use_change_password,
    updatedAt: u.use_update_at,
    updatedBy: u.use_update_by,
    // Nombre del autor resuelto aquí: el cliente no tiene por qué traducir ids.
    updatedByName: userFullName(u.updated_by_user),
    staId: u.sta_id,
    proId: u.pro_id,
    // Contrato sin cambios hacia el cliente (UserDialog.jsx sigue
    // esperando un CSV): internamente ya viene de tbl_user_pages, no del
    // viejo tbl_users.use_pages (ver database/migrations/0005_*).
    usePages: u.tbl_user_pages.map((p) => p.pag_id).join(","),
  }));

  return { ...page, results };
};

export const countUsers = async ({ useId }) => {
  const profiles = await prisma.tbl_profiles.findMany({
    where: {
      sta_id: 1,
      ...(Number(useId) !== 1 ? { NOT: { pro_id: 1 } } : {}),
    },
    select: {
      pro_id: true,
      pro_name: true,
      _count: { select: { tbl_users: { where: { sta_id: { not: 3 } } } } },
    },
    orderBy: { pro_name: "asc" },
  });

  // El SQL original hacía un INNER JOIN desde tbl_users, así que un perfil
  // sin ningún usuario activo ni siquiera aparecía en el resultado — se
  // replica descartando los perfiles con conteo 0.
  return profiles
    .filter((p) => p._count.tbl_users > 0)
    .map((p) => ({ count: p._count.tbl_users, name: p.pro_name, proId: p.pro_id }));
};

async function checkIfUserExists({ identification, email, username, useId }) {
  const conditions = [];
  if (identification) conditions.push({ use_identification: identification });
  if (email) conditions.push({ use_email: email });
  if (username) conditions.push({ use_user: username });

  if (conditions.length === 0) return null;

  return prisma.tbl_users.findFirst({
    where: {
      sta_id: { not: 3 },
      OR: conditions,
      ...(useId > 0 ? { NOT: { use_id: Number(useId) } } : {}),
    },
    select: { use_id: true },
  });
}

const parsePageIds = (usePages) => {
  const raw = Array.isArray(usePages) ? usePages : (usePages || "").split(",");
  return raw
    .map((id) => Number(String(id).trim()))
    .filter((id) => Number.isInteger(id) && id > 0);
};

// Campos de tbl_users que se registran en la bitácora (ADR-0013: "permisos,
// perfiles y estado de usuarios" exigen auditoría funcional). use_password se
// audita como "[oculto]": queda constancia de que cambió, nunca del valor.
const AUDITED_USER_FIELDS = [
  "use_name",
  "use_last_name",
  "use_identification",
  "use_user",
  "use_email",
  "use_password",
  "pro_id",
  "sta_id",
  "use_access",
  "use_change_password",
];

const DELETED_STATUS = 3;

// El perfil asignado se verifica con su fila ya bloqueada: deleteProfile
// bloquea el mismo perfil antes de comprobar que no tenga usuarios, así que
// asignar un perfil y eliminarlo no pueden cruzarse (ADR-0027).
const assertAssignableProfile = async (tx, locked, proId) => {
  const profile = locked.PERFIL.length
    ? await tx.tbl_profiles.findUnique({ where: { pro_id: Number(proId) }, select: { sta_id: true } })
    : null;
  if (!profile || profile.sta_id === DELETED_STATUS) {
    const error = new Error("El perfil seleccionado no existe.");
    error.status = 400;
    throw error;
  }
};

export const saveUser = async ({
  useId,
  proId,
  name,
  lastName,
  identification,
  username,
  email,
  password,
  access,
  staId: statusId,
  useBy,
  changePassword,
  usePages,
  ctx = { useId: useBy },
}) => {
  const existingUser = await checkIfUserExists({ identification, email, username, useId });

  if (existingUser) {
    const error = new Error(
      "Ya existe un usuario con el documento, correo o usuario ingresado. Verificar"
    );
    error.status = 400;
    throw error;
  }

  const desiredPageIds = parsePageIds(usePages);
  // bcrypt fuera de la transacción: es lento a propósito y no debe mantener
  // abierta la transacción (ni sus bloqueos) mientras calcula.
  const passwordHash = password ? await hashPassword(password) : null;
  const operationId = newOperationId();

  if (useId > 0) {
    return withLockedTransaction({ PERFIL: proId, USUARIO: useId }, async (tx, locked) => {
      await assertAssignableProfile(tx, locked, proId);

      const before = await tx.tbl_users.findUnique({
        where: { use_id: Number(useId) },
        select: { ...Object.fromEntries(AUDITED_USER_FIELDS.map((f) => [f, true])) },
      });

      if (!before) {
        const error = new Error("Usuario no encontrado.");
        error.status = 404;
        throw error;
      }

      const updateData = {
        use_name: name,
        use_last_name: lastName,
        use_identification: identification === "null" ? null : identification,
        use_user: username === "null" ? null : username,
        use_email: email === "null" ? null : email,
        pro_id: proId || null,
        sta_id: statusId,
        use_access: access,
        // `??` y no `||`: 0 ("no exigir cambio") es un valor válido. Con
        // `||` se guardaba NULL y cada edición registraba un cambio falso
        // 0 → NULL en la bitácora.
        use_change_password: changePassword ?? null,
        use_update_by: useBy,
      };

      if (passwordHash) {
        updateData.use_password = passwordHash;
      }

      // Un usuario eliminado que vuelve a un estado visible se reactiva: se
      // limpia la evidencia de la eliminación en la fila (la bitácora la
      // conserva).
      const reactivated = before.sta_id === DELETED_STATUS && Number(statusId) !== DELETED_STATUS;
      if (reactivated) {
        updateData.use_delete_by = null;
        updateData.use_delete_at = null;
      }

      await tx.tbl_users.update({ where: { use_id: Number(useId) }, data: updateData });

      // Diff de páginas puntuales contra tbl_user_pages — reemplaza el CSV
      // tbl_users.use_pages, mismo patrón que saveProfile con
      // tbl_page_permissions (ver database/migrations/0005_*).
      const currentPages = await tx.tbl_user_pages.findMany({
        where: { use_id: Number(useId) },
        select: { pag_id: true },
      });
      const currentSet = new Set(currentPages.map((p) => p.pag_id));
      const desiredSet = new Set(desiredPageIds);
      const toDelete = Array.from(currentSet).filter((id) => !desiredSet.has(id));
      const toInsert = Array.from(desiredSet).filter((id) => !currentSet.has(id));

      if (toDelete.length > 0) {
        await tx.tbl_user_pages.deleteMany({
          where: { use_id: Number(useId), pag_id: { in: toDelete } },
        });
      }
      if (toInsert.length > 0) {
        await tx.tbl_user_pages.createMany({
          data: toInsert.map((pagId) => ({ use_id: Number(useId), pag_id: pagId })),
        });
      }

      const changes = diffFields(before, updateData, AUDITED_USER_FIELDS);
      if (toDelete.length > 0 || toInsert.length > 0) {
        changes.push({ field: "paginas", oldValue: [...currentSet], newValue: [...desiredSet] });
      }

      if (changes.length > 0) {
        await writeAudit(tx, {
          operationId,
          entity: AUDIT_ENTITIES.USER,
          recordId: useId,
          operation: reactivated ? AUDIT_OPERATIONS.REACTIVATE : AUDIT_OPERATIONS.UPDATE,
          ctx,
          changes,
        });
      }

      return { message: "Usuario Actualizado Correctamente", useId };
    }, { idempotent: true });
  }

  return withLockedTransaction({ PERFIL: proId }, async (tx, locked) => {
    await assertAssignableProfile(tx, locked, proId);

    const data = {
      use_name: name,
      use_last_name: lastName,
      use_identification: identification === "null" ? null : identification,
      use_user: username === "null" ? null : username,
      use_email: email === "null" ? null : email,
      use_password: passwordHash,
      pro_id: proId,
      sta_id: statusId,
      use_access: access ? 1 : 0,
      use_change_password: changePassword ?? null,
      use_create_by: useBy,
      use_update_by: useBy,
    };

    const created = await tx.tbl_users.create({ data });

    if (desiredPageIds.length > 0) {
      await tx.tbl_user_pages.createMany({
        data: desiredPageIds.map((pagId) => ({ use_id: created.use_id, pag_id: pagId })),
      });
    }

    const changes = diffFields({}, data, AUDITED_USER_FIELDS);
    if (desiredPageIds.length > 0) {
      changes.push({ field: "paginas", oldValue: null, newValue: desiredPageIds });
    }

    await writeAudit(tx, {
      operationId,
      entity: AUDIT_ENTITIES.USER,
      recordId: created.use_id,
      operation: AUDIT_OPERATIONS.CREATE,
      ctx,
      changes,
    });

    // Ya no se copian los permisos del perfil a tbl_user_permissions al
    // crear el usuario: el permiso efectivo se resuelve en cada petición
    // como unión de perfil + excepciones individuales (ver
    // common/services/effectivePermissions.service.js). Copiarlos aquí
    // hacía que un cambio posterior a los permisos del perfil nunca se
    // propagara a los usuarios ya creados — ver SECURITY.md.
    return { message: "Usuario Creado Correctamente", useId: created.use_id };
  });
};

export const deleteUser = async ({ useId, updatedBy, ctx = { useId: updatedBy } }) => {
  if (!useId || !updatedBy) {
    const error = new Error(
      "El ID del usuario y el usuario actual son obligatorios"
    );
    error.status = 400;
    throw error;
  }

  return withLockedTransaction({ USUARIO: useId }, async (tx) => {
    const before = await tx.tbl_users.findUnique({
      where: { use_id: Number(useId) },
      select: { sta_id: true },
    });

    if (!before || before.sta_id === DELETED_STATUS) {
      const error = new Error("Usuario no encontrado o no se pudo eliminar");
      error.status = 404;
      throw error;
    }

    // sta_id = 3 sigue decidiendo la visibilidad; use_delete_by/_at guardan
    // quién y cuándo, separado de use_update_by/_at (ADR-0013).
    await tx.tbl_users.update({
      where: { use_id: Number(useId) },
      data: {
        sta_id: DELETED_STATUS,
        use_update_by: Number(updatedBy),
        use_delete_by: Number(updatedBy),
        use_delete_at: new Date(),
      },
    });

    await writeAudit(tx, {
      entity: AUDIT_ENTITIES.USER,
      recordId: useId,
      operation: AUDIT_OPERATIONS.DELETE,
      ctx,
      changes: [{ field: "sta_id", oldValue: before.sta_id, newValue: DELETED_STATUS }],
    });

    return { message: "Usuario Eliminado Correctamente" };
  });
};

