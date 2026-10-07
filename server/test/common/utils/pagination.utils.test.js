import { jest } from "@jest/globals";

const { paginate, resolvePagination, searchWhere, countByStatus, containsFilter, idFilter, dateRangeFilter, filtersWhere, DEFAULT_ROWS, MAX_ROWS } =
  await import("../../../src/common/utils/pagination.utils.js");

const buildModel = (rows = [], total = 0) => ({
  findMany: jest.fn().mockResolvedValue(rows),
  count: jest.fn().mockResolvedValue(total),
});

describe("resolvePagination", () => {
  it("acepta { first, rows } (tablas con paginator)", () => {
    expect(resolvePagination({ first: 20, rows: 10 })).toEqual({ skip: 20, take: 10 });
  });

  it("acepta { page, limit } (página desde 1)", () => {
    expect(resolvePagination({ page: 3, limit: 25 })).toEqual({ skip: 50, take: 25 });
  });

  it("first tiene prioridad sobre page, y first = 0 es válido", () => {
    expect(resolvePagination({ first: 0, rows: 10, page: 5 })).toEqual({ skip: 0, take: 10 });
  });

  it("sin datos usa la primera página con el tamaño por defecto", () => {
    expect(resolvePagination()).toEqual({ skip: 0, take: DEFAULT_ROWS });
  });

  it("nunca devuelve más de MAX_ROWS ni menos de 1, aunque el cliente lo pida", () => {
    expect(resolvePagination({ rows: 100000 }).take).toBe(MAX_ROWS);
    expect(resolvePagination({ limit: 0 }).take).toBe(1);
    expect(resolvePagination({ rows: -5 }).take).toBe(1);
  });

  it("valores basura o negativos caen a valores seguros", () => {
    expect(resolvePagination({ first: -10, rows: "abc" })).toEqual({ skip: 0, take: DEFAULT_ROWS });
    expect(resolvePagination({ page: "x", limit: "10" })).toEqual({ skip: 0, take: 10 });
    expect(resolvePagination({ page: -2, limit: 10 })).toEqual({ skip: 0, take: 10 });
  });
});

describe("paginate", () => {
  it("consulta la página y el total con el mismo where, y arma los metadatos", async () => {
    const model = buildModel([{ id: 1 }, { id: 2 }], 45);
    const where = { sta_id: { not: 3 } };

    const result = await paginate(model, { where, orderBy: { id: "asc" } }, { first: 20, rows: 10 });

    expect(model.findMany).toHaveBeenCalledWith({ where, orderBy: { id: "asc" }, skip: 20, take: 10 });
    expect(model.count).toHaveBeenCalledWith({ where });
    expect(result).toEqual({ results: [{ id: 1 }, { id: 2 }], total: 45, page: 3, limit: 10, totalPages: 5 });
  });

  it("skip y take los decide el helper aunque vengan en queryArgs", async () => {
    const model = buildModel();

    await paginate(model, { where: {}, skip: 0, take: 100000 }, { page: 2, limit: 5 });

    expect(model.findMany).toHaveBeenCalledWith({ where: {}, skip: 5, take: 5 });
  });

  it("sin resultados responde total 0 y 0 páginas", async () => {
    const result = await paginate(buildModel([], 0), {}, {});

    expect(result).toEqual({ results: [], total: 0, page: 1, limit: DEFAULT_ROWS, totalPages: 0 });
  });
});

describe("searchWhere", () => {
  it("busca el texto recortado en cualquiera de las columnas", () => {
    expect(searchWhere(["a_name", "a_code"], "  cc ")).toEqual({
      OR: [{ a_name: { contains: "cc" } }, { a_code: { contains: "cc" } }],
    });
  });

  it("sin texto o sin columnas no filtra", () => {
    expect(searchWhere(["a_name"], "   ")).toEqual({});
    expect(searchWhere(["a_name"], undefined)).toEqual({});
    expect(searchWhere([], "cc")).toEqual({});
  });
});

describe("countByStatus", () => {
  it("agrupa por estado con el where dado", async () => {
    const model = { groupBy: jest.fn().mockResolvedValue([{ sta_id: 1, _count: { _all: 4 } }, { sta_id: 2, _count: { _all: 1 } }]) };

    await expect(countByStatus(model, { sta_id: { not: 3 } })).resolves.toEqual({ 1: 4, 2: 1 });
    expect(model.groupBy).toHaveBeenCalledWith({ by: ["sta_id"], where: { sta_id: { not: 3 } }, _count: { _all: true } });
  });
});

describe("filtros por campo (DEC-048)", () => {
  it("texto contenido, recortado; vacío no filtra", () => {
    expect(containsFilter(" torre ", (c) => ({ wrk_name: c }))).toEqual({ wrk_name: { contains: "torre" } });
    expect(containsFilter("   ", (c) => ({ wrk_name: c }))).toBeNull();
    expect(containsFilter(undefined, (c) => ({ wrk_name: c }))).toBeNull();
  });

  it("id exacto solo con un entero positivo", () => {
    expect(idFilter("4", (id) => ({ cnc_id: id }))).toEqual({ cnc_id: 4 });
    for (const value of ["", null, 0, "-1", "abc", "1.5"]) expect(idFilter(value, (id) => ({ cnc_id: id }))).toBeNull();
  });

  it("rango de fechas con uno o los dos extremos, incluidos", () => {
    expect(dateRangeFilter("inv_date", "2026-01-01", "2026-01-31")).toEqual({
      inv_date: { gte: new Date("2026-01-01T00:00:00Z"), lte: new Date("2026-01-31T00:00:00Z") },
    });
    expect(dateRangeFilter("inv_date", "", "2026-01-31")).toEqual({ inv_date: { lte: new Date("2026-01-31T00:00:00Z") } });
    expect(dateRangeFilter("inv_date", null, undefined)).toBeNull();
  });

  it("junta en un AND solo las condiciones no vacías", () => {
    expect(filtersWhere([null, { a: 1 }, null, { b: 2 }])).toEqual({ AND: [{ a: 1 }, { b: 2 }] });
    expect(filtersWhere([null, null])).toEqual({});
  });
});
