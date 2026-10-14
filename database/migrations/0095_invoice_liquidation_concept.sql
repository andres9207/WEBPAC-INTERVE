-- Migración 0095: la factura de liquidación se asocia a su otrosí de liquidación
--
-- Requiere: 0050 (tbl_contract_concepts, con uq_contract_concepts_id_contract
-- y ccp_liquidation_key), 0066 (tbl_invoices) y 0071
-- (tbl_invoice_liquidation_details) ya aplicados.
--
-- DEC-059 (ADR-0021, decisión confirmada: la factura de liquidación se asocia
-- al otrosí de liquidación). Hasta aquí la asociación era implícita: solo se
-- admitía con el contrato en liquidación, al que se llega creando el otrosí.
--
-- 1. tbl_invoices gana UNIQUE (inv_id, ctr_id): lo referencia la FK del
--    detalle. inv_id ya es único; el índice solo hace referenciable el par.
-- 2. tbl_invoice_liquidation_details gana:
--      ctr_id  Contrato de la factura. FK (inv_id, ctr_id) → tbl_invoices: es
--              el de la factura, no otro.
--      ccp_id  Otrosí de liquidación facturado. FK (ccp_id, ctr_id) →
--              tbl_contract_concepts: el concepto es del mismo contrato
--              (mismo criterio que las pólizas, 0081). Impide borrar el
--              otrosí mientras tenga facturas.
--    Que el concepto sea de tipo LIQUIDATION no es expresable con una FK
--    (ccp_liquidation_key es una columna generada VIRTUAL): lo verifica el
--    service bajo el bloqueo del contrato. Un contrato tiene a lo sumo un
--    otrosí de liquidación (ccp_liquidation_key UNIQUE).
-- 3. Las liquidaciones existentes toman el otrosí de liquidación de su
--    contrato. Si alguna no lo tiene, el ALTER a NOT NULL falla y la
--    migración se detiene: hay que revisarla a mano.

ALTER TABLE `tbl_invoices`
ADD UNIQUE INDEX `uq_invoices_id_contract` (`inv_id`, `ctr_id`);

ALTER TABLE `tbl_invoice_liquidation_details`
ADD COLUMN `ctr_id` int DEFAULT NULL AFTER `inv_id`,
ADD COLUMN `ccp_id` int DEFAULT NULL AFTER `ctr_id`;

UPDATE `tbl_invoice_liquidation_details` `d`
JOIN `tbl_invoices` `i` ON `i`.`inv_id` = `d`.`inv_id`
JOIN `tbl_contract_concepts` `c` ON `c`.`ctr_id` = `i`.`ctr_id` AND `c`.`ccp_type` = 'LIQUIDATION'
SET `d`.`ctr_id` = `i`.`ctr_id`, `d`.`ccp_id` = `c`.`ccp_id`;

ALTER TABLE `tbl_invoice_liquidation_details`
MODIFY `ctr_id` int NOT NULL,
MODIFY `ccp_id` int NOT NULL;

ALTER TABLE `tbl_invoice_liquidation_details`
ADD CONSTRAINT `tbl_invoice_liquidation_details_invoice_contract` FOREIGN KEY (`inv_id`, `ctr_id`) REFERENCES `tbl_invoices` (`inv_id`, `ctr_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoice_liquidation_details_concept` FOREIGN KEY (`ccp_id`, `ctr_id`) REFERENCES `tbl_contract_concepts` (`ccp_id`, `ctr_id`) ON DELETE RESTRICT;
