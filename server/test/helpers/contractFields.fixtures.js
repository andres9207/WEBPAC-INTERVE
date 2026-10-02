// Catálogo de campos configurables (migración 0053) y configuración "todo
// aplica y se ve; obligatoria solo la etapa" (la de la migración 0057), como
// los devuelve Prisma. Para los tests de contratos y de tipos de contrato.

export const CONTRACT_FIELDS_CATALOG = [
  { cfd_id: 1, cfd_key: "STAGE", cfd_label: "Etapa", cfd_data_type: "SELECT", cfd_group: "CONTRACT", cfd_order: 1 },
  { cfd_id: 2, cfd_key: "OBSERVATION", cfd_label: "Observaciones", cfd_data_type: "TEXTAREA", cfd_group: "CONTRACT", cfd_order: 2 },
  { cfd_id: 3, cfd_key: "CONCEPT_DESCRIPTION", cfd_label: "Objeto o descripción del otrosí", cfd_data_type: "TEXTAREA", cfd_group: "CONCEPT", cfd_order: 1 },
  { cfd_id: 4, cfd_key: "ADMIN_PCT", cfd_label: "Administración", cfd_data_type: "PERCENT", cfd_group: "CONCEPT", cfd_order: 2 },
  { cfd_id: 5, cfd_key: "CONTINGENCY_PCT", cfd_label: "Imprevistos", cfd_data_type: "PERCENT", cfd_group: "CONCEPT", cfd_order: 3 },
  { cfd_id: 6, cfd_key: "PROFIT_PCT", cfd_label: "Utilidad", cfd_data_type: "PERCENT", cfd_group: "CONCEPT", cfd_order: 4 },
  { cfd_id: 7, cfd_key: "VAT_PCT", cfd_label: "IVA", cfd_data_type: "PERCENT", cfd_group: "CONCEPT", cfd_order: 5 },
  { cfd_id: 8, cfd_key: "ADVANCE_PCT", cfd_label: "Anticipo", cfd_data_type: "PERCENT", cfd_group: "CONCEPT", cfd_order: 6 },
  { cfd_id: 9, cfd_key: "RETENTION_PCT", cfd_label: "Retenido", cfd_data_type: "PERCENT", cfd_group: "CONCEPT", cfd_order: 7 },
];

const KEY_TO_ID = Object.fromEntries(CONTRACT_FIELDS_CATALOG.map((f) => [f.cfd_key, f.cfd_id]));

/** Filas de tbl_contract_type_fields: todo aplica y se ve; `overrides` por clave, p. ej. { VAT_PCT: { ctf_applies: false, ctf_visible: false } }. */
export const typeFieldRows = (overrides = {}) =>
  CONTRACT_FIELDS_CATALOG.map((f) => ({
    cfd_id: f.cfd_id,
    ctf_applies: true,
    ctf_visible: true,
    ctf_required: f.cfd_key === "STAGE",
    ctf_order: f.cfd_order,
    ...overrides[f.cfd_key],
  })).filter((row) => row.ctf_applies !== null);

export const fieldId = (key) => KEY_TO_ID[key];
