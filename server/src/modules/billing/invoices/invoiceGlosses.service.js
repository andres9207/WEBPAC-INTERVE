import { prisma } from "../../../common/configs/prismaClient.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { dateOnlyText, todayDateOnly } from "../../../common/utils/term.utils.js";
import { moneyText, toMoney } from "../../../common/utils/money.utils.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, writeAudit } from "../../../common/services/audit.service.js";
import { INVOICE_STATES } from "./invoiceTerms.js";
import { assertInvoiceVisible } from "./invoices.service.js";

/**
 * Glosas de facturas (DEC-085; documento de alcance, punto 6): errores
 * hallados al registrar una factura recibida, que se controlan hasta su
 * liberación en un extracto posterior. Como la glosa de WebPAC (tblglosas).
 *
 * - De la obra de su factura (FK compuesta). Código opcional, valor distinto
 *   de cero (con signo, como en WebPAC) y descripción.
 * - Se levanta en un extracto de la obra (opcional; el cliente propone el de
 *   la factura) y se libera en otro posterior de la misma obra, con una
 *   observación; la fecha de liberación es la del servidor.
 * - No bloquea la aprobación de la factura. Abierta, se edita y se elimina
 *   (lógico); liberada, solo se consulta. Una factura anulada no admite
 *   glosas nuevas ni cambios; las abiertas se pueden liberar o eliminar.
 * - Bloqueo: factura → extractos (ADR-0027, DEC-084). Ver exige ver
 *   facturas; operar, además, gestionar glosas (las rutas). Todo, dentro del
 *   alcance por obra (404 fuera).
 */

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });
const text = (value) => String(value ?? "").trim();
const optionalText = (value) => text(value) || null;
const TEXT_MAX = 1000;
const NOT_FOUND = "No se encontró la glosa.";

const AUDITED = ["stm_id", "igl_code", "igl_value", "igl_description", "igl_release_stm_id", "igl_release_date", "igl_release_observation", "sta_id"];
const auditable = (values) =>
  Object.fromEntries(
    Object.entries(values).map(([column, value]) => [column, value instanceof Date ? dateOnlyText(value) : column === "igl_value" ? moneyText(value) : value])
  );

const requiredText = (value, label) => {
  const result = text(value);
  if (!result) throw httpError(400, `La ${label} es requerida.`);
  if (result.length > TEXT_MAX) throw httpError(400, `La ${label} admite hasta ${TEXT_MAX} caracteres.`);
  return result;
};

const valuesOf = (input) => {
  const value = toMoney(input?.value);
  if (value === null || value.isZero()) throw httpError(400, "El valor de la glosa es requerido y no puede ser cero.");
  return {
    stm_id: Number(input?.stmId) > 0 ? Number(input.stmId) : null,
    igl_code: optionalText(input?.code),
    igl_value: value,
    igl_description: requiredText(input?.description, "descripción"),
  };
};

const STATEMENT_SELECT = { select: { stm_number: true, stm_date: true } };

const GLOSS_SELECT = {
  igl_id: true,
  inv_id: true,
  stm_id: true,
  igl_code: true,
  igl_value: true,
  igl_description: true,
  igl_release_stm_id: true,
  igl_release_date: true,
  igl_release_observation: true,
  igl_create_at: true,
  igl_update_at: true,
  statement: STATEMENT_SELECT,
  release_statement: STATEMENT_SELECT,
  created_by_user: USER_NAME_SELECT,
  updated_by_user: USER_NAME_SELECT,
  released_by_user: USER_NAME_SELECT,
};

const toDto = (row) => ({
  iglId: row.igl_id,
  invId: row.inv_id,
  stmId: row.stm_id,
  statement: row.statement?.stm_number ?? null,
  code: row.igl_code,
  value: moneyText(row.igl_value),
  description: row.igl_description,
  open: row.igl_release_date === null,
  releaseStmId: row.igl_release_stm_id,
  releaseStatement: row.release_statement?.stm_number ?? null,
  releaseDate: dateOnlyText(row.igl_release_date),
  releaseObservation: row.igl_release_observation,
  createdAt: row.igl_create_at,
  createdByName: userFullName(row.created_by_user),
  updatedAt: row.igl_update_at,
  updatedByName: userFullName(row.updated_by_user),
  releasedByName: userFullName(row.released_by_user),
});

/** Factura bloqueada (obra, extracto, estado); 404 si no existe o está eliminada. */
const findLockedInvoice = async (tx, invId) => {
  const row = await tx.tbl_invoices.findUnique({
    where: { inv_id: Number(invId) },
    select: { inv_id: true, wrk_id: true, inv_state: true, sta_id: true },
  });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró la factura.");
  return row;
};

const assertNotCancelled = (invoice, action) => {
  if (invoice.inv_state === INVOICE_STATES.CANCELLED) throw httpError(409, `La factura está anulada: no admite ${action}.`);
};

/** Extracto ya bloqueado: de la obra de la factura y no eliminado; 400 si no. */
const findStatement = async (tx, { stmId, wrkId, label }) => {
  const row = await tx.tbl_statements.findUnique({ where: { stm_id: stmId }, select: { wrk_id: true, stm_number: true, stm_date: true, sta_id: true } });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(400, `El extracto ${label} no existe.`);
  if (row.wrk_id !== wrkId) throw httpError(400, `El extracto ${row.stm_number} no es de la obra de la factura.`);
  return row;
};

/**
 * Factura de la glosa (no cambia nunca) y su extracto, leídos antes del
 * bloqueo solo para saber qué bloquear; 404 si no existe o está eliminada.
 */
const glossRef = async (iglId) => {
  const row = await prisma.tbl_invoice_glosses.findUnique({ where: { igl_id: Number(iglId) }, select: { inv_id: true, stm_id: true, sta_id: true } });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, NOT_FOUND);
  return row;
};

/** Glosa abierta, con su factura ya bloqueada; 404 si no existe o se eliminó, 409 si ya se liberó. */
const findLockedOpen = async (tx, iglId) => {
  const row = await tx.tbl_invoice_glosses.findUnique({ where: { igl_id: Number(iglId) } });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, NOT_FOUND);
  if (row.igl_release_date !== null) throw httpError(409, "La glosa ya se liberó: solo se consulta.");
  return row;
};

const locksFor = (invId, ...stmIds) => {
  const statements = stmIds.filter((id) => id > 0);
  return { FACTURA: Number(invId), ...(statements.length > 0 ? { EXTRACTO: statements } : {}) };
};

/** Glosas de una factura: las abiertas primero, la más reciente primero. */
export const listGlosses = async ({ invId, scope }) => {
  await assertInvoiceVisible({ scope }, invId);
  const rows = await prisma.tbl_invoice_glosses.findMany({
    where: { inv_id: Number(invId), sta_id: { not: DELETED_STATUS } },
    select: GLOSS_SELECT,
    orderBy: [{ igl_release_date: { sort: "asc", nulls: "first" } }, { igl_id: "desc" }],
  });
  return rows.map(toDto);
};

const IDEMPOTENCY_TARGET = {
  model: prisma.tbl_invoice_glosses,
  keyField: "igl_idempotency_key",
  hashField: "igl_idempotency_hash",
  ownerField: "igl_create_by",
  select: { igl_id: true },
  toResult: (row) => ({ message: "Glosa registrada correctamente", iglId: row.igl_id }),
};

/** Levanta una glosa sobre una factura no anulada, en un extracto de su obra (opcional). */
export const createGloss = async ({ invId, input, useBy, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  await assertInvoiceVisible({ scope }, invId);
  const values = valuesOf(input);

  return runIdempotent({
    target: IDEMPOTENCY_TARGET,
    key: idempotencyKey,
    ownerId: useBy,
    payload: { invId: Number(invId), ...auditable(values) },
    execute: (idempotencyData) =>
      withLockedTransaction(locksFor(invId, values.stm_id), async (tx) => {
        const invoice = await findLockedInvoice(tx, invId);
        assertNotCancelled(invoice, "glosas nuevas");
        if (values.stm_id) await findStatement(tx, { stmId: values.stm_id, wrkId: invoice.wrk_id, label: "de la glosa" });

        const created = await tx.tbl_invoice_glosses.create({
          data: {
            inv_id: invoice.inv_id,
            wrk_id: invoice.wrk_id,
            ...values,
            sta_id: ACTIVE_STATUS,
            igl_create_by: Number(useBy),
            igl_update_by: Number(useBy),
            ...idempotencyData,
          },
          select: { igl_id: true },
        });
        await writeAudit(tx, {
          entity: AUDIT_ENTITIES.INVOICE_GLOSS,
          recordId: created.igl_id,
          operation: AUDIT_OPERATIONS.CREATE,
          ctx,
          changes: [{ field: "inv_id", oldValue: null, newValue: invoice.inv_id }, ...diffFields({}, auditable(values), AUDITED)],
        });
        return { message: "Glosa registrada correctamente", iglId: created.igl_id };
      }),
  });
};

/** Edita una glosa abierta (extracto, código, valor y descripción). */
export const updateGloss = async ({ iglId, input, useBy, scope, ctx = { useId: useBy } }) => {
  const { inv_id: invId } = await glossRef(iglId);
  await assertInvoiceVisible({ scope }, invId);
  const values = valuesOf(input);

  return withLockedTransaction(locksFor(invId, values.stm_id), async (tx) => {
    const invoice = await findLockedInvoice(tx, invId);
    assertNotCancelled(invoice, "cambios en sus glosas");
    const before = await findLockedOpen(tx, iglId);
    const changes = diffFields(auditable(before), auditable(values), AUDITED);
    if (changes.length === 0) return { message: "No hubo cambios en la glosa", iglId: before.igl_id };
    if (values.stm_id && values.stm_id !== before.stm_id) await findStatement(tx, { stmId: values.stm_id, wrkId: invoice.wrk_id, label: "de la glosa" });

    await tx.tbl_invoice_glosses.update({ where: { igl_id: before.igl_id }, data: { ...values, igl_update_by: Number(useBy) } });
    await writeAudit(tx, { entity: AUDIT_ENTITIES.INVOICE_GLOSS, recordId: before.igl_id, operation: AUDIT_OPERATIONS.UPDATE, ctx, changes });
    return { message: "Glosa actualizada correctamente", iglId: before.igl_id };
  });
};

/**
 * Libera una glosa abierta en un extracto posterior de la misma obra: otro
 * extracto, con fecha igual o posterior a la del extracto en que se levantó.
 * Con observación; la fecha de liberación es la de hoy (servidor).
 */
export const releaseGloss = async ({ iglId, input, useBy, scope, ctx = { useId: useBy } }) => {
  const { inv_id: invId, stm_id: raisedStmId } = await glossRef(iglId);
  await assertInvoiceVisible({ scope }, invId);
  const releaseStmId = Number(input?.releaseStmId);
  if (!(releaseStmId > 0)) throw httpError(400, "Selecciona el extracto en que se libera la glosa.");
  const observation = requiredText(input?.observation, "observación de la liberación");

  // Los dos extractos, bloqueados: la fecha del de origen decide.
  return withLockedTransaction(locksFor(invId, raisedStmId, releaseStmId), async (tx) => {
    const invoice = await findLockedInvoice(tx, invId);
    const before = await findLockedOpen(tx, iglId);
    if (before.stm_id !== raisedStmId) throw httpError(409, "La glosa cambió mientras se liberaba. Vuelve a intentarlo.");
    const release = await findStatement(tx, { stmId: releaseStmId, wrkId: invoice.wrk_id, label: "de la liberación" });
    if (before.stm_id) {
      if (before.stm_id === releaseStmId) throw httpError(400, "La glosa se libera en un extracto posterior, no en el que se levantó.");
      const raised = await tx.tbl_statements.findUnique({ where: { stm_id: before.stm_id }, select: { stm_number: true, stm_date: true } });
      if (raised && release.stm_date.getTime() < raised.stm_date.getTime()) {
        throw httpError(400, `El extracto ${release.stm_number} es anterior al ${raised.stm_number}, en que se levantó la glosa.`);
      }
    }
    const values = { igl_release_stm_id: releaseStmId, igl_release_date: todayDateOnly(), igl_release_observation: observation };
    await tx.tbl_invoice_glosses.update({
      where: { igl_id: before.igl_id },
      data: { ...values, igl_release_by: Number(useBy), igl_update_by: Number(useBy) },
    });
    await writeAudit(tx, {
      entity: AUDIT_ENTITIES.INVOICE_GLOSS,
      recordId: before.igl_id,
      operation: AUDIT_OPERATIONS.UPDATE,
      ctx,
      changes: diffFields(auditable(before), auditable(values), AUDITED),
    });
    return { message: "Glosa liberada correctamente", iglId: before.igl_id };
  });
};

/** Elimina (lógico) una glosa abierta. */
export const deleteGloss = async ({ iglId, useBy, scope, ctx = { useId: useBy } }) => {
  const { inv_id: invId } = await glossRef(iglId);
  await assertInvoiceVisible({ scope }, invId);

  return withLockedTransaction(locksFor(invId), async (tx) => {
    await findLockedInvoice(tx, invId);
    const before = await findLockedOpen(tx, iglId);
    await tx.tbl_invoice_glosses.update({
      where: { igl_id: before.igl_id },
      data: { sta_id: DELETED_STATUS, igl_delete_by: Number(useBy), igl_delete_at: new Date(), igl_update_by: Number(useBy) },
    });
    await writeAudit(tx, {
      entity: AUDIT_ENTITIES.INVOICE_GLOSS,
      recordId: before.igl_id,
      operation: AUDIT_OPERATIONS.DELETE,
      ctx,
      changes: [{ field: "sta_id", oldValue: before.sta_id, newValue: DELETED_STATUS }],
    });
    return { message: "Glosa eliminada correctamente", iglId: before.igl_id };
  });
};

// ─── Reporte del extracto (DEC-084) ──────────────────────────────────────────

const STATEMENT_GLOSS_SELECT = {
  ...GLOSS_SELECT,
  tbl_invoices: { select: { inv_number: true, pvt_id: true, tbl_providers: { select: { prv_name: true } } } },
};

const withInvoice = (row) => ({
  ...toDto(row),
  invoiceNumber: row.tbl_invoices?.inv_number ?? null,
  pvtId: row.tbl_invoices?.pvt_id ?? null,
  providerName: row.tbl_invoices?.tbl_providers?.prv_name ?? null,
});

/**
 * Glosas de un extracto: las que se levantaron en él y las que se liberaron
 * en él, de facturas no eliminadas. El alcance lo verifica quien llama.
 */
export const statementGlosses = async (stmId) => {
  const base = { sta_id: { not: DELETED_STATUS }, tbl_invoices: { sta_id: { not: DELETED_STATUS } } };
  const [raised, released] = await Promise.all([
    prisma.tbl_invoice_glosses.findMany({ where: { ...base, stm_id: Number(stmId) }, select: STATEMENT_GLOSS_SELECT, orderBy: { igl_id: "asc" } }),
    prisma.tbl_invoice_glosses.findMany({ where: { ...base, igl_release_stm_id: Number(stmId) }, select: STATEMENT_GLOSS_SELECT, orderBy: { igl_id: "asc" } }),
  ]);
  return { raised: raised.map(withInvoice), released: released.map(withInvoice) };
};
