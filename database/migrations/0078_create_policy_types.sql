-- Migración 0078: tabla tbl_policy_types (maestro de tipos de póliza)
--
-- Requiere: bdtemplate.sql, 0010_seed_status.sql (tbl_status con 1/2/3) y
-- 0011_fk_audit_columns.sql ya aplicados.
--
-- Respalda ADR-0019 y DEC-050. Nombres en DEC-017 (módulo policyTypes,
-- tabla tbl_policy_types, prefijo plt_).
--
-- Maestro con efecto funcional: la base de cálculo del tipo decide sobre qué
-- importe del concepto amparado se aplica el porcentaje de cada póliza.
--
-- Columnas del dominio:
--   plt_key   Clave simbólica estable (MAYÚSCULAS, dígitos y guion bajo). Se
--             fija al crear y no se edita: la referencian el código y las
--             pólizas. UNIQUE absoluto, también contra los eliminados.
--   plt_name  Nombre. Único entre los NO eliminados (columna generada).
--   plt_base  Base de cálculo, dominio cerrado (ADR-0019, decisión 3):
--               DIRECT_COST   costo directo del concepto
--               TAXABLE_BASE  costo directo + AIU (antes de IVA)
--               TOTAL_VALUE   costo directo + AIU + IVA
--               VAT_ONLY      solo el IVA
--             Se elige al crear y solo se cambia con el permiso "Configurar
--             base de cálculo" (98), con bitácora funcional.
--
-- SIN SEMILLAS (DEC-050): qué tipos existen y qué base usa cada uno es la
-- decisión de negocio DEC-04, pendiente. Los tipos los crea quien tenga el
-- permiso; el sistema no supone ninguna base.
--
-- Índice (estado, nombre): el selector filtra por activo y ordena por nombre
-- desde el índice (DEC-025); sostiene también la FK de estado.

CREATE TABLE `tbl_policy_types` (
  `plt_id` int NOT NULL AUTO_INCREMENT,
  `plt_key` varchar(30) NOT NULL,
  `plt_name` varchar(100) NOT NULL,
  `plt_base` varchar(20) NOT NULL,
  `sta_id` int NOT NULL DEFAULT 1,
  `plt_create_by` int DEFAULT NULL,
  `plt_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `plt_update_by` int DEFAULT NULL,
  `plt_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `plt_delete_by` int DEFAULT NULL,
  `plt_delete_at` timestamp NULL DEFAULT NULL,
  `plt_idempotency_key` char(36) DEFAULT NULL,
  `plt_idempotency_hash` char(64) DEFAULT NULL,
  `plt_name_active` varchar(100) GENERATED ALWAYS AS (IF(`sta_id` <> 3, `plt_name`, NULL)) VIRTUAL,
  PRIMARY KEY (`plt_id`) USING BTREE,
  UNIQUE INDEX `uq_policy_types_key` (`plt_key`),
  UNIQUE INDEX `uq_policy_types_name_active` (`plt_name_active`),
  UNIQUE INDEX `uq_policy_types_idempotency_key` (`plt_idempotency_key`),
  INDEX `idx_policy_types_status_name` (`sta_id`, `plt_name`),
  CONSTRAINT `ck_policy_types_key` CHECK (REGEXP_LIKE(`plt_key`, '^[A-Z][A-Z0-9_]*$', 'c')),
  CONSTRAINT `ck_policy_types_base` CHECK (`plt_base` IN ('DIRECT_COST', 'TAXABLE_BASE', 'TOTAL_VALUE', 'VAT_ONLY'))
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_policy_types`
ADD CONSTRAINT `tbl_policy_types_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_policy_types_create_by` FOREIGN KEY (`plt_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_policy_types_update_by` FOREIGN KEY (`plt_update_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_policy_types_delete_by` FOREIGN KEY (`plt_delete_by`) REFERENCES `tbl_users` (`use_id`);
