# Anti-patrones generales

- **Implementar antes de analizar.** Saltarse el [protocolo](../AGENT_WORKFLOW.md) porque el pedido "parece chico".
- **Inventar una convención cuando ya existe una.** Antes de crear un helper, un componente o un formato de respuesta, buscar el que ya existe.
- **Documentar algo como existente sin verificarlo.** Evidencia: los ADR describieron una integración con Microsoft Graph que ya no existía en el código, y el `CLAUDE.md` raíz la siguió mencionando.
- **Copiar reglas entre documentos.** La copia se desactualiza y termina contradiciendo al original. Evidencia: `ENDPOINT_STANDARD.md` y `server/CLAUDE.md` siguieron pidiendo mantener `permissionsConfig.js` sincronizado después de que ese archivo se eliminó.
- **Usar como referencia la guía de otro proyecto.** `docs/ai-module-generation-reference-csur.md` describe CSUR (PrimeReact, SQL crudo con interpolación, autor enviado por el cliente): seguirla aquí viola DEC-001, DEC-005 y el estándar de endpoints.
- **Inventar rutas, áreas o carpetas que no existen.** Evidencia: una propuesta para el maestro de tipos de identificación usó `/api/masters/identity-documents/` y `client/src/pages/admin/`, cuando lo registrado es `/api/admin/identityDocuments/` y `client/src/views/admin/identityDocuments/` (DEC-017). `pages/admin` y `/management/` vienen de la guía de CSUR. La lista cerrada está en `MODULE_STANDARD`, "Dónde vive un módulo".
- **Tratar un workflow como un CRUD.** Un contrato o una factura con un "PUT del estado" pierde las guardas, el historial y la idempotencia.
- **Sobrediseñar un catálogo.** Un maestro de nivel 1 no necesita capas, repositorios ni eventos propios.
- **Refactor masivo dentro de una tarea chica.** La deriva que no es de la tarea se anota en la [deuda](../debt/TECHNICAL_DEBT.md).
- **Resolver un bug con un parche que esconde el síntoma.** Evidencia: `error.middleware.js` leía solo `err.status`, así que casi todos los errores de negocio respondían 500. La corrección fue leer `.statusCode`, no poner `try/catch` en cada controller.
- **Llenar en silencio un requisito que falta.** Se pregunta.
- **Dejar código muerto "por si acaso".** Evidencia: `template.routes.js` y `microsoftGraph/` apuntaban a tablas inexistentes y seguían montados; uno de ellos exponía datos sin sesión.
