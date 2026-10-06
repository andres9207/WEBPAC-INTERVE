import { readFileSync } from "fs";
import { CONFIGURABLE_FIELDS, enforceFields, resolveFields, typeAppliesAiu, withContractAiu } from "../../../../src/modules/admin/contractTypes/contractFields.js";
import { CONTRACT_FIELDS_CATALOG, fieldId } from "../../../helpers/contractFields.fixtures.js";

// Campos configurables (ADR-0006, DEC-037): resolución única de la
// configuración y su aplicación al guardado.

const row = (key, attrs) => ({ cfd_id: fieldId(key), applies: true, visible: true, required: false, order: 1, ...attrs });

const descriptor = (descriptors, key) => descriptors.find((d) => d.key === key);

describe("catálogo cerrado", () => {
  it("las claves de la migración 0053 y de seed.js son exactamente las del código", () => {
    const keysIn = (path) => [...readFileSync(new URL(path, import.meta.url), "utf8").matchAll(/^\(\d+, '([A-Z_]+)'/gm)].map((m) => m[1]);
    const seedKeys = [...readFileSync(new URL("../../../../prisma/seed.js", import.meta.url), "utf8").matchAll(/cfd_key: "([A-Z_]+)"/g)].map((m) => m[1]);
    const codeKeys = Object.keys(CONFIGURABLE_FIELDS).sort();

    expect(keysIn("../../../../../database/migrations/0053_create_contract_fields.sql").sort()).toEqual(codeKeys);
    expect(seedKeys.sort()).toEqual(codeKeys);
  });
});

describe("resolveFields", () => {
  it("sin configuración, ningún campo aplica (por defecto restrictivo)", () => {
    const descriptors = resolveFields(CONTRACT_FIELDS_CATALOG, []);
    expect(descriptors).toHaveLength(9);
    expect(descriptors.every((d) => !d.applies && !d.visible && !d.required)).toBe(true);
  });

  it("aplica la jerarquía: no aplica anula visible y obligatorio; oculto anula obligatorio", () => {
    const descriptors = resolveFields(CONTRACT_FIELDS_CATALOG, [
      row("STAGE", { applies: false, visible: true, required: true }),
      row("VAT_PCT", { visible: false, required: true }),
      row("ADVANCE_PCT", { required: true }),
    ]);
    expect(descriptor(descriptors, "STAGE")).toMatchObject({ applies: false, visible: false, required: false });
    expect(descriptor(descriptors, "VAT_PCT")).toMatchObject({ applies: true, visible: false, required: false, defaultValue: "19" });
    expect(descriptor(descriptors, "ADVANCE_PCT")).toMatchObject({ applies: true, visible: true, required: true, defaultValue: "15" });
  });

  it("ordena por grupo y por el orden configurado, y entrega etiqueta y tipo de dato del catálogo", () => {
    const descriptors = resolveFields(CONTRACT_FIELDS_CATALOG, [row("RETENTION_PCT", { order: 0 }), row("OBSERVATION", { order: 0 })]);
    expect(descriptors.map((d) => d.key).slice(0, 4)).toEqual(["RETENTION_PCT", "CONCEPT_DESCRIPTION", "ADMIN_PCT", "CONTINGENCY_PCT"]);
    expect(descriptor(descriptors, "OBSERVATION")).toMatchObject({ label: "Observaciones", dataType: "TEXTAREA", group: "CONTRACT", order: 0 });
  });

  it("ignora una clave del catálogo que el código no conoce", () => {
    const catalog = [...CONTRACT_FIELDS_CATALOG, { cfd_id: 99, cfd_key: "UNKNOWN", cfd_label: "X", cfd_data_type: "TEXT", cfd_group: "CONTRACT", cfd_order: 9 }];
    expect(resolveFields(catalog, []).some((d) => d.key === "UNKNOWN")).toBe(false);
  });
});

describe("enforceFields", () => {
  const all = (attrs = {}) =>
    resolveFields(
      CONTRACT_FIELDS_CATALOG,
      CONTRACT_FIELDS_CATALOG.map((f) => ({ cfd_id: f.cfd_id, applies: true, visible: true, required: false, order: f.cfd_order, ...attrs[f.cfd_key] }))
    );

  it("rechaza un valor en un campo que no aplica, en vez de ignorarlo", () => {
    const descriptors = all({ VAT_PCT: { applies: false } });
    expect(() => enforceFields({ descriptors, group: "CONCEPT", input: { vatPct: "19" } })).toThrow(
      expect.objectContaining({ statusCode: 400, message: "IVA: no aplica para este tipo de contrato." })
    );
  });

  it("un campo que no aplica sin valor queda vacío (0 en un porcentaje, que es lo que guarda la BD)", () => {
    const descriptors = all({ VAT_PCT: { applies: false }, STAGE: { applies: false } });
    expect(enforceFields({ descriptors, group: "CONCEPT", input: { vatPct: "0" } }).vatPct).toBeNull();
    expect(enforceFields({ descriptors, group: "CONTRACT", input: { wksId: "" } }).wksId).toBeNull();
  });

  it("conserva el valor heredado de un campo que dejó de aplicar, y rechaza cambiarlo", () => {
    const descriptors = all({ OBSERVATION: { applies: false } });
    const before = { ctr_observation: "Pactado con la versión anterior" };

    expect(enforceFields({ descriptors, group: "CONTRACT", input: { observation: "" }, before }).observation).toBe("Pactado con la versión anterior");
    expect(() => enforceFields({ descriptors, group: "CONTRACT", input: { observation: "Otro texto" }, before })).toThrow(
      expect.objectContaining({ statusCode: 400 })
    );
  });

  it("un campo que aplica y no se muestra toma el valor por defecto al crear y conserva el guardado al editar", () => {
    const descriptors = all({ ADVANCE_PCT: { visible: false } });
    expect(enforceFields({ descriptors, group: "CONCEPT", input: { advancePct: "40" } }).advancePct).toBe("15");
    expect(enforceFields({ descriptors, group: "CONCEPT", input: { advancePct: "40" }, before: { ccp_advance_pct: "12.50" } }).advancePct).toBe("12.50");
  });

  it("exige los obligatorios; en un porcentaje, 0 es un valor", () => {
    const descriptors = all({ STAGE: { required: true }, RETENTION_PCT: { required: true } });
    expect(() => enforceFields({ descriptors, group: "CONTRACT", input: { wksId: null } })).toThrow(
      expect.objectContaining({ statusCode: 400, message: "Etapa: es obligatorio para este tipo de contrato." })
    );
    expect(() => enforceFields({ descriptors, group: "CONCEPT", input: {} })).toThrow(expect.objectContaining({ statusCode: 400 }));
    expect(enforceFields({ descriptors, group: "CONCEPT", input: { retentionPct: "0" } }).retentionPct).toBe("0");
  });

  it("solo toca su grupo, salta las claves de `skip` y deja pasar lo que no es configurable", () => {
    const descriptors = all({ CONCEPT_DESCRIPTION: { applies: false }, STAGE: { applies: false } });
    const output = enforceFields({ descriptors, group: "CONCEPT", input: { description: "x", directCost: "10", wksId: 5 }, skip: ["CONCEPT_DESCRIPTION"] });
    expect(output).toMatchObject({ description: "x", directCost: "10", wksId: 5 });
  });
});

describe("AIU en cadena (DEC-046)", () => {
  const all = () => resolveFields(CONTRACT_FIELDS_CATALOG, CONTRACT_FIELDS_CATALOG.map((f) => row(f.cfd_key)));

  it("el tipo aplica AIU si alguno de A, I o U aplica", () => {
    expect(typeAppliesAiu(all())).toBe(true);
    const onlyProfit = resolveFields(CONTRACT_FIELDS_CATALOG, [row("PROFIT_PCT"), row("VAT_PCT")]);
    expect(typeAppliesAiu(onlyProfit)).toBe(true);
    expect(typeAppliesAiu(resolveFields(CONTRACT_FIELDS_CATALOG, [row("VAT_PCT")]))).toBe(false);
  });

  it("sin solicitud del contrato, A, I y U dejan de aplicar con su propio motivo; los demás no cambian", () => {
    const off = withContractAiu(all(), false);
    for (const key of ["ADMIN_PCT", "CONTINGENCY_PCT", "PROFIT_PCT"]) expect(descriptor(off, key)).toMatchObject({ applies: false, visible: false, required: false });
    expect(descriptor(off, "VAT_PCT").applies).toBe(true);
    expect(withContractAiu(all(), true)).toEqual(all());

    expect(() => enforceFields({ descriptors: off, group: "CONCEPT", input: { adminPct: "10" } })).toThrow("Administración: el contrato no solicita AIU.");
    expect(enforceFields({ descriptors: off, group: "CONCEPT", input: { adminPct: "0" } }).adminPct).toBeNull();
  });
});
