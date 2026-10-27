-- Migración 0125: la glosa se levanta y se libera en el extracto escrito (DEC-085, revisada)
--
-- Requiere: 0120 (tbl_invoice_glosses) y 0124 (tbl_invoices.inv_statement) ya aplicados.
--
-- Pedido del usuario, 2026-10-27: el extracto de la factura es texto libre
-- (0124) y la pantalla Extractos ya no registra extractos, así que la glosa
-- tampoco apunta a un extracto registrado: guarda el texto del extracto en
-- que se levanta y el del extracto en que se libera, como la factura. El
-- reporte del extracto las agrupa por obra y texto (la comparación sigue la
-- intercalación de la columna: sin distinguir mayúsculas ni tildes) y su
-- total pagado suma las levantadas y resta las liberadas.
--
-- 1. igl_statement e igl_release_statement, con el número del extracto que
--    tenía cada glosa. 20 caracteres, como inv_statement y stm_number.
-- 2. Se quitan las CHECK, las FK compuestas, sus índices, stm_id e
--    igl_release_stm_id.
-- 3. CHECK: liberada ⇔ extracto de liberación; el de liberación, distinto
--    del de origen. Índices (wrk_id, texto) para el reporte del extracto.
--
-- Después: `npx prisma db pull` (o el schema.prisma versionado).

ALTER TABLE `tbl_invoice_glosses`
ADD COLUMN `igl_statement` varchar(20) DEFAULT NULL COMMENT 'Extracto en que se levanta, texto libre como el de la factura' AFTER `wrk_id`,
ADD COLUMN `igl_release_statement` varchar(20) DEFAULT NULL COMMENT 'Extracto posterior en que se libera, texto libre' AFTER `igl_description`;

UPDATE `tbl_invoice_glosses` `g`
JOIN `tbl_statements` `s` ON `s`.`stm_id` = `g`.`stm_id`
SET `g`.`igl_statement` = `s`.`stm_number`;

UPDATE `tbl_invoice_glosses` `g`
JOIN `tbl_statements` `s` ON `s`.`stm_id` = `g`.`igl_release_stm_id`
SET `g`.`igl_release_statement` = `s`.`stm_number`;

ALTER TABLE `tbl_invoice_glosses`
  DROP CHECK `ck_invoice_glosses_release`,
  DROP CHECK `ck_invoice_glosses_release_statement`;

ALTER TABLE `tbl_invoice_glosses`
  DROP FOREIGN KEY `tbl_invoice_glosses_statement`,
  DROP FOREIGN KEY `tbl_invoice_glosses_release_statement`;

ALTER TABLE `tbl_invoice_glosses`
  DROP INDEX `idx_invoice_glosses_statement`,
  DROP INDEX `idx_invoice_glosses_release_statement`,
  DROP COLUMN `stm_id`,
  DROP COLUMN `igl_release_stm_id`,
  ADD INDEX `idx_invoice_glosses_work_statement` (`wrk_id`, `igl_statement`),
  ADD INDEX `idx_invoice_glosses_work_release_statement` (`wrk_id`, `igl_release_statement`),
  ADD CONSTRAINT `ck_invoice_glosses_release` CHECK ((`igl_release_statement` IS NULL) = (`igl_release_date` IS NULL)),
  ADD CONSTRAINT `ck_invoice_glosses_release_statement` CHECK (`igl_release_statement` IS NULL OR `igl_statement` IS NULL OR `igl_release_statement` <> `igl_statement`);
