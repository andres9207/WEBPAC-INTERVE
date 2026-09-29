# Estándar de dominio

Cómo se representan las reglas de negocio del dominio (contratos de materiales con proveedores, contratistas y subcontratistas). El qué de cada regla está en los ADR; aquí va dónde y cómo se implementa.

## Dónde viven las reglas

| Tipo de regla | Quién la garantiza | Ejemplo |
| --- | --- | --- |
| Validación de interfaz | Cliente (UX) y **además** el esquema del endpoint | Campo obligatorio |
| Regla de negocio | Service, dentro de la transacción y bajo bloqueo | La amortización no supera el anticipo facturado |
| Regla de seguridad | Middleware (`requirePermission`) + service | Solo quien tiene permiso aprueba una factura |
| Integridad de datos | Base de datos (FK, `UNIQUE`, `CHECK`) + service | Número de contrato único por obra |

Una validación del cliente nunca es suficiente por sí sola. Fuente: `docs/prompt_adr.md` §23 y ADR-0014.

## Dinero

- **REQUIERE DECISIÓN** (backlog `DEC-06`): precisión, redondeo y si se usa una librería decimal o enteros. Hasta que se decida no se implementa ningún cálculo monetario.
- Ya decidido en ADR-0026 (propuesto): todo cálculo monetario en un módulo único del backend; ningún importe calculado se acepta del cliente; aritmética exacta; redondeo por línea con una regla única; cada factura guarda la versión de fórmula con que se calculó.
- En la BD, nunca `FLOAT` ni `DOUBLE` para dinero.

## Porcentajes y tasas

Entre 0 y 100. Las tasas tributarias se capturan y **se congelan** en el documento que las usa: un cambio de configuración posterior no altera lo ya registrado (ADR-0026).

## Fechas

La BD y el servidor trabajan en **UTC**; la hora local se aplica al mostrar ([DEC-009](../decisiones/DEC-009-zona-horaria.md)). Fechas derivadas, como la fecha fin de un contrato, se calculan en el backend y nunca se capturan (ADR-0015).

## Saldos

Se calculan desde los movimientos aprobados, bajo bloqueo; no se guardan como columnas que haya que mantener sincronizadas (ADR-0027, regla 7). Si un saldo se materializa por rendimiento, es derivado y se reconcilia, nunca es la fuente de verdad.

## Inmutabilidad

Tras aprobarse, lo financiero no se edita: se anula y se registra de nuevo (ADR-0020). Tras la primera factura aprobada de un contrato, los valores económicos de sus conceptos son inmutables (ADR-0016).

## Vocabulario

| Término | Significado | ADR |
| --- | --- | --- |
| Obra | Proyecto de construcción; raíz de su agregado | 0011 |
| Proveedor | Empresa única por (tipo, número de documento), reutilizable entre obras | 0012 |
| Contrato | Pertenece a una obra, un proveedor, una etapa y un tipo de contrato | 0015 |
| Concepto | Componente económico del contrato: `VALOR_INICIAL` (1), `OTROSI` (0..N), `OTROSI_LIQUIDACION` (0..1) | 0016 |
| Anticipo / amortización | Pago adelantado pactado y su descuento en facturas de liquidación | 0024 |
| Retenido | Porcentaje retenido en facturas de liquidación y devuelto al final. **Distinto** de las retenciones tributarias | 0025 |
| Factura simple | Factura sin contrato | 0023 |

Los estados y las reglas completas de cada concepto están en su ADR.
