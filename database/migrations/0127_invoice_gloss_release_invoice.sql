-- Migración 0127: la glosa se libera con una factura, no con un extracto escrito (DEC-085)
--
-- Requiere: 0126 (tbl_invoice_glosses con igl_field) ya aplicado.
--
-- Pedido del usuario, 2026-10-28: al liberar una glosa se elige la factura
-- que la corrige (de cualquier tipo, del mismo proveedor y de la misma
-- obra). El extracto en que se libera es el que tenga escrito esa factura,
-- así que la glosa aparece en el extracto junto a ella. Como esa factura ya
-- está registrada en el extracto, la liberación no mueve su total.
--
-- Y al levantarla se dice si la glosa suma al total del extracto (lo pagado
-- difiere de lo registrado: el IVA de 80 cuando el sistema calculó 76) o es
-- un pendiente que llegará en otra factura (se pagaron 10 de 100).
--
-- Datos: las glosas liberadas con un extracto escrito vuelven a quedar
-- abiertas (decidido por el usuario: datos de prueba). Las que ya existen
-- suman al total, como hasta ahora.
--
-- 1. Reabre las liberadas y quita igl_release_statement con su índice y sus CHECK.
-- 2. igl_release_inv_id con FK compuesta (igl_release_inv_id, wrk_id): la
--    factura que libera es de la obra de la glosa. Distinta de la propia.
-- 3. igl_affects_total.
--
-- Después: `npx prisma db pull` (o el schema.prisma versionado).

UPDATE `tbl_invoice_glosses`
SET `igl_release_statement` = NULL,
    `igl_release_date` = NULL,
    `igl_release_observation` = NULL,
    `igl_release_by` = NULL
WHERE `igl_release_date` IS NOT NULL;

ALTER TABLE `tbl_invoice_glosses`
  DROP CHECK `ck_invoice_glosses_release`,
  DROP CHECK `ck_invoice_glosses_release_statement`;

ALTER TABLE `tbl_invoice_glosses`
  DROP INDEX `idx_invoice_glosses_work_release_statement`,
  DROP COLUMN `igl_release_statement`;

ALTER TABLE `tbl_invoice_glosses`
  ADD COLUMN `igl_affects_total` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'Suma al total del extracto en que se levanta' AFTER `igl_value`,
  ADD COLUMN `igl_release_inv_id` int DEFAULT NULL COMMENT 'Factura que libera la glosa: su extracto es el de la liberación' AFTER `igl_description`,
  ADD INDEX `idx_invoice_glosses_release_invoice` (`igl_release_inv_id`, `wrk_id`),
  ADD CONSTRAINT `ck_invoice_glosses_release` CHECK ((`igl_release_inv_id` IS NULL) = (`igl_release_date` IS NULL)),
  ADD CONSTRAINT `ck_invoice_glosses_release_invoice` CHECK (`igl_release_inv_id` IS NULL OR `igl_release_inv_id` <> `inv_id`);

ALTER TABLE `tbl_invoice_glosses`
  ADD CONSTRAINT `tbl_invoice_glosses_release_invoice` FOREIGN KEY (`igl_release_inv_id`, `wrk_id`) REFERENCES `tbl_invoices` (`inv_id`, `wrk_id`) ON DELETE RESTRICT;
