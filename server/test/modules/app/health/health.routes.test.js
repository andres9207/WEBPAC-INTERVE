import { jest } from "@jest/globals";
import express from "express";
import request from "supertest";

// La ruta es pública a propósito (DEC-095): responde sin cookie de sesión, 200
// o 503 según la BD, sin caché y también a HEAD.

const healthServiceMock = { getHealth: jest.fn() };

jest.unstable_mockModule("../../../../src/modules/app/health/health.service.js", () => healthServiceMock);

const { default: healthRoutes } = await import("../../../../src/modules/app/health/health.routes.js");

const app = express();
app.use("/api/app/health", healthRoutes);

const OK = { status: "ok", service: "webpac-interve-api", database: "ok" };
const DOWN = { status: "error", service: "webpac-interve-api", database: "down" };

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GET /api/app/health", () => {
  it("responde 200 sin sesión cuando la BD responde", async () => {
    healthServiceMock.getHealth.mockResolvedValue(OK);

    const res = await request(app).get("/api/app/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(OK);
    expect(res.headers["cache-control"]).toBe("no-store");
  });

  it("responde 503 cuando la BD no responde", async () => {
    healthServiceMock.getHealth.mockResolvedValue(DOWN);

    const res = await request(app).get("/api/app/health");

    expect(res.status).toBe(503);
    expect(res.body).toEqual(DOWN);
  });

  it("atiende HEAD con el mismo código y sin cuerpo", async () => {
    healthServiceMock.getHealth.mockResolvedValue(DOWN);

    const res = await request(app).head("/api/app/health");

    expect(res.status).toBe(503);
    expect(res.body).toEqual({});
  });
});
