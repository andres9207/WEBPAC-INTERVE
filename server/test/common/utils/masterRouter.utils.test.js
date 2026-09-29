import { jest } from "@jest/globals";
import { validationResult } from "express-validator";
import { mockReq } from "../../helpers/request.mock.js";

const emit = jest.fn();
jest.unstable_mockModule("../../../src/common/configs/socket.manager.js", () => ({ getIO: () => ({ emit }) }));
jest.unstable_mockModule("../../../src/common/configs/prismaClient.js", () => ({ prisma: {} }));

const { defineMaster } = await import("../../../src/common/services/master.service.js");
const { createMasterControllers, createMasterRouter } = await import("../../../src/common/utils/masterRouter.utils.js");
const { createMasterSchemas } = await import("../../../src/common/utils/masterValidation.utils.js");
const { verifyToken } = await import("../../../src/common/middlewares/authjwt.middleware.js");

const config = defineMaster({
  model: "tbl_things",
  prefix: "thg",
  idField: "thgId",
  lockEntity: "TIPO_IDENTIFICACION",
  label: "cosa",
  feminine: true,
  routes: { entity: "thing", plural: "things" },
  permissions: { view: 1, create: 2, edit: 3, delete: 4, changeStatus: 5 },
  fields: [
    { name: "code", column: "thg_code", label: "código", maxLength: 5, pattern: { regex: /^[A-Z]+$/, message: "Solo mayúsculas." }, editable: false, filter: true },
    { name: "name", column: "thg_name", label: "nombre", maxLength: 20 },
  ],
  socketEvent: "refresh-things",
});

const serviceMock = {
  pagination: jest.fn(),
  getById: jest.fn(),
  select: jest.fn(),
  save: jest.fn(),
  changeStatus: jest.fn(),
  remove: jest.fn(),
};

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const forged = { useBy: 999, thg_create_by: 999, thg_update_by: 999, staId: 3 };

beforeEach(() => jest.clearAllMocks());

describe("createMasterControllers", () => {
  const controllers = createMasterControllers(config, serviceMock);

  it("save: autor de req.user, clave del encabezado, solo los campos declarados, y avisa por socket", async () => {
    serviceMock.save.mockResolvedValue({ thgId: 1 });
    const req = mockReq(
      { user: { useId: 7 }, ip: "1.1.1.1", body: { thgId: 0, code: "AB", name: "Uno", idempotencyKey: "del-body", ...forged } },
      { "Idempotency-Key": KEY }
    );

    await controllers.save(req, buildRes(), jest.fn());

    expect(serviceMock.save).toHaveBeenCalledWith({
      id: 0,
      input: { code: "AB", name: "Uno" },
      useBy: 7,
      ctx: { useId: 7, ip: "1.1.1.1" },
      idempotencyKey: KEY,
    });
    expect(emit).toHaveBeenCalledWith("refresh-things", {});
  });

  it("pagination: solo pasa los filtros declarados", async () => {
    serviceMock.pagination.mockResolvedValue({});
    const req = mockReq({ user: { useId: 7 }, body: { code: "A", name: "no filtrable", thg_name: "x", search: "abc", staId: 1, rows: 10 } });

    await controllers.pagination(req, buildRes(), jest.fn());

    expect(serviceMock.pagination.mock.calls[0][0]).toMatchObject({ filters: { code: "A" }, search: "abc", staId: 1, rows: 10 });
  });

  it("changeStatus y remove ignoran el autor del body", async () => {
    serviceMock.changeStatus.mockResolvedValue({});
    serviceMock.remove.mockResolvedValue({});
    const req = mockReq({ user: { useId: 7 }, body: { thgId: 4, staId: 2, useBy: 999 } });

    await controllers.changeStatus(req, buildRes(), jest.fn());
    await controllers.remove(req, buildRes(), jest.fn());

    expect(serviceMock.changeStatus.mock.calls[0][0]).toMatchObject({ id: 4, staId: 2, useBy: 7 });
    expect(serviceMock.remove.mock.calls[0][0]).toMatchObject({ id: 4, useBy: 7 });
  });

  it("delega los errores con next(err) y no avisa por socket", async () => {
    const error = Object.assign(new Error("en uso"), { statusCode: 400 });
    serviceMock.remove.mockRejectedValue(error);
    const next = jest.fn();

    await controllers.remove(mockReq({ user: { useId: 7 }, body: { thgId: 4 } }), buildRes(), next);

    expect(next).toHaveBeenCalledWith(error);
    expect(emit).not.toHaveBeenCalled();
  });
});

describe("createMasterRouter", () => {
  const router = createMasterRouter(config, serviceMock);
  const routes = router.stack.map((layer) => ({
    path: layer.route.path,
    method: Object.keys(layer.route.methods)[0],
    handlers: layer.route.stack.map((s) => s.handle),
  }));

  it("registra las seis acciones con sus nombres", () => {
    expect(routes.map((r) => `${r.method} ${r.path}`)).toEqual([
      "post /pagination_things",
      "get /get_thing",
      "get /get_things_select",
      "post /save_thing",
      "put /change_status_thing",
      "put /delete_thing",
    ]);
  });

  it("toda ruta empieza con verifyToken; solo el selector va sin requirePermission (DEC-018)", () => {
    for (const route of routes) expect(route.handlers[0]).toBe(verifyToken);
    // verifyToken + requirePermission + esquema… : el selector tiene un handler menos antes del esquema.
    const select = routes.find((r) => r.path === "/get_things_select");
    const view = routes.find((r) => r.path === "/get_thing");
    expect(view.handlers.length - select.handlers.length).toBe(1);
  });
});

describe("createMasterSchemas", () => {
  const schemas = createMasterSchemas(config);
  const errorsFor = async (schema, body, headers = {}) => {
    const req = { headers, body, query: body };
    for (const rule of schema) await rule.run(req);
    return validationResult(req).array().map((e) => e.msg);
  };

  it("al crear exige los campos, su largo y su patrón", async () => {
    expect(await errorsFor(schemas.save, { thgId: 0, code: "ab", name: "" }, { "idempotency-key": KEY })).toEqual([
      "Solo mayúsculas.",
      "El nombre es requerido.",
    ]);
  });

  it("al editar no valida los campos no editables ni exige la clave", async () => {
    expect(await errorsFor(schemas.save, { thgId: 3, code: "no importa", name: "Uno" })).toEqual([]);
  });

  it("cambio de estado: solo activo o inactivo", async () => {
    expect(await errorsFor(schemas.changeStatus, { thgId: 3, staId: 3 })).toEqual(["El estado debe ser activo o inactivo."]);
    expect(await errorsFor(schemas.changeStatus, { thgId: 3, staId: 2 })).toEqual([]);
  });

  it("obtener por id exige un entero positivo", async () => {
    expect(await errorsFor(schemas.getById, { thgId: "x" })).toHaveLength(1);
  });
});
