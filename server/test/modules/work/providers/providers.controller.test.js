import { jest } from "@jest/globals";
import { mockReq } from "../../../helpers/request.mock.js";

// El autor y sus permisos salen de req.user (DEC-005), nunca del body; la
// clave de idempotencia, del encabezado (DEC-016). Solo los campos del
// proveedor llegan al service.

const serviceMock = {
  paginationProviders: jest.fn(),
  getProvider: jest.fn(),
  checkIdentification: jest.fn(),
  selectProviders: jest.fn(),
  saveProvider: jest.fn(),
  changeProviderStatus: jest.fn(),
  deleteProvider: jest.fn(),
  paginationWorkProviders: jest.fn(),
  assignProviderToWork: jest.fn(),
  updateWorkProvider: jest.fn(),
  unassignProviderFromWork: jest.fn(),
};
const getEffectivePermissionIds = jest.fn();
const emit = jest.fn();

jest.unstable_mockModule("../../../../src/modules/work/providers/providers.service.js", () => serviceMock);
jest.unstable_mockModule("../../../../src/common/services/effectivePermissions.service.js", () => ({ getEffectivePermissionIds }));
jest.unstable_mockModule("../../../../src/common/configs/socket.manager.js", () => ({ getIO: () => ({ emit }) }));
jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: {} }));

const { saveProviderController, assignProviderController, unassignProviderController } = await import(
  "../../../../src/modules/work/providers/providers.controller.js"
);

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";

beforeEach(() => {
  jest.clearAllMocks();
  getEffectivePermissionIds.mockResolvedValue([61, 66]);
});

describe("providers.controller", () => {
  it("saveProvider toma el autor y los permisos de la sesión, y descarta lo que no es del proveedor", async () => {
    serviceMock.saveProvider.mockResolvedValue({ prvId: 50 });
    const req = mockReq(
      {
        user: { useId: 7, proId: 2 },
        ip: "10.0.0.1",
        body: { prvId: 0, name: "Andina", contacts: [], useBy: 999, prv_create_by: 999, granted: [65], sta_id: 3 },
      },
      { "Idempotency-Key": KEY }
    );

    await saveProviderController(req, buildRes(), jest.fn());

    expect(getEffectivePermissionIds).toHaveBeenCalledWith({ useId: 7, proId: 2 });
    const args = serviceMock.saveProvider.mock.calls[0][0];
    expect(args).toMatchObject({ prvId: 0, useBy: 7, ctx: { useId: 7, ip: "10.0.0.1" }, idempotencyKey: KEY });
    expect([...args.granted]).toEqual([61, 66]);
    expect(args.input).not.toHaveProperty("useBy");
    expect(args.input).not.toHaveProperty("sta_id");
    expect(args.input).not.toHaveProperty("granted");
    expect(emit).toHaveBeenCalledWith("refresh-providers", {});
  });

  it("asignar usa el autor de la sesión y la clave del encabezado, y avisa a obras y proveedores", async () => {
    serviceMock.assignProviderToWork.mockResolvedValue({ wkpId: 300 });
    const req = mockReq(
      { user: { useId: 7 }, body: { wrkId: 8, prvId: 77, assignmentDate: "2026-10-01", useBy: 999, wkp_create_by: 999 } },
      { "Idempotency-Key": KEY }
    );

    await assignProviderController(req, buildRes(), jest.fn());

    const args = serviceMock.assignProviderToWork.mock.calls[0][0];
    expect(args).toMatchObject({ wrkId: 8, prvId: 77, useBy: 7, idempotencyKey: KEY });
    expect(Object.keys(args.input).sort()).toEqual(["assignmentDate", "observation", "staId"]);
    expect(emit).toHaveBeenCalledWith("refresh-works", {});
    expect(emit).toHaveBeenCalledWith("refresh-providers", {});
  });

  it("un error del service va a next y no emite", async () => {
    const err = Object.assign(new Error("No está asignado"), { statusCode: 404 });
    serviceMock.unassignProviderFromWork.mockRejectedValue(err);
    const next = jest.fn();

    await unassignProviderController(mockReq({ user: { useId: 7 }, body: { wrkId: 8, prvId: 77 } }), buildRes(), next);

    expect(next).toHaveBeenCalledWith(err);
    expect(emit).not.toHaveBeenCalled();
  });
});
