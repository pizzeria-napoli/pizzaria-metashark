// RUTA: src/menu/application/get-full-menu.ts
/**
 * @file get-full-menu.ts
 * @description Caso de uso de aplicación para obtener la lista completa de ítems del menú.
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
   *          Gracias al Manifiesto de Resiliencia, se garantiza que devolverá un array
   *          (vacío en caso de error en la capa inferior), sin lanzar excepciones.
   */
  async execute(): Promise<MenuItem[]> {
    // No se necesita try/catch aquí porque el repositorio ya es resiliente.
    // Simplemente delegamos la llamada.
    return this.menuRepository.findAll();
  }
}
