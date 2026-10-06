# DEC-039 — Suspensión de contratos: solo desde ejecución, y la levanta el otrosí que reanuda el contrato

**Fecha:** 2026-10-05 · **Tipo:** Vigente · **ADR:** [0017](../adr/0017-estados-contrato.md)

Backlog PRO-BD-12 y PRO-BE-19. Decidido por el usuario el 2026-10-05.

## Contexto

ADR-0017 describe la suspensión como un estado superpuesto con seis atributos, pero deja abiertos desde qué estados se suspende, cómo se levanta y cómo se cuentan los días. Además supone un catálogo `tbl_reasons` que estaba en la BD original y no existe en este repositorio.

## Decisión

- **Solo se suspende un contrato en ejecución.** ADR-0017 permitía suspender también en liquidación; se restringe. La suspensión sigue guardando el estado previo (`csp_previous_state`) y el contrato vuelve a él al reanudarse, así que ampliar los estados de origen después es declarativo.
- **No hay acción de levantar: la suspensión la levanta el otrosí que reanuda el contrato.** Mientras está suspendido, el contrato solo admite registrar un otrosí (`STATE_ALLOWS.SUSPENDED = ["createAmendment"]`). Ese otrosí pide la fecha de reanudación y, en su misma transacción, cierra la suspensión, suma los días al contrato, vuelve al estado previo y recalcula la fecha fin.
- **Permisos:** suspender (76) tiene permiso y endpoint propios (`suspend_contract`). Levantar (77) no tiene endpoint: registrar un otrosí sobre un contrato suspendido exige el permiso de otrosí (72) **y** este. Sin él, 403.
- **Días calendario, sin contar el día de reanudación:** suspender el 1 y reanudar el 11 suma 10 días (`suspendedDaysBetween`). Se acumulan en `ctr_suspended_days`.
- **Fecha fin = inicio + plazo + prórrogas de los otrosí + días suspendidos** (`contractEndDate`, sin cambios). La prórroga del otrosí que reanuda y los días suspendidos se suman: son tiempos distintos.
- **El motivo queda también en el historial de estado** (`tbl_contract_status_history.rea_id`, migración 0075, 2026-10-06; ADR-0017, decisión 10). La pestaña Historial del expediente lo muestra. Las suspensiones anteriores se rellenaron desde su suspensión.
- **Fechas:** la suspensión no puede ser anterior al inicio del contrato ni futura; la reanudación no puede ser anterior a la suspensión ni futura.
- **Una sola suspensión abierta por contrato** (invariante I9): `UNIQUE` sobre la columna generada `csp_open_contract`, y el service lo verifica bajo el bloqueo del contrato. Un otrosí levanta a lo sumo una suspensión (`UNIQUE` sobre `ccp_id`).
- **Las suspensiones no se editan ni se eliminan.** Una suspensión mal registrada se corrige reanudando y registrando otra.
- **Catálogo de motivos `tbl_reasons`** (módulo `reasons`, prefijo `rea_`, área `admin/`): un solo catálogo para los motivos de todas las transiciones manuales, dividido por `rea_scope` (dominio cerrado; hoy solo `SUSPENSION`). El nombre es único dentro de su ámbito, el ámbito se fija al crear, y el selector devuelve solo los del ámbito pedido. El patrón de maestro ganó `options` (campo de lista cerrada) y `scopeField` para esto.
- **Idempotencia de suspender:** la clave va en el historial de estado (`csh_idempotency_key`), como toda transición manual. `tbl_contract_suspensions` no lleva columnas de idempotencia propias.

## Descartado

- **Acción "levantar suspensión" aparte del otrosí** (la propuesta de ADR-0017): el área usuaria reanuda los contratos con un otrosí; dos actos separados dejaban abierta una reanudación sin soporte contractual.
- **La prórroga del otrosí como medida de la suspensión** (sin sumar los días aparte): mezcla el tiempo adicional pactado con el tiempo detenido, y el contrato perdería el registro de cuánto estuvo suspendido.
- **`tbl_suspension_reasons`, un catálogo solo de suspensión:** cada transición manual con motivo (reabrir, anular un otrosí, anular una factura) necesitaría su propia tabla.
- **Contar ambos días** (del 1 al 11 = 11 días): el día de reanudación el contrato ya corre.

## Qué implica

- DOM-03 queda con una excepción: el otrosí que reanuda el contrato.
- La condición de liquidación C6 ("sin suspensiones abiertas") se evalúa con `findOpenSuspension`, cuando exista el evaluador (PRO-BE-17).
- El campo "¿genera informe de interventoría?" se guarda; su efecto depende del backlog DEC-15 (C7).
- Un ámbito nuevo de motivos se agrega a `REASON_SCOPES`, a `REASON_SCOPE_OPTIONS` del cliente y al `CHECK ck_reasons_scope`, en la migración que lo use.

## Dónde

`database/migrations/0060_create_reasons.sql`, `0061_create_contract_suspensions.sql`, `0062_seed_reasons_suspensions_permissions.sql`, `0075_add_contract_status_history_reason.sql` · `server/src/modules/admin/reasons/` · `server/src/modules/work/contracts/contractTerms.js` (`suspend`, `resume`, `PREVIOUS_STATE`, `suspendedDaysBetween`), `contractSuspensions.service.js`, `contractConcepts.service.js` (`createAmendment`) · `server/src/common/services/master.service.js` (`options`, `scopeField`) · `client/src/views/admin/reasons/`, `client/src/views/work/contracts/components/SuspendDialog.jsx`, `ConceptDialog.jsx` · tests `contractSuspensions.service.test.js`, `contractTerms.test.js`, `master.service.test.js`.
