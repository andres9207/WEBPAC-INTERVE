-- Migración 0061: tabla tbl_contract_suspensions (suspensiones de contrato)
--
-- Requiere: 0049 (tbl_contracts), 0050 (tbl_contract_concepts) y 0060
-- (tbl_reasons) ya aplicados.
--
-- Respalda ADR-0017 (decisiones 3, 8 y 9), el backlog PRO-BD-12 y DEC-039.
-- Prefijo csp_.
--
-- Una fila por suspensión. Se crea al suspender y se completa una sola vez,
-- cuando el otrosí que reanuda el contrato la cierra (DEC-039): fecha de
-- reanudación, días suspendidos y el otrosí que la levantó. No se edita ni
-- se elimina por ninguna vía (ADR-0017, "Seguridad"), así que no lleva
-- sta_id ni columnas de eliminación; update_by / update_at registran el
-- cierre.
--
--   csp_previous_state   Estado del contrato al suspender: vuelve a él al
--                        levantar (estado superpuesto, ADR-0017 decisión 3).
--   rea_id               Motivo (tbl_reasons, ámbito SUSPENSION).
--   csp_suspension_date  Desde cuándo.
--   csp_lift_condition   Qué debe ocurrir para reanudar.
--   csp_observation      Opcional.
--   csp_requires_report  ¿Genera informe de interventoría? Decidido al
--                        suspender; su efecto depende del backlog DEC-15.
--   csp_lift_date        Fecha de reanudación. NULL mientras está abierta.
--   csp_days             Días calendario suspendidos: reanudación −
--                        suspensión. Se suman a tbl_contracts.ctr_suspended_days.
--   ccp_id               Otrosí que la levantó. Un otrosí levanta a lo sumo una.
--
-- Una sola suspensión abierta por contrato: UNIQUE sobre la columna generada
-- csp_open_contract (el contrato mientras no hay reanudación, NULL después).
-- El service lo verifica además bajo bloqueo del contrato.
--
-- Idempotencia: suspender es una transición manual y su clave va en el
-- historial de estado (tbl_contract_status_history.csh_idempotency_key,
-- migración 0051). Esta tabla no lleva columnas de idempotencia propias.

CREATE TABLE `tbl_contract_suspensions` (
  `csp_id` int NOT NULL AUTO_INCREMENT,
  `ctr_id` int NOT NULL,
  `csp_previous_state` varchar(20) NOT NULL,
  `rea_id` int NOT NULL,
  `csp_suspension_date` date NOT NULL,
  `csp_lift_condition` varchar(500) NOT NULL,
  `csp_observation` varchar(1000) DEFAULT NULL,
  `csp_requires_report` tinyint(1) NOT NULL DEFAULT 0,
  `csp_lift_date` date DEFAULT NULL,
  `csp_days` int DEFAULT NULL,
  `ccp_id` int DEFAULT NULL,
  `csp_create_by` int DEFAULT NULL,
  `csp_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `csp_update_by` int DEFAULT NULL,
  `csp_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `csp_open_contract` int GENERATED ALWAYS AS (IF(`csp_lift_date` IS NULL, `ctr_id`, NULL)) VIRTUAL,
  PRIMARY KEY (`csp_id`) USING BTREE,
  UNIQUE INDEX `uq_contract_suspensions_open` (`csp_open_contract`),
  UNIQUE INDEX `uq_contract_suspensions_concept` (`ccp_id`),
  INDEX `idx_contract_suspensions_contract` (`ctr_id`, `csp_suspension_date`),
  INDEX `idx_contract_suspensions_reason` (`rea_id`),
  CONSTRAINT `ck_contract_suspensions_previous_state` CHECK (`csp_previous_state` IN ('IN_PROGRESS', 'IN_LIQUIDATION')),
  CONSTRAINT `ck_contract_suspensions_lift` CHECK (
    (`csp_lift_date` IS NULL AND `csp_days` IS NULL AND `ccp_id` IS NULL)
    OR (`csp_lift_date` IS NOT NULL AND `csp_days` IS NOT NULL AND `ccp_id` IS NOT NULL)
  ),
  CONSTRAINT `ck_contract_suspensions_dates` CHECK (`csp_lift_date` IS NULL OR `csp_lift_date` >= `csp_suspension_date`),
  CONSTRAINT `ck_contract_suspensions_days` CHECK (`csp_days` IS NULL OR `csp_days` >= 0)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_contract_suspensions`
ADD CONSTRAINT `tbl_contract_suspensions_contract` FOREIGN KEY (`ctr_id`) REFERENCES `tbl_contracts` (`ctr_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_contract_suspensions_reason` FOREIGN KEY (`rea_id`) REFERENCES `tbl_reasons` (`rea_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_contract_suspensions_concept` FOREIGN KEY (`ccp_id`) REFERENCES `tbl_contract_concepts` (`ccp_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_contract_suspensions_create_by` FOREIGN KEY (`csp_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_contract_suspensions_update_by` FOREIGN KEY (`csp_update_by`) REFERENCES `tbl_users` (`use_id`);
