-- Migración 0017: tabla tbl_identity_documents (maestro de tipos de
-- identificación)
--
-- Requiere: bdtemplate.sql, 0010_seed_status.sql (tbl_status con 1/2/3) y
-- 0011_fk_audit_columns.sql ya aplicados.
--
-- Respalda ADR-0008 (decisiones 1, 2 y 3, brecha B1) y el backlog MAE-BD-06.
-- El nombre de la tabla y de su clave primaria son los que declara la FK
-- tbl_providers_identity_documents del esquema de origen
-- (tbl_identity_documents.idd_id), para que tbl_providers la encuentre cuando
-- se cree.
--
-- Es un catálogo: NO guarda ningún dato de una persona (ni número, ni fecha
-- ni lugar de expedición). El número vive en la entidad identificada
-- (tbl_users.use_identification, y más adelante tbl_providers).
--
-- Columnas del dominio:
--   idd_code  Código corto (CC, NIT…). Único y no editable después de crear
--             el tipo: es la clave estable del tipo para el código y la que se
--             muestra en listados compactos.
--   idd_name  Nombre visible.
--
-- Unicidad entre los NO eliminados (ADR-0008, decisión 2): un UNIQUE simple
-- sobre idd_name impediría volver a crear un tipo con el nombre de uno
-- eliminado. Patrón establecido con este primer maestro (CRUD_STANDARD,
-- paso 1): una columna generada que vale el nombre mientras el registro no
-- está eliminado (sta_id <> 3) y NULL cuando lo está, con UNIQUE sobre ella.
-- MySQL admite varios NULL en un índice UNIQUE, así que los eliminados no
-- chocan entre sí ni con los vivos. Lo mismo para idd_code. El service
-- controla el duplicado dentro de la transacción para responder un mensaje
-- claro; el índice es la garantía ante dos peticiones simultáneas.
--
-- La colación de la columna (la de la tabla) decide qué es "igual":
-- con utf8mb4_0900_ai_ci, "Cédula" y "cedula" son el mismo nombre.

CREATE TABLE `tbl_identity_documents` (
  `idd_id` int NOT NULL AUTO_INCREMENT,
  `idd_code` varchar(10) NOT NULL,
  `idd_name` varchar(100) NOT NULL,
  `sta_id` int NOT NULL DEFAULT 1,
  `idd_create_by` int DEFAULT NULL,
  `idd_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `idd_update_by` int DEFAULT NULL,
  `idd_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `idd_delete_by` int DEFAULT NULL,
  `idd_delete_at` timestamp NULL DEFAULT NULL,
  `idd_idempotency_key` char(36) DEFAULT NULL,
  `idd_idempotency_hash` char(64) DEFAULT NULL,
  `idd_code_active` varchar(10) GENERATED ALWAYS AS (IF(`sta_id` <> 3, `idd_code`, NULL)) VIRTUAL,
  `idd_name_active` varchar(100) GENERATED ALWAYS AS (IF(`sta_id` <> 3, `idd_name`, NULL)) VIRTUAL,
  PRIMARY KEY (`idd_id`) USING BTREE,
  UNIQUE INDEX `uq_identity_documents_code_active` (`idd_code_active`),
  UNIQUE INDEX `uq_identity_documents_name_active` (`idd_name_active`),
  UNIQUE INDEX `uq_identity_documents_idempotency_key` (`idd_idempotency_key`)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_identity_documents`
ADD CONSTRAINT `tbl_identity_documents_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`),
ADD CONSTRAINT `tbl_identity_documents_create_by` FOREIGN KEY (`idd_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_identity_documents_update_by` FOREIGN KEY (`idd_update_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_identity_documents_delete_by` FOREIGN KEY (`idd_delete_by`) REFERENCES `tbl_users` (`use_id`);
