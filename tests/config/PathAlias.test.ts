// RUTA: tests/config/PathAlias.test.ts
/**
 * @file PathAlias.test.ts
 * @description Prueba de diagnóstico para verificar la correcta resolución de alias de ruta.
 *              Valida que la configuración en `tsconfig.json` y `vitest.config.ts` funciona como se espera.
 * @version 1.0.0
 * @author L.I.A. Legacy
 */
import { describe, it, expect } from 'vitest';

// Se intenta importar un módulo conocido usando el alias '@'.
// Si esto falla, el problema es fundamental en la configuración de rutas.
import { logger } from '@/shared/logging';

describe('Diagnóstico de Configuración: Resolución de Alias de Ruta', () => {
  it('debe resolver correctamente el alias "@/*" a "src/*"', () => {
    // MENSAJE DE DIAGNÓSTICO
    console.log('--- Iniciando Prueba de Resolución de Alias ---');

    // VERIFICACIÓN
    // La prueba más simple es verificar que el módulo importado no sea `undefined`.
    // Si la importación falla, la prueba crasheará antes de llegar aquí.
    expect(logger).toBeDefined();
    expect(typeof logger.info).toBe('function');

    // CONCLUSIÓN VERBOSA
    console.log('✅ ÉXITO: El alias "@" fue resuelto correctamente a la carpeta "src".');
    console.log('   Esto confirma que `tsconfig.json` y `vitest.config.ts` están sincronizados.');
  });
});
