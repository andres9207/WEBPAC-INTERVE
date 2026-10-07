import { prisma } from "../src/common/configs/prismaClient.js";

// Ids explícitos y fijos a propósito: coinciden 1:1 con las rutas reales en
// client/src/routes/MainRoutes.jsx y con el catálogo que expone la API
// (permissions.constants.js / get_permissions_user), que el cliente consume
// en vez de hardcodear un mapa propio. Cambiar estos valores rompe permisos
// ya asignados y la navegación de cualquier ambiente que ya tenga datos.
//
// pag_type: 1 = página padre (grupo en el sidebar), 2 = página hija (item).
// pag_order de los grupos: el de la migración 0069 (Dashboard, Obras,
// Facturación, Administración, Seguridad). El upsert lo reescribe en cada `yarn db:seed`.

const PAGES = [
  { pag_id: 1, pag_description: "Dashboard", pag_parent: 0, pag_url: "home/default", pag_icon: "dashboard", pag_order: 1, pag_name: "Dashboard", pag_type: 1 },
  { pag_id: 2, pag_description: "Seguridad", pag_parent: 0, pag_url: null, pag_icon: "shield", pag_order: 5, pag_name: "Seguridad", pag_type: 1 },
  { pag_id: 3, pag_description: "Perfiles", pag_parent: 2, pag_url: "security/profiles", pag_icon: "id", pag_order: 1, pag_name: "Perfiles", pag_type: 2 },
  { pag_id: 4, pag_description: "Usuarios", pag_parent: 2, pag_url: "security/users", pag_icon: "users", pag_order: 2, pag_name: "Usuarios", pag_type: 2 },
  // database/migrations/0020_seed_admin_identity_documents_pages_permissions.sql
  { pag_id: 5, pag_description: "Administración", pag_parent: 0, pag_url: null, pag_icon: "settings", pag_order: 4, pag_name: "Administración", pag_type: 1 },
  { pag_id: 6, pag_description: "Tipos de identificación", pag_parent: 5, pag_url: "admin/identityDocuments", pag_icon: "id-card", pag_order: 1, pag_name: "Tipos de identificación", pag_type: 2 },
  // database/migrations/0024_seed_provider_types_pages_permissions.sql
  { pag_id: 7, pag_description: "Tipos de proveedor", pag_parent: 5, pag_url: "admin/providerTypes", pag_icon: "truck", pag_order: 2, pag_name: "Tipos de proveedor", pag_type: 2 },
  // database/migrations/0027_seed_address_types_pages_permissions.sql
  { pag_id: 8, pag_description: "Tipos de dirección", pag_parent: 5, pag_url: "admin/addressTypes", pag_icon: "map-pin", pag_order: 3, pag_name: "Tipos de dirección", pag_type: 2 },
  // database/migrations/0029_seed_insurers_pages_permissions.sql
  { pag_id: 9, pag_description: "Aseguradoras", pag_parent: 5, pag_url: "admin/insurers", pag_icon: "umbrella", pag_order: 4, pag_name: "Aseguradoras", pag_type: 2 },
  // database/migrations/0032_seed_supervision_types_pages_permissions.sql
  { pag_id: 10, pag_description: "Tipos de interventoría", pag_parent: 5, pag_url: "admin/supervisionTypes", pag_icon: "eye", pag_order: 5, pag_name: "Tipos de interventoría", pag_type: 2 },
  // database/migrations/0034_seed_construction_companies_pages_permissions.sql
  { pag_id: 11, pag_description: "Constructoras", pag_parent: 5, pag_url: "admin/constructionCompanies", pag_icon: "building", pag_order: 6, pag_name: "Constructoras", pag_type: 2 },
  // database/migrations/0037_seed_contract_types_pages_permissions.sql
  { pag_id: 12, pag_description: "Tipos de contrato", pag_parent: 5, pag_url: "admin/contractTypes", pag_icon: "contract", pag_order: 7, pag_name: "Tipos de contrato", pag_type: 2 },
  // database/migrations/0041_seed_works_pages_permissions.sql
  { pag_id: 13, pag_description: "Obras", pag_parent: 0, pag_url: null, pag_icon: "building", pag_order: 2, pag_name: "Obras", pag_type: 1 },
  { pag_id: 14, pag_description: "Obras", pag_parent: 13, pag_url: "work/works", pag_icon: "building", pag_order: 1, pag_name: "Obras", pag_type: 2 },
  // database/migrations/0047_seed_providers_pages_permissions.sql
  { pag_id: 15, pag_description: "Proveedores", pag_parent: 13, pag_url: "work/providers", pag_icon: "truck", pag_order: 2, pag_name: "Proveedores", pag_type: 2 },
  // database/migrations/0052_seed_contracts_pages_permissions.sql
  { pag_id: 16, pag_description: "Contratos", pag_parent: 13, pag_url: "work/contracts", pag_icon: "file-description", pag_order: 3, pag_name: "Contratos", pag_type: 2 },
  // database/migrations/0062_seed_reasons_suspensions_permissions.sql
  { pag_id: 17, pag_description: "Motivos", pag_parent: 5, pag_url: "admin/reasons", pag_icon: "message-report", pag_order: 8, pag_name: "Motivos", pag_type: 2 },
  // database/migrations/0069_seed_invoices_pages_permissions.sql
  { pag_id: 18, pag_description: "Facturación", pag_parent: 0, pag_url: null, pag_icon: "receipt", pag_order: 3, pag_name: "Facturación", pag_type: 1 },
  { pag_id: 19, pag_description: "Facturas", pag_parent: 18, pag_url: "billing/invoices", pag_icon: "invoice", pag_order: 1, pag_name: "Facturas", pag_type: 2 },
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
  // database/migrations/0032_seed_supervision_types_pages_permissions.sql
  { per_id: 38, per_name: "Crear tipo de interventoría", pag_id: 10, per_order: 1 },
  { per_id: 39, per_name: "Modificar tipo de interventoría", pag_id: 10, per_order: 2 },
  { per_id: 40, per_name: "Eliminar tipo de interventoría", pag_id: 10, per_order: 3 },
  { per_id: 41, per_name: "Cambiar estado tipo de interventoría", pag_id: 10, per_order: 4 },
  // database/migrations/0034_seed_construction_companies_pages_permissions.sql
  { per_id: 43, per_name: "Crear constructora", pag_id: 11, per_order: 1 },
  { per_id: 44, per_name: "Modificar constructora", pag_id: 11, per_order: 2 },
  { per_id: 45, per_name: "Eliminar constructora", pag_id: 11, per_order: 3 },
  { per_id: 46, per_name: "Cambiar estado constructora", pag_id: 11, per_order: 4 },
  // database/migrations/0037_seed_contract_types_pages_permissions.sql
  { per_id: 48, per_name: "Crear tipo de contrato", pag_id: 12, per_order: 1 },
  { per_id: 49, per_name: "Modificar tipo de contrato", pag_id: 12, per_order: 2 },
  { per_id: 50, per_name: "Eliminar tipo de contrato", pag_id: 12, per_order: 3 },
  { per_id: 51, per_name: "Cambiar estado tipo de contrato", pag_id: 12, per_order: 4 },
  // database/migrations/0057_seed_contract_type_fields_permissions.sql
  { per_id: 75, per_name: "Configurar campos del tipo de contrato", pag_id: 12, per_order: 6 },
  // database/migrations/0041_seed_works_pages_permissions.sql
  { per_id: 53, per_name: "Crear obra", pag_id: 14, per_order: 1 },
  { per_id: 54, per_name: "Modificar obra", pag_id: 14, per_order: 2 },
  { per_id: 55, per_name: "Eliminar obra", pag_id: 14, per_order: 3 },
  { per_id: 56, per_name: "Cambiar estado obra", pag_id: 14, per_order: 4 },
  { per_id: 57, per_name: "Asignar responsable de obra", pag_id: 14, per_order: 5 },
  { per_id: 58, per_name: "Retirar responsable de obra", pag_id: 14, per_order: 6 },
  { per_id: 59, per_name: "Gestionar etapas de obra", pag_id: 14, per_order: 7 },
  // database/migrations/0076_seed_view_all_works_permission.sql
  { per_id: 91, per_name: "Ver todas las obras", pag_id: 14, per_order: 9 },
  // database/migrations/0047_seed_providers_pages_permissions.sql
  { per_id: 61, per_name: "Crear proveedor", pag_id: 15, per_order: 1 },
  { per_id: 62, per_name: "Modificar proveedor", pag_id: 15, per_order: 2 },
  { per_id: 63, per_name: "Eliminar proveedor", pag_id: 15, per_order: 3 },
  { per_id: 64, per_name: "Cambiar estado proveedor", pag_id: 15, per_order: 4 },
  { per_id: 65, per_name: "Cambiar identificación de proveedor", pag_id: 15, per_order: 5 },
  { per_id: 66, per_name: "Asignar proveedor a obra", pag_id: 15, per_order: 6 },
  { per_id: 67, per_name: "Desasignar proveedor de obra", pag_id: 15, per_order: 7 },
  // database/migrations/0052_seed_contracts_pages_permissions.sql
  { per_id: 69, per_name: "Crear contrato", pag_id: 16, per_order: 1 },
  { per_id: 70, per_name: "Modificar contrato", pag_id: 16, per_order: 2 },
  { per_id: 71, per_name: "Eliminar contrato", pag_id: 16, per_order: 3 },
  { per_id: 72, per_name: "Crear otrosí", pag_id: 16, per_order: 4 },
  { per_id: 73, per_name: "Crear otrosí de liquidación", pag_id: 16, per_order: 5 },
  { per_id: 74, per_name: "Modificar concepto contractual", pag_id: 16, per_order: 6 },
  // database/migrations/0062_seed_reasons_suspensions_permissions.sql
  { per_id: 76, per_name: "Suspender contrato", pag_id: 16, per_order: 7 },
  { per_id: 77, per_name: "Levantar suspensión de contrato", pag_id: 16, per_order: 9 },
  // database/migrations/0074_seed_contract_aiu_permission.sql
  { per_id: 90, per_name: "Cambiar solicitud de AIU del contrato", pag_id: 16, per_order: 10 },
  // database/migrations/0077_seed_reconciliation_permission.sql
  { per_id: 92, per_name: "Recibir conciliación de fechas fin de contratos", pag_id: 16, per_order: 11 },
  { per_id: 79, per_name: "Crear motivo", pag_id: 17, per_order: 1 },
  { per_id: 80, per_name: "Modificar motivo", pag_id: 17, per_order: 2 },
  { per_id: 81, per_name: "Eliminar motivo", pag_id: 17, per_order: 3 },
  { per_id: 82, per_name: "Cambiar estado motivo", pag_id: 17, per_order: 4 },
  { per_id: 84, per_name: "Crear factura", pag_id: 19, per_order: 1 },
  { per_id: 85, per_name: "Modificar factura", pag_id: 19, per_order: 2 },
  { per_id: 86, per_name: "Aprobar factura", pag_id: 19, per_order: 3 },
  { per_id: 87, per_name: "Anular factura", pag_id: 19, per_order: 4 },
  { per_id: 88, per_name: "Anular factura aprobada", pag_id: 19, per_order: 5 },
  // database/migrations/0072_seed_adjust_amortization_permission.sql
  { per_id: 89, per_name: "Ajustar amortización de anticipo", pag_id: 19, per_order: 6 },
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
  { per_id: 37, per_name: "Ver tipos de interventoría", pag_id: 10, per_order: 5 },
  { per_id: 42, per_name: "Ver constructoras", pag_id: 11, per_order: 5 },
  { per_id: 47, per_name: "Ver tipos de contrato", pag_id: 12, per_order: 5 },
  { per_id: 52, per_name: "Ver obras", pag_id: 14, per_order: 8 },
  { per_id: 60, per_name: "Ver proveedores", pag_id: 15, per_order: 8 },
  { per_id: 68, per_name: "Ver contratos", pag_id: 16, per_order: 8 },
  { per_id: 78, per_name: "Ver motivos", pag_id: 17, per_order: 5 },
  { per_id: 83, per_name: "Ver facturas", pag_id: 19, per_order: 7 },
];

// Perfil sembrado como superadmin en esta sesión (ver tbl_profiles). No hay
// ningún bypass de código para este id en ningún lado (cliente ni
// servidor) — su acceso total sale únicamente de que este seed le otorgue
// todos los permisos existentes vía tbl_profile_permissions; sin estas
// filas también vería el sidebar vacío, igual que cualquier otro perfil.
const SUPERADMIN_PROFILE_ID = 1;

// Catálogo de estados (migraciones 0010 y 0058). Ids fijos con su clave
// simbólica, los mismos de src/common/constants/status.constants.js (DEC-038;
// un test los cruza). `update` solo fija la clave, para no pisar nombres o
// colores ya personalizados en una BD existente.
const STATUSES = [
  { sta_id: 1, sta_name: "Activo", sta_key: "ACTIVE", sta_scope: "GENERAL", sta_color: "success", sta_order: 1 },
  { sta_id: 2, sta_name: "Inactivo", sta_key: "INACTIVE", sta_scope: "GENERAL", sta_color: "warning", sta_order: 2 },
  { sta_id: 3, sta_name: "Eliminado", sta_key: "DELETED", sta_scope: "GENERAL", sta_color: "error", sta_order: 3 },
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

// Tipos de interventoría iniciales (database/migrations/0031_seed_supervision_types.sql).
const SUPERVISION_TYPES = [
  { spt_id: 1, spt_name: "Técnica", sta_id: 1 },
  { spt_id: 2, spt_name: "Administrativa", sta_id: 1 },
  { spt_id: 3, spt_name: "Financiera", sta_id: 1 },
  { spt_id: 4, spt_name: "Integral", sta_id: 1 },
];

// Catálogo cerrado de campos configurables del contrato
// (database/migrations/0053_create_contract_fields.sql, DEC-037). Versionado
// con el código: cada clave tiene su columna en
// src/modules/admin/contractTypes/contractFields.js. Se actualiza siempre.
const CONTRACT_FIELDS = [
  { cfd_id: 1, cfd_key: "STAGE", cfd_label: "Etapa", cfd_data_type: "SELECT", cfd_group: "CONTRACT", cfd_order: 1 },
  { cfd_id: 2, cfd_key: "OBSERVATION", cfd_label: "Observaciones", cfd_data_type: "TEXTAREA", cfd_group: "CONTRACT", cfd_order: 2 },
  { cfd_id: 3, cfd_key: "CONCEPT_DESCRIPTION", cfd_label: "Objeto o descripción del otrosí", cfd_data_type: "TEXTAREA", cfd_group: "CONCEPT", cfd_order: 1 },
  { cfd_id: 4, cfd_key: "ADMIN_PCT", cfd_label: "Administración", cfd_data_type: "PERCENT", cfd_group: "CONCEPT", cfd_order: 2 },
  { cfd_id: 5, cfd_key: "CONTINGENCY_PCT", cfd_label: "Imprevistos", cfd_data_type: "PERCENT", cfd_group: "CONCEPT", cfd_order: 3 },
  { cfd_id: 6, cfd_key: "PROFIT_PCT", cfd_label: "Utilidad", cfd_data_type: "PERCENT", cfd_group: "CONCEPT", cfd_order: 4 },
  { cfd_id: 7, cfd_key: "VAT_PCT", cfd_label: "IVA", cfd_data_type: "PERCENT", cfd_group: "CONCEPT", cfd_order: 5 },
  { cfd_id: 8, cfd_key: "ADVANCE_PCT", cfd_label: "Anticipo", cfd_data_type: "PERCENT", cfd_group: "CONCEPT", cfd_order: 6 },
  { cfd_id: 9, cfd_key: "RETENTION_PCT", cfd_label: "Retenido", cfd_data_type: "PERCENT", cfd_group: "CONCEPT", cfd_order: 7 },
];

async function main() {
  for (const status of STATUSES) {
    await prisma.tbl_status.upsert({
      where: { sta_id: status.sta_id },
      update: { sta_key: status.sta_key },
      create: status,
    });
  }
  console.log(`tbl_status: ${STATUSES.length} estados sembrados (de los existentes solo se fija la clave).`);

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

  for (const supervisionType of SUPERVISION_TYPES) {
    await prisma.tbl_supervision_types.upsert({
      where: { spt_id: supervisionType.spt_id },
      update: {},
      create: supervisionType,
    });
  }
  console.log(`tbl_supervision_types: ${SUPERVISION_TYPES.length} tipos sembrados (los existentes no se modifican).`);

  for (const field of CONTRACT_FIELDS) {
    await prisma.tbl_contract_fields.upsert({ where: { cfd_id: field.cfd_id }, update: field, create: field });
  }
  console.log(`tbl_contract_fields: ${CONTRACT_FIELDS.length} campos configurables sembrados/actualizados.`);

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
