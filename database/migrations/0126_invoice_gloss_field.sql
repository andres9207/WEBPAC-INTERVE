-- Migración 0126: campo de la factura sobre el que se levanta la glosa (DEC-085)
--
-- Requiere: 0125 (tbl_invoice_glosses con el extracto como texto) ya aplicado.
--
-- Pedido del usuario, 2026-10-27: la glosa se hace sobre un campo de la
-- factura (VALOR, IVA, RTE FUENTE…), obligatorio. La clave es la línea del
-- panel Detalle del tipo de factura (glossFields.js); "other" para lo que no
-- es un campo. Qué campos admite cada tipo lo valida el service; la BD cierra
-- el dominio.
--
-- 1. igl_field, NOT NULL; las glosas que ya existen quedan como "other".
-- 2. CHECK con el dominio cerrado.
--
-- Después: `npx prisma db pull` (o el schema.prisma versionado).

ALTER TABLE `tbl_invoice_glosses`
ADD COLUMN `igl_field` varchar(30) NOT NULL DEFAULT 'other' COMMENT 'Campo de la factura glosado: línea del Detalle u other' AFTER `igl_statement`;

ALTER TABLE `tbl_invoice_glosses`
ALTER COLUMN `igl_field` DROP DEFAULT,
ADD CONSTRAINT `ck_invoice_glosses_field` CHECK (`igl_field` IN (
  'value', 'withholding', 'discount', 'vat', 'vatWithholding', 'icaWithholding', 'freight', 'earlyPaymentDiscount',
  'amortization', 'retention', 'materialsDiscount', 'advance', 'other'
));
