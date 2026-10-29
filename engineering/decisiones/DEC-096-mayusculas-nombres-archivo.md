# DEC-096 — Nombres de archivo e imports con las mismas mayúsculas

**Fecha:** 2026-10-29 · **Tipo:** Obligatoria · **ADR:** — (infraestructura, sigue a [DEC-095](DEC-095-ci-health-check.md))

Pedido por el usuario el 2026-10-29, después de que el primer build del CI fallara en Linux.

## Contexto

- El archivo se llamaba `client/src/contexts/authContext.jsx`, y los 43 imports decían `contexts/AuthContext`.
- Windows no distingue mayúsculas en los nombres de archivo: en local compilaba. Linux sí las distingue, y el runner de GitHub y el servidor de Hostinger son Linux. Ahí Vite no encontró el archivo y el build falló.
- Se corrigió con `git mv` a `AuthContext.jsx`, el nombre que usaban los imports y la convención de los otros contextos.

## Decisión

- **Un import escribe el nombre del archivo y de cada carpeta exactamente como está**, con las mismas mayúsculas.
- **Convención al crear un archivo**, la que ya sigue el código:
  - **Cliente:** componentes, páginas, diálogos y contextos de React en PascalCase (`InvoicesPage.jsx`, `AuthContext.jsx`, `ContactsEditor.jsx`). Hooks, utilidades, constantes y API en camelCase (`useEndDatePreview.js`, `worksApi.js`, `constants.js`). Carpetas de vistas en camelCase (`views/admin/identityDocuments/`).
  - **Servidor:** camelCase con el sufijo de su capa (`works.service.js`, `invoiceGlosses.service.js`, `money.utils.js`).
- **Para cambiar solo las mayúsculas de un nombre se usa `git mv`, en dos pasos** (`git mv a.jsx tmp.jsx` y `git mv tmp.jsx A.jsx`). Con `core.ignorecase=true`, que es lo normal en Windows, git no registra un cambio que solo toca mayúsculas.
- **Lo hace cumplir un test:** `server/test/common/importCase.guard.test.js`. Compara cada import relativo, y cada import del cliente desde `src` (`contexts/…`, `ui-component/…`), con el nombre real de cada carpeta y archivo. Falla con el archivo y el import, también en Windows: el error aparece al correr los tests, sin esperar al build de Linux.
- **El mismo test comprueba que git registre cada archivo con las mayúsculas del disco.** El renombrado de `AuthContext.jsx` se perdió una vez antes del commit: el disco tenía el nombre nuevo, git el viejo, y todo funcionaba en Windows. Antes de hacer commit de un renombrado así, `git status` tiene que mostrar `R  viejo -> Nuevo`.

## Descartado

- **Editar los 43 imports a `authContext`:** tocaba 43 archivos y rompía la convención de los contextos en PascalCase.
- **`eslint-plugin-import` con `import/no-unresolved`:** agregaba una dependencia y su configuración de resolución con el `baseUrl` de Vite, para lo que resuelve un test sin dependencias.

## Qué implica

- Al crear un archivo, se nombra con la convención de su carpeta vecina y se importa con ese mismo nombre.
- Si el test falla, se corrige el nombre del archivo o el import. No se excluye el caso del test.

## Dónde

`server/test/common/importCase.guard.test.js` · `client/src/contexts/AuthContext.jsx` · Reglas en [`FRONTEND_STANDARD`](../standards/FRONTEND_STANDARD.md) (regla 10), [`BACKEND_STANDARD`](../standards/BACKEND_STANDARD.md) ("Nombres de archivo") y [`AGENT_WORKFLOW`](../AGENT_WORKFLOW.md) ("Rutas y carpetas").
