-- Migración 0057: configuración inicial de los tipos existentes y permiso "Configurar campos"
--
-- Requiere: 0053 a 0055 ya aplicados (per_id hasta 74).
--
-- 1. Configuración inicial (DEC-037). Con el criterio restrictivo, un tipo
--    sin configuración no muestra ningún campo configurable: los tipos que ya
--    existen perderían los porcentajes del formulario. Para que se comporten
--    igual que antes, cada tipo existente (no eliminado) recibe todos los
--    campos del catálogo como aplicables y visibles; obligatoria solo la
--    etapa, que hasta hoy lo era. Es su versión 1 (ctt_config_version ya vale
--    1), y se copia al historial de versiones. Los tipos que se creen después
--    nacen sin configuración.
--
-- 2. Permiso 75 "Configurar campos del tipo de contrato", aparte de
--    modificar: cambiar la configuración afecta a todos los contratos futuros
--    del tipo (ADR-0006, "Autorización"). Id fijo: coincide con
--    server/prisma/seed.js y con PERMISSIONS.admin.contractTypes.configureFields.
--    seed.js (`yarn db:seed`) lo otorga al perfil Superadmin.

INSERT INTO `tbl_contract_type_fields` (`ctt_id`, `cfd_id`, `ctf_applies`, `ctf_visible`, `ctf_required`, `ctf_order`)
SELECT t.`ctt_id`, f.`cfd_id`, 1, 1, IF(f.`cfd_key` = 'STAGE', 1, 0), f.`cfd_order`
FROM `tbl_contract_types` t
CROSS JOIN `tbl_contract_fields` f
WHERE t.`sta_id` <> 3;

INSERT INTO `tbl_contract_type_field_versions` (`ctt_id`, `cfv_version`, `cfd_id`, `cfv_applies`, `cfv_visible`, `cfv_required`, `cfv_order`)
SELECT c.`ctt_id`, t.`ctt_config_version`, c.`cfd_id`, c.`ctf_applies`, c.`ctf_visible`, c.`ctf_required`, c.`ctf_order`
FROM `tbl_contract_type_fields` c
JOIN `tbl_contract_types` t ON t.`ctt_id` = c.`ctt_id`;

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(75, 'Configurar campos del tipo de contrato', 12, 6);
