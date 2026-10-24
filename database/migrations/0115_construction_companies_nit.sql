-- Migración 0115: NIT de la constructora
--
-- Requiere: 0033 (tbl_construction_companies) ya aplicado.
--
-- Pedido del usuario (2026-10-24): la constructora lleva su NIT, obligatorio
-- y único: de 5 a 15 dígitos, guion y un dígito de verificación obligatorio
-- pero libre (no se recalcula). Hasta 17 caracteres.
--
-- 1. tbl_construction_companies.cnc_nit: NULL en la BD porque las
--    constructoras que ya existen no tienen NIT. El servidor lo exige al crear
--    y al editar (campo requerido del maestro), así que una existente pide su
--    NIT la próxima vez que se guarda.
--
-- 2. Único entre no eliminadas, como la descripción: columna generada
--    cnc_nit_active + UNIQUE (CRUD_STANDARD). Los NULL no chocan entre sí.
--
-- Después: `npx prisma db pull` (o el schema.prisma versionado).

ALTER TABLE `tbl_construction_companies`
ADD COLUMN `cnc_nit` varchar(17) NULL AFTER `cnc_description`,
ADD COLUMN `cnc_nit_active` varchar(17) GENERATED ALWAYS AS (IF(`sta_id` <> 3, `cnc_nit`, NULL)) VIRTUAL,
ADD UNIQUE INDEX `uq_construction_companies_nit_active` (`cnc_nit_active`);
