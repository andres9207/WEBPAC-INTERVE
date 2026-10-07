-- Migración 0081: tabla tbl_policies (pólizas del contrato, con versiones)
--
-- Requiere: 0049 (tbl_contracts), 0050 (tbl_contract_concepts), 0028
-- (tbl_insurers), 0060 (tbl_reasons), 0078 (tbl_policy_types) y 0079 (índice
-- concepto-contrato) ya aplicados.
--
-- Respalda ADR-0018 y DEC-050. Submódulo de contratos (work/contracts): la
-- póliza pertenece al contrato y ampara UN concepto suyo (valor inicial, un
-- otrosí o el de liquidación).
--
-- Versiones (ADR-0018, decisión 7): modificar una póliza vigente no la
-- edita; cierra la versión actual y abre otra. Todas las versiones de una
-- póliza comparten pol_root_id (el id de la primera; el service lo fija al
-- crearla, en la misma transacción). Una sola versión vigente por póliza:
-- UNIQUE sobre la columna generada pol_current_root. Una versión cerrada no
-- vuelve a cambiar.
--
-- Anular (decisión 6): cierra la versión vigente con motivo del catálogo
-- (ámbito POLICY_CANCEL) y observación. Una póliza anulada queda sin versión
-- vigente; nada se elimina, así que la tabla no lleva sta_id ni columnas de
-- eliminación (DEC-050).
--
-- Columnas del dominio:
--   ctr_id, ccp_id      Contrato y concepto amparado. FK compuesta hacia el
--                       concepto: el concepto es del contrato. No cambian
--                       entre versiones.
--   plt_id, ins_id      Tipo de póliza y aseguradora.
--   pol_number          Número de la póliza que emite la aseguradora.
--   pol_base            Base de cálculo copiada del tipo al emitir la versión
--                       (ADR-0019, decisión 7). Cambiar la base del tipo no
--                       toca las versiones emitidas.
--   pol_percentage      Porcentaje sobre la base, mayor que 0 y hasta 100.
--   pol_start_date,
--   pol_end_date        Vigencia. Ambas admiten nulo: "sin fecha de vigencia"
--                       es una categoría explícita (decisión 8).
--
-- El valor asegurado NO se guarda: base del concepto × porcentaje, calculado
-- en cada consulta (decisión 5).
--
-- Índice sobre pol_end_date: indicadores de vencimiento del tablero
-- (ADR-0002).

CREATE TABLE `tbl_policies` (
  `pol_id` int NOT NULL AUTO_INCREMENT,
  `pol_root_id` int DEFAULT NULL,
  `pol_version` int NOT NULL DEFAULT 1,
  `pol_is_current` tinyint(1) NOT NULL DEFAULT 1,
  `ctr_id` int NOT NULL,
  `ccp_id` int NOT NULL,
  `plt_id` int NOT NULL,
  `ins_id` int NOT NULL,
  `pol_number` varchar(50) NOT NULL,
  `pol_base` varchar(20) NOT NULL,
  `pol_percentage` decimal(5,2) NOT NULL,
  `pol_start_date` date DEFAULT NULL,
  `pol_end_date` date DEFAULT NULL,
  `pol_observation` varchar(1000) DEFAULT NULL,
  `pol_closed_by` int DEFAULT NULL,
  `pol_closed_at` timestamp NULL DEFAULT NULL,
  `rea_id` int DEFAULT NULL,
  `pol_cancel_observation` varchar(1000) DEFAULT NULL,
  `pol_create_by` int DEFAULT NULL,
  `pol_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `pol_update_by` int DEFAULT NULL,
  `pol_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pol_idempotency_key` char(36) DEFAULT NULL,
  `pol_idempotency_hash` char(64) DEFAULT NULL,
  `pol_current_root` int GENERATED ALWAYS AS (IF(`pol_is_current` = 1, `pol_root_id`, NULL)) VIRTUAL,
  PRIMARY KEY (`pol_id`) USING BTREE,
  UNIQUE INDEX `uq_policies_current` (`pol_current_root`),
  UNIQUE INDEX `uq_policies_idempotency_key` (`pol_idempotency_key`),
  INDEX `idx_policies_contract_current` (`ctr_id`, `pol_is_current`),
  INDEX `idx_policies_root_version` (`pol_root_id`, `pol_version`),
  INDEX `idx_policies_end_date` (`pol_end_date`),
  CONSTRAINT `ck_policies_base` CHECK (`pol_base` IN ('DIRECT_COST', 'TAXABLE_BASE', 'TOTAL_VALUE', 'VAT_ONLY')),
  CONSTRAINT `ck_policies_percentage` CHECK (`pol_percentage` > 0 AND `pol_percentage` <= 100),
  CONSTRAINT `ck_policies_dates` CHECK (`pol_end_date` IS NULL OR `pol_start_date` IS NULL OR `pol_end_date` >= `pol_start_date`),
  CONSTRAINT `ck_policies_version` CHECK (`pol_version` >= 1),
  CONSTRAINT `ck_policies_closed` CHECK (
    (`pol_is_current` = 1 AND `pol_closed_at` IS NULL AND `pol_closed_by` IS NULL)
    OR (`pol_is_current` = 0 AND `pol_closed_at` IS NOT NULL)
  ),
  CONSTRAINT `ck_policies_cancel` CHECK (
    (`rea_id` IS NULL AND `pol_cancel_observation` IS NULL)
    OR (`rea_id` IS NOT NULL AND `pol_cancel_observation` IS NOT NULL AND `pol_is_current` = 0)
  )
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_policies`
ADD CONSTRAINT `tbl_policies_contract` FOREIGN KEY (`ctr_id`) REFERENCES `tbl_contracts` (`ctr_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_policies_concept` FOREIGN KEY (`ccp_id`, `ctr_id`) REFERENCES `tbl_contract_concepts` (`ccp_id`, `ctr_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_policies_type` FOREIGN KEY (`plt_id`) REFERENCES `tbl_policy_types` (`plt_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_policies_insurer` FOREIGN KEY (`ins_id`) REFERENCES `tbl_insurers` (`ins_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_policies_reason` FOREIGN KEY (`rea_id`) REFERENCES `tbl_reasons` (`rea_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_policies_root` FOREIGN KEY (`pol_root_id`) REFERENCES `tbl_policies` (`pol_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_policies_closed_by` FOREIGN KEY (`pol_closed_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_policies_create_by` FOREIGN KEY (`pol_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_policies_update_by` FOREIGN KEY (`pol_update_by`) REFERENCES `tbl_users` (`use_id`);
