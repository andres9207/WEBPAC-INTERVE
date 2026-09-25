-- Migración 0004: retira la columna muerta tbl_profiles.pro_pages
--
-- Requiere: bdtemplate.sql ya aplicado.
--
-- pro_pages (CSV en columna, mismo anti-patrón que tbl_users.use_pages) no
-- tiene ninguna referencia en el código del servidor ni del cliente
-- (confirmado por búsqueda en todo el repo) — a diferencia de use_pages, que
-- sigue en uso real (ver "Páginas autorizadas" en UserDialog.jsx), pro_pages
-- nunca se lee ni se escribe en ningún lado. La visibilidad de páginas por
-- perfil ya vive en tbl_page_permissions (pro_id + pag_id), la tabla
-- correcta para esto desde el diseño original del RBAC.

ALTER TABLE `tbl_profiles` DROP COLUMN `pro_pages`;
