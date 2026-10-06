import { prisma } from "../../../common/configs/prismaClient.js";
import { paginate, MAX_ROWS } from "../../../common/utils/pagination.utils.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { decimal, moneyText, percentText, toMoney, toPercent } from "../../../common/utils/money.utils.js";
import { dateOnlyText, toDateOnly } from "../../../common/utils/term.utils.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, newOperationId, writeAudit } from "../../../common/services/audit.service.js";
import { contractTypesService } from "../../admin/contractTypes/contractTypes.service.js";
import { resolveContractFields } from "../../admin/contractTypes/contractTypeFields.service.js";
import { FIELD_GROUPS, enforceFields, typeAppliesAiu, withContractAiu } from "../../admin/contractTypes/contractFields.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import {
  CONCEPT_TYPES,
  CONCEPT_TYPE_NAMES,
  STATE_ALLOWS,
  STATE_NAMES,
  assertStateAllows,
  assertTransition,
  conceptAmounts,
  contractEndDate,
  contractTotals,
  historyRow,
  sortConcepts,
  totalExtensions,
} from "./contractTerms.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";

/**
 * Contratos (ADR-0015 a ADR-0017, DEC-035). El contrato es la raíz del
 * agregado económico: se crea con su valor inicial y su primera fila de
 * historial en una sola transacción, y su valor es la suma de sus conceptos
 * (no se guarda). Los otrosí viven en contractConcepts.service.js.
 *
 * - Bloqueo: obra → proveedor → contrato → maestros (ADR-0027, DEC-019).
 *   Crear bloquea la obra (sus etapas y asignaciones solo cambian bajo ese
 *   bloqueo), el proveedor y el tipo de contrato.
 * - La obra no cambia después de crear el contrato. Etapa y proveedor deben
 *   ser de esa obra: lo valida el service y lo garantizan las FK compuestas.
 * - Fecha fin: la calcula contractEndDate, nunca el cliente.
 * - Estado: solo cambia por las transiciones de contractTerms.js, con
 *   historial. Editar exige que el estado lo admita (409 si no).
 * - Campos configurables (etapa, observaciones, porcentajes; DEC-037): se
 *   aplican con la configuración actual del tipo, resuelta dentro de la
 *   transacción por la misma función que entrega los descriptores al
 *   formulario. El contrato guarda la versión con que se capturó.
 * - AIU en cadena (ADR-0026, P13; DEC-046): el tipo declara si aplica, el
 *   contrato lo solicita (`ctr_aiu_requested`) y el concepto pacta A, I y U.
 *   Apagarlo o encenderlo exige el permiso propio.
 */

export const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

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
      wks_id: true,
      ctt_id: true,
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
 */
export const previewContractEndDate = async ({ ctrId, startDate, term, termUnit }) => {
  let extensions = 0;
  let suspendedDays = 0;
  if (Number(ctrId) > 0) {
    const contract = await prisma.tbl_contracts.findFirst({
      where: { ctr_id: Number(ctrId), sta_id: { not: DELETED_STATUS } },
      select: { ctr_suspended_days: true, tbl_contract_concepts: { select: { ccp_type: true, ccp_extension: true, sta_id: true } } },
    });
    if (!contract) throw httpError(404, "No se encontró el contrato.");
    extensions = totalExtensions(contract.tbl_contract_concepts);
    suspendedDays = contract.ctr_suspended_days;
  }
  return { endDate: contractEndDate({ startDate, term, unit: termUnit, extensions, suspendedDays }) };
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
  contractType: (order) => ({ tbl_contract_types: { ctt_name: order } }),
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
  tbl_works: { select: { wrk_code: true, wrk_name: true } },
  tbl_providers: { select: { prv_name: true } },
  tbl_work_stages: { select: { wks_name: true } },
  tbl_contract_types: { select: { ctt_name: true } },
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
  stageName: row.tbl_work_stages?.wks_name ?? null,
  contractType: row.tbl_contract_types?.ctt_name ?? null,
  startDate: dateOnlyText(row.ctr_start_date),
  endDate: dateOnlyText(row.ctr_end_date),
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
 * Contratos no eliminados, paginados. `state` filtra por estado del ciclo de
 * vida (las pestañas), `wrkId`, por obra (la pestaña de la obra) y `cttId`,
 * por tipo de contrato. Los conteos de las pestañas respetan obra y tipo.
 */
export const paginationContracts = async ({ search, state, wrkId, cttId, rows, first, sortField, sortOrder }) => {
  const order = Number(sortOrder) === 1 ? "asc" : "desc";
  const orderBy = (SORT_FIELDS[sortField] ?? SORT_FIELDS.updatedAt)(order);

  const baseWhere = {
    sta_id: { not: DELETED_STATUS },
    ...(Number(wrkId) > 0 ? { wrk_id: Number(wrkId) } : {}),
    ...(Number(cttId) > 0 ? { ctt_id: Number(cttId) } : {}),
    ...searchWhereOf(search),
  };
  const where = { ...baseWhere, ...(state ? { ctr_state: state } : {}) };

  const [page, statusCounts] = await Promise.all([
    paginate(prisma.tbl_contracts, { where, select: LIST_SELECT, orderBy }, { first, rows }),
    countByState(baseWhere),
  ]);
  return { ...page, results: page.results.map(toListDto), statusCounts };
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

export const getContract = async ({ ctrId }) => {
  const row = await prisma.tbl_contracts.findFirst({
    where: { ctr_id: Number(ctrId), sta_id: { not: DELETED_STATUS } },
    select: {
      ctr_id: true,
      wrk_id: true,
      prv_id: true,
      wks_id: true,
      ctt_id: true,
      ctr_number: true,
      ctr_name: true,
      ctr_start_date: true,
      ctr_term: true,
      ctr_term_unit: true,
      ctr_end_date: true,
      ctr_suspended_days: true,
      ctr_state: true,
      ctr_config_version: true,
      ctr_observation: true,
      ctr_aiu_requested: true,
      sta_id: true,
      ctr_create_at: true,
      ctr_update_at: true,
      created_by_user: USER_NAME_SELECT,
      updated_by_user: USER_NAME_SELECT,
      tbl_works: { select: { wrk_code: true, wrk_name: true } },
      tbl_providers: { select: { prv_name: true, prv_identification: true, tbl_identity_documents: { select: { idd_code: true } } } },
      tbl_work_stages: { select: { wks_name: true } },
      tbl_contract_types: { select: { ctt_name: true } },
      tbl_contract_concepts: { select: CONCEPT_SELECT },
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
    wksId: row.wks_id,
    cttId: row.ctt_id,
    number: row.ctr_number,
    name: row.ctr_name,
    workCode: row.tbl_works?.wrk_code ?? null,
    workName: row.tbl_works?.wrk_name ?? null,
    providerName: row.tbl_providers?.prv_name ?? null,
    providerIdentification: [row.tbl_providers?.tbl_identity_documents?.idd_code, row.tbl_providers?.prv_identification].filter(Boolean).join(" "),
    stageName: row.tbl_work_stages?.wks_name ?? null,
    contractType: row.tbl_contract_types?.ctt_name ?? null,
    startDate: dateOnlyText(row.ctr_start_date),
    term: row.ctr_term,
    termUnit: row.ctr_term_unit,
    totalExtensions: extensions,
    suspendedDays: row.ctr_suspended_days,
    endDate: dateOnlyText(row.ctr_end_date),
    state: row.ctr_state,
    stateName: STATE_NAMES[row.ctr_state] ?? row.ctr_state,
    // Qué admite el estado actual (ADR-0017): el cliente lo cruza con los permisos.
    allowedActions: STATE_ALLOWS[row.ctr_state] ?? [],
    hasLiquidation: concepts.some((c) => c.ccp_type === CONCEPT_TYPES.LIQUIDATION),
    // Con una factura aprobada, costo y porcentajes de los conceptos no cambian (DOM-07).
    economicsLocked: await hasApprovedInvoices(prisma, row.ctr_id),
    configVersion: row.ctr_config_version,
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
export const selectContractWorks = async ({ search, includeWrkId } = {}) => {
  const value = text(search);
  const select = { wrk_id: true, wrk_code: true, wrk_name: true };
  const rows = await prisma.tbl_works.findMany({
    where: {
      sta_id: ACTIVE_STATUS,
      ...(value ? { OR: [{ wrk_code: { contains: value } }, { wrk_name: { contains: value } }] } : {}),
    },
    select,
    orderBy: { wrk_code: "asc" },
    take: MAX_ROWS,
  });
  const includeId = Number(includeWrkId) || null;
  if (includeId && !rows.some((row) => row.wrk_id === includeId)) {
    const included = await prisma.tbl_works.findFirst({ where: { wrk_id: includeId, sta_id: ACTIVE_STATUS }, select });
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
export const getContractFormOptions = async ({ wrkId, includeWksId, includePrvId }) => {
  const id = Number(wrkId);
  const [stages, assignments] = await Promise.all([
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
      select: { prv_id: true, tbl_providers: { select: { prv_name: true, prv_identification: true } } },
      orderBy: { tbl_providers: { prv_name: "asc" } },
      take: MAX_ROWS,
    }),
  ]);
  return {
    stages: stages.map((s) => ({ value: s.wks_id, label: s.sta_id === ACTIVE_STATUS ? s.wks_name : `${s.wks_name} (inactiva)` })),
    providers: assignments.map((a) => ({
      value: a.prv_id,
      label: `${a.tbl_providers.prv_name} · ${a.tbl_providers.prv_identification}`,
    })),
  };
};

/**
 * Descriptores de campo de un tipo de contrato para el formulario (ADR-0006,
 * decisión 5): la configuración actual o, con `version`, la de esa versión.
 * El cliente no deduce la configuración: la recibe.
 */
export const getContractFields = async ({ cttId, version, ctrId }) => {
  const type = await prisma.tbl_contract_types.findUnique({
    where: { ctt_id: Number(cttId) },
    select: { ctt_id: true, ctt_config_version: true, sta_id: true },
  });
  if (!type || type.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró el tipo de contrato.");
  const byVersion = Number(version) > 0;
  const configVersion = byVersion ? Number(version) : type.ctt_config_version;
  const fields = await resolveContractFields(prisma, type.ctt_id, byVersion ? { version: configVersion } : {});
  // Con `ctrId`, los campos de ese contrato: si no solicita AIU, A, I y U no aplican (DEC-046).
  const contract =
    Number(ctrId) > 0 ? await prisma.tbl_contracts.findUnique({ where: { ctr_id: Number(ctrId) }, select: { ctr_aiu_requested: true } }) : null;
  return {
    cttId: type.ctt_id,
    configVersion,
    currentVersion: type.ctt_config_version,
    typeAppliesAiu: typeAppliesAiu(fields),
    ...(contract ? { aiuRequested: contract.ctr_aiu_requested } : {}),
    fields: contract ? withContractAiu(fields, contract.ctr_aiu_requested) : fields,
  };
};

// ─── Guardado ────────────────────────────────────────────────────────────────

/** Cabecera del cliente → columnas. La fecha fin y el estado nunca vienen del cliente. */
const headerValuesOf = (input) => ({
  prv_id: Number(input.prvId),
  wks_id: Number(input.wksId) > 0 ? Number(input.wksId) : null,
  ctt_id: Number(input.cttId),
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
  "wks_id",
  "ctt_id",
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
const assertWork = async (tx, wrkId, { isNew }) => {
  const work = await tx.tbl_works.findUnique({ where: { wrk_id: wrkId }, select: { sta_id: true, wrk_code: true } });
  if (!work || work.sta_id === DELETED_STATUS) throw httpError(400, "La obra seleccionada no existe.");
  if (isNew && work.sta_id !== ACTIVE_STATUS) throw httpError(400, `La obra ${work.wrk_code} está inactiva: no admite contratos nuevos.`);
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
 * configuración del tipo ya resuelta bajo bloqueo:
 *
 * - Valor por defecto: al crear, el del tipo (solicita AIU si el tipo lo
 *   aplica); al editar, el guardado. Sin `aiuRequested` en la petición se
 *   conserva el valor por defecto.
 * - Apartarse de él (apagarlo o encenderlo) exige el permiso propio.
 * - No se enciende si el tipo no aplica AIU (400).
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
  if (requested && !typeApplies) throw httpError(400, "El tipo de contrato no aplica AIU: el contrato no puede solicitarlo.");
  if (!requested && before && (await hasAgreedAiu(tx, before.ctr_id))) {
    throw httpError(409, "Algún concepto del contrato ya pactó porcentajes de AIU. Llévalos a 0 en cada concepto antes de apagar el AIU.");
  }
  return requested;
};

const assertHeader = (values) => {
  if (!values.ctr_start_date) throw httpError(400, "La fecha de inicio no es una fecha válida.");
};

/** Versión vigente de la configuración del tipo (bloqueado por quien llama). */
const typeConfigVersion = async (tx, cttId) => {
  const type = await tx.tbl_contract_types.findUnique({ where: { ctt_id: cttId }, select: { ctt_config_version: true } });
  return type.ctt_config_version;
};

const IDEMPOTENCY_TARGET = {
  model: prisma.tbl_contracts,
  keyField: "ctr_idempotency_key",
  hashField: "ctr_idempotency_hash",
  ownerField: "ctr_create_by",
  select: { ctr_id: true },
  toResult: (row) => ({ message: "Contrato creado correctamente", ctrId: row.ctr_id }),
};

const createContract = ({ wrkId, input, granted, useBy, ctx, idempotencyData }) =>
  withLockedTransaction({ OBRA: wrkId, PROVEEDOR: Number(input.prvId), TIPO_CONTRATO: Number(input.cttId) }, async (tx) => {
    const cttId = Number(input.cttId);
    await contractTypesService.assertAssignable(tx, cttId);
    // Configuración del tipo, con el tipo bloqueado: la versión que se guarda
    // es la que se aplicó.
    const descriptors = await resolveContractFields(tx, cttId);
    const aiuRequested = await resolveAiuRequested(tx, { input, descriptors, granted });
    const values = {
      ...headerValuesOf(enforceFields({ descriptors, group: FIELD_GROUPS.CONTRACT, input })),
      ctr_aiu_requested: aiuRequested,
      ctr_config_version: await typeConfigVersion(tx, cttId),
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

    await assertWork(tx, wrkId, { isNew: true });
    await assertStage(tx, { wrkId, wksId: values.wks_id });
    await assertProviderAssigned(tx, { wrkId, prvId: values.prv_id });
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

    return { message: "Contrato creado correctamente", ctrId };
  });

// Editar fija la cabecera: repetirlo deja lo mismo, así que se puede
// reintentar ante un interbloqueo. La obra no cambia.
const updateContract = async ({ ctrId, input, granted, useBy, ctx }) => {
  // La obra del contrato no cambia nunca después de crearlo, así que leerla
  // antes del bloqueo no da una foto vieja de nada que decida: solo dice qué
  // obra bloquear primero (ADR-0027, regla 3). Bajo bloqueo se vuelve a leer.
  const known = await prisma.tbl_contracts.findUnique({ where: { ctr_id: Number(ctrId) }, select: { wrk_id: true } });
  if (!known) throw httpError(404, "No se encontró el contrato.");

  return withLockedTransaction(
    { OBRA: known.wrk_id, PROVEEDOR: Number(input.prvId), CONTRATO: ctrId, TIPO_CONTRATO: Number(input.cttId) },
    async (tx) => {
      const before = await findLockedContract(tx, ctrId);
      assertStateAllows(before.ctr_state, "editContract");
      const wrkId = before.wrk_id;
      const cttId = Number(input.cttId);
      await contractTypesService.assertAssignable(tx, cttId, before.ctt_id);

      // Configuración actual del tipo. Un valor guardado en un campo que dejó
      // de aplicar se conserva como heredado (ADR-0006, decisiones 7 y 8).
      const descriptors = await resolveContractFields(tx, cttId);
      const values = {
        ...headerValuesOf(enforceFields({ descriptors, group: FIELD_GROUPS.CONTRACT, input, before })),
        ctr_aiu_requested: await resolveAiuRequested(tx, { input, descriptors, before, granted }),
      };
      // Si cambia el tipo, el contrato pasa a registrar la versión del nuevo.
      if (cttId !== before.ctt_id) values.ctr_config_version = await typeConfigVersion(tx, cttId);

      await assertWork(tx, wrkId, { isNew: false });
      await assertStage(tx, { wrkId, wksId: values.wks_id, currentWksId: before.wks_id });
      await assertProviderAssigned(tx, { wrkId, prvId: values.prv_id, currentPrvId: before.prv_id });
      await assertUniqueNumber(tx, { wrkId, number: values.ctr_number, excludeId: before.ctr_id });
      // Las facturas son del proveedor del contrato: con facturas, no cambia
      // (lo garantiza también la FK compuesta de tbl_invoices, DEC-042).
      if (values.prv_id !== before.prv_id && (await countInvoices(tx, before.ctr_id)) > 0) {
        throw httpError(409, "El contrato tiene facturas registradas: no se puede cambiar su proveedor.");
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
export const saveContract = async ({ ctrId, input, useBy, granted, ctx = { useId: useBy }, idempotencyKey }) => {
  const values = headerValuesOf(input);
  assertHeader(values);

  if (Number(ctrId) > 0) return updateContract({ ctrId: Number(ctrId), input, granted, useBy: Number(useBy), ctx });

  const wrkId = Number(input.wrkId);
  // La huella de idempotencia es de lo que pidió el cliente; la
  // configuración del tipo se aplica dentro de la transacción.
  const { ccp_start_date: _start, ccp_description: _description, ...initialConcept } = conceptValuesOf(input.initialConcept ?? {});

  // La clave se busca antes que el número repetido: el reintento de una
  // creación exitosa devuelve el contrato creado y no "ya existe".
  return runIdempotent({
    target: IDEMPOTENCY_TARGET,
    key: idempotencyKey,
    ownerId: useBy,
    payload: { wrkId, ...auditableContract(values), aiuRequested: input.aiuRequested ?? null, initialConcept: auditableConcept(initialConcept) },
    execute: (idempotencyData) => createContract({ wrkId, input, granted, useBy: Number(useBy), ctx, idempotencyData }),
  });
};

// ─── Eliminación ─────────────────────────────────────────────────────────────

/**
 * Eliminación lógica (ADR-0015, decisión 11). Un contrato con facturas, sea
 * cual sea su estado, no se elimina (409, DEC-042). Conceptos e historial se
 * conservan: un contrato eliminado es historial, y su número queda libre en
 * la obra.
 */
export const deleteContract = ({ ctrId, useBy, ctx = { useId: useBy } }) =>
  withLockedTransaction({ CONTRATO: ctrId }, async (tx) => {
    const before = await findLockedContract(tx, ctrId);
    const invoices = await countInvoices(tx, before.ctr_id);
    if (invoices > 0) throw httpError(409, `No se puede eliminar el contrato: tiene ${invoices} factura(s) registrada(s).`);
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
