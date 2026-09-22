import { jest } from "@jest/globals";

process.env.JWT_SECRET = "test-secret";

const mockExecuteQuery = jest.fn();

jest.unstable_mockModule("../../../src/common/configs/db.config.js", () => ({
  getConnection: jest.fn().mockResolvedValue({}),
  releaseConnection: jest.fn(),
  executeQuery: mockExecuteQuery,
}));

const { verifyToken } = await import("../../../src/common/middlewares/authjwt.middleware.js");
const { default: jwt } = await import("jsonwebtoken");

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// jwt.verify dentro del middleware usa callback (no promesa), así que
// verifyToken(...) puede "terminar" antes de que next()/res.json() se
// disparen realmente. Se espera explícitamente a que uno de los dos ocurra.
const runMiddleware = (req) =>
  new Promise((resolve) => {
    const res = buildRes();
    const next = jest.fn(() => resolve({ res, next, calledNext: true }));
    res.json.mockImplementation((body) => {
      resolve({ res, next, calledNext: false, body });
      return res;
    });

    verifyToken(req, res, next);
  });

const validPayload = { useId: 1, email: "admin@test.com" };
const signToken = (payload = validPayload, opts = {}) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h", ...opts });

describe("verifyToken middleware", () => {
  it("responde 401 si no hay token en cookie ni en el header Authorization", async () => {
    const { res, calledNext } = await runMiddleware({ cookies: {}, headers: {} });

    expect(calledNext).toBe(false);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("acepta el token desde el header Authorization si no hay cookie", async () => {
    mockExecuteQuery.mockResolvedValue([{ use_id: 1 }]);
    const token = signToken();
    const req = { cookies: {}, headers: { authorization: `Bearer ${token}` } };

    const { calledNext } = await runMiddleware(req);

    expect(calledNext).toBe(true);
    expect(req.user).toMatchObject(validPayload);
  });

  it("responde 401 si el token expiró", async () => {
    const token = jwt.sign(validPayload, process.env.JWT_SECRET, { expiresIn: -10 });
    const { res, calledNext } = await runMiddleware({ cookies: { token }, headers: {} });

    expect(calledNext).toBe(false);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "El token ha expirado" });
  });

  it("responde 401 si el token tiene una firma inválida", async () => {
    const token = jwt.sign(validPayload, "otro-secreto-distinto");
    const { res, calledNext } = await runMiddleware({ cookies: { token }, headers: {} });

    expect(calledNext).toBe(false);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token inválido" });
  });

  it("responde 401 si el usuario no existe o está inactivo en BD (sta_id != 1)", async () => {
    mockExecuteQuery.mockResolvedValue([]);
    const token = signToken();
    const { res, calledNext } = await runMiddleware({ cookies: { token }, headers: {} });

    expect(calledNext).toBe(false);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("llama a next() y fija req.user si el token y el usuario son válidos", async () => {
    mockExecuteQuery.mockResolvedValue([{ use_id: 1 }]);
    const token = signToken();
    const req = { cookies: { token }, headers: {} };

    const { calledNext } = await runMiddleware(req);

    expect(calledNext).toBe(true);
    expect(req.user).toMatchObject(validPayload);
  });
});
