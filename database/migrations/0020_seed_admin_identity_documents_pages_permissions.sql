-- Migración 0020: página "Administración > Tipos de identificación" y sus
-- permisos
--
-- Requiere: 0001_seed_pages_permissions.sql y 0003_seed_view_permissions.sql
-- ya aplicados (pag_id 1–4, per_id hasta 16).
--
-- Ids explícitos y fijos: coinciden con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js. Nunca se reutilizan
-- los per_id retirados (10, 15, 16).
--
-- pag_url igual a la ruta del cliente (client/src/routes/MainRoutes.jsx).
-- pag_type: 1 = grupo del sidebar, 2 = página.
--
-- Asignación a perfiles: no va aquí, porque depende de qué perfiles existan.
-- server/prisma/seed.js (`yarn db:seed`) otorga las páginas y los permisos
-- de gestión (18, 19, 20) al perfil Superadmin, y el de ver (17) a todos los
-- perfiles.

INSERT INTO `tbl_pages` (`pag_id`, `pag_description`, `pag_parent`, `pag_url`, `pag_icon`, `pag_order`, `pag_name`, `pag_type`) VALUES
(5, 'Administración', 0, NULL, 'settings', 3, 'Administración', 1),
(6, 'Tipos de identificación', 5, 'admin/identityDocuments', 'id-card', 1, 'Tipos de identificación', 2);

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(17, 'Ver tipos de identificación', 6, 5),
(18, 'Crear tipo de identificación', 6, 1),
(19, 'Modificar tipo de identificación', 6, 2),
(20, 'Eliminar tipo de identificación', 6, 3);
