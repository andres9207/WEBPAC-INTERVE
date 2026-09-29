# Registro de decisiones de implementación

Qué decidimos al construir, y qué quedó como regla para lo que se construya después. Cada ficha es corta: contexto, decisión, lo que se descartó, y lo que implica para quien escriba código nuevo.

**No reemplaza a los ADR.** [`engineering/adr/`](../adr/README.md) explica la arquitectura y su porqué con todo el análisis. Esta carpeta registra lo que ya está hecho y es regla hoy, y enlaza al ADR del que sale cada decisión.

## Cómo usar este registro

- **Antes de construir un módulo o endpoint nuevo**, lee las fichas marcadas como **Obligatoria**. Son las que también exige el checklist de [`ENDPOINT_STANDARD.md`](../standards/ENDPOINT_STANDARD.md).
- **Una decisión nueva** se registra en una ficha nueva `DEC-NNN-tema.md`, con el número siguiente, y se agrega a la tabla de abajo. El número no se reutiliza.
- **Una decisión que cambia** no se reescribe: se crea una ficha nueva que la reemplaza, y la vieja pasa a estado `Reemplazada por DEC-NNN`.

## Decisiones

| # | Fecha | Decisión | Tipo | ADR |
| --- | --- | --- | --- | --- |
| [DEC-001](DEC-001-prisma-acceso-unico.md) | 2026-09-24 | Prisma es el único acceso a la base de datos | Obligatoria | [0001](../adr/0001-seguridad.md), [0027](../adr/0027-integridad-transaccional.md) |
| [DEC-002](DEC-002-sesion-unica-refresh.md) | 2026-09-24 | Sesión única, access 15 min + refresh 7 días rotado | Vigente | [0001](../adr/0001-seguridad.md) |
| [DEC-003](DEC-003-login-bloqueo-progresivo.md) | 2026-09-24 | Login con bloqueo progresivo por cuenta y respuesta uniforme | Vigente | [0001](../adr/0001-seguridad.md) |
| [DEC-004](DEC-004-recuperacion-contrasena.md) | 2026-09-24 | Código de recuperación con hash, 5 intentos y uno por usuario | Vigente | [0001](../adr/0001-seguridad.md) |
| [DEC-005](DEC-005-identidad-desde-sesion.md) | 2026-09-24 | La identidad y el autor salen siempre de la sesión, nunca del cliente | Obligatoria | [0001](../adr/0001-seguridad.md), [0013](../adr/0013-auditoria-trazabilidad.md) |
| [DEC-006](DEC-006-columnas-autoria-eliminacion.md) | 2026-09-24 | Seis columnas de autoría con FK y eliminación lógica con evidencia | Obligatoria | [0013](../adr/0013-auditoria-trazabilidad.md) |
| [DEC-007](DEC-007-bitacora-funcional.md) | 2026-09-24 | Bitácora `tbl_audit_log` escrita desde el servicio, en la misma transacción | Obligatoria | [0013](../adr/0013-auditoria-trazabilidad.md) |
| [DEC-008](DEC-008-eventos-seguridad.md) | 2026-09-24 | Qué eventos de seguridad se registran y cuáles no | Vigente | [0001](../adr/0001-seguridad.md), [0013](../adr/0013-auditoria-trazabilidad.md) |
| [DEC-009](DEC-009-zona-horaria.md) | 2026-09-24 | La base de datos trabaja en UTC; la hora local se aplica al mostrar | Obligatoria | [0013](../adr/0013-auditoria-trazabilidad.md) |
| [DEC-010](DEC-010-nombres-columnas.md) | 2026-09-24 | Prefijo único por tabla y sufijos `_create_at` / `_update_at` | Obligatoria | [0013](../adr/0013-auditoria-trazabilidad.md) |
| [DEC-011](DEC-011-endurecimiento-adr-0001.md) | 2026-09-24 | Endurecimiento general del backend heredado | Vigente | [0001](../adr/0001-seguridad.md) |
| [DEC-012](DEC-012-transacciones-bloqueos.md) | 2026-09-25 | Transacciones con utilidad única, `REPEATABLE READ` y protocolo de bloqueo | Obligatoria | [0027](../adr/0027-integridad-transaccional.md) |
| [DEC-013](DEC-013-paginacion.md) | 2026-09-25 | Paginación con helper único y tope de 100 filas | Obligatoria | — |
| [DEC-014](DEC-014-autor-por-nombre.md) | 2026-09-25 | Los listados muestran el autor por nombre, resuelto en el backend | Obligatoria | [0013](../adr/0013-auditoria-trazabilidad.md) |
| [DEC-015](DEC-015-reintento-interbloqueo.md) | 2026-09-25 | Reintento acotado del interbloqueo solo en operaciones idempotentes; 409 si persiste, 503 ante espera agotada | Obligatoria | [0027](../adr/0027-integridad-transaccional.md) |
| [DEC-016](DEC-016-idempotencia-por-clave.md) | 2026-09-25 | Idempotencia por clave (`Idempotency-Key`) en creación, con la clave y la huella en la propia entidad | Obligatoria | [0027](../adr/0027-integridad-transaccional.md) |
| [DEC-017](DEC-017-area-idioma-maestros.md) | 2026-09-29 | Los maestros viven en el área `admin/`, con tablas y código en inglés y nombres fijados | Obligatoria | 0003, 0004, 0006–0010, 0019 |
| [DEC-018](DEC-018-selector-maestros.md) | 2026-09-29 | Los selectores de maestros devuelven solo activos, sin paginar, con tope fijo y solo `verifyToken` | Obligatoria | [0008](../adr/0008-tipos-identificacion.md), [0014](../adr/0014-autorizacion-permisos.md) |
| [DEC-019](DEC-019-maestros-orden-bloqueo.md) | 2026-09-29 | Los maestros van al final de `LOCK_ORDER`; asignar un maestro lo bloquea | Obligatoria | [0027](../adr/0027-integridad-transaccional.md) |
| [DEC-020](DEC-020-patron-maestro.md) | 2026-09-29 | Los maestros se declaran sobre un patrón reutilizable; el cambio de estado es una acción con permiso propio | Obligatoria | 0003, 0004, 0006–0010, 0019 |

**Tipo:**
- **Obligatoria**: regla para todo código nuevo. El checklist de `ENDPOINT_STANDARD.md` la exige y, donde se puede, un test la hace cumplir.
- **Vigente**: decisión tomada sobre un módulo que ya existe; no impone una regla general.

## Pendientes que dejan estas decisiones

Lo que estas decisiones dejaron abierto (despliegue, funcionalidad y limpieza) está en [`debt/TECHNICAL_DEBT.md`](../debt/TECHNICAL_DEBT.md), la lista única de pendientes del proyecto.
