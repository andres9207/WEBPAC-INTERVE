import { prisma } from "../../../common/configs/prismaClient.js";
import { paginate, MAX_ROWS } from "../../../common/utils/pagination.utils.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { dateOnlyText, toDateOnly, todayDateOnly } from "../../../common/utils/term.utils.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { assertInScope, inScope, scopeWhere } from "../../../common/services/workScope.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, newOperationId, writeAudit } from "../../../common/services/audit.service.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { moneyText, ratioText, toMoney } from "../../../common/utils/money.utils.js";
import { reasonsService, REASON_SCOPES } from "../../admin/reasons/reasons.service.js";
import {
  CONCEPT_SELECT,
  assertContractInScope,
  findLockedContract,
  getContractFormOptions,
  selectContractWorks,
} from "../../work/contracts/contracts.service.js";
import {
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

/**
 * Facturas, fase A (ADR-0020, DEC-042): encabezado común, ciclo de vida y
 * efectos del estado del contrato. Sin importes: los detalles por tipo
 * llegan con sus decisiones de negocio (backlog DEC-01, DEC-02, DEC-03).
 *
 * - Bloqueo (LOCK_ORDER): simple, obra → proveedor (→ factura); de
 *   contrato, contrato (→ factura). Tipo, obra y contrato no cambian después
 *   de crear: leerlos antes del bloqueo solo dice qué bloquear (ADR-0027,
 *   regla 3; mismo criterio que updateConcept).
 * - Obra y proveedor de una factura de contrato salen del contrato bloqueado,
 *   nunca del cliente. Lo garantiza también la FK compuesta.
 * - El estado solo cambia por las transiciones de invoiceTerms.js, con
 *   historial y bitácora en la misma transacción. Estado y fecha de
 *   aprobación nunca vienen del formulario.
 * - Una factura no se elimina: se anula (ADR-0020, decisión 12).
 * - Anticipo y liquidación llevan su detalle con importes (DEC-044): el
 *   valor del anticipo, y el VALOR y la amortización de la liquidación. Los
 *   saldos (ADR-0024) se calculan bajo el bloqueo del contrato al registrar,
 *   editar, aprobar y anular, nunca se reciben ni se guardan. IVA,
 *   retenciones y retenido siguen pendientes (backlog DEC-03, DEC-07).
 */

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });
const can = PERMISSIONS.billing.invoices;

const text = (value) => String(value ?? "").trim();
const optionalText = (value) => text(value) || null;
const positiveId = (value) => (Number(value) > 0 ? Number(value) : null);

// Bitácora funcional (ADR-0020, "Auditoría"). Extracto y descripción son de
// nivel técnico, pero se registran igual: son lo único editable tras aprobar.
const INVOICE_AUDITED = [
  "inv_type",
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
      ild_value: true,
      ild_amortization: true,
      ild_default_amortization: true,
      ild_default_pct: true,
      ild_applied_pct: true,
      ild_adjustment_observation: true,
    },
  },
};

const NOT_FOUND = "No se encontró la factura.";

/**
 * 404 si la obra de la factura está fuera del alcance de la petición
 * (DEC-047). La obra de una factura no cambia nunca, así que se lee fuera de
 * la transacción. Una factura inexistente da el mismo 404.
 */
const assertInvoiceInScope = async (scope, invId) => {
  if (!scope || scope.all) return;
  const row = await prisma.tbl_invoices.findUnique({ where: { inv_id: Number(invId) }, select: { wrk_id: true } });
  if (!row || !inScope(scope, row.wrk_id)) throw httpError(404, NOT_FOUND);
};

/** Factura bloqueada (la utilidad ya ejecutó el FOR UPDATE). 404 si no existe. */
const findLockedInvoice = async (tx, invId) => {
  const row = await tx.tbl_invoices.findUnique({ where: { inv_id: Number(invId) }, select: LOCKED_SELECT });
  if (!row) throw httpError(404, "No se encontró la factura.");
  return row;
};

/**
 * Lo que no cambia de una factura, leído antes del bloqueo para saber qué
 * bloquear: tipo, obra y contrato. 404 si no existe.
 */
const findImmutable = async (invId) => {
  const known = await prisma.tbl_invoices.findUnique({
    where: { inv_id: Number(invId) },
    select: { inv_type: true, wrk_id: true, ctr_id: true, prv_id: true },
  });
  if (!known) throw httpError(404, "No se encontró la factura.");
  return known;
};

/** Bloqueos de una factura existente: contrato → factura, u obra → proveedor → factura. */
const locksOf = (known, invId, prvId = known.prv_id) =>
  known.ctr_id ? { CONTRATO: known.ctr_id, FACTURA: Number(invId) } : { OBRA: known.wrk_id, PROVEEDOR: prvId, FACTURA: Number(invId) };

// ─── Anticipo y amortización (ADR-0024, DEC-044) ────────────────────────────

/**
 * Saldos de anticipo del contrato con lo que ve `db`. Dentro de una
 * escritura, `db` es el tx con el contrato ya bloqueado (primera sentencia):
 * las sumas ven las aprobaciones confirmadas por otras transacciones. Solo
 * cuentan las facturas aprobadas; las registradas no reservan saldo.
 */
export const contractAdvanceBalances = async (db, ctrId) => {
  const id = Number(ctrId);
  const approved = (type) => ({ tbl_invoices: { ctr_id: id, inv_type: type, inv_state: INVOICE_STATES.APPROVED } });
  const concepts = await db.tbl_contract_concepts.findMany({ where: { ctr_id: id }, select: CONCEPT_SELECT });
  const advance = await db.tbl_invoice_advance_details.aggregate({ where: approved(INVOICE_TYPES.ADVANCE), _sum: { iad_value: true } });
  const liquidation = await db.tbl_invoice_liquidation_details.aggregate({
    where: approved(INVOICE_TYPES.LIQUIDATION),
    _sum: { ild_amortization: true },
  });
  const totals = contractTotals(concepts);
  return advanceBalances({
    base: totals.base,
    agreed: totals.advance,
    invoiced: advance._sum.iad_value,
    amortized: liquidation._sum.ild_amortization,
  });
};

/**
 * Información de anticipo del contrato para el formulario (PRO-BE-28): los
 * saldos y, si llega `value`, la amortización por defecto de una
 * liquidación por ese VALOR. Solo lectura: al guardar se recalcula todo.
 */
export const getContractAdvance = async ({ ctrId, value, scope }) => {
  await assertContractInScope(scope, ctrId);
  const contract = await prisma.tbl_contracts.findFirst({
    where: { ctr_id: Number(ctrId), sta_id: { not: DELETED_STATUS } },
    select: { ctr_id: true },
  });
  if (!contract) throw httpError(404, "No se encontró el contrato.");
  const balances = await contractAdvanceBalances(prisma, contract.ctr_id);
  const amount = toMoney(value);
  return {
    ...balancesDto(balances),
    defaultAmortization: amount ? moneyText(defaultAmortization(amount, balances)) : null,
  };
};

/** Tipos con detalle de importes en esta fase. */
const hasDetail = (type) => type === INVOICE_TYPES.ADVANCE || type === INVOICE_TYPES.LIQUIDATION;

const positiveMoney = (value, label) => {
  const amount = toMoney(value);
  if (!amount || amount.lte(0)) throw httpError(400, `El ${label} es requerido y debe ser mayor que cero.`);
  return amount;
};

/**
 * Importes del detalle según el tipo, validados contra los saldos del
 * contrato bloqueado (al registrar y al editar una registrada).
 *
 * - Anticipo: valor ≤ anticipo por facturar (I1).
 * - Liquidación: amortización ≤ mín(pendiente por amortizar, VALOR) (I2).
 *   Sin amortización en la petición se usa la de por defecto; una distinta
 *   exige el permiso de ajustar y una observación (`granted`, como anular
 *   una aprobada).
 */
const resolveDetail = async (tx, { type, ctrId, input, granted }) => {
  if (type === INVOICE_TYPES.ADVANCE) {
    const value = positiveMoney(input.value, "valor del anticipo");
    assertAdvanceFits(value, await contractAdvanceBalances(tx, ctrId));
    return { advance: { iad_value: value } };
  }
  if (type === INVOICE_TYPES.LIQUIDATION) {
    const value = positiveMoney(input.value, "valor de la factura");
    const balances = await contractAdvanceBalances(tx, ctrId);
    const byDefault = defaultAmortization(value, balances);
    const amortization = toMoney(input.amortization) ?? byDefault;
    const adjusted = !amortization.eq(byDefault);
    const observation = optionalText(input.amortizationObservation);
    if (adjusted) {
      if (!granted?.has(can.adjustAmortization)) {
        throw httpError(403, `La amortización por defecto es ${moneyText(byDefault)}. Cambiarla exige el permiso de ajustar la amortización.`);
      }
      if (!observation) throw httpError(400, "Explica por qué la amortización se aparta del valor por defecto.");
    }
    assertAmortizationFits(amortization, value, balances);
    return {
      liquidation: {
        ild_value: value,
        ild_amortization: amortization,
        ild_default_amortization: byDefault,
        ild_default_pct: balances.effectivePct,
        ild_applied_pct: appliedPct(amortization, value),
        ild_adjustment_observation: adjusted ? observation : null,
      },
    };
  }
  return {};
};

// Bitácora del detalle: importes como texto con dos decimales.
const DETAIL_AUDITED = ["iad_value", "ild_value", "ild_amortization", "ild_default_amortization", "ild_adjustment_observation"];
const MONEY_COLUMNS = new Set(["iad_value", "ild_value", "ild_amortization", "ild_default_amortization"]);

const detailText = (row) =>
  Object.fromEntries(Object.entries(row ?? {}).map(([column, value]) => [column, MONEY_COLUMNS.has(column) ? moneyText(value) : value]));

/** Detalle guardado de una factura (de LOCKED_SELECT) como fila plana. */
const storedDetail = (invoice) => ({ ...(invoice.tbl_invoice_advance_details ?? {}), ...(invoice.tbl_invoice_liquidation_details ?? {}) });

const detailChanges = (before, detail) =>
  diffFields(detailText(storedDetail(before)), detailText({ ...detail.advance, ...detail.liquidation }), DETAIL_AUDITED);

/**
 * Importes que llegan para una factura que ya no admite cambios (aprobada):
 * solo los que difieren de lo guardado, para responder 409 como con
 * cualquier otro campo. Sin importes en la petición, nada.
 */
const requestedDetailChanges = (before, input) => {
  const requested = {};
  const value = toMoney(input.value);
  const amortization = toMoney(input.amortization);
  if (value) requested[before.inv_type === INVOICE_TYPES.ADVANCE ? "iad_value" : "ild_value"] = value;
  if (amortization && before.inv_type === INVOICE_TYPES.LIQUIDATION) requested.ild_amortization = amortization;
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
};

/** Importe guardado del detalle, o null si la factura no lo tiene (registrada en la fase A). */
const storedAmount = (invoice, column) => storedDetail(invoice)[column] ?? null;

/**
 * Aprobar un anticipo o una liquidación revalida su detalle contra los
 * saldos bajo bloqueo: es la validación definitiva (ADR-0024, decisión 8).
 * Devuelve los cambios de saldo para la bitácora. 409 si la factura no
 * tiene importes.
 */
const revalidateOnApprove = async (tx, invoice) => {
  if (!hasDetail(invoice.inv_type)) return [];
  const isAdvance = invoice.inv_type === INVOICE_TYPES.ADVANCE;
  const value = storedAmount(invoice, isAdvance ? "iad_value" : "ild_value");
  if (value === null) {
    throw httpError(409, "La factura no tiene su valor registrado. Edítala y registra los importes antes de aprobarla.");
  }
  const balances = await contractAdvanceBalances(tx, invoice.ctr_id);
  if (isAdvance) {
    assertAdvanceFits(value, balances);
    return [{ field: "advance_invoiced", oldValue: moneyText(balances.invoiced), newValue: moneyText(balances.invoiced.plus(value)) }];
  }
  const amortization = storedAmount(invoice, "ild_amortization");
  assertAmortizationFits(amortization, value, balances);
  return [
    { field: "advance_amortized", oldValue: moneyText(balances.amortized), newValue: moneyText(balances.amortized.plus(amortization)) },
    { field: "advance_effective_pct", oldValue: null, newValue: ratioText(balances.effectivePct) },
  ];
};

/**
 * Anular un anticipo aprobado no puede dejar el amortizado por encima del
 * facturado (I2). Anular una liquidación aprobada reduce el amortizado:
 * siempre cumple. Devuelve los cambios de saldo para la bitácora.
 */
const revalidateOnCancel = async (tx, invoice) => {
  if (invoice.inv_state !== INVOICE_STATES.APPROVED || !hasDetail(invoice.inv_type)) return [];
  const isAdvance = invoice.inv_type === INVOICE_TYPES.ADVANCE;
  const amount = storedAmount(invoice, isAdvance ? "iad_value" : "ild_amortization");
  if (amount === null) return [];
  const balances = await contractAdvanceBalances(tx, invoice.ctr_id);
  if (isAdvance) {
    assertAdvanceCancellable(amount, balances);
    return [{ field: "advance_invoiced", oldValue: moneyText(balances.invoiced), newValue: moneyText(balances.invoiced.minus(amount)) }];
  }
  return [{ field: "advance_amortized", oldValue: moneyText(balances.amortized), newValue: moneyText(balances.amortized.minus(amount)) }];
};

// ─── Listado ─────────────────────────────────────────────────────────────────

// Lista blanca de orden (ENDPOINT_STANDARD, "Listados").
const SORT_FIELDS = {
  number: (order) => ({ inv_number: order }),
  type: (order) => ({ inv_type: order }),
  provider: (order) => ({ tbl_providers: { prv_name: order } }),
  work: (order) => ({ tbl_works: { wrk_code: order } }),
  date: (order) => ({ inv_date: order }),
  approvalDate: (order) => ({ inv_approval_date: order }),
  state: (order) => ({ inv_state: order }),
  updatedAt: (order) => ({ inv_update_at: order }),
};

const LIST_SELECT = {
  inv_id: true,
  inv_type: true,
  ctr_id: true,
  wrk_id: true,
  inv_number: true,
  inv_date: true,
  inv_approval_date: true,
  inv_state: true,
  inv_update_at: true,
  updated_by_user: USER_NAME_SELECT,
  tbl_providers: { select: { prv_name: true } },
  tbl_works: { select: { wrk_code: true, wrk_name: true } },
  tbl_work_stages: { select: { wks_name: true } },
  tbl_contracts: { select: { ctr_number: true, tbl_work_stages: { select: { wks_name: true } } } },
};

const toListDto = (row) => ({
  invId: row.inv_id,
  type: row.inv_type,
  typeName: TYPE_NAMES[row.inv_type] ?? row.inv_type,
  number: row.inv_number,
  date: dateOnlyText(row.inv_date),
  approvalDate: dateOnlyText(row.inv_approval_date),
  providerName: row.tbl_providers?.prv_name ?? null,
  wrkId: row.wrk_id,
  workCode: row.tbl_works?.wrk_code ?? null,
  workName: row.tbl_works?.wrk_name ?? null,
  ctrId: row.ctr_id,
  contractNumber: row.tbl_contracts?.ctr_number ?? null,
  // La etapa de una factura de contrato es la del contrato (no se copia).
  stageName: row.tbl_work_stages?.wks_name ?? row.tbl_contracts?.tbl_work_stages?.wks_name ?? null,
  state: row.inv_state,
  stateName: STATE_NAMES[row.inv_state] ?? row.inv_state,
  updatedAt: row.inv_update_at,
  updatedByName: userFullName(row.updated_by_user),
});

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
 * pestaña Facturas del contrato).
 */
/** `scope`: alcance por obra de la petición (DEC-047). */
export const paginationInvoices = async ({ search, state, type, wrkId, prvId, ctrId, rows, first, sortField, sortOrder, scope }) => {
  const order = Number(sortOrder) === 1 ? "asc" : "desc";
  const orderBy = (SORT_FIELDS[sortField] ?? SORT_FIELDS.updatedAt)(order);

  const baseWhere = {
    sta_id: { not: DELETED_STATUS },
    ...scopeWhere(scope),
    ...(type ? { inv_type: type } : {}),
    ...(positiveId(wrkId) ? { wrk_id: positiveId(wrkId) } : {}),
    ...(positiveId(prvId) ? { prv_id: positiveId(prvId) } : {}),
    ...(positiveId(ctrId) ? { ctr_id: positiveId(ctrId) } : {}),
    ...searchWhereOf(search),
  };
  const where = { ...baseWhere, ...(state ? { inv_state: state } : {}) };

  const [page, statusCounts] = await Promise.all([
    paginate(prisma.tbl_invoices, { where, select: LIST_SELECT, orderBy }, { first, rows }),
    countByState(baseWhere),
  ]);
  return { ...page, results: page.results.map(toListDto), statusCounts };
};

// ─── Detalle ─────────────────────────────────────────────────────────────────

const amountsDto = (row) => {
  const advance = row.tbl_invoice_advance_details;
  const liquidation = row.tbl_invoice_liquidation_details;
  if (advance) return { value: moneyText(advance.iad_value) };
  if (liquidation) {
    return {
      value: moneyText(liquidation.ild_value),
      amortization: moneyText(liquidation.ild_amortization),
      defaultAmortization: moneyText(liquidation.ild_default_amortization),
      defaultPct: ratioText(liquidation.ild_default_pct),
      appliedPct: ratioText(liquidation.ild_applied_pct),
      adjustmentObservation: liquidation.ild_adjustment_observation,
    };
  }
  return null;
};

export const getInvoice = async ({ invId, scope }) => {
  await assertInvoiceInScope(scope, invId);
  const row = await prisma.tbl_invoices.findFirst({
    where: { inv_id: Number(invId), sta_id: { not: DELETED_STATUS } },
    select: {
      ...LOCKED_SELECT,
      inv_create_at: true,
      inv_update_at: true,
      created_by_user: USER_NAME_SELECT,
      updated_by_user: USER_NAME_SELECT,
      tbl_providers: { select: { prv_name: true, prv_identification: true, tbl_identity_documents: { select: { idd_code: true } } } },
      tbl_works: { select: { wrk_code: true, wrk_name: true } },
      tbl_work_stages: { select: { wks_name: true } },
      tbl_contracts: { select: { ctr_number: true, ctr_name: true, ctr_state: true, tbl_work_stages: { select: { wks_name: true } } } },
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

  const contract = row.tbl_contracts;
  const contractAction = INVOICE_ACTIONS[row.inv_type];
  return {
    invId: row.inv_id,
    type: row.inv_type,
    typeName: TYPE_NAMES[row.inv_type] ?? row.inv_type,
    prvId: row.prv_id,
    wrkId: row.wrk_id,
    wksId: row.wks_id,
    ctrId: row.ctr_id,
    number: row.inv_number,
    date: dateOnlyText(row.inv_date),
    approvalDate: dateOnlyText(row.inv_approval_date),
    voucherNumber: row.inv_voucher_number,
    statement: row.inv_statement,
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
    // Qué admite el estado actual: el cliente lo cruza con los permisos.
    allowedActions: STATE_ALLOWS[row.inv_state] ?? [],
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

// Obras activas, y etapas y proveedores asignados de una obra: las mismas
// consultas del formulario de contrato (una factura simple se imputa a una
// etapa de la obra y su proveedor debe estar asignado a ella, ADR-0023).
export const selectInvoiceWorks = selectContractWorks;
export const getInvoiceFormOptions = getContractFormOptions;

/**
 * Contratos que hoy admiten el tipo de factura pedido (ADR-0017, "Efectos de
 * cada estado"): el anticipo, en ejecución; liquidación y devolución, en
 * liquidación. Con tope fijo, como un selector (DEC-018); busca por
 * número, nombre, proveedor y obra. `includeCtrId`: el contrato ya elegido
 * (el que abre el formulario desde su expediente) se devuelve aunque la
 * búsqueda o el tope lo dejen fuera, si su estado admite el tipo.
 */
export const selectInvoiceContracts = async ({ type, search, includeCtrId, scope } = {}) => {
  const action = INVOICE_ACTIONS[type];
  if (!action) return [];
  const states = Object.entries(CONTRACT_STATE_ALLOWS)
    .filter(([, actions]) => actions.includes(action))
    .map(([state]) => state);
  const admitted = { sta_id: { not: DELETED_STATUS }, ctr_state: { in: states }, ...scopeWhere(scope) };
  const select = {
    ctr_id: true,
    ctr_number: true,
    ctr_name: true,
    ctr_state: true,
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
    label: `${row.tbl_works?.wrk_code ?? ""} · ${row.ctr_number} — ${row.ctr_name}`,
    providerName: row.tbl_providers?.prv_name ?? null,
    workName: row.tbl_works ? `${row.tbl_works.wrk_code} — ${row.tbl_works.wrk_name}` : null,
    stateName: CONTRACT_STATE_NAMES[row.ctr_state] ?? row.ctr_state,
  }));
};

// ─── Validaciones bajo bloqueo ───────────────────────────────────────────────

/** La obra existe y está activa (solo al crear: la obra no cambia después). */
const assertWork = async (tx, wrkId) => {
  const work = await tx.tbl_works.findUnique({ where: { wrk_id: wrkId }, select: { sta_id: true, wrk_code: true } });
  if (!work || work.sta_id === DELETED_STATUS) throw httpError(400, "La obra seleccionada no existe.");
  if (work.sta_id !== ACTIVE_STATUS) throw httpError(400, `La obra ${work.wrk_code} está inactiva: no admite facturas nuevas.`);
};

/** La etapa es de la obra y está activa, salvo que sea la que ya tenía (ADR-0023, decisión 3). */
const assertStage = async (tx, { wrkId, wksId, currentWksId }) => {
  if (!wksId) throw httpError(400, "Selecciona la etapa de la obra.");
  const stage = await tx.tbl_work_stages.findUnique({ where: { wks_id: wksId }, select: { wrk_id: true, sta_id: true, wks_name: true } });
  if (!stage || stage.wrk_id !== wrkId) throw httpError(400, "La etapa seleccionada no pertenece a la obra de la factura.");
  if (stage.sta_id !== ACTIVE_STATUS && wksId !== currentWksId) {
    throw httpError(400, `La etapa "${stage.wks_name}" está inactiva y no se puede asignar.`);
  }
};

/** El proveedor está asignado a la obra (ADR-0023, decisión 3); activo, salvo el que ya tenía. */
const assertProviderAssigned = async (tx, { wrkId, prvId, currentPrvId }) => {
  const assignment = await tx.tbl_work_providers.findUnique({
    where: { wrk_id_prv_id: { wrk_id: wrkId, prv_id: prvId } },
    select: { sta_id: true, tbl_providers: { select: { prv_name: true, sta_id: true } } },
  });
  if (!assignment) throw httpError(400, "El proveedor seleccionado no está asignado a la obra de la factura.");
  if (prvId === currentPrvId) return;
  if (assignment.tbl_providers.sta_id !== ACTIVE_STATUS) throw httpError(400, `El proveedor ${assignment.tbl_providers.prv_name} está inactivo.`);
  if (assignment.sta_id !== ACTIVE_STATUS) throw httpError(400, `La asignación de ${assignment.tbl_providers.prv_name} a la obra está inactiva.`);
};

// Número único por proveedor, anuladas incluidas (backlog DEC-17, DEC-042).
// El UNIQUE de la BD es la garantía ante dos peticiones simultáneas; esto da
// el mensaje claro.
const assertUniqueNumber = async (tx, { prvId, number, excludeId = null }) => {
  const duplicate = await tx.tbl_invoices.findFirst({
    where: { prv_id: prvId, inv_number: number, ...(excludeId ? { inv_id: { not: excludeId } } : {}) },
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

/** Factura simple: obra, proveedor asignado y etapa, elegidos por el usuario. Bloquea obra → proveedor. */
const createSimpleInvoice = ({ input, document, useBy, ctx, idempotencyData }) => {
  const wrkId = Number(input.wrkId);
  const prvId = Number(input.prvId);
  return withLockedTransaction({ OBRA: wrkId, PROVEEDOR: prvId }, async (tx) => {
    const wksId = positiveId(input.wksId);
    await assertWork(tx, wrkId);
    await assertProviderAssigned(tx, { wrkId, prvId });
    await assertStage(tx, { wrkId, wksId });
    const values = { inv_type: input.type, prv_id: prvId, wrk_id: wrkId, wks_id: wksId, ctr_id: null, ...document };
    return insertInvoice(tx, { values, useBy, ctx, idempotencyData });
  });
};

/**
 * Factura de contrato: obra y proveedor salen del contrato bloqueado, y su
 * estado debe admitir el tipo (ADR-0017, "Efectos de cada estado"). Bloquea
 * el contrato: serializa con el otrosí de liquidación y la suspensión, que
 * cambian ese estado, y con las facturas que mueven los saldos de anticipo.
 */
const createContractInvoice = ({ input, document, granted, useBy, ctx, idempotencyData }) =>
  withLockedTransaction({ CONTRATO: Number(input.ctrId) }, async (tx) => {
    const contract = await findLockedContract(tx, input.ctrId);
    assertContractAllows(contract.ctr_state, INVOICE_ACTIONS[input.type]);
    if (document.inv_date.getTime() < new Date(dateOnlyText(contract.ctr_start_date)).getTime()) {
      throw httpError(400, `La fecha de la factura no puede ser anterior al inicio del contrato (${dateOnlyText(contract.ctr_start_date)}).`);
    }
    const values = { inv_type: input.type, prv_id: contract.prv_id, wrk_id: contract.wrk_id, wks_id: null, ctr_id: contract.ctr_id, ...document };
    const detail = await resolveDetail(tx, { type: input.type, ctrId: contract.ctr_id, input, granted });
    return insertInvoice(tx, { values, detail, useBy, ctx, idempotencyData });
  });

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
  // Proveedor y etapa son de la simple; si no llegan, se conservan.
  const requestedPrvId = (isSimple && positiveId(input.prvId)) || known.prv_id;

  return withLockedTransaction(
    locksOf(known, invId, requestedPrvId),
    async (tx) => {
      const before = await findLockedInvoice(tx, invId);
      const values = isSimple ? { ...document, prv_id: requestedPrvId, wks_id: positiveId(input.wksId) ?? before.wks_id } : { ...document };

      let detail = {};
      let amountChanges = [];
      if (hasDetail(before.inv_type)) {
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
          `La factura está ${STATE_NAMES[before.inv_state].toLowerCase()}: solo admite cambios en el extracto y la descripción. Para corregir otro dato, anúlala y regístrala de nuevo.`
        );
      }

      if (isSimple) {
        await assertProviderAssigned(tx, { wrkId: before.wrk_id, prvId: values.prv_id, currentPrvId: before.prv_id });
        await assertStage(tx, { wrkId: before.wrk_id, wksId: values.wks_id, currentWksId: before.wks_id });
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
 * efectivos, para ajustar la amortización de una liquidación.
 */
export const saveInvoice = async ({ invId, input, useBy, granted, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  // Alcance por obra (DEC-047): se registra y se edita solo en la obra del alcance.
  if (Number(invId) > 0) await assertInvoiceInScope(scope, invId);
  else if (hasContract(input.type)) await assertContractInScope(scope, input.ctrId);
  else assertInScope(scope, input.wrkId, "No se encontró la obra.");
  const document = documentValuesOf(input);
  pastDate(input.date, "fecha de la factura");
  if (!document.inv_number) throw httpError(400, "El número de la factura es requerido.");

  if (Number(invId) > 0) return updateInvoice({ invId: Number(invId), input, document, granted, useBy: Number(useBy), ctx });

  if (!TYPE_NAMES[input.type]) throw httpError(400, "El tipo de factura no es válido.");
  const create = hasContract(input.type) ? createContractInvoice : createSimpleInvoice;
  const target = hasContract(input.type)
    ? { type: input.type, ctrId: Number(input.ctrId) }
    : { type: input.type, wrkId: Number(input.wrkId), prvId: Number(input.prvId), wksId: positiveId(input.wksId) };

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

/**
 * Aprobar (ADR-0020, decisión 7): la factura empieza a contar. Bloquea
 * contrato → factura y revalida bajo bloqueo el estado de los dos. La fecha
 * de aprobación no es futura ni anterior a la factura. Anticipo y
 * liquidación revalidan aquí I1 e I2 con carácter definitivo (DEC-044). Falta
 * evaluar C1–C8 (ADR-0017).
 */
export const approveInvoice = async ({ invId, input, useBy, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  await assertInvoiceInScope(scope, invId);
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
      return withLockedTransaction(locksOf(known, invId), async (tx) => {
        const before = await findLockedInvoice(tx, invId);
        const { to: nextState } = assertTransition("approve", before.inv_state);
        await assertContractStillAdmits(tx, before);
        if (approvalDate.getTime() < before.inv_date.getTime()) {
          throw httpError(400, `La fecha de aprobación no puede ser anterior a la fecha de la factura (${dateOnlyText(before.inv_date)}).`);
        }
        const balanceChanges = await revalidateOnApprove(tx, before);

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
        await writeAudit(tx, {
          entity: AUDIT_ENTITIES.INVOICE,
          recordId: before.inv_id,
          operation: AUDIT_OPERATIONS.UPDATE,
          ctx,
          changes: [
            { field: "inv_state", oldValue: before.inv_state, newValue: nextState },
            { field: "inv_approval_date", oldValue: null, newValue: dateOnlyText(approvalDate) },
            ...balanceChanges,
          ],
        });
        return { message, invId: before.inv_id };
      });
    },
  });
};

/**
 * Anular (ADR-0020, decisión 9): no borra, cambia el estado con motivo del
 * catálogo y observación. Una registrada exige el permiso de anular (la
 * ruta); una aprobada, además el reforzado, que el service verifica con el
 * estado bajo bloqueo (`granted`, como levantar una suspensión). Anular un
 * anticipo aprobado ya amortizado responde 409 (I2, DEC-044). Bloquea
 * contrato → factura → motivo.
 */
export const cancelInvoice = async ({ invId, input, useBy, granted, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  await assertInvoiceInScope(scope, invId);
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
      return withLockedTransaction({ ...locksOf(known, invId), MOTIVO: reaId }, async (tx) => {
        const before = await findLockedInvoice(tx, invId);
        const transition = cancelTransitionFor(before.inv_state);
        const rule = assertTransition(transition, before.inv_state);
        if (!granted?.has(rule.permission)) {
          throw httpError(403, "La factura está aprobada: anularla exige el permiso de anular facturas aprobadas.");
        }
        const reason = await reasonsService.assertAssignable(tx, reaId);
        if (reason.rea_scope !== REASON_SCOPES.INVOICE_CANCEL) throw httpError(400, "El motivo seleccionado no es de anulación de factura.");
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
        return { message, invId: before.inv_id };
      });
    },
  });
};
