-- Migración 0051: tabla tbl_contract_status_history (historial de estado)
--
-- Requiere: 0049 (tbl_contracts) ya aplicado.
--
-- Respalda ADR-0017 (decisión 10), WORKFLOW_STANDARD (regla 4) y el backlog
-- PRO-BD-10. Nombres fijados en DEC-035 (prefijo csh_).
--
-- De solo escritura: ningún código la actualiza ni la borra, así que no
-- lleva columnas de actualización ni de eliminación. Una fila por transición,
-- escrita en la misma transacción que la transición:
--   csh_from_state        Estado anterior. NULL en la creación del contrato.
--   csh_to_state          Estado nuevo.
--   csh_origin            AUTOMATIC (la dispara un hecho: crear el contrato,
--                         crear el otrosí de liquidación) o MANUAL (suspender,
--                         levantar, reabrir: fase B).
--   csh_observation       Observación.
--   csh_failed_condition  Condición que no se cumplió cuando una evaluación
--                         automática no transiciona (C1–C8, ADR-0017). Sin uso
--                         hasta que exista la evaluación de liquidación.
--   csh_create_by / _at   Autor (de la sesión) y fecha.
--
-- El motivo desde tbl_reasons (ADR-0017) llega con las suspensiones (fase
-- B): tbl_reasons no existe en el esquema, y ninguna transición de esta fase
-- lleva motivo.
--
-- Idempotencia de las transiciones manuales (DEC-016, migrations/README punto
-- 9): csh_idempotency_key con UNIQUE. Las transiciones automáticas viajan con
-- la clave del hecho que las dispara (la del contrato o la del otrosí), así
-- que aquí quedan en NULL.
--
-- Índice (contrato, fecha) para la consulta del historial del expediente; su
-- columna inicial sirve también a la FK.

CREATE TABLE `tbl_contract_status_history` (
  `csh_id` int NOT NULL AUTO_INCREMENT,
  `ctr_id` int NOT NULL,
  `csh_from_state` varchar(20) DEFAULT NULL,
  `csh_to_state` varchar(20) NOT NULL,
  `csh_origin` varchar(10) NOT NULL,
  `csh_observation` varchar(500) DEFAULT NULL,
  `csh_failed_condition` varchar(100) DEFAULT NULL,
  `csh_create_by` int DEFAULT NULL,
  `csh_create_at` timestamp(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
  `csh_idempotency_key` char(36) DEFAULT NULL,
  `csh_idempotency_hash` char(64) DEFAULT NULL,
  PRIMARY KEY (`csh_id`) USING BTREE,
  INDEX `idx_contract_status_history_contract` (`ctr_id`, `csh_create_at`),
  UNIQUE INDEX `uq_contract_status_history_idempotency_key` (`csh_idempotency_key`),
  CONSTRAINT `ck_contract_status_history_states` CHECK (
    (`csh_from_state` IS NULL OR `csh_from_state` IN ('IN_PROGRESS', 'SUSPENDED', 'IN_LIQUIDATION', 'LIQUIDATED'))
    AND `csh_to_state` IN ('IN_PROGRESS', 'SUSPENDED', 'IN_LIQUIDATION', 'LIQUIDATED')
  ),
  CONSTRAINT `ck_contract_status_history_origin` CHECK (`csh_origin` IN ('AUTOMATIC', 'MANUAL'))
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_contract_status_history`
ADD CONSTRAINT `tbl_contract_status_history_contract` FOREIGN KEY (`ctr_id`) REFERENCES `tbl_contracts` (`ctr_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_contract_status_history_create_by` FOREIGN KEY (`csh_create_by`) REFERENCES `tbl_users` (`use_id`);
