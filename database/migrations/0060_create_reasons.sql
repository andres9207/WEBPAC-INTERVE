-- Migración 0060: tabla tbl_reasons (maestro de motivos)
--
-- Requiere: bdtemplate.sql, 0010_seed_status.sql (tbl_status con 1/2/3) y
-- 0011_fk_audit_columns.sql ya aplicados.
--
-- Respalda ADR-0017 (decisión 8: el motivo de una suspensión sale de un
-- catálogo) y DEC-039. Los ADR dan tbl_reasons por existente porque estaba en
-- la BD original (bdintervewebpack.sql), que no está en el repositorio: aquí
-- se crea. Nombres en DEC-017 (módulo reasons, prefijo rea_).
--
-- Un solo catálogo para los motivos de todas las transiciones manuales.
-- rea_scope dice a qué acto aplica cada motivo, con un dominio cerrado que
-- hoy solo tiene SUSPENSION; reabrir un contrato o anular un otrosí agregan
-- su ámbito al CHECK y a REASON_SCOPES (reasons.service.js) en su migración.
-- El ámbito se fija al crear y no se edita.
--
-- Nombre único entre los NO eliminados dentro de su ámbito: columna generada
-- con UNIQUE compuesto (CRUD_STANDARD, paso 1).
--
-- Índice (estado, ámbito, nombre): el selector filtra por activo y ámbito y
-- ordena por nombre desde el índice (DEC-025); sostiene también la FK de
-- estado.

CREATE TABLE `tbl_reasons` (
  `rea_id` int NOT NULL AUTO_INCREMENT,
  `rea_scope` varchar(20) NOT NULL,
  `rea_name` varchar(100) NOT NULL,
  `sta_id` int NOT NULL DEFAULT 1,
  `rea_create_by` int DEFAULT NULL,
  `rea_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `rea_update_by` int DEFAULT NULL,
  `rea_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `rea_delete_by` int DEFAULT NULL,
  `rea_delete_at` timestamp NULL DEFAULT NULL,
  `rea_idempotency_key` char(36) DEFAULT NULL,
  `rea_idempotency_hash` char(64) DEFAULT NULL,
  `rea_name_active` varchar(100) GENERATED ALWAYS AS (IF(`sta_id` <> 3, `rea_name`, NULL)) VIRTUAL,
  PRIMARY KEY (`rea_id`) USING BTREE,
  UNIQUE INDEX `uq_reasons_name_active` (`rea_scope`, `rea_name_active`),
  UNIQUE INDEX `uq_reasons_idempotency_key` (`rea_idempotency_key`),
  INDEX `idx_reasons_status_scope_name` (`sta_id`, `rea_scope`, `rea_name`),
  CONSTRAINT `ck_reasons_scope` CHECK (`rea_scope` IN ('SUSPENSION'))
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_reasons`
ADD CONSTRAINT `tbl_reasons_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_reasons_create_by` FOREIGN KEY (`rea_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_reasons_update_by` FOREIGN KEY (`rea_update_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_reasons_delete_by` FOREIGN KEY (`rea_delete_by`) REFERENCES `tbl_users` (`use_id`);
