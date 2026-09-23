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
