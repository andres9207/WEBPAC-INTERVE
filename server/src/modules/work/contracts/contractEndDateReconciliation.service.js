import { prisma } from "../../../common/configs/prismaClient.js";
import logger from "../../../common/configs/winston.config.js";
import { DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { withTransaction } from "../../../common/services/transaction.service.js";
import { findUsersWithPermission } from "../../../common/services/effectivePermissions.service.js";
import { sendEmail } from "../../../common/services/mailerService.js";
import { insertNotification } from "../../app/notifications/notifications.service.js";
import { dateOnlyText, toDateOnly } from "../../../common/utils/term.utils.js";
import { contractEndDate, totalExtensions } from "./contractTerms.js";

/**
 * Conciliación de la fecha fin (PRO-BE-13, ADR-0015). La fecha fin se
 * persiste, pero es un valor derivado: este proceso la vuelve a calcular con
 * la función única (`contractEndDate`) y reporta cada contrato donde la
 * guardada no coincide. **Nunca escribe en el contrato**: corregir en
 * silencio ocultaría el defecto que produjo la diferencia.
 *
 * Lo corre el cron (FND-BE-36, `src/cron/jobs/`), o a mano con
 * `yarn cron:run contract-end-date-reconciliation`.
 */

const BATCH_SIZE = 200;
// La notificación lleva las primeras; el correo y el log, todas.
const NOTIFICATION_LINES = 20;
const DAY_MS = 86400000;

/** Días de la guardada menos la calculada (negativo: la guardada se quedó corta). null si falta una. */
const daysBetween = (persisted, derived) => {
  const a = toDateOnly(persisted);
  const b = toDateOnly(derived);
  return a && b ? Math.round((a.getTime() - b.getTime()) / DAY_MS) : null;
};

/**
 * Contratos no eliminados cuya fecha fin guardada no coincide con la
 * derivada. Lee por lotes; cada lote en una transacción de solo lectura, para
 * que contrato y otrosí salgan de la misma instantánea (REPEATABLE READ) y
 * un otrosí que se registra en ese momento no aparezca como discrepancia.
 */
export const findEndDateDiscrepancies = async ({ batchSize = BATCH_SIZE } = {}) => {
  const discrepancies = [];
  let checked = 0;
  let cursor = 0;

  for (;;) {
    const rows = await withTransaction((tx) =>
      tx.tbl_contracts.findMany({
        where: { sta_id: { not: DELETED_STATUS }, ctr_id: { gt: cursor } },
        orderBy: { ctr_id: "asc" },
        take: batchSize,
        select: {
          ctr_id: true,
          ctr_number: true,
          ctr_start_date: true,
          ctr_term: true,
          ctr_term_unit: true,
          ctr_suspended_days: true,
          ctr_end_date: true,
          tbl_works: { select: { wrk_code: true } },
          tbl_contract_concepts: { select: { ccp_type: true, ccp_extension: true, sta_id: true } },
        },
      })
    );
    if (rows.length === 0) break;

    for (const row of rows) {
      const persisted = dateOnlyText(row.ctr_end_date);
      const derived = contractEndDate({
        startDate: row.ctr_start_date,
        term: row.ctr_term,
        unit: row.ctr_term_unit,
        extensions: totalExtensions(row.tbl_contract_concepts),
        suspendedDays: row.ctr_suspended_days,
      });
      if (persisted !== derived) {
        discrepancies.push({
          ctrId: row.ctr_id,
          number: row.ctr_number,
          workCode: row.tbl_works?.wrk_code ?? null,
          persisted,
          derived,
          differenceDays: daysBetween(persisted, derived),
        });
      }
    }
    checked += rows.length;
    cursor = rows[rows.length - 1].ctr_id;
    if (rows.length < batchSize) break;
  }

  return { checked, discrepancies };
};

const discrepancyLine = (d) => {
  const difference = d.differenceDays === null ? "sin diferencia calculable" : `diferencia ${d.differenceDays > 0 ? "+" : ""}${d.differenceDays} día(s)`;
  return `Contrato ${d.number}${d.workCode ? ` (obra ${d.workCode})` : ""}, id ${d.ctrId}: guardada ${d.persisted ?? "vacía"}, calculada ${d.derived ?? "no calculable"}, ${difference}`;
};

/** Destinatarios del correo: RECONCILIATION_REPORT_EMAILS, separados por coma. */
const reportEmails = () =>
  String(process.env.RECONCILIATION_REPORT_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

/**
 * Corre la conciliación y entrega el informe: siempre al log; si hay
 * discrepancias, además una notificación a cada usuario activo con el permiso
 * de recibirla y un correo a RECONCILIATION_REPORT_EMAILS, si está definida.
 * Sin discrepancias no avisa a nadie: solo queda en el log.
 */
export const runEndDateReconciliation = async ({ batchSize } = {}) => {
  const { checked, discrepancies } = await findEndDateDiscrepancies({ batchSize });
  const lines = discrepancies.map(discrepancyLine);

  if (discrepancies.length === 0) {
    logger.info(`[conciliación fecha fin] ${checked} contrato(s) revisado(s), sin discrepancias.`);
    return { checked, discrepancies, notified: 0, emailed: false };
  }

  logger.warn(`[conciliación fecha fin] ${checked} contrato(s) revisado(s), ${discrepancies.length} discrepancia(s):\n${lines.join("\n")}`);

  const title = `Conciliación de fechas fin: ${discrepancies.length} discrepancia(s)`;
  const shown = lines.slice(0, NOTIFICATION_LINES);
  const rest = lines.length - shown.length;
  const message = [
    `De ${checked} contrato(s) revisado(s), ${discrepancies.length} tienen una fecha fin guardada distinta de la calculada. No se corrigió nada.`,
    ...shown,
    ...(rest > 0 ? [`… y ${rest} más (ver el correo o el log del servidor).`] : []),
  ].join("\n");

  const recipients = await findUsersWithPermission(PERMISSIONS.work.contracts.receiveReconciliation);
  let notified = 0;
  for (const user of recipients) {
    const created = await insertNotification({
      userId: user.use_id,
      priority: "high",
      type: "warning",
      title,
      message,
      module: "contracts",
      action: "end_date_reconciliation",
      data: { checked, total: discrepancies.length, discrepancies: discrepancies.slice(0, NOTIFICATION_LINES) },
    });
    if (created) notified += 1;
  }
  if (recipients.length === 0) {
    logger.warn("[conciliación fecha fin] Ningún usuario activo tiene el permiso de recibir la conciliación: nadie fue notificado.");
  }

  const emails = reportEmails();
  let emailed = false;
  if (emails.length > 0) {
    const result = await sendEmail({
      to: emails.join(","),
      subject: title,
      text: [
        `De ${checked} contrato(s) revisado(s), ${discrepancies.length} tienen una fecha fin guardada distinta de la calculada.`,
        "El proceso solo reporta: no corrigió ninguna fecha. Hay que revisar qué operación dejó cada diferencia.",
        "",
        ...lines,
      ].join("\n"),
    });
    emailed = Boolean(result?.success);
    if (!emailed) logger.error(`[conciliación fecha fin] No se pudo enviar el correo: ${result?.error ?? "error desconocido"}`);
  }

  return { checked, discrepancies, notified, emailed };
};
