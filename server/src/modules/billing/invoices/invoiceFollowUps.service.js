import { prisma } from "../../../common/configs/prismaClient.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { dateOnlyText, toDateOnly, todayDateOnly } from "../../../common/utils/term.utils.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, writeAudit } from "../../../common/services/audit.service.js";
import { INVOICE_STATES, TYPE_NAMES } from "./invoiceTerms.js";
import { assertInvoiceVisible } from "./invoices.service.js";

/**
 * Seguimiento de facturas (DEC-076): registro manual de lo que se está
 * trabajando sobre una factura.
 *
 * - Se abre con una fecha (no futura) y una descripción, y se cierra con una
 *   observación; la fecha de cierre es la del servidor.
 * - Varios por factura, como máximo uno abierto: lo verifica el service bajo
 *   el bloqueo de la factura y lo garantiza el UNIQUE de la BD
 *   (uq_invoice_follow_ups_open).
 * - Abierto, se edita y se elimina (lógico); cerrado, solo se consulta.
 * - Una factura anulada no admite seguimientos nuevos ni ediciones; el que
 *   quedó abierto se puede cerrar o eliminar.
 * - Ver exige ver facturas; operar, además, el permiso de gestionar
 *   seguimientos (las rutas). Todo, dentro del alcance por obra (404 fuera).
 */

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });
const text = (value) => String(value ?? "").trim();
const DESCRIPTION_MAX = 1000;
const NOT_FOUND = "No se encontró el seguimiento.";

const AUDITED = ["ifu_open_date", "ifu_description", "ifu_close_date", "ifu_close_observation", "sta_id"];
const auditable = (values) =>
  Object.fromEntries(Object.entries(values).map(([column, value]) => [column, value instanceof Date ? dateOnlyText(value) : value]));

/** Texto obligatorio de hasta 1000 caracteres; 400 si no. */
const requiredText = (value, label) => {
  const result = text(value);
  if (!result) throw httpError(400, `La ${label} es requerida.`);
  if (result.length > DESCRIPTION_MAX) throw httpError(400, `La ${label} admite hasta ${DESCRIPTION_MAX} caracteres.`);
  return result;
};

/** Fecha de apertura: "AAAA-MM-DD" válida y no futura; 400 si no. */
const openDateOf = (value) => {
  const date = toDateOnly(value);
  if (!date) throw httpError(400, "La fecha de apertura no es una fecha válida.");
  if (date.getTime() > todayDateOnly().getTime()) throw httpError(400, "La fecha de apertura no puede ser futura.");
  return date;
};

const FOLLOW_UP_SELECT = {
  ifu_id: true,
  inv_id: true,
  ifu_open_date: true,
  ifu_description: true,
  ifu_close_date: true,
  ifu_close_observation: true,
  sta_id: true,
  ifu_create_at: true,
  ifu_update_at: true,
  created_by_user: USER_NAME_SELECT,
  updated_by_user: USER_NAME_SELECT,
  closed_by_user: USER_NAME_SELECT,
};

const toDto = (row) => ({
  ifuId: row.ifu_id,
  invId: row.inv_id,
  openDate: dateOnlyText(row.ifu_open_date),
  description: row.ifu_description,
  closeDate: dateOnlyText(row.ifu_close_date),
  closeObservation: row.ifu_close_observation,
  open: row.ifu_close_date === null,
  createdAt: row.ifu_create_at,
  createdByName: userFullName(row.created_by_user),
  updatedAt: row.ifu_update_at,
  updatedByName: userFullName(row.updated_by_user),
  closedByName: userFullName(row.closed_by_user),
});

/** Factura bloqueada (estado), 404 si no existe o está eliminada. */
const findLockedInvoice = async (tx, invId) => {
  const row = await tx.tbl_invoices.findUnique({ where: { inv_id: Number(invId) }, select: { inv_id: true, inv_state: true, sta_id: true } });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró la factura.");
  return row;
};

const assertNotCancelled = (invoice, action) => {
  if (invoice.inv_state === INVOICE_STATES.CANCELLED) throw httpError(409, `La factura está anulada: no admite ${action}.`);
};

/** Factura del seguimiento, leída antes del bloqueo (no cambia nunca); 404 si no existe o está eliminado. */
const invoiceOfFollowUp = async (ifuId) => {
  const row = await prisma.tbl_invoice_follow_ups.findUnique({ where: { ifu_id: Number(ifuId) }, select: { inv_id: true, sta_id: true } });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, NOT_FOUND);
  return row.inv_id;
};

/** Seguimiento abierto, con su factura ya bloqueada; 404 si no existe o se eliminó, 409 si está cerrado. */
const findLockedOpen = async (tx, ifuId) => {
  const row = await tx.tbl_invoice_follow_ups.findUnique({ where: { ifu_id: Number(ifuId) } });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, NOT_FOUND);
  if (row.ifu_close_date !== null) throw httpError(409, "El seguimiento está cerrado: solo se consulta.");
  return row;
};

/** Seguimientos de una factura, el más reciente primero. */
export const listFollowUps = async ({ invId, scope }) => {
  await assertInvoiceVisible({ scope }, invId);
  const rows = await prisma.tbl_invoice_follow_ups.findMany({
    where: { inv_id: Number(invId), sta_id: { not: DELETED_STATUS } },
    select: FOLLOW_UP_SELECT,
    orderBy: [{ ifu_open_date: "desc" }, { ifu_id: "desc" }],
  });
  return rows.map(toDto);
};

const IDEMPOTENCY_TARGET = {
  model: prisma.tbl_invoice_follow_ups,
  keyField: "ifu_idempotency_key",
  hashField: "ifu_idempotency_hash",
  ownerField: "ifu_create_by",
  select: { ifu_id: true },
  toResult: (row) => ({ message: "Seguimiento abierto correctamente", ifuId: row.ifu_id }),
};

/** Abre un seguimiento: la factura no puede estar anulada ni tener otro abierto. */
export const openFollowUp = async ({ invId, input, useBy, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  await assertInvoiceVisible({ scope }, invId);
  const values = { ifu_open_date: openDateOf(input?.openDate), ifu_description: requiredText(input?.description, "descripción") };

  return runIdempotent({
    target: IDEMPOTENCY_TARGET,
    key: idempotencyKey,
    ownerId: useBy,
    payload: { invId: Number(invId), ...auditable(values) },
    execute: (idempotencyData) =>
      withLockedTransaction({ FACTURA: Number(invId) }, async (tx) => {
        const invoice = await findLockedInvoice(tx, invId);
        assertNotCancelled(invoice, "seguimientos nuevos");
        const open = await tx.tbl_invoice_follow_ups.findFirst({
          where: { inv_id: invoice.inv_id, ifu_close_date: null, sta_id: { not: DELETED_STATUS } },
          select: { ifu_id: true },
        });
        if (open) throw httpError(409, "La factura ya tiene un seguimiento abierto: ciérralo antes de abrir otro.");

        const created = await tx.tbl_invoice_follow_ups.create({
          data: {
            inv_id: invoice.inv_id,
            ...values,
            sta_id: ACTIVE_STATUS,
            ifu_create_by: Number(useBy),
            ifu_update_by: Number(useBy),
            ...idempotencyData,
          },
          select: { ifu_id: true },
        });
        await writeAudit(tx, {
          entity: AUDIT_ENTITIES.INVOICE_FOLLOW_UP,
          recordId: created.ifu_id,
          operation: AUDIT_OPERATIONS.CREATE,
          ctx,
          changes: [{ field: "inv_id", oldValue: null, newValue: invoice.inv_id }, ...diffFields({}, auditable(values), AUDITED)],
        });
        return { message: "Seguimiento abierto correctamente", ifuId: created.ifu_id };
      }),
  });
};

/** Edita la fecha de apertura y la descripción de un seguimiento abierto. */
export const updateFollowUp = async ({ ifuId, input, useBy, scope, ctx = { useId: useBy } }) => {
  const invId = await invoiceOfFollowUp(ifuId);
  await assertInvoiceVisible({ scope }, invId);
  const values = { ifu_open_date: openDateOf(input?.openDate), ifu_description: requiredText(input?.description, "descripción") };

  return withLockedTransaction({ FACTURA: invId }, async (tx) => {
    assertNotCancelled(await findLockedInvoice(tx, invId), "cambios en sus seguimientos");
    const before = await findLockedOpen(tx, ifuId);
    const changes = diffFields(auditable(before), auditable(values), AUDITED);
    if (changes.length === 0) return { message: "No hubo cambios en el seguimiento", ifuId: before.ifu_id };

    await tx.tbl_invoice_follow_ups.update({ where: { ifu_id: before.ifu_id }, data: { ...values, ifu_update_by: Number(useBy) } });
    await writeAudit(tx, { entity: AUDIT_ENTITIES.INVOICE_FOLLOW_UP, recordId: before.ifu_id, operation: AUDIT_OPERATIONS.UPDATE, ctx, changes });
    return { message: "Seguimiento actualizado correctamente", ifuId: before.ifu_id };
  });
};

/** Cierra un seguimiento abierto con una observación; la fecha de cierre es la de hoy (servidor). */
export const closeFollowUp = async ({ ifuId, input, useBy, scope, ctx = { useId: useBy } }) => {
  const invId = await invoiceOfFollowUp(ifuId);
  await assertInvoiceVisible({ scope }, invId);
  const observation = requiredText(input?.observation, "observación de cierre");

  return withLockedTransaction({ FACTURA: invId }, async (tx) => {
    await findLockedInvoice(tx, invId);
    const before = await findLockedOpen(tx, ifuId);
    const closeDate = todayDateOnly();
    const values = { ifu_close_date: closeDate, ifu_close_observation: observation };

    await tx.tbl_invoice_follow_ups.update({
      where: { ifu_id: before.ifu_id },
      data: { ...values, ifu_close_by: Number(useBy), ifu_update_by: Number(useBy) },
    });
    await writeAudit(tx, {
      entity: AUDIT_ENTITIES.INVOICE_FOLLOW_UP,
      recordId: before.ifu_id,
      operation: AUDIT_OPERATIONS.UPDATE,
      ctx,
      changes: diffFields(auditable(before), auditable(values), AUDITED),
    });
    return { message: "Seguimiento cerrado correctamente", ifuId: before.ifu_id, closeDate: dateOnlyText(closeDate) };
  });
};

/** Elimina (lógico) un seguimiento abierto. */
export const deleteFollowUp = async ({ ifuId, useBy, scope, ctx = { useId: useBy } }) => {
  const invId = await invoiceOfFollowUp(ifuId);
  await assertInvoiceVisible({ scope }, invId);

  return withLockedTransaction({ FACTURA: invId }, async (tx) => {
    await findLockedInvoice(tx, invId);
    const before = await findLockedOpen(tx, ifuId);
    await tx.tbl_invoice_follow_ups.update({
      where: { ifu_id: before.ifu_id },
      data: { sta_id: DELETED_STATUS, ifu_delete_by: Number(useBy), ifu_delete_at: new Date(), ifu_update_by: Number(useBy) },
    });
    await writeAudit(tx, {
      entity: AUDIT_ENTITIES.INVOICE_FOLLOW_UP,
      recordId: before.ifu_id,
      operation: AUDIT_OPERATIONS.DELETE,
      ctx,
      changes: [{ field: "sta_id", oldValue: before.sta_id, newValue: DELETED_STATUS }],
    });
    return { message: "Seguimiento eliminado correctamente", ifuId: before.ifu_id };
  });
};

// ─── Tableros (DEC-076) ──────────────────────────────────────────────────────

// Tope de las filas del detalle: la cifra es el total; las filas, las más antiguas.
const BOARD_ROWS = 100;
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Seguimientos abiertos de las facturas no eliminadas que cumplen
 * `invoiceWhere` (el alcance del tablero), para la cifra y su detalle: el
 * total y, del más antiguo al más reciente, cada uno con su factura y los
 * días que lleva abierto a la fecha de referencia (`today`). Lo cuenta y lo
 * calcula el servidor (FRONTEND_STANDARD, regla 9).
 */
export const openFollowUpsSummary = async ({ invoiceWhere, today = todayDateOnly() }) => {
  const where = {
    ifu_close_date: null,
    sta_id: { not: DELETED_STATUS },
    tbl_invoices: { ...invoiceWhere, sta_id: { not: DELETED_STATUS } },
  };
  const [count, rows] = await Promise.all([
    prisma.tbl_invoice_follow_ups.count({ where }),
    prisma.tbl_invoice_follow_ups.findMany({
      where,
      select: {
        ifu_id: true,
        ifu_open_date: true,
        ifu_description: true,
        created_by_user: USER_NAME_SELECT,
        tbl_invoices: {
          select: {
            inv_id: true,
            pvt_id: true,
            inv_type: true,
            inv_number: true,
            inv_state: true,
            tbl_providers: { select: { prv_name: true } },
            tbl_works: { select: { wrk_code: true } },
            tbl_contracts: { select: { ctr_number: true } },
          },
        },
      },
      orderBy: [{ ifu_open_date: "asc" }, { ifu_id: "asc" }],
      take: BOARD_ROWS,
    }),
  ]);
  return {
    count,
    items: rows.map((row) => ({
      ifuId: row.ifu_id,
      invId: row.tbl_invoices.inv_id,
      pvtId: row.tbl_invoices.pvt_id,
      number: row.tbl_invoices.inv_number,
      typeName: TYPE_NAMES[row.tbl_invoices.inv_type] ?? row.tbl_invoices.inv_type,
      state: row.tbl_invoices.inv_state,
      providerName: row.tbl_invoices.tbl_providers?.prv_name ?? null,
      workCode: row.tbl_invoices.tbl_works?.wrk_code ?? null,
      contractNumber: row.tbl_invoices.tbl_contracts?.ctr_number ?? null,
      openDate: dateOnlyText(row.ifu_open_date),
      daysOpen: Math.max(0, Math.round((today.getTime() - row.ifu_open_date.getTime()) / DAY_MS)),
      description: row.ifu_description,
      createdByName: userFullName(row.created_by_user),
    })),
  };
};
