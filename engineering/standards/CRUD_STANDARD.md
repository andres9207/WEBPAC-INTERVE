# Estándar de CRUD (maestros y CRUD complejos)

Receta obligatoria para construir un CRUD de nivel 1 o 2 ([`MODULE_STANDARD`](MODULE_STANDARD.md)) de punta a punta.

**Módulo de referencia: `security/profiles`.** Ante cualquier duda de forma, se copia lo que hace él.

| Capa | Archivo de referencia |
| --- | --- |
| Rutas | `server/src/modules/security/profiles/profiles.routes.js` |
| Validación | `server/src/modules/security/profiles/profiles.validation.js` |
| Controller | `server/src/modules/security/profiles/profiles.controller.js` |
| Service | `server/src/modules/security/profiles/profiles.service.js` |
| Tests | `server/test/modules/security/profiles/` |
| API del cliente | `client/src/api/requests/profilesApi.js` |
| Página | `client/src/views/security/profiles/ProfilePage.jsx` |
| Diálogo | `client/src/views/security/profiles/components/ProfileDialog.jsx` |

**Maestros ([DEC-020](../decisiones/DEC-020-patron-maestro.md)):** no se escriben a mano. Se declaran con `defineMaster` en `<módulo>.service.js` y se montan con `createMasterRouter` en `<módulo>.routes.js`. La fábrica cubre los pasos 4 y 5 (service, validación, controller y rutas) y la mayor parte del 6. Siguen siendo tuyos la BD (1), la página y los permisos (2), `LOCKABLE` (3), los tests de la config (6) y el cliente (7). Referencia: `server/src/modules/admin/identityDocuments/`.

El esqueleto de código está en [`patterns/SIMPLE_CRUD.md`](../patterns/SIMPLE_CRUD.md). Lo propio de un CRUD complejo (hijos, bloqueo por uso), en [`patterns/COMPLEX_CRUD.md`](../patterns/COMPLEX_CRUD.md).

## Antes de empezar

1. Leer el ADR del módulo: unicidad, relaciones, qué impide eliminar, nivel de auditoría.
2. Llenar la spec con [`templates/CRUD_TEMPLATE.md`](../templates/CRUD_TEMPLATE.md).
3. Respetar la decisión pendiente **PD-02** (código del duplicado) de [`PROJECT_STATE`](../PROJECT_STATE.md). Los selects siguen [DEC-018](../decisiones/DEC-018-selector-maestros.md), y la posición en `LOCK_ORDER`, [DEC-019](../decisiones/DEC-019-maestros-orden-bloqueo.md). Maestro de referencia ya implementado: `admin/identityDocuments`.
4. Tomar módulo, tabla y prefijo de la tabla de [DEC-017](../decisiones/DEC-017-area-idioma-maestros.md). Todos los maestros van en el área `admin/`.

## Orden de construcción

### 1. Base de datos

Migración `database/migrations/NNNN_create_<tabla>.sql` según [`DATABASE_STANDARD`](DATABASE_STANDARD.md):

- Prefijo de tres letras propio y verificado como libre.
- PK `<pre>_id int AUTO_INCREMENT`.
- Columnas del dominio, con `NOT NULL` donde el ADR las exige.
- `sta_id int NOT NULL DEFAULT 1` con FK a `tbl_status` (1 activo, 2 inactivo, 3 eliminado).
- Las seis columnas de autoría con sus FK a `tbl_users`.
- `<pre>_idempotency_key char(36)` con `UNIQUE` y `<pre>_idempotency_hash char(64)`.
- Unicidad del dominio (p. ej. "descripción única entre no eliminados", ADR-0003): se controla en el service **dentro de la transacción** y se respalda en la BD. Como la regla excluye los eliminados, un `UNIQUE` simple no sirve. El patrón es una columna generada que vale el campo mientras el registro no está eliminado y `NULL` cuando lo está, con `UNIQUE` sobre ella (MySQL admite varios `NULL` en un `UNIQUE`):

  ```sql
  `<pre>_name_active` varchar(100) GENERATED ALWAYS AS (IF(`sta_id` <> 3, `<pre>_name`, NULL)) VIRTUAL,
  UNIQUE INDEX `uq_<tabla>_name_active` (`<pre>_name_active`)
  ```

  La colación de la columna decide qué es igual (con `utf8mb4_0900_ai_ci`, "Cédula" y "cedula" son el mismo nombre). La columna generada nunca se escribe desde el código: se documenta con `///` en `schema.prisma`. Una carrera que pasa el control del service llega como `P2002` y responde 409 (PD-02). Referencia: `0017_create_identity_documents.sql`.

Aplicarla en la BD de desarrollo y correr `npx prisma db pull` en `server/`. Renombrar las relaciones de autoría a `created_by_user` / `updated_by_user` / `deleted_by_user` (ver `database/migrations/README.md`, "Relación con Prisma").

### 2. Página y permisos

- Migración `NNNN_seed_<modulo>_pages_permissions.sql`: la fila en `tbl_pages` (con `pag_parent`, `pag_url` igual a la ruta del cliente, icono, orden, `pag_type` 2) y los permisos en `tbl_permissions`. Con los **siguientes ids libres**: nunca se reutilizan 10, 15 ni 16.
- Permisos mínimos: `view`, `create`, `edit`, `delete`. Un maestro suma `changeStatus` (activar o desactivar, [DEC-020](../decisiones/DEC-020-patron-maestro.md)). Otros, solo si el ADR los pide.
- `server/prisma/seed.js`: agregar la página y los permisos. Los de gestión van solo a Superadmin (`pro_id = 1`); `view` va a todos los perfiles.
- `server/src/common/constants/permissions.constants.js`: la entrada del módulo. El cliente la recibe sola por `get_catalog`.

### 3. Protocolo de bloqueo y auditoría

- Registrar la tabla en `LOCKABLE` de `server/src/common/services/transaction.service.js`, al final de `LOCK_ORDER` ([DEC-019](../decisiones/DEC-019-maestros-orden-bloqueo.md)). La operación que asigna el maestro a otro registro también lo bloquea, y verifica que esté activo (o que sea el que el registro ya tenía).
- Si el ADR-0013 (decisión 9) exige auditoría **funcional** para el módulo, agregar la entidad a `AUDIT_ENTITIES` y escribir con `writeAudit`. Los maestros simples (aseguradoras, constructoras, tipos de interventoría, identificación, dirección y proveedor) son auditoría **técnica**: solo columnas, sin bitácora. Tipos de contrato y tipos de póliza sí son funcionales.

### 4. Service

| Operación | Cómo | Reglas |
| --- | --- | --- |
| `pagination<X>` | `paginate(prisma.tbl_x, { where, select, orderBy }, { first, rows })` | `where` excluye `sta_id = 3`. `orderBy` sale de `X_SORT_FIELDS` con un default. Devuelve `{ ...page, results: page.results.map(toDto) }` con `updatedByName` (DEC-014) |
| Crear | `runIdempotent({ target, key, ownerId, payload, execute })` → `withTransaction` | La clave se busca **antes** del control de duplicados. Autor en `<pre>_create_by` y `<pre>_update_by` |
| Editar | `withLockedTransaction({ ENTIDAD: id }, fn, { idempotent: true })` | Nada se lee antes del bloqueo. Duplicado excluyendo el propio id. Inexistente → 404. Si pasa de eliminado a visible, limpiar `<pre>_delete_by/_at` |
| Eliminar | `withLockedTransaction({ ENTIDAD: id }, fn)` | Lógica: `sta_id = 3`, `<pre>_delete_by`, `<pre>_delete_at`. Ya eliminado o inexistente → **404** (DEC-006). En uso → 400 con mensaje que diga por qué (ver COMPLEX_CRUD) |
| Lista para selects | `findMany` con `take: MAX_ROWS`, sin `paginate` ([DEC-018](../decisiones/DEC-018-selector-maestros.md)) | Solo activos (`sta_id = 1`), más `includeId` si no está eliminado. Ruta con solo `verifyToken` |

Los errores se lanzan con `new Error(msg)` y `.statusCode`. El service no conoce `req`.

### 5. Validación, controller, rutas

- `<modulo>.validation.js` con las reglas de `common/utils/validation.utils.js`: `paginationRules()`, `optionalText`, `requiredId`, `idempotencyKeyRule(isCreate)`. Todo campo de `body`, `query` y `params` tiene regla.
- Controller: saca el sujeto y el autor de `req.user`, arma `ctx = auditContext(req)`, lee la clave con `req.get(IDEMPOTENCY_HEADER)` y delega con `next(err)`.
- Rutas con el pipeline completo: `verifyToken → requirePermission → schema → validate → controller`. `save_<x>` resuelve create o edit con `requirePermission((req) => req.body.<x>Id > 0 ? edit : create)`.
- Montar en `server/src/modules/main.routes.js`.

### 6. Tests

En `server/test/modules/<área>/<modulo>/`, con mocks de Prisma y `transactionRawMocks()`. Mínimo:

- Controller: un autor o sujeto falsificado en el body se ignora.
- Service: crear; editar; duplicado; eliminar; eliminar ya eliminado → 404; eliminar en uso → bloqueado; reactivar limpia las columnas de eliminación; reintento idempotente devuelve lo creado.

### 7. Cliente

- `client/src/api/requests/<modulo>Api.js` sobre `httpCliente`: `pagination<X>API`, `save<X>API(params, idempotencyKey)` con `idempotencyConfig(key)`, `delete<X>API`.
- Diálogo `components/<X>Dialog.jsx`: `forwardRef` + `useImperativeHandle` con `new<X>()` y `edit<X>(item)`; `BaseDialog`; `react-hook-form` + `GenericFormSection`; clave nueva con `newIdempotencyKey()` al abrir para crear y `null` al editar; `showSuccess` / `showError`.
- Página `<X>Page.jsx`: `MainCard`; botón de filtros con `Badge` y `FilterPopper`; `DataTable` paginado en el servidor; `StatusChip`; `LastModifiedCell`; acciones con `canDo(perId)` y `confirm` para eliminar; `showError` en todo `catch`.
- Ruta lazy en `client/src/routes/MainRoutes.jsx`, con el mismo path que `pag_url`.
- Entrada en `client/src/menu-items/` solo si se quieren migas de pan: el sidebar sale de `tbl_pages`.

Detalle de la anatomía en [`FRONTEND_STANDARD`](FRONTEND_STANDARD.md).

### 8. Verificar

Checklist de [`ENDPOINT_STANDARD`](ENDPOINT_STANDARD.md) completo, `yarn test` en el servidor, `yarn lint` en el cliente, y prueba en vivo: crear, editar, eliminar, doble clic al crear, usuario sin permiso (403) y eliminar algo en uso.

## Nombres

Los ocho maestros ya tienen módulo, tabla y prefijo fijados en [DEC-017](../decisiones/DEC-017-area-idioma-maestros.md).

| Elemento | Formato | Perfiles (existente) | Tipos de contrato (maestro) |
| --- | --- | --- | --- |
| Tabla | `tbl_<plural en inglés, snake_case>` | `tbl_profiles` | `tbl_contract_types` |
| Columnas | `<pre>_<nombre>` | `pro_name` | `ctt_name` |
| Id en la API | `<pre>Id` en camelCase | `proId` | `cttId` |
| Carpeta del servidor | `modules/<área>/<módulo en camelCase>/` | `security/profiles/` | `admin/contractTypes/` |
| Archivos del servidor | `<módulo>.<capa>.js` | `profiles.service.js` | `contractTypes.service.js` |
| Rutas HTTP | `/api/<área>/<módulo>/<acción>_<entidad en snake_case>` | `/api/security/profiles/save_profile` | `/api/admin/contractTypes/save_contract_type` |
| Archivo de API | `<módulo>Api.js` | `profilesApi.js` | `contractTypesApi.js` |
| Funciones de API | `<acción><X>API` | `saveProfileAPI` | `saveContractTypeAPI` |
| Página y diálogo | `<X>Page.jsx`, `<X>Dialog.jsx` | `ProfilePage.jsx` | `ContractTypePage.jsx`, `ContractTypeDialog.jsx` |
| Permisos | `PERMISSIONS.<área>.<módulo>.<acción>` | `PERMISSIONS.security.profiles.create` | `PERMISSIONS.admin.contractTypes.create` |
| Constantes de orden | `<X>_SORT_FIELDS` | `PROFILE_SORT_FIELDS` | `CONTRACT_TYPE_SORT_FIELDS` |

Tablas y código en inglés; lo que ve el usuario, en español (DEC-017).
