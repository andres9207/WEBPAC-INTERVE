import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { defineMaster, createMasterService } from "../../../common/services/master.service.js";

// Maestro de constructoras (ADR-0004, DEC-017). Dos atributos: descripción y
// estado. Una constructora con obras no se elimina, solo se desactiva; las
// obras en ejecución siguen operando (decisiones 4 y 5). Nivel 1: auditoría
// técnica.
export const constructionCompaniesConfig = defineMaster({
  model: "tbl_construction_companies",
  prefix: "cnc",
  idField: "cncId",
  lockEntity: "CONSTRUCTORA",
  label: "constructora",
  feminine: true,
  routes: { entity: "construction_company", plural: "construction_companies" },
  permissions: PERMISSIONS.admin.constructionCompanies,
  fields: [
    { name: "description", column: "cnc_description", label: "descripción", feminine: true, maxLength: 150, unique: true, filter: true, sortable: true },
  ],
  defaultSort: "description",
  selectOrder: "description",
  // ADR-0004, decisión 4. La tabla de obras todavía no existe: al crearla
  // (ADR-0011) se agrega aquí con countDeleted: true, porque una obra
  // eliminada sigue siendo historial y necesita su constructora:
  //   { model: <tabla de obras, nombre pendiente de PD-05>, column: "cnc_id", label: "obra(s)", countDeleted: true }
  dependents: [],
  socketEvent: "refresh-construction-companies",
});

export const constructionCompaniesService = createMasterService(constructionCompaniesConfig);
