-- Migración 0118: estado de la obra (en curso / finalizada)
--
-- Requiere: 0038 (tbl_works) ya aplicado.
--
-- DEC-083 (pedido del usuario, 2026-10-26; documento de alcance de Intervé,
-- punto 2.1: "registro de obras en curso y finalizadas"). Es el ciclo de vida
-- de la obra, aparte de su estado de visibilidad (sta_id: activa, inactiva,
-- eliminada). Finalizar no bloquea registros nuevos ni exige los contratos
-- liquidados: el tablero informa cuáles faltan.
--
-- 1. wrk_state: IN_PROGRESS (en curso, por defecto: todas las obras que ya
--    existen) o FINISHED (finalizada).
-- 2. wrk_finish_date: fecha de finalización; existe si y solo si la obra está
--    finalizada (se limpia al reabrirla).
--
-- Lo cambia el permiso 56 "Cambiar estado obra" (ADR-0011, "CAMBIAR ESTADO
-- OBRA"), que ya existe: no hay permiso nuevo.
--
-- Después: `npx prisma db pull` (o el schema.prisma versionado).

ALTER TABLE `tbl_works`
ADD COLUMN `wrk_state` varchar(20) NOT NULL DEFAULT 'IN_PROGRESS' COMMENT 'Ciclo de vida de la obra (DEC-083)' AFTER `wrk_max_service_order_value`,
ADD COLUMN `wrk_finish_date` date DEFAULT NULL COMMENT 'Fecha de finalización; solo en una obra finalizada (DEC-083)' AFTER `wrk_state`,
ADD CONSTRAINT `ck_works_state` CHECK (`wrk_state` IN ('IN_PROGRESS', 'FINISHED')),
ADD CONSTRAINT `ck_works_finish_date` CHECK ((`wrk_state` = 'FINISHED') = (`wrk_finish_date` IS NOT NULL));
