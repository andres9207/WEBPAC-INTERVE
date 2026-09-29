-- Migración 0034: página "Administración > Constructoras" y sus permisos
--
-- Requiere: 0032 ya aplicado (pag_id hasta 10, per_id hasta 41).
--
-- Ids explícitos y fijos: coinciden con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.admin.constructionCompanies). pag_url igual a la ruta del
-- cliente.
--
-- Asignación a perfiles: server/prisma/seed.js (`yarn db:seed`) otorga la
-- página y los permisos de gestión (43 a 46) al perfil Superadmin, y el de
-- ver (42) a todos los perfiles.

INSERT INTO `tbl_pages` (`pag_id`, `pag_description`, `pag_parent`, `pag_url`, `pag_icon`, `pag_order`, `pag_name`, `pag_type`) VALUES
(11, 'Constructoras', 5, 'admin/constructionCompanies', 'building', 6, 'Constructoras', 2);

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(42, 'Ver constructoras', 11, 5),
(43, 'Crear constructora', 11, 1),
(44, 'Modificar constructora', 11, 2),
(45, 'Eliminar constructora', 11, 3),
(46, 'Cambiar estado constructora', 11, 4);
