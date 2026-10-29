import { jest } from "@jest/globals";

// Health check público (DEC-095): informa si el proceso y la BD responden, con
// el nombre de esta aplicación, sin detalles del fallo para el cliente.

const prismaMock = { $queryRaw: jest.fn() };

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { getHealth, SERVICE_NAME, DB_TIMEOUT_MS } = await import("../../../../src/modules/app/health/health.service.js");

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.useRealTimers();
  console.error.mockRestore();
});

describe("health.service — getHealth", () => {
  it("con la BD respondiendo, informa ok y el nombre de la aplicación", async () => {
    prismaMock.$queryRaw.mockResolvedValue([{ 1: 1 }]);

    await expect(getHealth()).resolves.toEqual({ status: "ok", service: SERVICE_NAME, database: "ok" });
    expect(prismaMock.$queryRaw).toHaveBeenCalledTimes(1);
  });

  it("con la BD caída, informa el fallo sin lanzar y sin el mensaje de la BD", async () => {
    prismaMock.$queryRaw.mockRejectedValue(new Error("Access denied for user 'root'@'10.0.0.5'"));

    const result = await getHealth();

    expect(result).toEqual({ status: "error", service: SERVICE_NAME, database: "down" });
    expect(JSON.stringify(result)).not.toContain("root");
    expect(console.error).toHaveBeenCalled();
  });

  it("con la BD colgada, informa el fallo al agotar el tope", async () => {
    jest.useFakeTimers();
    prismaMock.$queryRaw.mockReturnValue(new Promise(() => {}));

    const pending = getHealth();
    jest.advanceTimersByTime(DB_TIMEOUT_MS);

    await expect(pending).resolves.toEqual({ status: "error", service: SERVICE_NAME, database: "down" });
  });
});
