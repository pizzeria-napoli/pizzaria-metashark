// RUTA: src/components/containers/LifecycleTracer.tsx (NUEVO ARCHIVO)
/**
 * @file LifecycleTracer.tsx
 * @description Contenedor de servidor para la observabilidad del ciclo de vida.
 *              Registra y mide automáticamente el tiempo de renderizado de los
 *              componentes de servidor que envuelve, utilizando el logger isomórfico.
 * @version 1.1.0
 * @author L.I.A. Legacy
 */
import { logger } from '@/shared/logging';

interface LifecycleTracerProps {
  children: React.ReactNode;
  componentName: string;
  context?: Record<string, unknown>;
}

export function LifecycleTracer({
  children,
  componentName,
  context,
}: LifecycleTracerProps) {
  const group = logger.startGroup(`[RENDER] ${componentName}`, context);
  const startTime = performance.now();

  // El renderizado del 'children' ocurre aquí implícitamente

  const duration = (performance.now() - startTime).toFixed(2);
  logger.info(`Renderizado completado en ${duration}ms`, { durationMs: parseFloat(duration) }, group.groupId);
  logger.endGroup(group.groupId);

  return <>{children}</>;
}
