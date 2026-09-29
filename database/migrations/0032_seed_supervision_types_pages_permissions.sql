-- Migración 0032: página "Administración > Tipos de interventoría" y sus
-- permisos
--
-- Requiere: 0029 ya aplicado (pag_id hasta 9, per_id hasta 36).
--
-- Ids explícitos y fijos: coinciden con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.admin.supervisionTypes). pag_url igual a la ruta del cliente.
--
-- Asignación a perfiles: server/prisma/seed.js (`yarn db:seed`) otorga la
-- página y los permisos de gestión (38 a 41) al perfil Superadmin, y el de
-- ver (37) a todos los perfiles.

INSERT INTO `tbl_pages` (`pag_id`, `pag_description`, `pag_parent`, `pag_url`, `pag_icon`, `pag_order`, `pag_name`, `pag_type`) VALUES
(10, 'Tipos de interventoría', 5, 'admin/supervisionTypes', 'eye', 5, 'Tipos de interventoría', 2);

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(37, 'Ver tipos de interventoría', 10, 5),
(38, 'Crear tipo de interventoría', 10, 1),
(39, 'Modificar tipo de interventoría', 10, 2),
(40, 'Eliminar tipo de interventoría', 10, 3),
(41, 'Cambiar estado tipo de interventoría', 10, 4);
