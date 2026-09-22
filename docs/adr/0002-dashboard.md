# ADR-0002: Dashboard e indicadores

## Estado

**Propuesto.**

El dashboard existe como pantalla pero **no consume datos reales**. Los indicadores descritos en el alcance funcional —costo de obra ejecutado por tipo de factura, estado de costos, estados de póliza— no están implementados, y las entidades que alimentarían esos cálculos (contratos, facturas, pólizas) no existen en el esquema.

Este ADR documenta la decisión arquitectónica recomendada, no una implementación existente.

## Fecha

2026-09-10 — versión inicial.

## Contexto

El dashboard es la pantalla de entrada al sistema (`/home/default`) y la primera lectura del estado del proceso administrativo de contratos. Debe responder de un vistazo: cuánto se ha ejecutado, cómo se distribuye por tipo de factura, y qué contratos tienen exposición por vencimiento de póliza.

A diferencia del resto de módulos, el dashboard **no posee datos propios**: es una vista agregada sobre obras, contratos, facturas y pólizas. Su arquitectura es, por tanto, una decisión sobre agregación y no sobre persistencia.

## Problema

Un dashboard mal diseñado produce dos fallas específicas y costosas:

1. **Cifras que no cuadran con los listados.** Si el indicador y el listado calculan por caminos distintos, el usuario pierde confianza en ambos.
2. **Doble conteo.** Una factura contada en dos agrupaciones, o un contrato con varias pólizas contado varias veces, inflan silenciosamente el indicador.

Se requiere definir:

1. Dónde se calculan los indicadores: base de datos, backend o frontend.
2. Cómo se garantiza que el clic en un indicador filtra exactamente el conjunto que ese indicador contó.
3. Qué fecha se usa como referencia para los estados de vigencia y quién la determina.
4. Qué ocurre con los casos de borde: fechas nulas, múltiples pólizas, contratos sin póliza.

## Estado actual

`client/src/views/dashboard/Default/index.jsx` renderiza seis tarjetas con **datos fijos escritos en el propio componente**:

```text
const testCards = [
  { titulo: 'Usuarios',   contador: 150 },
  { titulo: 'Ventas',     contador: 342 },
  { titulo: 'Ingresos',   contador: 12500 },
  { titulo: 'Pedidos',    contador: 89 },
  { titulo: 'Productos',  contador: 210 },
  { titulo: 'Reportes',   contador: 45 },
];
```

Los rótulos —Ventas, Pedidos, Productos— corresponden a un dominio de comercio, no al de contratos. Es la pantalla de ejemplo de la plantilla base, sin adaptar.

Hechos verificados:

- **No existe** ningún endpoint de dashboard en el backend. `main.routes.js` no registra ninguna ruta de indicadores.
- **No existe** ninguna función de API en `client/src/api/requests/` para indicadores.
- **No existen** en el esquema las tablas de contratos, facturas, pólizas, órdenes de servicio ni obras. Las tablas del volcado son: `tbl_business_rules`, `tbl_documents`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_priorities`, `tbl_profile_permissions`, `tbl_profiles`, `tbl_providers`, `tbl_reasons`, `tbl_status`, `tbl_user_permissions`, `tbl_users`.
- **No existen** vistas materializadas, procedimientos almacenados ni tablas de agregación en el esquema.

Único elemento reutilizable: `countUsers` en `users.service.js` agrupa usuarios por perfil (`COUNT(u.use_id) ... GROUP BY proId`) y `UsersPage` lo consume. Es el precedente de cómo se calcula un indicador en este proyecto: **agregación en SQL, consumida por endpoint dedicado**.

`apexcharts` y `react-apexcharts` figuran en las dependencias del frontend y **no se usan en ninguna vista**.

### Sobre los indicadores solicitados

| Indicador | Fuente de información | Estado |
| --- | --- | --- |
| Costo de obra ejecutado por tipo de factura | Facturas asociadas a contratos de obra | **No determinable.** No existen las entidades factura ni tipo de factura |
| Estado de costos | Comparación entre valor contratado y ejecutado | **No determinable.** No existe la entidad contrato |
| Pólizas: vencidas, a vencer, vigentes, sin fecha, contratos sin póliza | Vigencia de pólizas por contrato | **No determinable.** No existen las entidades póliza ni contrato |

No es posible documentar cálculo, agrupaciones, periodos ni estados considerados, porque no existe la implementación ni el modelo de datos que la sustente. Documentarlos como si existieran sería inventar información.

**Estado: Pendiente de validación** para todo lo relativo a fórmulas concretas, hasta que el modelo de contratos, facturas y pólizas esté definido.

## Decisión

1. **Los indicadores se calculan en la base de datos mediante agregación SQL, expuestos por endpoints dedicados del backend.** El frontend recibe cifras ya calculadas y solo las presenta.

2. **El filtrado por clic en un indicador ocurre en el backend, y reutiliza exactamente el mismo criterio que produjo la cifra.** El indicador y su listado asociado comparten la definición del predicado; no se reimplementa en dos lugares.

3. **La fecha de referencia para todo cálculo de vigencia la determina el backend**, con la zona horaria fijada explícitamente en la conexión de base de datos. El frontend nunca aporta la fecha actual para un cálculo de estado.

4. **Los estados de póliza son mutuamente excluyentes y colectivamente exhaustivos.** Todo contrato pertenece a exactamente una categoría. La suma de las cinco categorías es igual al total de contratos del universo consultado.

5. **La categoría de un contrato con varias pólizas se determina por la póliza de mayor exposición**, no por el conteo de pólizas. Se cuentan contratos, no pólizas. Esta es la decisión que previene el doble conteo.

6. **Los casos de borde son categorías explícitas, no exclusiones silenciosas.** "Sin fecha de vigencia" y "Contratos sin póliza" existen precisamente para que ningún contrato desaparezca del total por tener datos incompletos.

7. **El umbral de "a vencer" es configuración, no constante literal.** Su valor debe ser explícito y consultable, no un número disperso en el código.

8. **Los indicadores respetan los permisos del usuario.** Un usuario que no puede consultar un módulo no ve sus cifras agregadas. Un dashboard es una vía de fuga de información si agrega sobre datos que el usuario no puede leer.

9. **El dashboard es de solo lectura.** No ejecuta operaciones de escritura ni transiciones de estado.

10. **Los indicadores se calculan bajo demanda.** No se introduce precálculo, materialización ni caché hasta que exista evidencia medida de que el cálculo directo no rinde.

## Justificación

- **Cálculo en base de datos**: agregar en el motor evita transferir el detalle completo a la aplicación. Es también el patrón ya establecido por `countUsers`, el único indicador real del proyecto.
- **Filtrado en backend con criterio compartido**: es la única forma de garantizar que el número de la tarjeta coincida con el número de filas del listado. Si el frontend filtra sobre un conjunto ya cargado, solo puede filtrar lo que le llegó — con paginación, eso es un subconjunto, y la cifra deja de cuadrar.
- **Fecha del backend**: la fecha del navegador es la del reloj del cliente, ajustable y en la zona horaria del usuario. Dos usuarios en zonas distintas verían estados de vigencia distintos para la misma póliza. Un estado contractual no puede depender de dónde está sentado quien mira.
- **Categorías exhaustivas**: si "vencidas + a vencer + vigentes" no suma el total, el usuario no puede saber si faltan datos o si hay un error de cálculo. Hacer explícitos los huecos convierte un defecto invisible en información útil: "12 contratos sin póliza" es un hallazgo de gestión.
- **Contar contratos, no pólizas**: es la decisión central contra el doble conteo. Un contrato con tres pólizas —una vencida y dos vigentes— debe aparecer una sola vez. Contarlo en dos categorías infla el total y hace que los porcentajes superen el 100 %.
- **Umbral configurable**: "a vencer" significa cosas distintas según la organización. Enterrarlo como literal obliga a un despliegue para cambiar una regla de negocio.
- **Sin precálculo inicial**: introducir materialización o caché antes de medir añade complejidad de invalidación y riesgo de cifras obsoletas. Es optimización prematura sobre un volumen que hoy se desconoce.

## Alternativas consideradas

### Alternativa 1 — Cálculo en el frontend

El backend entrega el detalle y el frontend agrupa y cuenta.

- **A favor**: sin endpoints nuevos; el filtrado por clic es inmediato y sin ida y vuelta.
- **En contra**: exige transferir el conjunto completo, incompatible con la paginación que ya usa todo el proyecto. Con paginación, agrega solo la página cargada y **produce cifras incorrectas**. Duplica la lógica de negocio en el cliente. Expone al frontend datos que el usuario podría no tener permiso de ver.
- **Descartada.** Es la fuente habitual de la discrepancia entre indicador y listado.

### Alternativa 2 — Vistas o tablas de agregación precalculadas

Materializar los indicadores por proceso programado.

- **A favor**: lectura muy rápida y constante, independiente del volumen.
- **En contra**: MySQL 8 no ofrece vistas materializadas nativas; habría que mantener tablas de resumen con un proceso de refresco. Los estados de póliza dependen de la fecha actual y cambian a diario sin que cambie ningún dato, obligando a recalcular todo el conjunto cada día. Introduce desfase entre el dashboard y el listado. El cron existe (`src/cron/index.js`) pero está vacío y desactivado.
- **Descartada** en la implementación inicial. Reconsiderar solo con evidencia de problema de rendimiento.

### Alternativa 3 — Agregación SQL bajo demanda por endpoint dedicado (seleccionada)

- **A favor**: una sola fuente de verdad; cifras siempre actuales; compatible con paginación y permisos; sigue el patrón ya presente en `countUsers`; sin infraestructura adicional.
- **En contra**: cada carga del dashboard ejecuta las agregaciones. Mitigable con índices adecuados sobre las columnas de fecha y de clave foránea.
- **Seleccionada.**

## Modelo arquitectónico

**No se puede presentar un diagrama de entidades**: las tablas de contratos, facturas y pólizas no existen. Dibujarlas aquí sería inventar el modelo que corresponde definir en los ADR de esos módulos.

Flujo objetivo, independiente del modelo concreto:

```text
Usuario abre el dashboard
   │
   ▼
GET /api/dashboard/<indicador>     (con verifyToken + permiso de consulta)
   │
   ▼
Servicio de dashboard
   ├── fecha de referencia = NOW() del servidor, zona horaria explícita
   ├── universo = registros visibles según los permisos del usuario
   ├── agregación SQL con GROUP BY  ──> una fila por categoría
   └── categorías exhaustivas y excluyentes
   │
   ▼
Respuesta: [ { categoria, cantidad, valor } ]
   │
   ▼
Frontend: presenta las tarjetas
   │
   │  clic en una categoría
   ▼
GET /api/<modulo>/listado?categoria=<misma categoría>
   │
   └── el backend aplica EL MISMO predicado que produjo la cifra
```

Clasificación objetivo de estados de póliza, expresada como decisión y no como consulta:

```text
Para cada CONTRATO, evaluando sus pólizas contra la fecha del servidor:

  ¿tiene alguna póliza?
      NO  ──────────────────────────────> "Contratos sin póliza"
      SÍ
       │
       ├── ¿alguna póliza sin fecha de vigencia?
       │        └── y ninguna con fecha ──────> "Sin fecha de vigencia"
       │
       ├── ¿la póliza de mayor exposición está vencida?
       │        (fecha_fin < hoy)      ───────> "Vencidas"
       │
       ├── ¿vence dentro del umbral configurado?
       │        (hoy <= fecha_fin <= hoy + N) ─> "A vencer"
       │
       └── en otro caso                ───────> "Vigentes"

Cada contrato cae en exactamente una categoría.
Σ categorías = total de contratos.
```

El criterio de "póliza de mayor exposición" —la de menor fecha de fin, la de mayor valor asegurado, o la vigente para el amparo requerido— **es una decisión de negocio pendiente de validación** que debe fijarse antes de implementar.

## Reglas de negocio

**No se encontró evidencia en la implementación actual.** Las reglas siguientes son las propuestas, no las vigentes:

1. Un contrato pertenece a exactamente una categoría de estado de póliza.
2. La suma de las categorías equivale al total de contratos del universo consultado.
3. Un contrato sin ninguna póliza se clasifica como "Contratos sin póliza", nunca se excluye del total.
4. Un contrato cuyas pólizas carecen de fecha de vigencia se clasifica como "Sin fecha de vigencia", nunca como "Vigente" ni como "Vencida".
5. Un contrato con varias pólizas se clasifica una sola vez, por la de mayor exposición.
6. La fecha de referencia es la del servidor en el momento de la consulta.
7. El umbral de "a vencer" es un parámetro configurable, no un literal.
8. El usuario solo ve agregados sobre información que tiene permiso de consultar.
9. Un contrato en estado eliminado (`sta_id = 3`) no se cuenta en ningún indicador.

Reglas pendientes de validación, que dependen del modelo de contratos y facturas:

- Qué estados de factura se consideran "ejecutado": ¿todas las facturas registradas, o solo las aprobadas o pagadas?
- Si el costo ejecutado se calcula sobre valor bruto o neto de impuestos y retenciones.
- Qué periodo abarca por defecto el indicador de costo ejecutado.
- Si las notas crédito o anulaciones restan del ejecutado.

## Seguridad

El dashboard concentra información agregada de todo el sistema, lo que lo convierte en un objetivo particular: una cifra agregada puede revelar información que el detalle tiene vedada.

Requisitos:

- Todos los endpoints exigen sesión válida.
- Todos exigen el permiso de consulta del módulo agregado.
- El universo agregado se restringe a lo que el usuario puede ver. Si un usuario solo accede a ciertas obras, el indicador agrega solo sobre esas.
- Los parámetros de filtro —periodo, tipo, categoría— se validan y se parametrizan.

Sobre lo último, una advertencia derivada del análisis del código existente: los servicios de paginación actuales (`users.service.js`, `template.service.js`, `document.service.js`) **interpolan directamente los filtros recibidos del cliente en la cadena SQL**, incluidos `sortField`, `sortOrder`, `rows` y `first`. Un dashboard con filtros construido sobre ese mismo patrón heredaría una vulnerabilidad de inyección SQL. Los endpoints de dashboard deben usar consultas parametrizadas y listas blancas para los identificadores que no admiten parámetro, como los nombres de columna de ordenamiento.

## Autorización

Acciones requeridas:

```text
CONSULTAR DASHBOARD        — acceso a la pantalla
CONSULTAR <módulo>         — para cada indicador, el permiso del módulo agregado
```

**Ninguno de estos permisos existe hoy.** El catálogo actual solo contempla crear, editar, eliminar y asignar permisos sobre perfiles y usuarios. Ver [ADR-0014](0014-autorizacion-permisos.md).

## Auditoría

El dashboard no modifica datos y no genera auditoría funcional.

Su acceso sí es información de seguridad relevante —revela qué usuarios consultan qué agregados— y debe quedar cubierto por el logging HTTP persistente descrito en [ADR-0013](0013-auditoria-trazabilidad.md), hoy implementado pero no montado.

## Validaciones

| Validación | Frontend | Backend | Base de datos | Clasificación |
| --- | --- | --- | --- | --- |
| Rango de fechas coherente | Propuesta | Propuesta | No aplica | UX + Regla de negocio |
| Categoría solicitada es válida | Propuesta | Propuesta (lista blanca) | No aplica | Seguridad |
| Umbral de "a vencer" positivo | Propuesta | Propuesta | No aplica | Regla de negocio |
| Permiso de consulta | Propuesta | **Propuesta — obligatoria** | No aplica | Seguridad |

Ninguna está implementada.

## Integridad de datos

El dashboard no escribe y no aporta integridad propia. Depende íntegramente de la de los módulos que agrega.

Dos dependencias que condicionan la fiabilidad de todo indicador:

- **Sin claves foráneas correctas entre contrato, factura y póliza, los agregados producirán cifras erróneas de forma silenciosa.** Una factura huérfana simplemente no se cuenta.
- **Sin restricciones de unicidad, los registros duplicados inflan los indicadores.** El esquema actual **no tiene ninguna restricción `UNIQUE`**, lo que hace de esto un riesgo concreto y no teórico. Ver [ADR-0012](0012-proveedores.md).

## Transacciones

No aplica. El dashboard es de solo lectura.

Una precisión: los indicadores deben leerse de forma consistente entre sí. Si el dashboard ejecuta varias consultas de agregación independientes mientras hay escrituras concurrentes, las tarjetas pueden reflejar instantes distintos. Con el nivel de aislamiento por defecto de InnoDB (`REPEATABLE READ`), agrupar las consultas del dashboard en una sola transacción de lectura garantiza una instantánea coherente. No es crítico para tarjetas informativas; sí lo es si las cifras se presentan como cuadrando entre sí.

## Consecuencias

### Positivas

- Una única definición de cada indicador, compartida entre la tarjeta y el listado: las cifras cuadran por construcción.
- Cifras siempre actuales, sin desfase de materialización.
- Categorías exhaustivas: los datos incompletos se hacen visibles como información de gestión en lugar de desaparecer.
- Sin doble conteo por diseño, al contar contratos y no pólizas.
- Compatible con permisos y con paginación desde el primer día.
- Sin infraestructura adicional.

### Negativas

- Cada carga del dashboard ejecuta agregaciones sobre las tablas operativas.
- Requiere índices específicos sobre las columnas de fecha de vigencia y de clave foránea.
- El filtrado por clic exige una ida y vuelta al servidor, con latencia perceptible frente al filtrado local.
- El acoplamiento entre indicador y listado obliga a modificar ambos de forma coordinada.

## Riesgos

| Riesgo | Severidad | Descripción |
| --- | --- | --- |
| Dashboard con datos ficticios en producción | **Alto** | La pantalla actual muestra cifras inventadas (Ventas, Pedidos, Productos) que un usuario puede tomar por reales |
| Doble conteo de contratos con varias pólizas | **Alto** | Si se cuentan pólizas en lugar de contratos, los totales y porcentajes se distorsionan |
| Discrepancia entre indicador y listado | **Alto** | Si el criterio se implementa dos veces, divergen ante cualquier cambio |
| Fecha de referencia del cliente | **Medio** | Estados de vigencia distintos según el reloj y la zona horaria del usuario |
| Contratos desaparecidos del total | **Medio** | Fechas nulas o ausencia de póliza excluidas silenciosamente |
| Inyección SQL en filtros | **Alto** | Si se replica el patrón de interpolación de los servicios de paginación existentes |
| Fuga de información por agregado | **Medio** | Indicadores que agregan sobre datos que el usuario no puede consultar |
| Degradación con el volumen | **Medio** | Agregación bajo demanda sin índices adecuados |

## Impacto técnico

### Frontend

- `views/dashboard/Default/index.jsx` debe reemplazar por completo `testCards` por consumo de API.
- `ui-component/cards/CardGrid.jsx` es reutilizable como contenedor de indicadores.
- Requiere un archivo de API en `api/requests/` para los indicadores, hoy inexistente.
- `apexcharts` y `react-apexcharts` ya están disponibles y sin uso; son la vía natural para representación gráfica.
- El clic en un indicador debe navegar al listado del módulo con el filtro aplicado en la petición, no en memoria.
- **Antes de mostrar cualquier gráfico se debe verificar el contraste y la legibilidad en tema claro y oscuro**: el proyecto tiene ambos temas definidos en `themes/`.

### Backend

- Requiere un módulo de dashboard completo (`routes` / `controller` / `service`), inexistente.
- El patrón a seguir es el de `countUsers` en `users.service.js`: agregación SQL, endpoint dedicado.
- **No debe seguirse** el patrón de filtros de `paginationUsers` ni de `paginationModuleDocs`, que interpolan entrada del cliente en la cadena SQL.
- La fecha de referencia debe provenir del servidor con zona horaria explícita.

### Base de datos

- Requiere que existan primero las entidades de contrato, factura, tipo de factura, póliza y orden de servicio. **Ninguna existe.**
- Requiere índices sobre las columnas de fecha de vigencia, de estado y de clave foránea que se usen en las agregaciones.
- Sin vistas, procedimientos ni funciones actualmente; la decisión no los introduce.

### Infraestructura

- **No se encontró evidencia** de caché, Redis ni motor analítico en el proyecto.
- El cron (`src/cron/index.js`) está implementado con lista vacía y arranque comentado. Sería el mecanismo de un eventual precálculo, hoy descartado.

## Estado actual vs arquitectura objetivo

| Aspecto | Estado actual | Arquitectura objetivo |
| --- | --- | --- |
| Origen de los datos | Constantes en el componente | Agregación SQL vía endpoint |
| Indicadores | Ventas, Pedidos, Productos (dominio ajeno) | Costo ejecutado, estado de costos, estados de póliza |
| Endpoint de dashboard | No existe | Módulo dedicado en el backend |
| Filtrado por clic | No existe | Backend, con el criterio del indicador |
| Fecha de referencia | No aplica | Servidor, zona horaria explícita |
| Casos de borde | No aplica | Categorías explícitas |
| Permisos | Ninguno | Permiso de consulta por módulo agregado |
| Representación gráfica | Tarjetas estáticas | Tarjetas y gráficos con `apexcharts` |

## Brechas identificadas

| # | Brecha | Severidad |
| --- | --- | --- |
| B1 | El dashboard muestra datos ficticios de otro dominio | **Alta** |
| B2 | No existe backend de indicadores | **Alta** |
| B3 | No existen las entidades contrato, factura, tipo de factura ni póliza | **Alta** — bloquea todo el módulo |
| B4 | Sin permisos de consulta que restrinjan los agregados | **Media** |
| B5 | Sin definición del criterio de "póliza de mayor exposición" | **Media** — decisión de negocio pendiente |
| B6 | Sin definición del umbral de "a vencer" | **Media** — decisión de negocio pendiente |
| B7 | Sin definición de qué estados de factura constituyen "ejecutado" | **Media** — decisión de negocio pendiente |
| B8 | Riesgo de heredar el patrón de interpolación SQL de los servicios existentes | **Alta** — preventiva |

## Plan de implementación

Recomendación derivada del análisis. **No fue ejecutada.**

**Fase 0 — Prerrequisitos (B3)**
El dashboard no es implementable hasta que existan las entidades que agrega. Requiere [ADR-0011](0011-obras.md), [ADR-0005](0005-estados-contrato.md), [ADR-0003](0003-aseguradoras.md) y el modelo de contratos, pólizas y facturas.

**Fase 1 — Decisiones de negocio (B5, B6, B7)**
Fijar con el área usuaria: criterio de póliza representativa, umbral de "a vencer", y qué estados de factura constituyen ejecución. Sin esto, cualquier implementación es una suposición.

**Fase 2 — Backend de indicadores (B2, B8)**
Módulo de dashboard con agregación SQL parametrizada, fecha del servidor y categorías exhaustivas. Consultas parametrizadas desde el inicio; lista blanca para nombres de columna.

**Fase 3 — Permisos (B4)**
Introducir el permiso de consulta y restringir el universo agregado según [ADR-0014](0014-autorizacion-permisos.md).

**Fase 4 — Frontend (B1)**
Sustituir `testCards` por consumo de API. Implementar la navegación al listado con filtro en la petición. Incorporar representación gráfica con `apexcharts`.

**Fase 5 — Rendimiento**
Medir. Añadir índices donde la medición lo indique. Reconsiderar precálculo solo con evidencia.

## ADR relacionados

- [ADR-0011 — Obras](0011-obras.md) — origen de los valores contratados
- [ADR-0005 — Estados de contrato](0005-estados-contrato.md) — estados considerados en los indicadores
- [ADR-0003 — Aseguradoras](0003-aseguradoras.md) — relación con pólizas
- [ADR-0013 — Auditoría y trazabilidad](0013-auditoria-trazabilidad.md)
- [ADR-0014 — Autorización basada en permisos](0014-autorizacion-permisos.md)

## Referencias

- `client/src/views/dashboard/Default/index.jsx`
- `client/src/ui-component/cards/CardGrid.jsx`
- `client/src/routes/MainRoutes.jsx`, `client/src/menu-items/dashboard.js`
- `client/package.json` — `apexcharts`, `react-apexcharts` sin uso
- `server/src/modules/security/users/users.service.js` — `countUsers`, patrón de agregación
- `server/src/modules/main.routes.js` — ausencia de rutas de dashboard
- `server/src/cron/index.js`
- `database/bdintervewebpack.sql`
