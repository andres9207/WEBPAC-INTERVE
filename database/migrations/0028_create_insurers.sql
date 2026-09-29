-- Migración 0028: tabla tbl_insurers (maestro de aseguradoras)
--
-- Requiere: bdtemplate.sql, 0010_seed_status.sql (tbl_status con 1/2/3) y
-- 0011_fk_audit_columns.sql ya aplicados.
--
-- Respalda ADR-0003 (decisiones 1, 2, 3 y 7) y el backlog MAE-BD-01. Nombres
-- fijados en DEC-017 (tabla tbl_insurers, prefijo ins_).
--
-- Dos atributos propios: descripción y estado (tbl_status, FK RESTRICT). No
-- guarda nada de pólizas: la póliza referencia a la aseguradora. La FK desde
-- pólizas (ON DELETE RESTRICT) se agrega con esa tabla (ADR-0018).
--
-- Unicidad de la descripción entre las NO eliminadas: columna generada con
-- UNIQUE, mismo patrón que 0017 (CRUD_STANDARD, paso 1). El índice UNIQUE
-- sirve además al filtro del listado.
--
-- Sin semilla: las aseguradoras son datos del negocio y se cargan desde la
-- pantalla.

CREATE TABLE `tbl_insurers` (
  `ins_id` int NOT NULL AUTO_INCREMENT,
  `ins_description` varchar(150) NOT NULL,
  `sta_id` int NOT NULL DEFAULT 1,
  `ins_create_by` int DEFAULT NULL,
  `ins_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ins_update_by` int DEFAULT NULL,
  `ins_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ins_delete_by` int DEFAULT NULL,
  `ins_delete_at` timestamp NULL DEFAULT NULL,
  `ins_idempotency_key` char(36) DEFAULT NULL,
  `ins_idempotency_hash` char(64) DEFAULT NULL,
  `ins_description_active` varchar(150) GENERATED ALWAYS AS (IF(`sta_id` <> 3, `ins_description`, NULL)) VIRTUAL,
  PRIMARY KEY (`ins_id`) USING BTREE,
  UNIQUE INDEX `uq_insurers_description_active` (`ins_description_active`),
  UNIQUE INDEX `uq_insurers_idempotency_key` (`ins_idempotency_key`)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_insurers`
ADD CONSTRAINT `tbl_insurers_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_insurers_create_by` FOREIGN KEY (`ins_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_insurers_update_by` FOREIGN KEY (`ins_update_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_insurers_delete_by` FOREIGN KEY (`ins_delete_by`) REFERENCES `tbl_users` (`use_id`);
