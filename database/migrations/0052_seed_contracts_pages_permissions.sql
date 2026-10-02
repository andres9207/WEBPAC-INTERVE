-- Migración 0052: menú "Contratos" y permisos del módulo de contratos
--
-- Requiere: 0047 ya aplicado (pag_id hasta 15, per_id hasta 67).
--
-- Ids explícitos y fijos: coinciden con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.work.contracts). pag_url igual a la ruta del cliente.
--
-- Contratos cuelga del grupo "Obras" (pag_id 13): vive en el área work/
-- (DEC-035).
--
-- Acciones de ADR-0015 y ADR-0016 ("Autorización"):
--   - Crear contrato incluye su valor inicial: el valor inicial no tiene
--     permiso propio (ADR-0016).
--   - Crear otrosí y crear otrosí de liquidación van separados: el segundo
--     cambia el estado del contrato y cierra la puerta a otros otrosí.
--   - Modificar un concepto (costo, porcentajes, prórroga) es aparte de
--     modificar el contrato: cambia su valor.
--   - Anular otrosí, suspender, levantar y reabrir no se siembran: llegan con
--     sus decisiones pendientes (ADR-0016 B12, fase B).
--
-- Asignación a perfiles: server/prisma/seed.js (`yarn db:seed`) otorga la
-- página y los permisos de gestión (69 a 74) al perfil Superadmin, y el de
-- ver (68) a todos los perfiles.

INSERT INTO `tbl_pages` (`pag_id`, `pag_description`, `pag_parent`, `pag_url`, `pag_icon`, `pag_order`, `pag_name`, `pag_type`) VALUES
(16, 'Contratos', 13, 'work/contracts', 'file-description', 3, 'Contratos', 2);

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(68, 'Ver contratos', 16, 8),
(69, 'Crear contrato', 16, 1),
(70, 'Modificar contrato', 16, 2),
(71, 'Eliminar contrato', 16, 3),
(72, 'Crear otrosí', 16, 4),
(73, 'Crear otrosí de liquidación', 16, 5),
(74, 'Modificar concepto contractual', 16, 6);
