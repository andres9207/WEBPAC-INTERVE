/**
 * Mapa de permisos de la aplicación.
 * Cada valor numérico corresponde al per_id en tbl_permisos / tbl_permisos_usuarios.
 * null = no requiere permiso específico para esa acción.
 */
export const config = {
  // home: {
  //   homepage: {
  //     viewAll: null,
  //     onlyRead: null,
  //     create: null,
  //     edit: null,
  //     delete: null,
  //     manage: 25,
  //   },
  // },
  security: {
    profiles: {
      viewAll: 11,           // Ver perfiles (antes null: ahora sí requiere permiso en el servidor)
      onlyRead: null,
      create: 1,            // Crear perfil
      edit: 2,              // Modificar perfil
      delete: 3,            // Eliminar perfil
      assignPermission: 4,  // Asignar permisos al perfil
    },
    users: {
      viewAll: 12,           // Ver usuarios (antes null: ahora sí requiere permiso en el servidor)
      onlyRead: null,
      create: 5,            // Crear usuario
      edit: 6,              // Modificar usuario
      delete: 7,            // Eliminar usuario
      assignPermission: 8,  // Asignar permisos al usuario
    },
    permissions: {
      view: 13,              // Ver asignaciones de permisos de otro perfil/usuario
    },
  },
  documents: {
    manage: 9,   // Gestionar documentos (crear/editar/eliminar)
    view: 14,    // Ver/listar documentos
  },
  templates: {
    manage: 10,  // Gestionar plantillas (crear/editar/eliminar)
    view: 15,    // Ver/listar plantillas
  },
  microsoftGraph: {
    view: 16,    // Ver integración Microsoft Graph
  },
};