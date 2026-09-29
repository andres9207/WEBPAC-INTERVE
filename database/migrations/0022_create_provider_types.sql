-- Migración 0022: tabla tbl_provider_types (maestro de tipos de proveedor)
--
-- Requiere: bdtemplate.sql, 0010_seed_status.sql (tbl_status con 1/2/3) y
-- 0011_fk_audit_columns.sql ya aplicados.
--
-- Respalda ADR-0010 y el backlog MAE-BD-04. Nombres fijados en DEC-017
-- (tabla tbl_provider_types, prefijo pvt_).
--
-- DEC-10 del backlog, resuelta el 2026-09-29: el tipo de proveedor es una
-- CLASIFICACIÓN de la empresa (ADR-0010, alternativa 4). Solo nombre y
-- estado: no gobierna campos ni reglas, no es jerarquía y no vive en el
-- contrato. No participa en la identidad del proveedor, que es el par
-- (tipo de documento, número) (ADR-0010, decisión 7).
--
-- La FK desde el proveedor NO va aquí: tbl_providers todavía no existe en
-- este esquema. Se agrega con el módulo de proveedores (MAE-BD-11).
--
-- Unicidad del nombre entre los NO eliminados: columna generada con UNIQUE,
-- mismo patrón que 0017 (CRUD_STANDARD, paso 1).

CREATE TABLE `tbl_provider_types` (
  `pvt_id` int NOT NULL AUTO_INCREMENT,
  `pvt_name` varchar(100) NOT NULL,
  `sta_id` int NOT NULL DEFAULT 1,
  `pvt_create_by` int DEFAULT NULL,
  `pvt_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `pvt_update_by` int DEFAULT NULL,
  `pvt_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pvt_delete_by` int DEFAULT NULL,
  `pvt_delete_at` timestamp NULL DEFAULT NULL,
  `pvt_idempotency_key` char(36) DEFAULT NULL,
  `pvt_idempotency_hash` char(64) DEFAULT NULL,
  `pvt_name_active` varchar(100) GENERATED ALWAYS AS (IF(`sta_id` <> 3, `pvt_name`, NULL)) VIRTUAL,
  PRIMARY KEY (`pvt_id`) USING BTREE,
  UNIQUE INDEX `uq_provider_types_name_active` (`pvt_name_active`),
  UNIQUE INDEX `uq_provider_types_idempotency_key` (`pvt_idempotency_key`)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_provider_types`
ADD CONSTRAINT `tbl_provider_types_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`),
ADD CONSTRAINT `tbl_provider_types_create_by` FOREIGN KEY (`pvt_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_provider_types_update_by` FOREIGN KEY (`pvt_update_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_provider_types_delete_by` FOREIGN KEY (`pvt_delete_by`) REFERENCES `tbl_users` (`use_id`);
