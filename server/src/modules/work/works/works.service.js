import { prisma } from "../../../common/configs/prismaClient.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { paginate, MAX_ROWS, countByStatus } from "../../../common/utils/pagination.utils.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { toMoney, moneyText, sumMoney } from "../../../common/utils/money.utils.js";
import {
  addTerm,
  dateOnlyText,
  PROGRESS_WARNING,
  progressLevel,
  termProgress,
  toDateOnly,
  todayDateOnly,
} from "../../../common/utils/term.utils.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, newOperationId, writeAudit } from "../../../common/services/audit.service.js";
import { constructionCompaniesService } from "../../admin/constructionCompanies/constructionCompanies.service.js";
import { contractTypesService } from "../../admin/contractTypes/contractTypes.service.js";
import { supervisionTypesService } from "../../admin/supervisionTypes/supervisionTypes.service.js";
import { ACTIVE_STATUS, INACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";

/**
 * Obras (ADR-0011, DEC-026). La obra es la raíz de un agregado: responsables
 * y etapas se guardan con ella, en una sola transacción, por diferencial
 * contra lo que hay en la BD (decisiones 1 a 3). Los contactos llegan después
 * (PRO-BD-04).
 *
 * - Los responsables son usuarios existentes (DEC-029): la obra no crea
 *   usuarios. Asignar y retirar tienen permiso propio, y gestionar etapas
 *   también: el controller pasa los permisos efectivos y el service exige el
 *   que corresponde a lo que realmente cambió.
 * - Bloqueo: obra → usuarios asignados → maestros asignados (DEC-026,
 *   DEC-019). Todo en un solo withLockedTransaction.
 * - Importes en Prisma.Decimal, redondeados por toMoney (DEC-028).
 * - Bitácora funcional de valores, plazos, maestros, código, nombre, estado y
 *   responsables (ADR-0011, "Auditoría"). Área y etapas: auditoría técnica.
 * - Plazo = número + unidad, desde una fecha de inicio. La fecha final
 *   (inicio + plazo inicial) se calcula al leer y no se guarda (DEC-030).
 */

export const MANAGER_ROLES = Object.freeze(["MAIN", "SUPPORT"]);

const CAN = PERMISSIONS.work.works;

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

// Registros que impiden eliminar una obra (ADR-0011, decisión 12). Responde
// 409 (DEC-026). Cuentan los no eliminados.
const WORK_DEPENDENTS = [{ model: "tbl_contracts", column: "wrk_id", label: "contrato(s)" }];

// ─── Listado ─────────────────────────────────────────────────────────────────

// Lista blanca de orden (ENDPOINT_STANDARD, "Listados").
const SORT_FIELDS = {
  code: (order) => ({ wrk_code: order }),
  name: (order) => ({ wrk_name: order }),
  constructionCompany: (order) => ({ tbl_construction_companies: { cnc_description: order } }),
  contractType: (order) => ({ tbl_contract_types: { ctt_name: order } }),
  supervisionType: (order) => ({ tbl_supervision_types: { spt_name: order } }),
  initialValue: (order) => ({ wrk_initial_value: order }),
  startDate: (order) => ({ wrk_start_date: order }),
  statusName: (order) => ({ tbl_status: { sta_name: order } }),
  updatedAt: (order) => ({ wrk_update_at: order }),
};

// Las relaciones a los maestros son obligatorias y no se filtran por su
// estado: una obra no desaparece porque su constructora o su tipo estén
// inactivos (ADR-0004 decisión 6, ADR-0007 decisión 7).
const LIST_SELECT = {
  wrk_id: true,
  wrk_code: true,
  wrk_name: true,
  wrk_initial_value: true,
  wrk_extended_value: true,
  wrk_start_date: true,
  wrk_initial_term: true,
  wrk_term_unit: true,
  sta_id: true,
  wrk_update_at: true,
  tbl_construction_companies: { select: { cnc_description: true } },
  tbl_contract_types: { select: { ctt_name: true } },
  tbl_supervision_types: { select: { spt_name: true } },
  tbl_status: { select: { sta_name: true } },
  updated_by_user: USER_NAME_SELECT,
  // Responsable principal activo, para la columna del listado.
  tbl_work_managers: {
    where: { wkm_role: "MAIN", sta_id: ACTIVE_STATUS },
    select: { tbl_users: USER_NAME_SELECT },
    orderBy: { wkm_id: "asc" },
    take: 1,
  },
  // Para la vista de tarjetas (DEC-033): etapas en orden y responsables activos.
  tbl_work_stages: { select: { wks_name: true, sta_id: true }, orderBy: { wks_order: "asc" } },
  _count: { select: { tbl_work_managers: { where: { sta_id: ACTIVE_STATUS } } } },
};

// Avance del plazo de una obra a la fecha `today` (DEC-033).
const progressOf = (row, today) =>
  termProgress(row.wrk_start_date, addTerm(row.wrk_start_date, row.wrk_initial_term, row.wrk_term_unit), today);

const toListDto = (row, today = todayDateOnly()) => withProgress(row, today, {
  wrkId: row.wrk_id,
  code: row.wrk_code,
  name: row.wrk_name,
  constructionCompany: row.tbl_construction_companies?.cnc_description ?? null,
  contractType: row.tbl_contract_types?.ctt_name ?? null,
  supervisionType: row.tbl_supervision_types?.spt_name ?? null,
  initialValue: moneyText(row.wrk_initial_value),
  extendedValue: moneyText(row.wrk_extended_value),
  // Valor vigente: el ampliado cuando existe (ADR-0011, regla 7).
  currentValue: moneyText(row.wrk_extended_value ?? row.wrk_initial_value),
  startDate: dateOnlyText(row.wrk_start_date),
  initialTerm: row.wrk_initial_term,
  termUnit: row.wrk_term_unit,
  endDate: addTerm(row.wrk_start_date, row.wrk_initial_term, row.wrk_term_unit),
  mainManagerName: userFullName(row.tbl_work_managers?.[0]?.tbl_users),
  activeManagers: row._count?.tbl_work_managers ?? 0,
  stages: (row.tbl_work_stages ?? []).map((s) => ({ name: s.wks_name, staId: s.sta_id })),
  staId: row.sta_id,
  statusName: row.tbl_status?.sta_name ?? null,
  updatedAt: row.wrk_update_at,
  updatedByName: userFullName(row.updated_by_user),
});

// Agrega el avance del plazo y su nivel, calculados una sola vez.
const withProgress = (row, today, dto) => {
  const percent = progressOf(row, today);
  return { ...dto, progressPercent: percent, progressLevel: progressLevel(percent) };
};

// Búsqueda general (DEC-024): código, nombre o constructora, parametrizada.
const searchWhereOf = (search) => {
  const text = String(search ?? "").trim();
  if (!text) return {};
  return {
    OR: [
      { wrk_code: { contains: text } },
      { wrk_name: { contains: text } },
      { tbl_construction_companies: { cnc_description: { contains: text } } },
    ],
  };
};

export const paginationWorks = async ({ search, staId, rows, first, sortField, sortOrder }) => {
  const order = Number(sortOrder) === 1 ? "asc" : "desc";
  const orderBy = (SORT_FIELDS[sortField] ?? SORT_FIELDS.updatedAt)(order);

  const baseWhere = { sta_id: { not: DELETED_STATUS }, ...searchWhereOf(search) };
  const where = { ...baseWhere, ...(staId ? { AND: [{ sta_id: Number(staId) }] } : {}) };

  const [page, statusCounts] = await Promise.all([
    paginate(prisma.tbl_works, { where, select: LIST_SELECT, orderBy }, { first, rows }),
    countByStatus(prisma.tbl_works, baseWhere),
  ]);
  const today = todayDateOnly();
  return { ...page, results: page.results.map((row) => toListDto(row, today)), statusCounts };
};

// ─── Resumen ─────────────────────────────────────────────────────────────────

/**
 * Indicadores del listado (DEC-033), de todas las obras no eliminadas: no
 * dependen de la búsqueda ni de la pestaña. El valor vigente total se suma en
 * Decimal (DEC-028); el avance promedio y las obras cerca de terminar cuentan
 * solo las activas con fechas.
 */
export const summaryWorks = async () => {
  const rows = await prisma.tbl_works.findMany({
    where: { sta_id: { not: DELETED_STATUS } },
    select: {
      sta_id: true,
      wrk_initial_value: true,
      wrk_extended_value: true,
      wrk_start_date: true,
      wrk_initial_term: true,
      wrk_term_unit: true,
    },
  });

  const today = todayDateOnly();
  const active = rows.filter((row) => row.sta_id === ACTIVE_STATUS);
  const progress = active.map((row) => progressOf(row, today)).filter((percent) => percent !== null);

  return {
    total: rows.length,
    active: active.length,
    inactive: rows.length - active.length,
    currentValueTotal: moneyText(sumMoney(rows.map((row) => row.wrk_extended_value ?? row.wrk_initial_value))),
    averageProgress: progress.length ? Math.round(progress.reduce((sum, percent) => sum + percent, 0) / progress.length) : null,
    closingCount: progress.filter((percent) => percent >= PROGRESS_WARNING).length,
    // El umbral viaja con el dato: la pantalla lo nombra sin repetirlo.
    closingThreshold: PROGRESS_WARNING,
  };
};

// ─── Detalle ─────────────────────────────────────────────────────────────────

const HEADER_COLUMNS = [
  "wrk_code",
  "wrk_name",
  "cnc_id",
  "ctt_id",
  "spt_id",
  "wrk_start_date",
  "wrk_area",
  "wrk_direct_cost",
  "wrk_initial_term",
  "wrk_term_unit",
  "wrk_extended_term",
  "wrk_initial_value",
  "wrk_extended_value",
  "wrk_max_service_order_value",
];
const MONEY_COLUMNS = new Set(["wrk_area", "wrk_direct_cost", "wrk_initial_value", "wrk_extended_value", "wrk_max_service_order_value"]);
const HEADER_SELECT = Object.fromEntries(HEADER_COLUMNS.map((column) => [column, true]));

/**
 * Vista previa de la fecha final mientras se edita la obra (inicio + plazo
 * inicial): la misma cuenta que se muestra después de guardar, hecha aquí y
 * no en el cliente (FRONTEND_STANDARD, regla 9). No lee ni escribe la BD.
 * `endDate` es null si los datos no alcanzan.
 */
export const previewWorkEndDate = ({ startDate, initialTerm, termUnit }) => ({ endDate: addTerm(startDate, initialTerm, termUnit) });

export const getWork = async ({ wrkId }) => {
  const row = await prisma.tbl_works.findFirst({
    where: { wrk_id: Number(wrkId), sta_id: { not: DELETED_STATUS } },
    select: {
      wrk_id: true,
      ...HEADER_SELECT,
      sta_id: true,
      wrk_create_at: true,
      wrk_update_at: true,
      tbl_status: { select: { sta_name: true } },
      // Nombres para la página de detalle; el formulario usa los ids.
      tbl_construction_companies: { select: { cnc_description: true } },
      tbl_contract_types: { select: { ctt_name: true } },
      tbl_supervision_types: { select: { spt_name: true } },
      created_by_user: USER_NAME_SELECT,
      updated_by_user: USER_NAME_SELECT,
      tbl_work_managers: {
        select: {
          wkm_id: true,
          use_id: true,
          wkm_role: true,
          sta_id: true,
          tbl_users: { select: { use_name: true, use_last_name: true, sta_id: true } },
        },
        orderBy: { wkm_id: "asc" },
      },
      tbl_work_stages: {
        select: { wks_id: true, wks_name: true, wks_order: true, sta_id: true },
        orderBy: [{ wks_order: "asc" }, { wks_name: "asc" }],
      },
      // Proveedores asignados: solo el conteo, para la pestaña. La lista la
      // sirve pagination_work_providers (DEC-031).
      _count: { select: { tbl_work_providers: true, tbl_contracts: { where: { sta_id: { not: DELETED_STATUS } } } } },
    },
  });
  if (!row) throw httpError(404, "No se encontró la obra.");

  return {
    wrkId: row.wrk_id,
    code: row.wrk_code,
    name: row.wrk_name,
    cncId: row.cnc_id,
    cttId: row.ctt_id,
    sptId: row.spt_id,
    constructionCompany: row.tbl_construction_companies?.cnc_description ?? null,
    contractType: row.tbl_contract_types?.ctt_name ?? null,
    supervisionType: row.tbl_supervision_types?.spt_name ?? null,
    startDate: dateOnlyText(row.wrk_start_date),
    area: moneyText(row.wrk_area),
    directCost: moneyText(row.wrk_direct_cost),
    initialTerm: row.wrk_initial_term,
    termUnit: row.wrk_term_unit,
    endDate: addTerm(row.wrk_start_date, row.wrk_initial_term, row.wrk_term_unit),
    extendedTerm: row.wrk_extended_term,
    initialValue: moneyText(row.wrk_initial_value),
    extendedValue: moneyText(row.wrk_extended_value),
    maxServiceOrderValue: moneyText(row.wrk_max_service_order_value),
    currentValue: moneyText(row.wrk_extended_value ?? row.wrk_initial_value),
    staId: row.sta_id,
    statusName: row.tbl_status?.sta_name ?? null,
    createdAt: row.wrk_create_at,
    createdByName: userFullName(row.created_by_user),
    updatedAt: row.wrk_update_at,
    updatedByName: userFullName(row.updated_by_user),
    managers: row.tbl_work_managers.map((m) => ({
      wkmId: m.wkm_id,
      useId: m.use_id,
      name: userFullName(m.tbl_users),
      userStaId: m.tbl_users?.sta_id ?? null,
      role: m.wkm_role,
      staId: m.sta_id,
    })),
    stages: row.tbl_work_stages.map((s) => ({ wksId: s.wks_id, name: s.wks_name, order: s.wks_order, staId: s.sta_id })),
    providersCount: row._count?.tbl_work_providers ?? 0,
    contractsCount: row._count?.tbl_contracts ?? 0,
  };
};

/**
 * Candidatos a responsable (DEC-029): usuarios activos, ordenados por nombre,
 * con tope fijo. El formulario de obra muestra los ya asignados con los datos
 * de getWork, aunque estén inactivos.
 */
export const selectWorkManagers = async ({ search } = {}) => {
  const text = String(search ?? "").trim();
  const rows = await prisma.tbl_users.findMany({
    where: {
      sta_id: ACTIVE_STATUS,
      ...(text ? { OR: [{ use_name: { contains: text } }, { use_last_name: { contains: text } }] } : {}),
    },
    select: { use_id: true, use_name: true, use_last_name: true, sta_id: true },
    orderBy: [{ use_name: "asc" }, { use_last_name: "asc" }],
    take: MAX_ROWS,
  });
  return rows.map((row) => ({ value: row.use_id, label: userFullName(row), staId: row.sta_id }));
};

// ─── Guardado ────────────────────────────────────────────────────────────────

const text = (value) => String(value ?? "").trim();
const optionalInt = (value) => (value === null || value === undefined || value === "" ? null : Number(value));

/** Cabecera del cliente → columnas. Los importes, ya redondeados (DEC-028). */
const headerValuesOf = (input) => ({
  wrk_code: text(input.code),
  wrk_name: text(input.name),
  cnc_id: Number(input.cncId),
  ctt_id: Number(input.cttId),
  spt_id: Number(input.sptId),
  wrk_start_date: toDateOnly(input.startDate),
  wrk_area: toMoney(input.area),
  wrk_direct_cost: toMoney(input.directCost),
  wrk_initial_term: Number(input.initialTerm),
  wrk_term_unit: input.termUnit,
  wrk_extended_term: optionalInt(input.extendedTerm),
  wrk_initial_value: toMoney(input.initialValue),
  wrk_extended_value: toMoney(input.extendedValue),
  wrk_max_service_order_value: toMoney(input.maxServiceOrderValue),
});

/** Reglas 5 a 7 de ADR-0011. La BD repite las dos primeras con CHECK. */
const assertHeader = (values) => {
  if (!values.wrk_start_date) throw httpError(400, "La fecha de inicio no es una fecha válida.");
  if (values.wrk_extended_value && values.wrk_extended_value.lt(values.wrk_initial_value)) {
    throw httpError(400, "El valor ampliado no puede ser menor que el valor inicial.");
  }
  if (values.wrk_extended_term !== null && values.wrk_extended_term < values.wrk_initial_term) {
    throw httpError(400, "El plazo ampliado no puede ser menor que el plazo inicial.");
  }
  const currentValue = values.wrk_extended_value ?? values.wrk_initial_value;
  if (values.wrk_max_service_order_value && values.wrk_max_service_order_value.gt(currentValue)) {
    throw httpError(400, "El valor máximo de orden de servicio no puede superar el valor vigente de la obra.");
  }
};

const managersOf = (input) =>
  (input.managers ?? []).map((m) => ({
    use_id: Number(m.useId),
    wkm_role: m.role,
    sta_id: Number(m.staId ?? ACTIVE_STATUS),
  }));

const stagesOf = (input) =>
  (input.stages ?? []).map((s) => ({
    wks_id: Number(s.wksId) > 0 ? Number(s.wksId) : null,
    wks_name: text(s.name),
    wks_order: Number(s.order),
    sta_id: Number(s.staId ?? ACTIVE_STATUS),
  }));

const sameText = (x, y) => x.localeCompare(y, "es", { sensitivity: "base" }) === 0;

/** Reglas de la lista, sin BD: 8 y 9 (responsables) y 13 (etapas). */
const assertCollections = (managers, stages) => {
  if (!managers.some((m) => m.sta_id === ACTIVE_STATUS)) {
    throw httpError(400, "La obra debe tener al menos un responsable activo.");
  }
  if (new Set(managers.map((m) => m.use_id)).size !== managers.length) {
    throw httpError(400, "Un usuario no puede figurar dos veces como responsable de la misma obra.");
  }
  stages.forEach((stage, i) => {
    if (stages.slice(0, i).some((other) => sameText(other.wks_name, stage.wks_name))) {
      throw httpError(400, `La etapa "${stage.wks_name}" está repetida en la obra.`);
    }
  });
  const ids = stages.filter((s) => s.wks_id).map((s) => s.wks_id);
  if (new Set(ids).size !== ids.length) throw httpError(400, "Una etapa aparece dos veces en la lista.");
};

const assertGranted = (granted, perId, action) => {
  if (!granted.has(perId)) throw httpError(403, `No tienes permiso para ${action}.`);
};

// Con el usuario ya bloqueado (DEC-029): existe y no está eliminado; si se
// asigna por primera vez, además activo. El ya asignado se conserva aunque
// esté inactivo (mismo criterio que los maestros, DOM-21).
const assertManagerUsers = async (tx, managers, currentUserIds) => {
  const users = await tx.tbl_users.findMany({
    where: { use_id: { in: managers.map((m) => m.use_id) } },
    select: { use_id: true, sta_id: true, use_name: true, use_last_name: true },
  });
  const byId = new Map(users.map((u) => [u.use_id, u]));
  for (const manager of managers) {
    const user = byId.get(manager.use_id);
    if (!user || user.sta_id === DELETED_STATUS) throw httpError(400, "Uno de los responsables seleccionados no existe.");
    if (user.sta_id !== ACTIVE_STATUS && !currentUserIds.has(manager.use_id)) {
      throw httpError(400, `El usuario ${userFullName(user) ?? manager.use_id} está inactivo y no se puede asignar como responsable.`);
    }
  }
};

// El código es único en todo el sistema, también frente a obras eliminadas
// (ADR-0011, regla 1). El UNIQUE de la BD es la garantía ante dos peticiones
// simultáneas; esto da el mensaje claro.
const assertUniqueCode = async (tx, code, excludeId = null) => {
  const duplicate = await tx.tbl_works.findFirst({
    where: { wrk_code: code, ...(excludeId ? { wrk_id: { not: Number(excludeId) } } : {}) },
    select: { wrk_id: true },
  });
  if (duplicate) throw httpError(400, "Ya existe una obra con ese código.");
};

const assertMasters = async (tx, values, current = {}) => {
  await constructionCompaniesService.assertAssignable(tx, values.cnc_id, current.cnc_id);
  await contractTypesService.assertAssignable(tx, values.ctt_id, current.ctt_id);
  await supervisionTypesService.assertAssignable(tx, values.spt_id, current.spt_id);
};

const locksOf = (values, managers, wrkId = null) => ({
  ...(wrkId ? { OBRA: wrkId } : {}),
  USUARIO: managers.map((m) => m.use_id),
  CONSTRUCTORA: values.cnc_id,
  TIPO_CONTRATO: values.ctt_id,
  TIPO_INTERVENTORIA: values.spt_id,
});

// Diferencial contra la BD (ADR-0011, decisión 3), nunca contra una lista
// anterior que mande el cliente.
const diffManagers = (current, desired) => {
  const currentById = new Map(current.map((m) => [m.use_id, m]));
  const desiredIds = new Set(desired.map((m) => m.use_id));
  return {
    toInsert: desired.filter((m) => !currentById.has(m.use_id)),
    toDelete: current.filter((m) => !desiredIds.has(m.use_id)),
    toUpdate: desired
      .filter((m) => {
        const before = currentById.get(m.use_id);
        return before && (before.wkm_role !== m.wkm_role || before.sta_id !== m.sta_id);
      })
      .map((m) => ({ ...m, before: currentById.get(m.use_id) })),
  };
};

const diffStages = (current, desired) => {
  const currentById = new Map(current.map((s) => [s.wks_id, s]));
  for (const stage of desired) {
    // Un id de etapa ajena a esta obra no se acepta (sería editar otra obra).
    if (stage.wks_id && !currentById.has(stage.wks_id)) throw httpError(400, "Una de las etapas no pertenece a esta obra.");
  }
  const keptIds = new Set(desired.filter((s) => s.wks_id).map((s) => s.wks_id));
  return {
    toInsert: desired.filter((s) => !s.wks_id),
    toDelete: current.filter((s) => !keptIds.has(s.wks_id)),
    toUpdate: desired.filter((s) => {
      const before = s.wks_id && currentById.get(s.wks_id);
      return before && (before.wks_name !== s.wks_name || before.wks_order !== s.wks_order || before.sta_id !== s.sta_id);
    }),
  };
};

// Una etapa con contratos no se quita (la FK del contrato lo impide; esto da
// el mensaje claro). Cuentan también los contratos eliminados: siguen
// apuntando a la etapa. Se puede desactivar.
const assertStagesRemovable = async (tx, wrkId, toDelete) => {
  if (toDelete.length === 0) return;
  const used = await tx.tbl_contracts.findMany({
    where: { wrk_id: wrkId, wks_id: { in: toDelete.map((s) => s.wks_id) } },
    select: { wks_id: true },
    distinct: ["wks_id"],
  });
  if (used.length > 0) {
    const names = toDelete.filter((s) => used.some((u) => u.wks_id === s.wks_id)).map((s) => `"${s.wks_name}"`);
    throw httpError(409, `No se puede quitar la etapa ${names.join(", ")}: tiene contratos. Desactívala en su lugar.`);
  }
};

const hasChanges = (diff) => diff.toInsert.length > 0 || diff.toDelete.length > 0 || diff.toUpdate.length > 0;

/** Qué permiso exige cada cambio de las colecciones (ADR-0011, "Autorización"). */
const assertCollectionPermissions = (granted, managerDiff, stageDiff) => {
  if (managerDiff.toInsert.length > 0 || managerDiff.toUpdate.length > 0) {
    assertGranted(granted, CAN.assignManager, "asignar responsables de obra");
  }
  if (managerDiff.toDelete.length > 0) assertGranted(granted, CAN.removeManager, "retirar responsables de obra");
  if (hasChanges(stageDiff)) assertGranted(granted, CAN.manageStages, "gestionar las etapas de la obra");
};

const managerText = (m) => `usuario=${m.use_id} rol=${m.wkm_role} estado=${m.sta_id}`;

const applyManagers = async (tx, { wrkId, diff, useBy, ctx, operationId }) => {
  if (diff.toDelete.length > 0) {
    await tx.tbl_work_managers.deleteMany({ where: { wrk_id: wrkId, use_id: { in: diff.toDelete.map((m) => m.use_id) } } });
  }
  for (const manager of diff.toUpdate) {
    await tx.tbl_work_managers.updateMany({
      where: { wrk_id: wrkId, use_id: manager.use_id },
      data: { wkm_role: manager.wkm_role, sta_id: manager.sta_id, wkm_update_by: useBy },
    });
  }
  if (diff.toInsert.length > 0) {
    await tx.tbl_work_managers.createMany({
      data: diff.toInsert.map((m) => ({ wrk_id: wrkId, ...m, wkm_create_by: useBy, wkm_update_by: useBy })),
    });
  }

  // La asignación de responsables se audita funcionalmente: decide quién
  // responde por la obra (ADR-0011, "Auditoría").
  const events = [
    ...diff.toInsert.map((m) => ({ operation: AUDIT_OPERATIONS.GRANT, oldValue: null, newValue: managerText(m) })),
    ...diff.toDelete.map((m) => ({ operation: AUDIT_OPERATIONS.REVOKE, oldValue: managerText(m), newValue: null })),
    ...diff.toUpdate.map((m) => ({ operation: AUDIT_OPERATIONS.UPDATE, oldValue: managerText(m.before), newValue: managerText(m) })),
  ];
  for (const { operation, oldValue, newValue } of events) {
    await writeAudit(tx, {
      operationId,
      entity: AUDIT_ENTITIES.WORK,
      recordId: wrkId,
      operation,
      ctx,
      changes: [{ field: "responsable", oldValue, newValue }],
    });
  }
};

const applyStages = async (tx, { wrkId, diff, useBy }) => {
  if (diff.toDelete.length > 0) {
    await tx.tbl_work_stages.deleteMany({ where: { wrk_id: wrkId, wks_id: { in: diff.toDelete.map((s) => s.wks_id) } } });
  }
  for (const { wks_id, ...stage } of diff.toUpdate) {
    await tx.tbl_work_stages.updateMany({ where: { wks_id, wrk_id: wrkId }, data: { ...stage, wks_update_by: useBy } });
  }
  if (diff.toInsert.length > 0) {
    await tx.tbl_work_stages.createMany({
      data: diff.toInsert.map(({ wks_id, ...stage }) => ({ wrk_id: wrkId, ...stage, wks_create_by: useBy, wks_update_by: useBy })),
    });
  }
};

// Bitácora de la cabecera: sin área (auditoría técnica). Los importes se
// comparan como texto con dos decimales y la fecha como "AAAA-MM-DD", igual
// en ambos lados.
const AUDITED_HEADER = HEADER_COLUMNS.filter((column) => column !== "wrk_area");
const auditableValue = (column, value) => {
  if (MONEY_COLUMNS.has(column)) return moneyText(value);
  if (column === "wrk_start_date") return dateOnlyText(value);
  return value;
};
const auditable = (row) => Object.fromEntries(Object.entries(row).map(([column, value]) => [column, auditableValue(column, value)]));

// Huella de la creación (DEC-016): lo que define "la misma obra".
const fingerprintOf = (values, managers, stages) => ({ ...auditable(values), managers, stages });

const IDEMPOTENCY_TARGET = {
  model: prisma.tbl_works,
  keyField: "wrk_idempotency_key",
  hashField: "wrk_idempotency_hash",
  ownerField: "wrk_create_by",
  select: { wrk_id: true },
  toResult: (row) => ({ message: "Obra creada correctamente", wrkId: row.wrk_id }),
};

const createWork = ({ values, managers, stages, useBy, ctx, idempotencyData }) =>
  withLockedTransaction(locksOf(values, managers), async (tx) => {
    await assertMasters(tx, values);
    await assertManagerUsers(tx, managers, new Set());
    await assertUniqueCode(tx, values.wrk_code);

    const created = await tx.tbl_works.create({
      data: { ...values, sta_id: ACTIVE_STATUS, wrk_create_by: useBy, wrk_update_by: useBy, ...idempotencyData },
    });
    const wrkId = created.wrk_id;
    const operationId = newOperationId();

    await writeAudit(tx, {
      operationId,
      entity: AUDIT_ENTITIES.WORK,
      recordId: wrkId,
      operation: AUDIT_OPERATIONS.CREATE,
      ctx,
      changes: diffFields({}, auditable(values), AUDITED_HEADER),
    });
    await applyManagers(tx, { wrkId, diff: diffManagers([], managers), useBy, ctx, operationId });
    await applyStages(tx, { wrkId, diff: diffStages([], stages), useBy });

    return { message: "Obra creada correctamente", wrkId };
  });

// Editar fija la cabecera y las colecciones: repetirlo deja lo mismo, así
// que se puede reintentar ante un interbloqueo.
const updateWork = ({ wrkId, values, managers, stages, useBy, granted, ctx }) =>
  withLockedTransaction(
    locksOf(values, managers, wrkId),
    async (tx) => {
      const before = await tx.tbl_works.findUnique({
        where: { wrk_id: Number(wrkId) },
        select: { ...HEADER_SELECT, sta_id: true },
      });
      if (!before || before.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró la obra.");

      const id = Number(wrkId);
      const [currentManagers, currentStages] = await Promise.all([
        tx.tbl_work_managers.findMany({ where: { wrk_id: id }, select: { use_id: true, wkm_role: true, sta_id: true } }),
        tx.tbl_work_stages.findMany({ where: { wrk_id: id }, select: { wks_id: true, wks_name: true, wks_order: true, sta_id: true } }),
      ]);
      const managerDiff = diffManagers(currentManagers, managers);
      const stageDiff = diffStages(currentStages, stages);
      assertCollectionPermissions(granted, managerDiff, stageDiff);
      await assertStagesRemovable(tx, id, stageDiff.toDelete);

      await assertMasters(tx, values, before);
      await assertManagerUsers(tx, managers, new Set(currentManagers.map((m) => m.use_id)));
      await assertUniqueCode(tx, values.wrk_code, id);

      await tx.tbl_works.update({ where: { wrk_id: id }, data: { ...values, wrk_update_by: useBy } });

      const operationId = newOperationId();
      const changes = diffFields(auditable(before), auditable(values), AUDITED_HEADER);
      if (changes.length > 0) {
        await writeAudit(tx, { operationId, entity: AUDIT_ENTITIES.WORK, recordId: id, operation: AUDIT_OPERATIONS.UPDATE, ctx, changes });
      }
      await applyManagers(tx, { wrkId: id, diff: managerDiff, useBy, ctx, operationId });
      await applyStages(tx, { wrkId: id, diff: stageDiff, useBy });

      return { message: "Obra modificada correctamente", wrkId: id };
    },
    { idempotent: true }
  );

/**
 * Crear (wrkId vacío o 0) o editar la obra con sus responsables y etapas, en
 * una sola transacción. `granted` es el Set de per_id efectivos del autor.
 * El estado no se toca: ver changeWorkStatus.
 */
export const saveWork = async ({ wrkId, input, useBy, granted, ctx = { useId: useBy }, idempotencyKey }) => {
  const values = headerValuesOf(input);
  const managers = managersOf(input);
  const stages = stagesOf(input);
  assertHeader(values);
  assertCollections(managers, stages);

  if (Number(wrkId) > 0) return updateWork({ wrkId, values, managers, stages, useBy: Number(useBy), granted, ctx });

  // Crear siempre asigna responsables; con etapas, también las gestiona.
  assertCollectionPermissions(granted, diffManagers([], managers), diffStages([], stages));

  // La clave se busca antes que el duplicado de código: el reintento de una
  // creación exitosa devuelve la obra creada y no "ya existe".
  return runIdempotent({
    target: IDEMPOTENCY_TARGET,
    key: idempotencyKey,
    ownerId: useBy,
    payload: fingerprintOf(values, managers, stages),
    execute: (idempotencyData) => createWork({ values, managers, stages, useBy: Number(useBy), ctx, idempotencyData }),
  });
};

// ─── Estado y eliminación ────────────────────────────────────────────────────

const findLockedWork = async (tx, wrkId) => {
  const row = await tx.tbl_works.findUnique({ where: { wrk_id: Number(wrkId) }, select: { sta_id: true } });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró la obra.");
  return row;
};

/** Activar o desactivar. Fija un estado final: reintentable. */
export const changeWorkStatus = ({ wrkId, staId, useBy, ctx = { useId: useBy } }) =>
  withLockedTransaction(
    { OBRA: wrkId },
    async (tx) => {
      const before = await findLockedWork(tx, wrkId);
      const next = Number(staId);
      if (next !== ACTIVE_STATUS && next !== INACTIVE_STATUS) throw httpError(400, "El estado debe ser activo o inactivo.");
      if (before.sta_id !== next) {
        await tx.tbl_works.update({ where: { wrk_id: Number(wrkId) }, data: { sta_id: next, wrk_update_by: Number(useBy) } });
        await writeAudit(tx, {
          entity: AUDIT_ENTITIES.WORK,
          recordId: Number(wrkId),
          operation: AUDIT_OPERATIONS.UPDATE,
          ctx,
          changes: diffFields(before, { sta_id: next }, ["sta_id"]),
        });
      }
      return { message: `Obra ${next === ACTIVE_STATUS ? "activada" : "desactivada"} correctamente`, staId: next };
    },
    { idempotent: true }
  );

/**
 * Eliminación lógica (DEC-006). Bloqueada con 409 si la obra tiene registros
 * dependientes (contratos, cuando existan). Responsables y etapas se
 * conservan: una obra eliminada es historial.
 */
export const deleteWork = ({ wrkId, useBy, ctx = { useId: useBy } }) =>
  withLockedTransaction({ OBRA: wrkId }, async (tx) => {
    const before = await findLockedWork(tx, wrkId);

    for (const dependent of WORK_DEPENDENTS) {
      const count = await tx[dependent.model].count({ where: { [dependent.column]: Number(wrkId), sta_id: { not: DELETED_STATUS } } });
      if (count > 0) throw httpError(409, `No se puede eliminar la obra: tiene ${count} ${dependent.label} asociado(s).`);
    }

    await tx.tbl_works.update({
      where: { wrk_id: Number(wrkId) },
      data: { sta_id: DELETED_STATUS, wrk_update_by: Number(useBy), wrk_delete_by: Number(useBy), wrk_delete_at: new Date() },
    });
    await writeAudit(tx, {
      entity: AUDIT_ENTITIES.WORK,
      recordId: Number(wrkId),
      operation: AUDIT_OPERATIONS.DELETE,
      ctx,
      changes: diffFields(before, { sta_id: DELETED_STATUS }, ["sta_id"]),
    });
    return { message: "Obra eliminada correctamente" };
  });
