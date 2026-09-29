# DEC-020 — Los maestros se declaran sobre un patrón reutilizable; el cambio de estado es una acción con permiso propio

**Fecha:** 2026-09-29 · **Tipo:** Obligatoria · **ADR:** [0003](../adr/0003-aseguradoras.md), [0004](../adr/0004-constructoras.md), [0006](../adr/0006-tipos-contrato.md)–[0010](../adr/0010-tipos-proveedor.md), [0019](../adr/0019-tipos-poliza.md), [0013](../adr/0013-auditoria-trazabilidad.md), [0027](../adr/0027-integridad-transaccional.md)

Backlog MAE-BE-01.

## Contexto

El primer maestro (tipos de identificación) se escribió a mano: unas 250 líneas en cuatro archivos. Los otros siete de [DEC-017](DEC-017-area-idioma-maestros.md) las repetirían. Además, todos los ADR de maestros proponen un permiso `CAMBIAR ESTADO` separado de `EDITAR`, porque desactivar tiene otro impacto que corregir un nombre.

## Decisión

- **Fábrica repartida en las carpetas existentes de `common/`**, sin crear carpetas nuevas:
  - `common/services/master.service.js`: `defineMaster(config)` y `createMasterService(config)`.
  - `common/utils/masterValidation.utils.js`: `createMasterSchemas(config)`.
  - `common/utils/masterRouter.utils.js`: `createMasterControllers` y `createMasterRouter(config, service)`.
- **Un maestro son dos archivos:** `<módulo>.service.js` declara la config y exporta el service, y `<módulo>.routes.js` monta `createMasterRouter`. Sin controller ni validation propios.
- **Acciones y rutas**, todas con `verifyToken → requirePermission → esquema → validate`:

  | Ruta | Permiso |
  | --- | --- |
  | `POST /pagination_<plural>` | `view` |
  | `GET /get_<entidad>` | `view` |
  | `GET /get_<plural>_select` | solo sesión ([DEC-018](DEC-018-selector-maestros.md)) |
  | `POST /save_<entidad>` | `create` / `edit` |
  | `PUT /change_status_<entidad>` | **`changeStatus`** |
  | `PUT /delete_<entidad>` | `delete` |

- **`save` no toca el estado.** Un registro nace activo. Se activa o desactiva solo con `change_status_*`, que tiene su propio permiso.
- **La config es la lista blanca.** Solo filtran y ordenan los campos declarados con `filter` y `sortable`; nada del cliente llega a Prisma como nombre de columna.
- **Campos:** `required`, `maxLength`, `pattern`, `uppercase`, `editable` (un campo no editable se fija al crear) y `unique` (el duplicado entre no eliminados se controla en el service y se respalda con la columna generada de `CRUD_STANDARD`).
- **Dependientes:** `dependents: [{ model, column, label }]`. Al eliminar se cuentan con el registro bloqueado, y el error dice cuántos y de qué: "lo usan 2 usuario(s)".
- **`assertAssignable(tx, id, currentId)`** para los services que asignan el maestro ([DEC-019](DEC-019-maestros-orden-bloqueo.md)).
- **Bitácora funcional opcional** con `audit: { entity }`, para tipos de contrato y tipos de póliza (ADR-0013). Sin `audit`, solo quedan las columnas de autoría.

## Descartado

- **Una carpeta nueva `common/masters/`:** se prefirió repartir la fábrica en las carpetas existentes.
- **Cambiar el estado desde `save` con el permiso `edit`:** se aparta de los ADR de maestros.

## Qué implica

- Todo maestro nuevo se declara con `defineMaster`. Un maestro que necesite algo que el patrón no cubre (p. ej. la versión de configuración de tipos de contrato, ADR-0006) extiende el patrón o se construye a mano con `COMPLEX_CRUD`, y el motivo se escribe en su spec.
- Cada maestro siembra **cinco** permisos (`view`, `create`, `edit`, `delete`, `changeStatus`).
- Los tests del patrón están en `server/test/common/`; los de cada maestro prueban solo su config.

## Dónde

`server/src/common/services/master.service.js` · `server/src/common/utils/masterValidation.utils.js` · `server/src/common/utils/masterRouter.utils.js` · `server/src/modules/admin/identityDocuments/` · migración `0021_seed_identity_documents_change_status_permission.sql` · tests en `server/test/common/services/master.service.test.js`, `server/test/common/utils/masterRouter.utils.test.js` y `server/test/modules/admin/identityDocuments/`
