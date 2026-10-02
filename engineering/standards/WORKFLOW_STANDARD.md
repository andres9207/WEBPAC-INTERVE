# Estándar de workflows

Aplica a toda entidad de nivel 3 ([`MODULE_STANDARD`](MODULE_STANDARD.md)): contratos, facturas, pólizas versionadas.

> **Estado: en aplicación.** El contrato es el primer workflow ([DEC-035](../decisiones/DEC-035-contratos-area-modelo.md)), con transiciones automáticas; las manuales llegan con las suspensiones. Estas reglas salen de ADR-0017 (estados de contrato), ADR-0020 (estados de factura) y ADR-0027 (integridad transaccional, **aceptado**). El primer workflow que se construya fija el patrón concreto y actualiza [`patterns/STATE_MACHINE.md`](../patterns/STATE_MACHINE.md).

## Reglas

1. **Los estados y las transiciones se declaran en el código**, en una tabla de transiciones del service: estado origen, acción, estado destino, permiso y guardas. Una transición no declarada se rechaza (ADR-0017, regla 11). No hay un "PUT del estado".
2. **El estado de negocio no es `sta_id`.** `sta_id` (1/2/3) sigue siendo visibilidad y eliminación lógica. El ciclo de vida va en su propia columna.
3. **Una acción por transición**, con endpoint propio (`approve_<x>`, `cancel_<x>`, `suspend_<x>`) y permiso propio. Editar datos no cambia el estado.
4. **Historial de estados obligatorio:** una tabla `tbl_<x>_status_history` con estado anterior, estado nuevo, motivo, autor, fecha y las columnas de idempotencia (`database/migrations/README.md`, punto 9). Se escribe en la misma transacción que la transición.
5. **Toda transición bloquea la raíz del agregado primero** (`withLockedTransaction`) y verifica bajo bloqueo el estado actual y las guardas. Nunca se decide con un estado leído antes del bloqueo.
6. **Idempotente por precondición y por clave:** exige `Idempotency-Key`, y repetir una transición ya aplicada devuelve el mismo resultado en vez de fallar o aplicarla dos veces (ADR-0027, regla 6).
7. **Transiciones automáticas** (p. ej. `EN LIQUIDACIÓN → LIQUIDADO` cuando se cumplen C1–C8) se evalúan dentro de la transacción del evento que las dispara, no en un proceso aparte.
8. **Estados terminales** no tienen salida, salvo una reapertura declarada con permiso propio y motivo (ADR-0017, regla 10).
9. **Qué se puede escribir en cada estado** se declara junto a la tabla de transiciones (p. ej. un contrato `SUSPENDIDO` no admite otrosí ni facturas). La consulta nunca se bloquea por estado.
10. **Auditoría funcional** de toda transición (`writeAudit`), además del historial.
11. **Efectos externos después del commit:** notificaciones, sockets, archivos.

## Spec obligatoria

Antes de implementar, [`templates/WORKFLOW_TEMPLATE.md`](../templates/WORKFLOW_TEMPLATE.md) completa: estados, transiciones permitidas y prohibidas, guardas, efectos, transacciones, permisos, auditoría, concurrencia, idempotencia y escenarios de fallo. Requiere aprobación explícita.

## Verificación

Tests de: cada transición válida, cada transición prohibida, transición sin permiso, reintento con la misma clave, dos transiciones concurrentes sobre el mismo registro y rollback ante fallo parcial.

## Referencias

- Máquina de estados del contrato: [ADR-0017](../adr/0017-estados-contrato.md).
- Estados de la factura: [ADR-0020](../adr/0020-facturacion.md).
- Catálogo de operaciones críticas e invariantes: [ADR-0027](../adr/0027-integridad-transaccional.md).
