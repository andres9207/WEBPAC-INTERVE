-- Migración 0063: tabla tbl_provider_classifications (tipos de un proveedor)
--
-- Requiere: 0044 (tbl_providers) y 0022 (tbl_provider_types) ya aplicados.
--
-- Respalda DEC-041: un proveedor tiene uno o varios tipos de proveedor. El
-- tipo sigue siendo una clasificación de la empresa, sin reglas por tipo
-- (DEC-023); lo que cambia es la cardinalidad. Cierra el pendiente de
-- ADR-0012 ("si un proveedor puede tener varios tipos de proveedor").
--
-- Tabla de unión proveedor ↔ tipo, prefijo pcl_. Sin columnas de autoría
-- (database/migrations/README.md, regla 5): la lista de tipos es parte del
-- proveedor, se guarda con él por diferencial y su cambio va a la bitácora
-- del proveedor (campo pvt_ids).
--
-- Al menos un tipo por proveedor: lo exige el service (el esquema no puede
-- expresarlo sin disparadores).
--
-- Copia el tipo actual de cada proveedor (tbl_providers.pvt_id), así que
-- ninguno queda sin tipo. La columna vieja se retira en 0064, después de
-- verificar la copia.
--
-- FK al proveedor ON DELETE CASCADE (la clasificación no existe sin él); al
-- tipo ON DELETE RESTRICT: el maestro bloquea eliminar un tipo en uso
-- (ADR-0010, decisión 8). El UNIQUE (prv_id, pvt_id) impide repetir un tipo
-- y sirve de índice para la FK al proveedor; la FK al tipo crea el suyo.

CREATE TABLE `tbl_provider_classifications` (
  `pcl_id` int NOT NULL AUTO_INCREMENT,
  `prv_id` int NOT NULL,
  `pvt_id` int NOT NULL,
  PRIMARY KEY (`pcl_id`) USING BTREE,
  UNIQUE INDEX `uq_provider_classifications_provider_type` (`prv_id`, `pvt_id`)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_provider_classifications`
ADD CONSTRAINT `tbl_provider_classifications_provider` FOREIGN KEY (`prv_id`) REFERENCES `tbl_providers` (`prv_id`) ON DELETE CASCADE,
ADD CONSTRAINT `tbl_provider_classifications_provider_type` FOREIGN KEY (`pvt_id`) REFERENCES `tbl_provider_types` (`pvt_id`) ON DELETE RESTRICT;

INSERT INTO `tbl_provider_classifications` (`prv_id`, `pvt_id`)
SELECT `prv_id`, `pvt_id` FROM `tbl_providers`;
