-- Migración 0100: una excepción individual de permiso puede conceder o negar
--
-- Requiere: 0001 (tbl_user_permissions) y el UNIQUE uq_user_permissions_per_use
-- (per_id, use_id) ya aplicados.
--
-- DEC-067 (cambia ADR-0014, decisión 4): el permiso efectivo de un usuario
-- pasa de "perfil ∪ excepciones" a "(perfil ∪ concedidos) − negados". Antes,
-- un permiso que daba el perfil no se le podía quitar a un usuario puntual:
-- la pantalla lo desmarcaba, el servidor lo ignoraba y respondía que se había
-- guardado.
--
-- usp_granted: 1 = la excepción concede el permiso, 0 = lo niega aunque el
-- perfil lo dé. Sigue habiendo como máximo una excepción por usuario y
-- permiso (el UNIQUE existente).
--
-- Datos: todas las filas existentes eran concesiones; quedan con 1 por el
-- DEFAULT. No asume nada más sobre usuarios ni perfiles.

ALTER TABLE `tbl_user_permissions`
ADD COLUMN `usp_granted` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1 = concede el permiso, 0 = lo niega aunque el perfil lo dé (DEC-067)' AFTER `use_id`;

ALTER TABLE `tbl_user_permissions`
ADD CONSTRAINT `ck_user_permissions_granted` CHECK (`usp_granted` IN (0, 1));
