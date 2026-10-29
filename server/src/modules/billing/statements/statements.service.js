import { prisma } from "../../../common/configs/prismaClient.js";
import { ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS } from "../../../common/constants/status.constants.js";
import {
  MAX_ROWS,
  countByStatus,
  containsFilter,
  dateRangeFilter,
  filtersWhere,
  idFilter,
  paginate,
  resolvePagination,
  searchWhere,
} from "../../../common/utils/pagination.utils.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { dateOnlyText, toDateOnly } from "../../../common/utils/term.utils.js";
import { decimal, moneyText, sumMoney } from "../../../common/utils/money.utils.js";
import { assertInScope, scopeWhere } from "../../../common/services/workScope.service.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, writeAudit } from "../../../common/services/audit.service.js";
import { renderDocument } from "../../../common/services/export.service.js";
import { INVOICE_STATES } from "../invoices/invoiceTerms.js";
import { statementInvoices, statementsInvoices } from "../invoices/invoices.service.js";
import { STATEMENT_AMOUNTS } from "../invoices/statementAmounts.js";
import { statementGlosses, statementsGlosses, statementsWithGlosses } from "../invoices/invoiceGlosses.service.js";
import { GLOSS_FIELD_NAMES } from "../invoices/glossFields.js";
import { STATEMENT_GLOSS_FILTERS, STATEMENT_VOUCHER_FILTERS } from "./statementFilters.js";

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
 * - Eliminar es lógico. Las facturas y las glosas no lo impiden: conservan
 *   su texto (migraciones 0124 y 0125).
 * - El reporte totaliza sus facturas por menú (tipo de proveedor) y señala
 *   las aprobadas sin comprobante de egreso. Las anuladas no suman (DEC-052).
 *   El total pagado suma las glosas levantadas en él que suman al total; las
 *   liberadas en él no restan, porque las libera una factura suya (DEC-085).
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

/** Eliminación lógica (DEC-006). Las facturas y las glosas conservan su texto. */
export const deleteStatement = async ({ stmId, useBy, scope, ctx = { useId: useBy } }) => {
  await findImmutable(stmId, scope);
  return withLockedTransaction({ EXTRACTO: Number(stmId) }, async (tx) => {
    const before = await findLocked(tx, stmId);
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

/** Suma de cada importe del extracto (STATEMENT_AMOUNTS) en las facturas que cuentan (no anuladas). */
const amountTotalsOf = (invoices) => {
  const counted = invoices.filter((i) => i.state !== INVOICE_STATES.CANCELLED).map((i) => i.amounts ?? {});
  return Object.fromEntries(STATEMENT_AMOUNTS.map(([key]) => [key, sumOf(counted, key)]));
};

/** Importes que tiene alguna factura del extracto: las columnas de su tabla, en el orden de STATEMENT_AMOUNTS. */
const amountColumnsOf = (invoices) =>
  STATEMENT_AMOUNTS.filter(([key]) => invoices.some((i) => i.amounts?.[key] != null)).map(([key, label]) => ({ key, label }));
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
    statementGlosses({ wrkId: statement.wrkId, number: statement.number }),
  ]);
  statement.invoicesCount = invoices.length;
  return buildReport(statement, invoices, glosses);
};

/** Valor de las glosas levantadas que suman al total del extracto (las de una diferencia de pago). */
const affectingValueOf = (raised) => sumOf(raised.filter((g) => g.affectsTotal), "value");

/**
 * Total pagado del extracto (DEC-085): el total de sus facturas más las
 * glosas levantadas en él que suman al total (lo pagado difiere de lo
 * registrado). Las liberadas en él no restan: las libera una factura suya,
 * que ya cuenta en el total (migración 0127).
 */
const paidTotalOf = (total, affectingValue) => ({ glossesNet: moneyText(affectingValue), paidTotal: moneyText(decimal(total).plus(decimal(affectingValue))) });

/**
 * Glosas del extracto por campo de la factura (DEC-085), en el orden del
 * catálogo: cuánto se levantó, cuánto se liberó y cuánto suma al total
 * pagado (las levantadas que suman). Una glosa con varios campos reparte su
 * valor entre ellos (migración 0129): cada campo suma lo suyo.
 */
const glossesByField = ({ raised, released }) => {
  const order = Object.keys(GLOSS_FIELD_NAMES);
  const linesOf = (list) => list.flatMap((g) => g.fields.map((line) => ({ ...line, affectsTotal: g.affectsTotal })));
  const raisedLines = linesOf(raised);
  const releasedLines = linesOf(released);
  const present = [...new Set([...raisedLines, ...releasedLines].map((line) => line.field))].sort((a, b) => order.indexOf(a) - order.indexOf(b));
  return present.map((field) => {
    const own = (list) => list.filter((line) => line.field === field);
    return {
      field,
      name: GLOSS_FIELD_NAMES[field] ?? field,
      raised: sumOf(own(raisedLines), "value"),
      released: sumOf(own(releasedLines), "value"),
      net: affectingValueOf(own(raisedLines)),
    };
  });
};

/** Las cifras del reporte a partir de sus facturas y glosas: las mismas para un extracto registrado o escrito. */
const buildReport = (statement, invoices, glosses) => {
  const menus = new Map();
  for (const invoice of invoices) {
    if (!menus.has(invoice.pvtId)) menus.set(invoice.pvtId, { pvtId: invoice.pvtId, name: invoice.menuName, invoices: [] });
    menus.get(invoice.pvtId).invoices.push(invoice);
  }
  const withoutVoucher = invoices.filter((i) => i.state === INVOICE_STATES.APPROVED && !i.voucherNumber);
  const totals = totalsOf(invoices);
  const raisedValue = sumOf(glosses.raised, "value");
  const releasedValue = sumOf(glosses.released, "value");
  // Valor de las glosas levantadas en el extracto sobre cada factura: la columna Glosas del reporte.
  const glossesOfInvoice = (invId) => sumOf(glosses.raised.filter((g) => g.invId === invId), "value");
  const withGlosses = invoices.map((invoice) => ({ ...invoice, glossesValue: glossesOfInvoice(invoice.invId) }));
  return {
    statement,
    invoices: withGlosses,
    // Las facturas por proveedor, como el listado del sistema que se migra: cada uno con su subtotal (sin las anuladas).
    byProvider: providerGroupsOf(withGlosses),
    invoiceGlossesTotal: sumOf(withGlosses, "glossesValue"),
    // Todos los importes de las facturas, una columna por importe que alguna tenga, con la suma de cada una.
    amountColumns: amountColumnsOf(invoices),
    amountTotals: amountTotalsOf(invoices),
    byMenu: [...menus.values()].map(({ invoices: own, ...menu }) => ({ ...menu, ...totalsOf(own) })),
    totals: { ...totals, ...paidTotalOf(totals.total, affectingValueOf(glosses.raised)) },
    cancelled: invoices.filter((i) => i.state === INVOICE_STATES.CANCELLED).length,
    withoutVoucher: withoutVoucher.map((i) => ({ invId: i.invId, number: i.number, providerName: i.providerName, menuName: i.menuName })),
    // Glosas levantadas en el extracto y liberadas en él (DEC-085), con su valor total.
    glosses: {
      raised: glosses.raised,
      released: glosses.released,
      raisedValue,
      releasedValue,
      byField: glossesByField(glosses),
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

/** Columnas de la tabla de facturas: su identificación, un importe por columna de `amountColumns` y el estado. */
const invoiceColumnsOf = (amountColumns) => [
  { header: "Menú", value: (r) => r.menuName },
  { header: "Número", value: (r) => r.number },
  { header: "Proveedor", value: (r) => r.providerName, width: 2 },
  { header: "Contrato", value: (r) => r.contractNumber },
  { header: "Fecha", value: (r) => r.date, kind: "date" },
  { header: "Comprobante", value: (r) => r.voucherNumber },
  ...amountColumns.map(({ key, label }) => ({ header: label, value: (r) => r.amounts?.[key], kind: "money" })),
  // Glosas levantadas en el extracto sobre la factura (DEC-085); el detalle, en sus tablas.
  { header: "Glosas", value: (r) => r.glossesValue, kind: "money" },
  { header: "Estado", value: (r) => r.stateName },
];

/** Subtotal o total de la tabla de facturas: sus importes sin las anuladas y sus glosas. */
const invoiceTableTotals = (invoices, label) => ({ menuName: label, amounts: amountTotalsOf(invoices), glossesValue: sumOf(invoices, "glossesValue") });

const PROVIDER_COLLATOR = new Intl.Collator("es", { numeric: true, sensitivity: "base" });
const NO_PROVIDER = "Sin proveedor";

/** Grupos por proveedor de la tabla de facturas, en orden alfabético: sus facturas (ids) y su subtotal. */
const providerGroupsOf = (invoices) => {
  const byName = new Map();
  for (const invoice of invoices) {
    const name = invoice.providerName || NO_PROVIDER;
    if (!byName.has(name)) byName.set(name, []);
    byName.get(name).push(invoice);
  }
  return [...byName.entries()]
    .sort(([a], [b]) => PROVIDER_COLLATOR.compare(a, b))
    .map(([providerName, own]) => {
      const { amounts, glossesValue } = invoiceTableTotals(own, null);
      return { providerName, invIds: own.map((i) => i.invId), subtotal: { amounts, glossesValue } };
    });
};

const GLOSS_COLUMNS = [
  { header: "Factura", value: (r) => r.invoiceNumber },
  { header: "Proveedor", value: (r) => r.providerName, width: 2 },
  { header: "Campos", value: (r) => r.fieldName, width: 2 },
  // Negativa: nota crédito, lo que el proveedor devuelve (DEC-085).
  { header: "Tipo", value: (r) => (r.creditNote ? "Nota crédito" : "Glosa") },
  { header: "Descripción", value: (r) => r.description, width: 3 },
  { header: "Valor", value: (r) => r.value, kind: "money" },
  { header: "Suma al total", value: (r) => (r.affectsTotal ? "Sí" : "No") },
  // Dónde, cuándo y quién la levantó; con qué factura, cuándo y quién la liberó.
  { header: "Levantada en", value: (r) => r.statement },
  { header: "Levantada el", value: (r) => r.raisedDate, kind: "date" },
  { header: "Levantada por", value: (r) => r.createdByName, width: 2 },
  { header: "Liberada con", value: (r) => r.releaseInvoiceNumber },
  { header: "Liberada en", value: (r) => r.releaseStatement },
  { header: "Liberada el", value: (r) => r.releaseDate, kind: "date" },
  { header: "Liberada por", value: (r) => r.releasedByName, width: 2 },
];

const GLOSS_FIELD_COLUMNS = [
  { header: "Campo", value: (r) => r.name, width: 2 },
  { header: "Levantadas", value: (r) => r.raised, kind: "money" },
  { header: "Liberadas", value: (r) => r.released, kind: "money" },
  { header: "Suma al total", value: (r) => r.net, kind: "money" },
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
        { label: "Total de las facturas", value: totals.total, kind: "money" },
        { label: "Glosas que suman al total", value: totals.glossesNet, kind: "money" },
        { label: "Total pagado", value: totals.paidTotal, kind: "money" },
      ],
    },
    {
      title: "Totales por menú",
      columns: MENU_COLUMNS,
      rows: report.byMenu,
      totals: { name: "Total", count: totals.count, value: totals.value, vat: totals.vat, total: totals.total },
      empty: "El extracto no tiene facturas.",
    },
    {
      title: "Facturas",
      columns: invoiceColumnsOf(report.amountColumns),
      rows: report.invoices,
      // Por proveedor, como el listado del sistema que se migra; la suma de cada columna, sin las anuladas.
      rowGroups: { label: (r) => r.providerName, column: "Proveedor", emptyLabel: NO_PROVIDER, subtotal: (own) => invoiceTableTotals(own, "Subtotal") },
      totals: report.invoices.length ? invoiceTableTotals(report.invoices, "Total") : null,
      empty: "El extracto no tiene facturas.",
    },
    {
      title: "Glosas por campo",
      columns: GLOSS_FIELD_COLUMNS,
      rows: report.glosses.byField,
      totals: report.glosses.byField.length
        ? { name: "Total", raised: report.glosses.raisedValue, released: report.glosses.releasedValue, net: totals.glossesNet }
        : null,
      empty: "El extracto no tiene glosas.",
    },
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
  const heading = `Obra: ${[statement.workCode, statement.workName].filter(Boolean).join(" — ")}`;
  return renderDocument({ format, title: `Listado de facturas — Extracto ${statement.number}`, heading, lines, sections });
};

// ─── Extractos escritos en las facturas (solo lectura) ───────────────────────

/*
 * El extracto es un texto libre de la factura (migración 0124). La pantalla
 * Extractos agrupa las facturas por obra y texto, sin registrar nada: cada
 * grupo es un extracto escrito, con sus facturas, sus totales y su reporte. La
 * agrupación es la de la BD (intercalación de la columna: sin distinguir
 * mayúsculas ni tildes). Las glosas se agrupan igual, por su texto
 * (migración 0125).
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

/** Número del extracto frente a un extremo del rango, como se ordena: natural ("9" antes que "10"), sin mayúsculas ni tildes. */
const compareNumber = (a, b) => String(a).localeCompare(String(b), "es", { numeric: true, sensitivity: "base" });

const keySet = (rows, statementOf) => new Set(rows.map((row) => groupKey(row.wrk_id ?? row.wrkId, statementOf(row))));

/** `keep(inSet)` según el filtro: con, sin o sin filtro (null). */
const presenceFilter = (value, withValue, withoutValue) => (value === withValue ? (has) => has : value === withoutValue ? (has) => !has : null);

/**
 * Extractos escritos en las facturas del alcance (DEC-047), uno por obra y
 * texto, con cuántas facturas lo usan, sus fechas y, para la página, sus
 * totales (sin las anuladas). Pocos textos distintos por obra: se agrupan en
 * la BD y se filtran, ordenan y paginan aquí.
 *
 * Filtros: obra, texto, rango de número (como se ordena), rango de fechas
 * (alguna factura del extracto en el rango; el extracto se muestra completo),
 * aprobadas sin comprobante de egreso y glosas levantadas en él.
 */
export const paginationStatementGroups = async ({
  search,
  wrkId,
  number,
  numberFrom,
  numberTo,
  dateFrom,
  dateTo,
  voucher,
  gloss,
  rows,
  first,
  sortField,
  sortOrder,
  scope,
}) => {
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
  const byDate = dateRangeFilter("inv_date", dateFrom, dateTo);
  const withVoucher = presenceFilter(voucher, STATEMENT_VOUCHER_FILTERS.MISSING, STATEMENT_VOUCHER_FILTERS.NONE);
  const withGloss = presenceFilter(gloss, STATEMENT_GLOSS_FILTERS.WITH, STATEMENT_GLOSS_FILTERS.WITHOUT);
  const [groups, inDates, missingVoucher] = await Promise.all([
    prisma.tbl_invoices.groupBy({
      by: ["wrk_id", "inv_statement"],
      where,
      _count: { _all: true },
      _min: { inv_date: true },
      _max: { inv_date: true },
    }),
    byDate ? prisma.tbl_invoices.groupBy({ by: ["wrk_id", "inv_statement"], where: { AND: [where, byDate] } }) : null,
    withVoucher
      ? prisma.tbl_invoices.groupBy({
          by: ["wrk_id", "inv_statement"],
          where: { AND: [where, { inv_state: INVOICE_STATES.APPROVED, OR: [{ inv_voucher_number: null }, { inv_voucher_number: "" }] }] },
        })
      : null,
  ]);
  const glossed = withGloss ? keySet(await statementsWithGlosses([...new Set(groups.map((g) => g.wrk_id))]), (r) => r.statement) : null;
  const dated = inDates && keySet(inDates, (r) => r.inv_statement);
  const unpaid = missingVoucher && keySet(missingVoucher, (r) => r.inv_statement);
  const from = text(numberFrom);
  const to = text(numberTo);
  const kept = groups.filter((g) => {
    const key = groupKey(g.wrk_id, g.inv_statement);
    return (
      (!from || compareNumber(g.inv_statement, from) >= 0) &&
      (!to || compareNumber(g.inv_statement, to) <= 0) &&
      (!dated || dated.has(key)) &&
      (!unpaid || withVoucher(unpaid.has(key))) &&
      (!glossed || withGloss(glossed.has(key)))
    );
  });
  return pageOfGroups(kept, { rows, first, sortField, sortOrder });
};

/** Ordena y pagina los grupos ya filtrados, con los totales de la página. */
const pageOfGroups = async (groups, { rows, first, sortField, sortOrder }) => {
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
  const pageGroups = { wrkIds: [...new Set(page.map((g) => g.wrkId))], numbers: [...new Set(page.map((g) => g.number))] };
  const [invoices, glosses] = await Promise.all([statementsInvoices(pageGroups), statementsGlosses(pageGroups)]);
  const byGroup = new Map();
  for (const invoice of invoices) {
    const key = groupKey(invoice.wrkId, invoice.statement);
    if (!byGroup.has(key)) byGroup.set(key, []);
    byGroup.get(key).push(invoice);
  }
  // Glosas por extracto: las levantadas en él y las liberadas en él.
  const glossesOf = (wrkId, number) => {
    const key = groupKey(wrkId, number);
    const inGroup = (text) => text !== null && groupKey(wrkId, text) === key;
    const own = glosses.filter((gl) => gl.wrkId === wrkId);
    return { raised: own.filter((gl) => inGroup(gl.statement)), released: own.filter((gl) => inGroup(gl.releaseStatement)) };
  };
  const results = page.map((g) => {
    const own = byGroup.get(groupKey(g.wrkId, g.number)) ?? [];
    const totals = totalsOf(own);
    const { raised } = glossesOf(g.wrkId, g.number);
    return {
      ...g,
      value: totals.value,
      total: totals.total,
      ...paidTotalOf(totals.total, affectingValueOf(raised)),
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
  const [invoices, work, glosses] = await Promise.all([
    statementInvoices({ wrkId: id, number: value }),
    prisma.tbl_works.findUnique({ where: { wrk_id: id }, select: { wrk_code: true, wrk_name: true } }),
    statementGlosses({ wrkId: id, number: value }),
  ]);
  if (invoices.length === 0) throw httpError(404, NOT_FOUND);
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
