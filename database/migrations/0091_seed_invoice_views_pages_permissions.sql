-- Migración 0091: menú "Facturas" con tres vistas y un permiso de ver por vista
--
-- Requiere: 0069, 0072, 0082, 0084 y 0087 ya aplicados (pag_id hasta 20,
-- per_id hasta 104).
--
-- DEC-054. Ids explícitos y fijos: coinciden con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.billing.invoices). pag_url igual a la ruta del cliente.
--
-- 1. El grupo 18 pasa a llamarse "Facturas" y tiene tres páginas: facturas
--    simples (21), de contrato mayor (22) y de subcontratistas (23). La
--    página 19 ("Facturas", todas juntas) se retira.
-- 2. Un permiso de ver por vista: 105, 106 y 107. Reemplazan al 83 ("Ver
--    facturas"), que se retira; no se reutiliza el número.
-- 3. Las acciones (crear, modificar, aprobar, anular, anular aprobada y los
--    dos ajustes: 84 a 89 y 103) son comunes a las tres vistas: pasan al
--    grupo 18. Operar sobre una factura exige además ver su vista.
-- 4. Nadie pierde acceso: quien tenía la página 19 recibe las tres nuevas, y
--    quien tenía el 83 (por perfil o por excepción), los tres permisos.

UPDATE `tbl_pages` SET `pag_description` = 'Facturas', `pag_name` = 'Facturas' WHERE `pag_id` = 18;

INSERT INTO `tbl_pages` (`pag_id`, `pag_description`, `pag_parent`, `pag_url`, `pag_icon`, `pag_order`, `pag_name`, `pag_type`) VALUES
(21, 'Facturas simples', 18, 'billing/invoices/simple', 'invoice', 1, 'Facturas simples', 2),
(22, 'Facturas contrato mayor', 18, 'billing/invoices/major', 'invoice', 2, 'Facturas contrato mayor', 2),
(23, 'Facturas subcontratistas', 18, 'billing/invoices/subcontractors', 'invoice', 3, 'Facturas subcontratistas', 2);

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(105, 'Ver facturas simples', 21, 1),
(106, 'Ver facturas de contrato mayor', 22, 1),
(107, 'Ver facturas de subcontratistas', 23, 1);

UPDATE `tbl_permissions` SET `pag_id` = 18 WHERE `per_id` IN (84, 85, 86, 87, 88, 89, 103);

INSERT INTO `tbl_page_permissions` (`pro_id`, `pag_id`)
SELECT `pp`.`pro_id`, `p`.`pag_id`
FROM `tbl_page_permissions` `pp`
CROSS JOIN (SELECT 21 AS `pag_id` UNION ALL SELECT 22 UNION ALL SELECT 23) `p`
WHERE `pp`.`pag_id` = 19;

INSERT INTO `tbl_user_pages` (`use_id`, `pag_id`)
SELECT `up`.`use_id`, `p`.`pag_id`
FROM `tbl_user_pages` `up`
CROSS JOIN (SELECT 21 AS `pag_id` UNION ALL SELECT 22 UNION ALL SELECT 23) `p`
WHERE `up`.`pag_id` = 19;

INSERT INTO `tbl_profile_permissions` (`per_id`, `pro_id`)
SELECT `v`.`per_id`, `pp`.`pro_id`
FROM `tbl_profile_permissions` `pp`
CROSS JOIN (SELECT 105 AS `per_id` UNION ALL SELECT 106 UNION ALL SELECT 107) `v`
WHERE `pp`.`per_id` = 83;

INSERT INTO `tbl_user_permissions` (`per_id`, `use_id`)
SELECT `v`.`per_id`, `up`.`use_id`
FROM `tbl_user_permissions` `up`
CROSS JOIN (SELECT 105 AS `per_id` UNION ALL SELECT 106 UNION ALL SELECT 107) `v`
WHERE `up`.`per_id` = 83;

DELETE FROM `tbl_profile_permissions` WHERE `per_id` = 83;
DELETE FROM `tbl_user_permissions` WHERE `per_id` = 83;
DELETE FROM `tbl_permissions` WHERE `per_id` = 83;

DELETE FROM `tbl_page_permissions` WHERE `pag_id` = 19;
DELETE FROM `tbl_user_pages` WHERE `pag_id` = 19;
DELETE FROM `tbl_pages` WHERE `pag_id` = 19;
