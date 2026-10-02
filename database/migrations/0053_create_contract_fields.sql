-- Migración 0053: tabla tbl_contract_fields (catálogo cerrado de campos configurables)
--
-- Requiere: 0050 (tbl_contract_concepts) ya aplicado.
--
-- Respalda ADR-0006 (decisión 3) y el backlog MAE-BD-08 (catálogo). Nombres y
-- contenido fijados en DEC-037 (tabla tbl_contract_fields, prefijo cfd_).
--
-- Catálogo CERRADO y versionado con el código: lo siembra esta migración y
-- server/prisma/seed.js, y cada clave tiene su columna real en
-- server/src/modules/admin/contractTypes/contractFields.js (un test verifica
-- que las claves de aquí y las del código coinciden). No se edita desde la
-- interfaz. Un tipo de contrato no inventa campos: declara cuáles de estos
-- aplican (tbl_contract_type_fields). La configuración no crea columnas: un
-- campo nuevo es una migración que agrega la columna y su fila aquí.
--
-- Solo entran los campos que varían por tipo. Los estructurales (obra,
-- proveedor, tipo, número, nombre, fecha de inicio, plazo, costo directo,
-- fecha del concepto, prórroga) aplican siempre: sin ellos el contrato, su
-- fecha fin o su valor no existen (DEC-037).
--
-- Columnas:
--   cfd_key        Clave simbólica, la que usa el código. Única.
--   cfd_label      Etiqueta que ve el usuario.
--   cfd_data_type  SELECT, TEXT, TEXTAREA o PERCENT. El cliente lo traduce a
--                  un tipo de GenericFormSection.
--   cfd_group      CONTRACT (datos del contrato) o CONCEPT (valor inicial,
--                  otrosí y otrosí de liquidación).
--   cfd_order      Orden por defecto dentro del grupo.
--
-- Sin columnas de autoría ni de estado: es dato de referencia sembrado con el
-- código, como tbl_status. Ids fijos.

CREATE TABLE `tbl_contract_fields` (
  `cfd_id` int NOT NULL,
  `cfd_key` varchar(40) NOT NULL,
  `cfd_label` varchar(100) NOT NULL,
  `cfd_data_type` varchar(20) NOT NULL,
  `cfd_group` varchar(20) NOT NULL,
  `cfd_order` int NOT NULL,
  PRIMARY KEY (`cfd_id`) USING BTREE,
  UNIQUE INDEX `uq_contract_fields_key` (`cfd_key`),
  CONSTRAINT `ck_contract_fields_data_type` CHECK (`cfd_data_type` IN ('SELECT', 'TEXT', 'TEXTAREA', 'PERCENT')),
  CONSTRAINT `ck_contract_fields_group` CHECK (`cfd_group` IN ('CONTRACT', 'CONCEPT'))
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `tbl_contract_fields` (`cfd_id`, `cfd_key`, `cfd_label`, `cfd_data_type`, `cfd_group`, `cfd_order`) VALUES
(1, 'STAGE', 'Etapa', 'SELECT', 'CONTRACT', 1),
(2, 'OBSERVATION', 'Observaciones', 'TEXTAREA', 'CONTRACT', 2),
(3, 'CONCEPT_DESCRIPTION', 'Objeto o descripción del otrosí', 'TEXTAREA', 'CONCEPT', 1),
(4, 'ADMIN_PCT', 'Administración', 'PERCENT', 'CONCEPT', 2),
(5, 'CONTINGENCY_PCT', 'Imprevistos', 'PERCENT', 'CONCEPT', 3),
(6, 'PROFIT_PCT', 'Utilidad', 'PERCENT', 'CONCEPT', 4),
(7, 'VAT_PCT', 'IVA', 'PERCENT', 'CONCEPT', 5),
(8, 'ADVANCE_PCT', 'Anticipo', 'PERCENT', 'CONCEPT', 6),
(9, 'RETENTION_PCT', 'Retenido', 'PERCENT', 'CONCEPT', 7);
