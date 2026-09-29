-- Migración 0024: página "Administración > Tipos de proveedor" y sus permisos
--
-- Requiere: 0020 y 0021 ya aplicados (pag_id 5 "Administración", per_id
-- hasta 21).
--
-- Ids explícitos y fijos: coinciden con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.admin.providerTypes). pag_url igual a la ruta del cliente.
--
-- Asignación a perfiles: server/prisma/seed.js (`yarn db:seed`) otorga la
-- página y los permisos de gestión (23 a 26) al perfil Superadmin, y el de
-- ver (22) a todos los perfiles.

INSERT INTO `tbl_pages` (`pag_id`, `pag_description`, `pag_parent`, `pag_url`, `pag_icon`, `pag_order`, `pag_name`, `pag_type`) VALUES
(7, 'Tipos de proveedor', 5, 'admin/providerTypes', 'truck', 2, 'Tipos de proveedor', 2);

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(22, 'Ver tipos de proveedor', 7, 5),
(23, 'Crear tipo de proveedor', 7, 1),
(24, 'Modificar tipo de proveedor', 7, 2),
(25, 'Eliminar tipo de proveedor', 7, 3),
(26, 'Cambiar estado tipo de proveedor', 7, 4);
