# Protocolo de trabajo

Obligatorio para cualquier persona o agente que cambie este repositorio. Que el usuario diga "hazlo" define **qué** se quiere lograr; este protocolo define **cómo** se hace aquí. No se salta.

```text
ENTENDER → DESCUBRIR → CLASIFICAR → ANALIZAR IMPACTO → PROPONER
    → APPROVAL GATE → IMPLEMENTAR → VERIFICAR → REVISAR → DOCUMENTAR → REPORTAR
```

La continuidad vive en el repositorio, no en la memoria de una conversación. Cada tarea empieza como si fuera la primera: se lee lo que aplica de `engineering/`.

## 1. Entender

Determinar objetivo, alcance, resultado esperado, restricciones y criterio de aceptación. Si el pedido es ambiguo en algo que cambia la solución, se pregunta; no se inventa.

## 2. Descubrir

Antes de escribir nada:

- Leer [`README.md`](README.md) y los documentos que correspondan al tipo de cambio (tabla "Qué leer y cuándo").
- Leer los ADR y DEC del módulo, y las [invariantes](invariants/README.md) que toca.
- **Buscar una implementación parecida que ya exista** y seguirla. Hoy los módulos de referencia son `security/profiles` y `security/users` (servidor y cliente).
- Verificar en el código cualquier nombre de archivo, tabla, permiso o función antes de usarlo. Los documentos pueden estar desactualizados; el código manda.

Regla: **reutilizar un patrón existente antes de crear uno nuevo.**

### Rutas y carpetas: solo las que existen

**Prohibido inventar estructura.** Toda ruta nueva se arma dentro de la estructura registrada en [`MODULE_STANDARD`](standards/MODULE_STANDARD.md) ("Dónde vive un módulo") y, para maestros, con los nombres exactos de [DEC-017](decisiones/DEC-017-area-idioma-maestros.md):

| Qué | Solo se permite | Ejemplos de lo que **no** existe y no se crea |
| --- | --- | --- |
| Área del servidor y prefijo de URL | `auth`, `security`, `app`, `admin` → `/api/<área>/…` | `/api/masters/`, `/api/management/`, `/api/config/`, `/api/contratos/` |
| Pantallas del cliente | `client/src/views/<área>/<módulo>/` | `client/src/pages/`, `client/src/pages/admin/`, `client/src/screens/` |
| Rutas del cliente | `client/src/routes/MainRoutes.jsx` | `client/src/routes.js` |
| API del cliente | `client/src/api/requests/<módulo>Api.js` | `client/src/services/<módulo>.js`, axios en el componente |
| Nombre del módulo de un maestro | El de la tabla de DEC-017 (`identityDocuments`) | `identity-documents`, `identity_documents`, `tiposIdentificacion` |

- Si una tarea parece necesitar un área, una carpeta de primer nivel o un prefijo de URL nuevo: **parar y proponerlo como decisión** (paso 6). No se crea en silencio.
- `docs/ai-module-generation-reference-csur.md` y `docs/specs/modules/_TEMPLATE-maestro.md` son de **otro proyecto** (CSUR). Sus rutas (`pages/admin`, `/management/`, `routes.js`) no existen aquí: no se usan como referencia.
- Antes de proponer una ruta, verificar que su carpeta padre existe (`ls`, o `graphify explain` sobre un módulo vecino).

### Navegar el código con el grafo (graphify)

`graphify-out/` tiene un grafo del **código** (`client/`, `server/`, `database/`; la documentación queda fuera por `.graphifyignore`). Sirve para ubicar sin abrir archivos enteros y así no llenar la conversación. Se consulta **antes** de hacer grep o leer archivos para entender algo:

| Necesito | Comando |
| --- | --- |
| Qué es un símbolo, dónde está, qué llama y quién lo contiene | `graphify explain "deleteProfile()"` |
| Cómo se conectan dos piezas | `graphify path "saveUser()" "writeAudit()"` |
| Contexto amplio de un tema, con tope de tokens | `graphify query "withLockedTransaction" --budget 1500` |
| Vista general de la arquitectura (solo si lo anterior no alcanza) | `graphify-out/GRAPH_REPORT.md` |

- **Consultar por nombre de símbolo, en inglés**, como está en el código (`deleteProfile()`, `paginate`, `tbl_profiles`). Una frase en español ("cómo se elimina un perfil") trae resultados imprecisos.
- **Límite conocido:** no resuelve llamadas a través de un namespace importado (`profilesService.deleteProfile(...)` en los controllers), así que `path` de controller a service puede decir que no hay camino aunque exista. En ese caso, se confirma leyendo el controller.
- El grafo sirve para **ubicar**. El código que se va a modificar se lee igual antes de editarlo.
- **El grafo refleja el último commit**, no el trabajo en curso. Lo regenera un hook de git `post-commit` (y `post-checkout` al cambiar de rama), en segundo plano. Lo que todavía no tiene commit, se ve con `git status` / `git diff` y leyendo esos archivos.
- **El agente no ejecuta `graphify update`**: sus cambios pueden descartarse en la revisión, y el grafo solo se actualiza con lo que se aprueba haciendo commit. Después de cada commit, `graph.json` y `graph.html` quedan modificados y entran en el commit siguiente: es esperado.
- Si el comando `graphify` no existe en la máquina: `python -m pip install "graphifyy[sql]"`, y luego `graphify hook install` para instalar los hooks (son locales de cada clon, no se versionan).

## 3. Clasificar

| Clase | Qué es | Dónde seguir |
| --- | --- | --- |
| CRUD simple (nivel 1) | Catálogo con pocas reglas | [`CRUD_STANDARD`](standards/CRUD_STANDARD.md), [`SIMPLE_CRUD`](patterns/SIMPLE_CRUD.md) |
| CRUD complejo (nivel 2) | CRUD con hijos, dependencias o reglas propias | [`CRUD_STANDARD`](standards/CRUD_STANDARD.md), [`COMPLEX_CRUD`](patterns/COMPLEX_CRUD.md) |
| Workflow (nivel 3) | Entidad con ciclo de vida y estados | [`WORKFLOW_STANDARD`](standards/WORKFLOW_STANDARD.md), [`STATE_MACHINE`](patterns/STATE_MACHINE.md) |
| Operación entre módulos (nivel 4) | Una operación que cambia varios agregados o saldos | [`TRANSACTIONAL_WORKFLOW`](patterns/TRANSACTIONAL_WORKFLOW.md), [`CROSS_MODULE_OPERATION`](patterns/CROSS_MODULE_OPERATION.md) |
| Bug | Comportamiento distinto del esperado | Test que lo reproduce primero |
| Refactor | Mismo comportamiento, otra estructura | Tests verdes antes y después |
| Cambio de BD, seguridad, arquitectura o infraestructura | — | Aprobación explícita (ver 6) |

Los niveles 1–4 y cómo decidir entre ellos están en [`MODULE_STANDARD`](standards/MODULE_STANDARD.md). La clase sale del dominio, no del nombre del pedido: "agregar facturas" no es un CRUD.

## 4. Analizar impacto

Revisar como mínimo, y decir explícitamente cuáles no aplican:

```text
BD · API · backend · frontend · autenticación · autorización (permisos) · reglas de negocio
transacciones y bloqueos · idempotencia · auditoría · integraciones · tests · infraestructura
```

Este proyecto **no es multi-tenant**; esa dimensión no aplica. Un cambio que parece chico puede tocar permisos, bitácora o el orden de bloqueo: revisarlo, no suponerlo.

## 5. Proponer

Para cualquier cambio que no sea trivial, antes de implementar:

```text
Problema · comportamiento actual · comportamiento deseado · clasificación
módulos y archivos afectados · impacto en BD / API / frontend / seguridad
alternativas · implementación recomendada · riesgos · tests · documentación a actualizar
```

La plantilla está en [`templates/CHANGE_PROPOSAL.md`](templates/CHANGE_PROPOSAL.md).

## 6. Approval gate

- **Falta información que cambia la solución** → parar y preguntar. No rellenar requisitos en silencio.
- **Cambio chico, local y de bajo riesgo** (un texto, un bug acotado con test, un comentario) → se puede proponer e implementar en el mismo paso.
- **Requiere aprobación explícita:** cambios de BD, de seguridad o permisos, de arquitectura, workflows, operaciones entre módulos, borrar o mover archivos, **crear un área, una carpeta de primer nivel o un prefijo de URL que no existe**, y cualquier cosa que contradiga una regla de `engineering/`.
- Si durante la implementación aparece una decisión de arquitectura nueva: parar, documentarla, preguntar si hace falta, y recién entonces seguir.

## 7. Implementar

Seguir los estándares y el patrón existente. No duplicar lógica, no crear abstracciones que el caso no pide, no tocar código no relacionado. La complejidad técnica sigue a la del dominio: un catálogo sigue siendo simple y un workflow tiene la estructura que sus reglas necesitan.

## 8. Verificar

"Compila" no es "terminado".

| Qué | Cómo, hoy |
| --- | --- |
| Tests del servidor | `cd server && yarn test` (Jest, unitarios con mocks). Ver [`TESTING_STANDARD`](standards/TESTING_STANDARD.md) |
| Lint del cliente | `cd client && yarn lint` |
| Build del cliente | `cd client && yarn build` |
| Migración | Aplicada contra la BD de desarrollo y `npx prisma db pull` en `server/` |
| Comportamiento | Probado en vivo: caso válido, caso inválido y el intento de abuso que aplique (id ajeno, permiso faltante) |
| Invariantes | Las del cambio siguen siendo verdad; si hay mecanismo en BD, existe |

Para workflows además: transiciones válidas, inválidas, sin permiso, reintento con la misma clave, concurrencia y fallo parcial (rollback).

El servidor no tiene linter y el cliente no tiene tests (ver [deuda](debt/TECHNICAL_DEBT.md)). Si algo no se pudo verificar, se dice en el reporte.

## 9. Revisar

Leer el cambio como si lo aprobara otra persona: ¿respeta estándares, ADR e invariantes? ¿duplica algo? ¿hay una solución más simple? ¿se tocó algo innecesario? ¿los tests prueban el comportamiento o solo lo recorren?

## 10. Documentar

Solo lo necesario:

- Decisión nueva de arquitectura → ADR ([plantilla](templates/ADR_TEMPLATE.md)).
- Regla nueva ya implementada → ficha DEC ([plantilla](templates/DECISION_TEMPLATE.md)).
- Cambió el estado del sistema → [`PROJECT_STATE.md`](PROJECT_STATE.md).
- Se corrigió una vulnerabilidad → entrada en [`anti-patterns/SECURITY.md`](anti-patterns/SECURITY.md).
- Quedó algo pendiente → [`debt/TECHNICAL_DEBT.md`](debt/TECHNICAL_DEBT.md).

## 11. Reportar

Todo trabajo termina con:

```text
Implementado          qué se hizo
Archivos              cuáles cambiaron
Arquitectura          qué patrón se usó y por qué
Verificación          qué se comprobó y cómo
Tests                 cuáles se corrieron o agregaron, con resultado
Riesgos               conocidos
Pendiente             lo que quedó abierto
Documentación         qué se actualizó
```

## Deriva

Si el código existente se aparta de un estándar:

```text
¿Afecta a la tarea actual?
  ├── No → anotarlo en debt/TECHNICAL_DEBT.md y seguir
  └── Sí → corregirlo dentro del alcance, o anotarlo si excede la tarea
```

Una tarea chica no justifica un refactor masivo.

## Prueba del protocolo

Un agente que entra al proyecto debería comportarse así:

- "Necesito agregar un módulo nuevo" → pregunta o investiga qué es antes de crear archivos.
- "Necesito agregar aseguradoras" → lo reconoce como CRUD simple (ADR-0003) y sigue `CRUD_STANDARD`.
- "Necesito agregar facturas" → investiga ADR-0020 a 0027 y lo trata como workflow con operaciones entre módulos, no como CRUD.
