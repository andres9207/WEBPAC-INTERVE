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
    contractTypes: {
      view: 47, // pagination_contract_types
      create: 48,
      edit: 49,
      delete: 50,
      changeStatus: 51,
    },
  },
  // Obras (DEC-026). Asignar y retirar responsables son permisos aparte de
  // editar: deciden quién responde por la obra (ADR-0011, "Autorización").
  work: {
    works: {
      view: 52, // pagination_works, get_work, select_work_managers
      create: 53,
      edit: 54,
      delete: 55,
      changeStatus: 56,
      assignManager: 57,
      removeManager: 58,
      manageStages: 59,
    },
    // Proveedores (DEC-031). Asignar y desasignar a obras van aparte de
    // editar (cambian una obra, no el maestro), y cambiar la identificación
    // también: reasigna el historial de la empresa (ADR-0012, "Autorización").
    providers: {
      view: 60, // pagination_providers, get_provider, check_provider_identification, select_providers
      create: 61,
      edit: 62,
      delete: 63,
      changeStatus: 64,
      changeIdentity: 65,
      assignWork: 66,
      unassignWork: 67,
    },
  },
};
