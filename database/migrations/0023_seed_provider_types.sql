-- Migración 0023: tipos de proveedor iniciales
--
-- Requiere: 0022_create_provider_types.sql ya aplicado.
--
-- Respalda ADR-0010 (los tres tipos del alcance funcional). Ids explícitos y
-- fijos para que coincidan entre ambientes; server/prisma/seed.js siembra
-- los mismos con upsert sin pisar nombres ya editados.
--
-- Autoría en NULL: es un dato de instalación, sin usuario de sesión.

INSERT INTO `tbl_provider_types` (`pvt_id`, `pvt_name`, `sta_id`) VALUES
(1, 'Simple', 1),
(2, 'Subcontratista', 1),
(3, 'Contrato mayor', 1);
