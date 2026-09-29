# Patrón: CRUD complejo

**Cuándo:** nivel 2. Todo lo de [`SIMPLE_CRUD`](SIMPLE_CRUD.md) más una o varias de estas piezas. Cada una tiene su referencia real.

## Colección hija sincronizada por diferencia

El cliente manda la lista completa deseada; el service calcula qué agregar y qué quitar **contra lo que hay en la BD**, nunca contra una "lista anterior" que mande el cliente.

Referencia: páginas de un perfil en `saveProfile` (`profiles.service.js`), páginas puntuales de un usuario en `saveUser`.

```js
const current = (await tx.tbl_page_permissions.findMany({ where: { pro_id }, select: { pag_id: true } }))
  .map((p) => p.pag_id);
const toDelete = _.difference(current, modules);
const toInsert = _.difference(modules, current);
if (toDelete.length) await tx.tbl_page_permissions.deleteMany({ where: { pro_id, pag_id: { in: toDelete } } });
if (toInsert.length) await tx.tbl_page_permissions.createMany({ data: toInsert.map((pag_id) => ({ pro_id, pag_id })) });
```

Todo dentro de la misma transacción que el padre, con el padre bloqueado. Si la relación es una decisión que se audita (asignar o revocar), cada cambio va a la bitácora (`ASIGNAR` / `REVOCAR`).

## Eliminación bloqueada por uso

Un registro referenciado por otros registros activos no se elimina: responde 400 con un mensaje que dice **por qué y qué hacer**.

Referencia: `deleteProfile` rechaza si hay usuarios activos con ese perfil.

```js
return withLockedTransaction({ PERFIL: proId }, async (tx) => {
  const dependents = await tx.tbl_users.count({ where: { pro_id: Number(proId), sta_id: { not: 3 } } });
  if (dependents > 0) throw httpError(400, `No se puede eliminar: tiene ${dependents} usuario(s) activo(s). Reasígnalos primero.`);
  …
});
```

La carrera se cierra con el bloqueo: la operación que **asigna** la referencia también bloquea el registro referenciado (`saveUser` bloquea el perfil que asigna). Si solo lo lee, puede asignarlo mientras otra petición lo elimina. Los maestros van al final de `LOCK_ORDER` ([DEC-019](../decisiones/DEC-019-maestros-orden-bloqueo.md)): `saveUser` bloquea perfil → usuario → tipo de identificación.

## Dependientes que se limpian al eliminar

Si eliminar el padre deja filas huérfanas que podrían "resucitar" al reactivarlo, se borran en la misma transacción, y lo borrado queda en la bitácora como evidencia. Referencia: `deleteProfile` limpia `tbl_page_permissions` y `tbl_profile_permissions`.

## Validar una referencia bajo bloqueo

Al asignar una referencia (el perfil de un usuario), se bloquea el referenciado y se verifica que no esté eliminado. Referencia: `saveUser`, que bloquea perfil → usuario en un solo `withLockedTransaction`.

## Auditoría funcional

Con `writeAudit(tx, { operationId, entity, recordId, operation, ctx, changes })` y `diffFields(before, data, CAMPOS)`, declarando explícitamente los campos auditados. Referencia: `saveProfile`, `saveUser`. Qué módulos la exigen: ADR-0013, decisión 9.

## Relación sin FK real en la BD

Segunda consulta y un `Map` en JS, sin declarar la relación en `schema.prisma`. Referencia: `getProfileWindows` (`permissions.service.js`), `enrichDocs` (`document.service.js`).

## Varias acciones sobre la misma fila en el cliente

Acciones adicionales en el menú de la fila (p. ej. "Permisos" en perfiles), cada una con su permiso (`canAssignPermission`) y su propio componente (`PermissionsDrawer`). No se mete todo en el diálogo de edición.
