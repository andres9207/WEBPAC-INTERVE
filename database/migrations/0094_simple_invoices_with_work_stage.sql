-- Migración 0094: la factura simple vuelve a la obra, con etapa obligatoria
--
-- Requiere: 0089 ya aplicado (wrk_id admite NULL, sin wks_id ni la FK a
-- tbl_work_providers).
--
-- DEC-058 (reemplaza la parte de la simple de DEC-054): la factura simple se
-- imputa a una etapa de una obra y su proveedor está asignado a esa obra. Sin
-- contrato, como antes. Las vistas de facturas (DEC-054, DEC-056) no cambian.
--
-- Decidido por el usuario (2026-10-14): las facturas simples existentes, sin
-- obra ni etapa, son de prueba: se borran con su historial (no tienen tabla
-- de detalle). La bitácora (tbl_audit_log) no tiene FK y conserva sus filas.
--
-- 1. tbl_invoices.wrk_id vuelve a ser obligatorio.
-- 2. Vuelve wks_id: etapa de la simple, nula en las de contrato (su etapa es
--    la del contrato, no se copia). FK (wks_id, wrk_id) → tbl_work_stages: la
--    etapa es de la obra; impide quitarla mientras tenga facturas.
-- 3. Vuelve la FK (wrk_id, prv_id) → tbl_work_providers: el proveedor está
--    asignado a la obra; impide desasignarlo mientras tenga facturas en ella.
--    Las de contrato ya la cumplen: la FK del contrato exige la asignación.
-- 4. ck_invoices_type_links: SIMPLE sin contrato y con etapa; las demás con
--    contrato y sin etapa.
-- El service repite estas validaciones para dar el mensaje claro.
--
-- MySQL no cambia la nulabilidad de una columna que usa una FK (error 1832):
-- las FK tbl_invoices_work y tbl_invoices_contract se quitan y se vuelven a
-- crear igual que en 0066.

DELETE `h` FROM `tbl_invoice_status_history` `h`
JOIN `tbl_invoices` `i` ON `i`.`inv_id` = `h`.`inv_id`
WHERE `i`.`inv_type` = 'SIMPLE';

DELETE FROM `tbl_invoices` WHERE `inv_type` = 'SIMPLE';

ALTER TABLE `tbl_invoices`
DROP CHECK `ck_invoices_type_links`;

ALTER TABLE `tbl_invoices`
DROP FOREIGN KEY `tbl_invoices_work`,
DROP FOREIGN KEY `tbl_invoices_contract`;

ALTER TABLE `tbl_invoices`
MODIFY `wrk_id` int NOT NULL,
ADD COLUMN `wks_id` int DEFAULT NULL AFTER `wrk_id`;

ALTER TABLE `tbl_invoices`
ADD CONSTRAINT `tbl_invoices_work` FOREIGN KEY (`wrk_id`) REFERENCES `tbl_works` (`wrk_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoices_contract` FOREIGN KEY (`ctr_id`, `wrk_id`, `prv_id`) REFERENCES `tbl_contracts` (`ctr_id`, `wrk_id`, `prv_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoices_work_provider` FOREIGN KEY (`wrk_id`, `prv_id`) REFERENCES `tbl_work_providers` (`wrk_id`, `prv_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoices_work_stage` FOREIGN KEY (`wks_id`, `wrk_id`) REFERENCES `tbl_work_stages` (`wks_id`, `wrk_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `ck_invoices_type_links` CHECK (
  (`inv_type` = 'SIMPLE' AND `ctr_id` IS NULL AND `wks_id` IS NOT NULL)
  OR (`inv_type` <> 'SIMPLE' AND `ctr_id` IS NOT NULL AND `wks_id` IS NULL)
);
