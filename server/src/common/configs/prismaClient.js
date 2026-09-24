import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// Prisma 7 ya no trae motor de conexión propio: requiere un "driver adapter"
// explícito. MySQL usa el adapter de MariaDB (misma librería de cliente wire
// protocol), independiente del pool de mysql2 que sigue usando db.config.js.
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

// Instancia única, igual que el pool de mysql2 en db.config.js: evitar abrir
// un cliente/pool de conexiones nuevo en cada import (nodemon recarga el
// proceso completo, así que un solo módulo = una sola instancia por proceso).
const prisma = new PrismaClient({ adapter });

export { prisma };
