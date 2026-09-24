import { jest } from "@jest/globals";

const prismaMock = { tbl_audit_log: { createMany: jest.fn() } };

jest.unstable_mockModule("../../../src/common/configs/prismaClient.js", () => ({
  prisma: prismaMock,
}));

const { diffFields, writeAudit, auditContext, REDACTED } = await import(
  "../../../src/common/services/audit.service.js"
);

beforeEach(() => jest.clearAllMocks());

describe("diffFields", () => {
  it("devuelve solo los campos auditados que cambiaron", () => {
    const before = { use_name: "Ana", sta_id: 1, use_email: "a@a.com" };
    const after = { use_name: "Ana María", sta_id: 1, use_email: "a@a.com", otro: "x" };

    expect(diffFields(before, after, ["use_name", "sta_id", "use_email"])).toEqual([
      { field: "use_name", oldValue: "Ana", newValue: "Ana María" },
    ]);
  });

  it("no confunde 1 con '1' (los valores se comparan como texto)", () => {
    expect(diffFields({ sta_id: 1 }, { sta_id: "1" }, ["sta_id"])).toEqual([]);
  });

  it("ignora los campos que no vienen en la versión nueva (no se tocaron)", () => {
    expect(diffFields({ use_password: "hash" }, {}, ["use_password"])).toEqual([]);
  });

  it("un campo sensible que cambió se reporta, pero sin sus valores", () => {
    const [change] = diffFields({ use_password: "hash-viejo" }, { use_password: "hash-nuevo" }, ["use_password"]);
    expect(change).toEqual({ field: "use_password", oldValue: REDACTED, newValue: REDACTED });
  });
});

describe("writeAudit", () => {
  it("una fila por cambio, todas con el mismo operationId, autor e IP del contexto", async () => {
    const operationId = await writeAudit(prismaMock, {
      entity: "USUARIO",
      recordId: "5",
      operation: "EDITAR",
      ctx: { useId: 9, ip: "1.1.1.1" },
      changes: [
        { field: "use_name", oldValue: "a", newValue: "b" },
        { field: "paginas", oldValue: [4, 3], newValue: null },
      ],
    });

    const rows = prismaMock.tbl_audit_log.createMany.mock.calls[0][0].data;
    expect(rows).toHaveLength(2);
    expect(rows.every((r) => r.aud_operation_id === operationId)).toBe(true);
    expect(rows[0]).toMatchObject({
      aud_entity: "USUARIO",
      aud_record_id: 5,
      aud_operation: "EDITAR",
      use_id: 9,
      aud_ip: "1.1.1.1",
      aud_field: "use_name",
      aud_old_value: "a",
      aud_new_value: "b",
    });
    // Arreglos → lista ordenada; null se conserva como null.
    expect(rows[1]).toMatchObject({ aud_old_value: "3,4", aud_new_value: null });
  });

  it("sin cambios escribe una sola fila de evento (sin campo)", async () => {
    await writeAudit(prismaMock, { entity: "USUARIO", recordId: 1, operation: "LOGOUT", ctx: { useId: 1 } });

    expect(prismaMock.tbl_audit_log.createMany.mock.calls[0][0].data).toEqual([
      expect.objectContaining({ aud_operation: "LOGOUT", aud_field: null, aud_old_value: null, aud_new_value: null }),
    ]);
  });

  it("oculta un campo sensible aunque el service lo pase en claro por error", async () => {
    await writeAudit(prismaMock, {
      entity: "USUARIO",
      recordId: 1,
      operation: "EDITAR",
      changes: [{ field: "use_password", oldValue: "secreto1", newValue: "secreto2" }],
    });

    const [row] = prismaMock.tbl_audit_log.createMany.mock.calls[0][0].data;
    expect(row.aud_old_value).toBe(REDACTED);
    expect(row.aud_new_value).toBe(REDACTED);
  });

  it("reutiliza el operationId recibido para agrupar varias escrituras de una operación", async () => {
    const id = await writeAudit(prismaMock, { operationId: "op-1", entity: "PERFIL", operation: "ELIMINAR" });
    expect(id).toBe("op-1");
  });
});

describe("auditContext", () => {
  it("toma el autor de req.user, nunca del body", () => {
    expect(auditContext({ user: { useId: 3 }, body: { useId: 99 }, ip: "1.1.1.1" })).toEqual({ useId: 3, ip: "1.1.1.1" });
  });

  it("sin sesión el autor es null", () => {
    expect(auditContext({ ip: "1.1.1.1" })).toEqual({ useId: null, ip: "1.1.1.1" });
  });
});
