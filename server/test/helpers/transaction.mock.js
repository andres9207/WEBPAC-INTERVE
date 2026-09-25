import { jest } from "@jest/globals";

// Métodos crudos que usa common/services/transaction.service.js dentro de
// cada transacción, para agregarlos al mock de prisma de un test:
//   - $executeRawUnsafe: el SET de innodb_lock_wait_timeout.
//   - $queryRaw: el SELECT … FOR UPDATE de withLockedTransaction. Por
//     defecto "bloquea" todos los ids pedidos (como si existieran). Los ids
//     llegan en el fragmento Prisma.join, el único con valores.
export const lockedIdsOf = (values) => values.find((v) => Array.isArray(v?.values) && v.values.length > 0)?.values ?? [];

export const transactionRawMocks = () => ({
  $executeRawUnsafe: jest.fn(),
  $queryRaw: jest.fn(async (_strings, ...values) => lockedIdsOf(values).map((id) => ({ id }))),
});
