-- Migración 0088: tipos de póliza iniciales, PROVISIONALES
--
-- Requiere: 0078_create_policy_types.sql ya aplicado.
--
-- MAE-BD-14. DEC-04 (qué tipos existen y qué base usa cada uno) sigue
-- abierta: el área usuaria y la aseguradora no han confirmado la lista. El
-- usuario decidió el 2026-10-09 sembrar estos seis como provisionales para no
-- bloquear el uso de pólizas (ver DEC-050). Son los amparos habituales de un
-- contrato de obra:
--
--   - Base TOTAL_VALUE (valor del contrato con IVA), la práctica común.
--   - El anticipo, TAXABLE_BASE: el anticipo se calcula antes de IVA
--     (DEC-044), y el amparo cubre ese valor.
--
-- Cuando se confirme DEC-04:
--   - un nombre se corrige desde el maestro;
--   - una base se cambia con el permiso 98, queda en la bitácora y no
--     recalcula las pólizas ya emitidas (ADR-0019, decisión 7);
--   - un tipo que sobre se inactiva. La clave no se edita: un tipo con otra
--     clave es un tipo nuevo.
--
-- Sin ids fijos: en un ambiente donde ya se crearon tipos a mano o con
-- seed.demo.js, los ids bajos pueden estar ocupados. La identidad estable es
-- la clave (`uq_policy_types_key`). Se puede aplicar más de una vez: no
-- inserta un tipo cuya clave ya exista, ni uno cuyo nombre ya use otro tipo
-- no eliminado (`uq_policy_types_name_active`). server/prisma/seed.js siembra
-- los mismos, por clave, sin pisar los ya editados.
--
-- Autoría en NULL: es un dato de instalación, sin usuario de sesión.

INSERT INTO `tbl_policy_types` (`plt_key`, `plt_name`, `plt_base`, `sta_id`)
SELECT seed.`plt_key`, seed.`plt_name`, seed.`plt_base`, 1
FROM (
  SELECT 'CUMPLIMIENTO' AS `plt_key`, 'Cumplimiento' AS `plt_name`, 'TOTAL_VALUE' AS `plt_base`
  UNION ALL SELECT 'ANTICIPO', 'Buen manejo y correcta inversión del anticipo', 'TAXABLE_BASE'
  UNION ALL SELECT 'SALARIOS', 'Pago de salarios y prestaciones sociales', 'TOTAL_VALUE'
  UNION ALL SELECT 'ESTABILIDAD', 'Estabilidad y calidad de la obra', 'TOTAL_VALUE'
  UNION ALL SELECT 'CALIDAD_BIENES', 'Calidad y correcto funcionamiento de los bienes', 'TOTAL_VALUE'
  UNION ALL SELECT 'RCE', 'Responsabilidad civil extracontractual', 'TOTAL_VALUE'
) AS seed
WHERE NOT EXISTS (
  SELECT 1 FROM `tbl_policy_types` AS t
  WHERE t.`plt_key` = seed.`plt_key` COLLATE utf8mb4_0900_ai_ci
     OR t.`plt_name_active` = seed.`plt_name` COLLATE utf8mb4_0900_ai_ci
);
