import { prisma } from "../../../common/configs/prismaClient.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { decimal, moneyText, percentText, ratioPercent, sumMoney } from "../../../common/utils/money.utils.js";
import { addTerm, dateOnlyText, progressLevel, termProgress, toDateOnly, todayDateOnly } from "../../../common/utils/term.utils.js";
import { CONCEPT_SELECT } from "../../work/contracts/contracts.service.js";
import { WORK_STATE_NAMES } from "../../work/works/works.service.js";
import {
  CLOSED_STATES,
  CONCEPT_TYPE_NAMES,
  CONTRACT_STATES,
  STATE_NAMES as CONTRACT_STATE_NAMES,
  contractTotals,
  isEndDateProvisional,
  sortConcepts,
} from "../../work/contracts/contractTerms.js";
import {
  CONTRACT_POLICY_STATUS,
  CONTRACT_POLICY_STATUS_NAMES,
  POLICY_VALIDITY,
  POLICY_VALIDITY_NAMES,
  contractPolicyStatus,
  decidingPolicy,
  policyValidity,
  uncoveredConcepts,
} from "../../work/contracts/policyTerms.js";
import { INVOICE_STATES, INVOICE_TYPES, STATE_NAMES as INVOICE_STATE_NAMES, TYPE_NAMES as INVOICE_TYPE_NAMES } from "../../billing/invoices/invoiceTerms.js";
import { policyExpiringDays } from "../../admin/businessRules/businessRules.service.js";
import { contractBalances } from "../../billing/invoices/invoices.service.js";
import { openFollowUpsSummary } from "../../billing/invoices/invoiceFollowUps.service.js";
import { composeSimpleInvoice } from "../../billing/invoices/simpleInvoiceTerms.js";
import { BILLING_TYPES } from "../../billing/invoices/billingTerms.js";
import { CONTRACT_ADVANCE_FILTERS, matchesContractAdvance } from "../../billing/invoices/advanceFilters.js";

/**
 * Tablero de una obra (ADR-0002; propuesta B del tablero, DEC-063): la obra
 * elegida en el encabezado, con sus contratos, pólizas, facturas,
 * proveedores y etapas. Solo lectura y bajo demanda, como el tablero general
 * (DEC-052).
 *
 * - Solo con una obra concreta en el alcance (DEC-047). Con "Ver todo" o sin
 *   obra no hay nada que mostrar: `wrkId` en null y todos los bloques en null
 *   (el cliente muestra el tablero general).
 * - Cada bloque, solo si el usuario puede ver su módulo (decisión 8). Las
 *   facturas, solo las de las vistas que ve (DEC-054).
 * - Ninguna cifra se calcula en el cliente (FRONTEND_STANDARD, regla 9):
 *   valor vigente y totales con contractTotals, saldos de anticipo y de
 *   retenido con contractBalances (las mismas sumas del expediente y de la
 *   conciliación, DEC-061), vigencia y estado de pólizas con policyTerms.
 * - Las facturas anuladas no cuentan en las cifras (DEC-052, B7). La simple
 *   vale su total facturado (DEC-065); una registrada antes de DEC-065, sin
 *   importes, cuenta en las cantidades y no en los valores.
 */

const can = PERMISSIONS;
const DAY_MS = 86400000;
const notDeleted = { sta_id: { not: DELETED_STATUS } };
const LATEST_ROWS = 5;
const MONTHS = 12;

const pct = (part, whole) => percentText(ratioPercent(part, whole));
const ZERO_MONEY = decimal(0);
const daysBetween = (from, to) => Math.round((to.getTime() - from.getTime()) / DAY_MS);

// ─── Obra ────────────────────────────────────────────────────────────────────

/** Encabezado de la obra con el avance del plazo, sus responsables activos y sus etapas. */
const workBlock = async (wrkId, today) => {
  const row = await prisma.tbl_works.findFirst({
    where: { wrk_id: wrkId, ...notDeleted },
    select: {
      wrk_id: true,
      wrk_code: true,
      wrk_name: true,
      wrk_start_date: true,
      wrk_initial_term: true,
      wrk_term_unit: true,
      wrk_initial_value: true,
      wrk_extended_value: true,
      wrk_state: true,
      wrk_finish_date: true,
      sta_id: true,
      tbl_status: { select: { sta_name: true } },
      tbl_construction_companies: { select: { cnc_description: true } },
      tbl_contract_types: { select: { ctt_name: true } },
      tbl_supervision_types: { select: { spt_name: true } },
      tbl_work_managers: {
        where: { sta_id: ACTIVE_STATUS },
        select: { wkm_role: true, tbl_users: USER_NAME_SELECT },
        orderBy: { wkm_id: "asc" },
      },
      tbl_work_stages: {
        where: notDeleted,
        select: { wks_id: true, wks_name: true, sta_id: true },
        orderBy: [{ wks_order: "asc" }, { wks_name: "asc" }],
      },
    },
  });
  if (!row) return null;
  const endDate = addTerm(row.wrk_start_date, row.wrk_initial_term, row.wrk_term_unit);
  const progressPercent = termProgress(row.wrk_start_date, endDate, today);
  const end = toDateOnly(endDate);
  return {
    wrkId: row.wrk_id,
    code: row.wrk_code,
    name: row.wrk_name,
    staId: row.sta_id,
    statusName: row.tbl_status?.sta_name ?? null,
    // Ciclo de vida (DEC-083): finalizada, con los contratos que faltan por liquidar en contracts.toLiquidate.
    state: row.wrk_state,
    stateName: WORK_STATE_NAMES[row.wrk_state] ?? row.wrk_state,
    finishDate: dateOnlyText(row.wrk_finish_date),
    constructionCompany: row.tbl_construction_companies?.cnc_description ?? null,
    contractType: row.tbl_contract_types?.ctt_name ?? null,
    supervisionType: row.tbl_supervision_types?.spt_name ?? null,
    startDate: dateOnlyText(row.wrk_start_date),
    initialTerm: row.wrk_initial_term,
    termUnit: row.wrk_term_unit,
    endDate,
    progressPercent,
    progressLevel: progressLevel(progressPercent),
    // Días que faltan para la fecha final; negativos si ya pasó.
    remainingDays: end ? daysBetween(today, end) : null,
    initialValue: moneyText(row.wrk_initial_value),
    // Valor vigente: el ampliado cuando existe (ADR-0011, regla 7).
    currentValue: moneyText(row.wrk_extended_value ?? row.wrk_initial_value),
    extended: row.wrk_extended_value !== null,
    managers: row.tbl_work_managers.map((m) => ({ name: userFullName(m.tbl_users), role: m.wkm_role })),
    stages: row.tbl_work_stages.map((s) => ({ wksId: s.wks_id, name: s.wks_name, active: s.sta_id === ACTIVE_STATUS })),
  };
};

// ─── Contratos y pólizas ─────────────────────────────────────────────────────

// Lo que no está en un estado cerrado (liquidado o anulado) falta por liquidar (DEC-083).
const toLiquidateOf = (items) => {
  const open = items.filter((c) => !CLOSED_STATES.includes(c.state));
  return { count: open.length, value: moneyText(sumMoney(open.map((c) => c._value))), ctrIds: open.map((c) => c.ctrId) };
};

const conceptLabel = (concept) =>
  concept.ccp_number ? `${CONCEPT_TYPE_NAMES[concept.ccp_type]} N.º ${concept.ccp_number}` : CONCEPT_TYPE_NAMES[concept.ccp_type];

// `conceptLabels`: ccp_id → nombre del concepto que ampara (valor inicial u otrosí).
const policyDto = (policy, options, conceptLabels) => {
  const validity = policyValidity(policy.pol_end_date, options);
  return {
    polId: policy.pol_id,
    ctrId: policy.ctr_id,
    number: policy.pol_number,
    typeName: policy.tbl_policy_types?.plt_name ?? null,
    conceptLabel: conceptLabels.get(policy.ccp_id) ?? null,
    startDate: dateOnlyText(policy.pol_start_date),
    endDate: dateOnlyText(policy.pol_end_date),
    validity,
    validityName: POLICY_VALIDITY_NAMES[validity],
  };
};

// Peor vigencia primero; entre iguales, la que vence antes.
const VALIDITY_RANK = { [POLICY_VALIDITY.EXPIRED]: 0, [POLICY_VALIDITY.EXPIRING]: 1, [POLICY_VALIDITY.ACTIVE]: 2, [POLICY_VALIDITY.NO_DATE]: 3 };
const byUrgency = (a, b) => VALIDITY_RANK[a.validity] - VALIDITY_RANK[b.validity] || String(a.endDate ?? "9999").localeCompare(String(b.endDate ?? "9999"));

/**
 * Estado de pólizas de un contrato: la categoría del tablero general
 * (contractPolicyStatus: la póliza de mayor exposición, DEC-064), la póliza
 * que la decide y los conceptos sin póliza vigente (uncoveredConcepts).
 */
const contractPolicies = (concepts, policies, options, conceptLabels) => {
  const status = contractPolicyStatus(policies, concepts, options);
  const deciding = decidingPolicy(policies, concepts, options);
  return {
    status,
    statusName: CONTRACT_POLICY_STATUS_NAMES[status],
    deciding: deciding ? policyDto(deciding.policy, options, conceptLabels) : null,
    current: policies.length,
    uncovered: uncoveredConcepts(concepts.filter((c) => c.sta_id !== DELETED_STATUS), policies).map((c) => ({
      ccpId: c.ccp_id,
      label: conceptLabel(c),
    })),
  };
};

/**
 * Pólizas vigentes por vigencia (`policyValidity`) y contratos sin ninguna
 * póliza vigente (`contractPolicyStatus` NONE, la categoría del tablero
 * general, DEC-064). Todos los contratos de la obra, también los liquidados.
 */
const policyCounts = (policies, items, options) => {
  const counts = Object.fromEntries(Object.values(POLICY_VALIDITY).map((v) => [v, 0]));
  for (const policy of policies) counts[policyValidity(policy.pol_end_date, options)] += 1;
  return { ...counts, withoutPolicy: items.filter((c) => c.policies.status === CONTRACT_POLICY_STATUS.NONE).length };
};

// Nivel de una barra de anticipo, por su porcentaje: hasta 50 % (sin incluir), bajo; hasta 80 %, medio;
// hasta 100 % (incluido), alto; por encima, excedido.
export const ADVANCE_LEVELS = Object.freeze({ LOW: "LOW", MEDIUM: "MEDIUM", HIGH: "HIGH", EXCEEDED: "EXCEEDED" });
export const advanceLevel = (percent) => {
  const value = decimal(percent);
  if (value.gt(100)) return ADVANCE_LEVELS.EXCEEDED;
  if (value.gte(80)) return ADVANCE_LEVELS.HIGH;
  if (value.gte(50)) return ADVANCE_LEVELS.MEDIUM;
  return ADVANCE_LEVELS.LOW;
};

/**
 * Barra de anticipo: lo aprobado más lo por aprobar frente a `whole`. `pct`
 * (el total, que decide el nivel) puede pasar de 100: eso avisa que, si se
 * aprueba lo registrado, se excede; `approvedPct` es la parte aprobada sobre
 * la misma base.
 */
const advanceBar = (approved, pending, whole) => {
  const total = approved.plus(pending);
  const percent = ratioPercent(total, whole);
  return {
    approved: moneyText(approved),
    pending: moneyText(pending),
    total: moneyText(total),
    approvedPct: pct(approved, whole),
    pct: percentText(percent),
    level: advanceLevel(percent),
  };
};

/**
 * Saldos del contrato. `pending`: anticipo y amortización de sus facturas
 * registradas (por aprobar), que no mueven los saldos (DEC-044) y solo se
 * suman en las barras: facturado frente al anticipo pactado y amortizado
 * frente al anticipo facturado, los dos con lo por aprobar.
 */
const balancesOf = ({ advance, retention }, pending = { invoiced: ZERO_MONEY, amortized: ZERO_MONEY }) => ({
  advance: {
    agreed: moneyText(advance.agreed),
    invoiced: moneyText(advance.invoiced),
    amortized: moneyText(advance.amortized),
    toAmortize: moneyText(advance.toAmortize),
    invoicedPct: pct(advance.invoiced, advance.agreed),
    amortizedPct: pct(advance.amortized, advance.invoiced),
    bars: {
      invoiced: advanceBar(advance.invoiced, pending.invoiced, advance.agreed),
      amortized: advanceBar(advance.amortized, pending.amortized, advance.invoiced.plus(pending.invoiced)),
    },
    // Los filtros "Anticipo" del listado de contratos que cumple (DEC-079): el tablero filtra con el mismo criterio.
    filters: Object.values(CONTRACT_ADVANCE_FILTERS).filter((filter) =>
      filter === CONTRACT_ADVANCE_FILTERS.PENDING ? pending.invoiced.gt(0) || pending.amortized.gt(0) : matchesContractAdvance(filter, advance)
    ),
  },
  retention: {
    agreed: moneyText(retention.agreed),
    retained: moneyText(retention.retained),
    refunded: moneyText(retention.refunded),
    balance: moneyText(retention.balance),
  },
});

/**
 * Anticipo y amortización por aprobar de los contratos de la obra: las
 * facturas registradas de anticipo y de facturación (BILLING_TYPES), por
 * contrato. Map ctr_id → { invoiced, amortized }.
 */
const pendingAdvances = async (wrkId) => {
  const rows = await prisma.tbl_invoices.findMany({
    where: {
      wrk_id: wrkId,
      ...notDeleted,
      ctr_id: { not: null },
      inv_state: INVOICE_STATES.REGISTERED,
      inv_type: { in: [INVOICE_TYPES.ADVANCE, ...BILLING_TYPES] },
    },
    select: { ctr_id: true, tbl_invoice_advance_details: { select: { iad_value: true } }, tbl_invoice_liquidation_details: { select: { ild_amortization: true } } },
  });
  const byContract = new Map();
  for (const row of rows) {
    const entry = byContract.get(row.ctr_id) ?? { invoiced: ZERO_MONEY, amortized: ZERO_MONEY };
    byContract.set(row.ctr_id, {
      invoiced: entry.invoiced.plus(decimal(row.tbl_invoice_advance_details?.iad_value)),
      amortized: entry.amortized.plus(decimal(row.tbl_invoice_liquidation_details?.ild_amortization)),
    });
  }
  return byContract;
};

/**
 * Contratos no eliminados de la obra, con su valor vigente, sus saldos de
 * anticipo y de retenido y, si el usuario ve pólizas, su estado de pólizas.
 * Totales de la obra y conteo por estado del ciclo de vida.
 */
const contractsBlock = async (wrkId, { withPolicies, policyOptions, workValue }) => {
  const rows = await prisma.tbl_contracts.findMany({
    where: { wrk_id: wrkId, ...notDeleted },
    select: {
      ctr_id: true,
      wks_id: true,
      ctr_number: true,
      ctr_name: true,
      ctr_start_date: true,
      ctr_end_date: true,
      ctr_state: true,
      tbl_providers: { select: { prv_name: true } },
      tbl_work_stages: { select: { wks_name: true } },
      // El tipo de contrato es de la obra (DEC-086).
      tbl_works: { select: { tbl_contract_types: { select: { ctt_name: true } } } },
      tbl_contract_concepts: { select: CONCEPT_SELECT },
    },
    orderBy: [{ ctr_number: "asc" }, { ctr_id: "asc" }],
  });
  const conceptLabels = new Map(rows.flatMap((row) => row.tbl_contract_concepts.map((c) => [c.ccp_id, conceptLabel(c)])));

  const policies = withPolicies
    ? await prisma.tbl_policies.findMany({
        where: { pol_is_current: true, tbl_contracts: { wrk_id: wrkId, ...notDeleted } },
        select: {
          pol_id: true,
          ctr_id: true,
          ccp_id: true,
          pol_number: true,
          pol_base: true,
          pol_percentage: true,
          pol_start_date: true,
          pol_end_date: true,
          tbl_policy_types: { select: { plt_name: true } },
        },
        orderBy: [{ pol_end_date: "asc" }, { pol_id: "asc" }],
      })
    : [];

  // Las mismas sumas del expediente y de la conciliación (DEC-061): un
  // contrato por consulta, pocas por obra.
  const balances = await Promise.all(rows.map((row) => contractBalances(prisma, row.ctr_id)));
  const pending = await pendingAdvances(wrkId);

  const items = rows.map((row, i) => {
    const totals = contractTotals(row.tbl_contract_concepts);
    const own = policies.filter((p) => p.ctr_id === row.ctr_id);
    return {
      ctrId: row.ctr_id,
      wksId: row.wks_id,
      number: row.ctr_number,
      name: row.ctr_name,
      providerName: row.tbl_providers?.prv_name ?? null,
      stageName: row.tbl_work_stages?.wks_name ?? null,
      contractTypeName: row.tbl_works?.tbl_contract_types?.ctt_name ?? null,
      state: row.ctr_state,
      stateName: CONTRACT_STATE_NAMES[row.ctr_state] ?? row.ctr_state,
      startDate: dateOnlyText(row.ctr_start_date),
      endDate: dateOnlyText(row.ctr_end_date),
      endDateProvisional: isEndDateProvisional(row.ctr_state),
      currentValue: moneyText(totals.value),
      ...balancesOf(balances[i], pending.get(row.ctr_id)),
      policies: withPolicies ? contractPolicies(sortConcepts(row.tbl_contract_concepts), own, policyOptions, conceptLabels) : null,
      _value: totals.value,
      _balances: balances[i],
    };
  });

  const contracted = sumMoney(items.map((c) => c._value));
  const advanceInvoiced = sumMoney(balances.map((b) => b.advance.invoiced));
  const advanceAmortized = sumMoney(balances.map((b) => b.advance.amortized));
  const retained = sumMoney(balances.map((b) => b.retention.retained));
  const retentionBalance = sumMoney(balances.map((b) => b.retention.balance));

  const byState = Object.values(CONTRACT_STATES).map((state) => {
    const own = items.filter((c) => c.state === state);
    return {
      state,
      name: CONTRACT_STATE_NAMES[state],
      count: own.length,
      value: moneyText(sumMoney(own.map((c) => c._value))),
      countPct: pct(own.length, items.length),
    };
  });

  return {
    total: items.length,
    contracted: moneyText(contracted),
    // Lo contratado frente al valor vigente de la obra (solo si el usuario ve la obra).
    contractedPct: workValue ? pct(contracted, workValue) : null,
    advance: { invoiced: moneyText(advanceInvoiced), amortized: moneyText(advanceAmortized), amortizedPct: pct(advanceAmortized, advanceInvoiced) },
    retention: { retained: moneyText(retained), balance: moneyText(retentionBalance), balancePct: pct(retentionBalance, retained) },
    // Contratos por liquidar (DEC-083): ni liquidados ni anulados. El tablero los avisa en una obra finalizada.
    toLiquidate: toLiquidateOf(items),
    // Contratos con retenido por devolver (alerta de la obra).
    withRetentionBalance: items.filter((c) => c._balances.retention.balance.gt(0)).map((c) => ({ ctrId: c.ctrId, number: c.number, balance: c.retention.balance, stateName: c.stateName })),
    byState,
    items: items.map(({ _value, _balances, ...dto }) => dto),
    // Pólizas vigentes de la obra, de la más urgente a la que menos (línea de tiempo, alertas y pestaña Pólizas).
    policies: withPolicies ? policies.map((p) => policyDto(p, policyOptions, conceptLabels)).sort(byUrgency) : null,
    // Cifras de la pestaña Pólizas: pólizas vigentes por vigencia y contratos sin ninguna (NONE).
    policyCounts: withPolicies ? policyCounts(policies, items, policyOptions) : null,
  };
};

// ─── Facturas ────────────────────────────────────────────────────────────────

const INVOICE_SELECT = {
  inv_id: true,
  inv_type: true,
  pvt_id: true,
  tbl_provider_types: { select: { pvt_name: true } },
  ctr_id: true,
  inv_number: true,
  inv_date: true,
  inv_state: true,
  tbl_providers: { select: { prv_name: true } },
  tbl_contracts: { select: { ctr_number: true } },
  tbl_invoice_advance_details: { select: { iad_value: true } },
  tbl_invoice_liquidation_details: { select: { ild_value: true, ild_amortization: true } },
  tbl_invoice_retention_refund_details: { select: { irr_value: true } },
  tbl_invoice_simple_details: true,
};

/**
 * Valor de la factura según su tipo: el capturado en las de contrato y el
 * total facturado en la simple (DEC-065: el valor del documento, no el neto
 * a pagar). null una simple registrada antes de DEC-065, sin importes.
 */
const invoiceValue = (row) =>
  row.tbl_invoice_advance_details?.iad_value ??
  row.tbl_invoice_liquidation_details?.ild_value ??
  row.tbl_invoice_retention_refund_details?.irr_value ??
  (row.tbl_invoice_simple_details ? composeSimpleInvoice(row.tbl_invoice_simple_details).billed : null);

const invoiceDto = (row) => ({
  invId: row.inv_id,
  // Menú de la factura (DEC-074): el cliente arma con él su dirección.
  pvtId: row.pvt_id,
  ctrId: row.ctr_id,
  contractNumber: row.tbl_contracts?.ctr_number ?? null,
  type: row.inv_type,
  typeName: INVOICE_TYPE_NAMES[row.inv_type] ?? row.inv_type,
  number: row.inv_number,
  date: dateOnlyText(row.inv_date),
  state: row.inv_state,
  stateName: INVOICE_STATE_NAMES[row.inv_state] ?? row.inv_state,
  providerName: row.tbl_providers?.prv_name ?? null,
  value: moneyText(invoiceValue(row)),
  // Amortización de anticipo de la normal y la liquidación (DEC-044): el detalle de la barra "Amortizado".
  amortization: moneyText(row.tbl_invoice_liquidation_details?.ild_amortization ?? null),
});

/** Los `MONTHS` meses que terminan en el de la fecha de referencia, como "AAAA-MM". */
const monthKeys = (today) =>
  Array.from({ length: MONTHS }, (_, i) => {
    const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - (MONTHS - 1 - i), 1));
    return d.toISOString().slice(0, 7);
  });

const TYPE_ORDER = [INVOICE_TYPES.ADVANCE, INVOICE_TYPES.NORMAL, INVOICE_TYPES.LIQUIDATION, INVOICE_TYPES.RETENTION_REFUND, INVOICE_TYPES.SIMPLE];

/**
 * Facturas de la obra, de todos los menús: aprobadas y por aprobar, últimas
 * registradas y, sin las anuladas, por mes, por tipo y por contrato. Los
 * valores son los que se capturan por tipo (DEC-044, DEC-051). Y los
 * seguimientos abiertos (DEC-076), para el aviso y su detalle.
 */
const invoicesBlock = async (wrkId, today) => {
  const where = { wrk_id: wrkId, ...notDeleted };
  const [rows, latest, followUps] = await Promise.all([
    prisma.tbl_invoices.findMany({
      where: { ...where, inv_state: { in: [INVOICE_STATES.REGISTERED, INVOICE_STATES.APPROVED] } },
      select: INVOICE_SELECT,
      orderBy: [{ inv_date: "asc" }, { inv_id: "asc" }],
    }),
    prisma.tbl_invoices.findMany({ where, select: INVOICE_SELECT, orderBy: [{ inv_create_at: "desc" }, { inv_id: "desc" }], take: LATEST_ROWS }),
    openFollowUpsSummary({ invoiceWhere: { wrk_id: wrkId }, today }),
  ]);

  const approved = rows.filter((r) => r.inv_state === INVOICE_STATES.APPROVED);
  const pending = rows.filter((r) => r.inv_state === INVOICE_STATES.REGISTERED);
  const sum = (list) => sumMoney(list.map(invoiceValue));
  const total = sum(rows);

  const keys = monthKeys(today);
  const byMonth = keys.map((month) => {
    const own = rows.filter((r) => dateOnlyText(r.inv_date).startsWith(month));
    const ownApproved = own.filter((r) => r.inv_state === INVOICE_STATES.APPROVED);
    const ownPending = own.filter((r) => r.inv_state === INVOICE_STATES.REGISTERED);
    return { month, approved: moneyText(sum(ownApproved)), registered: moneyText(sum(ownPending)), count: own.length };
  });

  const byType = TYPE_ORDER.map((type) => {
    const own = rows.filter((r) => r.inv_type === type);
    const value = sum(own);
    // Sin ningún importe (simples anteriores a DEC-065), el valor es null y no 0.
    const priced = own.some((r) => invoiceValue(r) !== null);
    return { type, name: INVOICE_TYPE_NAMES[type], count: own.length, value: priced ? moneyText(value) : null, pct: pct(value, total) };
  }).filter((t) => t.count > 0);

  const contracts = new Map();
  for (const row of rows.filter((r) => r.ctr_id)) {
    const entry = contracts.get(row.ctr_id) ?? { ctrId: row.ctr_id, number: row.tbl_contracts?.ctr_number ?? null, rows: [] };
    entry.rows.push(row);
    contracts.set(row.ctr_id, entry);
  }
  const byContract = [...contracts.values()].map((entry) => ({
    ctrId: entry.ctrId,
    number: entry.number,
    total: moneyText(sum(entry.rows)),
    pending: moneyText(sum(entry.rows.filter((r) => r.inv_state === INVOICE_STATES.REGISTERED))),
    byType: TYPE_ORDER.map((type) => {
      const own = entry.rows.filter((r) => r.inv_type === type);
      return { type, name: INVOICE_TYPE_NAMES[type], count: own.length, value: moneyText(sum(own)) };
    }).filter((t) => t.count > 0),
  }));

  // Por aprobar por menú (DEC-074), por nombre, para el enlace a su listado.
  const menus = new Map();
  for (const row of pending) {
    const entry = menus.get(row.pvt_id) ?? { pvtId: row.pvt_id, name: row.tbl_provider_types?.pvt_name ?? null, count: 0 };
    entry.count += 1;
    menus.set(row.pvt_id, entry);
  }
  const pendingByMenu = [...menus.values()].sort((a, b) => String(a.name).localeCompare(String(b.name), "es"));
  return {
    approvedCount: approved.length,
    approvedValue: moneyText(sum(approved)),
    pendingCount: pending.length,
    pendingValue: moneyText(sum(pending)),
    pendingByMenu,
    followUps,
    pending: pending.slice(-LATEST_ROWS).reverse().map(invoiceDto),
    total: moneyText(total),
    count: rows.length,
    byMonth,
    byType,
    byContract,
    latest: latest.map(invoiceDto),
    // Las filas de las que salen las cifras: la línea de tiempo marca las de
    // contrato y el detalle de cada cifra las filtra con el mismo criterio.
    items: rows.map(invoiceDto),
  };
};

// ─── Proveedores ─────────────────────────────────────────────────────────────

/** Proveedores asignados a la obra (DEC-031), con los números de sus contratos en ella. */
const providersBlock = async (wrkId) => {
  const rows = await prisma.tbl_work_providers.findMany({
    where: { wrk_id: wrkId, ...notDeleted },
    select: {
      prv_id: true,
      wkp_assignment_date: true,
      wkp_observation: true,
      sta_id: true,
      tbl_status: { select: { sta_name: true } },
      tbl_providers: { select: { prv_name: true } },
      tbl_contracts: { where: notDeleted, select: { ctr_number: true }, orderBy: { ctr_number: "asc" } },
    },
    orderBy: [{ sta_id: "asc" }, { wkp_assignment_date: "asc" }],
  });
  return rows.map((row) => ({
    prvId: row.prv_id,
    name: row.tbl_providers?.prv_name ?? null,
    assignmentDate: dateOnlyText(row.wkp_assignment_date),
    observation: row.wkp_observation,
    staId: row.sta_id,
    statusName: row.tbl_status?.sta_name ?? null,
    contracts: row.tbl_contracts.map((c) => c.ctr_number),
  }));
};

// ─── Resumen ─────────────────────────────────────────────────────────────────

/** Tablero de la obra del alcance para el usuario (`granted`: permisos efectivos). */
export const getWorkDashboard = async ({ granted, scope }) => {
  const today = todayDateOnly();
  const days = await policyExpiringDays();
  const base = { referenceDate: dateOnlyText(today), expiringDays: days };
  const wrkId = !scope?.all && scope?.wrkId ? Number(scope.wrkId) : null;
  if (!wrkId) return { ...base, wrkId: null, work: null, contracts: null, invoices: null, providers: null };

  const has = (perId) => granted.has(perId);
  const see = {
    works: has(can.work.works.view),
    providers: has(can.work.providers.view),
    contracts: has(can.work.contracts.view),
    // El estado de pólizas es de contratos: exige ver los dos (DEC-052).
    policies: has(can.work.contracts.view) && has(can.work.policies.view),
    invoices: has(can.billing.invoices.view),
  };

  const work = see.works ? await workBlock(wrkId, today) : null;
  const [contracts, invoices, providers] = await Promise.all([
    see.contracts
      ? contractsBlock(wrkId, { withPolicies: see.policies, policyOptions: { today, days }, workValue: work ? decimal(work.currentValue) : null })
      : null,
    see.invoices ? invoicesBlock(wrkId, today) : null,
    see.providers ? providersBlock(wrkId) : null,
  ]);

  // Lo facturado aprobado frente a lo contratado: solo si el usuario ve los dos.
  if (invoices) invoices.approvedPct = contracts ? pct(invoices.approvedValue, contracts.contracted) : null;

  return { ...base, wrkId, work, contracts, invoices, providers };
};
