// RUTA: src/app/[locale]/(status)/not-found.tsx (NIVELADO)
/**
 * @file not-found.tsx
 * @description Página 404 personalizada y localizada.
 *              Se activa automáticamente por el App Router de Next.js.
 * @version 2.0.0 (Sovereign i18n Aligned): Refactorizado para consumir traducciones
 *              desde la SSoT de contenido, eliminando texto hardcodeado.
 * @author L.I.A. Legacy
 */
import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation'; // Usamos nuestro Link abstraído
import { Icon } from '@/components/ui/Icon';

export default async function NotFoundPage() {
  // Ahora se utiliza `getTranslations` para obtener las traducciones del namespace 'NotFoundPage'.
  const t = await getTranslations('NotFoundPage');

  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in">
      <Icon name="Pizza" className="w-24 h-24 text-primary" strokeWidth={1.5} />
      <h1 className="text-6xl font-bold font-serif text-gradient">404</h1>
      {/* Todo el texto ahora proviene de nuestro sistema i18n. */}
      <h2 className="text-2xl text-foreground/80">{t('title')}</h2>
      <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
      <Link href="/" className="btn-primary text-lg px-6 py-3 mt-4">
        {t('homeButton')}
      </Link>
    </div>
  );
}
