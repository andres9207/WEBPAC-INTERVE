import logger from "../configs/winston.config.js";
import { findUsersWithPermission } from "./effectivePermissions.service.js";
import { sendEmail } from "./mailerService.js";
import { insertNotification } from "../../modules/app/notifications/notifications.service.js";

/**
 * Entrega del informe de una conciliación programada (DEC-049, DEC-061). Las
 * conciliaciones solo reportan: nunca corrigen. El informe va siempre al log;
 * si hay hallazgos, además una notificación a cada usuario activo con el
 * permiso de recibirlo (por perfil o individual) y un correo a
 * RECONCILIATION_REPORT_EMAILS, si está definida. Sin hallazgos no avisa a
 * nadie: solo queda en el log.
 */

// La notificación lleva las primeras líneas; el correo y el log, todas.
const NOTIFICATION_LINES = 20;

/** Destinatarios del correo: RECONCILIATION_REPORT_EMAILS, separados por coma. */
const reportEmails = () =>
  String(process.env.RECONCILIATION_REPORT_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

/**
 * - `tag`: prefijo del log, p. ej. "conciliación fecha fin".
 * - `checked`: contratos revisados. `lines`: una línea por hallazgo.
 * - `noun`: cómo se llaman los hallazgos en plural ("discrepancias").
 * - `title`, `summary`: título y primera frase de la notificación y el correo.
 * - `emailNote`: frase del correo sobre qué hacer con los hallazgos.
 * - `permission`: per_id de quien recibe la notificación.
 * - `module`, `action`, `data`: datos de la notificación (`data` lleva solo
 *   los primeros hallazgos).
 */
export const deliverReconciliationReport = async ({ tag, checked, lines, noun, title, summary, emailNote, permission, module, action, data }) => {
  if (lines.length === 0) {
    logger.info(`[${tag}] ${checked} contrato(s) revisado(s), sin ${noun}.`);
    return { notified: 0, emailed: false };
  }

  logger.warn(`[${tag}] ${checked} contrato(s) revisado(s), ${lines.length} ${noun.replace(/s$/, "")}(s):\n${lines.join("\n")}`);

  const shown = lines.slice(0, NOTIFICATION_LINES);
  const rest = lines.length - shown.length;
  const message = [summary, ...shown, ...(rest > 0 ? [`… y ${rest} más (ver el correo o el log del servidor).`] : [])].join("\n");

  const recipients = await findUsersWithPermission(permission);
  let notified = 0;
  for (const user of recipients) {
    const created = await insertNotification({ userId: user.use_id, priority: "high", type: "warning", title, message, module, action, data });
    if (created) notified += 1;
  }
  if (recipients.length === 0) {
    logger.warn(`[${tag}] Ningún usuario activo tiene el permiso de recibir la conciliación: nadie fue notificado.`);
  }

  const emails = reportEmails();
  let emailed = false;
  if (emails.length > 0) {
    const result = await sendEmail({ to: emails.join(","), subject: title, text: [summary, emailNote, "", ...lines].join("\n") });
    emailed = Boolean(result?.success);
    if (!emailed) logger.error(`[${tag}] No se pudo enviar el correo: ${result?.error ?? "error desconocido"}`);
  }

  return { notified, emailed };
};

export const RECONCILIATION_NOTIFICATION_LINES = NOTIFICATION_LINES;
