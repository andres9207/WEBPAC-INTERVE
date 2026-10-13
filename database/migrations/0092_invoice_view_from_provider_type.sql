-- Migración 0092: el menú de facturas pasa al tipo de proveedor, y cada factura guarda el suyo
--
-- Requiere: 0022 (tbl_provider_types), 0063 (tbl_provider_classifications),
-- 0065 (tbl_invoices) y 0090 (ctt_invoice_view) ya aplicados.
--
-- DEC-056 (reemplaza lo de DEC-054 sobre el menú del tipo de contrato):
--
-- 1. tbl_provider_types.pvt_invoice_view: MAJOR (menú "Facturas contrato
--    mayor"), SUBCONTRACTOR (menú "Facturas subcontratistas") o NULL (sin
--    menú: sus proveedores no admiten facturas de contrato, salvo que otro de
--    sus tipos lo tenga). Un proveedor no puede tener tipos con menús
--    distintos: lo verifica el service.
--    Datos: los tipos no eliminados se marcan por su nombre ("subcontrat" →
--    SUBCONTRACTOR, "mayor" → MAJOR); los demás quedan sin menú.
--
-- 2. tbl_invoices.inv_view: el menú de la factura, fijado al registrarla.
--    SIMPLE en la factura simple; en las de contrato, el menú de los tipos de
--    su proveedor. Si después cambia el menú del proveedor, el usuario decide
--    moverlas todas o dejarlas como histórico (lo hace el service).
--    Datos: cada factura conserva la vista que tenía, la del tipo de su
--    contrato (ninguna cambia de menú con esta migración). Si alguna de
--    contrato no la tuviera, toma el menú de su proveedor y, en último caso,
--    MAJOR.
--    ck_invoices_view: dominio cerrado, y SIMPLE si y solo si la factura es
--    simple.
--
-- 3. Se retira tbl_contract_types.ctt_invoice_view con su CHECK.
--
-- Revisar después de aplicarla: el SELECT final lista los proveedores que
-- quedaron con tipos de menús distintos (deben corregirse en su ficha).

ALTER TABLE `tbl_provider_types`
ADD COLUMN `pvt_invoice_view` varchar(20) DEFAULT NULL AFTER `pvt_name`,
ADD CONSTRAINT `ck_provider_types_invoice_view` CHECK (`pvt_invoice_view` IS NULL OR `pvt_invoice_view` IN ('MAJOR', 'SUBCONTRACTOR'));

UPDATE `tbl_provider_types` SET `pvt_invoice_view` = 'SUBCONTRACTOR'
WHERE `sta_id` <> 3 AND LOWER(`pvt_name`) LIKE '%subcontrat%';

UPDATE `tbl_provider_types` SET `pvt_invoice_view` = 'MAJOR'
WHERE `sta_id` <> 3 AND `pvt_invoice_view` IS NULL AND LOWER(`pvt_name`) LIKE '%mayor%';

ALTER TABLE `tbl_invoices`
ADD COLUMN `inv_view` varchar(20) DEFAULT NULL AFTER `inv_type`;

UPDATE `tbl_invoices` SET `inv_view` = 'SIMPLE' WHERE `inv_type` = 'SIMPLE';

UPDATE `tbl_invoices` `i`
JOIN `tbl_contracts` `c` ON `c`.`ctr_id` = `i`.`ctr_id`
JOIN `tbl_contract_types` `t` ON `t`.`ctt_id` = `c`.`ctt_id`
SET `i`.`inv_view` = `t`.`ctt_invoice_view`
WHERE `i`.`inv_type` <> 'SIMPLE' AND `t`.`ctt_invoice_view` IS NOT NULL;

UPDATE `tbl_invoices` `i`
SET `i`.`inv_view` = COALESCE(
  (SELECT MIN(`pt`.`pvt_invoice_view`)
   FROM `tbl_provider_classifications` `pc`
   JOIN `tbl_provider_types` `pt` ON `pt`.`pvt_id` = `pc`.`pvt_id`
   WHERE `pc`.`prv_id` = `i`.`prv_id` AND `pt`.`pvt_invoice_view` IS NOT NULL),
  'MAJOR')
WHERE `i`.`inv_view` IS NULL;

ALTER TABLE `tbl_invoices`
MODIFY COLUMN `inv_view` varchar(20) NOT NULL,
ADD CONSTRAINT `ck_invoices_view` CHECK (
  `inv_view` IN ('SIMPLE', 'MAJOR', 'SUBCONTRACTOR')
  AND ((`inv_type` = 'SIMPLE') = (`inv_view` = 'SIMPLE'))
),
ADD KEY `idx_invoices_view` (`inv_view`);

ALTER TABLE `tbl_contract_types`
DROP CHECK `ck_contract_types_invoice_view`,
DROP COLUMN `ctt_invoice_view`;

-- Proveedores con tipos de menús distintos (debe salir vacío).
SELECT `pc`.`prv_id`, GROUP_CONCAT(DISTINCT `pt`.`pvt_invoice_view`) AS `menus`
FROM `tbl_provider_classifications` `pc`
JOIN `tbl_provider_types` `pt` ON `pt`.`pvt_id` = `pc`.`pvt_id`
WHERE `pt`.`pvt_invoice_view` IS NOT NULL
GROUP BY `pc`.`prv_id`
HAVING COUNT(DISTINCT `pt`.`pvt_invoice_view`) > 1;
