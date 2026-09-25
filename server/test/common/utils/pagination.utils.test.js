import { jest } from "@jest/globals";

const { paginate, resolvePagination, DEFAULT_ROWS, MAX_ROWS } = await import(
  "../../../src/common/utils/pagination.utils.js"
);

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
