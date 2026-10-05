-- Migración 0068: ámbito INVOICE_CANCEL en el catálogo de motivos
--
-- Requiere: 0060 (tbl_reasons) ya aplicado. No toca datos.
--
-- Anular una factura exige motivo (ADR-0020, "Auditoría"; DEC-042). El
-- catálogo único de motivos de las transiciones manuales (DEC-039) gana el
-- ámbito de anulación de factura: se amplía el CHECK, y REASON_SCOPES
-- (reasons.service.js) y REASON_SCOPE_OPTIONS (cliente) en el mismo cambio.

ALTER TABLE `tbl_reasons`
DROP CHECK `ck_reasons_scope`;

ALTER TABLE `tbl_reasons`
ADD CONSTRAINT `ck_reasons_scope` CHECK (`rea_scope` IN ('SUSPENSION', 'INVOICE_CANCEL'));
