import { jest } from "@jest/globals";

// Evidencia de una factura (PRO-BE-39): reconstruye desde la bitácora sus
// operaciones y la instantánea de composición y saldos de su aprobación.

const state = { invoice: null, visible: true, own: [], rows: [] };
const prismaMock = {
  tbl_invoices: {
    // Con `AND` es la verificación de alcance y vista; sin él, la lectura de la factura.
    findFirst: jest.fn(async ({ where }) => (where.AND ? (state.visible ? { inv_id: 70 } : null) : state.invoice)),
  },
  tbl_audit_log: {
    findMany: jest.fn(async ({ distinct }) => (distinct ? state.own : state.rows)),
  },
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { getInvoiceEvidence } = await import("../../../../src/modules/billing/invoices/invoiceEvidence.service.js");

const REGISTER = "11111111-1111-4111-8111-111111111111";
const APPROVE = "22222222-2222-4222-8222-222222222222";
const user = { use_name: "Ana", use_last_name: "Ruiz" };
let seq = 0;
const row = (operationId, operation, field, oldValue, newValue, { entity = "FACTURA", at = "2026-03-05T10:00:00.000Z" } = {}) => ({
  aud_id: BigInt((seq += 1)),
  aud_operation_id: operationId,
  aud_entity: entity,
  aud_record_id: 70,
  aud_field: field,
  aud_old_value: oldValue,
  aud_new_value: newValue,
  aud_operation: operation,
  aud_create_at: new Date(at),
  tbl_users: user,
});

beforeEach(() => {
  jest.clearAllMocks();
  seq = 0;
  state.visible = true;
  state.invoice = { inv_id: 70, inv_type: "ADVANCE", inv_number: "F-100", inv_state: "APPROVED", ctr_id: 30, tbl_contracts: { ctr_number: "C-30" } };
  state.own = [{ aud_operation_id: REGISTER }, { aud_operation_id: APPROVE }];
  state.rows = [
    row(REGISTER, "CREAR", "inv_number", null, "F-100", { at: "2026-03-01T09:00:00.000Z" }),
    row(APPROVE, "EDITAR", "inv_state", "REGISTERED", "APPROVED"),
    row(APPROVE, "EDITAR", "advance_invoiced", "0.00", "10000000.00"),
    row(APPROVE, "EDITAR", "snapshot.invoice.value", null, "10000000.00"),
    row(APPROVE, "EDITAR", "snapshot.advance.invoiced", "0.00", "10000000.00"),
    row(APPROVE, "EDITAR", "snapshot.advance.toAmortize", "0.00", "10000000.00"),
    row(APPROVE, "EDITAR", "snapshot.retention.balance", "0.00", "0.00"),
  ];
});

describe("getInvoiceEvidence", () => {
  it("agrupa la bitácora por operación y reconstruye la instantánea de la aprobación", async () => {
    const evidence = await getInvoiceEvidence({ invId: 70 });

    expect(evidence).toMatchObject({ invId: 70, number: "F-100", type: "ADVANCE", state: "APPROVED", contractNumber: "C-30" });
    expect(evidence.operations.map((op) => [op.operationId, op.operation, op.changes.length])).toEqual([
      [REGISTER, "CREAR", 1],
      [APPROVE, "EDITAR", 6],
    ]);
    expect(evidence.operations[1]).toMatchObject({ userName: "Ana Ruiz" });
    expect(evidence.approval).toMatchObject({
      operationId: APPROVE,
      userName: "Ana Ruiz",
      snapshot: {
        amounts: { value: "10000000.00" },
        balances: {
          advance: { invoiced: { before: "0.00", after: "10000000.00" }, toAmortize: { before: "0.00", after: "10000000.00" } },
          retention: { balance: { before: "0.00", after: "0.00" } },
        },
      },
    });
  });

  it("lee las filas de la factura y, de sus operaciones, las de todas las entidades, en orden", async () => {
    await getInvoiceEvidence({ invId: 70 });
    const [ownQuery, rowsQuery] = prismaMock.tbl_audit_log.findMany.mock.calls.map((c) => c[0]);
    expect(ownQuery.where).toEqual({ aud_entity: "FACTURA", aud_record_id: 70 });
    expect(rowsQuery.where).toEqual({ aud_operation_id: { in: [REGISTER, APPROVE] } });
    expect(rowsQuery.orderBy).toEqual([{ aud_create_at: "asc" }, { aud_id: "asc" }]);
  });

  it("una aprobación anterior a la instantánea devuelve snapshot null y conserva sus cambios", async () => {
    state.rows = state.rows.filter((r) => !r.aud_field.startsWith("snapshot."));
    const evidence = await getInvoiceEvidence({ invId: 70 });
    expect(evidence.approval).toMatchObject({ operationId: APPROVE, snapshot: null });
    expect(evidence.operations[1].changes.map((c) => c.field)).toEqual(["inv_state", "advance_invoiced"]);
  });

  it("sin aprobación, approval es null; sin bitácora, no hay operaciones", async () => {
    state.rows = state.rows.filter((r) => r.aud_operation_id === REGISTER);
    await expect(getInvoiceEvidence({ invId: 70 })).resolves.toMatchObject({ approval: null });

    state.own = [];
    await expect(getInvoiceEvidence({ invId: 70 })).resolves.toMatchObject({ approval: null, operations: [] });
  });

  it("fuera del alcance o de las vistas del usuario, o inexistente, responde 404", async () => {
    state.visible = false;
    await expect(getInvoiceEvidence({ invId: 70, views: new Set(["MAJOR"]) })).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.tbl_audit_log.findMany).not.toHaveBeenCalled();

    state.visible = true;
    state.invoice = null;
    await expect(getInvoiceEvidence({ invId: 70 })).rejects.toMatchObject({ statusCode: 404, message: "No se encontró la factura." });
  });
});
