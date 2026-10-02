import { prisma } from "../../../common/configs/prismaClient.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { paginate, MAX_ROWS, countByStatus } from "../../../common/utils/pagination.utils.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { dateOnlyText, toDateOnly } from "../../../common/utils/term.utils.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, newOperationId, writeAudit } from "../../../common/services/audit.service.js";
import { identityDocumentsService } from "../../admin/identityDocuments/identityDocuments.service.js";
import { identificationError } from "../../admin/identityDocuments/identityDocuments.formats.js";
import { providerTypesService } from "../../admin/providerTypes/providerTypes.service.js";
import { addressTypesService } from "../../admin/addressTypes/addressTypes.service.js";
import { ACTIVE_STATUS, INACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";

/**
 * Proveedores (ADR-0012, DEC-031, DEC-032). Una fila por empresa, reutilizada
 * por muchas obras a través de la asignación proveedor-obra.
 *
 * - Identidad = (tipo de identificación, número), única entre no eliminados.
 *   El UNIQUE de la BD es la garantía; la verificación previa da el mensaje.
 *   Las dos responden igual: 409 con el proveedor existente en `data`, para
 *   que el cliente ofrezca asignarlo en vez de crear otro (decisión 7).
 * - Contactos: parte del proveedor, guardados con él por diferencial.
 * - Cambiar la identificación de un proveedor existente exige su propio
 *   permiso (ADR-0012, regla 5): el controller pasa los permisos efectivos.
 * - Asignar, editar la asignación y desasignar tienen endpoints propios
 *   (DEC-031). Bloqueo: obra → proveedor → maestros (LOCK_ORDER).
 * - Bitácora funcional: identidad, nombre, tipo, estado, y la asignación y
 *   desasignación a obras. Técnica (columnas de autoría) para el resto.
 */

const CAN = PERMISSIONS.work.providers;

const httpError = (statusCode, message, data) => Object.assign(new Error(message), { statusCode, ...(data !== undefined && { data }) });

const text = (value) => String(value ?? "").trim();
const optionalText = (value) => text(value) || null;

// ─── Listado ─────────────────────────────────────────────────────────────────

// Lista blanca de orden (ENDPOINT_STANDARD, "Listados").
const SORT_FIELDS = {
  name: (order) => ({ prv_name: order }),
  identification: (order) => ({ prv_identification: order }),
  providerType: (order) => ({ tbl_provider_types: { pvt_name: order } }),
  statusName: (order) => ({ tbl_status: { sta_name: order } }),
  updatedAt: (order) => ({ prv_update_at: order }),
};

const LIST_SELECT = {
  prv_id: true,
  prv_name: true,
  prv_identification: true,
  prv_service_type: true,
  sta_id: true,
  prv_update_at: true,
  tbl_identity_documents: { select: { idd_code: true } },
  tbl_provider_types: { select: { pvt_name: true } },
  tbl_status: { select: { sta_name: true } },
  updated_by_user: USER_NAME_SELECT,
  _count: { select: { tbl_work_providers: true } },
};

const toListDto = (row) => ({
  prvId: row.prv_id,
  name: row.prv_name,
  identityCode: row.tbl_identity_documents?.idd_code ?? null,
  identification: row.prv_identification,
  providerType: row.tbl_provider_types?.pvt_name ?? null,
  serviceType: row.prv_service_type,
  worksCount: row._count?.tbl_work_providers ?? 0,
  staId: row.sta_id,
  statusName: row.tbl_status?.sta_name ?? null,
  updatedAt: row.prv_update_at,
  updatedByName: userFullName(row.updated_by_user),
});

// Búsqueda general (DEC-024): razón social o número de documento, con Prisma
// (parametrizada; ADR-0012, B9).
const searchWhereOf = (search) => {
  const value = text(search);
  if (!value) return {};
  return { OR: [{ prv_name: { contains: value } }, { prv_identification: { contains: value } }] };
};

export const paginationProviders = async ({ search, staId, rows, first, sortField, sortOrder }) => {
  const order = Number(sortOrder) === 1 ? "asc" : "desc";
  const orderBy = (SORT_FIELDS[sortField] ?? SORT_FIELDS.updatedAt)(order);

  const baseWhere = { sta_id: { not: DELETED_STATUS }, ...searchWhereOf(search) };
  const where = { ...baseWhere, ...(staId ? { AND: [{ sta_id: Number(staId) }] } : {}) };

  const [page, statusCounts] = await Promise.all([
    paginate(prisma.tbl_providers, { where, select: LIST_SELECT, orderBy }, { first, rows }),
    countByStatus(prisma.tbl_providers, baseWhere),
  ]);
  return { ...page, results: page.results.map(toListDto), statusCounts };
};

// ─── Detalle ─────────────────────────────────────────────────────────────────

const HEADER_COLUMNS = ["idd_id", "prv_identification", "prv_name", "pvt_id", "prv_service_type", "prv_email", "prv_observation"];
const HEADER_SELECT = Object.fromEntries(HEADER_COLUMNS.map((column) => [column, true]));

const CONTACT_COLUMNS = [
  "adt_id",
  "prc_name",
  "prc_position",
  "prc_address",
  "prc_phone",
  "prc_mobile",
  "prc_fax",
  "prc_email",
  "prc_observation",
  "prc_main",
];
const CONTACT_SELECT = { prc_id: true, ...Object.fromEntries(CONTACT_COLUMNS.map((column) => [column, true])) };

const toContactDto = (c) => ({
  prcId: c.prc_id,
  adtId: c.adt_id,
  addressType: c.tbl_address_types?.adt_name ?? null,
  name: c.prc_name,
  position: c.prc_position,
  address: c.prc_address,
  phone: c.prc_phone,
  mobile: c.prc_mobile,
  fax: c.prc_fax,
  email: c.prc_email,
  observation: c.prc_observation,
  main: Boolean(c.prc_main),
});

const toAssignmentDto = (a) => ({
  wkpId: a.wkp_id,
  wrkId: a.wrk_id,
  prvId: a.prv_id,
  workCode: a.tbl_works?.wrk_code ?? null,
  workName: a.tbl_works?.wrk_name ?? null,
  workStaId: a.tbl_works?.sta_id ?? null,
  providerName: a.tbl_providers?.prv_name ?? null,
  identityCode: a.tbl_providers?.tbl_identity_documents?.idd_code ?? null,
  identification: a.tbl_providers?.prv_identification ?? null,
  providerType: a.tbl_providers?.tbl_provider_types?.pvt_name ?? null,
  providerStaId: a.tbl_providers?.sta_id ?? null,
  assignmentDate: dateOnlyText(a.wkp_assignment_date),
  observation: a.wkp_observation,
  staId: a.sta_id,
  updatedAt: a.wkp_update_at,
  updatedByName: userFullName(a.updated_by_user),
});

export const getProvider = async ({ prvId }) => {
  const row = await prisma.tbl_providers.findFirst({
    where: { prv_id: Number(prvId), sta_id: { not: DELETED_STATUS } },
    select: {
      prv_id: true,
      ...HEADER_SELECT,
      sta_id: true,
      prv_create_at: true,
      prv_update_at: true,
      tbl_status: { select: { sta_name: true } },
      tbl_identity_documents: { select: { idd_code: true, idd_name: true } },
      tbl_provider_types: { select: { pvt_name: true } },
      created_by_user: USER_NAME_SELECT,
      updated_by_user: USER_NAME_SELECT,
      tbl_provider_contacts: {
        select: { ...CONTACT_SELECT, tbl_address_types: { select: { adt_name: true } } },
        orderBy: [{ prc_main: "desc" }, { prc_id: "asc" }],
      },
      // Obras del proveedor, con tope fijo; el total viene en worksCount.
      tbl_work_providers: {
        select: {
          wkp_id: true,
          wrk_id: true,
          prv_id: true,
          wkp_assignment_date: true,
          wkp_observation: true,
          sta_id: true,
          wkp_update_at: true,
          tbl_works: { select: { wrk_code: true, wrk_name: true, sta_id: true } },
        },
        orderBy: { wkp_assignment_date: "desc" },
        take: MAX_ROWS,
      },
      _count: { select: { tbl_work_providers: true } },
    },
  });
  if (!row) throw httpError(404, "No se encontró el proveedor.");

  return {
    prvId: row.prv_id,
    iddId: row.idd_id,
    identityCode: row.tbl_identity_documents?.idd_code ?? null,
    identityName: row.tbl_identity_documents?.idd_name ?? null,
    identification: row.prv_identification,
    name: row.prv_name,
    pvtId: row.pvt_id,
    providerType: row.tbl_provider_types?.pvt_name ?? null,
    serviceType: row.prv_service_type,
    email: row.prv_email,
    observation: row.prv_observation,
    staId: row.sta_id,
    statusName: row.tbl_status?.sta_name ?? null,
    createdAt: row.prv_create_at,
    createdByName: userFullName(row.created_by_user),
    updatedAt: row.prv_update_at,
    updatedByName: userFullName(row.updated_by_user),
    contacts: row.tbl_provider_contacts.map(toContactDto),
    works: row.tbl_work_providers.map(toAssignmentDto),
    worksCount: row._count.tbl_work_providers,
  };
};

// ─── Identidad ───────────────────────────────────────────────────────────────

// Lo que se devuelve del proveedor que ya tiene la identidad: lo justo para
// que el cliente ofrezca usarlo (ADR-0012, decisión 7).
const EXISTING_SELECT = {
  prv_id: true,
  prv_name: true,
  prv_identification: true,
  sta_id: true,
  tbl_identity_documents: { select: { idd_code: true } },
};

const toExistingDto = (row) => ({
  prvId: row.prv_id,
  name: row.prv_name,
  identityCode: row.tbl_identity_documents?.idd_code ?? null,
  identification: row.prv_identification,
  staId: row.sta_id,
});

const findByIdentity = (client, { iddId, identification, excludeId = null }) =>
  client.tbl_providers.findFirst({
    where: {
      idd_id: Number(iddId),
      prv_identification: text(identification),
      sta_id: { not: DELETED_STATUS },
      ...(excludeId ? { prv_id: { not: Number(excludeId) } } : {}),
    },
    select: EXISTING_SELECT,
  });

const duplicateError = (existing) =>
  httpError(409, `Ya existe un proveedor con ese documento: ${existing.prv_name}.`, { existing: toExistingDto(existing) });

/**
 * Verificación reactiva del formulario (ADR-0012, "Frontend"): coincidencia
 * EXACTA del par (tipo, número), nunca parcial, para no servir de buscador
 * por fragmentos. Exige el permiso de ver proveedores, que ya da el listado.
 */
export const checkIdentification = async ({ iddId, identification, excludeId }) => {
  const existing = await findByIdentity(prisma, { iddId, identification, excludeId });
  return { exists: Boolean(existing), provider: existing ? toExistingDto(existing) : null };
};

/**
 * Proveedores activos para asignar a una obra (regla 13): razón social o
 * documento, con tope fijo. Con `wrkId`, se excluyen los ya asignados.
 */
export const selectProviders = async ({ search, wrkId } = {}) => {
  const rows = await prisma.tbl_providers.findMany({
    where: {
      sta_id: ACTIVE_STATUS,
      ...searchWhereOf(search),
      ...(Number(wrkId) > 0 ? { tbl_work_providers: { none: { wrk_id: Number(wrkId) } } } : {}),
    },
    select: EXISTING_SELECT,
    orderBy: { prv_name: "asc" },
    take: MAX_ROWS,
  });
  return rows.map((row) => ({
    value: row.prv_id,
    label: `${row.prv_name} · ${row.tbl_identity_documents?.idd_code ?? ""} ${row.prv_identification}`.trim(),
    ...toExistingDto(row),
  }));
};

/**
 * Obras a las que se puede asignar el proveedor (el selector del lado del
 * proveedor, simétrico de selectProviders): activas, donde todavía no está, por
 * código o nombre, con tope fijo.
 */
export const selectAssignableWorks = async ({ search, prvId } = {}) => {
  const value = text(search);
  const rows = await prisma.tbl_works.findMany({
    where: {
      sta_id: ACTIVE_STATUS,
      ...(value ? { OR: [{ wrk_code: { contains: value } }, { wrk_name: { contains: value } }] } : {}),
      ...(Number(prvId) > 0 ? { tbl_work_providers: { none: { prv_id: Number(prvId) } } } : {}),
    },
    select: { wrk_id: true, wrk_code: true, wrk_name: true },
    orderBy: { wrk_code: "asc" },
    take: MAX_ROWS,
  });
  return rows.map((row) => ({ value: row.wrk_id, label: `${row.wrk_code} — ${row.wrk_name}`, code: row.wrk_code, name: row.wrk_name }));
};

// ─── Guardado ────────────────────────────────────────────────────────────────

/** Cabecera del cliente → columnas. */
const headerValuesOf = (input) => ({
  idd_id: Number(input.iddId),
  prv_identification: text(input.identification),
  prv_name: text(input.name),
  pvt_id: Number(input.pvtId),
  prv_service_type: optionalText(input.serviceType),
  prv_email: optionalText(input.email),
  prv_observation: optionalText(input.observation),
});

const contactsOf = (input) =>
  (input.contacts ?? []).map((c) => ({
    prc_id: Number(c.prcId) > 0 ? Number(c.prcId) : null,
    adt_id: Number(c.adtId),
    prc_name: optionalText(c.name),
    prc_position: optionalText(c.position),
    prc_address: optionalText(c.address),
    prc_phone: optionalText(c.phone),
    prc_mobile: optionalText(c.mobile),
    prc_fax: optionalText(c.fax),
    prc_email: optionalText(c.email),
    prc_observation: optionalText(c.observation),
    prc_main: c.main === true || c.main === 1 || c.main === "1" || c.main === "true",
  }));

/** Reglas de la lista, sin BD (ADR-0009, decisión 7; el CHECK de 0045). */
const assertContacts = (contacts) => {
  if (contacts.filter((c) => c.prc_main).length > 1) throw httpError(400, "Solo un contacto puede ser el principal.");
  contacts.forEach((c, i) => {
    if (!c.prc_address && !c.prc_phone && !c.prc_mobile && !c.prc_email) {
      throw httpError(400, `El contacto ${i + 1} necesita al menos una dirección, un teléfono, un celular o un correo.`);
    }
  });
  const ids = contacts.filter((c) => c.prc_id).map((c) => c.prc_id);
  if (new Set(ids).size !== ids.length) throw httpError(400, "Un contacto aparece dos veces en la lista.");
};

// Con los maestros ya bloqueados: tipo de identificación y de proveedor
// asignables (activos, o el que ya tenía), y el número con el formato de su
// tipo (DEC-021).
const assertIdentification = async (tx, values, current = {}) => {
  const document = await identityDocumentsService.assertAssignable(tx, values.idd_id, current.idd_id);
  const reason = identificationError(document.idd_code, values.prv_identification);
  if (reason) throw httpError(400, `Número de identificación inválido para ${document.idd_name}: ${reason}.`);
};

// Un tipo de dirección inactivo se conserva en el contacto que ya lo tenía;
// no se asigna en uno nuevo ni al cambiar el tipo (ADR-0009, decisión 9).
const assertAddressTypes = async (tx, contacts, currentById = new Map()) => {
  for (const contact of contacts) {
    await addressTypesService.assertAssignable(tx, contact.adt_id, currentById.get(contact.prc_id)?.adt_id);
  }
};

const masterLocksOf = (values, contacts) => {
  const addressTypes = [...new Set(contacts.map((c) => c.adt_id))];
  return {
    TIPO_IDENTIFICACION: values.idd_id,
    TIPO_PROVEEDOR: values.pvt_id,
    ...(addressTypes.length > 0 ? { TIPO_DIRECCION: addressTypes } : {}),
  };
};

// Diferencial contra la BD, nunca contra una lista anterior del cliente.
const diffContacts = (current, desired) => {
  const currentById = new Map(current.map((c) => [c.prc_id, c]));
  for (const contact of desired) {
    // Un id de contacto ajeno a este proveedor no se acepta.
    if (contact.prc_id && !currentById.has(contact.prc_id)) throw httpError(400, "Uno de los contactos no pertenece a este proveedor.");
  }
  const keptIds = new Set(desired.filter((c) => c.prc_id).map((c) => c.prc_id));
  return {
    toInsert: desired.filter((c) => !c.prc_id),
    toDelete: current.filter((c) => !keptIds.has(c.prc_id)),
    toUpdate: desired.filter((c) => {
      const before = c.prc_id && currentById.get(c.prc_id);
      return before && CONTACT_COLUMNS.some((column) => (before[column] ?? null) !== (c[column] ?? null));
    }),
  };
};

// Primero bajas y quitar la marca de principal, después altas: el UNIQUE de
// prc_main_provider no admite dos principales ni por un instante.
const applyContacts = async (tx, { prvId, diff, useBy }) => {
  if (diff.toDelete.length > 0) {
    await tx.tbl_provider_contacts.deleteMany({ where: { prv_id: prvId, prc_id: { in: diff.toDelete.map((c) => c.prc_id) } } });
  }
  const ordered = [...diff.toUpdate].sort((a, b) => Number(a.prc_main) - Number(b.prc_main));
  for (const { prc_id, ...contact } of ordered) {
    await tx.tbl_provider_contacts.updateMany({ where: { prc_id, prv_id: prvId }, data: { ...contact, prc_update_by: useBy } });
  }
  if (diff.toInsert.length > 0) {
    await tx.tbl_provider_contacts.createMany({
      data: diff.toInsert.map(({ prc_id, ...contact }) => ({ prv_id: prvId, ...contact, prc_create_by: useBy, prc_update_by: useBy })),
    });
  }
};

// Bitácora funcional del proveedor (ADR-0012, "Auditoría").
const AUDITED_HEADER = ["idd_id", "prv_identification", "prv_name", "pvt_id"];

// ─── Asignación proveedor-obra ───────────────────────────────────────────────

const assignmentText = (a) =>
  `proveedor=${a.prv_id} obra=${a.wrk_id} fecha=${dateOnlyText(a.wkp_assignment_date)} estado=${a.sta_id}${a.wkp_observation ? ` obs=${a.wkp_observation}` : ""}`;

// La asignación cambia la obra y la participación del proveedor: se registra
// en la bitácora de ambos, con el mismo id de operación (ADR-0012, dec. 14).
const auditAssignment = async (tx, { operation, before = null, after = null, ctx, operationId = newOperationId() }) => {
  const row = after ?? before;
  const changes = [{ field: "proveedor_obra", oldValue: before ? assignmentText(before) : null, newValue: after ? assignmentText(after) : null }];
  await writeAudit(tx, { operationId, entity: AUDIT_ENTITIES.WORK, recordId: row.wrk_id, operation, ctx, changes });
  await writeAudit(tx, { operationId, entity: AUDIT_ENTITIES.PROVIDER, recordId: row.prv_id, operation, ctx, changes });
};

const assignmentValuesOf = (input) => ({
  wkp_assignment_date: toDateOnly(input.assignmentDate),
  wkp_observation: optionalText(input.observation),
});

const assertAssignmentDate = (values) => {
  if (!values.wkp_assignment_date) throw httpError(400, "La fecha de asignación no es una fecha válida.");
};

// Con la obra bloqueada: existe y no está eliminada.
const assertWorkAssignable = async (tx, wrkId) => {
  const work = await tx.tbl_works.findUnique({ where: { wrk_id: Number(wrkId) }, select: { sta_id: true } });
  if (!work || work.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró la obra.");
};

// Con obra y proveedor bloqueados: el proveedor existe, está activo (regla 13)
// y no está ya en la obra (regla 9; el UNIQUE del par es la garantía).
const assertProviderAssignable = async (tx, { wrkId, prvId }) => {
  const provider = await tx.tbl_providers.findUnique({ where: { prv_id: Number(prvId) }, select: { sta_id: true, prv_name: true } });
  if (!provider || provider.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró el proveedor.");
  if (provider.sta_id !== ACTIVE_STATUS) throw httpError(400, `El proveedor ${provider.prv_name} está inactivo y no se puede asignar a obras.`);

  const already = await tx.tbl_work_providers.findUnique({
    where: { wrk_id_prv_id: { wrk_id: Number(wrkId), prv_id: Number(prvId) } },
    select: { wkp_id: true },
  });
  if (already) throw httpError(409, `El proveedor ${provider.prv_name} ya está asignado a esta obra.`);
};

const insertAssignment = async (tx, { wrkId, prvId, values, useBy, ctx, operationId, idempotencyData = {} }) => {
  const created = await tx.tbl_work_providers.create({
    data: {
      wrk_id: Number(wrkId),
      prv_id: Number(prvId),
      ...values,
      sta_id: ACTIVE_STATUS,
      wkp_create_by: useBy,
      wkp_update_by: useBy,
      ...idempotencyData,
    },
  });
  await auditAssignment(tx, { operation: AUDIT_OPERATIONS.GRANT, after: created, ctx, operationId });
  return created;
};

// ─── Crear y editar proveedor ────────────────────────────────────────────────

const PROVIDER_IDEMPOTENCY = {
  model: prisma.tbl_providers,
  keyField: "prv_idempotency_key",
  hashField: "prv_idempotency_hash",
  ownerField: "prv_create_by",
  select: { prv_id: true },
  toResult: (row) => ({ message: "Proveedor creado correctamente", prvId: row.prv_id }),
};

const createProvider = ({ values, contacts, assignment, useBy, ctx, idempotencyData }) =>
  withLockedTransaction(
    { ...(assignment ? { OBRA: assignment.wrkId } : {}), ...masterLocksOf(values, contacts) },
    async (tx) => {
      if (assignment) await assertWorkAssignable(tx, assignment.wrkId);
      await assertIdentification(tx, values);
      await providerTypesService.assertAssignable(tx, values.pvt_id);
      await assertAddressTypes(tx, contacts);

      // Cortesía: el mensaje claro y el proveedor existente. El UNIQUE es la
      // garantía si otra petición inserta entre esta lectura y el INSERT.
      const existing = await findByIdentity(tx, { iddId: values.idd_id, identification: values.prv_identification });
      if (existing) throw duplicateError(existing);

      const created = await tx.tbl_providers.create({
        data: { ...values, sta_id: ACTIVE_STATUS, prv_create_by: useBy, prv_update_by: useBy, ...idempotencyData },
      });
      const prvId = created.prv_id;
      const operationId = newOperationId();

      await writeAudit(tx, {
        operationId,
        entity: AUDIT_ENTITIES.PROVIDER,
        recordId: prvId,
        operation: AUDIT_OPERATIONS.CREATE,
        ctx,
        changes: diffFields({}, values, AUDITED_HEADER),
      });
      await applyContacts(tx, { prvId, diff: diffContacts([], contacts), useBy });

      // Crear desde una obra: el proveedor nuevo queda asignado en la misma
      // transacción (ADR-0012, decisión 6). La obra se bloqueó y verificó
      // primero; el proveedor recién creado está activo y en ninguna obra.
      if (assignment) {
        await insertAssignment(tx, { wrkId: assignment.wrkId, prvId, values: assignment.values, useBy, ctx, operationId });
      }
      return {
        message: assignment ? "Proveedor creado y asignado a la obra" : "Proveedor creado correctamente",
        prvId,
      };
    }
  );

// Editar fija la cabecera y los contactos: repetirlo deja lo mismo, así que
// se puede reintentar ante un interbloqueo.
const updateProvider = ({ prvId, values, contacts, useBy, granted, ctx }) =>
  withLockedTransaction(
    { PROVEEDOR: prvId, ...masterLocksOf(values, contacts) },
    async (tx) => {
      const id = Number(prvId);
      const before = await tx.tbl_providers.findUnique({ where: { prv_id: id }, select: { ...HEADER_SELECT, sta_id: true } });
      if (!before || before.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró el proveedor.");

      const identityChanged = before.idd_id !== values.idd_id || before.prv_identification !== values.prv_identification;
      if (identityChanged && !granted.has(CAN.changeIdentity)) {
        throw httpError(403, "No tienes permiso para cambiar la identificación del proveedor.");
      }

      const currentContacts = await tx.tbl_provider_contacts.findMany({ where: { prv_id: id }, select: CONTACT_SELECT });
      const contactDiff = diffContacts(currentContacts, contacts);

      await assertIdentification(tx, values, before);
      await providerTypesService.assertAssignable(tx, values.pvt_id, before.pvt_id);
      await assertAddressTypes(tx, contacts, new Map(currentContacts.map((c) => [c.prc_id, c])));

      if (identityChanged) {
        const existing = await findByIdentity(tx, { iddId: values.idd_id, identification: values.prv_identification, excludeId: id });
        if (existing) throw duplicateError(existing);
      }

      await tx.tbl_providers.update({ where: { prv_id: id }, data: { ...values, prv_update_by: useBy } });

      const changes = diffFields(before, values, AUDITED_HEADER);
      if (changes.length > 0) {
        await writeAudit(tx, { entity: AUDIT_ENTITIES.PROVIDER, recordId: id, operation: AUDIT_OPERATIONS.UPDATE, ctx, changes });
      }
      await applyContacts(tx, { prvId: id, diff: contactDiff, useBy });

      return { message: "Proveedor modificado correctamente", prvId: id };
    },
    { idempotent: true }
  );

// El UNIQUE saltó porque otra petición registró la misma identidad entre la
// verificación y el INSERT: misma respuesta que la verificación (409 con el
// proveedor existente). Si no hay tal proveedor, el UNIQUE era otro.
const translateDuplicate = async (err, values, excludeId = null) => {
  if (err?.code !== "P2002") throw err;
  const existing = await findByIdentity(prisma, { iddId: values.idd_id, identification: values.prv_identification, excludeId });
  if (existing) throw duplicateError(existing);
  throw err;
};

/**
 * Crear (prvId vacío o 0) o editar el proveedor con sus contactos. Al crear,
 * `input.assignment` ({ wrkId, assignmentDate, observation }) lo asigna a esa
 * obra en la misma transacción, y exige el permiso de asignar. `granted` es
 * el Set de per_id efectivos del autor. El estado no se toca aquí.
 */
export const saveProvider = async ({ prvId, input, useBy, granted, ctx = { useId: useBy }, idempotencyKey }) => {
  const values = headerValuesOf(input);
  const contacts = contactsOf(input);
  assertContacts(contacts);

  if (Number(prvId) > 0) {
    try {
      return await updateProvider({ prvId, values, contacts, useBy: Number(useBy), granted, ctx });
    } catch (err) {
      return translateDuplicate(err, values, prvId);
    }
  }

  let assignment = null;
  if (input.assignment) {
    if (!granted.has(CAN.assignWork)) throw httpError(403, "No tienes permiso para asignar proveedores a obras.");
    assignment = { wrkId: Number(input.assignment.wrkId), values: assignmentValuesOf(input.assignment) };
    assertAssignmentDate(assignment.values);
  }

  // La clave se busca antes que el duplicado: el reintento de una creación
  // exitosa devuelve el proveedor creado y no "ya existe".
  try {
    return await runIdempotent({
      target: PROVIDER_IDEMPOTENCY,
      key: idempotencyKey,
      ownerId: useBy,
      payload: {
        ...values,
        contacts,
        assignment: assignment && { wrkId: assignment.wrkId, ...assignment.values },
      },
      execute: (idempotencyData) => createProvider({ values, contacts, assignment, useBy: Number(useBy), ctx, idempotencyData }),
    });
  } catch (err) {
    return translateDuplicate(err, values);
  }
};

// ─── Estado y eliminación ────────────────────────────────────────────────────

const findLockedProvider = async (tx, prvId) => {
  const row = await tx.tbl_providers.findUnique({ where: { prv_id: Number(prvId) }, select: { sta_id: true } });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró el proveedor.");
  return row;
};

/**
 * Activar o desactivar. Desactivar impide asignarlo a obras nuevas y no
 * afecta a las asignaciones existentes (regla 14). Fija un estado final:
 * reintentable.
 */
export const changeProviderStatus = ({ prvId, staId, useBy, ctx = { useId: useBy } }) =>
  withLockedTransaction(
    { PROVEEDOR: prvId },
    async (tx) => {
      const before = await findLockedProvider(tx, prvId);
      const next = Number(staId);
      if (next !== ACTIVE_STATUS && next !== INACTIVE_STATUS) throw httpError(400, "El estado debe ser activo o inactivo.");
      if (before.sta_id !== next) {
        await tx.tbl_providers.update({ where: { prv_id: Number(prvId) }, data: { sta_id: next, prv_update_by: Number(useBy) } });
        await writeAudit(tx, {
          entity: AUDIT_ENTITIES.PROVIDER,
          recordId: Number(prvId),
          operation: AUDIT_OPERATIONS.UPDATE,
          ctx,
          changes: diffFields(before, { sta_id: next }, ["sta_id"]),
        });
      }
      return { message: `Proveedor ${next === ACTIVE_STATUS ? "activado" : "desactivado"} correctamente`, staId: next };
    },
    { idempotent: true }
  );

/**
 * Eliminación lógica (DEC-006), bloqueada con 409 si el proveedor tiene obras
 * asignadas (regla 15): forma parte de sus expedientes. Los contactos se
 * conservan. Con contratos y facturas se agregan aquí sus tablas.
 */
export const deleteProvider = ({ prvId, useBy, ctx = { useId: useBy } }) =>
  withLockedTransaction({ PROVEEDOR: prvId }, async (tx) => {
    const before = await findLockedProvider(tx, prvId);

    const works = await tx.tbl_work_providers.count({ where: { prv_id: Number(prvId) } });
    if (works > 0) {
      throw httpError(409, `No se puede eliminar el proveedor: está asignado a ${works} obra(s). Desasígnalo primero o desactívalo.`);
    }

    await tx.tbl_providers.update({
      where: { prv_id: Number(prvId) },
      data: { sta_id: DELETED_STATUS, prv_update_by: Number(useBy), prv_delete_by: Number(useBy), prv_delete_at: new Date() },
    });
    await writeAudit(tx, {
      entity: AUDIT_ENTITIES.PROVIDER,
      recordId: Number(prvId),
      operation: AUDIT_OPERATIONS.DELETE,
      ctx,
      changes: diffFields(before, { sta_id: DELETED_STATUS }, ["sta_id"]),
    });
    return { message: "Proveedor eliminado correctamente" };
  });

// ─── Endpoints de asignación ─────────────────────────────────────────────────

const ASSIGNMENT_LIST_SELECT = {
  wkp_id: true,
  wrk_id: true,
  prv_id: true,
  wkp_assignment_date: true,
  wkp_observation: true,
  sta_id: true,
  wkp_update_at: true,
  updated_by_user: USER_NAME_SELECT,
  tbl_providers: {
    select: {
      prv_name: true,
      prv_identification: true,
      sta_id: true,
      tbl_identity_documents: { select: { idd_code: true } },
      tbl_provider_types: { select: { pvt_name: true } },
    },
  },
};

/** Proveedores asignados a una obra, paginados (ENDPOINT_STANDARD, "Listados"). */
export const paginationWorkProviders = async ({ wrkId, search, rows, first }) => {
  const value = text(search);
  const where = {
    wrk_id: Number(wrkId),
    ...(value
      ? { tbl_providers: { OR: [{ prv_name: { contains: value } }, { prv_identification: { contains: value } }] } }
      : {}),
  };
  const page = await paginate(
    prisma.tbl_work_providers,
    { where, select: ASSIGNMENT_LIST_SELECT, orderBy: [{ wkp_assignment_date: "desc" }, { wkp_id: "desc" }] },
    { first, rows }
  );
  return { ...page, results: page.results.map(toAssignmentDto) };
};

const ASSIGNMENT_IDEMPOTENCY = {
  model: prisma.tbl_work_providers,
  keyField: "wkp_idempotency_key",
  hashField: "wkp_idempotency_hash",
  ownerField: "wkp_create_by",
  select: { wkp_id: true },
  toResult: (row) => ({ message: "Proveedor asignado a la obra", wkpId: row.wkp_id }),
};

/** Asignar un proveedor existente a una obra (bloqueo obra → proveedor). */
export const assignProviderToWork = async ({ wrkId, prvId, input, useBy, ctx = { useId: useBy }, idempotencyKey }) => {
  const values = assignmentValuesOf(input);
  assertAssignmentDate(values);
  return runIdempotent({
    target: ASSIGNMENT_IDEMPOTENCY,
    key: idempotencyKey,
    ownerId: useBy,
    payload: { wrkId: Number(wrkId), prvId: Number(prvId), ...values },
    execute: (idempotencyData) =>
      withLockedTransaction({ OBRA: wrkId, PROVEEDOR: prvId }, async (tx) => {
        await assertWorkAssignable(tx, wrkId);
        await assertProviderAssignable(tx, { wrkId, prvId });
        const created = await insertAssignment(tx, { wrkId, prvId, values, useBy: Number(useBy), ctx, idempotencyData });
        return { message: "Proveedor asignado a la obra", wkpId: created.wkp_id };
      }),
  });
};

// La asignación se identifica por el par (obra, proveedor), que es único:
// así se bloquean obra y proveedor sin leer nada antes.
const findLockedAssignment = async (tx, { wrkId, prvId }) => {
  const row = await tx.tbl_work_providers.findUnique({ where: { wrk_id_prv_id: { wrk_id: Number(wrkId), prv_id: Number(prvId) } } });
  if (!row) throw httpError(404, "El proveedor no está asignado a esta obra.");
  return row;
};

/** Editar fecha, observaciones o estado de la asignación. Reintentable. */
export const updateWorkProvider = ({ wrkId, prvId, input, useBy, ctx = { useId: useBy } }) => {
  const values = { ...assignmentValuesOf(input), sta_id: Number(input.staId ?? ACTIVE_STATUS) };
  assertAssignmentDate(values);
  if (values.sta_id !== ACTIVE_STATUS && values.sta_id !== INACTIVE_STATUS) throw httpError(400, "El estado debe ser activo o inactivo.");

  return withLockedTransaction(
    { OBRA: wrkId, PROVEEDOR: prvId },
    async (tx) => {
      const before = await findLockedAssignment(tx, { wrkId, prvId });
      const after = { ...before, ...values };
      if (assignmentText(before) !== assignmentText(after)) {
        await tx.tbl_work_providers.update({ where: { wkp_id: before.wkp_id }, data: { ...values, wkp_update_by: Number(useBy) } });
        await auditAssignment(tx, { operation: AUDIT_OPERATIONS.UPDATE, before, after, ctx });
      }
      return { message: "Asignación modificada correctamente", wkpId: before.wkp_id };
    },
    { idempotent: true }
  );
};

/**
 * Desasignar: borra la asignación y deja el proveedor intacto en el maestro
 * (regla 12). La bitácora conserva la asignación. Bloqueado con 409 si el
 * proveedor tiene contratos en esa obra, también eliminados: la FK del
 * contrato a la asignación lo impide (DEC-035); esto da el mensaje claro.
 */
export const unassignProviderFromWork = ({ wrkId, prvId, useBy, ctx = { useId: useBy } }) =>
  withLockedTransaction({ OBRA: wrkId, PROVEEDOR: prvId }, async (tx) => {
    const before = await findLockedAssignment(tx, { wrkId, prvId });
    const contracts = await tx.tbl_contracts.count({ where: { wrk_id: Number(wrkId), prv_id: Number(prvId) } });
    if (contracts > 0) {
      throw httpError(409, `No se puede desasignar el proveedor: tiene ${contracts} contrato(s) en esta obra. Inactiva la asignación en su lugar.`);
    }
    await tx.tbl_work_providers.delete({ where: { wkp_id: before.wkp_id } });
    await auditAssignment(tx, { operation: AUDIT_OPERATIONS.REVOKE, before, ctx });
    return { message: "Proveedor desasignado de la obra" };
  });
