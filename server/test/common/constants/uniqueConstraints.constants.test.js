import { readFileSync, readdirSync } from "fs";

const { UNIQUE_CONSTRAINT_MESSAGES, INTERNAL_UNIQUE_CONSTRAINTS } = await import(
  "../../../src/common/constants/uniqueConstraints.constants.js"
);

// Los índices UNIQUE vigentes según database/: el schema base y todas las
// migraciones, menos los que alguna migración elimina, solos (DROP INDEX) o
// con su tabla (DROP TABLE).
const DATABASE = new URL("../../../../database/", import.meta.url);
const MIGRATIONS = new URL("migrations/", DATABASE);
const sql = [
  readFileSync(new URL("bdtemplate.sql", DATABASE), "utf8"),
  ...readdirSync(MIGRATIONS)
    .filter((f) => f.endsWith(".sql"))
    .sort()
    .map((f) => readFileSync(new URL(f, MIGRATIONS), "utf8")),
].join("\n");

const names = (text, regex) => new Set([...text.matchAll(regex)].map((m) => m[1]));
const droppedTables = names(sql, /DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?`?(\w+)`?/gi);
// Cada sentencia con la tabla que crea o altera: un UNIQUE de una tabla eliminada no cuenta.
const statementTable = (statement) => statement.match(/(?:CREATE|ALTER)\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?`?(\w+)`?/i)?.[1];
const created = new Set(
  sql
    .split(";")
    .filter((statement) => !droppedTables.has(statementTable(statement)))
    .flatMap((statement) => [...names(statement, /UNIQUE\s+(?:INDEX|KEY)\s+`?(\w+)`?/gi)])
);
const dropped = names(sql, /DROP\s+(?:INDEX|KEY)\s+`?(\w+)`?/gi);
const inDatabase = [...created].filter((n) => !dropped.has(n)).sort();

const withMessage = Object.keys(UNIQUE_CONSTRAINT_MESSAGES);
const declared = [...withMessage, ...INTERNAL_UNIQUE_CONSTRAINTS].sort();

describe("uniqueConstraints.constants", () => {
  it("cada UNIQUE de database/ está declarado, con mensaje o como interno, y no sobra ninguno", () => {
    expect(inDatabase.length).toBeGreaterThan(0);
    expect(declared).toEqual(inDatabase);
  });

  it("un índice no está a la vez con mensaje y como interno", () => {
    expect(withMessage.filter((n) => INTERNAL_UNIQUE_CONSTRAINTS.includes(n))).toEqual([]);
  });

  it("ningún mensaje expone el nombre de un índice, una tabla o una columna", () => {
    for (const message of Object.values(UNIQUE_CONSTRAINT_MESSAGES)) {
      expect(message).not.toMatch(/\b(uq|tbl)_|_(id|active|key)\b|Contacta a sistemas/);
    }
  });
});
