# Estado del proyecto

**Última actualización:** 2026-10-02. Se actualiza cuando un cambio altera lo que está hecho, lo que falta o lo que está pendiente de decidir. No es un README: el detalle está en los documentos enlazados.

## En una línea

Plantilla base con seguridad, auditoría e integridad transaccional ya endurecidas. **Maestros implementados: aseguradoras, constructoras y tipos de identificación, de proveedor, de dirección, de interventoría y de contrato (este, con la configuración de campos por tipo). Obras con responsables y etapas. Proveedores con contactos y asignación a obras. Contratos con valor inicial, otrosí y otrosí de liquidación (fase A).** El resto del dominio (contactos de obra, maestros, suspensiones de contrato, pólizas, facturación) está diseñado en 27 ADR y planificado en `docs/backlog/` (185 tareas).

## Arquitectura

Ver [`ARCHITECTURE.md`](ARCHITECTURE.md).

## Implementado — CONFIRMADO

| Área | Qué hay | Referencia |
| --- | --- | --- |
| Autenticación | Sesión única, access 15 min + refresh 7 días rotado, bloqueo progresivo de login, recuperación con código HMAC | ADR-0001, DEC-002 a DEC-004 |
| Autorización | Permisos por perfil ∪ excepciones por usuario, `requirePermission` en todas las rutas de negocio, catálogo único servido al cliente | ADR-0014 |
| Usuarios, perfiles, permisos | CRUD completo, servidor y cliente. Listados con búsqueda de un solo campo y pestañas por estado con conteo | `security/*`, DEC-024 |
| Documentos | Backend completo; en el cliente el componente está deshabilitado | `app/documents` |
| Notificaciones | Autoservicio, en tiempo real | `app/notifications` |
| Auditoría | Seis columnas de autoría con FK, eliminación lógica con evidencia, bitácora `tbl_audit_log` en la misma transacción | ADR-0013, DEC-006, DEC-007 |
| Integridad | Utilidad única de transacción, bloqueo primero y en orden fijo, reintento acotado, idempotencia por clave | ADR-0027, DEC-012, DEC-015, DEC-016 |
| Estados de visibilidad | `tbl_status` con clave simbólica (`sta_key`). Una sola tabla de constantes en servidor y cliente: ningún código escribe el número del estado. El servidor verifica al arrancar que la BD coincida, y si no, no arranca | DEC-038, migración 0058 |
| Listados | Helper único `paginate`, tope de 100; selectores de maestros sin paginar con tope fijo, servidos por el índice (estado, nombre) | DEC-013, DEC-018, DEC-025 |
| Maestro: tipos de identificación | CRUD completo (servidor y cliente), selector, unicidad de código y nombre entre no eliminados con columna generada, bloqueo de eliminación en uso. Tipo de identificación en usuarios (`tbl_users.idd_id` con `CHECK` de número ⇔ tipo). Formato del número validado por tipo en servidor y cliente, con dígito de verificación del NIT | ADR-0008, DEC-017 a DEC-021, migraciones 0017–0021 |
| Maestro: tipos de proveedor | CRUD completo (servidor y cliente) sobre el patrón, selector de activos, nombre único entre no eliminados. Es una clasificación, sin reglas por tipo. `tbl_providers.pvt_id` lo referencia y bloquea su eliminación | ADR-0010, DEC-023, migraciones 0022–0024 |
| Maestro: tipos de dirección | CRUD completo (servidor y cliente) sobre el patrón, selector de activos para el futuro componente de contactos, nombre único entre no eliminados. Validación de correo reutilizable (`emailRule`). Lo usan los contactos de proveedor; falta la tabla de contactos de obra | ADR-0009, migraciones 0025–0027 |
| Maestro: aseguradoras | CRUD completo (servidor y cliente) sobre el patrón, selector de activas para el futuro formulario de póliza, descripción única entre no eliminadas. Falta el bloqueo de eliminación por pólizas, que llega con `tbl_policies` | ADR-0003, migraciones 0028–0029 |
| Maestro: tipos de interventoría | CRUD completo (servidor y cliente) sobre el patrón, selector de activos para el futuro formulario de obra, nombre único entre no eliminados. Faltan la FK y el bloqueo por uso, que llegan con obras; el anclaje (obra o contrato) sigue pendiente de confirmar | ADR-0007, migraciones 0030–0032 |
| Maestro: constructoras | CRUD completo (servidor y cliente) sobre el patrón, selector de activas para el futuro formulario de obra, descripción única entre no eliminadas. El bloqueo por uso contará también las obras eliminadas (`countDeleted`); llega con obras | ADR-0004, migraciones 0033–0034 |
| Maestro: tipos de contrato | CRUD completo (servidor y cliente) sobre el patrón, selector de activos, nombre único entre no eliminados. Configuración de campos por tipo: catálogo cerrado de campos (en BD y en código, con un test que los cruza), una fila por tipo y campo con aplica, visible, obligatorio y orden, jerarquía con `CHECK`, ausencia = no aplica. Guardado por diferencial bajo bloqueo del tipo, con permiso propio (75), bitácora funcional por campo, versión que sube con cada cambio e historial de versiones. Editor en matriz desde el listado. La misma resolución alimenta el formulario de contrato y valida su guardado | ADR-0006, DEC-037, migraciones 0036–0037, 0053–0057 |
| Patrón de maestro | Fábrica reutilizable: un maestro se declara con `defineMaster` (dos archivos). Listado, obtener, selector, crear, editar, cambiar estado con permiso propio, eliminar con verificación de dependientes. En el cliente, `MasterPage` + `createMasterApi`: la pantalla se declara, con búsqueda de un solo campo y pestañas por estado con conteo | DEC-020, DEC-022 |
| Obras | Obra con responsables y etapas (servidor y cliente), en el área `work/`. Listado, con detalle y formulario en un modal grande con dirección propia. Plazo con fecha de inicio, número y unidad; la fecha final la calcula el servidor. Guardado atómico con diferencial de colecciones, bloqueo obra → usuarios → maestros, permisos propios para asignar y retirar responsables y gestionar etapas, bitácora funcional, importes `DECIMAL(18,2)`. Responsables solo entre usuarios existentes. Plazo ampliado y área ocultos en la interfaz. Pestaña de proveedores asignados. Listado con indicadores y vista de tarjetas; el avance del plazo lo calcula el servidor. Pestaña de contratos de la obra. Eliminar con contratos responde 409, y quitar una etapa con contratos también. Faltan los contactos (PRO-BD-04) | ADR-0011, DEC-026 a DEC-030, DEC-033, DEC-034, migraciones 0038–0042 |
| Proveedores | Una fila por empresa, en el área `work/` (servidor y cliente): listado, con detalle y formulario con contactos en un modal grande con dirección propia. Identidad (tipo, número) única entre no eliminados con `UNIQUE`; el duplicado responde 409 con el proveedor existente, también ante una carrera (`P2002`), y el formulario lo avisa mientras se escribe. Formato del número por tipo. Cambiar la identificación tiene permiso propio. Asignación a obras con endpoints propios: asignar existente, crear y asignar en una transacción, editar la asignación y desasignar, con bitácora en la obra y en el proveedor. Se asigna desde los dos lados: la pestaña Proveedores de la obra y la pestaña Obras del proveedor, con selector de obras activas donde todavía no está. Bloqueo obra → proveedor → maestros. Eliminar con obras asignadas responde 409; desasignar de una obra donde tiene contratos, también. Faltan los documentos del proveedor y la exportación | ADR-0012, DEC-031, DEC-032, DEC-034, migraciones 0044–0047 |
| Colecciones editables | `ui-component/extended/EditableList`: filas en memoria que se guardan con su padre. `ContactsEditor`: contactos (tabla + diálogo, un solo principal), usado por proveedores y listo para los de obra. `MasterPage` acepta un diálogo propio (`dialog`). `RouteDialog`: modal grande con dirección propia para el detalle y el formulario de un agregado | DEC-022, DEC-032, DEC-034 |
| Contratos (fase A) | En el área `work/` (servidor y cliente): listado con pestañas por estado del ciclo de vida, expediente en un modal con dirección propia (resumen, valor, historial de estado) y formulario. Se crea con su valor inicial y la primera fila de historial en una transacción. Número único en la obra entre no eliminados. Etapa y proveedor de la obra, garantizados también con FK compuestas. Fecha fin derivada y persistida (inicio + plazo + prórrogas + días suspendidos). Otrosí con número asignado bajo bloqueo del contrato y prórroga; otrosí de liquidación que pasa el contrato a liquidación; modificar un concepto con permiso propio. Valor vigente, anticipo y retenido calculados, nunca guardados. Estado en `ctr_state` con transiciones declaradas; 409 si el estado no admite el acto. Etapa, observaciones, descripción y porcentajes según la configuración del tipo de contrato (DEC-037): el formulario y el diálogo de otrosí los dibujan desde los descriptores del servidor, con los valores heredados en solo lectura, y el contrato guarda la versión con que se capturó. Faltan suspensiones, conciliación de la fecha fin, inmutabilidad tras la primera factura y pólizas en la creación (fase B) | ADR-0015 a ADR-0017, DEC-035 a DEC-037, migraciones 0048–0052, 0056 |
| Tests | Servidor: 51 suites, 520 tests (Jest, unitarios con mocks) | [`TESTING_STANDARD`](standards/TESTING_STANDARD.md) |

## Parcial

- **Documentos en el cliente:** `DocumentManagement` está comentado en `UserDialog.jsx`. La ruta del backend funciona y está protegida.
- **Bitácora:** se escribe, pero no hay pantalla ni endpoint para consultarla, ni política de retención (ADR-0013, B15/B16).
- **ADR-0014:** aceptado en lo que existe; las acciones de los módulos de negocio están propuestas.
- **Idempotencia:** cubre la creación; las transiciones de estado esperan el historial de estado del CORE (ADR-0027, B3).

## No implementado

Todo el dominio salvo siete maestros, obras, proveedores y la fase A de contratos: tipos de póliza (ADR 0019), los contactos de obra (0011), los documentos de proveedor (0012, fase 6), suspensiones, reapertura y liquidación de contratos (0017), anulación de otrosí (0016), pólizas (0018), facturación (0020–0026) y dashboard (0002). El cliente no tiene tests. El servidor no tiene linter.

## ADR vigentes

| Estado | ADR |
| --- | --- |
| Aceptado | 0001 (abierto: MFA), 0013 (abierto: retención y consulta), 0027 |
| Aceptado parcial | 0003 (maestro; falta el bloqueo por pólizas), 0004 (maestro y obras), 0006 (maestro y configuración de campos; falta el permiso propio para cambiar el tipo de un contrato, regla 11), 0011 (obra, responsables y etapas; faltan contactos, bloqueo por contratos y exportación), 0007 (maestro y obras, anclado a la obra), 0008 (maestro, usuarios, proveedores y formato), 0009 (maestro y contactos de proveedor; faltan los de obra), 0010 (maestro y columna en proveedores), 0012 (proveedores, contactos y asignación a obras; faltan documentos y exportación), 0014, 0015 (contrato; faltan suspensiones, conciliación, bloqueo por facturas y fecha de vencimiento), 0016 (conceptos; faltan anulación e inmutabilidad tras facturar), 0017 (estado en columna propia, DEC-035; solo las transiciones automáticas de creación y liquidación) |
| Propuesto (arquitectura objetivo) | 0002, 0018–0026 |
| Reemplazado | 0005 → 0017 |

## Invariantes

Ver [`invariants/`](invariants/README.md). Las de seguridad y sistema están **aplicadas y con tests**. Las de dominio están **propuestas**: salen de los ADR. Aplicadas: DOM-20, DOM-21 y DOM-26 (tipo de identificación) y DOM-22 y DOM-23 (proveedores); las de contratos, en `DOMAIN_INVARIANTS.md`.

## Deuda técnica

Ver [`debt/TECHNICAL_DEBT.md`](debt/TECHNICAL_DEBT.md).

## Decisiones pendientes

**De negocio** (bloquean tareas del backlog): `DEC-01` a `DEC-20` en `docs/backlog/BACKLOG.md` ("Decisiones de negocio pendientes"); quedan 13. Resueltas: DEC-10 en [DEC-023](decisiones/DEC-023-tipo-proveedor-clasificacion.md), DEC-06 en [DEC-028](decisiones/DEC-028-convencion-monetaria.md) (importes), DEC-20 en [DEC-027](decisiones/DEC-027-interventoria-en-obra.md), DEC-13, DEC-14 y DEC-17 en [DEC-035](decisiones/DEC-035-contratos-area-modelo.md) y DEC-18 en [DEC-036](decisiones/DEC-036-conceptos-contractuales.md). DEC-05, en parte: anticipo 15 % por defecto (DEC-036); la base y el retenido siguen pendientes. Las más urgentes: cómo se factura el avance de obra (DEC-01) y la composición de las facturas (DEC-02, DEC-03).

**De ingeniería** (REQUIERE DECISIÓN):

| ID | Decisión | Por qué ahora |
| --- | --- | --- |
| PD-01 | **Resuelto** en [DEC-018](decisiones/DEC-018-selector-maestros.md): el selector de un maestro devuelve solo activos, sin paginar, con tope fijo y solo `verifyToken` | — |
| PD-02 | Código HTTP de un duplicado detectado por el service: `saveProfile` responde **400**, y el mismo duplicado detectado por la BD (`P2002`) responde **409** | El cliente trata 409 de forma especial; hoy la misma situación da dos códigos |
| PD-03 | Nombre de las decisiones de negocio del backlog: `DEC-01`… choca visualmente con las fichas `DEC-001`… de `engineering/decisiones/` | Evita confundir una decisión pendiente con una regla vigente |
| PD-04 | **Resuelto** en [DEC-019](decisiones/DEC-019-maestros-orden-bloqueo.md): los maestros van al final de `LOCK_ORDER` (ADR-0027 actualizado) | — |
| PD-05 | **Resuelto para maestros** en [DEC-017](decisiones/DEC-017-area-idioma-maestros.md): área `admin/`, inglés, nombres fijados. Obras, en [DEC-026](decisiones/DEC-026-area-obras.md): área `work/`, en inglés. Proveedores, en [DEC-031](decisiones/DEC-031-area-proveedores.md), y contratos, en [DEC-035](decisiones/DEC-035-contratos-area-modelo.md): también en `work/`. **Sigue pendiente** para pólizas y facturación: su área en `server/src/modules/` y `client/src/views/` | Fija rutas, URLs y nombres de los módulos del CORE |

## Limitaciones conocidas

- Los ADR se escribieron contra `database/bdintervewebpack.sql`, que **no está** en el repositorio (DESCONOCIDO: puede ser una copia local de la BD real).
- `docs/ai-module-generation-reference-csur.md` y `docs/specs/modules/_TEMPLATE-maestro.md` describen **otro proyecto** (CSUR: PrimeReact, SQL crudo). No aplican aquí; la receta de este proyecto es [`CRUD_STANDARD`](standards/CRUD_STANDARD.md).
