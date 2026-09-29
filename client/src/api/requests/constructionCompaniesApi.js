import { createMasterApi } from 'api/services/masterApi';

/** Maestro de constructoras: las seis llamadas estándar (DEC-020). */
export const constructionCompaniesApi = createMasterApi('admin/constructionCompanies', {
  entity: 'construction_company',
  plural: 'construction_companies'
});

/**
 * Constructoras activas para el formulario de obra (DEC-018).
 * @param {number} [includeId]  constructora actual de la obra que se edita: se incluye aunque esté inactiva
 */
export const getConstructionCompaniesSelectAPI = constructionCompaniesApi.select;
