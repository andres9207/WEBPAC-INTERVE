-- Migración 0074: permiso "Cambiar solicitud de AIU del contrato"
--
-- Requiere: 0062 ya aplicado (página 16 "Contratos"); id 90 libre (0072
-- llegó hasta 89).
--
-- Id explícito y fijo: coincide con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.work.contracts.changeAiu).
--
-- ADR-0026 (P13) y DEC-046: apagar el AIU de un contrato cuyo tipo lo
-- aplica, o volver a encenderlo, exige este permiso además del de crear o
-- modificar el contrato. Quita o devuelve la utilidad, de la que depende el
-- IVA de los conceptos con AIU.
--
-- Asignación a perfiles: server/prisma/seed.js (`yarn db:seed`) lo otorga al
-- perfil Superadmin.

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(90, 'Cambiar solicitud de AIU del contrato', 16, 10);
