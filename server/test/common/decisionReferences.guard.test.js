import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { basename, join, relative } from "path";
import { fileURLToPath } from "url";

// Mantiene el código de acuerdo con engineering/decisiones/. Cada ficha que
// el código cita tiene que existir y seguir aplicando: una retirada ya no es
// regla, y una reemplazada del todo obliga a citar también la que la
// reemplaza. Así, cuando una decisión cambia en los documentos, esta prueba
// señala el código que la aplicaba. Falla con el archivo y la ficha.
//
// Quedan fuera las migraciones (son historia: describen la decisión vigente
// cuando se escribieron) y las decisiones de negocio del backlog (`DEC-01`…,
// dos dígitos), que no tienen ficha.

const ROOT = fileURLToPath(new URL("../../../", import.meta.url));
const DECISIONS = join(ROOT, "engineering/decisiones");
const SOURCES = ["server/src", "server/prisma", "server/test", "client/src"];
const EXTENSIONS = /\.(js|jsx|prisma)$/;
const SELF = relative(ROOT, fileURLToPath(import.meta.url)).replaceAll("\\", "/");

const files = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (name === "node_modules") return [];
    return statSync(path).isDirectory() ? files(path) : EXTENSIONS.test(name) ? [path] : [];
  });

// Ficha → { retired, replacedBy }. El estado sale de la ficha: la línea
// **Tipo:** dice si está retirada, y el aviso "> **Reemplazada por [DEC-NNN]"
// al principio, por cuál se reemplazó del todo. "Reemplazada en parte" no
// cuenta: lo que no se reemplazó sigue vigente.
const decisions = Object.fromEntries(
  readdirSync(DECISIONS)
    .filter((name) => /^DEC-\d{3}-.+\.md$/.test(name))
    .map((name) => {
      const text = readFileSync(join(DECISIONS, name), "utf8");
      const type = text.match(/\*\*Tipo:\*\*\s*([^·\n]*)/)?.[1] ?? "";
      const replacedBy = [...text.matchAll(/^> \*\*Reemplazada por \[(DEC-\d{3})\]/gm)].map((m) => m[1]);
      return [basename(name).slice(0, 7), { retired: /^Retirada/.test(type.trim()), replacedBy }];
    })
);

const citations = SOURCES.filter((dir) => existsSync(join(ROOT, dir)))
  .flatMap((dir) => files(join(ROOT, dir)))
  .map((path) => ({
    file: relative(ROOT, path).replaceAll("\\", "/"),
    ids: new Set(readFileSync(path, "utf8").match(/\bDEC-\d{3}\b/g) ?? []),
  }))
  .filter(({ file, ids }) => file !== SELF && ids.size > 0);

const offenders = (problem) =>
  citations.flatMap(({ file, ids }) => [...ids].flatMap((id) => problem(id, ids) ?? []).map((msg) => `${file}  ${msg}`));

describe("el código cita decisiones que siguen aplicando (engineering/decisiones)", () => {
  it("encuentra las fichas y el código que las cita", () => {
    expect(Object.keys(decisions).length).toBeGreaterThan(0);
    expect(citations.length).toBeGreaterThan(0);
  });

  it("cada ficha citada existe", () => {
    expect(offenders((id) => (decisions[id] ? null : `${id}: no hay ficha en engineering/decisiones`))).toEqual([]);
  });

  it("ninguna ficha citada está retirada", () => {
    expect(offenders((id) => (decisions[id]?.retired ? `${id}: está retirada, ya no es regla` : null))).toEqual([]);
  });

  it("quien cita una ficha reemplazada cita también la que la reemplaza", () => {
    expect(
      offenders((id, ids) => {
        const replacedBy = decisions[id]?.replacedBy ?? [];
        return replacedBy.length && !replacedBy.some((r) => ids.has(r)) ? `${id}: reemplazada por ${replacedBy.join(", ")}` : null;
      })
    ).toEqual([]);
  });
});
