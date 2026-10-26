import { decimal, moneyText, percentOf } from "../../../common/utils/money.utils.js";

/**
 * Condiciones de liquidación del contrato (ADR-0017, DEC-081), sin base de
 * datos. Un contrato en liquidación pasa a liquidado cuando se cumplen todas
 * las que bloquean, a la vez; la evaluación la hace contractLiquidation.service
 * con los hechos que lee bajo el bloqueo del contrato. Un solo lugar para el
 * criterio: la transición automática y la pestaña Liquidación del expediente
 * usan esta misma función, así que lo que se muestra es lo que se exige.
 *
 *   C1  existe el otrosí de liquidación
 *   C2  anticipo facturado aprobado − amortizado = 0          (ADR-0024)
 *   C3  retenido acumulado − devuelto = 0                      (ADR-0025)
 *   C4  al menos una factura de liquidación aprobada           (ADR-0021)
 *   C5  ninguna factura del contrato registrada sin aprobar    (ADR-0020)
 *   C6  ninguna suspensión abierta
 *   C7  informes de interventoría: el sistema no los registra; se informa
 *       cuántas suspensiones los exigían y no bloquea
 *   C8  todo concepto vigente con al menos una póliza vigente  (ADR-0018)
 *   C9  B − F ≤ 0,01 % de B: B, valor inicial + otrosíes antes de IVA (la
 *       base vigente); F, lo facturado aprobado (VALOR de normales y
 *       liquidaciones, I5)
 *   C10 las pólizas vigentes cubren el plazo del contrato (policyCoversTerm):
 *       se informa y no bloquea (pedido del usuario, 2026-10-26)
 */

/** Diferencia admitida entre lo contratado y lo facturado, en % de la base vigente (DEC-081). */
export const LIQUIDATION_TOLERANCE_PCT = "0.01";

export const LIQUIDATION_CONDITIONS = Object.freeze({
  C1: "Otrosí de liquidación registrado",
  C2: "Anticipo amortizado por completo",
  C3: "Retenido devuelto por completo",
  C4: "Factura de liquidación aprobada",
  C5: "Sin facturas por aprobar",
  C6: "Sin suspensión abierta",
  C7: "Informes de interventoría",
  C8: "Todos los conceptos con póliza vigente",
  C9: "Valor contratado igual al facturado",
  C10: "Pólizas que cubren el plazo del contrato",
});

const ZERO = decimal(0);
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const condition = (key, met, detail, blocking = true) => ({ key, label: LIQUIDATION_CONDITIONS[key], met, blocking, detail });

/**
 * Las diez condiciones a partir de los hechos del contrato:
 * - `hasLiquidationConcept`: si tiene otrosí de liquidación.
 * - `balances`: los de contractBalances (advance, retention, billing).
 * - `approvedLiquidations`, `pendingInvoices`: cantidades de facturas.
 * - `openSuspension`: si hay una suspensión abierta.
 * - `reportSuspensions`: suspensiones que exigían informe de interventoría.
 * - `uncoveredConcepts`: rótulos de los conceptos sin póliza vigente.
 * - `shortPolicies`: números de las pólizas vigentes que terminan antes que el contrato.
 * Devuelve `[{ key, label, met, blocking, detail }]`; `detail` dice lo que falta.
 */
export const liquidationConditions = (facts) => {
  const { advance, retention, billing } = facts.balances;
  const toAmortize = decimal(advance.toAmortize);
  const retained = decimal(retention.balance);
  const base = decimal(billing.base);
  const billed = decimal(billing.billed);
  const difference = base.minus(billed);
  const tolerance = percentOf(base, LIQUIDATION_TOLERANCE_PCT);

  return [
    condition("C1", facts.hasLiquidationConcept, facts.hasLiquidationConcept ? null : "El contrato no tiene otrosí de liquidación."),
    condition("C2", toAmortize.eq(ZERO), toAmortize.eq(ZERO) ? null : `Anticipo por amortizar: ${moneyText(toAmortize)}.`),
    condition("C3", retained.eq(ZERO), retained.eq(ZERO) ? null : `Retenido por devolver: ${moneyText(retained)}.`),
    condition("C4", facts.approvedLiquidations > 0, facts.approvedLiquidations > 0 ? null : "No hay ninguna factura de liquidación aprobada."),
    condition(
      "C5",
      facts.pendingInvoices === 0,
      facts.pendingInvoices === 0 ? null : `${plural(facts.pendingInvoices, "factura registrada", "facturas registradas")} sin aprobar.`
    ),
    condition("C6", !facts.openSuspension, facts.openSuspension ? "El contrato tiene una suspensión abierta." : null),
    // No bloquea (DEC-081): no hay registro de informes con qué verificarla.
    condition(
      "C7",
      facts.reportSuspensions === 0,
      facts.reportSuspensions === 0
        ? null
        : `${plural(facts.reportSuspensions, "suspensión exigía", "suspensiones exigían")} informe de interventoría. El sistema no registra los informes: verifícalos antes de cerrar el expediente.`,
      false
    ),
    condition(
      "C8",
      facts.uncoveredConcepts.length === 0,
      facts.uncoveredConcepts.length === 0 ? null : `Sin póliza vigente: ${facts.uncoveredConcepts.join(", ")}.`
    ),
    condition(
      "C9",
      difference.abs().lte(tolerance),
      difference.abs().lte(tolerance)
        ? null
        : `Contratado antes de IVA: ${moneyText(base)}; facturado: ${moneyText(billed)}. Diferencia: ${moneyText(difference)}; se admite hasta ${moneyText(tolerance)} (${LIQUIDATION_TOLERANCE_PCT} %).`
    ),
    // No bloquea: la vigencia corta se informa (pedido del usuario, 2026-10-26).
    condition(
      "C10",
      facts.shortPolicies.length === 0,
      facts.shortPolicies.length === 0 ? null : `Terminan antes que el contrato: ${facts.shortPolicies.map((n) => `póliza ${n}`).join(", ")}.`,
      false
    ),
  ];
};

/** Las condiciones que bloquean y no se cumplen. Sin ninguna, el contrato se liquida. */
export const unmetConditions = (conditions) => conditions.filter((c) => c.blocking && !c.met);
