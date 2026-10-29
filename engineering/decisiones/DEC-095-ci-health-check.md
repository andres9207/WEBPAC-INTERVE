# DEC-095 — Integración continua con npm ci y health check público

**Fecha:** 2026-10-29 · **Tipo:** Obligatoria · **ADR:** — (infraestructura; no sale de un ADR del dominio)

Pedido por el usuario el 2026-10-29, como primera fase de DevOps: validar en cada cambio que las pruebas pasan y el código compila, y tener un health check para el servidor de Hostinger, donde corren otras aplicaciones.

## Contexto

- No había CI. Los tests del servidor, el lint y el build del cliente solo se corrían a mano.
- Los `yarn.lock` están en formato Yarn 1, y Volta fija Yarn 4: con Yarn 4, `yarn install` y `yarn test` fallan ("not present in your lockfile"). Migrarlos cambiaba 111 versiones del servidor.
- Hostinger instala con `npm install`. El `package-lock.json` del cliente estaba desactualizado (le faltaba `@mui/x-date-pickers`) y el del servidor estaba en `server/.gitignore`.
- No había forma de preguntarle al servidor si está vivo y llega a la BD.

## Decisión

- **CI en GitHub Actions** (`.github/workflows/ci.yml`), en cada push y PR a `main` y `develop`, y a mano. Dos jobs:
  - Servidor: `npm ci`, `prisma validate` y `npm test`.
  - Cliente: `npm ci`, `npm run lint` (falla con errores, no con avisos) y `npm run build`.
- **Gestor de paquetes: npm.** Se instala con `npm ci` sobre los `package-lock.json` versionados de `client/` y `server/`, igual que en Hostinger. Node, el del campo `volta` de cada `package.json`.
- **Health check:** `GET /api/app/health`, en el área `app`.
  - Es **pública**: no recibe parámetros, no expone datos de usuarios y no ejecuta acciones.
  - Responde **200** con `{ status: "ok", service: "webpac-interve-api", database: "ok" }` si la BD contesta `SELECT 1` en 3 s, y **503** con `status: "error"` y `database: "down"` si no. Atiende también `HEAD`.
  - Lleva `Cache-Control: no-store`. El motivo del fallo va solo al log.
  - `service` identifica esta aplicación entre las del servidor.

## Descartado

- Migrar los lockfiles a Yarn 4: cambiaba 111 versiones del servidor y Hostinger no usa Yarn.
- CI con Yarn 1 clásico: no cambiaba nada, pero no instala igual que Hostinger y contradice Volta.
- Un health que solo dijera "proceso vivo" sin la BD: el proceso puede estar arriba con la BD caída y la aplicación no sirve.
- Devolver versión, uptime o el error de la BD: es información para un atacante y no la necesita el monitor.

## Qué implica

- Una dependencia se agrega con `npm install <paquete>` y se versiona el `package-lock.json` que cambie. Si el lock no coincide con el `package.json`, el CI falla en `npm ci`.
- Un PR a `main` o `develop` debe pasar el CI.
- Un test que lea archivos de fuera de `server/` (migraciones, fichas DEC) funciona en el CI, porque se clona el repositorio entero.
- Detrás del proxy de Hostinger, la URL pública depende de cómo se enrute `/api`. Con la base `interadminpro` del cliente, previsiblemente `https://<dominio>/interadminpro/api/app/health`.

## Dónde

`.github/workflows/ci.yml` · `server/src/modules/app/health/` (`health.routes.js`, `health.controller.js`, `health.service.js`), montada en `server/src/modules/main.routes.js` · `client/package-lock.json`, `server/package-lock.json`, `server/.gitignore` · Tests: `server/test/modules/app/health/`.
