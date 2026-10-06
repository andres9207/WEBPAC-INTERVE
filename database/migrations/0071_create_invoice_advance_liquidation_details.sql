-- Migración 0071: detalles de la factura de anticipo y de la de liquidación
-- (importes del anticipo y de su amortización)
--
-- Requiere: 0066 (tbl_invoices) ya aplicado.
--
-- Respalda ADR-0020 (decisión 1: encabezado común más un detalle por tipo),
-- ADR-0021 (decisiones 3 y 4) y ADR-0024 (anticipo y amortización), con las
-- reglas fijadas en DEC-044. Es la parte de la fase B que no depende de la
-- composición tributaria: IVA, retenciones y retenido de la liquidación
-- llegan con las decisiones contables (backlog DEC-03, DEC-07), como
-- columnas nuevas de tbl_invoice_liquidation_details.
--
-- Relación 1:1 con la factura: inv_id es la clave primaria y la FK. Un
-- detalle no se borra porque la factura no se borra (ADR-0020, "Integridad");
-- por eso no lleva sta_id ni columnas de eliminación, solo las de creación y
-- actualización. Se escribe con la factura, en la misma transacción.
--
-- Solo se guardan movimientos capturados, nunca saldos (ADR-0024, decisión
-- 1): el anticipo pactado, el facturado, el amortizado y los pendientes se
-- calculan con las facturas aprobadas.
--
-- tbl_invoice_advance_details (prefijo iad_):
--   iad_value                 Valor del anticipo facturado. > 0.
--
-- tbl_invoice_liquidation_details (prefijo ild_):
--   ild_value                 VALOR de la factura: base antes de IVA, con
--                             AIU, de la misma naturaleza que la base del
--                             anticipo pactado (DEC-036, DEC-044). > 0.
--   ild_amortization          Amortización del anticipo: un movimiento, se
--                             guarda el valor (ADR-0024, decisión 7).
--                             0 ≤ amortización ≤ VALOR.
--   ild_default_amortization  Evidencia: el valor por defecto calculado al
--                             guardar, mín(VALOR × A / B, pendiente).
--   ild_default_pct           Evidencia: porcentaje de anticipo efectivo
--                             (A / B × 100) al guardar.
--   ild_applied_pct           Evidencia: amortización / VALOR × 100.
--   ild_adjustment_observation  Por qué se apartó del valor por defecto.
--                             Obligatoria si se apartó (lo exige el service,
--                             con el permiso de ajustar la amortización).
--
-- Índice (ctr_id, inv_type, inv_state) en tbl_invoices: resuelve las sumas
-- de anticipo facturado y amortizado de un contrato (ADR-0024, "Integridad").

CREATE TABLE `tbl_invoice_advance_details` (
  `inv_id` int NOT NULL,
  `iad_value` decimal(18, 2) NOT NULL,
  `iad_create_by` int DEFAULT NULL,
  `iad_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `iad_update_by` int DEFAULT NULL,
  `iad_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inv_id`) USING BTREE,
  CONSTRAINT `ck_invoice_advance_details_value` CHECK (`iad_value` > 0)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_invoice_advance_details`
ADD CONSTRAINT `tbl_invoice_advance_details_invoice` FOREIGN KEY (`inv_id`) REFERENCES `tbl_invoices` (`inv_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoice_advance_details_create_by` FOREIGN KEY (`iad_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_invoice_advance_details_update_by` FOREIGN KEY (`iad_update_by`) REFERENCES `tbl_users` (`use_id`);

CREATE TABLE `tbl_invoice_liquidation_details` (
  `inv_id` int NOT NULL,
  `ild_value` decimal(18, 2) NOT NULL,
  `ild_amortization` decimal(18, 2) NOT NULL,
  `ild_default_amortization` decimal(18, 2) NOT NULL,
  `ild_default_pct` decimal(9, 6) NOT NULL,
  `ild_applied_pct` decimal(9, 6) NOT NULL,
  `ild_adjustment_observation` varchar(1000) DEFAULT NULL,
  `ild_create_by` int DEFAULT NULL,
  `ild_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ild_update_by` int DEFAULT NULL,
  `ild_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inv_id`) USING BTREE,
  CONSTRAINT `ck_invoice_liquidation_details_value` CHECK (`ild_value` > 0),
  CONSTRAINT `ck_invoice_liquidation_details_amortization` CHECK (`ild_amortization` >= 0 AND `ild_amortization` <= `ild_value`),
  CONSTRAINT `ck_invoice_liquidation_details_default` CHECK (`ild_default_amortization` >= 0 AND `ild_default_amortization` <= `ild_value`),
  CONSTRAINT `ck_invoice_liquidation_details_pcts` CHECK (
    `ild_default_pct` BETWEEN 0 AND 100 AND `ild_applied_pct` BETWEEN 0 AND 100
  )
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_invoice_liquidation_details`
ADD CONSTRAINT `tbl_invoice_liquidation_details_invoice` FOREIGN KEY (`inv_id`) REFERENCES `tbl_invoices` (`inv_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoice_liquidation_details_create_by` FOREIGN KEY (`ild_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_invoice_liquidation_details_update_by` FOREIGN KEY (`ild_update_by`) REFERENCES `tbl_users` (`use_id`);

CREATE INDEX `idx_invoices_contract_type_state` ON `tbl_invoices` (`ctr_id`, `inv_type`, `inv_state`);
