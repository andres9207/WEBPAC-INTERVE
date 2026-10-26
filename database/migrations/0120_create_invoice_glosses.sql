-- Migración 0120: glosas de facturas
--
-- Requiere: 0119 (tbl_statements, per_id hasta 122) ya aplicado.
--
-- DEC-085 (pedido del usuario, 2026-10-26; documento de alcance de Intervé,
-- punto 6: "generación de glosas, errores hallados durante el registro de
-- facturas recibidas, que se deben poder controlar hasta su liberación en un
-- extracto posterior"). Como la glosa de WebPAC (tblglosas): de la obra, con
-- código, valor y descripción, y del extracto en que se levanta. No bloquea
-- la aprobación de la factura.
--
-- 1. UNIQUE (inv_id, wrk_id) en tbl_invoices: apoyo de la FK compuesta que
--    garantiza que la glosa es de la obra de su factura.
-- 2. tbl_invoice_glosses: factura y obra; extracto en que se levanta
--    (opcional) y en que se libera (posterior, de la misma obra: FK
--    compuestas); código, valor (distinto de cero: con signo, como en
--    WebPAC) y descripción; la liberación con su fecha, observación y autor.
--    Liberada ⇔ tiene extracto y fecha de liberación (CHECK).
-- 3. Permiso 123 "Gestionar glosas" (ventana Facturas): verlas exige ver
--    facturas. No se otorga aquí: `yarn db:seed` lo da al perfil Superadmin.
--
-- Después: `npx prisma db pull` (o el schema.prisma versionado).

ALTER TABLE `tbl_invoices`
ADD UNIQUE INDEX `uq_invoices_id_work` (`inv_id`, `wrk_id`);

CREATE TABLE `tbl_invoice_glosses` (
  `igl_id` int NOT NULL AUTO_INCREMENT,
  `inv_id` int NOT NULL,
  `wrk_id` int NOT NULL,
  `stm_id` int DEFAULT NULL COMMENT 'Extracto en que se levanta la glosa',
  `igl_code` varchar(20) DEFAULT NULL,
  `igl_value` decimal(18, 2) NOT NULL,
  `igl_description` varchar(1000) NOT NULL,
  `igl_release_stm_id` int DEFAULT NULL COMMENT 'Extracto posterior en que se libera',
  `igl_release_date` date DEFAULT NULL,
  `igl_release_observation` varchar(1000) DEFAULT NULL,
  `igl_release_by` int DEFAULT NULL,
  `sta_id` int NOT NULL DEFAULT 1,
  `igl_create_by` int DEFAULT NULL,
  `igl_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `igl_update_by` int DEFAULT NULL,
  `igl_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `igl_delete_by` int DEFAULT NULL,
  `igl_delete_at` timestamp NULL DEFAULT NULL,
  `igl_idempotency_key` char(36) DEFAULT NULL,
  `igl_idempotency_hash` char(64) DEFAULT NULL,
  PRIMARY KEY (`igl_id`),
  UNIQUE INDEX `uq_invoice_glosses_idempotency_key` (`igl_idempotency_key`),
  INDEX `idx_invoice_glosses_invoice` (`inv_id`, `igl_release_date`),
  INDEX `idx_invoice_glosses_statement` (`stm_id`, `wrk_id`),
  INDEX `idx_invoice_glosses_release_statement` (`igl_release_stm_id`, `wrk_id`),
  CONSTRAINT `ck_invoice_glosses_value` CHECK (`igl_value` <> 0),
  CONSTRAINT `ck_invoice_glosses_release` CHECK ((`igl_release_stm_id` IS NULL) = (`igl_release_date` IS NULL)),
  CONSTRAINT `ck_invoice_glosses_release_statement` CHECK (`igl_release_stm_id` IS NULL OR `stm_id` IS NULL OR `igl_release_stm_id` <> `stm_id`)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_invoice_glosses`
ADD CONSTRAINT `tbl_invoice_glosses_invoice` FOREIGN KEY (`inv_id`, `wrk_id`) REFERENCES `tbl_invoices` (`inv_id`, `wrk_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoice_glosses_statement` FOREIGN KEY (`stm_id`, `wrk_id`) REFERENCES `tbl_statements` (`stm_id`, `wrk_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoice_glosses_release_statement` FOREIGN KEY (`igl_release_stm_id`, `wrk_id`) REFERENCES `tbl_statements` (`stm_id`, `wrk_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoice_glosses_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`),
ADD CONSTRAINT `tbl_invoice_glosses_release_by` FOREIGN KEY (`igl_release_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_invoice_glosses_create_by` FOREIGN KEY (`igl_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_invoice_glosses_update_by` FOREIGN KEY (`igl_update_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_invoice_glosses_delete_by` FOREIGN KEY (`igl_delete_by`) REFERENCES `tbl_users` (`use_id`);

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(123, 'Gestionar glosas', 18, 15);
