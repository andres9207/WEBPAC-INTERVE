# Patrón: máquina de estados

> **Primera implementación: el contrato** ([DEC-035](../decisiones/DEC-035-contratos-area-modelo.md)), con solo transiciones automáticas por ahora. Referencia real: `server/src/modules/work/contracts/contractTerms.js` (`CONTRACT_TRANSITIONS`, `STATE_ALLOWS`, `assertStateAllows`, `historyRow`) y `contractConcepts.service.js` (`createLiquidation`). Lo que fijó:
>
> - El estado va en su propia columna (`ctr_state`, con `CHECK`), no en `sta_id`.
> - Las reglas sin BD (transiciones, qué admite cada estado) viven en un módulo aparte del service, sin Prisma, y se prueban sin mocks.
> - "El estado actual no admite la acción" responde **409** con el nombre del estado.
> - `historyRow` lanza si la transición no está declarada desde ese estado: el historial no puede registrar algo que la tabla no permite.
> - Una transición automática viaja con la clave de idempotencia del hecho que la dispara (la del contrato o la del concepto); la columna de clave del historial queda para las manuales.
> - El detalle devuelve `allowedActions` (de `STATE_ALLOWS`) y el cliente lo cruza con los permisos para mostrar u ocultar acciones.
>
> El esqueleto de abajo sigue siendo la forma de una transición **manual** (con clave propia en el historial), que llega con las suspensiones.

**Cuándo:** nivel 3. Ejemplos del dominio: contrato (ADR-0017), factura (ADR-0020).

## Tabla de transiciones en el código

Una sola declaración por entidad, en su service. Nada fuera de ella cambia el estado.

```js
// Ilustrativo, basado en ADR-0020. Nombres de estado y permisos por definir.
const INVOICE_TRANSITIONS = Object.freeze({
  approve: { from: ["REGISTRADA"], to: "APROBADA", permission: PERMISSIONS.<área>.invoices.approve },
  cancel:  { from: ["REGISTRADA", "APROBADA"], to: "ANULADA", permission: PERMISSIONS.<área>.invoices.cancel,
             requiresReason: true },
});

// Qué escrituras admite cada estado (ADR-0017, reglas 13–15).
const WRITABLE_IN = Object.freeze({ REGISTRADA: ["edit", "approve", "cancel"], APROBADA: ["cancel"], ANULADA: [] });
```

`APROBADA → REGISTRADA` no aparece: una transición que no está declarada no existe.

## Ejecutar una transición

```js
export const transition = ({ id, action, reason, ctx, idempotencyKey }) => {
  const rule = INVOICE_TRANSITIONS[action];
  if (!rule) throw httpError(400, "Acción no válida.");

  return runIdempotent({
    target: INVOICE_HISTORY_IDEMPOTENCY,     // la clave vive en la tabla de historial
    key: idempotencyKey, ownerId: ctx.useId, payload: { id, action, reason },
    execute: (idempotencyData) =>
      withLockedTransaction({ CONTRATO: contractIdOf(id), FACTURA: id }, async (tx) => {
        const current = await tx.tbl_invoices.findUnique(/* estado actual, ya bajo bloqueo */);
        if (!rule.from.includes(current.state)) throw httpError(409, "La factura ya no está en un estado que permita esta acción.");
        // guardas de negocio bajo bloqueo: saldos, estado del contrato… (ADR-0027)
        await tx.tbl_invoices.update(/* estado nuevo */);
        await tx.tbl_invoice_status_history.create({ data: { /* anterior, nuevo, motivo, autor */ ...idempotencyData } });
        await writeAudit(tx, { entity: AUDIT_ENTITIES.INVOICE, recordId: id, operation: /* … */, ctx, changes: [/* … */] });
        // transiciones automáticas que dispara este evento (p. ej. evaluar C1..C8 del contrato)
        return { message: "…" };
      }),
  });
};
```

`contractIdOf(id)` es un problema real: para bloquear el contrato primero hay que saber cuál es, y leerlo antes del bloqueo va contra la regla 3 de ADR-0027. El ADR resuelve el catálogo de bloqueos por operación; la forma exacta de obtener el id del padre se fija con la primera implementación.

## Qué queda por decidir al implementar

- El código HTTP de "estado actual no admite la transición" (arriba: 409) frente a 400.
- Si la repetición idempotente de una transición ya aplicada se reconoce por la clave, por la precondición de estado o por ambas (ADR-0027, regla 6 dice ambas).
- Nombres de acciones, estados y permisos (ADR-0017, ADR-0020 y backlog `DEC-16`, `DEC-19`).
