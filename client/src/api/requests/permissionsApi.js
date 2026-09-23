import httpCliente from '../services/httpCliente';

/**
 * Catálogo de permisos (qué per_id corresponde a qué acción) — única fuente
 * de verdad en el servidor (common/constants/permissions.constants.js), ya
 * no se duplica como constantes locales en el cliente.
 */
export const getPermissionsCatalogAPI = () => httpCliente.get('security/permissions/get_catalog');

/**
 * Actualizar permisos de un usuario específico
 * @param {{ useId: number, permissions: number[] }} params
 */
export const updatePermissionsUserAPI = (params) =>
  httpCliente.post('security/permissions/update_permissions_user', params);

/**
 * Obtener permisos actuales de un usuario
 * @param {{ useId: number }} params
 */
export const getPermissionsUserAPI = (params) =>
  httpCliente.get('security/permissions/get_permissions_user', params);