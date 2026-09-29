import httpCliente from '../services/httpCliente';
import { idempotencyConfig } from 'utils/idempotency';

/**
 * Tipos de identificación activos para selects (DEC-018: sin paginar, tope fijo en el servidor).
 * @param {number} [includeId]  tipo actual del registro que se edita: se incluye aunque esté inactivo
 */
export const getIdentityDocumentsSelectAPI = (includeId) =>
  httpCliente.get('admin/identityDocuments/get_identity_documents_select', includeId ? { includeId } : {});

/**
 * Paginación de tipos de identificación
 * @param {{ code, name, staId, rows, first, sortField, sortOrder }} params
 */
export const paginationIdentityDocumentsAPI = (params) => httpCliente.post('admin/identityDocuments/pagination_identity_documents', params);

/**
 * Crear o editar tipo de identificación (el código solo se fija al crear; el estado no se toca aquí)
 * @param {{ iddId, code, name }} params  (el autor lo pone el backend desde la sesión)
 * @param {string} [idempotencyKey]  obligatoria al crear (ver utils/idempotency.js)
 */
export const saveIdentityDocumentAPI = (params, idempotencyKey) =>
  httpCliente.post('admin/identityDocuments/save_identity_document', params, idempotencyConfig(idempotencyKey));

/**
 * Eliminar tipo de identificación (soft delete — cambia sta_id a 3). Falla si algún registro lo usa.
 * @param {{ iddId: number }} params
 */
export const deleteIdentityDocumentAPI = (params) => httpCliente.put('admin/identityDocuments/delete_identity_document', params);

/**
 * Activar (staId 1) o desactivar (staId 2) un tipo de identificación. Permiso propio.
 * @param {{ iddId: number, staId: 1 | 2 }} params
 */
export const changeStatusIdentityDocumentAPI = (params) =>
  httpCliente.put('admin/identityDocuments/change_status_identity_document', params);

/**
 * Obtener un tipo de identificación por id (con autoría)
 * @param {number} iddId
 */
export const getIdentityDocumentAPI = (iddId) => httpCliente.get('admin/identityDocuments/get_identity_document', { iddId });
