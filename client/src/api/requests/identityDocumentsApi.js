import { createMasterApi } from 'api/services/masterApi';

/** Maestro de tipos de identificación: las seis llamadas estándar (DEC-020). */
export const identityDocumentsApi = createMasterApi('admin/identityDocuments', {
  entity: 'identity_document',
  plural: 'identity_documents'
});

/**
 * Tipos activos para selects (DEC-018), con el formato del número de cada uno (DEC-021).
 * @param {number} [includeId]  tipo actual del registro que se edita: se incluye aunque esté inactivo
 */
export const getIdentityDocumentsSelectAPI = identityDocumentsApi.select;
