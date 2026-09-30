# DEC-029 — Los responsables de obra se eligen entre usuarios existentes

**Fecha:** 2026-09-30 · **Tipo:** Vigente · **ADR:** [0011](../adr/0011-obras.md)

Reemplaza las decisiones 5 y 6 de ADR-0011.

## Contexto

ADR-0011 pedía crear un responsable nuevo desde el formulario de obra, como usuario del sistema y en la misma transacción que la obra. `saveUser` (`security/users/users.service.js`) abre su propia transacción, así que no puede ejecutarse dentro de la de la obra sin separar su núcleo.

## Decisión

- El formulario de obra **solo elige usuarios existentes** como responsables.
- Si hace falta un usuario nuevo, se crea antes con la pantalla de usuarios (alta administrativa, con todas sus validaciones) y después se selecciona en la obra.
- `saveUser` no cambia.

## Descartado

- **Separar el núcleo de `saveUser`** para llamarlo dentro de la transacción de la obra: toca el área de seguridad y no hacía falta ahora.
- **Anidar transacciones**: `withLockedTransaction` no lo admite y rompería el orden de bloqueo.

## Qué implica

- La tarea PRO-BE-02 (alta de responsable desde la obra) no se hace.
- El formulario de obra no usa `pendingDropdown` para responsables: es un selector de usuarios activos.
- La obra verifica, con el usuario bloqueado, que cada responsable exista y esté activo.

## Dónde

`server/src/modules/work/works/` · formulario de obra en `client/src/views/work/works/`
