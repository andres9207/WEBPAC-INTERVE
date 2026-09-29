# Patrón: CRUD simple

**Cuándo:** nivel 1, un catálogo sin hijos ni ciclo de vida (aseguradoras, constructoras, tipos). Reglas en [`CRUD_STANDARD`](../standards/CRUD_STANDARD.md).

**Referencia real:** `server/src/modules/security/profiles/` y `client/src/views/security/profiles/`, sin la parte de páginas asignadas.

Los nombres `tbl_x`, `x_` y `ENTIDAD_X` son marcadores: para un maestro real se toman de [DEC-017](../decisiones/DEC-017-area-idioma-maestros.md). El área de los maestros es `admin`. La entidad de bloqueo va al final de `LOCK_ORDER` ([DEC-019](../decisiones/DEC-019-maestros-orden-bloqueo.md)).

## Un maestro: se declara ([DEC-020](../decisiones/DEC-020-patron-maestro.md))

Los maestros no se escriben con el esqueleto de abajo: se declaran. Referencia: `server/src/modules/admin/identityDocuments/`.

```js
// modules/admin/x/x.service.js
export const xConfig = defineMaster({
  model: "tbl_x", prefix: "x", idField: "xId", lockEntity: "ENTIDAD_X",
  label: "aseguradora", feminine: true,
  routes: { entity: "x", plural: "xs" },                 // save_x, pagination_xs…
  permissions: PERMISSIONS.admin.x,                       // view, create, edit, delete, changeStatus
  fields: [
    { name: "name", column: "x_name", label: "nombre", maxLength: 100, unique: true, filter: true, sortable: true },
  ],
  dependents: [{ model: "tbl_policies", column: "x_id", label: "póliza(s)" }],
  socketEvent: "refresh-xs",
  // audit: { entity: AUDIT_ENTITIES.X },                  // solo si ADR-0013 exige bitácora funcional
});
export const xService = createMasterService(xConfig);

// modules/admin/x/x.routes.js
export default createMasterRouter(xConfig, xService);
```

Opciones de un campo: `required` (por defecto sí), `maxLength`, `feminine` ("esa descripción" en los mensajes), `pattern: { regex, message }`, `uppercase`, `editable` (por defecto sí), `unique`, `filter`, `sortable`. Tests: solo lo propio de la config, como en `test/modules/admin/identityDocuments/`. El comportamiento común ya está probado en `test/common/`.

Cliente ([DEC-022](../decisiones/DEC-022-vista-maestro.md)):

```jsx
// api/requests/xApi.js
export const xApi = createMasterApi('admin/x', { entity: 'x', plural: 'xs' });

// views/admin/x/XPage.jsx
export default function XPage() {
  const { permissionsCatalog } = useAuth();
  return (
    <MasterPage
      title="Aseguradora" idField="xId" api={xApi}
      permissions={permissionsCatalog.admin?.x}
      columns={[{ id: 'name', label: 'Nombre', sortable: true }]}
      filters={[{ key: 'name', label: 'Nombre' }]}
      formFields={[{ name: 'name', type: 'text', label: 'Nombre', required: true, validation: { required: 'El nombre es requerido' } }]}
      defaultSort="name" rowLabel={(row) => row.name}
    />
  );
}
```

Las constantes (`columns`, `filters`, `formFields`, `rowLabel`) van fuera del componente, como en `IdentityDocumentPage.jsx`, para no recrearlas en cada render.

## Un CRUD simple que no es maestro: esqueleto

## `x.validation.js`

```js
import { body } from "express-validator";
import {
  paginationRules, optionalText, optionalId, requiredId, idempotencyKeyRule,
} from "../../../common/utils/validation.utils.js";

export const paginationXSchema = [...paginationRules(), optionalText("name"), optionalId("staId")];

export const saveXSchema = [
  idempotencyKeyRule((req) => !(Number(req.body.xId) > 0)), // obligatoria solo al crear
  body("xId").optional({ values: "falsy" }).isInt({ min: 0 }),
  body("name").trim().notEmpty().withMessage("El nombre es requerido.").isLength({ max: 255 }),
  requiredId("staId"),
];

export const deleteXSchema = [requiredId("xId")];
```

## `x.routes.js`

```js
xRoutes.post("/pagination_x", verifyToken, requirePermission(PERMISSIONS.admin.x.view),
  paginationXSchema, validate, paginationXController);

xRoutes.post("/save_x", verifyToken,
  requirePermission((req) => (req.body.xId > 0 ? PERMISSIONS.admin.x.edit : PERMISSIONS.admin.x.create)),
  saveXSchema, validate, saveXController);

xRoutes.put("/delete_x", verifyToken, requirePermission(PERMISSIONS.admin.x.delete),
  deleteXSchema, validate, deleteXController);
```

## `x.controller.js`

```js
export const saveXController = async (req, res, next) => {
  try {
    const { xId, name, staId } = req.body;
    const result = await xService.saveX({
      xId, name, staId,
      useBy: req.user.useId,                       // autor: siempre de la sesión
      ctx: auditContext(req),
      idempotencyKey: req.get(IDEMPOTENCY_HEADER), // nunca del body
    });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
```

## `x.service.js`

```js
const DELETED_STATUS = 3;

const X_SORT_FIELDS = {
  name: (order) => ({ x_name: order }),
  updatedAt: (order) => ({ x_update_at: order }),
};

export const paginationX = async ({ name, staId, rows, first, sortField, sortOrder }) => {
  const orderBy = (X_SORT_FIELDS[sortField] ?? X_SORT_FIELDS.name)(sortOrder === 1 ? "asc" : "desc");
  const where = {
    sta_id: { not: DELETED_STATUS },
    ...(name ? { x_name: { contains: name } } : {}),
    ...(staId ? { sta_id: Number(staId) } : {}),
  };
  const page = await paginate(prisma.tbl_x, {
    where,
    select: { x_id: true, x_name: true, sta_id: true, x_update_at: true,
              tbl_status: { select: { sta_name: true } }, updated_by_user: USER_NAME_SELECT },
    orderBy,
  }, { first, rows });

  return {
    ...page,
    results: page.results.map((r) => ({
      xId: r.x_id, name: r.x_name, staId: r.sta_id, statusName: r.tbl_status?.sta_name ?? null,
      updatedAt: r.x_update_at, updatedByName: userFullName(r.updated_by_user),
    })),
  };
};

const X_CREATE_IDEMPOTENCY = {
  model: prisma.tbl_x,
  keyField: "x_idempotency_key",
  hashField: "x_idempotency_hash",
  ownerField: "x_create_by",
  select: { x_id: true, x_name: true },
  toResult: (x) => ({ message: `${x.x_name} creado correctamente`, xId: x.x_id }),
};

export const saveX = (args) =>
  args.xId > 0
    ? persistX(args)
    : runIdempotent({                   // la clave se busca ANTES que el duplicado
        target: X_CREATE_IDEMPOTENCY,
        key: args.idempotencyKey,
        ownerId: args.useBy,
        payload: { name: args.name, staId: args.staId },
        execute: (idempotencyData) => persistX({ ...args, idempotencyData }),
      });

const persistX = ({ xId, name, staId, useBy, idempotencyData = {} }) => {
  // Editar bloquea antes de leer y es reintentable; crear no tiene fila que bloquear.
  const run = xId > 0
    ? (fn) => withLockedTransaction({ ENTIDAD_X: xId }, fn, { idempotent: true })
    : withTransaction;

  return run(async (tx) => {
    const duplicate = await tx.tbl_x.findFirst({
      where: { x_name: name, sta_id: { not: DELETED_STATUS }, ...(xId > 0 ? { x_id: { not: Number(xId) } } : {}) },
      select: { x_id: true },
    });
    if (duplicate) throw httpError(400, "Ya existe un registro con ese nombre."); // código: PD-02

    if (xId > 0) {
      const before = await tx.tbl_x.findUnique({ where: { x_id: Number(xId) }, select: { sta_id: true } });
      if (!before) throw httpError(404, "No se encontró el registro.");
      const reactivated = before.sta_id === DELETED_STATUS && Number(staId) !== DELETED_STATUS;
      await tx.tbl_x.update({
        where: { x_id: Number(xId) },
        data: { x_name: name, sta_id: Number(staId), x_update_by: Number(useBy),
                ...(reactivated ? { x_delete_by: null, x_delete_at: null } : {}) },
      });
      return { message: `${name} modificado correctamente` };
    }

    const created = await tx.tbl_x.create({
      data: { x_name: name, sta_id: Number(staId), x_create_by: Number(useBy),
              x_update_by: Number(useBy), ...idempotencyData },
    });
    return { message: `${name} creado correctamente`, xId: created.x_id };
  });
};

export const deleteX = ({ xId, useBy }) =>
  withLockedTransaction({ ENTIDAD_X: xId }, async (tx) => {
    const before = await tx.tbl_x.findUnique({ where: { x_id: Number(xId) }, select: { sta_id: true } });
    if (!before || before.sta_id === DELETED_STATUS) throw httpError(404, "El registro no existe."); // DEC-006

    // Si el ADR prohíbe eliminar en uso, contar aquí las referencias activas (ver COMPLEX_CRUD).

    await tx.tbl_x.update({
      where: { x_id: Number(xId) },
      data: { sta_id: DELETED_STATUS, x_update_by: Number(useBy),
              x_delete_by: Number(useBy), x_delete_at: new Date() },
    });
    return { message: "Registro eliminado correctamente" };
  });
```

`httpError(status, msg)` abrevia aquí `Object.assign(new Error(msg), { statusCode: status })`; el código actual escribe las tres líneas a mano. Si un maestro exige auditoría funcional (tipos de contrato, tipos de póliza), se agrega `writeAudit(tx, …)` en cada rama, como en `profiles.service.js`.

## Cliente

- `api/requests/xApi.js`: como `profilesApi.js`, con `saveXAPI(params, idempotencyKey)` → `httpCliente.post('admin/x/save_x', params, idempotencyConfig(idempotencyKey))`.
- `views/admin/x/components/XDialog.jsx`: `ProfileDialog.jsx` sin la lista de transferencia de páginas.
- `views/admin/x/XPage.jsx`: `ProfilePage.jsx` sin el `PermissionsDrawer`.
- Ruta en `routes/MainRoutes.jsx`; página y permisos en migración + seed.
