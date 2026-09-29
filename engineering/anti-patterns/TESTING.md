# Anti-patrones de tests

- **Desactivar, saltar (`.skip`) o debilitar un test para que pase.** Si el test está mal, se corrige y se explica por qué.
- **Quitar una validación para que un test pase.**
- **Tocar el test de arquitectura** (`test/common/services/transaction.service.test.js`) para permitir mysql2 o `prisma.$transaction`.
- **Tests colocados dentro de `src/`.** Van en `server/test/`, espejando la estructura.
- **`jest.mock()` en ESM.** No hay hoisting: se usa `jest.unstable_mockModule` antes del `import` dinámico.
- **Pasar el mismo objeto de mock como `tx`.** `writeAudit` rechaza el cliente global; el mock de `$transaction` pasa una copia (`fn({ ...prismaMock })`).
- **Olvidar `transactionRawMocks()`** en un service que abre transacciones: el test no ejercita el bloqueo.
- **Tests que solo recorren el código** sin afirmar el comportamiento: que se llamó a `update` no prueba que no se pueda editar un registro ajeno.
- **Dar por verificada la concurrencia con unitarios.** Los códigos que devuelve el adapter ante un interbloqueo real se descubrieron probando contra MySQL ([`SECURITY.md`](SECURITY.md), "Interbloqueos y esperas de bloqueo").
- **Reportar "tests verdes" sin haberlos corrido.**
