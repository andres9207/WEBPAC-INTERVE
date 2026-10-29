// ESLint del servidor (DEC-097): las reglas recomendadas, sin reglas de
// estilo ni Prettier, para no reformatear el código existente. Los errores
// bloquean el CI (.github/workflows/ci.yml).
//
// Code smells con sonarjs (DEC-099), solo como advertencias: se ven en el
// resumen del CI y no lo bloquean.
import js from "@eslint/js";
import globals from "globals";
import sonarjs from "eslint-plugin-sonarjs";

// La configuración recomendada también lista reglas apagadas: esas siguen
// apagadas; las demás pasan de error a advertencia.
const isOff = (value) => ["off", 0].includes(Array.isArray(value) ? value[0] : value);
const asWarnings = (rules) =>
  Object.fromEntries(
    Object.entries(rules).map(([rule, value]) => [
      rule,
      isOff(value) ? "off" : Array.isArray(value) ? ["warn", ...value.slice(1)] : "warn",
    ]),
  );

export default [
  { ignores: ["logs/**", "coverage/**", "src/uploads/**"] },
  js.configs.recommended,
  {
    plugins: { sonarjs },
    rules: {
      ...asWarnings(sonarjs.configs.recommended.rules),
      // Los pendientes viven en engineering/debt/TECHNICAL_DEBT.md, no en el código.
      "sonarjs/todo-tag": "off",
      // Duplican no-unused-vars, que ya es error.
      "sonarjs/no-unused-vars": "off",
      "sonarjs/unused-import": "off",
    },
  },
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
    rules: {
      // Datos de prueba: contraseñas, IP y orígenes http:// inventados a propósito.
      "sonarjs/no-hardcoded-passwords": "off",
      "sonarjs/no-hardcoded-ip": "off",
      "sonarjs/no-clear-text-protocols": "off",
      // Expresiones sobre textos de prueba, nunca sobre datos de un usuario.
      "sonarjs/super-linear-regex": "off",
    },
  },
];
