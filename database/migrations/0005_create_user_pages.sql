-- Migración 0005: tabla puente tbl_user_pages, reemplaza el CSV de
-- tbl_users.use_pages
--
-- Requiere: bdtemplate.sql ya aplicado.
--
-- use_pages es un CSV de pag_id en una columna de tbl_users (anti-patrón
-- preexistente, mismo problema que tenía tbl_profiles.pro_pages, ya
-- retirada en la migración 0004). Respalda "Páginas autorizadas" en
-- UserDialog.jsx: páginas puntuales asignadas a un usuario específico,
-- distintas de las de su perfil (tbl_page_permissions). Esta tabla tiene la
-- misma forma que tbl_page_permissions, pero por usuario en vez de por
-- perfil — la relación correcta para esto en un modelo relacional.
--
-- No borra todavía tbl_users.use_pages: eso ocurre en la migración 0006,
-- después de migrar los datos existentes y verificar en vivo que esta tabla
-- los refleja correctamente.

CREATE TABLE `tbl_user_pages` (
  `upg_id` int NOT NULL AUTO_INCREMENT,
  `use_id` int NOT NULL,
  `pag_id` int NOT NULL,
  PRIMARY KEY (`upg_id`) USING BTREE
);

ALTER TABLE `tbl_user_pages`
ADD CONSTRAINT `tbl_user_pages_users` FOREIGN KEY (`use_id`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_user_pages_pages` FOREIGN KEY (`pag_id`) REFERENCES `tbl_pages` (`pag_id`);

ALTER TABLE `tbl_user_pages`
ADD UNIQUE INDEX `uq_user_pages_use_pag` (`use_id`, `pag_id`) USING BTREE;
