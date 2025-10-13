// RUTA: src/menu/application/get-full-menu.ts
/**
 * @file get-full-menu.ts
 * @description Caso de uso de aplicación para obtener la lista completa de ítems del menú.
 * @version 1.0.0
 * @author L.I.A. Legacy
 */
import { IMenuRepository } from '../domain/IMenuRepository';
import { MenuItem } from '../domain/entities/MenuItem';

/**
 * Orquesta la obtención de todos los ítems del menú.
 * Actúa como intermediario entre la capa de presentación y la capa de dominio/infraestructura.
 */
export class GetFullMenu {
  /**
   * @param menuRepository Una implementación de IMenuRepository que proveerá los datos.
   */
  constructor(private readonly menuRepository: IMenuRepository) {}

  /**
   * Ejecuta el caso de uso.
   * @returns {Promise<MenuItem[]>} Una promesa que resuelve a un array de MenuItems.
   */
  async execute(): Promise<MenuItem[]> {
    return this.menuRepository.findAll();
  }
}
