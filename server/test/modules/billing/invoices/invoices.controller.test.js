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
jest.unstable_mockModule("../../../../src/modules/billing/invoices/invoiceEvidence.service.js", () => ({ getInvoiceEvidence: jest.fn() }));
const followUpsMock = { listFollowUps: jest.fn(), openFollowUp: jest.fn(), updateFollowUp: jest.fn(), closeFollowUp: jest.fn(), deleteFollowUp: jest.fn() };
jest.unstable_mockModule("../../../../src/modules/billing/invoices/invoiceFollowUps.service.js", () => followUpsMock);
jest.unstable_mockModule("../../../../src/common/services/effectivePermissions.service.js", () => ({ getEffectivePermissionIds }));
// Alcance por obra (DEC-047): el controller lo resuelve y lo pasa al service.
const SCOPE = Object.freeze({ all: false, wrkId: 8 });
const workScopeOf = jest.fn(async () => SCOPE);
jest.unstable_mockModule("../../../../src/common/services/workScope.service.js", () => ({ workScopeOf, selectMyWorks: jest.fn() }));
jest.unstable_mockModule("../../../../src/common/configs/socket.manager.js", () => ({ getIO: () => ({ emit }) }));
jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: {} }));

const { saveInvoiceController, approveInvoiceController, cancelInvoiceController, openInvoiceFollowUpController, closeInvoiceFollowUpController } = await import(
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
  it("seguimiento (DEC-076): autor de la sesión, clave del encabezado al abrir y solo los campos del acto; la fecha de cierre no viaja", async () => {
    followUpsMock.openFollowUp.mockResolvedValue({ ifuId: 5 });
    const openReq = mockReq(
      { user: { useId: 7, proId: 2 }, ip: "10.0.0.1", body: { invId: 70, openDate: "2026-10-20", description: "Falta soporte", useBy: 999, sta_id: 3 } },
      { "Idempotency-Key": KEY }
    );
    await openInvoiceFollowUpController(openReq, buildRes(), jest.fn());
    expect(followUpsMock.openFollowUp.mock.calls[0][0]).toEqual({
      invId: 70,
      input: { openDate: "2026-10-20", description: "Falta soporte" },
      useBy: 7,
      scope: SCOPE,
      ctx: { useId: 7, ip: "10.0.0.1" },
      idempotencyKey: KEY,
    });

    followUpsMock.closeFollowUp.mockResolvedValue({ ifuId: 5 });
    await closeInvoiceFollowUpController(
      mockReq({ user: { useId: 7, proId: 2 }, body: { ifuId: 5, observation: "Listo", closeDate: "2020-01-01" } }),
      buildRes(),
      jest.fn()
    );
    expect(followUpsMock.closeFollowUp.mock.calls[0][0]).toMatchObject({ ifuId: 5, input: { observation: "Listo" }, useBy: 7, scope: SCOPE });
    expect(emit).toHaveBeenCalledWith("refresh-invoices", {});
  });

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

  it("saveInvoice pasa los importes de la simple y nunca los calculados del cliente (DEC-065)", async () => {
    invoicesServiceMock.saveInvoice.mockResolvedValue({ invId: 71 });
    const amounts = {
      value: "20000",
      withholdingPct: "10",
      discount: "10",
      vatPct: "19",
      vatWithholdingPct: "10",
      icaWithholding: "10",
      freight: "10",
      earlyPaymentDiscount: "10",
    };
    const req = mockReq(
      {
        user: { useId: 7, proId: 2 },
        body: { invId: 0, type: "SIMPLE", wrkId: 8, wksId: 11, prvId: 77, number: "S-1", date: "2026-03-01", ...amounts, subtotal: "1", total: "1", billed: "1" },
      },
      { "Idempotency-Key": KEY }
    );

    await saveInvoiceController(req, buildRes(), jest.fn());

    const { input } = invoicesServiceMock.saveInvoice.mock.calls[0][0];
    expect(input).toMatchObject(amounts);
    for (const field of ["subtotal", "total", "billed"]) expect(input).not.toHaveProperty(field);
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
    // Alcance por obra (DEC-047): el del servidor, nunca uno del body.
    expect(workScopeOf).toHaveBeenCalledWith(req);
    expect(call.scope).toBe(SCOPE);
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
