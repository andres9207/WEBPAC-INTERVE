# ADR-0026: Cálculo y composición de valores de factura

## Estado

**Propuesto.**

**No existe ninguna fórmula de cálculo en el código.** Todas las fórmulas de este ADR son **PROPUESTA PENDIENTE DE VALIDACIÓN** con el área contable y tributaria, no hallazgos.

Este ADR es la **versión autoritativa** de la composición económica. [ADR-0016](0016-conceptos-contractuales.md), [ADR-0018](0018-polizas.md), [ADR-0019](0019-tipos-poliza.md), [ADR-0021](0021-facturacion-contrato-mayor.md) y [ADR-0023](0023-facturacion-simple.md) remiten aquí. Si difieren, prevalece este.

## Fecha

2026-09-10 — versión inicial. Decide el versionado de fórmulas que [ADR-0023](0023-facturacion-simple.md) dejaba pendiente.

## Contexto

El CORE calcula en cuatro niveles:

```text
CONCEPTO CONTRACTUAL   base antes de IVA · IVA · valor del concepto          ADR-0016
CONTRATO               valor vigente · anticipo pactado · retenido pactado    ADR-0016, 0024, 0025
PÓLIZA                 valor asegurado según la base del tipo                 ADR-0018, 0019
FACTURA                subtotal · IVA · retenciones · totales · movimientos   ADR-0021, 0023
```

Y el alcance plantea una regla de configuración que atraviesa todos ellos (sección 10):

> *"Si el tipo de contrato es 'mayor', debe solicitar AIU. Pero debe existir la posibilidad de apagar/desactivar la solicitud de AIU."*

```text
Configuración → Tipo de contrato → Contrato → AIU → Facturación
```

## Problema

1. **No hay fórmulas y el orden de la pantalla no las determina.** Ver [ADR-0023](0023-facturacion-simple.md), lecturas A y B.
2. **Dónde vive la regla del AIU**, si se puede apagar por contrato, qué porcentaje se guarda y cómo afecta al cálculo, a la facturación y a las pólizas.
3. **A quién pertenecen el AIU y el IVA** (sección 36 del alcance): ¿al contrato, al concepto o a la factura?
4. **Dónde se calcula.** Si la fórmula existe en el cliente y en el servidor, divergerán.
5. **Con qué aritmética.** El proyecto es JavaScript en ambas capas y no tiene librería decimal.
6. **Qué pasa con las facturas aprobadas cuando cambia una fórmula o una tarifa.**

## Estado actual

**No se encontró evidencia de implementación.**

| Elemento | Resultado verificado |
| --- | --- |
| Fórmulas de IVA, AIU, retenciones, totales o saldos | **Ninguna** en `server/` ni en `client/` |
| Configuración de tarifas de IVA, retención o ICA | **No existe** |
| Configuración de AIU por tipo de contrato | **No existe**; tampoco existe el tipo de contrato ([ADR-0006](0006-tipos-contrato.md)) |
| Columnas monetarias en el esquema | **Ninguna** en las 14 tablas |
| Librería de aritmética decimal | **Ninguna** en `server/package.json` ni `client/package.json` |
| Opciones numéricas del pool de `mysql2` | `db.config.js` no configura `decimalNumbers`, `supportBigNumbers` ni `bigNumberStrings` |
| Formato de importes en el cliente | `client/src/utils/formatNumber.js`: solo **presentación**. `formatNumber` convierte con `parseFloat`; `fCurrency` muestra hasta 2 decimales y `fCurrencyWithOutDecimal` ninguno. **Conviven las dos precisiones sin una regla** |
| Campo de moneda en formularios | `GenericFormSection.jsx` tiene tipo `currency` (captura, no cálculo) |

Respuestas a las preguntas del alcance:

| Pregunta | Respuesta |
| --- | --- |
| ¿Dónde está configurada la regla del AIU? ¿Depende del tipo? ¿Se modifica por contrato? | **No se encontró evidencia.** Decisión 6 |
| ¿Qué porcentaje de AIU se almacena? ¿Cómo afecta cálculo, facturación y pólizas? | No aplica. Decisiones 6 y 7 |
| ¿Las fórmulas están repartidas entre frontend y backend? | No existen en ninguna de las dos |
| ¿AIU e IVA pertenecen al contrato, al concepto o a la factura? | No aplica. Decisiones 7 y 8 |
| ¿Los porcentajes contractuales pueden modificarse después? | No aplica. Ver `Inmutabilidad` |
| ¿Los valores históricos deben congelarse? | No aplica. Decisión 5 |

## Decisión

1. **Existe un único módulo de cálculo, en el backend, y es la fuente de verdad.** Está formado por funciones puras —sin acceso a base de datos ni efectos— que reciben los datos capturados y devuelven la composición completa.

2. **El frontend no reimplementa fórmulas.** La previsualización se obtiene de un endpoint del backend que ejecuta el mismo módulo sobre el borrador del formulario, sin persistir nada.

3. **Toda la aritmética monetaria es decimal exacta.** Nunca se usa `Number` ni `parseFloat` para importes, porcentajes o saldos. Las columnas `DECIMAL` se reciben como cadena y así se tratan hasta entrar en la aritmética exacta.

   **Pendiente de validación:** librería decimal o enteros en la unidad monetaria mínima.

4. **Una única regla de redondeo para todo el CORE**, aplicada **por línea** de la composición, antes de sumar. **Pendiente de validación:** precisión —pesos enteros o dos decimales— y modo de redondeo. El cliente hoy tiene funciones de formato para ambas precisiones, lo que confirma que la regla no está decidida.

5. **Las fórmulas se versionan.** Cada factura guarda la **versión de fórmula** con que se calculó y se recalcula siempre con esa versión. Una versión publicada no se modifica: los cambios crean una versión nueva. La **instantánea de importes al aprobar** se conserva como evidencia, no como fuente de cálculo.

6. **Cadena de la regla del AIU:**

   | Nivel | Qué decide | Dónde vive |
   | --- | --- | --- |
   | **Tipo de contrato** | Si el AIU **aplica** por defecto. Para el tipo "mayor", sí | Configuración de campos del tipo de contrato ([ADR-0006](0006-tipos-contrato.md)) |
   | **Contrato** | **Apagar** la solicitud de AIU en un contrato concreto | Atributo booleano del contrato, con permiso propio y auditoría |
   | **Concepto** | Los porcentajes pactados de administración, imprevistos y utilidad | Concepto contractual ([ADR-0016](0016-conceptos-contractuales.md)) |
   | **Factura** | El porcentaje de utilidad aplicado, congelado | Detalle de la factura de liquidación ([ADR-0021](0021-facturacion-contrato-mayor.md)) |

   **Pendiente de validación:** si "apagar" se decide por contrato, como se propone, o solo en la configuración del tipo.

7. **El AIU pertenece al concepto contractual, desagregado en tres porcentajes**: administración (A), imprevistos (I) y utilidad (U). No pertenece al encabezado del contrato ni a la factura. La factura congela solo el porcentaje de utilidad que aplica.

   El desagregado es necesario porque la factura de liquidación pide `% Utilidad`, que no puede derivarse de un AIU total. **Pendiente de validación.**

8. **El IVA:**
   - El **porcentaje pactado** pertenece al concepto contractual.
   - El **porcentaje aplicado** se congela en cada factura.
   - El **valor** del IVA siempre se calcula y nunca se almacena.
   - **Con AIU, el IVA se liquida sobre la utilidad; sin AIU, sobre la base completa.** **Pendiente de validación tributaria.**

9. **Las retenciones tributarias** (retención en la fuente, retención de IVA, ICA) se capturan como **tasa**, se congelan en la factura y su valor se calcula ([ADR-0023](0023-facturacion-simple.md), decisión 6). Se propone una **configuración de tarifas por defecto con vigencia**, que hoy no existe; la tarifa se copia a la factura al capturarla. **Pendiente de validación.**

10. **Todos los porcentajes por defecto de una factura de contrato son razones sobre la misma base `B`** —la base vigente del contrato antes de IVA—: anticipo `A / B`, retenido `RP / B` y utilidad `UP / B`. Esto garantiza que, facturada toda la base, los tres cierren exactamente.

11. **No se almacena ningún resultado de cálculo.** Se almacenan los datos capturados, las tasas congeladas, la versión de fórmula y los movimientos de saldo (amortización, retenido, anticipo, devolución), que son hechos y no resultados ([ADR-0024](0024-amortizacion-anticipo.md)).

12. **Ningún importe calculado se acepta desde el cliente.** Si la petición lo trae, se ignora.

## Justificación

- **Un solo módulo en el backend**: dos implementaciones de la misma fórmula divergen con el tiempo —un redondeo distinto, una base mal copiada— y la divergencia solo aparece cuando un total del formulario no coincide con el aprobado. Una fórmula en el cliente tampoco es un control: el cliente puede enviar lo que quiera.

- **Previsualización por endpoint y no por paquete compartido**: cliente y servidor son JavaScript, así que un paquete común sería técnicamente posible. Pero `client/` y `server/` son proyectos separados sin configuración de espacio de trabajo compartido, y compartir código exigiría cambiar la construcción de ambos. El endpoint consigue una sola implementación sin tocar la construcción, a cambio de una ida y vuelta por previsualización.

- **Aritmética exacta**: en JavaScript, `0.1 + 0.2` da `0.30000000000000004`. Sumar cientos de facturas en `Number` produce diferencias de centavos que impiden que un saldo cierre en cero y bloquean las condiciones de liquidación `C2` y `C3`. El cliente ya usa `parseFloat` en `formatNumber.js`: es aceptable para mostrar y peligroso para calcular.

- **Redondeo por línea**: si se redondea solo el total, las líneas mostradas no suman el total mostrado, y el documento no cuadra a la vista. Redondear cada línea y sumar lo redondeado hace que el documento cuadre siempre.

- **Versionado de fórmulas**: si una factura aprobada se recalculara con la fórmula vigente, cambiar la base del ICA alteraría el total de facturas ya pagadas. Guardar el resultado evitaría eso pero crearía una copia desincronizable. Versionar la fórmula aplica el mismo principio que [ADR-0019](0019-tipos-poliza.md): **se congela la regla y se deriva el resultado.**

- **AIU desagregado en el concepto**: cada otrosí puede pactar su propio AIU; si viviera en el encabezado, un otrosí no podría. Si viviera en la factura, la factura podría inventar un AIU no pactado. Y sin desagregar, la factura de liquidación no tiene de dónde tomar su `% Utilidad`.

- **Apagar el AIU por contrato**: el alcance pide "la posibilidad de apagar" sin decir dónde. Si solo se pudiera en el tipo, un contrato excepcional obligaría a crear un tipo nuevo. Por contrato, con permiso y auditoría, cubre el caso sin multiplicar tipos.

- **Razones sobre la misma base**: el `% Utilidad` pactado en el concepto se aplica sobre el costo directo, pero el `VALOR` de la factura de liquidación ya incluye el AIU. Copiar el porcentaje del concepto a la factura calcularía una utilidad mayor que la pactada. Expresarlo como `UP / B` corrige esa diferencia de base.

## Alternativas consideradas

### Dónde se calcula

| | Alternativa | Evaluación |
| --- | --- | --- |
| **A** | Fórmula duplicada en cliente y servidor | Previsualización instantánea; divergencia garantizada con el tiempo. **Descartada** |
| **B** | Paquete JavaScript compartido | Una implementación en dos entornos; exige cambiar la construcción de dos proyectos independientes |
| **C** | **Backend con endpoint de previsualización** *(seleccionada)* | Una implementación sin cambios de construcción; una ida y vuelta por previsualización |
| **D** | Columnas generadas o vistas SQL | Aritmética `DECIMAL` exacta nativa; lógica de negocio en el esquema, difícil de versionar y probar |

### Aritmética

| | Alternativa | Evaluación |
| --- | --- | --- |
| **A** | `Number` de JavaScript | Sin dependencias; errores de punto flotante. **Descartada** |
| **B** | Librería de aritmética decimal | Exacta y expresiva; añade una dependencia |
| **C** | Enteros en la unidad monetaria mínima | Exacta sin dependencias; los porcentajes con decimales y los repartos exigen cuidado con el redondeo |
| **D** | Calcular en SQL con `DECIMAL` | Exacta, pero parte las fórmulas entre SQL y JavaScript |

B y C son válidas. **Pendiente de validación**, junto con la precisión monetaria.

### Cambio de fórmula o tarifa en el tiempo

| | Alternativa | Evaluación |
| --- | --- | --- |
| **A** | Recalcular siempre con la fórmula vigente | Altera facturas aprobadas. **Descartada** |
| **B** | Almacenar todos los resultados | Congela, pero crea copias desincronizables y contradice la decisión 11 |
| **C** | **Versión de fórmula + tasas congeladas + instantánea como evidencia** *(seleccionada)* | Congela la regla, deriva el resultado y conserva la prueba |

### IVA en contratos con AIU

| | Alternativa | Evaluación |
| --- | --- | --- |
| **A** | Siempre sobre la utilidad | Coherente con el régimen de AIU, incorrecto en contratos sin AIU |
| **B** | Siempre sobre la base completa | Simple; en contratos con AIU calcularía IVA sobre administración e imprevistos |
| **C** | **Según el contrato solicite AIU o no** *(propuesta, pendiente de validación tributaria)* | Liga el régimen de IVA a la misma decisión que activa el AIU |

## Modelo arquitectónico

### Cadena del AIU

```text
TIPO DE CONTRATO  ── campo AIU: aplica = sí (tipo "mayor")          ADR-0006
       │
       ▼
CONTRATO          ── solicita AIU: sí | no  (apagar, con permiso)    ADR-0015
       │
       ▼
CONCEPTO          ── % A · % I · % U   (solo si el contrato solicita AIU)   ADR-0016
       │
       ├──> BASE DEL CONCEPTO → anticipo, retenido, pólizas         ADR-0018, 0024, 0025
       │
       ▼
FACTURA           ── % utilidad congelado · IVA sobre la utilidad   ADR-0021
```

### Composición autoritativa — PROPUESTA PENDIENTE DE VALIDACIÓN

**Concepto contractual**

```text
CD = costo directo (capturado)

Si el contrato solicita AIU:
   ADMINISTRACIÓN  = CD × % A
   IMPREVISTOS     = CD × % I
   UTILIDAD        = CD × % U
   BASE            = CD + ADMINISTRACIÓN + IMPREVISTOS + UTILIDAD
   IVA             = UTILIDAD × % IVA
Si no:
   BASE            = CD
   IVA             = CD × % IVA

VALOR DEL CONCEPTO = BASE + IVA
```

**Contrato**

```text
B    Base vigente           = Σ BASE de conceptos no anulados
VV   Valor vigente          = Σ VALOR DEL CONCEPTO de conceptos no anulados
A    Anticipo pactado       = Σ BASE × % anticipo
RP   Retenido pactado       = Σ BASE × % retenido
UP   Utilidad pactada       = Σ UTILIDAD
```

**Póliza** ([ADR-0019](0019-tipos-poliza.md))

```text
COSTO_DIRECTO → CD      BASE_GRAVABLE → BASE      VALOR_TOTAL → BASE + IVA      SOLO_IVA → IVA
VALOR ASEGURADO = base del tipo (evaluada sobre el concepto amparado) × % de la póliza
```

**Factura simple** (lectura B de [ADR-0023](0023-facturacion-simple.md))

```text
 [1] VALOR                        ingresado
 [2] DCTO AI                      ingresado
 [3] SUBTOTAL          = [1] − [2]
 [4] IVA               = [3] × % IVA
 [5] FLETE                        ingresado
 [6] TOTAL FACTURADO   = [3] + [4] + [5]
 ─────────────────────────────────────────────────
 [7] RTE FUENTE        = [3] × % rte fuente
 [8] RTE IVA           = [4] × % rte IVA
 [9] RTE ICA           = [3] × tarifa ICA
[10] DCTO PRONTO PAGO             ingresado
[11] TOTAL (neto a pagar) = [6] − [7] − [8] − [9] − [10]
```

**Factura de anticipo**

```text
TOTAL = VALOR ANTICIPO
```

**Factura de liquidación** (`VALOR` es base antes de IVA, con el AIU incluido)

```text
 [1] VALOR                           ingresado
 [2] UTILIDAD         = [1] × % utilidad         (por defecto UP / B)
 [3] IVA              = [2] × % IVA              (con AIU; sin AIU: [1] × % IVA)
 [4] TOTAL FACTURADO  = [1] + [3]
 ─────────────────────────────────────────────
 [5] RTE FUENTE       = [1] × % retención fuente
 [6] RTE IVA          = [3] × % retención IVA
 [7] RTE ICA          = [1] × tarifa ICA
 [8] AMORTIZACIÓN     movimiento · por defecto mín([1] × A / B, AF − AM)
 [9] RETENIDO         movimiento · por defecto [1] × RP / B
[10] DCTO MATERIALES  ingresado
[11] NETO A PAGAR     = [4] − [5] − [6] − [7] − [8] − [9] − [10]
```

**Factura de devolución de retenido**

```text
TOTAL = VALOR DEVOLUCIÓN
```

### Puntos abiertos de la composición

| # | Punto | Opciones | ADR |
| --- | --- | --- | --- |
| P1 | Lectura de la factura simple | A: orden literal de pantalla · B: retenciones fuera de la base del IVA (propuesta) | 0023 |
| P2 | Base de la retención en la fuente | Subtotal o valor · subtotal + flete | 0023, 0021 |
| P3 | Base del ICA | Subtotal o valor · total facturado | 0023, 0021 |
| P4 | ¿El flete causa IVA? | No (propuesta) · sí | 0023 |
| P5 | ¿El descuento pronto pago reduce la base? | No (propuesta) · sí | 0023 |
| P6 | IVA con AIU | Sobre la utilidad (propuesta) · sobre la base | 0021, 0026 |
| P7 | `VALOR` de la factura de liquidación | Incluye AIU (propuesta) · es costo directo | 0021 |
| P8 | Descuento de materiales | Reduce el neto (propuesta) · reduce la base | 0021 |
| P9 | Semántica de `Descuento AI` | Administración e imprevistos · otro descuento | 0023 |
| P10 | Retenciones tributarias | Tasa congelada (propuesta) · valor capturado | 0023 |
| P11 | Impuestos en anticipo y devolución | Ninguno (propuesta, según alcance) · con impuestos | 0021 |
| P12 | Precisión y modo de redondeo | Pesos enteros · dos decimales; modo por definir | 0026 |
| P13 | Dónde se apaga el AIU | Por contrato (propuesta) · solo en el tipo | 0026 |

### Estructura del módulo de cálculo

```text
calculo/
  ├── v1/   componerConcepto · componerFacturaSimple · componerFacturaLiquidacion
  │         porcentajesPorDefecto · valorAsegurado
  ├── v2/   (solo cuando cambie una fórmula; v1 no se modifica)
  └── redondeo · aritmética decimal
```

La estructura es ilustrativa: fija la decisión de versionar, no los nombres.

## Reglas de negocio

**No se encontró evidencia en la implementación actual.** Reglas propuestas:

1. Todo cálculo monetario se ejecuta en el módulo de cálculo del backend.
2. Ningún importe calculado se acepta desde el cliente.
3. Toda la aritmética monetaria es decimal exacta.
4. El redondeo se aplica por línea con una regla única.
5. Cada factura registra la versión de fórmula con que se calculó.
6. Una versión de fórmula publicada no se modifica.
7. El AIU aplica según el tipo de contrato y puede apagarse por contrato con permiso propio.
8. Los porcentajes de AIU se pactan por concepto, desagregados en A, I y U.
9. Sin AIU no hay porcentajes de administración, imprevistos ni utilidad.
10. El IVA se calcula sobre la utilidad si el contrato solicita AIU, y sobre la base completa si no.
11. Las tasas tributarias se capturan, se congelan en la factura y nunca cambian por un cambio de configuración.
12. Los porcentajes por defecto de la factura de contrato se expresan sobre la base vigente del contrato.
13. El neto a pagar no puede ser negativo.
14. Los porcentajes y tasas están entre 0 y 100.

## Seguridad

- **El cliente nunca es fuente de un importe.** Subtotal, IVA, retenciones, totales, neto, valor asegurado y porcentajes por defecto se recalculan en el servidor.
- **Las tasas se validan en rango en el servidor.** Una tasa de retención en cero reduce lo que se retiene sin cambiar ningún valor visible.
- **Apagar el AIU es una acción con efecto económico**: elimina la utilidad del régimen de IVA y cambia la base de anticipo, retenido y pólizas. Requiere permiso propio y auditoría.
- **Publicar una versión de fórmula o cambiar tarifas por defecto** tiene efecto sobre todas las facturas futuras y requiere permiso restringido.
- **El endpoint de previsualización no persiste nada** y exige los mismos permisos que el registro, para no convertirse en una vía de consulta de datos contractuales.

## Autorización

```text
CONFIGURAR TARIFAS TRIBUTARIAS
APAGAR SOLICITUD DE AIU EN CONTRATO
PUBLICAR VERSIÓN DE FÓRMULA          ← operación de despliegue, no de interfaz
```

La configuración del AIU por tipo de contrato usa `CONFIGURAR CAMPOS DEL TIPO DE CONTRATO` de [ADR-0006](0006-tipos-contrato.md).

**Ninguno existe hoy.**

## Auditoría

| Evento | Nivel | Qué se registra |
| --- | --- | --- |
| Apagar o encender el AIU de un contrato | **Funcional** | Valor anterior y nuevo, usuario, motivo |
| Cambio de tarifa tributaria por defecto | **Funcional** | Tarifa anterior y nueva, vigencia |
| Publicación de una versión de fórmula | **Funcional** | Versión, fecha, cambio descrito |
| Aprobación de factura | **Funcional** | Instantánea de la composición completa y versión usada |
| Discrepancia entre recálculo e instantánea | **Funcional** | Factura, versión, diferencia |

## Validaciones

| Regla | Frontend | Backend | Base de datos | Clasificación |
| --- | --- | --- | --- | --- |
| Importes no negativos | Propuesta | **Obligatoria** | `CHECK` | Regla de negocio |
| Porcentajes y tasas en 0–100 | Propuesta | **Obligatoria** | `CHECK` | Regla de negocio |
| Neto a pagar ≥ 0 | Aviso | **Obligatoria** | No expresable | Regla de negocio |
| Porcentajes de AIU solo si el contrato lo solicita | Oculta campos | **Obligatoria** | `CHECK` en el concepto | Regla de negocio |
| Importes calculados no recibidos del cliente | No aplica | **Obligatoria** | No se almacenan | **Seguridad** |
| Versión de fórmula existente | No aplica | **Obligatoria** | `NOT NULL` | Integridad |
| Aritmética exacta | No aplica | **Obligatoria** | `DECIMAL` | **Integridad** |

## Integridad de datos

- **`DECIMAL` con precisión fija** para importes y porcentajes en todas las tablas del CORE. **Nunca `FLOAT` ni `DOUBLE`.**
- `CHECK` sobre rangos de porcentajes, tasas e importes.
- Versión de fórmula `NOT NULL` en el encabezado de factura.
- Tarifas por defecto con vigencia (desde, hasta) sin solapamiento por impuesto. El solapamiento no es expresable con `CHECK`; se valida en el servicio.
- Las columnas `DECIMAL` llegan como cadena al servidor con la configuración actual del pool y **no deben convertirse con `parseFloat`**.

## Transacciones

El módulo de cálculo es puro y **no abre transacciones**. Se invoca dentro de las transacciones de registro y aprobación de [ADR-0027](0027-integridad-transaccional.md), sobre datos leídos bajo el bloqueo del contrato.

La instantánea de la aprobación y el cambio de estado van en la misma transacción: una factura aprobada sin instantánea es un defecto.

## Concurrencia

| Escenario | Riesgo | Protección |
| --- | --- | --- |
| Se publica una versión de fórmula mientras se registra una factura | Factura calculada con una mezcla de versiones | La factura toma una sola versión al calcular y la guarda en su transacción |
| Cambia una tarifa por defecto mientras se captura | Factura con tarifa distinta de la mostrada | La tarifa se congela en la captura; el servidor valida la recibida, no la sustituye |
| Cambian los saldos entre previsualizar y aprobar | Porcentajes por defecto obsoletos | Revalidación bajo bloqueo en la aprobación ([ADR-0024](0024-amortizacion-anticipo.md)) |

El cálculo no consume recursos finitos. Los riesgos de concurrencia reales están en los saldos, no en las fórmulas.

## Fuente de verdad

### Datos financieros (sección 27 del alcance)

| Dato | ¿Almacenado? | ¿Calculado? | ¿Derivado? | ¿Configurable? | Fuente de verdad |
| --- | --- | --- | --- | --- | --- |
| Valor del contrato | No | **Sí** | | | Σ valor de conceptos |
| Valor inicial | Costo directo y porcentajes | **Sí** | | | Concepto `VALOR_INICIAL` |
| Valor de un otrosí | Costo directo y porcentajes | **Sí** | | | Concepto `OTROSI` |
| Anticipo pactado | Porcentaje por concepto | **Sí** | | | Conceptos |
| Amortización | **Sí** — movimiento | Valor por defecto | | | Factura de liquidación |
| Retenido | **Sí** — movimiento | Valor por defecto | | | Factura de liquidación |
| Devolución de retenido | **Sí** — movimiento | | | | Factura de devolución |
| Saldo de anticipo | No | **Sí** | | | `AF − AM` |
| Saldo de retenido | No | **Sí** | | | `R − D` |
| IVA | Porcentaje congelado | **Sí** | | Tarifa por defecto (pendiente) | Concepto y factura |
| Retenciones tributarias | Tasa congelada | **Sí** | | Tarifa por defecto (pendiente) | Factura |
| Total de factura | Solo instantánea como evidencia | **Sí** | | | Composición versionada |
| Solicitud de AIU | **Sí** en el contrato | | Por defecto del tipo | **Sí** en el tipo | Tipo de contrato y contrato |

### Campos calculados (sección 38 del alcance)

| Campo | Origen | Fórmula | Responsable | Persistencia | Momento de actualización |
| --- | --- | --- | --- | --- | --- |
| Fecha fin | Plazo, unidad, prórrogas, suspensiones | `inicio + plazo + Σ prórrogas + días suspendidos` | Backend ([ADR-0015](0015-contratos.md)) | **Persistida** (desnormalizada) | En cada evento que la afecta |
| Fecha vencimiento | Pendiente | Pendiente | — | No se implementa | — |
| Valor IVA | Base o utilidad y % congelado | Ver composición | Backend | No | En cada consulta |
| Subtotal | Valor − descuento AI | `[1] − [2]` | Backend | No | En cada consulta |
| Total facturado y neto | Composición | Ver composición | Backend | Solo instantánea al aprobar | En cada consulta |
| Amortización por defecto | Valor de la factura y saldos | `mín(VALOR × A / B, AF − AM)` | Backend | El valor final sí, como movimiento | Al abrir y al registrar |
| Saldo de anticipo | Movimientos | `AF − AM` | Backend ([ADR-0024](0024-amortizacion-anticipo.md)) | No | En cada consulta |
| Saldo de retenido | Movimientos | `R − D` | Backend ([ADR-0025](0025-retenciones.md)) | No | En cada consulta |
| Estado de liquidación | Condiciones `C1..C8` | Todas simultáneamente | Backend ([ADR-0017](0017-estados-contrato.md)) | Estado sí; condiciones no | Tras cada aprobación |

## Inmutabilidad

| Elemento | Inmutabilidad |
| --- | --- |
| Versión de fórmula publicada | **Absoluta** |
| Versión de fórmula registrada en una factura | **Absoluta** |
| Tasas congeladas en una factura aprobada | **Absoluta** |
| Instantánea de aprobación | **Absoluta** |
| Porcentajes de AIU, IVA, anticipo y retenido de los conceptos | Desde la primera factura aprobada del contrato ([ADR-0016](0016-conceptos-contractuales.md)) |
| Solicitud de AIU del contrato | Desde la primera factura aprobada del contrato |
| Tarifas por defecto | Modificables con vigencia nueva; sin efecto sobre facturas existentes |

**Los valores históricos no se congelan copiando resultados, sino congelando sus reglas**: tasas, porcentajes y versión de fórmula. El resultado siempre es reproducible.

## Consecuencias

### Positivas

- Una sola implementación de cada fórmula, en un lugar verificable.
- Resultados reproducibles para siempre, sin almacenar copias desincronizables.
- Cambiar una fórmula o una tarifa no altera facturas existentes.
- Saldos que cierran en cero exacto gracias a la aritmética decimal.
- La cadena del AIU queda explícita y auditable de punta a punta.
- Porcentajes por defecto coherentes entre sí por expresarse sobre la misma base.

### Negativas

- **Ninguna fórmula puede implementarse hasta cerrar los puntos abiertos P1 a P13.**
- La previsualización exige una ida y vuelta al servidor.
- Mantener versiones de fórmula acumula código que no puede borrarse mientras existan facturas que lo usen.
- Introduce una dependencia de aritmética decimal o una convención de enteros que hoy no existe.
- Desagregar el AIU añade dos campos a cada concepto.

## Riesgos

| Riesgo | Severidad | Descripción |
| --- | --- | --- |
| Fórmulas implementadas sin validación tributaria | **Crítico** | IVA o retenciones mal calculados en todas las facturas |
| Importes calculados aceptados del cliente | **Crítico** | Netos manipulados sin cambiar valores visibles |
| Punto flotante en importes | **Alto** | Saldos que no cierran; `parseFloat` ya se usa en el cliente para formato |
| Fórmula duplicada en cliente y servidor | **Alto** | Totales de formulario distintos de los aprobados |
| Recalcular facturas aprobadas con fórmula nueva | **Alto** | Altera documentos ya pagados |
| IVA sobre la base completa en contratos con AIU | **Alto** | Sobrecobro de IVA si se omite el régimen de AIU |
| Porcentaje de utilidad copiado del concepto | **Medio** | Base distinta: utilidad sobrestimada |
| Redondeo inconsistente | **Medio** | Documentos cuyas líneas no suman el total; hoy conviven formatos con y sin decimales |
| AIU apagado sin auditoría | **Medio** | Cambio del régimen tributario de un contrato sin responsable |

## Impacto técnico

### Frontend

- Sin fórmulas propias. Previsualización por endpoint.
- `formatNumber.js` para presentar, nunca para calcular; adoptar una sola precisión cuando se decida P12.
- Campos de AIU visibles solo si el contrato solicita AIU.
- Presentación de la factura en dos bloques: precio y pago.

### Backend

- Módulo de cálculo puro y versionado.
- Endpoint de previsualización sin persistencia.
- Aritmética decimal exacta y regla de redondeo única.
- Configuración de tarifas con vigencia.

### Base de datos

- `DECIMAL` en todo el CORE; `CHECK` de rangos.
- Columna de versión de fórmula en el encabezado de factura.
- Tabla de tarifas por defecto con vigencia, si se confirma.
- Atributo "solicita AIU" en el contrato y porcentajes A, I y U en el concepto.

### Infraestructura

- **No se encontró evidencia** de integración con facturación electrónica ni servicios tributarios externos. Si se incorporan, este módulo es el punto de verdad que debe conciliarse con ellos.

## Arquitectura objetivo

| Área | Actual | Objetivo | Brecha |
| --- | --- | --- | --- |
| Fórmulas | No existen | Módulo único, puro y versionado en backend | **Alta** |
| Previsualización | No existe | Endpoint del backend | **Media** |
| Aritmética | Sin librería decimal; `parseFloat` en formato | Decimal exacta | **Alta** |
| Redondeo | Dos precisiones de formato sin regla | Una regla por línea | **Media** |
| AIU | No existe | Tipo → contrato → concepto (A, I, U) → factura | **Alta** |
| IVA | No existe | % en concepto, congelado en factura, valor calculado | **Alta** |
| Tarifas | No existen | Configuración con vigencia, congeladas en factura | **Media** |
| Historia | No existe | Versión de fórmula + instantánea | **Alta** |

## Brechas identificadas

| # | Brecha | Severidad |
| --- | --- | --- |
| B1 | **Puntos abiertos P1 a P13 sin validar** | **Crítica** — decisión de negocio bloqueante |
| B2 | No existe ninguna fórmula ni módulo de cálculo | **Alta** |
| B3 | Sin librería de aritmética decimal ni convención de enteros | **Alta** |
| B4 | Sin regla de redondeo; el cliente formatea con y sin decimales | **Media** |
| B5 | Sin configuración de tarifas tributarias | **Media** |
| B6 | Sin configuración de AIU por tipo de contrato ni por contrato | **Alta** |
| B7 | Sin columnas `DECIMAL` en el esquema | **Alta** |
| B8 | Ninguna ruta del backend verifica permisos | **Crítica** |

## Plan de implementación

Recomendación derivada del análisis. **No fue ejecutada.**

**Fase 0 — Validación contable y tributaria (B1).** Bloqueante.
**Fase 1 — Convenciones (B3, B4, B7):** precisión, redondeo y aritmética exacta para todo el CORE.
**Fase 2 — Módulo de cálculo (B2):** funciones puras versionadas y pruebas con casos validados por contabilidad.
**Fase 3 — Configuración (B5, B6):** tarifas con vigencia y cadena del AIU.
**Fase 4 — Integración:** previsualización, registro y aprobación con versión e instantánea.
**Fase 5 — Permisos (B8).**

## ADR relacionados

- [ADR-0023 — Facturación simple](0023-facturacion-simple.md) · [ADR-0021 — Facturación de contrato mayor](0021-facturacion-contrato-mayor.md)
- [ADR-0016 — Conceptos contractuales](0016-conceptos-contractuales.md) — AIU e IVA pactados
- [ADR-0018 — Pólizas](0018-polizas.md) · [ADR-0019 — Tipos de póliza](0019-tipos-poliza.md) — bases del valor asegurado
- [ADR-0024 — Anticipo](0024-amortizacion-anticipo.md) · [ADR-0025 — Retenido](0025-retenciones.md) — porcentajes por defecto
- [ADR-0006 — Tipos de contrato](0006-tipos-contrato.md) — aplicabilidad del AIU
- [ADR-0020 — Facturación](0020-facturacion.md) · [ADR-0027 — Integridad transaccional](0027-integridad-transaccional.md)

## Referencias

- `docs/prompt_adr_core.md` — secciones 9, 10, 17, 18, 22, 27, 36, 37 y 38
- `server/package.json`, `client/package.json` — sin librería decimal
- `server/src/common/configs/db.config.js` — pool sin opciones numéricas
- `client/src/utils/formatNumber.js` — `parseFloat`, `fCurrency` y `fCurrencyWithOutDecimal`
- `client/src/ui-component/extended/GenericFormSection.jsx` — tipo de campo `currency`
