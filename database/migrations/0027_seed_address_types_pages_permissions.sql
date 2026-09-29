-- Migración 0027: página "Administración > Tipos de dirección" y sus permisos
--
-- Requiere: 0024 ya aplicado (pag_id hasta 7, per_id hasta 26).
--
-- Ids explícitos y fijos: coinciden con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.admin.addressTypes). pag_url igual a la ruta del cliente.
--
-- Asignación a perfiles: server/prisma/seed.js (`yarn db:seed`) otorga la
-- página y los permisos de gestión (28 a 31) al perfil Superadmin, y el de
-- ver (27) a todos los perfiles.

INSERT INTO `tbl_pages` (`pag_id`, `pag_description`, `pag_parent`, `pag_url`, `pag_icon`, `pag_order`, `pag_name`, `pag_type`) VALUES
(8, 'Tipos de dirección', 5, 'admin/addressTypes', 'map-pin', 3, 'Tipos de dirección', 2);

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(27, 'Ver tipos de dirección', 8, 5),
(28, 'Crear tipo de dirección', 8, 1),
(29, 'Modificar tipo de dirección', 8, 2),
(30, 'Eliminar tipo de dirección', 8, 3),
(31, 'Cambiar estado tipo de dirección', 8, 4);
