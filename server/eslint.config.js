// ESLint del servidor (DEC-097): las reglas recomendadas, sin reglas de
// estilo ni Prettier, para no reformatear el código existente. Los errores
// bloquean el CI (.github/workflows/ci.yml).
import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["logs/**", "coverage/**", "src/uploads/**"] },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: { ...globals.node },
    },
    rules: {
      // El código descarta a propósito con `_` delante (`{ ctr_version: _version, ...rest }`,
      // argumentos que una firma exige) y con el resto (`{ wks_id, ...stage }`).
      "no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
    },
  },
  // PM2 carga ecosystem.config.cjs con require().
  {
    files: ["**/*.cjs"],
    languageOptions: { sourceType: "commonjs" },
  },
  {
    files: ["test/**/*.js"],
    languageOptions: { globals: { ...globals.jest } },
  },
];
