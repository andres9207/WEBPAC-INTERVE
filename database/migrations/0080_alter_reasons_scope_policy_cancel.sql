-- Migración 0080: ámbito POLICY_CANCEL en el catálogo de motivos
--
-- Requiere: 0068 ya aplicado. No toca datos.
--
-- Anular una póliza exige motivo (ADR-0018, decisión 6; DEC-050). El
-- catálogo único de motivos (DEC-039) gana el ámbito de anulación de póliza:
-- se amplía el CHECK, y REASON_SCOPES (reasons.service.js) y
-- REASON_SCOPE_OPTIONS (cliente) en el mismo cambio.

ALTER TABLE `tbl_reasons`
DROP CHECK `ck_reasons_scope`;

ALTER TABLE `tbl_reasons`
ADD CONSTRAINT `ck_reasons_scope` CHECK (`rea_scope` IN ('SUSPENSION', 'INVOICE_CANCEL', 'POLICY_CANCEL'));
