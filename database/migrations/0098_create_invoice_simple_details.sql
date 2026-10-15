-- Migración 0098: detalle de importes de la factura simple
--
-- Requiere: 0066 (tbl_invoices) ya aplicado.
--
-- Respalda ADR-0023 (decisiones 6, 9 y 10) y ADR-0026 con la composición que
-- fijó el usuario en DEC-065 (cierra backlog DEC-02), tomada del sistema que
-- se migra: retención en la fuente sobre el valor bruto, IVA sobre el valor
-- menos el descuento AI, retención de IVA sobre el IVA, retención de ICA
-- digitada como valor, flete sin IVA y descuento por pronto pago que solo
-- descuenta el pago.
--
-- Relación 1:1 con la factura, como los demás detalles (0071): inv_id es la
-- clave primaria y la FK; sin sta_id porque la factura no se borra. Es
-- OPCIONAL: las facturas simples registradas antes de esta migración no
-- tienen importes y pueden aprobarse así (DEC-065). Las nuevas lo exigen
-- (lo verifica el service).
--
-- Solo se guarda lo capturado y las tasas congeladas (ADR-0023, decisión 10).
-- Subtotal, IVA, retenciones, total facturado y neto a pagar se calculan
-- siempre con `composeSimpleInvoice` en la versión de fórmula guardada
-- (ADR-0026, decisión 5); nunca se almacenan.
--
-- tbl_invoice_simple_details (prefijo isd_):
--   isd_value                   VALOR. > 0.
--   isd_withholding_pct         % retención en la fuente, sobre el VALOR.
--   isd_discount                Descuento AI: descuento comercial sobre el
--                               valor. ≤ VALOR.
--   isd_vat_pct                 % IVA, sobre VALOR − descuento AI.
--   isd_vat_withholding_pct     % retención de IVA, sobre el IVA.
--   isd_ica_withholding         Retención de ICA, digitada como valor.
--   isd_freight                 Flete, sin IVA.
--   isd_early_payment_discount  Descuento por pronto pago.
--   isd_formula_version         Versión de la fórmula con que se compone.
-- Valor y % IVA son obligatorios en el formulario; los demás valen 0 si se
-- dejan vacíos (DEC-065). Porcentajes DECIMAL(5,2) e importes DECIMAL(18,2)
-- (DEC-028).

CREATE TABLE `tbl_invoice_simple_details` (
  `inv_id` int NOT NULL,
  `isd_value` decimal(18, 2) NOT NULL,
  `isd_withholding_pct` decimal(5, 2) NOT NULL DEFAULT 0.00,
  `isd_discount` decimal(18, 2) NOT NULL DEFAULT 0.00,
  `isd_vat_pct` decimal(5, 2) NOT NULL,
  `isd_vat_withholding_pct` decimal(5, 2) NOT NULL DEFAULT 0.00,
  `isd_ica_withholding` decimal(18, 2) NOT NULL DEFAULT 0.00,
  `isd_freight` decimal(18, 2) NOT NULL DEFAULT 0.00,
  `isd_early_payment_discount` decimal(18, 2) NOT NULL DEFAULT 0.00,
  `isd_formula_version` smallint NOT NULL DEFAULT 1,
  `isd_create_by` int DEFAULT NULL,
  `isd_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isd_update_by` int DEFAULT NULL,
  `isd_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inv_id`) USING BTREE,
  CONSTRAINT `ck_invoice_simple_details_value` CHECK (`isd_value` > 0),
  CONSTRAINT `ck_invoice_simple_details_discount` CHECK (`isd_discount` >= 0 AND `isd_discount` <= `isd_value`),
  CONSTRAINT `ck_invoice_simple_details_amounts` CHECK (
    `isd_ica_withholding` >= 0 AND `isd_freight` >= 0 AND `isd_early_payment_discount` >= 0
  ),
  CONSTRAINT `ck_invoice_simple_details_pcts` CHECK (
    `isd_withholding_pct` BETWEEN 0 AND 100
    AND `isd_vat_pct` BETWEEN 0 AND 100
    AND `isd_vat_withholding_pct` BETWEEN 0 AND 100
  ),
  CONSTRAINT `ck_invoice_simple_details_formula` CHECK (`isd_formula_version` >= 1)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_invoice_simple_details`
ADD CONSTRAINT `tbl_invoice_simple_details_invoice` FOREIGN KEY (`inv_id`) REFERENCES `tbl_invoices` (`inv_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoice_simple_details_create_by` FOREIGN KEY (`isd_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_invoice_simple_details_update_by` FOREIGN KEY (`isd_update_by`) REFERENCES `tbl_users` (`use_id`);
