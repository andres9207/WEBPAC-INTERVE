import { jest } from "@jest/globals";
import { readFileSync } from "fs";

// Catálogo de estados (DEC-038): el código, la migración, la semilla y la BD
// deben decir lo mismo.

const prismaMock = { tbl_status: { findMany: jest.fn() } };

jest.unstable_mockModule("../../../src/common/configs/prismaClient.js", () => ({
  prisma: prismaMock,
}));

const { STATUS_IDS, EDITABLE_STATUS_VALUES } = await import("../../../src/common/constants/status.constants.js");
const { verifyStatusCatalog } = await import("../../../src/common/services/status.service.js");

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const expected = Object.entries(STATUS_IDS).sort();
const catalog = Object.entries(STATUS_IDS).map(([key, id]) => ({ sta_id: id, sta_key: key }));

describe("status.constants", () => {
  it("la migración 0058 y seed.js siembran las mismas claves con los mismos ids", () => {
    const fromMigration = [...read("../../../../database/migrations/0058_alter_status_add_key.sql").matchAll(/^\((\d+), '[^']+', '([A-Z_]+)'/gm)];
    const fromSeed = [...read("../../../prisma/seed.js").matchAll(/sta_id: (\d+), sta_name: "[^"]+", sta_key: "([A-Z_]+)"/g)];

    expect(fromMigration.map((m) => [m[2], Number(m[1])]).sort()).toEqual(expected);
    expect(fromSeed.map((m) => [m[2], Number(m[1])]).sort()).toEqual(expected);
  });

  it("un staId editable es activo o inactivo, como número o texto; nunca eliminado", () => {
    expect([...EDITABLE_STATUS_VALUES].sort()).toEqual([1, 2, "1", "2"].sort());
    expect(EDITABLE_STATUS_VALUES).not.toContain(STATUS_IDS.DELETED);
  });
});

describe("verifyStatusCatalog", () => {
  beforeEach(() => jest.clearAllMocks());

  it("sin diferencias cuando la BD coincide con el código", async () => {
    prismaMock.tbl_status.findMany.mockResolvedValue(catalog);
    await expect(verifyStatusCatalog()).resolves.toEqual([]);
  });

  it("señala una clave con otro id", async () => {
    prismaMock.tbl_status.findMany.mockResolvedValue(catalog.map((row) => (row.sta_key === "DELETED" ? { ...row, sta_id: 4 } : row)));
    await expect(verifyStatusCatalog()).resolves.toEqual(["DELETED tiene el id 4 y el código espera 3"]);
  });

  it("señala una clave que falta (migración 0058 sin aplicar)", async () => {
    prismaMock.tbl_status.findMany.mockResolvedValue(catalog.filter((row) => row.sta_key !== "INACTIVE"));
    await expect(verifyStatusCatalog()).resolves.toEqual(["falta la clave INACTIVE (id 2)"]);
  });
});
