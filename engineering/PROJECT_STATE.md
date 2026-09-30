# Estado del proyecto

**Última actualización:** 2026-09-29. Se actualiza cuando un cambio altera lo que está hecho, lo que falta o lo que está pendiente de decidir. No es un README: el detalle está en los documentos enlazados.

## En una línea

Plantilla base con seguridad, auditoría e integridad transaccional ya endurecidas. **Maestros implementados: aseguradoras, constructoras y tipos de identificación, de proveedor, de dirección y de interventoría.** El resto del dominio (obras, proveedores, maestros, contratos, pólizas, facturación) está diseñado en 27 ADR y planificado en `docs/backlog/` (185 tareas).

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
| Listados | Helper único `paginate`, tope de 100; selectores de maestros sin paginar con tope fijo, servidos por el índice (estado, nombre) | DEC-013, DEC-018, DEC-025 |
| Maestro: tipos de identificación | CRUD completo (servidor y cliente), selector, unicidad de código y nombre entre no eliminados con columna generada, bloqueo de eliminación en uso. Tipo de identificación en usuarios (`tbl_users.idd_id` con `CHECK` de número ⇔ tipo). Formato del número validado por tipo en servidor y cliente, con dígito de verificación del NIT | ADR-0008, DEC-017 a DEC-021, migraciones 0017–0021 |
| Maestro: tipos de proveedor | CRUD completo (servidor y cliente) sobre el patrón, selector de activos, nombre único entre no eliminados. Es una clasificación, sin reglas por tipo. Falta la FK desde `tbl_providers`, que todavía no existe | ADR-0010, DEC-023, migraciones 0022–0024 |
| Maestro: tipos de dirección | CRUD completo (servidor y cliente) sobre el patrón, selector de activos para el futuro componente de contactos, nombre único entre no eliminados. Validación de correo reutilizable (`emailRule`). Faltan las tablas de contacto de obra y de proveedor | ADR-0009, migraciones 0025–0027 |
| Maestro: aseguradoras | CRUD completo (servidor y cliente) sobre el patrón, selector de activas para el futuro formulario de póliza, descripción única entre no eliminadas. Falta el bloqueo de eliminación por pólizas, que llega con `tbl_policies` | ADR-0003, migraciones 0028–0029 |
| Maestro: tipos de interventoría | CRUD completo (servidor y cliente) sobre el patrón, selector de activos para el futuro formulario de obra, nombre único entre no eliminados. Faltan la FK y el bloqueo por uso, que llegan con obras; el anclaje (obra o contrato) sigue pendiente de confirmar | ADR-0007, migraciones 0030–0032 |
| Maestro: constructoras | CRUD completo (servidor y cliente) sobre el patrón, selector de activas para el futuro formulario de obra, descripción única entre no eliminadas. El bloqueo por uso contará también las obras eliminadas (`countDeleted`); llega con obras | ADR-0004, migraciones 0033–0034 |
| Patrón de maestro | Fábrica reutilizable: un maestro se declara con `defineMaster` (dos archivos). Listado, obtener, selector, crear, editar, cambiar estado con permiso propio, eliminar con verificación de dependientes. En el cliente, `MasterPage` + `createMasterApi`: la pantalla se declara, con búsqueda de un solo campo y pestañas por estado con conteo | DEC-020, DEC-022 |
| Tests | Servidor: 34 suites, 303 tests (Jest, unitarios con mocks) | [`TESTING_STANDARD`](standards/TESTING_STANDARD.md) |

## Parcial

- **Documentos en el cliente:** `DocumentManagement` está comentado en `UserDialog.jsx`. La ruta del backend funciona y está protegida.
- **Bitácora:** se escribe, pero no hay pantalla ni endpoint para consultarla, ni política de retención (ADR-0013, B15/B16).
- **ADR-0014:** aceptado en lo que existe; las acciones de los módulos de negocio están propuestas.
- **Idempotencia:** cubre la creación; las transiciones de estado esperan el historial de estado del CORE (ADR-0027, B3).

## No implementado

Todo el dominio salvo seis maestros: los otros dos maestros (ADR 0006, 0019), obras (0011), proveedores (0012), contratos y conceptos (0015–0017), pólizas (0018), facturación (0020–0026) y dashboard (0002). El cliente no tiene tests. El servidor no tiene linter.

## ADR vigentes

| Estado | ADR |
| --- | --- |
| Aceptado | 0001 (abierto: MFA), 0013 (abierto: retención y consulta), 0027 |
| Aceptado parcial | 0003 (maestro; falta el bloqueo por pólizas), 0004 (maestro; falta obras), 0007 (maestro; falta obras y confirmar el anclaje), 0008 (maestro, usuarios y formato; falta proveedores), 0009 (maestro; faltan los contactos), 0010 (maestro; falta la columna en proveedores), 0014 |
| Propuesto (arquitectura objetivo) | 0002, 0006, 0011, 0012, 0015–0026 |
| Reemplazado | 0005 → 0017 |

## Invariantes

Ver [`invariants/`](invariants/README.md). Las de seguridad y sistema están **aplicadas y con tests**. Las de dominio están **propuestas**: salen de los ADR. Solo DOM-20, DOM-21 y DOM-26 están aplicadas, para el tipo de identificación.

## Deuda técnica

Ver [`debt/TECHNICAL_DEBT.md`](debt/TECHNICAL_DEBT.md).

## Decisiones pendientes

**De negocio** (bloquean tareas del backlog): 19 decisiones, `DEC-01` a `DEC-19`, en `docs/backlog/BACKLOG.md` ("Decisiones de negocio pendientes"). Las más urgentes: cómo se factura el avance de obra (DEC-01), la composición de las facturas (DEC-02, DEC-03) y precisión y redondeo monetario (DEC-06).

**De ingeniería** (REQUIERE DECISIÓN):

| ID | Decisión | Por qué ahora |
| --- | --- | --- |
| PD-01 | **Resuelto** en [DEC-018](decisiones/DEC-018-selector-maestros.md): el selector de un maestro devuelve solo activos, sin paginar, con tope fijo y solo `verifyToken` | — |
| PD-02 | Código HTTP de un duplicado detectado por el service: `saveProfile` responde **400**, y el mismo duplicado detectado por la BD (`P2002`) responde **409** | El cliente trata 409 de forma especial; hoy la misma situación da dos códigos |
| PD-03 | Nombre de las decisiones de negocio del backlog: `DEC-01`… choca visualmente con las fichas `DEC-001`… de `engineering/decisiones/` | Evita confundir una decisión pendiente con una regla vigente |
| PD-04 | **Resuelto** en [DEC-019](decisiones/DEC-019-maestros-orden-bloqueo.md): los maestros van al final de `LOCK_ORDER` (ADR-0027 actualizado) | — |
| PD-05 | **Resuelto para maestros** en [DEC-017](decisiones/DEC-017-area-idioma-maestros.md): área `admin/`, inglés, nombres fijados. **Sigue pendiente** para obras, proveedores, contratos, pólizas y facturación: su área en `server/src/modules/` y `client/src/views/`, y si el idioma inglés de DEC-017 se extiende al CORE | Fija rutas, URLs y nombres de los módulos del CORE |

## Limitaciones conocidas

- Los ADR se escribieron contra `database/bdintervewebpack.sql`, que **no está** en el repositorio (DESCONOCIDO: puede ser una copia local de la BD real).
- `docs/ai-module-generation-reference-csur.md` y `docs/specs/modules/_TEMPLATE-maestro.md` describen **otro proyecto** (CSUR: PrimeReact, SQL crudo). No aplican aquí; la receta de este proyecto es [`CRUD_STANDARD`](standards/CRUD_STANDARD.md).
