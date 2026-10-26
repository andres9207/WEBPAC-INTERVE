-- Migración 0116: NIT de la aseguradora
--
-- Requiere: 0028 (tbl_insurers) ya aplicado.
--
-- Pedido de Intervé (documento de alcance del 2026-09-24, punto 1.6): la
-- aseguradora lleva su NIT, como la constructora (0115). Mismas reglas:
-- obligatorio y único, de 5 a 15 dígitos, guion y un dígito de verificación
-- obligatorio pero libre (no se recalcula). Hasta 17 caracteres. Se aparta de
-- la decisión 1 de ADR-0003 ("dos atributos: descripción y estado").
--
-- 1. tbl_insurers.ins_nit: NULL en la BD porque las aseguradoras que ya
--    existen no tienen NIT. El servidor lo exige al crear y al editar (campo
--    requerido del maestro), así que una existente pide su NIT la próxima vez
--    que se guarda.
--
-- 2. Único entre no eliminadas, como la descripción: columna generada
--    ins_nit_active + UNIQUE (CRUD_STANDARD). Los NULL no chocan entre sí.
--
-- Después: `npx prisma db pull` (o el schema.prisma versionado).

ALTER TABLE `tbl_insurers`
ADD COLUMN `ins_nit` varchar(17) NULL AFTER `ins_description`,
ADD COLUMN `ins_nit_active` varchar(17) GENERATED ALWAYS AS (IF(`sta_id` <> 3, `ins_nit`, NULL)) VIRTUAL,
ADD UNIQUE INDEX `uq_insurers_nit_active` (`ins_nit_active`);
