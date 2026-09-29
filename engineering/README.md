# Sistema de ingeniería

Esta carpeta es la **fuente de verdad de ingeniería** del proyecto: cómo se decide, cómo se diseña, qué reglas no se rompen y cómo se verifica un cambio. Vale igual para personas y para cualquier agente de IA (Claude Code, Copilot, Codex, Cursor, OpenCode…).

`AGENTS.md` y `CLAUDE.md` en la raíz son solo puntos de entrada que apuntan aquí. No repiten las reglas.

## Qué leer y cuándo

Carga progresiva: no hace falta leer todo en cada tarea.

| Siempre | Según el tipo de cambio |
| --- | --- |
| Este README | Módulo nuevo → [`standards/MODULE_STANDARD.md`](standards/MODULE_STANDARD.md) para clasificarlo |
| [`AGENT_WORKFLOW.md`](AGENT_WORKFLOW.md) | CRUD / maestro → [`standards/CRUD_STANDARD.md`](standards/CRUD_STANDARD.md) + [`patterns/SIMPLE_CRUD.md`](patterns/SIMPLE_CRUD.md) o [`COMPLEX_CRUD.md`](patterns/COMPLEX_CRUD.md) |
| | Entidad con estados → [`standards/WORKFLOW_STANDARD.md`](standards/WORKFLOW_STANDARD.md) + [`patterns/STATE_MACHINE.md`](patterns/STATE_MACHINE.md) |
| | Endpoint nuevo o modificado → [`standards/ENDPOINT_STANDARD.md`](standards/ENDPOINT_STANDARD.md) (**obligatorio**) |
| | Cambio de BD → [`standards/DATABASE_STANDARD.md`](standards/DATABASE_STANDARD.md) |
| | Pantalla → [`standards/FRONTEND_STANDARD.md`](standards/FRONTEND_STANDARD.md) |
| | Cualquier cambio → las invariantes que toque, en [`invariants/`](invariants/README.md), y los ADR del módulo |

## Mapa de la carpeta

| Carpeta / archivo | Qué contiene |
| --- | --- |
| [`AGENT_WORKFLOW.md`](AGENT_WORKFLOW.md) | Protocolo obligatorio de trabajo: entender → … → reportar |
| [`ENGINEERING_PRINCIPLES.md`](ENGINEERING_PRINCIPLES.md) | Principios y orden de prioridades |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Cómo está construido el sistema hoy |
| [`PROJECT_STATE.md`](PROJECT_STATE.md) | Qué está hecho, qué falta, qué está pendiente de decidir |
| [`standards/`](standards/README.md) | Reglas obligatorias por capa |
| [`patterns/`](patterns/README.md) | Cómo se resuelve cada tipo de problema, con referencia a código real |
| [`anti-patterns/`](anti-patterns/README.md) | Lo que no se hace, con la evidencia de por qué |
| [`invariants/`](invariants/README.md) | Reglas que siempre deben ser verdad |
| [`adr/`](adr/README.md) | Decisiones de arquitectura (27 ADR, con su análisis) |
| [`decisiones/`](decisiones/README.md) | Fichas cortas de lo ya decidido e implementado (DEC-NNN) |
| [`templates/`](templates/) | Plantillas para specs, propuestas, ADR y decisiones |
| [`debt/`](debt/README.md) | Lista única de deuda técnica y pendientes |

**ADR frente a DEC:** un ADR explica una decisión de arquitectura con alternativas y consecuencias; una ficha DEC registra en pocas líneas una regla ya implementada, y enlaza al ADR del que sale.

## Precedencia

Cuando dos fuentes chocan, gana la de arriba:

```text
Invariantes y reglas de engineering/
        ↓
Estándar específico del área
        ↓
ADR y DEC aplicables
        ↓
Patrones existentes en el código
        ↓
Pedido del usuario
        ↓
Preferencia del agente
```

Un pedido que contradice una regla se señala **antes** de implementar (ver "Approval gate" en [`AGENT_WORKFLOW.md`](AGENT_WORKFLOW.md)). No se resuelve en silencio para ninguno de los dos lados.

## Relación con el resto del repositorio

- [`client/CLAUDE.md`](../client/CLAUDE.md) y [`server/CLAUDE.md`](../server/CLAUDE.md) tienen el detalle operativo de cada proyecto (comandos, variables de entorno, mapa de carpetas). Los estándares de aquí enlazan a ellos en vez de copiarlos.
- [`database/migrations/README.md`](../database/migrations/README.md) es el estándar de migraciones y de columnas de auditoría.
- `graphify-out/` es un grafo del código para navegarlo sin leer archivos enteros; cómo usarlo, en [`AGENT_WORKFLOW.md`](AGENT_WORKFLOW.md), paso 2. Se regenera solo después de cada commit (hook `post-commit` de graphify).
- `docs/` guarda material de trabajo que no es regla: el backlog (`docs/backlog/`), los prompts con que se generaron los ADR (`docs/prompt_adr*.md`) y specs en borrador (`docs/specs/`).

## Mantenimiento

- Un documento de esta carpeta existe porque resuelve una necesidad real. Si una sección no aplica, lo dice y explica por qué.
- Una regla vive en **un** lugar. Los demás enlazan.
- Si el código se aparta de una regla, no se corrige todo el proyecto de golpe: se registra en [`debt/TECHNICAL_DEBT.md`](debt/TECHNICAL_DEBT.md) (ver "Deriva" en [`AGENT_WORKFLOW.md`](AGENT_WORKFLOW.md)).
- Toda afirmación sobre el estado del sistema se marca como **CONFIRMADO** (verificado en código o BD), **INFERIDO**, **DESCONOCIDO** o **REQUIERE DECISIÓN** cuando no es obvio cuál es.
