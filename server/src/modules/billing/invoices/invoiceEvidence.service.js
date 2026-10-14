import { prisma } from "../../../common/configs/prismaClient.js";
import { DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { AUDIT_ENTITIES } from "../../../common/services/audit.service.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { STATE_NAMES, TYPE_NAMES } from "./invoiceTerms.js";
import { SNAPSHOT_BALANCES, SNAPSHOT_PREFIX, assertInvoiceVisible } from "./invoices.service.js";

/**
 * Evidencia de una factura (PRO-BE-39; ADR-0013, ADR-0027): reconstruye desde
 * la bitácora qué se hizo con ella y con qué cifras se aprobó. Solo lectura;
 * la bitácora es evidencia y ningún cálculo la usa como fuente.
 *
 * - `operations`: cada operación de la bitácora sobre la factura (registrar,
 *   editar, aprobar, anular), en orden, con autor, fecha y todas sus filas,
 *   también las de otras entidades si la misma operación las tocó.
 * - `approval`: la última aprobación, con la instantánea de composición y
 *   saldos (antes → después). Una factura aprobada antes de PRO-BE-39 no
 *   tiene instantánea: `snapshot` es null y quedan sus cambios de saldo en
 *   `operations`.
 *
 * Mismo alcance que el detalle: obra (DEC-047) y vista (DEC-054), 404 fuera.
 */

const NOT_FOUND = "No se encontró la factura.";
// Una factura tiene pocas operaciones; el tope evita una respuesta sin límite.
const MAX_AUDIT_ROWS = 2000;

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

const AUDIT_SELECT = {
  aud_id: true,
  aud_operation_id: true,
  aud_entity: true,
  aud_record_id: true,
  aud_field: true,
  aud_old_value: true,
  aud_new_value: true,
  aud_operation: true,
  aud_create_at: true,
  tbl_users: USER_NAME_SELECT,
};

/** Filas de la bitácora agrupadas por operación, en el orden en que ocurrieron. */
const groupOperations = (rows) => {
  const byId = new Map();
  for (const row of rows) {
    if (!byId.has(row.aud_operation_id)) {
      byId.set(row.aud_operation_id, {
        operationId: row.aud_operation_id,
        operation: row.aud_operation,
        at: row.aud_create_at,
        userName: userFullName(row.tbl_users),
        changes: [],
      });
    }
    if (row.aud_field !== null) {
      byId.get(row.aud_operation_id).changes.push({
        entity: row.aud_entity,
        recordId: row.aud_record_id,
        field: row.aud_field,
        oldValue: row.aud_old_value,
        newValue: row.aud_new_value,
      });
    }
  }
  return [...byId.values()];
};

const isApproval = (op) => op.changes.some((c) => c.entity === AUDIT_ENTITIES.INVOICE && c.field === "inv_state" && c.newValue === "APPROVED");

/** Instantánea de una aprobación: importes y saldos { antes, después }; null si no la tiene. */
const snapshotOf = (op) => {
  const rows = new Map(op.changes.filter((c) => c.field.startsWith(SNAPSHOT_PREFIX)).map((c) => [c.field.slice(SNAPSHOT_PREFIX.length), c]));
  if (rows.size === 0) return null;
  const amounts = Object.fromEntries(
    [...rows].filter(([key]) => key.startsWith("invoice.")).map(([key, c]) => [key.slice("invoice.".length), c.newValue])
  );
  const balances = Object.fromEntries(
    Object.entries(SNAPSHOT_BALANCES).map(([group, keys]) => [
      group,
      Object.fromEntries(
        keys.filter((key) => rows.has(`${group}.${key}`)).map((key) => {
          const c = rows.get(`${group}.${key}`);
          return [key, { before: c.oldValue, after: c.newValue }];
        })
      ),
    ])
  );
  return { amounts, balances };
};

export const getInvoiceEvidence = async ({ invId, scope, views }) => {
  await assertInvoiceVisible({ scope, views }, invId);
  const invoice = await prisma.tbl_invoices.findFirst({
    where: { inv_id: Number(invId), sta_id: { not: DELETED_STATUS } },
    select: { inv_id: true, inv_type: true, inv_number: true, inv_state: true, ctr_id: true, tbl_contracts: { select: { ctr_number: true } } },
  });
  if (!invoice) throw httpError(404, NOT_FOUND);

  // Las operaciones de la factura y, de esas operaciones, todas sus filas.
  const own = await prisma.tbl_audit_log.findMany({
    where: { aud_entity: AUDIT_ENTITIES.INVOICE, aud_record_id: invoice.inv_id },
    select: { aud_operation_id: true },
    distinct: ["aud_operation_id"],
  });
  const rows =
    own.length === 0
      ? []
      : await prisma.tbl_audit_log.findMany({
          where: { aud_operation_id: { in: own.map((r) => r.aud_operation_id) } },
          select: AUDIT_SELECT,
          orderBy: [{ aud_create_at: "asc" }, { aud_id: "asc" }],
          take: MAX_AUDIT_ROWS,
        });
  const operations = groupOperations(rows);
  const approval = operations.filter(isApproval).at(-1) ?? null;

  return {
    invId: invoice.inv_id,
    type: invoice.inv_type,
    typeName: TYPE_NAMES[invoice.inv_type] ?? invoice.inv_type,
    number: invoice.inv_number,
    state: invoice.inv_state,
    stateName: STATE_NAMES[invoice.inv_state] ?? invoice.inv_state,
    ctrId: invoice.ctr_id,
    contractNumber: invoice.tbl_contracts?.ctr_number ?? null,
    approval: approval && {
      operationId: approval.operationId,
      at: approval.at,
      userName: approval.userName,
      snapshot: snapshotOf(approval),
    },
    operations,
  };
};
