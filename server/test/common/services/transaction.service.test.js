import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../helpers/transaction.mock.js";

const prismaMock = {
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { buildLockPlan, withTransaction, withLockedTransaction, ISOLATION_LEVEL, LOCK_WAIT_TIMEOUT_SECONDS } =
  await import("../../../src/common/services/transaction.service.js");

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
});

describe("buildLockPlan — orden del protocolo", () => {
  it("ordena las entidades por LOCK_ORDER y los ids ascendentes, sin importar cómo los pida el service", () => {
    const plan = buildLockPlan({ USUARIO: [9, 2, 9], PERFIL: "4", DOCUMENTO: [7, 3] });

    expect(plan.map(({ entity, ids }) => [entity, ids])).toEqual([
      ["DOCUMENTO", [3, 7]],
      ["PERFIL", [4]],
      ["USUARIO", [2, 9]],
    ]);
  });

  it("rechaza entidades fuera del protocolo o sin tabla registrada", () => {
    expect(() => buildLockPlan({ OBRA: [1] })).toThrow(/fuera de LOCK_ORDER/);
    // CONTRATO tiene lugar en el orden, pero su tabla aún no existe.
    expect(() => buildLockPlan({ CONTRATO: [1] })).toThrow(/sin tabla registrada/);
  });

  it("rechaza ids inválidos y un bloqueo vacío", () => {
    expect(() => buildLockPlan({ USUARIO: [0] })).toThrow(/ids inválidos/);
    expect(() => buildLockPlan({ USUARIO: ["abc"] })).toThrow(/ids inválidos/);
    expect(() => buildLockPlan({ USUARIO: [] })).toThrow(/ids inválidos/);
    expect(() => buildLockPlan({})).toThrow(/sin nada que bloquear/);
  });
});

describe("withTransaction", () => {
  it("declara REPEATABLE READ y fija la espera de bloqueo antes de ejecutar la operación", async () => {
    const fn = jest.fn().mockResolvedValue("ok");

    await expect(withTransaction(fn)).resolves.toBe("ok");

    expect(prismaMock.$transaction).toHaveBeenCalledWith(expect.any(Function), { isolationLevel: ISOLATION_LEVEL });
    expect(ISOLATION_LEVEL).toBe("RepeatableRead");
    expect(prismaMock.$executeRawUnsafe).toHaveBeenCalledWith(
      `SET SESSION innodb_lock_wait_timeout = ${LOCK_WAIT_TIMEOUT_SECONDS}`
    );
    expect(prismaMock.$executeRawUnsafe.mock.invocationCallOrder[0]).toBeLessThan(fn.mock.invocationCallOrder[0]);
  });
});

describe("withLockedTransaction", () => {
  it("bloquea con FOR UPDATE, en orden, antes de entregar el tx a la operación", async () => {
    const fn = jest.fn().mockResolvedValue("ok");

    await withLockedTransaction({ USUARIO: 5, PERFIL: 2 }, fn);

    const sqls = prismaMock.$queryRaw.mock.calls.map(([strings, ...values]) =>
      strings.map((s, i) => s + (values[i]?.strings ? values[i].strings.join("") : "")).join("")
    );
    expect(sqls).toHaveLength(2);
    expect(sqls[0]).toMatch(/FROM tbl_profiles[\s\S]*FOR UPDATE/);
    expect(sqls[1]).toMatch(/FROM tbl_users[\s\S]*FOR UPDATE/);
    const lastLock = prismaMock.$queryRaw.mock.invocationCallOrder.at(-1);
    expect(fn.mock.invocationCallOrder[0]).toBeGreaterThan(lastLock);
  });

  it("entrega a la operación los ids que existían y quedaron bloqueados", async () => {
    prismaMock.$queryRaw.mockResolvedValueOnce([{ id: 3 }]);
    const fn = jest.fn();

    await withLockedTransaction({ DOCUMENTO: [3, 8] }, fn);

    expect(fn).toHaveBeenCalledWith(expect.any(Object), { DOCUMENTO: [3] });
  });

  it("un plan inválido falla antes de abrir la transacción", () => {
    expect(() => withLockedTransaction({ CONTRATO: 1 }, jest.fn())).toThrow(/sin tabla registrada/);
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });
});
