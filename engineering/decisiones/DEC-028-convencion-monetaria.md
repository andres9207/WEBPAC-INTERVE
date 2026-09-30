# DEC-028 — Importes en `DECIMAL(18,2)`, redondeo a dos decimales solo si sobran

**Fecha:** 2026-09-30 · **Tipo:** Obligatoria · **ADR:** [0026](../adr/0026-calculos-facturacion.md), [0011](../adr/0011-obras.md)

Resuelve la decisión de negocio DEC-06 del backlog (`docs/backlog/BACKLOG.md`) para importes, y la parte de precisión de P12 en ADR-0026.

## Contexto

El esquema no tenía ninguna columna monetaria ni convención de precisión. ADR-0026 (decisión 4) dejó pendientes la precisión (pesos enteros o dos decimales) y el modo de redondeo. Obras es la primera tabla con importes.

## Decisión

- **Importes en `DECIMAL(18,2)`.** Nunca `FLOAT` ni `DOUBLE`. Aplica también a las cantidades con decimales de la obra (área).
- **Redondeo solo cuando el valor trae más de dos decimales**: se redondea a dos, con medio hacia arriba (`0,005 → 0,01`). Un valor con dos decimales o menos se guarda tal cual.
- **El servidor redondea**, con `Prisma.Decimal` (`toDecimalPlaces(2, ROUND_HALF_UP)`), antes de validar y guardar. Viene con Prisma: no se agrega dependencia.
- **Sin `Number` ni `parseFloat` para importes en el servidor.** Un importe se recibe como cadena y así se trata hasta entrar en `Prisma.Decimal`.
- **El cliente no calcula importes.** Los envía como cadena y solo los formatea para mostrarlos.

## Descartado

- **Pesos enteros**: el área confirmó dos decimales.
- **Rechazar un valor con más de dos decimales**: se prefirió redondearlo.
- **Una librería decimal nueva** (`decimal.js`, `big.js`): `Prisma.Decimal` ya es `decimal.js`.

## Qué implica

- Toda columna de importe nueva usa `DECIMAL(18,2)`. Un PR con `FLOAT` o `DOUBLE` para dinero se rechaza.
- **Fuera de esta ficha**: porcentajes, tarifas y la regla de redondeo por línea de la facturación (ADR-0026, decisión 4). Se fijan con facturación.

## Dónde

Migración `0038` (`tbl_works`) · `server/src/common/utils/money.utils.js` (`toMoney`, `moneyText`) · `moneyRule` en `validation.utils.js` · `fMoneyText` en `client/src/utils/formatNumber.js` (formatea el texto, sin pasar por `Number`)
