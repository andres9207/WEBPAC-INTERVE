# DEC-005 — La identidad y el autor salen siempre de la sesión, nunca del cliente

**Fecha:** 2026-09-24 (retiro del lado del cliente: 2026-09-25) · **Tipo:** Obligatoria · **ADR:** [0001](../adr/0001-seguridad.md) (B9), [0013](../adr/0013-auditoria-trazabilidad.md) (decisión 10)

## Contexto

Varios endpoints tomaban de `req.body` o `req.query` sobre quién actuar o quién era el autor: `update_account`, `count_users`, `list_profiles`, los autores de documentos… Cualquiera podía operar sobre otro usuario, o dejar la auditoría a nombre de otro.

## Decisión

- **Backend**: el usuario que hace la petición y el autor de la auditoría salen siempre de `req.user`, que llena `verifyToken` a partir de la cookie de sesión. En la bitácora se usa `auditContext(req)`.
- **Cliente**: no envía la identidad de quien hace la petición en ningún campo, ni en escrituras ni en lecturas (`useBy`, `updatedBy`, `docCreateBy`, `usuAct`, `userId`, `idu`…). Tampoco en encabezados: se eliminó `currenuserapp`, que viajaba en todas las peticiones y el servidor nunca leyó.
- Solo viaja el id del registro **objetivo**, por ejemplo el usuario que se edita.
- `list_profiles` decidía con un `useId` del body si mostraba el perfil Superadmin. Ahora lo decide con `req.user`.

## Descartado

- **Dejar que el cliente envíe el autor "por si acaso", aunque el backend lo ignore**: da a entender que el cliente decide quién es el autor, y alguien terminaría usándolo.

## Qué implica

- Tests de regresión en los controladores (`users`, `profiles`, `permissions`, `documents`, `auth`) verifican que un autor falsificado en el body se ignora.
- Prohibición en `ENDPOINT_STANDARD.md`: el cliente no envía la identidad de la sesión.

## Dónde

`server/src/common/services/audit.service.js` (`auditContext`) · controladores de cada módulo · `client/src/api/services/httpCliente.js`, `client/src/api/firebase/handleFirebaseDocs.js`
