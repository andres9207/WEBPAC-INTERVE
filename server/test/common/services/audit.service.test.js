import { jest } from "@jest/globals";

const prismaMock = { tbl_audit_log: { createMany: jest.fn() } };
// El `tx` de prisma.$transaction: otro objeto, distinto del cliente global.
const txMock = { tbl_audit_log: { createMany: jest.fn() } };

jest.unstable_mockModule("../../../src/common/configs/prismaClient.js", () => ({
  prisma: prismaMock,
}));

const { diffFields, writeAudit, writeAuditEvent, auditContext, REDACTED } = await import(
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
    const operationId = await writeAudit(txMock, {
      entity: "USUARIO",
      recordId: "5",
      operation: "EDITAR",
      ctx: { useId: 9, ip: "1.1.1.1" },
      changes: [
        { field: "use_name", oldValue: "a", newValue: "b" },
        { field: "paginas", oldValue: [4, 3], newValue: null },
      ],
    });

    const rows = txMock.tbl_audit_log.createMany.mock.calls[0][0].data;
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
    await writeAudit(txMock, { entity: "USUARIO", recordId: 1, operation: "LOGOUT", ctx: { useId: 1 } });

    expect(txMock.tbl_audit_log.createMany.mock.calls[0][0].data).toEqual([
      expect.objectContaining({ aud_operation: "LOGOUT", aud_field: null, aud_old_value: null, aud_new_value: null }),
    ]);
  });

  it("oculta un campo sensible aunque el service lo pase en claro por error", async () => {
    await writeAudit(txMock, {
      entity: "USUARIO",
      recordId: 1,
      operation: "EDITAR",
      changes: [{ field: "use_password", oldValue: "secreto1", newValue: "secreto2" }],
    });

    const [row] = txMock.tbl_audit_log.createMany.mock.calls[0][0].data;
    expect(row.aud_old_value).toBe(REDACTED);
    expect(row.aud_new_value).toBe(REDACTED);
  });

  it("reutiliza el operationId recibido para agrupar varias escrituras de una operación", async () => {
    const id = await writeAudit(txMock, { operationId: "op-1", entity: "PERFIL", operation: "ELIMINAR" });
    expect(id).toBe("op-1");
  });

  it("rechaza escribir fuera de una transacción (sin tx o con el cliente global)", async () => {
    const audit = { entity: "USUARIO", recordId: 1, operation: "EDITAR" };

    await expect(writeAudit(undefined, audit)).rejects.toThrow(/tx de prisma.\$transaction/);
    await expect(writeAudit(prismaMock, audit)).rejects.toThrow(/tx de prisma.\$transaction/);
    expect(prismaMock.tbl_audit_log.createMany).not.toHaveBeenCalled();
  });

  it("rechaza entidades y operaciones que no están en las constantes (un typo no llega a la bitácora)", async () => {
    await expect(writeAudit(txMock, { entity: "USUARIOS", operation: "EDITAR" })).rejects.toThrow(/entidad desconocida/);
    await expect(writeAudit(txMock, { entity: "USUARIO", operation: "EDITRA" })).rejects.toThrow(/operación desconocida/);
    expect(txMock.tbl_audit_log.createMany).not.toHaveBeenCalled();
  });
});

describe("writeAuditEvent", () => {
  it("registra un evento de autenticación sin cambio de datos con el cliente global", async () => {
    await writeAuditEvent({ entity: "USUARIO", operation: "LOGIN_FALLIDO", ctx: { useId: null, ip: "1.1.1.1" } });

    expect(prismaMock.tbl_audit_log.createMany.mock.calls[0][0].data).toEqual([
      expect.objectContaining({ aud_operation: "LOGIN_FALLIDO", use_id: null, aud_ip: "1.1.1.1" }),
    ]);
  });

  it("no sirve de atajo para operaciones que cambian datos", async () => {
    await expect(writeAuditEvent({ entity: "USUARIO", recordId: 1, operation: "EDITAR" })).rejects.toThrow(
      /usa writeAudit dentro de la transacción/
    );
    expect(prismaMock.tbl_audit_log.createMany).not.toHaveBeenCalled();
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
