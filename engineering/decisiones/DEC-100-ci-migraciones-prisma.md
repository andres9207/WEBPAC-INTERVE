# DEC-100 — El CI arma la BD con las migraciones y comprueba schema.prisma

**Fecha:** 2026-10-29 · **Tipo:** Obligatoria · **ADR:** — (infraestructura, sigue a [DEC-095](DEC-095-ci-health-check.md))

Pedido por el usuario el 2026-10-29: validar los cambios de Prisma cuando se agrega o se elimina una columna.

## Contexto

- `schema.prisma` se obtiene leyendo la BD (`prisma db pull`), y la fuente de verdad son las migraciones SQL ([DATABASE_STANDARD](../standards/DATABASE_STANDARD.md)). Nada comprobaba que coincidieran.
- **Medido el 2026-10-29:**
  - Las 129 migraciones, más `bdtemplate.sql`, se aplican sin errores sobre una BD MySQL 8.0 vacía.
  - La BD que resulta tiene las mismas tablas, columnas, índices y 193 FK que la de desarrollo.
  - Solo cambia el nombre de la regla de las FK: las migraciones las crean como `NO ACTION` y la BD de desarrollo las tiene como `RESTRICT`. En InnoDB son la misma regla: las dos impiden en el momento borrar o cambiar una fila referenciada.
- `schema.prisma` tenía 115 relaciones con una regla distinta de la BD y le faltaba el índice `tbl_invoice_glosses_invoice`. Se alinearon con la BD de desarrollo, sin cambiar orden, nombres ni tipos. El cliente de Prisma no cambia: con FK reales, las reglas las aplica la BD.

## Decisión

- **Job "Base de datos · migraciones y Prisma"** en `.github/workflows/ci.yml`:
  1. Levanta un **MySQL 8.0 temporal y vacío**, solo del job. El CI no tiene credenciales de desarrollo ni de producción.
  2. Aplica `bdtemplate.sql` y todas las migraciones en orden numérico, como una instalación nueva. Una que falle detiene el job y queda marcada en su archivo.
  3. Comprueba con `.github/scripts/prisma-drift.mjs` que `schema.prisma` describa esa BD.
- **`prisma-drift.mjs`** usa `prisma migrate diff --script`, que es de solo lectura.
  - Descarta las FK que Prisma quiere volver a crear idénticas salvo `NO ACTION` ↔ `RESTRICT`, verificando contra `information_schema` que tengan las mismas columnas y la misma tabla de destino.
  - **Cualquier otra diferencia falla** y muestra el SQL que la explica (por ejemplo, `ALTER TABLE tbl_works DROP COLUMN …`).
  - Sirve también contra la BD de desarrollo: `MYSQL_BIN` apunta al cliente `mysql` en Windows.
- **El job falla si:**
  - una migración no se puede aplicar sobre una BD nueva;
  - se agregó una migración sin `prisma db pull`;
  - `schema.prisma` se editó sin migración.

## Descartado

- **`prisma migrate diff --exit-code` sin filtro:** fallaba siempre por las 189 FK que solo difieren en el nombre de la regla.
- **Cambiar las FK de la BD de desarrollo a `NO ACTION`:** era un `ALTER` sobre esa BD para un cambio sin efecto.
- **`prisma migrate`, `migrate dev`, `migrate reset`, `db push`:** el proyecto no los usa, y los tres últimos pueden borrar datos.
- **`db:check-invariants` en este job:** necesita filas de las que partir, y en una BD vacía queda "sin datos". Queda pendiente.

## Qué implica

- **Una columna nueva:** migración SQL, aplicarla en desarrollo, `npx prisma db pull` y `npx prisma generate`, en el mismo commit que el código.
- **Eliminar una columna:** primero el código que ya no la usa; en otro despliegue, la migración con `DROP COLUMN` y `db pull`.
- En producción nunca se corre `db pull` ni `migrate`: se aplican las migraciones pendientes, con respaldo previo, y se despliega el código.

## Dónde

`.github/workflows/ci.yml` (job `database`) · `.github/scripts/prisma-drift.mjs` · `server/prisma/schema.prisma` (reglas de las relaciones e índice `tbl_invoice_glosses_invoice`).
