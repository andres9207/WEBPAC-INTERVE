-- Migración 0119: extractos (actas) como entidad
--
-- Requiere: 0066 (tbl_invoices, inv_statement), 0094 (toda factura con obra),
-- 0111 (grupo "Inicio", página 13) y 0117 (per_id hasta 117) ya aplicados.
--
-- DEC-084 (pedido del usuario, 2026-10-26; documento de alcance de Intervé,
-- punto 7, "Control de Extractos"): el extracto deja de ser un texto libre de
-- la factura y pasa a ser un registro de la obra, como el acta de WebPAC
-- (tblcontrolactas): número único en la obra, fecha, número de comunicado y
-- descripción. Las columnas de valor, anticipo y amortización del acta de
-- WebPAC son del fondo rotatorio y la fiducia, fuera del alcance: no se crean.
--
-- 1. tbl_statements, con las seis columnas de autoría, eliminación lógica,
--    idempotencia y el número único en la obra entre no eliminados
--    (columna generada + UNIQUE). UNIQUE (stm_id, wrk_id) para la FK
--    compuesta de la factura.
-- 2. tbl_invoices.stm_id, con FK compuesta (stm_id, wrk_id): el extracto de
--    una factura es de su misma obra.
-- 3. Datos: cada texto de extracto distinto de una obra pasa a ser un
--    extracto, con la fecha de la primera de sus facturas, y la factura
--    apunta a él. Después se elimina inv_statement.
-- 4. Página 21 "Extractos" en el grupo Inicio y permisos 118 a 122. Quien
--    tiene la página de Facturas (18) recibe la de Extractos; los permisos
--    no se otorgan aquí: `yarn db:seed` los da al perfil Superadmin.
--
-- Después: `npx prisma db pull` (o el schema.prisma versionado).

CREATE TABLE `tbl_statements` (
  `stm_id` int NOT NULL AUTO_INCREMENT,
  `wrk_id` int NOT NULL,
  `stm_number` varchar(20) NOT NULL COMMENT 'Número del extracto, único en la obra entre no eliminados',
  `stm_date` date NOT NULL,
  `stm_communication` varchar(50) DEFAULT NULL COMMENT 'Número del comunicado con que se oficializó',
  `stm_description` varchar(500) DEFAULT NULL,
  `sta_id` int NOT NULL DEFAULT 1,
  `stm_create_by` int DEFAULT NULL,
  `stm_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `stm_update_by` int DEFAULT NULL,
  `stm_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `stm_delete_by` int DEFAULT NULL,
  `stm_delete_at` timestamp NULL DEFAULT NULL,
  `stm_idempotency_key` char(36) DEFAULT NULL,
  `stm_idempotency_hash` char(64) DEFAULT NULL,
  `stm_number_active` varchar(20) GENERATED ALWAYS AS (IF(`sta_id` <> 3, `stm_number`, NULL)) VIRTUAL,
  PRIMARY KEY (`stm_id`),
  UNIQUE INDEX `uq_statements_id_work` (`stm_id`, `wrk_id`),
  UNIQUE INDEX `uq_statements_work_number_active` (`wrk_id`, `stm_number_active`),
  UNIQUE INDEX `uq_statements_idempotency_key` (`stm_idempotency_key`),
  INDEX `idx_statements_work_date` (`wrk_id`, `stm_date`)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_statements`
ADD CONSTRAINT `tbl_statements_work` FOREIGN KEY (`wrk_id`) REFERENCES `tbl_works` (`wrk_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_statements_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`),
ADD CONSTRAINT `tbl_statements_create_by` FOREIGN KEY (`stm_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_statements_update_by` FOREIGN KEY (`stm_update_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_statements_delete_by` FOREIGN KEY (`stm_delete_by`) REFERENCES `tbl_users` (`use_id`);

ALTER TABLE `tbl_invoices`
ADD COLUMN `stm_id` int DEFAULT NULL COMMENT 'Extracto de la obra (DEC-084)' AFTER `inv_voucher_number`;

-- 3. Del texto a la entidad. El número admite 20 caracteres: el texto se
-- recorta, y dos textos que coinciden en esos 20 quedan en un mismo extracto.
INSERT INTO `tbl_statements` (`wrk_id`, `stm_number`, `stm_date`, `stm_description`)
SELECT `wrk_id`, LEFT(TRIM(`inv_statement`), 20), MIN(`inv_date`), 'Creado desde el extracto escrito en las facturas (migración 0119).'
FROM `tbl_invoices`
WHERE `inv_statement` IS NOT NULL AND TRIM(`inv_statement`) <> ''
GROUP BY `wrk_id`, LEFT(TRIM(`inv_statement`), 20);

UPDATE `tbl_invoices` `i`
JOIN `tbl_statements` `s` ON `s`.`wrk_id` = `i`.`wrk_id` AND `s`.`stm_number` = LEFT(TRIM(`i`.`inv_statement`), 20)
SET `i`.`stm_id` = `s`.`stm_id`
WHERE `i`.`inv_statement` IS NOT NULL AND TRIM(`i`.`inv_statement`) <> '';

ALTER TABLE `tbl_invoices`
ADD CONSTRAINT `tbl_invoices_statement` FOREIGN KEY (`stm_id`, `wrk_id`) REFERENCES `tbl_statements` (`stm_id`, `wrk_id`) ON DELETE RESTRICT,
DROP COLUMN `inv_statement`;

-- 4. Menú y permisos.
INSERT INTO `tbl_pages` (`pag_id`, `pag_description`, `pag_parent`, `pag_url`, `pag_icon`, `pag_order`, `pag_name`, `pag_type`) VALUES
(21, 'Extractos', 13, 'billing/statements', 'invoice', 6, 'Extractos', 2);

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(118, 'Ver extractos', 21, 0),
(119, 'Crear extracto', 21, 1),
(120, 'Modificar extracto', 21, 2),
(121, 'Eliminar extracto', 21, 3),
(122, 'Exportar extractos', 21, 4);

INSERT INTO `tbl_page_permissions` (`pro_id`, `pag_id`)
SELECT DISTINCT pp.`pro_id`, 21
FROM `tbl_page_permissions` pp
WHERE pp.`pag_id` = 18
  AND NOT EXISTS (SELECT 1 FROM `tbl_page_permissions` x WHERE x.`pro_id` = pp.`pro_id` AND x.`pag_id` = 21);

INSERT INTO `tbl_user_pages` (`use_id`, `pag_id`)
SELECT DISTINCT up.`use_id`, 21
FROM `tbl_user_pages` up
WHERE up.`pag_id` = 18
  AND NOT EXISTS (SELECT 1 FROM `tbl_user_pages` x WHERE x.`use_id` = up.`use_id` AND x.`pag_id` = 21);
