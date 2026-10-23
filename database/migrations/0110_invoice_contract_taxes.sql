-- Migración 0110: IVA, retenciones tributarias y descuento de materiales de
-- las facturas normal y de liquidación
--
-- Requiere: 0071 (tbl_invoice_liquidation_details), 0083 (retenido) y 0104
-- (la normal usa el mismo detalle) ya aplicados.
--
-- Respalda ADR-0021 y ADR-0026 con la composición que fijó el usuario en
-- DEC-075 (cierra backlog DEC-03), tomada del sistema que se migra y
-- verificada al centavo con su pantalla:
--
--   IVA = VALOR × % IVA (el % utilidad se guarda, pero no entra en el
--   cálculo); RTE FUENTE = VALOR × %; RTE IVA = IVA × %; RTE ICA digitada
--   como valor; TOTAL = VALOR + IVA − RTE FUENTE − RTE IVA − RTE ICA
--   − AMORTIZACIÓN − RETENIDO − DCTO MATERIALES.
--
-- Columnas OPCIONALES: las facturas normales y de liquidación registradas
-- antes de esta migración no tienen estos importes y pueden aprobarse así
-- (DEC-075, como las simples en DEC-065). Las nuevas los exigen (lo verifica
-- el service). Todas o ninguna (`ck_..._taxes_all`).
--
-- Solo se guarda lo capturado y las tasas congeladas (ADR-0026, decisión 5).
-- IVA, retenciones y neto a pagar se calculan siempre con
-- `composeContractInvoice` en la versión de fórmula guardada; nunca se
-- almacenan.
--
-- tbl_invoice_liquidation_details (prefijo ild_), columnas nuevas:
--   ild_utility_pct          % utilidad aplicado, congelado (ADR-0026, decisión 7).
--   ild_vat_pct              % IVA, sobre el VALOR.
--   ild_withholding_pct      % retención en la fuente, sobre el VALOR.
--   ild_vat_withholding_pct  % retención de IVA, sobre el IVA.
--   ild_ica_withholding      Retención de ICA, digitada como valor.
--   ild_materials_discount   Descuento de materiales: resta del neto a pagar.
--   ild_formula_version      Versión de la fórmula con que se compone.
-- Porcentajes DECIMAL(5,2) e importes DECIMAL(18,2) (DEC-028).

ALTER TABLE `tbl_invoice_liquidation_details`
ADD COLUMN `ild_utility_pct` decimal(5, 2) DEFAULT NULL AFTER `ild_retention_observation`,
ADD COLUMN `ild_vat_pct` decimal(5, 2) DEFAULT NULL AFTER `ild_utility_pct`,
ADD COLUMN `ild_withholding_pct` decimal(5, 2) DEFAULT NULL AFTER `ild_vat_pct`,
ADD COLUMN `ild_vat_withholding_pct` decimal(5, 2) DEFAULT NULL AFTER `ild_withholding_pct`,
ADD COLUMN `ild_ica_withholding` decimal(18, 2) DEFAULT NULL AFTER `ild_vat_withholding_pct`,
ADD COLUMN `ild_materials_discount` decimal(18, 2) DEFAULT NULL AFTER `ild_ica_withholding`,
ADD COLUMN `ild_formula_version` smallint DEFAULT NULL AFTER `ild_materials_discount`,
ADD CONSTRAINT `ck_invoice_liquidation_details_taxes_all` CHECK (
  (`ild_utility_pct` IS NULL AND `ild_vat_pct` IS NULL AND `ild_withholding_pct` IS NULL AND `ild_vat_withholding_pct` IS NULL
    AND `ild_ica_withholding` IS NULL AND `ild_materials_discount` IS NULL AND `ild_formula_version` IS NULL)
  OR (`ild_utility_pct` IS NOT NULL AND `ild_vat_pct` IS NOT NULL AND `ild_withholding_pct` IS NOT NULL AND `ild_vat_withholding_pct` IS NOT NULL
    AND `ild_ica_withholding` IS NOT NULL AND `ild_materials_discount` IS NOT NULL AND `ild_formula_version` IS NOT NULL)
),
ADD CONSTRAINT `ck_invoice_liquidation_details_tax_pcts` CHECK (
  `ild_utility_pct` BETWEEN 0 AND 100
  AND `ild_vat_pct` BETWEEN 0 AND 100
  AND `ild_withholding_pct` BETWEEN 0 AND 100
  AND `ild_vat_withholding_pct` BETWEEN 0 AND 100
),
ADD CONSTRAINT `ck_invoice_liquidation_details_tax_amounts` CHECK (`ild_ica_withholding` >= 0 AND `ild_materials_discount` >= 0),
ADD CONSTRAINT `ck_invoice_liquidation_details_formula` CHECK (`ild_formula_version` >= 1);
