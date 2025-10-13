// RUTA: src/menu/domain/IMenuRepository.ts
/**
 * @file IMenuRepository.ts
 * @description Define el contrato que cualquier repositorio de menú debe cumplir.
 *              Actúa como un puerto en la Arquitectura Limpia, garantizando el tipado estricto.
 * @version 2.0.0 (Domain Primitive Alignment)
 * @author L.I.A. Legacy
 */
import { MenuItem } from './entities/MenuItem';
import { ProductId } from '@/shared/domain/types';

export interface IMenuRepository {
  /**
   * Obtiene todos los ítems del menú.
   */
  findAll(): Promise<MenuItem[]>;

  /**
   * Busca un ítem del menú por su ID.
   * @param id El ID único y tipado del ítem a buscar.
   */
  // --- CORRECCIÓN CLAVE: La firma ahora exige un ProductId. ---
  findById(id: ProductId): Promise<MenuItem | null>;
}
