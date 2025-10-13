// RUTA: src/app/[locale]/page.tsx
/**
 * @file page.tsx
 * @description Página de inicio (Home), alineada con la arquitectura de navegación soberana.
 * @version 6.2.0 (Next.js 15 Signature Alignment): Se refactoriza la firma del componente
 *              para desestructurar `params` directamente, cumpliendo con las nuevas reglas
 *              de renderizado de Next.js 15 y resolviendo el error crítico de runtime.
 * @author L.I.A. Legacy
 */
import { getTranslations } from 'next-intl/server';
import { MainLayout } from '@/components/layout/MainLayout';
import { Link } from '@/navigation';
import { logger } from '@/shared/logging';
import { type Locale } from '@/i18n.config';

interface HomePageProps {
  params: { locale: Locale };
}

export default async function HomePage({
  // --- LA CORRECCIÓN SOBERANA ---
  // Se desestructura el `locale` directamente en la firma del componente.
  params: { locale },
}: HomePageProps) {
  const t = await getTranslations('HomePage');
  logger.info(`[RENDER] Rendering HomePage for locale: ${locale}`);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center flex-grow py-16">
        <h1 className="text-6xl md:text-8xl font-bold text-gradient font-serif mb-4 animate-fade-in">
          {t('title')}
        </h1>
        <p className="text-xl md:text-2xl text-foreground mb-8 fade-in" style={{ animationDelay: '200ms' }}>
          {t('subtitle')}
        </p>
        <Link
          href="/menu"
          className="btn-primary text-xl px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 fade-in"
          style={{ animationDelay: '400ms' }}
        >
          {t('menuButton')}
        </Link>
      </div>
    </MainLayout>
  );
}
