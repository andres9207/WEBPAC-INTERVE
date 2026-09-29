# DEC-024 — Los listados buscan con un solo campo de texto y filtran el estado con pestañas

**Fecha:** 2026-09-29 · **Tipo:** Obligatoria · **ADR:** [0003](../adr/0003-aseguradoras.md), [0004](../adr/0004-constructoras.md), [0006](../adr/0006-tipos-contrato.md)–[0010](../adr/0010-tipos-proveedor.md), [0019](../adr/0019-tipos-poliza.md)

Reemplaza la parte de filtros de [DEC-022](DEC-022-vista-maestro.md) (el botón "Filtros" con `FilterPopper` y la prop `filters`). El resto de DEC-022 sigue vigente. Aplica a los maestros, a perfiles y a usuarios.

## Contexto

Los listados filtraban con un botón que abría un popper con un campo por columna, más un desplegable de estado. Es un paso de más: el usuario pidió un solo campo de búsqueda a la izquierda de la cabecera, primero en los maestros y después en perfiles y usuarios.

## Decisión

- **Servidor:** el listado acepta `search` (texto opcional, hasta 100 caracteres). El service busca ese texto en **cualquiera** de sus columnas de búsqueda (`OR` de `contains`), recortado; vacío no filtra. Devuelve `statusCounts` (cuántos hay por estado con la misma búsqueda, sin el filtro de estado). Helpers `searchWhere(columns, search)` y `countByStatus(model, where)` en `common/utils/pagination.utils.js`. Los filtros por campo que ya existían se siguen aceptando.
  - Maestros: las columnas son los campos `filter: true` de la config.
  - Perfiles: nombre.
  - Usuarios: nombre, apellido, correo, número de documento y usuario.
- **Cliente:** `ui-component/extended/SearchInput` a la izquierda. Avisa 400 ms después de la última tecla y la página vuelve a 0. A la derecha, `StatusTabs` (Todos / Activos / Inactivos, con conteo) y el botón de crear. Pestañas y conteos salen de `statusTabsWithCounts` en `utils/constants.js`.
- Como hay conteos, después de guardar se **recarga** el listado en vez de actualizar la fila en memoria (igual que DEC-022).
- La igualdad la decide la colación de la columna: "cedula" encuentra "Cédula".

## Descartado

- **Filtrar en memoria sobre la página cargada:** solo buscaría en las filas visibles.
- **Mantener el botón de filtros junto a la búsqueda:** duplica lo mismo; el estado pasa a las pestañas.

## Qué implica

- Un listado nuevo con búsqueda usa `searchWhere` y `countByStatus` en su service y `SearchInput` + `StatusTabs` en su página.
- El texto del `placeholder` nombra las columnas en que se busca.
- Nombre y apellido son columnas separadas: "Juan Ospina" no encuentra a "Juan Pablo Ospina"; "Ospina" sí.

## Dónde

`server/src/common/utils/pagination.utils.js` · `common/services/master.service.js` · `common/utils/masterValidation.utils.js` · `common/utils/masterRouter.utils.js` · `modules/security/profiles/` y `modules/security/users/` (service, controller, validation) · `client/src/ui-component/extended/SearchInput.jsx` y `MasterPage.jsx` · `client/src/views/security/profiles/ProfilePage.jsx` y `users/UsersPage.jsx` · tests en `server/test/common/utils/pagination.utils.test.js`, `test/common/services/master.service.test.js`, `masterRouter.utils.test.js` y `profiles.controller.test.js`
