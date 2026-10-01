-- Migración 0044: tabla tbl_providers (proveedor, entidad reutilizable)
--
-- Requiere: 0017 (tbl_identity_documents) y 0022 (tbl_provider_types) ya
-- aplicados.
--
-- Respalda ADR-0012 (decisiones 1, 3, 4 y 13) y el backlog PRO-BD-05.
-- Nombres fijados en DEC-031 (tabla tbl_providers, prefijo prv_, área work/).
--
-- La tabla del esquema de origen (database/bdintervewebpack.sql) no existe en
-- este repositorio ni en la BD: se crea limpia, sin duplicados ni nulos que
-- depurar (PRO-BD-05 y PRO-BD-26 quedan sin datos que migrar), sin el
-- contacto embebido (los contactos van en tbl_provider_contacts, 0045) y sin
-- las columnas residuales dot_id, are_id y cos_id.
--
-- Columnas del dominio:
--   idd_id              Tipo de identificación (ADR-0008). Obligatorio.
--   prv_identification  Número de documento, con el formato de su tipo
--                       (DEC-021, validado en el service). Obligatorio.
--   prv_name            Nombre o razón social. Obligatorio.
--   pvt_id              Tipo de proveedor: clasificación de la empresa
--                       (DEC-023). Obligatorio.
--   prv_service_type    Tipo de servicio, texto libre mientras el negocio no
--                       defina un catálogo (DEC-032).
--   prv_email           Correo institucional.
--   prv_observation     Observación general.
--
-- Identidad (ADR-0012, decisiones 3 y 4): el par (tipo, número) es único
-- entre los proveedores NO eliminados, con el patrón de columna generada de
-- los maestros (0017): prv_identification_active vale el número mientras
-- sta_id <> 3 y NULL cuando el proveedor está eliminado. MySQL admite varios
-- NULL en un UNIQUE, así que un proveedor eliminado no impide registrar de
-- nuevo la empresa (DEC-032). El UNIQUE es la garantía ante dos altas
-- simultáneas; la verificación previa del service solo da el mensaje claro.
-- El mismo número con otro tipo es otra identidad (ADR-0008).
--
-- FK a los maestros ON DELETE RESTRICT; MySQL crea el índice de cada una.
-- El UNIQUE (idd_id, prv_identification_active) sirve además de índice para
-- la búsqueda exacta por documento.

CREATE TABLE `tbl_providers` (
  `prv_id` int NOT NULL AUTO_INCREMENT,
  `idd_id` int NOT NULL,
  `prv_identification` varchar(20) NOT NULL,
  `prv_name` varchar(255) NOT NULL,
  `pvt_id` int NOT NULL,
  `prv_service_type` varchar(150) DEFAULT NULL,
  `prv_email` varchar(255) DEFAULT NULL,
  `prv_observation` varchar(500) DEFAULT NULL,
  `sta_id` int NOT NULL DEFAULT 1,
  `prv_create_by` int DEFAULT NULL,
  `prv_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `prv_update_by` int DEFAULT NULL,
  `prv_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `prv_delete_by` int DEFAULT NULL,
  `prv_delete_at` timestamp NULL DEFAULT NULL,
  `prv_idempotency_key` char(36) DEFAULT NULL,
  `prv_idempotency_hash` char(64) DEFAULT NULL,
  `prv_identification_active` varchar(20) GENERATED ALWAYS AS (IF(`sta_id` <> 3, `prv_identification`, NULL)) VIRTUAL,
  PRIMARY KEY (`prv_id`) USING BTREE,
  UNIQUE INDEX `uq_providers_identity_active` (`idd_id`, `prv_identification_active`),
  UNIQUE INDEX `uq_providers_idempotency_key` (`prv_idempotency_key`),
  INDEX `idx_providers_status_name` (`sta_id`, `prv_name`)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_providers`
ADD CONSTRAINT `tbl_providers_identity_document` FOREIGN KEY (`idd_id`) REFERENCES `tbl_identity_documents` (`idd_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_providers_provider_type` FOREIGN KEY (`pvt_id`) REFERENCES `tbl_provider_types` (`pvt_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_providers_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_providers_create_by` FOREIGN KEY (`prv_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_providers_update_by` FOREIGN KEY (`prv_update_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_providers_delete_by` FOREIGN KEY (`prv_delete_by`) REFERENCES `tbl_users` (`use_id`);
