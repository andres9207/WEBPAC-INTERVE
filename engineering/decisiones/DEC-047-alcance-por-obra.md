# DEC-047 — Alcance por obra: cada usuario ve y opera solo la obra elegida en el encabezado, salvo con el permiso de ver todas

**Fecha:** 2026-10-06 · **Tipo:** Obligatoria · **ADR:** [0014](../adr/0014-autorizacion-permisos.md), [0011](../adr/0011-obras.md)

Lo decidió el usuario el 2026-10-06. Restringe el acceso, no es solo un filtro de la pantalla.

## Contexto

Los permisos (ADR-0014) dicen qué acciones puede hacer un usuario, pero no sobre qué obras. Cualquiera con "Ver contratos" veía los contratos de todas las obras. Las obras ya tienen responsables, uno principal y varios de apoyo (`tbl_work_managers`), y esos responsables definen a qué obras pertenece cada usuario.

## Decisión

- **Selector de obra en el encabezado**, a la izquierda del usuario.
  - Siempre hay **una sola** obra elegida.
  - Lista las obras donde el usuario es responsable activo, principal o de apoyo.
  - El navegador recuerda la última obra elegida, por usuario. Si ya no está disponible, se elige otra.
- **Permiso 91, "Ver todas las obras":**
  - Quien lo tiene ve en el selector todas las obras no eliminadas y la opción **"Ver todo"**, sin restricción.
  - El seed lo da al perfil Superadmin.
- **Sin obras y sin el permiso, el usuario no ve nada** en Obras, Proveedores, Contratos ni Facturas.
- **Lo aplica el servidor:**
  - El cliente envía la obra en el encabezado `X-Work-Id`, que solo la propone.
  - `resolveWorkScope` (`common/services/workScope.service.js`) decide el alcance: `{ all, wrkId }`.
  - Sin el permiso, la obra debe ser una de la que el usuario es responsable activo. Si no lo es, el alcance queda vacío.
- **Cada controller de `work/` y `billing/` pasa el alcance a su service** con `workScopeOf(req)`. Los services lo aplican:

  | Módulo | Listados | Detalle y escrituras |
  | --- | --- | --- |
  | Obras | `wrk_id` de la obra | Leer, editar, cambiar estado y eliminar, solo esa obra |
  | Proveedores | Los asignados a la obra | Leer y editar los asignados a la obra. Asignar, editar y desasignar, solo en la obra. Crear sin "Ver todo" lo asigna a la obra del alcance, con fecha de hoy |
  | Contratos | `wrk_id` de la obra; selector de obras del formulario | Leer, crear, editar, eliminar, otrosí, liquidación, modificar concepto y suspender, solo en la obra |
  | Facturas | `wrk_id` de la obra; selectores de obras y contratos | Leer, registrar, editar, aprobar y anular, solo en la obra; saldos de anticipo del contrato |

- **Fuera del alcance responde 404**, el mismo que da un registro inexistente: no revela que exista. La comprobación se hace antes de bloquear y escribir.
- **Excepciones**, declaradas en `test/common/workScope.guard.test.js` con su motivo:
  - La lista de obras del selector.
  - La vista previa de la fecha fin de una obra.
  - Los candidatos a responsable.
  - El catálogo de proveedores para asignar (`select_providers`) y la verificación exacta de identificación. Así un usuario restringido no crea proveedores duplicados.
- **Crear obras** sigue igual, con el permiso de crear obra. Quien la crea sin "Ver todo" no la ve hasta que lo asignen como responsable.
- **En el cliente:**
  - `WorkScopeProvider` carga las obras del usuario antes de montar el contenido.
  - El interceptor de `httpCliente` envía `X-Work-Id`.
  - Cambiar de obra vuelve a montar la página (`<Outlet key={scopeKey}>`), y sus listados se piden con el alcance nuevo.

## Descartado

- **Solo un filtro de vista:** cualquiera podría ver otras obras cambiando la URL o usando la API.
- **Varias obras a la vez** ("todas mis obras"): el usuario eligió trabajar siempre con una.
- **Resolver el alcance en un middleware de cada ruta:** obligaba a tocar todas las rutas y a ordenar un `verifyToken` extra. `workScopeOf(req)` lo resuelve una vez por petición desde el controller, y el test guardián impide olvidarlo.

## Qué implica

- Un endpoint nuevo en `work/` o `billing/` resuelve `workScopeOf(req)` y su service filtra o verifica con `scopeWhere`, `assertInScope` o el `assert…InScope` del módulo. Si no aplica, se agrega a `EXEMPT` del test guardián con su motivo.
- **Despliegue:** antes de activar, asigna responsables a las obras o da el permiso 91 a quien deba ver todo. Si no, esos usuarios dejan de ver datos.
- Un módulo nuevo que cuelgue de la obra (pólizas, documentos) sigue la misma regla.

## Dónde

- Migración: `database/migrations/0076` (permiso 91).
- Servidor:
  - `server/src/common/services/workScope.service.js`.
  - `X-Work-Id` en `allowedHeaders` de CORS (`app.js`).
  - El endpoint `select_my_works` en las rutas de obras.
  - Los controllers y services de `work/works`, `work/providers`, `work/contracts` y `billing/invoices`.
- Cliente:
  - `client/src/utils/workScope.js`.
  - `contexts/WorkScopeContext.jsx`.
  - El interceptor de `api/services/httpCliente.js`.
  - `layout/MainLayout/Header/WorkSection`.
  - `ScopedOutlet` en `layout/MainLayout/index.jsx`.
- Tests:
  - `test/common/services/workScope.service.test.js`.
  - `test/common/workScope.guard.test.js`.
  - Los bloques "alcance por obra" de los tests de service y controller de obras, proveedores, contratos y facturas.
