# DEC-049 — Cron activo para procesos que reportan, empezando por la conciliación de la fecha fin

**Fecha:** 2026-10-07 · **Tipo:** Vigente · **ADR:** [0015](../adr/0015-contratos.md), [0017](../adr/0017-estados-contrato.md)

Lo decidió el usuario el 2026-10-07: el informe llega por notificación en la aplicación y por correo. Cierra FND-BE-36 y PRO-BE-13 del backlog.

## Contexto

La fecha fin del contrato se guarda, pero es un valor derivado (ADR-0015): una sola función la calcula en cada evento que la cambia. Si un defecto deja una fecha guardada distinta de la calculada, nadie lo nota. El cron (`src/cron/`, `node-cron`) existía, pero sin ningún job.

## Decisión

- **El cron corre procesos que reportan o mantienen, nunca transiciones de estado.** Las transiciones son síncronas, dentro de la transacción del hecho que las causa (ADR-0017).
- **Conciliación de la fecha fin**, una vez al día (por defecto 08:00 UTC, las 03:00 en Colombia; `CRON_END_DATE_RECONCILIATION`):
  - Recalcula la fecha fin de cada contrato no eliminado con `contractEndDate` y la compara con la guardada.
  - **Nunca escribe en el contrato.** Corregir en silencio ocultaría el defecto que dejó la diferencia.
  - Lee por lotes, cada uno en una transacción de solo lectura: contrato y otrosí salen de la misma instantánea.
- **Destinatarios del informe**, solo si hay discrepancias:
  - **Notificación** en la aplicación a cada usuario activo con el permiso **92**, "Recibir conciliación de fechas fin de contratos", por perfil o individual. El seed lo da al perfil Superadmin.
  - **Correo** a `RECONCILIATION_REPORT_EMAILS` (separados por coma), si está definida.
  - **Log** siempre (`logs/api.log`), también cuando no hay discrepancias.
- **En desarrollo el cron no arranca.** Un job se corre a mano con `yarn cron:run <nombre>`.

## Descartado

- **Corregir la fecha automáticamente:** escondería el defecto que la produjo.
- **Solo el log:** nadie lo revisa.

## Qué implica

- Un job nuevo se declara en `src/cron/jobs/` y se registra en `cronJobs` (`src/cron/index.js`).
- Un permiso que solo decide a quién avisar no protege ningún endpoint. Los destinatarios se resuelven con `findUsersWithPermission`, nunca leyendo solo `tbl_user_permissions`.
- `insertNotification` guarda la notificación aunque Socket.IO no esté inicializado (un job corrido a mano). Solo el aviso en tiempo real se pierde.

## Dónde

`server/src/modules/work/contracts/contractEndDateReconciliation.service.js` · `server/src/cron/` (`index.js`, `run.js`, `jobs/`) · `findUsersWithPermission` en `common/services/effectivePermissions.service.js` · migración `0077` · `test/modules/work/contracts/contractEndDateReconciliation.service.test.js`
