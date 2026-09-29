import httpCliente from './httpCliente';
import { idempotencyConfig } from 'utils/idempotency';

/**
 * Llamadas estándar de un maestro (DEC-020): las seis rutas que arma
 * createMasterRouter en el servidor. Cada maestro las expone desde su propio
 * `api/requests/<módulo>Api.js`, que es donde la pantalla las importa.
 *
 * @param {string} base  ruta del módulo, p. ej. 'admin/identityDocuments'
 * @param {{ entity: string, plural: string }} names  acciones en snake_case, como en la config del servidor
 */
export const createMasterApi = (base, { entity, plural }) => ({
  /** @param {{ rows, first, sortField, sortOrder, staId, ...filtros }} params */
  pagination: (params) => httpCliente.post(`${base}/pagination_${plural}`, params),
  /** @param {object} params  { [idField]: id } */
  getById: (params) => httpCliente.get(`${base}/get_${entity}`, params),
  /** Activos para selects (DEC-018). @param {number} [includeId] valor actual aunque esté inactivo */
  select: (includeId) => httpCliente.get(`${base}/get_${plural}_select`, includeId ? { includeId } : {}),
  /**
   * Crear (id 0) o editar. El autor lo pone el backend desde la sesión.
   * @param {string} [idempotencyKey]  obligatoria al crear (utils/idempotency.js)
   */
  save: (params, idempotencyKey) => httpCliente.post(`${base}/save_${entity}`, params, idempotencyConfig(idempotencyKey)),
  /** @param {object} params  { [idField]: id, staId: 1 | 2 } */
  changeStatus: (params) => httpCliente.put(`${base}/change_status_${entity}`, params),
  /** Eliminación lógica; falla con el motivo si otros registros lo usan. */
  remove: (params) => httpCliente.put(`${base}/delete_${entity}`, params)
});
