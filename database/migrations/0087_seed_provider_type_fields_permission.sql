-- Migración 0087: permiso "Configurar campos del tipo de proveedor"; retira el 75
--
-- Requiere: 0084 ya aplicado (per_id hasta 103) y 0086.
--
-- DEC-053. Id explícito y fijo: coincide con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.admin.providerTypes.configureFields).
--
-- 1. Permiso 104, aparte de modificar el tipo: la configuración decide los
--    campos de todos los contratos de los proveedores de ese tipo, también
--    de los vigentes. Ver la configuración exige solo ver tipos de proveedor (22).
-- 2. Quien podía configurar los campos del tipo de contrato (75) pasa a
--    poder configurar los del tipo de proveedor (104): se copian sus
--    asignaciones a perfiles y usuarios. Sin esto, el editor quedaría en solo
--    lectura para todos hasta asignar el 104 a mano.
-- 3. El 75 ("Configurar campos del tipo de contrato") se retira con sus
--    asignaciones a perfiles y usuarios. No se reutiliza el número: la
--    bitácora de permisos seguiría diciendo 75 para el acto anterior.
--
-- Asignación a perfiles: server/prisma/seed.js (`yarn db:seed`) lo otorga al
-- perfil Superadmin, como los demás permisos de gestión.

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(104, 'Configurar campos del tipo de proveedor', 7, 6);

INSERT INTO `tbl_profile_permissions` (`per_id`, `pro_id`)
SELECT 104, `pro_id` FROM `tbl_profile_permissions` WHERE `per_id` = 75;

INSERT INTO `tbl_user_permissions` (`per_id`, `use_id`)
SELECT 104, `use_id` FROM `tbl_user_permissions` WHERE `per_id` = 75;

DELETE FROM `tbl_profile_permissions` WHERE `per_id` = 75;
DELETE FROM `tbl_user_permissions` WHERE `per_id` = 75;
DELETE FROM `tbl_permissions` WHERE `per_id` = 75;
