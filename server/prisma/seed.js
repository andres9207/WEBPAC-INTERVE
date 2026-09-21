import { prisma } from "../src/common/configs/prismaClient.js";

// Ids explícitos y fijos a propósito: coinciden 1:1 con
// client/src/contexts/permissions/permissionsConfig.js (hardcodea per_id) y
// con las rutas reales en client/src/routes/MainRoutes.jsx. Cambiar estos
// valores rompe permisos ya asignados y la navegación de cualquier ambiente
// que ya tenga datos.
//
// pag_type: 1 = página padre (grupo en el sidebar), 2 = página hija (item).

const PAGES = [
  { pag_id: 1, pag_description: "Dashboard", pag_parent: 0, pag_url: "home/default", pag_icon: "dashboard", pag_order: 1, pag_name: "Dashboard", pag_type: 1 },
  { pag_id: 2, pag_description: "Seguridad", pag_parent: 0, pag_url: null, pag_icon: "shield", pag_order: 2, pag_name: "Seguridad", pag_type: 1 },
  { pag_id: 3, pag_description: "Perfiles", pag_parent: 2, pag_url: "security/profiles", pag_icon: "id", pag_order: 1, pag_name: "Perfiles", pag_type: 2 },
  { pag_id: 4, pag_description: "Usuarios", pag_parent: 2, pag_url: "security/users", pag_icon: "users", pag_order: 2, pag_name: "Usuarios", pag_type: 2 },
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
];

// Sin pag_id: document.routes.js/template.routes.js no tienen página propia
// en el sidebar (ver database/migrations/0002_seed_permissions_documents_templates.sql).
const PERMISSIONS_NO_PAGE = [
  { per_id: 9, per_name: "Gestionar documentos", pag_id: null, per_order: 1 },
  { per_id: 10, per_name: "Gestionar plantillas", pag_id: null, per_order: 1 },
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
const VIEW_PERMISSIONS = [
  { per_id: 11, per_name: "Ver perfiles", pag_id: 3, per_order: 5 },
  { per_id: 12, per_name: "Ver usuarios", pag_id: 4, per_order: 5 },
  { per_id: 13, per_name: "Ver permisos", pag_id: null, per_order: 1 },
  { per_id: 14, per_name: "Ver documentos", pag_id: null, per_order: 1 },
  { per_id: 15, per_name: "Ver plantillas", pag_id: null, per_order: 1 },
  { per_id: 16, per_name: "Ver integración Microsoft Graph", pag_id: null, per_order: 1 },
];

// Perfil sembrado como superadmin en esta sesión (ver tbl_profiles). El
// bypass de hasPermission() para useId===1 es solo del lado del cliente —
// get_menu (app.service.js) no lo conoce, así que sin estas filas el
// superadmin también vería el sidebar vacío.
const SUPERADMIN_PROFILE_ID = 1;

async function main() {
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
