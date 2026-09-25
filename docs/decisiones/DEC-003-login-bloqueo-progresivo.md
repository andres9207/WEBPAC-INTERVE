# DEC-003 — Login con bloqueo progresivo por cuenta y respuesta uniforme

**Fecha:** 2026-09-24 · **Tipo:** Vigente · **ADR:** [0001](../adr/0001-seguridad.md) (B1, B7)

## Contexto

Había una contraseña maestra `"123456"` y ningún límite de intentos por cuenta. Además, el login respondía distinto según si el usuario existía o no, así que permitía averiguar qué cuentas existen.

## Decisión

- **Bloqueo por cuenta** en `tbl_login_attempts`: cada 5 fallos consecutivos la cuenta se bloquea. El primer bloqueo dura 15 min, y cada bloqueo siguiente dura el doble, con un tope de 24 h.
- Complementa el límite por IP (`authRateLimit`), que se esquiva cambiando de IP.
- Durante el bloqueo **ni la contraseña correcta entra**, y los reintentos no alargan el bloqueo.
- **Mismo mensaje y mismo tiempo de respuesta** para usuario inexistente, contraseña incorrecta y cuenta bloqueada. Si el usuario no existe, se compara igual contra un hash de relleno.
- Un login exitoso o restaurar la contraseña reinician el contador.
- Se eliminó la contraseña maestra.

## Descartado

- **Bloqueo fijo**: el bloqueo progresivo frena la fuerza bruta sin castigar demasiado un error humano.

## Dónde

`server/src/modules/auth/auth.service.js` (`login`, `registerFailedLogin`, `lockDurationFor`) · `database/migrations/0009_create_login_attempts.sql`
