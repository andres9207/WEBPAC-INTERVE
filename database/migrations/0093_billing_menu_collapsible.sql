-- Migración 0093: el grupo "Facturas" del sidebar se pliega y sus páginas
-- pierden la palabra "Facturas"
--
-- Requiere: 0091 ya aplicado (páginas 18, 21, 22 y 23).
--
-- Pedido del usuario (2026-10-13). Solo datos, sin cambios de estructura.
-- Coincide con server/prisma/seed.js.
--
-- 1. pag_type gana un valor: 3 = grupo plegable. El sidebar lo dibuja como un
--    desplegable con el nombre del grupo, en vez de un título fijo con sus
--    páginas debajo. Lo usa el grupo 18 (Facturas).
-- 2. Dentro del desplegable "Facturas", las páginas se llaman "Simples",
--    "Contrato mayor" y "Subcontratistas" (pag_name, lo que muestra el
--    menú). pag_description conserva el nombre completo: es el que se ve en
--    las pantallas de perfiles y permisos, fuera del grupo.

UPDATE `tbl_pages` SET `pag_type` = 3 WHERE `pag_id` = 18;

UPDATE `tbl_pages` SET `pag_name` = 'Simples' WHERE `pag_id` = 21;
UPDATE `tbl_pages` SET `pag_name` = 'Contrato mayor' WHERE `pag_id` = 22;
UPDATE `tbl_pages` SET `pag_name` = 'Subcontratistas' WHERE `pag_id` = 23;
