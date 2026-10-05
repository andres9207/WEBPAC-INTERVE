# DEC-042 — Facturas en el área `billing/`: encabezado común y ciclo de vida, sin importes (fase A)

**Fecha:** 2026-10-05 · **Tipo:** Obligatoria · **ADR:** [0020](../adr/0020-facturacion.md), [0017](../adr/0017-estados-contrato.md), [0021](../adr/0021-facturacion-contrato-mayor.md), [0023](../adr/0023-facturacion-simple.md), [0027](../adr/0027-integridad-transaccional.md)

Resuelve PD-05 ([`PROJECT_STATE`](../PROJECT_STATE.md)) **para facturación** y las decisiones de negocio DEC-16 y DEC-17 (número de factura) del backlog. El usuario lo decidió el 2026-10-05 y aprobó la spec [`docs/specs/billing-invoices.md`](../../docs/specs/billing-invoices.md). Es la fase A. Los detalles por tipo con sus importes, los saldos y el evaluador C1–C8 son la fase B, bloqueada por decisiones contables ([deuda](../debt/TECHNICAL_DEBT.md)).

## Decisión

- **Área nueva `billing/`**, módulo `invoices`:
  - servidor: `server/src/modules/billing/invoices/` (`invoices.service.js` e `invoiceTerms.js`, las reglas sin BD)
  - API: `/api/billing/invoices/<acción>`
  - cliente: `client/src/views/billing/invoices/` y `client/src/api/requests/invoicesApi.js`
  - menú: el grupo "Facturación" (página 18), después de Obras, con la página "Facturas" (19)
- **Nombres fijados:**

  | Parte | Tabla | Prefijo |
  | --- | --- | --- |
  | Factura (encabezado común) | `tbl_invoices` | `inv_` |
  | Historial de estado | `tbl_invoice_status_history` | `ish_` |

- **Cuatro tipos en una sola tabla** (`inv_type`): `SIMPLE`, `ADVANCE` (anticipo), `LIQUIDATION`, `RETENTION_REFUND` (devolución de retenido). Tipo, obra y contrato no cambian después de registrar.
- **La simple** no tiene contrato y sí etapa. **Las de contrato** no guardan etapa: usan la del contrato, que es opcional ([DEC-037](DEC-037-configuracion-campos-tipo-contrato.md)). Copiarla duplicaría el dato. Así se aparta de ADR-0020, que la guardaba heredada. Un `CHECK` (`ck_invoices_type_links`) exige las dos reglas.
- **Obra y proveedor de una factura de contrato salen del contrato** bloqueado, nunca del cliente. Además los garantiza una FK compuesta `(ctr_id, wrk_id, prv_id) → tbl_contracts`, que necesitó el índice `uq_contracts_id_work_provider` (0065). ADR-0020 daba esta regla por no expresable. Por esa FK, el proveedor de un contrato con facturas no se puede cambiar.
- **Tres estados** en `inv_state`, no en `sta_id`:
  - `REGISTERED` → `APPROVED`
  - `REGISTERED`/`APPROVED` → `CANCELLED`, que es terminal
  - Están declarados en `INVOICE_TRANSITIONS`, y lo que admite cada estado, en `STATE_ALLOWS`.
  - Registrada se edita entera; aprobada, solo extracto y descripción; anulada, nada.
  - Si hacen falta estados adicionales (contabilizada, pagada), se agregan a la tabla sin cambiar el modelo.
- **Número único por proveedor**, también contra las anuladas: una anulada sigue ocupando su número. Lo garantiza `UNIQUE (prv_id, inv_number)`, y el service responde 409 antes.
- **Qué tipo admite cada estado del contrato** (ADR-0017), declarado en `STATE_ALLOWS` de `contractTerms.js` con `INVOICE_ACTIONS`:
  - anticipo, solo con el contrato en ejecución;
  - liquidación y devolución de retenido, solo en liquidación;
  - ninguna con el contrato suspendido o liquidado.
  - Se verifica al registrar y otra vez al aprobar, bajo el bloqueo del contrato.
- **Aprobar** fija el estado y la fecha de aprobación. La fecha no puede ser futura ni anterior a la factura.
- **Anular** exige un motivo del catálogo (ámbito nuevo `INVOICE_CANCEL` en `tbl_reasons`, migración 0068) y una observación.
  - Anular una aprobada exige, además del permiso de anular, el reforzado. El service lo verifica con el estado bajo bloqueo, igual que levantar una suspensión.
  - La fecha de aprobación se conserva.
  - Una factura nunca se elimina: no hay endpoint. `sta_id` queda solo por la convención de las tablas.
- **Bloqueo:**
  - simple: obra → proveedor → factura;
  - de contrato: contrato → factura;
  - anular añade al final el motivo.
  - `FACTURA` está registrada en `LOCKABLE`.
  - Tipo, obra y contrato se leen antes del bloqueo solo para saber qué bloquear: no cambian.
- **Idempotencia:** registrar, con la clave en `tbl_invoices`; aprobar y anular, con la clave en el historial.
- **Permisos 83 a 88:** ver, crear, modificar, aprobar, anular y anular aprobada. Aprobar va separado de crear.
- **Bloqueos en otros módulos** (todos 409, y la FK lo garantiza también):
  - no se elimina un contrato con facturas, de cualquier estado;
  - no se cambia el proveedor de un contrato con facturas;
  - no se elimina una obra con facturas;
  - no se desasigna un proveedor de una obra donde tiene facturas;
  - no se quita una etapa con facturas.
- **Sin importes en la fase A.** La factura registra el documento: número, fechas, comprobante, extracto y descripción.

## Descartado

- **Una tabla por tipo de factura:** ADR-0020 eligió encabezado común más detalle.
- **Guardar la etapa en las facturas de contrato:** sería una copia de un dato que el contrato puede no tener y que puede cambiar.
- **Número único global, o que una anulada libere el número:** el usuario eligió por proveedor, con la anulada ocupándolo.
- **Facturación dentro de `work/`:** el usuario eligió un área propia.
- **Capturar importes provisionales:** el backlog prohíbe estructuras provisionales mientras las decisiones contables estén abiertas (PRO-BD-13).

## Qué implica

- Toda operación nueva sobre facturas pide la transición a `assertTransition` y respeta `STATE_ALLOWS`. Ninguna escribe `inv_state` a mano.
- La fase B agrega las tablas de detalle por tipo, sin cambiar el encabezado. Esa fase también revalida los saldos al aprobar y evalúa C1–C8 dentro de la misma transacción (`approveInvoice`).
- Desplegar: aplicar `0065` a `0069` en orden y correr `yarn db:seed` para asignar los permisos. Para anular la primera factura, crear antes al menos un motivo de anulación (Administración → Motivos).

## Dónde

`database/migrations/0065`–`0069` · `server/src/modules/billing/invoices/` · `server/src/modules/work/contracts/contractTerms.js` (`INVOICE_ACTIONS`) · `server/src/common/services/transaction.service.js` (`LOCKABLE`) · `client/src/views/billing/invoices/` (incluida la pestaña del contrato, `components/ContractInvoicesTab.jsx`) · Tests: `test/modules/billing/invoices/`.
