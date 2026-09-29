-- Migración 0029: página "Administración > Aseguradoras" y sus permisos
--
-- Requiere: 0027 ya aplicado (pag_id hasta 8, per_id hasta 31).
--
-- Ids explícitos y fijos: coinciden con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.admin.insurers). pag_url igual a la ruta del cliente.
--
-- Asignación a perfiles: server/prisma/seed.js (`yarn db:seed`) otorga la
-- página y los permisos de gestión (33 a 36) al perfil Superadmin, y el de
-- ver (32) a todos los perfiles.

INSERT INTO `tbl_pages` (`pag_id`, `pag_description`, `pag_parent`, `pag_url`, `pag_icon`, `pag_order`, `pag_name`, `pag_type`) VALUES
(9, 'Aseguradoras', 5, 'admin/insurers', 'umbrella', 4, 'Aseguradoras', 2);

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(32, 'Ver aseguradoras', 9, 5),
(33, 'Crear aseguradora', 9, 1),
(34, 'Modificar aseguradora', 9, 2),
(35, 'Eliminar aseguradora', 9, 3),
(36, 'Cambiar estado aseguradora', 9, 4);
