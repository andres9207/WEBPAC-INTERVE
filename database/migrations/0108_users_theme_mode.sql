-- Migración 0108: modo de color de la interfaz por usuario
--
-- Requiere: bdtemplate.sql ya aplicado.
--
-- DEC-073: cada usuario elige el tema claro u oscuro con el botón del
-- encabezado, junto a la campana de notificaciones, y la elección lo sigue
-- en cualquier equipo. Es una preferencia visual: no va a la bitácora
-- (ADR-0013) y el service la guarda sin tocar use_update_at ni use_update_by,
-- para no aparecer como una modificación del usuario.
--
-- Dominio cerrado (light, dark), igual que THEME_MODES en el servidor.
--
-- Datos: los usuarios existentes quedan en 'light', el tema que tenían.

ALTER TABLE `tbl_users`
  ADD COLUMN `use_theme_mode` varchar(10) NOT NULL DEFAULT 'light'
    COMMENT 'Tema de la interfaz: light | dark (DEC-073)' AFTER `use_change_password`,
  ADD CONSTRAINT `ck_users_theme_mode` CHECK (`use_theme_mode` IN ('light', 'dark'));
