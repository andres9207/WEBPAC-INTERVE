import { prisma } from "../src/common/configs/prismaClient.js";

// Ids explícitos y fijos a propósito: coinciden 1:1 con las rutas reales en
// client/src/routes/MainRoutes.jsx y con el catálogo que expone la API
// (permissions.constants.js / get_permissions_user), que el cliente consume
// en vez de hardcodear un mapa propio. Cambiar estos valores rompe permisos
// ya asignados y la navegación de cualquier ambiente que ya tenga datos.
//
// pag_type: 1 = página padre (grupo en el sidebar), 2 = página hija (item).

const PAGES = [
  { pag_id: 1, pag_description: "Dashboard", pag_parent: 0, pag_url: "home/default", pag_icon: "dashboard", pag_order: 1, pag_name: "Dashboard", pag_type: 1 },
  { pag_id: 2, pag_description: "Seguridad", pag_parent: 0, pag_url: null, pag_icon: "shield", pag_order: 2, pag_name: "Seguridad", pag_type: 1 },
  { pag_id: 3, pag_description: "Perfiles", pag_parent: 2, pag_url: "security/profiles", pag_icon: "id", pag_order: 1, pag_name: "Perfiles", pag_type: 2 },
  { pag_id: 4, pag_description: "Usuarios", pag_parent: 2, pag_url: "security/users", pag_icon: "users", pag_order: 2, pag_name: "Usuarios", pag_type: 2 },
  // database/migrations/0020_seed_admin_identity_documents_pages_permissions.sql
  { pag_id: 5, pag_description: "Administración", pag_parent: 0, pag_url: null, pag_icon: "settings", pag_order: 3, pag_name: "Administración", pag_type: 1 },
  { pag_id: 6, pag_description: "Tipos de identificación", pag_parent: 5, pag_url: "admin/identityDocuments", pag_icon: "id-card", pag_order: 1, pag_name: "Tipos de identificación", pag_type: 2 },
  // database/migrations/0024_seed_provider_types_pages_permissions.sql
  { pag_id: 7, pag_description: "Tipos de proveedor", pag_parent: 5, pag_url: "admin/providerTypes", pag_icon: "truck", pag_order: 2, pag_name: "Tipos de proveedor", pag_type: 2 },
  // database/migrations/0027_seed_address_types_pages_permissions.sql
  { pag_id: 8, pag_description: "Tipos de dirección", pag_parent: 5, pag_url: "admin/addressTypes", pag_icon: "map-pin", pag_order: 3, pag_name: "Tipos de dirección", pag_type: 2 },
  // database/migrations/0029_seed_insurers_pages_permissions.sql
  { pag_id: 9, pag_description: "Aseguradoras", pag_parent: 5, pag_url: "admin/insurers", pag_icon: "umbrella", pag_order: 4, pag_name: "Aseguradoras", pag_type: 2 },
];

const PERMISSIONS = [
  { per_id: 1, per_name: "Crear perfil", pag_id: 3, per_order: 1 },
  { per_id: 2, per_name: "Modificar perfil", pag_id: 3, per_order: 2 },
  { per_id: 3, per_name: "Eliminar perfil", pag_id: 3, per_order: 3 },
  { per_id: 4, per_name: "Asignar permisos al perfil", pag_id: 3, per_order: 4 },
  { per_id: 5, per_name: "Crear usuario", pag_id: 4, per_order: 1 },
  { per_id: 6, per_name: "Modificar usuario", pag_id: 4, per_order: 2 },
  { per_id: 7, per_name: "Eliminar usuario", pag_id: 4, per_order: 3 },
  { per_id: 8, per_name: "Asignar permisos al usuario", pag_id: 4, per_order: 4 },
  { per_id: 18, per_name: "Crear tipo de identificación", pag_id: 6, per_order: 1 },
  { per_id: 19, per_name: "Modificar tipo de identificación", pag_id: 6, per_order: 2 },
  { per_id: 20, per_name: "Eliminar tipo de identificación", pag_id: 6, per_order: 3 },
  // database/migrations/0021_seed_identity_documents_change_status_permission.sql
  { per_id: 21, per_name: "Cambiar estado tipo de identificación", pag_id: 6, per_order: 4 },
  // database/migrations/0024_seed_provider_types_pages_permissions.sql
  { per_id: 23, per_name: "Crear tipo de proveedor", pag_id: 7, per_order: 1 },
  { per_id: 24, per_name: "Modificar tipo de proveedor", pag_id: 7, per_order: 2 },
  { per_id: 25, per_name: "Eliminar tipo de proveedor", pag_id: 7, per_order: 3 },
  { per_id: 26, per_name: "Cambiar estado tipo de proveedor", pag_id: 7, per_order: 4 },
  // database/migrations/0027_seed_address_types_pages_permissions.sql
  { per_id: 28, per_name: "Crear tipo de dirección", pag_id: 8, per_order: 1 },
  { per_id: 29, per_name: "Modificar tipo de dirección", pag_id: 8, per_order: 2 },
  { per_id: 30, per_name: "Eliminar tipo de dirección", pag_id: 8, per_order: 3 },
  { per_id: 31, per_name: "Cambiar estado tipo de dirección", pag_id: 8, per_order: 4 },
  // database/migrations/0029_seed_insurers_pages_permissions.sql
  { per_id: 33, per_name: "Crear aseguradora", pag_id: 9, per_order: 1 },
  { per_id: 34, per_name: "Modificar aseguradora", pag_id: 9, per_order: 2 },
  { per_id: 35, per_name: "Eliminar aseguradora", pag_id: 9, per_order: 3 },
  { per_id: 36, per_name: "Cambiar estado aseguradora", pag_id: 9, per_order: 4 },
];

// Sin pag_id: document.routes.js no tiene página propia en el sidebar (ver
// database/migrations/0002_seed_permissions_documents_templates.sql). per_id
// 10 ("Gestionar plantillas") se retiró junto con el módulo template/, que
// nunca tuvo tablas reales (tbl_template/tbl_estados no existen) ni caller
// en el cliente.
const PERMISSIONS_NO_PAGE = [
  { per_id: 9, per_name: "Gestionar documentos", pag_id: null, per_order: 1 },
];

// Permisos de "ver" (database/migrations/0003_seed_view_permissions.sql):
// a diferencia de los de arriba (gestión, solo Superadmin), estos se
// otorgan a TODOS los perfiles existentes más abajo — de lo contrario
// cualquier cuenta real (no superadmin) quedaría bloqueada con 403 al abrir
// listados que hoy podía ver sin ningún permiso especial. Basta con
// asignarlos al PERFIL: desde que el permiso efectivo se resuelve por
// consulta como unión de perfil + excepciones individuales (ver
// common/services/effectivePermissions.service.js), ya no hace falta además
// copiarlos a mano a cada usuario existente — se propagan solos.
// per_id 15 ("Ver plantillas") y 16 ("Ver integración Microsoft Graph") se
// retiraron junto con los módulos template/ y microsoftGraph/ — ninguno
// tenía tablas reales que respaldaran su funcionalidad.
const VIEW_PERMISSIONS = [
  { per_id: 11, per_name: "Ver perfiles", pag_id: 3, per_order: 5 },
  { per_id: 12, per_name: "Ver usuarios", pag_id: 4, per_order: 5 },
  { per_id: 13, per_name: "Ver permisos", pag_id: null, per_order: 1 },
  { per_id: 14, per_name: "Ver documentos", pag_id: null, per_order: 1 },
  { per_id: 17, per_name: "Ver tipos de identificación", pag_id: 6, per_order: 5 },
  { per_id: 22, per_name: "Ver tipos de proveedor", pag_id: 7, per_order: 5 },
  { per_id: 27, per_name: "Ver tipos de dirección", pag_id: 8, per_order: 5 },
  { per_id: 32, per_name: "Ver aseguradoras", pag_id: 9, per_order: 5 },
];

// Perfil sembrado como superadmin en esta sesión (ver tbl_profiles). No hay
// ningún bypass de código para este id en ningún lado (cliente ni
// servidor) — su acceso total sale únicamente de que este seed le otorgue
// todos los permisos existentes vía tbl_profile_permissions; sin estas
// filas también vería el sidebar vacío, igual que cualquier otro perfil.
const SUPERADMIN_PROFILE_ID = 1;

// Catálogo de estados (database/migrations/0010_seed_status.sql). Ids fijos:
// 1 = activo, 2 = inactivo, 3 = eliminado lógico — codificados en el backend
// y en client/src/utils/constants.js. `update: {}` para no pisar nombres o
// colores ya personalizados en una BD existente.
const STATUSES = [
  { sta_id: 1, sta_name: "Activo", sta_scope: "GENERAL", sta_color: "success", sta_order: 1 },
  { sta_id: 2, sta_name: "Inactivo", sta_scope: "GENERAL", sta_color: "warning", sta_order: 2 },
  { sta_id: 3, sta_name: "Eliminado", sta_scope: "GENERAL", sta_color: "error", sta_order: 3 },
];

// Tipos de identificación iniciales (database/migrations/0018_seed_identity_documents.sql).
// `update: {}` para no pisar nombres o estados ya editados desde el maestro.
const IDENTITY_DOCUMENTS = [
  { idd_id: 1, idd_code: "CC", idd_name: "Cédula de ciudadanía", sta_id: 1 },
  { idd_id: 2, idd_code: "CE", idd_name: "Cédula de extranjería", sta_id: 1 },
  { idd_id: 3, idd_code: "NIT", idd_name: "NIT", sta_id: 1 },
  { idd_id: 4, idd_code: "PA", idd_name: "Pasaporte", sta_id: 1 },
  { idd_id: 5, idd_code: "PPT", idd_name: "Permiso por protección temporal", sta_id: 1 },
];

// Tipos de proveedor iniciales (database/migrations/0023_seed_provider_types.sql).
const PROVIDER_TYPES = [
  { pvt_id: 1, pvt_name: "Simple", sta_id: 1 },
  { pvt_id: 2, pvt_name: "Subcontratista", sta_id: 1 },
  { pvt_id: 3, pvt_name: "Contrato mayor", sta_id: 1 },
];

// Tipos de dirección iniciales (database/migrations/0026_seed_address_types.sql).
const ADDRESS_TYPES = [
  { adt_id: 1, adt_name: "Oficina", sta_id: 1 },
  { adt_id: 2, adt_name: "Sucursal", sta_id: 1 },
  { adt_id: 3, adt_name: "Correspondencia", sta_id: 1 },
  { adt_id: 4, adt_name: "Facturación", sta_id: 1 },
  { adt_id: 5, adt_name: "Bodega", sta_id: 1 },
];

async function main() {
  for (const status of STATUSES) {
    await prisma.tbl_status.upsert({
      where: { sta_id: status.sta_id },
      update: {},
      create: status,
    });
  }
  console.log(`tbl_status: ${STATUSES.length} estados sembrados (los existentes no se modifican).`);

  for (const document of IDENTITY_DOCUMENTS) {
    await prisma.tbl_identity_documents.upsert({
      where: { idd_id: document.idd_id },
      update: {},
      create: document,
    });
  }
  console.log(`tbl_identity_documents: ${IDENTITY_DOCUMENTS.length} tipos sembrados (los existentes no se modifican).`);

  for (const providerType of PROVIDER_TYPES) {
    await prisma.tbl_provider_types.upsert({
      where: { pvt_id: providerType.pvt_id },
      update: {},
      create: providerType,
    });
  }
  console.log(`tbl_provider_types: ${PROVIDER_TYPES.length} tipos sembrados (los existentes no se modifican).`);

  for (const addressType of ADDRESS_TYPES) {
    await prisma.tbl_address_types.upsert({
      where: { adt_id: addressType.adt_id },
      update: {},
      create: addressType,
    });
  }
  console.log(`tbl_address_types: ${ADDRESS_TYPES.length} tipos sembrados (los existentes no se modifican).`);

  for (const page of PAGES) {
    await prisma.tbl_pages.upsert({
      where: { pag_id: page.pag_id },
      update: page,
      create: page,
    });
  }
  console.log(`tbl_pages: ${PAGES.length} páginas sembradas/actualizadas.`);

  const allPermissions = [...PERMISSIONS, ...PERMISSIONS_NO_PAGE, ...VIEW_PERMISSIONS];
  for (const permission of allPermissions) {
    await prisma.tbl_permissions.upsert({
      where: { per_id: permission.per_id },
      update: permission,
      create: permission,
    });
  }
  console.log(`tbl_permissions: ${allPermissions.length} permisos sembrados/actualizados.`);

  for (const page of PAGES) {
    await prisma.tbl_page_permissions.upsert({
      where: { pro_id_pag_id: { pro_id: SUPERADMIN_PROFILE_ID, pag_id: page.pag_id } },
      update: {},
      create: { pro_id: SUPERADMIN_PROFILE_ID, pag_id: page.pag_id },
    });
  }

  const superadminOnlyPermissions = [...PERMISSIONS, ...PERMISSIONS_NO_PAGE];
  for (const permission of superadminOnlyPermissions) {
    await prisma.tbl_profile_permissions.upsert({
      where: { per_id_pro_id: { per_id: permission.per_id, pro_id: SUPERADMIN_PROFILE_ID } },
      update: {},
      create: { per_id: permission.per_id, pro_id: SUPERADMIN_PROFILE_ID },
    });
  }
  console.log(`Perfil ${SUPERADMIN_PROFILE_ID}: páginas y permisos de gestión asignados.`);

  // Permisos de "ver": a todos los perfiles existentes. El permiso efectivo
  // se resuelve en cada petición (unión perfil + excepciones individuales),
  // así que esto solo alcanza para cubrir también a los usuarios YA
  // creados de esos perfiles — no hace falta un paso aparte por usuario.
  const allProfiles = await prisma.tbl_profiles.findMany({ select: { pro_id: true } });
  for (const profile of allProfiles) {
    for (const permission of VIEW_PERMISSIONS) {
      await prisma.tbl_profile_permissions.upsert({
        where: { per_id_pro_id: { per_id: permission.per_id, pro_id: profile.pro_id } },
        update: {},
        create: { per_id: permission.per_id, pro_id: profile.pro_id },
      });
    }
  }
  console.log(`${allProfiles.length} perfil(es): permisos de ver asignados (aplican a todos sus usuarios de inmediato).`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
