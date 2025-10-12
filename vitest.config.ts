// RUTA: vitest.config.ts
/**
 * @file vitest.config.ts
 * @description Archivo de configuración para Vitest, el motor de pruebas del proyecto.
 * @version 2.0.0 (Version-Aligned)
 * @author RaZ Podestá - MetaShark Tech
 */

/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    // Manifiesto de Pruebas: Habilita una API global compatible con Jest (describe, it, expect, etc.).
    globals: true,
    // Manifiesto de Pruebas: Simula un entorno de navegador (DOM) con jsdom para las pruebas de componentes.
    environment: 'jsdom',
    // Archivo que se ejecuta una vez antes de cada suite de pruebas para configurar el entorno.
    setupFiles: './tests/setup.ts',

    // --- LA CORRECCIÓN CLAVE #2 ---
    // En las versiones recientes de Vitest, la configuración de la UI es un simple booleano.
    // El puerto se puede configurar vía CLI si es necesario: `vitest --ui --api.port 51204`
    ui: true,

    // Alias de ruta para que coincida con nuestro tsconfig.json, permitiendo
    // el uso de `@/` en las importaciones dentro de los archivos de prueba.
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
