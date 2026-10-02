# DEC-030 — La obra tiene páginas propias y su plazo es fecha de inicio + número + unidad

**Fecha:** 2026-10-01 · **Tipo:** Vigente · **ADR:** [0011](../adr/0011-obras.md), [0015](../adr/0015-contratos.md)

Sale del rediseño de obras revisado sobre el prototipo con el usuario (2026-10-01).

> **Actualizada por [DEC-034](DEC-034-modal-con-direccion-propia.md) (2026-10-02):** las rutas siguen, pero el detalle y el formulario se abren en un modal grande sobre el listado, no a página completa.

## Contexto

La obra se editaba en un diálogo sobre el listado (`MasterPage` + `WorkDialog`). Es un agregado que va a crecer (contactos, contratos, documentos) y no cabía bien en un diálogo. Además el plazo era un entero sin unidad ni fecha de inicio, así que no se podía saber cuándo termina la obra.

## Decisión

- **Páginas propias** en `client/src/views/work/works/`, dentro del área `work/` que ya existía:
  - listado `work/works` (`MasterPage` con `navigation`: ver detalle y editar);
  - detalle `work/works/:wrkId` (`WorkDetailPage`: encabezado con estado y cifras, pestañas por parte del agregado; activar, desactivar y eliminar viven aquí);
  - alta `work/works/new` y edición `work/works/:wrkId/edit` (`WorkFormPage`: secciones con `SubCard` y barra fija de guardar).
- **Responsables como tabla con un modal** para agregar y editar. Al agregar no se pregunta el estado: entra activo.
- **Plazo**: fecha de inicio (`wrk_start_date`, obligatoria) + plazo inicial + unidad (`wrk_term_unit`: `DIA`, `MES`, `ANIO`, el dominio de ADR-0015). Una sola unidad para el plazo inicial y el ampliado.
- **Fecha final = fecha de inicio + plazo inicial.** La calcula el servidor al leer (`addTerm`, `common/utils/term.utils.js`) y no se guarda. Sumar meses conserva el día; si el mes de destino es más corto, cae en su último día.
- **Plazo ampliado y área se ocultan** de la interfaz por ahora. Las columnas siguen en la BD: el formulario conserva y reenvía los valores que traiga la obra.
- **Componentes de captura únicos**: `SearchSelect` (desplegable con buscador; `SelectSocket` lo usa), `DateField` (`@mui/x-date-pickers`, DD/MM/AAAA, en español) y `MoneyField` (importe es-CO mientras se escribe, valor en texto con punto decimal, DEC-028).

## Descartado

- **Guardar la fecha final**: es un dato derivado; guardarlo obliga a mantenerlo sincronizado.
- **Una unidad por plazo**: el plazo ampliado no podría compararse con el inicial.
- **Calcular la fecha final en el cliente**: FRONTEND_STANDARD, regla 9. El formulario muestra la del servidor, o "Se calcula al guardar" si cambió el plazo.
- **Eliminar las columnas de plazo ampliado y área**: no reversible sin otra migración; queda para cuando el área usuaria lo confirme.

## Qué implica

- Migración `0042`: las obras existentes reciben como fecha de inicio la de su creación y la unidad `MES`. Hay que revisarlas.
- El patrón detalle + formulario con rutas propias es el que reutiliza el expediente de contrato (presentado en modal desde DEC-034).
- `@mui/x-date-pickers` y `@mui/system` son dependencias nuevas del cliente, con `LocalizationProvider` en `App.jsx`.

## Dónde

`database/migrations/0042_add_works_start_date_term_unit.sql` · `server/src/common/utils/term.utils.js` · `server/src/modules/work/works/` · `client/src/views/work/works/` · `client/src/ui-component/extended/{SearchSelect,DateField,MoneyField}.jsx` · [`standards/DESIGN_SYSTEM.md`](../standards/DESIGN_SYSTEM.md)
