import { isOriginAllowed } from "../../../src/common/configs/cors.config.js";

describe("isOriginAllowed", () => {
  it("permite peticiones sin header Origin (no-navegador)", () => {
    expect(isOriginAllowed(undefined)).toBe(true);
  });

  it("permite los orígenes de la lista, con cualquier puerto en localhost/127.0.0.1", () => {
    expect(isOriginAllowed("http://localhost:5173")).toBe(true);
    expect(isOriginAllowed("http://127.0.0.1:4000")).toBe(true);
    expect(isOriginAllowed("https://pavastecnologia.com")).toBe(true);
    expect(isOriginAllowed("https://www.pavastecnologia.com")).toBe(true);
  });

  it("rechaza un origen que solo comparte prefijo con uno permitido (bypass por subdominio)", () => {
    expect(isOriginAllowed("https://pavastecnologia.com.evil.com")).toBe(false);
    expect(isOriginAllowed("http://localhost.evil.com")).toBe(false);
    expect(isOriginAllowed("https://evil-pavastecnologia.com")).toBe(false);
  });

  it("rechaza un origen mal formado", () => {
    expect(isOriginAllowed("no-es-una-url")).toBe(false);
  });
});
