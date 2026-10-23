import { prisma } from "../../../common/configs/prismaClient.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";
import logger from "../../../common/configs/winston.config.js";
import { dateOnlyText, todayDateOnly } from "../../../common/utils/term.utils.js";
import { insertNotification } from "../../app/notifications/notifications.service.js";
import { getRuleValues } from "../../admin/businessRules/businessRules.service.js";
import { BUSINESS_RULES } from "../../admin/businessRules/businessRules.constants.js";
import { CONTRACT_STATES } from "./contractTerms.js";

/**
 * Aviso de vencimiento (DEC-072). Avisa a los responsables activos de la obra
 * cuando un contrato en ejecución o una póliza vigente entra en su plazo de
 * aviso: los días de la regla de negocio antes de su fecha fin.
 *
 * Una sola vez por usuario: la clave del aviso lleva el contrato (o la
 * póliza, por su raíz) y la fecha fin, y la BD no admite dos avisos con la
 * misma clave para un usuario (uq_notifications_user_key). Correrlo otra vez
 * no repite nada; vuelve a avisar solo si la fecha fin cambia (un otrosí con
 * prórroga, una renovación de la póliza) y lo que vence vuelve a entrar en el
 * plazo.
 *
 * - Contratos: solo en ejecución. El suspendido tiene la fecha fin
 *   provisional; en liquidación y liquidado ya terminó la ejecución.
 * - Pólizas: la versión vigente, de contratos no eliminados ni liquidados.
 *   Las mismas dos que el tablero cuenta "por atender": la que entra en su
 *   plazo (por vencer) y la que ya venció, cada una con su aviso. Una póliza
 *   avisada como por vencer recibe otro aviso cuando vence.
 * - Contratos: solo por vencer (de hoy a hoy + N días).
 *
 * Lo corre el cron (`expiration-notice`), al guardar las reglas de negocio,
 * o a mano con `yarn cron:run expiration-notice`. Solo crea notificaciones:
 * nunca cambia un contrato ni una póliza.
 */

const DAY_MS = 86400000;

const addDays = (date, days) => new Date(date.getTime() + days * DAY_MS);
const daysUntil = (endDate, today) => Math.round((endDate.getTime() - today.getTime()) / DAY_MS);
const remainingText = (days) => (days === 0 ? "vence hoy" : `faltan ${days} día(s)`);
const workLabel = (work) => (work?.wrk_code ? ` (obra ${work.wrk_code})` : "");

/**
 * "A vencer" de un contrato: en ejecución y con la fecha fin entre hoy y hoy
 * + días. Un solo predicado para el aviso y para la pestaña "A vencer" del
 * listado de contratos.
 */
export const expiringContractsWhere = ({ today, days }) => ({
  ctr_state: CONTRACT_STATES.IN_PROGRESS,
  ctr_end_date: { gte: today, lte: addDays(today, days) },
});

/** Contratos en ejecución cuya fecha fin está entre hoy y hoy + días. */
export const findExpiringContracts = ({ today, days }) =>
  prisma.tbl_contracts.findMany({
    where: {
      sta_id: { not: DELETED_STATUS },
      ...expiringContractsWhere({ today, days }),
      tbl_works: { sta_id: { not: DELETED_STATUS } },
    },
    select: { ctr_id: true, ctr_number: true, ctr_end_date: true, wrk_id: true, tbl_works: { select: { wrk_code: true } } },
    orderBy: { ctr_id: "asc" },
  });

/**
 * Póliza por vencer o vencida: la versión vigente, con su fin de vigencia ya
 * pasado o a más tardar en hoy + días. Un solo predicado para el aviso y para
 * la pestaña "Pólizas por vencer" del listado de contratos.
 */
export const expiringPoliciesWhere = ({ today, days }) => ({
  pol_is_current: true,
  pol_end_date: { lte: addDays(today, days) },
});

/** Contratos con alguna póliza por vencer o vencida, salvo los liquidados (ya no se renuevan). */
export const contractsWithExpiringPoliciesWhere = ({ today, days }) => ({
  ctr_state: { not: CONTRACT_STATES.LIQUIDATED },
  tbl_policies: { some: expiringPoliciesWhere({ today, days }) },
});

/** Pólizas vigentes ya vencidas o cuyo fin de vigencia llega a hoy + días. */
export const findExpiringPolicies = ({ today, days }) =>
  prisma.tbl_policies.findMany({
    where: {
      ...expiringPoliciesWhere({ today, days }),
      tbl_contracts: {
        sta_id: { not: DELETED_STATUS },
        ctr_state: { not: CONTRACT_STATES.LIQUIDATED },
        tbl_works: { sta_id: { not: DELETED_STATUS } },
      },
    },
    select: {
      pol_id: true,
      pol_root_id: true,
      pol_number: true,
      pol_end_date: true,
      ctr_id: true,
      tbl_policy_types: { select: { plt_name: true } },
      tbl_contracts: { select: { ctr_number: true, wrk_id: true, tbl_works: { select: { wrk_code: true } } } },
    },
    orderBy: { pol_id: "asc" },
  });

/** Avisos a dar: uno por contrato o póliza, con su obra y su clave. */
export const buildNotices = ({ contracts, policies, today }) => [
  ...contracts.map((c) => {
    const endDate = dateOnlyText(c.ctr_end_date);
    return {
      wrkId: c.wrk_id,
      key: `CONTRACT_EXPIRING:${c.ctr_id}:${endDate}`,
      action: "contract_expiring",
      title: "Contrato próximo a vencer",
      message: `El contrato ${c.ctr_number}${workLabel(c.tbl_works)} vence el ${endDate}: ${remainingText(daysUntil(c.ctr_end_date, today))}.`,
      data: { ctrId: c.ctr_id, wrkId: c.wrk_id, endDate },
    };
  }),
  ...policies.map((p) => {
    const endDate = dateOnlyText(p.pol_end_date);
    const rootId = p.pol_root_id ?? p.pol_id;
    const contract = p.tbl_contracts;
    const type = p.tbl_policy_types?.plt_name ? ` de ${p.tbl_policy_types.plt_name}` : "";
    const label = `La póliza ${p.pol_number}${type} del contrato ${contract.ctr_number}${workLabel(contract.tbl_works)}`;
    const remaining = daysUntil(p.pol_end_date, today);
    const expired = remaining < 0;
    return {
      wrkId: contract.wrk_id,
      key: `${expired ? "POLICY_EXPIRED" : "POLICY_EXPIRING"}:${rootId}:${endDate}`,
      action: expired ? "policy_expired" : "policy_expiring",
      title: expired ? "Póliza vencida" : "Póliza próxima a vencer",
      type: expired ? "alert" : "warning",
      message: expired
        ? `${label} venció el ${endDate}, hace ${-remaining} día(s).`
        : `${label} vence el ${endDate}: ${remainingText(remaining)}.`,
      data: { ctrId: p.ctr_id, wrkId: contract.wrk_id, polRootId: rootId, endDate },
    };
  }),
];

/** Responsables activos (con usuario activo) de cada obra: Map wrkId → [useId]. */
const managersByWork = async (wrkIds) => {
  if (wrkIds.length === 0) return new Map();
  const rows = await prisma.tbl_work_managers.findMany({
    where: { wrk_id: { in: wrkIds }, sta_id: ACTIVE_STATUS, tbl_users: { sta_id: ACTIVE_STATUS } },
    select: { wrk_id: true, use_id: true },
    orderBy: [{ wrk_id: "asc" }, { use_id: "asc" }],
  });
  const map = new Map();
  for (const { wrk_id: wrkId, use_id: useId } of rows) {
    if (!map.has(wrkId)) map.set(wrkId, []);
    map.get(wrkId).push(useId);
  }
  return map;
};

/** Claves ya avisadas: Set "useId|clave". Evita intentar insertar lo que ya existe. */
const alreadyNotified = async (notices) => {
  if (notices.length === 0) return new Set();
  const rows = await prisma.tbl_notifications.findMany({
    where: { not_key: { in: [...new Set(notices.map((n) => n.key))] } },
    select: { use_id: true, not_key: true },
  });
  return new Set(rows.map((row) => `${row.use_id}|${row.not_key}`));
};

export const runExpirationNotice = async ({ today = todayDateOnly() } = {}) => {
  const rules = await getRuleValues();
  const [contracts, policies] = await Promise.all([
    findExpiringContracts({ today, days: rules[BUSINESS_RULES.CONTRACT_EXPIRING_DAYS] }),
    findExpiringPolicies({ today, days: rules[BUSINESS_RULES.POLICY_EXPIRING_DAYS] }),
  ]);
  const notices = buildNotices({ contracts, policies, today });
  const managers = await managersByWork([...new Set(notices.map((n) => n.wrkId))]);
  const done = await alreadyNotified(notices);

  let notified = 0;
  for (const notice of notices) {
    for (const userId of managers.get(notice.wrkId) ?? []) {
      if (done.has(`${userId}|${notice.key}`)) continue;
      const created = await insertNotification({
        userId,
        title: notice.title,
        message: notice.message,
        type: notice.type ?? "warning",
        module: "contracts",
        action: notice.action,
        wrkId: notice.wrkId,
        key: notice.key,
        data: notice.data,
      });
      if (created) notified += 1;
    }
  }

  logger.info(
    `[aviso de vencimiento] ${contracts.length} contrato(s) y ${policies.length} póliza(s) en su plazo; ${notified} notificación(es) nuevas.`
  );
  return { referenceDate: dateOnlyText(today), contracts: contracts.length, policies: policies.length, notified };
};

/** Desde una petición (guardar las reglas): después de responder, sin esperar ni lanzar. */
export const triggerExpirationNotice = () => {
  runExpirationNotice().catch((err) => logger.warn(`[aviso de vencimiento] No se pudo revisar: ${err?.message ?? err}`));
};
