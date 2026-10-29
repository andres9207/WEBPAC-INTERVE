# DEC-097 — ESLint en el servidor, con las reglas recomendadas

**Fecha:** 2026-10-29 · **Tipo:** Obligatoria · **ADR:** — (infraestructura, sigue a [DEC-095](DEC-095-ci-health-check.md))

Pedido por el usuario el 2026-10-29, como primer paso hacia la medición de code smells.

## Contexto

- El servidor no tenía linter; estaba anotado en la deuda técnica. El cliente ya usaba ESLint 9.
- Se midió sobre una copia del código: con las reglas recomendadas de ESLint, 22 hallazgos en 282 archivos, todos `no-unused-vars`. Con `eslint-plugin-sonarjs`, 291, muchos de ellos falsos positivos de seguridad.

## Decisión

- **ESLint 9.39.1 con `@eslint/js` recommended**, la misma versión que el cliente, en `server/eslint.config.js`.
  - Globales de Node en todo el servidor, más los de Jest en `test/`.
  - `.cjs` como CommonJS (`ecosystem.config.cjs`).
  - Se excluyen `logs/`, `coverage/` y `src/uploads/`.
- **`no-unused-vars` respeta las dos convenciones que ya usa el código** para descartar algo a propósito:
  - el prefijo `_` (`{ ctr_version: _version, ...rest }`, o un argumento que la firma exige);
  - el resto de una desestructuración (`{ wks_id, ...stage }`).
- **Los errores bloquean el CI:** el paso `npm run lint` corre en el job del servidor, antes de los tests. Hay también `npm run lint:fix`.
- **Sin reglas de estilo ni Prettier:** no se reformatea el código existente.
- **Se corrigieron los 22 hallazgos:**
  - 13 desaparecen con la configuración anterior.
  - `next` del manejador de errores pasa a `_next`: Express lo reconoce porque recibe 4 argumentos, así que no se quita.
  - Se quitaron imports, constantes y parámetros que no se usaban. `actingProId` y `previousModules` se seguían recibiendo e ignorando a propósito: dejan de nombrarse en el service, y el controller puede seguir enviándolos.

## Descartado

- **`eslint-plugin-sonarjs` en este paso:** queda para después, en modo advertencia. La versión 3.0.7 no declara una de sus dependencias (`ts-api-utils`) y exige instalar `typescript`. Antes de sumarlo hay que fijar las versiones y marcar sus falsos positivos.
- **Prettier:** reformatearía todo el servidor en un solo cambio.

## Qué implica

- `npm run lint` en `server/` antes de dar por terminado un cambio del servidor; el CI lo exige.
- Algo que se descarta a propósito se nombra con `_` delante o se separa con `...resto`. No se desactiva la regla en la línea.

## Dónde

`server/eslint.config.js` · `server/package.json` (`lint`, `lint:fix`; `eslint`, `@eslint/js` y `globals` en `devDependencies`) · `.github/workflows/ci.yml` (paso Lint del job del servidor).
