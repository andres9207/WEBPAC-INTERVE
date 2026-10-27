import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { defineMaster, createMasterService } from "../../../common/services/master.service.js";

// Maestro de tipos de contrato (ADR-0006, DEC-017): nombre y estado, con
// auditoría técnica. La configuración de los campos del contrato (DEC-053) y
// el menú de facturas (DEC-056) son del tipo de proveedor.
export const contractTypesConfig = defineMaster({
  model: "tbl_contract_types",
  prefix: "ctt",
  idField: "cttId",
  lockEntity: "TIPO_CONTRATO",
  label: "tipo de contrato",
  routes: { entity: "contract_type", plural: "contract_types" },
  permissions: PERMISSIONS.admin.contractTypes,
  fields: [{ name: "name", column: "ctt_name", label: "nombre", maxLength: 100, unique: true, filter: true, sortable: true }],
  defaultSort: "name",
  selectOrder: "name",
  // ADR-0006, regla 13.
  dependents: [
    { model: "tbl_works", column: "ctt_id", label: "obra(s)" },
  ],
  socketEvent: "refresh-contract-types",
});

export const contractTypesService = createMasterService(contractTypesConfig);
