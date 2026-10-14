import { DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { withTransaction } from "../../../common/services/transaction.service.js";
import { RECONCILIATION_NOTIFICATION_LINES, deliverReconciliationReport } from "../../../common/services/reconciliationReport.service.js";
import { moneyText } from "../../../common/utils/money.utils.js";
import { contractBalances } from "./invoices.service.js";

/**
 * Conciliación de saldos de anticipo y retenido (DEC-061; FND-BE-36; ADR-0024
 * B9, ADR-0025 B8). I1 a I4 se verifican en cada escritura bajo el bloqueo
 * del contrato; este proceso las vuelve a comprobar sobre todo lo aprobado,
 * por si un defecto, una migración o un cambio directo en la BD dejó un
 * contrato fuera de ellas. Usa `contractBalances`, el mismo cálculo de las
 * validaciones y del panel. **Nunca escribe**: corregir ocultaría el defecto.
 *
 * Lo corre el cron (`src/cron/jobs/`), o a mano con
 * `yarn cron:run contract-balance-reconciliation`.
 */

const BATCH_SIZE = 200;

/**
 * Invariantes que se concilian: cada una compara un valor con su límite. El
 * límite solo puede quedar por debajo del valor por un defecto: el saldo
 * pactado no baja con los actos que hoy existen (DOM-07; la anulación de
 * otrosí no está implementada).
 */
const CHECKS = [
  { invariant: "I1", label: "anticipo facturado supera el pactado", value: (b) => b.advance.invoiced, limit: (b) => b.advance.agreed },
  { invariant: "I2", label: "anticipo amortizado supera el facturado", value: (b) => b.advance.amortized, limit: (b) => b.advance.invoiced },
  { invariant: "I3", label: "retenido devuelto supera el retenido", value: (b) => b.retention.refunded, limit: (b) => b.retention.retained },
  { invariant: "I4", label: "retenido acumulado supera el pactado", value: (b) => b.retention.retained, limit: (b) => b.retention.agreed },
];

/** Incumplimientos de I1 a I4 en los saldos de un contrato. */
export const balanceViolations = (balances) =>
  CHECKS.filter((check) => check.value(balances).gt(check.limit(balances))).map((check) => ({
    invariant: check.invariant,
    label: check.label,
    value: moneyText(check.value(balances)),
    limit: moneyText(check.limit(balances)),
    excess: moneyText(check.value(balances).minus(check.limit(balances))),
  }));

/**
 * Contratos no eliminados con facturas, y sus incumplimientos. Lee por lotes;
 * cada lote en una transacción de solo lectura (REPEATABLE READ): los saldos
 * de los contratos del lote salen de la misma instantánea, y una aprobación
 * que se confirma en ese momento no deja un saldo a medias.
 */
export const findBalanceViolations = async ({ batchSize = BATCH_SIZE } = {}) => {
  const violations = [];
  let checked = 0;
  let cursor = 0;

  for (;;) {
    const found = await withTransaction(async (tx) => {
      const rows = await tx.tbl_contracts.findMany({
        where: { sta_id: { not: DELETED_STATUS }, ctr_id: { gt: cursor }, tbl_invoices: { some: {} } },
        orderBy: { ctr_id: "asc" },
        take: batchSize,
        select: { ctr_id: true, ctr_number: true, tbl_works: { select: { wrk_code: true } } },
      });
      const results = [];
      for (const row of rows) results.push({ row, violations: balanceViolations(await contractBalances(tx, row.ctr_id)) });
      return results;
    });
    if (found.length === 0) break;

    for (const { row, violations: list } of found) {
      for (const v of list) violations.push({ ctrId: row.ctr_id, number: row.ctr_number, workCode: row.tbl_works?.wrk_code ?? null, ...v });
    }
    checked += found.length;
    cursor = found[found.length - 1].row.ctr_id;
    if (found.length < batchSize) break;
  }

  return { checked, violations };
};

const violationLine = (v) =>
  `Contrato ${v.number}${v.workCode ? ` (obra ${v.workCode})` : ""}, id ${v.ctrId}: ${v.invariant}, ${v.label}: ${v.value} frente a ${v.limit} (exceso ${v.excess})`;

/**
 * Corre la conciliación y entrega el informe (`deliverReconciliationReport`):
 * siempre al log; si hay incumplimientos, además una notificación a cada
 * usuario activo con el permiso 108 y un correo a RECONCILIATION_REPORT_EMAILS,
 * si está definida.
 */
export const runBalanceReconciliation = async ({ batchSize } = {}) => {
  const { checked, violations } = await findBalanceViolations({ batchSize });
  const contracts = new Set(violations.map((v) => v.ctrId)).size;
  const { notified, emailed } = await deliverReconciliationReport({
    tag: "conciliación saldos",
    checked,
    lines: violations.map(violationLine),
    noun: "incumplimientos",
    title: `Conciliación de saldos de facturación: ${violations.length} incumplimiento(s)`,
    summary: `De ${checked} contrato(s) con facturas revisado(s), ${contracts} incumplen alguna invariante de saldos (I1 a I4). No se corrigió nada.`,
    emailNote: "El proceso solo reporta: no modificó ninguna factura. Hay que revisar qué operación dejó cada saldo fuera de su límite.",
    permission: PERMISSIONS.billing.invoices.receiveBalanceReconciliation,
    module: "invoices",
    action: "balance_reconciliation",
    data: { checked, total: violations.length, violations: violations.slice(0, RECONCILIATION_NOTIFICATION_LINES) },
  });
  return { checked, violations, notified, emailed };
};
