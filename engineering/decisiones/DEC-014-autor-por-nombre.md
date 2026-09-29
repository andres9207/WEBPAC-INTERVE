# DEC-014 — Los listados muestran el autor por nombre, resuelto en el backend

**Fecha:** 2026-09-25 · **Tipo:** Obligatoria · **ADR:** [0013](../adr/0013-auditoria-trazabilidad.md)

## Contexto

`ProfilePage` mostraba el autor de la última modificación como un id numérico, y la fecha en UTC sin formato. `UsersPage` no tenía la columna.

## Decisión

- **El backend resuelve el nombre** en la misma consulta, con la relación `updated_by_user`, y devuelve `updatedByName`, armado con `userFullName` (`common/utils/user.utils.js`). `updatedBy`, con el id, se sigue enviando.
- **El cliente muestra la celda estándar** `LastModifiedCell` (`ui-component/extended/`):
  - el nombre del autor, o **"Sistema"** si el registro no tiene autor;
  - la fecha en hora local del navegador (`dd MMM yyyy HH:mm`).
- La aplican `UsersPage` (columna nueva) y `ProfilePage`.

## Descartado

- **Que el cliente traduzca ids a nombres** con otra consulta: exige exponer un endpoint de usuarios solo para eso, y es una petición más por pantalla.

## Qué implica

- Todo listado que muestre autoría sigue este mismo patrón. Nunca se muestra un id de usuario crudo.

## Dónde

`server/src/common/utils/user.utils.js` · `server/src/modules/security/users/users.service.js`, `profiles.service.js` · `client/src/ui-component/extended/LastModifiedCell.jsx`
