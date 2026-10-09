import { jest } from "@jest/globals";
import { mockReq } from "../../../helpers/request.mock.js";

// El autor sale de req.user (DEC-005), nunca del body; de cada campo solo
// llegan al service cfdId, aplica, visible, obligatorio y orden (DEC-053).

const fieldsServiceMock = { getProviderTypeFields: jest.fn(), saveProviderTypeFields: jest.fn() };
const emit = jest.fn();

jest.unstable_mockModule("../../../../src/modules/admin/providerTypes/providerTypeFields.service.js", () => fieldsServiceMock);
jest.unstable_mockModule("../../../../src/common/configs/socket.manager.js", () => ({ getIO: () => ({ emit }) }));
jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: {} }));

const { saveProviderTypeFieldsController } = await import("../../../../src/modules/admin/providerTypes/providerTypeFields.controller.js");

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => jest.clearAllMocks());

describe("providerTypeFields.controller", () => {
  it("toma el autor de la sesión, descarta lo que no es de la configuración y avisa por socket si cambió", async () => {
    fieldsServiceMock.saveProviderTypeFields.mockResolvedValue({ changed: true, configVersion: 4 });
    const req = mockReq({
      user: { useId: 7, proId: 2 },
      ip: "10.0.0.1",
      body: {
        pvtId: 2,
        useBy: 999,
        pvt_config_version: 99,
        fields: [{ cfdId: 1, applies: true, visible: true, required: true, order: 1, pvt_id: 5, cfd_key: "X", ptf_create_by: 999 }],
      },
    });
    const res = buildRes();

    await saveProviderTypeFieldsController(req, res, jest.fn());

    expect(fieldsServiceMock.saveProviderTypeFields).toHaveBeenCalledWith({
      pvtId: 2,
      fields: [{ cfdId: 1, applies: true, visible: true, required: true, order: 1 }],
      useBy: 7,
      ctx: { useId: 7, ip: "10.0.0.1" },
    });
    expect(emit).toHaveBeenCalledWith("refresh-provider-types", {});
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("sin cambios no avisa por socket", async () => {
    fieldsServiceMock.saveProviderTypeFields.mockResolvedValue({ changed: false, configVersion: 3 });
    await saveProviderTypeFieldsController(mockReq({ user: { useId: 7 }, body: { pvtId: 2, fields: [] } }), buildRes(), jest.fn());
    expect(emit).not.toHaveBeenCalled();
  });

  it("delega el error a next", async () => {
    const error = Object.assign(new Error("no"), { statusCode: 400 });
    fieldsServiceMock.saveProviderTypeFields.mockRejectedValue(error);
    const next = jest.fn();
    await saveProviderTypeFieldsController(mockReq({ user: { useId: 7 }, body: { pvtId: 2, fields: [] } }), buildRes(), next);
    expect(next).toHaveBeenCalledWith(error);
  });
});
