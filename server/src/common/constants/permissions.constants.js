/**
 * Única fuente de verdad del catálogo de permisos (qué per_id significa qué
 * acción en tbl_permissions, ver database/migrations/0001_seed_pages_permissions.sql).
 * El cliente ya no lo duplica: lo consume en runtime vía
 * GET /security/permissions/get_catalog (ver authContext.jsx).
 */
export const PERMISSIONS = {
  security: {
    profiles: {
      create: 1,
      edit: 2,
      delete: 3,
      assignPermission: 4,
      view: 11, // listados/lectura: pagination_profiles, get_modules
    },
    users: {
      create: 5,
      edit: 6,
      delete: 7,
      assignPermission: 8,
      view: 12, // listados/lectura: get_users, get_users_permision, list_users, count_users
    },
    permissions: {
      view: 13, // lectura de asignaciones ajenas: get_windows_profile, get_all_pages, get_permissions_user_window, get_permissions_profile
    },
  },
  documents: {
    manage: 9, // crear/editar/eliminar documentos (save + delete de document.routes.js)
    view: 14, // listar/paginar documentos
  },
};
