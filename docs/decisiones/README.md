# Registro de decisiones de implementación

Qué decidimos al construir, y qué quedó como regla para lo que se construya después. Cada ficha es corta: contexto, decisión, lo que se descartó, y lo que implica para quien escriba código nuevo.

**No reemplaza a los ADR.** [`docs/adr/`](../adr/README.md) explica la arquitectura y su porqué con todo el análisis. Esta carpeta registra lo que ya está hecho y es regla hoy, y enlaza al ADR del que sale cada decisión.

## Cómo usar este registro

- **Antes de construir un módulo o endpoint nuevo**, lee las fichas marcadas como **Obligatoria**. Son las que también exige el checklist de [`server/ENDPOINT_STANDARD.md`](../../server/ENDPOINT_STANDARD.md).
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

**Tipo:**
- **Obligatoria**: regla para todo código nuevo. El checklist de `ENDPOINT_STANDARD.md` la exige y, donde se puede, un test la hace cumplir.
- **Vigente**: decisión tomada sobre un módulo que ya existe; no impone una regla general.

## Pendientes que dejan estas decisiones

**Despliegue:**
- Aplicar las migraciones `0011` a `0015` en orden. La `0014` vacía sesiones, códigos de recuperación e intentos de login, así que va junto con el despliegue ([DEC-009](DEC-009-zona-horaria.md)), no antes.
- Restringir el usuario de BD de la aplicación a `INSERT`/`SELECT` sobre `tbl_audit_log` ([DEC-007](DEC-007-bitacora-funcional.md)).

**Funcionalidad abierta:**

| Pendiente | Referencia |
| --- | --- |
| Pantalla y endpoint para consultar la bitácora, con permiso propio (`per_id` 17) | ADR-0013, B16 |
| Política de retención de la bitácora | ADR-0013, B15 |
| Idempotencia y reintento acotado ante interbloqueo | ADR-0027, B3 y B5 |
| `UNIQUE` en el nombre de perfil: dos creaciones simultáneas con el mismo nombre pueden pasar | ADR-0027, B4 |
| MFA | ADR-0001 |

**Limpieza menor:**
- Retirar `DB_HOST`/`DB_USER`/`DB_NAME`/`DB_PASSWORD` de `.env.template` y la dependencia `mysql2` de `package.json`. Ya no los usa nada.
- Varios hallazgos anotados en [`SECURITY.md`](../../SECURITY.md), sección "Pendientes".
