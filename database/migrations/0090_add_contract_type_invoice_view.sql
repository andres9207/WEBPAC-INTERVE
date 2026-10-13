-- Migración 0090: menú de facturas del tipo de contrato
--
-- Requiere: 0036 (tbl_contract_types) ya aplicado.
--
-- DEC-054 (resuelve H7 de ADR-0022): "contrato mayor" y "subcontratista" se
-- deciden por el tipo de contrato. Cada tipo declara en qué vista de facturas
-- aparecen las facturas de sus contratos.
--
--   ctt_invoice_view   MAJOR (menú "Facturas contrato mayor") o
--                      SUBCONTRACTOR (menú "Facturas subcontratistas").
--                      NULL = sin definir: sus contratos no admiten facturas
--                      hasta que se defina (lo verifica el service).
--                      No cambia si algún contrato del tipo tiene facturas;
--                      tampoco cambia el tipo de un contrato con facturas
--                      (los dos los verifica el service).
--
-- Datos existentes: los tipos se marcan por su nombre, entre los no
-- eliminados: los que contienen "subcontrat" van a SUBCONTRACTOR, y los que
-- contienen "mayor", a MAJOR. Los demás quedan sin definir. Revisar el
-- maestro después de aplicarla.

ALTER TABLE `tbl_contract_types`
ADD COLUMN `ctt_invoice_view` varchar(20) DEFAULT NULL AFTER `ctt_name`,
ADD CONSTRAINT `ck_contract_types_invoice_view` CHECK (`ctt_invoice_view` IS NULL OR `ctt_invoice_view` IN ('MAJOR', 'SUBCONTRACTOR'));

UPDATE `tbl_contract_types` SET `ctt_invoice_view` = 'SUBCONTRACTOR'
WHERE `sta_id` <> 3 AND LOWER(`ctt_name`) LIKE '%subcontrat%';

UPDATE `tbl_contract_types` SET `ctt_invoice_view` = 'MAJOR'
WHERE `sta_id` <> 3 AND `ctt_invoice_view` IS NULL AND LOWER(`ctt_name`) LIKE '%mayor%';
