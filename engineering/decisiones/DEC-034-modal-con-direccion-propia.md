# DEC-034 — El detalle y el formulario de un agregado se abren en un modal con dirección propia

**Fecha:** 2026-10-02 · **Tipo:** Vigente · **ADR:** [0011](../adr/0011-obras.md), [0012](../adr/0012-proveedores.md) · **Reemplaza en parte:** [DEC-030](DEC-030-obra-paginas-propias-plazo.md) (solo la presentación a página completa)

Sale del prototipo de vistas revisado con el usuario (2026-10-02): el detalle y la edición de obras y proveedores se ven en un modal grande sobre el listado.

## Contexto

DEC-030 sacó la obra del diálogo chico y le dio páginas propias: detalle y formulario a página completa, cada uno con su ruta. El usuario prefiere no salir del listado al ver o editar un registro, pero sigue haciendo falta lo que daban las rutas: recargar sin perder el registro abierto y compartir el enlace.

## Decisión

- **Modal grande con dirección propia.** Las rutas de DEC-030 se conservan (`<módulo>/new`, `/:id`, `/:id/edit`), pero son **hijas** de la ruta del listado: el listado se monta una vez, con un `<Outlet>`, y el detalle o el formulario se abren encima en `ui-component/extended/RouteDialog`. Cerrar o cancelar navega al listado, también desde la edición: el modal se cierra, no vuelve al detalle.
- **`RouteDialog`**: `Dialog` de MUI `maxWidth="lg"`, a pantalla completa por debajo de `md`. Encabezado con identidad y estado y una X para cerrar, pestañas opcionales, cuerpo con scroll y pie de acciones. Con `onSubmit`, el modal entero es el formulario.
- **Detalle**: Eliminar y Desactivar a la izquierda del pie, Cerrar y Editar a la derecha. Las cifras clave van dentro de la pestaña Resumen.
- **Formulario**: las mismas secciones de DEC-030, una debajo de otra; Cancelar y Guardar en el pie. Cerrar con la X, con Escape o haciendo clic en el fondo pide confirmar si hay cambios sin guardar.
- **Recarga del listado**: la página del listado pasa `refresh` por el contexto del `Outlet`; el modal lo llama después de guardar, cambiar el estado, eliminar o cambiar los proveedores de la obra. `MasterPage` recibe `reloadKey` y los indicadores de obras también.
- Aplica a obras y proveedores, y es el patrón para el expediente de contrato.

## Descartado

- **Modal sin ruta** (estado local del listado): al recargar se pierde el registro abierto y no hay enlace para compartir.
- **Mantener las páginas completas**: es lo que el usuario pidió cambiar.
- **Formulario por pasos con pestañas** (como el prototipo, con Anterior y Siguiente): necesita marcar en qué pestaña hay errores y decidir si se puede guardar desde cualquier paso. Queda para cuando el formulario crezca.

## Qué implica

- Los nombres `WorkDetailPage`, `WorkFormPage`, `ProviderDetailPage` y `ProviderFormPage` se mantienen aunque ya no sean páginas: renombrarlos solo movería archivos.
- Un enlace a `/work/works/:id` desde otro módulo (p. ej. el detalle de un proveedor) abre el listado de obras con ese modal.

## Dónde

`client/src/ui-component/extended/RouteDialog.jsx` · `client/src/routes/MainRoutes.jsx` · `client/src/ui-component/extended/MasterPage.jsx` (`reloadKey`) · `client/src/views/work/works/` · `client/src/views/work/providers/` · [`standards/DESIGN_SYSTEM.md`](../standards/DESIGN_SYSTEM.md)
