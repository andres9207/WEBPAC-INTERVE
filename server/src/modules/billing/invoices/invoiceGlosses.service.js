import { prisma } from "../../../common/configs/prismaClient.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { MAX_ROWS } from "../../../common/utils/pagination.utils.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { dateOnlyText, todayDateOnly } from "../../../common/utils/term.utils.js";
import { decimal, moneyText, toMoney } from "../../../common/utils/money.utils.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, writeAudit } from "../../../common/services/audit.service.js";
import { INVOICE_STATES, TYPE_NAMES } from "./invoiceTerms.js";
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
 *   proveedor devuelve.
 * - Se levanta en un extracto (texto opcional; el cliente propone el de la
 *   factura) y dice si suma a su total (`igl_affects_total`): lo pagado
 *   difiere de lo registrado, o es un pendiente que llegará en otra factura.
 * - Se libera con la factura que la corrige (migración 0127): del mismo
 *   proveedor y obra, no anulada y con extracto escrito, que es el de la
 *   liberación. Esa factura ya cuenta en su extracto: la liberación no mueve
 *   el total. Con una observación; la fecha es la del servidor. Su extracto
 *   no puede ser el de origen, sin distinguir mayúsculas ni tildes, como
 *   agrupa la BD.
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

const AUDITED = [
  "igl_statement",
  "igl_field",
  "igl_code",
  "igl_value",
  "igl_affects_total",
  "igl_description",
  "igl_release_inv_id",
  "igl_release_date",
  "igl_release_observation",
  "sta_id",
];
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
    // Sin indicarlo, suma: la glosa de una diferencia de pago (DEC-085).
    igl_affects_total: input?.affectsTotal !== false,
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
  igl_affects_total: true,
  igl_description: true,
  igl_release_inv_id: true,
  release_invoice: { select: { inv_number: true, inv_type: true, inv_statement: true } },
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
  affectsTotal: row.igl_affects_total,
  description: row.igl_description,
  open: row.igl_release_date === null,
  // Liberada: la factura que la corrige y su extracto, que es el de la liberación.
  releaseInvId: row.igl_release_inv_id,
  releaseInvoiceNumber: row.release_invoice?.inv_number ?? null,
  releaseInvoiceTypeName: row.release_invoice ? TYPE_NAMES[row.release_invoice.inv_type] : null,
  releaseStatement: row.release_invoice?.inv_statement ?? null,
  releaseDate: dateOnlyText(row.igl_release_date),
  releaseObservation: row.igl_release_observation,
  createdAt: row.igl_create_at,
  createdByName: userFullName(row.created_by_user),
  updatedAt: row.igl_update_at,
  updatedByName: userFullName(row.updated_by_user),
  releasedByName: userFullName(row.released_by_user),
});

/** Factura bloqueada (obra, proveedor, estado, extracto); 404 si no existe o está eliminada. */
const findLockedInvoice = async (tx, invId, notFound = "No se encontró la factura.") => {
  const row = await tx.tbl_invoices.findUnique({
    where: { inv_id: Number(invId) },
    select: { inv_id: true, wrk_id: true, prv_id: true, inv_type: true, inv_state: true, inv_statement: true, sta_id: true },
  });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, notFound);
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
 * 400 si la factura que libera no admite liberar la glosa de `invoice`: debe
 * ser otra (lo valida releaseGloss), de la misma obra y proveedor, y no
 * anulada (409). Su extracto no importa (2026-10-28, pedido del usuario).
 */
const assertReleaser = (invoice, releaser) => {
  if (releaser.wrk_id !== invoice.wrk_id || releaser.prv_id !== invoice.prv_id) {
    throw httpError(400, "La factura que libera la glosa debe ser del mismo proveedor y de la misma obra.");
  }
  if (releaser.inv_state === INVOICE_STATES.CANCELLED) throw httpError(409, "La factura que libera la glosa está anulada.");
};

/**
 * Libera una glosa abierta con la factura que la corrige (migración 0127),
 * de cualquier extracto. El extracto de esa factura, si lo tiene, es el de la
 * liberación, y como la factura ya cuenta en él, la glosa no mueve su total. Con observación; la fecha de liberación es la de
 * hoy (servidor). Bloquea las dos facturas, en orden de id.
 */
export const releaseGloss = async ({ iglId, input, useBy, scope, ctx = { useId: useBy } }) => {
  const { inv_id: invId } = await glossRef(iglId);
  await assertInvoiceVisible({ scope }, invId);
  const releaseInvId = Number(input?.releaseInvId);
  if (!(releaseInvId > 0)) throw httpError(400, "Elige la factura con la que se libera la glosa.");
  if (releaseInvId === invId) throw httpError(400, "La glosa se libera con otra factura, no con la suya.");
  const observation = requiredText(input?.observation, "observación de la liberación");

  return withLockedTransaction({ FACTURA: [invId, releaseInvId] }, async (tx) => {
    const invoice = await findLockedInvoice(tx, invId);
    const releaser = await findLockedInvoice(tx, releaseInvId, "No se encontró la factura que libera la glosa.");
    const before = await findLockedOpen(tx, iglId);
    assertReleaser(invoice, releaser);
    const values = { igl_release_inv_id: releaser.inv_id, igl_release_date: todayDateOnly(), igl_release_observation: observation };
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

/**
 * Facturas con que se puede liberar una glosa abierta (DEC-018: sin paginar,
 * con tope fijo): del mismo proveedor y obra, de cualquiera de sus contratos
 * y de cualquier extracto (o sin él), otras que la suya y no anuladas. Busca
 * por número y extracto. La más reciente primero. La validación definitiva
 * la hace releaseGloss bajo bloqueo.
 */
export const selectReleaseInvoices = async ({ iglId, search, scope }) => {
  const { inv_id: invId } = await glossRef(iglId);
  await assertInvoiceVisible({ scope }, invId);
  const invoice = await prisma.tbl_invoices.findUnique({ where: { inv_id: invId }, select: { wrk_id: true, prv_id: true } });
  const value = text(search);
  const rows = await prisma.tbl_invoices.findMany({
    where: {
      wrk_id: invoice.wrk_id,
      prv_id: invoice.prv_id,
      inv_id: { not: invId },
      sta_id: { not: DELETED_STATUS },
      inv_state: { not: INVOICE_STATES.CANCELLED },
      ...(value ? { OR: [{ inv_number: { contains: value } }, { inv_statement: { contains: value } }] } : {}),
    },
    select: { inv_id: true, inv_number: true, inv_type: true, inv_statement: true, inv_date: true, tbl_contracts: { select: { ctr_number: true } } },
    orderBy: [{ inv_date: "desc" }, { inv_id: "desc" }],
    take: MAX_ROWS,
  });
  return rows.map((row) => {
    const contractNumber = row.tbl_contracts?.ctr_number ?? null;
    return {
      value: row.inv_id,
      label: [row.inv_number, TYPE_NAMES[row.inv_type], contractNumber && `contrato ${contractNumber}`].filter(Boolean).join(" · "),
      description: row.inv_statement ? `Extracto ${row.inv_statement}` : "Sin extracto",
      number: row.inv_number,
      typeName: TYPE_NAMES[row.inv_type],
      contractNumber,
      statement: row.inv_statement,
      date: dateOnlyText(row.inv_date),
    };
  });
};

// ─── Reporte del extracto (DEC-084) ──────────────────────────────────────────

const STATEMENT_GLOSS_SELECT = {
  ...GLOSS_SELECT,
  tbl_invoices: { select: { inv_number: true, pvt_id: true, tbl_providers: { select: { prv_name: true } } } },
};

const withInvoice = (row) => ({
  ...toDto(row),
  // Día en que se levantó, en el calendario del servidor (como la fecha de liberación).
  raisedDate: row.igl_create_at ? dateOnlyText(todayDateOnly(row.igl_create_at)) : null,
  invoiceNumber: row.tbl_invoices?.inv_number ?? null,
  pvtId: row.tbl_invoices?.pvt_id ?? null,
  providerName: row.tbl_invoices?.tbl_providers?.prv_name ?? null,
});

const LIVE = { sta_id: { not: DELETED_STATUS }, tbl_invoices: { sta_id: { not: DELETED_STATUS } } };

/**
 * Glosas de un extracto escrito (obra y texto): las que se levantaron en él
 * y las que liberó una factura suya (el extracto de la factura que libera),
 * de facturas no eliminadas. La BD compara el texto con la intercalación de
 * la columna, como agrupa las facturas. El alcance lo verifica quien llama.
 */
export const statementGlosses = async ({ wrkId, number }) => {
  const work = { ...LIVE, wrk_id: Number(wrkId) };
  const [raised, released] = await Promise.all([
    prisma.tbl_invoice_glosses.findMany({ where: { ...work, igl_statement: number }, select: STATEMENT_GLOSS_SELECT, orderBy: { igl_id: "asc" } }),
    prisma.tbl_invoice_glosses.findMany({
      where: { ...work, release_invoice: { is: { inv_statement: number } } },
      select: STATEMENT_GLOSS_SELECT,
      orderBy: { igl_id: "asc" },
    }),
  ]);
  return { raised: raised.map(withInvoice), released: released.map(withInvoice) };
};

/**
 * Glosas de varios extractos a la vez (una página del listado de
 * extractos), con su obra, el valor, si suma al total y los dos textos (el
 * de liberación, de su factura). Quien llama las reparte por obra y texto.
 */
export const statementsGlosses = async ({ wrkIds, numbers }) =>
  wrkIds.length === 0
    ? []
    : (
        await prisma.tbl_invoice_glosses.findMany({
          where: {
            ...LIVE,
            wrk_id: { in: wrkIds },
            OR: [{ igl_statement: { in: numbers } }, { release_invoice: { is: { inv_statement: { in: numbers } } } }],
          },
          select: { wrk_id: true, igl_value: true, igl_affects_total: true, igl_statement: true, release_invoice: { select: { inv_statement: true } } },
        })
      ).map((row) => ({
        wrkId: row.wrk_id,
        value: moneyText(row.igl_value),
        affectsTotal: row.igl_affects_total,
        statement: row.igl_statement,
        releaseStatement: row.release_invoice?.inv_statement ?? null,
      }));

/**
 * Extractos con glosas levantadas en ellos, de facturas no eliminadas, en las
 * obras dadas: `{ wrkId, statement }` por obra y texto, para el filtro "Con
 * glosas" del listado de extractos. Quien llama compara el texto como agrupa.
 */
export const statementsWithGlosses = async (wrkIds) =>
  wrkIds.length === 0
    ? []
    : (
        await prisma.tbl_invoice_glosses.groupBy({
          by: ["wrk_id", "igl_statement"],
          where: { ...LIVE, wrk_id: { in: wrkIds }, igl_statement: { not: null } },
        })
      ).map((row) => ({ wrkId: row.wrk_id, statement: row.igl_statement }));
