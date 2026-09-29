# DEC-022 — Las pantallas de maestros se declaran sobre `MasterPage`

**Fecha:** 2026-09-29 · **Tipo:** Obligatoria · **ADR:** [0003](../adr/0003-aseguradoras.md), [0004](../adr/0004-constructoras.md), [0006](../adr/0006-tipos-contrato.md)–[0010](../adr/0010-tipos-proveedor.md), [0019](../adr/0019-tipos-poliza.md)

Backlog MAE-FE-01. Contraparte en el cliente de [DEC-020](DEC-020-patron-maestro.md).

## Contexto

La primera pantalla de maestro (tipos de identificación) tenía unas 280 líneas entre página y diálogo, casi todas iguales a las que tendrían los otros siete maestros.

## Decisión

- **`ui-component/extended/MasterPage.jsx`** compone los componentes existentes: `MainCard`, `FilterPopper`, `StatusTabs`, `DataTable` (con su confirmación), `StatusChip`, `LastModifiedCell` y **`MasterDialog.jsx`** (crear y editar).
- **`api/services/masterApi.js`** (`createMasterApi(base, { entity, plural })`) da las seis llamadas estándar. Cada maestro las expone desde su propio `api/requests/<módulo>Api.js`.
- **Una pantalla de maestro se declara:** `title`, `idField`, `api`, `permissions` (la entrada del catálogo), `columns`, `filters`, `formFields` (con `editable: false` para lo que no se edita), `defaultSort` y `rowLabel`. Referencia: `views/admin/identityDocuments/IdentityDocumentPage.jsx`.
- **Pestañas por estado** (Todos / Activos / Inactivos) con conteo. El listado del patrón de servidor devuelve `statusCounts`: cuántos hay por estado con los mismos filtros de texto.
- **Acciones por fila** según permiso: editar, activar/desactivar (desactivar pide confirmación) y eliminar (con confirmación). Ocultarlas es experiencia de uso; el servidor decide.
- **Después de guardar, cambiar el estado o eliminar se recarga la página actual**, en lugar de actualizar la fila en memoria como pide `FRONTEND_STANDARD` para las demás pantallas. Así los conteos de las pestañas y el filtro por estado siguen siendo exactos.
- **Ancho de teléfono:** `DataTable` pasa a tarjetas, `StatusTabs` a un menú, y los botones de la cabecera bajan de línea (`flexWrap`).

## Descartado

- **Actualizar la fila en memoria:** deja mal los conteos y muestra en "Activos" una fila recién desactivada.
- **Pestañas sin conteo:** `StatusTabs` los muestra, y los conteos avisan de un filtro que deja una pestaña vacía.

## Qué implica

- Una pantalla de maestro nuevo es su archivo de API más una página declarativa. Un maestro que necesite algo que `MasterPage` no cubre lo agrega a `MasterPage` si sirve a varios, o compone su pantalla a mano, y el motivo va en su spec.
- Los mensajes del servidor se muestran tal cual, por ejemplo "lo usan 2 usuario(s)" al eliminar algo en uso.

## Dónde

`client/src/ui-component/extended/MasterPage.jsx` · `client/src/ui-component/extended/MasterDialog.jsx` · `client/src/api/services/masterApi.js` · `client/src/views/admin/identityDocuments/IdentityDocumentPage.jsx` · `server/src/common/services/master.service.js` (`statusCounts`) · test en `server/test/common/services/master.service.test.js`
