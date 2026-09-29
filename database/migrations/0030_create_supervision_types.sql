-- Migración 0030: tabla tbl_supervision_types (maestro de tipos de
-- interventoría)
--
-- Requiere: bdtemplate.sql, 0010_seed_status.sql (tbl_status con 1/2/3) y
-- 0011_fk_audit_columns.sql ya aplicados.
--
-- Respalda ADR-0007 (decisiones 1, 2 y 5) y el backlog MAE-BD-03. Nombres
-- fijados en DEC-017 (tabla tbl_supervision_types, prefijo spt_). Sigue el
-- patrón de tbl_reasons (con estado), no el de tbl_priorities.
--
-- La FK (ON DELETE RESTRICT) NO va aquí: se declara en la migración de obras
-- (ADR-0011). El anclaje a la obra y no al contrato está pendiente de
-- confirmación (ADR-0007, decisión 3): si un contrato pudiera tener un tipo
-- distinto del de su obra, la FK va en la tabla de contratos. Este catálogo
-- no cambia en ninguno de los dos casos.
--
-- Unicidad del nombre entre los NO eliminados: columna generada con UNIQUE,
-- mismo patrón que 0017 (CRUD_STANDARD, paso 1).

CREATE TABLE `tbl_supervision_types` (
  `spt_id` int NOT NULL AUTO_INCREMENT,
  `spt_name` varchar(100) NOT NULL,
  `sta_id` int NOT NULL DEFAULT 1,
  `spt_create_by` int DEFAULT NULL,
  `spt_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `spt_update_by` int DEFAULT NULL,
  `spt_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `spt_delete_by` int DEFAULT NULL,
  `spt_delete_at` timestamp NULL DEFAULT NULL,
  `spt_idempotency_key` char(36) DEFAULT NULL,
  `spt_idempotency_hash` char(64) DEFAULT NULL,
  `spt_name_active` varchar(100) GENERATED ALWAYS AS (IF(`sta_id` <> 3, `spt_name`, NULL)) VIRTUAL,
  PRIMARY KEY (`spt_id`) USING BTREE,
  UNIQUE INDEX `uq_supervision_types_name_active` (`spt_name_active`),
  UNIQUE INDEX `uq_supervision_types_idempotency_key` (`spt_idempotency_key`)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_supervision_types`
ADD CONSTRAINT `tbl_supervision_types_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_supervision_types_create_by` FOREIGN KEY (`spt_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_supervision_types_update_by` FOREIGN KEY (`spt_update_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_supervision_types_delete_by` FOREIGN KEY (`spt_delete_by`) REFERENCES `tbl_users` (`use_id`);
