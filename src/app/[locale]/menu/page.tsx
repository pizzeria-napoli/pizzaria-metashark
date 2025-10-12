// RUTA: src/app/[locale]/menu/page.tsx
/**
 * @file page.tsx
 * @description Página del menú. Actúa como un Server Component que define la estructura
 *              y delega el renderizado de la lista a un Client Component.
 */
import { getTranslations } from 'next-intl/server';
import { MainLayout } from '@/components/layout/MainLayout';
import { MenuList } from '@/components/business/MenuList';

export default async function MenuPage() {
  const t = await getTranslations('MenuPage');

  return (
    <MainLayout>
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-center text-primary font-serif">
            {t('title')}
          </h1>
        </header>
        {/* Delegamos la carga y renderizado de datos al componente de cliente */}
        <MenuList />
      </div>
    </MainLayout>
  );
}
