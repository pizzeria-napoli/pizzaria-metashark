// RUTA: tests/mocks/menu.mocks.ts
/**
 * @file menu.mocks.ts
 * @description Contiene datos de mock reutilizables para el dominio del Menú.
 *              Estos mocks respetan los tipos de dominio y los esquemas Zod.
 */
import { MenuItemEntity } from '@/menu/domain/entities/MenuItem.schema';
import { ProductIdSchema } from '@/shared/domain/types';

export const mockMargheritaPizza: MenuItemEntity = {
  id: ProductIdSchema.parse('p1'), // Usamos .parse para asegurar el tipo
  name: 'Pizza Margherita',
  description: 'Clásica salsa de tomate San Marzano, mozzarella fresca y albahaca.',
  price: 1050, // En centavos
  imageUrl: 'https://images.unsplash.com/photo-1593560704563-f176a2eb61db',
  category: 'Clásicas',
};

export const mockPepperoniPizza: MenuItemEntity = {
  id: ProductIdSchema.parse('p2'),
  name: 'Pizza de Pepperoni',
  description: 'Abundante pepperoni picante sobre una cama de mozzarella derretida.',
  price: 1200, // En centavos
  imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983d34',
  category: 'Carnes',
};

export const mockMenuItems: MenuItemEntity[] = [
  mockMargheritaPizza,
  mockPepperoniPizza,
];
