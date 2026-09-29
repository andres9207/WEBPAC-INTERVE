-- Migración 0018: tipos de identificación iniciales
--
-- Requiere: 0017_create_identity_documents.sql ya aplicado.
--
-- Respalda ADR-0008. Ids explícitos y fijos para que coincidan entre
-- ambientes; server/prisma/seed.js siembra los mismos con upsert para
-- reparar una BD existente sin pisar nombres ya editados.
--
-- Sin reglas de formato por tipo (decisión del 2026-09-29): el número de
-- documento se guarda como texto. El NIT se registra con su dígito de
-- verificación (p. ej. 900123456-7).
--
-- Autoría en NULL: es un dato de instalación, sin usuario de sesión.

INSERT INTO `tbl_identity_documents` (`idd_id`, `idd_code`, `idd_name`, `sta_id`) VALUES
(1, 'CC', 'Cédula de ciudadanía', 1),
(2, 'CE', 'Cédula de extranjería', 1),
(3, 'NIT', 'NIT', 1),
(4, 'PA', 'Pasaporte', 1),
(5, 'PPT', 'Permiso por protección temporal', 1);
