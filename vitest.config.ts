// RUTA: vitest.config.ts
/**
 * @file vitest.config.ts
 * @description Archivo de configuración para Vitest, el motor de pruebas del proyecto.
 *              v2.1.0 (Resilience Hardening): Se hace la ruta a setupFiles explícita
 *              con `path.resolve` para máxima compatibilidad y se soluciona el
 *              error de timeout en la inicialización del entorno.
 * @version 2.1.0
 * @author L.I.A. Legacy
 */

/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // --- CORRECCIÓN DE RESILIENCIA ---
    // Se utiliza path.resolve para crear una ruta absoluta al archivo de setup,
    // eliminando cualquier ambigüedad que pudiera causar el timeout.
    setupFiles: [path.resolve(__dirname, 'tests/setup.ts')],
    ui: true,
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
