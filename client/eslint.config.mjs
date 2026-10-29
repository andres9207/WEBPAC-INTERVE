import { fixupConfigRules } from '@eslint/compat';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import sonarjs from 'eslint-plugin-sonarjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

// Code smells con sonarjs (DEC-099), solo como advertencias: se ven en el
// resumen del CI y no lo bloquean. La configuración recomendada también lista
// reglas apagadas: esas siguen apagadas.
const isOff = (value) => ['off', 0].includes(Array.isArray(value) ? value[0] : value);
const asWarnings = (rules) =>
  Object.fromEntries(
    Object.entries(rules).map(([rule, value]) => [
      rule,
      isOff(value) ? 'off' : Array.isArray(value) ? ['warn', ...value.slice(1)] : 'warn'
    ])
  );

export default [
  ...fixupConfigRules(compat.extends('prettier')),

  {
    plugins: {
      prettier,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y
    },

    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    settings: {
      react: {
        version: 'detect'
      }
    },

    rules: {
      'react/jsx-filename-extension': 'off',
      'no-param-reassign': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'react/no-array-index-key': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'import/order': 'off',
      'no-console': 'off',
      'no-shadow': 'off',
      'import/no-cycle': 'off',
      'import/no-extraneous-dependencies': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/no-autofocus': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-unused-vars': 'off',

      'no-restricted-imports': [
        'error',
        {
          patterns: ['@mui/*/*/*', '!@mui/material/test-utils/*']
        }
      ],

      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'none'
        }
      ],

      'prettier/prettier': 'warn',
    }
  },
  {
    plugins: { sonarjs },
    rules: {
      ...asWarnings(sonarjs.configs.recommended.rules),
      // Los pendientes viven en engineering/debt/TECHNICAL_DEBT.md, no en el código.
      'sonarjs/todo-tag': 'off',
      // Duplican no-unused-vars, que ya es error.
      'sonarjs/no-unused-vars': 'off',
      'sonarjs/unused-import': 'off'
    }
  },
  {
    ignores: ['node_modules/**'],
    files: ['src/**/*.{js,jsx}']
  }
];
