// ¿schema.prisma describe la BD? (DEC-100). Compara la BD de DATABASE_URL con
// schema.prisma usando `prisma migrate diff --script`, que es de solo lectura.
//
// En InnoDB, NO ACTION y RESTRICT son la misma regla: las dos impiden borrar o
// cambiar una fila referenciada en el momento. Las migraciones crean las FK
// con una y la BD de desarrollo las tiene con la otra, así que Prisma propone
// borrar y volver a crear FK idénticas. Ese par se descarta solo si la FK de
// la BD tiene las mismas columnas y la misma tabla de destino, y su regla es
// equivalente. Cualquier otra diferencia hace fallar el chequeo.
//
//   node prisma-drift.mjs [schema.prisma]     (desde server/)
//
// Necesita el cliente `mysql` para leer information_schema (en el runner de
// GitHub viene instalado; en local, ruta en MYSQL_BIN). Salida: 0 sin
// diferencias, 1 con diferencias o error.
import { execFileSync, spawnSync } from "child_process";

const schema = process.argv[2] ?? "prisma/schema.prisma";
const url = new URL(process.env.DATABASE_URL ?? "");
const database = decodeURIComponent(url.pathname.slice(1));

const prisma = spawnSync(
  "npx",
  ["prisma", "migrate", "diff", "--from-config-datasource", "--to-schema", schema, "--script"],
  { encoding: "utf8", shell: process.platform === "win32" },
);
if (prisma.status !== 0) {
  console.error(prisma.stderr || prisma.stdout);
  console.error("No se pudo comparar la BD con schema.prisma.");
  process.exit(1);
}

const statements = prisma.stdout
  .split("\n")
  .filter((line) => !line.startsWith("--"))
  .join("\n")
  .split(";")
  .map((s) => s.replace(/\s+/g, " ").trim())
  .filter(Boolean);

const columnList = (text) => text.split(",").map((c) => c.replaceAll("`", "").trim().toLowerCase()).join(",");
const sameRule = (rule) => (rule.toUpperCase() === "NO ACTION" ? "RESTRICT" : rule.toUpperCase());

// Las FK de la BD, con sus columnas y reglas.
const query = `SELECT k.TABLE_NAME, k.CONSTRAINT_NAME,
    GROUP_CONCAT(k.COLUMN_NAME ORDER BY k.ORDINAL_POSITION), k.REFERENCED_TABLE_NAME,
    GROUP_CONCAT(k.REFERENCED_COLUMN_NAME ORDER BY k.ORDINAL_POSITION), r.DELETE_RULE, r.UPDATE_RULE
  FROM information_schema.KEY_COLUMN_USAGE k
  JOIN information_schema.REFERENTIAL_CONSTRAINTS r
    ON r.CONSTRAINT_SCHEMA = k.TABLE_SCHEMA AND r.CONSTRAINT_NAME = k.CONSTRAINT_NAME AND r.TABLE_NAME = k.TABLE_NAME
  WHERE k.TABLE_SCHEMA = '${database}' AND k.REFERENCED_TABLE_NAME IS NOT NULL
  GROUP BY k.TABLE_NAME, k.CONSTRAINT_NAME, k.REFERENCED_TABLE_NAME, r.DELETE_RULE, r.UPDATE_RULE`;
const rows = execFileSync(
  process.env.MYSQL_BIN ?? "mysql",
  ["-h", url.hostname, "-P", url.port || "3306", "-u", decodeURIComponent(url.username), "-N", "-B", "-e", query, database],
  { encoding: "utf8", env: { ...process.env, MYSQL_PWD: decodeURIComponent(url.password) } },
);
const dbForeignKeys = new Map(
  rows
    .trim()
    .split(/\r?\n/) // mysql.exe en Windows termina las líneas con \r\n
    .filter(Boolean)
    .map((line) => {
      const [table, name, columns, refTable, refColumns, onDelete, onUpdate] = line.split("\t");
      return [`${table}.${name}`.toLowerCase(), { columns: columnList(columns), refTable: refTable.toLowerCase(), refColumns: columnList(refColumns), onDelete, onUpdate }];
    }),
);

const ADD_FK =
  /^ALTER TABLE `([^`]+)` ADD CONSTRAINT `([^`]+)` FOREIGN KEY \(([^)]+)\) REFERENCES `([^`]+)`\s*\(([^)]+)\) ON DELETE (NO ACTION|RESTRICT|CASCADE|SET NULL|SET DEFAULT) ON UPDATE (NO ACTION|RESTRICT|CASCADE|SET NULL|SET DEFAULT)$/i;
const DROP_FK = /^ALTER TABLE `([^`]+)` DROP FOREIGN KEY `([^`]+)`$/i;

// FK que Prisma quiere volver a crear igual, salvo NO ACTION ↔ RESTRICT.
const equivalent = new Set();
for (const statement of statements) {
  const m = ADD_FK.exec(statement);
  if (!m) continue;
  const [, table, name, columns, refTable, refColumns, onDelete, onUpdate] = m;
  const key = `${table}.${name}`.toLowerCase();
  const db = dbForeignKeys.get(key);
  if (
    db &&
    db.columns === columnList(columns) &&
    db.refTable === refTable.toLowerCase() &&
    db.refColumns === columnList(refColumns) &&
    sameRule(db.onDelete) === sameRule(onDelete) &&
    sameRule(db.onUpdate) === sameRule(onUpdate)
  ) {
    equivalent.add(key);
  }
}

const isNoise = (statement) => {
  const add = ADD_FK.exec(statement);
  if (add) return equivalent.has(`${add[1]}.${add[2]}`.toLowerCase());
  const drop = DROP_FK.exec(statement);
  return Boolean(drop) && equivalent.has(`${drop[1]}.${drop[2]}`.toLowerCase());
};

const real = statements.filter((s) => !isNoise(s));
if (real.length > 0) {
  console.log(`schema.prisma no coincide con la BD (${real.length} cambios). SQL que la llevaría al esquema:\n`);
  console.log(real.map((s) => `${s};`).join("\n"));
  process.exit(1);
}
console.log(
  `schema.prisma coincide con la BD.${equivalent.size ? ` ${equivalent.size} FK solo difieren en NO ACTION/RESTRICT, que en InnoDB son la misma regla.` : ""}`,
);
