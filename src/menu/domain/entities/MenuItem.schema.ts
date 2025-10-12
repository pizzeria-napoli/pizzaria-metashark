// RUTA: src/menu/domain/entities/MenuItem.schema.ts
/**
 * @file MenuItem.schema.ts
 * @description Define el contrato de datos para la entidad MenuItem.
 * @version 4.0.0 (SSoT Type Inference)
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from 'zod';
// --- LA CORRECCIÓN CLAVE ---
// Importamos el ESQUEMA, no el TIPO, para construir nuestro esquema más grande.
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
  id: ProductIdSchema, // <-- SIMPLEMENTE USAMOS EL ESQUEMA IMPORTADO
});

/**
 * El tipo de TypeScript para una entidad MenuItem validada.
 * z.infer ahora funciona perfectamente, porque la estructura del tipo
 * que produce es idéntica a la que se usa en toda la aplicación.
 */
export type MenuItemEntity = z.infer<typeof menuItemEntitySchema>;
