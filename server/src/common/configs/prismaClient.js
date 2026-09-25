import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// Prisma 7 ya no trae motor de conexión propio: requiere un "driver adapter"
// explícito. MySQL usa el adapter de MariaDB (misma librería de cliente wire
// protocol). Es el ÚNICO acceso a la base de datos del backend: el pool de
// mysql2 (db.config.js, con executeQuery/getConnection) se eliminó porque
// executeQuery tomaba una conexión nueva si se omitía el parámetro, y una
// escritura "dentro" de una transacción podía escapar de ella (ADR-0027, B1).
// Las transacciones se abren con common/services/transaction.service.js.
//
// Zona horaria (ADR-0013, B8): el adapter escribe las fechas como texto UTC y
// lee lo que devuelve MySQL como si fuera UTC, sin importar process.env.TZ.
// Si la sesión MySQL queda en SYSTEM (p. ej. hora de Bogotá), toda fecha se
// desfasa en el offset del servidor. Por eso la sesión se fija siempre en UTC
// con la opción `timezone` del driver; las columnas `timestamp` guardan UTC
// internamente, así que el valor almacenado queda correcto.
const withUtcSession = (databaseUrl) => {
  try {
    const url = new URL(databaseUrl);
    url.searchParams.set("timezone", "+00:00");
    return url.toString();
  } catch {
    return databaseUrl;
  }
};

const adapter = new PrismaMariaDb(withUtcSession(process.env.DATABASE_URL));

// Instancia única: evitar abrir un cliente/pool de conexiones nuevo en cada
// import (nodemon recarga el proceso completo, así que un solo módulo = una
// sola instancia por proceso).
const prisma = new PrismaClient({ adapter });

// Destino de la conexión para el log de arranque, sin credenciales.
const describeTarget = (databaseUrl) => {
  try {
    const url = new URL(databaseUrl);
    return `${url.pathname.replace(/^\//, "")} en ${url.hostname}`;
  } catch {
    return "(DATABASE_URL no válida)";
  }
};

/** Prueba de conexión al arrancar (server.js). No tumba el proceso si falla. */
const testConnection = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log(`Conexión exitosa a la base de datos ${describeTarget(process.env.DATABASE_URL)}`);
  } catch (error) {
    console.error("Error en la prueba de conexión:", error.message);
  }
};

export { prisma, testConnection };
