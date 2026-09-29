# AGENTS.md

Instrucciones para cualquier agente de IA que trabaje en este repositorio (Codex, Copilot, Cursor, OpenCode, Claude…).

**La fuente de verdad es [`engineering/`](engineering/README.md).** Este archivo solo apunta allí.

Antes de cualquier cambio:

1. Leer [`engineering/README.md`](engineering/README.md).
2. Leer [`engineering/AGENT_WORKFLOW.md`](engineering/AGENT_WORKFLOW.md) y seguirlo: entender → descubrir → clasificar → analizar impacto → proponer → aprobación → implementar → verificar → revisar → documentar → reportar.
3. Leer los estándares que correspondan al cambio (`engineering/standards/`). Todo endpoint nuevo sigue [`engineering/standards/ENDPOINT_STANDARD.md`](engineering/standards/ENDPOINT_STANDARD.md), sin excepciones.
4. Leer los ADR y DEC del módulo (`engineering/adr/`, `engineering/decisiones/`).
5. Leer las invariantes que toca el cambio (`engineering/invariants/`).
6. Clasificar el cambio y analizar su impacto.
7. Proponer antes de implementar cuando corresponda, y esperar aprobación en cambios de BD, seguridad, arquitectura o workflows.
8. Verificar: `cd server && yarn test`, `cd client && yarn lint`, y prueba en vivo cuando aplica.
9. Actualizar la documentación de `engineering/` si el cambio lo requiere.

Nunca saltarse `engineering/`. Nunca inventar una convención cuando ya existe una. Si el pedido contradice una regla, decirlo antes de implementar.

Detalle operativo de cada proyecto: [`client/CLAUDE.md`](client/CLAUDE.md) y [`server/CLAUDE.md`](server/CLAUDE.md).
