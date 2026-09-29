-- Migración 0031: tipos de interventoría iniciales
--
-- Requiere: 0030_create_supervision_types.sql ya aplicado.
--
-- Respalda ADR-0007 (clasificaciones del contexto). Ids explícitos y fijos
-- para que coincidan entre ambientes; server/prisma/seed.js siembra los
-- mismos con upsert sin pisar nombres ya editados.
--
-- Autoría en NULL: es un dato de instalación, sin usuario de sesión.

INSERT INTO `tbl_supervision_types` (`spt_id`, `spt_name`, `sta_id`) VALUES
(1, 'Técnica', 1),
(2, 'Administrativa', 1),
(3, 'Financiera', 1),
(4, 'Integral', 1);
