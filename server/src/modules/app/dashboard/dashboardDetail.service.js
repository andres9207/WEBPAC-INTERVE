import { prisma } from "../../../common/configs/prismaClient.js";
import { scopeWhere } from "../../../common/services/workScope.service.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { paginate } from "../../../common/utils/pagination.utils.js";
import { dateOnlyText, todayDateOnly } from "../../../common/utils/term.utils.js";
import { CONTRACT_STATES, STATE_NAMES as CONTRACT_STATE_NAMES } from "../../work/contracts/contractTerms.js";
import { CONTRACT_POLICY_STATUS_NAMES, POLICY_VALIDITY_NAMES, assertPolicyStatus, policyValidity, uncoveredContractsWhere } from "../../work/contracts/policyTerms.js";
import { contractPolicyStatuses } from "../../work/contracts/contractPolicies.service.js";
import { expiredContractsWhere } from "../../work/contracts/expirationNotice.service.js";
import { policyExpiringDays } from "../../admin/businessRules/businessRules.service.js";
import { INVOICE_STATES, STATE_NAMES as INVOICE_STATE_NAMES } from "../../billing/invoices/invoiceTerms.js";
import { invoiceScopeWhere } from "../../billing/invoices/invoices.service.js";
import { INVOICE_SELECT, invoiceDto } from "./workDashboard.service.js";

/**
 * Detalle de una cifra del tablero general (DEC-052, "Detalle de cada
 * cifra"): las filas de las que sale, para el panel del tablero. Cada métrica
 * usa el mismo predicado que la cifra de `getDashboardSummary`, en el alcance
 * de la petición (DEC-047), y exige el permiso de ver su módulo (403 si
 * falta, como el filtro de pólizas del listado de contratos).
 *
 * Paginado con `paginate` (tope de los listados) y con dos filtros que se
 * suman al predicado de la cifra: `search` (texto en las columnas que fija
 * cada tipo de fila) y `wrkId` (una obra, dentro del alcance; en
 * `INVOICES_BY_WORK` es la obra de la barra y es obligatoria).
 */

const can = PERMISSIONS;
const notDeleted = { sta_id: { not: DELETED_STATUS } };
export const DETAIL_ROWS = 10;

export const DETAIL_METRICS = Object.freeze({
  WORKS_ACTIVE: "WORKS_ACTIVE",
  PROVIDERS_ACTIVE: "PROVIDERS_ACTIVE",
  CONTRACTS_BY_STATE: "CONTRACTS_BY_STATE",
  CONTRACTS_EXPIRED: "CONTRACTS_EXPIRED",
  CONTRACTS_POLICY_STATUS: "CONTRACTS_POLICY_STATUS",
  CONTRACTS_UNCOVERED: "CONTRACTS_UNCOVERED",
  CURRENT_POLICIES: "CURRENT_POLICIES",
  INVOICES_PENDING: "INVOICES_PENDING",
  INVOICES_BY_WORK: "INVOICES_BY_WORK",
});

// Lo que exige cada métrica: todos los permisos de la lista. Las de pólizas
// son de contratos, como el bloque del resumen.
const POLICY_VIEW = [can.work.contracts.view, can.work.policies.view];
const METRIC_PERMISSIONS = {
  WORKS_ACTIVE: [can.work.works.view],
  PROVIDERS_ACTIVE: [can.work.providers.view],
  CONTRACTS_BY_STATE: [can.work.contracts.view],
  CONTRACTS_EXPIRED: [can.work.contracts.view],
  CONTRACTS_POLICY_STATUS: POLICY_VIEW,
  CONTRACTS_UNCOVERED: POLICY_VIEW,
  CURRENT_POLICIES: POLICY_VIEW,
  INVOICES_PENDING: [can.billing.invoices.view],
  INVOICES_BY_WORK: [can.billing.invoices.view],
};

const fail = (message, statusCode) => Object.assign(new Error(message), { statusCode });

/** `{ OR: [...] }` con el texto en cada condición que arma `build`, o null sin texto. */
const searchOr = (search, builds) => {
  const text = String(search ?? "").trim();
  if (!text) return null;
  const contains = { contains: text };
  return { OR: builds.map((build) => build(contains)) };
};

/** `{ AND: [...] }` con las condiciones no vacías. */
const all = (...conditions) => ({ AND: conditions.filter(Boolean) });

const CONTRACT_SELECT = {
  ctr_id: true,
  ctr_number: true,
  ctr_name: true,
  ctr_state: true,
  ctr_end_date: true,
  tbl_providers: { select: { prv_name: true } },
  tbl_works: { select: { wrk_code: true } },
};
const contractDto = (row) => ({
  ctrId: row.ctr_id,
  number: row.ctr_number,
  name: row.ctr_name,
  state: row.ctr_state,
  stateName: CONTRACT_STATE_NAMES[row.ctr_state] ?? row.ctr_state,
  endDate: dateOnlyText(row.ctr_end_date),
  providerName: row.tbl_providers?.prv_name ?? null,
  workCode: row.tbl_works?.wrk_code ?? null,
});
const contractSearch = (search) =>
  searchOr(search, [
    (c) => ({ ctr_number: c }),
    (c) => ({ ctr_name: c }),
    (c) => ({ tbl_providers: { prv_name: c } }),
    (c) => ({ tbl_works: { wrk_code: c } }),
  ]);

const invoiceSearch = (search) =>
  searchOr(search, [(c) => ({ inv_number: c }), (c) => ({ tbl_providers: { prv_name: c } }), (c) => ({ tbl_contracts: { ctr_number: c } })]);

/** Las filas de `metric` para el usuario (`granted`) en el alcance de la petición. */
export const getDashboardDetail = async ({ granted, scope, metric, state, policyStatus, wrkId, invoiceState, search, page, limit }) => {
  const required = METRIC_PERMISSIONS[metric];
  if (!required) throw fail("La cifra del tablero no es válida.", 400);
  if (!required.every((perId) => granted.has(perId))) throw fail("No tienes permiso para ver el detalle de esta cifra.", 403);

  const pagination = { page, limit: limit ?? DETAIL_ROWS };
  const work = wrkId ? Number(wrkId) : null;
  const today = todayDateOnly();
  // Contratos del alcance (y de la obra del filtro): el universo de las métricas de contratos y pólizas.
  const contracts = { ...notDeleted, AND: [scopeWhere(scope), work ? { wrk_id: work } : {}] };

  const contractsPage = async (where) => {
    const result = await paginate(
      prisma.tbl_contracts,
      { where: all(where, contractSearch(search)), select: CONTRACT_SELECT, orderBy: [{ tbl_works: { wrk_code: "asc" } }, { ctr_number: "asc" }, { ctr_id: "asc" }] },
      pagination
    );
    return { ...result, kind: "contracts", results: result.results.map(contractDto) };
  };

  const invoicesPage = async (where) => {
    const result = await paginate(
      prisma.tbl_invoices,
      {
        where: all(notDeleted, invoiceScopeWhere(scope), work ? { wrk_id: work } : null, where, invoiceSearch(search)),
        select: { ...INVOICE_SELECT, tbl_works: { select: { wrk_code: true } } },
        orderBy: [{ inv_date: "desc" }, { inv_id: "desc" }],
      },
      pagination
    );
    return { ...result, kind: "invoices", results: result.results.map((row) => ({ ...invoiceDto(row), workCode: row.tbl_works?.wrk_code ?? null })) };
  };

  switch (metric) {
    case DETAIL_METRICS.WORKS_ACTIVE: {
      const result = await paginate(
        prisma.tbl_works,
        {
          where: all(
            { sta_id: ACTIVE_STATUS },
            scopeWhere(scope),
            work ? { wrk_id: work } : null,
            searchOr(search, [(c) => ({ wrk_code: c }), (c) => ({ wrk_name: c })])
          ),
          select: { wrk_id: true, wrk_code: true, wrk_name: true, wrk_start_date: true },
          orderBy: [{ wrk_code: "asc" }],
        },
        pagination
      );
      return {
        ...result,
        kind: "works",
        results: result.results.map((w) => ({ wrkId: w.wrk_id, code: w.wrk_code, name: w.wrk_name, startDate: dateOnlyText(w.wrk_start_date) })),
      };
    }
    case DETAIL_METRICS.PROVIDERS_ACTIVE: {
      const result = await paginate(
        prisma.tbl_providers,
        {
          where: all(
            { sta_id: ACTIVE_STATUS },
            scopeWhere(scope, (ids) => ({ tbl_work_providers: { some: { wrk_id: { in: ids } } } })),
            work ? { tbl_work_providers: { some: { wrk_id: work } } } : null,
            searchOr(search, [(c) => ({ prv_name: c }), (c) => ({ prv_identification: c })])
          ),
          select: { prv_id: true, prv_name: true, prv_identification: true },
          orderBy: [{ prv_name: "asc" }, { prv_id: "asc" }],
        },
        pagination
      );
      return {
        ...result,
        kind: "providers",
        results: result.results.map((p) => ({ prvId: p.prv_id, name: p.prv_name, identification: p.prv_identification })),
      };
    }
    case DETAIL_METRICS.CONTRACTS_BY_STATE:
      if (!CONTRACT_STATES[state]) throw fail("El estado del contrato no es válido.", 400);
      return contractsPage(all(contracts, { ctr_state: state }));
    case DETAIL_METRICS.CONTRACTS_EXPIRED:
      return contractsPage(all(contracts, expiredContractsWhere({ today })));
    case DETAIL_METRICS.CONTRACTS_POLICY_STATUS: {
      // La misma clasificación que la cifra y el filtro del listado (DEC-064).
      assertPolicyStatus(policyStatus);
      const statuses = await contractPolicyStatuses(contracts, { today, days: await policyExpiringDays() });
      const ids = statuses.filter((s) => s.status === policyStatus).map((s) => s.ctrId);
      return { ...(await contractsPage({ ctr_id: { in: ids } })), subtitle: CONTRACT_POLICY_STATUS_NAMES[policyStatus] };
    }
    case DETAIL_METRICS.CONTRACTS_UNCOVERED:
      return contractsPage(all(contracts, uncoveredContractsWhere()));
    case DETAIL_METRICS.CURRENT_POLICIES: {
      const days = await policyExpiringDays();
      const result = await paginate(
        prisma.tbl_policies,
        {
          where: all(
            { pol_is_current: true, tbl_contracts: contracts },
            searchOr(search, [(c) => ({ pol_number: c }), (c) => ({ tbl_policy_types: { plt_name: c } }), (c) => ({ tbl_contracts: { ctr_number: c } })])
          ),
          select: {
            pol_id: true,
            pol_number: true,
            pol_end_date: true,
            ctr_id: true,
            tbl_policy_types: { select: { plt_name: true } },
            tbl_contracts: { select: { ctr_number: true, tbl_works: { select: { wrk_code: true } } } },
          },
          orderBy: [{ pol_end_date: "asc" }, { pol_id: "asc" }],
        },
        pagination
      );
      return {
        ...result,
        kind: "policies",
        results: result.results.map((row) => {
          const validity = policyValidity(row.pol_end_date, { today, days });
          return {
            polId: row.pol_id,
            ctrId: row.ctr_id,
            number: row.pol_number,
            typeName: row.tbl_policy_types?.plt_name ?? null,
            contractNumber: row.tbl_contracts?.ctr_number ?? null,
            workCode: row.tbl_contracts?.tbl_works?.wrk_code ?? null,
            endDate: dateOnlyText(row.pol_end_date),
            validity,
            validityName: POLICY_VALIDITY_NAMES[validity],
          };
        }),
      };
    }
    case DETAIL_METRICS.INVOICES_PENDING:
      return invoicesPage({ inv_state: INVOICE_STATES.REGISTERED });
    case DETAIL_METRICS.INVOICES_BY_WORK: {
      // Las de la barra: registradas y aprobadas (las anuladas no cuentan, DEC-052), o las de un solo estado.
      const counted = [INVOICE_STATES.REGISTERED, INVOICE_STATES.APPROVED];
      if (!work) throw fail("La obra de la barra es obligatoria.", 400);
      if (invoiceState && !counted.includes(invoiceState)) throw fail("El estado de la factura no es válido.", 400);
      const result = await invoicesPage({ inv_state: invoiceState ? invoiceState : { in: counted } });
      return { ...result, subtitle: invoiceState ? INVOICE_STATE_NAMES[invoiceState] : null };
    }
    default:
      throw fail("La cifra del tablero no es válida.", 400);
  }
};
