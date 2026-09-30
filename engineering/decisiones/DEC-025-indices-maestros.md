# DEC-025 — Índice (estado, nombre) en los maestros; la búsqueda no usa índice

**Fecha:** 2026-09-29 · **Tipo:** Obligatoria · **ADR:** [0003](../adr/0003-aseguradoras.md), [0004](../adr/0004-constructoras.md), [0006](../adr/0006-tipos-contrato.md)–[0010](../adr/0010-tipos-proveedor.md), [0019](../adr/0019-tipos-poliza.md)

Backlog MAE-BD-12.

## Contexto

Cada maestro tenía el índice de `sta_id` que MySQL crea para la FK de estado y el `UNIQUE` sobre la columna generada `_active` (unicidad). Ninguno servía al orden por nombre: el selector (`WHERE sta_id = 1 ORDER BY <nombre>`, [DEC-018](DEC-018-selector-maestros.md)) ordenaba aparte (`filesort`), y constructoras recorría toda la tabla.

## Decisión

- **Un índice compuesto `idx_<tabla>_status_<campo>` sobre (`sta_id`, `<nombre o descripción>`)** en cada maestro (migración `0035`). El selector filtra y ordena desde el índice, sin `filesort`. En el `EXPLAIN` de abajo además no lee la tabla (`Using index`) porque pide solo id, nombre y estado; un maestro cuyo selector pide más columnas (tipos de identificación trae el código) lee la fila, pero sigue sin ordenar aparte.
- **El índice simple de `sta_id` desaparece:** la FK de estado pasa a usar el compuesto. MySQL quita solo el índice implícito de la FK al crear el compuesto, así que la migración no lleva `DROP INDEX` (fallaría con el error 1091).
- **La búsqueda general no usa índice, a propósito.** `search` ([DEC-024](DEC-024-busqueda-listados.md)) es `LIKE '%texto%'`, que un índice B-tree no puede resolver. En catálogos de decenas de filas, recorrer el índice es más barato que mantener un `FULLTEXT`.
- **El listado** (`WHERE sta_id <> 3 ORDER BY <nombre>`) recorre el índice y ordena aparte: el rango sobre `sta_id` impide leerlo ya ordenado por nombre. Con tope de 100 filas por página ([DEC-013](DEC-013-paginacion.md)) y tablas chicas, no justifica otro índice.
- **FK desde las entidades de negocio** (obras, pólizas, proveedores, contactos): cada una declara el índice sobre su columna en su propia migración. MySQL lo crea igual al declarar la FK; se nombra explícito.
- **Maestros nuevos** (tipos de contrato, tipos de póliza): el índice compuesto va en su migración de creación ([`CRUD_STANDARD`](../standards/CRUD_STANDARD.md), paso 1).

## Planes de ejecución

Consultas equivalentes a las del patrón: selector `WHERE sta_id = 1 ORDER BY <campo> LIMIT 100`; listado `WHERE sta_id <> 3 ORDER BY <campo> LIMIT 10`; listado con búsqueda, lo mismo más `AND <campo> LIKE '%a%'`. Cada celda: `type/key/Extra` de `EXPLAIN` en la BD de desarrollo (MySQL 8.0.45), el 2026-09-29.

**Antes (sin el índice compuesto):**

| Tabla | Filas | Selector | Listado | Listado con búsqueda |
| --- | --- | --- | --- | --- |
| tbl_identity_documents | 6 | ref/tbl_identity_documents_status/Using filesort | ALL/-/Using where; Using filesort | ALL/-/Using where; Using filesort |
| tbl_provider_types | 3 | ref/tbl_provider_types_status/Using filesort | range/tbl_provider_types_status/Using index condition; Using filesort | range/tbl_provider_types_status/Using index condition; Using where; Using filesort |
| tbl_address_types | 5 | ref/tbl_address_types_status/Using filesort | range/tbl_address_types_status/Using index condition; Using filesort | range/tbl_address_types_status/Using index condition; Using where; Using filesort |
| tbl_insurers | 9 | ref/tbl_insurers_status/Using filesort | ALL/-/Using where; Using filesort | ALL/-/Using where; Using filesort |
| tbl_supervision_types | 4 | ref/tbl_supervision_types_status/Using filesort | range/tbl_supervision_types_status/Using index condition; Using filesort | range/tbl_supervision_types_status/Using index condition; Using where; Using filesort |
| tbl_construction_companies | 10 | ALL/-/Using where; Using filesort | ALL/-/Using where; Using filesort | ALL/-/Using where; Using filesort |

**Después (con `0035`, sin forzar el índice):**

| Tabla | Filas | Selector | Listado | Listado con búsqueda |
| --- | --- | --- | --- | --- |
| tbl_identity_documents | 6 | ref/idx_identity_documents_status_name/Using index | index/idx_identity_documents_status_name/Using where; Using index; Using filesort | index/idx_identity_documents_status_name/Using where; Using index; Using filesort |
| tbl_provider_types | 3 | ref/idx_provider_types_status_name/Using index | index/idx_provider_types_status_name/Using where; Using index; Using filesort | index/idx_provider_types_status_name/Using where; Using index; Using filesort |
| tbl_address_types | 5 | ref/idx_address_types_status_name/Using index | index/idx_address_types_status_name/Using where; Using index; Using filesort | index/idx_address_types_status_name/Using where; Using index; Using filesort |
| tbl_insurers | 9 | ref/idx_insurers_status_description/Using index | index/idx_insurers_status_description/Using where; Using index; Using filesort | index/idx_insurers_status_description/Using where; Using index; Using filesort |
| tbl_supervision_types | 4 | ref/idx_supervision_types_status_name/Using index | index/idx_supervision_types_status_name/Using where; Using index; Using filesort | index/idx_supervision_types_status_name/Using where; Using index; Using filesort |
| tbl_construction_companies | 10 | ref/idx_construction_companies_status_description/Using index | index/idx_construction_companies_status_description/Using where; Using index; Using filesort | index/idx_construction_companies_status_description/Using where; Using index; Using filesort |

Forzando el índice (`FORCE INDEX`) el plan es el mismo: el optimizador ya lo elige solo.

## Descartado

- **Índice solo por nombre:** no sirve al selector, que filtra por estado primero.
- **`FULLTEXT` para la búsqueda:** no encuentra fragmentos dentro de palabras ("cc" en "protección") y no se justifica por volumen.
- **Buscar solo por prefijo (`LIKE 'texto%'`)** para poder usar el índice: cambia lo que encuentra el usuario sin ganancia real.

## Qué implica

- Todo maestro tiene `idx_<tabla>_status_<campo>` y no tiene índice simple de `sta_id`.
- Si un maestro crece a miles de filas, se revisan los planes de esta ficha antes de agregar índices.

## Dónde

`database/migrations/0035_index_masters_status_name.sql` · `server/prisma/schema.prisma` (`@@index([sta_id, <campo>])`)
