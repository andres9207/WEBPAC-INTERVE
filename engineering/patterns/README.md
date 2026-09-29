# Patrones

Cómo se resuelve cada tipo de problema en este proyecto, con el código de referencia donde existe. Un estándar dice qué es obligatorio; un patrón muestra cómo se cumple.

| Patrón | Nivel ([`MODULE_STANDARD`](../standards/MODULE_STANDARD.md)) | Estado | Referencia en el código |
| --- | --- | --- | --- |
| [`SIMPLE_CRUD.md`](SIMPLE_CRUD.md) | 1 | **CONFIRMADO** | `security/profiles` (la parte sin hijos) |
| [`COMPLEX_CRUD.md`](COMPLEX_CRUD.md) | 2 | **CONFIRMADO** | `security/profiles` (páginas), `security/users` |
| [`STATE_MACHINE.md`](STATE_MACHINE.md) | 3 | **OBJETIVO** — no hay ninguno implementado | ADR-0017, ADR-0020 |
| [`TRANSACTIONAL_WORKFLOW.md`](TRANSACTIONAL_WORKFLOW.md) | 3–4 | Utilidad **CONFIRMADA**; uso con varias entidades, **OBJETIVO** | `transaction.service.js`, `saveUser` |
| [`CROSS_MODULE_OPERATION.md`](CROSS_MODULE_OPERATION.md) | 4 | **OBJETIVO** | ADR-0027, catálogo de operaciones |
| [`ASYNC_OPERATION.md`](ASYNC_OPERATION.md) | Transversal | **CONFIRMADO** | sockets, correo de recuperación, cron |

Un patrón marcado **OBJETIVO** se completa con el código real la primera vez que se implementa, y pasa a **CONFIRMADO**.
