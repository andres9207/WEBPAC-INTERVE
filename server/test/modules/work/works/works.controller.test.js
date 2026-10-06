import { jest } from "@jest/globals";
import { mockReq } from "../../../helpers/request.mock.js";

// El autor y sus permisos salen de req.user (DEC-005), nunca del body; la
// clave de idempotencia, del encabezado (DEC-016). Solo los campos de la obra
// llegan al service.

const serviceMock = {
  paginationWorks: jest.fn(),
  getWork: jest.fn(),
  selectWorkManagers: jest.fn(),
  saveWork: jest.fn(),
  changeWorkStatus: jest.fn(),
  deleteWork: jest.fn(),
};
const getEffectivePermissionIds = jest.fn();
const emit = jest.fn();

jest.unstable_mockModule("../../../../src/modules/work/works/works.service.js", () => serviceMock);
jest.unstable_mockModule("../../../../src/common/services/effectivePermissions.service.js", () => ({ getEffectivePermissionIds }));
// Alcance por obra (DEC-047): el controller lo resuelve y lo pasa al service.
const SCOPE = Object.freeze({ all: false, wrkId: 8 });
const workScopeOf = jest.fn(async () => SCOPE);
jest.unstable_mockModule("../../../../src/common/services/workScope.service.js", () => ({ workScopeOf, selectMyWorks: jest.fn() }));
jest.unstable_mockModule("../../../../src/common/configs/socket.manager.js", () => ({ getIO: () => ({ emit }) }));
jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: {} }));

const { saveWorkController, deleteWorkController } = await import("../../../../src/modules/work/works/works.controller.js");

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";

beforeEach(() => {
  jest.clearAllMocks();
  getEffectivePermissionIds.mockResolvedValue([53, 57]);
});

describe("works.controller", () => {
  it("saveWork toma el autor y los permisos de la sesión, y descarta lo que no es de la obra", async () => {
    serviceMock.saveWork.mockResolvedValue({ wrkId: 40 });
    const req = mockReq(
      {
        user: { useId: 7, proId: 2 },
        ip: "10.0.0.1",
        body: { wrkId: 0, code: "OB-1", managers: [], useBy: 999, wrk_create_by: 999, granted: [1, 2, 3], sta_id: 3 },
      },
      { "Idempotency-Key": KEY }
    );

    await saveWorkController(req, buildRes(), jest.fn());

    expect(getEffectivePermissionIds).toHaveBeenCalledWith({ useId: 7, proId: 2 });
    const args = serviceMock.saveWork.mock.calls[0][0];
    expect(args).toMatchObject({ wrkId: 0, useBy: 7, ctx: { useId: 7, ip: "10.0.0.1" }, idempotencyKey: KEY });
    expect([...args.granted]).toEqual([53, 57]);
    // Alcance por obra (DEC-047): el del servidor, nunca uno del body.
    expect(workScopeOf).toHaveBeenCalledWith(req);
    expect(args.scope).toBe(SCOPE);
    expect(args.input).not.toHaveProperty("useBy");
    expect(args.input).not.toHaveProperty("sta_id");
    expect(args.input).not.toHaveProperty("granted");
    expect(emit).toHaveBeenCalledWith("refresh-works", {});
  });

  it("los errores del service van a next y no se notifica", async () => {
    const error = Object.assign(new Error("No tienes permiso"), { statusCode: 403 });
    serviceMock.deleteWork.mockRejectedValue(error);
    const next = jest.fn();

    await deleteWorkController(mockReq({ user: { useId: 7 }, body: { wrkId: 40 } }), buildRes(), next);

    expect(next).toHaveBeenCalledWith(error);
    expect(emit).not.toHaveBeenCalled();
  });
});
