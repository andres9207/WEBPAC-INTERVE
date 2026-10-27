-- Migración 0123: el tipo de contrato es de la obra, no del contrato (DEC-086).
--
-- Requiere: 0049 (tbl_contracts), 0038 (tbl_works.ctt_id).
-- Quita tbl_contracts.ctt_id con su FK y su índice. El contrato muestra y
-- filtra por el tipo de su obra (tbl_works.ctt_id). El tipo que tuviera cada
-- contrato se pierde: no se copia a ninguna parte.

ALTER TABLE `tbl_contracts`
  DROP FOREIGN KEY `tbl_contracts_contract_type`;

ALTER TABLE `tbl_contracts`
  DROP INDEX `tbl_contracts_contract_type`,
  DROP COLUMN `ctt_id`;
