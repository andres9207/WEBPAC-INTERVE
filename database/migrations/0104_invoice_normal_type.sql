-- Migración 0104: factura normal (facturación del avance contra el contrato)
--
-- Requiere: 0066 (tbl_invoices, ck_invoices_type) y 0095
-- (tbl_invoice_liquidation_details.ctr_id y ccp_id) ya aplicados.
--
-- DEC-071 (resuelve DEC-01 del backlog con la alternativa c de ADR-0021): el
-- contrato en ejecución admite facturas NORMAL, por el contrato completo, con
-- VALOR (antes de IVA), amortización del anticipo y retenido contractual,
-- como la liquidación.
--
-- 1. ck_invoices_type admite 'NORMAL'. ck_invoices_type_links no cambia: la
--    normal es de contrato (con contrato y sin etapa).
-- 2. La normal guarda sus importes en tbl_invoice_liquidation_details: son los
--    mismos datos que la liquidación (VALOR, amortización y retenido, con sus
--    valores por defecto, porcentajes y observaciones), y así anticipo,
--    retenido e I5 suman de una sola tabla. La normal no se asocia a un
--    otrosí: ccp_id pasa a admitir NULL. La FK (ccp_id, ctr_id) no evalúa una
--    fila con ccp_id nulo; la FK (inv_id, ctr_id) sigue igual. Que la
--    liquidación tenga su otrosí y la normal no lo tenga depende del tipo de
--    la factura (otra tabla), que una CHECK no puede leer: lo garantiza el
--    service al escribir el detalle, bajo el bloqueo del contrato.

ALTER TABLE `tbl_invoices`
DROP CHECK `ck_invoices_type`;

ALTER TABLE `tbl_invoices`
ADD CONSTRAINT `ck_invoices_type` CHECK (`inv_type` IN ('SIMPLE', 'ADVANCE', 'LIQUIDATION', 'RETENTION_REFUND', 'NORMAL'));

ALTER TABLE `tbl_invoice_liquidation_details`
MODIFY `ccp_id` int DEFAULT NULL;
