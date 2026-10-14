import { prisma } from "../../../common/configs/prismaClient.js";
import { ACTIVE_STATUS } from "../../../common/constants/status.constants.js";
import logger from "../../../common/configs/winston.config.js";
import { insertNotification } from "../../app/notifications/notifications.service.js";

/**
 * Notificación de un acto del contrato a los responsables de su obra
 * (ADR-0027, catálogo de operaciones críticas: otrosí de liquidación,
 * suspender y levantar). Se llama **después del COMMIT** y sin garantía de
 * entrega (ADR-0027, decisión 10, alternativa A): si falla, el acto ya quedó
 * hecho y solo se registra en el log. Nunca lanza.
 *
 * Destinatarios: los responsables activos de la obra con usuario activo,
 * salvo quien hizo el acto.
 *
 * - `buildMessage(contract)` recibe { ctr_id, ctr_number, ctr_name, wrk_id,
 *   tbl_works: { wrk_code, wrk_name } } y devuelve el texto.
 */
export const notifyWorkManagers = async ({ ctrId, actorId, title, buildMessage, action, type = "info", data = {} }) => {
  try {
    const contract = await prisma.tbl_contracts.findUnique({
      where: { ctr_id: Number(ctrId) },
      select: { ctr_id: true, ctr_number: true, ctr_name: true, wrk_id: true, tbl_works: { select: { wrk_code: true, wrk_name: true } } },
    });
    if (!contract) return 0;

    const managers = await prisma.tbl_work_managers.findMany({
      where: {
        wrk_id: contract.wrk_id,
        sta_id: ACTIVE_STATUS,
        use_id: { not: Number(actorId) },
        tbl_users: { sta_id: ACTIVE_STATUS },
      },
      select: { use_id: true },
      orderBy: { use_id: "asc" },
    });

    const message = buildMessage(contract);
    let notified = 0;
    for (const { use_id: userId } of managers) {
      const created = await insertNotification({
        userId,
        title,
        message,
        type,
        module: "contracts",
        action,
        data: { ctrId: contract.ctr_id, wrkId: contract.wrk_id, ...data },
      });
      if (created) notified += 1;
    }
    return notified;
  } catch (err) {
    logger.warn(`[contratos] No se pudo notificar "${action}" del contrato ${ctrId}: ${err?.message ?? err}`);
    return 0;
  }
};

/** "C-001 (obra OB-1)": cómo se nombra el contrato en una notificación. */
export const contractLabel = (contract) =>
  `${contract.ctr_number}${contract.tbl_works?.wrk_code ? ` (obra ${contract.tbl_works.wrk_code})` : ""}`;
