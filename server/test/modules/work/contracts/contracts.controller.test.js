import { jest } from "@jest/globals";
import { mockReq } from "../../../helpers/request.mock.js";

// El autor sale de req.user (DEC-005), nunca del body; la clave de
// idempotencia, del encabezado (DEC-016). La fecha fin, el estado, el número
// de otrosí y los valores derivados no llegan al service (ADR-0015 y
// ADR-0016, "Seguridad").

const contractsServiceMock = {
  paginationContracts: jest.fn(),
  getContract: jest.fn(),
  selectContractWorks: jest.fn(),
  getContractFormOptions: jest.fn(),
  saveContract: jest.fn(),
  deleteContract: jest.fn(),
};
const conceptsServiceMock = { createAmendment: jest.fn(), createLiquidation: jest.fn(), updateConcept: jest.fn() };
const suspensionsServiceMock = { suspendContract: jest.fn() };
const getEffectivePermissionIds = jest.fn().mockResolvedValue([72, 77]);
const emit = jest.fn();

jest.unstable_mockModule("../../../../src/modules/work/contracts/contracts.service.js", () => contractsServiceMock);
jest.unstable_mockModule("../../../../src/modules/work/contracts/contractConcepts.service.js", () => conceptsServiceMock);
jest.unstable_mockModule("../../../../src/modules/work/contracts/contractSuspensions.service.js", () => suspensionsServiceMock);
jest.unstable_mockModule("../../../../src/common/services/effectivePermissions.service.js", () => ({ getEffectivePermissionIds }));
jest.unstable_mockModule("../../../../src/common/configs/socket.manager.js", () => ({ getIO: () => ({ emit }) }));
jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: {} }));

const { saveContractController, createAmendmentController, suspendContractController } = await import("../../../../src/modules/work/contracts/contracts.controller.js");

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";

beforeEach(() => jest.clearAllMocks());

describe("contracts.controller", () => {
  it("saveContract toma el autor de la sesión y descarta fecha fin, estado y valores derivados", async () => {
    contractsServiceMock.saveContract.mockResolvedValue({ ctrId: 30 });
    const req = mockReq(
      {
        user: { useId: 7, proId: 2 },
        ip: "10.0.0.1",
        body: {
          ctrId: 0,
          wrkId: 8,
          number: "C-1",
          endDate: "2030-01-01",
          state: "LIQUIDATED",
          useBy: 999,
          ctr_create_by: 999,
          initialConcept: { directCost: "100", value: "999999", advance: "5000", vatPct: "19" },
        },
      },
      { "Idempotency-Key": KEY }
    );

    await saveContractController(req, buildRes(), jest.fn());

    const args = contractsServiceMock.saveContract.mock.calls[0][0];
    expect(args.useBy).toBe(7);
    expect(args.idempotencyKey).toBe(KEY);
    expect(args.input).not.toHaveProperty("endDate");
    expect(args.input).not.toHaveProperty("state");
    expect(args.input).not.toHaveProperty("useBy");
    expect(args.input.initialConcept).not.toHaveProperty("value");
    expect(args.input.initialConcept).not.toHaveProperty("advance");
    expect(args.input.initialConcept).toMatchObject({ directCost: "100", vatPct: "19" });
    expect(emit).toHaveBeenCalledWith("refresh-contracts", {});
  });

  it("createAmendment no pasa un número de otrosí ni un tipo del cliente", async () => {
    conceptsServiceMock.createAmendment.mockResolvedValue({ ccpId: 1 });
    const req = mockReq({ user: { useId: 7 }, body: { ctrId: 30, number: 99, type: "LIQUIDATION", extension: 2, directCost: "10" } }, { "Idempotency-Key": KEY });

    await createAmendmentController(req, buildRes(), jest.fn());

    const args = conceptsServiceMock.createAmendment.mock.calls[0][0];
    expect(args.input).not.toHaveProperty("number");
    expect(args.input).not.toHaveProperty("type");
    expect(args.input).toMatchObject({ extension: 2, directCost: "10" });
  });

  it("createAmendment pasa la fecha de reanudación y los permisos efectivos de la sesión", async () => {
    conceptsServiceMock.createAmendment.mockResolvedValue({ ccpId: 1 });
    const req = mockReq({ user: { useId: 7, proId: 2 }, body: { ctrId: 30, liftDate: "2026-05-11", granted: [1, 2, 3] } }, { "Idempotency-Key": KEY });

    await createAmendmentController(req, buildRes(), jest.fn());

    expect(getEffectivePermissionIds).toHaveBeenCalledWith({ useId: 7, proId: 2 });
    const args = conceptsServiceMock.createAmendment.mock.calls[0][0];
    expect(args.input.liftDate).toBe("2026-05-11");
    expect(args.input).not.toHaveProperty("granted");
    expect([...args.granted]).toEqual([72, 77]);
  });

  it("suspendContract toma el autor y la clave de la sesión, y no pasa estado ni días del cliente", async () => {
    suspensionsServiceMock.suspendContract.mockResolvedValue({ ctrId: 30 });
    const body = {
      ctrId: 30,
      reaId: 4,
      suspensionDate: "2026-05-01",
      liftCondition: "Llegada del material",
      observation: "x",
      requiresReport: true,
      state: "IN_PROGRESS",
      days: 99,
      useBy: 999,
    };
    const req = mockReq({ user: { useId: 7 }, body }, { "Idempotency-Key": KEY });

    await suspendContractController(req, buildRes(), jest.fn());

    const args = suspensionsServiceMock.suspendContract.mock.calls[0][0];
    expect(args).toMatchObject({ ctrId: 30, useBy: 7, idempotencyKey: KEY });
    expect(args.input).toEqual({
      reaId: 4,
      suspensionDate: "2026-05-01",
      liftCondition: "Llegada del material",
      observation: "x",
      requiresReport: true,
    });
    expect(emit).toHaveBeenCalledWith("refresh-contracts", {});
  });

  it("delega los errores con next", async () => {
    const error = Object.assign(new Error("x"), { statusCode: 409 });
    conceptsServiceMock.createAmendment.mockRejectedValue(error);
    const next = jest.fn();
    await createAmendmentController(mockReq({ user: { useId: 7 }, body: { ctrId: 30 } }, { "Idempotency-Key": KEY }), buildRes(), next);
    expect(next).toHaveBeenCalledWith(error);
  });
});
