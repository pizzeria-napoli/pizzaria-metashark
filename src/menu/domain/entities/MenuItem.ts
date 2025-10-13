// RUTA: src/menu/domain/entities/MenuItem.ts
/**
 * @file MenuItem.ts
 * @description Representa la entidad de negocio para un ítem del menú.
 * @version 2.0.0 (Domain Primitive Alignment)
 * @author L.I.A. Legacy
 */
import { ProductId } from '@/shared/domain/types';

/**
 * Representa un ítem individual dentro del menú de la pizzería.
 */
export class MenuItem {
  /**
   * @param id - El identificador único y tipado del producto.
   * @param name - El nombre del producto.
   * @param description - La descripción del producto.
   * @param price - El precio en la menor unidad monetaria (ej. centavos).
   * @param imageUrl - La URL de la imagen del producto.
   * @param category - La categoría a la que pertenece el producto.
   */
  constructor(
    // --- CORRECCIÓN CLAVE: El ID ya no es un 'string' genérico. ---
    public readonly id: ProductId,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly imageUrl: string,
    public readonly category: string
  ) {}

  /**
   * Devuelve el precio del ítem formateado.
   */
  get formattedPrice(): string {
    const priceInDollars = this.price / 100;
    return `$${priceInDollars.toFixed(2)}`;
  }
}
