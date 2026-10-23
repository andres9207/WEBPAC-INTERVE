-- Migración 0111: el grupo "Obras" del sidebar pasa a ser "Inicio" y reúne
-- el tablero, obras, proveedores, contratos y facturas
--
-- Requiere: 0069 (página 18) y 0093 (pag_type 3) ya aplicados.
--
-- Pedido del usuario (2026-10-23). Solo datos, sin cambios de estructura.
-- Coincide con server/prisma/seed.js.
--
-- 1. La página 13 (grupo "Obras") se renombra "Inicio" y va primero. El
--    grupo suelto "Dashboard" desaparece: la página 1 pasa a ser la primera
--    entrada de Inicio. Facturas (18) entra también, como desplegable dentro
--    del grupo (sigue en pag_type 3; sus entradas son los menús dinámicos de
--    DEC-074). Administración y Seguridad bajan un lugar.
-- 2. Los permisos no cambian: cuelgan de cada página (Facturas, de la 18), no
--    del grupo. Pero el sidebar solo muestra una página si el usuario tiene
--    también su grupo, así que quien tiene alguna de las páginas que entran
--    en Inicio (por perfil o por páginas propias) y no la 13, la recibe. Si
--    no, perdería el tablero o las facturas del menú.

UPDATE `tbl_pages`
SET `pag_description` = 'Inicio', `pag_name` = 'Inicio', `pag_icon` = 'home', `pag_order` = 1
WHERE `pag_id` = 13;

UPDATE `tbl_pages` SET `pag_parent` = 13, `pag_type` = 2, `pag_order` = 1 WHERE `pag_id` = 1;
UPDATE `tbl_pages` SET `pag_order` = 2 WHERE `pag_id` = 14;
UPDATE `tbl_pages` SET `pag_order` = 3 WHERE `pag_id` = 15;
UPDATE `tbl_pages` SET `pag_order` = 4 WHERE `pag_id` = 16;
UPDATE `tbl_pages` SET `pag_parent` = 13, `pag_order` = 5 WHERE `pag_id` = 18;
UPDATE `tbl_pages` SET `pag_order` = 2 WHERE `pag_id` = 5;
UPDATE `tbl_pages` SET `pag_order` = 3 WHERE `pag_id` = 2;

INSERT INTO `tbl_page_permissions` (`pro_id`, `pag_id`)
SELECT DISTINCT pp.`pro_id`, 13
FROM `tbl_page_permissions` pp
WHERE pp.`pag_id` IN (1, 14, 15, 16, 18)
  AND NOT EXISTS (
    SELECT 1 FROM `tbl_page_permissions` x WHERE x.`pro_id` = pp.`pro_id` AND x.`pag_id` = 13
  );

INSERT INTO `tbl_user_pages` (`use_id`, `pag_id`)
SELECT DISTINCT up.`use_id`, 13
FROM `tbl_user_pages` up
WHERE up.`pag_id` IN (1, 14, 15, 16, 18)
  AND NOT EXISTS (
    SELECT 1 FROM `tbl_user_pages` x WHERE x.`use_id` = up.`use_id` AND x.`pag_id` = 13
  );
