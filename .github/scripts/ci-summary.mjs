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
// Texto legible en el tema claro y en el oscuro de GitHub.
const TEXT_COLORS = { pieTitleTextColor: "#8b949e", pieLegendTextColor: "#8b949e", pieSectionTextColor: "#ffffff", pieStrokeColor: "#ffffff" };
const TOP_RULES = 5;
const SLOWEST_SUITES = 5;
const MAX_FAILURES = 20;
const LARGEST_ASSETS = 8;
// Tope del detalle por regla: el resumen de un paso admite hasta 1 MiB.
const MAX_FILES_PER_RULE = 25;
const MAX_LINES_PER_FILE = 10;

// Nombre en español y cómo corregir cada regla (DEC-098). Una regla que no
// está aquí se muestra con su identificador.
const RULES = {
  "sonarjs/no-nested-conditional": ["Condiciones ternarias anidadas", "Un ternario dentro de otro (`a ? b : c ? d : e`). Pasarlo a `if`/`else` o a una función con nombre."],
  "sonarjs/no-inverted-boolean-check": ["Negaciones innecesarias", "`!(a === b)` se escribe `a !== b`; `!(a > b)`, `a <= b`."],
  "sonarjs/no-nested-template-literals": ["Plantillas de texto anidadas", "Un `${…}` con otra plantilla adentro. Calcular la parte interna en una variable antes."],
  "sonarjs/cognitive-complexity": ["Funciones demasiado complejas", "Muchos `if`, ciclos y anidamiento (más de 15 puntos). Dividir en funciones pequeñas con nombre. Entre paréntesis, cuánto mide cada una."],
  "sonarjs/misplaced-loop-counter": ["Contador de ciclo mal ubicado", "El `for` actualiza una variable distinta de la que compara. Revisar la condición o usar `while`."],
  "sonarjs/no-nested-functions": ["Funciones anidadas en exceso", "Funciones dentro de funciones a más de 4 niveles. Sacar las internas."],
  "sonarjs/no-nested-assignment": ["Asignaciones dentro de expresiones", "`if ((x = f()))`: asignar en una línea propia."],
  "sonarjs/concise-regex": ["Expresiones regulares mejorables", "Hay una forma más corta: `[0-9]` es `\\d`."],
  "sonarjs/super-linear-regex": ["Expresiones regulares lentas", "Con ciertas entradas tardan mucho (ReDoS). Revisar si reciben texto del usuario."],
  "sonarjs/slow-regex": ["Expresiones regulares lentas", "Con ciertas entradas tardan mucho (ReDoS). Revisar si reciben texto del usuario."],
  "sonarjs/anchor-precedence": ["Anclas ambiguas en expresiones regulares", "`^a|b$` no significa `^(a|b)$`: agrupar."],
  "sonarjs/pseudo-random": ["Números aleatorios no seguros", "`Math.random` no sirve para claves ni contraseñas: usar `crypto`."],
  "sonarjs/hashing": ["Hash débil", "MD5 y SHA-1 no protegen datos: usar SHA-256 o bcrypt."],
  "sonarjs/no-hardcoded-passwords": ["Posible contraseña en el código", "Las credenciales van en variables de entorno."],
  "sonarjs/no-hardcoded-ip": ["Dirección IP en el código", "Moverla a configuración."],
  "sonarjs/no-clear-text-protocols": ["Protocolo sin cifrar", "Usar `https` en lugar de `http`."],
  "sonarjs/x-powered-by": ["Cabecera X-Powered-By expuesta", "Ocultarla (helmet lo hace)."],
  "sonarjs/no-small-switch": ["`switch` con muy pocos casos", "Con uno o dos casos, un `if` es más claro."],
  "sonarjs/no-all-duplicated-branches": ["Ramas idénticas", "Todas las ramas hacen lo mismo: la condición sobra."],
  "sonarjs/no-dead-store": ["Valores asignados que nunca se usan", "La variable se sobrescribe antes de leerse."],
  "sonarjs/prefer-native-lodash-alternative": ["lodash donde basta JavaScript", "Usar el método nativo (`Array.prototype.map`, `Object.keys`…)."],
  "sonarjs/no-default-utility-imports": ["Import completo de una librería de utilidades", "Importar solo la función que se usa."],
  "prettier/prettier": ["Formato (Prettier)", "Espacios, comillas y saltos de línea. `npm run lint:fix` lo corrige."],
  "react-hooks/exhaustive-deps": ["Dependencias faltantes en hooks", "El arreglo de dependencias de `useEffect`/`useCallback` no lista todo lo que usa."],
  "no-unused-vars": ["Variables sin usar", "Quitarlas, o nombrarlas con `_` si se descartan a propósito (DEC-097)."],
  "(directiva eslint-disable sin uso)": ["Directivas eslint-disable que sobran", "La línea ya no tiene el hallazgo: quitar el comentario."],
  "(error de sintaxis)": ["Errores de sintaxis", "El archivo no se pudo analizar."],
};
const ruleName = (rule) => RULES[rule]?.[0] ?? rule;

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

const repoPath = (path) => relative(repoRoot, path).replaceAll("\\", "/");

// En GitHub, enlace a la línea en el commit revisado; en local, solo el número.
const { GITHUB_SERVER_URL, GITHUB_REPOSITORY, GITHUB_SHA } = process.env;
const lineLink = (path, line) =>
  GITHUB_REPOSITORY && GITHUB_SHA ? `[${line}](${GITHUB_SERVER_URL ?? "https://github.com"}/${GITHUB_REPOSITORY}/blob/${GITHUB_SHA}/${path}#L${line})` : String(line);

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
  const vars = { ...TEXT_COLORS, ...Object.fromEntries(shown.map(([, , color], i) => [`pie${i + 1}`, color])) };
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
    const path = repoPath(file.filePath);
    for (const m of file.messages) {
      if (m.severity === 2) errors += 1;
      else warnings += 1;
      // Sin regla: un error de sintaxis (fatal) o una directiva eslint-disable que ya no hace falta.
      const rule = m.ruleId ?? (m.fatal ? "(error de sintaxis)" : "(directiva eslint-disable sin uso)");
      const entry = byRule.get(rule) ?? { errors: 0, warnings: 0, files: new Map() };
      entry[m.severity === 2 ? "errors" : "warnings"] += 1;
      // La complejidad cognitiva dice cuánto mide la función: "from 24 to the 15 allowed".
      const score = rule === "sonarjs/cognitive-complexity" ? Number(/from (\d+)/.exec(m.message)?.[1]) || null : null;
      entry.files.set(path, [...(entry.files.get(path) ?? []), { line: m.line ?? 1, score }]);
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
      "Hallazgos por tipo",
      [...top.map((r, i) => [ruleName(r.rule), r.total, RULE_COLORS[i]]), ["Otros", others, RULE_COLORS[TOP_RULES]]],
    ),
    table(
      ["Hallazgo", "Regla", "Errores", "Advertencias", "Archivos"],
      rules.map((r) => [ruleName(r.rule), `\`${r.rule}\``, number(r.errors), number(r.warnings), number(r.files.size)]),
    ),
    "#### Detalle por tipo",
    ...rules.map(ruleDetail),
  );
  return out.filter(Boolean).join("\n\n");
};

// Un desplegable por regla: qué es, cómo se corrige y en qué archivos y
// líneas está. En GitHub, cada línea enlaza al archivo en el commit revisado.
const ruleDetail = (r) => {
  const hint = RULES[r.rule]?.[1];
  // Primero los archivos con más hallazgos; en complejidad, la función más compleja.
  const worst = (hits) => Math.max(...hits.map((h) => h.score ?? 0));
  const byCount = [...r.files].sort((a, b) => worst(b[1]) - worst(a[1]) || b[1].length - a[1].length || a[0].localeCompare(b[0]));
  const rows = byCount.slice(0, MAX_FILES_PER_RULE).map(([path, lines]) => {
    const shown = lines
      .slice(0, MAX_LINES_PER_FILE)
      .map(({ line, score }) => (score ? `${lineLink(path, line)} (${score})` : lineLink(path, line)))
      .join(", ");
    const more = lines.length > MAX_LINES_PER_FILE ? ` y ${lines.length - MAX_LINES_PER_FILE} más` : "";
    return [`\`${path}\``, number(lines.length), shown + more];
  });
  const hidden = byCount.length - MAX_FILES_PER_RULE;
  return [
    `<details><summary><b>${ruleName(r.rule)}</b>: ${number(r.total)} en ${number(r.files.size)} ${r.files.size === 1 ? "archivo" : "archivos"}</summary>\n`,
    hint ? `${hint} Regla \`${r.rule}\`.` : `Regla \`${r.rule}\`.`,
    table(["Archivo", "Hallazgos", "Líneas"], rows),
    hidden > 0 ? `…y ${number(hidden)} archivos más. Para verlos todos: \`npm run lint\` en local.` : "",
    "\n</details>",
  ]
    .filter(Boolean)
    .join("\n\n");
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
