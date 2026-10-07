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
9. **Nada de cálculos de negocio** (montos, saldos, fechas derivadas) en el cliente. Los muestra, no los decide. Si el valor tiene que verse mientras se edita, se le pide al servidor con un endpoint de vista previa de solo lectura que usa la misma función con que guarda. Ejemplo: la fecha final de obras y contratos (`hooks/useEndDatePreview.js`, `preview_work_end_date` y `preview_contract_end_date`), que se recalcula al salir del plazo, al cambiar la unidad o la fecha de inicio.

## Pantallas de maestros

No se escriben a mano: se declaran sobre `ui-component/extended/MasterPage` con su API de `createMasterApi` ([DEC-022](../decisiones/DEC-022-vista-maestro.md)). Referencia: `views/admin/identityDocuments/IdentityDocumentPage.jsx`. `MasterPage` ya incluye las piezas de abajo, más pestañas por estado con conteo y la acción de activar/desactivar. A la izquierda, el botón **Filtros** con su panel (`filterFields`, [DEC-048](../decisiones/DEC-048-filtros-listados.md)). Por los conteos, después de cada escritura **recarga** la página actual en vez de actualizar la fila en memoria.

## Anatomía de una página de listado

Referencia: `views/security/profiles/ProfilePage.jsx`.

| Pieza | Componente |
| --- | --- |
| Contenedor | `ui-component/cards/MainCard` con los botones en `title` |
| Filtros | `ui-component/extended/FilterButton` a la izquierda, con el número de filtros activos; abre `FilterPopper` con un campo por filtro. Estado con `hooks/useListFilters`; filtra el servidor ([DEC-048](../decisiones/DEC-048-filtros-listados.md)) |
| Filtro de estado | `ui-component/extended/StatusTabs` con los conteos de `statusCounts` (`statusTabsWithCounts` de `utils/constants.js`) |
| Crear | Botón visible solo si `canCreate` |
| Tabla | `ui-component/extended/DataTable`, paginado y ordenado en el servidor (`page`, `rowsPerPage`, `sortField`, `sortOrder`) |
| Estado de la fila | `ui-component/extended/StatusChip` |
| Autoría | `ui-component/extended/LastModifiedCell` con `updatedByName` y `updatedAt` ([DEC-014](../decisiones/DEC-014-autor-por-nombre.md)) |
| Acciones por fila | `actions` de `DataTable` (usa `TableActions`), cada una filtrada con `canDo`; eliminar lleva `confirm`. El color sale de `tone` (`edit`, `info`, `danger`, `neutral`, `success`, en `ui-component/extended/ActionButton`), nunca de un hex fijo: los tonos usan la paleta del tema y cumplen contraste |
| Tabla vacía | `emptyMessage` distinto con filtros, con filtro de estado y sin registros; `emptyAction` ofrece crear el primero |
| Diálogo | Montado una vez, controlado por `ref` |

Al cambiar un filtro o la pestaña, la página vuelve a 0. Al guardar o eliminar se recarga el listado, para que los conteos de las pestañas sigan exactos.

## Anatomía de un diálogo de edición

Referencia: `views/security/profiles/components/ProfileDialog.jsx`.

- `forwardRef` + `useImperativeHandle` que expone `new<X>()` y `edit<X>(item)`.
- `ui-component/extended/BaseDialog` con acciones Cancelar / Guardar. No se cierra con un clic fuera (perdería lo escrito); sí con Cancelar, la ✕ o Esc. `loading` es solo la carga inicial: al guardar, el formulario sigue visible y el botón dice "Guardando…" y queda deshabilitado. Formularios largos: `fullScreenOnMobile`.
- Textos de botones con mayúscula solo al inicio: "Guardar cambios".
- Formularios con varias partes: una sección por parte con `ui-component/cards/SubCard` (Berry). Referencia: `WorkDialog.jsx`.
- `react-hook-form` con `FormProvider` y `ui-component/extended/GenericFormSection` alimentado por un arreglo de campos.
- Estados del registro con `STATUS_OPTIONS` de `utils/constants.js`.
- Al guardar: `showSuccess(data.message)`, avisar a la página con `addItem` o `updateItem`, cerrar.
- Colecciones de un agregado (responsables, etapas, contactos) que se guardan con el padre: tabla + modal, o `ui-component/extended/EditableList` para filas cortas. Referencia: `views/work/works/WorkFormPage.jsx`.

## Agregado con rutas propias

Un agregado que crece (obra, proveedor; después contrato) no usa el diálogo chico del maestro: tiene listado, detalle y formulario con rutas `<área>/<módulo>`, `/new`, `/:id` y `/:id/edit` ([DEC-030](../decisiones/DEC-030-obra-paginas-propias-plazo.md)). Las tres últimas son **rutas hijas del listado** y se abren en un modal grande sobre él (`ui-component/extended/RouteDialog`), así que recargar o compartir el enlace abre el mismo modal ([DEC-034](../decisiones/DEC-034-modal-con-direccion-propia.md)). El listado es `MasterPage` con `navigation` y `reloadKey`, y monta un `<Outlet context={{ refresh }} />`; el modal llama a `refresh` después de cada cambio. Cómo se ve: [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md), "Detalle y formulario en modal".

## Rutas y menú

- Ruta protegida: hijo lazy (`Loadable(lazy(() => import(...)))`) en `routes/MainRoutes.jsx`.
- El sidebar sale de `tbl_pages` vía `GET /app/get_menu`: una página nueva necesita su fila en `tbl_pages` y su permiso de página (ver [`CRUD_STANDARD`](CRUD_STANDARD.md), paso 2).
- `menu-items/*.js` solo alimenta las migas de pan.

## Errores

Dos capas que no se mezclan: los errores de la API se muestran con `showError` en cada pantalla; `routes/ErrorBoundary.jsx` solo atrapa fallos de render y el 404 de rutas. Ver [`ERROR_HANDLING_STANDARD`](ERROR_HANDLING_STANDARD.md).

## Estilo y verificación

Prettier (comillas simples, sin comas finales, 2 espacios, `printWidth` 140). `yarn lint` antes de dar un cambio por terminado. No hay tests del cliente (ver [deuda](../debt/TECHNICAL_DEBT.md)).
