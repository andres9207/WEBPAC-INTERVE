import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";
import { CONTRACT_FIELDS_CATALOG, fieldId, typeFieldRows } from "../../../helpers/contractFields.fixtures.js";

// Configuración de los campos del contrato por tipo de proveedor (DEC-053):
// guardado por diferencial en una transacción, versión, historial de
// versiones y bitácora con valor anterior y nuevo; y la resolución para un
// proveedor, con la unión de sus tipos.

const state = { type: null, rows: [], classifications: [] };

const prismaMock = {
  tbl_provider_types: { findUnique: jest.fn(async () => state.type), update: jest.fn() },
  tbl_provider_classifications: { findMany: jest.fn(async () => state.classifications) },
  tbl_contract_fields: { findMany: jest.fn(async () => CONTRACT_FIELDS_CATALOG) },
  tbl_provider_type_fields: {
    findMany: jest.fn(async () => state.rows),
    createMany: jest.fn(),
    update: jest.fn(),
    deleteMany: jest.fn(),
  },
  tbl_provider_type_field_versions: { createMany: jest.fn() },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const service = await import("../../../../src/modules/admin/providerTypes/providerTypeFields.service.js");

const ctx = { useId: 9, ip: "1.1.1.1" };
const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);
const lockedTables = () => prismaMock.$queryRaw.mock.calls.map((call) => call.slice(1).map((v) => v?.strings?.join("") ?? "").join(" "));

/** Lo que manda el editor: todos los campos del catálogo, como están hoy, con `overrides` por clave. */
const editorFields = (overrides = {}) =>
  CONTRACT_FIELDS_CATALOG.map((f) => ({
    cfdId: f.cfd_id,
    applies: true,
    visible: true,
    required: f.cfd_key === "STAGE",
    order: f.cfd_order,
    ...overrides[f.cfd_key],
  }));

beforeEach(() => {
  jest.clearAllMocks();
  state.type = { pvt_id: 2, pvt_name: "Subcontratista", pvt_config_version: 3, sta_id: 1 };
  state.rows = typeFieldRows();
  state.classifications = [{ pvt_id: 2 }];
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
});

describe("getProviderTypeFields", () => {
  it("devuelve el tipo, su versión y todos los campos del catálogo resueltos", async () => {
    state.rows = typeFieldRows({ VAT_PCT: { ptf_applies: null } });
    const result = await service.getProviderTypeFields({ pvtId: 2 });

    expect(result).toMatchObject({ pvtId: 2, name: "Subcontratista", configVersion: 3 });
    expect(result.fields).toHaveLength(9);
    expect(result.fields.find((f) => f.key === "VAT_PCT")).toMatchObject({ applies: false, visible: false });
    expect(prismaMock.tbl_provider_type_fields.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { pvt_id: { in: [2] } } }));
  });

  it("404 si el tipo no existe o está eliminado", async () => {
    state.type = { ...state.type, sta_id: 3 };
    await expect(service.getProviderTypeFields({ pvtId: 2 })).rejects.toMatchObject({ statusCode: 404 });
  });
});

describe("resolveProviderFields", () => {
  it("lee la configuración de todos los tipos del proveedor y resuelve su unión", async () => {
    state.classifications = [{ pvt_id: 1 }, { pvt_id: 3 }];
    // Tipo 1: solo IVA, visible. Tipo 3: IVA obligatorio y la etapa oculta.
    state.rows = [
      { cfd_id: fieldId("VAT_PCT"), ptf_applies: true, ptf_visible: true, ptf_required: false, ptf_order: 4 },
      { cfd_id: fieldId("VAT_PCT"), ptf_applies: true, ptf_visible: true, ptf_required: true, ptf_order: 2 },
      { cfd_id: fieldId("STAGE"), ptf_applies: true, ptf_visible: false, ptf_required: false, ptf_order: 1 },
    ];

    const fields = await service.resolveProviderFields(prismaMock, 40);

    expect(prismaMock.tbl_provider_classifications.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { prv_id: 40 } }));
    expect(prismaMock.tbl_provider_type_fields.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { pvt_id: { in: [1, 3] } } }));
    expect(fields.find((f) => f.key === "VAT_PCT")).toMatchObject({ applies: true, visible: true, required: true, order: 2 });
    expect(fields.find((f) => f.key === "STAGE")).toMatchObject({ applies: true, visible: false, required: false });
    // Ordenados por grupo (CONCEPT antes que CONTRACT) y orden.
    expect(fields.filter((f) => f.applies).map((f) => f.key)).toEqual(["VAT_PCT", "STAGE"]);
  });

  it("un proveedor sin tipos no aplica ningún campo, sin consultar la configuración", async () => {
    state.classifications = [];
    const fields = await service.resolveProviderFields(prismaMock, 40);

    expect(prismaMock.tbl_provider_type_fields.findMany).not.toHaveBeenCalled();
    expect(fields).toHaveLength(9);
    expect(fields.every((f) => !f.applies)).toBe(true);
  });
});

describe("saveProviderTypeFields", () => {
  it("aplica el diferencial (alta, cambio, baja), sube la versión, copia la configuración al historial y audita cada campo", async () => {
    state.rows = typeFieldRows({ RETENTION_PCT: { ptf_applies: null } });
    const fields = editorFields({
      RETENTION_PCT: { applies: true, visible: false, required: false }, // alta
      VAT_PCT: { required: true }, // cambio
      OBSERVATION: { applies: false, visible: false, required: false }, // baja
    });

    await expect(service.saveProviderTypeFields({ pvtId: 2, fields, useBy: 9, ctx })).resolves.toMatchObject({ configVersion: 4, changed: true });

    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_provider_types/)]);
    expect(prismaMock.tbl_provider_type_fields.deleteMany).toHaveBeenCalledWith({ where: { pvt_id: 2, cfd_id: { in: [fieldId("OBSERVATION")] } } });
    expect(prismaMock.tbl_provider_type_fields.createMany.mock.calls[0][0].data).toEqual([
      expect.objectContaining({ pvt_id: 2, cfd_id: fieldId("RETENTION_PCT"), ptf_applies: true, ptf_visible: false, ptf_required: false, ptf_create_by: 9 }),
    ]);
    expect(prismaMock.tbl_provider_type_fields.update).toHaveBeenCalledTimes(1);
    expect(prismaMock.tbl_provider_type_fields.update.mock.calls[0][0]).toMatchObject({
      where: { pvt_id_cfd_id: { pvt_id: 2, cfd_id: fieldId("VAT_PCT") } },
      data: { ptf_required: true, ptf_update_by: 9 },
    });
    expect(prismaMock.tbl_provider_types.update).toHaveBeenCalledWith({ where: { pvt_id: 2 }, data: { pvt_config_version: 4, pvt_update_by: 9 } });

    const snapshot = prismaMock.tbl_provider_type_field_versions.createMany.mock.calls[0][0].data;
    expect(snapshot).toHaveLength(8); // todo menos las observaciones, que ya no aplican
    expect(snapshot.every((r) => r.pvt_id === 2 && r.pfv_version === 4)).toBe(true);

    expect(auditRows()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ aud_entity: "TIPO_PROVEEDOR", aud_record_id: 2, aud_field: "campo:VAT_PCT", aud_old_value: "aplica, visible, orden 5", aud_new_value: "aplica, visible, obligatorio, orden 5" }),
        expect.objectContaining({ aud_field: "campo:OBSERVATION", aud_new_value: "no aplica" }),
        expect.objectContaining({ aud_field: "campo:RETENTION_PCT", aud_old_value: "no aplica", aud_new_value: "aplica, oculto, orden 7" }),
        expect.objectContaining({ aud_field: "pvt_config_version", aud_old_value: "3", aud_new_value: "4" }),
      ])
    );
    expect(auditRows()).toHaveLength(4);
  });

  it("sin cambios no escribe nada ni sube la versión (reintentable)", async () => {
    await expect(service.saveProviderTypeFields({ pvtId: 2, fields: editorFields(), useBy: 9, ctx })).resolves.toMatchObject({
      configVersion: 3,
      changed: false,
    });
    expect(prismaMock.tbl_provider_types.update).not.toHaveBeenCalled();
    expect(prismaMock.tbl_provider_type_field_versions.createMany).not.toHaveBeenCalled();
    expect(prismaMock.tbl_audit_log.createMany).not.toHaveBeenCalled();
  });

  it("un campo ausente del pedido no aplica: se borra su fila", async () => {
    const fields = editorFields().filter((f) => f.cfdId !== fieldId("ADVANCE_PCT"));
    await service.saveProviderTypeFields({ pvtId: 2, fields, useBy: 9, ctx });
    expect(prismaMock.tbl_provider_type_fields.deleteMany).toHaveBeenCalledWith({ where: { pvt_id: 2, cfd_id: { in: [fieldId("ADVANCE_PCT")] } } });
  });

  it.each([
    ["visible sin aplicar", { VAT_PCT: { applies: false, visible: true, required: false } }, /no aplica no puede ser visible/],
    ["obligatorio oculto", { VAT_PCT: { applies: true, visible: false, required: true } }, /debe aplicar y ser visible/],
  ])("rechaza la jerarquía rota: %s", async (_name, overrides, message) => {
    await expect(service.saveProviderTypeFields({ pvtId: 2, fields: editorFields(overrides), useBy: 9, ctx })).rejects.toMatchObject({
      statusCode: 400,
      message: expect.stringMatching(message),
    });
    expect(prismaMock.tbl_provider_type_fields.createMany).not.toHaveBeenCalled();
  });

  it("rechaza un campo que no es del catálogo y uno repetido", async () => {
    await expect(
      service.saveProviderTypeFields({ pvtId: 2, fields: [{ cfdId: 99, applies: true, visible: true, required: false, order: 1 }], useBy: 9, ctx })
    ).rejects.toMatchObject({ statusCode: 400, message: expect.stringMatching(/no existe en el catálogo/) });

    const repeated = editorFields();
    await expect(service.saveProviderTypeFields({ pvtId: 2, fields: [...repeated, repeated[0]], useBy: 9, ctx })).rejects.toMatchObject({
      statusCode: 400,
      message: expect.stringMatching(/repetido/),
    });
  });

  it("404 si el tipo está eliminado", async () => {
    state.type = { ...state.type, sta_id: 3 };
    await expect(service.saveProviderTypeFields({ pvtId: 2, fields: editorFields(), useBy: 9, ctx })).rejects.toMatchObject({ statusCode: 404 });
  });
});
