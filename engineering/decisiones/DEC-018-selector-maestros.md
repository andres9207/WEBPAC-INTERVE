# DEC-018 — Los selectores de maestros devuelven solo activos, sin paginar y con tope fijo

**Fecha:** 2026-09-29 · **Tipo:** Obligatoria · **ADR:** [0008](../adr/0008-tipos-identificacion.md), [0014](../adr/0014-autorizacion-permisos.md)

Resuelve PD-01 ([`PROJECT_STATE`](../PROJECT_STATE.md)). Excepción acotada a [DEC-013](DEC-013-paginacion.md).

## Contexto

Todo maestro se usa en selects de otros módulos (el tipo de identificación en usuarios y proveedores, la aseguradora en pólizas…). DEC-013 exige que todo listado pase por `paginate`, pero un select no pagina: necesita las pocas filas activas del catálogo para filtrarlas mientras el usuario escribe. `GET /app/get_profiles` ya lo hacía sin regla escrita.

## Decisión

- Cada maestro expone `GET /api/admin/<módulo>/get_<entidades>_select`.
- **Solo activos** (`sta_id = 1`), más el registro `includeId` si no está eliminado. `includeId` es el valor que ya tiene el formulario que se edita: desactivar un maestro no afecta a los registros existentes (DOM-21), y sin él el select quedaría vacío.
- **Sin `paginate`, con tope fijo** `take: MAX_ROWS` (100) y orden por nombre. Ningún parámetro del cliente lo cambia. Vale solo para catálogos pequeños; un catálogo que pueda superar el tope (proveedores, obras) no usa este patrón: usa búsqueda paginada.
- **Respuesta:** `[{ value, label, ... }]`, la forma que consume `SelectSocket`. Campos extra solo si el formulario los necesita (p. ej. `code`).
- **Solo `verifyToken`, sin `requirePermission`**, declarado en un comentario de la ruta. Un catálogo de nombres no es sensible y lo necesita todo formulario que lo referencia, cada uno ya protegido por su propio permiso. Exigir el permiso `view` del maestro obligaría a darlo a quien, por ejemplo, crea usuarios.
- En el cliente: `socketDropdown` de `GenericFormSection` (`SelectSocket`, un Autocomplete) con `socketEvent: 'refresh-<entidades>'`, que el controller emite al guardar o eliminar.

## Descartado

- **Autocompletar con búsqueda sobre `paginate`**: correcto para catálogos grandes, pero agrega una petición por tecla para listas de cinco a veinte filas.
- **Exigir el permiso `view` del maestro**: ver arriba.

## Qué implica

- Todo maestro nuevo tiene su endpoint `_select` con estas reglas. El service lleva `take: MAX_ROWS`.
- `GET /app/get_profiles` sigue el mismo patrón pero no tiene tope: queda en deuda.

## Dónde

`server/src/common/services/master.service.js` (`select`) y `common/utils/masterRouter.utils.js` ([DEC-020](DEC-020-patron-maestro.md)) · `client/src/views/security/users/components/UserDialog.jsx` · tests en `server/test/modules/admin/identityDocuments/`
