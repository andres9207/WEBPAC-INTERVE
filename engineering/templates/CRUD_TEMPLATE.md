# Spec de CRUD: `<módulo>`

> Plantilla para un CRUD de nivel 1 o 2. Copiarla a la carpeta del módulo o a `docs/specs/`, llenarla y aprobarla antes de implementar. Receta: [`CRUD_STANDARD`](../standards/CRUD_STANDARD.md). Lo que no aplica se marca "No aplica" con el motivo.

## Propósito

Qué representa el registro, quién lo usa y para qué. ADR de origen:

## Clasificación

Nivel 1 / 2, y por qué ([`MODULE_STANDARD`](../standards/MODULE_STANDARD.md)).

## Entidad

| Campo | Valor |
| --- | --- |
| Tabla | `tbl_` |
| Prefijo (verificado libre) | `___` |
| Id en la API | `___Id` |
| Área / carpeta | `modules/admin/<módulo>/` para maestros ([DEC-017](../decisiones/DEC-017-area-idioma-maestros.md)) |
| Entidad de bloqueo | `ENTIDAD_` al final de `LOCK_ORDER` ([DEC-019](../decisiones/DEC-019-maestros-orden-bloqueo.md)) |

## Campos

| Campo (API) | Columna | Tipo | Obligatorio | Validación | Notas |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

Más las columnas estándar: `sta_id`, seis de autoría, dos de idempotencia.

## Relaciones

| Referencia a / desde | Cardinalidad | FK | ¿Bloquea la eliminación? |
| --- | --- | --- | --- |
| | | | |

## Reglas y validaciones

| Regla | Tipo (UX / negocio / seguridad / integridad) | Dónde se garantiza |
| --- | --- | --- |
| Unicidad de … entre no eliminados | Integridad | Service bajo bloqueo + BD |
| | | |

## Permisos

| Acción | `per_id` (siguiente libre) | Clave en `PERMISSIONS` | Gestión o ver |
| --- | --- | --- | --- |
| Ver | | | Ver (todos los perfiles) |
| Crear | | | Gestión (Superadmin) |
| Editar | | | Gestión |
| Eliminar | | | Gestión |
| Cambiar estado (maestros, [DEC-020](../decisiones/DEC-020-patron-maestro.md)) | | | Gestión |

## API

| Acción | Verbo y ruta | Permiso | Idempotency-Key |
| --- | --- | --- | --- |
| Listar | `POST /api/<área>/<módulo>/pagination_<módulo>` | ver | No |
| Crear / editar | `POST …/save_<módulo>` | crear / editar | Al crear |
| Obtener (maestros) | `GET …/get_<entidad>` | ver | No |
| Cambiar estado (maestros) | `PUT …/change_status_<entidad>` | cambiar estado | No |
| Eliminar | `PUT …/delete_<módulo>` | eliminar | No |
| Lista para selects | `GET …/get_<entidades>_select` ([DEC-018](../decisiones/DEC-018-selector-maestros.md)) | solo sesión | No |

## Base de datos

Migraciones previstas (`NNNN_create_…`, `NNNN_seed_…_pages_permissions`) y si deben ir antes del código.

## Frontend

Página, diálogo, columnas de la tabla, filtros, acciones por fila, `pag_url` y ruta.

## Auditoría

Técnica o funcional (ADR-0013, decisión 9). Si es funcional: entidad en `AUDIT_ENTITIES` y campos auditados.

## Invariantes

Cuáles toca ([`invariants/`](../invariants/README.md)) y cómo se cumplen.

## Tests

Lista de casos (mínimos en [`CRUD_STANDARD`](../standards/CRUD_STANDARD.md), paso 6).

## Preguntas abiertas

Lo que el ADR deja como "pendiente de validación" y afecta a este módulo.
