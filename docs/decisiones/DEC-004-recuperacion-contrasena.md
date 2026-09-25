# DEC-004 — Código de recuperación con hash, 5 intentos y uno por usuario

**Fecha:** 2026-09-24 · **Tipo:** Vigente · **ADR:** [0001](../adr/0001-seguridad.md) (B3, B4, B8, B12 de ADR-0013)

## Contexto

El código se generaba con `Math.random()`, se guardaba en claro y no tenía límite de intentos. Además, `forgot_password` devolvía un token en la respuesta.

## Decisión

- **Código de 6 dígitos** generado con `crypto.randomInt`, válido **15 minutos**.
- En la BD solo se guarda su **HMAC-SHA256** ligado al `use_id`.
- **5 intentos** por código. Cada intento se descuenta **antes** de comparar el código, y de forma atómica, así que peticiones en paralelo no pueden probar más.
- **Un código vigente por usuario** (`UNIQUE(use_id)`, upsert): pedir otro invalida el anterior.
- **Respuesta idéntica** exista o no el correo, con un tiempo mínimo de 300 ms.
- Restaurar la contraseña levanta el bloqueo de login y cierra la sesión abierta.
- **Columnas** (migración `0015`): `par_created_at` pasó a `par_create_at`, y se agregaron `par_create_by`, `par_update_by` y `par_update_at`. Los dos `*_by` quedan en `NULL`: quien pide o prueba un código no tiene sesión, así que no hay un autor verificable.

## Descartado

- **Poner al dueño de la cuenta como autor de la solicitud**: cualquiera puede pedir un código para cualquier correo, así que sería inventar el autor.

## Dónde

`server/src/modules/auth/auth.service.js` · `server/src/common/utils/resetCode.utils.js` · `database/migrations/0008_password_resets_hash.sql`, `0015_password_resets_audit_columns.sql`
