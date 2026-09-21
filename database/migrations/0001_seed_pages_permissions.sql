-- Migración 0001: catálogo inicial de páginas y permisos (RBAC)
--
-- Requiere: bdtemplate.sql ya aplicado (tbl_pages/tbl_permissions deben existir).
-- Autocontenida: no depende de que existan filas en tbl_profiles/tbl_users,
-- así que se puede aplicar sobre una BD recién provisionada.
--
-- Ids explícitos y fijos a propósito: coinciden 1:1 con
-- client/src/contexts/permissions/permissionsConfig.js (hardcodea per_id) y
-- con las rutas reales en client/src/routes/MainRoutes.jsx. No renumerar.
-- pag_type: 1 = página padre (grupo en el sidebar), 2 = página hija (item).
--
-- Nota: la asignación de estas páginas/permisos al perfil Superadmin
-- (pro_id=1) NO va acá (dependería de que ese perfil ya exista) — la hace
-- server/prisma/seed.js (`yarn db:seed`), que sí puede asumir una BD con
-- datos reales.

INSERT INTO `tbl_pages` (`pag_id`, `pag_description`, `pag_parent`, `pag_url`, `pag_icon`, `pag_order`, `pag_name`, `pag_type`) VALUES
(1, 'Dashboard', 0, 'home/default', 'dashboard', 1, 'Dashboard', 1),
(2, 'Seguridad', 0, NULL, 'shield', 2, 'Seguridad', 1),
(3, 'Perfiles', 2, 'security/profiles', 'id', 1, 'Perfiles', 2),
(4, 'Usuarios', 2, 'security/users', 'users', 2, 'Usuarios', 2);

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(1, 'Crear perfil', 3, 1),
(2, 'Modificar perfil', 3, 2),
(3, 'Eliminar perfil', 3, 3),
(4, 'Asignar permisos al perfil', 3, 4),
(5, 'Crear usuario', 4, 1),
(6, 'Modificar usuario', 4, 2),
(7, 'Eliminar usuario', 4, 3),
(8, 'Asignar permisos al usuario', 4, 4);
