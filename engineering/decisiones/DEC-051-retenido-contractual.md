# DEC-051 — Retenido contractual: retenido de la factura de liquidación, devolución de retenido, saldos calculados, I3 e I4, y permiso para ajustar el retenido

**Fecha:** 2026-10-08 · **Tipo:** Obligatoria · **ADR:** [0025](../adr/0025-retenciones.md), [0020](../adr/0020-facturacion.md), [0024](../adr/0024-amortizacion-anticipo.md), [0027](../adr/0027-integridad-transaccional.md)

Resuelve la parte del retenido de tres decisiones de negocio del backlog. El usuario lo decidió el 2026-10-08:

- **DEC-05:** la base y el porcentaje por defecto del retenido. Con esto, DEC-05 queda resuelta del todo; la parte del anticipo la resolvió [DEC-044](DEC-044-anticipo-amortizacion.md).
- **DEC-11:** el tope I4. Se adopta.
- **DEC-19:** el permiso para ajustar el retenido. Siguen pendientes los permisos por tipo de factura.

Cubre las tareas PRO-BE-31 y PRO-BE-32 del backlog. Sigue el mismo modelo que el anticipo (DEC-044).

## Contexto

El contrato ya calculaba el retenido pactado de cada concepto (`contractTotals`, base × porcentaje de retenido), pero ninguna factura retenía ni devolvía nada. La devolución de retenido existía como tipo de factura desde la fase A, sin importes.

ADR-0025 dejaba pendientes de validación la base, el porcentaje por defecto, el tope I4, el permiso de ajuste, si se admiten varias devoluciones y el permiso para aprobarlas.

## Decisión

- **El retenido es una garantía contractual, no una retención tributaria.** Va en columnas y saldos propios, y se presenta aparte en la API y en la interfaz. Las retenciones tributarias llegan con DEC-07.
- **Detalles** (migración `0083`):
  - **`tbl_invoice_liquidation_details`** suma el retenido (`ild_retention`, entre 0 y el VALOR, con `CHECK`) y su evidencia: el retenido por defecto, el porcentaje efectivo y el porcentaje aplicado al guardar, y la observación del ajuste.
  - Las cuatro columnas de importe y porcentaje van juntas: todas NULL o ninguna (`CHECK`). NULL es una liquidación registrada antes de esta decisión.
  - **`tbl_invoice_retention_refund_details`** (`irr_`), 1:1 con la factura como los demás detalles, guarda el valor devuelto, mayor que 0.
- **Las magnitudes se calculan, nunca se guardan** (`retentionTerms.js`, `contractBalances`):
  - **B**, base vigente: la misma del anticipo.
  - **RP**, retenido pactado: la suma de base × porcentaje de retenido de cada concepto.
  - **R**, retenido acumulado: la suma del retenido de las liquidaciones **aprobadas**.
  - **D**, retenido devuelto: la suma de las devoluciones **aprobadas**.
  - Por retener = máx(0, RP − R). Saldo de retenido = R − D. Es único por contrato.
- **Base: el VALOR de la liquidación**, antes de IVA y con AIU, igual que el anticipo.
- **Porcentaje por defecto = porcentaje efectivo RP / B.**
  - El retenido por defecto es mín(VALOR × RP / B, por retener), redondeado a dos decimales con medio hacia arriba.
  - Se calcula con la razón exacta, no con el porcentaje redondeado. Así, facturada toda la base, el retenido cierra exactamente en RP.
- **I4 (R ≤ RP), adoptada:**
  - El retenido no puede superar lo que queda por retener ni el VALOR.
  - Se verifica al registrar y al editar una registrada, y otra vez al aprobar.
  - No se aplica hacia atrás: si un otrosí baja RP por debajo de R, lo que queda por retener queda en cero.
- **I3 (D ≤ R):**
  - La devolución no puede superar el saldo de retenido. Se verifica al registrar y al editar una registrada, y otra vez al aprobar.
  - Al anular una liquidación aprobada se exige R − su retenido ≥ D. Si no se cumple, responde 409: primero hay que anular las devoluciones.
  - Anular una devolución aprobada reduce D, así que siempre cumple.
- **Varias devoluciones por contrato**, mientras quede saldo, solo con el contrato en liquidación (ya lo exigía `STATE_ALLOWS` del contrato). Se aprueban con el permiso normal de aprobar facturas. No llevan IVA ni retenciones tributarias hasta la fase B.
- **Las registradas no reservan saldo.** Todo se recalcula bajo el bloqueo del contrato, que es la primera sentencia de la transacción. El cliente nunca envía saldos.
- **Permiso 103 "Ajustar retenido"** (migración `0084`):
  - Un retenido distinto del de por defecto lo exige, además de una observación. El service lo verifica bajo bloqueo con los permisos efectivos (`granted`).
  - Es independiente del permiso 89: ajustar solo el retenido no exige el de la amortización, y al revés.
  - Aceptar el valor por defecto no lo exige. Sin retenido en la petición, el servidor usa el de por defecto.
- **Una liquidación registrada sin retenido** (antes de esta decisión) no se puede aprobar: 409. Se edita para calcularlo. Una aprobada sin retenido cuenta como cero.
- **Una aprobada no cambia sus importes**, igual que en DEC-044.
- **Bitácora:**
  - Registrar y editar guardan el retenido, el retenido por defecto, la observación y el valor devuelto, con su valor anterior y el nuevo.
  - Aprobar guarda R o D antes y después, y el porcentaje de retenido efectivo.
  - Anular guarda el efecto sobre R o D.
- **Endpoint `get_contract_advance`:** además de los saldos de anticipo, devuelve un bloque `retention` con los del retenido y, si recibe un VALOR, el retenido por defecto.

## Descartado

- **Base después de IVA:** rompe la simetría con el retenido pactado, que se calcula antes de IVA.
- **Sin tope I4:** permitiría retener sobre una facturación que exceda lo pactado, y solo una conciliación lo detectaría.
- **Una sola devolución por contrato:** obligaría a devolver todo de una vez; I3 ya impide el exceso con varias.
- **Permiso propio para aprobar devoluciones:** el usuario no lo pidió; la revalidación de I3 al aprobar ya impide el pago indebido.

## Qué implica

- Toda escritura que mueva R o D se hace bajo el bloqueo del contrato y recalcula con `contractBalances(tx, ctrId)`, que devuelve los saldos de anticipo y de retenido con una sola lectura de los conceptos.
- La condición C3 (no liquidar el contrato con saldo de retenido) llega con el evaluador C1–C8 (PRO-BE-17).
- La conciliación de I3 e I4 por cron sigue pendiente, con la de I1 e I2 (ADR-0024, decisión 12; ADR-0025, decisión 12).

## Dónde

- Migraciones: `database/migrations/0083` (columnas de retenido y detalle de la devolución) y `0084` (permiso 103).
- Servidor:
  - `server/src/modules/billing/invoices/retentionTerms.js`: los cálculos y las invariantes, sin BD.
  - `invoices.service.js`: `contractBalances`, `resolveDetail`, `revalidateOnApprove`, `revalidateOnCancel` y `getContractAdvance`.
  - `PERMISSIONS.billing.invoices.adjustRetention`.
- Cliente:
  - `client/src/views/billing/invoices/components/AdvanceAmountsSection.jsx`: el retenido de la liquidación, con su ajuste, y el valor de la devolución, con el saldo.
  - La pestaña Importes de `InvoiceDetailPage.jsx`.
- Tests:
  - `server/test/modules/billing/invoices/retentionTerms.test.js`.
  - `invoices.service.test.js`, en el bloque "retenido contractual".
