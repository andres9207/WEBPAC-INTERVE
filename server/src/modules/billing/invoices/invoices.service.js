import { prisma } from "../../../common/configs/prismaClient.js";
import { paginate, MAX_ROWS, containsFilter, idFilter, dateRangeFilter, filtersWhere } from "../../../common/utils/pagination.utils.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { dateOnlyText, toDateOnly, todayDateOnly } from "../../../common/utils/term.utils.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { assertInScope, scopeWhere } from "../../../common/services/workScope.service.js";
import { findExportRows, renderExport } from "../../../common/services/export.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, newOperationId, writeAudit } from "../../../common/services/audit.service.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { decimal, moneyText, percentFor, percentOf, percentText, ratioText, sumMoney, toMoney, toPercent } from "../../../common/utils/money.utils.js";
import { reasonsService, REASON_SCOPES } from "../../admin/reasons/reasons.service.js";
import { CONCEPT_SELECT, assertContractInScope, findLockedContract, getContractFormOptions } from "../../work/contracts/contracts.service.js";
import { evaluateLiquidation, notifyLiquidated } from "../../work/contracts/contractLiquidation.service.js";
import { providerSelectOptions } from "../../work/providers/providers.service.js";
import {
  CONCEPT_TYPES,
  INVOICE_ACTIONS,
  contractTotals,
  STATE_ALLOWS as CONTRACT_STATE_ALLOWS,
  STATE_NAMES as CONTRACT_STATE_NAMES,
  assertStateAllows as assertContractAllows,
  stateAllows as contractAllows,
} from "../../work/contracts/contractTerms.js";
import {
  INVOICE_STATES,
  INVOICE_TYPES,
  NOTE_COLUMNS,
  STATE_ALLOWS,
  STATE_NAMES,
  TYPE_NAMES,
  assertTransition,
  cancelTransitionFor,
  hasContract,
  historyRow,
  stateAllows,
} from "./invoiceTerms.js";
import {
  advanceBalances,
  appliedPct,
  assertAdvanceCancellable,
  assertAdvanceFits,
  assertAmortizationFits,
  balancesDto,
  defaultAmortization,
} from "./advanceTerms.js";
import {
  assertLiquidationCancellable,
  assertRefundFits,
  assertRetentionFits,
  defaultRetention,
  retentionBalances,
  retentionDto,
} from "./retentionTerms.js";
import { INVOICE_MODES, SIMPLE_TYPE_WHERE, getInvoiceMenu, isContractMode, isSimpleMode } from "./invoiceMenus.js";
import { CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, invoiceAdvanceWhere, matchesContractAdvance } from "./advanceFilters.js";
import { BILLING_TYPES, assertBillingFits, billingBalances, billingDto, isBillingType } from "./billingTerms.js";
import {
  SIMPLE_FIELDS,
  SIMPLE_MONEY_COLUMNS,
  SIMPLE_PERCENT_COLUMNS,
  composeSimpleInvoice,
  convertSimpleAmounts,
  hasSimpleAmounts,
  simpleAmountsDto,
  simpleDetailOf,
  simplePairsDto,
} from "./simpleInvoiceTerms.js";
import {
  CONTRACT_TAX_FIELDS,
  CONTRACT_TAX_MONEY_COLUMNS,
  CONTRACT_TAX_PERCENT_COLUMNS,
  assertContractTotal,
  composeContractInvoice,
  contractDraftOf,
  contractPairsDto,
  contractTaxDetailOf,
  contractTaxesDto,
  convertContractAmounts,
  hasContractTaxes,
} from "./contractInvoiceTerms.js";

/**
 * Facturas, fase A (ADR-0020, DEC-042): encabezado común, ciclo de vida y
 * efectos del estado del contrato. Sin importes: los detalles por tipo
 * llegan con sus decisiones de negocio (backlog DEC-01, DEC-02, DEC-03).
 *
 * - La simple se imputa a una etapa de una obra, sin contrato, y su
 *   proveedor está asignado a esa obra (DEC-058; ADR-0023, decisión 3).
 * - Menús dinámicos (invoiceMenus.js, DEC-074): la factura guarda el tipo de
 *   proveedor de su menú (`pvt_id`), el de su contrato o el tipo simple de
 *   la asignación. Ver facturas es un solo permiso, que verifica la ruta.
 * - Bloqueo (LOCK_ORDER): simple, obra → proveedor (→ factura); de
 *   contrato, contrato (→ factura). Tipo, obra y contrato no cambian después de
 *   crear: leerlos antes del bloqueo solo dice qué bloquear (ADR-0027,
 *   regla 3; mismo criterio que updateConcept).
 * - Obra y proveedor de una factura de contrato salen del contrato bloqueado,
 *   nunca del cliente. Lo garantiza también la FK compuesta.
 * - El estado solo cambia por las transiciones de invoiceTerms.js, con
 *   historial y bitácora en la misma transacción. Estado y fecha de
 *   aprobación nunca vienen del formulario.
 * - Un error se corrige anulando. Eliminar es aparte y con permiso propio
 *   (DEC-068): lógica, solo registradas y aprobadas; la eliminada sale de
 *   listados, saldos y del número único, y da 404 en todo lo demás.
 * - Anticipo, liquidación y devolución de retenido llevan su detalle con
 *   importes: el valor del anticipo (DEC-044); el VALOR, la amortización y
 *   el retenido de la liquidación (DEC-044, DEC-051), y el valor devuelto
 *   (DEC-051). La liquidación guarda además su otrosí de liquidación, que
 *   resuelve el servidor, nunca el cliente (DEC-059). Los saldos de anticipo (ADR-0024) y de retenido (ADR-0025)
 *   se calculan bajo el bloqueo del contrato al registrar, editar, aprobar y
 *   anular, nunca se reciben ni se guardan. IVA y retenciones tributarias de
 *   las de contrato siguen pendientes (backlog DEC-03, DEC-07).
 * - La simple lleva su detalle con lo capturado y las tasas congeladas
 *   (DEC-065); subtotal, IVA, retenciones y totales los compone
 *   `composeSimpleInvoice` y nunca se guardan. Las registradas antes de
 *   DEC-065 no tienen detalle y pueden aprobarse así.
 */

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });
const can = PERMISSIONS.billing.invoices;

const text = (value) => String(value ?? "").trim();
const optionalText = (value) => text(value) || null;
const positiveId = (value) => (Number(value) > 0 ? Number(value) : null);

// Bitácora funcional (ADR-0020, "Auditoría"). Extracto (texto, DEC-084) y
// descripción son de nivel técnico, pero se registran igual: con el
// comprobante, son lo único editable tras aprobar (DEC-080).
const INVOICE_AUDITED = [
  "inv_type",
  "pvt_id",
  "prv_id",
  "wrk_id",
  "wks_id",
  "ctr_id",
  "inv_number",
  "inv_date",
  "inv_voucher_number",
  "inv_statement",
  "inv_description",
];

const auditable = (row) =>
  Object.fromEntries(
    Object.entries(row).map(([column, value]) => [column, column === "inv_date" || column === "inv_approval_date" ? dateOnlyText(value) : value])
  );

/** Fecha "AAAA-MM-DD" válida y no futura, como Date de una columna DATE; 400 si no. */
const pastDate = (value, label) => {
  const date = toDateOnly(value);
  if (!date) throw httpError(400, `La ${label} no es una fecha válida.`);
  if (date.getTime() > todayDateOnly().getTime()) throw httpError(400, `La ${label} no puede ser futura.`);
  return date;
};

// ─── Lectura compartida ──────────────────────────────────────────────────────

const LOCKED_SELECT = {
  inv_id: true,
  inv_type: true,
  pvt_id: true,
  prv_id: true,
  wrk_id: true,
  wks_id: true,
  ctr_id: true,
  inv_number: true,
  inv_date: true,
  inv_approval_date: true,
  inv_voucher_number: true,
  inv_statement: true,
  inv_description: true,
  inv_state: true,
  tbl_invoice_advance_details: { select: { iad_value: true } },
  tbl_invoice_liquidation_details: {
    select: {
      ccp_id: true,
      ild_value: true,
      ild_amortization: true,
      ild_default_amortization: true,
      ild_default_pct: true,
      ild_applied_pct: true,
      ild_adjustment_observation: true,
      ild_retention: true,
      ild_default_retention: true,
      ild_retention_default_pct: true,
      ild_retention_applied_pct: true,
      ild_retention_observation: true,
      // IVA, retenciones y descuento de materiales (DEC-075).
      ...Object.fromEntries(Object.values(CONTRACT_TAX_FIELDS).map((column) => [column, true])),
      ild_formula_version: true,
    },
  },
  tbl_invoice_retention_refund_details: { select: { irr_value: true } },
  tbl_invoice_simple_details: {
    select: { ...Object.fromEntries(Object.values(SIMPLE_FIELDS).map((column) => [column, true])), isd_formula_version: true },
  },
};

const NOT_FOUND = "No se encontró la factura.";

/** Alcance por obra de las facturas (DEC-047): todas tienen obra, también la simple (DEC-058). */
export const invoiceScopeWhere = (scope) => scopeWhere(scope);

/**
 * 404 si la factura está fuera del alcance por obra (`access`: `{ scope }`).
 * La obra no cambia nunca: se lee fuera de la transacción. Una factura
 * inexistente da el mismo 404.
 */
export const assertInvoiceVisible = async ({ scope }, invId) => {
  // Sin alcance (llamadas internas, "Ver todo"): nada que restringir; el
  // service da el 404 de la inexistente al leerla.
  if (!scope || scope.all) return;
  const row = await prisma.tbl_invoices.findFirst({
    where: { inv_id: Number(invId), sta_id: { not: DELETED_STATUS }, ...invoiceScopeWhere(scope) },
    select: { inv_id: true },
  });
  if (!row) throw httpError(404, NOT_FOUND);
};

/** Factura bloqueada (la utilidad ya ejecutó el FOR UPDATE). 404 si no existe o está eliminada (DEC-068). */
const findLockedInvoice = async (tx, invId) => {
  const row = await tx.tbl_invoices.findUnique({ where: { inv_id: Number(invId) }, select: { ...LOCKED_SELECT, sta_id: true } });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró la factura.");
  return row;
};

/**
 * Lo que no cambia de una factura, leído antes del bloqueo para saber qué
 * bloquear: tipo, obra y contrato. 404 si no existe.
 */
const findImmutable = async (invId) => {
  const known = await prisma.tbl_invoices.findUnique({
    where: { inv_id: Number(invId) },
    select: { inv_type: true, wrk_id: true, ctr_id: true, prv_id: true, sta_id: true },
  });
  if (!known || known.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró la factura.");
  return known;
};

/**
 * Bloqueos de una factura existente: contrato → factura, u obra → proveedor
 * → factura (la simple; si cambia de proveedor, el anterior y el nuevo).
 */
/**
 * Liquidación automática (DEC-081): aprobar, anular o eliminar una factura de
 * contrato puede completar las condiciones de liquidación. Se evalúa al final
 * del hecho, en su transacción y con el contrato ya bloqueado. La respuesta
 * lo dice (`contractLiquidated`) y el aviso sale después del COMMIT.
 */
const liquidateIfComplete = async (tx, invoice, useBy, ctx) => {
  if (!invoice.ctr_id) return {};
  const result = await evaluateLiquidation(tx, { ctrId: invoice.ctr_id, useBy, ctx, contractBalances });
  return result?.liquidated ? { contractLiquidated: true } : {};
};

const notifyIfLiquidated = async (result, known, useBy) => {
  if (result.contractLiquidated) await notifyLiquidated({ ctrId: known.ctr_id, actorId: useBy });
  return result;
};

const locksOf = (known, invId, prvId = known.prv_id) =>
  known.ctr_id
    ? { CONTRATO: known.ctr_id, FACTURA: Number(invId) }
    : { OBRA: known.wrk_id, PROVEEDOR: [...new Set([known.prv_id, prvId])], FACTURA: Number(invId) };

// ─── Saldos de anticipo y de retenido (ADR-0024, ADR-0025) ──────────────────

/**
 * Saldos de anticipo (DEC-044) y de retenido (DEC-051) del contrato con lo
 * que ve `db`. Dentro de una escritura, `db` es el tx con el contrato ya
 * bloqueado (primera sentencia): las sumas ven las aprobaciones confirmadas
 * por otras transacciones. Solo cuentan las facturas aprobadas y no
 * eliminadas (DEC-068); las registradas no reservan saldo. Una liquidación aprobada sin retenido
 * (registrada antes de DEC-051) suma cero.
 */
// `type`: uno o varios tipos (los de facturación, BILLING_TYPES).
const approvedOf = (ctrId, type) => ({
  tbl_invoices: {
    ctr_id: ctrId,
    inv_type: Array.isArray(type) ? { in: type } : type,
    inv_state: INVOICE_STATES.APPROVED,
    sta_id: { not: DELETED_STATUS },
  },
});

/**
 * Saldos a partir de los conceptos y de las sumas de las facturas aprobadas.
 * La normal y la liquidación (BILLING_TYPES) amortizan, retienen y suman a lo
 * facturado (I5, DEC-071).
 */
const balancesOf = (concepts, { advanceInvoiced, amortized, retained, refunded, billed }) => {
  const totals = contractTotals(concepts);
  return {
    advance: advanceBalances({ base: totals.base, agreed: totals.advance, invoiced: advanceInvoiced, amortized }),
    retention: retentionBalances({ base: totals.base, agreed: totals.retention, retained, refunded }),
    billing: billingBalances({ base: totals.base, billed }),
  };
};

export const contractBalances = async (db, ctrId) => {
  const id = Number(ctrId);
  const approved = (type) => approvedOf(id, type);
  const concepts = await db.tbl_contract_concepts.findMany({ where: { ctr_id: id }, select: CONCEPT_SELECT });
  const advance = await db.tbl_invoice_advance_details.aggregate({ where: approved(INVOICE_TYPES.ADVANCE), _sum: { iad_value: true } });
  const liquidation = await db.tbl_invoice_liquidation_details.aggregate({
    where: approved(BILLING_TYPES),
    _sum: { ild_value: true, ild_amortization: true, ild_retention: true },
  });
  const refund = await db.tbl_invoice_retention_refund_details.aggregate({
    where: approved(INVOICE_TYPES.RETENTION_REFUND),
    _sum: { irr_value: true },
  });
  return balancesOf(concepts, {
    advanceInvoiced: advance._sum.iad_value,
    amortized: liquidation._sum.ild_amortization,
    retained: liquidation._sum.ild_retention,
    refunded: refund._sum.irr_value,
    billed: liquidation._sum.ild_value,
  });
};

/**
 * Saldos de varios contratos, para los reportes (DEC-070): los mismos de
 * `contractBalances`, con las mismas reglas y sin bloqueo (solo lectura), en
 * tres consultas en vez de tres por contrato. Además, `paid`: la suma de los
 * valores de sus facturas aprobadas (anticipo, normal, liquidación y
 * devolución de retenido; DEC-071). `contracts`:
 * `[{ ctr_id, tbl_contract_concepts }]` con CONCEPT_SELECT. Devuelve un Map
 * por ctr_id.
 */
export const contractsBalances = async (contracts) => {
  const ids = { in: contracts.map((c) => c.ctr_id) };
  const owner = { tbl_invoices: { select: { ctr_id: true } } };
  const [advances, liquidations, refunds] = contracts.length
    ? await Promise.all([
        prisma.tbl_invoice_advance_details.findMany({ where: approvedOf(ids, INVOICE_TYPES.ADVANCE), select: { iad_value: true, ...owner } }),
        prisma.tbl_invoice_liquidation_details.findMany({
          where: approvedOf(ids, BILLING_TYPES),
          select: { ild_value: true, ild_amortization: true, ild_retention: true, ...owner },
        }),
        prisma.tbl_invoice_retention_refund_details.findMany({
          where: approvedOf(ids, INVOICE_TYPES.RETENTION_REFUND),
          select: { irr_value: true, ...owner },
        }),
      ])
    : [[], [], []];
  const byContract = (rows) => {
    const map = new Map();
    for (const row of rows) map.set(row.tbl_invoices.ctr_id, [...(map.get(row.tbl_invoices.ctr_id) ?? []), row]);
    return (ctrId) => map.get(ctrId) ?? [];
  };
  const [advanceOf, liquidationOf, refundOf] = [advances, liquidations, refunds].map(byContract);
  return new Map(
    contracts.map(({ ctr_id: ctrId, tbl_contract_concepts: concepts }) => {
      const advance = advanceOf(ctrId);
      const liquidation = liquidationOf(ctrId);
      const refund = refundOf(ctrId);
      const balances = balancesOf(concepts, {
        advanceInvoiced: sumMoney(advance.map((r) => r.iad_value)),
        amortized: sumMoney(liquidation.map((r) => r.ild_amortization)),
        retained: sumMoney(liquidation.map((r) => r.ild_retention)),
        refunded: sumMoney(refund.map((r) => r.irr_value)),
        billed: sumMoney(liquidation.map((r) => r.ild_value)),
      });
      const paid = sumMoney([...advance.map((r) => r.iad_value), ...liquidation.map((r) => r.ild_value), ...refund.map((r) => r.irr_value)]);
      return [ctrId, { ...balances, paid }];
    })
  );
};

/**
 * Contratos del alcance cuyo saldo de anticipo cumple el filtro "Anticipo"
 * del listado de contratos (advanceFilters.js): con los mismos saldos del
 * expediente y de los reportes (`contractsBalances`), sin guardar nada. null
 * si el filtro no es de saldos (sin filtro, o "por aprobar", que se resuelve
 * con una condición sobre las facturas). Lo llama el controller de contratos:
 * su service no importa este módulo, que importa el suyo.
 */
export const contractIdsByAdvance = async ({ advance, scope }) => {
  if (!advance || advance === CONTRACT_ADVANCE_FILTERS.PENDING) return null;
  const contracts = await prisma.tbl_contracts.findMany({
    where: { sta_id: { not: DELETED_STATUS }, ...scopeWhere(scope) },
    select: { ctr_id: true, tbl_contract_concepts: { select: CONCEPT_SELECT } },
  });
  const balances = await contractsBalances(contracts);
  return contracts.filter((c) => matchesContractAdvance(advance, balances.get(c.ctr_id).advance)).map((c) => c.ctr_id);
};

/**
 * Saldos del contrato para el formulario (PRO-BE-28, PRO-BE-31): los de
 * anticipo y, aparte, los de retenido, que es una garantía contractual y no
 * una retención tributaria. Si llega `value`, también la amortización y el
 * retenido por defecto de una liquidación por ese VALOR. Solo lectura: al
 * guardar se recalcula todo. Exige ver el menú del contrato (DEC-066).
 */
/**
 * Previsualización de la factura simple (DEC-065; ADR-0026, decisión 2): el
 * panel Detalle del formulario lo compone el servidor con la misma función
 * que al guardar, mientras el usuario escribe. Sin base de datos ni efectos.
 * Lo vacío cuenta como 0 para mostrar algo desde el primer campo; si lo
 * capturado no se podría guardar, `message` dice por qué (no es un error:
 * el formulario sigue en edición).
 */
export const previewSimpleInvoice = (raw) => {
  // Un importe escrito por su otro lado (valor o %) pasa primero a como se
  // guarda; `captured` lo devuelve así para que el formulario lo guarde.
  const input = convertSimpleAmounts(raw);
  let message = null;
  try {
    simpleDetailOf(input);
  } catch (err) {
    if (!err.statusCode) throw err;
    message = err.message;
  }
  const zeroed = Object.fromEntries(Object.keys(SIMPLE_FIELDS).map((field) => [field, optionalText(input[field]) ?? "0"]));
  const draft = Object.fromEntries(Object.entries(SIMPLE_FIELDS).map(([field, column]) => [column, zeroed[field]]));
  return { ...simpleAmountsDto(draft), pairs: simplePairsDto(draft), valid: message === null, message };
};

/**
 * Previsualización de las facturas normal y de liquidación (DEC-075), con el
 * mismo criterio que la de la simple: el panel Detalle lo compone el
 * servidor con la función de guardar, sin base de datos. La amortización y
 * el retenido llegan del formulario, que ya los pidió con los saldos del
 * contrato (`getContractAdvance`); al guardar se recalculan bajo bloqueo.
 */
export const previewContractInvoice = (raw) => {
  const input = convertContractAmounts(raw);
  const draft = contractDraftOf(input);
  let message = null;
  try {
    contractTaxDetailOf(input);
    assertContractTotal(draft);
  } catch (err) {
    if (!err.statusCode) throw err;
    message = err.message;
  }
  return { ...contractTaxesDto(draft), pairs: contractPairsDto(draft), valid: message === null, message };
};

/**
 * Valor y % sobre el VALOR de la amortización o del retenido que se ajusta
 * (DEC-044, DEC-051; DEC-065, "Valor y porcentaje"): si llega el %, el
 * importe que da; si no, el % del importe. Se guarda el importe, como
 * siempre. Sin VALOR o sin ninguno de los dos, null.
 */
const amountPairOf = (value, amount, pct) => {
  if (!value?.gt(0)) return null;
  const applied = optionalText(pct) !== null ? percentOf(value, toPercent(pct)) : toMoney(amount);
  return applied === null ? null : { amount: moneyText(applied), pct: percentText(percentFor(applied, value)) };
};

/**
 * Anticipo por aprobar del contrato: las facturas de anticipo registradas y
 * no eliminadas, salvo `invId` (la que se edita). No reserva saldo (I1 se
 * revalida al aprobar); solo informa en las tarjetas del formulario.
 */
const pendingAdvanceOf = async (ctrId, invId) => {
  const pending = await prisma.tbl_invoice_advance_details.aggregate({
    where: {
      tbl_invoices: {
        ctr_id: ctrId,
        inv_type: INVOICE_TYPES.ADVANCE,
        inv_state: INVOICE_STATES.REGISTERED,
        sta_id: { not: DELETED_STATUS },
        ...(Number(invId) > 0 ? { inv_id: { not: Number(invId) } } : {}),
      },
    },
    _sum: { iad_value: true },
    _count: { _all: true },
  });
  return { invoiced: decimal(pending._sum.iad_value), count: pending._count?._all ?? 0 };
};

export const getContractAdvance = async ({ ctrId, invId, value, amortization, amortizationPct, retention, retentionPct, scope }) => {
  await assertContractInScope(scope, ctrId);
  const contract = await prisma.tbl_contracts.findFirst({
    where: { ctr_id: Number(ctrId), sta_id: { not: DELETED_STATUS } },
    select: { ctr_id: true },
  });
  if (!contract) throw httpError(404, "No se encontró el contrato.");
  const balances = await contractBalances(prisma, contract.ctr_id);
  const pending = await pendingAdvanceOf(contract.ctr_id, invId);
  const afterPending = balances.advance.toInvoice.minus(pending.invoiced);
  const amount = toMoney(value);
  return {
    ...balancesDto(balances.advance),
    pending: {
      invoiced: moneyText(pending.invoiced),
      count: pending.count,
      toInvoice: moneyText(afterPending.gt(0) ? afterPending : decimal(0)),
    },
    defaultAmortization: amount ? moneyText(defaultAmortization(amount, balances.advance)) : null,
    amortizationPair: amountPairOf(amount, amortization, amortizationPct),
    retention: {
      ...retentionDto(balances.retention),
      defaultRetention: amount ? moneyText(defaultRetention(amount, balances.retention)) : null,
    },
    retentionPair: amountPairOf(amount, retention, retentionPct),
    billing: billingDto(balances.billing),
  };
};

/** Tipos con detalle que mueve saldos del contrato: los de contrato. */
const hasDetail = (type) => type === INVOICE_TYPES.ADVANCE || type === INVOICE_TYPES.RETENTION_REFUND || isBillingType(type);

const isSimpleType = (type) => type === INVOICE_TYPES.SIMPLE;

/** Columna del valor capturado de cada tipo de detalle. */
const VALUE_COLUMN = Object.freeze({
  [INVOICE_TYPES.ADVANCE]: "iad_value",
  [INVOICE_TYPES.LIQUIDATION]: "ild_value",
  // La normal guarda sus importes en el mismo detalle que la liquidación (DEC-071).
  [INVOICE_TYPES.NORMAL]: "ild_value",
  [INVOICE_TYPES.RETENTION_REFUND]: "irr_value",
});

const positiveMoney = (value, label) => {
  const amount = toMoney(value);
  if (!amount || amount.lte(0)) throw httpError(400, `El ${label} es requerido y debe ser mayor que cero.`);
  return amount;
};

/**
 * Importe con valor por defecto que el usuario puede ajustar (amortización y
 * retenido de la normal y la liquidación): sin importe en la petición se usa
 * el de por defecto; uno distinto exige `permission`, si se da, en los
 * permisos efectivos (`granted`). La amortización no lo da: la ajusta quien
 * registra (DEC-044, cambio del 2026-10-23). La observación es opcional
 * (DEC-044, DEC-051): la bitácora y el detalle ya guardan el valor por
 * defecto y el aplicado.
 */
const adjustableAmount = ({ requested, byDefault, observation, granted, permission, forbidden }) => {
  const amount = toMoney(requested) ?? byDefault;
  const adjusted = !amount.eq(byDefault);
  if (adjusted && permission != null && !granted?.has(permission)) throw httpError(403, forbidden);
  return { amount, observation: adjusted ? optionalText(observation) : null };
};

/**
 * Otrosí de liquidación del contrato bloqueado, al que se asocia la factura
 * de liquidación (DEC-059; ADR-0021, decisión confirmada). Un contrato tiene
 * a lo sumo uno (ccp_liquidation_key UNIQUE), y la FK compuesta del detalle
 * garantiza que sea del mismo contrato. 409 si no existe: en liquidación
 * siempre existe, así que solo falla ante datos incoherentes.
 */
const liquidationConceptOf = async (tx, ctrId) => {
  const concept = await tx.tbl_contract_concepts.findFirst({
    where: { ctr_id: Number(ctrId), ccp_type: CONCEPT_TYPES.LIQUIDATION },
    select: { ccp_id: true },
  });
  if (!concept) throw httpError(409, "El contrato no tiene otrosí de liquidación: la factura de liquidación se asocia a él.");
  return concept.ccp_id;
};

/**
 * Importes del detalle según el tipo, validados contra los saldos del
 * contrato bloqueado (al registrar y al editar una registrada).
 *
 * - Anticipo: valor ≤ anticipo por facturar (I1).
 * - Normal y liquidación: VALOR ≤ por facturar del contrato (I5, DEC-071),
 *   amortización ≤ mín(pendiente por amortizar, VALOR) (I2) y
 *   retenido ≤ mín(por retener, VALOR) (I4). La amortización se aparta del
 *   valor por defecto sin permiso propio; el retenido, solo con el suyo. La
 *   liquidación se asocia al otrosí de liquidación del contrato (DEC-059);
 *   la normal, a ninguno.
 * - Devolución de retenido: valor ≤ saldo de retenido (I3).
 */
const resolveDetail = async (tx, { type, ctrId, input, granted }) => {
  // Simple (DEC-065): sin saldos; solo la forma y los rangos de lo capturado.
  if (isSimpleType(type)) return { simple: simpleDetailOf(input) };
  if (!hasDetail(type)) return {};
  const balances = await contractBalances(tx, ctrId);
  if (type === INVOICE_TYPES.ADVANCE) {
    const value = positiveMoney(input.value, "valor del anticipo");
    assertAdvanceFits(value, balances.advance);
    return { advance: { iad_value: value } };
  }
  if (type === INVOICE_TYPES.RETENTION_REFUND) {
    const value = positiveMoney(input.value, "valor de la devolución");
    assertRefundFits(value, balances.retention);
    return { refund: { irr_value: value } };
  }
  const value = positiveMoney(input.value, "valor de la factura");
  const amortizationDefault = defaultAmortization(value, balances.advance);
  const amortization = adjustableAmount({
    requested: input.amortization,
    byDefault: amortizationDefault,
    observation: input.amortizationObservation,
  });
  const retentionDefault = defaultRetention(value, balances.retention);
  const retention = adjustableAmount({
    requested: input.retention,
    byDefault: retentionDefault,
    observation: input.retentionObservation,
    granted,
    permission: can.adjustRetention,
    forbidden: `El retenido por defecto es ${moneyText(retentionDefault)}. Cambiarlo exige el permiso de ajustar el retenido.`,
  });
  assertBillingFits(value, balances.billing);
  assertAmortizationFits(amortization.amount, value, balances.advance);
  assertRetentionFits(retention.amount, value, balances.retention);
  // IVA, retenciones y descuento de materiales (DEC-075): el neto, con la amortización y el retenido ya resueltos.
  const taxes = contractTaxDetailOf(input);
  assertContractTotal({ ...taxes, ild_value: value, ild_amortization: amortization.amount, ild_retention: retention.amount });
  return {
    liquidation: {
      ...taxes,
      ctr_id: Number(ctrId),
      ccp_id: type === INVOICE_TYPES.LIQUIDATION ? await liquidationConceptOf(tx, ctrId) : null,
      ild_value: value,
      ild_amortization: amortization.amount,
      ild_default_amortization: amortizationDefault,
      ild_default_pct: balances.advance.effectivePct,
      ild_applied_pct: appliedPct(amortization.amount, value),
      ild_adjustment_observation: amortization.observation,
      ild_retention: retention.amount,
      ild_default_retention: retentionDefault,
      ild_retention_default_pct: balances.retention.effectivePct,
      ild_retention_applied_pct: appliedPct(retention.amount, value),
      ild_retention_observation: retention.observation,
    },
  };
};

// Bitácora del detalle: importes como texto con dos decimales.
const DETAIL_AUDITED = [
  "iad_value",
  "ccp_id",
  "ild_value",
  "ild_amortization",
  "ild_default_amortization",
  "ild_adjustment_observation",
  "ild_retention",
  "ild_default_retention",
  "ild_retention_observation",
  ...Object.values(CONTRACT_TAX_FIELDS),
  "irr_value",
  ...Object.values(SIMPLE_FIELDS),
];
const MONEY_COLUMNS = new Set([
  "iad_value",
  "ild_value",
  "ild_amortization",
  "ild_default_amortization",
  "ild_retention",
  "ild_default_retention",
  "irr_value",
  ...CONTRACT_TAX_MONEY_COLUMNS,
  ...SIMPLE_MONEY_COLUMNS,
]);
const PERCENT_COLUMNS = new Set([...CONTRACT_TAX_PERCENT_COLUMNS, ...SIMPLE_PERCENT_COLUMNS]);

const detailText = (row) =>
  Object.fromEntries(
    Object.entries(row ?? {}).map(([column, value]) => [
      column,
      MONEY_COLUMNS.has(column) ? moneyText(value) : PERCENT_COLUMNS.has(column) ? percentText(value) : value,
    ])
  );

/** Detalle guardado de una factura (de LOCKED_SELECT) como fila plana. */
const storedDetail = (invoice) => ({
  ...(invoice.tbl_invoice_advance_details ?? {}),
  ...(invoice.tbl_invoice_liquidation_details ?? {}),
  ...(invoice.tbl_invoice_retention_refund_details ?? {}),
  ...(invoice.tbl_invoice_simple_details ?? {}),
});

const detailChanges = (before, detail) =>
  diffFields(
    detailText(storedDetail(before)),
    detailText({ ...detail.advance, ...detail.liquidation, ...detail.refund, ...detail.simple }),
    DETAIL_AUDITED
  );

/**
 * Importes que llegan para una factura que ya no admite cambios (aprobada):
 * solo los que difieren de lo guardado, para responder 409 como con
 * cualquier otro campo. Sin importes en la petición, nada.
 */
const requestedDetailChanges = (before, input) => {
  const requested = {};
  if (isSimpleType(before.inv_type)) {
    if (!hasSimpleAmounts(input)) return [];
    const { isd_formula_version: _version, ...captured } = simpleDetailOf(input);
    return diffFields(detailText(storedDetail(before)), detailText(captured), DETAIL_AUDITED);
  }
  const value = toMoney(input.value);
  if (value) requested[VALUE_COLUMN[before.inv_type]] = value;
  if (isBillingType(before.inv_type)) {
    const amortization = toMoney(input.amortization);
    const retention = toMoney(input.retention);
    if (amortization) requested.ild_amortization = amortization;
    if (retention) requested.ild_retention = retention;
    // IVA y retenciones (DEC-075): solo si llegan; el formulario de una aprobada no los envía.
    if (Object.keys(CONTRACT_TAX_FIELDS).some((field) => optionalText(input[field]) !== null)) {
      const { ild_formula_version: _version, ...taxes } = contractTaxDetailOf(input);
      Object.assign(requested, taxes);
    }
  }
  return diffFields(detailText(storedDetail(before)), detailText(requested), DETAIL_AUDITED);
};

/** Crea o reemplaza el detalle de la factura (1:1, inv_id es la clave). */
const writeDetail = async (tx, { invId, detail, useBy }) => {
  if (detail.advance) {
    await tx.tbl_invoice_advance_details.upsert({
      where: { inv_id: invId },
      create: { inv_id: invId, ...detail.advance, iad_create_by: useBy, iad_update_by: useBy },
      update: { ...detail.advance, iad_update_by: useBy },
    });
  }
  if (detail.liquidation) {
    await tx.tbl_invoice_liquidation_details.upsert({
      where: { inv_id: invId },
      create: { inv_id: invId, ...detail.liquidation, ild_create_by: useBy, ild_update_by: useBy },
      update: { ...detail.liquidation, ild_update_by: useBy },
    });
  }
  if (detail.refund) {
    await tx.tbl_invoice_retention_refund_details.upsert({
      where: { inv_id: invId },
      create: { inv_id: invId, ...detail.refund, irr_create_by: useBy, irr_update_by: useBy },
      update: { ...detail.refund, irr_update_by: useBy },
    });
  }
  if (detail.simple) {
    await tx.tbl_invoice_simple_details.upsert({
      where: { inv_id: invId },
      create: { inv_id: invId, ...detail.simple, isd_create_by: useBy, isd_update_by: useBy },
      update: { ...detail.simple, isd_update_by: useBy },
    });
  }
};

/** Importe guardado del detalle, o null si la factura no lo tiene (registrada sin él). */
const storedAmount = (invoice, column) => storedDetail(invoice)[column] ?? null;

const balanceChange = (field, before, after) => ({ field, oldValue: moneyText(before), newValue: moneyText(after) });

/**
 * Aprobar una factura con detalle revalida sus importes contra los saldos
 * bajo bloqueo: es la validación definitiva (ADR-0024, decisión 8; ADR-0025,
 * decisión 5). Devuelve los cambios de saldo para la bitácora y los saldos
 * de antes, para la instantánea. 409 si la
 * factura no tiene sus importes, también una liquidación sin retenido.
 */
const revalidateOnApprove = async (tx, invoice) => {
  if (!hasDetail(invoice.inv_type)) return { changes: [], balances: null };
  const value = storedAmount(invoice, VALUE_COLUMN[invoice.inv_type]);
  if (value === null) {
    throw httpError(409, "La factura no tiene su valor registrado. Edítala y registra los importes antes de aprobarla.");
  }
  const balances = await contractBalances(tx, invoice.ctr_id);
  if (invoice.inv_type === INVOICE_TYPES.ADVANCE) {
    assertAdvanceFits(value, balances.advance);
    return { balances, changes: [balanceChange("advance_invoiced", balances.advance.invoiced, balances.advance.invoiced.plus(value))] };
  }
  if (invoice.inv_type === INVOICE_TYPES.RETENTION_REFUND) {
    assertRefundFits(value, balances.retention);
    return { balances, changes: [balanceChange("retention_refunded", balances.retention.refunded, balances.retention.refunded.plus(value))] };
  }
  const amortization = storedAmount(invoice, "ild_amortization");
  const retention = storedAmount(invoice, "ild_retention");
  if (retention === null) {
    throw httpError(409, "La factura no tiene su retenido registrado. Edítala para calcularlo antes de aprobarla.");
  }
  assertBillingFits(value, balances.billing);
  assertAmortizationFits(amortization, value, balances.advance);
  assertRetentionFits(retention, value, balances.retention);
  return {
    balances,
    changes: [
      balanceChange("billing_billed", balances.billing.billed, balances.billing.billed.plus(value)),
      balanceChange("advance_amortized", balances.advance.amortized, balances.advance.amortized.plus(amortization)),
      { field: "advance_effective_pct", oldValue: null, newValue: ratioText(balances.advance.effectivePct) },
      balanceChange("retention_retained", balances.retention.retained, balances.retention.retained.plus(retention)),
      { field: "retention_effective_pct", oldValue: null, newValue: ratioText(balances.retention.effectivePct) },
    ],
  };
};

/**
 * Instantánea de la aprobación (PRO-BE-39; ADR-0027, "Secuencia tipo";
 * ADR-0013): la composición de la factura y **todos** los saldos del contrato
 * antes y después de aprobarla, en la misma operación de bitácora. Es
 * evidencia: ningún cálculo la lee; los saldos se recalculan siempre desde
 * las facturas aprobadas. La consulta `getInvoiceEvidence` la reconstruye.
 *
 * Filas `snapshot.invoice.<importe>` (solo nuevo valor) y
 * `snapshot.<advance|retention>.<saldo>` (antes → después). La normal y la
 * liquidación agregan su IVA, sus retenciones, el neto y la versión de
 * fórmula (DEC-075).
 */
export const SNAPSHOT_PREFIX = "snapshot.";
export const SNAPSHOT_BALANCES = Object.freeze({
  advance: Object.freeze(["base", "agreed", "invoiced", "amortized", "toInvoice", "toAmortize", "effectivePct"]),
  retention: Object.freeze(["base", "agreed", "retained", "refunded", "toRetain", "balance", "effectivePct"]),
});
const SNAPSHOT_AMOUNTS = Object.freeze({
  value: (invoice) => storedAmount(invoice, VALUE_COLUMN[invoice.inv_type]),
  amortization: (invoice) => (isBillingType(invoice.inv_type) ? storedAmount(invoice, "ild_amortization") : null),
  retention: (invoice) => (isBillingType(invoice.inv_type) ? storedAmount(invoice, "ild_retention") : null),
});
const snapshotText = (key, value) => (key === "effectivePct" ? ratioText(value) : moneyText(value));

// Simple (DEC-065): sin saldos de contrato; la instantánea es su composición
// completa, con la versión de fórmula con que se compuso.
const SIMPLE_SNAPSHOT_KEYS = Object.freeze([
  "value",
  "withholding",
  "discount",
  "subtotal",
  "vat",
  "vatWithholding",
  "icaWithholding",
  "freight",
  "earlyPaymentDiscount",
  "total",
  "billed",
]);
const simpleSnapshot = (detail) => {
  const composed = composeSimpleInvoice(detail);
  return [
    ...SIMPLE_SNAPSHOT_KEYS.map((key) => ({ field: `${SNAPSHOT_PREFIX}invoice.${key}`, oldValue: null, newValue: moneyText(composed[key]) })),
    { field: `${SNAPSHOT_PREFIX}invoice.formulaVersion`, oldValue: null, newValue: String(detail.isd_formula_version) },
  ];
};

// Normal y liquidación (DEC-075): IVA, retenciones, descuento de materiales y
// neto, con la versión de fórmula. Valor, amortización y retenido ya van en
// SNAPSHOT_AMOUNTS. Las registradas antes de DEC-075 no tienen composición.
const CONTRACT_SNAPSHOT_KEYS = Object.freeze(["vat", "valueWithVat", "withholding", "vatWithholding", "icaWithholding", "materialsDiscount", "total"]);
const contractSnapshot = (detail) => {
  if (!hasContractTaxes(detail)) return [];
  const composed = composeContractInvoice(detail);
  return [
    ...CONTRACT_SNAPSHOT_KEYS.map((key) => ({ field: `${SNAPSHOT_PREFIX}invoice.${key}`, oldValue: null, newValue: moneyText(composed[key]) })),
    { field: `${SNAPSHOT_PREFIX}invoice.utilityPct`, oldValue: null, newValue: percentText(detail.ild_utility_pct) },
    { field: `${SNAPSHOT_PREFIX}invoice.formulaVersion`, oldValue: null, newValue: String(detail.ild_formula_version) },
  ];
};

const approvalSnapshot = ({ invoice, before, after }) => {
  if (isSimpleType(invoice.inv_type)) return invoice.tbl_invoice_simple_details ? simpleSnapshot(invoice.tbl_invoice_simple_details) : [];
  if (!before) return [];
  const amounts = Object.entries(SNAPSHOT_AMOUNTS)
    .map(([key, read]) => [key, read(invoice)])
    .filter(([, value]) => value !== null)
    .map(([key, value]) => ({ field: `${SNAPSHOT_PREFIX}invoice.${key}`, oldValue: null, newValue: moneyText(value) }));
  if (isBillingType(invoice.inv_type)) amounts.push(...contractSnapshot(invoice.tbl_invoice_liquidation_details));
  const balances = Object.entries(SNAPSHOT_BALANCES).flatMap(([group, keys]) =>
    keys.map((key) => ({
      field: `${SNAPSHOT_PREFIX}${group}.${key}`,
      oldValue: snapshotText(key, before[group][key]),
      newValue: snapshotText(key, after[group][key]),
    }))
  );
  return [...amounts, ...balances];
};

/**
 * Anular una factura aprobada no puede romper los saldos:
 * - Un anticipo no deja el amortizado por encima del facturado (I2).
 * - Una liquidación no deja el devuelto por encima del retenido (I3). Su
 *   amortización solo reduce el amortizado: siempre cumple I2.
 * - Una devolución reduce el devuelto: siempre cumple I3.
 * Devuelve los cambios de saldo para la bitácora.
 */
const revalidateOnCancel = async (tx, invoice) => {
  if (invoice.inv_state !== INVOICE_STATES.APPROVED || !hasDetail(invoice.inv_type)) return [];
  const value = storedAmount(invoice, VALUE_COLUMN[invoice.inv_type]);
  if (value === null) return [];
  const balances = await contractBalances(tx, invoice.ctr_id);
  if (invoice.inv_type === INVOICE_TYPES.ADVANCE) {
    assertAdvanceCancellable(value, balances.advance);
    return [balanceChange("advance_invoiced", balances.advance.invoiced, balances.advance.invoiced.minus(value))];
  }
  if (invoice.inv_type === INVOICE_TYPES.RETENTION_REFUND) {
    return [balanceChange("retention_refunded", balances.retention.refunded, balances.retention.refunded.minus(value))];
  }
  const amortization = storedAmount(invoice, "ild_amortization");
  const retention = storedAmount(invoice, "ild_retention");
  const changes = [
    balanceChange("billing_billed", balances.billing.billed, balances.billing.billed.minus(value)),
    balanceChange("advance_amortized", balances.advance.amortized, balances.advance.amortized.minus(amortization)),
  ];
  if (retention === null) return changes;
  assertLiquidationCancellable(retention, balances.retention);
  return [...changes, balanceChange("retention_retained", balances.retention.retained, balances.retention.retained.minus(retention))];
};

// ─── Listado ─────────────────────────────────────────────────────────────────

// Lista blanca de orden (ENDPOINT_STANDARD, "Listados").
const SORT_FIELDS = {
  number: (order) => ({ inv_number: order }),
  statement: (order) => ({ inv_statement: order }),
  type: (order) => ({ inv_type: order }),
  provider: (order) => ({ tbl_providers: { prv_name: order } }),
  work: (order) => ({ tbl_works: { wrk_code: order } }),
  date: (order) => ({ inv_date: order }),
  approvalDate: (order) => ({ inv_approval_date: order }),
  state: (order) => ({ inv_state: order }),
  updatedAt: (order) => ({ inv_update_at: order }),
  // Importes guardados de la simple (DEC-065); IVA y total se calculan, no se ordenan. En los menús de contrato no se
  // ordena por importes: cada tipo los guarda en su propia tabla de detalle.
  value: (order) => ({ tbl_invoice_simple_details: { isd_value: order } }),
  discount: (order) => ({ tbl_invoice_simple_details: { isd_discount: order } }),
  vatPct: (order) => ({ tbl_invoice_simple_details: { isd_vat_pct: order } }),
};

const LIST_SELECT = {
  inv_id: true,
  inv_type: true,
  pvt_id: true,
  tbl_provider_types: { select: { pvt_name: true } },
  ctr_id: true,
  wrk_id: true,
  inv_number: true,
  inv_date: true,
  inv_approval_date: true,
  inv_statement: true,
  inv_state: true,
  inv_update_at: true,
  updated_by_user: USER_NAME_SELECT,
  tbl_providers: { select: { prv_name: true } },
  tbl_works: { select: { wrk_code: true, wrk_name: true } },
  tbl_work_stages: { select: { wks_name: true } },
  tbl_contracts: { select: { ctr_number: true, ctr_name: true, tbl_work_stages: { select: { wks_name: true } } } },
  // ¿Tiene un seguimiento abierto? (DEC-076): el indicador del listado.
  tbl_invoice_follow_ups: { where: { ifu_close_date: null, sta_id: { not: DELETED_STATUS } }, select: { ifu_id: true }, take: 1 },
  // Importes de cada tipo: lo capturado, para mostrarlo y componer IVA y total (DEC-065, DEC-075).
  tbl_invoice_advance_details: { select: { iad_value: true } },
  tbl_invoice_retention_refund_details: { select: { irr_value: true } },
  tbl_invoice_liquidation_details: {
    select: {
      ild_value: true,
      ild_amortization: true,
      ild_retention: true,
      ild_utility_pct: true,
      ild_vat_pct: true,
      ild_withholding_pct: true,
      ild_vat_withholding_pct: true,
      ild_ica_withholding: true,
      ild_materials_discount: true,
      ild_formula_version: true,
    },
  },
  tbl_invoice_simple_details: {
    select: {
      isd_value: true,
      isd_withholding_pct: true,
      isd_discount: true,
      isd_vat_pct: true,
      isd_vat_withholding_pct: true,
      isd_ica_withholding: true,
      isd_freight: true,
      isd_early_payment_discount: true,
      isd_formula_version: true,
    },
  },
};

const NO_LIST_AMOUNTS = Object.freeze({ value: null, discount: null, vatPct: null, vat: null, total: null });

/**
 * Columnas de importes del listado, las del sistema que se migra: valor, descuento, % IVA, valor IVA y total.
 * - Simple (DEC-065): el descuento AI; IVA y total con su fórmula.
 * - Normal y liquidación (DEC-075): el descuento de materiales; IVA y total con su fórmula. Las registradas antes de
 *   DEC-075 no tienen composición: solo su valor.
 * - Anticipo y devolución de retenido: su valor, que es también su total (no llevan IVA ni retenciones).
 * null lo que el tipo no tiene, y todo en una factura sin importes.
 */
const listAmounts = (row) => {
  const simple = row.tbl_invoice_simple_details;
  if (simple) {
    const composed = composeSimpleInvoice(simple);
    const vatPct = percentText(simple.isd_vat_pct);
    return { value: moneyText(composed.value), discount: moneyText(composed.discount), vatPct, vat: moneyText(composed.vat), total: moneyText(composed.total) };
  }
  const liquidation = row.tbl_invoice_liquidation_details;
  if (liquidation) {
    if (!hasContractTaxes(liquidation)) return { ...NO_LIST_AMOUNTS, value: moneyText(liquidation.ild_value) };
    const composed = composeContractInvoice(liquidation);
    return {
      value: moneyText(composed.value),
      discount: moneyText(composed.materialsDiscount),
      vatPct: percentText(liquidation.ild_vat_pct),
      vat: moneyText(composed.vat),
      total: moneyText(composed.total),
    };
  }
  const plain = row.tbl_invoice_advance_details?.iad_value ?? row.tbl_invoice_retention_refund_details?.irr_value;
  return plain === undefined ? NO_LIST_AMOUNTS : { ...NO_LIST_AMOUNTS, value: moneyText(plain), total: moneyText(plain) };
};

const toListDto = (row) => ({
  invId: row.inv_id,
  type: row.inv_type,
  typeName: TYPE_NAMES[row.inv_type] ?? row.inv_type,
  // Menú al que pertenece (DEC-074): el cliente arma con él la dirección de la factura.
  pvtId: row.pvt_id,
  menuName: row.tbl_provider_types?.pvt_name ?? null,
  number: row.inv_number,
  date: dateOnlyText(row.inv_date),
  approvalDate: dateOnlyText(row.inv_approval_date),
  // Extracto, texto libre (DEC-084): lo agrupa el extracto de la obra con ese número.
  statement: row.inv_statement,
  providerName: row.tbl_providers?.prv_name ?? null,
  wrkId: row.wrk_id,
  workCode: row.tbl_works?.wrk_code ?? null,
  workName: row.tbl_works?.wrk_name ?? null,
  ctrId: row.ctr_id,
  contractNumber: row.tbl_contracts?.ctr_number ?? null,
  contractName: row.tbl_contracts?.ctr_name ?? null,
  // La simple guarda su etapa; la de una factura de contrato es la del contrato (no se copia).
  stageName: row.tbl_work_stages?.wks_name ?? row.tbl_contracts?.tbl_work_stages?.wks_name ?? null,
  ...listAmounts(row),
  hasOpenFollowUp: (row.tbl_invoice_follow_ups?.length ?? 0) > 0,
  state: row.inv_state,
  stateName: STATE_NAMES[row.inv_state] ?? row.inv_state,
  updatedAt: row.inv_update_at,
  updatedByName: userFullName(row.updated_by_user),
});

/**
 * Rango de un importe guardado, o null. `columns`: la columna de cada tabla de detalle que lo guarda (`{ relación:
 * columna }`); una factura entra si el suyo está en el rango. Los extremos ya vienen validados.
 */
const amountRange = (columns, from, to) => {
  const range = { ...(text(from) ? { gte: decimal(from) } : {}), ...(text(to) ? { lte: decimal(to) } : {}) };
  if (Object.keys(range).length === 0) return null;
  return { OR: Object.entries(columns).map(([relation, column]) => ({ [relation]: { is: { [column]: range } } })) };
};

// Dónde guarda cada tipo el valor, el descuento y el % IVA de las columnas del listado.
const VALUE_COLUMNS = {
  tbl_invoice_simple_details: "isd_value",
  tbl_invoice_liquidation_details: "ild_value",
  tbl_invoice_advance_details: "iad_value",
  tbl_invoice_retention_refund_details: "irr_value",
};
const DISCOUNT_COLUMNS = { tbl_invoice_simple_details: "isd_discount", tbl_invoice_liquidation_details: "ild_materials_discount" };
const VAT_PCT_COLUMNS = { tbl_invoice_simple_details: "isd_vat_pct", tbl_invoice_liquidation_details: "ild_vat_pct" };

// Búsqueda general (DEC-024): número, comprobante, proveedor, contrato u obra.
const searchWhereOf = (search) => {
  const value = text(search);
  if (!value) return {};
  return {
    OR: [
      { inv_number: { contains: value } },
      { inv_voucher_number: { contains: value } },
      { tbl_providers: { prv_name: { contains: value } } },
      { tbl_contracts: { ctr_number: { contains: value } } },
      { tbl_works: { wrk_code: { contains: value } } },
      { tbl_works: { wrk_name: { contains: value } } },
    ],
  };
};

const countByState = async (where) => {
  const grouped = await prisma.tbl_invoices.groupBy({ by: ["inv_state"], where, _count: { _all: true } });
  return Object.fromEntries(grouped.map((g) => [g.inv_state, g._count._all]));
};

/**
 * Facturas paginadas. `state` filtra por estado (las pestañas); `type`,
 * `wrkId`, `prvId` y `ctrId`, por tipo, obra, proveedor o contrato (la
 * pestaña Facturas del contrato). `number`, `voucherNumber`, `statement`,
 * `contractNumber`, `providerName` (razón social) y los rangos de fecha y de aprobación son filtros por
 * campo (DEC-048). Las columnas de importes también: `wksId` (la etapa
 * de la factura o la de su contrato), `contractName` y los rangos de valor,
 * descuento y % IVA (`valueFrom`…`vatPctTo`), en la tabla de detalle de cada
 * tipo; el IVA y el total se calculan y no se filtran.
 * Los conteos respetan todos los filtros menos el estado.
 *
 * `scope`: alcance por obra de la petición (DEC-047). El filtro de obra va en
 * el `AND`: se suma al alcance y nunca lo reemplaza.
 *
 * `pvtId`: el menú del listado, un tipo de proveedor (DEC-074); sin él (las
 * pestañas de los expedientes), todas.
 */
export const paginationInvoices = async ({ rows, first, ...filters }) => {
  const { baseWhere, where, orderBy } = invoiceListQuery(filters);
  const [page, statusCounts] = await Promise.all([
    paginate(prisma.tbl_invoices, { where, select: LIST_SELECT, orderBy }, { first, rows }),
    countByState(baseWhere),
  ]);
  return { ...page, results: page.results.map(toListDto), statusCounts };
};

/**
 * `where` (con y sin la pestaña de estado) y orden del listado. Los usan el
 * listado paginado y el reporte (DEC-070).
 */
const invoiceListQuery = ({
  search,
  state,
  pvtId,
  type,
  wrkId,
  prvId,
  ctrId,
  number,
  voucherNumber,
  statement,
  contractNumber,
  providerName,
  dateFrom,
  dateTo,
  approvalDateFrom,
  approvalDateTo,
  wksId,
  contractName,
  valueFrom,
  valueTo,
  discountFrom,
  discountTo,
  vatPctFrom,
  vatPctTo,
  advance,
  sortField,
  sortOrder,
  scope,
}) => {
  const order = Number(sortOrder) === 1 ? "asc" : "desc";
  const orderBy = (SORT_FIELDS[sortField] ?? SORT_FIELDS.updatedAt)(order);

  const baseWhere = {
    sta_id: { not: DELETED_STATUS },
    ...(positiveId(pvtId) ? { pvt_id: positiveId(pvtId) } : {}),
    ...(type ? { inv_type: type } : {}),
    ...(positiveId(prvId) ? { prv_id: positiveId(prvId) } : {}),
    ...(positiveId(ctrId) ? { ctr_id: positiveId(ctrId) } : {}),
    ...searchWhereOf(search),
    ...filtersWhere([
      // Sin restricción (alcance "Ver todo") es `{}`: no se agrega.
      ...[invoiceScopeWhere(scope)].filter((where) => Object.keys(where).length > 0),
      idFilter(wrkId, (id) => ({ wrk_id: id })),
      containsFilter(number, (c) => ({ inv_number: c })),
      containsFilter(voucherNumber, (c) => ({ inv_voucher_number: c })),
      containsFilter(statement, (c) => ({ inv_statement: c })),
      containsFilter(contractNumber, (c) => ({ tbl_contracts: { ctr_number: c } })),
      containsFilter(providerName, (c) => ({ tbl_providers: { prv_name: c } })),
      dateRangeFilter("inv_date", dateFrom, dateTo),
      dateRangeFilter("inv_approval_date", approvalDateFrom, approvalDateTo),
      // La simple guarda su etapa; las de contrato toman la de su contrato.
      idFilter(wksId, (id) => ({ OR: [{ wks_id: id }, { tbl_contracts: { wks_id: id } }] })),
      containsFilter(contractName, (c) => ({ tbl_contracts: { ctr_name: c } })),
      amountRange(VALUE_COLUMNS, valueFrom, valueTo),
      amountRange(DISCOUNT_COLUMNS, discountFrom, discountTo),
      amountRange(VAT_PCT_COLUMNS, vatPctFrom, vatPctTo),
      invoiceAdvanceWhere(advance),
    ]),
  };
  return { baseWhere, where: { ...baseWhere, ...(state ? { inv_state: state } : {}) }, orderBy };
};

/**
 * Facturas de un contrato para su reporte (DEC-070): las no eliminadas, con
 * su valor y, la liquidación, su amortización y su retenido. El alcance del
 * contrato y el permiso de ver facturas los verifica quien llama.
 */
export const contractInvoicesForReport = async ({ ctrId }) => {
  const rows = await prisma.tbl_invoices.findMany({
    where: { ctr_id: Number(ctrId), sta_id: { not: DELETED_STATUS } },
    select: {
      inv_id: true,
      inv_type: true,
      inv_number: true,
      inv_date: true,
      inv_approval_date: true,
      inv_statement: true,
      inv_state: true,
      tbl_invoice_advance_details: { select: { iad_value: true } },
      tbl_invoice_liquidation_details: { select: { ild_value: true, ild_amortization: true, ild_retention: true } },
      tbl_invoice_retention_refund_details: { select: { irr_value: true } },
    },
    orderBy: [{ inv_date: "asc" }, { inv_id: "asc" }],
  });
  return rows.map((row) => {
    const detail =
      row.tbl_invoice_advance_details ?? row.tbl_invoice_liquidation_details ?? row.tbl_invoice_retention_refund_details ?? null;
    return {
      invId: row.inv_id,
      number: row.inv_number,
      typeName: TYPE_NAMES[row.inv_type] ?? row.inv_type,
      date: dateOnlyText(row.inv_date),
      approvalDate: dateOnlyText(row.inv_approval_date),
      statement: row.inv_statement,
      value: detail ? moneyText(detail[VALUE_COLUMN[row.inv_type]]) : null,
      amortization: moneyText(row.tbl_invoice_liquidation_details?.ild_amortization),
      retention: moneyText(row.tbl_invoice_liquidation_details?.ild_retention),
      state: row.inv_state,
      stateName: STATE_NAMES[row.inv_state] ?? row.inv_state,
    };
  });
};

/**
 * Facturas no eliminadas de un extracto (DEC-084): las de su obra cuyo texto
 * de extracto es su número (con la intercalación de la columna: sin distinguir
 * mayúsculas ni tildes), con los importes del listado y su comprobante: el
 * reporte del extracto. Con el tope de los reportes (DEC-070). El alcance del
 * extracto lo verifica quien llama.
 */
export const statementInvoices = async ({ wrkId, number }) =>
  (
    await findExportRows(prisma.tbl_invoices, {
      where: { wrk_id: Number(wrkId), inv_statement: number, sta_id: { not: DELETED_STATUS } },
      select: { ...LIST_SELECT, inv_voucher_number: true },
      orderBy: [{ pvt_id: "asc" }, { inv_date: "asc" }, { inv_id: "asc" }],
    })
  ).map((row) => ({ ...toListDto(row), voucherNumber: row.inv_voucher_number }));

// Columnas del reporte: las de la tabla del listado (DEC-070); un menú de
// forma simple no tiene tipo que elegir ni contrato.
const EXPORT_COLUMNS = [
  { header: "Número", value: (r) => r.number },
  { header: "Extracto", value: (r) => r.statement },
  { header: "Tipo", value: (r) => r.typeName, contract: true },
  { header: "Proveedor", value: (r) => r.providerName, width: 2 },
  { header: "Nro contrato", value: (r) => r.contractNumber, contract: true },
  { header: "Contrato", value: (r) => r.contractName, contract: true, width: 2 },
  { header: "Obra", value: (r) => [r.workCode, r.workName].filter(Boolean).join(" — "), width: 2 },
  { header: "Etapa", value: (r) => r.stageName },
  { header: "Valor", value: (r) => r.value, kind: "money" },
  { header: "Descuento", value: (r) => r.discount, kind: "money" },
  { header: "IVA %", value: (r) => r.vatPct, kind: "percent" },
  { header: "Valor IVA", value: (r) => r.vat, kind: "money" },
  { header: "Total", value: (r) => r.total, kind: "money" },
  { header: "Fecha", value: (r) => r.date, kind: "date" },
  { header: "Aprobada el", value: (r) => r.approvalDate, kind: "date" },
  { header: "Estado", value: (r) => r.stateName },
];

const exportFilterLines = async ({
  state,
  search,
  type,
  wrkId,
  prvId,
  number,
  voucherNumber,
  statement,
  contractNumber,
  providerName,
  dateFrom,
  dateTo,
  approvalDateFrom,
  approvalDateTo,
  wksId,
  contractName,
  valueFrom,
  valueTo,
  discountFrom,
  discountTo,
  vatPctFrom,
  vatPctTo,
  advance,
}) => {
  const [work, provider, stage] = await Promise.all([
    positiveId(wrkId) ? prisma.tbl_works.findUnique({ where: { wrk_id: positiveId(wrkId) }, select: { wrk_code: true, wrk_name: true } }) : null,
    positiveId(prvId) ? prisma.tbl_providers.findUnique({ where: { prv_id: positiveId(prvId) }, select: { prv_name: true } }) : null,
    positiveId(wksId) ? prisma.tbl_work_stages.findUnique({ where: { wks_id: positiveId(wksId) }, select: STAGE_OPTION_SELECT }) : null,
  ]);
  const range = (from, to) => (from || to ? `${from || "…"} a ${to || "…"}` : "");
  const lines = [
    ["Estado", state ? (STATE_NAMES[state] ?? state) : "Todos"],
    ["Búsqueda", text(search)],
    ["Tipo", type ? (TYPE_NAMES[type] ?? type) : ""],
    ["Obra", work && `${work.wrk_code} — ${work.wrk_name}`],
    ["Proveedor", provider?.prv_name ?? text(providerName)],
    ["Número contiene", text(number)],
    ["Comprobante contiene", text(voucherNumber)],
    ["Extracto contiene", text(statement)],
    ["Contrato contiene", text(contractNumber)],
    ["Fecha", range(dateFrom, dateTo)],
    ["Aprobada el", range(approvalDateFrom, approvalDateTo)],
    ["Etapa", stage && stageOptionLabel(stage)],
    ["Contrato (nombre) contiene", text(contractName)],
    ["Valor", range(valueFrom, valueTo)],
    ["Descuento", range(discountFrom, discountTo)],
    ["IVA %", range(vatPctFrom, vatPctTo)],
    ["Anticipo", advance ? (INVOICE_ADVANCE_FILTER_NAMES[advance] ?? advance) : ""],
  ].filter(([, value]) => value);
  return [`Filtros: ${lines.map(([label, value]) => `${label}: ${value}`).join(" · ")}`];
};

/**
 * Reporte del listado de un menú en Excel o PDF (DEC-070): los mismos
 * filtros, pestaña, búsqueda, orden y alcance que la tabla, sin paginar, hasta
 * EXPORT_MAX_ROWS. El título es el nombre del menú (DEC-074).
 */
export const exportInvoices = async ({ format, ...filters }) => {
  const menu = await getInvoiceMenu({ pvtId: filters.pvtId });
  const { where, orderBy } = invoiceListQuery(filters);
  const rows = (await findExportRows(prisma.tbl_invoices, { where, select: LIST_SELECT, orderBy })).map(toListDto);
  const columns = isSimpleMode(menu.mode) ? EXPORT_COLUMNS.filter((c) => !c.contract) : EXPORT_COLUMNS;
  return renderExport({ format, title: `Facturas — ${menu.name}`, filters: await exportFilterLines(filters), columns, rows });
};

// ─── Detalle ─────────────────────────────────────────────────────────────────

const amountsDto = (row) => {
  const advance = row.tbl_invoice_advance_details;
  const liquidation = row.tbl_invoice_liquidation_details;
  const refund = row.tbl_invoice_retention_refund_details;
  const simple = row.tbl_invoice_simple_details;
  // Simple (DEC-065): lo capturado, las líneas del panel Detalle y los dos totales.
  if (simple) return simpleAmountsDto(simple);
  if (advance) return { value: moneyText(advance.iad_value) };
  if (refund) return { value: moneyText(refund.irr_value) };
  if (liquidation) {
    const concept = liquidation.tbl_contract_concepts;
    return {
      // Otrosí de liquidación al que se asocia (DEC-059).
      liquidationConcept: concept ? { ccpId: liquidation.ccp_id, number: concept.ccp_number, startDate: dateOnlyText(concept.ccp_start_date) } : null,
      value: moneyText(liquidation.ild_value),
      amortization: moneyText(liquidation.ild_amortization),
      defaultAmortization: moneyText(liquidation.ild_default_amortization),
      defaultPct: ratioText(liquidation.ild_default_pct),
      appliedPct: ratioText(liquidation.ild_applied_pct),
      adjustmentObservation: liquidation.ild_adjustment_observation,
      // Retenido contractual (DEC-051): null si se registró antes de él.
      retention: moneyText(liquidation.ild_retention),
      defaultRetention: moneyText(liquidation.ild_default_retention),
      retentionDefaultPct: ratioText(liquidation.ild_retention_default_pct),
      retentionAppliedPct: ratioText(liquidation.ild_retention_applied_pct),
      retentionObservation: liquidation.ild_retention_observation,
      // IVA, retenciones y descuento de materiales (DEC-075): lo capturado
      // (`captured`), las líneas del panel Detalle y el neto. Sin ellos si
      // se registró antes.
      ...(hasContractTaxes(liquidation) ? contractTaxesDto(liquidation) : {}),
    };
  }
  return null;
};

export const getInvoice = async ({ invId, scope }) => {
  await assertInvoiceVisible({ scope }, invId);
  const row = await prisma.tbl_invoices.findFirst({
    where: { inv_id: Number(invId), sta_id: { not: DELETED_STATUS } },
    select: {
      ...LOCKED_SELECT,
      inv_create_at: true,
      inv_update_at: true,
      created_by_user: USER_NAME_SELECT,
      updated_by_user: USER_NAME_SELECT,
      tbl_providers: { select: { prv_name: true, prv_identification: true, tbl_identity_documents: { select: { idd_code: true } } } },
      tbl_provider_types: { select: { pvt_name: true, pvt_invoice_mode: true } },
      tbl_invoice_liquidation_details: {
        select: {
          ...LOCKED_SELECT.tbl_invoice_liquidation_details.select,
          tbl_contract_concepts: { select: { ccp_number: true, ccp_start_date: true } },
        },
      },
      tbl_works: { select: { wrk_code: true, wrk_name: true } },
      tbl_work_stages: { select: { wks_name: true } },
      tbl_contracts: {
        select: { ctr_number: true, ctr_name: true, ctr_state: true, tbl_work_stages: { select: { wks_name: true } } },
      },
      tbl_invoice_status_history: {
        select: {
          ish_id: true,
          ish_from_state: true,
          ish_to_state: true,
          ish_origin: true,
          ish_observation: true,
          ish_create_at: true,
          tbl_reasons: { select: { rea_name: true } },
          created_by_user: USER_NAME_SELECT,
        },
        orderBy: [{ ish_create_at: "desc" }, { ish_id: "desc" }],
      },
    },
  });
  if (!row) throw httpError(404, "No se encontró la factura.");
  const statement = row.inv_statement
    ? await prisma.tbl_statements.findFirst({
        where: { wrk_id: row.wrk_id, stm_number: row.inv_statement, sta_id: { not: DELETED_STATUS } },
        select: { stm_id: true, stm_date: true },
      })
    : null;

  const contract = row.tbl_contracts;
  const contractAction = INVOICE_ACTIONS[row.inv_type];
  return {
    invId: row.inv_id,
    type: row.inv_type,
    typeName: TYPE_NAMES[row.inv_type] ?? row.inv_type,
    // Menú de la factura (DEC-074): su tipo de proveedor.
    pvtId: row.pvt_id,
    menuName: row.tbl_provider_types?.pvt_name ?? null,
    menuMode: row.tbl_provider_types?.pvt_invoice_mode ?? null,
    prvId: row.prv_id,
    wrkId: row.wrk_id,
    wksId: row.wks_id,
    ctrId: row.ctr_id,
    number: row.inv_number,
    date: dateOnlyText(row.inv_date),
    approvalDate: dateOnlyText(row.inv_approval_date),
    voucherNumber: row.inv_voucher_number,
    // Extracto, texto libre (DEC-084), y el extracto de la obra con ese número, si ya existe:
    // las glosas lo proponen.
    statement: row.inv_statement,
    stmId: statement?.stm_id ?? null,
    statementDate: dateOnlyText(statement?.stm_date),
    description: row.inv_description,
    providerName: row.tbl_providers?.prv_name ?? null,
    providerIdentification: [row.tbl_providers?.tbl_identity_documents?.idd_code, row.tbl_providers?.prv_identification].filter(Boolean).join(" "),
    workCode: row.tbl_works?.wrk_code ?? null,
    workName: row.tbl_works?.wrk_name ?? null,
    stageName: row.tbl_work_stages?.wks_name ?? contract?.tbl_work_stages?.wks_name ?? null,
    contractNumber: contract?.ctr_number ?? null,
    contractName: contract?.ctr_name ?? null,
    contractState: contract?.ctr_state ?? null,
    contractStateName: contract ? (CONTRACT_STATE_NAMES[contract.ctr_state] ?? contract.ctr_state) : null,
    // Si el estado del contrato admite hoy este tipo de factura (para aprobar).
    contractAdmits: contract ? contractAllows(contract.ctr_state, contractAction) : true,
    // Importes del detalle (DEC-044): null si el tipo no los tiene o la
    // factura se registró sin ellos.
    amounts: amountsDto(row),
    state: row.inv_state,
    stateName: STATE_NAMES[row.inv_state] ?? row.inv_state,
    // Qué admite el estado actual: el cliente lo cruza con los permisos. Con
    // el contrato liquidado no se anula ni se elimina (ADR-0027, DEC-068): el
    // servidor lo vuelve a verificar bajo bloqueo.
    allowedActions: (STATE_ALLOWS[row.inv_state] ?? []).filter(
      (action) => !CONTRACT_GATED_ACTIONS[action] || !contract || contractAllows(contract.ctr_state, CONTRACT_GATED_ACTIONS[action])
    ),
    createdAt: row.inv_create_at,
    createdByName: userFullName(row.created_by_user),
    updatedAt: row.inv_update_at,
    updatedByName: userFullName(row.updated_by_user),
    history: row.tbl_invoice_status_history.map((h) => ({
      ishId: h.ish_id,
      fromState: h.ish_from_state,
      fromStateName: h.ish_from_state ? STATE_NAMES[h.ish_from_state] : null,
      toState: h.ish_to_state,
      toStateName: STATE_NAMES[h.ish_to_state],
      origin: h.ish_origin,
      reasonName: h.tbl_reasons?.rea_name ?? null,
      observation: h.ish_observation,
      createdAt: h.ish_create_at,
      createdByName: userFullName(h.created_by_user),
    })),
  };
};

// ─── Opciones del formulario ─────────────────────────────────────────────────

/**
 * Obras activas del alcance para la factura simple (DEC-058), por código o
 * nombre, con tope fijo (DEC-018). `prvId` (el formulario abierto desde el
 * expediente del proveedor): solo las obras donde trabaja con un tipo de
 * forma simple (DEC-074).
 * `includeWrkId`: la obra ya elegida vuelve aunque la búsqueda o el tope la
 * dejen fuera, si es activa y del alcance.
 */
export const selectInvoiceWorks = async ({ search, prvId, includeWrkId, scope } = {}) => {
  const value = text(search);
  const provider = positiveId(prvId);
  const admitted = {
    sta_id: ACTIVE_STATUS,
    ...scopeWhere(scope),
    ...(provider ? { tbl_work_providers: { some: { prv_id: provider, tbl_work_provider_types: { some: SIMPLE_TYPE_WHERE } } } } : {}),
  };
  const select = { wrk_id: true, wrk_code: true, wrk_name: true };
  const rows = await prisma.tbl_works.findMany({
    where: { ...admitted, ...(value ? { OR: [{ wrk_code: { contains: value } }, { wrk_name: { contains: value } }] } : {}) },
    select,
    orderBy: { wrk_code: "asc" },
    take: MAX_ROWS,
  });
  const includeId = positiveId(includeWrkId);
  if (includeId && !rows.some((row) => row.wrk_id === includeId)) {
    const included = await prisma.tbl_works.findFirst({ where: { ...admitted, wrk_id: includeId }, select });
    if (included) rows.unshift(included);
  }
  return rows.map((row) => ({ value: row.wrk_id, label: `${row.wrk_code} — ${row.wrk_name}` }));
};

// Etapas y proveedores asignados de la obra: la misma consulta del formulario
// de contrato (activos, más los actuales de la factura que se edita), solo
// los que trabajan en ella con un tipo de forma simple (DEC-074). Cada uno
// con sus tipos simples en la obra (`simpleTypes`): el formulario abierto
// desde un menú ofrece solo los que tienen ese tipo.
export const getInvoiceFormOptions = async (args) => {
  const options = await getContractFormOptions(args);
  return {
    ...options,
    providers: options.providers
      .filter((p) => p.simpleTypes.length > 0 || p.value === Number(args.includePrvId))
      .map(({ value, label, simpleTypes }) => ({ value, label, simpleTypes })),
  };
};

// Tipos de factura de contrato que admite hoy un contrato en ese estado (ADR-0017).
const admittedTypes = (state) => Object.keys(INVOICE_ACTIONS).filter((type) => CONTRACT_STATE_ALLOWS[state]?.includes(INVOICE_ACTIONS[type]));

/**
 * Contratos del menú `pvtId` (DEC-074: firmados bajo ese tipo de proveedor,
 * de forma contrato) que hoy admiten el tipo de factura pedido (ADR-0017,
 * "Efectos de cada estado"): el anticipo, en ejecución; liquidación y
 * devolución, en liquidación. Sin tipo (el formulario lo elige después del
 * contrato), los que admiten alguno. Null si el tipo no es de contrato.
 */
const admittedContractsWhere = ({ type, pvtId, scope }) => {
  if (type && !INVOICE_ACTIONS[type]) return null;
  const states = Object.keys(CONTRACT_STATE_ALLOWS).filter((state) =>
    type ? admittedTypes(state).includes(type) : admittedTypes(state).length > 0
  );
  return {
    sta_id: { not: DELETED_STATUS },
    ...(positiveId(pvtId) ? { pvt_id: positiveId(pvtId) } : {}),
    tbl_work_provider_types: { tbl_provider_types: { pvt_invoice_mode: INVOICE_MODES.CONTRACT } },
    ctr_state: { in: states },
    ...scopeWhere(scope),
  };
};

/**
 * Proveedores con algún contrato admitido (`admittedContractsWhere`), para
 * elegirlos antes que el contrato. Con tope fijo (DEC-018); busca por razón
 * social o identificación. `includePrvId`: el ya elegido vuelve aunque la
 * búsqueda o el tope lo dejen fuera, si tiene contratos admitidos.
 */
export const selectInvoiceProviders = async ({ type, pvtId, search, includePrvId, scope } = {}) => {
  const contracts = admittedContractsWhere({ type, pvtId, scope });
  if (!contracts) return [];
  return providerSelectOptions({ admitted: { sta_id: { not: DELETED_STATUS }, tbl_contracts: { some: contracts } }, search, includePrvId });
};

/**
 * Proveedores con facturas no eliminadas del menú `pvtId` en el alcance por
 * obra: el filtro Proveedor del listado. Busca por razón social o
 * identificación, con tope (DEC-018); `includePrvId`, el ya elegido, vuelve
 * aunque la búsqueda lo deje fuera.
 */
export const selectInvoiceFilterProviders = async ({ pvtId, search, includePrvId, scope } = {}) => {
  const invoices = { sta_id: { not: DELETED_STATUS }, ...(positiveId(pvtId) ? { pvt_id: positiveId(pvtId) } : {}), ...invoiceScopeWhere(scope) };
  return providerSelectOptions({ admitted: { tbl_invoices: { some: invoices } }, search, includePrvId });
};

const STAGE_OPTION_SELECT = { wks_id: true, wks_name: true, tbl_works: { select: { wrk_code: true } } };
// Con la obra delante: con "Ver todo", dos obras pueden tener etapas del mismo nombre.
const stageOptionLabel = (row) => `${row.tbl_works?.wrk_code ?? ""} · ${row.wks_name}`;

/**
 * Etapas con facturas no eliminadas del menú `pvtId` en el alcance por obra,
 * propias (la simple) o por su contrato: el filtro Etapa del listado. Busca
 * por nombre de la etapa o código de la obra, con tope (DEC-018);
 * `includeWksId`, la ya elegida, vuelve aunque la búsqueda la deje fuera.
 */
export const selectInvoiceFilterStages = async ({ pvtId, search, includeWksId, scope } = {}) => {
  const invoices = { sta_id: { not: DELETED_STATUS }, ...(positiveId(pvtId) ? { pvt_id: positiveId(pvtId) } : {}), ...invoiceScopeWhere(scope) };
  const admitted = { OR: [{ tbl_invoices: { some: invoices } }, { tbl_contracts: { some: { tbl_invoices: { some: invoices } } } }] };
  const value = text(search);
  const rows = await prisma.tbl_work_stages.findMany({
    where: { AND: [admitted, ...(value ? [{ OR: [{ wks_name: { contains: value } }, { tbl_works: { wrk_code: { contains: value } } }] }] : [])] },
    select: STAGE_OPTION_SELECT,
    orderBy: [{ tbl_works: { wrk_code: "asc" } }, { wks_order: "asc" }],
    take: MAX_ROWS,
  });
  const includeId = positiveId(includeWksId);
  if (includeId && !rows.some((row) => row.wks_id === includeId)) {
    const included = await prisma.tbl_work_stages.findFirst({ where: { AND: [admitted, { wks_id: includeId }] }, select: STAGE_OPTION_SELECT });
    if (included) rows.unshift(included);
  }
  return rows.map((row) => ({ value: row.wks_id, label: stageOptionLabel(row) }));
};

/**
 * Contratos admitidos (`admittedContractsWhere`), con tope fijo, como un
 * selector (DEC-018); busca por número, nombre, proveedor y obra. `prvId`:
 * solo los de ese proveedor (elegido antes en el formulario).
 * `includeCtrId`: el contrato ya elegido (el que abre el formulario desde su
 * expediente) se devuelve aunque la búsqueda o el tope lo dejen fuera, si su
 * estado admite el tipo.
 */
export const selectInvoiceContracts = async ({ type, pvtId, prvId, search, includeCtrId, scope } = {}) => {
  const contracts = admittedContractsWhere({ type, pvtId, scope });
  if (!contracts) return [];
  const provider = positiveId(prvId);
  const admitted = { ...contracts, ...(provider ? { prv_id: provider } : {}) };
  const select = {
    ctr_id: true,
    ctr_number: true,
    ctr_name: true,
    ctr_state: true,
    prv_id: true,
    wrk_id: true,
    tbl_providers: { select: { prv_name: true } },
    tbl_works: { select: { wrk_code: true, wrk_name: true } },
  };
  const value = text(search);
  const rows = await prisma.tbl_contracts.findMany({
    where: {
      ...admitted,
      ...(value
        ? {
            OR: [
              { ctr_number: { contains: value } },
              { ctr_name: { contains: value } },
              { tbl_providers: { prv_name: { contains: value } } },
              { tbl_works: { wrk_code: { contains: value } } },
              { tbl_works: { wrk_name: { contains: value } } },
            ],
          }
        : {}),
    },
    select,
    orderBy: [{ tbl_works: { wrk_code: "asc" } }, { ctr_number: "asc" }],
    take: MAX_ROWS,
  });
  const includeId = Number(includeCtrId) || null;
  if (includeId && !rows.some((row) => row.ctr_id === includeId)) {
    const included = await prisma.tbl_contracts.findFirst({ where: { ...admitted, ctr_id: includeId }, select });
    if (included) rows.unshift(included);
  }
  return rows.map((row) => ({
    value: row.ctr_id,
    prvId: row.prv_id,
    // La obra del contrato.
    wrkId: row.wrk_id,
    label: `${row.tbl_works?.wrk_code ?? ""} · ${row.ctr_number} — ${row.ctr_name}`,
    providerName: row.tbl_providers?.prv_name ?? null,
    workName: row.tbl_works ? `${row.tbl_works.wrk_code} — ${row.tbl_works.wrk_name}` : null,
    stateName: CONTRACT_STATE_NAMES[row.ctr_state] ?? row.ctr_state,
    // Tipos que el formulario ofrece después de elegir el contrato.
    types: admittedTypes(row.ctr_state),
  }));
};

// ─── Validaciones bajo bloqueo ───────────────────────────────────────────────

/** La obra existe y está activa (solo al crear: la obra no cambia después). */
const assertWork = async (tx, wrkId) => {
  const work = await tx.tbl_works.findUnique({ where: { wrk_id: wrkId }, select: { sta_id: true, wrk_code: true } });
  if (!work || work.sta_id === DELETED_STATUS) throw httpError(400, "La obra seleccionada no existe.");
  if (work.sta_id !== ACTIVE_STATUS) throw httpError(400, `La obra ${work.wrk_code} está inactiva: no admite facturas nuevas.`);
};

/**
 * La etapa es de la obra y está activa, salvo que sea la que ya tenía
 * (DEC-058). Sin etapa solo si la obra no tiene etapas activas (DEC-069): se
 * cuentan con la obra ya bloqueada.
 */
const assertStage = async (tx, { wrkId, wksId, currentWksId }) => {
  if (!wksId) {
    const stages = await tx.tbl_work_stages.count({ where: { wrk_id: wrkId, sta_id: ACTIVE_STATUS } });
    if (stages > 0) throw httpError(400, "La obra tiene etapas: selecciona la etapa de la factura.");
    return;
  }
  const stage = await tx.tbl_work_stages.findUnique({ where: { wks_id: wksId }, select: { wrk_id: true, sta_id: true, wks_name: true } });
  if (!stage || stage.wrk_id !== wrkId) throw httpError(400, "La etapa seleccionada no pertenece a la obra de la factura.");
  if (stage.sta_id !== ACTIVE_STATUS && wksId !== currentWksId) {
    throw httpError(400, `La etapa "${stage.wks_name}" está inactiva y no se puede asignar.`);
  }
};

/**
 * El proveedor de una factura simple está asignado a la obra (DEC-058) y
 * trabaja en ella con un tipo de forma simple (DEC-074); el proveedor y la
 * asignación, activos, salvo que sea el que ya tenía. Con obra y proveedor
 * bloqueados: los tipos de la asignación cambian bajo ese mismo bloqueo.
 *
 * Devuelve el tipo de la factura (su menú): `pvtId` si llega (el menú desde
 * el que se registra, o el que ya tiene al editar), que debe ser uno de los
 * tipos simples de la asignación; sin él, el único que tenga. La FK compuesta
 * es la garantía; esto da el mensaje.
 */
const resolveSimpleProvider = async (tx, { wrkId, prvId, pvtId = null, currentPrvId }) => {
  const assignment = await tx.tbl_work_providers.findUnique({
    where: { wrk_id_prv_id: { wrk_id: wrkId, prv_id: prvId } },
    select: {
      sta_id: true,
      tbl_providers: { select: { prv_name: true, sta_id: true } },
      tbl_work_provider_types: { where: SIMPLE_TYPE_WHERE, select: { pvt_id: true } },
    },
  });
  if (!assignment) throw httpError(400, "El proveedor seleccionado no está asignado a la obra de la factura.");
  // El que ya tenía: la FK compuesta garantiza que sigue con su tipo en la obra.
  if (prvId === currentPrvId) return pvtId;
  const name = assignment.tbl_providers.prv_name;
  const simpleIds = assignment.tbl_work_provider_types.map((t) => t.pvt_id);
  if (pvtId && !simpleIds.includes(pvtId)) {
    const type = await tx.tbl_provider_types.findUnique({ where: { pvt_id: pvtId }, select: { pvt_name: true } });
    throw httpError(400, `${name} no trabaja en esta obra con el tipo de proveedor "${type?.pvt_name ?? pvtId}".`);
  }
  if (simpleIds.length === 0) throw httpError(400, `${name} no trabaja en esta obra con un tipo de proveedor de facturas simples.`);
  if (!pvtId && simpleIds.length > 1) {
    throw httpError(400, `${name} trabaja en esta obra con varios tipos de facturas simples: registra la factura desde el menú de uno de ellos.`);
  }
  if (assignment.tbl_providers.sta_id !== ACTIVE_STATUS) throw httpError(400, `El proveedor ${name} está inactivo.`);
  if (assignment.sta_id !== ACTIVE_STATUS) throw httpError(400, `La asignación de ${name} a la obra está inactiva.`);
  return pvtId ?? simpleIds[0];
};

// Número único por proveedor, anuladas incluidas (backlog DEC-17, DEC-042);
// el de una eliminada queda libre (DEC-068).
// El UNIQUE de la BD es la garantía ante dos peticiones simultáneas; esto da
// el mensaje claro.
const assertUniqueNumber = async (tx, { prvId, number, excludeId = null }) => {
  const duplicate = await tx.tbl_invoices.findFirst({
    where: { prv_id: prvId, inv_number: number, sta_id: { not: DELETED_STATUS }, ...(excludeId ? { inv_id: { not: excludeId } } : {}) },
    select: { inv_id: true, inv_state: true },
  });
  if (duplicate) {
    const cancelled = duplicate.inv_state === INVOICE_STATES.CANCELLED ? " (anulada: el número sigue ocupado)" : "";
    throw httpError(409, `Ya existe una factura con el número ${number} para este proveedor${cancelled}.`);
  }
};

// ─── Crear ───────────────────────────────────────────────────────────────────

/** Datos del documento que llegan del cliente → columnas. Nunca estado ni fecha de aprobación; los importes van al detalle. */
const documentValuesOf = (input) => ({
  inv_number: text(input.number),
  inv_date: toDateOnly(input.date),
  inv_voucher_number: optionalText(input.voucherNumber),
  inv_statement: optionalText(input.statement),
  inv_description: optionalText(input.description),
});

const IDEMPOTENCY_TARGET = {
  model: prisma.tbl_invoices,
  keyField: "inv_idempotency_key",
  hashField: "inv_idempotency_hash",
  ownerField: "inv_create_by",
  select: { inv_id: true },
  toResult: (row) => ({ message: "Factura registrada correctamente", invId: row.inv_id }),
};

const insertInvoice = async (tx, { values, detail = {}, useBy, ctx, idempotencyData }) => {
  await assertUniqueNumber(tx, { prvId: values.prv_id, number: values.inv_number });
  const { to: initialState } = assertTransition("register");
  const created = await tx.tbl_invoices.create({
    data: {
      ...values,
      inv_state: initialState,
      sta_id: ACTIVE_STATUS,
      inv_create_by: useBy,
      inv_update_by: useBy,
      ...idempotencyData,
    },
  });
  await writeDetail(tx, { invId: created.inv_id, detail, useBy });
  await tx.tbl_invoice_status_history.create({ data: historyRow({ invId: created.inv_id, transition: "register", useBy }) });
  await writeAudit(tx, {
    entity: AUDIT_ENTITIES.INVOICE,
    recordId: created.inv_id,
    operation: AUDIT_OPERATIONS.CREATE,
    ctx,
    changes: [
      ...diffFields({}, auditable(values), INVOICE_AUDITED),
      ...detailChanges({}, detail),
      { field: "inv_state", oldValue: null, newValue: initialState },
    ],
  });
  return { message: "Factura registrada correctamente", invId: created.inv_id };
};

/**
 * Factura simple: obra, etapa de la obra y proveedor asignado a ella, sin
 * contrato (DEC-058), en el menú de un tipo simple de la asignación (DEC-074).
 * Bloquea obra → proveedor: serializa con desasignar al proveedor, con quitar
 * la etapa y con cambiar los tipos de la asignación. Bloquea también el tipo
 * (o, sin menú, los tipos simples de la asignación): su forma de facturar no
 * cambia en medio (DEC-074). La lectura previa solo dice qué bloquear; el
 * tipo se resuelve bajo el bloqueo.
 */
const createSimpleInvoice = async ({ input, document, useBy, ctx, idempotencyData }) => {
  const wrkId = Number(input.wrkId);
  const prvId = Number(input.prvId);
  const types = positiveId(input.pvtId)
    ? [positiveId(input.pvtId)]
    : (await prisma.tbl_work_provider_types.findMany({ where: { wrk_id: wrkId, prv_id: prvId, ...SIMPLE_TYPE_WHERE }, select: { pvt_id: true } })).map(
        (t) => t.pvt_id
      );
  const locks = { OBRA: wrkId, PROVEEDOR: prvId, ...(types.length > 0 ? { TIPO_PROVEEDOR: types } : {}) };
  return withLockedTransaction(locks, async (tx) => {
    const wksId = positiveId(input.wksId);
    await assertWork(tx, wrkId);
    const pvtId = await resolveSimpleProvider(tx, { wrkId, prvId, pvtId: positiveId(input.pvtId) });
    await assertStage(tx, { wrkId, wksId });
    const values = { inv_type: input.type, pvt_id: pvtId, prv_id: prvId, wrk_id: wrkId, wks_id: wksId, ctr_id: null, ...document };
    // Toda simple nueva lleva sus importes (DEC-065).
    return insertInvoice(tx, { values, detail: { simple: simpleDetailOf(input) }, useBy, ctx, idempotencyData });
  });
};

/**
 * Factura de contrato: obra y proveedor salen del contrato bloqueado, y su
 * estado debe admitir el tipo (ADR-0017, "Efectos de cada estado"). Bloquea
 * el proveedor y el contrato: serializa con el otrosí de liquidación y la
 * suspensión, que cambian ese estado, y con las facturas que mueven los
 * saldos de anticipo y de retenido. El menú es el tipo de proveedor del
 * contrato (DEC-074), que debe facturar con contrato (409 si no). Su forma no
 * cambia mientras tenga contratos: leerla con el contrato bloqueado basta.
 */
const createContractInvoice = async ({ input, document, granted, useBy, ctx, idempotencyData }) => {
  const known = await prisma.tbl_contracts.findUnique({ where: { ctr_id: Number(input.ctrId) }, select: { prv_id: true } });
  if (!known) throw httpError(404, "No se encontró el contrato.");
  return withLockedTransaction({ PROVEEDOR: known.prv_id, CONTRATO: Number(input.ctrId) }, async (tx) => {
    const contract = await findLockedContract(tx, input.ctrId);
    if (contract.prv_id !== known.prv_id) {
      throw httpError(409, "El proveedor del contrato cambió mientras se registraba la factura. Vuelve a intentarlo.");
    }
    const type = await tx.tbl_provider_types.findUnique({ where: { pvt_id: contract.pvt_id }, select: { pvt_name: true, pvt_invoice_mode: true } });
    if (!isContractMode(type?.pvt_invoice_mode)) {
      throw httpError(
        409,
        `El contrato ${contract.ctr_number} no admite facturas: se firmó bajo el tipo de proveedor "${type?.pvt_name}", que no factura con contrato.`
      );
    }
    // Desde un menú, el contrato debe ser de él (el selector ya lo filtra).
    if (positiveId(input.pvtId) && positiveId(input.pvtId) !== contract.pvt_id) {
      throw httpError(400, `El contrato ${contract.ctr_number} no es del menú de facturas desde el que se registra: es de ${type.pvt_name}.`);
    }
    assertContractAllows(contract.ctr_state, INVOICE_ACTIONS[input.type]);
    if (document.inv_date.getTime() < new Date(dateOnlyText(contract.ctr_start_date)).getTime()) {
      throw httpError(400, `La fecha de la factura no puede ser anterior al inicio del contrato (${dateOnlyText(contract.ctr_start_date)}).`);
    }
    const values = { inv_type: input.type, pvt_id: contract.pvt_id, prv_id: contract.prv_id, wrk_id: contract.wrk_id, ctr_id: contract.ctr_id, ...document };
    const detail = await resolveDetail(tx, { type: input.type, ctrId: contract.ctr_id, input, granted });
    return insertInvoice(tx, { values, detail, useBy, ctx, idempotencyData });
  });
};

// ─── Editar ──────────────────────────────────────────────────────────────────

/**
 * Editar según el estado (ADR-0020, "Inmutabilidad"): registrada, todo salvo
 * tipo, obra y contrato; aprobada, solo extracto y descripción; anulada,
 * nada (409). Los importes de una registrada se revalidan contra los saldos
 * bajo bloqueo; los de una aprobada no cambian. Fija valores: repetirlo deja
 * lo mismo, así que se puede reintentar ante un interbloqueo.
 */
const updateInvoice = async ({ invId, input, document, granted, useBy, ctx }) => {
  const known = await findImmutable(invId);
  const isSimple = !hasContract(known.inv_type);
  // Proveedor y etapa son de la simple; si no llegan, se conservan. La obra no cambia.
  const requestedPrvId = (isSimple && positiveId(input.prvId)) || known.prv_id;

  return withLockedTransaction(
    locksOf(known, invId, requestedPrvId),
    async (tx) => {
      const before = await findLockedInvoice(tx, invId);
      const values = isSimple ? { ...document, prv_id: requestedPrvId, wks_id: positiveId(input.wksId) ?? before.wks_id } : { ...document };

      let detail = {};
      let amountChanges = [];
      // Una simple registrada antes de DEC-065 puede seguir sin importes: solo
      // se exigen si llegan o si ya los tenía.
      const simpleAmounts = isSimple && (hasSimpleAmounts(input) || Boolean(before.tbl_invoice_simple_details));
      if (hasDetail(before.inv_type) || simpleAmounts) {
        if (stateAllows(before.inv_state, "edit")) {
          detail = await resolveDetail(tx, { type: before.inv_type, ctrId: before.ctr_id, input, granted });
          amountChanges = detailChanges(before, detail);
        } else {
          amountChanges = requestedDetailChanges(before, input);
        }
      }

      const changes = [...diffFields(auditable(before), auditable(values), INVOICE_AUDITED), ...amountChanges];
      if (changes.length === 0) return { message: "Factura modificada correctamente", invId: before.inv_id };

      if (!stateAllows(before.inv_state, "editNotes")) {
        throw httpError(409, `La factura está ${STATE_NAMES[before.inv_state].toLowerCase()}: no admite cambios.`);
      }
      if (!stateAllows(before.inv_state, "edit") && changes.some((c) => !NOTE_COLUMNS.includes(c.field))) {
        throw httpError(
          409,
          `La factura está ${STATE_NAMES[before.inv_state].toLowerCase()}: solo admite cambios en el extracto, la descripción y el número de comprobante. Para corregir otro dato, anúlala y regístrala de nuevo.`
        );
      }

      if (isSimple) {
        // El menú (tipo) no cambia: el proveedor nuevo debe trabajar en la obra con él.
        await resolveSimpleProvider(tx, { wrkId: before.wrk_id, prvId: values.prv_id, pvtId: before.pvt_id, currentPrvId: before.prv_id });
        // Una aprobada solo cambia extracto y descripción: la etapa no se revisa (DEC-069).
        if (stateAllows(before.inv_state, "edit")) {
          await assertStage(tx, { wrkId: before.wrk_id, wksId: values.wks_id, currentWksId: before.wks_id });
        }
      }
      const prvId = values.prv_id ?? before.prv_id;
      if (values.inv_number !== before.inv_number || prvId !== before.prv_id) {
        await assertUniqueNumber(tx, { prvId, number: values.inv_number, excludeId: before.inv_id });
      }
      if (before.inv_approval_date && values.inv_date.getTime() > before.inv_approval_date.getTime()) {
        throw httpError(400, "La fecha de la factura no puede ser posterior a su aprobación.");
      }

      await tx.tbl_invoices.update({ where: { inv_id: before.inv_id }, data: { ...values, inv_update_by: useBy } });
      if (amountChanges.length > 0) await writeDetail(tx, { invId: before.inv_id, detail, useBy });
      await writeAudit(tx, { entity: AUDIT_ENTITIES.INVOICE, recordId: before.inv_id, operation: AUDIT_OPERATIONS.UPDATE, ctx, changes });
      return { message: "Factura modificada correctamente", invId: before.inv_id };
    },
    { idempotent: true }
  );
};

/**
 * Registrar (invId vacío o 0) o editar. Crear exige `Idempotency-Key`: el
 * reintento devuelve la factura creada y no "ya existe". `granted`: permisos
 * efectivos, para ajustar la amortización y el retenido de una liquidación.
 * `input.pvtId`: el menú desde el que se registra (DEC-074).
 */
export const saveInvoice = async ({ invId, input, useBy, granted, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  // Alcance por obra (DEC-047): se registra y se edita solo en una obra del
  // alcance (la de contrato, la de su contrato).
  if (Number(invId) > 0) await assertInvoiceVisible({ scope }, invId);
  else if (hasContract(input.type)) await assertContractInScope(scope, input.ctrId);
  else assertInScope(scope, input.wrkId, "No se encontró la obra.");
  const document = documentValuesOf(input);
  pastDate(input.date, "fecha de la factura");
  if (!document.inv_number) throw httpError(400, "El número de la factura es requerido.");

  if (Number(invId) > 0) return updateInvoice({ invId: Number(invId), input, document, granted, useBy: Number(useBy), ctx });

  if (!TYPE_NAMES[input.type]) throw httpError(400, "El tipo de factura no es válido.");
  const create = hasContract(input.type) ? createContractInvoice : createSimpleInvoice;
  const target = hasContract(input.type)
    ? { type: input.type, ctrId: Number(input.ctrId), pvtId: positiveId(input.pvtId) }
    : { type: input.type, pvtId: positiveId(input.pvtId), wrkId: Number(input.wrkId), prvId: Number(input.prvId), wksId: positiveId(input.wksId) };

  return runIdempotent({
    target: IDEMPOTENCY_TARGET,
    key: idempotencyKey,
    ownerId: useBy,
    payload: {
      ...target,
      ...auditable(document),
      value: moneyText(toMoney(input.value)),
      amortization: moneyText(toMoney(input.amortization)),
      amortizationObservation: optionalText(input.amortizationObservation),
      retention: moneyText(toMoney(input.retention)),
      retentionObservation: optionalText(input.retentionObservation),
      // Importes de la simple (DEC-065): la misma clave con otros importes es otra petición.
      ...Object.fromEntries(Object.keys(SIMPLE_FIELDS).filter((field) => field !== "value").map((field) => [field, optionalText(input[field])])),
    },
    execute: (idempotencyData) => create({ input, document, granted, useBy: Number(useBy), ctx, idempotencyData }),
  });
};

// ─── Transiciones manuales ───────────────────────────────────────────────────

// La clave de una transición manual va en el historial (DEC-016, migración
// 0067): repetir la petición devuelve el mismo resultado.
const transitionTarget = (message) => ({
  model: prisma.tbl_invoice_status_history,
  keyField: "ish_idempotency_key",
  hashField: "ish_idempotency_hash",
  ownerField: "ish_create_by",
  select: { inv_id: true },
  toResult: (row) => ({ message, invId: row.inv_id }),
});

/** Con contrato: su estado debe seguir admitiendo el tipo (pudo cambiar desde el registro). */
const assertContractStillAdmits = async (tx, invoice) => {
  if (!invoice.ctr_id) return;
  const contract = await findLockedContract(tx, invoice.ctr_id);
  assertContractAllows(contract.ctr_state, INVOICE_ACTIONS[invoice.inv_type]);
};

/** Acciones de la factura que la anulan o la eliminan → acción del contrato que las admite (no el liquidado). */
const CONTRACT_GATED_ACTIONS = Object.freeze({
  cancel: "cancelInvoice",
  cancelApproved: "cancelInvoice",
  delete: "deleteInvoice",
  deleteApproved: "deleteInvoice",
});

/**
 * Anular o eliminar (`action`, DEC-068) una factura de contrato: 409 con el
 * contrato liquidado (ADR-0027, catálogo de operaciones críticas; ADR-0017:
 * liquidado, solo consulta). Con el contrato ya bloqueado. La simple no
 * tiene contrato.
 */
const assertContractAdmitsCancel = async (tx, invoice, action = "cancelInvoice") => {
  if (!invoice.ctr_id) return;
  const contract = await findLockedContract(tx, invoice.ctr_id);
  assertContractAllows(contract.ctr_state, action);
};

/**
 * Aprobar (ADR-0020, decisión 7): la factura empieza a contar. Bloquea
 * contrato → factura y revalida bajo bloqueo el estado de los dos. La fecha
 * de aprobación no es futura ni anterior a la factura. Anticipo,
 * liquidación y devolución revalidan aquí I1 a I4 con carácter definitivo
 * (DEC-044, DEC-051). Falta evaluar C1–C8 (ADR-0017).
 */
export const approveInvoice = async ({ invId, input, useBy, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  await assertInvoiceVisible({ scope }, invId);
  const approvalDate = pastDate(input.approvalDate, "fecha de aprobación");
  const observation = optionalText(input.observation);
  const message = "Factura aprobada correctamente";

  return runIdempotent({
    target: transitionTarget(message),
    key: idempotencyKey,
    ownerId: useBy,
    payload: { invId: Number(invId), approvalDate: dateOnlyText(approvalDate), observation },
    execute: async (idempotencyData) => {
      const known = await findImmutable(invId);
      const result = await withLockedTransaction(locksOf(known, invId), async (tx) => {
        const before = await findLockedInvoice(tx, invId);
        const { to: nextState } = assertTransition("approve", before.inv_state);
        await assertContractStillAdmits(tx, before);
        if (approvalDate.getTime() < before.inv_date.getTime()) {
          throw httpError(400, `La fecha de aprobación no puede ser anterior a la fecha de la factura (${dateOnlyText(before.inv_date)}).`);
        }
        const { changes: balanceChanges, balances: balancesBefore } = await revalidateOnApprove(tx, before);

        await tx.tbl_invoices.update({
          where: { inv_id: before.inv_id },
          data: { inv_state: nextState, inv_approval_date: approvalDate, inv_update_by: Number(useBy) },
        });
        await tx.tbl_invoice_status_history.create({
          data: {
            ...historyRow({ invId: before.inv_id, transition: "approve", fromState: before.inv_state, useBy: Number(useBy), observation }),
            ...idempotencyData,
          },
        });
        // Después de aprobar, en esta transacción: los saldos ya la cuentan.
        const balancesAfter = balancesBefore ? await contractBalances(tx, before.ctr_id) : null;
        await writeAudit(tx, {
          entity: AUDIT_ENTITIES.INVOICE,
          recordId: before.inv_id,
          operation: AUDIT_OPERATIONS.UPDATE,
          ctx,
          changes: [
            { field: "inv_state", oldValue: before.inv_state, newValue: nextState },
            { field: "inv_approval_date", oldValue: null, newValue: dateOnlyText(approvalDate) },
            ...balanceChanges,
            ...approvalSnapshot({ invoice: before, before: balancesBefore, after: balancesAfter }),
          ],
        });
        return { message, invId: before.inv_id, ...(await liquidateIfComplete(tx, before, useBy, ctx)) };
      });
      return notifyIfLiquidated(result, known, useBy);
    },
  });
};

/**
 * Anular (ADR-0020, decisión 9): no borra, cambia el estado con motivo del
 * catálogo y observación. Una registrada exige el permiso de anular (la
 * ruta); una aprobada, además el reforzado, que el service verifica con el
 * estado bajo bloqueo (`granted`, como levantar una suspensión). Anular un
 * anticipo aprobado ya amortizado responde 409 (I2, DEC-044), y una
 * liquidación aprobada cuyo retenido ya se devolvió, también (I3, DEC-051).
 * Bloquea contrato → factura → motivo.
 */
export const cancelInvoice = async ({ invId, input, useBy, granted, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  await assertInvoiceVisible({ scope }, invId);
  const reaId = Number(input.reaId);
  const observation = text(input.observation);
  if (!observation) throw httpError(400, "La observación de la anulación es requerida.");
  const message = "Factura anulada correctamente";

  return runIdempotent({
    target: transitionTarget(message),
    key: idempotencyKey,
    ownerId: useBy,
    payload: { invId: Number(invId), reaId, observation },
    execute: async (idempotencyData) => {
      const known = await findImmutable(invId);
      const result = await withLockedTransaction({ ...locksOf(known, invId), MOTIVO: reaId }, async (tx) => {
        const before = await findLockedInvoice(tx, invId);
        const transition = cancelTransitionFor(before.inv_state);
        const rule = assertTransition(transition, before.inv_state);
        if (!granted?.has(rule.permission)) {
          throw httpError(403, "La factura está aprobada: anularla exige el permiso de anular facturas aprobadas.");
        }
        const reason = await reasonsService.assertAssignable(tx, reaId);
        if (reason.rea_scope !== REASON_SCOPES.INVOICE_CANCEL) throw httpError(400, "El motivo seleccionado no es de anulación de factura.");
        await assertContractAdmitsCancel(tx, before);
        const balanceChanges = await revalidateOnCancel(tx, before);

        await tx.tbl_invoices.update({ where: { inv_id: before.inv_id }, data: { inv_state: rule.to, inv_update_by: Number(useBy) } });
        await tx.tbl_invoice_status_history.create({
          data: {
            ...historyRow({ invId: before.inv_id, transition, fromState: before.inv_state, useBy: Number(useBy), reaId, observation }),
            ...idempotencyData,
          },
        });
        await writeAudit(tx, {
          entity: AUDIT_ENTITIES.INVOICE,
          recordId: before.inv_id,
          operation: AUDIT_OPERATIONS.UPDATE,
          ctx,
          changes: [
            { field: "inv_state", oldValue: before.inv_state, newValue: rule.to },
            { field: "rea_id", oldValue: null, newValue: reaId },
            ...balanceChanges,
          ],
        });
        return { message, invId: before.inv_id, ...(await liquidateIfComplete(tx, before, useBy, ctx)) };
      });
      return notifyIfLiquidated(result, known, useBy);
    },
  });
};

// ─── Eliminar ────────────────────────────────────────────────────────────────

/**
 * Eliminar (DEC-068): lógica, con observación y bitácora. Una registrada
 * exige el permiso de eliminar (la ruta); una aprobada, además el reforzado,
 * que el service verifica con el estado bajo bloqueo (`granted`). La anulada
 * no se elimina (409): ya no cuenta y queda como historial. Una aprobada
 * revierte sus efectos con las mismas reglas que anularla (I2, I3), y con el
 * contrato liquidado ninguna se elimina (409). Bloquea contrato → factura, u
 * obra → proveedor → factura. Sin clave de idempotencia: repetirla da 404.
 */
export const deleteInvoice = async ({ invId, input, useBy, granted, scope, ctx = { useId: useBy } }) => {
  await assertInvoiceVisible({ scope }, invId);
  const observation = text(input?.observation);
  if (!observation) throw httpError(400, "La observación de la eliminación es requerida.");

  const known = await findImmutable(invId);
  const result = await withLockedTransaction(locksOf(known, invId), async (tx) => {
    const before = await findLockedInvoice(tx, invId);
    const approved = stateAllows(before.inv_state, "deleteApproved");
    if (!approved && !stateAllows(before.inv_state, "delete")) {
      throw httpError(409, "La factura está anulada: no se elimina, queda como historial.");
    }
    if (approved && !granted?.has(can.deleteApproved)) {
      throw httpError(403, "La factura está aprobada: eliminarla exige el permiso de eliminar facturas aprobadas.");
    }
    await assertContractAdmitsCancel(tx, before, "deleteInvoice");
    const balanceChanges = await revalidateOnCancel(tx, before);

    await tx.tbl_invoices.update({
      where: { inv_id: before.inv_id },
      data: { sta_id: DELETED_STATUS, inv_delete_by: Number(useBy), inv_delete_at: new Date(), inv_update_by: Number(useBy) },
    });
    await writeAudit(tx, {
      entity: AUDIT_ENTITIES.INVOICE,
      recordId: before.inv_id,
      operation: AUDIT_OPERATIONS.DELETE,
      ctx,
      changes: [
        { field: "sta_id", oldValue: before.sta_id, newValue: DELETED_STATUS },
        { field: "observation", oldValue: null, newValue: observation },
        ...balanceChanges,
      ],
    });
    return { message: "Factura eliminada correctamente", invId: before.inv_id, ...(await liquidateIfComplete(tx, before, useBy, ctx)) };
  });
  return notifyIfLiquidated(result, known, useBy);
};
