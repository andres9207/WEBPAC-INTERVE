-- Migración 0037: página "Administración > Tipos de contrato" y sus permisos
--
-- Requiere: 0034 ya aplicado (pag_id hasta 11, per_id hasta 46).
--
-- Ids explícitos y fijos: coinciden con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.admin.contractTypes). pag_url igual a la ruta del cliente.
--
-- Asignación a perfiles: server/prisma/seed.js (`yarn db:seed`) otorga la
-- página y los permisos de gestión (48 a 51) al perfil Superadmin, y el de
-- ver (47) a todos los perfiles.

INSERT INTO `tbl_pages` (`pag_id`, `pag_description`, `pag_parent`, `pag_url`, `pag_icon`, `pag_order`, `pag_name`, `pag_type`) VALUES
(12, 'Tipos de contrato', 5, 'admin/contractTypes', 'contract', 7, 'Tipos de contrato', 2);

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(47, 'Ver tipos de contrato', 12, 5),
(48, 'Crear tipo de contrato', 12, 1),
(49, 'Modificar tipo de contrato', 12, 2),
(50, 'Eliminar tipo de contrato', 12, 3),
(51, 'Cambiar estado tipo de contrato', 12, 4);
