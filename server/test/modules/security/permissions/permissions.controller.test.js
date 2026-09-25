import { jest } from "@jest/globals";

// Regresión (ADR-0013, decisión 10): el autor de ASIGNAR/REVOCAR en la
// bitácora y el solicitante que se usa contra la autoconcesión salen de
// req.user, nunca del body.

const permissionsServiceMock = {
  getProfileWindows: jest.fn(),
  getUserPermissions: jest.fn(),
  getProfilePermissions: jest.fn(),
  updateProfilePermissions: jest.fn(),
  updateUserPermissions: jest.fn(),
  getAllPages: jest.fn(),
};

jest.unstable_mockModule(
  "../../../../src/modules/security/permissions/permissions.service.js",
  () => permissionsServiceMock
);
jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: {} }));

const { updateProfilePermissionsController, updateUserPermissionsController } = await import(
  "../../../../src/modules/security/permissions/permissions.controller.js"
);

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const forged = { actingProId: 999, actingUseId: 999, useBy: 999, ctx: { useId: 999, ip: "1.1.1.1" } };

beforeEach(() => {
  jest.clearAllMocks();
});

describe("permissions.controller — solicitante y autor desde req.user", () => {
  it("updateProfilePermissionsController ignora actingProId/ctx del body", async () => {
    permissionsServiceMock.updateProfilePermissions.mockResolvedValue({});
    const req = {
      user: { useId: 7, proId: 2 },
      ip: "10.0.0.1",
      body: { permissions: [1, 2], proId: 4, ...forged },
    };

    await updateProfilePermissionsController(req, buildRes(), jest.fn());

    expect(permissionsServiceMock.updateProfilePermissions).toHaveBeenCalledWith({
      permissions: [1, 2],
      proId: 4,
      actingProId: 2,
      ctx: { useId: 7, ip: "10.0.0.1" },
    });
  });

  it("updateUserPermissionsController ignora actingUseId/ctx del body", async () => {
    permissionsServiceMock.updateUserPermissions.mockResolvedValue({});
    const req = {
      user: { useId: 7, proId: 2 },
      ip: "10.0.0.1",
      body: { permissions: [3], useId: 5, ...forged },
    };

    await updateUserPermissionsController(req, buildRes(), jest.fn());

    expect(permissionsServiceMock.updateUserPermissions).toHaveBeenCalledWith({
      permissions: [3],
      useId: 5,
      actingUseId: 7,
      ctx: { useId: 7, ip: "10.0.0.1" },
    });
  });
});
