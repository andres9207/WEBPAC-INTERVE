import { prisma } from "../../../common/configs/prismaClient.js";
import { paginate, MAX_ROWS, containsFilter, idFilter, dateRangeFilter, filtersWhere } from "../../../common/utils/pagination.utils.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { decimal, moneyText, percentText, sumMoney, toMoney, toPercent } from "../../../common/utils/money.utils.js";
import { addTerm, dateOnlyText, toDateOnly, todayDateOnly } from "../../../common/utils/term.utils.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { assertInScope, inScope, scopeWhere } from "../../../common/services/workScope.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { findExportRows, renderExport } from "../../../common/services/export.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, newOperationId, writeAudit } from "../../../common/services/audit.service.js";
import { assertProviderInScope, providerSelectOptions } from "../providers/providers.service.js";
import { isContractMode, isSimpleMode } from "../../billing/invoices/invoiceMenus.js";
import { CONTRACT_ADVANCE_FILTERS, CONTRACT_ADVANCE_FILTER_NAMES, contractsWithPendingAdvanceWhere } from "../../billing/invoices/advanceFilters.js";
import { resolveContractTypeFields } from "../../admin/providerTypes/providerTypeFields.service.js";
import { FIELD_GROUPS, enforceFields, typeAppliesAiu, withContractAiu } from "../../admin/providerTypes/contractFields.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import {
  CONCEPT_TYPES,
  CONCEPT_TYPE_NAMES,
  CONTRACT_ALERT_NAMES,
  POLICY_ALERTS,
  REPORT_GROUPS,
  STATE_ALLOWS,
  STATE_NAMES,
  assertStateAllows,
  assertTransition,
  conceptAmounts,
  contractEndDate,
  contractTermFor,
  contractTotals,
  historyRow,
  isEndDateProvisional,
  previewConcept,
  sortConcepts,
  totalExtensions,
} from "./contractTerms.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { CONTRACT_POLICY_STATUS_NAMES, assertPolicyStatus, contractPolicyStatus, uncoveredContractsWhere } from "./policyTerms.js";
// Importación circular a propósito: contractPolicies usa los helpers de este
// archivo y este, insertPolicy. Ninguno de los dos los usa al cargarse.
import { POLICY_STATUS_SELECT, contractPolicyStatuses, insertPolicy, policyValuesOf } from "./contractPolicies.service.js";
import { contractAlertWheres } from "./contractAlerts.js";
import { getRuleValues } from "../../admin/businessRules/businessRules.service.js";
import { BUSINESS_RULES } from "../../admin/businessRules/businessRules.constants.js";

/**
 * Contratos (ADR-0015 a ADR-0017, DEC-035). El contrato es la raíz del
 * agregado económico: se crea con su valor inicial y su primera fila de
 * historial en una sola transacción, y su valor es la suma de sus conceptos
 * (no se guarda). Los otrosí viven en contractConcepts.service.js.
 *
 * - Bloqueo: obra → proveedor → contrato → maestros (ADR-0027, DEC-019).
 *   Crear bloquea la obra (sus etapas y asignaciones solo cambian bajo ese
 *   bloqueo), el proveedor, el tipo de proveedor y el tipo de contrato.
 * - Tipo de proveedor (DEC-066): el contrato se firma bajo uno de los tipos
 *   con que el proveedor trabaja en la obra (FK compuesta a
 *   tbl_work_provider_types), de forma de facturar con contrato. Ese tipo es
 *   el menú de sus facturas (DEC-074); su forma no cambia mientras tenga
 *   contratos. Con facturas, el tipo no cambia (409).
 * - La obra no cambia después de crear el contrato. Etapa y proveedor deben
 *   ser de esa obra: lo valida el service y lo garantizan las FK compuestas.
 * - Fecha fin: la calcula contractEndDate, nunca el cliente.
 * - Estado: solo cambia por las transiciones de contractTerms.js, con
 *   historial. Editar exige que el estado lo admita (409 si no).
 * - Campos configurables (etapa, observaciones, porcentajes; DEC-053): se
 *   aplican con la configuración actual del tipo de proveedor del contrato
 *   (DEC-066), resuelta dentro de la transacción, con el contrato o la
 *   asignación bloqueados, por la misma función que entrega los descriptores
 *   al formulario.
 * - AIU en cadena (ADR-0026, P13; DEC-046): el tipo de proveedor declara si
 *   aplica, el contrato lo solicita (`ctr_aiu_requested`) y el concepto
 *   pacta A, I y U.
 *   Apagarlo o encenderlo exige el permiso propio.
 */

export const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

const NOT_FOUND = "No se encontró el contrato.";

/**
 * 404 si la obra del contrato está fuera del alcance de la petición (DEC-047).
 * La obra de un contrato no cambia nunca: leerla fuera de la transacción no
 * da una foto vieja de nada que decida. Un contrato inexistente da el mismo
 * 404 que su service.
 */
export const assertContractInScope = async (scope, ctrId) => {
  if (!scope || scope.all) return;
  const row = await prisma.tbl_contracts.findUnique({ where: { ctr_id: Number(ctrId) }, select: { wrk_id: true } });
  if (!row || !inScope(scope, row.wrk_id)) throw httpError(404, NOT_FOUND);
};

const text = (value) => String(value ?? "").trim();
const optionalText = (value) => text(value) || null;

// ─── Conceptos: lectura y escritura compartidas ─────────────────────────────

const PERCENT_FIELDS = Object.freeze({
  adminPct: "ccp_admin_pct",
  contingencyPct: "ccp_contingency_pct",
  profitPct: "ccp_profit_pct",
  vatPct: "ccp_vat_pct",
  advancePct: "ccp_advance_pct",
  retentionPct: "ccp_retention_pct",
});

export const CONCEPT_SELECT = {
  ccp_id: true,
  ctr_id: true,
  ccp_type: true,
  ccp_number: true,
  ccp_start_date: true,
  ccp_description: true,
  ccp_direct_cost: true,
  ...Object.fromEntries(Object.values(PERCENT_FIELDS).map((column) => [column, true])),
  ccp_extension: true,
  sta_id: true,
};

/** Datos económicos de un concepto que llegan del cliente → columnas. Nunca su valor (ADR-0016, "Seguridad"). */
export const conceptValuesOf = (input) => ({
  ccp_start_date: toDateOnly(input.startDate),
  ccp_description: optionalText(input.description),
  ccp_direct_cost: toMoney(input.directCost),
  ...Object.fromEntries(Object.entries(PERCENT_FIELDS).map(([field, column]) => [column, toPercent(input[field])])),
});

/** Columnas económicas de un concepto: las que congela la primera factura aprobada (ADR-0016, "Inmutabilidad"). */
export const ECONOMIC_COLUMNS = Object.freeze(["ccp_direct_cost", ...Object.values(PERCENT_FIELDS)]);

export const CONCEPT_AUDITED = [
  "ccp_type",
  "ccp_number",
  "ccp_start_date",
  "ccp_direct_cost",
  ...Object.values(PERCENT_FIELDS),
  "ccp_extension",
  "ccp_description",
];

/** Concepto → valores comparables en la bitácora: importes y porcentajes con dos decimales, fechas "AAAA-MM-DD". */
export const auditableConcept = (concept) =>
  Object.fromEntries(
    Object.entries(concept).map(([column, value]) => {
      if (column === "ccp_direct_cost") return [column, moneyText(value)];
      if (Object.values(PERCENT_FIELDS).includes(column)) return [column, percentText(value)];
      if (column === "ccp_start_date") return [column, dateOnlyText(value)];
      return [column, value];
    })
  );

const conceptDto = (concept, cumulativeValue) => {
  const amounts = conceptAmounts(concept);
  return {
    ccpId: concept.ccp_id,
    type: concept.ccp_type,
    typeName: CONCEPT_TYPE_NAMES[concept.ccp_type],
    number: concept.ccp_number,
    startDate: dateOnlyText(concept.ccp_start_date),
    description: concept.ccp_description,
    directCost: moneyText(concept.ccp_direct_cost),
    ...Object.fromEntries(Object.entries(PERCENT_FIELDS).map(([field, column]) => [field, percentText(concept[column])])),
    extension: concept.ccp_extension,
    administration: moneyText(amounts.administration),
    contingency: moneyText(amounts.contingency),
    profit: moneyText(amounts.profit),
    base: moneyText(amounts.base),
    vat: moneyText(amounts.vat),
    value: moneyText(amounts.value),
    advance: moneyText(amounts.advance),
    retention: moneyText(amounts.retention),
    cumulativeValue: moneyText(cumulativeValue),
    staId: concept.sta_id,
  };
};

/** Conceptos en orden, cada uno con el valor vigente acumulado hasta él (PRO-FE-07). */
const conceptsDto = (concepts) => {
  let cumulative = decimal(0);
  return sortConcepts(concepts).map((concept) => {
    if (concept.sta_id !== DELETED_STATUS) cumulative = cumulative.plus(conceptAmounts(concept).value);
    return conceptDto(concept, cumulative);
  });
};

const totalsDto = (concepts) => {
  const totals = contractTotals(concepts);
  return {
    currentValue: moneyText(totals.value),
    base: moneyText(totals.base),
    vat: moneyText(totals.vat),
    advance: moneyText(totals.advance),
    retention: moneyText(totals.retention),
  };
};

/** Contrato bloqueado (la utilidad ya ejecutó el FOR UPDATE). 404 si no existe o está eliminado. */
export const findLockedContract = async (tx, ctrId) => {
  const row = await tx.tbl_contracts.findUnique({
    where: { ctr_id: Number(ctrId) },
    select: {
      ctr_id: true,
      wrk_id: true,
      prv_id: true,
      pvt_id: true,
      wks_id: true,
      ctr_number: true,
      ctr_name: true,
      ctr_start_date: true,
      ctr_term: true,
      ctr_term_unit: true,
      ctr_end_date: true,
      ctr_suspended_days: true,
      ctr_state: true,
      ctr_observation: true,
      ctr_aiu_requested: true,
      sta_id: true,
    },
  });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró el contrato.");
  return row;
};

/**
 * Fecha fin derivada con los datos ya bloqueados: los del contrato (o los que
 * se van a guardar) y las prórrogas de sus otrosí. Date de una columna DATE.
 */
export const derivedEndDate = async (tx, contract) => {
  const concepts = await tx.tbl_contract_concepts.findMany({
    where: { ctr_id: contract.ctr_id },
    select: { ccp_type: true, ccp_extension: true, sta_id: true },
  });
  const end = contractEndDate({
    startDate: contract.ctr_start_date,
    term: contract.ctr_term,
    unit: contract.ctr_term_unit,
    extensions: totalExtensions(concepts),
    suspendedDays: contract.ctr_suspended_days,
  });
  return toDateOnly(end);
};

/**
 * Vista previa de la fecha fin mientras se edita el contrato (FRONTEND_STANDARD,
 * regla 9: la cuenta la hace el servidor). Con `ctrId`, suma las prórrogas de
 * sus otrosí y sus días suspendidos, como al guardar; sin él (contrato
 * nuevo), inicio + plazo. Solo lee; sin bloqueo: no decide nada.
 *
 * Funciona en los dos sentidos: con `term`, da la fecha fin; con `endDate` y
 * sin `term`, da el plazo que la produce (contractTermFor), en `termUnit` o en
 * días si no es exacto. Responde siempre `{ endDate, term, termUnit }`.
 */
/**
 * Valor y % de cada componente de un concepto mientras se escribe (valor
 * inicial y otrosí), con la fórmula de conceptAmounts. No lee la BD: no
 * depende de ningún contrato, así que no pasa por el alcance por obra.
 */
export const previewContractConcept = (input) => previewConcept(input);

export const previewContractEndDate = async ({ ctrId, startDate, term, termUnit, endDate, scope }) => {
  let extensions = 0;
  let suspendedDays = 0;
  if (Number(ctrId) > 0) {
    await assertContractInScope(scope, ctrId);
    const contract = await prisma.tbl_contracts.findFirst({
      where: { ctr_id: Number(ctrId), sta_id: { not: DELETED_STATUS } },
      select: { ctr_suspended_days: true, tbl_contract_concepts: { select: { ccp_type: true, ccp_extension: true, sta_id: true } } },
    });
    if (!contract) throw httpError(404, "No se encontró el contrato.");
    extensions = totalExtensions(contract.tbl_contract_concepts);
    suspendedDays = contract.ctr_suspended_days;
  }
  if (term === undefined || term === null || term === "") {
    const found = contractTermFor({ startDate, endDate, unit: termUnit, extensions, suspendedDays });
    if (found.error) throw httpError(400, found.error);
    return { endDate, term: found.term, termUnit: found.unit };
  }
  return { endDate: contractEndDate({ startDate, term, unit: termUnit, extensions, suspendedDays }), term: Number(term), termUnit };
};

/** Valor vigente del contrato con lo que hay en la transacción (para la bitácora de un acto). */
export const currentValueText = async (tx, ctrId) => {
  const concepts = await tx.tbl_contract_concepts.findMany({ where: { ctr_id: Number(ctrId) }, select: CONCEPT_SELECT });
  return moneyText(contractTotals(concepts).value);
};

// ─── Listado ─────────────────────────────────────────────────────────────────

// Lista blanca de orden (ENDPOINT_STANDARD, "Listados").
const SORT_FIELDS = {
  number: (order) => ({ ctr_number: order }),
  name: (order) => ({ ctr_name: order }),
  work: (order) => ({ tbl_works: { wrk_code: order } }),
  provider: (order) => ({ tbl_providers: { prv_name: order } }),
  // El tipo de contrato es de la obra (DEC-086).
  contractType: (order) => ({ tbl_works: { tbl_contract_types: { ctt_name: order } } }),
  // Tipo de proveedor bajo el que se firmó (DEC-066): el menú del contrato (DEC-077).
  providerType: (order) => ({ tbl_work_provider_types: { tbl_provider_types: { pvt_name: order } } }),
  startDate: (order) => ({ ctr_start_date: order }),
  endDate: (order) => ({ ctr_end_date: order }),
  state: (order) => ({ ctr_state: order }),
  updatedAt: (order) => ({ ctr_update_at: order }),
};

const LIST_SELECT = {
  ctr_id: true,
  wrk_id: true,
  ctr_number: true,
  ctr_name: true,
  ctr_start_date: true,
  ctr_end_date: true,
  ctr_term: true,
  ctr_term_unit: true,
  ctr_state: true,
  sta_id: true,
  ctr_update_at: true,
  updated_by_user: USER_NAME_SELECT,
  tbl_works: { select: { wrk_code: true, wrk_name: true, tbl_contract_types: { select: { ctt_name: true } } } },
  tbl_providers: { select: { prv_name: true } },
  tbl_work_provider_types: { select: { tbl_provider_types: { select: { pvt_name: true } } } },
  tbl_work_stages: { select: { wks_name: true } },
  // Para el valor vigente, que no se guarda: unos pocos conceptos por contrato.
  tbl_contract_concepts: { select: CONCEPT_SELECT },
};

const toListDto = (row) => ({
  ctrId: row.ctr_id,
  wrkId: row.wrk_id,
  number: row.ctr_number,
  name: row.ctr_name,
  workCode: row.tbl_works?.wrk_code ?? null,
  workName: row.tbl_works?.wrk_name ?? null,
  providerName: row.tbl_providers?.prv_name ?? null,
  providerTypeName: row.tbl_work_provider_types?.tbl_provider_types?.pvt_name ?? null,
  stageName: row.tbl_work_stages?.wks_name ?? null,
  contractType: row.tbl_works?.tbl_contract_types?.ctt_name ?? null,
  startDate: dateOnlyText(row.ctr_start_date),
  endDate: dateOnlyText(row.ctr_end_date),
  endDateProvisional: isEndDateProvisional(row.ctr_state),
  term: row.ctr_term,
  termUnit: row.ctr_term_unit,
  currentValue: moneyText(contractTotals(row.tbl_contract_concepts ?? []).value),
  state: row.ctr_state,
  stateName: STATE_NAMES[row.ctr_state] ?? row.ctr_state,
  staId: row.sta_id,
  updatedAt: row.ctr_update_at,
  updatedByName: userFullName(row.updated_by_user),
});

// Búsqueda general (DEC-024): número, nombre, proveedor u obra, parametrizada.
const searchWhereOf = (search) => {
  const value = text(search);
  if (!value) return {};
  return {
    OR: [
      { ctr_number: { contains: value } },
      { ctr_name: { contains: value } },
      { tbl_providers: { prv_name: { contains: value } } },
      { tbl_works: { wrk_code: { contains: value } } },
      { tbl_works: { wrk_name: { contains: value } } },
    ],
  };
};

/** Conteo por estado del ciclo de vida, para las pestañas del listado. */
const countByState = async (where) => {
  const grouped = await prisma.tbl_contracts.groupBy({ by: ["ctr_state"], where, _count: { _all: true } });
  return Object.fromEntries(grouped.map((g) => [g.ctr_state, g._count._all]));
};

/**
 * Filtro Proveedor del listado: proveedores con contratos no eliminados en el
 * alcance por obra, con tope y búsqueda (DEC-018).
 */
export const selectContractFilterProviders = ({ search, includePrvId, scope } = {}) =>
  providerSelectOptions({
    admitted: { tbl_contracts: { some: { sta_id: { not: DELETED_STATUS }, ...scopeWhere(scope) } } },
    search,
    includePrvId,
  });

/**
 * Filtro Etapa del listado: etapas con contratos no eliminados en el alcance
 * por obra, con tope y búsqueda (DEC-018), como el de proveedor. La etiqueta
 * lleva el código de la obra: con "Ver todo" hay etapas de varias obras con
 * el mismo nombre.
 */
export const selectContractFilterStages = async ({ search, includeWksId, scope } = {}) => {
  const admitted = { tbl_contracts: { some: { sta_id: { not: DELETED_STATUS }, ...scopeWhere(scope) } } };
  const select = { wks_id: true, wks_name: true, tbl_works: { select: { wrk_code: true } } };
  const value = String(search ?? "").trim();
  const rows = await prisma.tbl_work_stages.findMany({
    where: { ...admitted, ...(value ? { OR: [{ wks_name: { contains: value } }, { tbl_works: { wrk_code: { contains: value } } }] } : {}) },
    select,
    orderBy: [{ tbl_works: { wrk_code: "asc" } }, { wks_order: "asc" }],
    take: MAX_ROWS,
  });
  const includeId = Number(includeWksId) > 0 ? Number(includeWksId) : null;
  if (includeId && !rows.some((row) => row.wks_id === includeId)) {
    const included = await prisma.tbl_work_stages.findFirst({ where: { ...admitted, wks_id: includeId }, select });
    if (included) rows.unshift(included);
  }
  return rows.map((row) => ({ value: row.wks_id, label: `${row.wks_name} — ${row.tbl_works.wrk_code}` }));
};

/**
 * Filtro "Anticipo" (advanceFilters.js). Revela importes de facturas, así que
 * exige poder verlas (`canViewInvoices`). "Por aprobar" es una condición
 * sobre las facturas del contrato; los demás salen de sus saldos, que el
 * controller resuelve (`contractIdsByAdvance`) y llegan en `advanceCtrIds`.
 */
const advanceWhereOf = ({ advance, advanceCtrIds, canViewInvoices }) => {
  if (!advance) return null;
  if (!canViewInvoices) throw httpError(403, "Filtrar por el anticipo exige el permiso de ver facturas.");
  if (advance === CONTRACT_ADVANCE_FILTERS.PENDING) return contractsWithPendingAdvanceWhere();
  return { ctr_id: { in: advanceCtrIds ?? [] } };
};

/**
 * Contratos no eliminados, paginados. `state` filtra por estado del ciclo de
 * vida (las pestañas), `wrkId`, por obra (la pestaña de la obra), `cttId`,
 * por el tipo de contrato de la obra (DEC-086), `prvId`, por proveedor, y `pvtId`, por el tipo de
 * proveedor bajo el que se firmó (el menú de contratos, DEC-077). `number`, `name`, `providerName` (razón social) y el
 * rango de la fecha fin (`endDateFrom`, `endDateTo`) son filtros por campo
 * (DEC-048), igual que `wksId` (etapa) y `states` (uno o varios estados, aparte
 * de la pestaña: los dos se suman). Los conteos de las pestañas respetan todos
 * los filtros menos la pestaña.
 *
 * `scope`: alcance por obra de la petición (DEC-047). El filtro de obra va en
 * el `AND`: se suma al alcance y nunca lo reemplaza.
 *
 * `policyStatus` (categoría de pólizas del contrato) y `uncovered` (con algún
 * concepto sin póliza vigente) son los filtros del tablero: el mismo
 * criterio que produjo la cifra (ADR-0002, decisión 2; DEC-052, DEC-064). Revelan
 * datos de pólizas, así que exigen poder verlas (`canViewPolicies`).
 */
/**
 * `where` (con y sin la pestaña de estado) y orden del listado. Los usan el
 * listado paginado y el reporte (DEC-070): el reporte trae lo mismo que la
 * tabla, sin paginar.
 */
export const contractListQuery = async ({
  search,
  policyStatus,
  uncovered,
  canViewPolicies = false,
  advance,
  advanceCtrIds = null,
  canViewInvoices = false,
  state,
  alert,
  states,
  wrkId,
  wksId,
  cttId,
  prvId,
  pvtId,
  number,
  name,
  providerName,
  endDateFrom,
  endDateTo,
  sortField,
  sortOrder,
  scope,
}) => {
  const order = Number(sortOrder) === 1 ? "asc" : "desc";
  const orderBy = (SORT_FIELDS[sortField] ?? SORT_FIELDS.updatedAt)(order);
  if ((policyStatus || uncovered || POLICY_ALERTS.includes(alert)) && !canViewPolicies)
    throw httpError(403, "Filtrar por el estado de las pólizas exige el permiso de ver pólizas.");
  const advanceFilter = advanceWhereOf({ advance, advanceCtrIds, canViewInvoices });
  const policyFilters = uncovered ? [uncoveredContractsWhere()] : [];
  if (policyStatus) {
    // La categoría sale de la regla única (DEC-064), sobre los contratos del alcance.
    assertPolicyStatus(policyStatus);
    const statuses = await contractPolicyStatuses({ sta_id: { not: DELETED_STATUS }, ...scopeWhere(scope) });
    policyFilters.push({ ctr_id: { in: statuses.filter((s) => s.status === policyStatus).map((s) => s.ctrId) } });
  }

  const baseWhere = {
    sta_id: { not: DELETED_STATUS },
    ...scopeWhere(scope),
    ...(Number(cttId) > 0 ? { tbl_works: { ctt_id: Number(cttId) } } : {}),
    ...searchWhereOf(search),
    ...filtersWhere([
      idFilter(wrkId, (id) => ({ wrk_id: id })),
      idFilter(wksId, (id) => ({ wks_id: id })),
      idFilter(prvId, (id) => ({ prv_id: id })),
      idFilter(pvtId, (id) => ({ pvt_id: id })),
      Array.isArray(states) && states.length > 0 ? { ctr_state: { in: states } } : null,
      containsFilter(providerName, (c) => ({ tbl_providers: { prv_name: c } })),
      containsFilter(number, (c) => ({ ctr_number: c })),
      containsFilter(name, (c) => ({ ctr_name: c })),
      dateRangeFilter("ctr_end_date", endDateFrom, endDateTo),
      ...policyFilters,
      advanceFilter,
    ]),
  };
  // Alertas (CONTRACT_ALERTS): los predicados del aviso (DEC-072) y de "sin póliza" (DEC-088), con los días de cada regla de
  // negocio y la fecha del servidor. Las de pólizas, solo para quien puede verlas.
  const rules = await getRuleValues();
  const days = rules[BUSINESS_RULES.CONTRACT_EXPIRING_DAYS];
  const alertWheres = contractAlertWheres({
    today: todayDateOnly(),
    contractDays: days,
    policyDays: rules[BUSINESS_RULES.POLICY_EXPIRING_DAYS],
    withPolicies: canViewPolicies,
  });
  const alertWhere = alert ? alertWheres.find(([key]) => key === alert)?.[1] : null;
  const stateWhere = { ...baseWhere, ...(state ? { ctr_state: state } : {}) };
  const withAlert = (where, predicate) => (predicate ? { AND: [where, predicate] } : where);
  // La pestaña de estado y la alerta se combinan; cada una cuenta dentro de la otra.
  return {
    where: withAlert(stateWhere, alertWhere),
    stateCountWhere: withAlert(baseWhere, alertWhere),
    alertCountWheres: alertWheres.map(([key, predicate]) => [key, withAlert(stateWhere, predicate)]),
    expiringDays: days,
    orderBy,
  };
};

export const paginationContracts = async ({ rows, first, ...filters }) => {
  const { where, stateCountWhere, alertCountWheres, expiringDays, orderBy } = await contractListQuery(filters);
  const [page, statusCounts, ...alerts] = await Promise.all([
    paginate(prisma.tbl_contracts, { where, select: LIST_SELECT, orderBy }, { first, rows }),
    countByState(stateCountWhere),
    ...alertCountWheres.map(([, alertWhere]) => prisma.tbl_contracts.count({ where: alertWhere })),
  ]);
  // Sin las de pólizas cuando el usuario no las ve: el cliente no muestra esas alertas.
  const alertCounts = Object.fromEntries(alertCountWheres.map(([key], i) => [key, alerts[i]]));
  return { ...page, results: page.results.map(toListDto), statusCounts, alertCounts, expiringDays };
};

const TERM_UNIT_NAMES = Object.freeze({ DIA: "día(s)", MES: "mes(es)", ANIO: "año(s)" });

// Importes del reporte (DEC-070): la composición vigente con conceptAmounts, el valor inicial y lo de los otrosíes; nunca guardados.
const EXPORT_AMOUNTS = ["directCost", "administration", "contingency", "profit", "base", "vat", "value", "advance", "retention"];

const exportAmountsOf = (concepts) => {
  const live = (concepts ?? []).filter((c) => c.sta_id !== DELETED_STATUS);
  const amendments = live.filter((c) => c.ccp_type !== CONCEPT_TYPES.INITIAL);
  const valueOf = (list) => moneyText(sumMoney(list.map((c) => conceptAmounts(c).value)));
  const amounts = live.map(conceptAmounts);
  return {
    ...Object.fromEntries(EXPORT_AMOUNTS.map((key) => [key, moneyText(sumMoney(amounts.map((a) => a[key])))])),
    initialValue: valueOf(live.filter((c) => c.ccp_type === CONCEPT_TYPES.INITIAL)),
    amendmentsValue: valueOf(amendments),
    amendmentsCount: amendments.length,
  };
};

// Fila del reporte: la del listado con los datos del contrato, sus importes y, si se ven, sus pólizas.
const exportRowOf = (row, policyDays) => ({
  ...toListDto(row),
  ...exportAmountsOf(row.tbl_contract_concepts),
  suspendedDays: row.ctr_suspended_days,
  aiuRequested: row.ctr_aiu_requested,
  observation: row.ctr_observation,
  policyStatus: row.tbl_policies
    ? CONTRACT_POLICY_STATUS_NAMES[contractPolicyStatus(row.tbl_policies, row.tbl_contract_concepts ?? [], { days: policyDays })]
    : null,
  currentPolicies: row.tbl_policies?.length ?? null,
});

const money = (header, field, width = 1.2) => ({ header, value: (r) => r[field], kind: "money", width });

// Columnas del reporte (DEC-070): los datos del contrato, la obra con el proveedor y su tipo, todos los importes y las pólizas.
const EXPORT_COLUMNS = [
  { header: "Número", value: (r) => r.number },
  { header: "Contrato", value: (r) => r.name, width: 2 },
  { header: "Proveedor", value: (r) => r.providerName, width: 2 },
  { header: "Tipo de proveedor", value: (r) => r.providerTypeName },
  { header: "Obra", value: (r) => [r.workCode, r.workName].filter(Boolean).join(" — "), width: 2 },
  { header: "Tipo de contrato", value: (r) => r.contractType },
  { header: "Etapa", value: (r) => r.stageName },
  { header: "Estado", value: (r) => r.stateName },
  { header: "Fecha inicio", value: (r) => r.startDate, kind: "date" },
  { header: "Plazo", value: (r) => (r.term !== null && r.term !== undefined ? `${r.term} ${TERM_UNIT_NAMES[r.termUnit] ?? r.termUnit}` : null) },
  { header: "Días suspendidos", value: (r) => r.suspendedDays, width: 0.8 },
  { header: "Fecha fin", value: (r) => (r.endDate && r.endDateProvisional ? `${r.endDate} (provisional)` : r.endDate), kind: "date" },
  { header: "AIU", value: (r) => (r.aiuRequested ? "Sí" : "No"), width: 0.6 },
  { header: "Otrosíes", value: (r) => r.amendmentsCount, width: 0.7 },
  money("Valor inicial", "initialValue"),
  money("Valor otrosíes", "amendmentsValue"),
  money("Costo directo", "directCost"),
  money("Administración", "administration"),
  money("Imprevistos", "contingency"),
  money("Utilidad", "profit"),
  money("Valor antes de IVA", "base"),
  money("IVA", "vat"),
  money("Valor vigente", "currentValue", 1.3),
  money("Anticipo", "advance"),
  money("Retenido", "retention"),
  { header: "Pólizas", value: (r) => r.policyStatus, width: 1.3, policies: true },
  { header: "Pólizas vigentes", value: (r) => r.currentPolicies, width: 0.8, policies: true },
  { header: "Observación", value: (r) => r.observation, width: 2 },
];

const EXPORT_TOTAL_FIELDS = [...EXPORT_AMOUNTS.filter((key) => key !== "value"), "initialValue", "amendmentsValue", "currentValue"];

// Líneas de los filtros aplicados, para el encabezado del reporte.
export const exportFilterLines = async ({
  state,
  alert,
  states,
  search,
  wrkId,
  wksId,
  cttId,
  prvId,
  pvtId,
  number,
  name,
  providerName,
  endDateFrom,
  endDateTo,
  policyStatus,
  uncovered,
  advance,
}) => {
  const [work, stage, type, provider, menu] = await Promise.all([
    Number(wrkId) > 0 ? prisma.tbl_works.findUnique({ where: { wrk_id: Number(wrkId) }, select: { wrk_code: true, wrk_name: true } }) : null,
    Number(wksId) > 0 ? prisma.tbl_work_stages.findUnique({ where: { wks_id: Number(wksId) }, select: { wks_name: true } }) : null,
    Number(cttId) > 0 ? prisma.tbl_contract_types.findUnique({ where: { ctt_id: Number(cttId) }, select: { ctt_name: true } }) : null,
    Number(prvId) > 0 ? prisma.tbl_providers.findUnique({ where: { prv_id: Number(prvId) }, select: { prv_name: true } }) : null,
    Number(pvtId) > 0 ? prisma.tbl_provider_types.findUnique({ where: { pvt_id: Number(pvtId) }, select: { pvt_name: true } }) : null,
  ]);
  const lines = [
    ["Tipo de proveedor", menu?.pvt_name],
    ["Estado", state ? (STATE_NAMES[state] ?? state) : "Todos"],
    ["Alerta", alert ? (CONTRACT_ALERT_NAMES[alert] ?? alert) : ""],
    ["Estados", Array.isArray(states) ? states.map((s) => STATE_NAMES[s] ?? s).join(", ") : ""],
    ["Búsqueda", text(search)],
    ["Obra", work && `${work.wrk_code} — ${work.wrk_name}`],
    ["Etapa", stage?.wks_name],
    ["Tipo de contrato", type?.ctt_name],
    ["Proveedor", provider?.prv_name ?? text(providerName)],
    ["Número contiene", text(number)],
    ["Nombre contiene", text(name)],
    ["Fecha fin", endDateFrom || endDateTo ? `${endDateFrom || "…"} a ${endDateTo || "…"}` : ""],
    ["Pólizas", policyStatus ? (CONTRACT_POLICY_STATUS_NAMES[policyStatus] ?? policyStatus) : ""],
    ["Conceptos sin póliza", uncovered ? "Sí" : ""],
    ["Anticipo", advance ? (CONTRACT_ADVANCE_FILTER_NAMES[advance] ?? advance) : ""],
  ].filter(([, value]) => value);
  return [`Filtros: ${lines.map(([label, value]) => `${label}: ${value}`).join(" · ")}`];
};

/**
 * Reporte del listado en Excel o PDF (DEC-070): los mismos filtros, pestaña,
 * búsqueda, orden y alcance que la tabla, sin paginar, hasta EXPORT_MAX_ROWS.
 */
export const exportContracts = async ({ format, ...filters }) => {
  const { where, orderBy } = await contractListQuery(filters);
  // Las pólizas, solo para quien puede verlas (ADR-0018), con la regla única de DEC-064.
  const policies = filters.canViewPolicies === true;
  const select = {
    ...LIST_SELECT,
    ctr_suspended_days: true,
    ctr_aiu_requested: true,
    ctr_observation: true,
    ...(policies ? { tbl_policies: { where: { pol_is_current: true }, select: POLICY_STATUS_SELECT } } : {}),
  };
  const policyDays = policies ? (await getRuleValues())[BUSINESS_RULES.POLICY_EXPIRING_DAYS] : null;
  const rows = (await findExportRows(prisma.tbl_contracts, { where, select, orderBy })).map((row) => exportRowOf(row, policyDays));
  const totals = (own, label) => ({
    number: label,
    ...Object.fromEntries(EXPORT_TOTAL_FIELDS.map((field) => [field, moneyText(sumMoney(own.map((r) => r[field])))])),
  });
  return renderExport({
    format,
    title: "Contratos",
    filters: await exportFilterLines(filters),
    columns: policies ? EXPORT_COLUMNS : EXPORT_COLUMNS.filter((c) => !c.policies),
    rows,
    // Como los reportes del sistema que se migra: la obra arriba y los contratos por proveedor, con su subtotal.
    rowGroups: { ...REPORT_GROUPS, column: "Proveedor", subtotal: (own) => totals(own, "Subtotal") },
    totals: rows.length ? totals(rows, "Total") : null,
  });
};

// ─── Detalle ─────────────────────────────────────────────────────────────────

const suspensionDto = (row) => ({
  cspId: row.csp_id,
  reasonName: row.tbl_reasons?.rea_name ?? null,
  suspensionDate: dateOnlyText(row.csp_suspension_date),
  liftCondition: row.csp_lift_condition,
  observation: row.csp_observation,
  requiresReport: row.csp_requires_report,
  liftDate: dateOnlyText(row.csp_lift_date),
  days: row.csp_days,
  amendmentNumber: row.tbl_contract_concepts?.ccp_number ?? null,
  open: row.csp_lift_date === null,
  createdAt: row.csp_create_at,
  createdByName: userFullName(row.created_by_user),
});

export const getContract = async ({ ctrId, scope }) => {
  await assertContractInScope(scope, ctrId);
  const row = await prisma.tbl_contracts.findFirst({
    where: { ctr_id: Number(ctrId), sta_id: { not: DELETED_STATUS } },
    select: {
      ctr_id: true,
      wrk_id: true,
      prv_id: true,
      pvt_id: true,
      wks_id: true,
      ctr_number: true,
      ctr_name: true,
      ctr_start_date: true,
      ctr_term: true,
      ctr_term_unit: true,
      ctr_end_date: true,
      ctr_suspended_days: true,
      ctr_state: true,
      ctr_observation: true,
      ctr_aiu_requested: true,
      sta_id: true,
      ctr_create_at: true,
      ctr_update_at: true,
      created_by_user: USER_NAME_SELECT,
      updated_by_user: USER_NAME_SELECT,
      tbl_works: { select: { wrk_code: true, wrk_name: true, tbl_contract_types: { select: { ctt_name: true } } } },
      tbl_providers: {
        select: { prv_name: true, prv_identification: true, tbl_identity_documents: { select: { idd_code: true } } },
      },
      tbl_work_provider_types: { select: { tbl_provider_types: { select: { pvt_name: true, pvt_invoice_mode: true, pvt_invoice_menu: true } } } },
      tbl_work_stages: { select: { wks_name: true } },
      tbl_contract_concepts: { select: CONCEPT_SELECT },
      // Pólizas vigentes, para el conteo de la pestaña (DEC-050).
      _count: { select: { tbl_policies: { where: { pol_is_current: true } } } },
      tbl_contract_status_history: {
        select: {
          csh_id: true,
          csh_from_state: true,
          csh_to_state: true,
          csh_origin: true,
          csh_observation: true,
          csh_create_at: true,
          tbl_reasons: { select: { rea_name: true } },
          created_by_user: USER_NAME_SELECT,
        },
        orderBy: [{ csh_create_at: "desc" }, { csh_id: "desc" }],
      },
      tbl_contract_suspensions: {
        select: {
          csp_id: true,
          csp_suspension_date: true,
          csp_lift_condition: true,
          csp_observation: true,
          csp_requires_report: true,
          csp_lift_date: true,
          csp_days: true,
          csp_create_at: true,
          tbl_reasons: { select: { rea_name: true } },
          tbl_contract_concepts: { select: { ccp_number: true } },
          created_by_user: USER_NAME_SELECT,
        },
        orderBy: [{ csp_suspension_date: "desc" }, { csp_id: "desc" }],
      },
    },
  });
  if (!row) throw httpError(404, "No se encontró el contrato.");
  const suspensions = row.tbl_contract_suspensions.map(suspensionDto);

  const concepts = row.tbl_contract_concepts;
  const extensions = totalExtensions(concepts);
  return {
    ctrId: row.ctr_id,
    wrkId: row.wrk_id,
    prvId: row.prv_id,
    pvtId: row.pvt_id,
    wksId: row.wks_id,
    number: row.ctr_number,
    name: row.ctr_name,
    workCode: row.tbl_works?.wrk_code ?? null,
    workName: row.tbl_works?.wrk_name ?? null,
    providerName: row.tbl_providers?.prv_name ?? null,
    providerIdentification: [row.tbl_providers?.tbl_identity_documents?.idd_code, row.tbl_providers?.prv_identification].filter(Boolean).join(" "),
    stageName: row.tbl_work_stages?.wks_name ?? null,
    contractType: row.tbl_works?.tbl_contract_types?.ctt_name ?? null,
    providerTypeName: row.tbl_work_provider_types?.tbl_provider_types?.pvt_name ?? null,
    // Menú de sus facturas (DEC-074): su tipo de proveedor. Admite facturas
    // si ese tipo factura con contrato; `invoiceMenu`, si el menú se muestra.
    invoiceMode: row.tbl_work_provider_types?.tbl_provider_types?.pvt_invoice_mode ?? null,
    invoiceMenu: Boolean(row.tbl_work_provider_types?.tbl_provider_types?.pvt_invoice_menu),
    startDate: dateOnlyText(row.ctr_start_date),
    term: row.ctr_term,
    termUnit: row.ctr_term_unit,
    totalExtensions: extensions,
    suspendedDays: row.ctr_suspended_days,
    endDate: dateOnlyText(row.ctr_end_date),
    // Suspendido: congelada hasta reanudar (PRO-BE-10).
    endDateProvisional: isEndDateProvisional(row.ctr_state),
    state: row.ctr_state,
    stateName: STATE_NAMES[row.ctr_state] ?? row.ctr_state,
    // Qué admite el estado actual (ADR-0017): el cliente lo cruza con los permisos.
    allowedActions: STATE_ALLOWS[row.ctr_state] ?? [],
    hasLiquidation: concepts.some((c) => c.ccp_type === CONCEPT_TYPES.LIQUIDATION),
    // Con una factura aprobada, costo y porcentajes de los conceptos no cambian (DOM-07).
    economicsLocked: await hasApprovedInvoices(prisma, row.ctr_id),
    currentPolicies: row._count?.tbl_policies ?? 0,
    observation: row.ctr_observation,
    aiuRequested: row.ctr_aiu_requested,
    staId: row.sta_id,
    createdAt: row.ctr_create_at,
    createdByName: userFullName(row.created_by_user),
    updatedAt: row.ctr_update_at,
    updatedByName: userFullName(row.updated_by_user),
    ...totalsDto(concepts),
    concepts: conceptsDto(concepts),
    // Suspensiones (DEC-039): la abierta, si la hay, y el historial completo.
    openSuspension: suspensions.find((s) => s.open) ?? null,
    suspensions,
    history: row.tbl_contract_status_history.map((h) => ({
      cshId: h.csh_id,
      fromState: h.csh_from_state,
      fromStateName: h.csh_from_state ? STATE_NAMES[h.csh_from_state] : null,
      toState: h.csh_to_state,
      toStateName: STATE_NAMES[h.csh_to_state],
      origin: h.csh_origin,
      reasonName: h.tbl_reasons?.rea_name ?? null,
      observation: h.csh_observation,
      createdAt: h.csh_create_at,
      createdByName: userFullName(h.created_by_user),
    })),
  };
};

// ─── Opciones del formulario ─────────────────────────────────────────────────

/**
 * Obras activas para el formulario de contrato, con tope fijo (como un
 * selector, DEC-018). `includeWrkId`: una obra ya elegida (p. ej. la que abre
 * el formulario) se devuelve aunque la búsqueda o el tope la dejen fuera,
 * siempre que esté activa.
 */
export const selectContractWorks = async ({ search, includeWrkId, scope } = {}) => {
  const value = text(search);
  const select = { wrk_id: true, wrk_code: true, wrk_name: true };
  const rows = await prisma.tbl_works.findMany({
    where: {
      sta_id: ACTIVE_STATUS,
      ...scopeWhere(scope),
      ...(value ? { OR: [{ wrk_code: { contains: value } }, { wrk_name: { contains: value } }] } : {}),
    },
    select,
    orderBy: { wrk_code: "asc" },
    take: MAX_ROWS,
  });
  const includeId = Number(includeWrkId) || null;
  if (includeId && !rows.some((row) => row.wrk_id === includeId)) {
    const included = await prisma.tbl_works.findFirst({ where: { wrk_id: includeId, sta_id: ACTIVE_STATUS, ...scopeWhere(scope) }, select });
    if (included) rows.unshift(included);
  }
  return rows.map((row) => ({ value: row.wrk_id, label: `${row.wrk_code} — ${row.wrk_name}` }));
};

/**
 * Etapas y proveedores de una obra para el formulario (ADR-0015, "Frontend":
 * los selectores se filtran por la obra). Activos, más la etapa y el
 * proveedor actuales del contrato aunque ya no lo estén (mismo criterio que
 * los maestros, DOM-21).
 */
export const getContractFormOptions = async ({ wrkId, includeWksId, includePrvId, includePvtId, scope }) => {
  assertInScope(scope, wrkId, "No se encontró la obra.");
  const id = Number(wrkId);
  const [work, stages, assignments] = await Promise.all([
    prisma.tbl_works.findUnique({ where: { wrk_id: id }, select: WORK_TERM_SELECT }),
    prisma.tbl_work_stages.findMany({
      where: { wrk_id: id, OR: [{ sta_id: ACTIVE_STATUS }, ...(includeWksId ? [{ wks_id: Number(includeWksId) }] : [])] },
      select: { wks_id: true, wks_name: true, sta_id: true },
      orderBy: [{ wks_order: "asc" }, { wks_name: "asc" }],
    }),
    prisma.tbl_work_providers.findMany({
      where: {
        wrk_id: id,
        OR: [
          { sta_id: ACTIVE_STATUS, tbl_providers: { sta_id: ACTIVE_STATUS } },
          ...(includePrvId ? [{ prv_id: Number(includePrvId) }] : []),
        ],
      },
      select: {
        prv_id: true,
        tbl_providers: { select: { prv_name: true, prv_identification: true } },
        tbl_work_provider_types: {
          select: { pvt_id: true, tbl_provider_types: { select: { pvt_name: true, pvt_invoice_mode: true, sta_id: true } } },
          orderBy: { tbl_provider_types: { pvt_name: "asc" } },
        },
      },
      orderBy: { tbl_providers: { prv_name: "asc" } },
      take: MAX_ROWS,
    }),
  ]);
  return {
    // Plazo de la obra: entre estas fechas cae la de inicio del contrato.
    work: work ? workTermOf(work) : null,
    stages: stages.map((s) => ({ value: s.wks_id, label: s.sta_id === ACTIVE_STATUS ? s.wks_name : `${s.wks_name} (inactiva)` })),
    providers: assignments.map((a) => ({
      value: a.prv_id,
      label: `${a.tbl_providers.prv_name} · ${a.tbl_providers.prv_identification}`,
      // Tipos de la obra que facturan con contrato (DEC-074), activos, más el
      // del contrato que se edita aunque ya no lo esté.
      types: a.tbl_work_provider_types
        .filter(
          (t) =>
            (isContractMode(t.tbl_provider_types.pvt_invoice_mode) && t.tbl_provider_types.sta_id === ACTIVE_STATUS) ||
            (Number(includePvtId) === t.pvt_id && Number(includePrvId) === a.prv_id)
        )
        .map((t) => ({ value: t.pvt_id, label: t.tbl_provider_types.pvt_name, invoiceMode: t.tbl_provider_types.pvt_invoice_mode })),
      // Tipos de forma simple en la obra: admite facturas simples en sus menús (lo usa el formulario de factura).
      simpleTypes: a.tbl_work_provider_types.filter((t) => isSimpleMode(t.tbl_provider_types.pvt_invoice_mode)).map((t) => t.pvt_id),
    })),
  };
};

/**
 * Descriptores de los campos configurables del contrato para el formulario
 * (ADR-0006, decisión 5): la configuración vigente del tipo de proveedor del
 * contrato (DEC-066). El cliente no deduce la configuración: la recibe.
 *
 * - `prvId` y `pvtId`: el proveedor y el tipo elegidos en el formulario
 *   (crear, o editar cambiándolos). El proveedor debe estar en el alcance por
 *   obra (DEC-047).
 * - `ctrId`: los campos de ese contrato; sin `pvtId`, con su tipo. Si no
 *   solicita AIU, A, I y U no aplican (DEC-046).
 */
export const getContractFields = async ({ prvId, pvtId, ctrId, scope }) => {
  let contract = null;
  if (Number(ctrId) > 0) {
    await assertContractInScope(scope, ctrId);
    contract = await prisma.tbl_contracts.findUnique({
      where: { ctr_id: Number(ctrId) },
      select: { prv_id: true, pvt_id: true, ctr_aiu_requested: true },
    });
  }
  const providerId = Number(prvId) > 0 ? Number(prvId) : contract?.prv_id;
  if (Number(prvId) > 0 && providerId !== contract?.prv_id) await assertProviderInScope(scope, providerId);
  const typeId = Number(pvtId) > 0 ? Number(pvtId) : contract?.pvt_id;
  const type = typeId
    ? await prisma.tbl_provider_types.findUnique({ where: { pvt_id: typeId }, select: { pvt_id: true, sta_id: true } })
    : null;
  if (!type || type.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró el tipo de proveedor.");

  const fields = await resolveContractTypeFields(prisma, type.pvt_id);
  return {
    prvId: providerId ?? null,
    pvtId: type.pvt_id,
    typeAppliesAiu: typeAppliesAiu(fields),
    ...(contract ? { aiuRequested: contract.ctr_aiu_requested } : {}),
    fields: contract ? withContractAiu(fields, contract.ctr_aiu_requested) : fields,
  };
};

// ─── Guardado ────────────────────────────────────────────────────────────────

/** Cabecera del cliente → columnas. La fecha fin y el estado nunca vienen del cliente. */
const headerValuesOf = (input) => ({
  prv_id: Number(input.prvId),
  pvt_id: Number(input.pvtId),
  wks_id: Number(input.wksId) > 0 ? Number(input.wksId) : null,
  ctr_number: text(input.number),
  ctr_name: text(input.name),
  ctr_start_date: toDateOnly(input.startDate),
  ctr_term: Number(input.term),
  ctr_term_unit: input.termUnit,
  ctr_observation: optionalText(input.observation),
});

// Bitácora funcional (ADR-0015, "Auditoría"). Nombre y observaciones: técnica.
const CONTRACT_AUDITED = [
  "wrk_id",
  "prv_id",
  "pvt_id",
  "wks_id",
  "ctr_number",
  "ctr_start_date",
  "ctr_term",
  "ctr_term_unit",
  "ctr_end_date",
  "ctr_aiu_requested",
];
const auditableContract = (row) =>
  Object.fromEntries(
    Object.entries(row).map(([column, value]) => [column, column === "ctr_start_date" || column === "ctr_end_date" ? dateOnlyText(value) : value])
  );

/** La obra existe y no está eliminada; si el contrato es nuevo, además activa. */
const WORK_TERM_SELECT = { wrk_start_date: true, wrk_initial_term: true, wrk_term_unit: true };

/** Inicio y fin de la obra, "AAAA-MM-DD": el fin, inicio + plazo, como en el listado de obras. */
const workTermOf = (work) => ({
  startDate: dateOnlyText(work.wrk_start_date),
  endDate: addTerm(work.wrk_start_date, work.wrk_initial_term, work.wrk_term_unit),
});

const assertWork = async (tx, wrkId, { isNew }) => {
  const work = await tx.tbl_works.findUnique({ where: { wrk_id: wrkId }, select: { sta_id: true, wrk_code: true, ...WORK_TERM_SELECT } });
  if (!work || work.sta_id === DELETED_STATUS) throw httpError(400, "La obra seleccionada no existe.");
  if (isNew && work.sta_id !== ACTIVE_STATUS) throw httpError(400, `La obra ${work.wrk_code} está inactiva: no admite contratos nuevos.`);
  return work;
};

/**
 * La fecha de inicio del contrato cae dentro del plazo de su obra: ni antes de
 * su inicio ni después de su fin. Las fechas "AAAA-MM-DD" se comparan como texto.
 */
const assertStartWithinWork = (work, startDate) => {
  const start = dateOnlyText(startDate);
  const { startDate: from, endDate: to } = workTermOf(work);
  if (start < from) throw httpError(400, `La fecha de inicio del contrato no puede ser anterior al inicio de la obra (${from}).`);
  if (to && start > to) throw httpError(400, `La fecha de inicio del contrato no puede ser posterior al fin de la obra (${to}).`);
};

/** La etapa, si hay, es de la obra (ADR-0015, regla 2) y está activa, salvo que sea la que ya tenía. */
const assertStage = async (tx, { wrkId, wksId, currentWksId }) => {
  if (wksId === null) return;
  const stage = await tx.tbl_work_stages.findUnique({ where: { wks_id: wksId }, select: { wrk_id: true, sta_id: true, wks_name: true } });
  if (!stage || stage.wrk_id !== wrkId) throw httpError(400, "La etapa seleccionada no pertenece a la obra del contrato.");
  if (stage.sta_id !== ACTIVE_STATUS && wksId !== currentWksId) {
    throw httpError(400, `La etapa "${stage.wks_name}" está inactiva y no se puede asignar.`);
  }
};

/** El proveedor está asignado a la obra (ADR-0015, regla 3); asignación y proveedor activos, salvo el que ya tenía. */
const assertProviderAssigned = async (tx, { wrkId, prvId, currentPrvId }) => {
  const assignment = await tx.tbl_work_providers.findUnique({
    where: { wrk_id_prv_id: { wrk_id: wrkId, prv_id: prvId } },
    select: { sta_id: true, tbl_providers: { select: { prv_name: true, sta_id: true } } },
  });
  if (!assignment) throw httpError(400, "El proveedor seleccionado no está asignado a la obra del contrato.");
  if (prvId === currentPrvId) return;
  if (assignment.tbl_providers.sta_id !== ACTIVE_STATUS) throw httpError(400, `El proveedor ${assignment.tbl_providers.prv_name} está inactivo.`);
  if (assignment.sta_id !== ACTIVE_STATUS) {
    throw httpError(400, `La asignación de ${assignment.tbl_providers.prv_name} a la obra está inactiva.`);
  }
};

/**
 * Tipo de proveedor del contrato (DEC-066), con obra, proveedor y tipo
 * bloqueados: uno de los tipos con que el proveedor trabaja en la obra (la
 * FK compuesta es la garantía), que factura con contrato (DEC-074) y activo,
 * salvo que sea el que ya tenía.
 */
const assertContractType = async (tx, { wrkId, prvId, pvtId, before = null }) => {
  const unchanged = before && before.prv_id === prvId && before.pvt_id === pvtId;
  if (unchanged) return;
  if (!(pvtId > 0)) throw httpError(400, "Selecciona el tipo de proveedor del contrato.");
  const row = await tx.tbl_work_provider_types.findUnique({
    where: { wrk_id_prv_id_pvt_id: { wrk_id: wrkId, prv_id: prvId, pvt_id: pvtId } },
    select: { tbl_provider_types: { select: { pvt_name: true, pvt_invoice_mode: true, sta_id: true } } },
  });
  if (!row) throw httpError(400, "El proveedor no trabaja en esta obra con el tipo de proveedor seleccionado.");
  const type = row.tbl_provider_types;
  if (type.sta_id !== ACTIVE_STATUS) throw httpError(400, `El tipo de proveedor "${type.pvt_name}" está inactivo y no se puede asignar.`);
  if (!isContractMode(type.pvt_invoice_mode)) {
    throw httpError(400, `El tipo de proveedor "${type.pvt_name}" no admite contratos: no factura con contrato.`);
  }
};

// El número es único dentro de la obra entre los no eliminados (DEC-035). El
// UNIQUE de la BD es la garantía ante dos peticiones simultáneas; esto da el
// mensaje claro.
const assertUniqueNumber = async (tx, { wrkId, number, excludeId = null }) => {
  const duplicate = await tx.tbl_contracts.findFirst({
    where: { wrk_id: wrkId, ctr_number: number, sta_id: { not: DELETED_STATUS }, ...(excludeId ? { ctr_id: { not: excludeId } } : {}) },
    select: { ctr_id: true },
  });
  if (duplicate) throw httpError(409, `Ya existe un contrato con el número ${number} en esta obra.`);
};

/** Facturas del contrato, de cualquier estado: una anulada también es historial (DEC-042). */
const countInvoices = (tx, ctrId) => tx.tbl_invoices.count({ where: { ctr_id: ctrId } });

/**
 * Si el contrato tuvo alguna factura aprobada (DOM-07, ADR-0016 regla 14):
 * desde entonces los valores económicos de sus conceptos no cambian. Cuenta
 * también las anuladas después de aprobarse (conservan la fecha de
 * aprobación): el congelamiento es un hecho, no se deshace.
 */
export const hasApprovedInvoices = async (db, ctrId) =>
  (await db.tbl_invoices.count({ where: { ctr_id: Number(ctrId), inv_approval_date: { not: null } } })) > 0;

/** Algún concepto vigente del contrato pactó A, I o U mayores que 0. */
const hasAgreedAiu = async (tx, ctrId) =>
  (await tx.tbl_contract_concepts.count({
    where: {
      ctr_id: ctrId,
      sta_id: { not: DELETED_STATUS },
      OR: [{ ccp_admin_pct: { gt: 0 } }, { ccp_contingency_pct: { gt: 0 } }, { ccp_profit_pct: { gt: 0 } }],
    },
  })) > 0;

/**
 * Solicitud de AIU del contrato (ADR-0026, P13; DEC-046), con la
 * configuración de su tipo de proveedor ya resuelta bajo bloqueo (DEC-066):
 *
 * - Valor por defecto: al crear, el del tipo (solicita AIU si lo aplica); al
 *   editar, el guardado. Sin `aiuRequested` en la petición se conserva el
 *   valor por defecto.
 * - Apartarse de él (apagarlo o encenderlo) exige el permiso propio.
 * - No se enciende si el tipo de proveedor no aplica AIU (400).
 * - No se apaga si algún concepto vigente ya pactó A, I o U (409): se
 *   corrigen antes los conceptos, con su propio permiso.
 */
const resolveAiuRequested = async (tx, { input, descriptors, before = null, granted }) => {
  const typeApplies = typeAppliesAiu(descriptors);
  const current = before ? before.ctr_aiu_requested : typeApplies;
  const requested = input.aiuRequested === undefined || input.aiuRequested === null ? current : input.aiuRequested === true;
  if (requested === current) return requested;

  if (!granted?.has(PERMISSIONS.work.contracts.changeAiu)) {
    throw httpError(403, `${requested ? "Solicitar" : "Apagar"} el AIU del contrato exige el permiso de cambiar la solicitud de AIU.`);
  }
  if (requested && !typeApplies) throw httpError(400, "El tipo de proveedor del contrato no aplica AIU: el contrato no puede solicitarlo.");
  if (!requested && before && (await hasAgreedAiu(tx, before.ctr_id))) {
    throw httpError(409, "Algún concepto del contrato ya pactó porcentajes de AIU. Llévalos a 0 en cada concepto antes de apagar el AIU.");
  }
  return requested;
};

const assertHeader = (values) => {
  if (!values.ctr_start_date) throw httpError(400, "La fecha de inicio no es una fecha válida.");
};

const IDEMPOTENCY_TARGET = {
  model: prisma.tbl_contracts,
  keyField: "ctr_idempotency_key",
  hashField: "ctr_idempotency_hash",
  ownerField: "ctr_create_by",
  select: { ctr_id: true },
  toResult: (row) => ({ message: "Contrato creado correctamente", ctrId: row.ctr_id }),
};

const createContract = ({ wrkId, input, policies, granted, useBy, ctx, idempotencyData }) =>
  withLockedTransaction(
    {
      OBRA: wrkId,
      PROVEEDOR: Number(input.prvId),
      ...(Number(input.pvtId) > 0 ? { TIPO_PROVEEDOR: Number(input.pvtId) } : {}),
      ...(policies.length > 0 && { ASEGURADORA: policies.map((p) => p.ins_id), TIPO_POLIZA: policies.map((p) => p.plt_id) }),
    },
    async (tx) => {
      await assertProviderAssigned(tx, { wrkId, prvId: Number(input.prvId) });
      // Tipo de proveedor del contrato y su configuración (DEC-066), con obra,
      // proveedor y tipo bloqueados: no cambian en medio.
      await assertContractType(tx, { wrkId, prvId: Number(input.prvId), pvtId: Number(input.pvtId) });
      const descriptors = await resolveContractTypeFields(tx, Number(input.pvtId));
      const aiuRequested = await resolveAiuRequested(tx, { input, descriptors, granted });
      const values = {
        ...headerValuesOf(enforceFields({ descriptors, group: FIELD_GROUPS.CONTRACT, input })),
        ctr_aiu_requested: aiuRequested,
      };
      // El valor inicial toma la fecha del contrato y no lleva descripción
      // propia. Si el contrato no solicita AIU, A, I y U no se aceptan.
      const { ccp_start_date: _start, ccp_description: _description, ...initialConcept } = conceptValuesOf(
        enforceFields({
          descriptors: withContractAiu(descriptors, aiuRequested),
          group: FIELD_GROUPS.CONCEPT,
          input: input.initialConcept ?? {},
          skip: ["CONCEPT_DESCRIPTION"],
        })
      );

      const work = await assertWork(tx, wrkId, { isNew: true });
      assertStartWithinWork(work, values.ctr_start_date);
      await assertStage(tx, { wrkId, wksId: values.wks_id });
      await assertUniqueNumber(tx, { wrkId, number: values.ctr_number });

      const { to: initialState } = assertTransition("create");

      // Sin otrosí ni suspensiones todavía: inicio + plazo.
      const endDate = toDateOnly(contractEndDate({ startDate: values.ctr_start_date, term: values.ctr_term, unit: values.ctr_term_unit }));
      const created = await tx.tbl_contracts.create({
        data: {
          wrk_id: wrkId,
          ...values,
          ctr_end_date: endDate,
          ctr_state: initialState,
          sta_id: ACTIVE_STATUS,
          ctr_create_by: useBy,
          ctr_update_by: useBy,
          ...idempotencyData,
        },
      });
      const ctrId = created.ctr_id;

      // El valor inicial nace con el contrato: es lo que garantiza el mínimo de
      // uno, que el esquema no puede expresar (ADR-0016, decisión 3).
      const concept = await tx.tbl_contract_concepts.create({
        data: {
          ctr_id: ctrId,
          ccp_type: CONCEPT_TYPES.INITIAL,
          ...initialConcept,
          ccp_start_date: values.ctr_start_date,
          ccp_create_by: useBy,
          ccp_update_by: useBy,
        },
      });
      await tx.tbl_contract_status_history.create({ data: historyRow({ ctrId, transition: "create", useBy }) });

      const operationId = newOperationId();
      await writeAudit(tx, {
        operationId,
        entity: AUDIT_ENTITIES.CONTRACT,
        recordId: ctrId,
        operation: AUDIT_OPERATIONS.CREATE,
        ctx,
        changes: [
          ...diffFields({}, auditableContract({ wrk_id: wrkId, ...values, ctr_end_date: endDate }), CONTRACT_AUDITED),
          { field: "ctr_state", oldValue: null, newValue: initialState },
        ],
      });
      await writeAudit(tx, {
        operationId,
        entity: AUDIT_ENTITIES.CONTRACT_CONCEPT,
        recordId: concept.ccp_id,
        operation: AUDIT_OPERATIONS.CREATE,
        ctx,
        changes: diffFields(
          {},
          auditableConcept({ ccp_type: CONCEPT_TYPES.INITIAL, ...initialConcept, ccp_start_date: values.ctr_start_date }),
          CONCEPT_AUDITED
        ),
      });

      // Las pólizas de la creación amparan el valor inicial, el único concepto
      // que existe todavía (ADR-0018, "Transacciones"; PRO-BE-09).
      if (policies.length > 0) assertStateAllows(initialState, "createPolicy");
      for (const values of policies) {
        await insertPolicy(tx, { ctrId, ccpId: concept.ccp_id, values, useBy, ctx, operationId });
      }

      return { message: "Contrato creado correctamente", ctrId };
    }
  );

// Editar fija la cabecera: repetirlo deja lo mismo, así que se puede
// reintentar ante un interbloqueo. La obra no cambia.
const updateContract = async ({ ctrId, input, granted, useBy, ctx }) => {
  // La obra del contrato no cambia nunca después de crearlo, así que leerla
  // antes del bloqueo no da una foto vieja de nada que decida: solo dice qué
  // obra bloquear primero (ADR-0027, regla 3). Bajo bloqueo se vuelve a leer.
  const known = await prisma.tbl_contracts.findUnique({ where: { ctr_id: Number(ctrId) }, select: { wrk_id: true } });
  if (!known) throw httpError(404, "No se encontró el contrato.");

  return withLockedTransaction(
    {
      OBRA: known.wrk_id,
      PROVEEDOR: Number(input.prvId),
      CONTRATO: ctrId,
      ...(Number(input.pvtId) > 0 ? { TIPO_PROVEEDOR: Number(input.pvtId) } : {}),
    },
    async (tx) => {
      const before = await findLockedContract(tx, ctrId);
      assertStateAllows(before.ctr_state, "editContract");
      const wrkId = before.wrk_id;
      await assertProviderAssigned(tx, { wrkId, prvId: Number(input.prvId), currentPrvId: before.prv_id });

      // Tipo de proveedor y su configuración actual (DEC-066). Un valor
      // guardado en un campo que dejó de aplicar se conserva como heredado
      // (ADR-0006, decisiones 7 y 8).
      await assertContractType(tx, { wrkId, prvId: Number(input.prvId), pvtId: Number(input.pvtId), before });
      const descriptors = await resolveContractTypeFields(tx, Number(input.pvtId));
      const values = {
        ...headerValuesOf(enforceFields({ descriptors, group: FIELD_GROUPS.CONTRACT, input, before })),
        ctr_aiu_requested: await resolveAiuRequested(tx, { input, descriptors, before, granted }),
      };

      const work = await assertWork(tx, wrkId, { isNew: false });
      // Solo si cambia: un contrato anterior a la regla se sigue editando.
      if (dateOnlyText(values.ctr_start_date) !== dateOnlyText(before.ctr_start_date)) assertStartWithinWork(work, values.ctr_start_date);
      await assertStage(tx, { wrkId, wksId: values.wks_id, currentWksId: before.wks_id });
      await assertUniqueNumber(tx, { wrkId, number: values.ctr_number, excludeId: before.ctr_id });
      // Las facturas son del proveedor del contrato: con facturas, no cambia
      // (lo garantiza también la FK compuesta de tbl_invoices, DEC-042). Su
      // menú tampoco (DEC-066): con facturas, el tipo de proveedor no cambia.
      if (values.prv_id !== before.prv_id && (await countInvoices(tx, before.ctr_id)) > 0) {
        throw httpError(409, "El contrato tiene facturas registradas: no se puede cambiar su proveedor.");
      }
      if (values.pvt_id !== before.pvt_id && (await countInvoices(tx, before.ctr_id)) > 0) {
        throw httpError(409, "El contrato tiene facturas registradas: no se puede cambiar su tipo de proveedor.");
      }

      // La fecha fin se recalcula en la misma transacción (ADR-0015, decisión 5).
      const endDate = await derivedEndDate(tx, { ...before, ...values });
      await tx.tbl_contracts.update({
        where: { ctr_id: before.ctr_id },
        data: { ...values, ctr_end_date: endDate, ctr_update_by: useBy },
      });
      // La fecha del valor inicial es la del contrato.
      if (dateOnlyText(before.ctr_start_date) !== dateOnlyText(values.ctr_start_date)) {
        await tx.tbl_contract_concepts.updateMany({
          where: { ctr_id: before.ctr_id, ccp_type: CONCEPT_TYPES.INITIAL },
          data: { ccp_start_date: values.ctr_start_date, ccp_update_by: useBy },
        });
      }

      const changes = diffFields(auditableContract(before), auditableContract({ ...values, ctr_end_date: endDate }), CONTRACT_AUDITED);
      if (changes.length > 0) {
        await writeAudit(tx, { entity: AUDIT_ENTITIES.CONTRACT, recordId: before.ctr_id, operation: AUDIT_OPERATIONS.UPDATE, ctx, changes });
      }
      return { message: "Contrato modificado correctamente", ctrId: before.ctr_id };
    },
    { idempotent: true }
  );
};

/**
 * Crear (ctrId vacío o 0) con su valor inicial, o editar la cabecera. Crear
 * exige `input.initialConcept`; al editar se ignora: los conceptos se
 * modifican con su propio endpoint y permiso.
 */
export const saveContract = async ({ ctrId, input, useBy, granted, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  // Alcance por obra (DEC-047): el contrato se crea y se edita solo en la obra del alcance.
  if (Number(ctrId) > 0) await assertContractInScope(scope, ctrId);
  else assertInScope(scope, input.wrkId, "No se encontró la obra.");
  const values = headerValuesOf(input);
  assertHeader(values);

  if (Number(ctrId) > 0) return updateContract({ ctrId: Number(ctrId), input, granted, useBy: Number(useBy), ctx });

  const wrkId = Number(input.wrkId);
  // La huella de idempotencia es de lo que pidió el cliente; la
  // configuración de los tipos del proveedor se aplica dentro de la transacción.
  const { ccp_start_date: _start, ccp_description: _description, ...initialConcept } = conceptValuesOf(input.initialConcept ?? {});
  const policies = policiesOf(input, granted);

  // La clave se busca antes que el número repetido: el reintento de una
  // creación exitosa devuelve el contrato creado y no "ya existe".
  return runIdempotent({
    target: IDEMPOTENCY_TARGET,
    key: idempotencyKey,
    ownerId: useBy,
    payload: {
      wrkId,
      ...auditableContract(values),
      aiuRequested: input.aiuRequested ?? null,
      initialConcept: auditableConcept(initialConcept),
      policies: policiesPayload(policies),
    },
    execute: (idempotencyData) => createContract({ wrkId, input, policies, granted, useBy: Number(useBy), ctx, idempotencyData }),
  });
};

/**
 * Pólizas que llegan con un acto que crea un concepto: la creación del
 * contrato, sobre el valor inicial (PRO-BE-09), y el otrosí (ADR-0027,
 * catálogo de operaciones críticas). Son opcionales; si llegan, exigen el
 * permiso de registrar pólizas: el acto no lo da (403). Un concepto admite
 * una póliza vigente por tipo, así que el envío no repite tipo (400); contra
 * las ya guardadas lo verifica insertPolicy.
 *
 * - `act`: cómo se nombra el acto en el 403 ("el contrato", "el otrosí").
 * - `concept`: el concepto que amparan, para el 400 ("el valor inicial").
 */
export const policiesOf = (input, granted, { act = "el contrato", concept = "el valor inicial" } = {}) => {
  const policies = (input.policies ?? []).map(policyValuesOf);
  if (policies.length === 0) return policies;
  if (!granted?.has(PERMISSIONS.work.policies.create)) {
    throw httpError(403, `No tienes permiso para registrar pólizas. Registra ${act} sin ellas.`);
  }
  if (new Set(policies.map((p) => p.plt_id)).size !== policies.length) {
    throw httpError(400, `Hay dos pólizas del mismo tipo: ${concept} admite una por tipo.`);
  }
  return policies;
};

/** Pólizas como huella de idempotencia: textos, no Decimal ni Date. */
export const policiesPayload = (policies) =>
  policies.map((p) => ({ ...p, pol_percentage: percentText(p.pol_percentage), pol_start_date: dateOnlyText(p.pol_start_date), pol_end_date: dateOnlyText(p.pol_end_date) }));

// ─── Eliminación ─────────────────────────────────────────────────────────────

/**
 * Eliminación lógica (ADR-0015, decisión 11). Un contrato con facturas, sea
 * cual sea su estado, no se elimina (409, DEC-042); con pólizas, tampoco
 * (DEC-050). Conceptos e historial se
 * conservan: un contrato eliminado es historial, y su número queda libre en
 * la obra.
 */
export const deleteContract = async ({ ctrId, useBy, scope, ctx = { useId: useBy } }) => {
  await assertContractInScope(scope, ctrId);
  return withLockedTransaction({ CONTRATO: ctrId }, async (tx) => {
    const before = await findLockedContract(tx, ctrId);
    const invoices = await countInvoices(tx, before.ctr_id);
    if (invoices > 0) throw httpError(409, `No se puede eliminar el contrato: tiene ${invoices} factura(s) registrada(s).`);
    // Las pólizas son evidencia (ADR-0018): ni las anuladas se pierden con el contrato.
    const policies = await tx.tbl_policies.count({ where: { ctr_id: before.ctr_id } });
    if (policies > 0) throw httpError(409, `No se puede eliminar el contrato: tiene ${policies} póliza(s) registrada(s), contando versiones y anuladas.`);
    await tx.tbl_contracts.update({
      where: { ctr_id: before.ctr_id },
      data: { sta_id: DELETED_STATUS, ctr_update_by: Number(useBy), ctr_delete_by: Number(useBy), ctr_delete_at: new Date() },
    });
    await writeAudit(tx, {
      entity: AUDIT_ENTITIES.CONTRACT,
      recordId: before.ctr_id,
      operation: AUDIT_OPERATIONS.DELETE,
      ctx,
      changes: diffFields(before, { sta_id: DELETED_STATUS }, ["sta_id"]),
    });
    return { message: "Contrato eliminado correctamente" };
  });
};
