# DEC-067 — Una excepción de permiso de usuario puede conceder o negar

**Fecha:** 2026-10-19 · **Tipo:** Obligatoria · **ADR:** [0014](../adr/0014-autorizacion-permisos.md), [0013](../adr/0013-auditoria-trazabilidad.md)

Decidido por el usuario el 2026-10-19. Cambia la decisión 4 del ADR-0014: el permiso efectivo deja de ser la unión del perfil y las excepciones individuales.

## Contexto

Con la unión, a un usuario no se le podía quitar un permiso que le daba su perfil. La pantalla de permisos del usuario lo mostraba marcado, como cualquier otro, y dejaba desmarcarlo. Al guardar, el servidor lo ignoraba y aun así respondía "Permisos actualizados". La única salida era editar el perfil, lo que afecta a todos sus usuarios, o cambiar al usuario de perfil.

## Decisión

- El permiso efectivo es **(perfil ∪ concedidos) − negados**. Cada fila de `tbl_user_permissions` es una excepción con `usp_granted`: `1` concede y `0` niega aunque el perfil dé el permiso (migración `0100`, `CHECK ck_user_permissions_granted`). Sigue habiendo como máximo una excepción por usuario y permiso (`uq_user_permissions_per_use`). Si hay excepción, decide ella; si no, decide el perfil.
- Al guardar, el set deseado de la pantalla se traduce a excepciones: deseado y el perfil no lo da → concede; no deseado y el perfil lo da → niega; lo demás → sin excepción. No quedan excepciones redundantes.
- `update_permissions_user` recibe las ventanas mostradas (`pagIds`) y solo toca los permisos de esas ventanas. Un permiso de otra ventana no se concede ni se niega por omisión, y enviarlo responde 400.
- La bitácora registra el cambio del **permiso efectivo** (`ASIGNAR` / `REVOCAR`), no el de la fila.
- La pantalla dice de dónde sale cada permiso: del perfil, quitado aunque el perfil lo da, o asignado solo a ese usuario (`fromProfile` en `get_permissions_user_window`).

## Descartado

- **Mantener la unión y solo mostrar en la pantalla los permisos del perfil como no editables:** dejaba sin resolver el caso que se pidió, quitarle un permiso a un usuario puntual.
- **Una tabla aparte de negaciones:** permitiría conceder y negar el mismo permiso a la vez. Una columna sobre el `UNIQUE` existente lo impide.

## Qué implica

- Nadie lee `tbl_user_permissions` para decidir un permiso: se usa `effectivePermissions.service.js` (`hasEffectivePermission`, `getEffectivePermissionIds`, `findUsersWithPermission`).
- Una negación sobrevive a un cambio de perfil o a que el perfil deje de dar el permiso. En ese caso no tiene efecto, porque no hay nada que restar.
- ~~La autoconcesión sigue prohibida: nadie modifica sus propias excepciones.~~ Retirado el 2026-10-23 por decisión del usuario: se pueden modificar las propias excepciones; solo se bloquea eliminarse (ver "Autoconcesión: retirada" en `engineering/anti-patterns/SECURITY.md`).

## Dónde

`database/migrations/0100_user_permission_denials.sql`, `server/src/common/services/effectivePermissions.service.js`, `server/src/modules/security/permissions/permissions.service.js` (`getUserPermissions`, `updateUserPermissions`), `server/src/modules/app/general/app.service.js` (`getUserPermissions`), `client/src/views/security/profiles/components/PermissionsDrawer.jsx`. Tests: `test/common/services/effectivePermissions.service.test.js` y `test/modules/security/permissions/permissions.service.test.js`.
