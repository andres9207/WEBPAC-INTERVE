-- Migración 0105: reglas de negocio configurables (días de aviso de vencimiento)
--
-- Requiere: 0011 (FK de autoría a tbl_users) ya aplicado.
--
-- DEC-072: los días antes de la fecha fin en que un contrato en ejecución o
-- una póliza vigente pasan a "próximo a vencer" se configuran desde la
-- aplicación (menú del perfil, "Regla de negocio"), no en el entorno. El de
-- las pólizas reemplaza a la variable POLICY_EXPIRING_DAYS (ADR-0002,
-- decisión 7: el umbral es configuración, no un literal).
--
-- Una fila por regla, con clave simbólica fija del código (bru_key). Las
-- filas las crea esta migración y no se crean ni se eliminan desde la
-- aplicación: solo se cambia su valor. Por eso no lleva sta_id, columnas de
-- eliminación ni clave de idempotencia; sí las cuatro de autoría de creación
-- y actualización, y cada cambio va a la bitácora (ADR-0013).
--
-- Datos: siembra las dos reglas con 30 días, el valor por defecto que ya
-- tenía POLICY_EXPIRING_DAYS. No asume nada sobre usuarios ni perfiles.

CREATE TABLE `tbl_business_rules` (
  `bru_id` int NOT NULL AUTO_INCREMENT,
  `bru_key` varchar(50) NOT NULL COMMENT 'Clave simbólica fija del código (BUSINESS_RULES en el servidor)',
  `bru_name` varchar(100) NOT NULL,
  `bru_value` int NOT NULL COMMENT 'Días',
  `bru_create_by` int DEFAULT NULL,
  `bru_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `bru_update_by` int DEFAULT NULL,
  `bru_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`bru_id`),
  UNIQUE KEY `uq_business_rules_key` (`bru_key`),
  KEY `tbl_business_rules_create_by` (`bru_create_by`),
  KEY `tbl_business_rules_update_by` (`bru_update_by`),
  CONSTRAINT `tbl_business_rules_create_by` FOREIGN KEY (`bru_create_by`) REFERENCES `tbl_users` (`use_id`),
  CONSTRAINT `tbl_business_rules_update_by` FOREIGN KEY (`bru_update_by`) REFERENCES `tbl_users` (`use_id`),
  CONSTRAINT `ck_business_rules_value` CHECK (`bru_value` BETWEEN 1 AND 365)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `tbl_business_rules` (`bru_key`, `bru_name`, `bru_value`) VALUES
('CONTRACT_EXPIRING_DAYS', 'Vencimiento de contrato', 30),
('POLICY_EXPIRING_DAYS', 'Vencimiento de póliza', 30);
