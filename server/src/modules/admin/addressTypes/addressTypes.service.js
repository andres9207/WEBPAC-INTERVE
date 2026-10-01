import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { defineMaster, createMasterService } from "../../../common/services/master.service.js";

// Maestro de tipos de dirección (ADR-0009, DEC-017). Catálogo compartido por
// los contactos de obra y de proveedor; los contactos se gestionan en los
// servicios de obra y de proveedor, no en un módulo propio. "Principal" es
// una marca del contacto, no un tipo (ADR-0009, decisión 6). Nivel 1:
// auditoría técnica.
export const addressTypesConfig = defineMaster({
  model: "tbl_address_types",
  prefix: "adt",
  idField: "adtId",
  lockEntity: "TIPO_DIRECCION",
  label: "tipo de dirección",
  routes: { entity: "address_type", plural: "address_types" },
  permissions: PERMISSIONS.admin.addressTypes,
  fields: [{ name: "name", column: "adt_name", label: "nombre", maxLength: 100, unique: true, filter: true, sortable: true }],
  defaultSort: "name",
  selectOrder: "name",
  // ADR-0009, decisión 8. Los contactos no tienen estado ni eliminación
  // lógica (se borran al quitarlos), así que se cuentan todos. La tabla de
  // contactos de obra (PRO-BD-04) se agrega aquí cuando exista.
  dependents: [{ model: "tbl_provider_contacts", column: "adt_id", label: "contacto(s) de proveedor", countDeleted: true }],
  socketEvent: "refresh-address-types",
});

export const addressTypesService = createMasterService(addressTypesConfig);
