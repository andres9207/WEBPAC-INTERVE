-- Migración 0043: orden de los grupos del menú lateral
--
-- Requiere: 0001, 0020 y 0041 (crean las páginas padre que se reordenan).
-- Solo datos. El sidebar ordena las páginas padre por `pag_order`
-- (app.service.js, getMenu): Dashboard, Obras, Administración, Seguridad.

UPDATE `tbl_pages` SET `pag_order` = 1 WHERE `pag_id` = 1;  -- Dashboard
UPDATE `tbl_pages` SET `pag_order` = 2 WHERE `pag_id` = 13; -- Obras
UPDATE `tbl_pages` SET `pag_order` = 3 WHERE `pag_id` = 5;  -- Administración
UPDATE `tbl_pages` SET `pag_order` = 4 WHERE `pag_id` = 2;  -- Seguridad
