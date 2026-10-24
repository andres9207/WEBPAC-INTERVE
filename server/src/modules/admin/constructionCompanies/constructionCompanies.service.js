import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { defineMaster, createMasterService } from "../../../common/services/master.service.js";

// Maestro de constructoras (ADR-0004, DEC-017). Tres atributos: descripción,
// NIT (migración 0115: obligatorio y único entre no eliminadas) y estado. Una
// constructora con obras no se elimina, solo se desactiva; las
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
    // De 5 a 15 dígitos, guion y un dígito de verificación obligatorio pero libre: no se recalcula
    // (pedido del usuario, 2026-10-24). La máscara del formulario pone el guion.
    {
      name: "nit",
      column: "cnc_nit",
      label: "NIT",
      maxLength: 17,
      unique: true,
      filter: true,
      sortable: true,
      pattern: { regex: /^\d{5,15}-\d$/, message: "El NIT debe tener de 5 a 15 dígitos, guion y dígito de verificación (p. ej. 900123456-8)." },
      // El filtro también lleva la máscara: un NIT a medias ("900123" se ve "90012-3") se busca
      // además sin el guion, para que encuentre "900123456-8".
      filterTerms: (text) => [...new Set([text, text.replace(/-/g, "")])],
    },
  ],
  defaultSort: "description",
  selectOrder: "description",
  // ADR-0004, decisión 4. countDeleted: una obra eliminada sigue siendo
  // historial y necesita su constructora.
  dependents: [{ model: "tbl_works", column: "cnc_id", label: "obra(s)", countDeleted: true }],
  socketEvent: "refresh-construction-companies",
});

export const constructionCompaniesService = createMasterService(constructionCompaniesConfig);
