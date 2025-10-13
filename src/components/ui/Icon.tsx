// RUTA: src/components/ui/Icon.tsx
/**
 * @file Icon.tsx
 * @description Componente de UI genérico y performante para renderizar iconos de Lucide.
 *              v1.2.0 (Dynamic Import Fix): Corrige un error de tipado al invocar
 *              correctamente la función de importación dinámica devuelta por el manifiesto
 *              de 'lucide-react', satisfaciendo la firma esperada por 'next/dynamic'.
 * @version 1.2.0
 * @author L.I.A. Legacy
 */
'use client';

import dynamic from 'next/dynamic';
import { type LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { LucideIconName } from '@/shared/lib/config/lucide-icon-names';
import { logger } from '@/shared/logging';
import { pascalToKebabCase } from '@/shared/lib/utils';

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: LucideIconName;
}

const fallback = <div style={{ background: '#ddd', width: 24, height: 24 }} />;

export function Icon({ name, ...props }: IconProps) {
  const iconKey = pascalToKebabCase(name) as keyof typeof dynamicIconImports;

  const LucideIcon = dynamic(() => {
    const importFunction = dynamicIconImports[iconKey];

    if (!importFunction) {
      logger.error(`[IconComponent] Icono no encontrado en el manifiesto: "${name}" (kebab: "${iconKey}")`);
      return Promise.resolve(() => fallback);
    }

    // --- LA CORRECCIÓN CLAVE ---
    // El objeto `dynamicIconImports` contiene funciones que, al ser llamadas,
    // devuelven la promesa de importación. Debemos invocarla aquí.
    return importFunction();

  }, {
    ssr: false,
    loading: () => fallback,
  });

  return <LucideIcon {...props} />;
}
