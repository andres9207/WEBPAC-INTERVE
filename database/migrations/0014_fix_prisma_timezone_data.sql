-- Migración 0014: limpieza de fechas escritas con la sesión MySQL fuera de UTC
--
-- Requiere: 0007, 0008 y 0009 ya aplicados. Aplicar JUNTO con el despliegue
-- del cambio en server/src/common/configs/prismaClient.js (sesión en UTC).
--
-- Respalda ADR-0013 (B8). Hasta este cambio, Prisma enviaba las fechas como
-- texto UTC pero la sesión MySQL estaba en SYSTEM (hora del servidor), así
-- que MySQL las interpretaba como hora local: cada fecha escrita por la
-- aplicación con new Date() quedó adelantada en el offset del servidor
-- (+5 h en Colombia). Las fechas llenadas por DEFAULT CURRENT_TIMESTAMP están
-- bien y no se tocan.
--
-- Datos transitorios (sesiones, códigos de recuperación, intentos de login):
-- se eliminan en lugar de corregirse. Es idempotente y lo corregido duraría
-- minutos u horas. Efecto: todos los usuarios deben iniciar sesión de nuevo,
-- los códigos de recuperación pendientes dejan de servir y los contadores de
-- intentos fallidos vuelven a cero. Sin esto, tras el cambio las sesiones
-- durarían 5 h más, los códigos seguirían válidos 5 h más y los bloqueos
-- durarían 5 h más.
--
-- Notificaciones leídas: not_read_at y not_updated_at solo las escribe
-- markAsRead / markAllAsRead (Prisma), así que se corrigen restando el offset
-- del servidor. ⚠️ NO es idempotente: ejecutar UNA sola vez, desde un cliente
-- cuya sesión esté en la zona del servidor (el valor por defecto, SYSTEM). Si
-- la sesión del cliente ya está en UTC, el offset es 0 y no cambia nada.
--
-- Las columnas *_delete_at (0012) se llenan con el código ya corregido: si
-- 0012 y esta migración se aplican antes de desplegar, no hay nada que
-- corregir en ellas.

DELETE FROM `tbl_sessions`;
DELETE FROM `tbl_password_resets`;
DELETE FROM `tbl_login_attempts`;

UPDATE `tbl_notifications`
SET
  `not_read_at` = `not_read_at` + INTERVAL TIMESTAMPDIFF(SECOND, UTC_TIMESTAMP(), NOW()) SECOND,
  `not_updated_at` = `not_updated_at` + INTERVAL TIMESTAMPDIFF(SECOND, UTC_TIMESTAMP(), NOW()) SECOND
WHERE `not_read_at` IS NOT NULL;
