-- Migración 0016: clave de idempotencia en las entidades que se crean
--
-- Requiere: 0012_add_delete_columns.sql ya aplicado (las columnas nuevas van
-- después de *_delete_at).
--
-- Respalda ADR-0027 (decisión 7, B3). Un doble clic, un reintento o un
-- reenvío manual ejecutaban dos veces la creación: dos usuarios, dos perfiles
-- o dos documentos iguales. Ahora el cliente genera una clave (UUID) al abrir
-- el formulario y la envía en el encabezado Idempotency-Key:
--   - <pre>_idempotency_key: la clave. UNIQUE: aunque dos peticiones con la
--     misma clave lleguen a la vez, la base de datos solo deja crear una.
--   - <pre>_idempotency_hash: SHA-256 del contenido de la petición (sin
--     contraseñas). Detecta la misma clave usada con otro contenido, que se
--     rechaza con 422 en vez de devolver una entidad que no corresponde.
-- La clave se guarda en la propia entidad (decisión 7), no en una tabla
-- central.
--
-- NULL en ambas columnas para los registros ya existentes y para los que se
-- crean sin clave (MySQL admite varios NULL en un índice UNIQUE).
--
-- Transiciones de estado (aprobar, anular…): la clave irá con el mismo par
-- de columnas en la tabla de historial de estado de cada agregado, cuando
-- exista (CORE). Hoy ninguna tabla tiene historial de estado.

ALTER TABLE `tbl_users`
ADD COLUMN `use_idempotency_key` char(36) DEFAULT NULL AFTER `use_delete_at`,
ADD COLUMN `use_idempotency_hash` char(64) DEFAULT NULL AFTER `use_idempotency_key`,
ADD UNIQUE INDEX `uq_users_idempotency_key` (`use_idempotency_key`);

ALTER TABLE `tbl_profiles`
ADD COLUMN `pro_idempotency_key` char(36) DEFAULT NULL AFTER `pro_delete_at`,
ADD COLUMN `pro_idempotency_hash` char(64) DEFAULT NULL AFTER `pro_idempotency_key`,
ADD UNIQUE INDEX `uq_profiles_idempotency_key` (`pro_idempotency_key`);

ALTER TABLE `tbl_documents`
ADD COLUMN `doc_idempotency_key` char(36) DEFAULT NULL AFTER `doc_delete_at`,
ADD COLUMN `doc_idempotency_hash` char(64) DEFAULT NULL AFTER `doc_idempotency_key`,
ADD UNIQUE INDEX `uq_documents_idempotency_key` (`doc_idempotency_key`);
