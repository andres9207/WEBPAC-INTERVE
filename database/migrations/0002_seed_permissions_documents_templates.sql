-- Migración 0002: permisos de gestión de documentos y plantillas
--
-- Requiere: bdtemplate.sql y 0001_seed_pages_permissions.sql ya aplicados.
-- Autocontenida: no depende de que existan filas en tbl_profiles/tbl_users.
--
-- Estos dos permisos no cuelgan de ninguna página del sidebar (pag_id NULL)
-- porque document.routes.js/template.routes.js no tienen una página propia
-- en tbl_pages hoy (documents se usa embebido en el diálogo de usuario, hoy
-- deshabilitado en el cliente; templates es un módulo del template original
-- sin UI real). Aun así las rutas están montadas y son invocables por
-- cualquier usuario autenticado, así que llevan requirePermission igual.
--
-- Ids explícitos y fijos a propósito: coinciden 1:1 con
-- client/src/contexts/permissions/permissionsConfig.js y con
-- server/src/common/constants/permissions.constants.js. No renumerar.
--
-- Nota: la asignación de estos permisos al perfil Superadmin (pro_id=1) NO
-- va acá (dependería de que ese perfil ya exista) — la hace
-- server/prisma/seed.js (`yarn db:seed`).

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(9, 'Gestionar documentos', NULL, 1),
(10, 'Gestionar plantillas', NULL, 1);
