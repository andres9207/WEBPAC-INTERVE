# DEC-098 — Resumen con gráficos en cada ejecución del CI

**Fecha:** 2026-10-29 · **Tipo:** Vigente · **ADR:** — (infraestructura, sigue a [DEC-095](DEC-095-ci-health-check.md) y [DEC-097](DEC-097-linter-servidor.md))

Pedido por el usuario el 2026-10-29: ver en un gráfico cuántas pruebas pasaron y qué advertencias hay, sin leer el log.

## Decisión

- Cada job del CI publica un **resumen en la página de la ejecución** de GitHub Actions (`$GITHUB_STEP_SUMMARY`), con `.github/scripts/ci-summary.mjs`. El script es Node puro, sin dependencias.
- **Servidor:**
  - lint (archivos, errores, advertencias y un pie por regla);
  - tests: pie de pasaron, fallaron y omitidos, tabla con totales y duración, lista de los tests fallidos (hasta 20) y las 5 suites más lentas.
- **Cliente:**
  - lint, igual que en el servidor;
  - build: archivos JS y CSS, tamaño y tamaño comprimido, y los 8 más grandes.
- **Fuentes de datos:** los JSON que ya escriben Jest (`--json --outputFile`) y ESLint (`-f json -o`), en `$RUNNER_TEMP`, y los archivos de `client/dist/assets`.
- **El lint corre una sola vez, en JSON.** Si falla, se repite con `--quiet` en el formato legible, para que el log muestre los errores.
- **El paso Resumen corre aunque un paso anterior haya fallado** (`!cancelled()`). Si falta un reporte, el resumen dice qué falta.
- **Los gráficos son Mermaid** (`pie`), con colores fijos: verde, rojo y gris para los tests. Se omiten las porciones en cero. Los números están también en tablas.

## Descartado

- **Servicios externos (SonarCloud, Codecov):** para este pedido alcanza con lo que ya entregan Jest y ESLint. SonarCloud queda como opción si se quiere historial.
- **Correr el lint dos veces siempre** (una legible y otra en JSON): duplicaba el tiempo del lint del cliente.

## Pendiente

- Diferencia contra `develop` (por ejemplo, "este PR agrega 6 tests") y cobertura (`jest --coverage`): no se pidieron todavía.
- Code smells con `eslint-plugin-sonarjs` (DEC-097, "Descartado"): cuando se sumen, aparecen solos en la sección de lint.

## Dónde

`.github/scripts/ci-summary.mjs` · `.github/workflows/ci.yml` (pasos Lint, Tests y Resumen de cada job).
