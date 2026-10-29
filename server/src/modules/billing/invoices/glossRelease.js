import { DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { dateOnlyText, todayDateOnly } from "../../../common/utils/term.utils.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, writeAudit } from "../../../common/services/audit.service.js";
import { INVOICE_STATES } from "./invoiceTerms.js";

/**
 * Liberar una glosa con la factura que la corrige (DEC-085, migración 0127):
 * lo común a liberarla desde la pestaña Glosas de su factura y al registrar
 * la factura que la libera. Sin bloqueos propios: quien llama ya bloqueó la
 * factura de la glosa y la que la libera (FACTURA, ADR-0027).
 */

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

const RELEASE_AUDITED = ["igl_release_inv_id", "igl_release_date", "igl_release_observation"];
const auditable = (values) => Object.fromEntries(Object.entries(values).map(([column, value]) => [column, value instanceof Date ? dateOnlyText(value) : value]));

/** Glosa abierta, con su factura ya bloqueada; 404 si no existe o se eliminó, 409 si ya se liberó. */
export const findLockedOpenGloss = async (tx, iglId) => {
  const row = await tx.tbl_invoice_glosses.findUnique({
    where: { igl_id: Number(iglId) },
    include: { tbl_invoice_gloss_fields: { select: { igf_id: true, igf_field: true, igf_value: true } } },
  });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró la glosa.");
  if (row.igl_release_date !== null) throw httpError(409, "La glosa ya se liberó: solo se consulta.");
  return row;
};

/**
 * 400 si la factura que libera no admite liberar la glosa de `invoice`: debe
 * ser de la misma obra y proveedor, y no anulada (409). Su extracto no
 * importa (2026-10-28, pedido del usuario).
 */
export const assertReleaser = (invoice, releaser) => {
  if (releaser.wrk_id !== invoice.wrk_id || releaser.prv_id !== invoice.prv_id) {
    throw httpError(400, "La factura que libera la glosa debe ser del mismo proveedor y de la misma obra.");
  }
  if (releaser.inv_state === INVOICE_STATES.CANCELLED) throw httpError(409, "La factura que libera la glosa está anulada.");
};

/** Marca la glosa abierta `gloss` como liberada por `releaser`, con la fecha del servidor, y la registra en la bitácora. */
export const writeGlossRelease = async (tx, { gloss, releaser, observation, useBy, ctx }) => {
  const values = { igl_release_inv_id: releaser.inv_id, igl_release_date: todayDateOnly(), igl_release_observation: observation };
  await tx.tbl_invoice_glosses.update({
    where: { igl_id: gloss.igl_id },
    data: { ...values, igl_release_by: Number(useBy), igl_update_by: Number(useBy) },
  });
  await writeAudit(tx, {
    entity: AUDIT_ENTITIES.INVOICE_GLOSS,
    recordId: gloss.igl_id,
    operation: AUDIT_OPERATIONS.UPDATE,
    ctx,
    changes: diffFields(auditable(gloss), auditable(values), RELEASE_AUDITED),
  });
};
