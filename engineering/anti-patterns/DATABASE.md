# Anti-patrones de base de datos

Evidencia en [`SECURITY.md`](SECURITY.md) salvo que se indique otra fuente.

| No hacer | Por qué | Evidencia |
| --- | --- | --- |
| Listas en una columna CSV | Se lee con `FIND_IN_SET` o se interpola; no tiene integridad | `tbl_users.use_pages` y `tbl_profiles.pro_pages`, reemplazadas por `tbl_user_pages` (migraciones 0004–0006) |
| Columnas de autoría sin FK | Pueden apuntar a usuarios que no existen | DEC-006, migración 0011 |
| Guardar quién eliminó en `*_update_by` | La siguiente edición lo pisa | DEC-006, migración 0012 |
| Borrado físico de registros de negocio | Se pierde la evidencia | ADR-0013 |
| Reutilizar un prefijo de tabla | Columnas ambiguas entre tablas | DEC-010 (`pro_` de perfiles frente a proveedores) |
| `_created_at` en vez de `_create_at` | Sufijos inconsistentes | DEC-010, migración 0015 |
| Sesión MySQL en `SYSTEM` | Fechas desfasadas 5 horas entre lo escrito y lo leído | DEC-009, migración 0014 |
| Unicidad solo en el código | Dos creaciones simultáneas pasan el control | ADR-0027 (B4: nombre de perfil) |
| Declarar en `schema.prisma` una relación que no tiene FK en la BD | El modelo miente sobre la integridad | `server/CLAUDE.md` |
| Editar `bdtemplate.sql` o una migración ya aplicada | Las instalaciones existentes nunca reciben el cambio | `database/migrations/README.md` |
| Renumerar o reutilizar `per_id` / `pag_id` | Rompe permisos ya asignados | `server/CLAUDE.md` |
| `FLOAT`/`DOUBLE` para dinero | Errores de redondeo en saldos que deben cerrar exacto | ADR-0026 |
| `UPDATE` o `DELETE` sobre `tbl_audit_log`, o disparadores que escriban en ella | La bitácora es de solo escritura desde el service | ADR-0013 |
| Semillas solo en SQL o solo en `seed.js` | Una instalación nueva o una BD existente queda sin el dato | `database/migrations/README.md` |
