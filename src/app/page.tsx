// RUTA: src/app/[locale]/page.tsx
/**
 * @file page.tsx
 * @description Página de inicio de la aplicación, ahora consciente del idioma.
 */
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { MainLayout } from '@/components/layout/MainLayout';

// La ruta raíz ahora también recibe el 'locale' como parámetro
export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('HomePage');

  return (
    <MainLayout>
      <div className="container mx-auto px-4 text-center">
        <header className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-primary font-serif">
            {t('title')}
          </h1>
          <p className="text-xl mt-4 text-muted-foreground">
            {t('subtitle')}
          </p>
        </header>

        {/*
         * MANIFIESTO DE NAVEGACIÓN I18N:
         * El enlace ahora incluye el 'locale' actual. Esto es crucial para
         * evitar redirecciones del middleware, resultando en una navegación
         * más rápida y una experiencia de usuario más fluida.
         */}
        <Link
          href={`/${locale}/menu`}
          className="bg-primary hover:opacity-90 text-primary-foreground font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 inline-block"
        >
          {t('menuButton')}
        </Link>
      </div>
    </MainLayout>
  );
}
