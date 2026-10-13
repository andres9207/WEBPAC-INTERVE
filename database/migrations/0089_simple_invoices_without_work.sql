-- Migración 0089: la factura simple no tiene obra ni etapa
--
-- Requiere: 0066, 0067, 0071 y 0083 ya aplicados.
--
-- DEC-054 (resuelve ADR-0023, decisión 3): la factura simple es del
-- proveedor, sin obra, etapa ni contrato. Se ve en las obras a las que su
-- proveedor está asignado (alcance por obra, DEC-047), lo que decide el
-- service, no el esquema.
--
-- Asume que las facturas simples existentes son de prueba: se borran con su
-- historial (no tienen tabla de detalle). La bitácora (tbl_audit_log) no
-- tiene FK y conserva sus filas.
--
-- 1. tbl_invoices.wrk_id pasa a admitir NULL: nulo en SIMPLE, el del
--    contrato en las demás.
-- 2. Se retira wks_id con su FK y su índice: ninguna factura la guarda (las
--    de contrato usan la etapa del contrato, DEC-042).
-- 3. Se retira la FK (wrk_id, prv_id) → tbl_work_providers: en las de
--    contrato ya la garantiza la FK compuesta al contrato, cuyo propio FK a
--    tbl_work_providers impide desasignar al proveedor.
-- 4. ck_invoices_type_links: SIMPLE sin obra ni contrato; las demás con los dos.

DELETE `h` FROM `tbl_invoice_status_history` `h`
JOIN `tbl_invoices` `i` ON `i`.`inv_id` = `h`.`inv_id`
WHERE `i`.`inv_type` = 'SIMPLE';

DELETE FROM `tbl_invoices` WHERE `inv_type` = 'SIMPLE';

ALTER TABLE `tbl_invoices`
DROP CHECK `ck_invoices_type_links`,
DROP FOREIGN KEY `tbl_invoices_work_stage`,
DROP FOREIGN KEY `tbl_invoices_work_provider`;

ALTER TABLE `tbl_invoices`
DROP INDEX `tbl_invoices_work_stage`,
DROP COLUMN `wks_id`,
MODIFY `wrk_id` int DEFAULT NULL;

ALTER TABLE `tbl_invoices`
ADD CONSTRAINT `ck_invoices_type_links` CHECK (
  (`inv_type` = 'SIMPLE' AND `ctr_id` IS NULL AND `wrk_id` IS NULL)
  OR (`inv_type` <> 'SIMPLE' AND `ctr_id` IS NOT NULL AND `wrk_id` IS NOT NULL)
);
