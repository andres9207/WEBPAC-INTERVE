import { prisma } from "../../../common/configs/prismaClient.js";
import { DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { findExportRows, renderExport } from "../../../common/services/export.service.js";
import { conceptAmounts, contractTotals, CONCEPT_TYPES, CONCEPT_TYPE_NAMES, STATE_NAMES, sortConcepts } from "./contractTerms.js";
import { moneyText, percentText, ratioPercent, sumMoney } from "../../../common/utils/money.utils.js";
import { CONCEPT_SELECT, contractListQuery, exportFilterLines } from "./contracts.service.js";
import { contractsBalances } from "../../billing/invoices/invoices.service.js";
import { seesView } from "../../billing/invoices/invoiceViews.js";

/**
 * Reportes de control de contratos (DEC-070), los del sistema que se migra
 * (`docs/backlog/reports`): control de contratos y control de anticipos y
 * retenidos. Toman los contratos del listado con sus filtros, pestaña,
 * búsqueda, orden y alcance (`contractListQuery`), sin paginar.
 *
 * Las cifras salen de las reglas que ya existen: valor de cada concepto con
 * conceptAmounts, total con contractTotals y saldos con las mismas funciones
 * de contractBalances (DEC-044, DEC-051). "Pagado" es la suma de las facturas
 * aprobadas del contrato: no hay facturación del avance (DEC-01).
 *
 * Las cifras de facturas de un contrato salen solo si el usuario ve la vista
 * de facturas de su contrato (DEC-054, DEC-066); si no, van vacías y el
 * encabezado lo dice.
 */

export const CONTRACT_REPORTS = Object.freeze({ CONTROL: "control", ADVANCES: "advances" });

const REPORT_SELECT = {
  ctr_id: true,
  ctr_number: true,
  ctr_name: true,
  ctr_state: true,
  ctr_invoice_view: true,
  tbl_works: { select: { wrk_code: true } },
  tbl_providers: { select: { prv_name: true } },
  tbl_contract_concepts: { select: CONCEPT_SELECT },
};

const conceptLabel = (concept) =>
  concept.ccp_type === CONCEPT_TYPES.AMENDMENT ? `Otrosí N.º ${concept.ccp_number}` : CONCEPT_TYPE_NAMES[concept.ccp_type];

const pct = (part, whole) => percentText(ratioPercent(part, whole));

// Datos del contrato comunes a los dos reportes.
const contractOf = (row, balances, visible) => ({
  key: row.ctr_id,
  number: row.ctr_number,
  name: row.ctr_name,
  workCode: row.tbl_works?.wrk_code ?? null,
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
    note: "Vr. pagado: facturas aprobadas del contrato (anticipo, liquidación y devolución de retenido).",
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
 * Reporte de control en Excel o PDF. `views`: vistas de facturas que ve el
 * usuario; un contrato sin menú (anterior a DEC-066) no tiene facturas.
 */
export const exportContractReport = async ({ report, format, views, ...filters }) => {
  const spec = REPORTS[report];
  if (!spec) throw Object.assign(new Error("El reporte no existe."), { statusCode: 400 });
  const { where, orderBy } = await contractListQuery(filters);
  const rows = await findExportRows(prisma.tbl_contracts, { where, select: REPORT_SELECT, orderBy });
  const balances = await contractsBalances(rows);
  const contracts = rows.map((row) => {
    const visible = !row.ctr_invoice_view || seesView(views, row.ctr_invoice_view);
    return { ...contractOf(row, balances.get(row.ctr_id), visible), concepts: row.tbl_contract_concepts };
  });
  const hidden = contracts.filter((c) => !c.balances).length;
  const notes = [spec.note, hidden ? `Sin acceso a las facturas de ${hidden} contrato(s): sus cifras de facturación van vacías.` : null];
  return renderExport({
    format,
    title: spec.title,
    filters: [...(await exportFilterLines(filters)), ...notes.filter(Boolean)],
    columns: spec.columns,
    rows: spec.rows(contracts),
    groupKey: (row) => row.key,
    totals: spec.totals(contracts),
  });
};
