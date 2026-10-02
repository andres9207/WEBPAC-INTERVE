-- Migración 0059: una sola colación en todo el esquema (utf8mb4_0900_ai_ci)
--
-- Requiere: bdtemplate.sql (tbl_permissions). No depende de datos.
--
-- Backlog FND-BD-13 (ADR-0011 B15, ADR-0008 B10). Comparar texto de dos
-- tablas con colaciones distintas hace fallar el JOIN ("Illegal mix of
-- collations") o le impide usar el índice.
--
-- Estado verificado en la BD de desarrollo (2026-10-02): la base, las 34
-- tablas y 125 de las 126 columnas de texto ya estaban en
-- utf8mb4_0900_ai_ci. La única divergente era tbl_permissions.per_name,
-- declarada utf8mb3_unicode_ci en bdtemplate.sql. La divergencia entre
-- tbl_providers y tbl_users que citan los ADR viene de
-- bdintervewebpack.sql, que no está en el repositorio; en una base
-- provisionada desde este repositorio no existe.
--
-- 1. La colación por defecto de la base se fija explícitamente, para que las
--    tablas nuevas la hereden aunque el servidor MySQL tenga otro valor por
--    defecto. Sin nombre, ALTER DATABASE aplica a la base en uso.
-- 2. per_name pasa a utf8mb4. Convertir de utf8mb3 a utf8mb4 no pierde
--    datos. Conserva tipo, tamaño y NULL.
--
-- Idempotente: aplicarla dos veces deja el mismo resultado.
--
-- Verificación: la consulta siguiente no debe devolver filas.
--
--   SELECT TABLE_NAME, COLUMN_NAME, COLLATION_NAME
--   FROM information_schema.COLUMNS
--   WHERE TABLE_SCHEMA = DATABASE()
--     AND COLLATION_NAME IS NOT NULL
--     AND COLLATION_NAME <> 'utf8mb4_0900_ai_ci'
--   UNION ALL
--   SELECT TABLE_NAME, NULL, TABLE_COLLATION
--   FROM information_schema.TABLES
--   WHERE TABLE_SCHEMA = DATABASE()
--     AND TABLE_TYPE = 'BASE TABLE'
--     AND TABLE_COLLATION <> 'utf8mb4_0900_ai_ci';

ALTER DATABASE CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_permissions`
MODIFY COLUMN `per_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL;
