# CLAUDE.md (server/)

Guía específica del backend. Ver también el [CLAUDE.md raíz](../CLAUDE.md) para el resumen del repositorio completo.

## Comandos

```
yarn                # instalar dependencias
yarn dev            # nodemon server.js (reinicio automático)
yarn start          # node server.js
yarn build          # prisma generate
yarn pm2:start      # pm2 start ecosystem.config.cjs (producción, ver ecosystem.config.cjs)
yarn test           # jest (unitarios, con mocks — sin BD real)
yarn test:watch     # jest --watch
yarn db:seed        # prisma db seed (siembra/repara tbl_pages, tbl_permissions y los permisos del superadmin)
```

### Seed de páginas y permisos (RBAC)

El sidebar completo del cliente se arma en runtime desde `tbl_pages`/`tbl_page_permissions` (`get_menu`, ver `app/general/app.service.js`) — **no** desde los `menu-items/*.js` estáticos del cliente, que son boilerplate del template Berry sin conectar. Si `tbl_pages` está vacía, el sidebar queda vacío para todos, Superadmin incluido: `get_menu` resuelve el menú por perfil (`req.user.proId`) igual para cualquier usuario, sin ningún caso especial.

- `database/migrations/0001_seed_pages_permissions.sql` trae el `INSERT` de `tbl_pages`/`tbl_permissions` (catálogo autocontenido, sin depender de que ya exista un perfil/usuario) — ver [`database/migrations/README.md`](../database/migrations/README.md) para la convención de migraciones.
- `database/migrations/0002_seed_permissions_documents_templates.sql` agrega dos permisos sin página asociada (`pag_id = NULL`, per_id 9/10 — "Gestionar documentos"/"Gestionar plantillas"): no todo permiso cuelga de un ítem visible del sidebar, algunos solo protegen un endpoint que no tiene una página propia en `tbl_pages`.
- `database/migrations/0003_seed_view_permissions.sql` agrega permisos de "ver" (per_id 11-14: perfiles, usuarios, permisos, documentos) para las rutas de lectura/listado que hasta entonces solo tenían `verifyToken`. Originalmente incluía también 15 ("Ver plantillas") y 16 ("Ver integración Microsoft Graph") — retirados junto con los módulos `template/` y `microsoftGraph/` (ver "Trío routes/controller/service"), ninguno tenía tablas reales detrás.
- `server/prisma/seed.js` (`yarn db:seed`) hace lo mismo vía Prisma (`upsert`, idempotente — se puede correr las veces que haga falta) **y además**:
  - asigna todos los permisos de **gestión** (create/edit/delete/assign/manage) al perfil `pro_id = 1` (Superadmin) — ese paso no está en la migración SQL a propósito, porque ahí `tbl_profiles`/`tbl_users` todavía no tienen filas en una instalación nueva;
  - asigna los permisos de **ver** (11-16) a **todos** los perfiles existentes. Basta con el perfil: no hace falta un paso aparte por usuario (ver "Resolución de permisos efectivos" abajo) — se tratan distinto de los de gestión a propósito, porque son de bajo riesgo (solo lectura) y restringirlos a Superadmin habría roto el acceso de cualquier usuario real de un día para otro.

### Resolución de permisos efectivos: unión de perfil + excepciones individuales

El permiso efectivo de un usuario **se resuelve en cada petición**, no se copia una sola vez: es la unión de los permisos de su perfil (`tbl_profile_permissions`, vía `req.user.proId` del JWT) y sus excepciones individuales (`tbl_user_permissions` — que representa *solo* lo que ese usuario tiene además de su perfil, no su set completo). La lógica vive en `common/services/effectivePermissions.service.js` (`hasEffectivePermission`/`getEffectivePermissionIds`) y la usan `requirePermission.middleware.js`, `auth.service.js` (`login`) y `app.service.js` (`getSessionInfo`, detrás de `/app/verify_token`).

- `saveUser` (`security/users/users.service.js`) **ya no copia** los permisos del perfil a `tbl_user_permissions` al crear un usuario — un usuario nuevo hereda los de su perfil automáticamente por la resolución en consulta. Antes sí los copiaba, y por eso un cambio posterior a los permisos de un perfil nunca llegaba a los usuarios ya creados (ver engineering/anti-patterns/SECURITY.md).
- Consecuencia práctica: si cambias los permisos de un perfil (`update_permissions_profile`), **todos sus usuarios lo ven de inmediato**, incluso con una sesión (JWT) ya emitida — no hace falta que vuelvan a iniciar sesión, porque `proId` (no la lista de permisos) es lo único que viaja en el token, y la lista se resuelve fresca contra la BD en cada petición.
- **Límite aceptado**: como es una unión, nunca una resta, la pantalla de "asignar permisos a un usuario" (`update_permissions_user`) no puede quitarle a un usuario puntual un permiso que su perfil ya le da — desmarcarlo y guardar no tiene efecto real. Para eso hay que editar el perfil (afecta a todos sus usuarios de ese perfil) o cambiarle el perfil al usuario.
- Al agregar un endpoint nuevo que consulte "los permisos de un usuario", usar `getEffectivePermissionIds`/`hasEffectivePermission`, nunca leer `tbl_user_permissions` solo — eso volvería a ignorar lo heredado del perfil.
- `GET /security/permissions/get_catalog` (`verifyToken`, sin `requirePermission`) expone `common/constants/permissions.constants.js` tal cual — es la única fuente de verdad de qué `per_id` significa qué acción, y el cliente la consume en el arranque de sesión en vez de duplicarla en un archivo local (`permissionsConfig.js` ya no existe). Si agregas un permiso nuevo, con actualizar `permissions.constants.js` (+ el seed) alcanza — el cliente lo ve automáticamente en su próximo login/verify_token.
- **`update_permissions_user`/`update_permissions_profile` impiden la autoconcesión**: además de `requirePermission(...assignPermission)`, `permissions.service.js` rechaza con 403 si el `useId`/`proId` objetivo coincide con el del solicitante (`req.user`, pasado por el controller — nunca leído del body). Sin excepción para Superadmin, como el resto del sistema de permisos (ver "Falta de autorización granular" en engineering/anti-patterns/SECURITY.md).
- **Los `pag_id`/`per_id` son fijos y no se deben renumerar**: `common/constants/permissions.constants.js` (única fuente de verdad, ver `get_catalog` arriba) usa hoy `per_id` 1-9 y 11-14 (1-8 gestión de perfiles/usuarios, 9 gestión de documentos, 11-14 permisos de ver) — 10, 15 y 16 quedaron retirados junto con los módulos `template/`/`microsoftGraph/`, no se reutilizan. Si agregas una página/permiso nuevo, usa el siguiente id libre y agrégalo en ambos lados (seed + `permissions.constants.js`), y decide explícitamente si es de gestión (solo Superadmin) o de ver (todos los perfiles/usuarios).

### Tests unitarios

Proyecto ESM puro (`"type": "module"`), así que Jest corre con el flag de Node `--experimental-vm-modules` (ver el script `test` en `package.json` y `jest.config.js`).

**Arquitectura de carpeta separada**: los tests **no** están junto al código que prueban — viven en `server/test/`, espejando 1:1 la estructura de `server/src/` (`test/modules/auth/auth.service.test.js` ↔ `src/modules/auth/auth.service.js`, `test/common/middlewares/authjwt.middleware.test.js` ↔ `src/common/middlewares/authjwt.middleware.js`). `jest.config.js` fija `roots: ["<rootDir>/test"]` para que Jest solo busque ahí. El objetivo es que `src/` no se llene de archivos `.test.js` mezclados con el código de negocio. Al agregar un test nuevo:

1. Crear el archivo en `server/test/<mismo-path-relativo-que-en-src>/<archivo>.test.js` (mismo nombre, misma jerarquía de carpetas que su contraparte en `src/`).
2. Las rutas relativas dentro del test (tanto los `jest.unstable_mockModule("...")` como el `await import("...")` del archivo bajo prueba) apuntan a `src/`, no a un archivo hermano — nunca `"./algo.js"` como en el patrón colocado anterior. Ej.: desde `test/modules/security/permissions/permissions.service.test.js` hacia el propio service: `"../../../../src/modules/security/permissions/permissions.service.js"`.

Son **unitarios con mocks**, no integración: Prisma (`common/configs/prismaClient.js`, más `transactionRawMocks()` de `test/helpers/transaction.mock.js` si el service abre transacciones), `socket.manager.js`, `effectivePermissions.service.js`, `sendEmail` y `hashPassword`/`comparePassword` se mockean con `jest.unstable_mockModule(...)` (la forma correcta de mockear en Jest+ESM nativo — `jest.mock()` no sirve aquí porque no hay hoisting). Patrón: mockear el módulo *antes* del `await import(...)` del archivo bajo prueba. Ver `test/modules/auth/auth.service.test.js` como referencia.

Cobertura actual (24 suites, 200 tests):
- `audit.service.js`: diff, ocultamiento de sensibles, agrupación por `operationId` y autor desde `req.user`.
- `security/users/users.service.js` y `security/profiles/profiles.service.js`: columnas de eliminación, reactivación y bitácora (incluidas las páginas y permisos que se borran al eliminar un perfil).
- `auth.service.js`: bloqueo de login, código de recuperación con hash e intentos.
- `auth.controller.js`: regresión del fix de IDOR (el sujeto sale de `req.user`, nunca de `req.query`/`req.body`), además de login, refresh y logout por cookies.
- `session.service.js`: sesión única, rotación, ventana de gracia y detección de reutilización.
- `resetCode.utils.js`.
- `validate.middleware.js`.
- `authjwt.middleware.js`.
- `requirePermission.middleware.js`.
- `error.middleware.js`: qué mensaje es seguro de exponer (ver engineering/anti-patterns/SECURITY.md) y códigos de Prisma.
- `effectivePermissions.service.js`.
- `security/permissions/permissions.service.js`: autoconcesión y emisión de socket dirigida.
- `app/documents/document.controller.js` y los controllers de `security/users`, `security/profiles` y `security/permissions`: el autor de la auditoría y la identidad del solicitante salen del JWT. Un autor falsificado en el body se ignora.
- `cors.config.js`.
- `transaction.service.js`: orden del plan de bloqueo, `REPEATABLE READ` declarado, bloqueo antes de entregar el `tx`. Propaga el error original, e incluye el test de arquitectura que prohíbe mysql2 y `prisma.$transaction` fuera de la utilidad. Además, `saveUser` bloquea perfil → usuario antes de leer, y `error.middleware.js` responde 503 a la espera agotada y 409 al interbloqueo.
- `pagination.utils.js`: las dos formas de entrada, tope de filas, valores basura y metadatos de la respuesta.

El resto de módulos queda pendiente de extender con el mismo patrón.

Supertest está como devDependency para si en el futuro se agregan tests de integración contra un server real — hoy no se usa.

## Configuración de entorno

`server/.env` (copiar desde `.env.template`) necesita:

- `DB_HOST`/`DB_USER`/`DB_NAME`/`DB_PASSWORD` — **sin uso**: las leía el pool mysql2 (`db.config.js`), eliminado (ADR-0027, B1). Toda conexión sale de `DATABASE_URL`. Siguen en `.env.template` solo por compatibilidad con copias existentes.
- `DATABASE_URL` — misma base de datos, usada por Prisma (connection string).
- `JWT_SECRET` — sin fallback: el arranque falla si falta (ver `server.js`). También deriva la clave del HMAC de los códigos de recuperación (`common/utils/resetCode.utils.js`).
- `JWT_EXPIRES_IN` — vida del access token (cookie `token`); por defecto y recomendado `15m`. Un valor largo (p. ej. el viejo `5h`) anula buena parte del beneficio del refresh token.
- `JWT_REFRESH_EXPIRES_IN` — vida del refresh token (cookie `refresh_token`, tabla `tbl_sessions`), con el mismo formato que `JWT_EXPIRES_IN` (`s`, `m`, `h`, `d`; un número solo = segundos); por defecto `7d`. Un valor inválido hace fallar el arranque (`parseDuration` en `session.service.js`).
- `MAIL_*` — configuración del mailer (Nodemailer).

## Arquitectura: estructura modular por capas

### Mapa de carpetas de `server/src/`

Solo estas carpetas son parte activa de la arquitectura — cualquier otra que aparezca en el árbol y no esté en esta lista es residuo, no un lugar donde agregar código nuevo:

- **`modules/`** — el código de negocio real, un módulo por `<área>/<funcionalidad>/` (`app/general`, `app/documents`, `app/notifications`, `auth/`, `security/{users,profiles,permissions}`). Cada uno es el trío `*.routes.js` + `*.controller.js` + `*.service.js` descrito abajo. `modules/main.routes.js` agrega todos los routers bajo `/api/*`. Existieron también `microsoftGraph/` y `template/`, eliminados por completo: ninguno de los dos tenía tablas reales detrás (`tbl_business_rules`/`tbl_template`/`tbl_estados` no existen en ningún lado, ni en `bdtemplate.sql` ni en la BD real) — `microsoftGraph/` sí tenía rutas conectadas y devolvía 500 en cualquier llamada real, `template/` nunca tuvo caller en el cliente.
- **`common/`** — todo lo transversal, compartido entre módulos:
  - `common/configs/` — `prismaClient.js` (cliente Prisma singleton, **único** acceso a la base de datos del backend, incluido `testConnection` al arrancar `server.js`; fija la sesión MySQL en UTC porque el adapter escribe y lee fechas como UTC — no quitar), `cors.config.js` (allowlist de orígenes, usada también por `socket.js`).
  - `common/constants/` — `permissions.constants.js` (catálogo de `per_id`, única fuente de verdad; el cliente lo lee con `get_catalog`, ver "Resolución de permisos efectivos").
  - `common/middlewares/` — `authjwt.middleware.js` (`verifyToken`), `requirePermission.middleware.js`, `validate.middleware.js`, `error.middleware.js` (montado al final de `app.js`).
  - `common/services/`: lógica compartida entre módulos, p. ej. `effectivePermissions.service.js`, `session.service.js` (ver "Sesiones" abajo) y `audit.service.js` (ver "Auditoría" abajo).
  - `common/utils/funciones.js`: utilidades sueltas (hash/compare de password, etc.), usado hoy por `auth.service.js` y `security/users/users.service.js`.
  - `common/utils/resetCode.utils.js`: genera el código de recuperación de contraseña y calcula su HMAC.
  - `common/utils/validation.utils.js`: reglas de `express-validator` que comparten los `*.validation.js` (paginación, ids, arreglos de ids).
  - `common/utils/pagination.utils.js`: `paginate(model, queryArgs, pagination)`, helper único de listados (ver "Listados paginados" en `ENDPOINT_STANDARD.md`).
  - `common/templates/` — plantillas de correo; hoy son las plantillas genéricas heredadas del boilerplate original (`plantilla.template.js`/`plantilla2`/`plantilla3`/`images.js`), **sin ningún caller real** (confirmado por búsqueda completa) — candidatas a limpieza, no un lugar activo para plantillas nuevas hasta que se confirme cuál sigue en uso.
- **`socket.js`** (raíz de `server/`, **no** `src/socket/`) — inicializa Socket.IO, une cada conexión a la sala `` `user:${useId}` `` para emitir dirigido (ver `app/notifications` y `security/permissions`). Lo arranca `server.js`.
- **`prisma/`** (raíz de `server/`) — `schema.prisma` (introspectado desde la BD real) y `seed.js` (RBAC idempotente, ver "Seed de páginas y permisos").
- **`test/`** (raíz de `server/`) — toda la suite de Jest, en un árbol separado de `src/` que la espeja 1:1 (ver "Tests unitarios" más abajo).
- **`app.js`/`server.js`** (raíz de `server/`) — entrypoints: `app.js` arma el pipeline de middleware de Express, `server.js` crea el server HTTP, inicializa Socket.IO y prueba la conexión a BD al arrancar.

**Carpetas vestigiales conocidas, sin uso real** (no borrar código a ciegas si aparecen en un `find`, pero tampoco agregar nada ahí): `src/cron/` (framework de cron jobs con `node-cron`; `server.js` lo arranca con `startCronJobs()`, pero `cronJobs` está vacío, así que no corre nada), `src/images/` (dos logos del boilerplate original — `logoPavasStay.png`/`logo_doblamos.jpg` — sin ningún caller), `src/socket/`, `src/utils/` y `src/webhooks/` (carpetas vacías, sin un solo archivo). Se eliminaron ya `src/activitySystem/`, `src/features/` y `src/shared/`: eran el esqueleto vacío (cero archivos, nunca trackeado en git) de un intento previo de migrar a una arquitectura feature-based que se revirtió a favor de `modules/`+`common/` — no representaban ningún código ni decisión vigente.

### Trío routes/controller/service

Cada funcionalidad vive bajo `server/src/modules/<área>/<funcionalidad>/` como un trío de `*.routes.js` + `*.controller.js` + `*.service.js`:

- **routes** conectan URL/verbo → controller, aplicando `verifyToken` (`common/middlewares/authjwt.middleware.js`) donde se requiere autenticación.
- **controllers** parsean el `req`, llaman al service, y siempre delegan los errores vía `next(err)` — nunca responden con errores directamente.
- **services** contienen toda la lógica de negocio y el acceso a datos, **vía Prisma** (`common/configs/prismaClient.js`, cliente singleton con adapter `@prisma/adapter-mariadb` — Prisma 7 no trae motor propio). No queda mysql2 en el backend: la migración completa está documentada en engineering/anti-patterns/SECURITY.md, y el pool con `executeQuery` se eliminó porque dejaba escapar escrituras de una transacción (ADR-0027, B1). Un test de arquitectura (`test/common/services/transaction.service.test.js`) falla si alguien vuelve a importar mysql2 o a llamar a `prisma.$transaction` fuera de la utilidad.
  - Transacciones multi-tabla usan `withTransaction` / `withLockedTransaction` de `common/services/transaction.service.js`, nunca `prisma.$transaction` directo (ver `deleteProfile`, `saveUser`, `deleteModuleDoc` y "Transacciones y bloqueos" más abajo).
  - **Nunca pasar un valor del cliente directo a `orderBy`/`where` sin pasar por un mapa fijo** — el patrón establecido (`paginationUsers`, `paginationProfiles`, `paginationModuleDocs`) es un objeto `{ claveDelCliente: (order) => ({ columnaPrisma: order }) }` con un default seguro si la clave no está en el mapa. Antes `sortField` se interpolaba directo en `ORDER BY ${sortField}` (y varios filtros de texto tampoco estaban parametrizados) — inyección SQL real, cerrada como efecto de este patrón, no con un parche aparte (ver engineering/anti-patterns/SECURITY.md).
  - Algunas relaciones no tienen FK real en la BD (`tbl_pages.pag_parent`, `tbl_documents.doc_parent_id`/`doc_create_by`) — Prisma no puede resolverlas con `include`/`select` anidado. El patrón es una segunda consulta puntual + un `Map` en JS para el lookup (ver `getProfileWindows` en `permissions.service.js` o `enrichDocs` en `document.service.js`), no forzar una relación en `schema.prisma` sin respaldo real.
  - Los errores se lanzan como `new Error(msg)` con una propiedad `.statusCode` (o `.status`), que `error.middleware.js` lee para fijar el código HTTP. Esa misma propiedad decide además si el `.message` es seguro de mostrar: un error con `.statusCode`/`.status` se trata como lanzado a propósito con un mensaje ya curado (se devuelve tal cual); uno sin ninguna de las dos (cae al 500 por defecto) se trata como una excepción no clasificada y en producción se reemplaza por un mensaje genérico, para no filtrar detalle interno (rutas de archivo, texto de un driver, etc. — ver engineering/anti-patterns/SECURITY.md).

Todos los routers de las funcionalidades se montan centralmente en `server/src/modules/main.routes.js` bajo `/api/*` (p. ej. `/api/auth`, `/api/security/users`, `/api/security/profiles`, `/api/security/permissions`, `/api/app`, `/api/app/documents`, `/api/app/notifications`). Los módulos de `security/` implementan un sistema RBAC (perfiles → permisos → páginas) respaldado por las tablas `tbl_profiles`/`tbl_permissions`/`tbl_pages`/`tbl_page_permissions`/`tbl_user_permissions`.

`app.js` conecta el middleware global en este orden: `helmet` → `httpLogger` → CORS (allowlist explícita, credentials habilitado) → parsing de body JSON/urlencoded (límite de 50mb) → cookie-parser → compression → `cleanRequestData` → `express-fileupload` → estáticos de `dist/` (build de la SPA) → rutas `/api` → fallback de la SPA (`app.get('*', ...)`) → `errorMiddleware` (debe quedar al final). `server.js` crea el servidor HTTP, inicializa Socket.IO (`socket.js`) y prueba la conexión a la BD al arrancar.

## Sesiones (access token + refresh token, sesión única)

`common/services/session.service.js`, tabla `tbl_sessions` (`database/migrations/0007_create_sessions.sql`). Ver ADR-0001 y engineering/anti-patterns/SECURITY.md.

- **Login** (`loginController`): `auth.service.login` valida credenciales y devuelve `sessionUser`; el controller llama a `createSession`, que hace upsert por `use_id` (**un usuario = una sesión**: un login nuevo reemplaza la anterior y desconecta sus sockets) y fija dos cookies httpOnly: `token` (JWT de 15m con `sid`) y `refresh_token` (opaco, 7 días; en BD solo su SHA-256).
- **Cada petición** (`verifyToken`) y **cada handshake de Socket.IO** exigen, además de la firma, que la sesión `sid` siga viva en `tbl_sessions` y el usuario activo (`isSessionActive`). Un JWT sin `sid` se rechaza.
- **`POST /auth/refresh`** rota el refresh token y emite un access token nuevo. El cliente lo llama solo ante un 401 (`httpCliente.js`) o un handshake rechazado (`SocketProvider.jsx`).
- **Revocar** (`revokeSession`) borra la fila y desconecta la sala `session:<sid>`. Se usa en logout, al restaurar la contraseña y cuando un administrador desactiva, elimina o cambia la contraseña de un usuario. Cambiar la propia contraseña abre una sesión nueva (`createSession`). Cualquier flujo nuevo que invalide credenciales debe revocar la sesión.
- Si cambian `name`/`email` del usuario, hay que reemitir el access token con la misma `sid` (ver `updateAccountController`). `verifyToken` exige que el correo del token coincida con el de la BD.
- **Bloqueo de login por cuenta**: `tbl_login_attempts` (`0009_create_login_attempts.sql`). Cada 5 fallos consecutivos, bloqueo progresivo de 15m → 30m → … con tope de 24h. La lógica vive en `auth.service.js`.

## Seguridad: estándar obligatorio para endpoints nuevos

**Obligatorio, no opcional**: todo endpoint nuevo sigue el estándar completo en [`ENDPOINT_STANDARD.md`](../engineering/standards/ENDPOINT_STANDARD.md) (pipeline `verifyToken` → autorización sobre objetos ajenos → validación de esquema con `express-validator` → regla de negocio, más una lista de patrones prohibidos y una plantilla de código lista para copiar). Antes de agregar o revisar una ruta, leer ese archivo — esto de aquí es solo el resumen:

1. **`verifyToken`** en toda ruta que no sea explícitamente pública. El sujeto de la operación sale siempre de `req.user`, nunca de `req.query`/`req.body`.
2. **Autorización sobre objetos ajenos**: middleware `requirePermission(perId)` (`common/middlewares/requirePermission.middleware.js`), montado después de `verifyToken`. Resuelve el permiso **efectivo** en cada petición — unión de los permisos del perfil (`tbl_profile_permissions`, vía `req.user.proId`) y las excepciones individuales (`tbl_user_permissions`) — **no** confía en el nombre del perfil, solo en lo que esa unión otorga. **Sin ningún caso especial de código para ningún `useId`**, tampoco en el cliente (`authContext.jsx`): "Superadmin" es solo el perfil `pro_id=1`, al que el seed le otorga todos los permisos existentes — su acceso total sale de los mismos datos que el de cualquier otro perfil, no de un `if (useId === 1)`. Los `per_id` usados viven en `common/constants/permissions.constants.js`, única fuente de verdad (el cliente no tiene copia: lo lee con `get_catalog`). Acepta un `per_id` fijo o una función `(req) => per_id` para endpoints que sirven tanto crear como editar según el body (ver `save_profile`/`save_user`).
3. **Validación de esquema** con `express-validator` (`<módulo>.validation.js` + `common/middlewares/validate.middleware.js`). Hoy la tienen todos los módulos: ver `auth.validation.js` o `users.validation.js` para el patrón y `common/utils/validation.utils.js` para las reglas compartidas.
4. **Regla de negocio** (controller → service) — recién acá se toca la base de datos.
5. **Transacciones y concurrencia** (ADR-0027, aceptado, no negociable): toda transacción con `withTransaction` o `withLockedTransaction`, nunca `prisma.$transaction`. Toda operación sobre un registro existente lo bloquea antes de leer nada. El orden de bloqueo lo impone la utilidad. Detalle en "Transacciones y concurrencia" de `ENDPOINT_STANDARD.md` y en "Transacciones y bloqueos" más abajo.
6. **Listados paginados**: todo listado usa `paginate` de `common/utils/pagination.utils.js` (tope de 100 filas, sin opción para quitarlo), y responde `{ results, total, page, limit, totalPages }`. Detalle en "Listados paginados" de `ENDPOINT_STANDARD.md`.

El historial de incidentes que motiva cada regla está en [`engineering/anti-patterns/SECURITY.md`](../engineering/anti-patterns/SECURITY.md).

## Convenciones de base de datos

Las tablas de MySQL usan prefijos y columnas con prefijos cortos que coinciden con la tabla (p. ej. `tbl_users` → `use_*`, `tbl_profiles` → `pro_*`, `tbl_pages` → `pag_*`, `tbl_permissions` → `per_*`, `tbl_status` → `sta_*`). Las tablas de negocio llevan seis columnas de auditoría: `*_create_by`/`*_create_at`, `*_update_by`/`*_update_at` y `*_delete_by`/`*_delete_at`. Las `*_by` tienen FK a `tbl_users.use_id`. También llevan un FK `sta_id` a `tbl_status` para el estado, en lugar de borrados físicos. **Toda tabla nueva del dominio de negocio sigue ese estándar**: ver "Estándar de auditoría para tablas nuevas" en [`database/migrations/README.md`](../database/migrations/README.md).

### Transacciones y bloqueos (ADR-0027)

- **Nunca `prisma.$transaction` directo.** Usa `withTransaction` o `withLockedTransaction` de `common/services/transaction.service.js`. Ambas declaran `REPEATABLE READ` y fijan la espera de bloqueo en 3 s.
- **Operación sobre un registro existente** (editar, eliminar, asignar): `withLockedTransaction({ ENTIDAD: id }, async (tx, locked) => …)`. La utilidad bloquea con `SELECT … FOR UPDATE` **antes** de entregar el `tx`, en el orden de `LOCK_ORDER` y por id ascendente. No leas nada antes de ese punto, ni siquiera fuera de la transacción, si la decisión depende de ese dato: con `REPEATABLE READ`, una lectura previa deja una instantánea vieja.
- **Crear** (sin fila que bloquear) o una sola sentencia condicionada atómica: `withTransaction`.
- **Tabla nueva que sea raíz de un agregado** (contrato, factura, etc.): agrega su entrada a `LOCKABLE` en `transaction.service.js`. El orden ya está fijado en `LOCK_ORDER`: contrato → factura → póliza → concepto → documento → perfil → usuario.
- **Nada lento ni externo dentro de la transacción**: bcrypt, correos, sockets y subidas van antes o después del commit.
- **Errores:** espera agotada → `503`; interbloqueo → `409` (`error.middleware.js`). Ambos se reconocen con `common/utils/dbErrors.utils.js`, con las formas reales que entrega el adapter.
- **Reintento:** `{ idempotent: true }` (último argumento) reintenta el interbloqueo hasta 2 veces y lo registra en `logs/api.log`. Solo en operaciones que fijan un estado final; nunca en crear, sumar o encolar.
- **Idempotencia por clave** (DEC-016): crear, y en el futuro las transiciones de estado, exigen el encabezado `Idempotency-Key` (`idempotencyKeyRule`) y pasan por `runIdempotent` (`common/services/idempotency.service.js`). La clave y la huella del contenido viven en la propia fila (`<pre>_idempotency_key` `UNIQUE`, `<pre>_idempotency_hash`). Misma clave y mismo contenido → la misma respuesta; otro contenido u otro autor → `422`. La clave se busca **antes** que el control de duplicados.
- **Tests:** el mock de prisma debe incluir `...transactionRawMocks()` (`test/helpers/transaction.mock.js`), que simula el `SET` y el `FOR UPDATE`.

### Auditoría: autoría, eliminación y bitácora (ADR-0013)

- **Autor**: siempre del usuario de la sesión. El controller arma `ctx = auditContext(req)` (`{ useId: req.user.useId, ip }`) y lo pasa al service. Nunca se toma un `useBy`/`updatedBy` del body.
- **Eliminación**: lógica con `sta_id = 3`, que es lo único que decide la visibilidad. Además se pueblan `*_delete_by` y `*_delete_at`. No se vuelve a eliminar un registro ya eliminado. Reactivarlo (volver a un `sta_id` visible) limpia esas dos columnas.
- **Bitácora** (`tbl_audit_log`, `common/services/audit.service.js`): se escribe con `writeAudit(tx, { operationId, entity, recordId, operation, ctx, changes })` **siempre con el `tx` de la misma transacción** que la operación.
  - `diffFields(before, after, CAMPOS)` calcula qué cambió; cada service declara sus campos auditados (p. ej. `AUDITED_USER_FIELDS`).
  - Todas las filas de una operación comparten `operationId`.
  - Los campos de `SENSITIVE_FIELDS` se guardan como `[oculto]`.
  - Nunca se hace `UPDATE`/`DELETE` sobre la bitácora, y nunca con disparadores.
  - `writeAudit` lanza si recibe `prisma` en vez del `tx`, o una entidad u operación que no esté en las constantes. Los eventos sin cambio de datos (login fallido) van con `writeAuditEvent`, restringido a esos casos. En los tests, el mock de `$transaction` debe pasar una copia del mock (`fn({ ...prismaMock })`), no el mismo objeto.
  - Hoy la escriben usuarios, perfiles, permisos (`ASIGNAR`/`REVOCAR`) y los eventos de autenticación (`LOGIN`, `LOGIN_FALLIDO`, `CUENTA_BLOQUEADA`, `LOGOUT`, `SESION_REVOCADA`, cambio, solicitud y restauración de contraseña).
  - Los documentos son auditoría técnica: tienen columnas de autoría y eliminación, pero no escriben en la bitácora.
- **Eventos de login**: el actor es anónimo (`use_id` NULL) y el usuario afectado va en `aud_record_id`. Nunca se registra el identificador ni la contraseña tecleados.

- **`tbl_user_pages`** (`use_id` + `pag_id`, `database/migrations/0005_create_user_pages.sql`) respalda "Páginas autorizadas" en `UserDialog.jsx` — páginas puntuales asignadas a un usuario específico, distintas de las de su perfil (`tbl_page_permissions`). Reemplaza al viejo `tbl_users.use_pages` (CSV en columna, leído con `FIND_IN_SET`/parseado a mano — el mismo anti-patrón que tenía `tbl_profiles.pro_pages`, ya retirada). El contrato con el cliente no cambió: `UserDialog.jsx` sigue mandando/recibiendo un array de `pag_id` en `usePages`; `saveUser` (`users.service.js`) hace un diff (`deleteMany`/`createMany`) contra `tbl_user_pages`, igual que `saveProfile` con `tbl_page_permissions`. `getMenu`/`getUserPermissions` (`app/general/app.service.js`) leen de ahí, nunca del CSV — la columna `tbl_users.use_pages` se eliminó en `database/migrations/0006_drop_use_pages.sql` una vez migrados los datos y verificado en vivo.

## Estilo de código

El código del servidor es JavaScript ESM plano sin linter configurado; los controllers/services existentes en cada módulo siguen los patrones try/catch + `next(err)` (controllers) o acceso vía Prisma con errores lanzados con `.statusCode` (services) mostrados arriba — replícalos para mantener consistencia.
