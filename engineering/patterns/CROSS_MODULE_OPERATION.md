# Patrón: operación entre módulos

> **OBJETIVO.** Ninguna existe todavía. El diseño está cerrado en [ADR-0027](../adr/0027-integridad-transaccional.md) (aceptado), que trae el catálogo completo de operaciones críticas con sus escrituras, bloqueos, validaciones, idempotencia y efectos posteriores.

**Cuándo:** nivel 4. Una operación cambia varios agregados, o valida saldos que se derivan de otros registros. Ejemplos del dominio: crear contrato con su valor inicial y pólizas; crear el otrosí de liquidación (pasa el contrato a `EN LIQUIDACIÓN`); aprobar una factura de liquidación (revalida saldos y puede liquidar el contrato).

## Reglas

1. **Una operación, una transacción.** Todo lo que cambia va en el mismo `withLockedTransaction`, con todas las entidades declaradas de una vez.
2. **Un solo service dueño de la operación.** Llama a funciones de los otros módulos que reciben el `tx`; nunca abre transacciones propias dentro de otra.
3. **Los saldos se validan, no se escriben.** Se recalculan desde los movimientos aprobados bajo bloqueo y se comparan contra las invariantes (I1–I5). No hay columna de saldo que actualizar.
4. **Revalidar al aprobar**, no solo al registrar: entre ambos momentos otro usuario pudo consumir el saldo (ADR-0021, regla 11).
5. **Idempotente por clave**, guardada en la entidad creada o en el historial.
6. **Auditoría con instantánea** de la composición y los saldos al momento de la operación.
7. **Efectos externos después del commit**, y tolerantes al fallo: si la notificación falla, la operación ya está confirmada.

## Secuencia de referencia

La del ADR-0027 para aprobar una factura de liquidación:

```text
BEGIN
  bloquear contrato → factura
  ¿clave ya registrada? → devolver el resultado previo
  verificar factura REGISTRADA · contrato EN LIQUIDACIÓN
  recalcular anticipo facturado, amortizado, retenido, devuelto
  validar I2 · I3 · I4 · I5
  componer la factura con su versión de fórmula (ADR-0026)
  factura → APROBADA · historial · auditoría con instantánea
  evaluar C1..C8 → si se cumplen: contrato → LIQUIDADO + su historial
COMMIT
después: notificación · archivos pendientes
```

## Antes de implementar una

Spec con [`WORKFLOW_TEMPLATE`](../templates/WORKFLOW_TEMPLATE.md), aprobación explícita, y las decisiones de negocio del backlog que la bloquean resueltas (ver [`PROJECT_STATE`](../PROJECT_STATE.md)).
