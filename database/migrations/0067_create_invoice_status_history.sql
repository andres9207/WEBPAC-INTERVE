-- Migración 0067: tabla tbl_invoice_status_history (historial de estado de
-- la factura)
--
-- Requiere: 0060 (tbl_reasons) y 0066 (tbl_invoices) ya aplicados.
--
-- Respalda ADR-0020 ("Auditoría": el historial es información de negocio) y
-- WORKFLOW_STANDARD (regla 4). Nombres fijados en DEC-042 (prefijo ish_).
-- Mismo diseño que tbl_contract_status_history (0051).
--
-- De solo escritura: ningún código la actualiza ni la borra. Una fila por
-- transición, en la misma transacción que la transición:
--   ish_from_state   Estado anterior. NULL al registrar la factura.
--   ish_to_state     Estado nuevo.
--   ish_origin       AUTOMATIC (registrar) o MANUAL (aprobar, anular).
--   rea_id           Motivo del catálogo (ámbito INVOICE_CANCEL, 0068).
--                    Obligatorio al anular, lo exige el service; NULL en
--                    las demás.
--   ish_observation  Observación. Obligatoria al anular.
--
-- Idempotencia de las transiciones manuales (DEC-016, migrations/README
-- punto 9): ish_idempotency_key con UNIQUE. Registrar viaja con la clave de
-- la factura (0066), así que aquí queda en NULL.

CREATE TABLE `tbl_invoice_status_history` (
  `ish_id` int NOT NULL AUTO_INCREMENT,
  `inv_id` int NOT NULL,
  `ish_from_state` varchar(20) DEFAULT NULL,
  `ish_to_state` varchar(20) NOT NULL,
  `ish_origin` varchar(10) NOT NULL,
  `rea_id` int DEFAULT NULL,
  `ish_observation` varchar(1000) DEFAULT NULL,
  `ish_create_by` int DEFAULT NULL,
  `ish_create_at` timestamp(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
  `ish_idempotency_key` char(36) DEFAULT NULL,
  `ish_idempotency_hash` char(64) DEFAULT NULL,
  PRIMARY KEY (`ish_id`) USING BTREE,
  INDEX `idx_invoice_status_history_invoice` (`inv_id`, `ish_create_at`),
  UNIQUE INDEX `uq_invoice_status_history_idempotency_key` (`ish_idempotency_key`),
  CONSTRAINT `ck_invoice_status_history_states` CHECK (
    (`ish_from_state` IS NULL OR `ish_from_state` IN ('REGISTERED', 'APPROVED', 'CANCELLED'))
    AND `ish_to_state` IN ('REGISTERED', 'APPROVED', 'CANCELLED')
  ),
  CONSTRAINT `ck_invoice_status_history_origin` CHECK (`ish_origin` IN ('AUTOMATIC', 'MANUAL'))
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_invoice_status_history`
ADD CONSTRAINT `tbl_invoice_status_history_invoice` FOREIGN KEY (`inv_id`) REFERENCES `tbl_invoices` (`inv_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoice_status_history_reason` FOREIGN KEY (`rea_id`) REFERENCES `tbl_reasons` (`rea_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoice_status_history_create_by` FOREIGN KEY (`ish_create_by`) REFERENCES `tbl_users` (`use_id`);
