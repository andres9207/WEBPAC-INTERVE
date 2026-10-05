# DEC-040 — Rate limit general de `/api`: 1000 peticiones cada 5 minutos por IP

**Fecha:** 2026-10-05 · **Tipo:** Vigente · **ADR:** [0001](../adr/0001-seguridad.md)

## Contexto

ADR-0001 fijó el rate limit general de `/api/*` en 50 peticiones cada 5 minutos por IP, y [DEC-011](DEC-011-endurecimiento-adr-0001.md) lo montó en `app.js`. Con el uso normal de la aplicación ese tope se alcanza en pocos minutos: cada pantalla hace varias peticiones (listado, conteos por estado, selectores de maestros, expediente, notificaciones, `verify_token`), y los usuarios de una misma oficina comparten IP. El servidor respondía 429 a usuarios legítimos.

## Decisión

- **`defaultRateLimit` admite 1000 peticiones cada 5 minutos por IP** en `/api/*`. Antes eran 50.
- **El límite estricto de autenticación no cambia:** `authRateLimit`, 10 peticiones fallidas cada 15 minutos por IP en `/api/auth/*`, junto con el bloqueo progresivo por cuenta ([DEC-003](DEC-003-login-bloqueo-progresivo.md)).
- El ADR-0001 se conserva como está. Para el límite general, el valor vigente es el de esta ficha.

## Descartado

- **Quitar el rate limit general:** deja `/api` sin freno ante un cliente que repite peticiones sin parar.
- **Contar por usuario autenticado en vez de por IP:** se puede evaluar más adelante; hoy basta con subir el tope.

## Qué implica

- Quien cambie el tope general lo hace en `rateLimit.middleware.js` y registra el valor nuevo en otra ficha que reemplace a esta.
- La fuerza bruta contra el login sigue cubierta por `authRateLimit` y por el bloqueo por cuenta. Subir el límite general no la debilita.

## Dónde

`server/src/common/middlewares/rateLimit.middleware.js` (`defaultRateLimit`), montado en `server/app.js` sobre `/api`.
