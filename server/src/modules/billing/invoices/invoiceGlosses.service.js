import { prisma } from "../../../common/configs/prismaClient.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { dateOnlyText, todayDateOnly } from "../../../common/utils/term.utils.js";
import { decimal, moneyText, toMoney } from "../../../common/utils/money.utils.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, writeAudit } from "../../../common/services/audit.service.js";
import { INVOICE_STATES } from "./invoiceTerms.js";
import { GLOSS_FIELD_NAMES, glossFieldFor, glossPair } from "./glossFields.js";
import { assertInvoiceVisible, getInvoice } from "./invoices.service.js";

/**
 * Glosas de facturas (DEC-085; documento de alcance, punto 6): errores
 * hallados al registrar una factura recibida, que se controlan hasta su
 * liberación en un extracto posterior. Como la glosa de WebPAC (tblglosas).
 *
 * - De la obra de su factura (FK compuesta). Campo de la factura glosado
 *   (obligatorio: uno del Detalle de su tipo u "Otro", glossFields.js),
 *   código opcional, valor distinto de cero (con signo, como en WebPAC) y
 *   descripción. Una glosa negativa es una nota crédito: lo que el
 *   proveedor devuelve; resta del total pagado del extracto.
 * - Se levanta en un extracto (opcional; el cliente propone el de la
 *   factura) y se libera en otro, con una observación; la fecha de
 *   liberación es la del servidor. El extracto es texto, como el de la
 *   factura (DEC-084, migración 0125): el de liberación no puede ser el de
 *   origen, sin distinguir mayúsculas ni tildes, como agrupa la BD.
 * - No bloquea la aprobación de la factura. Abierta, se edita y se elimina
 *   (lógico); liberada, solo se consulta. Una factura anulada no admite
 *   glosas nuevas ni cambios; las abiertas se pueden liberar o eliminar.
 * - Bloqueo: la factura (ADR-0027). Ver exige ver
 *   facturas; operar, además, gestionar glosas (las rutas). Todo, dentro del
 *   alcance por obra (404 fuera).
 */

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });
const text = (value) => String(value ?? "").trim();
const optionalText = (value) => text(value) || null;
const TEXT_MAX = 1000;
const NOT_FOUND = "No se encontró la glosa.";

const STATEMENT_MAX = 20;

const AUDITED = ["igl_statement", "igl_field", "igl_code", "igl_value", "igl_description", "igl_release_statement", "igl_release_date", "igl_release_observation", "sta_id"];
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

/** Texto del extracto, como el de la factura: hasta 20 caracteres. */
const statementText = (value, label) => {
  const result = optionalText(value);
  if (result && result.length > STATEMENT_MAX) throw httpError(400, `El extracto ${label} admite hasta ${STATEMENT_MAX} caracteres.`);
  return result;
};

/** Mismo extracto para la BD: sin distinguir mayúsculas ni tildes (intercalación de la columna). */
const sameStatement = (a, b) => {
  const key = (value) => String(value).normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
  return key(a) === key(b);
};

const requiredField = (value) => {
  const field = text(value);
  if (!field) throw httpError(400, "Elige el campo de la factura sobre el que se hace la glosa.");
  return field;
};

/** 400 si el tipo de la factura no tiene ese campo (glossFields.js). */
const assertFieldFor = (invoice, field) => {
  if (!glossFieldFor(invoice.inv_type, field)) throw httpError(400, "La factura no tiene ese campo: elige uno de su Detalle u Otro.");
};

const valuesOf = (input) => {
  const value = toMoney(input?.value);
  if (value === null || value.isZero()) throw httpError(400, "El valor de la glosa es requerido y no puede ser cero.");
  return {
    igl_statement: statementText(input?.statement, "de la glosa"),
    igl_field: requiredField(input?.field),
    igl_code: optionalText(input?.code),
    igl_value: value,
    igl_description: requiredText(input?.description, "descripción"),
  };
};

const GLOSS_SELECT = {
  igl_id: true,
  inv_id: true,
  igl_statement: true,
  igl_field: true,
  igl_code: true,
  igl_value: true,
  igl_description: true,
  igl_release_statement: true,
  igl_release_date: true,
  igl_release_observation: true,
  igl_create_at: true,
  igl_update_at: true,
  created_by_user: USER_NAME_SELECT,
  updated_by_user: USER_NAME_SELECT,
  released_by_user: USER_NAME_SELECT,
};

const toDto = (row) => ({
  iglId: row.igl_id,
  invId: row.inv_id,
  statement: row.igl_statement,
  field: row.igl_field,
  fieldName: GLOSS_FIELD_NAMES[row.igl_field] ?? row.igl_field,
  code: row.igl_code,
  value: moneyText(row.igl_value),
  // Negativa: lo que el proveedor devuelve.
  creditNote: decimal(row.igl_value).lt(0),
  description: row.igl_description,
  open: row.igl_release_date === null,
  releaseStatement: row.igl_release_statement,
  releaseDate: dateOnlyText(row.igl_release_date),
  releaseObservation: row.igl_release_observation,
  createdAt: row.igl_create_at,
  createdByName: userFullName(row.created_by_user),
  updatedAt: row.igl_update_at,
  updatedByName: userFullName(row.updated_by_user),
  releasedByName: userFullName(row.released_by_user),
});

/** Factura bloqueada (obra, estado); 404 si no existe o está eliminada. */
const findLockedInvoice = async (tx, invId) => {
  const row = await tx.tbl_invoices.findUnique({
    where: { inv_id: Number(invId) },
    select: { inv_id: true, wrk_id: true, inv_type: true, inv_state: true, sta_id: true },
  });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró la factura.");
  return row;
};

const assertNotCancelled = (invoice, action) => {
  if (invoice.inv_state === INVOICE_STATES.CANCELLED) throw httpError(409, `La factura está anulada: no admite ${action}.`);
};

/**
 * Factura de la glosa (no cambia nunca), leída antes del bloqueo solo para
 * saber qué bloquear; 404 si no existe o está eliminada.
 */
const glossRef = async (iglId) => {
  const row = await prisma.tbl_invoice_glosses.findUnique({ where: { igl_id: Number(iglId) }, select: { inv_id: true, sta_id: true } });
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

const locksFor = (invId) => ({ FACTURA: Number(invId) });

/**
 * Vista previa de una glosa (DEC-092): el importe del campo en la factura y
 * la glosa en valor y en % de ese importe, escrita en cualquiera de los dos
 * (`value` o `pct`). Solo lectura; se guarda el valor.
 */
export const previewGloss = async ({ invId, field, value, pct, scope }) => {
  const invoice = await getInvoice({ invId, scope });
  const option = invoice.glossFields.find((f) => f.value === text(field));
  if (!option) throw httpError(400, "La factura no tiene ese campo: elige uno de su Detalle u Otro.");
  return { amount: option.amount ?? null, ...glossPair({ amount: option.amount, value, pct }) };
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

/** Levanta una glosa sobre una factura no anulada, en un extracto (opcional). */
export const createGloss = async ({ invId, input, useBy, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  await assertInvoiceVisible({ scope }, invId);
  const values = valuesOf(input);

  return runIdempotent({
    target: IDEMPOTENCY_TARGET,
    key: idempotencyKey,
    ownerId: useBy,
    payload: { invId: Number(invId), ...auditable(values) },
    execute: (idempotencyData) =>
      withLockedTransaction(locksFor(invId), async (tx) => {
        const invoice = await findLockedInvoice(tx, invId);
        assertNotCancelled(invoice, "glosas nuevas");
        assertFieldFor(invoice, values.igl_field);

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

  return withLockedTransaction(locksFor(invId), async (tx) => {
    const invoice = await findLockedInvoice(tx, invId);
    assertNotCancelled(invoice, "cambios en sus glosas");
    const before = await findLockedOpen(tx, iglId);
    const changes = diffFields(auditable(before), auditable(values), AUDITED);
    if (changes.length === 0) return { message: "No hubo cambios en la glosa", iglId: before.igl_id };
    assertFieldFor(invoice, values.igl_field);

    await tx.tbl_invoice_glosses.update({ where: { igl_id: before.igl_id }, data: { ...values, igl_update_by: Number(useBy) } });
    await writeAudit(tx, { entity: AUDIT_ENTITIES.INVOICE_GLOSS, recordId: before.igl_id, operation: AUDIT_OPERATIONS.UPDATE, ctx, changes });
    return { message: "Glosa actualizada correctamente", iglId: before.igl_id };
  });
};

/**
 * Libera una glosa abierta en un extracto posterior: otro texto que el del
 * extracto en que se levantó. Con observación; la fecha de liberación es la
 * de hoy (servidor). En el reporte de ese extracto, la glosa resta del total
 * pagado.
 */
export const releaseGloss = async ({ iglId, input, useBy, scope, ctx = { useId: useBy } }) => {
  const { inv_id: invId } = await glossRef(iglId);
  await assertInvoiceVisible({ scope }, invId);
  const releaseStatement = statementText(input?.releaseStatement, "de la liberación");
  if (!releaseStatement) throw httpError(400, "Escribe el extracto en que se libera la glosa.");
  const observation = requiredText(input?.observation, "observación de la liberación");

  return withLockedTransaction(locksFor(invId), async (tx) => {
    await findLockedInvoice(tx, invId);
    const before = await findLockedOpen(tx, iglId);
    if (before.igl_statement && sameStatement(before.igl_statement, releaseStatement)) {
      throw httpError(400, "La glosa se libera en un extracto posterior, no en el que se levantó.");
    }
    const values = { igl_release_statement: releaseStatement, igl_release_date: todayDateOnly(), igl_release_observation: observation };
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

const LIVE = { sta_id: { not: DELETED_STATUS }, tbl_invoices: { sta_id: { not: DELETED_STATUS } } };

/**
 * Glosas de un extracto escrito (obra y texto): las que se levantaron en él
 * y las que se liberaron en él, de facturas no eliminadas. La BD compara el
 * texto con la intercalación de la columna, como agrupa las facturas. El
 * alcance lo verifica quien llama.
 */
export const statementGlosses = async ({ wrkId, number }) => {
  const work = { ...LIVE, wrk_id: Number(wrkId) };
  const [raised, released] = await Promise.all([
    prisma.tbl_invoice_glosses.findMany({ where: { ...work, igl_statement: number }, select: STATEMENT_GLOSS_SELECT, orderBy: { igl_id: "asc" } }),
    prisma.tbl_invoice_glosses.findMany({ where: { ...work, igl_release_statement: number }, select: STATEMENT_GLOSS_SELECT, orderBy: { igl_id: "asc" } }),
  ]);
  return { raised: raised.map(withInvoice), released: released.map(withInvoice) };
};

/**
 * Glosas de varios extractos a la vez (una página del listado de
 * extractos), con su obra, el valor y los dos textos. Quien llama las
 * reparte por obra y texto.
 */
export const statementsGlosses = async ({ wrkIds, numbers }) =>
  wrkIds.length === 0
    ? []
    : (
        await prisma.tbl_invoice_glosses.findMany({
          where: {
            ...LIVE,
            wrk_id: { in: wrkIds },
            OR: [{ igl_statement: { in: numbers } }, { igl_release_statement: { in: numbers } }],
          },
          select: { wrk_id: true, igl_value: true, igl_statement: true, igl_release_statement: true },
        })
      ).map((row) => ({ wrkId: row.wrk_id, value: moneyText(row.igl_value), statement: row.igl_statement, releaseStatement: row.igl_release_statement }));
