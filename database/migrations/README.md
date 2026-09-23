# Migraciones de base de datos

`bdtemplate.sql` (carpeta padre) es el **schema base congelado**: `CREATE TABLE`/`ALTER TABLE` únicamente, sin datos. No se le vuelven a agregar cambios de esquema ni datos — cada cambio nuevo a la base de datos (columna, tabla, dato semilla, etc.) va en un archivo nuevo acá, numerado en orden.

## Cómo provisionar una base de datos desde cero

```
mysql < database/bdtemplate.sql
mysql < database/migrations/0001_seed_pages_permissions.sql
mysql < database/migrations/0002_....sql
...
```

En orden numérico, sin saltarse ninguno.

## Convención para archivos nuevos

- Nombre: `NNNN_descripcion_corta.sql`, número siguiente al más alto ya existente, sin reusar ni reordenar (`0002`, `0003`, ...).
- Un archivo = un cambio lógico (una tabla nueva, una columna nueva, un seed de catálogo, etc.) — no mezclar cambios sin relación en el mismo archivo.
- Encabezado obligatorio en cada archivo: qué hace, de qué migración anterior depende (si aplica), y si asume algo sobre datos ya existentes (perfiles, usuarios, etc.) — ver `0001_seed_pages_permissions.sql` como referencia.
- Si el cambio también aplica sobre la BD de desarrollo actual (no solo sobre una instalación nueva), aplicarlo ahí a mano (`mysql < database/migrations/000N_....sql` contra la BD real) además de dejarlo versionado acá — este archivo no se autoaplica solo.
- Si el cambio es puro dato de catálogo/semilla (no estructura), preferir además un script de Prisma idempotente en `server/prisma/seed.js` (usando `upsert`) para poder re-sembrar una BD que ya tiene datos sin duplicar — ver cómo conviven `0001_seed_pages_permissions.sql` (estructura mínima, para una instalación nueva) y `server/prisma/seed.js` (`yarn db:seed`, repara una BD existente y además asigna permisos al perfil Superadmin).

## Relación con Prisma

`server/prisma/schema.prisma` se genera por introspección (`prisma db pull`) contra la base de datos real, **no** por `prisma migrate`. Cualquier cambio de estructura hecho acá (una columna/tabla nueva) requiere correr `npx prisma db pull` de nuevo en `server/` después de aplicar la migración, para que el cliente de Prisma se entere del cambio.
