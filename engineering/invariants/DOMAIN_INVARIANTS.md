# Invariantes de dominio

> **Todas PROPUESTAS.** Salen de los ADR del dominio y ninguna está implementada: no existen las tablas. Al implementar un módulo, sus invariantes pasan a APLICADA con el mecanismo real. Las que dependen de una decisión de negocio pendiente lo indican.

## Saldos del contrato (ADR-0027, catálogo I1–I5)

Se validan bajo bloqueo del contrato al registrar **y** al aprobar; nunca se guardan como columnas.

| ID | Invariante | Mecanismo previsto | Fuente |
| --- | --- | --- | --- |
| I1 | Anticipo facturado (aprobado) ≤ anticipo pactado | Bloqueo + revalidación | ADR-0024 |
| I2 | Amortizado ≤ anticipo facturado | Bloqueo + revalidación | ADR-0024 |
| I3 | Retenido devuelto ≤ retenido acumulado | Bloqueo + revalidación | ADR-0025 |
| I4 | Retenido acumulado ≤ retenido pactado — *pendiente: backlog DEC-11* | Bloqueo + revalidación | ADR-0025 |
| I5 | Σ facturas de liquidación ≤ base vigente — *pendiente: backlog DEC-08* | Bloqueo + revalidación | ADR-0021 |

## Estructura (ADR-0027, catálogo I6–I15)

| ID | Invariante | Mecanismo previsto | Fuente |
| --- | --- | --- | --- |
| I6 | Exactamente un `VALOR_INICIAL` por contrato | `UNIQUE` sobre columna generada + creación en la misma transacción que el contrato | ADR-0016 |
| I7 | Como máximo un `OTROSI_LIQUIDACION` por contrato | `UNIQUE` sobre columna generada | ADR-0016 |
| I8 | Número de otrosí único y secuencial por contrato, asignado por el backend | `UNIQUE (contrato, número)` + bloqueo | ADR-0016 |
| I9 | Como máximo una suspensión abierta por contrato | `UNIQUE` sobre columna generada | ADR-0017 |
| I10 | Una versión vigente por póliza | `UNIQUE` sobre columna generada | ADR-0018 |
| I11 | Número de factura único por proveedor — *ámbito pendiente: backlog DEC-17* | `UNIQUE` | ADR-0020 |
| I12 | Número de contrato único por obra — *ámbito pendiente: backlog DEC-17* | `UNIQUE` | ADR-0015 |
| I13 | Solo la factura `SIMPLE` puede no tener contrato | `CHECK` | ADR-0020 |
| I14 | Estado `APROBADA` ⇔ tiene fecha de aprobación | `CHECK` | ADR-0020 |
| I15 | Fecha fin del contrato ≥ fecha de inicio | `CHECK` | ADR-0015 |

## Ciclo de vida

| ID | Invariante | Fuente |
| --- | --- | --- |
| DOM-01 | Un contrato tiene exactamente un estado vigente, y solo cambia por una transición declarada | ADR-0017, reglas 2 y 11 |
| DOM-02 | `LIQUIDADO` exige C1–C8 a la vez, y solo se sale por reapertura con permiso propio | ADR-0017, reglas 4 y 10 |
| DOM-03 | Un contrato suspendido no admite otrosí, facturas ni edición contractual | ADR-0017, regla 13 |
| DOM-04 | Solo las facturas `APROBADA` afectan saldos, condiciones de liquidación e indicadores | ADR-0020, regla 9 |
| DOM-05 | Una factura aprobada es inmutable en lo financiero; se corrige anulando y registrando de nuevo | ADR-0020, reglas 10–12 |
| DOM-06 | `ANULADA` es terminal, y una factura nunca se elimina | ADR-0020, reglas 12 y 15 |
| DOM-07 | Tras la primera factura aprobada del contrato, los valores económicos de sus conceptos son inmutables | ADR-0016, regla 14 |
| DOM-08 | Toda transición de estado queda en el historial, en la misma transacción | ADR-0017, regla 12 |

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
