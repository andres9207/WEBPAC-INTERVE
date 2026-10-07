# DEC-048 — Los listados filtran por campo con FilterPopper y filtran el estado con pestañas

**Fecha:** 2026-10-07 · **Tipo:** Obligatoria · **ADR:** [0003](../adr/0003-aseguradoras.md), [0004](../adr/0004-constructoras.md), [0006](../adr/0006-tipos-contrato.md)–[0012](../adr/0012-proveedores.md), [0015](../adr/0015-contratos.md), [0020](../adr/0020-facturacion.md)

Reemplaza a [DEC-024](DEC-024-busqueda-listados.md) (un solo campo de búsqueda). Lo decidió el usuario el 2026-10-07. Aplica a los maestros, perfiles, usuarios, obras, proveedores, contratos y facturas.

## Contexto

DEC-024 quitó el botón "Filtros" y dejó un solo campo de búsqueda. Con obras, proveedores, contratos y facturas, un texto suelto no alcanza: se necesita filtrar por tipo, constructora, rango de fechas y otros campos a la vez. Contratos y facturas ya tenían un selector de tipo suelto en la barra.

## Decisión

- **Cliente:** un botón **Filtros** a la izquierda de la cabecera, con el número de filtros activos, abre `FilterPopper` con un campo por filtro y el botón Limpiar. Se quita el campo de búsqueda. A la derecha siguen las pestañas por estado con conteo y el botón de crear.
  - Cada página declara sus filtros (`filterFields`) en el formato de FilterPopper: `{ key, type, label, props?, grid? }`. `key` es el parámetro de la petición; un rango (`calendar-range`) viaja como `<key>From` y `<key>To`.
  - Los filtros se aplican 300 ms después del último cambio y el listado vuelve a la página 0. El texto viaja recortado; lo vacío no viaja.
  - Las pestañas cuentan dentro de los filtros. Los selectores de tipo de contratos y facturas pasan al popper.
  - Las listas usan `SearchSelect` (cerradas) o `SelectSocket` (maestros, solo los activos).
  - **Obra** ([DEC-047](DEC-047-alcance-por-obra.md)): solo con "Ver todo", con las obras del selector del encabezado (`useWorkFilterField`). Con una obra elegida, el listado ya es de esa obra.
- **Servidor:** cada filtro se valida con `express-validator` y se agrega al `where` del service con los helpers de `pagination.utils.js`: `containsFilter`, `idFilter`, `dateRangeFilter` y `filtersWhere`.
  - Los filtros van en un `AND`, nunca sueltos en el `where`. Así un filtro no pisa otra condición sobre la misma columna; en particular, **el filtro de obra se suma al alcance y nunca lo reemplaza**.
  - El rango de fechas incluye los dos extremos (`AAAA-MM-DD`, `optionalDate`).
  - El parámetro `search` se sigue aceptando: lo usan los selectores con búsqueda en el servidor. Los listados dejan de enviarlo.

| Listado | Filtros |
| --- | --- |
| Maestros | Los campos `filter: true` de la config (nombre o descripción; código en tipos de identificación; acto en motivos) |
| Perfiles | Nombre |
| Usuarios | Nombre, apellido, documento, usuario, correo y perfil |
| Obras | Código, nombre, constructora y tipo de interventoría |
| Proveedores | Razón social, documento, tipo de proveedor y obra asignada |
| Contratos | Número, nombre, tipo de contrato, razón social del proveedor, rango de fecha fin y obra |
| Facturas | Tipo, número, comprobante, número de contrato, razón social del proveedor, rango de fecha, rango de aprobación y obra |

## Descartado

- **Mantener el campo de búsqueda junto al botón Filtros:** lo descartó el usuario.
- **Filtro de proveedor como lista en contratos y facturas:** el único selector de proveedores (`select_providers`) exige el permiso de asignar a obras; quien solo consulta recibiría 403. Se filtra por la razón social, en texto.
- **Filtro de obra con una obra elegida en el encabezado:** repetiría el alcance.

## Qué implica

- Un listado nuevo declara `filterFields` en su página y acepta cada filtro en su validación y en su service, con los helpers de `pagination.utils.js` dentro de `filtersWhere`.
- El filtro de estado de las pestañas, si va en `AND`, se agrega a los filtros, no los reemplaza.
- `filterFields` debe ser estable (constante del módulo o `useMemo`): un arreglo nuevo en cada render vuelve a pedir el listado sin fin.

## Dónde

`server/src/common/utils/pagination.utils.js` y `validation.utils.js` · `modules/work/works/`, `work/providers/`, `work/contracts/` y `billing/invoices/` (service, controller, validation) · `client/src/ui-component/extended/FilterPopper.jsx`, `FilterButton.jsx` y `MasterPage.jsx` · `client/src/hooks/useListFilters.js` · `client/src/contexts/WorkScopeContext.jsx` (`useWorkFilterField`) · las páginas de `views/admin/*`, `views/security/{users,profiles}`, `views/work/{works,providers,contracts}` y `views/billing/invoices` · tests en `test/common/utils/pagination.utils.test.js`, `validation.utils.test.js` y los `*.service.test.js` de obras, proveedores, contratos y facturas
