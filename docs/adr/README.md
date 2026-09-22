# Architecture Decision Records (ADR)

Registro y Control de Procesos Administrativos de Contratos de Materiales con Proveedores, Contratistas y Subcontratistas.

---

## 1. Objetivo

Estos ADR documentan las decisiones arquitectónicas del sistema: qué se decidió, por qué, qué alternativas se evaluaron y qué consecuencias tiene cada decisión en frontend, backend, base de datos e infraestructura.

Hay dos grupos:

| Grupo | ADR | Alcance | Origen |
| --- | --- | --- | --- |
| **Base** | 0001 – 0014 | Seguridad, maestros, obras, proveedores, auditoría y autorización | `docs/prompt_adr.md` |
| **CORE** | 0015 – 0027 | Contratos, conceptos, estados, pólizas, facturación, anticipo, retenido, cálculos e integridad transaccional | `docs/prompt_adr_core.md` |

---

## 2. Advertencia sobre el estado del repositorio

El análisis se hizo sobre el código real del repositorio y sobre `database/bdintervewebpack.sql`.

> **El repositorio es una plantilla base.** Tiene autenticación, seguridad (usuarios, perfiles, permisos), documentos, notificaciones e integración con Microsoft Graph. **No implementa ningún módulo de negocio**: ni obras, proveedores, maestros, contratos, pólizas o facturación. Solo hay 14 tablas, ninguna del CORE, y ninguna columna monetaria.

Por eso casi todos los ADR están en estado `Propuesto`:

| Situación | Cómo se documenta |
| --- | --- |
| El módulo existe en el código | `Aceptado` — decisión real encontrada, más sus brechas |
| El módulo **no** existe | `Propuesto` — decisión recomendada, marcada como propuesta |

**No se inventó ninguna tabla, permiso, endpoint, regla ni fórmula.** Todo nombre presentado como existente es verificable en el código o en el esquema; todo lo propuesto está marcado como tal. Las fórmulas del CORE son **PROPUESTA PENDIENTE DE VALIDACIÓN**.

---

## 3. Convenciones

- Nombre de archivo: `NNNN-nombre-modulo.md`. `NNNN` es un consecutivo de 4 dígitos que nunca se reutiliza ni se reordena.
- Todos los ADR usan la misma estructura de secciones. El CORE añade `Concurrencia`, `Fuente de verdad` e `Inmutabilidad`.
- Si una sección no aplica: `No aplica.` Si no hay evidencia: `No se encontró evidencia en la implementación actual.`
- Toda sección distingue **estado actual** (lo que hace el sistema), **decisión** (lo que se considera válido) y **brechas** (la diferencia).
- `Pendiente de validación` marca decisiones de negocio que no pueden resolverse desde el repositorio.

---

## 4. Estados posibles

| Estado | Significado |
| --- | --- |
| `Propuesto` | Decisión documentada y no implementada. Es la arquitectura objetivo |
| `Aceptado` | Decisión implementada y vigente en el código |
| `Rechazado` | Se evaluó y se descartó |
| `Obsoleto` | Ya no aplica, sin reemplazo directo |
| `Reemplazado por ADR-XXXX` | Sustituido por una decisión posterior; se conserva como histórico |
| `Pendiente de validación` | Marca de sección: requiere confirmación del área usuaria |

---

## 5. Índice

| ID | Decisión | Módulo | Estado | Dependencias |
| --- | --- | --- | --- | --- |
| [0001](0001-seguridad.md) | Autenticación JWT con revalidación en BD; cerrar puerta trasera, `httpOnly`, secretos fuera del código | Seguridad | Aceptado, con brechas críticas | 0013, 0014 |
| [0002](0002-dashboard.md) | Indicadores por agregación SQL en backend; filtrado con el mismo criterio | Dashboard | Propuesto | 0011, 0015, 0017, 0018, 0020, 0014 |
| [0003](0003-aseguradoras.md) | Maestro con eliminación lógica bloqueada por uso | Configuración | Propuesto | 0013, 0014 |
| [0004](0004-constructoras.md) | Maestro; obras nunca ocultas por el estado del maestro | Configuración | Propuesto | 0011, 0013, 0014 |
| [0005](0005-estados-contrato.md) | Estados de contrato (versión inicial) | Contratos | **Reemplazado por ADR-0017** | — |
| [0006](0006-tipos-contrato.md) | Configuración relacional de campos por tipo de contrato | Configuración | Propuesto | 0013, 0014 |
| [0007](0007-tipos-interventoria.md) | Maestro anclado a la obra | Configuración | Propuesto | 0011 |
| [0008](0008-tipos-identificacion.md) | Maestro sin datos personales; FK a tabla ausente | Configuración | Propuesto | 0012 |
| [0009](0009-tipos-direccion.md) | Catálogo compartido; contactos en tablas separadas | Configuración | Propuesto | 0011, 0012 |
| [0010](0010-tipos-proveedor.md) | Clasificación del proveedor, pendiente de validar su naturaleza | Configuración | Propuesto | 0012 |
| [0011](0011-obras.md) | Obra como raíz de agregado transaccional | Obras | Propuesto | 0004, 0006, 0007, 0009, 0012 |
| [0012](0012-proveedores.md) | Proveedor único por documento con `UNIQUE`; relación proveedor-obra | Proveedores | Propuesto | 0008, 0009, 0010, 0011 |
| [0013](0013-auditoria-trazabilidad.md) | Auditoría técnica estándar + bitácora funcional; autor desde el token | **Transversal** | Aceptado parcial / Propuesto | — |
| [0014](0014-autorizacion-permisos.md) | Backend como autoridad de autorización | **Transversal** | Aceptado parcial / Propuesto | 0001 |
| [0015](0015-contratos.md) | Contrato como raíz del agregado económico; fecha fin derivada en backend | Contratos | Propuesto | 0011, 0012, 0006, 0016, 0017, 0027 |
| [0016](0016-conceptos-contractuales.md) | Tabla única de conceptos con discriminador; valor del contrato calculado | Contratos | Propuesto | 0015, 0026, 0027 |
| [0017](0017-estados-contrato.md) | Máquina de estados explícita; liquidación por condiciones `C1..C8` | Contratos | Propuesto — **reemplaza a 0005** | 0015, 0016, 0021, 0024, 0025, 0027 |
| [0018](0018-polizas.md) | Póliza por concepto amparado; base configurable por tipo; versionado | Pólizas | Propuesto | 0003, 0016, 0019, 0027 |
| [0019](0019-tipos-poliza.md) | Base de cálculo como dominio cerrado; se congela la regla en la póliza | Pólizas | Propuesto | 0018, 0026 |
| [0020](0020-facturacion.md) | Encabezado común + detalle por tipo; `REGISTRADA → APROBADA → ANULADA` | Facturación | Propuesto | 0015, 0017, 0026, 0027 |
| [0021](0021-facturacion-contrato-mayor.md) | Anticipo, liquidación (asociada al otrosí de liquidación) y devolución | Facturación | Propuesto — **asociación confirmada** | 0016, 0017, 0020, 0024, 0025, 0026, 0027 |
| [0022](0022-facturacion-subcontratista.md) | Mismo modelo que 0021; sin reglas diferenciadas halladas | Facturación | Propuesto | 0010, 0021 |
| [0023](0023-facturacion-simple.md) | Tipo `SIMPLE` sin contrato; total facturado y neto a pagar | Facturación | Propuesto | 0011, 0012, 0020, 0026, 0027 |
| [0024](0024-amortizacion-anticipo.md) | Saldo único por contrato, calculado; amortiza contra lo facturado | Facturación | Propuesto | 0016, 0021, 0027 |
| [0025](0025-retenciones.md) | Retenido simétrico al anticipo; distinto de retenciones tributarias | Facturación | Propuesto | 0016, 0021, 0024, 0027 |
| [0026](0026-calculos-facturacion.md) | Módulo de cálculo único, versionado, con aritmética exacta | **Transversal del CORE** | Propuesto | 0006, 0016, 0019, 0020 |
| [0027](0027-integridad-transaccional.md) | Transacción por operación, bloqueo del contrato, idempotencia | **Transversal del CORE** | Propuesto | 0013, 0014 |

---

## 6. ADR transversales

| ADR | Aplica a | Regla que impone |
| --- | --- | --- |
| **0013** Auditoría | Todos | Autor tomado de `req.user`; auditoría funcional para información crítica |
| **0014** Autorización | Todos | Permiso verificado en backend en toda operación de negocio |
| **0026** Cálculos | CORE | Ningún importe calculado fuera del módulo del backend ni recibido del cliente |
| **0027** Integridad transaccional | CORE | Atomicidad, bloqueo del contrato como primera sentencia, idempotencia |

Regla que gobierna todos los ADR:

> Toda operación de negocio debe **validarse en backend**, **autorizarse con permisos** y **registrarse** con los mecanismos de auditoría de su nivel de trazabilidad. El frontend controla visibilidad y experiencia de usuario; **no es una frontera de seguridad**. La base de datos garantiza las reglas de integridad necesarias para evitar inconsistencias, duplicidades y condiciones de carrera.

---

## 7. Relación entre decisiones

```text
ADR-0014 Autorización ──┐
ADR-0013 Auditoría ─────┼──> todos los ADR
                        │
ADR-0027 Integridad ────┼──> 0015 · 0016 · 0017 · 0018 · 0020 · 0021 · 0023 · 0024 · 0025
ADR-0026 Cálculos ──────┘──> 0016 · 0018 · 0019 · 0021 · 0023 · 0024 · 0025

Maestros → Obra y proveedores
  0004 Constructoras ─────┐
  0006 Tipos de contrato ─┼──> 0011 Obras ──┐
  0007 Interventoría ─────┤                  │
  0009 Tipo de dirección ─┘                  ├──> 0015 Contratos
  0008 Identificación ────┐                  │
  0010 Tipo de proveedor ─┼──> 0012 Proveedores
  0009 Tipo de dirección ─┘

CORE
  0015 Contratos ──> 0016 Conceptos ──> 0017 Estados
                        │                   ▲
                        ├──> 0018 Pólizas ──┤ (C8, pendiente)
                        │       └── 0019 Tipos de póliza · 0003 Aseguradoras
                        │
                        └──> 0020 Facturación
                                ├── 0023 Simple
                                ├── 0021 Contrato mayor ── 0022 Subcontratista
                                │       ├── 0024 Anticipo ──> C2 ──┐
                                │       └── 0025 Retenido ──> C3 ──┼──> 0017 LIQUIDADO
                                └── C4, C5 ─────────────────────────┘

  0002 Dashboard consume 0011, 0015, 0017, 0018 y 0020
```

### Decisiones que se sostienen entre sí

| Decisión | ADR que la comparten |
| --- | --- |
| El contrato es el punto de serialización de su agregado (`SELECT … FOR UPDATE`) | 0015, 0016, 0017, 0018, 0020, 0021, 0024, 0025, 0027 |
| Se almacena lo pactado y los movimientos; se calculan totales y saldos | 0016, 0020, 0021, 0024, 0025, 0026, 0027 |
| Se congela la regla (tasa, base, versión), se deriva el resultado | 0019, 0023, 0026 |
| Los hechos consumados se corrigen con un hecho nuevo, nunca editando | 0016, 0018, 0020, 0027 |
| Solo las facturas aprobadas afectan saldos y liquidación | 0017, 0020, 0021, 0024, 0025 |

---

## 8. Mapa arquitectónico del CORE

Validado contra las decisiones de los ADR y ajustado al modelo del alcance funcional.

```text
                         SEGURIDAD (0001)
                               │
               AUTORIZACIÓN (0014)  ·  AUDITORÍA (0013)
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ OBRA (0011)  ·  etapas  ·  proveedores asignados (0012)      │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ CONTRATO (0015)                         estado (0017)        │
│   obra · proveedor · etapa · tipo de contrato · plazo        │
│                                                              │
│   Conceptos (0016)                                           │
│     VALOR INICIAL (1) · OTROSÍ (0..N) · OTROSÍ LIQUIDACIÓN (0..1)
│     cada uno: costo directo · AIU (A, I, U) · IVA            │
│               % anticipo · % retenido                        │
│                                                              │
│   Pólizas (0018) → por concepto · tipo (0019) · aseguradora  │
└───────────────┬──────────────────────────────┬──────────────┘
                │                              │
         EN EJECUCIÓN                   EN LIQUIDACIÓN
                │                  (al crear el otrosí de liquidación)
                ▼                              ▼
     Factura de ANTICIPO (0021)      Factura de LIQUIDACIÓN (0021)
       → anticipo facturado            asociada al otrosí de liquidación ✔
                                         ├── amortización (0024)
     ⚠ avance de obra durante            └── retenido (0025)
       la ejecución: PENDIENTE                      │
                                                     ▼
                                   Factura de DEVOLUCIÓN DE RETENIDO (0021, 0025)
                                                     │
                                          C1..C8 cumplidas (0017)
                                                     │
                                                 LIQUIDADO

FACTURACIÓN SIMPLE (0023) ── sin contrato · por proveedor y etapa
SUBCONTRATISTA (0022) ────── mismo modelo que contrato mayor
Transversales del CORE ───── cálculos (0026) · integridad transaccional (0027)
```

Diferencias respecto del modelo propuesto en el alcance:

| Modelo del alcance | Modelo documentado | Motivo |
| --- | --- | --- |
| Facturación con cuatro ramas: anticipo, facturación, liquidación, devolución | Tres tipos con contrato más la simple | La sección 20 del alcance declara solo tres tipos con contrato |
| Simple, contrato mayor y subcontratista como tres facturaciones | Contrato mayor y subcontratista son la naturaleza del proveedor, no tipos de factura | No se halló ninguna regla que los diferencie (0022) |
| Amortización y retenido bajo la liquidación | Igual, y además **solo** allí | Confirmado: la factura de liquidación se asocia al otrosí de liquidación |
| — | Avance de obra durante la ejecución sin mecanismo | Consecuencia de la confirmación; decisión pendiente en 0021 |

---

## 9. Justificación de la estructura del CORE

El alcance propone trece ADR (0015 – 0027) y permite fusionarlos o dividirlos. **Se mantuvieron los trece archivos**, con tres ajustes justificados:

1. **ADR-0017 reemplaza a ADR-0005.** 0005 se escribió antes de conocer los conceptos contractuales y atribuía la liquidación a un "fin de ejecución" indefinido. 0017 fija el disparador real —el otrosí de liquidación—, las condiciones de cierre y los seis atributos de la suspensión. 0005 se conserva como histórico. Decisión tomada con el usuario.

2. **ADR-0022 declara explícitamente que no hay diferencia.** No se encontró ninguna regla que distinga la facturación de subcontratista de la de contrato mayor. En lugar de fusionarlo con 0021 o inventar diferencias, documenta la ausencia, adopta el mismo modelo y lista siete hipótesis por validar. Decisión tomada con el usuario.

3. **ADR-0025 cubre el retenido contractual, no las retenciones tributarias.** Se conserva el nombre de archivo del alcance y se aclara la terminología al inicio del documento. Las retenciones tributarias están en 0026.

### Decisiones confirmadas con el usuario

| Fecha | Decisión | Efecto |
| --- | --- | --- |
| 2026-09-10 | 0017 reemplaza a 0005 | 0005 queda `Reemplazado por ADR-0017` |
| 2026-09-10 | Las fórmulas se proponen y se marcan como pendientes | Todas las composiciones de 0021, 0023 y 0026 |
| 2026-09-10 | Se mantienen trece archivos y 0022 declara la ausencia de diferencias | Estructura de esta sección |
| 2026-09-10 | **La factura de liquidación se asocia al otrosí de liquidación** | 0017: `C2` pasa a medirse sobre el anticipo facturado; 0016: la inmutabilidad se dispara con la primera factura aprobada del contrato; 0021: avance en ejecución queda pendiente |

---

## 10. Resumen ejecutivo del CORE

**13 ADR** (0015 – 0027), todos en estado `Propuesto`, porque **ninguna parte del CORE existe en el código ni en el esquema**. Uno de ellos reemplaza a un ADR anterior (0005).

### Decisiones principales

1. **El valor del contrato no se almacena**: es la suma de sus conceptos (0016).
2. **Los saldos de anticipo y retenido no se almacenan**: se calculan desde las facturas aprobadas, que son los movimientos (0024, 0025, 0027).
3. **El contrato es el punto de serialización**: bloqueo `FOR UPDATE` como primera sentencia de cada transacción de su agregado (0027).
4. **La amortización se mide contra el anticipo facturado, no contra el pactado** (0024).
5. **Factura con encabezado común y detalle por tipo**; contrato mayor y subcontratista no son tipos de factura (0020, 0022).
6. **Solo las facturas aprobadas cuentan**; las aprobadas no se editan, se anulan y se registran de nuevo (0020).
7. **Liquidar exige `C1..C8` a la vez**, incluidos saldo de anticipo y de retenido en cero (0017).
8. **Un único módulo de cálculo en backend, versionado y con aritmética decimal exacta** (0026).
9. **Idempotencia por clave** en toda operación de creación y transición (0027).

### Hechos verificados que condicionan el CORE

- **Ningún `SELECT … FOR UPDATE`** ni ajuste de nivel de aislamiento en todo el backend.
- **Ninguna restricción `UNIQUE`, `CHECK` ni columna generada** en el esquema.
- **Ninguna librería de aritmética decimal**; el cliente formatea importes con `parseFloat`.
- **`executeQuery` escapa de la transacción** si no recibe la conexión.
- **Ninguna idempotencia** y **ningún tratamiento de interbloqueos**.
- **Ninguna ruta del backend verifica permisos.**

### Matriz de riesgos

| ID | Riesgo | Módulo | Severidad | Probabilidad | Recomendación |
| --- | --- | --- | --- | --- | --- |
| R1 | Sin autorización en backend: cualquier usuario autenticado aprobaría facturas o liquidaría contratos | Transversal (0014) | Crítica | Alta — estado actual | Autorización en backend antes de construir el CORE |
| R2 | Amortización o anticipo por encima del saldo por concurrencia | 0024 | Crítica | Alta — sin bloqueos en el backend | Bloqueo del contrato como primera sentencia y revalidación al aprobar |
| R3 | Devolución de retenido por encima del saldo | 0025 | Crítica | Alta | Mismo protocolo |
| R4 | Doble registro o aprobación por doble clic o reenvío | 0020, 0027 | Crítica | Alta — sin idempotencia | Clave de idempotencia con `UNIQUE` |
| R5 | Avance de obra sin mecanismo de facturación durante la ejecución | 0021 | Crítica | Alta | Resolver la decisión pendiente D1 |
| R6 | Fórmulas tributarias implementadas sin validar | 0026 | Crítica | Media | Validación contable antes de implementar |
| R7 | Importes o saldos aceptados desde el cliente | 0020, 0026 | Crítica | Alta si no se decide | Recalcular siempre en backend |
| R8 | Liquidación con saldo pendiente | 0017 | Crítica | Media | Evaluar `C1..C8` bajo bloqueo |
| R9 | Edición de facturas aprobadas | 0020 | Crítica | Media | Anulación y registro nuevo |
| R10 | Aritmética en punto flotante | 0026 | Alta | Alta — sin librería decimal | Aritmética exacta y regla de redondeo única |
| R11 | Escritura fuera de la transacción | 0027 | Alta | Media | Utilidad central de transacción |
| R12 | Bloqueo tardío con `REPEATABLE READ` | 0024, 0027 | Alta | Media | Bloqueo antes de cualquier lectura |
| R13 | Saldos almacenados desincronizados | 0024, 0027 | Alta | Alta si se almacenan | Calcular desde movimientos |
| R14 | Base de cálculo de pólizas indefinida (hasta 19 % de diferencia) | 0018, 0019 | Alta | Alta | Resolver D4 |
| R15 | Duplicados de contrato, otrosí o factura | 0015, 0016, 0020 | Alta | Media | Restricciones `UNIQUE` desde la creación de las tablas |
| R16 | Auditoría falsificable (autor desde `req.body`) | 0013 | Alta | Alta — estado actual | Autor desde `req.user` |
| R17 | Rutas de `microsoftGraph` sin `verifyToken`; `rul_client_secret` en claro | 0020, 0021 | Alta | Alta — estado actual | Autenticar rutas y proteger el secreto |
| R18 | Interbloqueos respondidos con 500 genérico | 0027 | Media | Baja | Orden fijo de bloqueo y tratamiento de `ER_LOCK_DEADLOCK` |

### Matriz de decisiones pendientes

| ID | Decisión | Motivo | Impacto | Prioridad |
| --- | --- | --- | --- | --- |
| D1 | Cómo se factura el avance de obra durante la ejecución (0021) | La factura de liquidación solo existe tras el otrosí de liquidación | Operación de contratos largos y costo ejecutado del dashboard | **Crítica** |
| D2 | Composición de la factura simple: lectura A o B, bases, flete, pronto pago (0023, 0026) | No hay fórmulas; el orden de pantalla es ambiguo | Tributario, en todas las facturas simples | **Crítica** |
| D3 | Composición de la factura de liquidación: `VALOR` con o sin AIU, IVA sobre utilidad o base (0021, 0026) | No hay fórmulas | Tributario, en todas las facturas de contrato | **Crítica** |
| D4 | Base de cálculo por tipo de póliza y significado de `SUBTOTAL` / `IVA` (0018, 0019) | Ambigüedad del maestro | Hasta 19 % del valor asegurado | **Alta** |
| D5 | Base y porcentaje por defecto de anticipo y retenido (0024, 0025) | Conceptos con porcentajes distintos | Cierre de saldos `C2` y `C3` | **Alta** |
| D6 | Precisión, redondeo y librería decimal o enteros (0026) | El cliente formatea con y sin decimales | Cierre exacto de saldos | **Alta** |
| D7 | Retenciones tributarias como tasa o valor; tarifas por defecto (0023, 0026) | Campos del alcance sin indicar tasa o valor | Motor de cálculo | **Alta** |
| D8 | Cantidad y límite de valor de las facturas de liquidación (0021) | No definido | Facturación sobre lo pactado | **Alta** |
| D9 | Hipótesis H1–H7 de subcontratista (0022) | Ninguna regla diferenciada hallada | Estructural si H1 o H5 | **Alta** |
| D10 | Tope de retenido acumulado I4 (0025) | No definido | Retención excesiva | Media |
| D11 | Semántica de fecha de vencimiento (0015) | Campo sin definición | Alertas e indicadores | Media |
| D12 | Unidad frente a frecuencia del plazo (0015) | Mismos valores posibles | Duplicación de datos | Media |
| D13 | Efecto de la suspensión sobre el plazo (0015, 0017) | No definido | Fecha fin | Media |
| D14 | Condiciones `C7` (informe de interventoría) y `C8` (pólizas) (0017) | No definido | Cierre de contratos | Media |
| D15 | Estados adicionales de factura: contabilizada, pagada, rechazada (0020, 0027) | Sin evidencia | Flujo e inmutabilidad | Media |
| D16 | Ámbito de unicidad del número de contrato y de factura (0015, 0020) | No definido | Integridad | Media |
| D17 | Otrosí de liquidación con costo negativo; anticipo como porcentaje o valor fijo (0016) | No definido | Valor vigente | Media |
| D18 | Permisos de ajuste de amortización y retenido, y por tipo de factura (0020, 0024, 0025) | No definido | Segregación de funciones | Media |
| D19 | Dónde se apaga el AIU: por contrato o solo en el tipo (0026) | El alcance no lo dice | Régimen de IVA | Media |

### Matriz de reglas críticas

| Regla | Frontend | Backend | BD | Auditoría |
| --- | --- | --- | --- | --- |
| Exactamente un `VALOR INICIAL` y máximo un `OTROSÍ LIQUIDACIÓN` | Oculta la acción | Creación atómica | `UNIQUE` sobre columna generada | Funcional |
| Número de otrosí asignado por el backend | Solo lectura | `MAX + 1` bajo bloqueo | `UNIQUE (contrato, número)` | Funcional |
| Valor del contrato calculado, nunca capturado | Previsualización | Calcula | No se almacena | Valor antes y después del otrosí |
| Transición de estado solo por la máquina de estados | Oculta opciones | Valida transición declarada | FK de estado | Historial inmutable |
| Liquidar solo con `C1..C8` | Muestra la condición faltante | Evalúa bajo bloqueo | No expresable | Condición fallida registrada |
| Factura de liquidación asociada al otrosí de liquidación | Lo resuelve el servidor | Valida tipo y contrato | FK (compuesta recomendada) | Funcional |
| Anticipo facturado ≤ pactado (I1) | Aviso | Revalida al aprobar bajo bloqueo | No expresable | Saldos antes y después |
| Amortizado ≤ anticipo facturado (I2) | Aviso | Revalida al aprobar y al anular anticipos | No expresable | Valor por defecto y aplicado |
| Devuelto ≤ retenido acumulado (I3) | Aviso | Revalida al aprobar y al anular liquidaciones | No expresable | Saldos antes y después |
| Importes calculados no aceptados del cliente | Previsualización | Recalcula | No se almacenan | Instantánea al aprobar |
| Aprobar exige permiso distinto de crear | Oculta | Verifica permiso | No aplica | Aprobador y fecha |
| Factura aprobada inmutable | Bloquea | Rechaza edición | `CHECK` estado / fecha de aprobación | Anulación con motivo |
| Contrato nulo solo en factura simple | Selector según tipo | Valida | `CHECK` | — |
| Idempotencia de creación | Genera la clave | Detecta la repetición | `UNIQUE` sobre la clave | — |
| Porcentajes de conceptos inmutables tras la primera factura aprobada | Bloquea | Valida | No expresable | Funcional |
| Una suspensión abierta con motivo y condición de levantamiento | Formulario | Valida | `UNIQUE` sobre columna generada + `NOT NULL` | Historial |
| Base de la póliza resuelta por su tipo | Solo lectura | Resuelve y copia la clave | Clave copiada en la póliza | Funcional al cambiar la base del tipo |

---

## 11. Cómo crear un nuevo ADR

1. Copiar la estructura de secciones de un ADR del mismo grupo.
2. Asignar el siguiente número libre.
3. Registrarlo en el índice de la sección 5, con sus dependencias.
4. Enlazar los transversales que apliquen: 0013 y 0014 siempre; 0026 y 0027 en el CORE.
5. Diferenciar estado actual, decisión y brechas.

## 12. Reglas para modificar o reemplazar un ADR

1. **Un ADR aceptado no se edita para cambiar su decisión**: se crea uno nuevo que lo reemplaza.
2. Se puede editar para corregir errores de hecho, actualizar brechas, incorporar decisiones confirmadas por el área usuaria o enlazar ADR nuevos. **Toda edición deja constancia en la sección `Fecha`.**
3. Al reemplazar: el ADR anterior cambia a `Reemplazado por ADR-XXXX` y el nuevo declara qué reemplaza y por qué.
4. Pasar de `Propuesto` a `Aceptado` exige que la implementación exista y coincida con lo documentado.

## 13. Alcance de esta tarea

Esta tarea fue **exclusivamente de análisis y documentación**. No se modificó código, no se crearon migraciones, no se tocó la base de datos y no se implementó ninguna recomendación.
