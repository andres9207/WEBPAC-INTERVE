-- Migración 0050: tabla tbl_contract_concepts (conceptos contractuales)
--
-- Requiere: 0049 (tbl_contracts) ya aplicado.
--
-- Respalda ADR-0016 (decisiones 1 a 11) y el backlog PRO-BD-11. Nombres y
-- reglas fijados en DEC-035 y DEC-036 (tabla tbl_contract_concepts, prefijo
-- ccp_).
--
-- Una sola tabla para los tres actos, discriminados por ccp_type:
--   INITIAL      valor inicial: exactamente uno por contrato. El mínimo de
--                uno no es expresable aquí: lo garantiza que se crea en la
--                misma transacción que el contrato.
--   AMENDMENT    otrosí: 0..N, numerados por contrato (ccp_number, asignado
--                por el servidor bajo bloqueo del contrato, sin reutilizar).
--   LIQUIDATION  otrosí de liquidación: 0..1. No consume número.
--
-- Columnas del dominio:
--   ccp_start_date       Fecha de inicio del acto. La del valor inicial es la
--                        del contrato.
--   ccp_description      Objeto o descripción del acto.
--   ccp_direct_cost      Costo directo, DECIMAL(18,2) (DEC-028). No negativo,
--                        también en la liquidación (backlog DEC-18, DEC-036).
--   ccp_admin_pct        AIU desagregado: administración, imprevistos y
--   ccp_contingency_pct  utilidad (ADR-0026, decisión 7).
--   ccp_profit_pct
--   ccp_vat_pct          IVA.
--   ccp_advance_pct      Anticipo, solo como porcentaje (backlog DEC-18): su
--                        valor se deriva. 15 por defecto en el formulario.
--   ccp_retention_pct    Retenido, como porcentaje.
--   ccp_extension        Prórroga del otrosí, en la unidad del plazo del
--                        contrato. Solo en AMENDMENT. Insumo de la fecha fin.
--
-- Porcentajes en DECIMAL(5,2), entre 0 y 100. No se guarda el valor del
-- concepto ni los de anticipo y retenido: se derivan al leer (ADR-0016,
-- decisión 10).
--
-- Cardinalidad en la BD (ADR-0016, decisión 3), con columnas generadas que
-- valen el ctr_id solo para su tipo y NULL para los demás (MySQL admite
-- varios NULL en un UNIQUE):
--   ccp_initial_key      UNIQUE → un solo valor inicial por contrato.
--   ccp_liquidation_key  UNIQUE → un solo otrosí de liquidación.
--   UNIQUE (ctr_id, ccp_number) → número de otrosí único en el contrato;
--     sirve además de índice de la FK al contrato.
--
-- Los conceptos no se eliminan (ADR-0016, decisión 15): sin columnas de
-- eliminación. sta_id queda para la anulación, pendiente de decidir (B12).
--
-- Crear un otrosí es un endpoint con clave de idempotencia (DEC-016).

CREATE TABLE `tbl_contract_concepts` (
  `ccp_id` int NOT NULL AUTO_INCREMENT,
  `ctr_id` int NOT NULL,
  `ccp_type` varchar(12) NOT NULL,
  `ccp_number` int DEFAULT NULL,
  `ccp_start_date` date NOT NULL,
  `ccp_description` varchar(500) DEFAULT NULL,
  `ccp_direct_cost` decimal(18,2) NOT NULL,
  `ccp_admin_pct` decimal(5,2) NOT NULL DEFAULT 0,
  `ccp_contingency_pct` decimal(5,2) NOT NULL DEFAULT 0,
  `ccp_profit_pct` decimal(5,2) NOT NULL DEFAULT 0,
  `ccp_vat_pct` decimal(5,2) NOT NULL DEFAULT 0,
  `ccp_advance_pct` decimal(5,2) NOT NULL DEFAULT 0,
  `ccp_retention_pct` decimal(5,2) NOT NULL DEFAULT 0,
  `ccp_extension` int DEFAULT NULL,
  `sta_id` int NOT NULL DEFAULT 1,
  `ccp_create_by` int DEFAULT NULL,
  `ccp_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ccp_update_by` int DEFAULT NULL,
  `ccp_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ccp_idempotency_key` char(36) DEFAULT NULL,
  `ccp_idempotency_hash` char(64) DEFAULT NULL,
  `ccp_initial_key` int GENERATED ALWAYS AS (IF(`ccp_type` = 'INITIAL', `ctr_id`, NULL)) VIRTUAL,
  `ccp_liquidation_key` int GENERATED ALWAYS AS (IF(`ccp_type` = 'LIQUIDATION', `ctr_id`, NULL)) VIRTUAL,
  PRIMARY KEY (`ccp_id`) USING BTREE,
  UNIQUE INDEX `uq_contract_concepts_number` (`ctr_id`, `ccp_number`),
  UNIQUE INDEX `uq_contract_concepts_initial` (`ccp_initial_key`),
  UNIQUE INDEX `uq_contract_concepts_liquidation` (`ccp_liquidation_key`),
  UNIQUE INDEX `uq_contract_concepts_idempotency_key` (`ccp_idempotency_key`),
  CONSTRAINT `ck_contract_concepts_type` CHECK (`ccp_type` IN ('INITIAL', 'AMENDMENT', 'LIQUIDATION')),
  CONSTRAINT `ck_contract_concepts_number` CHECK ((`ccp_type` = 'AMENDMENT') = (`ccp_number` IS NOT NULL) AND (`ccp_number` IS NULL OR `ccp_number` > 0)),
  CONSTRAINT `ck_contract_concepts_extension` CHECK (`ccp_extension` IS NULL OR (`ccp_type` = 'AMENDMENT' AND `ccp_extension` >= 0)),
  CONSTRAINT `ck_contract_concepts_direct_cost` CHECK (`ccp_direct_cost` >= 0),
  CONSTRAINT `ck_contract_concepts_percentages` CHECK (
    `ccp_admin_pct` BETWEEN 0 AND 100
    AND `ccp_contingency_pct` BETWEEN 0 AND 100
    AND `ccp_profit_pct` BETWEEN 0 AND 100
    AND `ccp_vat_pct` BETWEEN 0 AND 100
    AND `ccp_advance_pct` BETWEEN 0 AND 100
    AND `ccp_retention_pct` BETWEEN 0 AND 100
  )
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_contract_concepts`
ADD CONSTRAINT `tbl_contract_concepts_contract` FOREIGN KEY (`ctr_id`) REFERENCES `tbl_contracts` (`ctr_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_contract_concepts_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_contract_concepts_create_by` FOREIGN KEY (`ccp_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_contract_concepts_update_by` FOREIGN KEY (`ccp_update_by`) REFERENCES `tbl_users` (`use_id`);
