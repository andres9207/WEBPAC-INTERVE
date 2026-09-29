# CLAUDE.md

Punto de entrada para Claude Code. **No reemplaza a [`engineering/`](engineering/README.md): apunta a él.** Las reglas del proyecto viven allí.

## Antes de modificar el proyecto

1. Leer [`engineering/README.md`](engineering/README.md) y [`engineering/AGENT_WORKFLOW.md`](engineering/AGENT_WORKFLOW.md), y seguir el protocolo.
2. Según el cambio, cargar solo lo relevante: el estándar del área (`engineering/standards/`), el patrón (`engineering/patterns/`), los ADR y DEC del módulo, y las invariantes que toca.
3. Todo endpoint o service nuevo sigue [`engineering/standards/ENDPOINT_STANDARD.md`](engineering/standards/ENDPOINT_STANDARD.md). Es obligatorio.
4. Antes de un módulo nuevo: [`engineering/standards/MODULE_STANDARD.md`](engineering/standards/MODULE_STANDARD.md) para clasificarlo, y [`engineering/PROJECT_STATE.md`](engineering/PROJECT_STATE.md) para las decisiones pendientes que lo bloquean.

## Contexto que se carga en cada sesión

Estos tres archivos se importan siempre: el protocolo no depende de que el agente decida leerlo. El resto de `engineering/` se carga según el tipo de cambio, como indica el protocolo.

@engineering/README.md
@engineering/AGENT_WORKFLOW.md
@engineering/PROJECT_STATE.md

## Resumen del repositorio

Sistema de registro y control de contratos de materiales con proveedores, contratistas y subcontratistas ("WEBPAC-INTERVE"), construido sobre una plantilla full-stack de administración. Hoy tiene la base (seguridad, auditoría, integridad transaccional); el dominio está diseñado en `engineering/adr/` y todavía no está implementado.

- `client/` — React 19 + Vite, MUI 7 (template Berry), react-router 7, axios, socket.io-client. Guía: [`client/CLAUDE.md`](client/CLAUDE.md).
- `server/` — Express 4 (ESM), Prisma sobre MySQL, JWT en cookies, Socket.IO, Nodemailer. Guía: [`server/CLAUDE.md`](server/CLAUDE.md).
- `database/` — `bdtemplate.sql` (schema base congelado) y `migrations/` numeradas. Convención: [`database/migrations/README.md`](database/migrations/README.md).
- `engineering/` — sistema de ingeniería: protocolo, estándares, patrones, anti-patrones, invariantes, ADR, decisiones, plantillas y deuda.
- `docs/` — backlog, prompts con que se generaron los ADR y specs en borrador. No son reglas.

Cliente y servidor son proyectos Node independientes, cada uno con su `package.json` y `yarn.lock`. Ambos fijan versiones con Volta (`node@20.20.2`, `yarn@4.16.0`).

## Configuración de entorno

Copiar `client/.env.template` → `client/.env` y `server/.env.template` → `server/.env` (detalle de cada variable en el `CLAUDE.md` de cada carpeta). Aprovisionar MySQL con `database/bdtemplate.sql` y después todas las migraciones de `database/migrations/`, en orden numérico.
