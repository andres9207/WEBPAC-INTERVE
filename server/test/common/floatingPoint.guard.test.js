import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { fileURLToPath } from "url";

// Regla de revisión de DEC-045 (FND-BE-28, criterio 4): impide reintroducir
// aritmética en punto flotante sobre importes, porcentajes o saldos. Falla
// con el archivo y la línea. Si un caso es legítimo (no financiero), se
// renombra la variable o se agrega a ALLOWED con su motivo.

const SRC = fileURLToPath(new URL("../../src/", import.meta.url));
const MONEY_UTILS = "common/utils/money.utils.js";

// Usos legítimos: no son dinero. Archivo → motivo.
const ALLOWED = {
  "common/utils/term.utils.js": "avance del plazo en días, un indicador entero (0–100) que no entra en ningún cálculo financiero",
  "modules/work/works/works.service.js": "promedio del avance del plazo de las obras, mismo indicador",
};

const files = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : path.endsWith(".js") ? [path] : [];
  });

const lines = files(SRC).flatMap((path) => {
  const file = relative(SRC, path).replaceAll("\\", "/");
  return readFileSync(path, "utf8")
    .split("\n")
    .map((text, i) => ({ file, line: i + 1, text }));
});

// Nombres de importes, porcentajes y saldos del dominio.
const FINANCIAL = /(_cost|_value|_amortization|_pct\b|Pct\b|percent|Percent|amortization|Amortization|directCost|amount_|balance|Balance)/;

const offenders = (predicate) => lines.filter(predicate).map(({ file, line, text }) => `${file}:${line}  ${text.trim()}`);

describe("sin punto flotante en el cálculo (DEC-045)", () => {
  it("nadie usa parseFloat", () => {
    expect(offenders(({ text }) => /parseFloat\s*\(/.test(text) && !/^\s*(\/\/|\*)/.test(text))).toEqual([]);
  });

  it("ningún Decimal se convierte a número (toNumber)", () => {
    expect(offenders(({ text }) => /\.toNumber\s*\(/.test(text))).toEqual([]);
  });

  it("el redondeo vive solo en money.utils.js (regla única)", () => {
    expect(offenders(({ file, text }) => file !== MONEY_UTILS && /toDecimalPlaces\s*\(|ROUND_HALF/.test(text))).toEqual([]);
  });

  it("ningún importe, porcentaje ni saldo pasa por Number o Math", () => {
    expect(
      offenders(({ file, text }) =>
        !ALLOWED[file] && /\b(Number|Math\.\w+)\s*\(/.test(text) && FINANCIAL.test(text.slice(text.search(/\b(Number|Math\.\w+)\s*\(/))))
    ).toEqual([]);
  });
});
