import { runEndDateReconciliation } from "../../modules/work/contracts/contractEndDateReconciliation.service.js";

/**
 * Conciliación diaria de la fecha fin de los contratos (PRO-BE-13). Solo
 * reporta. Por defecto a las 08:00 UTC (03:00 en Colombia); se cambia con
 * CRON_END_DATE_RECONCILIATION (expresión de node-cron).
 */
export const contractEndDateReconciliationJob = {
  name: "contract-end-date-reconciliation",
  schedule: process.env.CRON_END_DATE_RECONCILIATION || "0 8 * * *",
  handler: () => runEndDateReconciliation(),
};
