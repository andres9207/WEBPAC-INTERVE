# Estado del proyecto

**Última actualización:** 2026-09-29. Se actualiza cuando un cambio altera lo que está hecho, lo que falta o lo que está pendiente de decidir. No es un README: el detalle está en los documentos enlazados.

## En una línea

Plantilla base con seguridad, auditoría e integridad transaccional ya endurecidas. **Ningún módulo de negocio implementado todavía.** El dominio (obras, proveedores, maestros, contratos, pólizas, facturación) está diseñado en 27 ADR y planificado en `docs/backlog/` (185 tareas).

## Arquitectura

Ver [`ARCHITECTURE.md`](ARCHITECTURE.md).

## Implementado — CONFIRMADO

| Área | Qué hay | Referencia |
| --- | --- | --- |
| Autenticación | Sesión única, access 15 min + refresh 7 días rotado, bloqueo progresivo de login, recuperación con código HMAC | ADR-0001, DEC-002 a DEC-004 |
| Autorización | Permisos por perfil ∪ excepciones por usuario, `requirePermission` en todas las rutas de negocio, catálogo único servido al cliente | ADR-0014 |
| Usuarios, perfiles, permisos | CRUD completo, servidor y cliente | `security/*` |
| Documentos | Backend completo; en el cliente el componente está deshabilitado | `app/documents` |
| Notificaciones | Autoservicio, en tiempo real | `app/notifications` |
| Auditoría | Seis columnas de autoría con FK, eliminación lógica con evidencia, bitácora `tbl_audit_log` en la misma transacción | ADR-0013, DEC-006, DEC-007 |
| Integridad | Utilidad única de transacción, bloqueo primero y en orden fijo, reintento acotado, idempotencia por clave | ADR-0027, DEC-012, DEC-015, DEC-016 |
| Listados | Helper único `paginate`, tope de 100 | DEC-013 |
| Tests | Servidor: 24 suites, 200 tests (Jest, unitarios con mocks) | [`TESTING_STANDARD`](standards/TESTING_STANDARD.md) |

## Parcial

- **Documentos en el cliente:** `DocumentManagement` está comentado en `UserDialog.jsx`. La ruta del backend funciona y está protegida.
- **Bitácora:** se escribe, pero no hay pantalla ni endpoint para consultarla, ni política de retención (ADR-0013, B15/B16).
- **ADR-0014:** aceptado en lo que existe; las acciones de los módulos de negocio están propuestas.
- **Idempotencia:** cubre la creación; las transiciones de estado esperan el historial de estado del CORE (ADR-0027, B3).

## No implementado

Todo el dominio: maestros (ADR 0003–0010, 0019), obras (0011), proveedores (0012), contratos y conceptos (0015–0017), pólizas (0018), facturación (0020–0026) y dashboard (0002). El cliente no tiene tests. El servidor no tiene linter.

## ADR vigentes

| Estado | ADR |
| --- | --- |
| Aceptado | 0001 (abierto: MFA), 0013 (abierto: retención y consulta), 0027 |
| Aceptado parcial | 0014 |
| Propuesto (arquitectura objetivo) | 0002–0004, 0006–0012, 0015–0026 |
| Reemplazado | 0005 → 0017 |

## Invariantes

Ver [`invariants/`](invariants/README.md). Las de seguridad y sistema están **aplicadas y con tests**. Las de dominio están **propuestas**: salen de los ADR y ninguna tiene todavía mecanismo en el código ni en la BD.

## Deuda técnica

Ver [`debt/TECHNICAL_DEBT.md`](debt/TECHNICAL_DEBT.md).

## Decisiones pendientes

**De negocio** (bloquean tareas del backlog): 19 decisiones, `DEC-01` a `DEC-19`, en `docs/backlog/BACKLOG.md` ("Decisiones de negocio pendientes"). Las más urgentes: cómo se factura el avance de obra (DEC-01), la composición de las facturas (DEC-02, DEC-03) y precisión y redondeo monetario (DEC-06).

**De ingeniería** (REQUIERE DECISIÓN, antes del primer maestro):

| ID | Decisión | Por qué ahora |
| --- | --- | --- |
| PD-01 | Cómo se llenan los selects de maestros: autocompletar con búsqueda sobre `paginate` (tope 100) o excepción acotada para catálogos pequeños. Hoy existe un endpoint sin paginar para combos (`GET /app/get_profiles`), que contradice DEC-013 al pie de la letra | Todo maestro se usa en selects de otros módulos |
| PD-02 | Código HTTP de un duplicado detectado por el service: `saveProfile` responde **400**, y el mismo duplicado detectado por la BD (`P2002`) responde **409** | El cliente trata 409 de forma especial; hoy la misma situación da dos códigos |
| PD-03 | Nombre de las decisiones de negocio del backlog: `DEC-01`… choca visualmente con las fichas `DEC-001`… de `engineering/decisiones/` | Evita confundir una decisión pendiente con una regla vigente |
| PD-04 | Posición de los maestros en `LOCK_ORDER`. Todo registro que se edite o elimine debe estar en `LOCKABLE` (`database/migrations/README.md`, punto 8), y hoy el orden solo tiene contrato → factura → póliza → concepto → documento → perfil → usuario. Propuesta: los maestros al final, porque una operación bloquea primero su agregado (contrato) y después el maestro que referencia (p. ej. la aseguradora de una póliza, para que no la eliminen en medio). Cambiarlo exige actualizar ADR-0027 | Sin esto no se puede construir el primer maestro sin romper el protocolo de bloqueo |
| PD-05 | Área de los módulos de negocio en `server/src/modules/` y `client/src/views/` (p. ej. `config/` para maestros, `contracts/`, `billing/`) y el idioma de los nombres de tabla del CORE (hoy todo el esquema está en inglés: `tbl_profiles`, `tbl_users`) | Fija rutas, URLs y nombres de todos los módulos que vienen |

## Limitaciones conocidas

- Los ADR se escribieron contra `database/bdintervewebpack.sql`, que **no está** en el repositorio (DESCONOCIDO: puede ser una copia local de la BD real).
- `docs/ai-module-generation-reference-csur.md` y `docs/specs/modules/_TEMPLATE-maestro.md` describen **otro proyecto** (CSUR: PrimeReact, SQL crudo). No aplican aquí; la receta de este proyecto es [`CRUD_STANDARD`](standards/CRUD_STANDARD.md).
