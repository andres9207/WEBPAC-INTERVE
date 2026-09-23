// El proyecto es ESM puro ("type": "module" en package.json). Jest necesita
// el flag --experimental-vm-modules de Node para soporte nativo de ESM (ver
// el script "test" en package.json) — sin transform, sin babel.
//
// Los tests viven en server/test/, espejando 1:1 la estructura de server/src/
// (test/modules/auth/auth.service.test.js ↔ src/modules/auth/auth.service.js),
// para no mezclar archivos .test.js con el código de negocio — ver "Tests
// unitarios" en CLAUDE.md.
export default {
  testEnvironment: "node",
  transform: {},
  roots: ["<rootDir>/test"],
  testMatch: ["**/*.test.js"],
  clearMocks: true,
};
