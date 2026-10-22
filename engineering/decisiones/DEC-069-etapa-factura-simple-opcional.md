# DEC-069 — La etapa de la factura simple solo es obligatoria si la obra tiene etapas

**Fecha:** 2026-10-22 · **Tipo:** Vigente · **ADR:** [0023](../adr/0023-facturacion-simple.md), [0020](../adr/0020-facturacion.md)

Decidido por el usuario el 2026-10-22. Cambia [DEC-058](DEC-058-factura-simple-obra-etapa.md) en un punto: la etapa deja de ser obligatoria siempre. Obra, proveedor asignado y ausencia de contrato no cambian.

## Contexto

Con DEC-058, una obra sin etapas no admitía facturas simples: el formulario pedía una etapa que no existía y el `CHECK` la exigía.

## Decisión

- **Si la obra tiene etapas activas, la etapa es obligatoria**; si no tiene ninguna activa, la simple se registra sin etapa (`wks_id` nulo).
- Depende de las etapas de la obra en el momento, así que lo verifica el service (`assertStage`), contando las etapas activas con la obra ya bloqueada. Al registrar y al editar una registrada; una aprobada solo cambia extracto y descripción, y la etapa no se revisa.
- El esquema deja de exigir la etapa en la simple: `ck_invoices_type_links` pasa a "simple sin contrato; las demás con contrato y sin etapa" (migración `0102`). La FK `(wks_id, wrk_id)` sigue garantizando que, si hay etapa, es de la obra.
- El formulario marca la etapa como obligatoria solo cuando la obra tiene etapas; si no, la deshabilita y lo dice.

## Descartado

- **Etapa siempre opcional:** el usuario la quiere obligatoria cuando la obra tiene etapas.
- **Exigirlo en la BD:** la condición depende de otra tabla; un `CHECK` no puede leerla, y un disparador iría contra la convención del proyecto.

## Qué implica

- Una simple registrada sin etapa sigue así si después la obra recibe etapas, mientras no se edite entera: al editarla registrada, se le pide la etapa.
- Listados y tablero ya muestran la etapa como opcional (`stageName` nulo).

## Dónde

`database/migrations/0102_simple_invoice_optional_stage.sql`, `server/src/modules/billing/invoices/invoices.service.js` (`assertStage`, `updateInvoice`), `invoices.validation.js`, `server/prisma/invariants.check.js` (I13), `client/src/views/billing/invoices/InvoiceFormPage.jsx`. Tests: `test/modules/billing/invoices/invoices.service.test.js`.
