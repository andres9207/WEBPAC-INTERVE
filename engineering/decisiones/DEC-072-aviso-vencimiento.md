# DEC-072 — Reglas de negocio con los días de aviso de vencimiento, y aviso único en la campana por obra

**Fecha:** 2026-10-22 · **Tipo:** Vigente · **ADR:** [0002](../adr/0002-dashboard.md), [0015](../adr/0015-contratos.md), [0018](../adr/0018-polizas.md), [0013](../adr/0013-auditoria-trazabilidad.md)

Decidido por el usuario el 2026-10-22.

## Contexto

El umbral de "a vencer" de las pólizas vivía en la variable de entorno `POLICY_EXPIRING_DAYS`: cambiarlo exigía un despliegue (ADR-0002, decisión 7, pide que sea configuración). De los contratos no había ningún aviso, y ninguna póliza ni contrato avisaba a nadie: el estado "a vencer" solo se veía al abrir el expediente o el tablero. La campana de notificaciones existía pero estaba apagada.

## Decisión

- **Reglas de negocio en la BD** (`tbl_business_rules`, migración `0105`): una fila por clave fija del código (`BUSINESS_RULES`), con días entre 1 y 365 (`CHECK`). Dos reglas, sembradas en 30: vencimiento de contrato y vencimiento de póliza. Solo se cambia su valor.
- **Modal "Regla de negocio"** en el menú del perfil, con el permiso 114 (`admin.businessRules.configure`, migración `0107`), que cuelga de Administración. Leer y guardar con el mismo permiso: los días valen para todo el sistema. Guardar bloquea las filas (`REGLA_NEGOCIO`, al final de `LOCK_ORDER`) y deja cada cambio en la bitácora.
- **La regla de pólizas reemplaza a `POLICY_EXPIRING_DAYS`**: la vigencia del expediente y de los dos tableros la lee con `policyExpiringDays()`. La variable de entorno deja de leerse.
- **Vencimiento de un contrato = su fecha fin** (`ctr_end_date`), la única que existe. Cierra B4 de ADR-0015 para el aviso: no se crea una "fecha de vencimiento" aparte.
- **Aviso de vencimiento** (`expirationNotice.service.js`, job `expiration-notice`): cuando un contrato en ejecución o una póliza vigente entra en su plazo (fecha fin entre hoy y hoy + N días), notifica a los **responsables activos de la obra**. Los suspendidos no, porque su fecha fin es provisional; las pólizas de contratos liquidados, tampoco; lo ya vencido, tampoco.
- **Una sola vez por usuario**: la notificación lleva una clave (contrato o raíz de la póliza + fecha fin) y la BD no admite dos iguales para un usuario (`uq_notifications_user_key`, migración `0106`). Vuelve a avisar solo si la fecha fin cambia y lo que vence vuelve a entrar en el plazo.
- **Corre** cada día (11:00 UTC, `CRON_EXPIRATION_NOTICE`), al arrancar el servidor y después de guardar unas reglas que cambian, sin esperar la respuesta.
- **Campana por obra**: la notificación guarda su obra (`tbl_notifications.wrk_id`). La campana cuenta y lista las de la obra elegida en el encabezado más las de ninguna obra; con "Ver todo", todas. Se ilumina solo con notificaciones sin leer; una leída ya no la ilumina y se ve solo al desplegar la campana, que muestra leídas y no leídas. Las de los actos del contrato (suspensión, reanudación, otrosí de liquidación) también guardan la obra.

## Descartado

- **Resumen diario**: repetía el mismo aviso durante todo el plazo; el usuario lo quiere una sola vez.
- **Conservar la variable de entorno como respaldo**: serían dos fuentes para el mismo umbral. Si falta la fila de la regla, se usa 30.
- **Avisar también a quien ve todas las obras (permiso 91)**: el usuario eligió solo a los responsables de la obra.

## Qué implica

- Una regla nueva es una clave en `BUSINESS_RULES`, una fila en una migración (y en `seed.js`) y su campo en la modal.
- Las notificaciones existentes no tienen obra: se ven con cualquier obra elegida.
- En desarrollo el cron no corre (tampoco al arrancar): se prueba guardando las reglas o con `yarn cron:run expiration-notice`.

## Dónde

`database/migrations/0105_create_business_rules.sql`, `0106_notifications_work_and_key.sql`, `0107_seed_business_rules_permission.sql`; `server/src/modules/admin/businessRules/`, `server/src/modules/work/contracts/expirationNotice.service.js`, `server/src/cron/jobs/expirationNotice.job.js`, `server/src/modules/app/notifications/`, `server/src/modules/work/contracts/policyTerms.js`; `client/src/views/admin/businessRules/BusinessRulesDialog.jsx`, `client/src/layout/MainLayout/Header/ProfileSection/index.jsx`, `client/src/layout/MainLayout/Header/NotificationSection/`. Tests: `test/modules/admin/businessRules/`, `test/modules/work/contracts/expirationNotice.service.test.js`, `test/modules/app/notifications/notifications.service.test.js`.
