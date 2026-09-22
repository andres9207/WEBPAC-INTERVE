-- Migración 0006: retira la columna tbl_users.use_pages, reemplazada por
-- tbl_user_pages (ver migración 0005).
--
-- Requiere: 0005_create_user_pages.sql ya aplicada, y los datos existentes
-- ya migrados de la columna CSV a filas de tbl_user_pages (confirmado en
-- vivo: cero usuarios con use_pages en la BD de desarrollo al momento de
-- aplicar esta migración, así que no hubo nada que migrar).
--
-- app.service.js (getMenu, getUserPermissions) y users.service.js
-- (saveUser/paginationUsers) ya no leen ni escriben esta columna — todo el
-- código pasó a tbl_user_pages antes de este drop.

ALTER TABLE `tbl_users` DROP COLUMN `use_pages`;
