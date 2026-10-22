-- Migración 0103: permisos "Exportar contratos" y "Exportar facturas"
--
-- Requiere: 0101 ya aplicado (per_id hasta 111).
--
-- DEC-070 (ADR-0014, acción EXPORTAR): el reporte en Excel o PDF de un
-- listado, con sus filtros y sin paginar, tiene permiso propio por módulo.
-- Ids explícitos y fijos: coinciden con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.work.contracts.export, PERMISSIONS.billing.invoices.export).
-- Exportar facturas exige además ver la vista del listado.
--
-- No se otorgan a nadie aquí: `yarn db:seed` los da al perfil Superadmin y el
-- administrador los asigna desde Permisos (ventanas Contratos y Facturas).

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(112, 'Exportar contratos', 16, 16),
(113, 'Exportar facturas', 18, 13);
