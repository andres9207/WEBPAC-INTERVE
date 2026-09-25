# DEC-009 — La base de datos trabaja en UTC; la hora local se aplica al mostrar

**Fecha:** 2026-09-24 · **Tipo:** Obligatoria · **ADR:** [0013](../adr/0013-auditoria-trazabilidad.md) (B8)

## Contexto

El adapter de Prisma escribe las fechas como UTC y lee lo que devuelve MySQL como si fuera UTC. Pero la sesión MySQL estaba en `SYSTEM`, que es hora de Bogotá (−05:00). Resultado: un **desfase real de 5 horas**.
- Las fechas por defecto de la BD se leían 5 h antes.
- Las que escribe la aplicación quedaban guardadas 5 h adelantadas: vencimiento de sesiones, bloqueos y códigos de recuperación.

`TZ` en Node no lo arregla, porque el adapter lo ignora.

## Decisión

- **La conexión de Prisma fija la sesión MySQL en UTC** (`timezone=+00:00` en `prismaClient.js`).
- **PM2** fija `TZ=America/Bogota` en `ecosystem.config.cjs`, que es el archivo de procesos de PM2 del proyecto. No se creó un `process.json` aparte. `TZ` solo afecta la hora del proceso Node, no la de la BD.
- **Migración `0014`**: vacía sesiones, códigos de recuperación e intentos de login, y corrige las fechas de lectura de notificaciones.

## Descartado

- **Solo `TZ` en un `process.json`**: no toca la sesión MySQL, que era el problema.
- **Corregir las sesiones y los bloqueos restando 5 h**: no se puede correr dos veces sin dañar los datos. Vaciar datos transitorios sí se puede repetir, y solo obliga a volver a iniciar sesión.

## Qué implica

- El backend entrega fechas en UTC (ISO). **Quien las muestra las convierte a hora local**: en el cliente, `fDateTime`; en el log, winston con `America/Bogota`.
- Nunca quitar la opción `timezone` de `prismaClient.js`.
- **Despliegue**: la `0014` se aplica **junto con** este código, no antes, porque vacía las sesiones. Se ejecuta **una sola vez**: la corrección de notificaciones resta 5 horas cada vez que se corre.

## Dónde

`server/src/common/configs/prismaClient.js` · `server/ecosystem.config.cjs` · `database/migrations/0014_fix_prisma_timezone_data.sql`
