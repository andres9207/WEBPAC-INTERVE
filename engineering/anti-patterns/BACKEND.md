# Anti-patrones del backend

Además de "Prohibido, sin excepción" de [`ENDPOINT_STANDARD`](../standards/ENDPOINT_STANDARD.md). Evidencia en [`SECURITY.md`](SECURITY.md) salvo que se indique otra fuente.

| No hacer | Por qué | Evidencia |
| --- | --- | --- |
| Acceder a la BD por otra vía que no sea Prisma | `executeQuery` tomaba otra conexión si se omitía el parámetro y la escritura escapaba de la transacción | "`executeQuery` y el pool de mysql2 eliminados" |
| `prisma.$transaction` directo, o usar `prisma` dentro de una operación que ya tiene `tx` | Sin aislamiento declarado ni bloqueo, o lectura por otra conexión | ADR-0027, test de arquitectura |
| Leer un registro y después bloquearlo | Con `REPEATABLE READ` la lectura previa deja una foto vieja | "Concurrencia: aislamiento declarado y protocolo de bloqueo" |
| `sortField` u otro valor del cliente directo en `orderBy` o `where` | Inyección SQL, antes de Prisma; hoy, campos no previstos | "Migración a Prisma: cierre de inyecciones SQL" |
| Lógica de negocio en el controller | El controller solo traduce `req` ↔ service | `server/CLAUDE.md` |
| Responder errores desde el controller o devolver `{ error }` desde el service | Rompe el mapeo único de códigos y de mensajes seguros | `ERROR_HANDLING_STANDARD` |
| Lanzar errores sin `.statusCode` para casos esperados | Caen a 500 y en producción el usuario ve un mensaje genérico | "Logs y manejo de errores" |
| Guardar un saldo en una columna que hay que mantener | Se desincroniza con los movimientos | ADR-0027, regla 7 |
| Copiar datos que se pueden resolver al consultar | Los permisos copiados al crear un usuario nunca veían los cambios del perfil | "Los permisos se copiaban a `tbl_user_permissions` una sola vez" |
| Casos especiales por id (`if (useId === 1)`) | Poder atado a un id fijo, invisible al modelo de permisos | "Se eliminó por completo el bypass de código `useId === 1`" |
| Emitir un socket con `io.emit` con datos de un usuario | Lo reciben todas las sesiones abiertas | "Socket.IO y CORS" |
| Correos, sockets o `bcrypt` dentro de la transacción | Retienen el bloqueo; el efecto externo sobrevive a un rollback | ADR-0027, regla 4 |
| Eliminar en uso sin verificar dependientes | Registros huérfanos o apuntando a eliminados | "Transacciones y limpieza de dependientes" |
| `{ idempotent: true }` en crear o sumar | El reintento duplica | DEC-015 |
| Validar duplicados antes de buscar la clave de idempotencia | El reintento de una creación exitosa responde "ya existe" | DEC-016 |
| Montar rutas que nadie llama o que apuntan a tablas inexistentes | Superficie de ataque sin valor | "Endpoints inexistentes / código muerto peligroso" |
