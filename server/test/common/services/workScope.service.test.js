import { jest } from "@jest/globals";

// Alcance por obra (DEC-047): qué obra puede usar el usuario según el
// encabezado X-Work-Id, y cómo lo aplican los services.

const state = { viewAll: false, work: null };

const prismaMock = {
  tbl_works: {
    findFirst: jest.fn(async () => state.work),
    findMany: jest.fn(async () => [
      { wrk_id: 8, wrk_code: "OB-8", wrk_name: "Puente", sta_id: 1 },
      { wrk_id: 9, wrk_code: "OB-9", wrk_name: "Vía", sta_id: 2 },
    ]),
  },
};
const hasEffectivePermission = jest.fn(async () => state.viewAll);

jest.unstable_mockModule("../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));
jest.unstable_mockModule("../../../src/common/services/effectivePermissions.service.js", () => ({ hasEffectivePermission }));

const scopeService = await import("../../../src/common/services/workScope.service.js");
const { resolveWorkScope, selectMyWorks, scopeWhere, inScope, assertInScope, workScopeOf } = scopeService;

const user = { useId: 7, proId: 2 };

beforeEach(() => {
  jest.clearAllMocks();
  state.viewAll = false;
  state.work = null;
});

describe("resolveWorkScope", () => {
  it("con el permiso de ver todas: sin obra o con 'ALL' es todo; con obra, solo esa", async () => {
    state.viewAll = true;
    await expect(resolveWorkScope(user, undefined)).resolves.toEqual({ all: true, wrkId: null });
    await expect(resolveWorkScope(user, "ALL")).resolves.toEqual({ all: true, wrkId: null });
    expect(hasEffectivePermission).toHaveBeenCalledWith({ useId: 7, proId: 2, perId: 91 });

    state.work = { wrk_id: 8 };
    await expect(resolveWorkScope(user, "8")).resolves.toEqual({ all: false, wrkId: 8 });
  });

  it("sin el permiso, solo una obra de la que es responsable activo", async () => {
    state.work = { wrk_id: 8 };
    await expect(resolveWorkScope(user, "8")).resolves.toEqual({ all: false, wrkId: 8 });
    expect(prismaMock.tbl_works.findFirst.mock.calls[0][0].where).toEqual({
      wrk_id: 8,
      sta_id: { not: 3 },
      tbl_work_managers: { some: { use_id: 7, sta_id: 1 } },
    });
  });

  it("sin el permiso: una obra ajena, 'ALL' o ninguna dan un alcance vacío", async () => {
    await expect(resolveWorkScope(user, "9")).resolves.toEqual({ all: false, wrkId: null });
    await expect(resolveWorkScope(user, "ALL")).resolves.toEqual({ all: false, wrkId: null });
    await expect(resolveWorkScope(user, undefined)).resolves.toEqual({ all: false, wrkId: null });
  });

  it("workScopeOf lo resuelve una vez por petición", async () => {
    state.work = { wrk_id: 8 };
    const req = { user, get: jest.fn(() => "8") };
    await workScopeOf(req);
    await workScopeOf(req);
    expect(req.get).toHaveBeenCalledWith("X-Work-Id");
    expect(hasEffectivePermission).toHaveBeenCalledTimes(1);
    expect(req.workScope).toEqual({ all: false, wrkId: 8 });
  });
});

describe("selectMyWorks", () => {
  it("sin el permiso, solo las obras de las que es responsable", async () => {
    const result = await selectMyWorks(user);
    expect(prismaMock.tbl_works.findMany.mock.calls[0][0].where).toEqual({
      sta_id: { not: 3 },
      tbl_work_managers: { some: { use_id: 7, sta_id: 1 } },
    });
    expect(result).toEqual({
      viewAll: false,
      works: [
        { value: 8, label: "OB-8 - Puente", active: true },
        { value: 9, label: "OB-9 - Vía", active: false },
      ],
    });
  });

  it("con el permiso, todas las obras no eliminadas", async () => {
    state.viewAll = true;
    const result = await selectMyWorks(user);
    expect(prismaMock.tbl_works.findMany.mock.calls[0][0].where).toEqual({ sta_id: { not: 3 } });
    expect(result.viewAll).toBe(true);
  });
});

describe("aplicar el alcance", () => {
  const all = { all: true, wrkId: null };
  const one = { all: false, wrkId: 8 };
  const none = { all: false, wrkId: null };

  it("scopeWhere: todo sin filtro, una obra o nada", () => {
    expect(scopeWhere(all)).toEqual({});
    expect(scopeWhere(one)).toEqual({ wrk_id: { in: [8] } });
    expect(scopeWhere(none)).toEqual({ wrk_id: { in: [] } });
    expect(scopeWhere(one, (ids) => ({ tbl_work_providers: { some: { wrk_id: { in: ids } } } }))).toEqual({
      tbl_work_providers: { some: { wrk_id: { in: [8] } } },
    });
  });

  it("inScope y assertInScope: 404 fuera del alcance, sin revelar el registro", () => {
    expect(inScope(all, 9)).toBe(true);
    expect(inScope(one, "8")).toBe(true);
    expect(inScope(one, 9)).toBe(false);
    expect(inScope(none, 8)).toBe(false);
    expect(() => assertInScope(one, 9, "No se encontró la obra.")).toThrow(expect.objectContaining({ statusCode: 404, message: "No se encontró la obra." }));
  });
});
