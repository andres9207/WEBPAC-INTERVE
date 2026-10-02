-- Migración 0049: tabla tbl_contracts (contrato, raíz del agregado económico)
--
-- Requiere: 0036 (tbl_contract_types), 0038 (tbl_works), 0044
-- (tbl_providers), 0046 (tbl_work_providers) y 0048 (índice de etapas) ya
-- aplicados.
--
-- Respalda ADR-0015 (decisiones 1 a 5, 9 a 11) y el backlog PRO-BD-09.
-- Nombres y reglas fijados en DEC-035 (tabla tbl_contracts, prefijo ctr_,
-- área work/).
--
-- Columnas del dominio:
--   wrk_id              Obra del contrato. No cambia después de crearlo.
--   prv_id              Proveedor (contraparte). Debe estar asignado a la obra.
--   wks_id              Etapa de la obra a la que se imputa.
--   ctt_id              Tipo de contrato (ADR-0006).
--   ctr_number          Número de contrato, único dentro de la obra entre los
--                       contratos no eliminados (DEC-035, backlog DEC-17).
--   ctr_name            Nombre u objeto del contrato.
--   ctr_start_date      Fecha de inicio, capturada.
--   ctr_term            Plazo, entero positivo, en ctr_term_unit.
--   ctr_term_unit       DIA, MES o ANIO. No hay "frecuencia" aparte (backlog
--                       DEC-13, DEC-035).
--   ctr_end_date        Fecha fin DERIVADA y persistida: la calcula solo el
--                       servidor (inicio + plazo + prórrogas de los otrosí +
--                       días suspendidos) en la transacción de cada evento que
--                       la cambia. Nunca se acepta del cliente (ADR-0015,
--                       decisión 5 y "Seguridad").
--   ctr_suspended_days  Acumulador de días en suspensión, insumo de la fecha
--                       fin (backlog DEC-14: la suspensión la extiende). Queda
--                       en 0 hasta que existan las suspensiones (fase B).
--   ctr_state           Estado del ciclo de vida: IN_PROGRESS, SUSPENDED,
--                       IN_LIQUIDATION, LIQUIDATED (ADR-0017). Columna propia,
--                       no sta_id: sta_id sigue siendo visibilidad y
--                       eliminación lógica (WORKFLOW_STANDARD, regla 2). Solo
--                       lo cambian las transiciones del service, con historial
--                       (0051).
--   ctr_config_version  Versión de la configuración del tipo de contrato con
--                       que se capturó (ADR-0006). En 1 mientras no exista la
--                       configuración de campos.
--   ctr_observation     Observaciones.
--
-- Sin valor ni saldos: el valor vigente es la suma de los conceptos (0050) y
-- se calcula al leer (ADR-0015, decisión 10). Sin fecha de vencimiento: no se
-- implementa hasta definir su semántica (backlog DEC-12).
--
-- Coherencia que el ADR daba por no expresable, garantizada aquí con FK
-- compuestas (ADR-0015, reglas 2 y 3):
--   (wks_id, wrk_id) → tbl_work_stages: la etapa es de la obra del contrato.
--   (wrk_id, prv_id) → tbl_work_providers: el proveedor está asignado a la
--     obra. Además impide desasignarlo mientras tenga contratos en ella
--     (también los eliminados: un contrato eliminado sigue siendo historial).
-- El service repite ambas validaciones para dar el mensaje claro.
--
-- Número único entre no eliminados: columna generada ctr_number_active (el
-- número mientras sta_id <> 3, NULL si está eliminado), mismo patrón que
-- tbl_providers (0044). El UNIQUE (wrk_id, ctr_number_active) sirve además
-- de índice de la FK a la obra.
--
-- CHECK: plazo positivo, unidad y estado dentro de su dominio, días
-- suspendidos no negativos y fecha fin >= fecha de inicio.
--
-- Crear es un endpoint con clave de idempotencia (DEC-016).

CREATE TABLE `tbl_contracts` (
  `ctr_id` int NOT NULL AUTO_INCREMENT,
  `wrk_id` int NOT NULL,
  `prv_id` int NOT NULL,
  `wks_id` int NOT NULL,
  `ctt_id` int NOT NULL,
  `ctr_number` varchar(50) NOT NULL,
  `ctr_name` varchar(200) NOT NULL,
  `ctr_start_date` date NOT NULL,
  `ctr_term` int NOT NULL,
  `ctr_term_unit` varchar(4) NOT NULL,
  `ctr_end_date` date NOT NULL,
  `ctr_suspended_days` int NOT NULL DEFAULT 0,
  `ctr_state` varchar(20) NOT NULL DEFAULT 'IN_PROGRESS',
  `ctr_config_version` int NOT NULL DEFAULT 1,
  `ctr_observation` varchar(1000) DEFAULT NULL,
  `sta_id` int NOT NULL DEFAULT 1,
  `ctr_create_by` int DEFAULT NULL,
  `ctr_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ctr_update_by` int DEFAULT NULL,
  `ctr_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ctr_delete_by` int DEFAULT NULL,
  `ctr_delete_at` timestamp NULL DEFAULT NULL,
  `ctr_idempotency_key` char(36) DEFAULT NULL,
  `ctr_idempotency_hash` char(64) DEFAULT NULL,
  `ctr_number_active` varchar(50) GENERATED ALWAYS AS (IF(`sta_id` <> 3, `ctr_number`, NULL)) VIRTUAL,
  PRIMARY KEY (`ctr_id`) USING BTREE,
  UNIQUE INDEX `uq_contracts_work_number_active` (`wrk_id`, `ctr_number_active`),
  UNIQUE INDEX `uq_contracts_idempotency_key` (`ctr_idempotency_key`),
  INDEX `idx_contracts_state` (`ctr_state`),
  CONSTRAINT `ck_contracts_term` CHECK (`ctr_term` > 0),
  CONSTRAINT `ck_contracts_term_unit` CHECK (`ctr_term_unit` IN ('DIA', 'MES', 'ANIO')),
  CONSTRAINT `ck_contracts_state` CHECK (`ctr_state` IN ('IN_PROGRESS', 'SUSPENDED', 'IN_LIQUIDATION', 'LIQUIDATED')),
  CONSTRAINT `ck_contracts_suspended_days` CHECK (`ctr_suspended_days` >= 0),
  CONSTRAINT `ck_contracts_end_date` CHECK (`ctr_end_date` >= `ctr_start_date`),
  CONSTRAINT `ck_contracts_config_version` CHECK (`ctr_config_version` > 0)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_contracts`
ADD CONSTRAINT `tbl_contracts_work` FOREIGN KEY (`wrk_id`) REFERENCES `tbl_works` (`wrk_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_contracts_provider` FOREIGN KEY (`prv_id`) REFERENCES `tbl_providers` (`prv_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_contracts_work_stage` FOREIGN KEY (`wks_id`, `wrk_id`) REFERENCES `tbl_work_stages` (`wks_id`, `wrk_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_contracts_work_provider` FOREIGN KEY (`wrk_id`, `prv_id`) REFERENCES `tbl_work_providers` (`wrk_id`, `prv_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_contracts_contract_type` FOREIGN KEY (`ctt_id`) REFERENCES `tbl_contract_types` (`ctt_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_contracts_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_contracts_create_by` FOREIGN KEY (`ctr_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_contracts_update_by` FOREIGN KEY (`ctr_update_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_contracts_delete_by` FOREIGN KEY (`ctr_delete_by`) REFERENCES `tbl_users` (`use_id`);
