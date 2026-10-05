import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

const prismaMock = {
  tbl_users: {
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    groupBy: jest.fn(),
  },
  tbl_user_pages: { findMany: jest.fn(), deleteMany: jest.fn(), createMany: jest.fn() },
  tbl_profiles: { findUnique: jest.fn() },
  tbl_identity_documents: { findUnique: jest.fn() },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({
  prisma: prismaMock,
}));

jest.unstable_mockModule("../../../../src/common/utils/funciones.js", () => ({
  hashPassword: jest.fn().mockResolvedValue("hashed:pw"),
}));

const usersService = await import("../../../../src/modules/security/users/users.service.js");

const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);
const ctx = { useId: 9, ip: "1.1.1.1" };
const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  prismaMock.tbl_users.findFirst.mockResolvedValue(null);
  prismaMock.tbl_user_pages.findMany.mockResolvedValue([]);
  prismaMock.tbl_profiles.findUnique.mockResolvedValue({ sta_id: 1 });
  prismaMock.tbl_identity_documents.findUnique.mockResolvedValue({ idd_code: "CC", idd_name: "Cédula de ciudadanía", sta_id: 1 });
  // Sin creación previa con la clave de idempotencia (ver idempotency.service).
  prismaMock.tbl_users.findUnique.mockResolvedValue(null);
});

const baseUser = {
  use_name: "Ana",
  use_last_name: "Paz",
  use_identification: "1234567",
  idd_id: 1,
  use_user: "ana",
  use_email: "ana@a.com",
  use_password: "hash-viejo",
  pro_id: 2,
  sta_id: 1,
  use_access: 1,
  use_change_password: 0,
};

const editPayload = {
  useId: 5,
  proId: 2,
  name: "Ana",
  lastName: "Paz",
  identification: "1234567",
  iddId: 1,
  username: "ana",
  email: "ana@a.com",
  access: 1,
  staId: 1,
  useBy: 9,
  changePassword: 0,
  usePages: "",
  ctx,
};

describe("deleteUser — columnas de eliminación y bitácora", () => {
  it("marca sta_id = 3 y guarda quién y cuándo en use_delete_by/_at, y lo registra en la bitácora", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue({ sta_id: 1 });

    await usersService.deleteUser({ useId: 5, updatedBy: 9, ctx });

    expect(prismaMock.tbl_users.update).toHaveBeenCalledWith({
      where: { use_id: 5 },
      data: { sta_id: 3, use_update_by: 9, use_delete_by: 9, use_delete_at: expect.any(Date) },
    });
    expect(auditRows()).toEqual([
      expect.objectContaining({ aud_operation: "ELIMINAR", aud_record_id: 5, use_id: 9, aud_old_value: "1", aud_new_value: "3" }),
    ]);
  });

  it("no vuelve a eliminar un usuario ya eliminado (no pisa la evidencia original)", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue({ sta_id: 3 });

    await expect(usersService.deleteUser({ useId: 5, updatedBy: 9, ctx })).rejects.toMatchObject({ status: 404 });
    expect(prismaMock.tbl_users.update).not.toHaveBeenCalled();
  });
});

describe("saveUser — bitácora", () => {
  it("al editar, audita solo los campos que cambiaron y oculta la contraseña", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue(baseUser);

    await usersService.saveUser({ ...editPayload, name: "Ana María", password: "nueva12345" });

    const rows = auditRows();
    expect(rows.map((r) => r.aud_field).sort()).toEqual(["use_name", "use_password"]);
    const pw = rows.find((r) => r.aud_field === "use_password");
    expect(pw).toMatchObject({ aud_old_value: "[oculto]", aud_new_value: "[oculto]" });
    expect(JSON.stringify(rows)).not.toMatch(/hash|nueva12345/);
    expect(rows.every((r) => r.aud_operation === "EDITAR" && r.use_id === 9)).toBe(true);
  });

  it("si no cambió nada, no escribe en la bitácora", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue(baseUser);

    await usersService.saveUser(editPayload);

    expect(prismaMock.tbl_audit_log.createMany).not.toHaveBeenCalled();
  });

  it("reactivar un usuario eliminado limpia use_delete_by/_at y se registra como REACTIVAR", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue({ ...baseUser, sta_id: 3 });

    await usersService.saveUser(editPayload);

    expect(prismaMock.tbl_users.update.mock.calls[0][0].data).toMatchObject({ use_delete_by: null, use_delete_at: null });
    expect(auditRows()).toEqual([expect.objectContaining({ aud_operation: "REACTIVAR", aud_field: "sta_id" })]);
  });

  it("al crear, registra CREAR con los valores iniciales (sin la contraseña)", async () => {
    prismaMock.tbl_users.create.mockResolvedValue({ use_id: 40 });

    await usersService.saveUser({ ...editPayload, useId: 0, password: "clave12345", usePages: "3,4", idempotencyKey: KEY });

    const rows = auditRows();
    expect(rows.every((r) => r.aud_operation === "CREAR" && r.aud_record_id === 40)).toBe(true);
    expect(rows.find((r) => r.aud_field === "paginas").aud_new_value).toBe("3,4");
    expect(rows.find((r) => r.aud_field === "use_password").aud_new_value).toBe("[oculto]");
    expect(new Set(rows.map((r) => r.aud_operation_id)).size).toBe(1);
  });
});

describe("saveUser — contraseña propia (ADR-0001, regla 11)", () => {
  it("rechaza que el autor cambie su propia contraseña desde la edición, sin tocar la BD", async () => {
    await expect(usersService.saveUser({ ...editPayload, useId: 9, useBy: 9, password: "otra12345" })).rejects.toMatchObject({
      statusCode: 400,
      message: expect.stringContaining("Cambiar contraseña"),
    });
    expect(prismaMock.tbl_users.update).not.toHaveBeenCalled();
    expect(prismaMock.tbl_audit_log.createMany).not.toHaveBeenCalled();
  });

  it("editarse a sí mismo sin contraseña sigue permitido", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue({ ...baseUser, use_id: 9 });

    await usersService.saveUser({ ...editPayload, useId: 9, useBy: 9, name: "Ana María", password: null });

    expect(prismaMock.tbl_users.update).toHaveBeenCalled();
  });

  it("un administrador sí cambia la contraseña de otro usuario", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue(baseUser);

    await usersService.saveUser({ ...editPayload, password: "nueva12345" });

    expect(auditRows().map((r) => r.aud_field)).toContain("use_password");
  });
});

describe("saveUser — protocolo de bloqueo (ADR-0027)", () => {
  const lockedTables = () =>
    prismaMock.$queryRaw.mock.calls.map(([strings, ...values]) => {
      const sql = strings.join("?") + values.map((v) => v?.strings?.join("") ?? "").join(" ");
      if (/tbl_profiles/.test(sql)) return "PERFIL";
      if (/tbl_identity_documents/.test(sql)) return "TIPO_IDENTIFICACION";
      return /tbl_users/.test(sql) ? "USUARIO" : "?";
    });

  it("al editar bloquea el perfil, el usuario y el tipo de identificación, en ese orden y antes de leer nada", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue(baseUser);

    await usersService.saveUser({ ...editPayload, name: "Ana María" });

    expect(lockedTables()).toEqual(["PERFIL", "USUARIO", "TIPO_IDENTIFICACION"]);
    const firstLock = prismaMock.$queryRaw.mock.invocationCallOrder[0];
    expect(prismaMock.tbl_users.findUnique.mock.invocationCallOrder[0]).toBeGreaterThan(firstLock);
    expect(prismaMock.tbl_profiles.findUnique.mock.invocationCallOrder[0]).toBeGreaterThan(firstLock);
  });

  it("rechaza asignar un perfil eliminado (verificado con el perfil bloqueado) y no escribe nada", async () => {
    prismaMock.tbl_profiles.findUnique.mockResolvedValue({ sta_id: 3 });

    await expect(usersService.saveUser({ ...editPayload, useId: 0, idempotencyKey: KEY })).rejects.toMatchObject({ status: 400 });
    expect(prismaMock.tbl_users.create).not.toHaveBeenCalled();
    expect(auditRows()).toEqual([]);
  });
});

describe("saveUser — tipo de identificación (ADR-0008)", () => {
  const createPayload = { ...editPayload, useId: 0, idempotencyKey: KEY };

  it("sin número no guarda tipo ni bloquea el maestro, aunque llegue un iddId", async () => {
    prismaMock.tbl_users.create.mockResolvedValue({ use_id: 40 });

    await usersService.saveUser({ ...createPayload, identification: "", iddId: 3 });

    expect(prismaMock.tbl_users.create.mock.calls[0][0].data).toMatchObject({ use_identification: null, idd_id: null });
    expect(prismaMock.tbl_identity_documents.findUnique).not.toHaveBeenCalled();
  });

  it("rechaza un número sin tipo antes de abrir la transacción", async () => {
    await expect(usersService.saveUser({ ...createPayload, iddId: null })).rejects.toMatchObject({ status: 400 });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("no asigna un tipo inactivo a un usuario nuevo", async () => {
    prismaMock.tbl_identity_documents.findUnique.mockResolvedValue({ sta_id: 2 });

    await expect(usersService.saveUser(createPayload)).rejects.toMatchObject({
      statusCode: 400,
      message: "El tipo de identificación seleccionado está inactivo.",
    });
    expect(prismaMock.tbl_users.create).not.toHaveBeenCalled();
  });

  it("no asigna un tipo eliminado", async () => {
    prismaMock.tbl_identity_documents.findUnique.mockResolvedValue({ sta_id: 3 });

    await expect(usersService.saveUser(createPayload)).rejects.toMatchObject({ statusCode: 400 });
    expect(prismaMock.tbl_users.create).not.toHaveBeenCalled();
  });

  it("al editar conserva el tipo que el usuario ya tenía aunque se haya desactivado", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue(baseUser); // idd_id: 1
    prismaMock.tbl_identity_documents.findUnique.mockResolvedValue({ sta_id: 2 });

    await usersService.saveUser({ ...editPayload, name: "Ana María" });

    expect(prismaMock.tbl_users.update.mock.calls[0][0].data).toMatchObject({ idd_id: 1 });
  });

  it("al editar no cambia a otro tipo inactivo", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue(baseUser); // idd_id: 1
    prismaMock.tbl_identity_documents.findUnique.mockResolvedValue({ sta_id: 2 });

    await expect(usersService.saveUser({ ...editPayload, iddId: 3 })).rejects.toMatchObject({ statusCode: 400 });
    expect(prismaMock.tbl_users.update).not.toHaveBeenCalled();
  });

  it("el cambio de tipo queda en la bitácora", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue(baseUser);

    await usersService.saveUser({ ...editPayload, iddId: 3 });

    expect(auditRows()).toEqual([
      expect.objectContaining({ aud_operation: "EDITAR", aud_field: "idd_id", aud_old_value: "1", aud_new_value: "3" }),
    ]);
  });

  it("el duplicado se busca por el par (tipo, número), no por el número solo", async () => {
    prismaMock.tbl_users.create.mockResolvedValue({ use_id: 40 });

    await usersService.saveUser(createPayload);

    const { OR } = prismaMock.tbl_users.findFirst.mock.calls[0][0].where;
    expect(OR).toContainEqual({ use_identification: "1234567", idd_id: 1 });
  });
});

describe("saveUser — formato del número según el tipo (ADR-0008, decisión 5)", () => {
  const createPayload = { ...editPayload, useId: 0, idempotencyKey: KEY };
  const NIT = { idd_code: "NIT", idd_name: "NIT", sta_id: 1 };

  it("al crear rechaza un número con formato inválido para el tipo, sin escribir", async () => {
    await expect(usersService.saveUser({ ...createPayload, identification: "12AB" })).rejects.toMatchObject({
      statusCode: 400,
      message: expect.stringMatching(/^Número de identificación inválido para Cédula de ciudadanía: /),
    });
    expect(prismaMock.tbl_users.create).not.toHaveBeenCalled();
  });

  it("al editar aplica la misma regla", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue(baseUser);
    prismaMock.tbl_identity_documents.findUnique.mockResolvedValue(NIT);

    await expect(usersService.saveUser({ ...editPayload, iddId: 3, identification: "800197268-5" })).rejects.toMatchObject({
      statusCode: 400,
      message: "Número de identificación inválido para NIT: el dígito de verificación no corresponde al NIT.",
    });
    expect(prismaMock.tbl_users.update).not.toHaveBeenCalled();
  });

  it("un NIT con dígito de verificación correcto se guarda sin espacios de borde", async () => {
    prismaMock.tbl_identity_documents.findUnique.mockResolvedValue(NIT);
    prismaMock.tbl_users.create.mockResolvedValue({ use_id: 40 });

    await usersService.saveUser({ ...createPayload, iddId: 3, identification: " 800197268-4 " });

    expect(prismaMock.tbl_users.create.mock.calls[0][0].data).toMatchObject({ use_identification: "800197268-4", idd_id: 3 });
  });
});

describe("saveUser — idempotencia de la creación (ADR-0027, decisión 7)", () => {
  const createPayload = { ...editPayload, useId: 0, idempotencyKey: KEY };

  it("guarda la clave y la huella del contenido en la fila creada", async () => {
    prismaMock.tbl_users.create.mockResolvedValue({ use_id: 42 });

    await expect(usersService.saveUser(createPayload)).resolves.toEqual({
      message: "Usuario Creado Correctamente",
      useId: 42,
    });

    const { data } = prismaMock.tbl_users.create.mock.calls[0][0];
    expect(data.use_idempotency_key).toBe(KEY);
    expect(data.use_idempotency_hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("un reintento con la misma clave devuelve el usuario ya creado, sin el control de duplicados ni otra creación", async () => {
    prismaMock.tbl_users.create.mockResolvedValue({ use_id: 42 });
    await usersService.saveUser(createPayload);
    const { use_idempotency_hash: hash } = prismaMock.tbl_users.create.mock.calls[0][0].data;
    jest.clearAllMocks();
    // La primera creación ya existe: el control de duplicados diría "ya existe".
    prismaMock.tbl_users.findFirst.mockResolvedValue({ use_id: 42 });
    prismaMock.tbl_users.findUnique.mockResolvedValue({ use_id: 42, use_idempotency_hash: hash, use_create_by: 9 });

    await expect(usersService.saveUser(createPayload)).resolves.toEqual({
      message: "Usuario Creado Correctamente",
      useId: 42,
    });
    expect(prismaMock.tbl_users.create).not.toHaveBeenCalled();
    expect(auditRows()).toEqual([]);
  });

  it("la misma clave con otro contenido se rechaza con 422", async () => {
    prismaMock.tbl_users.findUnique.mockResolvedValue({ use_id: 42, use_idempotency_hash: "x".repeat(64), use_create_by: 9 });

    await expect(usersService.saveUser({ ...createPayload, name: "Otra" })).rejects.toMatchObject({ statusCode: 422 });
    expect(prismaMock.tbl_users.create).not.toHaveBeenCalled();
  });
});

describe("paginationUsers — filtros parametrizados y visibilidad (FND-BE-30)", () => {
  beforeEach(() => {
    prismaMock.tbl_users.findMany.mockResolvedValue([]);
    prismaMock.tbl_users.count.mockResolvedValue(0);
    prismaMock.tbl_users.groupBy.mockResolvedValue([]);
  });

  const listArgs = () => prismaMock.tbl_users.findMany.mock.calls[0][0];

  it("no oculta usuarios por el estado del perfil: solo descarta el perfil eliminado", async () => {
    await usersService.paginationUsers({ rows: 10, first: 0 });

    expect(listArgs().where.tbl_profiles).toEqual({ sta_id: { not: 3 } });
    // Los conteos de las pestañas usan la misma base.
    expect(prismaMock.tbl_users.groupBy.mock.calls[0][0].where.tbl_profiles).toEqual({ sta_id: { not: 3 } });
  });

  it("informa si el perfil del usuario está activo", async () => {
    prismaMock.tbl_users.findMany.mockResolvedValue([
      { use_id: 1, pro_id: 2, tbl_profiles: { pro_name: "Vigente", sta_id: 1 }, tbl_user_pages: [] },
      { use_id: 2, pro_id: 4, tbl_profiles: { pro_name: "Retirado", sta_id: 2 }, tbl_user_pages: [] },
    ]);
    prismaMock.tbl_users.count.mockResolvedValue(2);

    const { results } = await usersService.paginationUsers({ rows: 10, first: 0 });

    expect(results.map((u) => [u.profileName, u.profileActive])).toEqual([
      ["Vigente", true],
      ["Retirado", false],
    ]);
  });

  it("un campo de orden fuera de la lista cae al orden por nombre", async () => {
    await usersService.paginationUsers({ rows: 10, first: 0, sortField: "1); DROP TABLE tbl_users; --", sortOrder: 1 });

    expect(listArgs().orderBy).toEqual({ use_name: "asc" });
  });

  it("el texto de búsqueda llega como valor del filtro, nunca como SQL", async () => {
    const injection = "x' OR '1'='1";
    await usersService.paginationUsers({ rows: 10, first: 0, name: injection });

    expect(listArgs().where.use_name).toEqual({ contains: injection });
  });
});
