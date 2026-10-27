import { prisma } from "../../../common/configs/prismaClient.js";
import { ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS } from "../../../common/constants/status.constants.js";
import { MAX_ROWS, countByStatus, containsFilter, filtersWhere, idFilter, paginate, resolvePagination, searchWhere } from "../../../common/utils/pagination.utils.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { dateOnlyText, toDateOnly } from "../../../common/utils/term.utils.js";
import { moneyText, sumMoney } from "../../../common/utils/money.utils.js";
import { assertInScope, scopeWhere } from "../../../common/services/workScope.service.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, writeAudit } from "../../../common/services/audit.service.js";
import { renderDocument } from "../../../common/services/export.service.js";
import { INVOICE_STATES } from "../invoices/invoiceTerms.js";
import { statementInvoices, statementsInvoices } from "../invoices/invoices.service.js";
import { statementGlosses } from "../invoices/invoiceGlosses.service.js";

/**
 * Extractos de la obra (DEC-084): el acta de WebPAC. Número único en la obra
 * entre no eliminados, fecha, número de comunicado y descripción. La factura
 * escribe su extracto como texto libre (migración 0124): el extracto agrupa
 * las facturas de su obra cuyo texto es su número, sin distinguir mayúsculas
 * ni tildes (intercalación de la columna), las haya antes o después de crearlo.
 *
 * - Alcance por obra (DEC-047): se lista, se lee y se escribe solo en una
 *   obra del alcance; fuera, 404.
 * - Crear bloquea la obra (el padre); editar, cambiar el estado y eliminar
 *   bloquean el extracto.
 * - Eliminar es lógico y responde 409 si alguna glosa lo usa. Las facturas no
 *   lo impiden: conservan su texto.
 * - El reporte totaliza sus facturas por menú (tipo de proveedor) y señala
 *   las aprobadas sin comprobante de egreso. Las anuladas no suman (DEC-052).
 */

const NOT_FOUND = "No se encontró el extracto.";

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });
const text = (value) => String(value ?? "").trim();
const optionalText = (value) => text(value) || null;

// Bitácora: el extracto agrupa facturas y define el reporte con que se oficializa el pago.
const AUDITED = ["wrk_id", "stm_number", "stm_date", "stm_communication", "stm_description"];

const auditable = (row) => ({ ...row, stm_date: dateOnlyText(row.stm_date) });

const SORT_FIELDS = {
  number: (order) => ({ stm_number: order }),
  date: (order) => ({ stm_date: order }),
  communication: (order) => ({ stm_communication: order }),
  workCode: (order) => ({ tbl_works: { wrk_code: order } }),
  updatedAt: (order) => ({ stm_update_at: order }),
};

const ROW_SELECT = {
  stm_id: true,
  wrk_id: true,
  stm_number: true,
  stm_date: true,
  stm_communication: true,
  stm_description: true,
  sta_id: true,
  stm_update_at: true,
  tbl_works: { select: { wrk_code: true, wrk_name: true } },
  tbl_status: { select: { sta_name: true } },
  updated_by_user: USER_NAME_SELECT,
};

// Clave con que se cruza el texto de la factura con el número del extracto, igual que la intercalación de MySQL
// (utf8mb4_0900_ai_ci): sin mayúsculas ni tildes.
const groupKey = (wrkId, number) => `${wrkId}|${String(number).normalize("NFD").replace(/\p{M}/gu, "").toLowerCase()}`;

/** Facturas no eliminadas de cada extracto de `rows`: las de su obra con ese texto. */
const invoiceCounts = async (rows) => {
  if (rows.length === 0) return new Map();
  const groups = await prisma.tbl_invoices.groupBy({
    by: ["wrk_id", "inv_statement"],
    where: {
      sta_id: { not: DELETED_STATUS },
      wrk_id: { in: [...new Set(rows.map((r) => r.wrk_id))] },
      inv_statement: { in: [...new Set(rows.map((r) => r.stm_number))] },
    },
    _count: { _all: true },
  });
  const counts = new Map();
  for (const g of groups) {
    const key = groupKey(g.wrk_id, g.inv_statement);
    counts.set(key, (counts.get(key) ?? 0) + g._count._all);
  }
  return counts;
};

const withCounts = async (rows) => {
  const counts = await invoiceCounts(rows);
  return rows.map((row) => toDto(row, counts.get(groupKey(row.wrk_id, row.stm_number)) ?? 0));
};

const toDto = (row, invoicesCount = 0) => ({
  stmId: row.stm_id,
  wrkId: row.wrk_id,
  workCode: row.tbl_works?.wrk_code ?? null,
  workName: row.tbl_works?.wrk_name ?? null,
  number: row.stm_number,
  date: dateOnlyText(row.stm_date),
  communication: row.stm_communication,
  description: row.stm_description,
  invoicesCount,
  staId: row.sta_id,
  statusName: row.tbl_status?.sta_name ?? null,
  updatedAt: row.stm_update_at,
  updatedByName: userFullName(row.updated_by_user),
});

// ─── Lectura ─────────────────────────────────────────────────────────────────

/** Listado del alcance (DEC-047), con filtros por campo (DEC-048) y pestañas por estado. */
export const paginationStatements = async ({ search, staId, wrkId, number, communication, rows, first, sortField, sortOrder, scope }) => {
  const order = Number(sortOrder) === 1 ? "asc" : "desc";
  const orderBy = (SORT_FIELDS[sortField] ?? SORT_FIELDS.date)(order);
  const baseWhere = {
    sta_id: { not: DELETED_STATUS },
    ...scopeWhere(scope),
    ...searchWhere(["stm_number", "stm_communication", "stm_description"], search),
    ...filtersWhere([
      idFilter(wrkId, (id) => ({ wrk_id: id })),
      containsFilter(number, (c) => ({ stm_number: c })),
      containsFilter(communication, (c) => ({ stm_communication: c })),
    ]),
  };
  const where = staId ? { ...baseWhere, AND: [...(baseWhere.AND ?? []), { sta_id: Number(staId) }] } : baseWhere;
  const [page, statusCounts] = await Promise.all([
    paginate(prisma.tbl_statements, { where, select: ROW_SELECT, orderBy }, { first, rows }),
    countByStatus(prisma.tbl_statements, baseWhere),
  ]);
  return { ...page, results: await withCounts(page.results), statusCounts };
};

const findStatement = async (stmId, scope) => {
  const row = await prisma.tbl_statements.findFirst({ where: { stm_id: Number(stmId), sta_id: { not: DELETED_STATUS } }, select: ROW_SELECT });
  if (!row) throw httpError(404, NOT_FOUND);
  assertInScope(scope, row.wrk_id, NOT_FOUND);
  return row;
};

export const getStatement = async ({ stmId, scope }) => (await withCounts([await findStatement(stmId, scope)]))[0];

/**
 * Extractos activos de una obra para las glosas de sus facturas (DEC-018: sin
 * paginar, con tope fijo). `includeId`: uno que ya se usa, aunque esté
 * inactivo. La más reciente primero.
 */
export const selectStatements = async ({ wrkId, includeId, scope }) => {
  assertInScope(scope, wrkId, "No se encontró la obra.");
  const rows = await prisma.tbl_statements.findMany({
    where: {
      wrk_id: Number(wrkId),
      OR: [{ sta_id: ACTIVE_STATUS }, ...(Number(includeId) > 0 ? [{ stm_id: Number(includeId), sta_id: { not: DELETED_STATUS } }] : [])],
    },
    select: { stm_id: true, stm_number: true, stm_date: true, sta_id: true },
    orderBy: [{ stm_date: "desc" }, { stm_id: "desc" }],
    take: MAX_ROWS,
  });
  return rows.map((row) => ({ value: row.stm_id, label: `${row.stm_number} · ${dateOnlyText(row.stm_date)}`, staId: row.sta_id }));
};

// ─── Escritura ───────────────────────────────────────────────────────────────

const valuesOf = (input) => ({
  stm_number: text(input.number),
  stm_date: toDateOnly(input.date),
  stm_communication: optionalText(input.communication),
  stm_description: optionalText(input.description),
});

const assertValues = (values) => {
  if (!values.stm_number) throw httpError(400, "El número del extracto es requerido.");
  if (!values.stm_date) throw httpError(400, "La fecha del extracto no es válida.");
};

const assertUniqueNumber = async (tx, { wrkId, number, excludeId = null }) => {
  const duplicate = await tx.tbl_statements.findFirst({
    where: { wrk_id: wrkId, stm_number: number, sta_id: { not: DELETED_STATUS }, ...(excludeId ? { stm_id: { not: excludeId } } : {}) },
    select: { stm_id: true },
  });
  if (duplicate) throw httpError(409, `Ya existe un extracto con el número ${number} en esta obra.`);
};

const IDEMPOTENCY_TARGET = {
  model: prisma.tbl_statements,
  keyField: "stm_idempotency_key",
  hashField: "stm_idempotency_hash",
  ownerField: "stm_create_by",
  select: { stm_id: true },
  toResult: (row) => ({ message: "Extracto creado correctamente", stmId: row.stm_id }),
};

const createStatement = ({ wrkId, values, useBy, ctx, idempotencyKey }) =>
  runIdempotent({
    target: IDEMPOTENCY_TARGET,
    key: idempotencyKey,
    ownerId: useBy,
    payload: { wrkId, ...auditable(values) },
    execute: (idempotencyData) =>
      // Cuelga de la obra: se bloquea el padre (ENDPOINT_STANDARD, transacciones, regla 5).
      withLockedTransaction({ OBRA: wrkId }, async (tx) => {
        const work = await tx.tbl_works.findUnique({ where: { wrk_id: wrkId }, select: { sta_id: true } });
        if (!work || work.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró la obra.");
        await assertUniqueNumber(tx, { wrkId, number: values.stm_number });
        const created = await tx.tbl_statements.create({
          data: { ...values, wrk_id: wrkId, sta_id: ACTIVE_STATUS, stm_create_by: useBy, stm_update_by: useBy, ...idempotencyData },
          select: { stm_id: true },
        });
        await writeAudit(tx, {
          entity: AUDIT_ENTITIES.STATEMENT,
          recordId: created.stm_id,
          operation: AUDIT_OPERATIONS.CREATE,
          ctx,
          changes: diffFields({}, auditable({ ...values, wrk_id: wrkId }), AUDITED),
        });
        return { message: "Extracto creado correctamente", stmId: created.stm_id };
      }),
  });

// La obra del extracto no cambia: se lee antes del bloqueo solo para el alcance.
const findImmutable = async (stmId, scope) => {
  const row = await prisma.tbl_statements.findUnique({ where: { stm_id: Number(stmId) }, select: { wrk_id: true, sta_id: true } });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, NOT_FOUND);
  assertInScope(scope, row.wrk_id, NOT_FOUND);
  return row;
};

const findLocked = async (tx, stmId) => {
  const row = await tx.tbl_statements.findUnique({
    where: { stm_id: Number(stmId) },
    select: { stm_id: true, wrk_id: true, stm_number: true, stm_date: true, stm_communication: true, stm_description: true, sta_id: true },
  });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, NOT_FOUND);
  return row;
};

/** Crear (stmId 0, con la obra) o editar. Crear exige `Idempotency-Key`. */
export const saveStatement = async ({ stmId, input, useBy, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  const values = valuesOf(input);
  assertValues(values);
  if (!(Number(stmId) > 0)) {
    const wrkId = Number(input.wrkId);
    assertInScope(scope, wrkId, "No se encontró la obra.");
    return createStatement({ wrkId, values, useBy: Number(useBy), ctx, idempotencyKey });
  }

  await findImmutable(stmId, scope);
  return withLockedTransaction(
    { EXTRACTO: Number(stmId) },
    async (tx) => {
      const before = await findLocked(tx, stmId);
      const changes = diffFields(auditable(before), auditable(values), AUDITED);
      if (changes.length > 0) {
        if (values.stm_number !== before.stm_number) {
          await assertUniqueNumber(tx, { wrkId: before.wrk_id, number: values.stm_number, excludeId: before.stm_id });
        }
        await tx.tbl_statements.update({ where: { stm_id: before.stm_id }, data: { ...values, stm_update_by: Number(useBy) } });
        await writeAudit(tx, { entity: AUDIT_ENTITIES.STATEMENT, recordId: before.stm_id, operation: AUDIT_OPERATIONS.UPDATE, ctx, changes });
      }
      return { message: "Extracto modificado correctamente", stmId: before.stm_id };
    },
    { idempotent: true }
  );
};

/** Activar o desactivar: uno inactivo no se ofrece en las glosas nuevas. Fija un estado final: reintentable. */
export const changeStatementStatus = async ({ stmId, staId, useBy, scope, ctx = { useId: useBy } }) => {
  const next = Number(staId);
  if (next !== ACTIVE_STATUS && next !== INACTIVE_STATUS) throw httpError(400, "El estado debe ser activo o inactivo.");
  await findImmutable(stmId, scope);
  return withLockedTransaction(
    { EXTRACTO: Number(stmId) },
    async (tx) => {
      const before = await findLocked(tx, stmId);
      if (before.sta_id !== next) {
        await tx.tbl_statements.update({ where: { stm_id: before.stm_id }, data: { sta_id: next, stm_update_by: Number(useBy) } });
        await writeAudit(tx, {
          entity: AUDIT_ENTITIES.STATEMENT,
          recordId: before.stm_id,
          operation: AUDIT_OPERATIONS.UPDATE,
          ctx,
          changes: diffFields(before, { sta_id: next }, ["sta_id"]),
        });
      }
      return { message: `Extracto ${next === ACTIVE_STATUS ? "activado" : "desactivado"} correctamente`, staId: next };
    },
    { idempotent: true }
  );
};

/** Eliminación lógica (DEC-006): 409 si alguna glosa no eliminada lo usa. Las facturas conservan su texto. */
export const deleteStatement = async ({ stmId, useBy, scope, ctx = { useId: useBy } }) => {
  await findImmutable(stmId, scope);
  return withLockedTransaction({ EXTRACTO: Number(stmId) }, async (tx) => {
    const before = await findLocked(tx, stmId);
    // Glosas levantadas o liberadas en él (DEC-085).
    const glosses = await tx.tbl_invoice_glosses.count({
      where: { sta_id: { not: DELETED_STATUS }, OR: [{ stm_id: before.stm_id }, { igl_release_stm_id: before.stm_id }] },
    });
    if (glosses > 0) throw httpError(409, `No se puede eliminar el extracto: tiene ${glosses} glosa(s).`);
    await tx.tbl_statements.update({
      where: { stm_id: before.stm_id },
      data: { sta_id: DELETED_STATUS, stm_update_by: Number(useBy), stm_delete_by: Number(useBy), stm_delete_at: new Date() },
    });
    await writeAudit(tx, {
      entity: AUDIT_ENTITIES.STATEMENT,
      recordId: before.stm_id,
      operation: AUDIT_OPERATIONS.DELETE,
      ctx,
      changes: diffFields(before, { sta_id: DELETED_STATUS }, ["sta_id"]),
    });
    return { message: "Extracto eliminado correctamente" };
  });
};

// ─── Reporte ─────────────────────────────────────────────────────────────────

const sumOf = (invoices, field) => moneyText(sumMoney(invoices.map((i) => i[field] ?? "0")));

/**
 * Totales de las facturas que cuentan (no anuladas): cuántas, valor, IVA y
 * total. Una factura sin importes (registrada antes de DEC-065 o DEC-075)
 * cuenta en la cantidad y no en los valores.
 */
const totalsOf = (invoices) => {
  const counted = invoices.filter((i) => i.state !== INVOICE_STATES.CANCELLED);
  return { count: counted.length, value: sumOf(counted, "value"), vat: sumOf(counted, "vat"), total: sumOf(counted, "total") };
};

/**
 * Reporte del extracto (documento de alcance, punto 7): sus facturas, los
 * totales por menú de facturas (tipo de proveedor: mayores, subcontratistas,
 * órdenes de servicio, simples) y en total, y el chequeo de comprobantes de
 * egreso: las aprobadas sin número de comprobante. Y las glosas que se
 * levantaron y se liberaron en él (DEC-085).
 */
export const getStatementReport = async ({ stmId, scope }) => {
  const statement = toDto(await findStatement(stmId, scope));
  const [invoices, glosses] = await Promise.all([
    statementInvoices({ wrkId: statement.wrkId, number: statement.number }),
    statementGlosses(statement.stmId),
  ]);
  statement.invoicesCount = invoices.length;
  return buildReport(statement, invoices, glosses);
};

/** Las cifras del reporte a partir de sus facturas y glosas: las mismas para un extracto registrado o escrito. */
const buildReport = (statement, invoices, glosses) => {
  const menus = new Map();
  for (const invoice of invoices) {
    if (!menus.has(invoice.pvtId)) menus.set(invoice.pvtId, { pvtId: invoice.pvtId, name: invoice.menuName, invoices: [] });
    menus.get(invoice.pvtId).invoices.push(invoice);
  }
  const withoutVoucher = invoices.filter((i) => i.state === INVOICE_STATES.APPROVED && !i.voucherNumber);
  return {
    statement,
    invoices,
    byMenu: [...menus.values()].map(({ invoices: own, ...menu }) => ({ ...menu, ...totalsOf(own) })),
    totals: totalsOf(invoices),
    cancelled: invoices.filter((i) => i.state === INVOICE_STATES.CANCELLED).length,
    withoutVoucher: withoutVoucher.map((i) => ({ invId: i.invId, number: i.number, providerName: i.providerName, menuName: i.menuName })),
    // Glosas levantadas en el extracto y liberadas en él (DEC-085), con su valor total.
    glosses: {
      raised: glosses.raised,
      released: glosses.released,
      raisedValue: sumOf(glosses.raised, "value"),
      releasedValue: sumOf(glosses.released, "value"),
    },
  };
};

const MENU_COLUMNS = [
  { header: "Menú", value: (r) => r.name, width: 2 },
  { header: "Facturas", value: (r) => String(r.count) },
  { header: "Valor", value: (r) => r.value, kind: "money" },
  { header: "IVA", value: (r) => r.vat, kind: "money" },
  { header: "Total", value: (r) => r.total, kind: "money" },
];

const INVOICE_COLUMNS = [
  { header: "Menú", value: (r) => r.menuName },
  { header: "Número", value: (r) => r.number },
  { header: "Proveedor", value: (r) => r.providerName, width: 2 },
  { header: "Contrato", value: (r) => r.contractNumber },
  { header: "Fecha", value: (r) => r.date, kind: "date" },
  { header: "Comprobante", value: (r) => r.voucherNumber },
  { header: "Valor", value: (r) => r.value, kind: "money" },
  { header: "IVA", value: (r) => r.vat, kind: "money" },
  { header: "Total", value: (r) => r.total, kind: "money" },
  { header: "Estado", value: (r) => r.stateName },
];

const GLOSS_COLUMNS = [
  { header: "Factura", value: (r) => r.invoiceNumber },
  { header: "Proveedor", value: (r) => r.providerName, width: 2 },
  { header: "Código", value: (r) => r.code },
  { header: "Descripción", value: (r) => r.description, width: 3 },
  { header: "Valor", value: (r) => r.value, kind: "money" },
  { header: "Levantada en", value: (r) => r.statement },
  { header: "Liberada en", value: (r) => r.releaseStatement },
];

/** El reporte del extracto en Excel o PDF (DEC-070), con las mismas cifras de la pantalla. */
export const exportStatement = async ({ stmId, format, scope }) => {
  const report = await getStatementReport({ stmId, scope });
  const { statement } = report;
  return renderReport(report, format, [
    { label: "Fecha", value: statement.date, kind: "date" },
    { label: "Comunicado", value: statement.communication },
    { label: "Descripción", value: statement.description },
  ]);
};

/** Documento del reporte: el encabezado con `fields` propios y las secciones comunes. */
const renderReport = (report, format, fields) => {
  const { statement, totals } = report;
  const sections = [
    {
      title: "Extracto",
      fields: [
        { label: "Obra", value: [statement.workCode, statement.workName].filter(Boolean).join(" — ") },
        { label: "Número", value: statement.number },
        ...fields,
        { label: "Facturas", value: String(report.invoices.length) },
        { label: "Aprobadas sin comprobante de egreso", value: String(report.withoutVoucher.length) },
      ],
    },
    {
      title: "Totales por menú",
      columns: MENU_COLUMNS,
      rows: report.byMenu,
      totals: { name: "Total", count: totals.count, value: totals.value, vat: totals.vat, total: totals.total },
      empty: "El extracto no tiene facturas.",
    },
    { title: "Facturas", columns: INVOICE_COLUMNS, rows: report.invoices, empty: "El extracto no tiene facturas." },
    {
      title: "Glosas levantadas",
      columns: GLOSS_COLUMNS,
      rows: report.glosses.raised,
      totals: report.glosses.raised.length ? { invoiceNumber: "Total", value: report.glosses.raisedValue } : null,
      empty: "No se levantaron glosas en este extracto.",
    },
    {
      title: "Glosas liberadas",
      columns: GLOSS_COLUMNS,
      rows: report.glosses.released,
      totals: report.glosses.released.length ? { invoiceNumber: "Total", value: report.glosses.releasedValue } : null,
      empty: "No se liberaron glosas en este extracto.",
    },
  ];
  const lines = report.cancelled > 0 ? [`Las ${report.cancelled} factura(s) anulada(s) se listan pero no suman.`] : [];
  return renderDocument({ format, title: `Extracto ${statement.number} — ${statement.workCode}`, lines, sections });
};

// ─── Extractos escritos en las facturas (solo lectura) ───────────────────────

/*
 * El extracto es un texto libre de la factura (migración 0124). La pantalla
 * Extractos agrupa las facturas por obra y texto, sin registrar nada: cada
 * grupo es un extracto escrito, con sus facturas, sus totales y su reporte. La
 * agrupación es la de la BD (intercalación de la columna: sin distinguir
 * mayúsculas ni tildes). Las glosas salen del extracto registrado con ese
 * número, si lo hay.
 */

const isApproved = (invoice) => invoice.state === INVOICE_STATES.APPROVED;

const GROUP_SORTS = {
  number: (g) => g.number,
  workCode: (g) => g.workCode ?? "",
  invoicesCount: (g) => g.invoicesCount,
  firstDate: (g) => g.firstDate ?? "",
  lastDate: (g) => g.lastDate ?? "",
};

const compareBy = (key) => (a, b) => {
  const x = key(a);
  const y = key(b);
  return typeof x === "number" ? x - y : String(x).localeCompare(String(y), "es", { numeric: true, sensitivity: "base" });
};

/**
 * Extractos escritos en las facturas del alcance (DEC-047), uno por obra y
 * texto, con cuántas facturas lo usan, sus fechas y, para la página, sus
 * totales (sin las anuladas). Pocos textos distintos por obra: se agrupan en
 * la BD y se ordenan y paginan aquí.
 */
export const paginationStatementGroups = async ({ search, wrkId, number, rows, first, sortField, sortOrder, scope }) => {
  const where = {
    sta_id: { not: DELETED_STATUS },
    inv_statement: { not: null },
    ...scopeWhere(scope),
    ...filtersWhere([
      idFilter(wrkId, (id) => ({ wrk_id: id })),
      containsFilter(number, (c) => ({ inv_statement: c })),
      containsFilter(search, (c) => ({ inv_statement: c })),
    ]),
  };
  const groups = await prisma.tbl_invoices.groupBy({
    by: ["wrk_id", "inv_statement"],
    where,
    _count: { _all: true },
    _min: { inv_date: true },
    _max: { inv_date: true },
  });
  const works = await prisma.tbl_works.findMany({
    where: { wrk_id: { in: [...new Set(groups.map((g) => g.wrk_id))] } },
    select: { wrk_id: true, wrk_code: true, wrk_name: true },
  });
  const workOf = new Map(works.map((w) => [w.wrk_id, w]));
  const all = groups.map((g) => ({
    wrkId: g.wrk_id,
    workCode: workOf.get(g.wrk_id)?.wrk_code ?? null,
    workName: workOf.get(g.wrk_id)?.wrk_name ?? null,
    number: g.inv_statement,
    invoicesCount: g._count._all,
    firstDate: dateOnlyText(g._min.inv_date),
    lastDate: dateOnlyText(g._max.inv_date),
  }));
  const compare = compareBy(GROUP_SORTS[sortField] ?? GROUP_SORTS.lastDate);
  all.sort(Number(sortOrder) === 1 ? compare : (a, b) => compare(b, a));

  const { skip, take } = resolvePagination({ first, rows });
  const page = all.slice(skip, skip + take);
  const invoices = await statementsInvoices({
    wrkIds: [...new Set(page.map((g) => g.wrkId))],
    numbers: [...new Set(page.map((g) => g.number))],
  });
  const byGroup = new Map();
  for (const invoice of invoices) {
    const key = groupKey(invoice.wrkId, invoice.statement);
    if (!byGroup.has(key)) byGroup.set(key, []);
    byGroup.get(key).push(invoice);
  }
  const results = page.map((g) => {
    const own = byGroup.get(groupKey(g.wrkId, g.number)) ?? [];
    const totals = totalsOf(own);
    return {
      ...g,
      value: totals.value,
      total: totals.total,
      approvedCount: own.filter(isApproved).length,
      withoutVoucher: own.filter((i) => isApproved(i) && !i.voucherNumber).length,
    };
  });
  return { results, total: all.length, page: Math.floor(skip / take) + 1, limit: take, totalPages: Math.ceil(all.length / take) };
};

/** Reporte de un extracto escrito: las facturas de la obra con ese texto; 404 si no hay ninguna o la obra está fuera del alcance. */
export const getStatementGroupReport = async ({ wrkId, number, scope }) => {
  const id = Number(wrkId);
  const value = text(number);
  assertInScope(scope, id, NOT_FOUND);
  const [invoices, work, registered] = await Promise.all([
    statementInvoices({ wrkId: id, number: value }),
    prisma.tbl_works.findUnique({ where: { wrk_id: id }, select: { wrk_code: true, wrk_name: true } }),
    prisma.tbl_statements.findFirst({ where: { wrk_id: id, stm_number: value, sta_id: { not: DELETED_STATUS } }, select: { stm_id: true } }),
  ]);
  if (invoices.length === 0) throw httpError(404, NOT_FOUND);
  const glosses = registered ? await statementGlosses(registered.stm_id) : { raised: [], released: [] };
  const dates = invoices.map((i) => i.date).filter(Boolean).sort();
  const statement = {
    wrkId: id,
    workCode: work?.wrk_code ?? null,
    workName: work?.wrk_name ?? null,
    number: invoices[0].statement ?? value,
    firstDate: dates[0] ?? null,
    lastDate: dates.at(-1) ?? null,
    invoicesCount: invoices.length,
  };
  return buildReport(statement, invoices, glosses);
};

/** El reporte de un extracto escrito en Excel o PDF (DEC-070). */
export const exportStatementGroup = async ({ wrkId, number, format, scope }) => {
  const report = await getStatementGroupReport({ wrkId, number, scope });
  return renderReport(report, format, [
    { label: "Primera factura", value: report.statement.firstDate, kind: "date" },
    { label: "Última factura", value: report.statement.lastDate, kind: "date" },
  ]);
};
