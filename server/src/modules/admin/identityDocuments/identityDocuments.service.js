import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { defineMaster, createMasterService } from "../../../common/services/master.service.js";

// Maestro de tipos de identificación (ADR-0008, DEC-017). Nivel 1: auditoría
// técnica (columnas de autoría), sin bitácora (ADR-0013, dec. 9). Toda la
// lógica vive en el patrón de maestro; aquí solo se declara.
export const identityDocumentsConfig = defineMaster({
  model: "tbl_identity_documents",
  prefix: "idd",
  idField: "iddId",
  lockEntity: "TIPO_IDENTIFICACION",
  label: "tipo de identificación",
  routes: { entity: "identity_document", plural: "identity_documents" },
  permissions: PERMISSIONS.admin.identityDocuments,
  fields: [
    {
      name: "code",
      column: "idd_code",
      label: "código",
      maxLength: 10,
      pattern: { regex: /^[A-Za-z0-9]+$/, message: "El código solo admite letras y números, sin espacios." },
      uppercase: true,
      // Clave estable del tipo: se fija al crear y no se edita (ADR-0008).
      editable: false,
      unique: true,
      filter: true,
      sortable: true,
    },
    { name: "name", column: "idd_name", label: "nombre", maxLength: 100, unique: true, filter: true, sortable: true },
  ],
  defaultSort: "name",
  selectOrder: "name",
  selectLabel: (row) => `${row.idd_name} (${row.idd_code})`,
  selectExtra: (row) => ({ code: row.idd_code }),
  // ADR-0008, decisión 6. Cuando exista tbl_providers, se agrega aquí.
  dependents: [{ model: "tbl_users", column: "idd_id", label: "usuario(s)" }],
  socketEvent: "refresh-identity-documents",
});

export const identityDocumentsService = createMasterService(identityDocumentsConfig);
