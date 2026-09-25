import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

const prismaMock = {
  tbl_users: { count: jest.fn() },
  tbl_profiles: { findUnique: jest.fn(), findFirst: jest.fn(), update: jest.fn(), create: jest.fn() },
  tbl_page_permissions: { findMany: jest.fn(), deleteMany: jest.fn(), createMany: jest.fn() },
  tbl_profile_permissions: { findMany: jest.fn(), deleteMany: jest.fn() },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({
  prisma: prismaMock,
}));

const profilesService = await import("../../../../src/modules/security/profiles/profiles.service.js");

const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);
const ctx = { useId: 9, ip: "1.1.1.1" };

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  prismaMock.tbl_users.count.mockResolvedValue(0);
  prismaMock.tbl_profiles.findFirst.mockResolvedValue(null);
});

describe("deleteProfile — columnas de eliminación y bitácora", () => {
  it("guarda quién y cuándo, y deja en la bitácora las páginas y permisos que se borran físicamente", async () => {
    prismaMock.tbl_profiles.findUnique.mockResolvedValue({ sta_id: 1 });
    prismaMock.tbl_page_permissions.findMany.mockResolvedValue([{ pag_id: 3 }, { pag_id: 4 }]);
    prismaMock.tbl_profile_permissions.findMany.mockResolvedValue([{ per_id: 1 }, { per_id: 2 }]);

    await profilesService.deleteProfile({ proId: 7, updatedBy: 9, ctx });

    expect(prismaMock.tbl_profiles.update).toHaveBeenCalledWith({
      where: { pro_id: 7 },
      data: { sta_id: 3, pro_update_by: 9, pro_delete_by: 9, pro_delete_at: expect.any(Date) },
    });

    const rows = auditRows();
    expect(rows.filter((r) => r.aud_operation === "ELIMINAR").map((r) => r.aud_field)).toEqual(["sta_id", "paginas"]);
    expect(rows.find((r) => r.aud_field === "paginas").aud_old_value).toBe("3,4");
    expect(rows.filter((r) => r.aud_operation === "REVOCAR").map((r) => r.aud_old_value)).toEqual(["1", "2"]);
    // Una sola operación: la eliminación y lo que arrastra.
    expect(new Set(rows.map((r) => r.aud_operation_id)).size).toBe(1);
    expect(rows.every((r) => r.use_id === 9 && r.aud_entity === "PERFIL" && r.aud_record_id === 7)).toBe(true);
  });

  it("no elimina un perfil con usuarios activos ni escribe en la bitácora", async () => {
    prismaMock.tbl_users.count.mockResolvedValue(2);

    await expect(profilesService.deleteProfile({ proId: 7, updatedBy: 9, ctx })).rejects.toMatchObject({ statusCode: 400 });
    expect(prismaMock.tbl_audit_log.createMany).not.toHaveBeenCalled();
  });
});

describe("saveProfile — bitácora", () => {
  it("calcula el cambio de páginas contra la BD, no contra el previousModules del cliente", async () => {
    prismaMock.tbl_profiles.findUnique.mockResolvedValue({ pro_name: "Ventas", sta_id: 1 });
    prismaMock.tbl_page_permissions.findMany.mockResolvedValue([{ pag_id: 3 }]);

    await profilesService.saveProfile({
      proId: 7,
      name: "Ventas",
      staId: 1,
      modules: [3, 4],
      previousModules: [99], // lo que el cliente cree; se ignora
      useBy: 9,
      ctx,
    });

    expect(prismaMock.tbl_page_permissions.deleteMany).not.toHaveBeenCalled();
    expect(prismaMock.tbl_page_permissions.createMany).toHaveBeenCalledWith({ data: [{ pro_id: 7, pag_id: 4 }] });
    expect(auditRows()).toEqual([
      expect.objectContaining({ aud_operation: "EDITAR", aud_field: "paginas", aud_old_value: "3", aud_new_value: "3,4" }),
    ]);
  });

  it("reactivar un perfil eliminado limpia pro_delete_by/_at", async () => {
    prismaMock.tbl_profiles.findUnique.mockResolvedValue({ pro_name: "Ventas", sta_id: 3 });
    prismaMock.tbl_page_permissions.findMany.mockResolvedValue([]);

    await profilesService.saveProfile({ proId: 7, name: "Ventas", staId: 1, modules: [], useBy: 9, ctx });

    expect(prismaMock.tbl_profiles.update.mock.calls[0][0].data).toMatchObject({ pro_delete_by: null, pro_delete_at: null });
    expect(auditRows()[0].aud_operation).toBe("REACTIVAR");
  });
});
