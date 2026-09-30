# DEC-027 — El tipo de interventoría se ancla a la obra

**Fecha:** 2026-09-30 · **Tipo:** Vigente · **ADR:** [0007](../adr/0007-tipos-interventoria.md), [0011](../adr/0011-obras.md)

Resuelve la decisión de negocio DEC-20 del backlog (`docs/backlog/BACKLOG.md`), confirmada por el área usuaria.

## Contexto

ADR-0007 (decisión 3) dejó pendiente si el tipo de interventoría describe a la obra o a cada contrato. Si un contrato pudiera tener un tipo distinto del de su obra, la FK iba en la tabla de contratos.

## Decisión

- El tipo de interventoría es un atributo **de la obra**. Todos los contratos de una obra comparten su tipo.
- FK obligatoria `tbl_works.spt_id` → `tbl_supervision_types`, `ON DELETE RESTRICT`, con índice.
- El listado de obras usa `JOIN` externo al tipo y no filtra por su estado (ADR-0007, decisión 7).

## Descartado

- **Anclaje al contrato**: el área usuaria confirmó que un contrato no tiene un tipo distinto del de su obra.

## Qué implica

- La tabla de contratos **no** lleva columna de tipo de interventoría. El criterio 5 de PRO-BD-09 no aplica.
- `tbl_works` se agrega a los `dependents` de `supervisionTypes.service.js`, con label "obra(s)" (criterio 5 de PRO-BD-01).

## Dónde

Migración de `tbl_works` · `server/src/modules/admin/supervisionTypes/supervisionTypes.service.js`
