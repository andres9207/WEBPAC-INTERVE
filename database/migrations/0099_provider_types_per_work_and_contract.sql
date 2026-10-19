-- Migración 0099: el tipo de proveedor se define en cada obra y en cada contrato
--
-- Requiere: 0046 (tbl_work_providers), 0049 (tbl_contracts), 0063
-- (tbl_provider_classifications), 0092 (pvt_invoice_view, inv_view) y 0094
-- (factura simple en una etapa de la obra) ya aplicados.
--
-- DEC-066 (reemplaza lo de DEC-056 sobre el menú del proveedor, cambia
-- DEC-053 y DEC-058):
--
-- 1. tbl_provider_types.pvt_invoice_view admite SIMPLE: el tipo que habilita
--    la factura simple. Quedan tres menús (MAJOR, SUBCONTRACTOR, SIMPLE) o
--    ninguno. Datos: el tipo no eliminado cuyo nombre contiene "simple" y no
--    tiene menú pasa a SIMPLE.
--
-- 2. tbl_work_provider_types (prefijo wpt_): con qué tipos trabaja el
--    proveedor en cada obra. Cualquier tipo, aunque el proveedor no lo tenga
--    en su maestro: los del maestro solo se proponen al asignarlo. Tabla de
--    unión sin columnas de autoría (README, regla 5): su cambio va a la
--    bitácora de la asignación. FK a la asignación ON DELETE CASCADE (no
--    existe sin ella; desasignar ya exige que no haya contratos ni facturas)
--    y al tipo ON DELETE RESTRICT. El UNIQUE (wrk_id, prv_id, pvt_id) es la
--    referencia de la FK del contrato.
--    Datos: cada asignación recibe los tipos actuales del proveedor, y la que
--    tiene facturas simples sin un tipo de menú SIMPLE recibe ese tipo.
--
-- 3. tbl_contracts.pvt_id: el tipo bajo el que se firma el contrato, uno de
--    los de su asignación (FK compuesta). Decide los campos del contrato y su
--    menú de facturas. Datos: el tipo del proveedor con menú de contrato
--    (MAJOR o SUBCONTRACTOR), prefiriendo el menú de las facturas que ya
--    tenga; si el proveedor no tiene ninguno, su primer tipo.
--
-- 4. tbl_contracts.ctr_invoice_view: el menú de facturas del contrato, fijado
--    al crearlo con el de su tipo. Cambiar el menú del tipo en el maestro no
--    lo mueve. NULL solo en los contratos anteriores cuyo proveedor no tenía
--    menú de contrato: siguen sin admitir facturas, como antes. Los nuevos
--    exigen un tipo con menú de contrato (lo verifica el service).
--    Las facturas existentes conservan su inv_view (hecho histórico).
--
-- Revisar después de aplicarla: los SELECT finales deben salir vacíos.

ALTER TABLE `tbl_provider_types`
DROP CHECK `ck_provider_types_invoice_view`;

ALTER TABLE `tbl_provider_types`
ADD CONSTRAINT `ck_provider_types_invoice_view` CHECK (`pvt_invoice_view` IS NULL OR `pvt_invoice_view` IN ('MAJOR', 'SUBCONTRACTOR', 'SIMPLE'));

UPDATE `tbl_provider_types` SET `pvt_invoice_view` = 'SIMPLE'
WHERE `sta_id` <> 3 AND `pvt_invoice_view` IS NULL AND LOWER(`pvt_name`) LIKE '%simple%';

CREATE TABLE `tbl_work_provider_types` (
  `wpt_id` int NOT NULL AUTO_INCREMENT,
  `wrk_id` int NOT NULL,
  `prv_id` int NOT NULL,
  `pvt_id` int NOT NULL,
  PRIMARY KEY (`wpt_id`) USING BTREE,
  UNIQUE INDEX `uq_work_provider_types_work_provider_type` (`wrk_id`, `prv_id`, `pvt_id`)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_work_provider_types`
ADD CONSTRAINT `tbl_work_provider_types_work_provider` FOREIGN KEY (`wrk_id`, `prv_id`) REFERENCES `tbl_work_providers` (`wrk_id`, `prv_id`) ON DELETE CASCADE,
ADD CONSTRAINT `tbl_work_provider_types_provider_type` FOREIGN KEY (`pvt_id`) REFERENCES `tbl_provider_types` (`pvt_id`) ON DELETE RESTRICT;

INSERT INTO `tbl_work_provider_types` (`wrk_id`, `prv_id`, `pvt_id`)
SELECT `wp`.`wrk_id`, `wp`.`prv_id`, `pc`.`pvt_id`
FROM `tbl_work_providers` `wp`
JOIN `tbl_provider_classifications` `pc` ON `pc`.`prv_id` = `wp`.`prv_id`;

INSERT INTO `tbl_work_provider_types` (`wrk_id`, `prv_id`, `pvt_id`)
SELECT DISTINCT `i`.`wrk_id`, `i`.`prv_id`,
  (SELECT MIN(`pt`.`pvt_id`) FROM `tbl_provider_types` `pt` WHERE `pt`.`pvt_invoice_view` = 'SIMPLE' AND `pt`.`sta_id` <> 3)
FROM `tbl_invoices` `i`
WHERE `i`.`inv_type` = 'SIMPLE'
  AND NOT EXISTS (
    SELECT 1 FROM `tbl_work_provider_types` `w`
    JOIN `tbl_provider_types` `pt` ON `pt`.`pvt_id` = `w`.`pvt_id`
    WHERE `w`.`wrk_id` = `i`.`wrk_id` AND `w`.`prv_id` = `i`.`prv_id` AND `pt`.`pvt_invoice_view` = 'SIMPLE'
  )
  AND EXISTS (SELECT 1 FROM `tbl_provider_types` `pt` WHERE `pt`.`pvt_invoice_view` = 'SIMPLE' AND `pt`.`sta_id` <> 3);

ALTER TABLE `tbl_contracts`
ADD COLUMN `pvt_id` int DEFAULT NULL AFTER `prv_id`,
ADD COLUMN `ctr_invoice_view` varchar(20) DEFAULT NULL AFTER `pvt_id`;

-- Tipo con menú de contrato: primero el del menú de sus facturas, luego cualquiera.
UPDATE `tbl_contracts` `c`
SET `c`.`pvt_id` = COALESCE(
  (SELECT MIN(`pc`.`pvt_id`)
   FROM `tbl_provider_classifications` `pc`
   JOIN `tbl_provider_types` `pt` ON `pt`.`pvt_id` = `pc`.`pvt_id`
   WHERE `pc`.`prv_id` = `c`.`prv_id`
     AND `pt`.`pvt_invoice_view` = (SELECT MAX(`i`.`inv_view`) FROM `tbl_invoices` `i` WHERE `i`.`ctr_id` = `c`.`ctr_id`)),
  (SELECT MIN(`pc`.`pvt_id`)
   FROM `tbl_provider_classifications` `pc`
   JOIN `tbl_provider_types` `pt` ON `pt`.`pvt_id` = `pc`.`pvt_id`
   WHERE `pc`.`prv_id` = `c`.`prv_id` AND `pt`.`pvt_invoice_view` IN ('MAJOR', 'SUBCONTRACTOR')),
  (SELECT MIN(`pc`.`pvt_id`) FROM `tbl_provider_classifications` `pc` WHERE `pc`.`prv_id` = `c`.`prv_id`)
);

UPDATE `tbl_contracts` `c`
JOIN `tbl_provider_types` `pt` ON `pt`.`pvt_id` = `c`.`pvt_id`
SET `c`.`ctr_invoice_view` = `pt`.`pvt_invoice_view`
WHERE `pt`.`pvt_invoice_view` IN ('MAJOR', 'SUBCONTRACTOR');

ALTER TABLE `tbl_contracts`
MODIFY COLUMN `pvt_id` int NOT NULL,
ADD CONSTRAINT `ck_contracts_invoice_view` CHECK (`ctr_invoice_view` IS NULL OR `ctr_invoice_view` IN ('MAJOR', 'SUBCONTRACTOR')),
ADD KEY `tbl_contracts_work_provider_type` (`wrk_id`, `prv_id`, `pvt_id`),
ADD KEY `idx_contracts_invoice_view` (`ctr_invoice_view`),
ADD CONSTRAINT `tbl_contracts_work_provider_type` FOREIGN KEY (`wrk_id`, `prv_id`, `pvt_id`) REFERENCES `tbl_work_provider_types` (`wrk_id`, `prv_id`, `pvt_id`) ON DELETE RESTRICT;

-- Contratos sin menú de facturas (anteriores, de proveedores sin tipo de contrato): informativo.
SELECT `ctr_id`, `prv_id`, `pvt_id` FROM `tbl_contracts` WHERE `ctr_invoice_view` IS NULL;

-- Asignaciones con facturas simples y sin tipo de menú SIMPLE (debe salir vacío).
SELECT DISTINCT `i`.`wrk_id`, `i`.`prv_id`
FROM `tbl_invoices` `i`
WHERE `i`.`inv_type` = 'SIMPLE'
  AND NOT EXISTS (
    SELECT 1 FROM `tbl_work_provider_types` `w`
    JOIN `tbl_provider_types` `pt` ON `pt`.`pvt_id` = `w`.`pvt_id`
    WHERE `w`.`wrk_id` = `i`.`wrk_id` AND `w`.`prv_id` = `i`.`prv_id` AND `pt`.`pvt_invoice_view` = 'SIMPLE'
  );
