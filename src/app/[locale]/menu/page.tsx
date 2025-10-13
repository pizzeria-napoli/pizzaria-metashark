// RUTA: src/app/[locale]/menu/page.tsx (Server Component)
/**
 * @file page.tsx
 * @description Página del menú (Server Component).
 * @version 2.0.0 (Sovereign i18n Consumption)
 * @author L.I.A. Legacy
 */
import { getTranslations } from 'next-intl/server';
import { MainLayout } from '@/components/layout/MainLayout';
import { MenuList } from '@/components/business/MenuList';

export default async function MenuPage() {
  // Se utiliza `getTranslations` para obtener traducciones en el servidor.
  const t = await getTranslations('MenuPage');

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-center text-primary font-serif">
            {t('title')}
          </h1>
        </header>
        <MenuList />
      </div>
    </MainLayout>
  );
}
