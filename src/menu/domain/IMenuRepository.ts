// RUTA: src/menu/domain/IMenuRepository.ts
/**
 * @file IMenuRepository.ts
 * @description Define el contrato que cualquier repositorio de menú debe cumplir.
 *              Actúa como un puerto en la Arquitectura Limpia, garantizando el tipado estricto.
 */
import { MenuItem } from './entities/MenuItem';
import { ProductId } from '@/shared/domain/types';

export interface IMenuRepository {
  /**
   * Obtiene todos los ítems del menú.
   * @returns Una promesa que resuelve a un array de MenuItems. Devuelve un array vacío en caso de error.
   */
  findAll(): Promise<MenuItem[]>;

  /**
   * Busca un ítem del menú por su ID.
   * @param id El ID único y tipado del ítem a buscar.
   * @returns Una promesa que resuelve a un MenuItem o null si no se encuentra o hay un error.
   */
  findById(id: ProductId): Promise<MenuItem | null>;
}
