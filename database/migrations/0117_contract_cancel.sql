-- Migración 0117: anular un contrato
--
-- Requiere: 0049 (tbl_contracts), 0051 (tbl_contract_status_history), 0080
-- (ck_reasons_scope con POLICY_CANCEL) y 0113 (per_id hasta 116) ya aplicados.
-- No toca datos.
--
-- DEC-082 (pedido del usuario, 2026-10-26): un contrato se anula desde
-- cualquier estado, también con facturas aprobadas, con un permiso propio. Es
-- un estado final: el contrato anulado solo se consulta.
--
-- 1. Estado CANCELLED en el contrato y en su historial de estado.
-- 2. Ámbito CONTRACT_CANCEL en el catálogo de motivos (DEC-039): anular exige
--    un motivo de ese acto, como anular una factura o una póliza.
-- 3. Permiso 117 "Anular contrato" (ventana Contratos). Id explícito y fijo:
--    coincide con server/prisma/seed.js y con
--    server/src/common/constants/permissions.constants.js
--    (PERMISSIONS.work.contracts.cancel). No se otorga a nadie aquí:
--    `yarn db:seed` lo da al perfil Superadmin.

ALTER TABLE `tbl_contracts`
DROP CHECK `ck_contracts_state`;

ALTER TABLE `tbl_contracts`
ADD CONSTRAINT `ck_contracts_state` CHECK (`ctr_state` IN ('IN_PROGRESS', 'SUSPENDED', 'IN_LIQUIDATION', 'LIQUIDATED', 'CANCELLED'));

ALTER TABLE `tbl_contract_status_history`
DROP CHECK `ck_contract_status_history_states`;

ALTER TABLE `tbl_contract_status_history`
ADD CONSTRAINT `ck_contract_status_history_states` CHECK (
  (`csh_from_state` IS NULL OR `csh_from_state` IN ('IN_PROGRESS', 'SUSPENDED', 'IN_LIQUIDATION', 'LIQUIDATED', 'CANCELLED'))
  AND `csh_to_state` IN ('IN_PROGRESS', 'SUSPENDED', 'IN_LIQUIDATION', 'LIQUIDATED', 'CANCELLED')
);

ALTER TABLE `tbl_reasons`
DROP CHECK `ck_reasons_scope`;

ALTER TABLE `tbl_reasons`
ADD CONSTRAINT `ck_reasons_scope` CHECK (`rea_scope` IN ('SUSPENSION', 'INVOICE_CANCEL', 'POLICY_CANCEL', 'CONTRACT_CANCEL'));

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(117, 'Anular contrato', 16, 17);
