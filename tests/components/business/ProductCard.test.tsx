// RUTA: tests/components/business/ProductCard.test.tsx
/**
 * @file ProductCard.test.tsx
 * @description Pruebas de comportamiento para el componente ProductCard.
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';

import { ProductCard } from '@/components/business/ProductCard';
import { mockMargheritaPizza } from '../../mocks/menu.mocks';
import { MenuItem } from '@/menu/domain/entities/MenuItem';

// Mock de las traducciones
const messages = {
  ProductCard: {
    addButton: 'Añadir al Carrito',
  },
};

// Mock de la entidad (la clase con el método `formattedPrice`)
const margheritaEntity = new MenuItem(
  mockMargheritaPizza.id,
  mockMargheritaPizza.name,
  mockMargheritaPizza.description,
  mockMargheritaPizza.price,
  mockMargheritaPizza.imageUrl,
  mockMargheritaPizza.category
);

describe('Componente: ProductCard', () => {

  // Mockeamos `window.open` antes de cada prueba
  beforeEach(() => {
    vi.spyOn(window, 'open').mockImplementation(() => null);
  });

  const renderComponent = () => {
    render(
      // Debemos envolver en el proveedor de i18n para que `useTranslations` funcione
      <NextIntlClientProvider locale="es" messages={messages}>
        <ProductCard item={margheritaEntity} />
      </NextIntlClientProvider>
    );
  };

  it('Debe renderizar la información del producto correctamente', () => {
    // Arrange
    renderComponent();

    // Assert
    expect(screen.getByRole('heading', { name: 'Pizza Margherita' })).toBeInTheDocument();
    expect(screen.getByText('Clásica salsa de tomate San Marzano, mozzarella fresca y albahaca.')).toBeInTheDocument();
    // Verificamos que el precio formateado por la clase se renderice
    expect(screen.getByText('$10.50')).toBeInTheDocument();
    // Verificamos que el botón se renderice con el texto traducido
    expect(screen.getByRole('button', { name: 'Añadir al Carrito' })).toBeInTheDocument();
  });

  it('Debe abrir un enlace de WhatsApp con la información correcta al hacer clic en "Añadir"', async () => {
    // Arrange
    process.env.NEXT_PUBLIC_WHATSAPP_CHECKOUT_NUMBER = '12345';
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE_TEMPLATE = 'Orden: {items} - Total: {total}';
    renderComponent();
    const user = userEvent.setup();
    const addButton = screen.getByRole('button', { name: /añadir al carrito/i });

    // Act
    await user.click(addButton);

    // Assert
    const expectedMessage = 'Orden: 1x Pizza Margherita - Total: $10.50';
    const expectedUrl = `https://wa.me/12345?text=${encodeURIComponent(expectedMessage)}`;

    expect(window.open).toHaveBeenCalledOnce();
    expect(window.open).toHaveBeenCalledWith(expectedUrl, '_blank');
  });
});
