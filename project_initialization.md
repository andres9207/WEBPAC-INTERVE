# ENGINEERING SYSTEM — PROJECT INITIALIZATION

Quiero preparar este proyecto para que pueda ser desarrollado y mantenido por humanos y agentes de IA bajo un sistema de ingeniería explícito.

NO quiero que simplemente generes código.

Quiero que primero analices el proyecto, entiendas su arquitectura y establezcas una carpeta:

```text
/engineering
```

Esta carpeta será la **fuente de verdad de ingeniería del proyecto**.

Su objetivo es definir:

* cómo se toman decisiones técnicas;
* cómo se diseñan módulos;
* cómo se clasifican las funcionalidades;
* qué patrones deben utilizarse;
* qué anti-patrones están prohibidos;
* cómo deben evolucionar DB/API/backend/frontend;
* qué invariantes deben respetarse;
* cómo debe trabajar un agente de IA;
* cómo documentar decisiones;
* cómo verificar cambios;
* cómo evitar que una IA implemente soluciones arbitrarias o inconsistentes.

---

# 1. PRINCIPIO FUNDAMENTAL

A partir de este momento, el agente NO debe trabajar bajo:

```text
USER REQUEST
     ↓
WRITE CODE
```

Debe trabajar bajo:

```text
                    USER REQUEST
                         │
                         ▼
                  1. UNDERSTAND
                         │
              ¿Qué está pidiendo?
              ¿Cuál es el objetivo?
              ¿Qué está realmente afectado?
                         │
                         ▼
                  2. DISCOVER
                         │
        Revisa código + arquitectura + estándares
        + módulos + ADRs + invariantes + Graphify
                         │
                         ▼
                  3. CLASSIFY
                         │
        ¿Es CRUD? ¿Workflow? ¿Cambio transversal?
        ¿Bug? ¿Refactor? ¿Nueva capacidad?
                         │
                         ▼
                  4. IMPACT ANALYSIS
                         │
      DB ─ API ─ Backend ─ Frontend ─ Security
      RBAC ─ Tenancy ─ Tests ─ Infra ─ Integrations
                         │
                         ▼
                  5. PROPOSE
                         │
              Diseña la solución
              + alternativas
              + riesgos
              + archivos afectados
                         │
                         ▼
                  6. APPROVAL GATE
                         │
              ┌──────────┴──────────┐
              │                     │
          ¿Ambigüedad?          ¿Claro?
              │                     │
           PREGUNTA                  ▼
                              IMPLEMENT
                                    │
                                    ▼
                                7. VERIFY
                                    │
                         Tests + lint + invariants
                         + reglas + comportamiento
                                    │
                                    ▼
                                8. REVIEW
                                    │
                         ¿La implementación sigue
                         arquitectura/estándares?
                                    │
                                    ▼
                              9. DOCUMENT
                                    │
                       ADR / PROJECT_STATE /
                       standard / debt si aplica
                                    │
                                    ▼
                              10. REPORT
                                    │
                         Qué hizo + qué verificó
                         + riesgos + pendientes
```

Este flujo es obligatorio.

---

# 2. OBJETIVO DE /engineering

Crea una estructura inicial similar a:

```text
engineering/
│
├── README.md
│
├── AGENT_WORKFLOW.md
├── ENGINEERING_PRINCIPLES.md
├── PROJECT_STATE.md
├── ARCHITECTURE.md
│
├── standards/
│   ├── README.md
│   ├── MODULE_STANDARD.md
│   ├── CRUD_STANDARD.md
│   ├── WORKFLOW_STANDARD.md
│   ├── DOMAIN_STANDARD.md
│   ├── API_STANDARD.md
│   ├── DATABASE_STANDARD.md
│   ├── FRONTEND_STANDARD.md
│   ├── BACKEND_STANDARD.md
│   ├── SECURITY_STANDARD.md
│   ├── TESTING_STANDARD.md
│   └── ERROR_HANDLING_STANDARD.md
│
├── patterns/
│   ├── README.md
│   ├── SIMPLE_CRUD.md
│   ├── COMPLEX_CRUD.md
│   ├── STATE_MACHINE.md
│   ├── TRANSACTIONAL_WORKFLOW.md
│   ├── CROSS_MODULE_OPERATION.md
│   └── ASYNC_OPERATION.md
│
├── anti-patterns/
│   ├── README.md
│   ├── GENERAL.md
│   ├── BACKEND.md
│   ├── FRONTEND.md
│   ├── DATABASE.md
│   ├── SECURITY.md
│   └── TESTING.md
│
├── adr/
│   ├── README.md
│   └── ADR-XXXX-template.md
│
├── invariants/
│   ├── README.md
│   ├── DOMAIN_INVARIANTS.md
│   ├── DATA_INVARIANTS.md
│   ├── SECURITY_INVARIANTS.md
│   └── SYSTEM_INVARIANTS.md
│
├── templates/
│   ├── MODULE_TEMPLATE.md
│   ├── CRUD_TEMPLATE.md
│   ├── WORKFLOW_TEMPLATE.md
│   ├── ADR_TEMPLATE.md
│   ├── CHANGE_PROPOSAL.md
│   └── FEATURE_SPEC.md
│
└── debt/
    ├── README.md
    └── TECHNICAL_DEBT.md
```

No debes crear documentación artificial únicamente para llenar carpetas.

Cada documento debe existir porque resuelve una necesidad real de ingeniería.

Si una sección no aplica al proyecto, documenta que no aplica y por qué.

---

# 3. PRIMERA FASE: DESCUBRIMIENTO

Antes de crear los documentos definitivos:

1. Inspecciona todo el proyecto.
2. Identifica el stack.
3. Identifica frontend/backend/database/infra.
4. Analiza estructura de carpetas.
5. Identifica módulos existentes.
6. Identifica patrones repetidos.
7. Identifica inconsistencias.
8. Identifica reglas de negocio existentes.
9. Identifica autenticación/autorización.
10. Identifica RBAC.
11. Identifica tenancy si existe.
12. Identifica transacciones.
13. Identifica integraciones.
14. Identifica testing.
15. Identifica deuda técnica.
16. Analiza el esquema de base de datos.
17. Analiza rutas/API.
18. Analiza componentes principales.
19. Analiza relaciones entre módulos.
20. Usa Graphify si está disponible.

NO inventes arquitectura que el proyecto no tenga.

Distingue siempre:

```text
CURRENT STATE
```

de:

```text
TARGET STATE
```

---

# 4. CLASIFICACIÓN DE MÓDULOS

Define explícitamente diferentes niveles de complejidad.

## LEVEL 1 — SIMPLE CRUD

Ejemplos:

* países
* ciudades
* categorías
* tipos de documento
* estados simples
* marcas
* tipos
* parámetros
* catálogos

Características:

* CRUD estándar.
* Pocas reglas de negocio.
* Sin workflow complejo.
* Sin máquina de estados.
* Dependencias mínimas.
* Transacciones simples.
* Validaciones directas.

Estos módulos deben utilizar:

```text
SIMPLE_CRUD
```

No crear arquitectura excesiva.

---

# 5. LEVEL 2 — COMPLEX CRUD

Utilizar cuando el módulo mantiene CRUD pero posee:

* múltiples relaciones;
* reglas de negocio;
* permisos específicos;
* validaciones complejas;
* cálculos;
* dependencias;
* historial;
* auditoría;
* operaciones transaccionales.

Ejemplo:

```text
Productos
Inventario
Proveedores
Clientes
```

Debe utilizar:

```text
COMPLEX_CRUD
```

---

# 6. LEVEL 3 — WORKFLOW

Utilizar cuando una entidad tiene un ciclo de vida.

Ejemplo:

```text
DRAFT
   ↓
SUBMITTED
   ↓
APPROVED
   ↓
PROCESSING
   ↓
COMPLETED
```

o:

```text
DRAFT
   ↓
CANCELLED
```

Ejemplo real:

```text
Purchase Order
```

Puede involucrar:

* proveedor;
* productos;
* inventario;
* usuarios;
* aprobaciones;
* estados;
* recepción;
* movimientos;
* auditoría.

No debe implementarse como un CRUD genérico.

Debe utilizar:

```text
WORKFLOW_STANDARD
STATE_MACHINE
TRANSACTIONAL_WORKFLOW
```

---

# 7. LEVEL 4 — CROSS-MODULE / DOMAIN OPERATION

Clasifica aquí operaciones que modifican varias partes del sistema.

Ejemplos:

```text
Crear orden de compra
      ↓
Actualizar inventario
      ↓
Crear movimientos
      ↓
Registrar auditoría
      ↓
Actualizar estado
```

Estas operaciones deben analizar:

* límites transaccionales;
* consistencia;
* rollback;
* idempotencia;
* concurrencia;
* eventos;
* auditoría;
* permisos;
* invariantes.

Nunca asumir que un simple CRUD es suficiente.

---

# 8. DOMAIN INVARIANTS

Crear una sección específica para invariantes.

Una invariante es una regla que siempre debe mantenerse verdadera.

Ejemplo:

```text
inventory_available >= 0
```

Ejemplo:

```text
An APPROVED purchase order cannot be edited arbitrarily.
```

Ejemplo:

```text
A user cannot access resources outside its authorized scope.
```

Ejemplo:

```text
A completed transaction cannot silently return to draft.
```

Las invariantes son más importantes que la implementación.

Una implementación que funciona pero rompe una invariante es incorrecta.

---

# 9. ADRs

Toda decisión arquitectónica importante debe documentarse mediante ADR.

Crear:

```text
engineering/adr/
```

Formato:

```text
ADR-0001-title.md
ADR-0002-title.md
ADR-0003-title.md
```

Cada ADR debe incluir:

```text
# ADR-XXXX — Title

## Status

Proposed | Accepted | Superseded | Deprecated

## Context

¿Qué problema estamos resolviendo?

## Decision

¿Qué decidimos?

## Alternatives Considered

¿Qué alternativas fueron consideradas?

## Consequences

¿Qué consecuencias tiene?

## Constraints

¿Qué restricciones existen?

## Related

¿Qué módulos/documentos/ADRs están relacionados?
```

No crear ADR para decisiones triviales.

Sí crear ADR cuando una decisión:

* afecta arquitectura;
* afecta múltiples módulos;
* crea una convención;
* introduce una dependencia;
* cambia un patrón;
* afecta seguridad;
* afecta datos;
* afecta escalabilidad;
* puede ser difícil de revertir.

---

# 10. ANTI-PATTERNS

Documenta explícitamente lo que la IA NO debe hacer.

Ejemplos:

```text
- Implementar antes de analizar.
- Crear archivos duplicados.
- Crear abstracciones innecesarias.
- Crear microservicios sin necesidad.
- Crear un service/repository/use-case por moda.
- Duplicar lógica de negocio.
- Bypassear servicios existentes.
- Modificar DB sin revisar dependencias.
- Agregar campos sin analizar invariantes.
- Ignorar RBAC.
- Ignorar tenancy.
- Hacer queries directamente desde componentes.
- Crear endpoints inconsistentes.
- Resolver bugs agregando hacks.
- Eliminar validaciones para hacer pasar tests.
- Desactivar tests.
- Modificar comportamiento existente sin analizar impacto.
- Crear estados sin definir transiciones válidas.
- Permitir transiciones arbitrarias.
- Usar CRUD genérico para workflows.
- Hacer refactors masivos cuando el cambio no los necesita.
```

La lista debe adaptarse al proyecto real.

---

# 11. TEMPLATES

Crear plantillas para que futuros agentes no tengan que inventar estructuras.

Como mínimo:

```text
CRUD_TEMPLATE.md
WORKFLOW_TEMPLATE.md
MODULE_TEMPLATE.md
ADR_TEMPLATE.md
FEATURE_SPEC.md
CHANGE_PROPOSAL.md
```

El template de CRUD debe responder:

```text
Purpose
Entity
Fields
Relations
Validation
Permissions
API
Database
Frontend
Tests
Audit
Known invariants
```

El template de Workflow debe incluir además:

```text
States
Allowed transitions
Forbidden transitions
Transition guards
Side effects
Transactions
Rollback
Permissions
Audit
Notifications
Concurrency
Idempotency
Failure scenarios
```

---

# 12. PROJECT_STATE

Crear:

```text
engineering/PROJECT_STATE.md
```

Debe describir el estado actual del proyecto.

No debe convertirse en un README gigante.

Debe responder:

```text
Current architecture
Implemented modules
Partially implemented modules
Known technical debt
Known limitations
Important decisions
Active ADRs
Known invariants
Pending architectural decisions
```

Actualizarlo cuando un cambio relevante altere el estado del sistema.

---

# 13. AGENT_WORKFLOW

Crear:

```text
engineering/AGENT_WORKFLOW.md
```

Este documento debe convertirse en el protocolo obligatorio de cualquier agente.

El agente deberá seguir:

```text
UNDERSTAND
↓
DISCOVER
↓
CLASSIFY
↓
IMPACT ANALYSIS
↓
PROPOSE
↓
APPROVAL GATE
↓
IMPLEMENT
↓
VERIFY
↓
REVIEW
↓
DOCUMENT
↓
REPORT
```

## UNDERSTAND

Determina:

* objetivo;
* alcance;
* resultado esperado;
* restricciones;
* criterios de aceptación.

Si el request es ambiguo, no inventar.

---

## DISCOVER

Antes de implementar:

```text
engineering/
architecture
ADRs
standards
patterns
anti-patterns
invariants
existing modules
database
API
frontend
tests
Graphify
```

Además buscar implementaciones similares existentes.

La regla es:

> Reutilizar patrones existentes antes de crear nuevos.

---

## CLASSIFY

Clasificar el cambio:

```text
NEW MODULE
SIMPLE CRUD
COMPLEX CRUD
WORKFLOW
CROSS-MODULE
BUG FIX
REFACTOR
ARCHITECTURAL CHANGE
SECURITY CHANGE
DATABASE CHANGE
INFRASTRUCTURE CHANGE
```

---

## IMPACT ANALYSIS

Analizar como mínimo:

```text
Database
API
Backend
Frontend
Authentication
Authorization
RBAC
Tenancy
Business rules
Transactions
Integrations
Tests
Infrastructure
Performance
Observability
Audit
```

No asumir que un cambio aparentemente pequeño tiene impacto pequeño.

---

## PROPOSE

Antes de implementar cambios relevantes presentar:

```text
Problem
Current behavior
Desired behavior
Classification
Affected modules
Affected files
Database impact
API impact
Frontend impact
Security impact
Alternatives
Recommended implementation
Risks
Tests required
Documentation required
```

No comenzar implementación cuando exista una ambigüedad que pueda cambiar la solución.

---

# 14. APPROVAL GATE

Separar:

```text
QUESTIONS
```

de:

```text
IMPLEMENTATION
```

Si falta información necesaria:

```text
STOP → ASK
```

No rellenar silenciosamente requisitos desconocidos.

Si la solución es suficientemente clara:

```text
PROPOSE → IMPLEMENT
```

Para cambios pequeños y de bajo riesgo puede utilizarse un approval gate implícito.

Para cambios arquitectónicos, workflows, DB o seguridad debe existir aprobación explícita.

---

# 15. IMPLEMENTATION

Durante la implementación:

* seguir estándares;
* reutilizar patrones;
* evitar duplicación;
* respetar invariantes;
* respetar ADRs;
* mantener consistencia con módulos existentes;
* no introducir abstracciones innecesarias;
* no modificar código no relacionado sin justificación.

Si durante la implementación aparece una decisión arquitectónica nueva:

```text
STOP
↓
DOCUMENT DECISION
↓
ASK IF NECESSARY
↓
CONTINUE
```

---

# 16. VERIFY

La implementación no está terminada cuando el código compila.

Verificar:

```text
Tests
Lint
Type/Build checks
Database migrations
API behavior
Frontend behavior
Authorization
RBAC
Tenancy
Business rules
Invariants
Error handling
Transactions
Regression scenarios
```

Para workflows verificar específicamente:

```text
Valid transitions
Invalid transitions
Unauthorized transitions
Rollback
Duplicate requests
Concurrent operations
Partial failures
```

---

# 17. REVIEW

Después de implementar, revisar el cambio como si otro ingeniero tuviera que aprobarlo.

Preguntar:

```text
¿Respeta la arquitectura?
¿Respeta los estándares?
¿Respeta los ADR?
¿Respeta las invariantes?
¿Introduce duplicación?
¿Introduce deuda?
¿Existe una solución más simple?
¿Se modificó algo innecesario?
¿Existen casos de fallo?
¿Los tests realmente prueban el comportamiento?
```

---

# 18. DOCUMENT

Actualizar solamente lo necesario:

```text
ADR
PROJECT_STATE
MODULE documentation
STANDARD
PATTERN
ANTI-PATTERN
TECHNICAL DEBT
```

No generar documentación por burocracia.

La documentación debe explicar decisiones y reglas que otro agente necesite conocer.

---

# 19. REPORT

Cada trabajo terminado debe finalizar con:

```text
## Implemented

Qué se hizo.

## Files Changed

Qué archivos fueron modificados.

## Architecture

Qué patrón se utilizó y por qué.

## Verification

Qué se verificó.

## Tests

Qué tests fueron ejecutados/agregados.

## Risks

Riesgos conocidos.

## Pending

Qué quedó pendiente.

## Documentation

Qué documentación fue actualizada.
```

---

# 20. REGLA DE ORO PARA LA IA

La IA debe comportarse como un ingeniero que entra a un proyecto existente, NO como un generador de código.

Antes de crear algo debe preguntar:

```text
¿Existe ya algo equivalente?
¿Existe un estándar?
¿Existe un patrón?
¿Existe un ADR?
¿Existe una invariante?
¿Existe un módulo similar?
¿Estoy creando una excepción?
¿Estoy introduciendo una nueva decisión arquitectónica?
```

Si existe un patrón:

```text
USE EXISTING PATTERN
```

Si no existe:

```text
DESIGN PATTERN
→ EVALUATE
→ DOCUMENT
→ IMPLEMENT
```

Nunca:

```text
INVENT → IMPLEMENT → DOCUMENT
```

---

# 21. REGLA SOBRE COMPLEJIDAD

No sobrediseñar.

Un catálogo sencillo debe seguir siendo sencillo.

Un workflow complejo debe tener la arquitectura necesaria para representar correctamente sus reglas.

Por lo tanto:

```text
Complexity must follow domain complexity.
```

No crear complejidad técnica donde el dominio no la necesita.

Pero tampoco simplificar artificialmente un dominio complejo para hacerlo parecer un CRUD.

---

# 22. OBJETIVO FINAL

Cuando otro agente entre al proyecto y reciba:

```text
"Necesito crear órdenes de compra"
```

NO debe comenzar creando:

```text
PurchaseOrderController
PurchaseOrderService
PurchaseOrderRepository
```

Debe primero determinar:

```text
¿Qué es una orden de compra?
¿Qué estados tiene?
¿Qué transiciones existen?
¿Quién puede crearla?
¿Quién puede aprobarla?
¿Qué módulos afecta?
¿Afecta inventario?
¿Qué ocurre al recibirla?
¿Qué ocurre al cancelarla?
¿Qué datos son inmutables?
¿Qué transacciones necesita?
¿Qué invariantes existen?
¿Qué auditoría requiere?
¿Qué patrón utiliza el proyecto?
¿Qué ADRs aplican?
```

Y solo después diseñar e implementar.

---

# 23. CRITERIO DE ÉXITO

La carpeta `/engineering` estará correctamente preparada cuando un agente nuevo pueda entrar al proyecto y responder:

1. ¿Cómo está construido el sistema?
2. ¿Cómo se toman decisiones técnicas?
3. ¿Cómo se crea un CRUD?
4. ¿Cómo se crea un workflow?
5. ¿Cuándo usar cada patrón?
6. ¿Qué cosas están prohibidas?
7. ¿Qué invariantes no puede romper?
8. ¿Cómo debe analizar un cambio?
9. ¿Cuándo debe preguntar antes de implementar?
10. ¿Cómo debe verificar su trabajo?
11. ¿Cómo debe documentar nuevas decisiones?
12. ¿Cómo debe reportar lo realizado?

Si la documentación no permite responder esas preguntas, el sistema de ingeniería está incompleto.

---

# INSTRUCCIÓN FINAL

NO implementes funcionalidades de negocio todavía.

Primero:

1. analiza el proyecto;
2. analiza la arquitectura actual;
3. identifica patrones existentes;
4. identifica inconsistencias;
5. identifica decisiones ya tomadas;
6. identifica reglas de negocio;
7. identifica invariantes;
8. identifica deuda técnica;
9. analiza Graphify si está disponible;
10. propone la estructura de `/engineering`;
11. genera los documentos iniciales;
12. identifica qué decisiones requieren ADR;
13. identifica qué información falta.

Al terminar esta fase, entrega:

```text
ENGINEERING INITIALIZATION REPORT

Current Architecture
Existing Patterns
Module Classification
Current Standards
Missing Standards
Existing Decisions
Required ADRs
Known Invariants
Anti-patterns Detected
Technical Debt
Engineering Structure Created
Open Questions
Recommended Next Step
```

NO inventes información que no puedas verificar en el código.

Cuando exista incertidumbre, márcala explícitamente como:

```text
CONFIRMED
INFERRED
UNKNOWN
REQUIRES DECISION
```

La prioridad es:

```text
CORRECTNESS
> CONSISTENCY
> MAINTAINABILITY
> SIMPLICITY
> SPEED OF IMPLEMENTATION
```
# 24. ENGINEERING AS THE DEFAULT OPERATING PROTOCOL

La carpeta:

```text
/engineering
```

no debe considerarse documentación opcional.

Debe considerarse el **Engineering Operating System del proyecto**.

Todas las herramientas de IA que trabajen sobre este repositorio deben utilizar `/engineering` como referencia principal para analizar, diseñar, modificar, verificar y documentar cambios.

Esto incluye, cuando aplique:

* GitHub Copilot
* Claude Code
* ChatGPT / Codex
* Cursor
* Windsurf
* otros agentes de IA
* futuros agentes que trabajen sobre el repositorio

---

## 24.1 SOURCE OF TRUTH

La fuente de verdad será:

```text
/engineering
```

No duplicar las reglas completas en diferentes archivos.

Los archivos específicos de cada agente deben actuar como **entry points**, no como copias de `/engineering`.

Arquitectura:

```text
                    /engineering
                         │
                SOURCE OF TRUTH
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
   AGENTS.md         CLAUDE.md       Otros agentes
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
                ENGINEERING PROTOCOL
```

---

# 24.2 AGENTS.md

Crear un:

```text
/AGENTS.md
```

Este archivo debe ser corto y obligatorio.

Debe indicar esencialmente:

```text
Before making any change:

1. Read /engineering/README.md
2. Read /engineering/AGENT_WORKFLOW.md
3. Read the relevant standards.
4. Read relevant ADRs.
5. Read relevant invariants.
6. Classify the requested change.
7. Analyze impact.
8. Propose before implementing when required.
9. Verify the implementation.
10. Update engineering documentation when necessary.

Never bypass /engineering.
Never invent project conventions when an existing convention exists.
```

No duplicar en `AGENTS.md` el contenido completo de los estándares.

---

# 24.3 CLAUDE.md

Crear:

```text
/CLAUDE.md
```

Debe funcionar como entry point para Claude.

Su contenido debe indicar que antes de modificar el proyecto debe cargar:

```text
/engineering/README.md
/engineering/AGENT_WORKFLOW.md
```

y posteriormente consultar los documentos específicos relevantes al cambio.

Debe quedar claro que:

```text
CLAUDE.md
```

NO reemplaza:

```text
/engineering
```

sino que apunta hacia él.

---

# 24.4 Otros agentes

Si una herramienta utiliza otro archivo de instrucciones, crear un entry point equivalente únicamente cuando sea necesario.

Ejemplo:

```text
.github/
    copilot-instructions.md
```

o el mecanismo equivalente soportado por la herramienta.

Todos deben apuntar al mismo sistema:

```text
/engineering
```

No crear diferentes sistemas de reglas.

---

# 24.5 REGLA DE PRECEDENCIA

Cuando existan múltiples fuentes de instrucciones:

```text
Project Engineering Rules
        ↓
Specific module standards
        ↓
Relevant ADRs
        ↓
Existing implementation patterns
        ↓
User request
        ↓
Agent preference
```

El agente nunca debe utilizar una preferencia propia para contradecir una regla explícita del proyecto.

Si el usuario solicita algo que contradice una arquitectura o estándar existente, el agente debe detectarlo y señalarlo antes de implementar.

---

# 24.6 CONTEXT LOADING

El agente no necesita cargar absolutamente todos los archivos de `/engineering` en cada interacción.

Debe utilizar un modelo de carga progresiva:

```text
Every task
    ↓
engineering/README.md
    ↓
engineering/AGENT_WORKFLOW.md
    ↓
Classify request
    ↓
Load only relevant:
    ├── Standard
    ├── Pattern
    ├── ADR
    ├── Invariants
    └── Module documentation
```

Ejemplo:

```text
"Crear países"
```

Cargar:

```text
CRUD_STANDARD
SIMPLE_CRUD
relevant invariants
relevant architecture rules
```

Mientras:

```text
"Crear órdenes de compra"
```

debería cargar:

```text
WORKFLOW_STANDARD
COMPLEX_CRUD
STATE_MACHINE
TRANSACTIONAL_WORKFLOW
relevant ADRs
relevant invariants
inventory standards
authorization standards
audit standards
```

Esto evita desperdiciar contexto y mantiene el sistema escalable.

---

# 24.7 SESSION INDEPENDENCE

El sistema debe funcionar incluso si:

* es una conversación nueva;
* cambia el agente;
* cambia el IDE;
* cambia el modelo;
* otro desarrollador clona el repositorio;
* otro agente continúa el trabajo;
* no existe memoria de conversaciones anteriores.

Por lo tanto:

> La continuidad de ingeniería NO debe depender de la memoria de ChatGPT, Claude, Copilot ni de ninguna conversación anterior.

Debe estar persistida en el repositorio.

La memoria debe vivir en:

```text
/engineering
```

y no en el historial de una IA.

---

# 24.8 START-OF-TASK PROTOCOL

Todo agente que comience una tarea deberá asumir implícitamente:

```text
I am entering an existing engineered system.

Before changing anything I must:

UNDERSTAND
→ DISCOVER
→ CLASSIFY
→ ANALYZE IMPACT
→ PROPOSE
→ APPROVAL GATE
→ IMPLEMENT
→ VERIFY
→ REVIEW
→ DOCUMENT
→ REPORT
```

No debe ser necesario que el usuario repita estas instrucciones en cada conversación.

---

# 24.9 USER REQUEST DOES NOT BYPASS ENGINEERING

El hecho de que el usuario diga:

```text
"hazlo"
```

no significa:

```text
skip analysis
skip standards
skip ADR
skip verification
```

El request del usuario determina **qué quiere conseguir**.

`/engineering` determina **cómo debe hacerse dentro de este proyecto**.

Si el request es ambiguo o contradice una regla importante:

```text
STOP
→ EXPLAIN
→ ASK
```

No realizar cambios arbitrarios.

---

# 24.10 ENGINEERING DRIFT

Los agentes deben detectar cuando el código existente se desvía de los estándares.

No corregir automáticamente todo el proyecto.

Si encuentra una desviación:

```text
Existing deviation
        ↓
Is it relevant to current task?
        │
        ├── NO → Document/ignore
        │
        └── YES
              ↓
          Evaluate
              ↓
      Fix or create debt item
```

No utilizar una tarea pequeña como excusa para realizar un refactor masivo.

---

# 24.11 BOOTSTRAP TEST

Después de crear `/engineering`, `AGENTS.md` y `CLAUDE.md`, realizar una prueba conceptual:

Dar al agente únicamente:

```text
"Necesito agregar un nuevo módulo."
```

El agente debería responder solicitando o investigando información suficiente para:

```text
Understand
Discover
Classify
Impact Analysis
Propose
```

y NO comenzar inmediatamente a crear archivos.

Después probar:

```text
"Necesito agregar un catálogo de países."
```

Debe reconocerlo como:

```text
SIMPLE CRUD
```

Después:

```text
"Necesito agregar órdenes de compra."
```

Debe investigar si corresponde a:

```text
COMPLEX CRUD
WORKFLOW
CROSS-MODULE
```

y determinarlo a partir del dominio real, no simplemente asumirlo.

Si el agente no realiza este comportamiento, el sistema de instrucciones todavía no está correctamente preparado.

---

# 24.12 FINAL PRINCIPLE

El proyecto debe poder sobrevivir al cambio de agente.

```text
Claude → Copilot → Codex → Cursor → otro agente
```

El comportamiento esperado debe permanecer consistente porque las reglas pertenecen al repositorio:

```text
/engineering
```

y no al modelo.

La IA es reemplazable.

El sistema de ingeniería no.
