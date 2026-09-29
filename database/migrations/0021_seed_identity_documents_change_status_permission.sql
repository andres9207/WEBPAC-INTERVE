-- Migración 0021: permiso "Cambiar estado tipo de identificación"
--
-- Requiere: 0020_seed_admin_identity_documents_pages_permissions.sql ya
-- aplicado (pag_id 6).
--
-- Respalda ADR-0008 (sección "Autorización") y el patrón de maestro
-- (MAE-BE-01): activar o desactivar es una acción propia, con su permiso,
-- separada de editar, porque desactivar impide asignar el tipo en registros
-- nuevos (ADR-0003 y siguientes). Desde este cambio, save_identity_document
-- no modifica el estado; lo hace PUT change_status_identity_document.
--
-- Id fijo: coincide con server/prisma/seed.js y con
-- permissions.constants.js (PERMISSIONS.admin.identityDocuments.changeStatus).
-- Es un permiso de gestión: seed.js lo otorga solo al perfil Superadmin.

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(21, 'Cambiar estado tipo de identificación', 6, 4);
