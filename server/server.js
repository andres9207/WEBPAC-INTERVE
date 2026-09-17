import 'dotenv/config';
import http from "http";
import { app } from "./app.js";
import { init } from "./socket.js";
import { testConnection } from "./src/common/configs/db.config.js";
// import { startCronJobs, stopCronJobs } from "./src/cron/index.js";

if (!process.env.JWT_SECRET) {
  throw new Error(
    "Falta la variable de entorno JWT_SECRET. Defínela antes de iniciar el servidor."
  );
}

const server = http.createServer(app);

init(server);

testConnection();

// startCronJobs();

// process.on('SIGINT', () => {
//   stopCronJobs();
//   process.exit(0);
// });

// process.on('SIGTERM', () => {
//   stopCronJobs();
//   process.exit(0);
// });

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export { server };