// RUTA: src/components/business/ProductCard.tsx
'use client';

import { MenuItem } from '@/menu/domain/entities/MenuItem';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { logger } from '@/shared/logging';

interface ProductCardProps {
  item: MenuItem;
}

export function ProductCard({ item }: ProductCardProps) {
  const t = useTranslations('ProductCard');

  const handleAddToCart = () => {
    logger.info('[ProductCard] Add to cart clicked.', { productId: item.id, productName: item.name });
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_CHECKOUT_NUMBER;
    const template = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE_TEMPLATE || 'Quisiera ordenar: {items}. Total: {total}.';

    if (!phoneNumber) {
      logger.error("[CONFIG-ERROR] WhatsApp checkout number is not defined.", {
        envVar: 'NEXT_PUBLIC_WHATSAPP_CHECKOUT_NUMBER',
      });
      alert("Lo sentimos, el sistema de pedidos no está disponible en este momento.");
      return;
    }

    const itemsText = `1x ${item.name}`;
    const totalText = item.formattedPrice;

    const message = template
      .replace('{items}', encodeURIComponent(itemsText))
      .replace('{total}', encodeURIComponent(totalText));

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="fade-in flex flex-col">
      <div className="relative w-full aspect-video"> {/* Usando aspect-ratio para consistencia */}
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
            // Consumiendo la clase .btn-primary para cohesión total.
            className="btn-primary"
          >
            {t('addButton')}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
