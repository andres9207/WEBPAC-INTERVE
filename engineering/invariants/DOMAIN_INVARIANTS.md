# Invariantes de dominio

> **PROPUESTAS salvo las marcadas como aplicadas** al final de cada sección. Salen de los ADR del dominio. Al implementar un módulo, sus invariantes pasan a APLICADA con el mecanismo real. Las que dependen de una decisión de negocio pendiente lo indican.

## Saldos del contrato (ADR-0027, catálogo I1–I5)

Se validan bajo bloqueo del contrato al registrar **y** al aprobar; nunca se guardan como columnas.

| ID | Invariante | Mecanismo previsto | Fuente |
| --- | --- | --- | --- |
| I1 | Anticipo facturado (aprobado) ≤ anticipo pactado | Bloqueo + revalidación | ADR-0024 |
| I2 | Amortizado ≤ anticipo facturado | Bloqueo + revalidación | ADR-0024 |
| I3 | Retenido devuelto ≤ retenido acumulado | Bloqueo + revalidación | ADR-0025 |
| I4 | Retenido acumulado ≤ retenido pactado (adoptada en [DEC-051](../decisiones/DEC-051-retenido-contractual.md), resuelve el backlog DEC-11) | Bloqueo + revalidación | ADR-0025 |
| I5 | Σ facturas de liquidación ≤ base vigente — *pendiente: backlog DEC-08* | Bloqueo + revalidación | ADR-0021 |

**Aplicadas (2026-10-06), con anticipo y amortización ([DEC-044](../decisiones/DEC-044-anticipo-amortizacion.md)):**

- **I1:** el valor de una factura de anticipo no supera el anticipo por facturar, máx(0, A − AF). Se verifica al registrar y al editar una registrada, y con carácter definitivo al aprobar. No se aplica hacia atrás: un otrosí que baje A por debajo de AF deja el saldo por facturar en cero.
- **I2:** la amortización de una liquidación no supera el pendiente por amortizar (AF − AM) ni su VALOR. Se verifica al registrar, al editar y al aprobar. Anular un anticipo aprobado exige AF − valor ≥ AM; si no, responde 409.
- Mecanismo de las dos: `contractBalances` suma bajo el bloqueo del contrato, que es la primera sentencia de la transacción, y `advanceTerms.js` compara. Las registradas no reservan saldo. Falta la conciliación periódica (ADR-0024, decisión 12).

**Aplicadas (2026-10-08), con el retenido contractual ([DEC-051](../decisiones/DEC-051-retenido-contractual.md)):**

- **I3:** el valor de una devolución de retenido no supera el saldo de retenido, R − D. Se verifica al registrar y al editar una registrada, y con carácter definitivo al aprobar. Anular una liquidación aprobada exige R − su retenido ≥ D; si no, responde 409.
- **I4:** el retenido de una liquidación no supera lo que queda por retener, máx(0, RP − R), ni su VALOR. Se verifica al registrar, al editar y al aprobar. No se aplica hacia atrás: un otrosí que baje RP por debajo de R deja lo que queda por retener en cero.
- Mecanismo de las dos: el mismo `contractBalances`, y `retentionTerms.js` compara. Falta la conciliación periódica (ADR-0025, decisión 12).

## Estructura (ADR-0027, catálogo I6–I15)

| ID | Invariante | Mecanismo previsto | Fuente |
| --- | --- | --- | --- |
| I6 | Exactamente un `VALOR_INICIAL` por contrato | `UNIQUE` sobre columna generada + creación en la misma transacción que el contrato | ADR-0016 |
| I7 | Como máximo un `OTROSI_LIQUIDACION` por contrato | `UNIQUE` sobre columna generada | ADR-0016 |
| I8 | Número de otrosí único y secuencial por contrato, asignado por el backend | `UNIQUE (contrato, número)` + bloqueo | ADR-0016 |
| I9 | Como máximo una suspensión abierta por contrato | `UNIQUE` sobre columna generada | ADR-0017 |
| I10 | Una versión vigente por póliza | `UNIQUE` sobre columna generada | ADR-0018 |
| I11 | Número de factura único por proveedor, también contra las anuladas ([DEC-042](../decisiones/DEC-042-facturas-area-ciclo-vida.md)) | `UNIQUE` | ADR-0020 |
| I12 | Número de contrato único por obra, entre no eliminados ([DEC-035](../decisiones/DEC-035-contratos-area-modelo.md)) | `UNIQUE` sobre columna generada | ADR-0015 |
| I13 | Solo la factura `SIMPLE` puede no tener contrato | `CHECK` | ADR-0020 |
| I14 | Estado `APROBADA` ⇔ tiene fecha de aprobación | `CHECK` | ADR-0020 |
| I15 | Fecha fin del contrato ≥ fecha de inicio | `CHECK` | ADR-0015 |

**Aplicadas (2026-10-02), con contratos ([DEC-035](../decisiones/DEC-035-contratos-area-modelo.md), [DEC-036](../decisiones/DEC-036-conceptos-contractuales.md)):**

- **I6:** `UNIQUE uq_contract_concepts_initial` sobre `ccp_initial_key`, y `createContract` crea el contrato y su valor inicial en la misma transacción.
- **I7:** `UNIQUE uq_contract_concepts_liquidation` sobre `ccp_liquidation_key`; el service responde 409 antes.
- **I8:** `UNIQUE uq_contract_concepts_number (ctr_id, ccp_number)` y numeración máximo + 1 bajo `withLockedTransaction({ CONTRATO })`. Probado en vivo: dos otrosí simultáneos reciben números distintos.
- **I12:** `UNIQUE uq_contracts_work_number_active (wrk_id, ctr_number_active)`; el service responde 409 antes.
- **I15:** `CHECK ck_contracts_end_date`; la fecha fin la calcula solo `contractEndDate`.
- **I9** (2026-10-05, [DEC-039](../decisiones/DEC-039-suspension-contratos.md)): `UNIQUE uq_contract_suspensions_open` sobre la columna generada `csp_open_contract`; el service responde 409 antes, bajo el bloqueo del contrato. Probado contra la BD de desarrollo.
- **I10** (2026-10-07, [DEC-050](../decisiones/DEC-050-polizas.md)): `UNIQUE uq_policies_current` sobre la columna generada `pol_current_root`; modificar cierra la vigente antes de crear la siguiente, bajo el bloqueo del contrato y de la póliza. Probado contra la BD de desarrollo: una segunda versión vigente es rechazada.
  Relacionada (2026-10-08): un concepto tiene a lo sumo una póliza vigente de cada tipo. Hoy solo la verifica el service, bajo el bloqueo del contrato; falta el `UNIQUE` en la BD (ver [deuda](../debt/TECHNICAL_DEBT.md)).

**Aplicadas (2026-10-05), con facturas ([DEC-042](../decisiones/DEC-042-facturas-area-ciclo-vida.md)), probadas contra la BD de desarrollo:**

- **I11:** `UNIQUE uq_invoices_provider_number (prv_id, inv_number)`; el service responde 409 antes.
- **I13:** `CHECK ck_invoices_type_links`. La simple va sin contrato y con etapa; las demás, con contrato y sin etapa.
- **I14:** `CHECK ck_invoices_approval`. Una registrada no tiene fecha de aprobación y una aprobada sí; una anulada conserva la que tenía. `ck_invoices_dates` impide que la aprobación sea anterior a la factura.

## Ciclo de vida

| ID | Invariante | Fuente |
| --- | --- | --- |
| DOM-01 | Un contrato tiene exactamente un estado vigente, y solo cambia por una transición declarada | ADR-0017, reglas 2 y 11 |
| DOM-02 | `LIQUIDADO` exige C1–C8 a la vez, y solo se sale por reapertura con permiso propio | ADR-0017, reglas 4 y 10 |
| DOM-03 | Un contrato suspendido no admite otrosí, facturas ni edición contractual, salvo el otrosí que lo reanuda ([DEC-039](../decisiones/DEC-039-suspension-contratos.md)) | ADR-0017, regla 13 |
| DOM-04 | Solo las facturas `APROBADA` afectan saldos, condiciones de liquidación e indicadores | ADR-0020, regla 9 |
| DOM-05 | Una factura aprobada es inmutable en lo financiero; se corrige anulando y registrando de nuevo | ADR-0020, reglas 10–12 |
| DOM-06 | `ANULADA` es terminal, y una factura nunca se elimina | ADR-0020, reglas 12 y 15 |
| DOM-07 | Tras la primera factura aprobada del contrato, los valores económicos de sus conceptos son inmutables | ADR-0016, regla 14 |
| DOM-08 | Toda transición de estado queda en el historial, en la misma transacción | ADR-0017, regla 12 |

**Aplicadas en parte (2026-10-02), con contratos:** DOM-01 (`ctr_state` con `CHECK`; solo lo cambian las transiciones de `CONTRACT_TRANSITIONS`, y `historyRow` rechaza una no declarada) y DOM-08 (creación y paso a liquidación escriben `tbl_contract_status_history` en su transacción). DOM-03 se aplica desde el 2026-10-05 ([DEC-039](../decisiones/DEC-039-suspension-contratos.md)): `STATE_ALLOWS.SUSPENDED` solo admite el otrosí que reanuda el contrato, y suspender y reanudar escriben historial (DOM-08). DOM-07 se aplica desde el 2026-10-05: `updateConcept` responde 409 si cambia el costo directo o un porcentaje (`ECONOMIC_COLUMNS`) y el contrato tiene alguna factura con fecha de aprobación (`hasApprovedInvoices`). Cuentan también las anuladas después de aprobarse: el congelamiento no se deshace. La verificación ocurre bajo el bloqueo del contrato, el mismo que toma aprobar una factura. Fecha, prórroga y descripción siguen editables, y la corrección se hace con un otrosí. El detalle devuelve `economicsLocked` y el diálogo muestra esos campos en solo lectura. Probado contra la BD de desarrollo.

**Aplicadas (2026-10-05), con facturas ([DEC-042](../decisiones/DEC-042-facturas-area-ciclo-vida.md)):**

- **DOM-05:** `STATE_ALLOWS.APPROVED` solo admite extracto y descripción; lo demás responde 409.
- **DOM-06:** `CANCELLED` no tiene transiciones de salida, y no hay endpoint de eliminar.
- **DOM-03:** para las facturas. `STATE_ALLOWS` del contrato solo admite anticipo en ejecución, y liquidación y devolución en liquidación; se verifica al registrar y al aprobar.
- **DOM-08:** para las facturas, con `tbl_invoice_status_history`.
- **DOM-04:** se aplica desde el 2026-10-06 a los saldos de anticipo ([DEC-044](../decisiones/DEC-044-anticipo-amortizacion.md)): AF y AM suman solo facturas aprobadas. Faltan el retenido, las condiciones de liquidación y los indicadores.

## Cálculo

| ID | Invariante | Fuente |
| --- | --- | --- |
| DOM-10 | Ningún importe calculado se acepta del cliente | ADR-0026, regla 2 |
| DOM-11 | Porcentajes y tasas entre 0 y 100 | ADR-0016, ADR-0026 |
| DOM-12 | El neto a pagar nunca es negativo | ADR-0023, ADR-0026 |
| DOM-13 | Las tasas tributarias quedan congeladas en la factura | ADR-0026, regla 11 |
| DOM-14 | Una versión de fórmula publicada no se modifica | ADR-0026, regla 6 |

## Maestros, obras y proveedores

| ID | Invariante | Fuente |
| --- | --- | --- |
| DOM-20 | Un maestro referenciado por registros activos no se elimina (se desactiva) | ADR-0003, ADR-0004 |
| DOM-21 | Desactivar un maestro no altera los registros que ya lo usan | ADR-0003, ADR-0004, ADR-0012 |
| DOM-22 | Un proveedor es único por (tipo de identificación, número de documento) | ADR-0012 |
| DOM-23 | Un proveedor no se asigna dos veces a la misma obra | ADR-0012 |
| DOM-24 | El código de obra es único | ADR-0011 |
| DOM-25 | La etapa de un contrato pertenece a la obra del contrato, y su proveedor está asignado a esa obra | ADR-0015 |
| DOM-26 | Un número de documento siempre tiene tipo de identificación, y un tipo sin número no se guarda | ADR-0008, decisión 8 |
| DOM-27 | Un campo configurable obligatorio es visible, y uno visible aplica; un campo sin configuración no aplica | ADR-0006, decisión 4 |
| DOM-28 | Un contrato no recibe valor en un campo que no aplica para su tipo, salvo el que ya tenía (heredado), que se conserva sin cambios | ADR-0006, decisiones 6 a 8 |
| DOM-29 | Proveedor y obra de una factura de contrato son los del contrato; el proveedor de una factura simple está asignado a su obra, y su etapa es de esa obra | ADR-0020, regla 4; ADR-0023, decisión 3 |

**Aplicadas (2026-09-29), para el tipo de identificación:**

- **DOM-20:** eliminar (`remove` del patrón de maestro, [DEC-020](../decisiones/DEC-020-patron-maestro.md)) bloquea el tipo y cuenta los usuarios y proveedores no eliminados que lo usan; si hay alguno, responde 400. Además, las FK `tbl_users_identity_documents` y `tbl_providers_identity_document` impiden el borrado físico. Lo mismo para el tipo de proveedor (proveedores) y el tipo de dirección (contactos de proveedor).
- **DOM-21:** `saveUser` conserva el tipo que el usuario ya tenía aunque esté inactivo, y el selector lo incluye con `includeId` ([DEC-018](../decisiones/DEC-018-selector-maestros.md)).
- **DOM-26:** `CHECK ck_users_identification_type` en `tbl_users`, más validación en la ruta y en el service.

Tests en `server/test/modules/admin/identityDocuments/` y `security/users/users.service.test.js`. Para usuarios, el par (tipo, número) solo se controla en el service, sin `UNIQUE` (ver deuda).

**Aplicadas (2026-10-01), para proveedores ([DEC-031](../decisiones/DEC-031-area-proveedores.md), [DEC-032](../decisiones/DEC-032-identidad-proveedor.md)):**

- **DOM-22:** `UNIQUE uq_providers_identity_active (idd_id, prv_identification_active)` en `tbl_providers`, entre no eliminados (columna generada). El service verifica antes para responder 409 con el proveedor existente, y traduce el `P2002` de una carrera al mismo 409. Probado en vivo: cinco altas simultáneas con el mismo documento dejan una sola fila.
- **DOM-23:** `UNIQUE uq_work_providers_work_provider (wrk_id, prv_id)` en `tbl_work_providers`; el service responde 409 antes.
- **DOM-21:** desactivar un proveedor no toca sus asignaciones; el selector de asignación solo ofrece activos.

Tests en `server/test/modules/work/providers/`.

**Aplicada (2026-10-02), con contratos ([DEC-035](../decisiones/DEC-035-contratos-area-modelo.md)):**

- **DOM-25:** FK compuestas `tbl_contracts_work_stage (wks_id, wrk_id) → tbl_work_stages` y `tbl_contracts_work_provider (wrk_id, prv_id) → tbl_work_providers`, más validación en el service con mensaje claro. Probado en vivo: la BD rechaza una etapa ajena aunque se salte el service.
- **DOM-11 (conceptos):** `CHECK ck_contract_concepts_percentages` y `percentRule` en la ruta.

Tests en `server/test/modules/work/contracts/`.

**Aplicadas (2026-10-02), con la configuración de campos por tipo de contrato ([DEC-037](../decisiones/DEC-037-configuracion-campos-tipo-contrato.md)):**

- **DOM-27:**
  - `CHECK ck_contract_type_fields_hierarchy` en la configuración y en el historial de versiones;
  - validación en el service (400);
  - el editor no deja romper la jerarquía.

  Probado en vivo: la BD rechaza "visible sin aplicar" y "obligatorio oculto" aunque se salte el service.
- **DOM-28:** `enforceFields`, con la configuración resuelta dentro de la transacción. Se aplica al crear y editar el contrato, al crear un otrosí o el de liquidación, y al modificar un concepto. La BD no puede expresarlo.

Tests en `server/test/modules/admin/contractTypes/` y `server/test/modules/work/contracts/`.

**Aplicada (2026-10-05), con facturas ([DEC-042](../decisiones/DEC-042-facturas-area-ciclo-vida.md)):**

- **DOM-29:** son tres FK compuestas: `tbl_invoices_contract (ctr_id, wrk_id, prv_id) → tbl_contracts`, `tbl_invoices_work_provider (wrk_id, prv_id) → tbl_work_providers` y `tbl_invoices_work_stage (wks_id, wrk_id) → tbl_work_stages`. Una factura de contrato toma obra y proveedor del contrato bloqueado. Probado en vivo: la BD rechaza una factura con un proveedor que no es el del contrato. Tests en `server/test/modules/billing/invoices/`.
