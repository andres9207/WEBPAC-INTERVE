import { execFileSync } from "child_process";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, posix, relative } from "path";
import { fileURLToPath } from "url";

// Cada import nombra el archivo con sus mayúsculas exactas (DEC-096). Windows
// no distingue mayúsculas, así que `contexts/AuthContext` encuentra
// `authContext.jsx` en local; en Linux (el CI y Hostinger) no, y el build o el
// arranque fallan. Esta prueba compara cada import con el nombre real de cada
// carpeta y archivo, en cualquier sistema. Falla con el archivo y el import.
//
// Revisa los imports relativos (servidor y cliente) y los del cliente que
// empiezan por una carpeta o archivo de client/src (baseUrl de jsconfig:
// `contexts/…`, `ui-component/…`). Los paquetes de node_modules quedan fuera.

const ROOT = fileURLToPath(new URL("../../../", import.meta.url));
const SOURCES = ["server/src", "server/prisma", "server/test", "server/app.js", "server/server.js", "server/socket.js", "client/src"];
const CODE = /\.(js|jsx|mjs)$/;
const RESOLVE = ["", ".js", ".jsx", ".mjs", "/index.js", "/index.jsx"];
const CLIENT_SRC = "client/src";
const IMPORT = /(?:\bfrom\s+|\bimport\s*\(\s*|\bimport\s+)["']([^"']+)["']/g;

const listing = new Map();
const entries = (dir) => {
  if (!listing.has(dir)) {
    let names = [];
    try {
      names = readdirSync(join(ROOT, dir));
    } catch {
      // carpeta inexistente: el segmento no existe
    }
    listing.set(dir, names);
  }
  return listing.get(dir);
};

// "exact" si cada segmento existe con esas mayúsculas, "case" si solo existe
// con otras, "missing" si no existe.
const lookup = (path) => {
  let dir = "";
  let result = "exact";
  for (const segment of path.split("/")) {
    const names = entries(dir);
    const found = names.includes(segment) ? segment : names.find((n) => n.toLowerCase() === segment.toLowerCase());
    if (!found) return "missing";
    if (found !== segment) result = "case";
    dir = dir ? `${dir}/${found}` : found;
  }
  return result;
};

const realName = (path) => {
  let dir = "";
  for (const segment of path.split("/")) {
    const found = entries(dir).find((n) => n.toLowerCase() === segment.toLowerCase());
    dir = dir ? `${dir}/${found}` : found;
  }
  return dir;
};

const files = (path) => {
  const full = join(ROOT, path);
  if (!statSync(full, { throwIfNoEntry: false })) return [];
  if (!statSync(full).isDirectory()) return CODE.test(path) ? [path] : [];
  return readdirSync(full).flatMap((name) => (name === "node_modules" ? [] : files(`${path}/${name}`)));
};

const clientRoots = new Set(entries(CLIENT_SRC).map((name) => name.replace(CODE, "")));

const target = (file, spec) => {
  if (spec.startsWith(".")) return posix.normalize(posix.join(posix.dirname(file), spec));
  if (file.startsWith(`${CLIENT_SRC}/`) && clientRoots.has(spec.split("/")[0])) return `${CLIENT_SRC}/${spec}`;
  return null;
};

const mismatches = SOURCES.flatMap(files).flatMap((file) => {
  const source = readFileSync(join(ROOT, file), "utf8");
  return [...source.matchAll(IMPORT)].flatMap(([, spec]) => {
    const base = target(file, spec);
    if (!base) return [];
    const results = RESOLVE.map((ext) => [base + ext, lookup(base + ext)]);
    if (results.some(([, r]) => r === "exact")) return [];
    const wrong = results.find(([, r]) => r === "case");
    return wrong ? [`${file}: '${spec}' → el archivo es ${realName(wrong[0])}`] : [];
  });
});

// Renombrar solo las mayúsculas en Windows cambia el disco pero no git (con
// core.ignorecase=true hace falta `git mv` en dos pasos): en local todo
// funciona y el clon de Linux recibe el nombre viejo. Cada archivo que git
// registra tiene que existir en el disco con esas mismas mayúsculas. Sin git
// (una copia sin .git), esta parte no aplica.
const tracked = (() => {
  try {
    return execFileSync("git", ["ls-files", "-z", "--", "server", "client/src"], { cwd: ROOT, encoding: "utf8" })
      .split("\0")
      .filter(Boolean);
  } catch {
    return [];
  }
})();

const gitMismatches = tracked
  .filter((path) => lookup(path) === "case")
  .map((path) => `git registra ${path}, pero en el disco es ${realName(path)}: renombrar con git mv en dos pasos`);

const SELF = relative(ROOT, fileURLToPath(import.meta.url)).replaceAll("\\", "/");

describe("los imports nombran los archivos con sus mayúsculas exactas (DEC-096)", () => {
  it("revisa el código del servidor y del cliente", () => {
    expect(SOURCES.flatMap(files)).toContain(SELF);
    expect(SOURCES.flatMap(files).some((f) => f.startsWith(`${CLIENT_SRC}/`))).toBe(true);
  });

  it("ningún import difiere del nombre real solo en mayúsculas", () => {
    expect(mismatches).toEqual([]);
  });

  it("git registra cada archivo con las mismas mayúsculas que tiene en el disco", () => {
    expect(gitMismatches).toEqual([]);
  });
});
