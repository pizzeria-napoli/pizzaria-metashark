// RUTA: tests/navigation-client.test.ts (NUEVO ARCHIVO)
/**
 * @file navigation-client.test.ts
 * @description Prueba de validación soberana para el módulo de navegación de CLIENTE.
 *              Verifica que `src/navigation.client.ts` exporta correctamente
 *              `usePathname` y `useRouter`.
 * @version 1.0.0
 * @author L.I.A. Legacy
 */
import { describe, it, expect } from 'vitest';

// Importamos el módulo exclusivo para cliente.
import * as ClientNavigation from '@/navigation.client';

describe('Validación de Arquitectura: Módulo de Navegación de Cliente (`src/navigation.client.ts`)', () => {
  it('debe exportar únicamente hooks de navegación del lado del cliente', () => {
    console.log('\n--- Validando Módulo de Navegación de Cliente ---');
    const exportedKeys = Object.keys(ClientNavigation);
    console.log('[ANÁLISIS] Miembros exportados por `@/navigation.client`:', exportedKeys);

    // Verificación Positiva: ¿Contiene lo que debería?
    expect(exportedKeys).toContain('usePathname');
    expect(exportedKeys).toContain('useRouter');
    console.log('✅ Verificación Positiva: `usePathname` y `useRouter` están presentes.');

    // Verificación Negativa: ¿Está libre de utilidades isomórficas?
    expect(exportedKeys).not.toContain('Link');
    expect(exportedKeys).not.toContain('redirect');
    console.log('✅ Verificación Negativa: Utilitidades isomórficas NO están presentes (¡Correcto!).');

    // Verificación de Calidad
    expect(ClientNavigation.usePathname).toBeDefined();
    expect(typeof ClientNavigation.usePathname).toBe('function');
    expect(ClientNavigation.useRouter).toBeDefined();
    expect(typeof ClientNavigation.useRouter).toBe('function');
    console.log('✅ Verificación de Calidad: Los hooks exportados son funciones definidas.');
  });
});
