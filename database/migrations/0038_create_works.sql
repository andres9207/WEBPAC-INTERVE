-- Migración 0038: tabla tbl_works (obra, raíz del agregado)
--
-- Requiere: 0033 (tbl_construction_companies), 0030 (tbl_supervision_types) y
-- 0036 (tbl_contract_types) ya aplicados.
--
-- Respalda ADR-0011 (decisiones 1, 11, 12 y 14) y el backlog PRO-BD-01.
-- Nombres fijados en DEC-026 (tabla tbl_works, prefijo wrk_).
--
-- Columnas del dominio:
--   wrk_code                     Código de obra. Único en todo el sistema,
--                                también frente a obras eliminadas: una obra
--                                eliminada es historial (ADR-0011, regla 1).
--   wrk_name                     Nombre.
--   cnc_id                       Constructora (ADR-0004, decisión 7).
--   ctt_id                       Tipo de contrato (ADR-0006).
--   spt_id                       Tipo de interventoría: anclado a la obra
--                                (DEC-027).
--   wrk_area                     Área total.
--   wrk_direct_cost              Costo directo.
--   wrk_initial_term             Plazo inicial, entero. La unidad (días o
--                                meses) está pendiente de validación
--                                (ADR-0011, "Pendiente de validación").
--   wrk_extended_term            Plazo ampliado. NULL = sin ampliación.
--   wrk_initial_value            Valor inicial.
--   wrk_extended_value           Valor ampliado. NULL = sin ampliación.
--   wrk_max_service_order_value  Valor máximo de orden de servicio.
--
-- Obligatorios: código, nombre, los tres maestros, valor inicial y plazo
-- inicial. Lo ampliado es opcional por definición ("cuando existe"); el área,
-- el costo directo y el valor máximo de orden, opcionales hasta que el área
-- usuaria diga lo contrario.
--
-- Importes y área en DECIMAL(18,2) (DEC-028). Las FK a los maestros son
-- NOT NULL y ON DELETE RESTRICT; MySQL crea el índice de cada una.
--
-- CHECK: no negativos y ampliado >= inicial (ADR-0011, reglas 4 a 6). La
-- regla 7 (valor máximo de orden <= valor vigente) vive en el service: el
-- valor vigente podrá depender de otrosíes, que no están en esta fila.

CREATE TABLE `tbl_works` (
  `wrk_id` int NOT NULL AUTO_INCREMENT,
  `wrk_code` varchar(30) NOT NULL,
  `wrk_name` varchar(200) NOT NULL,
  `cnc_id` int NOT NULL,
  `ctt_id` int NOT NULL,
  `spt_id` int NOT NULL,
  `wrk_area` decimal(18,2) DEFAULT NULL,
  `wrk_direct_cost` decimal(18,2) DEFAULT NULL,
  `wrk_initial_term` int NOT NULL,
  `wrk_extended_term` int DEFAULT NULL,
  `wrk_initial_value` decimal(18,2) NOT NULL,
  `wrk_extended_value` decimal(18,2) DEFAULT NULL,
  `wrk_max_service_order_value` decimal(18,2) DEFAULT NULL,
  `sta_id` int NOT NULL DEFAULT 1,
  `wrk_create_by` int DEFAULT NULL,
  `wrk_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `wrk_update_by` int DEFAULT NULL,
  `wrk_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `wrk_delete_by` int DEFAULT NULL,
  `wrk_delete_at` timestamp NULL DEFAULT NULL,
  `wrk_idempotency_key` char(36) DEFAULT NULL,
  `wrk_idempotency_hash` char(64) DEFAULT NULL,
  PRIMARY KEY (`wrk_id`) USING BTREE,
  UNIQUE INDEX `uq_works_code` (`wrk_code`),
  UNIQUE INDEX `uq_works_idempotency_key` (`wrk_idempotency_key`),
  CONSTRAINT `ck_works_non_negative` CHECK (
    (`wrk_area` IS NULL OR `wrk_area` >= 0)
    AND (`wrk_direct_cost` IS NULL OR `wrk_direct_cost` >= 0)
    AND `wrk_initial_term` >= 0
    AND (`wrk_extended_term` IS NULL OR `wrk_extended_term` >= 0)
    AND `wrk_initial_value` >= 0
    AND (`wrk_extended_value` IS NULL OR `wrk_extended_value` >= 0)
    AND (`wrk_max_service_order_value` IS NULL OR `wrk_max_service_order_value` >= 0)
  ),
  CONSTRAINT `ck_works_extended_term` CHECK (`wrk_extended_term` IS NULL OR `wrk_extended_term` >= `wrk_initial_term`),
  CONSTRAINT `ck_works_extended_value` CHECK (`wrk_extended_value` IS NULL OR `wrk_extended_value` >= `wrk_initial_value`)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_works`
ADD CONSTRAINT `tbl_works_construction_company` FOREIGN KEY (`cnc_id`) REFERENCES `tbl_construction_companies` (`cnc_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_works_contract_type` FOREIGN KEY (`ctt_id`) REFERENCES `tbl_contract_types` (`ctt_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_works_supervision_type` FOREIGN KEY (`spt_id`) REFERENCES `tbl_supervision_types` (`spt_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_works_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_works_create_by` FOREIGN KEY (`wrk_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_works_update_by` FOREIGN KEY (`wrk_update_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_works_delete_by` FOREIGN KEY (`wrk_delete_by`) REFERENCES `tbl_users` (`use_id`);
