import { prisma } from "../configs/prismaClient.js";
import { STATUS_IDS } from "../constants/status.constants.js";

/**
 * ¿El catálogo de la BD coincide con status.constants.js? Devuelve la lista
 * de diferencias, vacía si todo cuadra (DEC-038). Una clave con otro id, o
 * que falta, haría que el código marque o filtre el estado equivocado.
 */
export const verifyStatusCatalog = async (db = prisma) => {
  const rows = await db.tbl_status.findMany({ select: { sta_id: true, sta_key: true } });
  return Object.entries(STATUS_IDS)
    .filter(([key, id]) => !rows.some((row) => row.sta_key === key && row.sta_id === id))
    .map(([key, id]) => {
      const found = rows.find((row) => row.sta_key === key);
      return found ? `${key} tiene el id ${found.sta_id} y el código espera ${id}` : `falta la clave ${key} (id ${id})`;
    });
};
