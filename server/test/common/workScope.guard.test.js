import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { fileURLToPath } from "url";

// Regla de revisión de DEC-047: todo controller de las áreas `work/` y
// `billing/`, y el del tablero (`app/dashboard`, que agrega sobre ellas),
// resuelve el alcance por obra (workScopeOf) y se lo pasa al service. Un controller nuevo que lo olvide dejaría ver o tocar otras obras.
// Las excepciones van en EXEMPT con su motivo.

const MODULES = fileURLToPath(new URL("../../src/modules/", import.meta.url));

const EXEMPT = {
  selectMyWorksController: "es la lista de obras que el usuario puede elegir: la arma selectMyWorks con sus propias reglas",
  previewWorkEndDateController: "solo suma un plazo a una fecha; no lee la BD",
  selectWorkManagersController: "lista usuarios candidatos a responsable, no datos de obras",
  checkIdentificationController: "coincidencia exacta en el catálogo de proveedores, para no crear duplicados (DEC-047)",
  selectProvidersController: "catálogo de proveedores para asignar a la obra, para no crear duplicados (DEC-047)",
};

const controllers = ["work", "billing", "app/dashboard"].flatMap((area) => {
  const walk = (dir) =>
    readdirSync(dir).flatMap((name) => {
      const path = join(dir, name);
      return statSync(path).isDirectory() ? walk(path) : path.endsWith(".controller.js") ? [path] : [];
    });
  return walk(join(MODULES, area));
});

const handlers = controllers.flatMap((path) => {
  const source = readFileSync(path, "utf8");
  const file = relative(MODULES, path).replaceAll("\\", "/");
  // Cada handler exportado, hasta el siguiente export.
  return [...source.matchAll(/export const (\w+Controller) = handle\(([\s\S]*?)(?=\nexport const |\n*$)/g)].map((m) => ({ file, name: m[1], body: m[2] }));
});

describe("alcance por obra en los controllers (DEC-047)", () => {
  it("encuentra los controllers de work/ y billing/", () => {
    expect(handlers.length).toBeGreaterThan(30);
  });

  it("cada handler pasa el alcance al service, salvo las excepciones declaradas", () => {
    const missing = handlers.filter((h) => !EXEMPT[h.name] && !h.body.includes("workScopeOf(req)")).map((h) => `${h.file}: ${h.name}`);
    expect(missing).toEqual([]);
  });

  it("las excepciones existen (no quedan nombres viejos)", () => {
    const names = new Set(handlers.map((h) => h.name));
    expect(Object.keys(EXEMPT).filter((name) => !names.has(name))).toEqual([]);
  });
});
