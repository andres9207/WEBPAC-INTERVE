-- Migración 0036: tabla tbl_contract_types (maestro de tipos de contrato)
--
-- Requiere: bdtemplate.sql, 0010_seed_status.sql (tbl_status con 1/2/3) y
-- 0011_fk_audit_columns.sql ya aplicados.
--
-- Respalda ADR-0006 (reglas 1, 2, 12 y 13) y el backlog MAE-BD-08, en su
-- versión mínima: nombre, estado y versión de configuración. Nombres fijados
-- en DEC-017 (tabla tbl_contract_types, prefijo ctt_).
--
-- La configuración de campos por tipo (catálogo de campos y una fila por tipo
-- y campo, MAE-BD-09) NO va aquí: llega con contratos. ctt_config_version
-- nace en 1 y la incrementa el guardado de esa configuración (ADR-0006,
-- decisión 10); hasta entonces no cambia.
--
-- La FK desde la obra (NOT NULL, ON DELETE RESTRICT, con índice) se declara
-- en la migración de obras (ADR-0011, DEC-026).
--
-- Unicidad del nombre entre los NO eliminados: columna generada con UNIQUE,
-- mismo patrón que 0017 (CRUD_STANDARD, paso 1). Índice (estado, nombre)
-- para el selector y el listado, en la migración de creación (DEC-025).
--
-- Sin semilla: los tipos de contrato son datos del negocio y se cargan desde
-- la pantalla.

CREATE TABLE `tbl_contract_types` (
  `ctt_id` int NOT NULL AUTO_INCREMENT,
  `ctt_name` varchar(100) NOT NULL,
  `ctt_config_version` int NOT NULL DEFAULT 1,
  `sta_id` int NOT NULL DEFAULT 1,
  `ctt_create_by` int DEFAULT NULL,
  `ctt_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ctt_update_by` int DEFAULT NULL,
  `ctt_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ctt_delete_by` int DEFAULT NULL,
  `ctt_delete_at` timestamp NULL DEFAULT NULL,
  `ctt_idempotency_key` char(36) DEFAULT NULL,
  `ctt_idempotency_hash` char(64) DEFAULT NULL,
  `ctt_name_active` varchar(100) GENERATED ALWAYS AS (IF(`sta_id` <> 3, `ctt_name`, NULL)) VIRTUAL,
  PRIMARY KEY (`ctt_id`) USING BTREE,
  UNIQUE INDEX `uq_contract_types_name_active` (`ctt_name_active`),
  UNIQUE INDEX `uq_contract_types_idempotency_key` (`ctt_idempotency_key`),
  INDEX `idx_contract_types_status_name` (`sta_id`, `ctt_name`)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_contract_types`
ADD CONSTRAINT `tbl_contract_types_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_contract_types_create_by` FOREIGN KEY (`ctt_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_contract_types_update_by` FOREIGN KEY (`ctt_update_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_contract_types_delete_by` FOREIGN KEY (`ctt_delete_by`) REFERENCES `tbl_users` (`use_id`);
