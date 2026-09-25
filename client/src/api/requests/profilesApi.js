import httpCliente from '../services/httpCliente';

/**
 * Listar todos los perfiles activos (para selects/combos)
 */
export const getProfilesAPI = () =>
  httpCliente.get('app/get_profiles');

/**
 * Paginación de perfiles
 * @param {{ name, staId, rows, first, sortField, sortOrder }} params
 */
export const paginationProfilesAPI = (params) =>
  httpCliente.post('security/profiles/pagination_profiles', params);

/**
 * Eliminar perfil (soft delete — cambia sta_id a 3)
 * @param {{ proId: number }} params  (el autor lo pone el backend desde la sesión)
 */
export const deleteProfileAPI = (params) =>
  httpCliente.put('security/profiles/delete_profile', params);

/**
 * Crear o editar perfil
 * @param {{ proId, name, staId, modules, previousModules }} params  (el autor lo pone el backend desde la sesión)
 */
export const saveProfileAPI = (params) =>
  httpCliente.post('security/profiles/save_profile', params);

/**
 * Obtener módulos asociados y sin asociar de un perfil
 * @param {number} proId
 */
export const getModulesAPI = (proId) =>
  httpCliente.get('security/profiles/get_modules', { proId });