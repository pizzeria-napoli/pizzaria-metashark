// RUTA: eslint.config.mjs
/**
 * @file eslint.config.mjs
 * @description Configuración soberana de ESLint.
 * @version 2.0.0 (Holistic Unused Vars Policy)
 * @author L.I.A. Legacy
 */
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import nextPlugin from '@next/eslint-plugin-next';
import prettierConfig from 'eslint-config-prettier';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { ...pluginReactConfig, settings: { react: { version: 'detect' } } },
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      // --- ALINEAMIENTO SOBERANO ---
      // Se añade 'caughtErrorsIgnorePattern' para ignorar variables de error
      // no utilizadas que comiencen con '_', alineando el linter con nuestras
      // convenciones de código para bloques try/catch resilientes.
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  prettierConfig,
  {
    ignores: ['node_modules/', '.next/', 'out/', 'build/', 'next-env.d.ts'],
  },
];
