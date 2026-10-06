-- Migración 0073: solicitud de AIU en el contrato (ctr_aiu_requested)
--
-- Requiere: 0049 (tbl_contracts) y 0050 (tbl_contract_concepts, con los
-- porcentajes desagregados ccp_admin_pct, ccp_contingency_pct y
-- ccp_profit_pct y su CHECK de 0 a 100) ya aplicados.
--
-- Respalda ADR-0026 (punto abierto P13, resuelto "por contrato") y el
-- backlog PRO-BD-23. Reglas en DEC-046. El AIU se decide en cadena:
--   1. El tipo de contrato declara si aplica: A, I o U configurados como
--      "aplica" (DEC-037).
--   2. El contrato lo solicita o no (esta columna). Apagarlo, o volver a
--      encenderlo, exige un permiso propio (0074) y queda en la bitácora.
--   3. El concepto pacta A, I y U desagregados (la factura de liquidación
--      pide el porcentaje de utilidad, que no se deriva de un AIU total).
-- El AIU aplica si el tipo lo declara y el contrato lo solicita. Si no,
-- A, I y U no se capturan en ningún concepto del contrato.
--
-- Valor por defecto 1: los contratos existentes quedan como estaban (el
-- AIU sigue gobernado solo por el tipo). Al crear, el service toma el
-- valor de la configuración del tipo: 1 si el tipo aplica AIU, 0 si no.

ALTER TABLE `tbl_contracts`
ADD COLUMN `ctr_aiu_requested` tinyint(1) NOT NULL DEFAULT 1 AFTER `ctr_observation`;
