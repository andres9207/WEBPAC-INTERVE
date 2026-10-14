import { runBalanceReconciliation } from "../../modules/billing/invoices/balanceReconciliation.service.js";

/**
 * Conciliación diaria de los saldos de anticipo y retenido, I1 a I4
 * (DEC-061). Solo reporta. Por defecto a las 08:30 UTC (03:30 en Colombia),
 * después de la de fechas fin; se cambia con CRON_BALANCE_RECONCILIATION
 * (expresión de node-cron).
 */
export const contractBalanceReconciliationJob = {
  name: "contract-balance-reconciliation",
  schedule: process.env.CRON_BALANCE_RECONCILIATION || "30 8 * * *",
  handler: () => runBalanceReconciliation(),
};
