import { prisma } from "../../../common/configs/prismaClient.js";
import { DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { findExportRows, renderDocument, renderExport } from "../../../common/services/export.service.js";
import { conceptAmounts, contractTotals, CONCEPT_TYPES, CONCEPT_TYPE_NAMES, REPORT_GROUPS, STATE_NAMES, sortConcepts } from "./contractTerms.js";
import { moneyText, percentText, ratioPercent, sumMoney } from "../../../common/utils/money.utils.js";
import { CONCEPT_SELECT, contractListQuery, exportFilterLines, getContract } from "./contracts.service.js";
import { getContractPolicies } from "./contractPolicies.service.js";
import { contractBalances, contractInvoicesForReport, contractsBalances } from "../../billing/invoices/invoices.service.js";
import { INVOICE_STATES } from "../../billing/invoices/invoiceTerms.js";
import { isContractMode } from "../../billing/invoices/invoiceMenus.js";
import { insuredValue, POLICY_BASE_NAMES } from "../../admin/policyTypes/policyBases.js";
import { policyExpiringDays } from "../../admin/businessRules/businessRules.service.js";
import { dateOnlyText, todayDateOnly } from "../../../common/utils/term.utils.js";
import { POLICY_VALIDITY_NAMES, policyCoversTerm, policyValidity } from "./policyTerms.js";

/**
 * Reportes de control de contratos (DEC-070), los del sistema que se migra
 * (`docs/backlog/reports`): control de contratos y control de anticipos y
 * retenidos. Toman los contratos del listado con sus filtros, pestaña,
 * búsqueda, orden y alcance (`contractListQuery`), sin paginar.
 *
 * Las cifras salen de las reglas que ya existen: valor de cada concepto con
 * conceptAmounts, total con contractTotals y saldos con las mismas funciones
 * de contractBalances (DEC-044, DEC-051). "Pagado" es la suma de las facturas
 * aprobadas del contrato, también las normales (el avance, DEC-071).
 *
 * Las cifras de facturas salen solo si el usuario puede ver facturas
 * (DEC-074); si no, van vacías y el encabezado lo dice.
 */

export const CONTRACT_REPORTS = Object.freeze({ CONTROL: "control", ADVANCES: "advances", POLICIES: "policies" });

const REPORT_SELECT = {
  ctr_id: true,
  ctr_number: true,
  ctr_name: true,
  ctr_state: true,
  tbl_works: { select: { wrk_code: true, wrk_name: true } },
  tbl_providers: { select: { prv_name: true } },
  tbl_contract_concepts: { select: CONCEPT_SELECT },
};

// Los contratos de las filas de un grupo (un contrato puede ocupar varias filas, una por concepto).
const contractsOfRows = (rows) => [...new Map(rows.map((row) => [row.key, row])).values()];

const conceptLabel = (concept) =>
  concept.ccp_type === CONCEPT_TYPES.AMENDMENT ? `Otrosí N.º ${concept.ccp_number}` : CONCEPT_TYPE_NAMES[concept.ccp_type];

const pct = (part, whole) => percentText(ratioPercent(part, whole));

// Datos del contrato comunes a los dos reportes.
const contractOf = (row, balances, visible) => ({
  key: row.ctr_id,
  number: row.ctr_number,
  name: row.ctr_name,
  workCode: row.tbl_works?.wrk_code ?? null,
  workName: row.tbl_works?.wrk_name ?? null,
  providerName: row.tbl_providers?.prv_name ?? null,
  stateName: STATE_NAMES[row.ctr_state] ?? row.ctr_state,
  total: contractTotals(row.tbl_contract_concepts).value,
  balances: visible ? balances : null,
});

const CONTRACT_COLUMNS = [
  { header: "Nro. contrato", value: (r) => r.number, group: true },
  { header: "Objeto del contrato", value: (r) => r.name, width: 2, group: true },
  { header: "Contratista", value: (r) => r.providerName, width: 1.6, group: true },
  { header: "Obra", value: (r) => r.workCode, group: true },
];

const money = (value) => (value === null || value === undefined ? null : moneyText(value));

// Control de contratos: una fila por concepto vigente, con lo del contrato agrupado.
const CONTROL_COLUMNS = [
  ...CONTRACT_COLUMNS,
  { header: "Tipo valor", value: (r) => r.conceptLabel, width: 1.1 },
  { header: "Valor con IVA", value: (r) => money(r.conceptValue), kind: "money", width: 1.2 },
  { header: "Total contrato", value: (r) => money(r.total), kind: "money", width: 1.2, group: true },
  { header: "Vr. pagado", value: (r) => money(r.balances?.paid), kind: "money", width: 1.2, group: true },
  { header: "% pagado", value: (r) => (r.balances ? pct(r.balances.paid, r.total) : null), kind: "percent", width: 0.8, group: true },
  { header: "Estado", value: (r) => r.stateName, group: true },
];

const controlRows = (contracts) =>
  contracts.flatMap((contract) =>
    sortConcepts(contract.concepts)
      .filter((concept) => concept.sta_id !== DELETED_STATUS)
      .map((concept) => ({ ...contract, conceptLabel: conceptLabel(concept), conceptValue: conceptAmounts(concept).value }))
  );

const controlTotals = (contracts) => {
  const total = sumMoney(contracts.map((c) => c.total));
  const paid = sumMoney(contracts.map((c) => c.balances?.paid));
  return { number: "TOTALES", conceptValue: total, total, balances: { paid } };
};

// Anticipos y retenidos: una fila por contrato.
const ADVANCE_COLUMNS = [
  ...CONTRACT_COLUMNS,
  { header: "Anticipo pactado", value: (r) => money(r.balances?.advance.agreed), kind: "money", width: 1.2 },
  { header: "Anticipo facturado", value: (r) => money(r.balances?.advance.invoiced), kind: "money", width: 1.2 },
  { header: "Amortizado", value: (r) => money(r.balances?.advance.amortized), kind: "money", width: 1.2 },
  { header: "Falta por amortizar", value: (r) => money(r.balances?.advance.toAmortize), kind: "money", width: 1.2 },
  { header: "Retenido", value: (r) => money(r.balances?.retention.retained), kind: "money", width: 1.2 },
  { header: "Devolución de retenido", value: (r) => money(r.balances?.retention.refunded), kind: "money", width: 1.2 },
  { header: "Pendiente por devolver", value: (r) => money(r.balances?.retention.balance), kind: "money", width: 1.2 },
];

const advanceTotals = (contracts) => {
  const sum = (pick) => sumMoney(contracts.filter((c) => c.balances).map((c) => pick(c.balances)));
  return {
    number: "TOTALES",
    balances: {
      advance: {
        agreed: sum((b) => b.advance.agreed),
        invoiced: sum((b) => b.advance.invoiced),
        amortized: sum((b) => b.advance.amortized),
        toAmortize: sum((b) => b.advance.toAmortize),
      },
      retention: {
        retained: sum((b) => b.retention.retained),
        refunded: sum((b) => b.retention.refunded),
        balance: sum((b) => b.retention.balance),
      },
    },
  };
};

const REPORTS = Object.freeze({
  [CONTRACT_REPORTS.CONTROL]: {
    title: "Control de contratos",
    note: "Vr. pagado: facturas aprobadas del contrato (anticipo, normales, liquidación y devolución de retenido).",
    columns: CONTROL_COLUMNS,
    rows: controlRows,
    totals: controlTotals,
  },
  [CONTRACT_REPORTS.ADVANCES]: {
    title: "Control de anticipos y retenidos",
    note: "Saldos con las facturas aprobadas del contrato.",
    columns: ADVANCE_COLUMNS,
    rows: (contracts) => contracts,
    totals: advanceTotals,
  },
});

/**
 * Reporte de control en Excel o PDF. `seesInvoices`: el usuario puede ver
 * facturas (DEC-074).
 */
export const exportContractReport = async ({ report, format, seesInvoices, ...filters }) => {
  const spec = REPORTS[report];
  if (!spec) throw Object.assign(new Error("El reporte no existe."), { statusCode: 400 });
  const { where, orderBy } = await contractListQuery(filters);
  const rows = await findExportRows(prisma.tbl_contracts, { where, select: REPORT_SELECT, orderBy });
  const balances = await contractsBalances(rows);
  const contracts = rows.map((row) => ({ ...contractOf(row, balances.get(row.ctr_id), seesInvoices), concepts: row.tbl_contract_concepts }));
  const hidden = contracts.filter((c) => !c.balances).length;
  const notes = [spec.note, hidden ? `Sin acceso a las facturas de ${hidden} contrato(s): sus cifras de facturación van vacías.` : null];
  return renderExport({
    format,
    title: spec.title,
    filters: [...(await exportFilterLines(filters)), ...notes.filter(Boolean)],
    columns: spec.columns,
    rows: spec.rows(contracts),
    groupKey: (row) => row.key,
    // La obra arriba y los contratos por proveedor, con su subtotal (formato del sistema que se migra).
    rowGroups: { ...REPORT_GROUPS, column: "Contratista", subtotal: (own) => ({ ...spec.totals(contractsOfRows(own)), number: "Subtotal" }) },
    totals: spec.totals(contracts),
  });
};

// ─── Control de pólizas ──────────────────────────────────────────────────────

const POLICY_REPORT_SELECT = {
  ctr_id: true,
  ctr_number: true,
  ctr_name: true,
  ctr_state: true,
  ctr_end_date: true,
  tbl_works: { select: { wrk_code: true, wrk_name: true } },
  tbl_providers: { select: { prv_name: true } },
  tbl_contract_concepts: { select: CONCEPT_SELECT },
  tbl_policies: {
    where: { pol_is_current: true },
    select: {
      ccp_id: true,
      pol_number: true,
      pol_base: true,
      pol_percentage: true,
      pol_start_date: true,
      pol_end_date: true,
      tbl_policy_types: { select: { plt_name: true } },
      tbl_insurers: { select: { ins_description: true } },
    },
    orderBy: [{ ccp_id: "asc" }, { pol_id: "asc" }],
  },
};

const POLICY_REPORT_COLUMNS = [
  ...CONTRACT_COLUMNS,
  { header: "Fin del contrato", value: (r) => r.contractEndDate, kind: "date", group: true },
  { header: "Concepto", value: (r) => r.conceptLabel, width: 1.1 },
  { header: "Tipo de póliza", value: (r) => r.typeName, width: 1.3 },
  { header: "Aseguradora", value: (r) => r.insurerName, width: 1.3 },
  { header: "Número", value: (r) => r.policyNumber },
  { header: "Base", value: (r) => r.baseName },
  { header: "%", value: (r) => r.percentage, kind: "percent", width: 0.6 },
  { header: "Valor asegurado", value: (r) => r.insuredValue, kind: "money", width: 1.2 },
  { header: "Inicio", value: (r) => r.startDate, kind: "date" },
  { header: "Fin", value: (r) => r.endDate, kind: "date" },
  { header: "Vigencia", value: (r) => r.validityName },
  { header: "Cubre el plazo", value: (r) => r.coversTermName, width: 0.8 },
];

// policyCoversTerm: true, false o null (sin fecha de la póliza o del contrato).
const coversTermName = (covers) => (covers === null ? "Sin fecha" : covers ? "Sí" : "No");

/**
 * Una fila por póliza vigente de cada contrato, con su valor asegurado
 * (insuredValue sobre la composición vigente del concepto), su vigencia contra
 * la fecha del servidor y si cubre el plazo del contrato (policyCoversTerm), y
 * una fila "Sin póliza vigente" por concepto sin ninguna: las mismas reglas del
 * expediente (ADR-0018, DEC-050).
 */
const policyRows = (row, { today, days }) => {
  const base = {
    key: row.ctr_id,
    number: row.ctr_number,
    name: row.ctr_name,
    workCode: row.tbl_works?.wrk_code ?? null,
    workName: row.tbl_works?.wrk_name ?? null,
    providerName: row.tbl_providers?.prv_name ?? null,
    contractEndDate: dateOnlyText(row.ctr_end_date),
  };
  const concepts = sortConcepts(row.tbl_contract_concepts).filter((c) => c.sta_id !== DELETED_STATUS);
  return concepts.flatMap((concept) => {
    const own = row.tbl_policies.filter((p) => p.ccp_id === concept.ccp_id);
    if (own.length === 0) return [{ ...base, conceptLabel: conceptLabel(concept), typeName: "Sin póliza vigente" }];
    const amounts = conceptAmounts(concept);
    return own.map((policy) => ({
      ...base,
      conceptLabel: conceptLabel(concept),
      typeName: policy.tbl_policy_types?.plt_name ?? null,
      insurerName: policy.tbl_insurers?.ins_description ?? null,
      policyNumber: policy.pol_number,
      baseName: POLICY_BASE_NAMES[policy.pol_base] ?? policy.pol_base,
      percentage: percentText(policy.pol_percentage),
      insuredValue: moneyText(insuredValue(policy.pol_base, policy.pol_percentage, amounts)),
      startDate: dateOnlyText(policy.pol_start_date),
      endDate: dateOnlyText(policy.pol_end_date),
      validityName: POLICY_VALIDITY_NAMES[policyValidity(policy.pol_end_date, { today, days })],
      coversTermName: coversTermName(policyCoversTerm(policy.pol_end_date, row.ctr_end_date)),
    }));
  });
};

/**
 * Reporte de control de pólizas en Excel o PDF: los contratos del listado con
 * sus filtros y su alcance (contractListQuery), sin paginar. Quien llama
 * verifica el permiso de ver pólizas.
 */
export const exportPolicyReport = async ({ format, ...filters }) => {
  const { where, orderBy } = await contractListQuery(filters);
  const [rows, days] = await Promise.all([
    findExportRows(prisma.tbl_contracts, { where, select: POLICY_REPORT_SELECT, orderBy }),
    policyExpiringDays(),
  ]);
  const today = todayDateOnly();
  const lines = rows.flatMap((row) => policyRows(row, { today, days }));
  const note = `Pólizas vigentes de cada contrato; vigencia a la fecha del servidor, "a vencer" dentro de ${days} días. Cubre el plazo: termina el día de la fecha fin del contrato o después.`;
  return renderExport({
    format,
    title: "Control de pólizas",
    filters: [...(await exportFilterLines(filters)), note],
    columns: POLICY_REPORT_COLUMNS,
    rows: lines,
    groupKey: (row) => row.key,
    rowGroups: { ...REPORT_GROUPS, column: "Contratista", subtotal: (own) => ({ number: "Subtotal", insuredValue: moneyText(sumMoney(own.map((l) => l.insuredValue))) }) },
    totals: { number: "TOTAL ASEGURADO", insuredValue: moneyText(sumMoney(lines.map((l) => l.insuredValue))) },
  });
};

// ─── Reporte de un contrato ──────────────────────────────────────────────────

const TERM_UNIT_NAMES = Object.freeze({ DIA: "día(s)", MES: "mes(es)", ANIO: "año(s)" });
const ORIGIN_NAMES = Object.freeze({ AUTOMATIC: "Automática", MANUAL: "Manual" });

// Fecha y hora de un registro, en la zona del negocio.
const dateTime = (value) =>
  value ? new Intl.DateTimeFormat("es-CO", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Bogota" }).format(new Date(value)) : null;
const authored = (at, by) => [dateTime(at), by].filter(Boolean).join(" · ") || null;
const field = (label, value, kind) => ({ label, value: value ?? null, kind });

const contractFields = (c) => [
  field("Número", c.number),
  field("Objeto", c.name),
  field("Obra", [c.workCode, c.workName].filter(Boolean).join(" — ")),
  field("Etapa", c.stageName),
  field("Proveedor", [c.providerName, c.providerIdentification].filter(Boolean).join(" · ")),
  field("Tipo de proveedor", c.providerTypeName),
  field("Tipo de contrato", c.contractType),
  // El menú de sus facturas es su tipo de proveedor (DEC-074).
  field("Menú de facturas", isContractMode(c.invoiceMode) ? c.providerTypeName : "No admite facturas"),
  field("Estado", c.stateName),
  field("Fecha de inicio", c.startDate),
  field("Plazo", c.term !== null && c.term !== undefined ? `${c.term} ${TERM_UNIT_NAMES[c.termUnit] ?? c.termUnit}` : null),
  field("Prórrogas", c.totalExtensions ? `${c.totalExtensions} día(s)` : "Ninguna"),
  field("Días suspendido", String(c.suspendedDays ?? 0)),
  field("Fecha fin", c.endDate && c.endDateProvisional ? `${c.endDate} (provisional)` : c.endDate),
  field("AIU solicitado", c.aiuRequested ? "Sí" : "No"),
  field("Observaciones", c.observation),
  field("Creado", authored(c.createdAt, c.createdByName)),
  field("Modificado", authored(c.updatedAt, c.updatedByName)),
];

const valueFields = (c) => [
  field("Base antes de IVA", c.base, "money"),
  field("IVA", c.vat, "money"),
  field("Valor vigente", c.currentValue, "money"),
  field("Anticipo pactado", c.advance, "money"),
  field("Retenido pactado", c.retention, "money"),
];

const balanceFields = ({ advance, retention }, paid) => [
  field("Facturado aprobado", moneyText(paid), "money"),
  field("Anticipo pactado", moneyText(advance.agreed), "money"),
  field("Anticipo facturado", moneyText(advance.invoiced), "money"),
  field("Anticipo por facturar", moneyText(advance.toInvoice), "money"),
  field("Amortizado", moneyText(advance.amortized), "money"),
  field("Falta por amortizar", moneyText(advance.toAmortize), "money"),
  field("Retenido pactado", moneyText(retention.agreed), "money"),
  field("Retenido", moneyText(retention.retained), "money"),
  field("Devolución de retenido", moneyText(retention.refunded), "money"),
  field("Pendiente por devolver", moneyText(retention.balance), "money"),
];

const CONCEPT_COLUMNS = [
  { header: "Concepto", value: (r) => (r.type === CONCEPT_TYPES.AMENDMENT ? `Otrosí N.º ${r.number}` : r.typeName), width: 1.2 },
  { header: "Inicio", value: (r) => r.startDate, kind: "date" },
  { header: "Descripción", value: (r) => r.description, width: 1.6 },
  { header: "Costo directo", value: (r) => r.directCost, kind: "money", width: 1.2 },
  { header: "% A", value: (r) => r.adminPct, kind: "percent", width: 0.6 },
  { header: "% I", value: (r) => r.contingencyPct, kind: "percent", width: 0.6 },
  { header: "% U", value: (r) => r.profitPct, kind: "percent", width: 0.6 },
  { header: "% IVA", value: (r) => r.vatPct, kind: "percent", width: 0.6 },
  { header: "IVA", value: (r) => r.vat, kind: "money", width: 1.1 },
  { header: "Valor", value: (r) => r.value, kind: "money", width: 1.2 },
  { header: "Anticipo", value: (r) => r.advance, kind: "money", width: 1.1 },
  { header: "Retenido", value: (r) => r.retention, kind: "money", width: 1.1 },
  { header: "Prórroga (días)", value: (r) => r.extension, width: 0.7 },
  { header: "Valor acumulado", value: (r) => r.cumulativeValue, kind: "money", width: 1.2 },
];

const POLICY_COLUMNS = [
  { header: "Concepto", value: (r) => r.conceptLabel, width: 1.1 },
  { header: "Tipo", value: (r) => r.typeName, width: 1.3 },
  { header: "Aseguradora", value: (r) => r.insurerName, width: 1.3 },
  { header: "Número", value: (r) => r.number },
  { header: "Base", value: (r) => r.baseName },
  { header: "%", value: (r) => r.percentage, kind: "percent", width: 0.6 },
  { header: "Valor asegurado", value: (r) => r.insuredValue, kind: "money", width: 1.2 },
  { header: "Inicio", value: (r) => r.startDate, kind: "date" },
  { header: "Fin", value: (r) => r.endDate, kind: "date" },
  { header: "Vigencia", value: (r) => r.validityName },
  { header: "Estado", value: (r) => r.statusName, width: 0.8 },
  { header: "Versión", value: (r) => r.version, width: 0.6 },
];

const INVOICE_COLUMNS = [
  { header: "Número", value: (r) => r.number },
  { header: "Tipo", value: (r) => r.typeName },
  { header: "Fecha", value: (r) => r.date, kind: "date" },
  { header: "Aprobada el", value: (r) => r.approvalDate, kind: "date" },
  { header: "Extracto", value: (r) => r.statement },
  { header: "Valor", value: (r) => r.value, kind: "money", width: 1.2 },
  { header: "Amortización", value: (r) => r.amortization, kind: "money", width: 1.2 },
  { header: "Retenido", value: (r) => r.retention, kind: "money", width: 1.2 },
  { header: "Estado", value: (r) => r.stateName },
];

const SUSPENSION_COLUMNS = [
  { header: "Fecha", value: (r) => r.suspensionDate, kind: "date" },
  { header: "Motivo", value: (r) => r.reasonName, width: 1.3 },
  { header: "Condición de levantamiento", value: (r) => r.liftCondition, width: 1.8 },
  { header: "Informe de interventoría", value: (r) => (r.requiresReport ? "Sí" : "No"), width: 0.8 },
  { header: "Levantada el", value: (r) => r.liftDate ?? "Abierta", kind: "date" },
  { header: "Otrosí", value: (r) => (r.amendmentNumber ? `N.º ${r.amendmentNumber}` : null), width: 0.7 },
  { header: "Días", value: (r) => r.days, width: 0.6 },
  { header: "Observación", value: (r) => r.observation, width: 1.8 },
];

const HISTORY_COLUMNS = [
  { header: "Fecha", value: (r) => dateTime(r.createdAt), width: 1.2 },
  { header: "De", value: (r) => r.fromStateName ?? "—" },
  { header: "A", value: (r) => r.toStateName },
  { header: "Origen", value: (r) => ORIGIN_NAMES[r.origin] ?? r.origin, width: 0.8 },
  { header: "Motivo", value: (r) => r.reasonName, width: 1.2 },
  { header: "Observación", value: (r) => r.observation, width: 2 },
  { header: "Usuario", value: (r) => r.createdByName, width: 1.2 },
];

/**
 * Reporte de un contrato en Excel o PDF: el expediente completo. Datos,
 * valor y conceptos; saldos de anticipo y retenido y sus facturas, si el
 * usuario puede ver facturas (`seesInvoices`, DEC-074); pólizas,
 * si puede verlas (`canViewPolicies`); suspensiones e historial de estado.
 * Cada parte sale de la misma función que la pantalla, con el alcance por
 * obra (404 fuera, DEC-047).
 */
export const exportContractSummary = async ({ ctrId, format, scope, seesInvoices, canViewPolicies }) => {
  const contract = await getContract({ ctrId, scope });
  const [policies, balances, invoices] = await Promise.all([
    canViewPolicies ? getContractPolicies({ ctrId, scope }) : null,
    seesInvoices ? contractBalances(prisma, contract.ctrId) : null,
    seesInvoices ? contractInvoicesForReport({ ctrId: contract.ctrId }) : null,
  ]);
  const approvedTotal = moneyText(sumMoney((invoices ?? []).filter((i) => i.state === INVOICE_STATES.APPROVED).map((i) => i.value)));
  const concepts = contract.concepts.filter((c) => c.staId !== DELETED_STATUS);

  const sections = [
    { title: "Datos del contrato", fields: contractFields(contract) },
    { title: "Valor", fields: valueFields(contract) },
    balances && { title: "Saldos de anticipo y retenido", fields: balanceFields(balances, approvedTotal) },
    { title: "Conceptos", columns: CONCEPT_COLUMNS, rows: concepts, empty: "El contrato no tiene conceptos." },
    policies && { title: "Pólizas", columns: POLICY_COLUMNS, rows: policies.policies, empty: "El contrato no tiene pólizas." },
    invoices && {
      title: "Facturas",
      columns: INVOICE_COLUMNS,
      rows: invoices,
      totals: invoices.length ? { number: "Total aprobado", value: approvedTotal } : null,
      empty: "El contrato no tiene facturas.",
    },
    { title: "Suspensiones", columns: SUSPENSION_COLUMNS, rows: contract.suspensions, empty: "El contrato no ha tenido suspensiones." },
    { title: "Historial de estado", columns: HISTORY_COLUMNS, rows: contract.history, empty: "Sin cambios de estado." },
  ].filter(Boolean);

  const omitted = [!canViewPolicies && "pólizas (sin permiso de verlas)", !seesInvoices && "saldos y facturas (sin acceso a su vista de facturas)"].filter(
    Boolean
  );
  // La obra en el encabezado, como los reportes del sistema que se migra; debajo, el proveedor.
  const heading = `Obra: ${[contract.workCode, contract.workName].filter(Boolean).join(" — ")}`;
  const lines = [...(contract.providerName ? [`Proveedor: ${contract.providerName}`] : []), ...(omitted.length ? [`No se incluyen: ${omitted.join("; ")}.`] : [])];
  return renderDocument({ format, title: `Contrato ${contract.number} — ${contract.name}`, heading, lines, sections });
};
