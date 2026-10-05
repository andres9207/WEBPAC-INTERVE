-- Migración 0066: tabla tbl_invoices (encabezado común de factura)
--
-- Requiere: 0040 y 0048 (tbl_work_stages y su índice), 0044
-- (tbl_providers), 0046 (tbl_work_providers), 0049 (tbl_contracts) y 0065
-- (índice de contratos) ya aplicados.
--
-- Respalda ADR-0020 (decisiones 1 a 3, 6, 10 a 12) y el backlog PRO-BD-14.
-- Nombres y reglas fijados en DEC-042 (tabla tbl_invoices, prefijo inv_,
-- área billing/). Es la fase A: el encabezado y el ciclo de vida. Los
-- detalles por tipo, con sus importes, llegan con sus decisiones de negocio
-- (backlog DEC-01, DEC-02, DEC-03, DEC-07): ninguna columna de esta tabla es
-- un importe, y nunca guardará totales ni saldos (ADR-0020, "Fuente de
-- verdad").
--
-- Columnas del dominio:
--   inv_type            SIMPLE, ADVANCE (anticipo), LIQUIDATION, RETENTION_REFUND
--                       (devolución de retenido). No cambia después de crear.
--   prv_id              Proveedor que emite la factura.
--   wrk_id              Obra. En una factura de contrato, la del contrato.
--   wks_id              Etapa: obligatoria en SIMPLE (ADR-0023, decisión 3);
--                       nula en las de contrato, cuya etapa es la del
--                       contrato (hoy opcional, 0056): no se copia.
--   ctr_id              Contrato: nulo en SIMPLE, obligatorio en los demás
--                       (ADR-0020, decisión 3). No cambia después de crear.
--   inv_number          Número de la factura del proveedor, único por
--                       proveedor (backlog DEC-17, DEC-042). Una anulada lo
--                       sigue ocupando.
--   inv_date            Fecha de la factura.
--   inv_approval_date   La fija el acto de aprobar, nunca el formulario.
--   inv_voucher_number  Número de comprobante.
--   inv_statement       Extracto.
--   inv_description     Descripción.
--   inv_state           REGISTERED, APPROVED, CANCELLED (ADR-0020, decisión
--                       6; backlog DEC-16). Columna propia, no sta_id
--                       (WORKFLOW_STANDARD, regla 2). Solo lo cambian las
--                       transiciones del service, con historial (0067).
--   sta_id              Visibilidad estándar. Ningún endpoint elimina
--                       facturas: se anulan (ADR-0020, decisión 12).
--
-- Coherencia garantizada en el esquema:
--   ck_invoices_type_links  SIMPLE sin contrato y con etapa; los demás con
--                           contrato y sin etapa.
--   ck_invoices_approval    Registrada sin fecha de aprobación; aprobada con
--                           ella. Una anulada conserva la que tenía.
--   ck_invoices_dates       La aprobación no es anterior a la factura.
--   (wrk_id, prv_id) → tbl_work_providers: el proveedor está asignado a la
--     obra; impide desasignarlo mientras tenga facturas en ella.
--   (wks_id, wrk_id) → tbl_work_stages: la etapa es de la obra; impide
--     quitarla mientras tenga facturas.
--   (ctr_id, wrk_id, prv_id) → tbl_contracts: obra y proveedor son los del
--     contrato; impide cambiar el proveedor de un contrato con facturas.
-- El service repite estas validaciones para dar el mensaje claro.
--
-- UNIQUE (prv_id, inv_number) sirve además de índice de la FK al proveedor.
-- Crear es un endpoint con clave de idempotencia (DEC-016).

CREATE TABLE `tbl_invoices` (
  `inv_id` int NOT NULL AUTO_INCREMENT,
  `inv_type` varchar(20) NOT NULL,
  `prv_id` int NOT NULL,
  `wrk_id` int NOT NULL,
  `wks_id` int DEFAULT NULL,
  `ctr_id` int DEFAULT NULL,
  `inv_number` varchar(50) NOT NULL,
  `inv_date` date NOT NULL,
  `inv_approval_date` date DEFAULT NULL,
  `inv_voucher_number` varchar(50) DEFAULT NULL,
  `inv_statement` varchar(100) DEFAULT NULL,
  `inv_description` varchar(500) DEFAULT NULL,
  `inv_state` varchar(20) NOT NULL DEFAULT 'REGISTERED',
  `sta_id` int NOT NULL DEFAULT 1,
  `inv_create_by` int DEFAULT NULL,
  `inv_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `inv_update_by` int DEFAULT NULL,
  `inv_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `inv_delete_by` int DEFAULT NULL,
  `inv_delete_at` timestamp NULL DEFAULT NULL,
  `inv_idempotency_key` char(36) DEFAULT NULL,
  `inv_idempotency_hash` char(64) DEFAULT NULL,
  PRIMARY KEY (`inv_id`) USING BTREE,
  UNIQUE INDEX `uq_invoices_provider_number` (`prv_id`, `inv_number`),
  UNIQUE INDEX `uq_invoices_idempotency_key` (`inv_idempotency_key`),
  INDEX `idx_invoices_state` (`inv_state`),
  INDEX `idx_invoices_type` (`inv_type`),
  INDEX `idx_invoices_date` (`inv_date`),
  CONSTRAINT `ck_invoices_type` CHECK (`inv_type` IN ('SIMPLE', 'ADVANCE', 'LIQUIDATION', 'RETENTION_REFUND')),
  CONSTRAINT `ck_invoices_state` CHECK (`inv_state` IN ('REGISTERED', 'APPROVED', 'CANCELLED')),
  CONSTRAINT `ck_invoices_type_links` CHECK (
    (`inv_type` = 'SIMPLE' AND `ctr_id` IS NULL AND `wks_id` IS NOT NULL)
    OR (`inv_type` <> 'SIMPLE' AND `ctr_id` IS NOT NULL AND `wks_id` IS NULL)
  ),
  CONSTRAINT `ck_invoices_approval` CHECK (
    (`inv_state` <> 'REGISTERED' OR `inv_approval_date` IS NULL)
    AND (`inv_state` <> 'APPROVED' OR `inv_approval_date` IS NOT NULL)
  ),
  CONSTRAINT `ck_invoices_dates` CHECK (`inv_approval_date` IS NULL OR `inv_approval_date` >= `inv_date`)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_invoices`
ADD CONSTRAINT `tbl_invoices_provider` FOREIGN KEY (`prv_id`) REFERENCES `tbl_providers` (`prv_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoices_work` FOREIGN KEY (`wrk_id`) REFERENCES `tbl_works` (`wrk_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoices_work_provider` FOREIGN KEY (`wrk_id`, `prv_id`) REFERENCES `tbl_work_providers` (`wrk_id`, `prv_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoices_work_stage` FOREIGN KEY (`wks_id`, `wrk_id`) REFERENCES `tbl_work_stages` (`wks_id`, `wrk_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoices_contract` FOREIGN KEY (`ctr_id`, `wrk_id`, `prv_id`) REFERENCES `tbl_contracts` (`ctr_id`, `wrk_id`, `prv_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoices_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoices_create_by` FOREIGN KEY (`inv_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_invoices_update_by` FOREIGN KEY (`inv_update_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_invoices_delete_by` FOREIGN KEY (`inv_delete_by`) REFERENCES `tbl_users` (`use_id`);
