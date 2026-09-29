# Estándar obligatorio para endpoints nuevos

Este documento no es una sugerencia: **todo endpoint nuevo en `server/` debe seguir este pipeline, en este orden, sin excepciones**. Si un caso concreto parece justificar saltarse un paso, la respuesta por defecto es que no lo justifica — discutirlo explícitamente antes de romper el patrón, no en silencio.

Motivación de cada regla (incidentes reales de este repo): ver [SECURITY.md](../anti-patterns/SECURITY.md). Versión resumida de este mismo estándar: sección "Seguridad: estándar obligatorio para endpoints nuevos" en [server/CLAUDE.md](../../server/CLAUDE.md).

## El pipeline (4 pasos, siempre en este orden)

```
router.<método>("/ruta", verifyToken, requirePermission(...), schema, validate, controller);
                          └──── 1 ────┘ └──────── 2 ────────┘ └── 3 ──┘         └── 4 ──┘
```

### 1. `verifyToken` — OBLIGATORIO salvo que la ruta sea explícitamente pública

- Middleware: `common/middlewares/authjwt.middleware.js`.
- Es pública **solo** si no expone datos de un usuario ni ejecuta una acción con efecto sobre datos (ejemplos reales: `login`, `forgot_password`, `validate_code_password`, `restore_password`). Todo lo demás lleva `verifyToken`.
- Dentro del controller/service, **el sujeto de la operación sale siempre de `req.user`** (el payload del JWT ya verificado), nunca de `req.query`/`req.body`. Un `useId`/`id`/etc. que llegue en la petición se ignora para determinar "sobre quién" se actúa, salvo el caso del punto 2.
- Incidente real que motiva esto: IDOR en `get_basic_information`/`update_account`/`update_password` (ver SECURITY.md).

### 2. Autorización sobre objetos ajenos — OBLIGATORIO cuando la ruta opera sobre datos de OTRO usuario/objeto

- Si el endpoint es de autoservicio ("mi cuenta", "mis notificaciones"), este paso no aplica — el objeto siempre es el propio `req.user`, y el paso 1 ya lo cubre. **Ojo**: que un endpoint sea "de autoservicio" es una afirmación sobre la implementación, no sobre el nombre de la ruta — si el sujeto (`userId`, `useId`, etc.) sale de `req.query`/`req.body` en vez de `req.user`, no es autoservicio real, es un IDOR (ver el caso de `notifications.routes.js`/`app.routes.js` en SECURITY.md).
- Si el endpoint permite operar sobre un objeto distinto del propio usuario (ej. un admin creando/editando/eliminando otro usuario o perfil, o asignando permisos), montar `requirePermission(perId)` (`common/middlewares/requirePermission.middleware.js`) justo después de `verifyToken`. No basta con estar autenticado.
- **Esto también aplica a rutas de solo lectura**, no solo a las que escriben: listar usuarios/perfiles ajenos, ver documentos/plantillas de cualquiera, o consultar los permisos asignados a otro perfil/usuario son igual de "operar sobre un objeto ajeno" que crearlo o borrarlo. Una ruta de negocio sin `requirePermission` explícito no se asume pública por omisión — se asume un defecto hasta que se decida y declare lo contrario. Ver la auditoría completa de los 10 archivos de rutas en SECURITY.md (sección "Falta de autorización granular").
- Los permisos de **lectura** (`view`) y los de **gestión** (`create`/`edit`/`delete`/`assignPermission`/`manage`) son conceptualmente distintos y se siembran distinto en `server/prisma/seed.js`: gestión solo va a Superadmin (acción sensible, restringida a propósito); ver se otorga a todos los perfiles y usuarios existentes (bajo riesgo, y restringirlo rompería el acceso de cualquier cuenta real que hoy puede ver esos listados sin problema). Al agregar un permiso nuevo, decidir explícitamente a cuál categoría pertenece.
- `requirePermission` resuelve el permiso **efectivo** en cada petición: la unión de los permisos del perfil del usuario (`tbl_profile_permissions`, vía `req.user.proId`) y sus excepciones individuales (`tbl_user_permissions`) — ver `common/services/effectivePermissions.service.js`. No copia nada al crear el usuario: un cambio a los permisos de un perfil se propaga de inmediato a todos sus usuarios, sin re-loguearse. **Sin ningún caso especial de código para ningún `useId`** (tampoco en el cliente, `authContext.jsx`): "Superadmin" es solo el perfil `pro_id=1`, al que `server/prisma/seed.js` le otorga todos los permisos que existen. Al agregar un permiso nuevo, hay que otorgárselo también ahí — de lo contrario Superadmin queda bloqueado en esa acción, igual que cualquier otro perfil sin ese permiso asignado.
- Acepta un `per_id` fijo (`requirePermission(PERMISSIONS.security.users.delete)`) o una función `(req) => per_id` cuando el mismo endpoint sirve tanto crear como editar según el body (ver `save_profile`/`save_user`, que resuelven `create` vs `edit` mirando si `proId`/`useId` viene en 0 o mayor que 0).
- Los `per_id` usados viven en `common/constants/permissions.constants.js`, **única fuente de verdad**: el cliente no tiene copia, lee el catálogo en runtime con `GET /security/permissions/get_catalog`. Un permiso nuevo se agrega en ese archivo, en `database/migrations/000N_....sql` (ver su convención) y en `server/prisma/seed.js`.
- Un permiso no necesita colgar de una página real del sidebar: si el endpoint no tiene un ítem propio en `tbl_pages` (ver `PERMISSIONS.documents.manage`/`per_id=9` y `PERMISSIONS.templates.manage`/`per_id=10`, sin `pag_id`), el permiso se crea igual con `pag_id: null`.

### 3. Validación de esquema — OBLIGATORIO en todo endpoint que reciba `body`, `query` o `params`

- Un archivo `<módulo>.validation.js` junto a las rutas del módulo, exportando un array de reglas de `express-validator` por endpoint.
- Middleware final compartido: `common/middlewares/validate.middleware.js` (`validate`) — corta con `400` si `validationResult` tiene errores, antes de llegar al controller.
- Referencia viva: `server/src/modules/auth/auth.validation.js` + su montaje en `auth.routes.js`.
- Mínimo exigible por tipo de campo:
  - Strings requeridos: `.trim().notEmpty()`.
  - Emails: `.isEmail()`.
  - Números que hoy se parsean a mano (`parseInt`, `Number(...)`): `.isInt()`/`.isFloat()` en el schema, no confiar en la coerción implícita.
  - Contraseñas nuevas: `.isLength({ min: 8 })` como mínimo (alineado con la validación que ya existe en los formularios del cliente).

### 4. Regla de negocio — el controller llama al service, nunca al revés

**Autoconcesión**: si un endpoint permite que alguien con un permiso de "asignar" opere sobre el sujeto/objeto que representa a sí mismo (ej. asignarse permisos a sí mismo, o a su propio perfil), rechazarlo explícitamente con 403 — tener el permiso de asignar no implica que se pueda usar sobre uno mismo. Sin excepción para ningún perfil (Superadmin incluido: no hay ningún caso especial de código que lo exima de ninguna regla, ver el punto anterior). Ver `updateUserPermissions`/`updateProfilePermissions` en `security/permissions/permissions.service.js` como referencia — el solicitante siempre sale de `req.user` (pasado por el controller), nunca del body.


- El controller solo parsea `req`, llama al service, y delega errores con `next(err)` — nunca responde el error directamente ni mete lógica de negocio.
- El service lanza `new Error(msg)` con `.statusCode` (o `.status`) — nunca devuelve un objeto de error como valor de retorno exitoso.
- Acceso a datos: Prisma (`common/configs/prismaClient.js`), la única capa de datos de los services. Toda escritura de varias sentencias va en una transacción de la utilidad: ver la sección siguiente.

## Transacciones y concurrencia — OBLIGATORIO en todo service que escriba

Estándar de [ADR-0027](../adr/0027-integridad-transaccional.md), **aceptado y no negociable**. No es una recomendación de rendimiento: sin estas reglas, dos peticiones simultáneas pueden validar sobre el mismo dato y dejar la base inconsistente (sobregiros, registros huérfanos, auditoría con valores falsos).

1. **Utilidad única.** Toda transacción se abre con `withTransaction` o `withLockedTransaction` de `common/services/transaction.service.js`. Ambas declaran `REPEATABLE READ` y limitan la espera de bloqueo a 3 s. `prisma.$transaction` directo está prohibido.
2. **Operación sobre un registro existente** (editar, eliminar, aprobar, anular, asignar): `withLockedTransaction({ ENTIDAD: id }, async (tx, locked) => …)`. La utilidad bloquea con `SELECT … FOR UPDATE` como **primera sentencia**, antes de entregar el `tx`.
3. **Nada se lee antes del bloqueo** si la decisión depende de ese dato: ni dentro de la transacción ni fuera de ella. Con `REPEATABLE READ`, una lectura previa fija una instantánea vieja y el bloqueo posterior ya no protege.
4. **Orden fijo**: contrato → factura → póliza → concepto → documento → perfil → usuario → maestros ([DEC-019](../decisiones/DEC-019-maestros-orden-bloqueo.md)), y por id ascendente dentro de cada entidad. No lo aplicas tú: declaras todas las entidades en el mismo `withLockedTransaction` y la utilidad las ordena. Nunca encadenes dos transacciones para bloquear en dos pasos.
5. **Crear** (no hay fila que bloquear) o una sola sentencia condicionada atómica: `withTransaction`. Si la creación cuelga de un padre (una factura de un contrato), se bloquea el padre: `withLockedTransaction({ CONTRATO: contratoId }, …)`.
6. **Tabla nueva que sea raíz de un agregado**: regístrala en `LOCKABLE` de `transaction.service.js`. Su posición ya está en `LOCK_ORDER`; si es una entidad nueva, agrégala en su posición y actualiza el ADR-0027.
7. **Transacción corta y sin nada externo**: bcrypt, correos, sockets, subidas y llamadas HTTP van antes o después del commit, nunca con el bloqueo tomado.
8. **Errores y reintento**: la espera agotada responde `503` y el interbloqueo `409` (`error.middleware.js`). No los captures para convertirlos en otra cosa. Si la operación **fija un estado final** (repetirla completa deja el mismo resultado), pasa `{ idempotent: true }` como último argumento y la utilidad reintenta el interbloqueo hasta 2 veces. **Nunca** lo declares en una operación que crea, suma o encola, mientras no tenga clave de idempotencia.
9. **Idempotencia en creación y transición** ([DEC-016](../decisiones/DEC-016-idempotencia-por-clave.md)): todo endpoint que **crea** un registro, o que ejecuta una **transición de estado**, exige el encabezado `Idempotency-Key` con `idempotencyKeyRule(isCreate)` en su esquema. El controller lo lee con `req.get(IDEMPOTENCY_HEADER)`, nunca del body. El service envuelve la operación en `runIdempotent({ target, key, ownerId, payload, execute })` y **busca la clave antes que cualquier validación de duplicados**. La fila creada (o la del historial de estado) guarda `...idempotencyData`. En el cliente, la clave se genera al abrir el formulario con `newIdempotencyKey()` y se reutiliza en cada intento de ese formulario.

## Listados paginados — OBLIGATORIO en todo endpoint que devuelva una lista

1. **Helper único**: `paginate(model, queryArgs, pagination)` de `common/utils/pagination.utils.js`. No se calculan `skip`/`take` a mano, ni se escribe otro `findMany` + `count` por separado.
2. **Entrada**: `{ first, rows }` (tablas con paginator) o `{ page, limit }` (página desde 1), validados con `paginationRules()` de `validation.utils.js` o con reglas equivalentes para `page`/`limit`.
3. **Tope**: el tamaño queda siempre entre 1 y `MAX_ROWS` (100). **Ningún listado devuelve la tabla completa**, ni con un parámetro del cliente del tipo `paginate: false` o `all: true`.
   - **Única excepción: el selector de un maestro** ([DEC-018](../decisiones/DEC-018-selector-maestros.md)). Devuelve solo activos, sin paginar, con `take: MAX_ROWS` fijo en el service, y lleva solo `verifyToken`, declarado en un comentario de la ruta.
4. **Respuesta**: `{ results, total, page, limit, totalPages }`. El service mapea `results` a su DTO y conserva el resto: `return { ...page, results: page.results.map(toDto) }`.
5. **Orden**: `orderBy` sale siempre de una lista blanca del service (`*_SORT_FIELDS`), nunca directo del `sortField` del cliente.
5.1 **Autor por nombre**: si el listado muestra quién creó o modificó el registro, el service lo resuelve con la relación (`updated_by_user: USER_NAME_SELECT`) y devuelve `updatedByName` con `userFullName` (`common/utils/user.utils.js`). El cliente nunca muestra un id de usuario crudo; la celda estándar es `ui-component/extended/LastModifiedCell`.
6. Es solo lectura: **no va dentro de `withTransaction`**. Si alguna vez hace falta paginar dentro de una transacción, se pasa `tx.tbl_x` como `model`.

```js
import { paginate } from "../../common/utils/pagination.utils.js";

export const paginationX = async ({ nombre, rows, first, sortField, sortOrder }) => {
  const orderBy = (X_SORT_FIELDS[sortField] ?? X_SORT_FIELDS.name)(sortOrder === 1 ? "asc" : "desc");
  const where = { sta_id: { not: 3 }, ...(nombre ? { x_name: { contains: nombre } } : {}) };

  const page = await paginate(prisma.tbl_x, { where, select: X_SELECT, orderBy }, { first, rows });
  return { ...page, results: page.results.map(toDto) };
};
```

## Prohibido, sin excepción

- Un listado sin tope de filas, o con un parámetro del cliente que lo quite. Todo listado pasa por `paginate`.

- Llamar a `prisma.$transaction` desde un service, o escribir con `prisma` (el cliente global) dentro de una operación que ya abrió un `tx`.
- Acceder a la BD por otra vía que no sea Prisma (`mysql2`, un pool propio, `executeQuery`). El pool de mysql2 se eliminó porque `executeQuery` tomaba una conexión nueva si se omitía el parámetro, y la escritura escapaba de la transacción. `test/common/services/transaction.service.test.js` falla si se reintroduce.
- Leer un registro y **después** bloquearlo, o bloquear en una transacción aparte. El bloqueo va primero, con `withLockedTransaction`.

- Devolver un JWT, token de reset, o cualquier secreto en el **body** de una respuesta HTTP. La sesión viaja únicamente en la cookie `token` (httpOnly).
- Loguear (`console.*` o el logger de Winston) el `req.body` completo de una ruta que reciba contraseñas/tokens/códigos, ni siquiera en la rama de error.
- Devolver el `stack` de un error al cliente en producción. `error.middleware.js` solo lo incluye cuando `NODE_ENV !== "production"`; ningún endpoint debe armar su propia respuesta de error.
- Aceptar un identificador de sujeto (`useId`, etc.) del cliente para determinar sobre quién actúa una operación de autoservicio.
- Enviar desde el cliente el autor o la identidad del usuario de la sesión (`useBy`, `updatedBy`, `createdBy`, `docCreateBy`, `usuAct`, `userId`, `idu`, un encabezado como el antiguo `currenuserapp`), en escrituras o lecturas. El backend lo toma de `req.user` y lo ignoraría, pero enviarlo hace parecer que el cliente lo decide. Solo viaja el id del registro **objetivo** (el usuario o perfil que se edita), nunca el de quien hace la petición.
- Endpoints que revelan la existencia de un recurso (¿existe esta cuenta/correo/documento?) con una respuesta (status, body o tiempo) distinta según el resultado — deben responder igual en ambos casos. Ver `forgotPassword` en `auth.service.js` como referencia (piso de duración fija + envío desacoplado de la respuesta).
- Montar una ruta de socket o WebSocket que confíe en un identificador de usuario mandado por el cliente sin verificar el JWT del handshake (ver `authenticateHandshake` en `socket.js`).
- Interpolar en una consulta SQL un **nombre de columna o tabla** que venga de la petición (`` `UPDATE t SET ${field} = ?` ``) — a diferencia de un valor, un nombre de columna no se puede parametrizar con `?`, así que sin un allow-list explícito es escritura arbitraria de columnas (privilege escalation: cualquiera con permiso de editar podría pisar `pro_id`, `sta_id`, etc.) y una forma de SQL injection. Era exactamente el patrón de `ProfileMode` en `saveUser`, retirado por esto (ver SECURITY.md).
- Interpolar en una consulta SQL un **valor de un `IN (...)` armado a partir de un CSV en columna o de la petición** (`` `WHERE id IN(${csv})` ``) sin parametrizar — mismo problema que el punto anterior pero con valores en vez de nombres de columna: si el CSV puede contener algo que no sean ids separados por coma, es SQL injection. Parsear a una lista de enteros válidos y armar `IN (?, ?, ...)` con esos valores como parámetros reales. Ver el fix de `getMenu`/`tbl_users.use_pages` en SECURITY.md.

## Plantilla para copiar (endpoint nuevo desde cero)

Ejemplo: un endpoint de autoservicio autenticado, `PUT /api/<módulo>/algo`.

**`<módulo>.validation.js`**
```js
import { body } from "express-validator";

export const algoSchema = [
  body("campo").trim().notEmpty().withMessage("campo es requerido."),
];
```

**`<módulo>.routes.js`**
```js
import express from "express";
import { verifyToken } from "../../common/middlewares/authjwt.middleware.js";
import { validate } from "../../common/middlewares/validate.middleware.js";
import { algoSchema } from "./<módulo>.validation.js";
import { algoController } from "./<módulo>.controller.js";

const routes = express.Router();

routes.put("/algo", verifyToken, algoSchema, validate, algoController);

export default routes;
```

**`<módulo>.controller.js`**
```js
export const algoController = async (req, res, next) => {
  try {
    const { campo } = req.body;
    const { useId } = req.user; // sujeto siempre desde el JWT verificado
    const result = await service.algo({ campo, useId });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
```

**`<módulo>.service.js`**
```js
import { withLockedTransaction } from "../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, writeAudit } from "../../common/services/audit.service.js";

const AUDITED_FIELDS = ["x_campo"];

export const algo = async ({ xId, campo, ctx }) =>
  // 1.º bloquea la fila (primera sentencia), 2.º lee, 3.º escribe y audita,
  // todo en el mismo tx.
  withLockedTransaction({ ENTIDAD_X: xId }, async (tx) => {
    const before = await tx.tbl_x.findUnique({ where: { x_id: Number(xId) }, select: { x_campo: true } });
    if (!before) {
      const error = new Error("No se encontró el registro.");
      error.statusCode = 404;
      throw error;
    }

    const data = { x_campo: campo, x_update_by: ctx.useId };
    await tx.tbl_x.update({ where: { x_id: Number(xId) }, data });

    await writeAudit(tx, {
      entity: AUDIT_ENTITIES.X,
      recordId: xId,
      operation: AUDIT_OPERATIONS.UPDATE,
      ctx,
      changes: diffFields(before, data, AUDITED_FIELDS),
    });
  });
```
`ENTIDAD_X` debe estar en `LOCK_ORDER` y registrada en `LOCKABLE` (regla 6 de "Transacciones y concurrencia"). Si no lo está, la utilidad lanza un error antes de abrir la transacción.

No hace falta recordar montar `routes` en `main.routes.js` — sigue siendo el último paso manual, igual que siempre.

Si el endpoint opera sobre OTRO usuario/objeto (paso 2), agregar `requirePermission` a la cadena de la ruta:
```js
import { requirePermission } from "../../common/middlewares/requirePermission.middleware.js";
import { PERMISSIONS } from "../../common/constants/permissions.constants.js";

routes.put("/algo", verifyToken, requirePermission(PERMISSIONS.<módulo>.<acción>), algoSchema, validate, algoController);

// o, si el mismo endpoint sirve crear y editar según el body:
routes.post(
  "/algo",
  verifyToken,
  requirePermission((req) => (req.body.id > 0 ? PERMISSIONS.<módulo>.edit : PERMISSIONS.<módulo>.create)),
  algoSchema,
  validate,
  algoController
);
```

## Checklist antes de dar por terminado un endpoint nuevo

- [ ] ¿Es pública a propósito, o lleva `verifyToken`?
- [ ] Si opera sobre otro usuario/objeto, ¿lleva `requirePermission(...)` con el `per_id` correcto (definido en `permissions.constants.js`, la migración y el seed)?
- [ ] Si es un `per_id` nuevo, ¿ya se le otorgó al perfil Superadmin en `server/prisma/seed.js`? No hay bypass de código que lo cubra — sin este paso, Superadmin queda bloqueado en esa acción igual que cualquier otro perfil sin el permiso asignado.
- [ ] ¿El sujeto de la operación sale de `req.user`, nunca de `req.query`/`req.body`?
- [ ] ¿Tiene un `<módulo>.validation.js` con reglas para cada campo de `body`/`query`/`params`, montado con `validate`?
- [ ] ¿El controller delega errores con `next(err)` y el service lanza `Error` con `.statusCode`?
- [ ] Si el endpoint revela existencia de un recurso, ¿la respuesta es idéntica (status/body/tiempo) en ambos casos?
- [ ] ¿Ningún log ni respuesta expone contraseñas, tokens, o el `req.body` crudo de una ruta sensible?
- [ ] Si escribe datos: ¿`*_create_by` / `*_update_by` / `*_delete_by` salen de `auditContext(req)` (nunca del body)? Si elimina, ¿es lógica (`sta_id = 3`) y pobla `*_delete_by` / `*_delete_at`?
- [ ] Si toca información de auditoría funcional (ADR-0013, decisión 9) o asigna/revoca algo: ¿escribe en la bitácora con `writeAudit(tx, …)` **dentro de la misma transacción**, con los campos auditados declarados explícitamente y sin valores sensibles?
- [ ] Si devuelve una lista: ¿usa `paginate` (tope de 100 filas, sin opción para quitarlo), con `orderBy` desde una lista blanca y respuesta `{ results, total, page, limit, totalPages }`?
- [ ] ¿Toda transacción usa `withTransaction` o `withLockedTransaction` (ADR-0027), y ninguna usa `prisma.$transaction` directo?
- [ ] Si opera sobre un registro existente, ¿lo bloquea con `withLockedTransaction` **antes de leer nada** de lo que depende la decisión, ni siquiera fuera de la transacción?
- [ ] Si bloquea varias entidades, ¿las declara todas en un mismo `withLockedTransaction` (la utilidad aplica el orden), sin encadenar transacciones?
- [ ] Si crea una tabla raíz de agregado, ¿la registró en `LOCKABLE`?
- [ ] ¿Nada lento ni externo (bcrypt, correo, socket, subida) ocurre con el bloqueo tomado?
- [ ] Si crea un registro o ejecuta una transición: ¿exige `Idempotency-Key`, usa `runIdempotent` antes de validar duplicados, y su tabla tiene `<pre>_idempotency_key` (`UNIQUE`) y `<pre>_idempotency_hash`?
- [ ] Probado en vivo contra la BD real (no solo revisión de código): caso válido, caso inválido, y — si aplica — el intento de "atacarlo" (spoofear un id ajeno, mandar datos de otro esquema, etc.).
- [ ] Tiene tests unitarios (`<archivo>.test.js`, con mocks de Prisma — ver "Tests unitarios" en `CLAUDE.md`) para al menos: caso feliz, caso de error de negocio, y el caso de seguridad relevante (p. ej. "ignora el id ajeno del body").
