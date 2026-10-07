-- Migración 0077: permiso "Recibir conciliación de fechas fin de contratos"
--
-- Requiere: 0052 ya aplicado (página 16 "Contratos"); id 92 libre (0076
-- llegó hasta 91).
--
-- Id explícito y fijo: coincide con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.work.contracts.receiveReconciliation).
--
-- PRO-BE-13 / FND-BE-36: el proceso programado que compara la fecha fin
-- persistida de cada contrato con la derivada notifica las discrepancias a
-- los usuarios activos con este permiso (por perfil o individual). No
-- protege ningún endpoint.
--
-- Asignación a perfiles: server/prisma/seed.js (`yarn db:seed`) lo otorga al
-- perfil Superadmin.

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(92, 'Recibir conciliación de fechas fin de contratos', 16, 11);
