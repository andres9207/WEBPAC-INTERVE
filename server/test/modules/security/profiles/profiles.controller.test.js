import { jest } from "@jest/globals";
import { mockReq } from "../../../helpers/request.mock.js";

// Regresión (ADR-0013, decisión 10): autor e identidad del solicitante
// siempre desde req.user, nunca del body.

const profilesServiceMock = {
  paginationProfiles: jest.fn(),
  getModules: jest.fn(),
  saveProfile: jest.fn(),
  deleteProfile: jest.fn(),
};

jest.unstable_mockModule("../../../../src/modules/security/profiles/profiles.service.js", () => profilesServiceMock);
jest.unstable_mockModule("../../../../src/common/configs/socket.manager.js", () => ({
  getIO: () => ({ emit: jest.fn() }),
}));
jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: {} }));

const { saveProfileController, deleteProfileController, paginationProfilesController } = await import(
  "../../../../src/modules/security/profiles/profiles.controller.js"
);

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const forgedAuthor = { useBy: 999, updatedBy: 999, pro_create_by: 999, pro_update_by: 999 };

beforeEach(() => {
  jest.clearAllMocks();
});

describe("profiles.controller — autor desde req.user", () => {
  it("saveProfileController ignora useBy y columnas de autoría del body", async () => {
    profilesServiceMock.saveProfile.mockResolvedValue({ proId: 4 });
    const req = mockReq({ user: { useId: 7 }, ip: "10.0.0.1", body: { proId: 0, name: "Ventas", staId: 1, ...forgedAuthor } });

    await saveProfileController(req, buildRes(), jest.fn());

    const args = profilesServiceMock.saveProfile.mock.calls[0][0];
    expect(args.useBy).toBe(7);
    expect(args.ctx).toEqual({ useId: 7, ip: "10.0.0.1" });
    expect(args).not.toHaveProperty("pro_create_by");
    expect(args).not.toHaveProperty("updatedBy");
  });

  it("deleteProfileController ignora updatedBy del body", async () => {
    profilesServiceMock.deleteProfile.mockResolvedValue({});
    const req = mockReq({ user: { useId: 7 }, ip: "10.0.0.1", body: { proId: 4, ...forgedAuthor } });

    await deleteProfileController(req, buildRes(), jest.fn());

    expect(profilesServiceMock.deleteProfile).toHaveBeenCalledWith({
      proId: 4,
      updatedBy: 7,
      ctx: { useId: 7, ip: "10.0.0.1" },
    });
  });

  it("paginationProfilesController toma useId de req.user: enviar useId=1 no revela el perfil Superadmin", async () => {
    profilesServiceMock.paginationProfiles.mockResolvedValue({ data: [], total: 0 });
    const req = mockReq({ user: { useId: 7 }, body: { useId: 1, rows: 10 } });

    await paginationProfilesController(req, buildRes(), jest.fn());

    expect(profilesServiceMock.paginationProfiles.mock.calls[0][0].useId).toBe(7);
  });
});
