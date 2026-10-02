# DEC-038 — Estados de visibilidad con clave simbólica y constantes únicas, verificados al arrancar

**Fecha:** 2026-10-02 · **Tipo:** Obligatoria · **ADR:** [0017](../adr/0017-estados-contrato.md), [0013](../adr/0013-auditoria-trazabilidad.md)

Implementa ADR-0017 (decisión 14) y el backlog FND-BD-04, en lo que sigue vigente tras [DEC-035](DEC-035-contratos-area-modelo.md).

## Contexto

`tbl_status` (activo, inactivo, eliminado) se sembraba con ids fijos (0010), pero no tenía `sta_key`. El número del estado estaba escrito a mano en unas 25 líneas del servidor y 30 del cliente, y había seis copias locales de `ACTIVE_STATUS`/`DELETED_STATUS`. `getStatusesByScope` filtraba por una `sta_key` que no existía.

## Decisión

- **`tbl_status.sta_key`** (`ACTIVE`, `INACTIVE`, `DELETED`), `NOT NULL` y `UNIQUE`. La siembra la migración `0058` con `ON DUPLICATE KEY UPDATE`, sin pisar nombres ni colores. Los ids no cambian.
- **Una sola fuente en el código:**
  - servidor: `server/src/common/constants/status.constants.js` (`STATUS_IDS`, `ACTIVE_STATUS`, `INACTIVE_STATUS`, `DELETED_STATUS`, `EDITABLE_STATUS_VALUES` para validar un `staId` editable);
  - cliente: `STATUS` en `client/src/utils/constants.js`.

  Ninguna consulta, servicio, validador ni pantalla escribe el número.
- **Las consultas siguen filtrando por id.** La constante lleva clave e id. Comparar por clave en cada consulta exigiría un join a `tbl_status` en todos los listados, sin ganar nada mientras los ids estén verificados.
- **El servidor verifica el catálogo al arrancar** con `verifyStatusCatalog`. Si una clave falta o tiene otro id, registra la diferencia y sale con código 1: así los ids no pueden diferir entre entornos sin que se note. Si la BD no responde, solo lo registra, igual que `testConnection`.
- **`sta_scope` no se amplía.** El ciclo de vida de contratos va en `ctr_state` (DEC-035), y el de facturas seguirá la misma regla (`WORKFLOW_STANDARD`, regla 2). `tbl_status` es solo visibilidad y eliminación lógica.
- **`GET /app/get_statuses_by_scope`** devuelve también `key`. `excludesKeys` solo acepta claves del catálogo (400 si no).

## Descartado

- **Estados de contrato y factura en `tbl_status` con `sta_scope` propio** (ADR-0017, decisión 13): reemplazado por DEC-035.
- **Resolver los ids desde la BD al arrancar y no tenerlos en el código:** obliga a que todo módulo espere una carga asíncrona antes de su primera consulta. La verificación da la misma garantía sin ese costo.

## Qué implica

- Un estado se nombra con la constante, nunca con `1`, `2` o `3`.
- Un estado de visibilidad nuevo es una migración con su clave más la entrada en las dos tablas de constantes. El test cruza la del servidor con la migración y `seed.js`.
- Un ciclo de vida no va en `tbl_status`: lleva su propia columna de estado.

## Dónde

- Migración `0058_alter_status_add_key.sql`; `prisma/schema.prisma`; `prisma/seed.js`.
- `server/src/common/constants/status.constants.js`, `server/src/common/services/status.service.js`, `server/server.js`.
- `app/general/app.validation.js` y `app.service.js`; validadores de maestros, obras y proveedores.
- `client/src/utils/constants.js` y las pantallas que comparaban el estado.
- Test: `server/test/common/services/status.service.test.js`.
