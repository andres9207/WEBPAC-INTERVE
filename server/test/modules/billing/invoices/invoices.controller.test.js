import { jest } from "@jest/globals";
import { mockReq } from "../../../helpers/request.mock.js";

// El autor sale de req.user (DEC-005), nunca del body; la clave de
// idempotencia, del encabezado (DEC-016). Estado, fecha de aprobación y
// saldos del formulario no llegan al service (ADR-0020, "Seguridad"); los
// importes capturados sí, con los permisos efectivos (DEC-044).

const invoicesServiceMock = { saveInvoice: jest.fn(), approveInvoice: jest.fn(), cancelInvoice: jest.fn() };
const getEffectivePermissionIds = jest.fn().mockResolvedValue([87, 88]);
const emit = jest.fn();

jest.unstable_mockModule("../../../../src/modules/billing/invoices/invoices.service.js", () => invoicesServiceMock);
jest.unstable_mockModule("../../../../src/common/services/effectivePermissions.service.js", () => ({ getEffectivePermissionIds }));
jest.unstable_mockModule("../../../../src/common/configs/socket.manager.js", () => ({ getIO: () => ({ emit }) }));
jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: {} }));

const { saveInvoiceController, approveInvoiceController, cancelInvoiceController } = await import(
  "../../../../src/modules/billing/invoices/invoices.controller.js"
);

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";

beforeEach(() => jest.clearAllMocks());

describe("invoices.controller", () => {
  it("saveInvoice toma el autor de la sesión, pasa los importes capturados y descarta estado, fecha de aprobación y saldos", async () => {
    invoicesServiceMock.saveInvoice.mockResolvedValue({ invId: 70 });
    const req = mockReq(
      {
        user: { useId: 7, proId: 2 },
        ip: "10.0.0.1",
        body: {
          invId: 0,
          type: "ADVANCE",
          ctrId: 30,
          number: "F-1",
          date: "2026-03-01",
          state: "APPROVED",
          approvalDate: "2026-03-02",
          total: "999999",
          toAmortize: "999999",
          value: "90000000",
          amortization: "20000000",
          amortizationObservation: "Acuerdo",
          useBy: 999,
          inv_create_by: 999,
        },
      },
      { "Idempotency-Key": KEY }
    );

    await saveInvoiceController(req, buildRes(), jest.fn());

    const call = invoicesServiceMock.saveInvoice.mock.calls[0][0];
    expect(call).toMatchObject({ invId: 0, useBy: 7, idempotencyKey: KEY });
    expect(call.input).toMatchObject({
      type: "ADVANCE",
      ctrId: 30,
      number: "F-1",
      date: "2026-03-01",
      value: "90000000",
      amortization: "20000000",
      amortizationObservation: "Acuerdo",
    });
    for (const field of ["state", "approvalDate", "total", "toAmortize", "useBy", "inv_create_by"]) expect(call.input).not.toHaveProperty(field);
    expect(getEffectivePermissionIds).toHaveBeenCalledWith({ useId: 7, proId: 2 });
    expect([...call.granted]).toEqual([87, 88]);
    expect(emit).toHaveBeenCalledWith("refresh-invoices", {});
  });

  it("approveInvoice pasa solo la fecha y la observación, con la clave del encabezado", async () => {
    invoicesServiceMock.approveInvoice.mockResolvedValue({ invId: 70 });
    const req = mockReq(
      { user: { useId: 7, proId: 2 }, body: { invId: 70, approvalDate: "2026-03-05", observation: "ok", state: "CANCELLED" } },
      { "Idempotency-Key": KEY }
    );

    await approveInvoiceController(req, buildRes(), jest.fn());

    const call = invoicesServiceMock.approveInvoice.mock.calls[0][0];
    expect(call).toMatchObject({ invId: 70, useBy: 7, idempotencyKey: KEY });
    expect(call.input).toEqual({ approvalDate: "2026-03-05", observation: "ok" });
  });

  it("cancelInvoice pasa los permisos efectivos para que el service decida con el estado bajo bloqueo", async () => {
    invoicesServiceMock.cancelInvoice.mockResolvedValue({ invId: 70 });
    const req = mockReq({ user: { useId: 7, proId: 2 }, body: { invId: 70, reaId: 4, observation: "Error" } }, { "Idempotency-Key": KEY });

    await cancelInvoiceController(req, buildRes(), jest.fn());

    expect(getEffectivePermissionIds).toHaveBeenCalledWith({ useId: 7, proId: 2 });
    const call = invoicesServiceMock.cancelInvoice.mock.calls[0][0];
    expect([...call.granted]).toEqual([87, 88]);
    expect(call.input).toEqual({ reaId: 4, observation: "Error" });
  });
});
