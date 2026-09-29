# Patrón: operaciones asíncronas y efectos externos

**Cuándo:** algo tiene que pasar fuera de la petición o fuera de la BD: notificar en tiempo real, enviar un correo, subir un archivo, correr una tarea programada. No hay colas ni workers en este proyecto.

## Regla principal

**Ningún efecto externo dentro de una transacción.** Primero se confirma la operación; después se notifica. Si el efecto falla, no revierte lo confirmado.

## Socket.IO — CONFIRMADO

| Uso | Cómo | Referencia |
| --- | --- | --- |
| Evento para un usuario | `getIO().to(\`user:${useId}\`).emit(…)` | `permissions.service.js` (`update-permissions`), `notifications.service.js` |
| Refresco global sin datos | `getIO().emit("refresh-<modulo>", {})` desde el controller, después de que el service volvió | `profiles.controller.js` (`refresh-profiles`) |
| Cerrar la sesión en vivo | Sala `session:<sid>`, al revocar | `session.service.js` |

Nunca `io.emit` con datos de un usuario: los recibe todo el mundo (ver [`anti-patterns/SECURITY.md`](../anti-patterns/SECURITY.md), "Socket.IO y CORS").

## Correo — CONFIRMADO

`sendEmail` de `common/services/mailerService.js`, **después** de la transacción. Si la respuesta no debe revelar nada (recuperación de contraseña), el envío va desacoplado de la respuesta (sin `await` sobre el SMTP) y con un piso de tiempo fijo, para no filtrar por temporización si la cuenta existe. Referencia: `forgotPassword` en `auth.service.js`.

## Archivos — CONFIRMADO

El cliente sube y descarga directo contra Firebase Storage; el servidor guarda solo los metadatos (`tbl_documents`). El servidor no descarga URLs arbitrarias: `GET /documents/blob` se eliminó por SSRF.

## Tareas programadas — infraestructura CONFIRMADA, sin uso

`server/src/cron/index.js`: agregar el job a `cronJobs` con `name`, `schedule` (UTC) y `handler`. `server.js` los arranca, salvo en `development`. Un job que escribe sigue las mismas reglas que un endpoint: transacción de la utilidad, bloqueo y bitácora con un autor de sistema (`use_id` nulo).

Ejemplo previsto por los ADR: alertas de vencimiento de pólizas (ADR-0002, ADR-0018). ADR-0027 establece que la conciliación de saldos **reporta, no corrige**.
