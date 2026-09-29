-- Migración 0025: tabla tbl_address_types (maestro de tipos de dirección)
--
-- Requiere: bdtemplate.sql, 0010_seed_status.sql (tbl_status con 1/2/3) y
-- 0011_fk_audit_columns.sql ya aplicados.
--
-- Respalda ADR-0009 (decisiones 1, 2 y 8) y el backlog MAE-BD-05. Nombres
-- fijados en DEC-017 (tabla tbl_address_types, prefijo adt_).
--
-- Catálogo compartido por los contactos de obra y los de proveedor. No
-- guarda ninguna dirección concreta. "Principal" no es un tipo: es una marca
-- del contacto (ADR-0009, decisión 6).
--
-- Las FK desde las tablas de contacto (ON DELETE RESTRICT) NO van aquí: esas
-- tablas todavía no existen. Se agregan con obras (PRO-BD-04) y proveedores
-- (PRO-BD-06).
--
-- Unicidad del nombre entre los NO eliminados: columna generada con UNIQUE,
-- mismo patrón que 0017 (CRUD_STANDARD, paso 1).

CREATE TABLE `tbl_address_types` (
  `adt_id` int NOT NULL AUTO_INCREMENT,
  `adt_name` varchar(100) NOT NULL,
  `sta_id` int NOT NULL DEFAULT 1,
  `adt_create_by` int DEFAULT NULL,
  `adt_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `adt_update_by` int DEFAULT NULL,
  `adt_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `adt_delete_by` int DEFAULT NULL,
  `adt_delete_at` timestamp NULL DEFAULT NULL,
  `adt_idempotency_key` char(36) DEFAULT NULL,
  `adt_idempotency_hash` char(64) DEFAULT NULL,
  `adt_name_active` varchar(100) GENERATED ALWAYS AS (IF(`sta_id` <> 3, `adt_name`, NULL)) VIRTUAL,
  PRIMARY KEY (`adt_id`) USING BTREE,
  UNIQUE INDEX `uq_address_types_name_active` (`adt_name_active`),
  UNIQUE INDEX `uq_address_types_idempotency_key` (`adt_idempotency_key`)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_address_types`
ADD CONSTRAINT `tbl_address_types_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`),
ADD CONSTRAINT `tbl_address_types_create_by` FOREIGN KEY (`adt_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_address_types_update_by` FOREIGN KEY (`adt_update_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_address_types_delete_by` FOREIGN KEY (`adt_delete_by`) REFERENCES `tbl_users` (`use_id`);
