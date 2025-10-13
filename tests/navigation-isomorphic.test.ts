// RUTA: tests/navigation-isomorphic.test.ts (NUEVO ARCHIVO)
/**
 * @file navigation-isomorphic.test.ts
 * @description Prueba de validación soberana para el módulo de navegación ISOMÓRFICO.
 *              Verifica que `src/navigation.ts` exporta correctamente `Link` y `redirect`,
 *              y crucialmente, que NO exporta hooks de cliente.
 * @version 1.0.0
 * @author L.I.A. Legacy
 */
import { describe, it, expect } from 'vitest';

// Importamos el módulo isomórfico que es seguro para el servidor.
import * as IsomorphicNavigation from '@/navigation';

describe('Validación de Arquitectura: Módulo de Navegación Isomórfico (`src/navigation.ts`)', () => {
  it('debe exportar únicamente utilidades seguras para el servidor y el cliente', () => {
    console.log('\n--- Validando Módulo de Navegación Isomórfico ---');
    const exportedKeys = Object.keys(IsomorphicNavigation);
    console.log('[ANÁLISIS] Miembros exportados por `@/navigation`:', exportedKeys);

    // Verificación Positiva: ¿Contiene lo que debería?
    expect(exportedKeys).toContain('Link');
    expect(exportedKeys).toContain('redirect');
    console.log('✅ Verificación Positiva: `Link` y `redirect` están presentes.');

    // Verificación Negativa: ¿Está libre de contaminación de cliente?
    expect(exportedKeys).not.toContain('usePathname');
    expect(exportedKeys).not.toContain('useRouter');
    console.log('✅ Verificación Negativa: Hooks de cliente NO están presentes (¡Correcto!).');

    // Verificación de Calidad
    expect(IsomorphicNavigation.Link).toBeDefined();
    expect(IsomorphicNavigation.redirect).toBeDefined();
    console.log('✅ Verificación de Calidad: Los miembros exportados no son undefined.');
  });
});
