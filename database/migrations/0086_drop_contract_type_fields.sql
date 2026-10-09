-- Migración 0086: retira la configuración de campos del tipo de contrato
--
-- Requiere: 0085 ya aplicado (la configuración ya vive en el tipo de proveedor).
--
-- DEC-053: el tipo de contrato vuelve a ser un maestro simple (nombre y
-- estado). Se eliminan:
--
--   - tbl_contract_type_fields y tbl_contract_type_field_versions (0054, 0055).
--   - tbl_contract_types.ctt_config_version y su CHECK (0036, 0055).
--   - tbl_contracts.ctr_config_version y su CHECK (0049): con varios tipos de
--     proveedor el contrato ya no tiene UNA versión de configuración, y nada
--     la leía (los formularios usan la configuración vigente y protegen lo
--     anterior como valor heredado). Las versiones quedan en cada tipo de
--     proveedor (tbl_provider_type_field_versions), para auditar.
--
-- El catálogo tbl_contract_fields (0053) se conserva: sigue describiendo los
-- campos configurables del contrato.
--
-- Sin migración de datos: la configuración por tipo de proveedor la siembran
-- los scripts de carga.

DROP TABLE `tbl_contract_type_field_versions`;
DROP TABLE `tbl_contract_type_fields`;

ALTER TABLE `tbl_contract_types`
DROP CHECK `ck_contract_types_config_version`,
DROP COLUMN `ctt_config_version`;

ALTER TABLE `tbl_contracts`
DROP CHECK `ck_contracts_config_version`,
DROP COLUMN `ctr_config_version`;
