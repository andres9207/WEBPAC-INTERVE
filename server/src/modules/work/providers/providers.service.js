import { prisma } from "../../../common/configs/prismaClient.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { paginate, MAX_ROWS, countByStatus, containsFilter, idFilter, filtersWhere } from "../../../common/utils/pagination.utils.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { dateOnlyText, toDateOnly, todayDateOnly } from "../../../common/utils/term.utils.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { findExportRows, renderExport } from "../../../common/services/export.service.js";
import { assertInScope, scopeWhere } from "../../../common/services/workScope.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, newOperationId, writeAudit } from "../../../common/services/audit.service.js";
import { identityDocumentsService } from "../../admin/identityDocuments/identityDocuments.service.js";
import { identificationError } from "../../admin/identityDocuments/identityDocuments.formats.js";
import { providerTypesService } from "../../admin/providerTypes/providerTypes.service.js";
import { defineContacts } from "../../admin/addressTypes/addressTypes.contacts.js";
import { ACTIVE_STATUS, INACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";

/**
 * Proveedores (ADR-0012, DEC-031, DEC-032). Una fila por empresa, reutilizada
 * por muchas obras a través de la asignación proveedor-obra.
 *
 * - Identidad = (tipo de identificación, número), única entre no eliminados.
 *   El UNIQUE de la BD es la garantía; la verificación previa da el mensaje.
 *   Las dos responden igual: 409 con el proveedor existente en `data`, para
 *   que el cliente ofrezca asignarlo en vez de crear otro (decisión 7).
 * - Contactos y tipos de proveedor (uno o varios, DEC-041): parte del
 *   proveedor, guardados con él por diferencial. Los tipos del maestro solo
 *   se proponen al asignarlo a una obra: en cada obra trabaja con los tipos
 *   de su asignación, cualquiera de ellos (DEC-066). Cambiar los del maestro
 *   no toca obras, contratos ni facturas. Con una obra elegida en el
 *   encabezado, la ficha del proveedor edita los de esa obra (DEC-090).
 * - Cambiar la identificación de un proveedor existente exige su propio
 *   permiso (ADR-0012, regla 5): el controller pasa los permisos efectivos.
 * - Asignar, editar la asignación (con sus tipos) y desasignar tienen
 *   endpoints propios (DEC-031). Bloqueo: obra → proveedor → maestros
 *   (LOCK_ORDER).
 * - Bitácora funcional: identidad, nombre, tipos, estado, y la asignación y
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
  statusName: (order) => ({ tbl_status: { sta_name: order } }),
  updatedAt: (order) => ({ prv_update_at: order }),
};

// Tipos del proveedor (DEC-041), por nombre, con su forma de facturar (DEC-074).
const CLASSIFICATIONS_SELECT = {
  select: { pvt_id: true, tbl_provider_types: { select: { pvt_name: true, pvt_invoice_mode: true } } },
  orderBy: { tbl_provider_types: { pvt_name: "asc" } },
};
const typeNamesOf = (classifications = []) => classifications.map((c) => c.tbl_provider_types?.pvt_name).filter(Boolean);

// Tipos con que trabaja el proveedor en una obra (DEC-066), del mismo modo.
const WORK_TYPES_SELECT = CLASSIFICATIONS_SELECT;
const workTypesOf = (rows = []) =>
  rows.map((r) => ({ pvtId: r.pvt_id, name: r.tbl_provider_types?.pvt_name ?? null, invoiceMode: r.tbl_provider_types?.pvt_invoice_mode ?? null }));

const LIST_SELECT = {
  prv_id: true,
  prv_name: true,
  prv_identification: true,
  prv_service_type: true,
  sta_id: true,
  prv_update_at: true,
  tbl_identity_documents: { select: { idd_code: true } },
  tbl_provider_classifications: CLASSIFICATIONS_SELECT,
  tbl_status: { select: { sta_name: true } },
  updated_by_user: USER_NAME_SELECT,
};
// Obras a las que está asignado, todas (no solo las del alcance): solo con el permiso de ver todas las obras.
const WORKS_COUNT_SELECT = { _count: { select: { tbl_work_providers: true } } };

/**
 * Tipos de la columna "Tipos" del listado (DEC-066): con una obra elegida, los
 * de su asignación en esa obra (con los que se firman sus contratos y facturas
 * allí); con "Ver todo", los del maestro más los de sus obras, sin repetir.
 */
const listWorkTypesSelect = (scope) => ({
  tbl_work_providers: {
    where: { ...scopeWhere(scope), tbl_works: { sta_id: { not: DELETED_STATUS } } },
    select: { tbl_work_provider_types: WORK_TYPES_SELECT },
  },
});
const listTypeNames = (row, scope) => {
  const inWorks = (row.tbl_work_providers ?? []).flatMap((a) => typeNamesOf(a.tbl_work_provider_types));
  const names = scope?.all ? [...typeNamesOf(row.tbl_provider_classifications), ...inWorks] : inWorks;
  return [...new Set(names)].sort((a, b) => a.localeCompare(b, "es"));
};

/** Filtro por tipo, con la misma regla que la columna: en la obra elegida, o en el maestro o en alguna obra. */
const typeFilterWhere = (scope, pvtId) => {
  const inWorks = { tbl_work_providers: { some: { ...scopeWhere(scope), tbl_work_provider_types: { some: { pvt_id: pvtId } } } } };
  return scope?.all ? { OR: [{ tbl_provider_classifications: { some: { pvt_id: pvtId } } }, inWorks] } : inWorks;
};

const toListDto = (row, scope) => ({
  prvId: row.prv_id,
  name: row.prv_name,
  identityCode: row.tbl_identity_documents?.idd_code ?? null,
  identification: row.prv_identification,
  providerTypes: listTypeNames(row, scope),
  serviceType: row.prv_service_type,
  worksCount: row._count?.tbl_work_providers ?? null,
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

// ─── Alcance por obra (DEC-047) ──────────────────────────────────────────────

const NOT_FOUND = "No se encontró el proveedor.";

/** Un proveedor está en el alcance si está asignado a alguna obra del alcance. */
const providerScopeWhere = (scope) => scopeWhere(scope, (ids) => ({ tbl_work_providers: { some: { wrk_id: { in: ids } } } }));

/**
 * Opciones de proveedor para un selector con tope (DEC-018), buscadas por
 * razón social o identificación: `admitted` decide cuáles (p. ej. los que
 * tienen contratos o facturas). `includePrvId`, el ya elegido, vuelve aunque
 * la búsqueda o el tope lo dejen fuera, si `admitted` lo admite.
 */
export const providerSelectOptions = async ({ admitted, search, includePrvId }) => {
  const select = { prv_id: true, prv_name: true, prv_identification: true };
  const value = String(search ?? "").trim();
  const rows = await prisma.tbl_providers.findMany({
    where: { ...admitted, ...(value ? { OR: [{ prv_name: { contains: value } }, { prv_identification: { contains: value } }] } : {}) },
    select,
    orderBy: { prv_name: "asc" },
    take: MAX_ROWS,
  });
  const includeId = Number(includePrvId) > 0 ? Number(includePrvId) : null;
  if (includeId && !rows.some((row) => row.prv_id === includeId)) {
    const included = await prisma.tbl_providers.findFirst({ where: { ...admitted, prv_id: includeId }, select });
    if (included) rows.unshift(included);
  }
  return rows.map((row) => ({ value: row.prv_id, label: `${row.prv_name} — ${row.prv_identification}` }));
};

/** 404 si el proveedor no está asignado a la obra del alcance: no revela que exista. */
export const assertProviderInScope = async (scope, prvId) => {
  const where = providerScopeWhere(scope);
  if (Object.keys(where).length === 0) return;
  const found = await prisma.tbl_providers.findFirst({ where: { prv_id: Number(prvId), ...where }, select: { prv_id: true } });
  if (!found) throw httpError(404, NOT_FOUND);
};

// Filtros, orden y alcance del listado: los mismos para la página y para el reporte (DEC-070).
const providerListQuery = ({ search, staId, name, identification, pvtId, wrkId, sortField, sortOrder, scope }) => {
  const order = Number(sortOrder) === 1 ? "asc" : "desc";
  const orderBy = (SORT_FIELDS[sortField] ?? SORT_FIELDS.updatedAt)(order);
  const baseWhere = {
    sta_id: { not: DELETED_STATUS },
    ...providerScopeWhere(scope),
    ...searchWhereOf(search),
    ...filtersWhere([
      containsFilter(name, (c) => ({ prv_name: c })),
      containsFilter(identification, (c) => ({ prv_identification: c })),
      idFilter(pvtId, (id) => typeFilterWhere(scope, id)),
      idFilter(wrkId, (id) => ({ tbl_work_providers: { some: { wrk_id: id } } })),
    ]),
  };
  const where = staId ? { ...baseWhere, AND: [...(baseWhere.AND ?? []), { sta_id: Number(staId) }] } : baseWhere;
  return { baseWhere, where, orderBy };
};

/**
 * `scope`: alcance por obra de la petición (DEC-047): solo los proveedores de
 * esa obra. `name`, `identification`, `pvtId` (uno de sus tipos) y `wrkId`
 * (asignado a esa obra): filtros por campo (DEC-048), también en los conteos.
 * El de obra se suma al alcance, nunca lo reemplaza. `withWorksCount`: con el
 * permiso de ver todas las obras, `worksCount` trae a cuántas está asignado;
 * sin él, null (revelaría obras fuera de su alcance).
 */
export const paginationProviders = async ({
  search,
  staId,
  name,
  identification,
  pvtId,
  wrkId,
  rows,
  first,
  sortField,
  sortOrder,
  scope,
  withWorksCount = false,
}) => {
  const select = { ...LIST_SELECT, ...listWorkTypesSelect(scope), ...(withWorksCount ? WORKS_COUNT_SELECT : {}) };
  const { baseWhere, where, orderBy } = providerListQuery({ search, staId, name, identification, pvtId, wrkId, sortField, sortOrder, scope });

  const [page, statusCounts] = await Promise.all([
    paginate(prisma.tbl_providers, { where, select, orderBy }, { first, rows }),
    countByStatus(prisma.tbl_providers, baseWhere),
  ]);
  return { ...page, results: page.results.map((row) => toListDto(row, scope)), statusCounts };
};

// ─── Reporte (DEC-070) ───────────────────────────────────────────────────────

// Contactos del reporte: el principal primero (ADR-0009).
const EXPORT_CONTACTS_SELECT = {
  select: { prc_address: true, prc_phone: true, prc_mobile: true, prc_fax: true, prc_email: true, prc_main: true },
  orderBy: [{ prc_main: "desc" }, { prc_id: "asc" }],
};

/**
 * Columnas del reporte: las del sistema que se migra, los tipos y los datos
 * generales del proveedor (correo institucional y observación). Una fila por
 * contacto: lo del proveedor (`group`) va una vez para todos sus contactos,
 * combinado en Excel; Email es el del contacto.
 */
const EXPORT_COLUMNS = [
  { header: "Nombre", value: (r) => r.name, width: 2, group: true },
  { header: "Dirección", value: (r) => r.address, width: 1.8 },
  { header: "Identificación", value: (r) => [r.identityCode, r.identification].filter(Boolean).join(" "), width: 1.1, group: true },
  { header: "Teléfono", value: (r) => r.phone },
  { header: "Fax", value: (r) => r.fax, width: 0.8 },
  { header: "Tipo servicio", value: (r) => r.serviceType, width: 1.6, group: true },
  { header: "Email", value: (r) => r.email, width: 1.6 },
  { header: "Tipos", value: (r) => r.providerTypes.join(", "), width: 1.4, group: true },
  { header: "Correo institucional", value: (r) => r.institutionalEmail, width: 1.6, group: true },
  { header: "Observación", value: (r) => r.observation, width: 2, group: true },
];

/** Filas del reporte: una por contacto; sin contactos, una con solo los datos del proveedor. */
const exportRowsOf = (row, scope) => {
  const provider = { ...toListDto(row, scope), key: row.prv_id, institutionalEmail: row.prv_email, observation: row.prv_observation };
  const contacts = row.tbl_provider_contacts ?? [];
  if (contacts.length === 0) return [provider];
  return contacts.map((c) => ({
    ...provider,
    address: c.prc_address,
    phone: [c.prc_phone, c.prc_mobile].filter(Boolean).join(" / "),
    fax: c.prc_fax,
    email: c.prc_email,
  }));
};

const STATUS_FILTER_NAMES = { [ACTIVE_STATUS]: "Activos", [INACTIVE_STATUS]: "Inactivos" };

/** Encabezado del reporte: la obra del alcance (con "Ver todo", ninguna) y las líneas de los filtros. */
const exportHeadingOf = async ({ search, staId, name, identification, pvtId, wrkId, scope }) => {
  const workOf = (id) => (Number(id) > 0 ? prisma.tbl_works.findUnique({ where: { wrk_id: Number(id) }, select: { wrk_code: true, wrk_name: true } }) : null);
  const [scopedWork, filterWork, type] = await Promise.all([
    scope?.all ? null : workOf(scope?.wrkId),
    workOf(wrkId),
    Number(pvtId) > 0 ? prisma.tbl_provider_types.findUnique({ where: { pvt_id: Number(pvtId) }, select: { pvt_name: true } }) : null,
  ]);
  const workText = (w) => (w ? [w.wrk_code, w.wrk_name].filter(Boolean).join(" — ") : null);
  const lines = [
    ["Estado", STATUS_FILTER_NAMES[Number(staId)] ?? "Todos"],
    ["Búsqueda", text(search)],
    ["Razón social contiene", text(name)],
    ["Documento contiene", text(identification)],
    ["Tipo", type?.pvt_name],
    ["Obra asignada", workText(filterWork)],
  ].filter(([, value]) => value);
  const heading = workText(scopedWork) ?? (scope?.all ? null : workText(filterWork));
  return { heading: heading ? `Obra: ${heading}` : null, filters: [`Filtros: ${lines.map(([label, value]) => `${label}: ${value}`).join(" · ")}`] };
};

/**
 * Reporte del listado en Excel o PDF (DEC-070; ADR-0012, exportación): los
 * mismos filtros, pestaña, búsqueda, orden y alcance que la tabla, sin
 * paginar. Con una obra elegida, sus proveedores y la obra en el encabezado;
 * con "Ver todo", todos. Los tipos, con la regla de la columna del listado.
 */
export const exportProviders = async ({ format, ...filters }) => {
  const { where, orderBy } = providerListQuery(filters);
  const select = {
    ...LIST_SELECT,
    prv_email: true,
    prv_observation: true,
    ...listWorkTypesSelect(filters.scope),
    tbl_provider_contacts: EXPORT_CONTACTS_SELECT,
  };
  const rows = (await findExportRows(prisma.tbl_providers, { where, select, orderBy })).flatMap((row) => exportRowsOf(row, filters.scope));
  const { heading, filters: lines } = await exportHeadingOf(filters);
  return renderExport({ format, title: "Proveedores", heading, filters: lines, columns: EXPORT_COLUMNS, rows, groupKey: (r) => r.key });
};

// ─── Detalle ─────────────────────────────────────────────────────────────────

const HEADER_COLUMNS = ["idd_id", "prv_identification", "prv_name", "prv_service_type", "prv_email", "prv_observation"];
const HEADER_SELECT = Object.fromEntries(HEADER_COLUMNS.map((column) => [column, true]));

// Contactos del proveedor (ADR-0009): reglas comunes con los de obra.
const contactsHelper = defineContacts({
  model: "tbl_provider_contacts",
  prefix: "prc",
  ownerColumn: "prv_id",
  ownerLabel: "este proveedor",
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
  providerTypes: typeNamesOf(a.tbl_providers?.tbl_provider_classifications),
  // Los de la obra (DEC-066): con ellos se firman sus contratos.
  workTypes: workTypesOf(a.tbl_work_provider_types),
  providerStaId: a.tbl_providers?.sta_id ?? null,
  assignmentDate: dateOnlyText(a.wkp_assignment_date),
  observation: a.wkp_observation,
  staId: a.sta_id,
  updatedAt: a.wkp_update_at,
  updatedByName: userFullName(a.updated_by_user),
});

/** Detalle. Con alcance de una obra, sus obras se limitan a esa (DEC-047). */
export const getProvider = async ({ prvId, scope }) => {
  const worksWhere = scopeWhere(scope);
  const row = await prisma.tbl_providers.findFirst({
    where: { prv_id: Number(prvId), sta_id: { not: DELETED_STATUS }, ...providerScopeWhere(scope) },
    select: {
      prv_id: true,
      ...HEADER_SELECT,
      sta_id: true,
      prv_create_at: true,
      prv_update_at: true,
      tbl_status: { select: { sta_name: true } },
      tbl_identity_documents: { select: { idd_code: true, idd_name: true } },
      tbl_provider_classifications: CLASSIFICATIONS_SELECT,
      created_by_user: USER_NAME_SELECT,
      updated_by_user: USER_NAME_SELECT,
      tbl_provider_contacts: contactsHelper.detailSelect,
      // Obras del proveedor, con tope fijo; el total viene en worksCount.
      tbl_work_providers: {
        where: worksWhere,
        select: {
          wkp_id: true,
          wrk_id: true,
          prv_id: true,
          wkp_assignment_date: true,
          wkp_observation: true,
          sta_id: true,
          wkp_update_at: true,
          tbl_works: { select: { wrk_code: true, wrk_name: true, sta_id: true } },
          tbl_work_provider_types: WORK_TYPES_SELECT,
        },
        orderBy: { wkp_assignment_date: "desc" },
        take: MAX_ROWS,
      },
      _count: { select: { tbl_work_providers: { where: worksWhere } } },
    },
  });
  if (!row) throw httpError(404, NOT_FOUND);

  return {
    prvId: row.prv_id,
    iddId: row.idd_id,
    identityCode: row.tbl_identity_documents?.idd_code ?? null,
    identityName: row.tbl_identity_documents?.idd_name ?? null,
    identification: row.prv_identification,
    name: row.prv_name,
    pvtIds: row.tbl_provider_classifications.map((c) => c.pvt_id),
    providerTypes: typeNamesOf(row.tbl_provider_classifications),
    serviceType: row.prv_service_type,
    email: row.prv_email,
    observation: row.prv_observation,
    staId: row.sta_id,
    statusName: row.tbl_status?.sta_name ?? null,
    createdAt: row.prv_create_at,
    createdByName: userFullName(row.created_by_user),
    updatedAt: row.prv_update_at,
    updatedByName: userFullName(row.updated_by_user),
    contacts: row.tbl_provider_contacts.map(contactsHelper.toDto),
    works: row.tbl_work_providers.map(toAssignmentDto),
    worksCount: row._count.tbl_work_providers,
  };
};

// ─── Identidad ───────────────────────────────────────────────────────────────

// Lo que se devuelve del proveedor que ya tiene la identidad: lo justo para
// que el cliente ofrezca usarlo (ADR-0012, decisión 7). Sus tipos del
// maestro se proponen al asignarlo a la obra (DEC-066).
const EXISTING_SELECT = {
  prv_id: true,
  prv_name: true,
  prv_identification: true,
  sta_id: true,
  tbl_identity_documents: { select: { idd_code: true } },
  tbl_provider_classifications: { select: { pvt_id: true } },
};

const toExistingDto = (row) => ({
  prvId: row.prv_id,
  name: row.prv_name,
  identityCode: row.tbl_identity_documents?.idd_code ?? null,
  identification: row.prv_identification,
  staId: row.sta_id,
  pvtIds: (row.tbl_provider_classifications ?? []).map((c) => c.pvt_id).sort((a, b) => a - b),
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
 * documento, con tope fijo. Con `wrkId`, se excluyen los ya asignados. Cada
 * opción trae los tipos de su maestro (`pvtIds`): el formulario los propone
 * como los tipos de la obra (DEC-066).
 */
export const selectProviders = async ({ search, wrkId } = {}) => {
  const rows = await prisma.tbl_providers.findMany({
    where: {
      sta_id: ACTIVE_STATUS,
      ...searchWhereOf(search),
      ...(Number(wrkId) > 0 ? { tbl_work_providers: { none: { wrk_id: Number(wrkId) } } } : {}),
    },
    select: { ...EXISTING_SELECT, tbl_provider_classifications: { select: { pvt_id: true } } },
    orderBy: { prv_name: "asc" },
    take: MAX_ROWS,
  });
  return rows.map((row) => ({
    value: row.prv_id,
    label: `${row.prv_name} · ${row.tbl_identity_documents?.idd_code ?? ""} ${row.prv_identification}`.trim(),
    ...toExistingDto(row),
    pvtIds: row.tbl_provider_classifications.map((c) => c.pvt_id),
  }));
};

/**
 * Obras a las que se puede asignar el proveedor (el selector del lado del
 * proveedor, simétrico de selectProviders): activas, donde todavía no está, por
 * código o nombre, con tope fijo. Solo las del alcance (DEC-047).
 */
export const selectAssignableWorks = async ({ search, prvId, scope } = {}) => {
  const value = text(search);
  const rows = await prisma.tbl_works.findMany({
    where: {
      sta_id: ACTIVE_STATUS,
      ...scopeWhere(scope),
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
  prv_service_type: optionalText(input.serviceType),
  prv_email: optionalText(input.email),
  prv_observation: optionalText(input.observation),
});

// Tipos de proveedor pedidos (DEC-041): ids sin repetir, en orden.
const typeIdsOf = (input) => [...new Set((input.pvtIds ?? []).map(Number))].sort((a, b) => a - b);

const assertTypeIds = (pvtIds) => {
  if (pvtIds.length === 0 || pvtIds.some((id) => !(id > 0))) throw httpError(400, "Selecciona al menos un tipo de proveedor.");
};

// Con los maestros ya bloqueados: tipo de identificación y de proveedor
// asignables (activos, o el que ya tenía), y el número con el formato de su
// tipo (DEC-021).
const assertIdentification = async (tx, values, current = {}) => {
  const document = await identityDocumentsService.assertAssignable(tx, values.idd_id, current.idd_id);
  const reason = identificationError(document.idd_code, values.prv_identification);
  if (reason) throw httpError(400, `Número de identificación inválido para ${document.idd_name}: ${reason}.`);
};

const masterLocksOf = (values, pvtIds, contacts) => ({
  TIPO_IDENTIFICACION: values.idd_id,
  TIPO_PROVEEDOR: [...new Set(pvtIds)],
  ...contactsHelper.locksOf(contacts),
});

// Un tipo inactivo se conserva si el proveedor ya lo tenía; no se agrega uno
// nuevo (como los demás maestros). Con los tipos ya bloqueados.
const assertProviderTypes = async (tx, pvtIds, currentIds = []) => {
  for (const id of pvtIds) {
    await providerTypesService.assertAssignable(tx, id, currentIds.includes(id) ? id : undefined);
  }
};

// Diferencial de tipos contra la BD: altas y bajas de la tabla de unión.
const applyProviderTypes = async (tx, { prvId, currentIds, pvtIds }) => {
  const toDelete = currentIds.filter((id) => !pvtIds.includes(id));
  const toInsert = pvtIds.filter((id) => !currentIds.includes(id));
  if (toDelete.length > 0) await tx.tbl_provider_classifications.deleteMany({ where: { prv_id: prvId, pvt_id: { in: toDelete } } });
  if (toInsert.length > 0) await tx.tbl_provider_classifications.createMany({ data: toInsert.map((pvt_id) => ({ prv_id: prvId, pvt_id })) });
};

// Bitácora funcional del proveedor (ADR-0012, "Auditoría"). `pvt_ids` es la
// lista de tipos (DEC-041), registrada como texto ordenado.
const AUDITED_HEADER = ["idd_id", "prv_identification", "prv_name", "pvt_ids"];

// ─── Asignación proveedor-obra ───────────────────────────────────────────────

const assignmentText = (a) =>
  `proveedor=${a.prv_id} obra=${a.wrk_id} fecha=${dateOnlyText(a.wkp_assignment_date)} estado=${a.sta_id} tipos=${(a.pvt_ids ?? []).join(",")}${a.wkp_observation ? ` obs=${a.wkp_observation}` : ""}`;

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

// Tipos de la asignación (DEC-066): cualquiera, aunque el proveedor no lo
// tenga en su maestro; al menos uno. `undefined` si la petición no los trae.
const assignmentTypeIdsOf = (input) => {
  if (input?.pvtIds === undefined || input?.pvtIds === null) return undefined;
  const pvtIds = typeIdsOf(input);
  if (pvtIds.length === 0 || pvtIds.some((id) => !(id > 0))) throw httpError(400, "Selecciona al menos un tipo de proveedor para la obra.");
  return pvtIds;
};

const findAssignmentTypeIds = async (db, { wrkId, prvId }) =>
  (await db.tbl_work_provider_types.findMany({ where: { wrk_id: Number(wrkId), prv_id: Number(prvId) }, select: { pvt_id: true } }))
    .map((t) => t.pvt_id)
    .sort((a, b) => a - b);

/**
 * Diferencial de los tipos de una asignación, con obra, proveedor y los
 * tipos pedidos ya bloqueados. Un tipo que se quita no puede estar en uso:
 * - 409 si algún contrato de la obra (también eliminado) se firmó bajo él;
 *   la FK compuesta del contrato es la garantía, esto da el mensaje.
 * - 409 si alguna factura del proveedor en la obra (también anulada o
 *   eliminada) es de su menú (DEC-074); la FK compuesta de la factura es la
 *   garantía, esto da el mensaje.
 */
const applyAssignmentTypes = async (tx, { wrkId, prvId, currentIds, pvtIds }) => {
  const toDelete = currentIds.filter((id) => !pvtIds.includes(id));
  const toInsert = pvtIds.filter((id) => !currentIds.includes(id));
  const where = { wrk_id: Number(wrkId), prv_id: Number(prvId) };

  if (toDelete.length > 0) {
    const types = await tx.tbl_provider_types.findMany({ where: { pvt_id: { in: toDelete } }, select: { pvt_id: true, pvt_name: true } });
    const byId = Object.fromEntries(types.map((t) => [t.pvt_id, t]));
    const contracts = await tx.tbl_contracts.findMany({ where: { ...where, pvt_id: { in: toDelete } }, select: { pvt_id: true, ctr_number: true } });
    if (contracts.length > 0) {
      const names = [...new Set(contracts.map((c) => byId[c.pvt_id]?.pvt_name))].join(", ");
      const numbers = contracts.map((c) => c.ctr_number).join(", ");
      throw httpError(409, `No se puede quitar el tipo ${names} de la obra: lo usa(n) ${contracts.length} contrato(s) (${numbers}).`);
    }
    const invoices = await tx.tbl_invoices.findMany({ where: { ...where, pvt_id: { in: toDelete } }, select: { pvt_id: true } });
    if (invoices.length > 0) {
      const names = [...new Set(invoices.map((i) => byId[i.pvt_id]?.pvt_name))].join(", ");
      throw httpError(409, `No se puede quitar el tipo ${names} de la obra: el proveedor tiene ${invoices.length} factura(s) de ese menú en ella.`);
    }
    await tx.tbl_work_provider_types.deleteMany({ where: { ...where, pvt_id: { in: toDelete } } });
  }
  if (toInsert.length > 0) await tx.tbl_work_provider_types.createMany({ data: toInsert.map((pvt_id) => ({ ...where, pvt_id })) });
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

// Con obra, proveedor y tipos ya bloqueados: la asignación nace con sus tipos (DEC-066).
const insertAssignment = async (tx, { wrkId, prvId, values, pvtIds, useBy, ctx, operationId, idempotencyData = {} }) => {
  await assertProviderTypes(tx, pvtIds);
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
  await applyAssignmentTypes(tx, { wrkId, prvId, currentIds: [], pvtIds });
  await auditAssignment(tx, { operation: AUDIT_OPERATIONS.GRANT, after: { ...created, pvt_ids: pvtIds }, ctx, operationId });
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

const createProvider = ({ values, pvtIds, contacts, assignment, useBy, ctx, idempotencyData }) =>
  withLockedTransaction(
    { ...(assignment ? { OBRA: assignment.wrkId } : {}), ...masterLocksOf(values, [...pvtIds, ...(assignment?.pvtIds ?? [])], contacts) },
    async (tx) => {
      if (assignment) await assertWorkAssignable(tx, assignment.wrkId);
      await assertIdentification(tx, values);
      await assertProviderTypes(tx, pvtIds);
      await contactsHelper.assertAddressTypes(tx, contacts);

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
        changes: diffFields({}, { ...values, pvt_ids: pvtIds }, AUDITED_HEADER),
      });
      await applyProviderTypes(tx, { prvId, currentIds: [], pvtIds });
      await contactsHelper.apply(tx, { ownerId: prvId, diff: contactsHelper.diff([], contacts), useBy });

      // Crear desde una obra: el proveedor nuevo queda asignado en la misma
      // transacción (ADR-0012, decisión 6). La obra se bloqueó y verificó
      // primero; el proveedor recién creado está activo y en ninguna obra.
      // Sin tipos para la obra, toma los del maestro (DEC-066).
      if (assignment) {
        const assignmentTypes = assignment.pvtIds ?? pvtIds;
        await insertAssignment(tx, { wrkId: assignment.wrkId, prvId, values: assignment.values, pvtIds: assignmentTypes, useBy, ctx, operationId });
      }
      return {
        message: assignment ? "Proveedor creado y asignado a la obra" : "Proveedor creado correctamente",
        prvId,
      };
    }
  );

const findTypeIds = async (db, prvId) =>
  (await db.tbl_provider_classifications.findMany({ where: { prv_id: prvId }, select: { pvt_id: true } }))
    .map((c) => c.pvt_id)
    .sort((a, b) => a - b);

// Editar fija la cabecera, los tipos y los contactos: repetirlo deja lo
// mismo, así que se puede reintentar ante un interbloqueo. Los tipos del
// maestro no tocan las asignaciones a obras ni sus contratos (DEC-066).
//
// Con `wrkId` (una obra elegida en el encabezado, DEC-090), `pvtIds` son los
// tipos del proveedor en esa obra: van a su asignación, con las reglas de
// editarla y el permiso de asignar; los del maestro no cambian. Los datos de
// la empresa (cabecera y contactos) siguen yendo al maestro y exigen el
// permiso de editar solo si cambian. Sin `wrkId` ("Ver todo"), todo es del
// maestro y exige el permiso de editar.
const updateProvider = async ({ prvId, values, pvtIds, contacts, useBy, granted, wrkId = null, ctx }) =>
  withLockedTransaction(
    { ...(wrkId ? { OBRA: wrkId } : {}), PROVEEDOR: prvId, ...masterLocksOf(values, pvtIds, contacts) },
    async (tx) => {
      const id = Number(prvId);
      const before = await tx.tbl_providers.findUnique({ where: { prv_id: id }, select: { ...HEADER_SELECT, sta_id: true } });
      if (!before || before.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró el proveedor.");

      const currentContacts = await contactsHelper.findCurrent(tx, id);
      const contactDiff = contactsHelper.diff(currentContacts, contacts);
      const currentIds = await findTypeIds(tx, id);
      const companyChanged = diffFields(before, values, HEADER_COLUMNS).length > 0 || contactsHelper.hasChanges(contactDiff);
      if ((companyChanged || !wrkId) && !granted.has(CAN.edit)) {
        throw httpError(403, "No tienes permiso para modificar los datos del proveedor.");
      }

      const identityChanged = before.idd_id !== values.idd_id || before.prv_identification !== values.prv_identification;
      if (identityChanged && !granted.has(CAN.changeIdentity)) {
        throw httpError(403, "No tienes permiso para cambiar la identificación del proveedor.");
      }

      // Tipos de la asignación a la obra (DEC-066, DEC-090).
      let assignment = null;
      if (wrkId) {
        const row = await findLockedAssignment(tx, { wrkId, prvId: id });
        const workIds = await findAssignmentTypeIds(tx, { wrkId, prvId: id });
        if (workIds.join(",") !== pvtIds.join(",")) {
          if (!granted.has(CAN.assignWork)) throw httpError(403, "No tienes permiso para cambiar los tipos del proveedor en la obra.");
          assignment = { row, workIds };
        }
      }

      await assertIdentification(tx, values, before);
      if (assignment) await assertProviderTypes(tx, pvtIds, assignment.workIds);
      else if (!wrkId) await assertProviderTypes(tx, pvtIds, currentIds);
      await contactsHelper.assertAddressTypes(tx, contacts, currentContacts);

      if (identityChanged) {
        const existing = await findByIdentity(tx, { iddId: values.idd_id, identification: values.prv_identification, excludeId: id });
        if (existing) throw duplicateError(existing);
      }

      if (companyChanged || !wrkId) {
        await tx.tbl_providers.update({ where: { prv_id: id }, data: { ...values, prv_update_by: useBy } });
        const masterIds = wrkId ? currentIds : pvtIds;
        const changes = diffFields({ ...before, pvt_ids: currentIds }, { ...values, pvt_ids: masterIds }, AUDITED_HEADER);
        if (changes.length > 0) {
          await writeAudit(tx, { entity: AUDIT_ENTITIES.PROVIDER, recordId: id, operation: AUDIT_OPERATIONS.UPDATE, ctx, changes });
        }
        if (!wrkId) await applyProviderTypes(tx, { prvId: id, currentIds, pvtIds });
        await contactsHelper.apply(tx, { ownerId: id, diff: contactDiff, useBy });
      }

      if (assignment) {
        const { row, workIds } = assignment;
        await applyAssignmentTypes(tx, { wrkId, prvId: id, currentIds: workIds, pvtIds });
        await tx.tbl_work_providers.update({ where: { wkp_id: row.wkp_id }, data: { wkp_update_by: useBy } });
        await auditAssignment(tx, { operation: AUDIT_OPERATIONS.UPDATE, before: { ...row, pvt_ids: workIds }, after: { ...row, pvt_ids: pvtIds }, ctx });
      }

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
 *
 * Alcance por obra (DEC-047): editar exige que el proveedor esté en la obra
 * del alcance. Sin "ver todo", crear lo asigna a una obra del alcance (la
 * pedida, o la del alcance con fecha de hoy): un proveedor sin obra no lo
 * vería nadie más que quien ve todo. Con una obra elegida, editar cambia los
 * tipos del proveedor en esa obra, no los del maestro (DEC-090).
 */
export const saveProvider = async ({ prvId, input, useBy, granted, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  const values = headerValuesOf(input);
  const pvtIds = typeIdsOf(input);
  const contacts = contactsHelper.fromInput(input.contacts);
  assertTypeIds(pvtIds);
  contactsHelper.assertList(contacts);

  if (Number(prvId) > 0) {
    await assertProviderInScope(scope, prvId);
    const wrkId = scope && !scope.all ? scope.wrkId : null;
    try {
      return await updateProvider({ prvId, values, pvtIds, contacts, useBy: Number(useBy), granted, wrkId, ctx });
    } catch (err) {
      return translateDuplicate(err, values, prvId);
    }
  }

  let assignment = null;
  const restricted = scope && !scope.all;
  if (restricted && !input.assignment) {
    if (!scope.wrkId) throw httpError(403, "Selecciona una obra en el encabezado para registrar proveedores.");
    input = { ...input, assignment: { wrkId: scope.wrkId, assignmentDate: dateOnlyText(todayDateOnly()) } };
  }
  if (input.assignment) {
    if (restricted) assertInScope(scope, input.assignment.wrkId, "No se encontró la obra.");
    if (!granted.has(CAN.assignWork)) throw httpError(403, "No tienes permiso para asignar proveedores a obras.");
    assignment = {
      wrkId: Number(input.assignment.wrkId),
      values: assignmentValuesOf(input.assignment),
      pvtIds: assignmentTypeIdsOf(input.assignment),
    };
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
        pvtIds,
        contacts,
        assignment: assignment && { wrkId: assignment.wrkId, ...assignment.values, pvtIds: assignment.pvtIds ?? null },
      },
      execute: (idempotencyData) => createProvider({ values, pvtIds, contacts, assignment, useBy: Number(useBy), ctx, idempotencyData }),
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
export const changeProviderStatus = async ({ prvId, staId, useBy, scope, ctx = { useId: useBy } }) => {
  await assertProviderInScope(scope, prvId);
  return withLockedTransaction(
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
};

/**
 * Eliminación lógica (DEC-006), bloqueada con 409 si el proveedor tiene obras
 * asignadas (regla 15): forma parte de sus expedientes. Los contactos se
 * conservan. Contratos y facturas exigen una asignación (DEC-058); las
 * facturas se cuentan igual, para dar el mensaje claro.
 */
export const deleteProvider = async ({ prvId, useBy, scope, ctx = { useId: useBy } }) => {
  await assertProviderInScope(scope, prvId);
  return withLockedTransaction({ PROVEEDOR: prvId }, async (tx) => {
    const before = await findLockedProvider(tx, prvId);

    const works = await tx.tbl_work_providers.count({ where: { prv_id: Number(prvId) } });
    if (works > 0) {
      throw httpError(409, `No se puede eliminar el proveedor: está asignado a ${works} obra(s). Desasígnalo primero o desactívalo.`);
    }
    const invoices = await tx.tbl_invoices.count({ where: { prv_id: Number(prvId) } });
    if (invoices > 0) {
      throw httpError(409, `No se puede eliminar el proveedor: tiene ${invoices} factura(s). Desactívalo en su lugar.`);
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
};

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
      tbl_provider_classifications: CLASSIFICATIONS_SELECT,
    },
  },
  tbl_work_provider_types: WORK_TYPES_SELECT,
};

/** Proveedores asignados a una obra, paginados (ENDPOINT_STANDARD, "Listados"). */
export const paginationWorkProviders = async ({ wrkId, search, rows, first, scope }) => {
  assertInScope(scope, wrkId, "No se encontró la obra.");
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

/**
 * Asignar un proveedor existente a una obra con los tipos con que trabajará
 * en ella (DEC-066; el cliente propone los del maestro). Bloqueo obra →
 * proveedor → tipos.
 */
export const assignProviderToWork = async ({ wrkId, prvId, input, useBy, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  assertInScope(scope, wrkId, "No se encontró la obra.");
  const values = assignmentValuesOf(input);
  assertAssignmentDate(values);
  const pvtIds = assignmentTypeIdsOf(input);
  if (!pvtIds) throw httpError(400, "Selecciona al menos un tipo de proveedor para la obra.");
  return runIdempotent({
    target: ASSIGNMENT_IDEMPOTENCY,
    key: idempotencyKey,
    ownerId: useBy,
    payload: { wrkId: Number(wrkId), prvId: Number(prvId), ...values, pvtIds },
    execute: (idempotencyData) =>
      withLockedTransaction({ OBRA: wrkId, PROVEEDOR: prvId, TIPO_PROVEEDOR: pvtIds }, async (tx) => {
        await assertWorkAssignable(tx, wrkId);
        await assertProviderAssignable(tx, { wrkId, prvId });
        const created = await insertAssignment(tx, { wrkId, prvId, values, pvtIds, useBy: Number(useBy), ctx, idempotencyData });
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

/**
 * Editar fecha, observaciones, estado o tipos de la asignación (DEC-066). Sin
 * `pvtIds`, los tipos no cambian. Un tipo nuevo debe estar activo; quitar uno
 * en uso responde 409 (applyAssignmentTypes). Reintentable.
 */
export const updateWorkProvider = async ({ wrkId, prvId, input, useBy, scope, ctx = { useId: useBy } }) => {
  assertInScope(scope, wrkId, "No se encontró la obra.");
  const values = { ...assignmentValuesOf(input), sta_id: Number(input.staId ?? ACTIVE_STATUS) };
  assertAssignmentDate(values);
  if (values.sta_id !== ACTIVE_STATUS && values.sta_id !== INACTIVE_STATUS) throw httpError(400, "El estado debe ser activo o inactivo.");
  const pvtIds = assignmentTypeIdsOf(input);

  return withLockedTransaction(
    { OBRA: wrkId, PROVEEDOR: prvId, ...(pvtIds ? { TIPO_PROVEEDOR: pvtIds } : {}) },
    async (tx) => {
      const row = await findLockedAssignment(tx, { wrkId, prvId });
      const currentIds = await findAssignmentTypeIds(tx, { wrkId, prvId });
      const before = { ...row, pvt_ids: currentIds };
      const after = { ...before, ...values, pvt_ids: pvtIds ?? currentIds };
      if (assignmentText(before) !== assignmentText(after)) {
        if (pvtIds) {
          await assertProviderTypes(tx, pvtIds, currentIds);
          await applyAssignmentTypes(tx, { wrkId, prvId, currentIds, pvtIds });
        }
        await tx.tbl_work_providers.update({ where: { wkp_id: row.wkp_id }, data: { ...values, wkp_update_by: Number(useBy) } });
        await auditAssignment(tx, { operation: AUDIT_OPERATIONS.UPDATE, before, after, ctx });
      }
      return { message: "Asignación modificada correctamente", wkpId: row.wkp_id };
    },
    { idempotent: true }
  );
};

/**
 * Desasignar: borra la asignación y deja el proveedor intacto en el maestro
 * (regla 12). La bitácora conserva la asignación. Bloqueado con 409 si el
 * proveedor tiene contratos (también eliminados) o facturas en esa obra: las
 * FK del contrato y de la factura a la asignación lo impiden (DEC-035,
 * DEC-042); esto da el mensaje claro.
 */
export const unassignProviderFromWork = async ({ wrkId, prvId, useBy, scope, ctx = { useId: useBy } }) => {
  assertInScope(scope, wrkId, "No se encontró la obra.");
  return withLockedTransaction({ OBRA: wrkId, PROVEEDOR: prvId }, async (tx) => {
    const before = await findLockedAssignment(tx, { wrkId, prvId });
    // Cuenta también los contratos eliminados: siguen apuntando a la
    // asignación, y con ellos sus facturas.
    const contracts = await tx.tbl_contracts.count({ where: { wrk_id: Number(wrkId), prv_id: Number(prvId) } });
    if (contracts > 0) {
      throw httpError(409, `No se puede desasignar el proveedor: tiene ${contracts} contrato(s) en esta obra. Inactiva la asignación en su lugar.`);
    }
    // Las facturas simples de la obra también apuntan a la asignación (DEC-058).
    const invoices = await tx.tbl_invoices.count({ where: { wrk_id: Number(wrkId), prv_id: Number(prvId) } });
    if (invoices > 0) {
      throw httpError(409, `No se puede desasignar el proveedor: tiene ${invoices} factura(s) en esta obra. Inactiva la asignación en su lugar.`);
    }
    const pvtIds = await findAssignmentTypeIds(tx, { wrkId, prvId });
    // Sus tipos (DEC-066) se borran con ella (ON DELETE CASCADE).
    await tx.tbl_work_providers.delete({ where: { wkp_id: before.wkp_id } });
    await auditAssignment(tx, { operation: AUDIT_OPERATIONS.REVOKE, before: { ...before, pvt_ids: pvtIds }, ctx });
    return { message: "Proveedor desasignado de la obra" };
  });
};
