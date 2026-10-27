-- Migración 0122: ampliar el tipo de servicio del proveedor a 255 caracteres.
--
-- Requiere: 0044 (tbl_providers).
-- Conserva los valores existentes. La capacidad ampliada permite importar el
-- valor legado más largo observado (176 caracteres), sin truncarlo.

ALTER TABLE `tbl_providers`
  MODIFY COLUMN `prv_service_type` varchar(255) DEFAULT NULL;
