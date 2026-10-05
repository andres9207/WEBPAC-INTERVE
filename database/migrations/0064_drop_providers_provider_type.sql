-- Migración 0064: retira tbl_providers.pvt_id
--
-- Requiere: 0063 (tbl_provider_classifications) ya aplicada.
--
-- Respalda DEC-041: los tipos de un proveedor viven en
-- tbl_provider_classifications. La columna de tipo único queda sin uso.
--
-- Antes de retirarla vuelve a copiar el tipo de cualquier proveedor que no
-- tenga ninguna clasificación (por ejemplo, uno creado entre 0063 y esta
-- migración con el servidor anterior), para que ninguno quede sin tipo.
--
-- Orden: la FK, el índice que MySQL creó para ella (mismo nombre) y la
-- columna.

INSERT INTO `tbl_provider_classifications` (`prv_id`, `pvt_id`)
SELECT p.`prv_id`, p.`pvt_id`
FROM `tbl_providers` p
WHERE NOT EXISTS (SELECT 1 FROM `tbl_provider_classifications` c WHERE c.`prv_id` = p.`prv_id`);

ALTER TABLE `tbl_providers` DROP FOREIGN KEY `tbl_providers_provider_type`;

ALTER TABLE `tbl_providers` DROP INDEX `tbl_providers_provider_type`;

ALTER TABLE `tbl_providers` DROP COLUMN `pvt_id`;
