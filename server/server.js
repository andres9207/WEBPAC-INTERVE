import 'dotenv/config';
import http from "http";
import { app } from "./app.js";
import { init } from "./socket.js";
import { testConnection } from "./src/common/configs/prismaClient.js";
import { verifyStatusCatalog } from "./src/common/services/status.service.js";
import { startCronJobs, stopCronJobs } from "./src/cron/index.js";

if (!process.env.JWT_SECRET) {
  throw new Error(
    "Falta la variable de entorno JWT_SECRET. Defínela antes de iniciar el servidor."
  );
}

const server = http.createServer(app);

init(server);

testConnection();

// Los ids de estado están en el código (status.constants.js): si la BD no
// coincide, el servidor no arranca (DEC-038). Si la BD no responde, solo se
// registra, igual que testConnection.
verifyStatusCatalog()
  .then((problems) => {
    if (problems.length === 0) return;
    console.error(`El catálogo de estados (tbl_status) no coincide con el código: ${problems.join("; ")}. Aplica la migración 0058.`);
    process.exit(1);
  })
  .catch((error) => console.error("No se pudo verificar el catálogo de estados:", error.message));

startCronJobs();

process.on('SIGINT', () => {
  stopCronJobs();
  process.exit(0);
});

process.on('SIGTERM', () => {
  stopCronJobs();
  process.exit(0);
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// ── Errores fuera de cualquier try/catch ─────────────────────────────────────
// Una promesa rechazada sin catch se registra y el proceso sigue: casi
// siempre es un fallo aislado de una petición (p. ej. un envío de correo sin
// .catch), y tumbar el proceso cortaría todas las demás peticiones en curso.
process.on("unhandledRejection", (reason) => {
  console.error("[unhandledRejection]", reason instanceof Error ? reason.stack : reason);
});

// Una excepción no capturada deja el proceso en un estado indefinido: se
// registra, se deja de aceptar conexiones y se sale con código 1 para que pm2
// (ecosystem.config.cjs) lo reinicie limpio. Si el cierre se cuelga, se
// fuerza la salida a los 10 segundos.
process.on("uncaughtException", (error) => {
  console.error("[uncaughtException]", error.stack || error);
  server.close(() => process.exit(1));
  setTimeout(() => process.exit(1), 10000).unref();
});

export { server };