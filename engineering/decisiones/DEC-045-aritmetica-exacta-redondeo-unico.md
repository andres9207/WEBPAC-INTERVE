# DEC-045 — Aritmética decimal exacta y una sola regla de redondeo, aplicada por línea antes de sumar

**Fecha:** 2026-10-06 · **Tipo:** Obligatoria · **ADR:** [0026](../adr/0026-calculos-facturacion.md), [0024](../adr/0024-amortizacion-anticipo.md), [0021](../adr/0021-facturacion-contrato-mayor.md), [0025](../adr/0025-retenciones.md)

Cierra la tarea FND-BE-28 del backlog. Completa [DEC-028](DEC-028-convencion-monetaria.md), que fijó los importes y dejó fuera los porcentajes, las razones y la regla por línea. El usuario lo pidió el 2026-10-06.

## Contexto

DEC-028, DEC-036 y DEC-044 ya calculaban con `Prisma.Decimal`, pero quedaban cuatro problemas:

- El redondeo estaba repetido en tres archivos: `contractTerms.js`, `advanceTerms.js` y `contracts.service.js`.
- Algunos porcentajes del servidor pasaban por `Number`: el tope de 100 en `percentRule` y las comparaciones de `contractFields.js`.
- En el cliente había formateadores numéricos con `parseFloat` o con `Number`. Uno de ellos mostraba porcentajes.
- Nada impedía volver a introducir punto flotante.

## Decisión

- **Una sola librería: `Prisma.Decimal`** (es decimal.js). No se agrega dependencia. Las columnas `DECIMAL` llegan como `Decimal` o cadena y así se tratan hasta entrar en el cálculo.
- **Una sola regla de redondeo: medio hacia arriba** (`ROUNDING = ROUND_HALF_UP`), en `common/utils/money.utils.js`. Es el único archivo del servidor que redondea.

  | Qué | Escala | Columna | Función |
  | --- | --- | --- | --- |
  | Importe | 2 | `DECIMAL(18,2)` | `roundMoney`, `toMoney`, `moneyText` |
  | Porcentaje pactado | 2 | `DECIMAL(5,2)` | `toPercent`, `percentText` |
  | Razón derivada (evidencia) | 6 | `DECIMAL(9,6)` | `roundRatio`, `ratioPercent`, `ratioText` |

- **Por línea, antes de sumar.**
  - Cada parte porcentual de un importe (AIU, IVA, anticipo, retenido, amortización) se calcula con `percentOf(base, %)`, que redondea esa línea.
  - Las sumas (`sumMoney`) operan sobre líneas ya redondeadas y no vuelven a redondear.
  - Así el total coincide siempre con la suma de lo que se muestra.
  - Ejemplo: tres líneas de 0,05 al 10 % dan 0,01 cada una, y el total es 0,03. Redondear el total daría 0,02.
- **El servidor no usa `parseFloat`, ni `.toNumber()`, ni `Number` o `Math` sobre importes, porcentajes o saldos.**
  - Lo vigila `test/common/floatingPoint.guard.test.js`: falla con el archivo y la línea.
  - También falla si aparece `toDecimalPlaces` o `ROUND_HALF` fuera de `money.utils.js`.
  - Dos excepciones, con su motivo en la lista `ALLOWED` del test: el avance del plazo de obra en `term.utils.js` y `works.service.js`. Es un indicador de días, no dinero.
- **El cliente no calcula importes y formatea sobre el texto.**
  - `fMoneyText` para importes y `fPercentText` para porcentajes. `fPercentText` redondea medio hacia arriba sobre los dígitos con `BigInt`.
  - Se eliminaron `formatNumber`, `fCurrency`, `fCurrencyWithOutDecimal`, `fPercent`, `fNumber` y `fShortenNumber`. Trabajaban con `Number` y no los usaba nadie más.
- **No altera nada guardado.** Los resultados son idénticos a los de antes: el cambio unifica dónde vive la regla, no la regla.

## Descartado

- **Una librería nueva** (`big.js`, `dinero.js`): `Prisma.Decimal` ya es aritmética exacta.
- **Redondear solo el total:** el total no coincidiría con la suma de las líneas mostradas.
- **Redondeo bancario (medio al par):** DEC-028 ya fijó medio hacia arriba y no hay motivo contable registrado para cambiarlo.

## Qué implica

- Todo cálculo nuevo de dinero usa las funciones de `money.utils.js`. Una parte porcentual se calcula con `percentOf`, nunca con `times(…).dividedBy(100)` suelto.
- Una columna de porcentaje derivado nueva usa `DECIMAL(9,6)` y `ratioText`.
- **Pendiente:** el visto bueno contable de la batería de casos límite (criterio 3 de FND-BE-28). La batería está en `money.utils.test.js`.

## Dónde

- `server/src/common/utils/money.utils.js`.
- Lo usan `contractTerms.js` (`conceptAmounts`), `advanceTerms.js`, `contracts.service.js`, `invoices.service.js`, `validation.utils.js` (`percentRule`) y `contractFields.js`.
- Tests: `server/test/common/utils/money.utils.test.js` (casos límite) y `server/test/common/floatingPoint.guard.test.js` (regla de revisión).
- Cliente: `client/src/utils/formatNumber.js` (`fMoneyText`, `fPercentText`).
