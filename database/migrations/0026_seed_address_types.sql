-- Migración 0026: tipos de dirección iniciales
--
-- Requiere: 0025_create_address_types.sql ya aplicado.
--
-- Respalda ADR-0009 (ejemplos del contexto, sin "principal", que es una
-- marca del contacto). Ids explícitos y fijos para que coincidan entre
-- ambientes; server/prisma/seed.js siembra los mismos con upsert sin pisar
-- nombres ya editados.
--
-- Autoría en NULL: es un dato de instalación, sin usuario de sesión.

INSERT INTO `tbl_address_types` (`adt_id`, `adt_name`, `sta_id`) VALUES
(1, 'Oficina', 1),
(2, 'Sucursal', 1),
(3, 'Correspondencia', 1),
(4, 'Facturación', 1),
(5, 'Bodega', 1);
