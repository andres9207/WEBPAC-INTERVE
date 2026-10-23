import { prisma } from "../../../common/configs/prismaClient.js";
import { scopeWhere } from "../../../common/services/workScope.service.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { dateOnlyText, todayDateOnly } from "../../../common/utils/term.utils.js";
import { CONTRACT_STATES, STATE_NAMES as CONTRACT_STATE_NAMES } from "../../work/contracts/contractTerms.js";
import {
  CONTRACT_POLICY_STATUS,
  CONTRACT_POLICY_STATUS_NAMES,
  POLICY_VALIDITY_NAMES,
  policyValidity,
  uncoveredContractsWhere,
} from "../../work/contracts/policyTerms.js";
import { contractPolicyStatuses } from "../../work/contracts/contractPolicies.service.js";
import { policyExpiringDays } from "../../admin/businessRules/businessRules.service.js";
import { INVOICE_STATES, STATE_NAMES as INVOICE_STATE_NAMES, TYPE_NAMES as INVOICE_TYPE_NAMES } from "../../billing/invoices/invoiceTerms.js";
import { invoiceScopeWhere } from "../../billing/invoices/invoices.service.js";
import { openFollowUpsSummary } from "../../billing/invoices/invoiceFollowUps.service.js";

/**
 * Tablero (ADR-0002, DEC-052): solo lectura, cifras calculadas en la base de
 * datos bajo demanda, sin precálculo ni caché (decisión 10).
 *
 * - Cada bloque sale solo si el usuario puede ver el módulo que agrega
 *   (`granted`, decisión 8); si no, es null y el cliente no lo dibuja. Las
 *   facturas, solo las de las vistas que ve (DEC-054).
 * - Todo se restringe al alcance por obra de la petición (DEC-047).
 * - La fecha de referencia es la del servidor (decisión 3) y el umbral de "a
 *   vencer", el de las pólizas (`policyExpiringDays`, DEC-072).
 * - El estado de pólizas cuenta contratos, no pólizas, por la póliza de mayor
 *   exposición (DEC-064), con la misma clasificación que filtra el listado de
 *   contratos (`contractPolicyStatuses`).
 */

const can = PERMISSIONS;
const notDeleted = { sta_id: { not: DELETED_STATUS } };
const LATEST_ROWS = 5;
const RANKED_WORKS = 8;

// Orden en que se presentan las categorías: de la que exige acción a la que no.
const POLICY_STATUS_ORDER = [
  CONTRACT_POLICY_STATUS.EXPIRED,
  CONTRACT_POLICY_STATUS.EXPIRING,
  CONTRACT_POLICY_STATUS.NO_DATE,
  CONTRACT_POLICY_STATUS.NONE,
  CONTRACT_POLICY_STATUS.ACTIVE,
];

const worksBlock = async (scope) => ({
  active: await prisma.tbl_works.count({ where: { sta_id: ACTIVE_STATUS, ...scopeWhere(scope) } }),
});

// Proveedores del alcance: los asignados a la obra elegida (mismo criterio que su listado).
const providersBlock = async (scope) => ({
  active: await prisma.tbl_providers.count({
    where: { sta_id: ACTIVE_STATUS, ...scopeWhere(scope, (ids) => ({ tbl_work_providers: { some: { wrk_id: { in: ids } } } })) },
  }),
});

const contractsBlock = async (scope) => {
  const grouped = await prisma.tbl_contracts.groupBy({ by: ["ctr_state"], where: { ...notDeleted, ...scopeWhere(scope) }, _count: { _all: true } });
  const counts = Object.fromEntries(grouped.map((g) => [g.ctr_state, g._count._all]));
  const byState = Object.values(CONTRACT_STATES).map((state) => ({ state, name: CONTRACT_STATE_NAMES[state], count: counts[state] ?? 0 }));
  return { total: byState.reduce((sum, s) => sum + s.count, 0), byState };
};

/**
 * Estado de pólizas por contrato (ADR-0002): una cifra por categoría, todas
 * con el mismo universo (contratos no eliminados del alcance, DEC-052), así
 * que suman el total. Además, contratos con conceptos sin póliza, pólizas
 * vigentes y las cinco vencidas o por vencer más próximas.
 */
const policiesBlock = async (scope, { today, days }) => {
  const universe = { ...notDeleted, ...scopeWhere(scope) };
  const [statuses, uncovered, currentPolicies, upcoming] = await Promise.all([
    contractPolicyStatuses(universe, { today, days }),
    prisma.tbl_contracts.count({ where: { AND: [universe, uncoveredContractsWhere()] } }),
    prisma.tbl_policies.count({ where: { pol_is_current: true, tbl_contracts: universe } }),
    prisma.tbl_policies.findMany({
      where: { pol_is_current: true, pol_end_date: { lte: new Date(today.getTime() + days * 86400000) }, tbl_contracts: universe },
      select: {
        pol_id: true,
        pol_number: true,
        pol_end_date: true,
        ctr_id: true,
        tbl_policy_types: { select: { plt_name: true } },
        tbl_contracts: { select: { ctr_number: true, tbl_works: { select: { wrk_code: true } } } },
      },
      orderBy: [{ pol_end_date: "asc" }, { pol_id: "asc" }],
      take: LATEST_ROWS,
    }),
  ]);
  const count = (status) => statuses.filter((s) => s.status === status).length;
  return {
    total: statuses.length,
    byStatus: POLICY_STATUS_ORDER.map((status) => ({ status, name: CONTRACT_POLICY_STATUS_NAMES[status], count: count(status) })),
    uncoveredContracts: uncovered,
    currentPolicies,
    upcoming: upcoming.map((row) => {
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
};

/** Facturas no eliminadas del alcance (DEC-047). */
const invoicesWhere = (scope) => ({ ...notDeleted, AND: [invoiceScopeWhere(scope)] });

/**
 * Pendientes de aprobar por menú (DEC-074): uno por tipo de proveedor con
 * pendientes, por nombre, para el enlace a su listado.
 */
export const pendingByMenuOf = async (where) => {
  const grouped = await prisma.tbl_invoices.groupBy({ by: ["pvt_id"], where: { ...where, inv_state: INVOICE_STATES.REGISTERED }, _count: { _all: true } });
  if (grouped.length === 0) return [];
  const types = await prisma.tbl_provider_types.findMany({ where: { pvt_id: { in: grouped.map((g) => g.pvt_id) } }, select: { pvt_id: true, pvt_name: true } });
  const names = new Map(types.map((t) => [t.pvt_id, t.pvt_name]));
  return grouped
    .map((g) => ({ pvtId: g.pvt_id, name: names.get(g.pvt_id) ?? null, count: g._count._all }))
    .sort((a, b) => String(a.name).localeCompare(String(b.name), "es"));
};

/**
 * Facturas: pendientes de aprobar (en total y por menú, para el enlace),
 * por obra (registradas y aprobadas; las anuladas no cuentan, DEC-052) y las
 * últimas registradas. El ranking por obra es por cantidad, de todos los
 * menús: la simple también tiene obra (DEC-058). Y los seguimientos abiertos
 * (DEC-076), para su cifra y su detalle.
 */
const invoicesBlock = async (scope, today) => {
  const where = invoicesWhere(scope);
  const counted = [INVOICE_STATES.REGISTERED, INVOICE_STATES.APPROVED];
  const [pendingByMenu, grouped, latest, followUps] = await Promise.all([
    pendingByMenuOf(where),
    prisma.tbl_invoices.groupBy({
      by: ["wrk_id", "inv_state"],
      where: { ...where, inv_state: { in: counted } },
      _count: { _all: true },
    }),
    prisma.tbl_invoices.findMany({
      where,
      select: {
        inv_id: true,
        inv_type: true,
        inv_number: true,
        inv_date: true,
        inv_state: true,
        tbl_providers: { select: { prv_name: true } },
        tbl_works: { select: { wrk_code: true } },
        pvt_id: true,
      },
      orderBy: [{ inv_create_at: "desc" }, { inv_id: "desc" }],
      take: LATEST_ROWS,
    }),
    openFollowUpsSummary({ invoiceWhere: invoiceScopeWhere(scope), today }),
  ]);

  const perWork = new Map();
  for (const g of grouped) {
    const entry = perWork.get(g.wrk_id) ?? { wrkId: g.wrk_id, registered: 0, approved: 0 };
    entry[g.inv_state === INVOICE_STATES.APPROVED ? "approved" : "registered"] += g._count._all;
    perWork.set(g.wrk_id, entry);
  }
  const ranked = [...perWork.values()]
    .sort((a, b) => b.registered + b.approved - (a.registered + a.approved) || a.wrkId - b.wrkId)
    .slice(0, RANKED_WORKS);
  const works = await prisma.tbl_works.findMany({
    where: { wrk_id: { in: ranked.map((r) => r.wrkId) } },
    select: { wrk_id: true, wrk_code: true, wrk_name: true },
  });
  const names = new Map(works.map((w) => [w.wrk_id, w]));

  return {
    pendingApproval: pendingByMenu.reduce((sum, p) => sum + p.count, 0),
    pendingByMenu,
    followUps,
    byWork: ranked.map((r) => ({ ...r, workCode: names.get(r.wrkId)?.wrk_code ?? null, workName: names.get(r.wrkId)?.wrk_name ?? null })),
    latest: latest.map((row) => ({
      invId: row.inv_id,
      // Menú de la factura (DEC-074): el cliente arma con él su dirección.
      pvtId: row.pvt_id,
      number: row.inv_number,
      typeName: INVOICE_TYPE_NAMES[row.inv_type] ?? row.inv_type,
      providerName: row.tbl_providers?.prv_name ?? null,
      workCode: row.tbl_works?.wrk_code ?? null,
      date: dateOnlyText(row.inv_date),
      state: row.inv_state,
      stateName: INVOICE_STATE_NAMES[row.inv_state] ?? row.inv_state,
    })),
  };
};

/**
 * Obras en seguimiento: las activas del alcance con más movimiento
 * (contratos no eliminados y facturas no anuladas), con sus cifras. Cada
 * cifra sale solo si el usuario puede ver su módulo.
 */
const worksActivityBlock = async (scope, { contracts, invoices }) => {
  const where = { ...notDeleted, ...scopeWhere(scope) };
  const [contractCounts, invoiceCounts] = await Promise.all([
    contracts ? prisma.tbl_contracts.groupBy({ by: ["wrk_id"], where, _count: { _all: true } }) : [],
    invoices
      ? prisma.tbl_invoices.groupBy({
          by: ["wrk_id"],
          where: {
            ...invoicesWhere(scope),
            inv_state: { in: [INVOICE_STATES.REGISTERED, INVOICE_STATES.APPROVED] },
          },
          _count: { _all: true },
        })
      : [],
  ]);
  const activity = new Map();
  const add = (rows, field) => {
    for (const r of rows) {
      const entry = activity.get(r.wrk_id) ?? { wrkId: r.wrk_id, contracts: contracts ? 0 : null, invoices: invoices ? 0 : null };
      entry[field] = r._count._all;
      activity.set(r.wrk_id, entry);
    }
  };
  add(contractCounts, "contracts");
  add(invoiceCounts, "invoices");

  const works = await prisma.tbl_works.findMany({
    where: { wrk_id: { in: [...activity.keys()] }, sta_id: ACTIVE_STATUS },
    select: { wrk_id: true, wrk_code: true, wrk_name: true },
  });
  return works
    .map((w) => ({ ...activity.get(w.wrk_id), workCode: w.wrk_code, workName: w.wrk_name }))
    .sort((a, b) => (b.contracts ?? 0) + (b.invoices ?? 0) - ((a.contracts ?? 0) + (a.invoices ?? 0)) || a.workCode.localeCompare(b.workCode))
    .slice(0, RANKED_WORKS);
};

/** Resumen del tablero para el usuario (`granted`: permisos efectivos) en el alcance de la petición. */
export const getDashboardSummary = async ({ granted, scope }) => {
  const has = (perId) => granted.has(perId);
  const today = todayDateOnly();
  const days = await policyExpiringDays();
  const see = {
    works: has(can.work.works.view),
    providers: has(can.work.providers.view),
    contracts: has(can.work.contracts.view),
    // El estado de pólizas es de contratos: exige ver los dos.
    policies: has(can.work.contracts.view) && has(can.work.policies.view),
    // Un solo permiso para todos los menús de facturas (DEC-074).
    invoices: has(can.billing.invoices.view),
  };

  const [works, providers, contracts, policies, invoices, worksActivity] = await Promise.all([
    see.works ? worksBlock(scope) : null,
    see.providers ? providersBlock(scope) : null,
    see.contracts ? contractsBlock(scope) : null,
    see.policies ? policiesBlock(scope, { today, days }) : null,
    see.invoices ? invoicesBlock(scope, today) : null,
    see.works && (see.contracts || see.invoices) ? worksActivityBlock(scope, see) : null,
  ]);

  return { referenceDate: dateOnlyText(today), expiringDays: days, works, providers, contracts, policies, invoices, worksActivity };
};
