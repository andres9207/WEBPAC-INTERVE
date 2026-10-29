# DEC-073 — Modo oscuro, elegido por cada usuario y guardado en `tbl_users`

**Fecha:** 2026-10-22 · **Tipo:** Vigente · **ADR:** [0002](../adr/0002-dashboard.md), [0013](../adr/0013-auditoria-trazabilidad.md)

Decidido por el usuario el 2026-10-22.

## Contexto

El tema solo tenía el esquema claro (`themes/index.jsx`). El oscuro figuraba como deuda desde el tablero (ADR-0002, DEC-052). El usuario pidió un botón de modo oscuro en el encabezado, junto a la campana de notificaciones, y que la elección siga al usuario en cualquier equipo.

## Decisión

- **Dos modos, claro y oscuro**: un botón con sol o luna, entre la campana y el perfil (`Header/ThemeModeSection`), que alterna entre los dos. No hay modo "sistema".
- **Guardado en el usuario**: columna `tbl_users.use_theme_mode` (`light` | `dark`, por defecto `light`, `CHECK ck_users_theme_mode`, migración `0108`). Un usuario existente queda en claro.
- **Endpoint de autoservicio** `PUT /api/auth/update_theme_mode` (`verifyToken`, `updateThemeModeSchema`): el usuario sale de `req.user`. `login` y `verify_token` devuelven `themeMode`, y el cliente lo aplica al iniciar o verificar la sesión. Sin sesión, y al cerrarla, claro.
- **Preferencia visual, no auditoría**: no va a la bitácora (fuera del alcance de ADR-0013) y no toca la autoría. El `UPDATE` asigna `use_update_at = use_update_at`, que evita su `ON UPDATE CURRENT_TIMESTAMP`: cambiar el tema no aparece como una modificación del usuario.
- **El botón cambia el tema de inmediato** y lo guarda en segundo plano. Si el servidor falla, vuelve al tema anterior y avisa.
- **Paleta oscura con las mismas claves** (`themes/palette.jsx`, `colorSchemes.dark`): `.light` es un fondo teñido oscuro, `.dark` el acento claro que va encima, y los grises van de superficie (`grey.50`, `grey.100`) a texto (`grey.900`). Así, todo lo que usa claves de la paleta cambia sin tocar el componente.
- **Color resuelto del tema activo** con `hooks/useSchemePalette`: `theme.palette` es siempre la clara. Lo usan los gráficos de ApexCharts (colores, ejes, borde y tooltip) y las pestañas de estado, que calculan el contraste.

## Descartado

- **Tabla aparte (`tbl_user_preferences`)**, como `tbl_login_attempts` (`0009`), para no tocar `use_update_at`: el usuario prefirió la columna, y la asignación explícita de `use_update_at` resuelve lo mismo.
- **Solo en el navegador (`localStorage`)**: no seguía al usuario entre equipos.
- **Modo "sistema"**: el usuario eligió un botón de dos estados.

## Qué implica

- Ningún color fijo (hex, `white`, `common.white` sobre un `.dark`) en un componente: en oscuro, `.dark` es claro. Un color que se lee fuera del CSS (un gráfico, un contraste calculado) se toma de `useSchemePalette`, no de `theme.palette`.
- Una pantalla nueva se revisa en los dos temas.

## Dónde

- Servidor: `database/migrations/0108_users_theme_mode.sql`, `common/constants/themeMode.constants.js`, `auth.service.js` (`updateThemeMode`, `login`), `app.service.js` (`getSessionInfo`), `auth.routes.js`, `auth.controller.js`, `auth.validation.js`.
- Cliente: `themes/palette.jsx`, `themes/theme/default.js`, `themes/index.jsx`, `themes/custom-shadows.jsx`, `config.js`, `contexts/AuthContext.jsx`, `layout/MainLayout/Header/ThemeModeSection`, `hooks/useSchemePalette.js`, `App.jsx` (avisos), `ActionButton.jsx` (el hover invierte los tonos en vez de usar blanco).
- Tests: `test/modules/auth/auth.service.test.js` (`updateThemeMode`), `auth.controller.test.js` (el sujeto sale de `req.user`), `auth.validation.test.js`.
