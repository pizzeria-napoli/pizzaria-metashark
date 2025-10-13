// RUTA: src/menu/domain/entities/MenuItem.schema.ts
/**
 * @file MenuItem.schema.ts
 * @description Define el contrato de datos para la entidad MenuItem.
 * @version 5.0.0 (Domain Primitive Alignment)
 * @author L.I.A. Legacy
 */
import { z } from 'zod';
// --- CORRECCIÓN CLAVE: Importamos el schema base de nuestro dominio ---
import { ProductIdSchema } from '@/shared/domain/types';

/**
 * Valida la estructura de datos crudos de un ítem del menú.
 */
export const menuItemSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción es muy corta'),
  price: z.number().positive('El precio debe ser un número positivo'),
  imageUrl: z.string().url('La URL de la imagen no es válida'),
  category: z.string().nonempty('La categoría es requerida'),
});

/**
 * Valida la entidad MenuItem completa, incluyendo su ID.
 * Utiliza el ProductIdSchema importado para garantizar la consistencia del tipo.
 */
export const menuItemEntitySchema = menuItemSchema.extend({
  // Se utiliza el schema del tipo primitivo de dominio.
  id: ProductIdSchema,
});

/**
 * El tipo de TypeScript para una entidad MenuItem validada.
 * Este tipo ahora inferirá correctamente que `id` es de tipo `ProductId`.
 */
export type MenuItemEntity = z.infer<typeof menuItemEntitySchema>;
