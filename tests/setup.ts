// RUTA: tests/setup.ts
/**
 * @file setup.ts
 * @description Archivo de configuración global para Vitest.
 *              Se ejecuta antes de cada archivo de prueba.
 */
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';

// Extiende el `expect` de Vitest con los matchers de jest-dom.
// Esto nos permite usar afirmaciones como .toBeInTheDocument()
expect.extend(matchers);

// Ejecuta una limpieza (cleanup) después de cada prueba.
// Por ejemplo: desmonta los componentes que fueron renderizados.
afterEach(() => {
  cleanup();
});
