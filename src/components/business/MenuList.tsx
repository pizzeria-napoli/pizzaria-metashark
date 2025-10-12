// RUTA: src/components/business/MenuList.tsx
'use client';
/**
 * @file MenuList.tsx
 * @description Componente de cliente que obtiene y renderiza la lista de productos del menú.
 */
import { useMenu } from '@/menu/application/useMenu';
import { ProductCard } from './ProductCard';
import { logger } from '@/shared/logging';

export function MenuList() {
  const { data: menuItems, isLoading, isError, error } = useMenu();

  if (isLoading) {
    logger.info('MenuList is loading...');
    // En una app real, aquí iría un componente de "esqueleto" (skeleton loader).
    return <p className="text-center text-lg">Cargando nuestro delicioso menú...</p>;
  }

  if (isError) {
    logger.error('Failed to load menu', { error });
    return <p className="text-center text-red-500">¡Ups! Algo salió mal al cargar el menú. Por favor, intenta de nuevo más tarde.</p>;
  }

  if (!menuItems || menuItems.length === 0) {
    return <p className="text-center text-lg">No hay productos en el menú en este momento.</p>;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {menuItems.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </section>
  );
}
