import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// Prisma 7 ya no trae motor de conexión propio: requiere un "driver adapter"
// explícito. MySQL usa el adapter de MariaDB (misma librería de cliente wire
// protocol), independiente del pool de mysql2 que sigue usando db.config.js.
const adapter = new PrismaMariaDb(process.env.DATABASE_URL);

// Instancia única, igual que el pool de mysql2 en db.config.js: evitar abrir
// un cliente/pool de conexiones nuevo en cada import (nodemon recarga el
// proceso completo, así que un solo módulo = una sola instancia por proceso).
const prisma = new PrismaClient({ adapter });

export { prisma };
