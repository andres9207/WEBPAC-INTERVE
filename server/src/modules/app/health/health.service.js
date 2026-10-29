import { prisma } from "../../../common/configs/prismaClient.js";

// Nombre fijo del proceso (el mismo de ecosystem.config.cjs): en el servidor
// de Hostinger corren otras aplicaciones, y quien monitorea necesita saber
// que respondió esta (DEC-095).
export const SERVICE_NAME = "webpac-interve-api";

// Tope de la consulta de prueba: un monitor no puede quedar colgado si la BD
// no responde.
export const DB_TIMEOUT_MS = 3000;

const withTimeout = (promise, ms) => {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`La BD no respondió en ${ms} ms.`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
};

// Estado del proceso y de la BD. Una BD caída no es un error de la petición
// sino el resultado que se informa: por eso se devuelve, no se lanza, y el
// controller lo traduce a 503. El motivo solo va al log, nunca al cliente.
export const getHealth = async () => {
  try {
    await withTimeout(prisma.$queryRaw`SELECT 1`, DB_TIMEOUT_MS);
    return { status: "ok", service: SERVICE_NAME, database: "ok" };
  } catch (error) {
    console.error("[health] La BD no responde:", error.message);
    return { status: "error", service: SERVICE_NAME, database: "down" };
  }
};
