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
    },
    users: {
      create: 5,
      edit: 6,
      delete: 7,
      assignPermission: 8,
    },
  },
  documents: {
    manage: 9, // crear/editar/eliminar documentos (save + delete de document.routes.js)
  },
  templates: {
    manage: 10, // crear/editar/eliminar plantillas (save_template + delete_template)
  },
};
