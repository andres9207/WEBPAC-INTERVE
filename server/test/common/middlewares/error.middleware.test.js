import { jest } from "@jest/globals";

const { default: errorMiddleware } = await import(
  "../../../src/common/middlewares/error.middleware.js"
);

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const originalNodeEnv = process.env.NODE_ENV;
const originalConsoleError = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  process.env.NODE_ENV = originalNodeEnv;
  console.error = originalConsoleError;
});

describe("errorMiddleware — mensaje expuesto al cliente", () => {
  it("en producción, un error CON .statusCode (curado por un service) expone su mensaje tal cual", () => {
    process.env.NODE_ENV = "production";
    const err = Object.assign(new Error("No se puede eliminar el perfil: tiene usuarios asociados."), {
      statusCode: 400,
    });
    const res = buildRes();

    errorMiddleware(err, {}, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "No se puede eliminar el perfil: tiene usuarios asociados.",
      })
    );
  });

  it("en producción, un error SIN .statusCode/.status (excepción no clasificada) nunca expone err.message", () => {
    process.env.NODE_ENV = "production";
    const err = new Error("ENOENT: no such file or directory, open '/var/www/secreto.env'");
    const res = buildRes();

    errorMiddleware(err, {}, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Ha ocurrido un error inesperado. Contacta a sistemas.",
    });
  });

  it("en desarrollo, un error SIN .statusCode/.status sí muestra el mensaje real (conveniencia de depuración)", () => {
    process.env.NODE_ENV = "development";
    const err = new Error("boom interno");
    const res = buildRes();

    errorMiddleware(err, {}, res, jest.fn());

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "boom interno", stack: expect.any(String) })
    );
  });

  it("nunca incluye el stack trace en producción, tenga o no .statusCode", () => {
    process.env.NODE_ENV = "production";
    const err = Object.assign(new Error("algo curado"), { statusCode: 403 });
    const res = buildRes();

    errorMiddleware(err, {}, res, jest.fn());

    const body = res.json.mock.calls[0][0];
    expect(body).not.toHaveProperty("stack");
  });
});

describe("errorMiddleware — errores de Prisma", () => {
  const prismaError = (code) => Object.assign(new Error(`Invalid prisma call ${code}`), { code });

  it.each([
    ["P2002", 409],
    ["P2003", 400],
    ["P2025", 404],
    ["P2024", 503],
    ["P1001", 503],
  ])("%s responde %i con un mensaje propio, sin el detalle del driver", (code, status) => {
    const res = buildRes();

    errorMiddleware(prismaError(code), {}, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(status);
    const body = res.json.mock.calls[0][0];
    expect(body.success).toBe(false);
    expect(body.message).not.toContain("Invalid prisma call");
  });

  it("un código de Prisma no mapeado responde 500 genérico", () => {
    const res = buildRes();

    errorMiddleware(prismaError("P2999"), {}, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("PrismaClientInitializationError (BD caída al conectar) responde 503", () => {
    const err = Object.assign(new Error("Can't reach database server"), { name: "PrismaClientInitializationError" });
    const res = buildRes();

    errorMiddleware(err, {}, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(503);
  });

  it("un .code que no es de MySQL ni de Prisma no se trata como error de base de datos", () => {
    process.env.NODE_ENV = "production";
    const err = Object.assign(new Error("Archivo demasiado grande"), { code: "LIMIT_FILE_SIZE", statusCode: 413 });
    const res = buildRes();

    errorMiddleware(err, {}, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(413);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Archivo demasiado grande" }));
  });
});

describe("errorMiddleware — concurrencia (ADR-0027)", () => {
  // Forma real verificada contra MySQL: un SELECT … FOR UPDATE que agota la
  // espera llega por el adapter como P2010 con el 1205 en meta.
  const adapterError = (code, driverCode) =>
    Object.assign(new Error(`Raw query failed. Code: \`${driverCode}\``), {
      code,
      meta: { driverAdapterError: { cause: { kind: "mysql", code: driverCode } } },
    });

  it.each([
    ["espera de bloqueo agotada (adapter, P2010 + 1205)", adapterError("P2010", 1205), 503],
    ["espera de bloqueo agotada (mysql2)", Object.assign(new Error("Lock wait"), { code: "ER_LOCK_WAIT_TIMEOUT" }), 503],
    ["interbloqueo (adapter)", adapterError("P2010", 1213), 409],
    ["interbloqueo (mysql2)", Object.assign(new Error("Deadlock"), { code: "ER_LOCK_DEADLOCK" }), 409],
  ])("%s no cae en el 500 genérico", (_name, err, status) => {
    const res = buildRes();

    errorMiddleware(err, {}, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(status);
    expect(res.json.mock.calls[0][0].message).not.toMatch(/Raw query|Lock wait|Deadlock/);
  });
});
