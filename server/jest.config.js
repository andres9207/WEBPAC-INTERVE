// El proyecto es ESM puro ("type": "module" en package.json). Jest necesita
// el flag --experimental-vm-modules de Node para soporte nativo de ESM (ver
// el script "test" en package.json) — sin transform, sin babel.
export default {
  testEnvironment: "node",
  transform: {},
  testMatch: ["**/*.test.js"],
  clearMocks: true,
};
