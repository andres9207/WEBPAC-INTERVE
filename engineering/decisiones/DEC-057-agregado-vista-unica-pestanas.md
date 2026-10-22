# DEC-057 — Obra, proveedor y contrato: detalle y formulario en una sola vista con pestañas

**Fecha:** 2026-10-13 · **Tipo:** Vigente · **ADR:** [0011](../adr/0011-obras.md), [0012](../adr/0012-proveedores.md), [0015](../adr/0015-contratos.md) · **Reemplaza en parte:** [DEC-034](DEC-034-modal-con-direccion-propia.md) (detalle y formulario como modales separados)

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
## Contratos (2026-10-22)

Pedido del usuario (2026-10-22): el contrato también en una sola vista, con lo que se edita en su propia pestaña. Se aplica la decisión, con una diferencia:

- **"Datos del contrato"** es la pestaña de datos: la cabecera (obra, proveedor y su tipo, etapa, número, plazo, AIU, campos configurables). Su **Guardar** y "Descartar cambios" aparecen **solo en esa pestaña**. En obras, las colecciones se guardan con el agregado y el Guardar del pie las cubre todas. En el contrato, el resto se cambia con **actos que se guardan solos**, con su diálogo, permiso y transacción: otrosí, otrosí de liquidación y modificar concepto (Valor), pólizas, suspender (Suspensiones, que pasa del pie a su pestaña) y facturas. Un Guardar visible en esas pestañas haría creer que guarda el acto.
- **Al crear**, se ven todas las pestañas, pero solo se usan datos, valor inicial y pólizas (estas, con el permiso de registrar pólizas), con un solo Guardar en el pie que lo envía todo en una petición, como antes (PRO-BE-09). Las demás se habilitan al guardar.
- La pestaña de datos se marca con `•` mientras tiene cambios sin guardar, porque su Guardar no está a la vista en las otras pestañas.
- Fuera de ejecución, la pestaña de datos se ve con su aviso y sin poder guardar. Sin el permiso de editar, no aparece.
- Desde el tablero (DEC-063), el contrato se edita sin salir de él.
- **El listado solo ofrece "Ver detalle"**, también en proveedores (2026-10-22): "Editar" abría la misma vista en otra pestaña, así que se quitó (`MasterPage` admite `navigation` sin `edit`). Las rutas `/:ctrId/edit` y `/:prvId/edit` siguen funcionando para los enlaces que ya existan y abren en la pestaña de datos.

`ContractFormPage.jsx` desaparece: el modelo vive en `components/contractForm.js`, el estado del formulario en `components/useContractForm.js` y la pestaña en `components/ContractDataForm.jsx`.

## Dónde

`client/src/views/work/works/` · `client/src/views/work/providers/` · `client/src/views/work/contracts/` · `client/src/routes/MainRoutes.jsx` · [`standards/DESIGN_SYSTEM.md`](../standards/DESIGN_SYSTEM.md)
