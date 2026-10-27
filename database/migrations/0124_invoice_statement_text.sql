-- Migración 0124: el extracto de la factura vuelve a ser texto libre (DEC-084, revisada)
--
-- Requiere: 0119 (tbl_statements, tbl_invoices.stm_id) ya aplicado.
--
-- Pedido del usuario, 2026-10-27: en la factura el extracto es un campo
-- abierto, no un selector, y se agrupa después. El extracto de la obra
-- (tbl_statements) sigue: agrupa las facturas de su obra cuyo texto es su
-- número (la comparación sigue la intercalación de la columna: sin
-- distinguir mayúsculas ni tildes). Las glosas siguen apuntando a extractos.
--
-- 1. tbl_invoices.inv_statement, con el número del extracto que tenía cada
--    factura. Admite 20 caracteres, como stm_number: un texto más largo no
--    podría coincidir con ningún extracto.
-- 2. Se quitan la FK compuesta, su índice y stm_id.
-- 3. Índice (wrk_id, inv_statement) para el reporte y el conteo del extracto.
--
-- Después: `npx prisma db pull` (o el schema.prisma versionado).

ALTER TABLE `tbl_invoices`
ADD COLUMN `inv_statement` varchar(20) DEFAULT NULL COMMENT 'Extracto, texto libre: lo agrupa el extracto de la obra con ese número' AFTER `inv_voucher_number`;

UPDATE `tbl_invoices` `i`
JOIN `tbl_statements` `s` ON `s`.`stm_id` = `i`.`stm_id`
SET `i`.`inv_statement` = `s`.`stm_number`;

ALTER TABLE `tbl_invoices`
  DROP FOREIGN KEY `tbl_invoices_statement`;

ALTER TABLE `tbl_invoices`
  DROP INDEX `tbl_invoices_statement`,
  DROP COLUMN `stm_id`,
  ADD INDEX `idx_invoices_work_statement` (`wrk_id`, `inv_statement`);
