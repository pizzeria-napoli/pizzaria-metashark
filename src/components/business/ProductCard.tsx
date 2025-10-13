// RUTA: src/components/business/ProductCard.tsx
/**
 * @file ProductCard.tsx
 * @description Componente de UI que muestra un producto del menú.
 *              Ahora utiliza el sistema de iconografía centralizado.
 * @version 2.2.0 (Iconography System Aligned)
 * @author L.I.A. Legacy
 */
'use client';

import { MenuItem } from '@/menu/domain/entities/MenuItem';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { logger } from '@/shared/logging';
// --- PILAR MEA/UX: Se importa el componente <Icon /> en lugar de un icono específico. ---
import { Icon } from '../ui/Icon';

interface ProductCardProps {
  item: MenuItem;
}

export function ProductCard({ item }: ProductCardProps) {
  const t = useTranslations('ProductCard');

  // ... (lógica de handleAddToCart se mantiene igual) ...

  const handleAddToCart = () => {
    const group = logger.startGroup('ProductCard.handleAddToCart', { productId: item.id });
    const operation = logger.measure(
      'whatsappUrlGeneration',
      async () => {
        logger.info('Add to cart clicked.', { productName: item.name });
        const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_CHECKOUT_NUMBER;
        const template =
          process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE_TEMPLATE ||
          'Quisiera ordenar: {items}. Total: {total}.';

        if (!phoneNumber) {
          logger.error('[CONFIG-ERROR] WhatsApp checkout number is not defined.', {
            envVar: 'NEXT_PUBLIC_WHATSAPP_CHECKOUT_NUMBER',
          });
          alert('Lo sentimos, el sistema de pedidos no está disponible en este momento.');
          return null;
        }

        const itemsText = `1x ${item.name}`;
        const totalText = item.formattedPrice;
        const message = template
          .replace('{items}', encodeURIComponent(itemsText))
          .replace('{total}', encodeURIComponent(totalText));
        return `https://wa.me/${phoneNumber}?text=${message}`;
      },
      {},
      group.groupId
    );

    operation.then((whatsappUrl) => {
      if (whatsappUrl) {
        window.open(whatsappUrl, '_blank');
        logger.success('Redirected to WhatsApp for checkout.', {}, group.groupId);
      } else {
        logger.warn('Checkout process aborted due to configuration error.', {}, group.groupId);
      }
      logger.endGroup(group.groupId);
    });
  };


  return (
    <Card className="fade-in flex flex-col">
      <div className="relative w-full aspect-video">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover rounded-t-lg"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-gradient">{item.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <p className="flex-grow">{item.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-primary">{item.formattedPrice}</span>
          <button
            onClick={handleAddToCart}
            className="btn-primary flex items-center gap-2"
          >
            {/* Uso del nuevo sistema: declarativo, seguro y performante. */}
            <Icon name="ShoppingCart" size={18} strokeWidth={2.5} />
            {t('addButton')}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
