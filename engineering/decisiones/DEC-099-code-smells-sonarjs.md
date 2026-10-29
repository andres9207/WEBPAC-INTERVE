# DEC-099 — Code smells con eslint-plugin-sonarjs, como advertencias

**Fecha:** 2026-10-29 · **Tipo:** Obligatoria · **ADR:** — (infraestructura, sigue a [DEC-097](DEC-097-linter-servidor.md) y [DEC-098](DEC-098-resumen-ci.md))

Pedido por el usuario el 2026-10-29. Se eligió el plugin de ESLint y no SonarCloud: el repositorio es privado, y en SonarCloud eso tiene costo.

## Decisión

- **`eslint-plugin-sonarjs` 4.2.2**, con versión fija, en `server/` y en `client/`.
  - La 3.0.7 no declaraba `ts-api-utils` y exigía instalar `typescript` aparte; la 4.x trae las dos como dependencias propias.
- **Reglas:** las de la configuración `recommended`, pasadas de error a **advertencia**. No bloquean el CI y se ven en su resumen (DEC-098).
  - Las que la configuración trae apagadas siguen apagadas.
- **Apagadas, en los dos proyectos:**
  - `todo-tag`: los pendientes viven en `engineering/debt/TECHNICAL_DEBT.md`.
  - `no-unused-vars` y `unused-import`: duplican `no-unused-vars`, que ya es error.
- **Apagadas en los tests del servidor:** `no-hardcoded-passwords`, `no-hardcoded-ip`, `no-clear-text-protocols` y `super-linear-regex`. Son datos y textos de prueba inventados a propósito.
- **Falsos positivos de seguridad en el código de la aplicación:** se marcan en su línea, con el motivo.
  ```js
  // eslint-disable-next-line <regla> -- <motivo> (DEC-099)
  ```
  Revisados uno por uno:
  - las constantes de eventos de `audit.service.js`;
  - el hash ficticio de `auth.service.js`;
  - `X-Powered-By` en `app.js`, que helmet oculta;
  - `Math.random` en la espera entre reintentos de `transaction.service.js`;
  - las regex de `export.service.js` (dígitos de un importe) y de `session.service.js` (solo lee la variable de entorno);
  - `sha1` en las semillas, que solo genera claves de idempotencia.

## Línea base (2026-10-29)

| | Advertencias de sonarjs | Principales |
| --- | --- | --- |
| Servidor | 75 | `no-nested-conditional` 18, `no-nested-template-literals` 18, `no-inverted-boolean-check` 16, `cognitive-complexity` 15 |
| Cliente | 154 | `no-nested-conditional` 76, `cognitive-complexity` 18, `no-nested-template-literals` 17, `concise-regex` 10, `super-linear-regex` 10 |

## Descartado

- **SonarCloud:** el repositorio es privado, así que tendría costo. Queda como opción si se quiere un tablero con historial.
- **Reglas de sonarjs como errores:** el CI quedaría en rojo por código existente que funciona.
- **Desactivar una regla para todo el código por un falso positivo:** se marca la línea, y la regla sigue protegiendo el código nuevo.

## Qué implica

- Un hallazgo nuevo de sonarjs es una advertencia que se revisa: se corrige, o, si es un falso positivo, se marca en su línea con el motivo.
- No se agregan desactivaciones sin motivo ni para un archivo entero. Una directiva que sobra aparece en el resumen como "directiva eslint-disable sin uso".

## Dónde

`server/eslint.config.js` · `client/eslint.config.mjs` · `eslint-plugin-sonarjs` en `devDependencies` de los dos `package.json` · Marcas en `server/app.js`, `server/src/common/services/{audit,transaction,export,session}.service.js`, `server/src/modules/auth/auth.service.js`, `server/prisma/seed.demo.js`, `server/prisma/seed.volume.js`.
