import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Anular un contrato (DEC-082): desde cualquier estado y también con facturas
// aprobadas, con motivo de anulación de contrato y observación. Anulado es
// final: no se vuelve a anular y no admite ningún acto.

const state = { contract: null, reason: null, replay: null };

const prismaMock = {
  tbl_contracts: { findUnique: jest.fn(async () => state.contract), update: jest.fn() },
  tbl_reasons: { findUnique: jest.fn(async () => state.reason) },
  tbl_contract_status_history: { create: jest.fn(), findUnique: jest.fn(async () => state.replay) },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));
const notifyWorkManagers = jest.fn(async () => 1);
jest.unstable_mockModule("../../../../src/modules/work/contracts/contractNotifications.service.js", () => ({
  notifyWorkManagers,
  contractLabel: (c) => c.ctr_number,
}));

const { cancelContract } = await import("../../../../src/modules/work/contracts/contractCancellation.service.js");
const { STATE_ALLOWS } = await import("../../../../src/modules/work/contracts/contractTerms.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const ctx = { useId: 9, ip: "1.1.1.1" };
const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);
const lockedTables = () => prismaMock.$queryRaw.mock.calls.map((call) => call.slice(1).map((v) => v?.strings?.join("") ?? "").join(" "));

const cancel = (input = { reaId: 6, observation: " Contrato firmado por error " }) =>
  cancelContract({ ctrId: 30, input, useBy: 9, ctx, idempotencyKey: KEY });

beforeEach(() => {
  jest.clearAllMocks();
  state.contract = { ctr_id: 30, ctr_state: "IN_PROGRESS", sta_id: 1 };
  state.reason = { rea_scope: "CONTRACT_CANCEL", rea_name: "Error de registro", sta_id: 1 };
  state.replay = null;
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
});

describe("cancelContract", () => {
  it.each(["IN_PROGRESS", "SUSPENDED", "IN_LIQUIDATION", "LIQUIDATED"])(
    "anula desde %s: pasa a anulado con historial, motivo, observación y la clave",
    async (fromState) => {
      state.contract.ctr_state = fromState;

      await expect(cancel()).resolves.toEqual({ message: "Contrato anulado correctamente", ctrId: 30 });
      expect(prismaMock.tbl_contracts.update.mock.calls[0][0].data).toEqual({ ctr_state: "CANCELLED", ctr_update_by: 9 });
      expect(prismaMock.tbl_contract_status_history.create.mock.calls[0][0].data).toMatchObject({
        csh_from_state: fromState,
        csh_to_state: "CANCELLED",
        csh_origin: "MANUAL",
        rea_id: 6,
        csh_observation: "Anulado: Error de registro. Contrato firmado por error",
        csh_idempotency_key: KEY,
      });
      expect(auditRows().find((r) => r.aud_field === "ctr_state")).toMatchObject({ aud_old_value: fromState, aud_new_value: "CANCELLED" });
    }
  );

  it("bloquea contrato → motivo y avisa a los responsables después del COMMIT", async () => {
    await cancel();

    expect(lockedTables()[0]).toContain("tbl_contracts");
    expect(lockedTables()[1]).toContain("tbl_reasons");
    const lastWrite = Math.max(...prismaMock.tbl_audit_log.createMany.mock.invocationCallOrder);
    expect(notifyWorkManagers.mock.invocationCallOrder[0]).toBeGreaterThan(lastWrite);
    expect(notifyWorkManagers.mock.calls[0][0]).toMatchObject({ title: "Contrato anulado", type: "alert" });
    expect(notifyWorkManagers.mock.calls[0][0].buildMessage({ ctr_number: "C-1" })).toBe(
      "El contrato C-1 fue anulado (estaba en ejecución). Motivo: Error de registro."
    );
  });

  it("un contrato ya anulado no se vuelve a anular (409)", async () => {
    state.contract.ctr_state = "CANCELLED";

    await expect(cancel()).rejects.toMatchObject({ statusCode: 409, message: "El contrato ya está anulado. Estado actual: Anulado." });
    expect(prismaMock.tbl_contracts.update).not.toHaveBeenCalled();
  });

  it("el motivo debe ser de anulación de contrato (400)", async () => {
    state.reason = { rea_scope: "SUSPENSION", rea_name: "Falta de material", sta_id: 1 };

    await expect(cancel()).rejects.toMatchObject({ statusCode: 400, message: "El motivo seleccionado no es de anulación de contrato." });
    expect(prismaMock.tbl_contracts.update).not.toHaveBeenCalled();
  });

  it("la observación es obligatoria (400), antes de abrir la transacción", async () => {
    await expect(cancel({ reaId: 6, observation: "  " })).rejects.toMatchObject({ statusCode: 400, message: "La observación es requerida." });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("anulado es final: no admite ningún acto", () => {
    expect(STATE_ALLOWS.CANCELLED).toEqual([]);
  });
});
