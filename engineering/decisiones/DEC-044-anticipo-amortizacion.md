# DEC-044 — Anticipo y amortización: importes de las facturas de anticipo y de liquidación, saldos calculados, I1 e I2, y permiso para ajustar la amortización

**Fecha:** 2026-10-06 · **Tipo:** Obligatoria · **ADR:** [0024](../adr/0024-amortizacion-anticipo.md), [0020](../adr/0020-facturacion.md), [0021](../adr/0021-facturacion-contrato-mayor.md), [0027](../adr/0027-integridad-transaccional.md)

Resuelve una parte de dos decisiones de negocio del backlog:

- **DEC-05:** el porcentaje por defecto de la amortización. La base del anticipo ya la fijó [DEC-036](DEC-036-conceptos-contractuales.md): antes de IVA, con AIU. Queda pendiente la parte del retenido.
- **DEC-19:** el permiso para ajustar la amortización. Quedan pendientes el permiso para ajustar el retenido y los permisos por tipo de factura.

El usuario lo decidió el 2026-10-06. Es la parte de la fase B de [DEC-042](DEC-042-facturas-area-ciclo-vida.md) que no depende de la composición tributaria. Cubre las tareas PRO-BE-27 a PRO-BE-30 del backlog, sin IVA, retenciones ni retenido.

## Contexto

PRO-BE-30 pedía tres cosas:

- **I1:** el anticipo facturado no supera el pactado.
- **I2:** el amortizado no supera el facturado.
- Un permiso propio para apartarse del valor por defecto de la amortización.

En la fase A, las facturas no tenían importes. El contrato ya calculaba, sin guardarlos, la base y el anticipo pactado (`contractTotals`).

## Decisión

- **Un detalle por tipo de factura** (ADR-0020, decisión 1). Cada detalle es 1:1 con la factura: `inv_id` es su clave primaria y su FK. No se borra, porque la factura no se borra.
  - **`tbl_invoice_advance_details`** (`iad_`) guarda el valor del anticipo, mayor que 0.
  - **`tbl_invoice_liquidation_details`** (`ild_`) guarda el VALOR (mayor que 0) y la amortización (entre 0 y el VALOR, con `CHECK`).
  - El detalle de liquidación guarda además, como evidencia: la amortización por defecto, el porcentaje efectivo y el porcentaje aplicado al guardar, y la observación del ajuste.
  - IVA, retenciones y retenido se agregarán como columnas del mismo detalle cuando se resuelvan DEC-03 y DEC-07.
- **Las cinco magnitudes se calculan, nunca se guardan** (`advanceTerms.js`, `contractAdvanceBalances`):
  - **B**, base vigente: la suma de las bases de los conceptos.
  - **A**, anticipo pactado: la suma de base × porcentaje de anticipo de cada concepto (`contractTotals`).
  - **AF**, anticipo facturado: la suma de las facturas de anticipo **aprobadas**.
  - **AM**, amortizado: la suma de las amortizaciones de las liquidaciones **aprobadas**.
  - Por facturar = máx(0, A − AF). Por amortizar = AF − AM.
- **El VALOR de la liquidación es de la misma naturaleza que la base del anticipo**: antes de IVA, con AIU.
- **Porcentaje por defecto = porcentaje efectivo A / B.**
  - La amortización por defecto es mín(VALOR × A / B, por amortizar), redondeada a dos decimales con medio hacia arriba.
  - Se calcula con la razón exacta A / B, no con el porcentaje redondeado. Así la última factura cierra el saldo en cero.
- **I1 (AF ≤ A):**
  - El valor del anticipo no puede superar lo que queda por facturar.
  - Se verifica al registrar y al editar una factura registrada, y otra vez al aprobar.
  - No se aplica hacia atrás: si un otrosí baja A por debajo de AF, el saldo por facturar queda en cero.
- **I2 (AM ≤ AF):**
  - La amortización no puede superar el pendiente por amortizar ni el VALOR.
  - Se verifica al registrar y al editar una registrada, y otra vez al aprobar.
  - Al anular un anticipo aprobado se exige AF − valor ≥ AM. Si no se cumple, responde 409: primero hay que anular las liquidaciones que lo amortizan.
  - Anular una liquidación aprobada reduce AM, así que siempre cumple.
- **Las registradas no reservan saldo.** Todo se recalcula bajo el bloqueo del contrato, que es la primera sentencia de la transacción. El cliente nunca envía saldos.
- **Permiso 89 "Ajustar amortización de anticipo"**:
  - Una amortización distinta de la de por defecto lo exige. El service lo verifica bajo bloqueo con los permisos efectivos (`granted`).
  - También exige una observación.
  - Aceptar el valor por defecto no lo exige. Sin amortización en la petición, el servidor usa la de por defecto.
- **Una aprobada no cambia sus importes.** Enviar uno distinto responde 409, igual que con cualquier otro dato no editable (DOM-05).
- **Una factura de anticipo o de liquidación sin detalle** (registrada en la fase A) no se puede aprobar: 409. Se edita para registrar sus importes.
- **Varias facturas de anticipo por contrato**, mientras quede saldo por facturar.
- **Bitácora:**
  - Registrar y editar guardan cada importe con su valor anterior y el nuevo.
  - Aprobar guarda AF o AM antes y después, y el porcentaje efectivo.
  - Anular guarda el efecto sobre AF o AM.
- **Endpoint `get_contract_advance`** (permiso de ver facturas): devuelve los saldos y, si recibe un VALOR, la amortización por defecto. Es la información financiera que usa el formulario (PRO-BE-28, sin el retenido).

## Descartado

- **Guardar los saldos en el contrato:** se desincronizan ante una anulación o un fallo (ADR-0024, alternativa A).
- **Porcentaje del valor inicial o del otrosí de liquidación:** no cierra el saldo cuando los conceptos pactan porcentajes distintos.
- **Reservar saldo al registrar:** obligaría a liberar reservas de facturas abandonadas. Revalidar al aprobar da la misma garantía.
- **Columnas de importe en `tbl_invoices`:** ADR-0020 eligió un detalle por tipo.

## Qué implica

- Toda escritura que mueva AF o AM se hace bajo el bloqueo del contrato y recalcula con `contractAdvanceBalances(tx, ctrId)`. Un saldo nunca se lee del cliente.
- Los importes se manejan como `Prisma.Decimal` (DEC-028). En el cliente, `MoneyField` y `fMoneyText`, nunca `Number`.
- La conciliación de I1 e I2 por cron sigue pendiente (ADR-0024, decisión 12).

## Dónde

- Migraciones: `database/migrations/0071` (detalles e índice `(ctr_id, inv_type, inv_state)`) y `0072` (permiso 89).
- Servidor:
  - `server/src/modules/billing/invoices/advanceTerms.js`: los cálculos y las invariantes, sin BD.
  - `invoices.service.js`: `contractAdvanceBalances`, `resolveDetail`, `revalidateOnApprove`, `revalidateOnCancel` y `getContractAdvance`.
  - `PERMISSIONS.billing.invoices.adjustAmortization`.
- Cliente:
  - `client/src/views/billing/invoices/components/AdvanceAmountsSection.jsx`.
  - La pestaña Importes de `InvoiceDetailPage.jsx`.
  - `getContractAdvanceAPI`.
- Tests:
  - `server/test/modules/billing/invoices/advanceTerms.test.js`.
  - `invoices.service.test.js`, en el bloque "anticipo y amortización".
