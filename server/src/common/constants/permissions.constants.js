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
  admin: {
    identityDocuments: {
      view: 17, // pagination_identity_documents
      create: 18,
      edit: 19,
      delete: 20,
      changeStatus: 21, // activar / desactivar (ADR-0008: separado de editar)
    },
    providerTypes: {
      view: 22, // pagination_provider_types
      create: 23,
      edit: 24,
      delete: 25,
      changeStatus: 26,
    },
    addressTypes: {
      view: 27, // pagination_address_types
      create: 28,
      edit: 29,
      delete: 30,
      changeStatus: 31,
    },
    insurers: {
      view: 32, // pagination_insurers
      create: 33,
      edit: 34,
      delete: 35,
      changeStatus: 36,
    },
    supervisionTypes: {
      view: 37, // pagination_supervision_types
      create: 38,
      edit: 39,
      delete: 40,
      changeStatus: 41,
    },
    constructionCompanies: {
      view: 42, // pagination_construction_companies
      create: 43,
      edit: 44,
      delete: 45,
      changeStatus: 46,
    },
  },
};
