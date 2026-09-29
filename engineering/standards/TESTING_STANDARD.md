# Estándar de tests

## Servidor — CONFIRMADO

Jest en ESM puro (`--experimental-vm-modules`). `cd server && yarn test`. Hoy: 24 suites, 200 tests. Detalle de configuración en [`server/CLAUDE.md`](../../server/CLAUDE.md), "Tests unitarios".

### Reglas

1. **Carpeta espejo:** `server/test/` replica `server/src/`. El test de `src/modules/x/x.service.js` es `test/modules/x/x.service.test.js`. Nunca un `.test.js` dentro de `src/`.
2. **Unitarios con mocks**, sin BD real. Se mockea con `jest.unstable_mockModule(...)` **antes** del `await import(...)` del archivo bajo prueba (`jest.mock` no funciona en ESM).
3. **Transacciones:** el mock de Prisma incluye `...transactionRawMocks()` de `test/helpers/transaction.mock.js`, y el mock de `$transaction` pasa una copia del mock (`fn({ ...prismaMock })`), no el mismo objeto.
4. **Mínimo por endpoint nuevo:** caso feliz, error de negocio y el caso de seguridad que aplique (p. ej. "ignora el id ajeno del body").
5. **Mínimo por CRUD:** lo que lista [`CRUD_STANDARD`](CRUD_STANDARD.md), paso 6.
6. **Mínimo por workflow:** lo que lista [`WORKFLOW_STANDARD`](WORKFLOW_STANDARD.md), "Verificación".
7. **Un bug se corrige con un test que lo reproduce primero.**
8. **Nunca** se desactiva, se salta ni se debilita un test para que pase. Si el test está mal, se corrige explicando por qué.
9. **Test de arquitectura:** `test/common/services/transaction.service.test.js` falla si `src/` importa mysql2, usa `executeQuery`/`getConnection` o llama a `prisma.$transaction` fuera de la utilidad. No se toca para dejar pasar una excepción.

### Lo que los unitarios no cubren

La concurrencia real, los códigos que devuelve el adapter de MySQL y las migraciones se verifican **en vivo** contra la BD de desarrollo, y el reporte dice cómo se probó. Supertest está instalado para tests de integración futuros; hoy no se usa.

## Cliente — NO HAY

No hay runner de tests configurado. La verificación es `yarn lint`, `yarn build` y prueba manual. Configurar un runner está en [deuda](../debt/TECHNICAL_DEBT.md).
