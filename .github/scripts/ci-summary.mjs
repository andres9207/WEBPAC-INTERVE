// Resumen de cada job del CI (DEC-098): gráfico de tests, hallazgos del lint y
// tamaño del build, en la página de la ejecución de GitHub Actions
// ($GITHUB_STEP_SUMMARY). Sin dependencias: lee los JSON que ya escriben Jest
// (--json) y ESLint (-f json), y los archivos de dist/.
//
//   node ci-summary.mjs server --jest <jest.json> --eslint <eslint.json>
//   node ci-summary.mjs client --eslint <eslint.json> --dist <client/dist>
//
// Corre también cuando un paso anterior falló: un reporte que falta se informa
// en el resumen, no rompe el script. Sin GITHUB_STEP_SUMMARY, imprime en la
// consola (para probarlo en local).
import { appendFileSync, existsSync, readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { gzipSync } from "zlib";

const COLORS = { ok: "#2e7d32", fail: "#c62828", skip: "#9e9e9e" };
const RULE_COLORS = ["#1565c0", "#ef6c00", "#6a1b9a", "#00838f", "#ad1457", "#9e9e9e"];
const TOP_RULES = 5;
const SLOWEST_SUITES = 5;
const MAX_FAILURES = 20;
const LARGEST_ASSETS = 8;

const [, , job, ...rest] = process.argv;
const args = Object.fromEntries(rest.flatMap((value, i) => (value.startsWith("--") ? [[value.slice(2), rest[i + 1]]] : [])));
const repoRoot = process.env.GITHUB_WORKSPACE ?? process.cwd();

const readJson = (path) => {
  if (!path || !existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
};

const number = (n) => n.toLocaleString("es-CO");
const kb = (bytes) => `${(bytes / 1024).toLocaleString("es-CO", { maximumFractionDigits: 1 })} kB`;
const seconds = (ms) => `${(ms / 1000).toLocaleString("es-CO", { maximumFractionDigits: 1 })} s`;
const cell = (text) => String(text).replaceAll("|", "\\|").replaceAll("\n", " ");
const table = (headers, rows) =>
  [`| ${headers.join(" | ")} |`, `| ${headers.map(() => "---").join(" | ")} |`, ...rows.map((r) => `| ${r.map(cell).join(" | ")} |`)].join("\n");

// Mermaid no dibuja bien porciones en cero: se omiten, y cada color va con su
// porción (pie1, pie2… siguen el orden de las porciones).
const pie = (title, slices) => {
  const shown = slices.filter(([, value]) => value > 0);
  if (shown.length === 0) return "";
  const vars = Object.fromEntries(shown.map(([, , color], i) => [`pie${i + 1}`, color]));
  return [
    "```mermaid",
    `%%{init: {"theme": "base", "themeVariables": ${JSON.stringify(vars)}}}%%`,
    `pie title ${title}`,
    ...shown.map(([label, value]) => `  "${label}" : ${value}`),
    "```",
  ].join("\n");
};

const testsSection = (jest) => {
  if (!jest) return "### Tests\n\n> ⚠️ No hay resultados de Jest: el job falló antes de correr los tests.";

  const passed = jest.numPassedTests;
  const failed = jest.numFailedTests;
  const skipped = jest.numPendingTests + jest.numTodoTests;
  const suites = jest.testResults.map((s) => ({
    name: relative(repoRoot, s.name).replaceAll("\\", "/"),
    ms: s.endTime - s.startTime,
    status: s.status,
    message: s.message,
    failures: s.assertionResults.filter((a) => a.status === "failed").map((a) => a.fullName),
  }));
  // Duración real: las suites corren en paralelo, sumarlas exagera.
  const wallMs = Math.max(jest.startTime, ...jest.testResults.map((s) => s.endTime)) - jest.startTime;

  const out = [
    `### Tests ${jest.success ? "✅" : "❌"}`,
    pie(`Tests · ${number(jest.numTotalTests)}`, [
      ["Pasaron", passed, COLORS.ok],
      ["Fallaron", failed, COLORS.fail],
      ["Omitidos", skipped, COLORS.skip],
    ]),
    table(
      ["Tests", "Pasaron", "Fallaron", "Omitidos", "Suites", "Suites con fallos", "Duración"],
      [[number(jest.numTotalTests), number(passed), number(failed), number(skipped), number(jest.numTotalTestSuites), number(jest.numFailedTestSuites), seconds(wallMs)]],
    ),
  ];

  const failures = suites.flatMap((s) =>
    s.failures.length > 0 ? s.failures.map((name) => [s.name, name]) : s.status === "failed" ? [[s.name, s.message.split("\n").find(Boolean) ?? "La suite no se pudo ejecutar"]] : [],
  );
  if (failures.length > 0) {
    out.push(`#### Fallos (${failures.length})`, table(["Suite", "Test"], failures.slice(0, MAX_FAILURES)));
    if (failures.length > MAX_FAILURES) out.push(`…y ${failures.length - MAX_FAILURES} más en el log del paso Tests.`);
  }

  const slowest = [...suites].sort((a, b) => b.ms - a.ms).slice(0, SLOWEST_SUITES);
  out.push(
    "<details><summary>Suites más lentas</summary>\n",
    table(["Suite", "Tiempo"], slowest.map((s) => [s.name, seconds(s.ms)])),
    "\n</details>",
  );
  return out.filter(Boolean).join("\n\n");
};

const lintSection = (eslint) => {
  if (!eslint) return "### Lint\n\n> ⚠️ No hay resultados de ESLint: el job falló antes del lint.";

  let errors = 0;
  let warnings = 0;
  const byRule = new Map();
  const files = new Set();
  for (const file of eslint) {
    for (const m of file.messages) {
      if (m.severity === 2) errors += 1;
      else warnings += 1;
      // Sin regla: un error de sintaxis (fatal) o una directiva eslint-disable que ya no hace falta.
      const rule = m.ruleId ?? (m.fatal ? "(error de sintaxis)" : "(directiva eslint-disable sin uso)");
      const entry = byRule.get(rule) ?? { errors: 0, warnings: 0 };
      entry[m.severity === 2 ? "errors" : "warnings"] += 1;
      byRule.set(rule, entry);
      files.add(file.filePath);
    }
  }

  const out = [
    `### Lint ${errors === 0 ? "✅" : "❌"}`,
    table(["Archivos revisados", "Con hallazgos", "Errores", "Advertencias"], [[number(eslint.length), number(files.size), number(errors), number(warnings)]]),
  ];
  if (byRule.size === 0) return [...out, "Sin hallazgos."].join("\n\n");

  const rules = [...byRule].map(([rule, c]) => ({ rule, ...c, total: c.errors + c.warnings })).sort((a, b) => b.total - a.total);
  const top = rules.slice(0, TOP_RULES);
  const others = rules.slice(TOP_RULES).reduce((sum, r) => sum + r.total, 0);
  out.push(
    pie(
      "Hallazgos por regla",
      [...top.map((r, i) => [r.rule, r.total, RULE_COLORS[i]]), ["Otras", others, RULE_COLORS[TOP_RULES]]],
    ),
    table(["Regla", "Errores", "Advertencias"], rules.slice(0, 10).map((r) => [`\`${r.rule}\``, number(r.errors), number(r.warnings)])),
  );
  return out.filter(Boolean).join("\n\n");
};

const buildSection = (dist) => {
  const assets = dist && join(dist, "assets");
  if (!assets || !existsSync(assets)) return "### Build\n\n> ⚠️ No hay `dist/`: el build no terminó.";

  const files = readdirSync(assets)
    .filter((name) => /\.(js|css)$/.test(name))
    .map((name) => {
      const content = readFileSync(join(assets, name));
      return { name, size: statSync(join(assets, name)).size, gzip: gzipSync(content).length };
    })
    .sort((a, b) => b.size - a.size);
  const total = files.reduce((acc, f) => ({ size: acc.size + f.size, gzip: acc.gzip + f.gzip }), { size: 0, gzip: 0 });

  return [
    "### Build ✅",
    table(["Archivos JS y CSS", "Tamaño", "Comprimido (gzip)"], [[number(files.length), kb(total.size), kb(total.gzip)]]),
    "<details><summary>Archivos más grandes</summary>\n",
    table(["Archivo", "Tamaño", "gzip"], files.slice(0, LARGEST_ASSETS).map((f) => [f.name, kb(f.size), kb(f.gzip)])),
    "\n</details>",
  ].join("\n\n");
};

const sections = {
  server: () => ["## Servidor", lintSection(readJson(args.eslint)), testsSection(readJson(args.jest))],
  client: () => ["## Cliente", lintSection(readJson(args.eslint)), buildSection(args.dist)],
};

if (!sections[job]) {
  console.error(`Uso: node ci-summary.mjs <server|client> [--jest archivo] [--eslint archivo] [--dist carpeta]`);
  process.exit(2);
}

const markdown = `${sections[job]().join("\n\n")}\n`;
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown);
else console.log(markdown);
