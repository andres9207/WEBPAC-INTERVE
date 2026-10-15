import { writeFileSync } from "node:fs";
import { prisma } from "../src/common/configs/prismaClient.js";
import { getEffectivePermissionIds } from "../src/common/services/effectivePermissions.service.js";
import { DELETED_STATUS } from "../src/common/constants/status.constants.js";
import { getDashboardSummary } from "../src/modules/app/dashboard/dashboard.service.js";
import { getWorkDashboard } from "../src/modules/app/dashboard/workDashboard.service.js";

// Medición del tablero (PRO-BD-24; DEC-052 y DEC-063). Solo lectura.
//
//   yarn db:measure-dashboard [archivo.json]
//
// Corre el tablero general con "Ver todo" y con una obra, y el tablero de la
// obra, como el Superadmin: primero en vacío (calienta conexiones y caché),
// después RUNS veces para el tiempo de pared. De una corrida captura cada
// consulta que manda Prisma (PRISMA_QUERY_EVENTS=1, ver prismaClient.js) y le
// pide a MySQL su plan: EXPLAIN (tabla, acceso, índice, filas estimadas) y
// EXPLAIN ANALYZE (tiempo y filas reales). Marca las lecturas sin índice.
// Pensado para la base de volumen (seed.volume.js), pero sirve sobre cualquiera.

if (process.env.NODE_ENV === "production") {
  console.error("dashboard.measure.js: no se mide contra producción.");
  process.exit(1);
}
if (process.env.PRISMA_QUERY_EVENTS !== "1") {
  console.error("dashboard.measure.js: falta PRISMA_QUERY_EVENTS=1 (usa yarn db:measure-dashboard).");
  process.exit(1);
}

const ACTOR_USER_ID = 1;
const WARMUP = 2;
const RUNS = 20;
const ANALYZE_RUNS = 3;

const captured = [];
let capturing = false;
prisma.$on("query", (e) => {
  if (capturing) captured.push({ query: e.query, params: e.params, duration: Number(e.duration) });
});

const percentile = (sorted, p) => sorted[Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1)];
const plain = (value) => JSON.parse(JSON.stringify(value, (_k, v) => (typeof v === "bigint" ? Number(v) : v)));
const parseParams = (params) => {
  try {
    return JSON.parse(params);
  } catch {
    return [];
  }
};

const explain = async (query, params) => {
  const values = parseParams(params);
  const rows = plain(await prisma.$queryRawUnsafe(`EXPLAIN ${query}`, ...values));
  // Tiempo real de la raíz del árbol: "actual time=a..b" (b puede venir como 100e-6).
  // El menor de ANALYZE_RUNS: una sola ejecución es ruidosa.
  let best = null;
  for (let i = 0; i < ANALYZE_RUNS; i++) {
    const analyze = plain(await prisma.$queryRawUnsafe(`EXPLAIN ANALYZE ${query}`, ...values));
    const tree = Object.values(analyze[0] ?? {})[0] ?? "";
    const actual = /actual time=[\d.e-]+\.\.([\d.]+(?:e-?\d+)?)/.exec(tree);
    const ms = actual ? Number(actual[1]) : null;
    if (!best || (ms !== null && (best.ms === null || ms < best.ms))) best = { ms, tree };
  }
  return {
    plan: rows.map((r) => ({ table: r.table, type: r.type, key: r.key, rows: r.rows, filtered: r.filtered, extra: r.Extra })),
    analyzeMs: best.ms,
    tree: best.tree,
    fullScans: rows.filter((r) => r.type === "ALL" && r.table && !String(r.table).startsWith("<")).map((r) => r.table),
  };
};

const measure = async (name, fn) => {
  for (let i = 0; i < WARMUP; i++) await fn();
  const times = [];
  for (let i = 0; i < RUNS; i++) {
    const start = process.hrtime.bigint();
    await fn();
    times.push(Number(process.hrtime.bigint() - start) / 1e6);
  }
  times.sort((a, b) => a - b);

  captured.length = 0;
  capturing = true;
  await fn();
  capturing = false;
  const queries = captured.filter((q) => /^\s*SELECT/i.test(q.query));

  // Una entrada por texto de consulta: contractBalances repite las mismas por contrato.
  const distinct = new Map();
  for (const q of queries) {
    const entry = distinct.get(q.query) ?? { query: q.query, params: q.params, executions: 0, prismaMs: 0 };
    entry.executions += 1;
    entry.prismaMs += q.duration;
    distinct.set(q.query, entry);
  }
  const explained = [];
  for (const entry of distinct.values()) explained.push({ ...entry, ...(await explain(entry.query, entry.params)) });

  const result = {
    name,
    runs: RUNS,
    wallMs: { min: times[0], median: percentile(times, 50), p95: percentile(times, 95), max: times[times.length - 1] },
    queries: queries.length,
    distinctQueries: explained.length,
    fullScans: [...new Set(explained.flatMap((q) => q.fullScans))],
    detail: explained,
  };
  console.log(`\n${name}`);
  console.log(`  pared (ms): mín ${result.wallMs.min.toFixed(1)} · mediana ${result.wallMs.median.toFixed(1)} · p95 ${result.wallMs.p95.toFixed(1)} · máx ${result.wallMs.max.toFixed(1)}`);
  console.log(`  consultas: ${result.queries} (${result.distinctQueries} distintas) · lecturas completas: ${result.fullScans.join(", ") || "ninguna"}`);
  for (const q of explained) {
    const access = q.plan.map((p) => `${p.table}:${p.type}${p.key ? `(${p.key})` : ""}`).join(" ");
    console.log(`   ${String(q.analyzeMs ?? "?").padStart(7)} ms ×${q.executions}  ${access}`);
  }
  return result;
};

async function main() {
  const actor = await prisma.tbl_users.findUnique({ where: { use_id: ACTOR_USER_ID }, select: { use_id: true, pro_id: true } });
  const granted = new Set(await getEffectivePermissionIds({ useId: actor.use_id, proId: actor.pro_id }));

  // La obra con más contratos: el peor caso del tablero de la obra.
  const [busiest] = await prisma.tbl_contracts.groupBy({
    by: ["wrk_id"],
    where: { sta_id: { not: DELETED_STATUS } },
    _count: { _all: true },
    orderBy: { _count: { wrk_id: "desc" } },
    take: 1,
  });
  const wrkId = busiest.wrk_id;
  const volume = {
    works: await prisma.tbl_works.count(),
    contracts: await prisma.tbl_contracts.count(),
    concepts: await prisma.tbl_contract_concepts.count(),
    policies: await prisma.tbl_policies.count(),
    invoices: await prisma.tbl_invoices.count(),
    busiestWork: { wrkId, contracts: busiest._count._all },
  };
  console.log("Volumen:", volume);

  const scenarios = [
    await measure("Tablero general · Ver todo", () => getDashboardSummary({ granted, scope: { all: true, wrkId: null } })),
    await measure(`Tablero general · obra ${wrkId}`, () => getDashboardSummary({ granted, scope: { all: false, wrkId } })),
    await measure(`Tablero de la obra ${wrkId}`, () => getWorkDashboard({ granted, scope: { all: false, wrkId } })),
  ];

  const out = process.argv[2];
  if (out) {
    writeFileSync(out, JSON.stringify({ measuredAt: new Date().toISOString(), volume, scenarios }, null, 2));
    console.log(`\nDetalle (SQL, planes y árboles de EXPLAIN ANALYZE) en ${out}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
