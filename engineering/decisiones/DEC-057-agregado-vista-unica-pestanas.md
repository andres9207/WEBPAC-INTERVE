# DEC-057 — Obra y proveedor: detalle y formulario en una sola vista con pestañas

**Fecha:** 2026-10-13 · **Tipo:** Vigente · **ADR:** [0011](../adr/0011-obras.md), [0012](../adr/0012-proveedores.md) · **Reemplaza en parte:** [DEC-034](DEC-034-modal-con-direccion-propia.md) (detalle y formulario como modales separados)

Pedido del usuario (2026-10-13): no pasar de una vista a otra al crear, ver o editar una obra o un proveedor.

## Contexto

Con DEC-034, guardar el formulario cerraba su modal y abría el del detalle, y "Editar" hacía lo contrario. El formulario apilaba sus secciones (datos, responsables, etapas, contactos) y el detalle tenía las mismas partes como pestañas de consulta.

## Decisión

- **Un solo modal** para `/new`, `/:id` y `/:id/edit`, con las rutas de DEC-034. La edición abre en la pestaña de datos y el detalle, en Resumen.
- **Pestaña de datos nueva**: "Datos de la obra" (datos generales, valores y plazos) y "Datos del proveedor" (identidad y datos generales). Las colecciones que se guardan con el agregado (responsables, etapas y contactos de la obra; contactos del proveedor) se editan en su propia pestaña.
- **Un solo Guardar** en el pie: guarda todas esas pestañas juntas, en la misma petición de siempre (el servidor no cambia). Está deshabilitado mientras no hay cambios. "Descartar cambios" vuelve a lo guardado.
- **Al crear**, solo las pestañas del formulario; Resumen, Proveedores, Obras, Contratos y Facturas se habilitan al guardar, sin salir del modal (la ruta pasa de `/new` a `/:id` y abre en Resumen). Responsables se habilita al crear porque el servidor exige uno activo.
- **Errores**: la pestaña con un campo inválido se marca con `*` y se salta a la primera. Las pestañas del formulario están siempre montadas (ocultas con CSS) para que sus reglas se validen aunque no estén a la vista.
- **Guardar no es un submit del modal** (`RouteDialog` sin `onSubmit`): un Enter en el buscador de las pestañas de proveedores o facturas no debe guardar el agregado.
- Sin el permiso de editar, la pestaña de datos no aparece y las colecciones se ven en solo lectura, como antes.

## Descartado

- **Modo de edición que se activa con un botón**: vuelve a ser un cambio de vista dentro del modal; el usuario prefirió editar en la pestaña.
- **Colecciones solo en la pestaña de datos**: repite en dos sitios lo mismo (pestaña de consulta y sección del formulario).

## Qué implica

- `WorkFormPage.jsx` y `ProviderFormPage.jsx` desaparecen; las tres rutas montan `WorkDetailPage` y `ProviderDetailPage`. El modelo del formulario vive en `components/workForm.js` y `components/providerForm.js`, y la pestaña de datos en `WorkDataForm.jsx` y `ProviderDataForm.jsx`.
- Recargar el agregado después de cambiar su estado o sus asignaciones no pisa lo que se está editando.
- El expediente de contrato sigue con DEC-034 (detalle y formulario separados).

## Dónde

`client/src/views/work/works/` · `client/src/views/work/providers/` · `client/src/routes/MainRoutes.jsx` · [`standards/DESIGN_SYSTEM.md`](../standards/DESIGN_SYSTEM.md)
