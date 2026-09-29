-- Migración 0033: tabla tbl_construction_companies (maestro de constructoras)
--
-- Requiere: bdtemplate.sql, 0010_seed_status.sql (tbl_status con 1/2/3) y
-- 0011_fk_audit_columns.sql ya aplicados.
--
-- Respalda ADR-0004 (decisiones 1, 2, 3 y 8) y el backlog MAE-BD-02. Nombres
-- fijados en DEC-017 (tabla tbl_construction_companies, prefijo cnc_).
--
-- Dos atributos propios: descripción y estado (tbl_status, FK RESTRICT con
-- índice). No guarda nada de obras. La relación obra → constructora es N:1
-- obligatoria: la FK NOT NULL con ON DELETE RESTRICT, y su índice, se
-- declaran en la migración de obras (ADR-0004, decisión 7; ADR-0011).
--
-- Unicidad de la descripción entre las NO eliminadas: columna generada con
-- UNIQUE, mismo patrón que 0017 (CRUD_STANDARD, paso 1).
--
-- Sin semilla: las constructoras son datos del negocio y se cargan desde la
-- pantalla.

CREATE TABLE `tbl_construction_companies` (
  `cnc_id` int NOT NULL AUTO_INCREMENT,
  `cnc_description` varchar(150) NOT NULL,
  `sta_id` int NOT NULL DEFAULT 1,
  `cnc_create_by` int DEFAULT NULL,
  `cnc_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `cnc_update_by` int DEFAULT NULL,
  `cnc_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cnc_delete_by` int DEFAULT NULL,
  `cnc_delete_at` timestamp NULL DEFAULT NULL,
  `cnc_idempotency_key` char(36) DEFAULT NULL,
  `cnc_idempotency_hash` char(64) DEFAULT NULL,
  `cnc_description_active` varchar(150) GENERATED ALWAYS AS (IF(`sta_id` <> 3, `cnc_description`, NULL)) VIRTUAL,
  PRIMARY KEY (`cnc_id`) USING BTREE,
  UNIQUE INDEX `uq_construction_companies_description_active` (`cnc_description_active`),
  UNIQUE INDEX `uq_construction_companies_idempotency_key` (`cnc_idempotency_key`)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_construction_companies`
ADD CONSTRAINT `tbl_construction_companies_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_construction_companies_create_by` FOREIGN KEY (`cnc_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_construction_companies_update_by` FOREIGN KEY (`cnc_update_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_construction_companies_delete_by` FOREIGN KEY (`cnc_delete_by`) REFERENCES `tbl_users` (`use_id`);
