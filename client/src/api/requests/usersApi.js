import httpCliente from '../services/httpCliente';

/**
 * Conteo de usuarios agrupado por perfil
 * @param {{ idusuario: number }} params
 */
export const countUsersAPI = (params) =>
  httpCliente.get('security/users/count_users', params);

/**
 * Paginación de usuarios con filtros
 * @param {{ useId, proId, name, lastName, email, phone, identification, username, staId, rows, first, sortField, sortOrder }} params
 */
export const paginationUsersAPI = (params) =>
  httpCliente.post('security/users/list_users', params);

/**
 * Eliminar usuario (soft delete — cambia sta_id a 3)
 * @param {{ useId: number, updatedBy: string }} params
 */
export const deleteUserAPI = (params) =>
  httpCliente.put('security/users/delete_user', params);

/**
 * Crear o editar usuario.
 * Pasa un FormData cuando incluyas foto (multipart), u objeto normal si no.
 * El header Content-Type multipart se setea automáticamente con FormData.
 * @param {FormData | object} params
 */
export const saveUserAPI = (params) => {
  const isFormData = params instanceof FormData;
  return httpCliente.post('security/users/save_user', params, {
    headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
  });
};

/**
 * Guardar cambios desde el perfil propio del usuario (sin foto)
 * @param {object} params
 */
export const saveUserProfileAPI = (params) =>
  httpCliente.post('security/users/save_user', params);

/**
 * Actualizar solo la foto de un usuario
 * @param {{ useId: number, usePhoto: string }} params
 */
export const updateUserPhotoAPI = (params) =>
  httpCliente.post('security/users/update_user_photo', params);

/**
 * Actualizar permisos de un usuario
 * @param {{ useId: number, permissions: number[] }} params
 */
export const updateUserPermissionsAPI = (params) =>
  httpCliente.post('security/permissions/update_permissions_user', params);

/**
 * Guardar novedad de usuario (crea o edita según novId)
 */
export const saveNewnessUserAPI = (params) =>
  httpCliente.post('security/users/save_newness_user', params);

/**
 * Eliminar novedad de usuario (soft delete)
 */
export const deleteNewnessUserAPI = (params) =>
  httpCliente.post('security/users/delete_newness_user', params);

/**
 * Obtener novedades activas de un usuario
 */
export const getNewnessUserAPI = (params) =>
  httpCliente.post('security/users/get_newness_user', params);

/**
 * Obtener información básica del usuario autenticado (el sujeto lo determina
 * el server a partir del JWT de sesión, no un parámetro del cliente)
 */
export const getBasicInformationAPI = () =>
  httpCliente.get('auth/get_basic_information');

/**
 * Actualizar datos de la cuenta del usuario autenticado
 * @param {{ name: string, lastName: string, username: string, email: string }} params
 */
export const updateAccountAPI = (params) =>
  httpCliente.put('auth/update_account', params);

/**
 * Actualizar contraseña del usuario autenticado
 * @param {{ currentPassword: string, newPassword: string }} params
 */
export const updatePasswordAPI = (params) =>
  httpCliente.put('auth/update_password', params);