import { readFileSync, readdirSync } from "fs";

const { UNIQUE_CONSTRAINT_MESSAGES, INTERNAL_UNIQUE_CONSTRAINTS } = await import(
  "../../../src/common/constants/uniqueConstraints.constants.js"
);

// Los índices UNIQUE vigentes según database/: el schema base y todas las
// migraciones, menos los que alguna migración elimina.
const DATABASE = new URL("../../../../database/", import.meta.url);
const MIGRATIONS = new URL("migrations/", DATABASE);
const sql = [
  readFileSync(new URL("bdtemplate.sql", DATABASE), "utf8"),
  ...readdirSync(MIGRATIONS)
    .filter((f) => f.endsWith(".sql"))
    .sort()
    .map((f) => readFileSync(new URL(f, MIGRATIONS), "utf8")),
].join("\n");

const names = (regex) => new Set([...sql.matchAll(regex)].map((m) => m[1]));
const created = names(/UNIQUE\s+(?:INDEX|KEY)\s+`?(\w+)`?/gi);
const dropped = names(/DROP\s+(?:INDEX|KEY)\s+`?(\w+)`?/gi);
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
