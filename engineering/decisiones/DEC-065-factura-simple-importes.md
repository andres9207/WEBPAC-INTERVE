# DEC-065 — Importes de la factura simple con la fórmula del sistema que se migra, y formulario de facturas en dos columnas

**Fecha:** 2026-10-15 · **Tipo:** Obligatoria · **ADR:** [0023](../adr/0023-facturacion-simple.md), [0026](../adr/0026-calculos-facturacion.md), [0020](../adr/0020-facturacion.md) · **Decisiones:** cierra el backlog DEC-02; adelanta una respuesta de DEC-03

## Contexto

La factura simple tenía encabezado y ciclo de vida, pero ningún importe: su composición (backlog DEC-02) estaba abierta. El 2026-10-15 el usuario mostró la pantalla del sistema que se está migrando, con sus cifras, y respondió los puntos abiertos. También pidió que las pantallas de facturas fueran como las de ese sistema: los datos a la izquierda y el detalle de los valores, con el total, a la derecha.

## Decisión

- **Fórmula v1**, la del sistema que se migra, deducida de su pantalla y verificada al centavo (VALOR 20.000 → TOTAL 21.398,29):

  ```
  RTE FUENTE        = VALOR × % rte fuente               (sobre el valor bruto)
  SUBTOTAL          = VALOR − RTE FUENTE − DCTO AI       (se muestra así, como en el sistema actual)
  IVA               = (VALOR − DCTO AI) × % IVA          (la retención no reduce la base: lectura B)
  RTE IVA           = IVA × % rte IVA
  RTE ICA           digitada como valor
  TOTAL             = SUBTOTAL + IVA − RTE IVA − RTE ICA + FLETE − DCTO PRONTO PAGO   (neto a pagar)
  TOTAL FACTURADO   = (VALOR − DCTO AI) + IVA + FLETE                                (aparte)
  ```

- **Respuestas del usuario** (puntos de ADR-0023 y ADR-0026):
  - P1: el IVA no se reduce por la retención en la fuente.
  - P2: la retención en la fuente se calcula sobre el valor bruto.
  - P4: el flete no lleva IVA.
  - P5: el pronto pago solo descuenta el pago.
  - P9: el Descuento AI es un descuento comercial sobre el valor.
  - P10: las retenciones en la fuente y de IVA y el IVA son tasas; la retención de ICA es un valor digitado.
  - El SUBTOTAL se muestra como en el sistema actual, aunque no sea la base del IVA.
  - El total facturado se calcula y se muestra separado del TOTAL.
- **Obligatorios:** valor y % IVA. Los demás, vacíos, valen 0. Ningún ADR fijaba cuáles eran obligatorios, y el usuario eligió solo esos dos.
- **Se guarda solo lo capturado**, con las tasas congeladas y la versión de fórmula (`tbl_invoice_simple_details`, migración `0098`). Subtotal, IVA, retenciones y los dos totales los calcula `composeSimpleInvoice` cada vez, con la versión guardada. No hay otra fórmula en el sistema.
- **Validaciones** en el servicio, y en la base de datos las que se pueden expresar:
  - importes no negativos y descuento AI ≤ valor (`CHECK`);
  - tasas entre 0 y 100 (`CHECK`);
  - neto a pagar ≥ 0 (servicio).
- **Facturas simples anteriores** (registradas sin importes): se pueden aprobar así. Mientras estén registradas, se les pueden capturar los importes al editarlas. Las nuevas los exigen.
- **Previsualización:** `POST /api/billing/invoices/preview_simple_invoice`, con el permiso de ver facturas simples. El panel Detalle lo compone el servidor mientras se escribe. Al guardar, el servidor recalcula y no acepta cifras calculadas del cliente.
- **Al aprobar**, la bitácora guarda la composición completa y la versión de fórmula como evidencia (DEC-062; la simple no tiene saldos de contrato).
- **Tablero de la obra** (DEC-063): la simple vale su **total facturado**, que es el costo de la obra y no el neto. Un grupo de simples sin importes muestra "sin importes", no cero.
- **Pantallas de facturas, como las del sistema que se migra:**
  - Formulario y detalle en dos columnas: los datos a la izquierda y el panel **Detalle** a la derecha, con cada línea y el TOTAL.
  - En las facturas de contrato, cuatro tarjetas de saldos arriba: total anticipo, total retenido, total amortizado y pendiente por amortizar. En pantallas medianas o más grandes, las tarjetas quedan fijas arriba al bajar por el formulario, y el panel Detalle queda fijo debajo de ellas.
  - En anticipo y devolución, el panel muestra su valor como total. En la liquidación muestra el VALOR, la amortización y el retenido, sin total: su IVA y sus retenciones esperan DEC-03.
- **DEC-03, respuesta adelantada** (no implementada): en la factura de liquidación, el IVA es VALOR × % IVA, como en el sistema actual; el % de utilidad no entra en ese cálculo. Lo demás de DEC-03 (el signo de la devolución y del descuento de materiales) y DEC-08 siguen abiertos.

## Valor y porcentaje (2026-10-23)

El usuario pidió poder escribir cada importe en pesos o en porcentaje. Salvo el VALOR, que es la base, cada importe muestra su valor y su %. Se escribe en cualquiera de las dos cajas y la otra muestra lo que da.

| Importe | Base del % | Se guarda como |
| --- | --- | --- |
| Rte fuente | VALOR | % |
| Descuento AI | VALOR | valor |
| IVA | VALOR − DCTO AI | % |
| Rte IVA | IVA | % |
| Rte ICA | VALOR | valor |
| Flete | VALOR | valor |
| Descuento pronto pago | VALOR | valor |
| Amortización del anticipo y retenido (facturas de contrato, al ajustarlos) | VALOR | valor (y su % aplicado, como en DEC-044 y DEC-051) |

- **Lo que se guarda no cambia:** ni la base de datos ni la fórmula v1. Lo escrito por el otro lado se convierte antes de guardar. Por eso no hay que migrar facturas.
- **Las bases de Descuento AI, Rte ICA, Flete y Pronto pago las fijó el usuario:** en el sistema que se migra esos campos solo se escriben en pesos, así que no había un % que copiar.
- **La conversión la hace el servidor** (FRONTEND_STANDARD, regla 9), en las vistas previas que ya existían:
  - `preview_simple_invoice` recibe el otro lado de cada importe (`SIMPLE_PAIRS[].alt`), devuelve en `captured` cómo se guarda y en `pairs` el valor y el % de cada uno.
  - `get_contract_advance` recibe `amortization`/`amortizationPct` y `retention`/`retentionPct`, y devuelve `amortizationPair` y `retentionPair`.
  - Guardar solo acepta la forma de siempre.
- **Redondeo:** un valor escrito en un importe que se guarda como % queda como % con dos decimales (la columna). Al recalcular puede diferir en centavos; al salir de la caja, el formulario muestra el importe que de verdad queda.
- **Al cambiar el VALOR** se mantiene lo guardado y cambia el otro lado. Ejemplo: el IVA queda en 19 % y cambia su valor. La Rte ICA queda en pesos y cambia su %.
- **Componente:** `ui-component/extended/AmountPercentField`.

## Descartado

- **Capturar todas las retenciones como tasa (ADR-0023, decisión 6):** el usuario mantiene el ICA como valor, igual que el sistema actual. Si se corrige el VALOR, el ICA no se recalcula: hay que revisarlo a mano.
- **Mostrar como SUBTOTAL la base gravable (VALOR − DCTO AI):** el usuario prefiere el subtotal del sistema actual. El panel lo dice en una nota.
- **Exigir importes a las simples anteriores para aprobarlas:** el usuario eligió permitir aprobarlas sin importes.
- **Calcular el panel en el cliente:** iría contra FRONTEND_STANDARD, regla 9, y duplicaría la fórmula.

## Qué implica

- Una fórmula nueva es la versión 2 en `simpleInvoiceTerms.js`, y la v1 no cambia. Cada factura se compone con la versión que guarda.
- El costo de obra ejecutado del tablero (ADR-0002) ya tiene su dato: el total facturado de las simples aprobadas, más las facturas de contrato.
- Cuando se cierre DEC-03, la liquidación agrega sus líneas y su TOTAL al mismo panel.

## Dónde

- **Base de datos:** `database/migrations/0098_create_invoice_simple_details.sql` y `server/prisma/schema.prisma` (`tbl_invoice_simple_details`).
- **Servidor:**
  - `server/src/modules/billing/invoices/simpleInvoiceTerms.js`: fórmula, validación y DTO.
  - `invoices.service.js`: registro, edición, detalle, idempotencia, instantánea y `previewSimpleInvoice`.
  - `invoices.controller.js`, `invoices.routes.js` e `invoices.validation.js`.
  - `server/src/modules/app/dashboard/workDashboard.service.js`.
- **Cliente:**
  - `client/src/views/billing/invoices/components/SimpleAmountsSection.jsx`, `InvoiceDetailPanel.jsx` y `ContractBalanceCards.jsx`.
  - `InvoiceFormPage.jsx`, `InvoiceDetailPage.jsx` y `AdvanceAmountsSection.jsx`.
  - `DashboardCards.jsx` (variante `dense`) y `api/requests/invoicesApi.js`.
- **Tests:** `server/test/modules/billing/invoices/simpleInvoiceTerms.test.js` (la pantalla de referencia como caso), `invoices.service.test.js`, `invoices.controller.test.js` y `workScope.guard.test.js`.
- **Probado en el navegador** sobre la copia de prueba: la factura de la pantalla de referencia se registró con TOTAL 21.398,29 y total facturado 23.798,10, en el formulario y en el detalle.
