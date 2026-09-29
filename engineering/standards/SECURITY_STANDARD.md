# Estándar de seguridad

Índice de dónde vive cada regla de seguridad. Las reglas no se copian aquí para que no se desactualicen.

| Tema | Dónde está la regla |
| --- | --- |
| Pipeline de toda ruta: `verifyToken → requirePermission → schema → validate → controller` | [`ENDPOINT_STANDARD`](ENDPOINT_STANDARD.md), pasos 1–4 |
| Lo que está prohibido (SQL con nombres de columna del cliente, secretos en el body, logs con `req.body`, endpoints que revelan existencia, sockets sin JWT…) | [`ENDPOINT_STANDARD`](ENDPOINT_STANDARD.md), "Prohibido, sin excepción" |
| Qué nunca puede dejar de ser verdad | [`../invariants/SECURITY_INVARIANTS.md`](../invariants/SECURITY_INVARIANTS.md) |
| Por qué existe cada regla: incidentes reales corregidos | [`../anti-patterns/SECURITY.md`](../anti-patterns/SECURITY.md) |
| Sesiones, login, recuperación de contraseña | [ADR-0001](../adr/0001-seguridad.md), DEC-002 a DEC-004, `server/CLAUDE.md` "Sesiones" |
| Modelo de permisos | [ADR-0014](../adr/0014-autorizacion-permisos.md), `server/CLAUDE.md` "Resolución de permisos efectivos" |
| Identidad y autor desde la sesión | [DEC-005](../decisiones/DEC-005-identidad-desde-sesion.md) |
| Eventos de seguridad que se auditan | [DEC-008](../decisiones/DEC-008-eventos-seguridad.md) |
| Hallazgos abiertos | [`../debt/TECHNICAL_DEBT.md`](../debt/TECHNICAL_DEBT.md), "Seguridad" |

## Reglas que aplican a todo cambio

1. El backend es la autoridad. El cliente oculta; el servidor decide.
2. El sujeto y el autor salen de `req.user`. Nunca del body, la query ni un encabezado.
3. Toda ruta de negocio lleva `requirePermission`, también las de lectura. Una ruta sin permiso explícito se trata como defecto hasta que se declare pública a propósito.
4. Sin casos especiales por usuario: Superadmin es un perfil con todos los permisos, no un `if`.
5. Un permiso de asignar no sirve para asignarse a uno mismo.
6. Todo cambio de seguridad requiere aprobación explícita ([`AGENT_WORKFLOW`](../AGENT_WORKFLOW.md), paso 6) y, una vez corregido, una entrada en [`../anti-patterns/SECURITY.md`](../anti-patterns/SECURITY.md).
