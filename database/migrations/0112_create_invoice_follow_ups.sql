-- Migración 0112: tabla tbl_invoice_follow_ups (seguimiento de facturas)
--
-- Requiere: 0066 (tbl_invoices) ya aplicado.
--
-- Pedido del usuario (2026-10-23), DEC-076. Prefijo ifu_.
--
-- Registro manual de lo que se está trabajando sobre una factura: se abre con
-- una fecha y una descripción, y se cierra con una observación; la fecha de
-- cierre es la del servidor al cerrar. Una factura tiene varios seguimientos,
-- pero como máximo uno abierto.
--
--   ifu_open_date          Fecha de apertura, la que escribe el usuario.
--   ifu_description        Qué se le hace seguimiento.
--   ifu_close_date         Fecha del cierre (servidor). NULL mientras está abierto.
--   ifu_close_observation  Observación del cierre.
--   ifu_close_by           Quién lo cerró (update_by cambia también al editar).
--
-- Mientras está abierto se edita y se elimina (eliminación lógica, sta_id 3);
-- cerrado, solo se consulta (lo verifica el service).
--
-- Un solo seguimiento abierto por factura: UNIQUE sobre la columna generada
-- ifu_open_invoice (la factura mientras está abierto y no eliminado, NULL
-- después). El service lo verifica además bajo bloqueo de la factura.
--
-- Idempotencia de la creación (ADR-0027): ifu_idempotency_key / _hash.

CREATE TABLE `tbl_invoice_follow_ups` (
  `ifu_id` int NOT NULL AUTO_INCREMENT,
  `inv_id` int NOT NULL,
  `ifu_open_date` date NOT NULL,
  `ifu_description` varchar(1000) NOT NULL,
  `ifu_close_date` date DEFAULT NULL,
  `ifu_close_observation` varchar(1000) DEFAULT NULL,
  `ifu_close_by` int DEFAULT NULL,
  `sta_id` int NOT NULL DEFAULT 1,
  `ifu_create_by` int DEFAULT NULL,
  `ifu_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ifu_update_by` int DEFAULT NULL,
  `ifu_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ifu_delete_by` int DEFAULT NULL,
  `ifu_delete_at` timestamp NULL DEFAULT NULL,
  `ifu_idempotency_key` char(36) DEFAULT NULL,
  `ifu_idempotency_hash` char(64) DEFAULT NULL,
  `ifu_open_invoice` int GENERATED ALWAYS AS (IF(`ifu_close_date` IS NULL AND `sta_id` <> 3, `inv_id`, NULL)) VIRTUAL,
  PRIMARY KEY (`ifu_id`) USING BTREE,
  UNIQUE INDEX `uq_invoice_follow_ups_open` (`ifu_open_invoice`),
  UNIQUE INDEX `uq_invoice_follow_ups_idempotency_key` (`ifu_idempotency_key`),
  INDEX `idx_invoice_follow_ups_invoice` (`inv_id`, `ifu_open_date`),
  INDEX `tbl_invoice_follow_ups_status` (`sta_id`),
  CONSTRAINT `ck_invoice_follow_ups_close` CHECK (
    (`ifu_close_date` IS NULL AND `ifu_close_observation` IS NULL AND `ifu_close_by` IS NULL)
    OR (`ifu_close_date` IS NOT NULL AND `ifu_close_observation` IS NOT NULL AND `ifu_close_by` IS NOT NULL)
  ),
  CONSTRAINT `ck_invoice_follow_ups_dates` CHECK (`ifu_close_date` IS NULL OR `ifu_close_date` >= `ifu_open_date`)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_invoice_follow_ups`
ADD CONSTRAINT `tbl_invoice_follow_ups_invoice` FOREIGN KEY (`inv_id`) REFERENCES `tbl_invoices` (`inv_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoice_follow_ups_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`),
ADD CONSTRAINT `tbl_invoice_follow_ups_close_by` FOREIGN KEY (`ifu_close_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_invoice_follow_ups_create_by` FOREIGN KEY (`ifu_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_invoice_follow_ups_update_by` FOREIGN KEY (`ifu_update_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_invoice_follow_ups_delete_by` FOREIGN KEY (`ifu_delete_by`) REFERENCES `tbl_users` (`use_id`);
