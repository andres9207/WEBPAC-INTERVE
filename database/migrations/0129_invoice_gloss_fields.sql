-- Migración 0129: una glosa sobre varios campos, cada uno con su valor; sin código (DEC-085)
--
-- Requiere: 0127 (tbl_invoice_glosses con igl_release_inv_id) ya aplicado.
--
-- Pedido del usuario, 2026-10-29: una glosa puede hacerse sobre varios campos
-- de la factura (el IVA y la retención en la fuente a la vez), y cada campo
-- lleva su propio valor, en pesos o en % de su importe (DEC-092). El valor de
-- la glosa es la suma de sus campos: se calcula, nunca se guarda. El código
-- de la glosa se quita.
--
-- 1. tbl_invoice_gloss_fields: una fila por campo glosado, con su valor (con
--    signo, distinto de cero). Un campo no se repite en la glosa (UNIQUE). El
--    dominio de campos es el de la 0126. Las filas son parte de la glosa: se
--    escriben con ella, bajo el bloqueo de su factura, y solo mientras está
--    abierta; quitar un campo borra su fila, y la bitácora de la glosa lo
--    registra.
-- 2. Cada glosa que ya existe pasa a una fila con su campo y su valor.
-- 3. Se quitan de tbl_invoice_glosses igl_code, igl_field e igl_value, con sus CHECK.
--
-- Después: `npx prisma db pull` (o el schema.prisma versionado).

CREATE TABLE `tbl_invoice_gloss_fields` (
  `igf_id` int NOT NULL AUTO_INCREMENT,
  `igl_id` int NOT NULL,
  `igf_field` varchar(30) NOT NULL COMMENT 'Campo de la factura glosado: línea del Detalle u other',
  `igf_value` decimal(18, 2) NOT NULL COMMENT 'Valor de la glosa sobre este campo, con signo',
  `igf_create_by` int DEFAULT NULL,
  `igf_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `igf_update_by` int DEFAULT NULL,
  `igf_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`igf_id`),
  UNIQUE INDEX `uq_invoice_gloss_fields_field` (`igl_id`, `igf_field`),
  CONSTRAINT `ck_invoice_gloss_fields_value` CHECK (`igf_value` <> 0),
  CONSTRAINT `ck_invoice_gloss_fields_field` CHECK (`igf_field` IN (
    'value', 'withholding', 'discount', 'vat', 'vatWithholding', 'icaWithholding', 'freight', 'earlyPaymentDiscount',
    'amortization', 'retention', 'materialsDiscount', 'advance', 'other'
  ))
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_invoice_gloss_fields`
ADD CONSTRAINT `tbl_invoice_gloss_fields_gloss` FOREIGN KEY (`igl_id`) REFERENCES `tbl_invoice_glosses` (`igl_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoice_gloss_fields_create_by` FOREIGN KEY (`igf_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_invoice_gloss_fields_update_by` FOREIGN KEY (`igf_update_by`) REFERENCES `tbl_users` (`use_id`);

INSERT INTO `tbl_invoice_gloss_fields` (`igl_id`, `igf_field`, `igf_value`, `igf_create_by`, `igf_create_at`, `igf_update_by`, `igf_update_at`)
SELECT `igl_id`, `igl_field`, `igl_value`, `igl_create_by`, `igl_create_at`, `igl_update_by`, `igl_update_at`
FROM `tbl_invoice_glosses`;

ALTER TABLE `tbl_invoice_glosses`
  DROP CHECK `ck_invoice_glosses_value`,
  DROP CHECK `ck_invoice_glosses_field`;

ALTER TABLE `tbl_invoice_glosses`
  DROP COLUMN `igl_code`,
  DROP COLUMN `igl_field`,
  DROP COLUMN `igl_value`;
