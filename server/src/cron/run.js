import "dotenv/config";
import { cronJobs } from "./index.js";

/**
 * Corre un job una vez, a mano, fuera del horario y también en desarrollo
 * (donde el cron no arranca): `yarn cron:run <nombre>`. Sin nombre, lista los
 * jobs registrados.
 */
const name = process.argv[2];
const job = cronJobs.find((j) => j.name === name);

if (!job) {
  console.log(`Jobs registrados: ${cronJobs.map((j) => j.name).join(", ") || "ninguno"}`);
  console.log("Uso: yarn cron:run <nombre>");
  process.exit(name ? 1 : 0);
}

try {
  const result = await job.handler();
  console.log(`[cron:${job.name}] terminado.`, JSON.stringify(result, null, 2));
  process.exit(0);
} catch (error) {
  console.error(`[cron:${job.name}]`, error);
  process.exit(1);
}
