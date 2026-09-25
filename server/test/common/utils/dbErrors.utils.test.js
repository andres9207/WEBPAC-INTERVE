import { realDeadlock, realLockWaitTimeout } from "../../helpers/dbErrors.fixtures.js";

const { driverErrorCode, isDeadlock, isLockWaitTimeout } = await import("../../../src/common/utils/dbErrors.utils.js");

const REAL_DEADLOCK = realDeadlock();
const REAL_LOCK_WAIT_TIMEOUT = realLockWaitTimeout();

describe("dbErrors.utils", () => {
  it("reconoce el interbloqueo real del adapter (P2010 + TransactionWriteConflict / 1213)", () => {
    expect(isDeadlock(REAL_DEADLOCK)).toBe(true);
    expect(isLockWaitTimeout(REAL_DEADLOCK)).toBe(false);
    expect(driverErrorCode(REAL_DEADLOCK)).toBe("1213");
  });

  it("reconoce la espera agotada real del adapter (P2010 + 1205) y no la confunde con interbloqueo", () => {
    expect(isLockWaitTimeout(REAL_LOCK_WAIT_TIMEOUT)).toBe(true);
    expect(isDeadlock(REAL_LOCK_WAIT_TIMEOUT)).toBe(false);
  });

  it("reconoce también P2034 de Prisma y los códigos directos del driver", () => {
    expect(isDeadlock({ code: "P2034" })).toBe(true);
    expect(isDeadlock({ code: "ER_LOCK_DEADLOCK" })).toBe(true);
    expect(isLockWaitTimeout({ code: "ER_LOCK_WAIT_TIMEOUT" })).toBe(true);
  });

  it("otros errores de base de datos no son de concurrencia", () => {
    const duplicate = { code: "P2002" };
    const otherRaw = { code: "P2010", meta: { driverAdapterError: { cause: { kind: "mysql", code: 1064, originalCode: "1064" } } } };
    for (const err of [duplicate, otherRaw, new Error("x"), null]) {
      expect(isDeadlock(err)).toBe(false);
      expect(isLockWaitTimeout(err)).toBe(false);
    }
  });
});
