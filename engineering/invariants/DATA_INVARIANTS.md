# Invariantes de datos

Reglas del esquema. Detalle en [`../standards/DATABASE_STANDARD.md`](../standards/DATABASE_STANDARD.md).

| ID | Invariante | Estado | Mecanismo | Fuente |
| --- | --- | --- | --- | --- |
| DAT-01 | Todo `*_create_by`, `*_update_by` y `*_delete_by` apunta a un usuario existente o es `NULL` | APLICADA en `tbl_users`, `tbl_profiles`, `tbl_documents` | FK a `tbl_users.use_id` (migración 0011) | DEC-006 |
| DAT-02 | `sta_id = 3` es lo único que decide que un registro no se ve | APLICADA | Filtro `sta_id: { not: 3 }` en los listados | DEC-006 |
| DAT-03 | Un registro eliminado desde la migración 0012 tiene `*_delete_by` y `*_delete_at`; un registro visible no los tiene | APLICADA en usuarios, perfiles y documentos | Services de eliminación y reactivación, con tests | DEC-006 |
| DAT-04 | Un registro ya eliminado no se vuelve a eliminar | APLICADA en usuarios; **deriva** en perfiles (responde 400 en vez de 404) | Service | DEC-006, [deuda](../debt/TECHNICAL_DEBT.md) |
| DAT-05 | Los registros de negocio no se borran físicamente | CONVENCIÓN | Revisión | ADR-0013 |
| DAT-06 | Cada tabla tiene un prefijo propio y único | CONVENCIÓN | Revisión | DEC-010 |
| DAT-07 | `per_id` y `pag_id` no cambian ni se reutilizan (retirados: 10, 15, 16) | CONVENCIÓN | Revisión, `server/CLAUDE.md` | ADR-0014 |
| DAT-08 | Una clave de idempotencia aparece como máximo una vez por tabla | APLICADA | `UNIQUE uq_<tabla>_idempotency_key` (migración 0016) | DEC-016 |
| DAT-09 | Las relaciones N:M viven en tablas puente, nunca en CSV | APLICADA en lo existente | `tbl_user_pages`, `tbl_page_permissions` | `anti-patterns/DATABASE.md` |
| DAT-10 | El nombre de un perfil no eliminado es único | CONVENCIÓN: el service lo controla, pero dos creaciones simultáneas pueden pasar | Pendiente: `UNIQUE` (ADR-0027, B4) | [deuda](../debt/TECHNICAL_DEBT.md) |
