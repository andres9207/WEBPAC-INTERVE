/**
 * Espejo servidor de client/src/contexts/permissions/permissionsConfig.js.
 * Cada valor numérico es el per_id real en tbl_permissions (ver
 * database/migrations/0001_seed_pages_permissions.sql). Si agregas un
 * permiso nuevo, agrégalo en AMBOS lados con el mismo id — no hay una
 * fuente de verdad única automática entre cliente y servidor todavía.
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
  templates: {
    manage: 10, // crear/editar/eliminar plantillas (save_template + delete_template)
    view: 15, // listar/paginar plantillas
  },
  microsoftGraph: {
    view: 16, // integración con Microsoft Graph (SharePoint/M365) — antes sin verifyToken
  },
};
