-- Migración 0083: retenido contractual de la factura de liquidación y
-- detalle de la factura de devolución de retenido
--
-- Requiere: 0071 (tbl_invoice_liquidation_details) ya aplicado.
--
-- Respalda ADR-0025 (retenido) con las reglas fijadas en DEC-051, que
-- resuelve la parte del retenido de las decisiones de negocio DEC-05, DEC-11
-- y DEC-19 del backlog. Mismo patrón que el anticipo (DEC-044): solo se
-- guardan movimientos capturados, nunca saldos. El retenido pactado, el
-- acumulado, el devuelto y el saldo se calculan con las facturas aprobadas.
--
-- El retenido contractual es una garantía que se descuenta del pago y se
-- devuelve al liquidar. No es una retención tributaria: esas llegan con
-- DEC-07, en columnas propias.
--
-- tbl_invoice_liquidation_details, columnas nuevas (prefijo ild_):
--   ild_retention               Retenido de la factura: un movimiento, se
--                               guarda el valor (ADR-0025, decisión 6).
--                               0 ≤ retenido ≤ VALOR. NULL: liquidación
--                               registrada antes del retenido; si está
--                               aprobada cuenta como 0, y si está registrada
--                               no se aprueba hasta editarla (409).
--   ild_default_retention       Evidencia: el valor por defecto calculado al
--                               guardar, mín(VALOR × RP / B, por retener).
--   ild_retention_default_pct   Evidencia: porcentaje de retenido efectivo
--                               (RP / B × 100) al guardar.
--   ild_retention_applied_pct   Evidencia: retenido / VALOR × 100.
--   ild_retention_observation   Por qué se apartó del valor por defecto.
--                               Obligatoria si se apartó (lo exige el
--                               service, con el permiso de ajustar el
--                               retenido).
--   Las cuatro primeras van juntas: todas NULL o ninguna (CHECK).
--
-- tbl_invoice_retention_refund_details (prefijo irr_), 1:1 con la factura
-- como los otros detalles (inv_id es la clave primaria y la FK; no se borra
-- porque la factura no se borra):
--   irr_value                   Valor devuelto. > 0. No supera el saldo de
--                               retenido del contrato (I3), lo que verifica
--                               el service bajo el bloqueo del contrato.

ALTER TABLE `tbl_invoice_liquidation_details`
ADD COLUMN `ild_retention` decimal(18, 2) DEFAULT NULL AFTER `ild_adjustment_observation`,
ADD COLUMN `ild_default_retention` decimal(18, 2) DEFAULT NULL AFTER `ild_retention`,
ADD COLUMN `ild_retention_default_pct` decimal(9, 6) DEFAULT NULL AFTER `ild_default_retention`,
ADD COLUMN `ild_retention_applied_pct` decimal(9, 6) DEFAULT NULL AFTER `ild_retention_default_pct`,
ADD COLUMN `ild_retention_observation` varchar(1000) DEFAULT NULL AFTER `ild_retention_applied_pct`,
ADD CONSTRAINT `ck_invoice_liquidation_details_retention` CHECK (`ild_retention` >= 0 AND `ild_retention` <= `ild_value`),
ADD CONSTRAINT `ck_invoice_liquidation_details_default_retention` CHECK (
  `ild_default_retention` >= 0 AND `ild_default_retention` <= `ild_value`
),
ADD CONSTRAINT `ck_invoice_liquidation_details_retention_pcts` CHECK (
  `ild_retention_default_pct` BETWEEN 0 AND 100 AND `ild_retention_applied_pct` BETWEEN 0 AND 100
),
ADD CONSTRAINT `ck_invoice_liquidation_details_retention_all` CHECK (
  (`ild_retention` IS NULL AND `ild_default_retention` IS NULL AND `ild_retention_default_pct` IS NULL AND `ild_retention_applied_pct` IS NULL)
  OR (`ild_retention` IS NOT NULL AND `ild_default_retention` IS NOT NULL AND `ild_retention_default_pct` IS NOT NULL AND `ild_retention_applied_pct` IS NOT NULL)
);

CREATE TABLE `tbl_invoice_retention_refund_details` (
  `inv_id` int NOT NULL,
  `irr_value` decimal(18, 2) NOT NULL,
  `irr_create_by` int DEFAULT NULL,
  `irr_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `irr_update_by` int DEFAULT NULL,
  `irr_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inv_id`) USING BTREE,
  CONSTRAINT `ck_invoice_retention_refund_details_value` CHECK (`irr_value` > 0)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_invoice_retention_refund_details`
ADD CONSTRAINT `tbl_invoice_retention_refund_details_invoice` FOREIGN KEY (`inv_id`) REFERENCES `tbl_invoices` (`inv_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoice_retention_refund_details_create_by` FOREIGN KEY (`irr_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_invoice_retention_refund_details_update_by` FOREIGN KEY (`irr_update_by`) REFERENCES `tbl_users` (`use_id`);
