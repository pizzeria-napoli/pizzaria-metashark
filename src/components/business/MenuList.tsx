// RUTA: src/components/business/MenuList.tsx (Ahora Correcto)
/**
 * @file MenuList.tsx
 * @description Componente de cliente que obtiene y renderiza la lista de productos.
 * @version 3.0.0 (Sovereign i18n Consumption)
 * @author L.I.A. Legacy
 */
'use client';

import { useTranslations } from 'next-intl';
import { useMenu } from '@/menu/application/useMenu';
import { ProductCard } from './ProductCard';
import { logger } from '@/shared/logging';

export function MenuList() {
  const t = useTranslations('MenuList');
  // `menuItems` ahora es correctamente inferido como `MenuItem[] | undefined`.
  const { data: menuItems, isLoading, isError, error } = useMenu();

  if (isLoading) {
    logger.info('MenuList is loading...');
    return <p className="text-center text-lg">{t('loading')}</p>;
  }

  if (isError) {
    logger.error('Failed to load menu', { error });
    return <p className="text-center text-red-500">{t('error')}</p>;
  }

  // Esta comprobación ahora es tipo-segura.
  if (!menuItems || menuItems.length === 0) {
    return <p className="text-center text-lg">{t('empty')}</p>;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {/* El método '.map' existe y 'item' es ahora inferido como 'MenuItem'. */}
      {menuItems.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </section>
  );
}
