// RUTA: tests/components/business/ProductCard.test.tsx
/**
 * @file ProductCard.test.tsx
 * @description Suite de pruebas para el componente ProductCard.
 *              v1.2.0 (Linter-Aligned): Se elimina el uso de 'any' y las
 *              importaciones no utilizadas para un cumplimiento estricto
 *              de los pilares de calidad de código.
 * @version 1.2.0
 * @author L.I.A. Legacy
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import { ProductCard } from '@/components/business/ProductCard';
import { MenuItem } from '@/menu/domain/entities/MenuItem';
import { ProductId } from '@/shared/domain/types';

const mockItem = new MenuItem(
  'pizza-margherita-1' as ProductId,
  'Margherita Suprema',
  'La clásica pizza con un toque supremo.',
  1550,
  'https://images.unsplash.com/photo-1595854341625-f33213ab4ce1',
  'Pizzas'
);

const messages = {
  ProductCard: {
    addButton: 'Add to Cart',
  },
};

describe('Component: ProductCard', () => {
  it('should render the product name and formatted price correctly', async () => {
    render(
      <NextIntlClientProvider locale="en-US" messages={messages}>
        <ProductCard item={mockItem} />
      </NextIntlClientProvider>
    );

    // Con la configuración de tsconfig.json corregida, TypeScript ahora
    // reconoce que .toBeInTheDocument() es un matcher válido.
    expect(await screen.findByText('Margherita Suprema')).toBeInTheDocument();
    expect(await screen.findByText('$15.50')).toBeInTheDocument();
    expect(await screen.findByText('Add to Cart')).toBeInTheDocument();
  });
});
