import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { defineMaster, createMasterService } from "../../../common/services/master.service.js";

// Maestro de aseguradoras (ADR-0003, DEC-017). Dos atributos: descripción y
// estado. Una aseguradora con pólizas no se elimina, ni siquiera de forma
// lógica: solo se desactiva, y sus pólizas conservan el emisor (ADR-0003,
// decisiones 4 y 5). Nivel 1: auditoría técnica.
export const insurersConfig = defineMaster({
  model: "tbl_insurers",
  prefix: "ins",
  idField: "insId",
  lockEntity: "ASEGURADORA",
  label: "aseguradora",
  feminine: true,
  routes: { entity: "insurer", plural: "insurers" },
  permissions: PERMISSIONS.admin.insurers,
  fields: [
    { name: "description", column: "ins_description", label: "descripción", feminine: true, maxLength: 150, unique: true, filter: true, sortable: true },
  ],
  defaultSort: "description",
  selectOrder: "description",
  // ADR-0003, decisión 4. tbl_policies todavía no existe: al crearla
  // (ADR-0018) se agrega aquí { model: "tbl_policies", column: "ins_id",
  // label: "póliza(s)" }.
  dependents: [],
  socketEvent: "refresh-insurers",
});

export const insurersService = createMasterService(insurersConfig);
