# ADR-0027: Integridad transaccional del CORE

## Estado

**Aceptado.** Las decisiones de este ADR son **estándar obligatorio y no negociable** para todo service nuevo del backend, del CORE o no. Un service que escriba varias sentencias sin la utilidad de transacción, o que lea un registro antes de bloquearlo, no cumple el estándar y no se integra.

Estado de implementación por decisión:

| Decisión | Implementación |
| --- | --- |
| 1, 2, 3, 4, 5, 9 | ✅ Vigentes en código: `server/src/common/services/transaction.service.js`, aplicado a todos los services actuales |
| 8 | ✅ Vigente: reintento acotado del interbloqueo (2 reintentos) solo en operaciones marcadas `{ idempotent: true }`; si persiste → `409`; espera agotada → `503`, sin reintento |
| 6, 7, 10, 11 | Obligatorias al construir el CORE: saldos validados, idempotencia, invariantes y conciliación. No hay aún tablas del CORE donde aplicarlas |

ADR **transversal**. Nació para las operaciones críticas del CORE ([ADR-0015](0015-contratos.md) a [ADR-0026](0026-calculos-facturacion.md)), pero la utilidad de transacción, el aislamiento y el protocolo de bloqueo rigen para **todo** el backend.

## Fecha

2026-09-10 — versión inicial.

2026-09-25 — se implementa la base de las decisiones 2, 3, 4 y 8 (ver "Implementación de la base") y el ADR pasa a **Aceptado** como estándar obligatorio para todo service nuevo.

## Contexto

El CORE maneja dos recursos finitos —anticipo y retenido— y documentos con efecto contable. Sus operaciones escriben varias tablas a la vez y pueden ejecutarse de forma concurrente sobre el mismo contrato.

El alcance pide determinar dónde deben existir transacciones (sección 25), cómo se evita la concurrencia (26), qué valores se almacenan o calculan (28), qué operaciones deben ser idempotentes (33) y qué información queda protegida tras aprobar, contabilizar, pagar o liquidar (37).

## Problema

Tres clases de fallo, todas silenciosas:

1. **Atomicidad**: una operación de varias tablas falla a mitad y deja estados parciales —un contrato sin valor inicial, una factura aprobada sin historial—, indistinguibles de estados legítimos.
2. **Aislamiento**: dos transacciones validan sobre el mismo saldo y ambas lo consumen.
3. **Repetición**: un doble clic, un reintento o un tiempo de espera agotado ejecutan dos veces una operación no idempotente.

## Estado actual

### Lo que existe

| Hecho | Evidencia |
| --- | --- |
| Patrón `beginTransaction` / `commit` / `rollback` con liberación en `finally` | `users.service.js` (`saveUser`, `deleteUser`), `profiles.service.js` (`saveProfile`, `deleteProfile`), `permissions.service.js` (`updateProfilePermissions`, `updateUserPermissions`), `template.service.js`, `document.service.js` |
| Operación externa **después** del `commit` | `auth.service.js` `register` envía el correo tras confirmar; `permissions.service.js` emite por Socket.IO tras confirmar |
| Pool de 10 conexiones, espera ilimitada | `db.config.js`: `connectionLimit: 10`, `waitForConnections: true`, `queueLimit: 0` |

### Lo que falta o es defectuoso

| Hecho | Evidencia | Consecuencia |
| --- | --- | --- |
| **`executeQuery` toma una conexión nueva del pool si no recibe una** | `db.config.js` | Una escritura que omita el parámetro **escapa de la transacción y sobrevive al `rollback`** |
| **Ningún bloqueo de filas** | Sin coincidencias de `FOR UPDATE`, `LOCK IN SHARE MODE`, `SET TRANSACTION` ni `ISOLATION` en `server/` | Ninguna protección frente a validaciones concurrentes |
| **Nivel de aislamiento implícito** | El pool no lo fija: rige `REPEATABLE READ`, el valor por defecto de InnoDB | Comportamiento de las lecturas no documentado |
| **Sin tratamiento de interbloqueos ni esperas de bloqueo** | `error.middleware.js` no contempla `ER_LOCK_DEADLOCK` ni `ER_LOCK_WAIT_TIMEOUT` | Responden el 500 genérico "Error desconocido de base de datos" |
| **Uso inconsistente de transacciones** | `auth.service.js`: `verifyOtp` (dos `UPDATE`), `restorePassword` (`UPDATE` + `DELETE`), `forgotPassword` (`DELETE` + `INSERT`) **sin transacción** | Estados parciales posibles en el propio backend actual |
| **El `rollback` en `catch` puede ocultar el error original** | `if (connection) await connection.rollback(); throw err;` en los servicios | Si el `rollback` falla, se pierde el error que lo causó |
| **Sin idempotencia en ninguna operación** | Ninguna clave de idempotencia en código ni esquema | Doble registro por doble clic o reenvío |
| **El cliente no reintenta automáticamente** | `client/src/api/services/httpCliente.js` solo intercepta el `401` | Los duplicados vendrían de doble clic o reenvío manual, no de reintentos automáticos |
| **Sin tablas del CORE** | `database/bdintervewebpack.sql` | Nada de lo anterior se aplica aún al CORE |

## Decisión

1. **Toda operación de negocio es una única transacción de base de datos** que incluye sus escrituras, su historial y su auditoría. Ninguna operación escribe en más de una transacción.

2. **Toda transacción se abre con la utilidad única** `server/src/common/services/transaction.service.js`: `withTransaction` o `withLockedTransaction`. La utilidad obtiene la conexión, abre la transacción, la entrega, confirma o revierte y libera. **Prohibido llamar a `prisma.$transaction` directamente** desde un service, prohibido escribir fuera del `tx` que entrega la utilidad, y prohibido cualquier otro acceso a la BD: el pool de mysql2 con `executeQuery`, que tomaba una conexión nueva si se omitía el parámetro, se eliminó. Si la operación falla, Prisma revierte y **propaga el error original aunque el rollback falle** (el fallo del rollback solo se registra). Un test de arquitectura hace cumplir la regla.

3. **Protocolo de bloqueos** (obligatorio en toda operación sobre un registro existente):
   - La fila raíz del agregado se bloquea con **`SELECT … FOR UPDATE` como primera sentencia de la transacción**, antes de cualquier lectura. En el CORE, la raíz es el contrato.
   - **Orden fijo entre entidades**: contrato → factura → póliza → concepto → documento → perfil → usuario (`LOCK_ORDER`). Póliza y concepto no se mezclan hoy en una operación; si ocurriera, póliza va primero.
   - **Por identificador ascendente dentro de una entidad**: una operación que afecte a dos contratos ([ADR-0022](0022-facturacion-subcontratista.md), H1) bloquea primero el de menor id.
   - El service **declara** qué bloquear con `withLockedTransaction({ ENTIDAD: ids }, fn)`. La utilidad aplica el orden y la posición, así que el protocolo no depende de que cada service lo recuerde. Toda tabla nueva que sea raíz de un agregado se registra en `LOCKABLE`.

4. **Nivel de aislamiento: `REPEATABLE READ`, declarado explícitamente en cada transacción** por la utilidad, nunca heredado de la configuración del servidor MySQL. En ese nivel, InnoDB fija la instantánea de lectura en la primera lectura no bloqueante. Bloquear **antes** de cualquier lectura garantiza que las sumas de saldo vean las transacciones concurrentes ya confirmadas. Por eso tampoco vale leer el dato fuera de la transacción y luego bloquear.

5. **Ninguna operación externa ocurre dentro de la transacción.** Subida de archivos a SharePoint, correos y notificaciones por Socket.IO van **después** del `COMMIT`, como ya hacen `register` y `updateUserPermissions`.

6. **Los saldos no se actualizan: se validan.** Donde el alcance dice "actualización de saldos", la operación **recalcula los saldos bajo bloqueo y valida los invariantes**; no escribe ningún saldo ([ADR-0024](0024-amortizacion-anticipo.md), [ADR-0025](0025-retenciones.md)).

7. **Idempotencia:**
   - **Operaciones de creación**: clave de idempotencia generada por el cliente al abrir el formulario y guardada con `UNIQUE` en la entidad creada. Una repetición con la misma clave devuelve la entidad ya creada; la misma clave con otro contenido se rechaza.
   - **Operaciones de transición** (aprobar, anular, suspender, levantar, reabrir): precondición de estado leída bajo bloqueo, más clave de idempotencia con `UNIQUE` en el historial de estado. Una repetición devuelve el estado ya alcanzado.

8. **Interbloqueos y esperas:** `ER_LOCK_DEADLOCK` se reintenta en el servidor un número acotado de veces, **solo en operaciones idempotentes**, y si persiste responde `409` indicando operación concurrente. `ER_LOCK_WAIT_TIMEOUT` responde `503`. Ninguno de los dos cae en el 500 genérico.

9. **Transacciones cortas.** Nada de validaciones remotas ni cálculos costosos fuera de lo necesario mientras se tiene el bloqueo: con un pool de 10 conexiones y espera ilimitada, un bloqueo largo encola peticiones de todo el sistema.

10. **Los invariantes se garantizan en el nivel más bajo que los pueda expresar** (ver catálogo): restricción de base de datos cuando es posible; bloqueo y revalidación cuando relacionan sumas de varias filas; conciliación como defensa en todos los casos.

11. **Un proceso de conciliación reporta, sin corregir**, todo incumplimiento de invariantes y toda discrepancia entre valores persistidos derivables y su recálculo.

## Justificación

- **Una transacción por operación de negocio**: el sistema es un monolito sobre una sola base de datos. **No se encontró evidencia** de colas, bus de eventos ni servicios separados que justifiquen sagas o compensaciones. La transacción local es el mecanismo más simple que garantiza atomicidad.

- **Utilidad central**: el defecto de `executeQuery` —tomar otra conexión si falta el parámetro— es fácil de cometer y casi imposible de detectar en revisión, porque el código funciona en el caso feliz. Centralizar la transacción y prohibir la llamada sin conexión convierte un error silencioso en uno evitable por construcción.

- **Bloqueo del contrato y no de cada saldo**: los invariantes relacionan sumas sobre muchas facturas; bloquear esas filas no impide que se inserte una factura nueva. El contrato es el padre común de todo lo que afecta a sus saldos y bloquearlo serializa exactamente lo necesario, sin bloquear otros contratos.

- **Primera sentencia**: con `REPEATABLE READ`, un bloqueo tardío no protege. Si la transacción leyó la factura antes de bloquear el contrato, su instantánea es anterior a la aprobación concurrente, y la suma posterior no la verá aunque espere el bloqueo. Esta es la precisión que más fácilmente se omite y que anula toda la protección.

- **Orden fijo de bloqueo**: dos operaciones que bloquean los mismos recursos en orden inverso se interbloquean. Un orden único lo evita por construcción.

- **Validar y no actualizar saldos**: un saldo actualizado es una copia de una suma. Las anulaciones, los fallos a mitad y las escrituras fuera de transacción la desincronizan. Recalcular bajo bloqueo da la misma garantía sin esa copia.

- **Operaciones externas después del `COMMIT`**: si el correo se envía dentro de la transacción y luego esta se revierte, el correo ya salió. Si la subida a SharePoint tarda, retiene el bloqueo del contrato. El propio backend ya aplica este orden en `register`.

- **Clave de idempotencia en el cliente**: el servidor no puede distinguir un doble clic de dos facturas legítimamente iguales. Solo el cliente sabe que ambos envíos corresponden al mismo formulario abierto.

## Alternativas consideradas

### Atomicidad

| | Alternativa | Evaluación |
| --- | --- | --- |
| **A** | **Transacción local por operación** *(seleccionada)* | Simple y suficiente en un monolito con una base de datos |
| **B** | Sagas con compensación | Necesarias entre servicios; aquí añaden complejidad sin beneficio. **No se encontró evidencia** de servicios separados |
| **C** | Escrituras independientes con conciliación posterior | Estados parciales visibles; conciliación como único control. **Descartada** |

### Concurrencia

| | Alternativa | Evaluación |
| --- | --- | --- |
| **A** | **Bloqueo pesimista del contrato** *(seleccionada)* | Serializa por contrato; fácil de razonar |
| **B** | Bloqueo optimista con versión y reintento | Sin espera; exige reintentos que hoy no existen ni en cliente ni en servidor |
| **C** | `SERIALIZABLE` | Protege sin bloqueo explícito; multiplica interbloqueos, hoy sin tratamiento |
| **D** | `READ COMMITTED` con lecturas bloqueantes | Evita la sutileza de la instantánea, pero cambia el comportamiento de lectura de todo el backend si se aplica al pool |

### Idempotencia

| | Alternativa | Evaluación |
| --- | --- | --- |
| **A** | **Clave en la entidad creada o en el historial** *(seleccionada)* | Sin tablas nuevas; la garantía la da el `UNIQUE` |
| **B** | Tabla genérica de claves con respuesta almacenada | Uniforme para cualquier operación; añade una tabla, expiración y serialización de respuestas |
| **C** | Solo deshabilitar el botón tras el primer clic | Control de interfaz, no de integridad: no cubre reenvíos ni pestañas duplicadas. **Insuficiente** |

### Operaciones externas

| | Alternativa | Evaluación |
| --- | --- | --- |
| **A** | **Después del `COMMIT`, sin garantía de entrega** *(seleccionada)* | Simple; si falla la subida o el correo, la operación de negocio sigue siendo correcta y el efecto externo se reintenta |
| **B** | Tabla de salida (outbox) con proceso de envío | Entrega garantizada; requiere el cron, hoy vacío y desactivado. Recomendable si el archivo de factura es obligatorio |

## Modelo arquitectónico

### Catálogo de operaciones críticas (sección 25 del alcance)

| Operación | Escrituras en la misma transacción | Bloqueos, en orden | Validaciones bajo bloqueo | Idempotencia | Después del `COMMIT` |
| --- | --- | --- | --- | --- | --- |
| **Crear contrato** | Contrato · concepto `VALOR_INICIAL` · pólizas · historial `EN EJECUCIÓN` · auditoría | — (filas nuevas) | Proveedor asignado a la obra · etapa de la obra · unicidad por `UNIQUE` | Clave en contrato | Documentos |
| **Crear otrosí** | Concepto `OTROSI` · recálculo de fecha fin · pólizas · auditoría | Contrato | Estado `EN EJECUCIÓN` · número `MAX + 1` | Clave en concepto | — |
| **Crear otrosí de liquidación** | Concepto `OTROSI_LIQUIDACION` · estado `EN LIQUIDACIÓN` · historial · auditoría | Contrato | No existe otro · estado `EN EJECUCIÓN` | Clave en concepto | Notificación |
| **Suspender / levantar** | Suspensión · estado · historial · días suspendidos y fecha fin al levantar · auditoría | Contrato | Transición válida · una suspensión abierta | Clave en historial | Notificación |
| **Registrar factura con contrato** | Factura · detalle · historial · auditoría | Contrato | Estado admisible · saldos · proveedor del contrato | Clave en factura | Archivo a SharePoint |
| **Registrar factura simple** | Factura · detalle · historial · auditoría | — | Proveedor asignado a la obra | Clave en factura | Archivo a SharePoint |
| **Aprobar factura con contrato** | Estado y fecha de aprobación · historial · auditoría con instantánea · transición a `LIQUIDADO` si aplica | Contrato → factura | Factura `REGISTRADA` · estado del contrato · **revalidación de I1–I5** · evaluación `C1..C8` | Clave en historial | Notificación |
| **Aprobar factura simple** | Estado · historial · auditoría con instantánea | Factura | Factura `REGISTRADA` | Clave en historial | — |
| **Anular factura aprobada** | Estado · historial · auditoría | Contrato → factura | Invariantes tras excluirla · contrato distinto de `LIQUIDADO` | Clave en historial | — |
| **Versionar póliza** | Versión anterior cerrada · versión nueva vigente · auditoría | Contrato | Una versión vigente | Clave en póliza | — |
| **Reabrir contrato liquidado** | Estado · historial · auditoría reforzada | Contrato | Permiso propio · motivo | Clave en historial | Notificación |

### Catálogo de invariantes

| ID | Invariante | Mecanismo | ADR |
| --- | --- | --- | --- |
| I1 | Anticipo facturado ≤ anticipo pactado | Bloqueo + revalidación | [0024](0024-amortizacion-anticipo.md) |
| I2 | Amortizado ≤ anticipo facturado | Bloqueo + revalidación | [0024](0024-amortizacion-anticipo.md) |
| I3 | Retenido devuelto ≤ retenido acumulado | Bloqueo + revalidación | [0025](0025-retenciones.md) |
| I4 | Retenido acumulado ≤ retenido pactado *(pendiente)* | Bloqueo + revalidación | [0025](0025-retenciones.md) |
| I5 | Σ valor de facturas de liquidación ≤ base vigente *(pendiente)* | Bloqueo + revalidación | [0021](0021-facturacion-contrato-mayor.md) |
| I6 | Exactamente un `VALOR_INICIAL` por contrato | `UNIQUE` sobre columna generada + creación atómica | [0016](0016-conceptos-contractuales.md) |
| I7 | Máximo un `OTROSI_LIQUIDACION` | `UNIQUE` sobre columna generada | [0016](0016-conceptos-contractuales.md) |
| I8 | Número de otrosí único por contrato | `UNIQUE (contrato, número)` + bloqueo | [0016](0016-conceptos-contractuales.md) |
| I9 | Una suspensión abierta por contrato | `UNIQUE` sobre columna generada | [0017](0017-estados-contrato.md) |
| I10 | Una versión vigente por póliza | `UNIQUE` sobre columna generada | [0018](0018-polizas.md) |
| I11 | Número de factura único por proveedor | `UNIQUE` | [0020](0020-facturacion.md) |
| I12 | Número de contrato único por obra | `UNIQUE` | [0015](0015-contratos.md) |
| I13 | Contrato nulo solo en factura simple | `CHECK` | [0020](0020-facturacion.md) |
| I14 | Estado `APROBADA` ⇔ fecha de aprobación | `CHECK` | [0020](0020-facturacion.md) |
| I15 | Fecha fin ≥ fecha inicio | `CHECK` | [0015](0015-contratos.md) |

Ninguno de estos mecanismos existe hoy: **el esquema no tiene restricciones `UNIQUE`, `CHECK` ni columnas generadas**.

### Secuencia tipo: aprobar una factura de liquidación

```text
BEGIN
  SELECT … FROM contrato WHERE id = ? FOR UPDATE      ← 1ª sentencia
  SELECT … FROM factura  WHERE id = ? FOR UPDATE
  ¿clave de idempotencia ya registrada? → devolver resultado previo
  verificar factura REGISTRADA · contrato EN LIQUIDACIÓN
  recalcular AF, AM, R, D
  validar I2 · I3 · I4 · I5
  componer la factura con su versión de fórmula (ADR-0026)
  UPDATE factura → APROBADA + fecha de aprobación
  INSERT historial de factura (con clave)
  INSERT auditoría (instantánea de composición y saldos)
  evaluar C1..C8 → si se cumplen: UPDATE contrato → LIQUIDADO + historial de contrato
COMMIT
después: notificación · subida de archivos pendientes
```

## Reglas de negocio

1. Toda operación del catálogo es atómica.
2. Toda operación que afecte al agregado de un contrato bloquea el contrato como primera sentencia.
3. El orden de bloqueo es contrato → factura → póliza o concepto.
4. Ninguna operación externa ocurre dentro de la transacción.
5. Toda operación de creación es idempotente por clave.
6. Toda transición es idempotente por precondición de estado y clave.
7. Los saldos se validan, nunca se escriben.
8. La auditoría y el historial se escriben en la transacción de la operación.
9. Los interbloqueos se reintentan solo en operaciones idempotentes.
10. La conciliación reporta; no corrige.

## Seguridad

- **La integridad transaccional es un control de seguridad.** Una amortización o una devolución duplicadas por concurrencia son pérdidas económicas, no errores técnicos.
- **Las validaciones de saldo solo valen bajo bloqueo y sobre datos del servidor.**
- **La clave de idempotencia no es un secreto ni una autorización**: un usuario sin permiso no gana acceso reenviando una clave válida de otro. La autorización se verifica antes que la idempotencia.
- **Los mensajes de rechazo por concurrencia no deben revelar datos de otros contratos.**
- Hoy **ninguna ruta del backend verifica permisos** ([ADR-0014](0014-autorizacion-permisos.md)).

## Autorización

No define permisos propios. Cada operación del catálogo exige el permiso de su ADR, **verificado antes de abrir la transacción**: no tiene sentido tomar el bloqueo del contrato para una petición que va a ser rechazada.

## Auditoría

- Toda auditoría funcional del CORE se escribe **dentro** de la transacción de la operación que audita ([ADR-0013](0013-auditoria-trazabilidad.md)).
- Los rechazos por invariante durante la aprobación se registran —fuera de la transacción revertida, en una escritura propia—, porque son la evidencia de concurrencia.
- Los reintentos por interbloqueo quedan en el registro técnico (`logs/api.log`, nivel `warn`, vía winston). Los incumplimientos detectados por la conciliación irán al mismo registro cuando exista la conciliación.

## Validaciones

| Regla | Frontend | Backend | Base de datos | Clasificación |
| --- | --- | --- | --- | --- |
| Atomicidad de la operación | No aplica | **Obligatoria** | Transacción | **Integridad** |
| Escritura con la conexión de la transacción | No aplica | **Obligatoria** (utilidad central) | No aplica | **Integridad** |
| Bloqueo como primera sentencia | No aplica | **Obligatoria** | `FOR UPDATE` | **Integridad** |
| Invariantes I1–I5 | Avisos | **Obligatoria bajo bloqueo** | No expresable | **Regla de negocio** |
| Invariantes I6–I15 | Avisos | Propuesta | **`UNIQUE`, `CHECK`, columnas generadas** | **Integridad** |
| Clave de idempotencia | Genera | **Obligatoria** | **`UNIQUE`** | **Integridad** |
| Botón deshabilitado tras enviar | Propuesta | No aplica | No aplica | Validación de interfaz (no suficiente) |

## Integridad de datos

Ver el catálogo de invariantes. Requisitos adicionales:

- Clave de idempotencia con `UNIQUE` en contrato, concepto, suspensión, póliza, factura e historiales de estado.
- Motor InnoDB en todas las tablas del CORE: el volcado actual ya declara `ENGINE = InnoDB` en todas sus tablas.
- **Migraciones versionadas** antes de crear ninguna tabla del CORE: hoy el único artefacto de esquema es un volcado de Navicat.

### Regla de no duplicar saldos (sección 28 del alcance)

| Valor | Decisión | Justificación |
| --- | --- | --- |
| Total anticipado | **Calcular** | Σ facturas de anticipo aprobadas |
| Total amortizado | **Calcular** | Σ amortización de facturas de liquidación aprobadas |
| Saldo de anticipo | **Calcular** | Diferencia de dos sumas |
| Total retenido | **Calcular** | Σ retenido de facturas de liquidación aprobadas |
| Total devuelto | **Calcular** | Σ devoluciones aprobadas |
| Saldo de retenido | **Calcular** | Diferencia de dos sumas |

**Análisis de rendimiento:** un contrato tiene del orden de decenas de facturas. Con un índice `(contrato, tipo, estado)`, cada suma recorre pocas filas. El único consumidor masivo es el dashboard ([ADR-0002](0002-dashboard.md)), para el que se admite una instantánea materializada reconstruible, **nunca usada para validar**.

**Excepciones persistidas, todas no monetarias y justificadas:**

| Valor persistido | Por qué se persiste | Cómo se protege |
| --- | --- | --- |
| Fecha fin del contrato | Se filtra e indexa | Recálculo en cada evento + conciliación ([ADR-0015](0015-contratos.md)) |
| Días en suspensión | Insumo de la fecha fin | Recálculo al levantar cada suspensión |
| Estado del contrato y de la factura | Filtro principal; el estado manual no es derivable | Máquina de estados + historial ([ADR-0017](0017-estados-contrato.md)) |

## Transacciones

Es el objeto de este ADR. Ver `Decisión` y `Modelo arquitectónico`.

Respuesta directa al escenario del alcance:

```text
Obra / Contrato  → OK
Concepto inicial → OK
Póliza           → ERROR
Auditoría        → NO EJECUTADA

Resultado con esta decisión: ROLLBACK completo. No queda contrato sin póliza
ni concepto sin contrato. El usuario reintenta sobre un estado limpio.
```

## Concurrencia

Escenarios de la sección 26 del alcance:

| Escenario | Sin protección (estado actual) | Con la decisión |
| --- | --- | --- |
| Dos usuarios registran factura a la vez | Ambas se crean; si comparten número y proveedor, duplicado | `UNIQUE (proveedor, número)` rechaza el duplicado; facturas distintas no se bloquean entre sí salvo por el contrato |
| Saldo de anticipo 10.000.000; A amortiza 7.000.000, B 5.000.000 | 12.000.000 amortizados | B se rechaza con saldo 3.000.000 ([ADR-0024](0024-amortizacion-anticipo.md)) |
| Retenido disponible 5.000.000; A devuelve 4.000.000, B 3.000.000 | 7.000.000 devueltos | B se rechaza con saldo 1.000.000 ([ADR-0025](0025-retenciones.md)) |
| Doble clic en "aprobar" | Doble efecto sobre saldos | Precondición `REGISTRADA` bajo bloqueo + clave |
| Otrosí de liquidación y otrosí ordinario simultáneos | Otrosí ordinario tras el de liquidación | El segundo en bloquear ve el estado cambiado y se rechaza |
| Lectura previa al bloqueo | — | Prohibida por la regla de primera sentencia |
| Interbloqueo | 500 genérico | Orden fijo de bloqueo; reintento acotado; `409` |

### Idempotencia (sección 33 del alcance)

| Operación | Riesgo si se repite | Protección |
| --- | --- | --- |
| Crear factura | Factura duplicada; saldo consumido dos veces | Clave `UNIQUE` en factura + `UNIQUE (proveedor, número)` |
| Aprobar factura | Doble efecto sobre saldos | Precondición de estado bajo bloqueo + clave en historial |
| Crear otrosí | Valor del contrato duplicado | Clave `UNIQUE` en concepto |
| Liquidar contrato | — | Transición automática: solo ocurre desde `EN LIQUIDACIÓN`; evaluarla dos veces no tiene efecto |
| Devolver retenido | Pago de garantía duplicado | Clave `UNIQUE` en factura de devolución + I3 |

| Causa de repetición | Cubierta por |
| --- | --- |
| Doble clic | Clave de idempotencia |
| Reintento HTTP | Clave de idempotencia (hoy el cliente no reintenta: `httpCliente.js` solo trata el `401`) |
| Tiempo de espera agotado | Clave: al reenviar se recibe el resultado ya confirmado |
| Reenvío del formulario | Clave generada al abrirlo, no al enviarlo |
| Doble procesamiento en el servidor | Precondición de estado bajo bloqueo |

## Fuente de verdad

- **Movimientos**: facturas aprobadas (anticipo, amortización, retenido, devolución) y conceptos contractuales (pactado).
- **Saldos**: siempre calculados desde los movimientos.
- **Estados**: persistidos, gobernados por máquinas de estados con historial.
- **Cálculos**: módulo único versionado ([ADR-0026](0026-calculos-facturacion.md)).

Tabla completa de datos financieros en [ADR-0026](0026-calculos-facturacion.md), sección `Fuente de verdad`.

## Inmutabilidad

### Tras cada hito (sección 37 del alcance)

| Hito | Valor factura | IVA | Retenciones | Amortización | Retenido | Devolución | Valor contractual |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Aprobación de factura** | Inmutable | Inmutable (tasa y versión) | Inmutables | Inmutable | Inmutable | Inmutable | Conceptos inmutables desde la primera factura aprobada |
| **Contabilización** | No aplica: estado no adoptado por falta de evidencia ([ADR-0020](0020-facturacion.md)) | — | — | — | — | — | — |
| **Pago** | No aplica: estado no adoptado por falta de evidencia | — | — | — | — | — | — |
| **Liquidación del contrato** | Inmutable, sin anulación | Inmutable | Inmutables | Inmutable | Inmutable | Inmutable | Inmutable |

### Mecanismo de corrección

| Situación | ¿Edición permitida? | Mecanismo |
| --- | --- | --- |
| Factura `REGISTRADA` | **Sí**, con auditoría | Edición |
| Factura `APROBADA` | **No** | **Anulación + registro nuevo**, si la anulación no rompe invariantes |
| Valor de un concepto con facturas aprobadas en el contrato | **No** | **Otrosí compensatorio** ([ADR-0016](0016-conceptos-contractuales.md)) |
| Póliza vigente | **No** en sitio | **Versión nueva** ([ADR-0018](0018-polizas.md)) |
| Cualquier dato de un contrato `LIQUIDADO` | **No** | **Reapertura** ([ADR-0017](0017-estados-contrato.md)) |
| Factura contabilizada o pagada | No aplica hoy | **Pendiente de validación**: exigiría reversión contable externa, además de anulación |

**El CORE no edita hechos consumados: los corrige con un hecho nuevo que queda registrado.**

## Consecuencias

### Positivas

- No existen estados parciales en ninguna operación del CORE.
- Los recursos finitos no se pueden sobregirar por concurrencia.
- Las repeticiones no duplican efectos.
- Un único protocolo de bloqueo y transacción para todo el CORE.
- Los invariantes están catalogados con su mecanismo y su ADR de origen.

### Negativas

- El bloqueo por contrato serializa sus operaciones y reduce el paralelismo en contratos muy activos.
- La utilidad central obliga a adaptar el estilo actual de los servicios.
- La clave de idempotencia exige cambios en todos los formularios de creación.
- Los reintentos por interbloqueo añaden latencia en casos de contención.
- Los efectos externos tras el `COMMIT` pueden fallar y requieren reintento o una tabla de salida.

## Riesgos

| Riesgo | Severidad | Probabilidad sin la decisión | Descripción |
| --- | --- | --- | --- |
| Escritura fuera de la transacción | **Alto** | **Media** | `executeQuery` sin conexión; error silencioso |
| Sobregiro de saldos | **Crítico** | **Alta** | Ningún bloqueo en el backend |
| Bloqueo tardío | **Alto** | Media | Con `REPEATABLE READ`, no protege |
| Doble efecto por repetición | **Crítico** | **Alta** | Ninguna idempotencia en el sistema |
| Interbloqueos con 500 genérico | **Medio** | Baja | Sin tratamiento en `error.middleware.js` |
| Agotamiento del pool | **Medio** | Baja | 10 conexiones, espera ilimitada, bloqueos largos |
| Operación externa dentro de la transacción | **Medio** | Media | Correos enviados de operaciones revertidas; bloqueos retenidos |
| Error original oculto por fallo del `rollback` | **Bajo** | Baja | Diagnóstico imposible |
| Estados parciales en autenticación | **Medio** | Media | `verifyOtp`, `restorePassword`, `forgotPassword` sin transacción, ya hoy |

## Impacto técnico

### Frontend

- Generación de clave de idempotencia al abrir cada formulario de creación y cada acción de transición.
- Deshabilitar el envío tras el primer clic, como mejora de experiencia y no como control.
- Tratamiento explícito de `409` (concurrencia o saldo) mostrando el valor actualizado, y de `503` (espera de bloqueo) con opción de reintentar con la misma clave.

### Backend

- Utilidad central de transacción que preserve el error original.
- Prohibición de `executeQuery` sin conexión dentro de transacciones.
- Protocolo de bloqueo y orden fijo.
- Tratamiento de `ER_LOCK_DEADLOCK` y `ER_LOCK_WAIT_TIMEOUT` en `error.middleware.js`.
- Registro de claves de idempotencia.
- Proceso de conciliación sobre el cron existente, hoy vacío y desactivado.
- Montar el logger persistente, hoy definido y no montado.

### Base de datos

- Restricciones `UNIQUE`, `CHECK` y columnas generadas del catálogo de invariantes.
- Columnas de clave de idempotencia.
- Índices `(contrato, tipo, estado)`.
- Migraciones versionadas.

### Infraestructura

- Evaluar `innodb_lock_wait_timeout` frente al tiempo esperado de las transacciones del CORE.
- Tabla de salida si la subida de archivos a SharePoint debe garantizarse.
- **No se encontró evidencia** de colas, bus de eventos ni réplicas de lectura.

## Arquitectura objetivo

| Área | Actual | Objetivo | Brecha |
| --- | --- | --- | --- |
| Atomicidad | Transacciones en seguridad; ausentes en partes de autenticación | Una transacción por operación del CORE | **Alta** |
| Gestión de transacciones | Manual en cada servicio | Utilidad central | **Media** |
| Escritura fuera de transacción | Posible por `executeQuery` | Prohibida por construcción | **Alta** |
| Bloqueos | Ninguno | Contrato como primera sentencia, orden fijo | **Alta** |
| Aislamiento | Implícito | `REPEATABLE READ` declarado | **Media** |
| Idempotencia | Ninguna | Clave en creación y transición | **Alta** |
| Interbloqueos | 500 genérico | Reintento acotado, `409` / `503` | **Media** |
| Invariantes en BD | Ningún `UNIQUE`, `CHECK` ni columna generada | Catálogo I6–I15 | **Alta** |
| Saldos | No existen | Calculados, validados bajo bloqueo | **Alta** |
| Conciliación | No existe | Reporte periódico | **Media** |

## Brechas identificadas

| # | Brecha | Severidad |
| --- | --- | --- |
| B1 | `executeQuery` escapa de la transacción si se omite la conexión | **Alta** — ✅ Cerrada: `db.config.js` (pool mysql2 con `executeQuery`/`getConnection`) eliminado; `withTransaction` es la única puerta, y un test de arquitectura impide reintroducir mysql2 o `prisma.$transaction` directo |
| B2 | Ningún bloqueo de filas en el backend | **Alta** — ✅ Cerrada: `withLockedTransaction` (`SELECT … FOR UPDATE` como primeras sentencias, orden fijo) |
| B3 | Sin idempotencia en ninguna operación | **Alta** |
| B4 | Sin restricciones `UNIQUE`, `CHECK` ni columnas generadas | **Alta** |
| B5 | Sin tratamiento de interbloqueos ni esperas de bloqueo | **Media** — ✅ Cerrada: reintento acotado en operaciones idempotentes, `409` si persiste, `503` ante espera agotada. Verificado con un interbloqueo real ([DEC-015](../decisiones/DEC-015-reintento-interbloqueo.md)) |
| B6 | Nivel de aislamiento implícito | **Media** — ✅ Cerrada: `REPEATABLE READ` declarado en cada transacción |
| B7 | Transacciones ausentes en `verifyOtp`, `restorePassword` y `forgotPassword` | **Media** — ✅ Cerrada: `verifyOtp` ya no existe; `restorePassword` y `forgotPassword` usan `withTransaction` |
| B8 | `rollback` en `catch` puede ocultar el error original | **Baja** — ✅ No aplica: Prisma revierte la transacción interactiva y propaga el error original |
| B9 | Sin conciliación; cron vacío y desactivado | **Media** |
| B10 | Logger persistente definido y no montado | **Media** |
| B11 | Sin migraciones versionadas | **Media** |
| B12 | Estados de contabilización y pago sin definir | **Media** — decisión de negocio pendiente |

## Implementación de la base

`server/src/common/services/transaction.service.js` es la única puerta a una transacción. Los services no llaman a `prisma.$transaction` directamente.

| Función | Cuándo | Qué hace |
| --- | --- | --- |
| `withTransaction(fn)` | Crear (no hay fila que bloquear) u operaciones que ya son atómicas con una sentencia condicionada | Abre la transacción con `isolationLevel: RepeatableRead` y fija `innodb_lock_wait_timeout = 3` |
| `withLockedTransaction(locks, fn)` | Toda operación sobre un registro existente | Además bloquea con `SELECT … FOR UPDATE` las filas de `locks` **antes** de ejecutar `fn(tx, locked)` |

**El protocolo se cumple por construcción.** El service declara *qué* bloquear (`{ CONTRATO: [7, 3], FACTURA: 9 }`), y la utilidad decide *cuándo* y *en qué orden*:

- Los bloqueos son las primeras sentencias de lectura: `fn` recibe el `tx` después de ellos.
- Las entidades siguen `LOCK_ORDER`: `CONTRATO → FACTURA → POLIZA → CONCEPTO → DOCUMENTO → PERFIL → USUARIO`. El orden del CORE es el de la decisión 3. Las entidades actuales quedan después en un único orden total.
- Los ids van en orden ascendente. En el ejemplo se bloquea contrato 3, contrato 7 y después factura 9.
- Una entidad fuera de `LOCK_ORDER`, o sin tabla registrada en `LOCKABLE`, lanza un error antes de abrir la transacción. Al crear la tabla de contratos, facturas, pólizas o conceptos, se agrega su entrada a `LOCKABLE`; su posición en el orden ya está fijada.

**Espera de bloqueo de 3 s.** El valor por defecto de MySQL es 50 s, y Prisma corta la transacción interactiva a los 5 s con un error genérico. Con 3 s, la espera agotada llega como el error 1205 de MySQL, y `error.middleware.js` responde `503` con un mensaje claro. El `SET` va antes de los bloqueos, pero no es una lectura, así que no fija la instantánea de `REPEATABLE READ`. Verificado contra la BD de desarrollo: 3,1 s → `503`.

**Aplicación a los módulos actuales:**

| Operación | Bloquea |
| --- | --- |
| `saveUser` (editar) | `PERFIL` asignado + `USUARIO`. Verifica, ya bloqueado, que el perfil no esté eliminado. |
| `saveUser` (crear) | `PERFIL` asignado. Misma verificación. |
| `deleteUser`, `updateAccount`, `updatePassword`, `updateUserPermissions` | `USUARIO` |
| `saveProfile` (editar), `deleteProfile`, `updateProfilePermissions` | `PERFIL` |
| `deleteModuleDoc` | `DOCUMENTO` |
| `saveProfile` (crear), sesiones, intentos de login, códigos de recuperación | Ninguno (`withTransaction`): o crean, o usan sentencias condicionadas atómicas (`upsert`, incremento con `WHERE par_attempts < máximo`) |

Carreras que esto cerró:

- `deleteProfile` verificaba que el perfil no tuviera usuarios, pero un `saveUser` simultáneo podía asignárselo entre esa verificación y la eliminación. Ahora ambos bloquean el perfil.
- `updateUserPermissions` leía el perfil del usuario **fuera** de la transacción. Ahora lo lee después del bloqueo.
- `updatePassword` podía pisar un cambio de contraseña simultáneo. Ahora el `UPDATE` se condiciona al hash verificado y responde `409` si cambió.
- En las ediciones, la lectura "antes" de la bitácora (ADR-0013) ya no puede ser una instantánea vieja: los valores anteriores registrados son los reales.

**Reintento por interbloqueo** (decisión 8, [DEC-015](../decisiones/DEC-015-reintento-interbloqueo.md)): `withTransaction`/`withLockedTransaction` aceptan `{ idempotent: true }` y solo entonces reintentan un interbloqueo, hasta 2 veces. Hoy lo declaran editar usuario, editar perfil, permisos de perfil y de usuario, y editar la cuenta propia. Crear, eliminar y los contadores de login no se reintentan hasta que exista la idempotencia por clave (B3).

**Pendiente de esta base**: `saveProfile` (crear) valida que el nombre no esté repetido sin `UNIQUE` en la BD. Dos creaciones simultáneas con el mismo nombre pueden pasar ambas, porque no hay fila que bloquear. Se resuelve con la restricción `UNIQUE` (B4).

## Plan de implementación

Recomendación derivada del análisis. **Ejecutado:** fase 0 (utilidad central), fase 2 salvo el reintento por interbloqueo, y fase 5 (transacciones en autenticación). El resto sigue pendiente.

**Fase 0 — Base (B1, B8, B11):** utilidad central de transacción y migraciones versionadas, antes de cualquier tabla del CORE.
**Fase 1 — Esquema (B4):** restricciones del catálogo de invariantes en cada tabla del CORE, desde su creación.
**Fase 2 — Concurrencia (B2, B5, B6):** protocolo de bloqueo, aislamiento declarado y tratamiento de interbloqueos.
**Fase 3 — Idempotencia (B3):** claves en cliente, servidor y esquema.
**Fase 4 — Observabilidad (B9, B10):** conciliación y logger persistente.
**Fase 5 — Deuda existente (B7):** transacciones en los flujos de autenticación.
**Fase 6 — Decisión (B12):** definir si existen contabilización y pago, y su corrección.

## ADR relacionados

- Todos los ADR del CORE: [0015](0015-contratos.md) · [0016](0016-conceptos-contractuales.md) · [0017](0017-estados-contrato.md) · [0018](0018-polizas.md) · [0019](0019-tipos-poliza.md) · [0020](0020-facturacion.md) · [0021](0021-facturacion-contrato-mayor.md) · [0022](0022-facturacion-subcontratista.md) · [0023](0023-facturacion-simple.md) · [0024](0024-amortizacion-anticipo.md) · [0025](0025-retenciones.md) · [0026](0026-calculos-facturacion.md)
- [ADR-0013 — Auditoría y trazabilidad](0013-auditoria-trazabilidad.md) · [ADR-0014 — Autorización](0014-autorizacion-permisos.md) · [ADR-0001 — Seguridad](0001-seguridad.md)

## Referencias

- `docs/prompt_adr_core.md` — secciones 25, 26, 28, 33 y 37
- `server/src/common/configs/db.config.js` — `executeQuery`, pool
- `server/src/common/middlewares/error.middleware.js` — errores de MySQL tratados
- `server/src/modules/security/users/users.service.js`, `profiles.service.js`, `permissions.service.js` — patrón transaccional
- `server/src/modules/auth/auth.service.js` — `register` (correo tras el `commit`); `verifyOtp`, `restorePassword`, `forgotPassword` sin transacción
- `client/src/api/services/httpCliente.js` — sin reintentos automáticos
- `server/src/cron/index.js`, `server/server.js` — cron vacío y desactivado
- `server/src/common/configs/winston.config.js`, `server/app.js` — logger no montado
- `database/bdintervewebpack.sql` — tablas InnoDB; sin `UNIQUE`, `CHECK` ni columnas generadas
