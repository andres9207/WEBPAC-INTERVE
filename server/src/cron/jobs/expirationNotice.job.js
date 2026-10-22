import { runExpirationNotice } from "../../modules/work/contracts/expirationNotice.service.js";

/**
 * Aviso de vencimiento de contratos y pólizas (DEC-072). Solo crea
 * notificaciones, una vez por usuario y vencimiento. Por defecto a las 11:00
 * UTC (06:00 en Colombia), y también al arrancar el servidor; se cambia con
 * CRON_EXPIRATION_NOTICE (expresión de node-cron).
 */
export const expirationNoticeJob = {
  name: "expiration-notice",
  schedule: process.env.CRON_EXPIRATION_NOTICE || "0 11 * * *",
  runOnInit: true,
  handler: () => runExpirationNotice(),
};
