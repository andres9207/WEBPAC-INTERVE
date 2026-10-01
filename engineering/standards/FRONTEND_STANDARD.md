# Estándar del frontend

React 19 + Vite, MUI 7 sobre el template Berry. Cómo se ve (colores, tipografía, formatos, estados, accesibilidad): [`DESIGN_SYSTEM`](DESIGN_SYSTEM.md). Comandos, autenticación y capa HTTP en detalle: [`client/CLAUDE.md`](../../client/CLAUDE.md).

## Reglas

1. **El cliente no es frontera de seguridad.** Ocultar un botón es experiencia de uso; el servidor valida igual.
2. **Imports absolutos desde `src`** (`import MainCard from 'ui-component/cards/MainCard'`), nunca rutas relativas largas.
3. **HTTP solo por `api/requests/<modulo>Api.js`** sobre la instancia única `api/services/httpCliente.js`. Nada de `axios` directo en componentes.
4. **Nunca enviar la identidad de la sesión** (`useBy`, `updatedBy`, `userId`…) ([DEC-005](../decisiones/DEC-005-identidad-desde-sesion.md)).
5. **Permisos en UI con `canDo`:** `const canDo = (perId) => perId != null && hasPermission(perId)`, leyendo los ids de `permissionsCatalog` de `useAuth()`. Nunca `hasPermission(permissionsCatalog.x?.y)` directo: con el catálogo cargando es `undefined`, y `hasPermission(undefined)` es `true`.
6. **Todo `catch` avisa al usuario** con `showError(err.response?.data?.message || 'mensaje de respaldo')` de `services/ToastService.js`. Solo `console.error` deja al usuario sin respuesta.
7. **Formularios de creación con `Idempotency-Key`:** clave nueva con `newIdempotencyKey()` al abrir el formulario, reutilizada en cada intento de ese formulario; `null` al editar.
8. **Reutilizar `ui-component/`** antes de crear un componente nuevo.
9. **Nada de cálculos de negocio** (montos, saldos, fechas derivadas) en el cliente. Los muestra, no los decide.

## Pantallas de maestros

No se escriben a mano: se declaran sobre `ui-component/extended/MasterPage` con su API de `createMasterApi` ([DEC-022](../decisiones/DEC-022-vista-maestro.md)). Referencia: `views/admin/identityDocuments/IdentityDocumentPage.jsx`. `MasterPage` ya incluye las piezas de abajo, más pestañas por estado con conteo y la acción de activar/desactivar. En lugar del botón de filtros tiene un solo campo de búsqueda a la izquierda ([DEC-024](../decisiones/DEC-024-busqueda-listados.md)). Por los conteos, después de cada escritura **recarga** la página actual en vez de actualizar la fila en memoria.

## Anatomía de una página de listado

Referencia: `views/security/profiles/ProfilePage.jsx`.

| Pieza | Componente |
| --- | --- |
| Contenedor | `ui-component/cards/MainCard` con los botones en `title` |
| Búsqueda | `ui-component/extended/SearchInput` a la izquierda: un solo texto, buscado en el servidor (`search`) ([DEC-024](../decisiones/DEC-024-busqueda-listados.md)) |
| Filtro de estado | `ui-component/extended/StatusTabs` con los conteos de `statusCounts` (`statusTabsWithCounts` de `utils/constants.js`) |
| Crear | Botón visible solo si `canCreate` |
| Tabla | `ui-component/extended/DataTable`, paginado y ordenado en el servidor (`page`, `rowsPerPage`, `sortField`, `sortOrder`) |
| Estado de la fila | `ui-component/extended/StatusChip` |
| Autoría | `ui-component/extended/LastModifiedCell` con `updatedByName` y `updatedAt` ([DEC-014](../decisiones/DEC-014-autor-por-nombre.md)) |
| Acciones por fila | `actions` de `DataTable` (usa `TableActions`), cada una filtrada con `canDo`; eliminar lleva `confirm`. El color sale de `tone` (`edit`, `info`, `danger`, `neutral`, `success`, en `ui-component/extended/ActionButton`), nunca de un hex fijo: los tonos usan la paleta del tema y cumplen contraste |
| Tabla vacía | `emptyMessage` distinto con búsqueda, con filtro de estado y sin registros; `emptyAction` ofrece crear el primero |
| Diálogo | Montado una vez, controlado por `ref` |

Al cambiar la búsqueda o la pestaña, la página vuelve a 0. Al guardar o eliminar se recarga el listado, para que los conteos de las pestañas sigan exactos.

## Anatomía de un diálogo de edición

Referencia: `views/security/profiles/components/ProfileDialog.jsx`.

- `forwardRef` + `useImperativeHandle` que expone `new<X>()` y `edit<X>(item)`.
- `ui-component/extended/BaseDialog` con acciones Cancelar / Guardar. No se cierra con un clic fuera (perdería lo escrito); sí con Cancelar, la ✕ o Esc. `loading` es solo la carga inicial: al guardar, el formulario sigue visible y el botón dice "Guardando…" y queda deshabilitado. Formularios largos: `fullScreenOnMobile`.
- Textos de botones con mayúscula solo al inicio: "Guardar cambios".
- Formularios con varias partes: una sección por parte con `ui-component/cards/SubCard` (Berry). Referencia: `WorkDialog.jsx`.
- `react-hook-form` con `FormProvider` y `ui-component/extended/GenericFormSection` alimentado por un arreglo de campos.
- Estados del registro con `STATUS_OPTIONS` de `utils/constants.js`.
- Al guardar: `showSuccess(data.message)`, avisar a la página con `addItem` o `updateItem`, cerrar.
- Colecciones de un agregado (responsables, etapas, contactos) que se guardan con el padre: `ui-component/extended/EditableList`, montado como campo `custom` de `GenericFormSection`. Referencia: `views/work/works/components/WorkDialog.jsx`.

## Rutas y menú

- Ruta protegida: hijo lazy (`Loadable(lazy(() => import(...)))`) en `routes/MainRoutes.jsx`.
- El sidebar sale de `tbl_pages` vía `GET /app/get_menu`: una página nueva necesita su fila en `tbl_pages` y su permiso de página (ver [`CRUD_STANDARD`](CRUD_STANDARD.md), paso 2).
- `menu-items/*.js` solo alimenta las migas de pan.

## Errores

Dos capas que no se mezclan: los errores de la API se muestran con `showError` en cada pantalla; `routes/ErrorBoundary.jsx` solo atrapa fallos de render y el 404 de rutas. Ver [`ERROR_HANDLING_STANDARD`](ERROR_HANDLING_STANDARD.md).

## Estilo y verificación

Prettier (comillas simples, sin comas finales, 2 espacios, `printWidth` 140). `yarn lint` antes de dar un cambio por terminado. No hay tests del cliente (ver [deuda](../debt/TECHNICAL_DEBT.md)).
